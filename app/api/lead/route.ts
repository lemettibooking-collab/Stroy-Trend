import { NextResponse } from "next/server";

function getFieldValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

type LeadPayload = {
  name: string;
  phone: string;
  task: string;
  project: string;
  deadline: string;
  materials: string;
  sourcePath: string;
  website: string;
  timestamp: string;
};

function normalizeField(value: string, maxLength: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function getPhoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}

function validateLead(lead: LeadPayload) {
  if (lead.website) {
    return { ok: true, isSpam: true as const };
  }

  if (lead.name.length < 2) {
    return { ok: false, error: "Укажите имя, чтобы мы могли к вам вернуться." };
  }

  if (getPhoneDigits(lead.phone).length < 10) {
    return { ok: false, error: "Проверьте телефон: сейчас в нём недостаточно цифр." };
  }

  if (lead.task.length < 10) {
    return {
      ok: false,
      error: "Коротко опишите задачу: объект, стадия или что именно нужно закрыть.",
    };
  }

  return { ok: true, isSpam: false as const };
}

function buildTelegramMessage(lead: LeadPayload) {
  const timestamp = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Moscow",
  }).format(new Date(lead.timestamp));

  return [
    "<b>Новая заявка с лендинга</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(lead.name)}`,
    `<b>Телефон:</b> ${escapeHtml(lead.phone)}`,
    `<b>Задача:</b> ${escapeHtml(lead.task)}`,
    `<b>Объект / проект:</b> ${escapeHtml(lead.project || "не указан")}`,
    `<b>Дедлайн:</b> ${escapeHtml(lead.deadline || "не указан")}`,
    `<b>Материалы / исходные:</b> ${escapeHtml(lead.materials || "не указаны")}`,
    `<b>Источник:</b> ${escapeHtml(lead.sourcePath || "/")}`,
    `<b>Время:</b> ${escapeHtml(timestamp)} (МСК)`,
  ].join("\n");
}

async function deliverLeadToTelegram(lead: LeadPayload) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const threadId = process.env.TELEGRAM_THREAD_ID;

  if (!botToken || !chatId) {
    throw new Error("Lead delivery is not configured.");
  }

  const body: Record<string, unknown> = {
    chat_id: chatId,
    text: buildTelegramMessage(lead),
    parse_mode: "HTML",
    disable_web_page_preview: true,
  };

  if (threadId) {
    const parsedThreadId = Number(threadId);

    if (Number.isFinite(parsedThreadId)) {
      body.message_thread_id = parsedThreadId;
    }
  }

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );

  const payload = (await response.json().catch(() => null)) as
    | { ok?: boolean; description?: string }
    | null;

  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.description || "Telegram delivery failed");
  }
}

function createSuccessResponse(request: Request, isFetchRequest: boolean) {
  if (isFetchRequest) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.redirect(new URL("/spasibo", request.url), 303);
}

function createErrorResponse(
  message: string,
  status: number,
  isFetchRequest: boolean,
) {
  if (isFetchRequest) {
    return NextResponse.json({ ok: false, error: message }, { status });
  }

  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const isFetchRequest = request.headers.get("x-requested-with") === "fetch";
  const referer = request.headers.get("referer");
  let refererPath = "/";

  if (referer) {
    try {
      refererPath = new URL(referer).pathname || "/";
    } catch {
      refererPath = "/";
    }
  }

  const lead: LeadPayload = {
    name: normalizeField(getFieldValue(formData, "name"), 120),
    project: normalizeField(getFieldValue(formData, "project"), 160),
    phone: normalizeField(getFieldValue(formData, "phone"), 40),
    task: normalizeField(getFieldValue(formData, "task"), 3000),
    deadline: normalizeField(getFieldValue(formData, "deadline"), 160),
    materials: normalizeField(getFieldValue(formData, "materials"), 500),
    sourcePath: normalizeField(
      getFieldValue(formData, "sourcePath") || refererPath,
      200,
    ),
    website: normalizeField(getFieldValue(formData, "website"), 200),
    timestamp: new Date().toISOString(),
  };

  const validation = validateLead(lead);

  if (!validation.ok) {
    return createErrorResponse(
      validation.error || "Проверьте корректность заполнения формы.",
      400,
      isFetchRequest,
    );
  }

  if (validation.isSpam) {
    return createSuccessResponse(request, isFetchRequest);
  }

  try {
    await deliverLeadToTelegram(lead);
    console.info("Lead delivered", {
      sourcePath: lead.sourcePath,
      timestamp: lead.timestamp,
    });
  } catch (error) {
    console.error("Lead delivery failed", error);

    return createErrorResponse(
      "Не удалось отправить заявку. Попробуйте ещё раз через минуту.",
      500,
      isFetchRequest,
    );
  }

  return createSuccessResponse(request, isFetchRequest);
}
