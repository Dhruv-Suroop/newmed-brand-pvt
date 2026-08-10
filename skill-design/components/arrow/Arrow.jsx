import React from "react";

/* THE ARROW — the core container shape of the NewMed Skills identity.
   Geometry is taken verbatim from the brand's master SVGs (assets/arrow/):
   corner radius = 10% of height, point length = 42.6% of height.
   The radius/point proportions are FIXED — only color may change. */

const M = 165.88; // master height of the PowerPoint arrow parts

export function arrowPathD(W, H, opts = {}) {
  const { notch = false } = opts;
  const s = H / M;
  const r = 16.59 * s, P = 70.59 * s;
  const x0 = Math.max(W - P, notch ? 6 : r);
  const pt = `c ${7.82*s} 0 ${15.19*s} ${3.68*s} ${19.89*s} ${9.93*s} l ${47.37*s} ${63.04*s} c ${4.44*s} ${5.9*s} ${4.44*s} ${14.03*s} 0 ${19.93*s} l ${-47.37*s} ${63.04*s} c ${-4.7*s} ${6.25*s} ${-12.07*s} ${9.93*s} ${-19.89*s} ${9.93*s}`;
  if (notch) {
    const nt = `c ${7.82*s} 0 ${15.19*s} ${-3.68*s} ${19.89*s} ${-9.93*s} l ${47.37*s} ${-63.04*s} c ${4.44*s} ${-5.9*s} ${4.44*s} ${-14.03*s} 0 ${-19.93*s} l ${-47.37*s} ${-63.04*s} c ${-4.7*s} ${-6.25*s} ${-12.07*s} ${-9.93*s} ${-19.89*s} ${-9.93*s}`;
    return `M 0 0 H ${x0} ${pt} H 0 ${nt} Z`;
  }
  return `M ${r} 0 H ${x0} ${pt} H ${r} c ${-9.16*s} 0 ${-16.59*s} ${-7.43*s} ${-16.59*s} ${-16.59*s} V ${r} c 0 ${-9.16*s} ${7.43*s} ${-16.59*s} ${16.59*s} ${-16.59*s} Z`;
}

const FILLS = {
  orange: "var(--brand-primary)",
  yellow: "var(--nm-yellow)",
  cream: "var(--nm-cream-2)",
  white: "var(--color-bg-raised)",
  ink: "var(--nm-ink)",
  maroon: "var(--nm-maroon)",
};

let gseq = 0;

/**
 * The brand arrow as a stretchable container. Wraps any content; the shape
 * resizes with the content while keeping the master radius/point proportions.
 */
export function Arrow({
  children, fill = "orange", outline = false, stroke = "var(--brand-primary)",
  strokeWidth = 2, notch = false, opacity = 1,
  style = {}, contentStyle = {}, ...rest
}) {
  const ref = React.useRef(null);
  const [sz, setSz] = React.useState(null);
  const idRef = React.useRef(null);
  if (idRef.current === null) idRef.current = "nmsg" + (++gseq);
  React.useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const upd = () => setSz({ w: el.offsetWidth, h: el.offsetHeight });
    upd();
    const ro = new ResizeObserver(upd);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const H = sz ? sz.h : 0, W = sz ? sz.w : 0;
  const P = H ? H * (70.59 / M) : 16;
  const R = H ? H * (16.59 / M) : 8;
  const isGrad = fill === "sunset";
  const fillVal = isGrad ? `url(#${idRef.current})` : (FILLS[fill] || fill);
  const { padding: cPad, ...cRest } = contentStyle || {};
  const cPadObj = cPad !== undefined ? { paddingTop: cPad, paddingRight: cPad, paddingBottom: cPad, paddingLeft: cPad } : {};
  return (
    <span ref={ref} style={{ position: "relative", display: "inline-flex", alignItems: "stretch", verticalAlign: "middle", ...style }} {...rest}>
      {sz && W > 4 && H > 4 && (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" style={{ position: "absolute", inset: 0, display: "block", opacity }}>
          {isGrad && (
            <defs>
              <linearGradient id={idRef.current} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#ff9d00" />
                <stop offset="1" stopColor="#ff5122" />
              </linearGradient>
            </defs>
          )}
          {outline
            ? <path d={arrowPathD(W - strokeWidth, H - strokeWidth, { notch })} transform={`translate(${strokeWidth / 2} ${strokeWidth / 2})`} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
            : <path d={arrowPathD(W, H, { notch })} fill={fillVal} />}
        </svg>
      )}
      <span style={{
        position: "relative", display: "inline-flex", alignItems: "center", gap: "0.5em",
        paddingTop: "0.42em", paddingBottom: "0.42em",
        paddingRight: Math.round(P + 4), paddingLeft: Math.round(notch ? P + 4 : Math.max(R, 8) + 8),
        minWidth: 0, overflow: "hidden", ...cPadObj, ...cRest,
      }}>
        {children}
      </span>
    </span>
  );
}

