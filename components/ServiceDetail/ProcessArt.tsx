"use client";

import { useId } from "react";
import useInView from "@/hooks/useInView";
import styles from "./ProcessArt.module.css";

/**
 * Ilustrasi isometrik line-art (garis putih, arsiran, gerak halus) untuk tiap tahap "How we work".
 * - discover: tumpukan dokumen + kaca pembesar yang memindai + gelombang sinyal
 * - sketch:   panel layar datar, wireframe tergambar, kartu mengambang
 * - build:    kubus-kubus turun dan tersusun di atas papan
 * - launch:   kotak paket, tutup terangkat, kubus kecil naik + gelombang
 * Animasi hanya jalan saat terlihat di layar.
 */

export type ArtKind = "discover" | "sketch" | "build" | "launch";

const W = 320;
const H = 220;

/* ---------- Helper isometrik ---------- */
const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;

type Origin = { ox: number; oy: number };

/** Titik 3D (x, y, z) → titik layar */
const iso = (o: Origin, x: number, y: number, z: number) =>
  `${(o.ox + (x - y) * COS).toFixed(1)},${(o.oy + (x + y) * SIN - z).toFixed(1)}`;

const poly = (o: Origin, pts: [number, number, number][]) => pts.map(([x, y, z]) => iso(o, x, y, z)).join(" ");

