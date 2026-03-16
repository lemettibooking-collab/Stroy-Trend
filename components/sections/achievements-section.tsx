"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Container } from "@/components/container";
import {
  achievementDocuments,
  type AchievementDocument,
} from "@/lib/achievement-documents";

type IndexedDocument = {
  document: AchievementDocument;
  index: number;
};

export function AchievementsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const documents: IndexedDocument[] = achievementDocuments.map((document, index) => ({
    document,
    index,
  }));

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((currentIndex) =>
          currentIndex === null
            ? 0
            : (currentIndex + 1) % achievementDocuments.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((currentIndex) =>
          currentIndex === null
            ? achievementDocuments.length - 1
            : (currentIndex - 1 + achievementDocuments.length) %
              achievementDocuments.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const activeDocument =
    activeIndex === null ? null : achievementDocuments[activeIndex];

  const showPreviousDocument = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === null
        ? 0
        : (currentIndex - 1 + achievementDocuments.length) %
          achievementDocuments.length,
    );
  };

  const showNextDocument = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === null
        ? 0
        : (currentIndex + 1) % achievementDocuments.length,
    );
  };

  return (
    <>
      <section
        id="achievements"
        aria-labelledby="achievements-title"
        className="section-offset py-16 md:py-24 lg:py-28"
      >
        <Container>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
          <div className="mt-10 max-w-3xl md:mt-12">
            <h2
              id="achievements-title"
              className="balanced-text text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl md:leading-[1.08]"
            >
              Достижения
            </h2>
            <p className="readable-text mt-5 max-w-3xl text-base leading-7 text-[var(--text-muted)] md:text-lg md:leading-8">
              Профильное образование, НРС, повышение квалификации и отраслевые награды.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto overscroll-x-contain pb-2 md:mt-14">
            <div className="grid auto-cols-[18.5rem] grid-flow-col gap-4 md:auto-cols-[30rem] md:gap-5">
              {documents.map(({ document, index }) => (
                <button
                  key={document.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="surface-card flex h-full snap-start flex-col rounded-[1.9rem] p-4 text-left transition hover:-translate-y-0.5 md:p-5"
                >
                  <div className="rounded-[1.45rem] border border-[var(--border)] bg-[#faf7f1] p-3 md:p-4">
                    <div className="relative h-[20rem] md:h-[29rem]">
                      <Image
                        src={document.image}
                        alt={document.title}
                        fill
                        className="object-contain object-center"
                        sizes="(max-width: 767px) 300px, 500px"
                      />
                    </div>
                  </div>
                  <div className="mt-4 md:mt-5">
                    <h3 className="text-lg font-semibold text-[var(--text)] md:text-xl">
                      {document.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)] md:text-base md:leading-7">
                      {document.subtitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {activeDocument ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(23,28,32,0.82)] px-4 py-6 md:px-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievement-dialog-title"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="surface-card relative flex max-h-full w-full max-w-6xl flex-col rounded-[2rem] p-4 md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-4">
              <div className="min-w-0">
                <h3
                  id="achievement-dialog-title"
                  className="text-xl font-semibold text-[var(--text)] md:text-2xl"
                >
                  {activeDocument.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)] md:text-base md:leading-7">
                  {activeDocument.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-white/80 text-lg text-[var(--text)] transition hover:border-[var(--accent)]"
                aria-label="Закрыть документ"
              >
                ×
              </button>
            </div>

            <div className="mt-4 flex min-h-0 flex-1 items-center justify-center gap-3 md:mt-6 md:gap-4">
              <button
                type="button"
                onClick={showPreviousDocument}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-white/80 text-xl text-[var(--text)] transition hover:border-[var(--accent)]"
                aria-label="Предыдущий документ"
              >
                ←
              </button>
              <div className="relative min-h-[58vh] flex-1 overflow-hidden rounded-[1.6rem] border border-[var(--border)] bg-[#fbf8f2]">
                <Image
                  src={activeDocument.image}
                  alt={activeDocument.title}
                  fill
                  className="object-contain object-center p-4 md:p-6"
                  sizes="90vw"
                  priority
                />
              </div>
              <button
                type="button"
                onClick={showNextDocument}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-white/80 text-xl text-[var(--text)] transition hover:border-[var(--accent)]"
                aria-label="Следующий документ"
              >
                →
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