/**
 * Cutout portrait clipped INTO the arrow: the image is clipped to the arrow shape
 * at the bottom/sides while the subject's head juts out above the arrow's top edge.
 */
export function ArrowPortrait({ src, width = 520, height = 400, jut = 0.32, fill = "orange", imgScale = 1.15, imgShift = 0, alt = "", style = {} }) {
  const idRef = React.useRef(null);
  if (idRef.current === null) idRef.current = "nmsp" + (++gseq);
  const J = Math.round(height * jut), total = height + J;
  const s = height / M, r = 16.59 * s, P = 70.59 * s;
  const frameH = total * imgScale, frameW = width * imgScale;
  const fx = (width - frameW) / 2 + imgShift, fy = 0; /* anchor TOP — crop removes legs, never the head */
  const isGrad = fill === "sunset";
  const fillVal = isGrad ? `url(#${idRef.current}g)` : (FILLS[fill] || fill);
  const d = arrowPathD(width, height);
  return (
    <span style={{ display: "inline-block", width, height: total, position: "relative", ...style }}>
      <svg width={width} height={total} viewBox={`0 0 ${width} ${total}`} style={{ display: "block" }} role="img" aria-label={alt}>
        {isGrad && (
          <defs>
            <linearGradient id={idRef.current + "g"} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ff9d00" />
              <stop offset="1" stopColor="#ff5122" />
            </linearGradient>
          </defs>
        )}
        <path d={d} transform={`translate(0 ${J})`} fill={fillVal} />
        <clipPath id={idRef.current}>
          <path d={d} transform={`translate(0 ${J})`} />
          {/* top half is NEVER clipped — only the bottom half clips to the arrow shape */}
          <rect x="0" y="0" width={width} height={J + height * 0.5} />
        </clipPath>
        <image href={src} x={fx} y={fy} width={frameW} height={frameH} preserveAspectRatio="xMidYMin slice" clipPath={`url(#${idRef.current})`} />
      </svg>
    </span>
  );
}
export function ArrowIcon({ children, size = 44, fill = "orange", outline = false, stroke = "var(--brand-primary)", strokeWidth = 2, style = {}, contentStyle = {} }) {
  const isNum = typeof size === "number";
  const H = isNum ? size : 800, s = H / 800, W = Math.ceil(881 * s);
  const idRef = React.useRef(null);
  if (idRef.current === null) idRef.current = "nmsi" + (++gseq);
  const isGrad = fill === "sunset";
  const fillVal = isGrad ? `url(#${idRef.current})` : (FILLS[fill] || fill);
  const d = `M ${864.19*s} ${448.06*s} l ${-228.46*s} ${304.03*s} c ${-22.67*s} ${30.16*s} ${-58.2*s} ${47.91*s} ${-95.93*s} ${47.91*s} H ${80*s} c ${-44.18*s} 0 ${-80*s} ${-35.82*s} ${-80*s} ${-80*s} V ${80*s} c 0 ${-44.18*s} ${35.82*s} ${-80*s} ${80*s} ${-80*s} h ${459.8*s} c ${37.73*s} 0 ${73.27*s} ${17.75*s} ${95.93*s} ${47.91*s} l ${228.46*s} ${304.03*s} c ${21.39*s} ${28.47*s} ${21.39*s} ${67.65*s} 0 ${96.12*s} Z`;
  return (
    <span style={{ position: "relative", display: "inline-flex", flexShrink: 0, width: isNum ? W : "auto", height: isNum ? H : size, aspectRatio: "881 / 800", ...style }}>
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%" }}>
        {isGrad && (
          <defs>
            <linearGradient id={idRef.current} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ff9d00" />
              <stop offset="1" stopColor="#ff5122" />
            </linearGradient>
          </defs>
        )}
        {outline
          ? <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} transform={`translate(${strokeWidth/2} ${strokeWidth/2}) scale(${(H-strokeWidth)/H})`} />
          : <path d={d} fill={fillVal} />}
      </svg>
      <span style={{
        position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
        width: `${(620 / 881) * 100}%`, height: "100%", color: outline ? stroke : "#fff", ...contentStyle,
      }}>
        {children}
      </span>
    </span>
  );
}
