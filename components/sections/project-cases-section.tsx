"use client";

import { useEffect, useState } from "react";

import { Container } from "@/components/container";
import { nadvoitsyFoundationCase } from "@/lib/case-documents";

const pdfViewerParams = "#toolbar=0&navpanes=0&scrollbar=0&view=FitH&page=1";

export function ProjectCasesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeDocument =
    activeIndex === null
      ? null
      : {
          document: nadvoitsyFoundationCase.documents[activeIndex],
          index: activeIndex,
        };

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
            : (currentIndex + 1) % nadvoitsyFoundationCase.documents.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((currentIndex) =>
          currentIndex === null
            ? nadvoitsyFoundationCase.documents.length - 1
            : (currentIndex - 1 + nadvoitsyFoundationCase.documents.length) %
              nadvoitsyFoundationCase.documents.length,
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

  const showPreviousDocument = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === null
        ? 0
        : (currentIndex - 1 + nadvoitsyFoundationCase.documents.length) %
          nadvoitsyFoundationCase.documents.length,
    );
  };

  const showNextDocument = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === null
        ? 0
        : (currentIndex + 1) % nadvoitsyFoundationCase.documents.length,
    );
  };

  return (
    <>
      <section
        id="cases"
        aria-labelledby="project-cases-title"
        className="section-offset py-16 md:py-24 lg:py-28"
      >
        <Container>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
          <div className="mt-10 max-w-3xl md:mt-12">
            <h2
              id="project-cases-title"
              className="balanced-text text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl md:leading-[1.08]"
            >
              Кейсы
            </h2>
            <p className="readable-text mt-5 max-w-3xl text-base leading-7 text-[var(--text-muted)] md:text-lg md:leading-8">
              Примеры объектов и комплектов исполнительной документации по выполненным работам.
            </p>
          </div>

          <article className="surface-card mt-10 rounded-[2rem] p-6 md:mt-14 md:p-8 lg:p-10">
            <div className="max-w-4xl">
              <h3 className="text-2xl font-semibold tracking-tight text-[var(--text)] md:text-3xl">
                {nadvoitsyFoundationCase.title}
              </h3>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                {nadvoitsyFoundationCase.subtitle}
              </p>
              <p className="mt-5 text-base leading-7 text-[var(--text-muted)] md:text-lg md:leading-8">
                {nadvoitsyFoundationCase.description}
              </p>
            </div>

            <div className="mt-8 overflow-x-auto overscroll-x-contain pb-2 md:mt-10">
              <div className="grid auto-cols-[19rem] grid-flow-col gap-4 md:auto-cols-[25rem] md:gap-5">
                {nadvoitsyFoundationCase.documents.map((document, index) => (
                  <button
                    key={document.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="surface-card flex h-full flex-col rounded-[1.75rem] p-4 text-left transition hover:-translate-y-0.5 md:p-5"
                  >
                    <div className="rounded-[1.35rem] border border-[var(--border)] bg-[#fbf8f2] p-3 md:p-4">
                      <div className="pointer-events-none relative h-[22rem] overflow-hidden rounded-[1rem] border border-[var(--border)] bg-white md:h-[28rem]">
                        <iframe
                          src={`${document.pdf}${pdfViewerParams}`}
                          title={document.title}
                          className="h-full w-full"
                        />
                      </div>
                    </div>
                    <div className="mt-4 md:mt-5">
                      <h4 className="text-lg font-semibold text-[var(--text)] md:text-xl">
                        {document.title}
                      </h4>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </article>
        </Container>
      </section>

      {activeDocument ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(23,28,32,0.82)] px-4 py-6 md:px-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-document-dialog-title"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="surface-card relative flex max-h-full w-full max-w-6xl flex-col rounded-[2rem] p-4 md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-4">
              <div className="min-w-0">
                <h3
                  id="case-document-dialog-title"
                  className="text-xl font-semibold text-[var(--text)] md:text-2xl"
                >
                  {activeDocument.document.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)] md:text-base md:leading-7">
                  {nadvoitsyFoundationCase.title}
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
              <div className="min-h-[70vh] flex-1 overflow-hidden rounded-[1.6rem] border border-[var(--border)] bg-[#fbf8f2]">
                <iframe
                  src={`${activeDocument.document.pdf}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                  title={activeDocument.document.title}
                  className="h-[70vh] w-full"
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
