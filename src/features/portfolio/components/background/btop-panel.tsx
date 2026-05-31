import type { FC } from "react";

const CORES = [
  ["C0", "2%", "C5", "4%", "C10", "0%"],
  ["C1", "0%", "C6", "1%", "C11", "0%"],
  ["C2", "0%", "C7", "0%", "C12", "0%"],
  ["C3", "0%", "C8", "0%", "C13", "0%"],
  ["C4", "1%", "C9", "0%", "L 0 0 0", ""],
];

const PROCS = [
  ["2278", "firefox", "406M", "0.3"],
  ["1728", "sway", "110M", "0.0"],
  ["3470", "Isolate", "209M", "0.0"],
  ["16755", "spotify", "16M", "0.0"],
  ["13822", "Isolate", "313M", "0.0"],
  ["10841", "btop", "4.9M", "0.0"],
  ["4287", "Isolate", "94M", "0.0"],
  ["16918", "alacrit", "92M", "0.0"],
  ["17247", "alacrit", "92M", "0.0"],
  ["17521", "alacrit", "91M", "0.0"],
  ["16950", "alacrit", "88M", "0.0"],
  ["13755", "alacrit", "94M", "0.0"],
  ["2478", "WebExte", "126M", "0.0"],
  ["1790", "pipewir", "11M", "0.0"],
  ["17865", "hs", "11M", "0.0"],
];

const MEM = [
  ["Total:", "58.7 GiB", ""],
  ["Used:", "3.03 GiB", "5"],
  ["Available:", "55.7 GiB", "95"],
  ["Cached:", "5.62 GiB", "10"],
  ["Free:", "50.6 GiB", "86"],
];

function bar(pct: number, width = 10) {
  const filled = Math.round((pct / 100) * width);
  return "⡇".repeat(filled) + "·".repeat(Math.max(0, width - filled));
}

/** Faux btop system monitor: cpu cores, process list, memory and net meters. */
export const BtopPanel: FC = () => {
  return (
    <div className="flex h-full flex-col font-mono text-[8.5px] leading-[1.4] text-fg-2">
      <div className="flex items-baseline justify-between text-cyan">
        <span>┌─cpu──┤menu├──┤reset├──</span>
        <span className="text-amber">20:33:14</span>
        <span>── 2000ms ─┐</span>
      </div>
      <div className="flex justify-between text-fg-1">
        <span className="pl-3">Ryzen 7 5700G</span>
        <span>3.0 GHz</span>
      </div>
      <div className="flex justify-between text-fg-3">
        <span className="pl-3">CPU</span>
        <span>1% &nbsp; 38°C</span>
      </div>
      <div className="my-0.5 space-y-[1px] text-cyan-dim">
        {[
          "⠀⢀⣠⣴⣾⣿⣿⣷⣦⣄⡀⢀⣠⣴⣾⣿⣷⣦⣄",
          "⣀⣤⣶⣿⣿⣷⣶⣤⣀⣀⣤⣶⣿⣷⣶⣤⣀⡀⠀",
          "⠀⠀⢀⣀⣤⣶⣶⣤⣀⡀⠀⢀⣠⣤⣶⣶⣤⣄⡀",
        ].map((r, i) => (
          <div key={i} className="truncate">
            {r}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-x-2 text-[8px] text-fg-3">
        {CORES.map((row, i) => (
          <div key={i} className="contents">
            <span>
              {row[0]} <span className="text-cyan-dim">{row[1]}</span>
            </span>
            <span>
              {row[2]} <span className="text-cyan-dim">{row[3]}</span>
            </span>
            <span>
              {row[4]} <span className="text-cyan-dim">{row[5]}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-1 flex items-baseline justify-between text-cyan">
        <span>┌─proc──┤filter├──┤tree├──</span>
        <span className="text-fg-1">cpu lazy</span>
      </div>
      <div className="flex justify-between text-amber">
        <span className="pl-3">Pid Program User: MemB</span>
        <span>Cpu%↑</span>
      </div>
      <div className="space-y-[1px]">
        {PROCS.map(([pid, name, mem, cpu], i) => (
          <div key={i} className="flex justify-between">
            <span className="pl-3">
              <span className="text-fg-4">{pid}</span>{" "}
              <span className="text-fg-1">{name}</span>{" "}
              <span className="text-fg-3">regn</span>
            </span>
            <span>
              {mem} &nbsp;<span className="text-cyan-dim">{cpu}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-1 text-cyan">┌─mem──────┤disks├─┐</div>
      <div className="space-y-[1px]">
        {MEM.map(([k, v, pct], i) => (
          <div key={i} className="flex items-baseline justify-between pl-3">
            <span className="text-fg-1">{k}</span>
            <span className="flex items-baseline gap-1">
              {pct && <span className="text-cyan-dim">{bar(Number(pct))}</span>}
              <span>{v}</span>
              {pct && <span className="text-fg-3">{pct}%</span>}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-1 flex items-baseline justify-between text-cyan">
        <span>┌─net──┤auto├─ enp42s0 ─┐</span>
      </div>
      <div className="flex justify-between pl-3">
        <span className="text-amber">▼ 30 Byte/s</span>
        <span className="text-fg-3">download</span>
      </div>
      <div className="flex justify-between pl-3">
        <span className="text-cyan">▲ 21 Byte/s</span>
        <span className="text-fg-3">upload</span>
      </div>
    </div>
  );
};
