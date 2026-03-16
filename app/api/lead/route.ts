import { NextResponse } from "next/server";

function getFieldValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const lead = {
    name: getFieldValue(formData, "name"),
    project: getFieldValue(formData, "project"),
    phone: getFieldValue(formData, "phone"),
    task: getFieldValue(formData, "task"),
  };

  console.info("Lead request received", lead);

  return NextResponse.redirect(new URL("/spasibo", request.url), 303);
}
