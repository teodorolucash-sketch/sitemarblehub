"use client";

import { useState } from "react";

const modules = [
  { name: "Orçamento", icon: "📋", angle: 0, description: "Crie orçamentos profissionais em minutos com cálculo automático de materiais." },
  { name: "Financeiro", icon: "💰", angle: 45, description: "Contas a pagar e receber, fluxo de caixa e indicadores financeiros." },
  { name: "Estoque de Chapas", icon: "🌐", angle: 90, description: "Controle completo do estoque de chapas com rastreamento por lote." },
  { name: "Clientes", icon: "👥", angle: 135, description: "Cadastro de clientes com histórico de orçamentos e pedidos." },
  { name: "Indicadores", icon: "📈", angle: 180, description: "Dashboards com métricas em tempo real do seu negócio." },
  { name: "Agenda", icon: "📅", angle: 225, description: "Organize medições, instalações e compromissos da equipe." },
  { name: "Desenho Técnico", icon: "📐", angle: 270, description: "Crie desenhos técnicos diretamente na plataforma." },
  { name: "Pedidos", icon: "📦", angle: 315, description: "Acompanhe pedidos do orçamento aprovado até a instalação." },
];

export function Hero() {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 md:pb-32 md:pt-24">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted">
            <span className="h-2 w-2 rounded-full bg-forest-medium" />
            MVP ativo · marmorarias reais usando
          </span>
        </div>

        {/* Título */}
        <h1 className="mx-auto max-w-3xl text-center font-display text-4xl font-bold leading-tight text-forest md:text-5xl lg:text-6xl">
          Tudo o que a sua marmoraria precisa em um só lugar.
        </h1>

        {/* Subtítulo */}
        <p className="mx-auto mt-6 max-w-xl text-center text-lg text-muted">
          Do orçamento à instalação — tudo em um só lugar. Clique em cada
          módulo para ver como funciona.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://app.marblehub.com.br/cadastro"
            className="rounded-lg bg-forest px-8 py-3.5 text-base font-medium text-cream shadow-sm transition-colors hover:bg-forest-medium"
          >
            Começar grátis por 14 dias
          </a>
          <a
            href="#demo"
            className="rounded-lg border border-border bg-card px-8 py-3.5 text-base font-medium text-forest transition-colors hover:bg-cream"
          >
            Ver demonstração
          </a>
        </div>

        {/* Hub de Módulos */}
        <div className="relative mx-auto mt-20 h-[480px] w-full max-w-2xl md:mt-28 md:h-[560px]">
          {/* Centro - Logo */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-24 w-40 flex-col items-center justify-center rounded-2xl bg-forest shadow-lg md:h-28 md:w-48">
              <div className="flex items-center gap-0.5">
                <span className="font-display text-xl font-bold text-cream md:text-2xl">
                  Mar
                </span>
                <span className="font-display text-xl font-bold text-gold md:text-2xl">
                  Hub
                </span>
              </div>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-cream/70 md:text-xs">
                Plataforma Completa
              </span>
            </div>
          </div>

          {/* Linhas conectoras (SVG) */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 600 560"
            fill="none"
          >
            {modules.map((mod, i) => {
              const radiusX = 250;
              const radiusY = 220;
              const cx = 300;
              const cy = 280;
              const rad = (mod.angle * Math.PI) / 180;
              const x = cx + radiusX * Math.cos(rad);
              const y = cy + radiusY * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke="#D6D0C4"
                  strokeWidth="1"
                  strokeDasharray="6 4"
                />
              );
            })}
          </svg>

          {/* Módulos orbitais */}
          {modules.map((mod, i) => {
            const radiusX = 250;
            const radiusY = 220;
            const rad = (mod.angle * Math.PI) / 180;
            const xPercent = 50 + (radiusX / 6) * Math.cos(rad);
            const yPercent = 50 + (radiusY / 5.6) * Math.sin(rad);

            return (
              <button
                key={i}
                onMouseEnter={() => setActiveModule(i)}
                onMouseLeave={() => setActiveModule(null)}
                onClick={() => setActiveModule(activeModule === i ? null : i)}
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-105"
                style={{
                  left: `${xPercent}%`,
                  top: `${yPercent}%`,
                }}
              >
                <div className={`flex items-center gap-2 rounded-full border px-4 py-2.5 shadow-sm transition-all md:px-5 md:py-3 ${
                  activeModule === i
                    ? "border-forest bg-forest text-cream"
                    : "border-border bg-card text-forest hover:border-forest/30"
                }`}>
                  <span className="text-base md:text-lg">{mod.icon}</span>
                  <span className="text-xs font-medium md:text-sm">{mod.name}</span>
                </div>

                {/* Tooltip */}
                {activeModule === i && (
                  <div className="absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-xl border border-border bg-card p-4 text-left shadow-lg">
                    <p className="text-sm leading-relaxed text-text">
                      {mod.description}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Hint */}
        <p className="mt-4 text-center text-sm text-muted">
          Clique em qualquer módulo para ver como funciona
        </p>
      </div>
    </section>
  );
}
