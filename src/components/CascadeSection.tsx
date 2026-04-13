"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type CascadeCard = {
  title: string;
  description: string;
  icon: ReactNode;
};

const cards: CascadeCard[] = [
  {
    title: "Pedido criado",
    description: "Entra na fila de produção automaticamente",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect x="5" y="3" width="14" height="18" rx="1.5" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="13" y2="16" />
      </svg>
    ),
  },
  {
    title: "Agenda marcada",
    description: "Instalação agendada sem precisar digitar nada",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect x="3" y="5" width="18" height="16" rx="1.5" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="8" y1="3" x2="8" y2="7" />
        <line x1="16" y1="3" x2="16" y2="7" />
      </svg>
    ),
  },
  {
    title: "Financeiro atualizado",
    description: "Recebível lançado no fluxo de caixa",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </svg>
    ),
  },
  {
    title: "Baixa no estoque",
    description: "Material reservado para o projeto",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <line x1="9" y1="20" x2="9" y2="8" />
        <line x1="15" y1="20" x2="15" y2="4" />
        <line x1="4" y1="20" x2="20" y2="20" />
      </svg>
    ),
  },
  {
    title: "Contrato gerado",
    description: "Pronto para assinar digitalmente",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect x="3" y="6" width="18" height="13" rx="1.5" />
        <polyline points="3 7 12 14 21 7" />
      </svg>
    ),
  },
];

export function CascadeSection() {
  const [step, setStep] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const start = () => {
    setStep((current) => (current === 0 ? 1 : current));
  };

  const reset = () => {
    setStep(0);
  };

  useEffect(() => {
    if (step !== 1) return;
    const schedule: Array<[number, number]> = [
      [2, 300],
      [3, 700],
      [4, 900],
      [5, 1200],
      [6, 1500],
      [7, 1800],
      [8, 2100],
      [9, 3000],
    ];
    const timers = schedule.map(([next, delay]) =>
      window.setTimeout(() => setStep(next), delay),
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [step]);

  useEffect(() => {
    if (hasPlayed) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasPlayed(true);
          setStep((current) => (current === 0 ? 1 : current));
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasPlayed]);

  const approved = step >= 1;
  const showTrunkLine = step >= 2;
  const showConnector = step >= 3;
  const isPlaying = step >= 1 && step < 9;
  const showFooter = step >= 9;

  return (
    <section
      ref={sectionRef}
      className="bg-cream px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-muted">
          Como funciona na prática
        </p>

        <h2 className="mx-auto mt-4 max-w-3xl text-center font-display text-3xl font-bold leading-tight text-forest md:text-4xl lg:text-5xl">
          1 clique. 5 coisas acontecem sozinhas.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted md:text-lg">
          O que levava 30 minutos de redigitação agora é automático.
        </p>

        {/* Botão central */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={start}
            disabled={approved}
            aria-disabled={approved}
            className={`rounded-lg px-8 py-3.5 text-base font-medium shadow-sm transition-colors duration-300 ${
              approved
                ? "cursor-default bg-gold text-forest"
                : "cursor-pointer bg-forest text-cream hover:bg-forest-medium"
            }`}
          >
            {approved ? "✓ Orçamento aprovado" : "✓ Aprovar orçamento"}
          </button>
        </div>

        {/* Linha vertical descendo do botão */}
        <div className="relative mx-auto mt-6 h-10 w-px">
          <div
            className="absolute inset-0 origin-top bg-border"
          />
          <div
            className={`absolute inset-0 origin-top bg-forest transition-transform duration-500 ease-out ${
              showTrunkLine ? "scale-y-100" : "scale-y-0"
            }`}
          />
        </div>

        {/* Cards + linha conectora */}
        <div className="relative">
          {/* Linha horizontal - desktop */}
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-0 hidden h-px bg-border lg:block" />
          <div
            className={`pointer-events-none absolute left-[10%] top-0 hidden h-px origin-left bg-forest transition-transform duration-500 ease-out lg:block ${
              showConnector ? "scale-x-100" : "scale-x-0"
            }`}
            style={{ width: "80%" }}
          />

          {/* Linha vertical central - mobile/tablet */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border lg:hidden" />
          <div
            className={`pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 origin-top bg-forest transition-transform duration-700 ease-out lg:hidden ${
              showConnector ? "scale-y-100" : "scale-y-0"
            }`}
          />

          <div className="relative flex flex-wrap justify-center gap-6 pt-10">
            {cards.map((card, i) => {
              const active = step >= 4 + i;
              return (
                <div
                  key={card.title}
                  className={`relative w-full max-w-[280px] md:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1.2rem)] ${
                    active ? "opacity-100" : "opacity-50"
                  }`}
                  style={{
                    transform: active ? "translateY(0)" : "translateY(8px)",
                    transition:
                      "opacity 400ms ease-out, transform 400ms ease-out",
                  }}
                >
                  {/* Descender line por card (desktop) */}
                  <div
                    className={`pointer-events-none absolute left-1/2 -top-10 hidden h-10 w-px -translate-x-1/2 transition-colors duration-300 lg:block ${
                      active ? "bg-forest" : "bg-border"
                    }`}
                  />

                  <div
                    className={`flex flex-col items-center rounded-xl border p-5 text-center shadow-sm transition-[background-color,border-color] duration-300 ease-out ${
                      active
                        ? "border-forest bg-white"
                        : "border-border bg-cream-light"
                    }`}
                  >
                    <div
                      className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${
                        active ? "bg-forest text-gold" : "text-forest"
                      }`}
                      style={{
                        backgroundColor: active ? undefined : "#E8F0E4",
                      }}
                    >
                      {card.icon}
                    </div>
                    <h3 className="font-display text-base font-semibold text-forest">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {card.description}
                    </p>
                    <div
                      className={`mt-4 text-lg font-bold text-gold transition-opacity duration-300 ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      ✓
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer legenda + Ver novamente */}
        <div
          className={`mt-14 flex flex-col items-center gap-4 transition-opacity duration-500 ${
            showFooter ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!showFooter}
        >
          <p className="text-center text-base text-muted md:text-lg">
            Zero redigitação. O MarbleHub conecta tudo automaticamente.
          </p>
          <button
            type="button"
            onClick={reset}
            disabled={!showFooter}
            className="rounded-lg border border-forest bg-transparent px-6 py-2.5 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-cream"
          >
            ↺ Ver novamente
          </button>
        </div>

        {/* Live region para leitores de tela */}
        <p className="sr-only" aria-live="polite">
          {isPlaying ? "Animação em andamento" : approved ? "Orçamento aprovado" : ""}
        </p>
      </div>
    </section>
  );
}