type BoxProps = {
  o: Origin;
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  hatch: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

/** Balok isometrik: atas (polos), sisi kiri (arsir), sisi kanan (gelap) */
function Box({ o, x, y, z, w, d, h, hatch, className, style, children }: BoxProps) {
  const t = z + h;
  return (
    <g className={className} style={style}>
      {/* sisi kiri (menghadap +y) */}
      <polygon
        className={styles.faceLeft}
        fill={`url(#${hatch})`}
        points={poly(o, [
          [x, y + d, t],
          [x + w, y + d, t],
          [x + w, y + d, z],
          [x, y + d, z],
        ])}
      />
      {/* sisi kanan (menghadap +x) */}
      <polygon
        className={styles.faceRight}
        points={poly(o, [
          [x + w, y, t],
          [x + w, y + d, t],
          [x + w, y + d, z],
          [x + w, y, z],
        ])}
      />
      {/* atas */}
      <polygon
        className={styles.faceTop}
        points={poly(o, [
          [x, y, t],
          [x + w, y, t],
          [x + w, y + d, t],
          [x, y + d, t],
        ])}
      />
      {children}
    </g>
  );
}

/** Garis di permukaan atas (mis. baris teks) */
function TopLine({ o, x1, x2, y, z, className }: { o: Origin; x1: number; x2: number; y: number; z: number; className?: string }) {
  return <polyline className={className ?? styles.detail} points={poly(o, [[x1, y, z], [x2, y, z]])} />;
}

/** Gelombang sinyal ")))" */
function Waves({ x, y, flip = false, rotate = 0 }: { x: number; y: number; flip?: boolean; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${flip ? -1 : 1} 1)`}>
      {[8, 14, 20].map((r, i) => (
        <path
          key={r}
          className={styles.wave}
          style={{ animationDelay: `${i * 0.25}s` }}
          d={`M ${r * 0.5} ${-r * 0.87} A ${r} ${r} 0 0 1 ${r * 0.5} ${r * 0.87}`}
        />
      ))}
    </g>
  );
}

/** Latar: grid isometrik tipis */
function Backdrop({ o }: { o: Origin }) {
  const lines = [];
  for (let i = -200; i <= 400; i += 40) {
    lines.push(<polyline key={`a${i}`} points={poly(o, [[i, -300, 0], [i, 400, 0]])} />);
    lines.push(<polyline key={`b${i}`} points={poly(o, [[-300, i, 0], [400, i, 0]])} />);
  }
  return <g className={styles.grid}>{lines}</g>;
}

/* ---------- Scene ---------- */

function Discover({ hatch }: { hatch: string }) {
  const o = { ox: 130, oy: 62 };
  return (
    <>
      <Backdrop o={{ ox: 160, oy: 40 }} />
      {/* Tumpukan dokumen */}
      <Box o={o} x={0} y={0} z={0} w={110} d={80} h={6} hatch={hatch} />
      <Box o={o} x={6} y={-4} z={6} w={110} d={80} h={6} hatch={hatch} />
      <Box o={o} x={12} y={-8} z={12} w={110} d={80} h={6} hatch={hatch}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <TopLine key={i} o={o} x1={24} x2={i % 2 ? 86 : 106} y={2 + i * 11} z={18} />
        ))}
      </Box>

      {/* Kaca pembesar yang memindai dokumen */}
      <g className={styles.magnifier}>
        <circle cx="0" cy="0" r="20" className={styles.lensGlass} />
        <circle cx="0" cy="0" r="20" className={styles.stroke} />
        <circle cx="0" cy="0" r="14" className={styles.detail} />
        <line x1="14" y1="14" x2="30" y2="30" className={styles.handle} />
      </g>
      {/* Gelombang sinyal */}
      <Waves x={268} y={58} />
    </>
  );
}

function Sketch({ hatch }: { hatch: string }) {
  const o = { ox: 120, oy: 70 };
  // Wireframe di atas panel
  const frames = [
    { x: 10, y: 8, w: 140, d: 12 },
    { x: 10, y: 28, w: 86, d: 40 },
    { x: 104, y: 28, w: 46, d: 40 },
    { x: 10, y: 76, w: 66, d: 18 },
    { x: 84, y: 76, w: 66, d: 18 },
  ];
  const fz = 8;
  return (
    <>
      <Backdrop o={{ ox: 160, oy: 40 }} />
      <Box o={o} x={0} y={0} z={0} w={160} d={104} h={8} hatch={hatch}>
        {frames.map((f, i) => (
          <polygon
            key={i}
            className={styles.wire}
            style={{ animationDelay: `${i * 0.4}s` } as React.CSSProperties}
            pathLength={100}
            points={poly(o, [
              [f.x, f.y, fz],
              [f.x + f.w, f.y, fz],
              [f.x + f.w, f.y + f.d, fz],
              [f.x, f.y + f.d, fz],
            ])}
          />
        ))}
      </Box>

      {/* Kartu kecil mengambang di atas panel */}
      <g className={styles.float}>
        <Box o={{ ox: 238, oy: 34 }} x={0} y={0} z={0} w={44} d={30} h={4} hatch={hatch}>
          <TopLine o={{ ox: 238, oy: 34 }} x1={8} x2={34} y={10} z={4} />
          <TopLine o={{ ox: 238, oy: 34 }} x1={8} x2={24} y={18} z={4} />
        </Box>
      </g>
      <Waves x={58} y={150} flip rotate={20} />
    </>
  );
}

function Build({ hatch }: { hatch: string }) {
  const o = { ox: 160, oy: 66 };
  const size = 28;
  const gap = 8;
  const cubes: { x: number; y: number; order: number }[] = [];
  let order = 0;
  for (let gy = 0; gy < 3; gy++) {
    for (let gx = 0; gx < 3; gx++) {
      cubes.push({ x: 10 + gx * (size + gap), y: 10 + gy * (size + gap), order: order++ });
    }
  }
  // Gambar dari belakang ke depan supaya tumpang-tindihnya benar
  cubes.sort((a, b) => a.x + a.y - (b.x + b.y));

  return (
    <>
      <Backdrop o={{ ox: 160, oy: 40 }} />
      <Box o={o} x={0} y={0} z={0} w={118} d={118} h={6} hatch={hatch} />
      {cubes.map((c) => (
        <Box
          key={`${c.x}-${c.y}`}
          o={o}
          x={c.x}
          y={c.y}
          z={6}
          w={size}
          d={size}
          h={size * 0.6}
          hatch={hatch}
          className={styles.cube}
          style={{ animationDelay: `${c.order * 0.22}s` }}
        />
      ))}
      <Waves x={44} y={70} flip />
      <Waves x={276} y={70} />
    </>
  );
}

function Launch({ hatch }: { hatch: string }) {
  const o = { ox: 160, oy: 118 };
  return (
    <>
      <Backdrop o={{ ox: 160, oy: 40 }} />
      {/* Bayangan di lantai */}
      <polygon className={styles.shadow} points={poly(o, [[-10, -10, 0], [80, -10, 0], [80, 80, 0], [-10, 80, 0]])} />
      {/* Badan kotak */}
      <Box o={o} x={0} y={0} z={0} w={70} d={70} h={44} hatch={hatch} />
      {/* Kubus kecil naik keluar dari paket — digambar sebelum tutup */}
      <g className={styles.rise}>
        <Box o={o} x={22} y={22} z={30} w={26} d={26} h={18} hatch={hatch} />
      </g>
      {/* Tutup yang terangkat */}
      <g className={styles.lid}>
        <Box o={o} x={-4} y={-4} z={44} w={78} d={78} h={8} hatch={hatch}>
          <TopLine o={o} x1={-4} x2={74} y={35} z={52} />
        </Box>
      </g>
      <Waves x={96} y={98} flip />
      <Waves x={224} y={98} />
    </>
  );
}

const SCENES: Record<ArtKind, (p: { hatch: string }) => React.ReactElement> = {
  discover: Discover,
  sketch: Sketch,
  build: Build,
  launch: Launch,
};

export default function ProcessArt({ kind }: { kind: ArtKind }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.1, false);
  const hatch = `hatch-${useId().replace(/:/g, "")}`;
  const Scene = SCENES[kind];

  return (
    <div ref={ref} className={`${styles.art} ${inView ? styles.running : ""}`} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`}>
        <defs>
          {/* Arsiran diagonal untuk sisi kiri balok */}
          <pattern id={hatch} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(60)">
            <rect width="5" height="5" fill="#101010" />
            <line x1="0" y1="0" x2="0" y2="5" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          </pattern>
        </defs>
        <Scene hatch={hatch} />
      </svg>
    </div>
  );
}
