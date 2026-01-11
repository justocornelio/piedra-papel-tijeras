"use client";

import { useMemo, useState } from "react";
import { Bot, User, RotateCcw, HandMetal, FileText, Scissors } from "lucide-react";

type Move = "rock" | "paper" | "scissors";
type Result = "win" | "lose" | "draw";

type HistoryItem = {
  id: string;
  result: Result;
  player: Move;
  cpu: Move;
};

function randomMove(): Move {
  const arr: Move[] = ["rock", "paper", "scissors"];
  return arr[Math.floor(Math.random() * arr.length)];
}

function decide(player: Move, cpu: Move): Result {
  if (player === cpu) return "draw";
  if (
    (player === "rock" && cpu === "scissors") ||
    (player === "paper" && cpu === "rock") ||
    (player === "scissors" && cpu === "paper")
  ) {
    return "win";
  }
  return "lose";
}

function moveLabel(m: Move) {
  if (m === "rock") return "Piedra";
  if (m === "paper") return "Papel";
  return "Tijera";
}

export default function Home() {
  const MOVES = useMemo(
    () =>
      [
        {
          key: "rock" as Move,
          label: "Piedra",
          Icon: HandMetal,
          // Azul
          accentBg: "bg-blue-50",
          accentBorder: "border-blue-200",
          accentText: "text-blue-700",
          button: "bg-blue-600 hover:bg-blue-700 text-white",
          soft: "bg-blue-100 text-blue-700",
        },
        {
          key: "paper" as Move,
          label: "Papel",
          Icon: FileText,
          // Verde/Teal
          accentBg: "bg-emerald-50",
          accentBorder: "border-emerald-200",
          accentText: "text-emerald-700",
          button: "bg-emerald-600 hover:bg-emerald-700 text-white",
          soft: "bg-emerald-100 text-emerald-700",
        },
        {
          key: "scissors" as Move,
          label: "Tijera",
          Icon: Scissors,
          // Rojo
          accentBg: "bg-rose-50",
          accentBorder: "border-rose-200",
          accentText: "text-rose-700",
          button: "bg-rose-600 hover:bg-rose-700 text-white",
          soft: "bg-rose-100 text-rose-700",
        },
      ] as const,
    []
  );

  const [playerMove, setPlayerMove] = useState<Move | null>(null);
  const [cpuMove, setCpuMove] = useState<Move | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [thinking, setThinking] = useState(false);

  const [score, setScore] = useState({ player: 0, cpu: 0, draws: 0 });
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const play = (move: Move) => {
    if (thinking) return;

    setThinking(true);
    setPlayerMove(move);
    setCpuMove(null);
    setResult(null);

    const delay = 450 + Math.random() * 350;

    setTimeout(() => {
      const cpu = randomMove();
      const res = decide(move, cpu);

      setCpuMove(cpu);
      setResult(res);

      setScore((s) => ({
        player: s.player + (res === "win" ? 1 : 0),
        cpu: s.cpu + (res === "lose" ? 1 : 0),
        draws: s.draws + (res === "draw" ? 1 : 0),
      }));

      setHistory((h) =>
        [
          {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            result: res,
            player: move,
            cpu,
          },
          ...h,
        ].slice(0, 6)
      );

      setThinking(false);
    }, delay);
  };

  const resetAll = () => {
    setPlayerMove(null);
    setCpuMove(null);
    setResult(null);
    setThinking(false);
    setScore({ player: 0, cpu: 0, draws: 0 });
    setHistory([]);
  };

  const MoveIcon = ({
    move,
    tone = "neutral",
  }: {
    move: Move | null;
    tone?: "player" | "cpu" | "neutral";
  }) => {
    const data = MOVES.find((m) => m.key === move);
    if (!data) return <span className="text-slate-400">—</span>;

    const Icon = data.Icon;

    const color =
      tone === "player"
        ? "text-blue-700"
        : tone === "cpu"
        ? "text-slate-700"
        : data.accentText;

    return <Icon size={34} className={`${color} animate-pop`} />;
  };

  const resultText =
    thinking
      ? "La CPU está eligiendo..."
      : result === "win"
      ? "Ganaste"
      : result === "lose"
      ? "Perdiste"
      : result === "draw"
      ? "Empate"
      : "Elige tu jugada";

  const resultChipClass =
    result === "win"
      ? "bg-emerald-100 text-emerald-800"
      : result === "lose"
      ? "bg-rose-100 text-rose-800"
      : result === "draw"
      ? "bg-amber-100 text-amber-800"
      : "bg-slate-100 text-slate-700";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto w-full max-w-2xl px-4 py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-xl text-slate-900">Piedra, papel o tijera</h1>
          <p className="mt-1 text-sm text-slate-500">Jugador vs Máquina</p>
        </header>

        {/* Score */}
        <section className="mb-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <User size={16} className="text-blue-600" /> Jugador
            </div>
            <div className="mt-2 text-2xl text-slate-900">{score.player}</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Empates
            </div>
            <div className="mt-2 text-2xl text-slate-900">{score.draws}</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Bot size={16} className="text-rose-600" /> CPU
            </div>
            <div className="mt-2 text-2xl text-slate-900">{score.cpu}</div>
          </div>
        </section>

        {/* Arena */}
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs ${resultChipClass}`}>
                  {resultText}
                </span>
                {thinking && (
                  <span className="text-xs text-slate-400">un momento…</span>
                )}
              </div>

              <p className="mt-2 text-xs text-slate-500">
                {playerMove ? `Tú: ${moveLabel(playerMove)}` : "Tú: —"} •{" "}
                {cpuMove ? `CPU: ${moveLabel(cpuMove)}` : "CPU: —"}
              </p>
            </div>

            <button
              onClick={resetAll}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 active:scale-[0.99]"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {/* Player */}
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  Tú
                </span>
                <User size={16} className="text-blue-600" />
              </div>

              <div className="mt-4 flex h-16 items-center justify-center rounded-lg bg-blue-50">
                <MoveIcon move={playerMove} tone="player" />
              </div>
            </div>

            {/* CPU */}
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  CPU
                </span>
                <Bot size={16} className="text-rose-600" />
              </div>

              <div className="mt-4 flex h-16 items-center justify-center rounded-lg bg-slate-50">
                {thinking ? (
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce [animation-delay:120ms]" />
                    <span className="h-2 w-2 rounded-full bg-slate-200 animate-bounce [animation-delay:240ms]" />
                  </div>
                ) : (
                  <MoveIcon move={cpuMove} tone="cpu" />
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {MOVES.map(({ key, label, Icon, button }) => (
              <button
                key={key}
                onClick={() => play(key)}
                disabled={thinking}
                className={[
                  "rounded-xl px-3 py-3 text-left transition active:scale-[0.99]",
                  "disabled:opacity-60",
                  button,
                ].join(" ")}
              >
                <div className="flex items-center gap-2 text-sm">
                  <Icon size={18} className="text-white/90" />
                  <span className="text-white">{label}</span>
                </div>
                <div className="mt-1 text-xs text-white/80">Elegir</div>
              </button>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="mt-6">
          <div className="mb-2 text-sm text-slate-600">Historial</div>

          {history.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500">
              Sin rondas todavía.
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2"
                >
                  <div className="text-sm text-slate-700">
                    <span
                      className={
                        h.result === "win"
                          ? "text-emerald-700"
                          : h.result === "lose"
                          ? "text-rose-700"
                          : "text-amber-700"
                      }
                    >
                      {h.result === "win"
                        ? "Ganaste"
                        : h.result === "lose"
                        ? "Perdiste"
                        : "Empate"}
                    </span>
                    <span className="text-slate-400"> · </span>
                    <span className="text-slate-500">
                      {moveLabel(h.player)} vs {moveLabel(h.cpu)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
                      Tú
                    </span>
                    <span className="rounded-full bg-rose-50 px-2 py-1 text-xs text-rose-700">
                      CPU
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-10 text-xs text-slate-400">
          justo cornelio bello
        </footer>
      </main>

      <style jsx>{`
        .animate-pop {
          animation: pop 0.18s ease-out;
        }
        @keyframes pop {
          from {
            transform: scale(0.92);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
