/* @ds-bundle: {"format":4,"namespace":"NewMedSkillsDesignSystem_cd1078","components":[{"name":"Arrow","sourcePath":"components/arrow/Arrow.jsx"},{"name":"ArrowPortrait","sourcePath":"components/arrow/Arrow.jsx"},{"name":"ArrowIcon","sourcePath":"components/arrow/Arrow.jsx"},{"name":"ArrowBadge","sourcePath":"components/arrow/ArrowBadge.jsx"},{"name":"ArrowButton","sourcePath":"components/arrow/ArrowButton.jsx"},{"name":"ArrowHighlight","sourcePath":"components/arrow/ArrowHighlight.jsx"},{"name":"ArrowList","sourcePath":"components/arrow/ArrowList.jsx"},{"name":"Eyebrow","sourcePath":"components/brand/Eyebrow.jsx"},{"name":"Symbol","sourcePath":"components/brand/Logo.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Orb","sourcePath":"components/brand/Orb.jsx"},{"name":"StepFlow","sourcePath":"components/brand/StepFlow.jsx"},{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data/Badge.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"Stat","sourcePath":"components/data/Stat.jsx"},{"name":"Tag","sourcePath":"components/data/Tag.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"}],"sourceHashes":{"components/arrow/Arrow.jsx":"feef26cab2a1","components/arrow/ArrowBadge.jsx":"1b029cdd864f","components/arrow/ArrowButton.jsx":"3ad12894a687","components/arrow/ArrowHighlight.jsx":"a4013d05cc83","components/arrow/ArrowList.jsx":"2a5f29938094","components/brand/Eyebrow.jsx":"da7ef5e871fe","components/brand/Logo.jsx":"1a2810c44d57","components/brand/Orb.jsx":"9fcd2ddf1fa0","components/brand/StepFlow.jsx":"927cbd05b75b","components/data/Avatar.jsx":"e88d8ecae89b","components/data/Badge.jsx":"1552071e565b","components/data/Card.jsx":"3895eb03e61b","components/data/ProgressBar.jsx":"2d513003273e","components/data/Stat.jsx":"35bf88dbf48a","components/data/Tag.jsx":"4eeffa7de540","components/forms/Button.jsx":"3c7a8342c6a2","components/forms/Checkbox.jsx":"72cc07e603ea","components/forms/IconButton.jsx":"7d0810af6dc2","components/forms/Input.jsx":"342e4c01de1c","components/forms/Radio.jsx":"6231aa6e8ed1","components/forms/Select.jsx":"c32cb8955192","components/forms/Switch.jsx":"b7356d853ae2","marketing/image-slot.js":"d797f41b7d66","ui_kits/hospital-portal/PortalApp.jsx":"4e20bf8992ea","ui_kits/marketing-site/MarketingApp.jsx":"5aa9e8f681fa"},"inlinedExternals":[],"unexposedExports":[{"name":"arrowPathD","sourcePath":"components/arrow/Arrow.jsx"}]} */

(() => {

const __ds_ns = (window.NewMedSkillsDesignSystem_cd1078 = window.NewMedSkillsDesignSystem_cd1078 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/arrow/Arrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* THE ARROW — the core container shape of the NewMed Skills identity.
   Geometry is taken verbatim from the brand's master SVGs (assets/arrow/):
   corner radius = 10% of height, point length = 42.6% of height.
   The radius/point proportions are FIXED — only color may change. */

const M = 165.88; // master height of the PowerPoint arrow parts

function arrowPathD(W, H, opts = {}) {
  const {
    notch = false
  } = opts;
  const s = H / M;
  const r = 16.59 * s,
    P = 70.59 * s;
  const x0 = Math.max(W - P, notch ? 6 : r);
  const pt = `c ${7.82 * s} 0 ${15.19 * s} ${3.68 * s} ${19.89 * s} ${9.93 * s} l ${47.37 * s} ${63.04 * s} c ${4.44 * s} ${5.9 * s} ${4.44 * s} ${14.03 * s} 0 ${19.93 * s} l ${-47.37 * s} ${63.04 * s} c ${-4.7 * s} ${6.25 * s} ${-12.07 * s} ${9.93 * s} ${-19.89 * s} ${9.93 * s}`;
  if (notch) {
    const nt = `c ${7.82 * s} 0 ${15.19 * s} ${-3.68 * s} ${19.89 * s} ${-9.93 * s} l ${47.37 * s} ${-63.04 * s} c ${4.44 * s} ${-5.9 * s} ${4.44 * s} ${-14.03 * s} 0 ${-19.93 * s} l ${-47.37 * s} ${-63.04 * s} c ${-4.7 * s} ${-6.25 * s} ${-12.07 * s} ${-9.93 * s} ${-19.89 * s} ${-9.93 * s}`;
    return `M 0 0 H ${x0} ${pt} H 0 ${nt} Z`;
  }
  return `M ${r} 0 H ${x0} ${pt} H ${r} c ${-9.16 * s} 0 ${-16.59 * s} ${-7.43 * s} ${-16.59 * s} ${-16.59 * s} V ${r} c 0 ${-9.16 * s} ${7.43 * s} ${-16.59 * s} ${16.59 * s} ${-16.59 * s} Z`;
}
const FILLS = {
  coral: "var(--brand-primary)",
  amber: "var(--nm-amber)",
  cream: "var(--nm-cream-2)",
  white: "var(--color-bg-raised)",
  ink: "var(--nm-ink)",
  maroon: "var(--nm-maroon)"
};
let gseq = 0;

/**
 * The brand arrow as a stretchable container. Wraps any content; the shape
 * resizes with the content while keeping the master radius/point proportions.
 */
function Arrow({
  children,
  fill = "coral",
  outline = false,
  stroke = "var(--brand-primary)",
  strokeWidth = 2,
  notch = false,
  opacity = 1,
  style = {},
  contentStyle = {},
  ...rest
}) {
  const ref = React.useRef(null);
  const [sz, setSz] = React.useState(null);
  const idRef = React.useRef(null);
  if (idRef.current === null) idRef.current = "nmsg" + ++gseq;
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const upd = () => setSz({
      w: el.offsetWidth,
      h: el.offsetHeight
    });
    upd();
    const ro = new ResizeObserver(upd);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const H = sz ? sz.h : 0,
    W = sz ? sz.w : 0;
  const P = H ? H * (70.59 / M) : 16;
  const R = H ? H * (16.59 / M) : 8;
  const isGrad = fill === "sunset";
  const fillVal = isGrad ? `url(#${idRef.current})` : FILLS[fill] || fill;
  const {
    padding: cPad,
    ...cRest
  } = contentStyle || {};
  const cPadObj = cPad !== undefined ? {
    paddingTop: cPad,
    paddingRight: cPad,
    paddingBottom: cPad,
    paddingLeft: cPad
  } : {};
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: ref,
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "stretch",
      verticalAlign: "middle",
      ...style
    }
  }, rest), sz && W > 4 && H > 4 && /*#__PURE__*/React.createElement("svg", {
    width: W,
    height: H,
    viewBox: `0 0 ${W} ${H}`,
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      display: "block",
      opacity
    }
  }, isGrad && /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: idRef.current,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#ff9d00"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#ff5122"
  }))), outline ? /*#__PURE__*/React.createElement("path", {
    d: arrowPathD(W - strokeWidth, H - strokeWidth, {
      notch
    }),
    transform: `translate(${strokeWidth / 2} ${strokeWidth / 2})`,
    fill: "none",
    stroke: stroke,
    strokeWidth: strokeWidth
  }) : /*#__PURE__*/React.createElement("path", {
    d: arrowPathD(W, H, {
      notch
    }),
    fill: fillVal
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5em",
      paddingTop: "0.42em",
      paddingBottom: "0.42em",
      paddingRight: Math.round(P + 4),
      paddingLeft: Math.round(notch ? P + 4 : Math.max(R, 8) + 8),
      minWidth: 0,
      overflow: "hidden",
      ...cPadObj,
      ...cRest
    }
  }, children));
}

/**
 * Cutout portrait clipped INTO the arrow: the image is clipped to the arrow shape
 * at the bottom/sides while the subject's head juts out above the arrow's top edge.
 */
function ArrowPortrait({
  src,
  width = 520,
  height = 400,
  jut = 0.32,
  fill = "coral",
  imgScale = 1.15,
  imgShift = 0,
  alt = "",
  style = {}
}) {
  const idRef = React.useRef(null);
  if (idRef.current === null) idRef.current = "nmsp" + ++gseq;
  const J = Math.round(height * jut),
    total = height + J;
  const s = height / M,
    r = 16.59 * s,
    P = 70.59 * s;
  const frameH = total * imgScale,
    frameW = width * imgScale;
  const fx = (width - frameW) / 2 + imgShift,
    fy = 0; /* anchor TOP — crop removes legs, never the head */
  const isGrad = fill === "sunset";
  const fillVal = isGrad ? `url(#${idRef.current}g)` : FILLS[fill] || fill;
  const d = arrowPathD(width, height);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width,
      height: total,
      position: "relative",
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: total,
    viewBox: `0 0 ${width} ${total}`,
    style: {
      display: "block"
    },
    role: "img",
    "aria-label": alt
  }, isGrad && /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: idRef.current + "g",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#ff9d00"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#ff5122"
  }))), /*#__PURE__*/React.createElement("path", {
    d: d,
    transform: `translate(0 ${J})`,
    fill: fillVal
  }), /*#__PURE__*/React.createElement("clipPath", {
    id: idRef.current
  }, /*#__PURE__*/React.createElement("path", {
    d: d,
    transform: `translate(0 ${J})`
  }), /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: width,
    height: J + height * 0.5
  })), /*#__PURE__*/React.createElement("image", {
    href: src,
    x: fx,
    y: fy,
    width: frameW,
    height: frameH,
    preserveAspectRatio: "xMidYMin slice",
    clipPath: `url(#${idRef.current})`
  })));
}
function ArrowIcon({
  children,
  size = 44,
  fill = "coral",
  outline = false,
  stroke = "var(--brand-primary)",
  strokeWidth = 2,
  style = {},
  contentStyle = {}
}) {
  const isNum = typeof size === "number";
  const H = isNum ? size : 800,
    s = H / 800,
    W = Math.ceil(881 * s);
  const idRef = React.useRef(null);
  if (idRef.current === null) idRef.current = "nmsi" + ++gseq;
  const isGrad = fill === "sunset";
  const fillVal = isGrad ? `url(#${idRef.current})` : FILLS[fill] || fill;
  const d = `M ${864.19 * s} ${448.06 * s} l ${-228.46 * s} ${304.03 * s} c ${-22.67 * s} ${30.16 * s} ${-58.2 * s} ${47.91 * s} ${-95.93 * s} ${47.91 * s} H ${80 * s} c ${-44.18 * s} 0 ${-80 * s} ${-35.82 * s} ${-80 * s} ${-80 * s} V ${80 * s} c 0 ${-44.18 * s} ${35.82 * s} ${-80 * s} ${80 * s} ${-80 * s} h ${459.8 * s} c ${37.73 * s} 0 ${73.27 * s} ${17.75 * s} ${95.93 * s} ${47.91 * s} l ${228.46 * s} ${304.03 * s} c ${21.39 * s} ${28.47 * s} ${21.39 * s} ${67.65 * s} 0 ${96.12 * s} Z`;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      flexShrink: 0,
      width: isNum ? W : "auto",
      height: isNum ? H : size,
      aspectRatio: "881 / 800",
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      display: "block",
      width: "100%",
      height: "100%"
    }
  }, isGrad && /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: idRef.current,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#ff9d00"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#ff5122"
  }))), outline ? /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: stroke,
    strokeWidth: strokeWidth,
    transform: `translate(${strokeWidth / 2} ${strokeWidth / 2}) scale(${(H - strokeWidth) / H})`
  }) : /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: fillVal
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: `${620 / 881 * 100}%`,
      height: "100%",
      color: outline ? stroke : "#fff",
      ...contentStyle
    }
  }, children));
}
Object.assign(__ds_scope, { arrowPathD, Arrow, ArrowPortrait, ArrowIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/arrow/Arrow.jsx", error: String((e && e.message) || e) }); }

// components/arrow/ArrowBadge.jsx
try { (() => {
/**
 * Eyebrow badge — the outline arrow tag, optionally led by a solid arrow icon chip.
 * ("Healthcare Workforce Readiness")
 */
function ArrowBadge({
  children,
  icon = null,
  size = 36,
  color = "var(--brand-primary)",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.ArrowIcon, {
    size: size,
    fill: "coral",
    contentStyle: {
      fontSize: size * 0.42
    }
  }, icon), /*#__PURE__*/React.createElement(__ds_scope.Arrow, {
    outline: true,
    stroke: color,
    strokeWidth: 1.5,
    contentStyle: {
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: size
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: size * 0.44,
      color,
      whiteSpace: "nowrap"
    }
  }, children)));
}
Object.assign(__ds_scope, { ArrowBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/arrow/ArrowBadge.jsx", error: String((e && e.message) || e) }); }

// components/arrow/ArrowButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Arrow-shaped CTA — the brand's primary button shape ("Partner with us",
 * "Book a workforce discussion"). Calm hover darken, tiny press scale.
 */
function ArrowButton({
  children,
  fill = "coral",
  color = "#fff",
  outline = false,
  size = "md",
  disabled = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const fs = {
    sm: 13.5,
    md: 15,
    lg: 17
  }[size] || 15;
  const pv = {
    sm: 8,
    md: 12,
    lg: 16
  }[size] || 12;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      border: "none",
      background: "none",
      padding: 0,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      display: "inline-flex",
      filter: hover && !disabled ? "brightness(0.94)" : "none",
      transform: press && !disabled ? "scale(0.98)" : "scale(1)",
      transition: "filter var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Arrow, {
    fill: fill,
    outline: outline,
    contentStyle: {
      paddingTop: pv,
      paddingBottom: pv
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: fs,
      lineHeight: 1,
      color: outline ? "var(--brand-primary)" : color,
      whiteSpace: "nowrap"
    }
  }, children)));
}
Object.assign(__ds_scope, { ArrowButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/arrow/ArrowButton.jsx", error: String((e && e.message) || e) }); }

// components/arrow/ArrowHighlight.jsx
try { (() => {
/**
 * Inline arrow text highlight — the "Workforce-Ready" treatment.
 * Wrap the key word(s) of a headline; inherits the heading's font size/weight.
 */
function ArrowHighlight({
  children,
  fill = "sunset",
  color = "#fff",
  icon = null,
  style = {},
  contentStyle = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 0,
      verticalAlign: "baseline",
      transform: "translateY(0.08em)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Arrow, {
    fill: fill,
    contentStyle: {
      paddingTop: "0.08em",
      paddingRight: "0.62em",
      paddingBottom: "0.14em",
      paddingLeft: "0.34em",
      ...contentStyle
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color,
      whiteSpace: "nowrap"
    }
  }, children)), icon && /*#__PURE__*/React.createElement(__ds_scope.ArrowIcon, {
    size: "1.16em",
    fill: fill === "sunset" ? "coral" : fill,
    style: {
      marginLeft: "-2px"
    },
    contentStyle: {
      fontSize: "0.72em"
    }
  }, icon));
}
Object.assign(__ds_scope, { ArrowHighlight });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/arrow/ArrowHighlight.jsx", error: String((e && e.message) || e) }); }

// components/arrow/ArrowList.jsx
try { (() => {
/**
 * Numbered arrow list — solid arrow chips with numbers, cream arrow rows with text.
 * (The "Schedule / Launch / Request" next-steps pattern.)
 */
function ArrowList({
  items = [],
  size = 64,
  tone = "cream",
  textColor = "var(--brand-primary)",
  numbered = true,
  gap = 18,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap,
      ...style
    }
  }, items.map((item, i) => {
    const text = typeof item === "string" ? item : item.text;
    const glyph = typeof item === "object" && item.icon ? item.icon : numbered ? i + 1 : null;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14
      }
    }, glyph !== null && /*#__PURE__*/React.createElement(__ds_scope.ArrowIcon, {
      size: size,
      contentStyle: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: size * 0.5
      }
    }, glyph), /*#__PURE__*/React.createElement(__ds_scope.Arrow, {
      fill: tone,
      style: {
        flex: 1
      },
      contentStyle: {
        paddingTop: 0,
        paddingBottom: 0,
        minHeight: size,
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: size * 0.33,
        color: textColor,
        paddingLeft: size * 0.2
      }
    }, text)));
  }));
}
Object.assign(__ds_scope, { ArrowList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/arrow/ArrowList.jsx", error: String((e && e.message) || e) }); }

// components/brand/Eyebrow.jsx
try { (() => {
/** ALL-CAPS eyebrow label. The brand's small section kicker. */
function Eyebrow({
  children,
  color = "var(--brand-primary)",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-eyebrow)",
      fontWeight: 700,
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      color,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
const SYMBOL_PATH = "M202.06,29.68c-4.41-12.14-14.04-21.7-26.18-26.12-10.95-3.56-21.17-3.56-41.94-3.56h-62.26c-20.7,0-30.93,0-42.01,3.43C17.47,7.85,7.91,17.48,3.49,29.61,0,40.76,0,51.05,0,71.69v62.19c0,20.77,0,30.93,3.36,42.14,4.42,12.07,14.05,21.7,26.18,26.11,11.15,3.5,21.44,3.5,42.01,3.5h62.32c20.64,0,30.93,0,42.01-3.5,12.14-4.41,21.77-13.98,26.18-26.11,3.5-11.21,3.5-21.44,3.5-42.14v-62.13c0-20.64,0-30.93-3.5-42.07ZM124.73,53c0-1.96,1.59-3.55,3.55-3.55h11.7c1.56,0,3.03.79,3.9,2.09l13.76,20.7c1.03,1.56,1.04,3.59.01,5.16l-13.53,20.67c-.86,1.32-2.34,2.11-3.92,2.11h-11.92c-1.96,0-3.55-1.58-3.55-3.54v-43.64ZM51.7,52.99c0-1.95,1.58-3.54,3.54-3.54h26.94c1.47,0,2.86.7,3.74,1.87l5.6,7.46c.95,1.26.95,2.99,0,4.25l-5.6,7.45c-.88,1.18-2.27,1.88-3.74,1.88h-26.94c-1.96,0-3.54-1.59-3.54-3.55v-15.82ZM51.7,80.82c0-1.95,1.58-3.54,3.54-3.54h47.87c1.48,0,2.87.69,3.75,1.87l5.6,7.45c.95,1.26.95,3,0,4.26l-5.6,7.45c-.88,1.18-2.27,1.87-3.75,1.87h-47.87c-1.96,0-3.54-1.58-3.54-3.54v-15.82ZM84.85,133.23l-13.83,21.11c-.75,1.15-2.02,1.84-3.39,1.84h-13.02c-1.61,0-2.91-1.31-2.91-2.92v-45.24c0-1.61,1.3-2.91,2.91-2.91h12.79c1.35,0,2.62.68,3.38,1.81l14.05,21.15c1.04,1.56,1.05,3.59.02,5.16ZM157.71,146.85l-5.6,7.46c-.89,1.17-2.27,1.87-3.75,1.87h-26.95c-1.95,0-3.54-1.59-3.54-3.54v-15.82c0-1.96,1.59-3.55,3.54-3.55h26.95c1.48,0,2.86.7,3.75,1.88l5.6,7.45c.95,1.26.95,2.99,0,4.25ZM157.71,118.68l-5.6,7.46c-.88,1.18-2.27,1.87-3.74,1.87h-47.88c-1.96,0-3.54-1.59-3.54-3.54v-15.82c0-1.96,1.58-3.54,3.54-3.54h47.88c1.47,0,2.86.69,3.74,1.87l5.6,7.45c.95,1.26.95,2.99,0,4.25Z";

/** The NewMed Skills coral symbol (chevron shards). Real brand mark, inline. */
function Symbol({
  size = 40,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: size,
      height: size,
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 205.56 205.63",
    width: size,
    height: size,
    "aria-label": "NewMed Skills symbol"
  }, /*#__PURE__*/React.createElement("path", {
    d: SYMBOL_PATH,
    fill: "var(--brand-primary)"
  })));
}

/**
 * The NewMed Skills logo. `horizontal` (symbol + wordmark), `stack`, or `symbol`.
 * Wordmark is bold "NewMed" + regular "Skills" (the fixed lockup). Always two words.
 */
function Logo({
  variant = "horizontal",
  size = 32,
  color = "var(--nm-ink)",
  style = {}
}) {
  const symbolSize = variant === "stack" ? size * 1.6 : size * 1.28;
  const wordmark = fs => /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: fs,
      lineHeight: 0.95,
      letterSpacing: "-0.02em",
      color,
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, "NewMed"), variant === "stack" ? /*#__PURE__*/React.createElement("br", null) : " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400
    }
  }, "Skills"));
  if (variant === "symbol") return /*#__PURE__*/React.createElement(Symbol, {
    size: size,
    style: style
  });
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      flexDirection: variant === "stack" ? "column" : "row",
      gap: variant === "stack" ? size * 0.4 : size * 0.5,
      ...style
    }
  }, /*#__PURE__*/React.createElement(Symbol, {
    size: symbolSize
  }), wordmark(size));
}
Object.assign(__ds_scope, { Symbol, Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/Orb.jsx
try { (() => {
/**
 * Organic gradient glow — the brand's ambient background warmth.
 * Never a hard-edged circle: layered off-center radial washes fading to
 * transparent, heavily blurred, flowing like the master gradient art.
 * Position absolutely inside a relative, overflow-hidden container.
 */
function Orb({
  tone = "coral",
  size = 420,
  intensity = 1,
  blur = 0,
  style = {}
}) {
  const layers = {
    coral: `radial-gradient(58% 52% at 38% 42%, rgba(255,81,34,0.5) 0%, rgba(255,81,34,0) 70%),
      radial-gradient(52% 58% at 66% 68%, rgba(255,157,0,0.42) 0%, rgba(255,157,0,0) 72%),
      radial-gradient(46% 40% at 52% 28%, rgba(252,149,118,0.35) 0%, rgba(252,149,118,0) 70%)`,
    amber: `radial-gradient(58% 52% at 42% 46%, rgba(255,157,0,0.45) 0%, rgba(255,157,0,0) 70%),
      radial-gradient(50% 56% at 66% 62%, rgba(255,120,34,0.3) 0%, rgba(255,120,34,0) 72%),
      radial-gradient(44% 40% at 50% 30%, rgba(249,219,170,0.5) 0%, rgba(249,219,170,0) 68%)`,
    mix: `radial-gradient(56% 50% at 34% 44%, rgba(255,81,34,0.42) 0%, rgba(255,81,34,0) 70%),
      radial-gradient(52% 56% at 70% 60%, rgba(255,157,0,0.4) 0%, rgba(255,157,0,0) 72%),
      radial-gradient(60% 46% at 52% 78%, rgba(124,49,52,0.18) 0%, rgba(124,49,52,0) 70%)`
  };
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      display: "block",
      width: size,
      height: size,
      pointerEvents: "none",
      background: layers[tone] || layers.coral,
      filter: `blur(${blur || Math.max(24, size * 0.08)}px)`,
      opacity: intensity,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Orb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Orb.jsx", error: String((e && e.message) || e) }); }

// components/brand/StepFlow.jsx
try { (() => {
const DEFAULT_STEPS = ["Source", "Assess", "Develop", "Certify", "Deploy", "Retain"];

/**
 * The signature journey: arrow-shaped cards in sequence
 * (default: 01 Source → 06 Retain), as used on the deck's "Who we are" slide.
 * Cards after the first are chevron-notched so each point nests into the next.
 */
function StepFlow({
  steps = DEFAULT_STEPS,
  active = -1,
  tone = "white",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "stretch",
      gap: 6,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, steps.map((label, i) => {
    const isActive = i === active;
    return /*#__PURE__*/React.createElement(__ds_scope.Arrow, {
      key: label,
      fill: isActive ? "coral" : tone,
      notch: i > 0,
      style: {
        flex: 1,
        minWidth: 0,
        filter: "drop-shadow(0 2px 6px rgba(57,30,26,0.06))"
      },
      contentStyle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 4,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: i > 0 ? 26 : 18,
        paddingRight: 22,
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.03em",
        color: isActive ? "rgba(255,255,255,0.85)" : "var(--brand-primary)"
      }
    }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "clamp(13px, 1.35vw, 17px)",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100%",
        minWidth: 0,
        color: isActive ? "#fff" : "var(--text-primary)"
      }
    }, label));
  }));
}
Object.assign(__ds_scope, { StepFlow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/StepFlow.jsx", error: String((e && e.message) || e) }); }

// components/data/Avatar.jsx
try { (() => {
const sizes = {
  sm: 32,
  md: 44,
  lg: 64
};

/** Avatar — image or initials on a warm tint. Circle by default. */
function Avatar({
  src,
  name = "",
  size = "md",
  square = false,
  style = {}
}) {
  const dim = sizes[size] || sizes.md;
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dim,
      height: dim,
      flexShrink: 0,
      overflow: "hidden",
      borderRadius: square ? "var(--radius-md)" : "50%",
      background: src ? "var(--nm-cream-2)" : "rgba(255,81,34,0.14)",
      color: "var(--brand-primary-press)",
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: dim * 0.36,
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data/Badge.jsx
try { (() => {
const tones = {
  neutral: {
    bg: "var(--nm-cream-2)",
    fg: "var(--text-primary)"
  },
  coral: {
    bg: "rgba(255,81,34,0.12)",
    fg: "var(--brand-primary-press)"
  },
  amber: {
    bg: "rgba(255,157,0,0.16)",
    fg: "#9a5b00"
  },
  teal: {
    bg: "rgba(147,204,205,0.28)",
    fg: "#3a6a6b"
  },
  success: {
    bg: "rgba(75,143,110,0.16)",
    fg: "var(--status-success)"
  },
  solid: {
    bg: "var(--brand-primary)",
    fg: "#fff"
  },
  ink: {
    bg: "var(--nm-ink)",
    fg: "var(--nm-cream)"
  }
};

/** Small status/label badge. Dot optional. */
function Badge({
  children,
  tone = "neutral",
  dot = false,
  style = {}
}) {
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-sans)",
      fontSize: 12.5,
      fontWeight: 600,
      lineHeight: 1,
      padding: "5px 10px",
      borderRadius: "var(--radius-pill)",
      background: t.bg,
      color: t.fg,
      letterSpacing: "0.01em",
      whiteSpace: "nowrap",
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "currentColor"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Surface container. White on cream, soft rounded corners, warm low shadow. */
function Card({
  children,
  padding = 24,
  interactive = false,
  elevated = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: "var(--color-bg-raised)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding,
      boxShadow: elevated ? "var(--shadow-md)" : "var(--shadow-sm)",
      transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
      ...(interactive && hover ? {
        transform: "translateY(-3px)",
        boxShadow: "var(--shadow-lg)"
      } : {}),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
/** Thin progress bar. Coral fill on cream track. Optional step labels. */
function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = false,
  style = {}
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13.5,
      color: "var(--text-secondary)"
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      color: "var(--text-primary)"
    }
  }, label), showValue && /*#__PURE__*/React.createElement("span", null, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: 999,
      background: "var(--nm-cream-2)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + "%",
      height: "100%",
      borderRadius: 999,
      background: "var(--gradient-sunrise)",
      transition: "width var(--dur-slow) var(--ease-out)"
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/Stat.jsx
try { (() => {
/** Big-number stat. Numeral does the work; label below in secondary ink. */
function Stat({
  value,
  label,
  sublabel,
  accent = false,
  align = "left",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      textAlign: align,
      fontFamily: "var(--font-sans)",
      alignItems: align === "center" ? "center" : "flex-start",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: 46,
      lineHeight: 1,
      letterSpacing: "-0.02em",
      color: accent ? "var(--brand-primary)" : "var(--text-primary)"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: "var(--text-primary)"
    }
  }, label), sublabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-secondary)",
      lineHeight: 1.4,
      maxWidth: 240
    }
  }, sublabel));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Stat.jsx", error: String((e && e.message) || e) }); }

// components/data/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Removable / selectable tag chip. Outline by default, coral when active. */
function Tag({
  children,
  active = false,
  onRemove,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      fontWeight: 500,
      lineHeight: 1,
      padding: "7px 12px",
      borderRadius: "var(--radius-pill)",
      background: active ? "var(--brand-primary)" : "var(--color-bg-raised)",
      color: active ? "#fff" : "var(--text-primary)",
      border: `1px solid ${active ? "var(--brand-primary)" : "var(--border-default)"}`,
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Remove",
    onClick: onRemove,
    style: {
      border: "none",
      background: "none",
      cursor: "pointer",
      color: "inherit",
      opacity: 0.7,
      fontSize: 14,
      padding: 0,
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    fontSize: 14,
    padding: "8px 16px",
    height: 36
  },
  md: {
    fontSize: 15,
    padding: "11px 22px",
    height: 44
  },
  lg: {
    fontSize: 17,
    padding: "15px 30px",
    height: 54
  }
};

/**
 * NewMed Skills primary action. Coral fill for the one true action per view.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const s = sizes[size] || sizes.md;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    fontSize: s.fontSize,
    lineHeight: 1,
    padding: s.padding,
    minHeight: s.height,
    width: fullWidth ? "100%" : "auto",
    border: "1px solid transparent",
    borderRadius: "var(--radius-pill)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    letterSpacing: "0.005em",
    transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-fast) var(--ease-out)"
  };
  const variants = {
    primary: {
      background: "var(--brand-primary)",
      color: "var(--text-on-brand)",
      boxShadow: "var(--shadow-coral)"
    },
    secondary: {
      background: "var(--color-bg-inverse)",
      color: "var(--text-inverse)"
    },
    outline: {
      background: "transparent",
      color: "var(--text-primary)",
      borderColor: "var(--border-strong)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-primary)"
    }
  };
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const hoverStyle = hover && !disabled ? {
    primary: {
      background: "var(--brand-primary-hover)"
    },
    secondary: {
      background: "#26140f"
    },
    outline: {
      background: "rgba(57,30,26,0.04)",
      borderColor: "var(--text-primary)"
    },
    ghost: {
      background: "rgba(57,30,26,0.05)"
    }
  }[variant] : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      ...base,
      ...variants[variant],
      ...hoverStyle,
      transform: press && !disabled ? "scale(0.98)" : "scale(1)",
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Checkbox with coral fill when checked. Controlled or uncontrolled. */
function Checkbox({
  label,
  checked,
  defaultChecked,
  disabled = false,
  id,
  style = {},
  onChange,
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const boxId = id || (label ? "cb-" + label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const toggle = e => {
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: boxId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      color: "var(--text-primary)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: boxId,
    type: "checkbox",
    checked: on,
    disabled: disabled,
    onChange: toggle,
    style: {
      position: "absolute",
      opacity: 0,
      width: 1,
      height: 1
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 20,
      height: 20,
      borderRadius: 6,
      flexShrink: 0,
      background: on ? "var(--brand-primary)" : "var(--color-bg-raised)",
      border: `1.5px solid ${on ? "var(--brand-primary)" : "var(--border-strong)"}`,
      color: "#fff",
      fontSize: 12,
      fontWeight: 700,
      transition: "background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)"
    }
  }, on ? "✓" : ""), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: 36,
  md: 44,
  lg: 54
};

/** Square icon-only button. Same calm interaction model as Button. */
function IconButton({
  children,
  variant = "ghost",
  size = "md",
  disabled = false,
  "aria-label": ariaLabel,
  style = {},
  ...rest
}) {
  const dim = sizes[size] || sizes.md;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const variants = {
    solid: {
      background: "var(--brand-primary)",
      color: "var(--text-on-brand)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-primary)"
    },
    outline: {
      background: "transparent",
      color: "var(--text-primary)",
      border: "1px solid var(--border-default)"
    }
  };
  const hoverBg = {
    solid: "var(--brand-primary-hover)",
    ghost: "rgba(57,30,26,0.06)",
    outline: "rgba(57,30,26,0.04)"
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dim,
      height: dim,
      padding: 0,
      borderRadius: "var(--radius-md)",
      border: "1px solid transparent",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
      ...variants[variant],
      ...(hover && !disabled ? {
        background: hoverBg
      } : {}),
      transform: press && !disabled ? "scale(0.94)" : "scale(1)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text input with label, optional hint/error, calm coral focus ring. */
function Input({
  label,
  hint,
  error,
  id,
  type = "text",
  value,
  defaultValue,
  placeholder,
  disabled = false,
  iconLeft = null,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const borderColor = error ? "var(--status-error)" : focus ? "var(--brand-primary)" : "var(--border-default)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "var(--color-bg-raised)",
      border: `1.5px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      padding: "0 14px",
      minHeight: 46,
      boxShadow: focus && !error ? "0 0 0 4px rgba(255,81,34,0.12)" : "none",
      transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
      opacity: disabled ? 0.55 : 1
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      color: "var(--text-muted)"
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "inherit",
      fontSize: 15,
      color: "var(--text-primary)",
      padding: "12px 0",
      minWidth: 0
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: error ? "var(--status-error)" : "var(--text-secondary)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** Radio group — one choice per row, coral dot when selected. */
function Radio({
  name,
  options = [],
  value,
  defaultValue,
  disabled = false,
  style = {},
  onChange
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? (options[0] && (typeof options[0] === "string" ? options[0] : options[0].value)));
  const sel = isControlled ? value : internal;
  const pick = v => {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const lbl = typeof o === "string" ? o : o.label;
    const on = sel === val;
    return /*#__PURE__*/React.createElement("label", {
      key: val,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontSize: 15,
        color: "var(--text-primary)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: name,
      checked: on,
      disabled: disabled,
      onChange: () => pick(val),
      style: {
        position: "absolute",
        opacity: 0,
        width: 1,
        height: 1
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 20,
        borderRadius: "50%",
        flexShrink: 0,
        border: `1.5px solid ${on ? "var(--brand-primary)" : "var(--border-strong)"}`,
        transition: "border-color var(--dur-fast) var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "var(--brand-primary)",
        transform: on ? "scale(1)" : "scale(0)",
        transition: "transform var(--dur-fast) var(--ease-out)"
      }
    })), lbl);
  }));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native select styled to match Input — labelled, coral focus. */
function Select({
  label,
  hint,
  id,
  value,
  defaultValue,
  options = [],
  disabled = false,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selectId,
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selectId,
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: "none",
      width: "100%",
      fontFamily: "inherit",
      fontSize: 15,
      color: "var(--text-primary)",
      background: "var(--color-bg-raised)",
      border: `1.5px solid ${focus ? "var(--brand-primary)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-md)",
      padding: "12px 40px 12px 14px",
      minHeight: 46,
      boxShadow: focus ? "0 0 0 4px rgba(255,81,34,0.12)" : "none",
      transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
      opacity: disabled ? 0.55 : 1,
      cursor: disabled ? "not-allowed" : "pointer"
    }
  }, rest), options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const lbl = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lbl);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 14,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--text-secondary)",
      fontSize: 12
    }
  }, "\u25BE")), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-secondary)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Switch toggle — coral track when on. Gentle slide, no bounce. */
function Switch({
  label,
  checked,
  defaultChecked,
  disabled = false,
  style = {},
  onChange,
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    const v = !on;
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      color: "var(--text-primary)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": on,
    onClick: toggle,
    disabled: disabled,
    style: {
      width: 44,
      height: 26,
      borderRadius: 999,
      border: "none",
      padding: 3,
      flexShrink: 0,
      background: on ? "var(--brand-primary)" : "var(--border-strong)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background var(--dur-base) var(--ease-out)",
      display: "inline-flex",
      alignItems: "center"
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "0 1px 3px rgba(57,30,26,0.3)",
      transform: on ? "translateX(18px)" : "translateX(0)",
      transition: "transform var(--dur-base) var(--ease-out)"
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// marketing/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever a design needs an image.
 * You control the slot's shape; it sizes to its container by default. When the search_stock_photos tool
 * is available, prefill the slot by default — write the photo's URL into
 * src (with credit/credit-href); the user can still fill or replace it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The sidecar is a SIBLING of the HTML file that uses this component: the
 * read is a document-relative fetch, and the host resolves the bridge's
 * sidecar writes into the previewed file's directory to match (same
 * contract as design_canvas.jsx). Pages in the same directory share one
 * sidecar; keep slot ids distinct across them.
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          Initial framing baseline: cover | contain.   (default 'cover')
 *                cover starts the image filling the frame (overflow cropped);
 *                contain starts it fully visible (letterboxed). Either way the
 *                user can always pan/scale from there — double-click, or the
 *                Edit control, enters reframe mode (drag to move, scroll or
 *                corner-handles to scale; Escape / click-out commits). The
 *                crop persists alongside the image in the sidecar.
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. Prefill it with a real
 *                photo via search_stock_photos when that tool is available
 *                (set credit/credit-href from the result). A user drop
 *                overrides it; clearing the drop reveals src again.
 *   credit       Attribution text shown as a small overlay at the
 *                bottom-left of the filled slot. REQUIRED whenever src
 *                points at any Unsplash host (images.unsplash.com,
 *                plus.unsplash.com, …): an Unsplash src with no credit
 *                renders an error tile INSTEAD of the photo (Unsplash
 *                terms forbid showing their photos unattributed). Use the
 *                exact form 'Photo by {photographer name} on Unsplash' —
 *                the overlay then links the name to credit-href and
 *                'Unsplash' to the Unsplash homepage, and links back to
 *                unsplash.com automatically get the required utm referral
 *                params appended at render time. The credit belongs to
 *                the src image, so it only shows while src is what's
 *                displayed — a user-dropped image hides it.
 *   credit-href  Link for the photographer's name in the credit overlay
 *                (their Unsplash profile URL from the stock-photo search
 *                results). http(s) URLs only — anything else renders the
 *                name as plain text.
 *
 * Sizing: the slot fills its container by default (width/height 100%).
 * Put it in a sized wrapper — absolutely positioned, a grid cell, a fixed
 * frame — and it takes exactly that box. When the parent's height is
 * indefinite (ordinary flow), it falls back to full width at a 3:2 aspect
 * ratio instead of collapsing. In a shrink-to-fit parent (a float,
 * width:max-content, an unsized absolute wrapper), percentages have
 * nothing to resolve against — size the slot or its wrapper explicitly
 * there. For a fixed-size slot, set
 * width/height on the element itself (inline style), which overrides the
 * default. When
 * layering content above a slot (full-bleed layouts), make the overlay
 * click-through — pointer-events: none on scrims/text plates, re-enabled
 * on interactive children — so the slot's hover controls stay reachable.
 * Keep the slot's bottom-left corner visually clear as well: the credit
 * overlay renders there, and a dark fade or text plate covering it hides
 * the attribution Unsplash's terms require — end the fade above that
 * corner, or keep it nearly transparent where the credit sits.
 *
 * Usage:
 *   <div style="position:relative;width:100%;height:100%">      <!-- full-bleed: -->
 *     <image-slot id="bg" shape="rect"></image-slot>            <!-- fills the wrapper -->
 *   </div>
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';

  // Unsplash terms require visible attribution wherever their photos
  // display, and every link back to unsplash.com must carry utm referral
  // params. Two render-time rules enforce that here:
  //  - an Unsplash-src slot with NO credit attribute renders an error
  //    tile INSTEAD of the photo (an uncredited Unsplash photo on screen
  //    is itself the terms violation, so it never renders bare);
  //  - rendered credit links pointing at unsplash.com get the referral
  //    params appended when absent (credit-href values live in page
  //    content that can't be edited after the fact).
  // Keep the utm_source value in sync with UTM_SOURCE in
  // platform/web-agent/unsplash.ts — this file is a project-local
  // artifact and cannot import it (equality is pinned by tests).
  const UNSPLASH_HOMEPAGE_HREF = 'https://unsplash.com/?utm_source=claude_design&utm_medium=referral';
  // Host rule mirrors the hotlink validator that admits Unsplash srcs into
  // pages in the first place (cdn$ in unsplash.ts: apex or any subdomain)
  // — Unsplash+ results serve from plus.unsplash.com, not just images.*,
  // and an admitted-but-uncredited photo must error whatever unsplash
  // host it rides on.
  // Trailing-dot FQDNs (images.unsplash.com.) are the same host to the
  // browser but would miss the regex — strip one dot so the check fails
  // CLOSED (unrecognized-but-real Unsplash srcs must error, not render).
  const isUnsplashHost = u => {
    try {
      return /(^|\.)unsplash\.com$/.test(new URL(u, document.baseURI).hostname.replace(/\.$/, ''));
    } catch {
      return false;
    }
  };
  // Render-time referral normalization for links back to Unsplash:
  // appends utm_source/utm_medium when absent, preserves every existing
  // query param, never overwrites an existing utm_source, and passes
  // non-Unsplash URLs through untouched. Input is an ABSOLUTE validated
  // http(s) URL (the credit render funnel resolves + validates first).
  const withReferral = href => {
    try {
      const u = new URL(href);
      if (!/(^|\.)unsplash\.com$/.test(u.hostname.replace(/\.$/, ''))) {
        return href;
      }
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'claude_design');
      }
      if (!u.searchParams.has('utm_medium')) {
        u.searchParams.set('utm_medium', 'referral');
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  };
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  // Unload-time flush: save()'s serialization defers a mid-RTT re-fire to a
  // .then that never runs in an unloading document, silently dropping a
  // pagehide commit. Post the current slots immediately instead — content
  // is a superset snapshot of any in-flight save's, the write is a
  // whole-file last-writer-wins replace, and postMessage FIFO delivers it
  // to the host after the in-flight one, so a backend-side reorder at
  // worst reproduces the dropped-commit outcome this flush improves on.
  // Guarded on the initial sidecar read: pre-hydration slots can miss
  // other slots' persisted entries, and flushing it would clobber them —
  // that narrow case stays best-effort (the in-memory merge in load()
  // cannot happen in an unloading document anyway).
  function flushNow() {
    if (!loaded) return;
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    try {
      Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {});
    } catch (e) {}
  }
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet =
  // Fill the container by default: slots are usually placed inside a
  // sized wrapper (a hero frame, a grid cell, an inset:0 layer) and are
  // expected to take that box — a fixed intrinsic size would render as
  // a small tile in the corner of a full-bleed wrapper instead.
  // aspect-ratio is the companion fallback that keeps a bare slot
  // visible when the parent's height is indefinite: height:100%
  // resolves to auto there, and the ratio then derives height from
  // width instead of letting the slot collapse to zero height.
  // Explicit width/height on the element override all of this.
  // color:inherit (not a fixed near-black): the placeholder chrome —
  // empty-state icon/caption (currentColor) and the dashed ring — must
  // read on dark decks too, and the slide's own text color is the one
  // color guaranteed to contrast with the slide background. The soft
  // look comes from opacity on those parts, not from a baked-in alpha.
  ':host{display:block;position:relative;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;' + '  width:100%;height:100%;aspect-ratio:3/2}' + '.empty .cap,.empty .sub{opacity:.75}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(127,127,127,.08)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  // popover=manual promotes the spill to the top layer on reframe, so it is
  // not clipped by any overflow:hidden / clip-path / scroll-container
  // ancestor (a plain z-index can't escape overflow clipping). UA popover
  // defaults (inset:0;margin:auto) are reset; _applyView sets viewport px.
  '.spill{position:fixed;margin:0;inset:auto;border:0;padding:0;background:transparent;' + '  overflow:visible;transform:translate(-50%,-50%);z-index:1;cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px}' + '.empty:hover .sub{opacity:1}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed currentColor;' + '  opacity:.35;transition:border-color .12s,opacity .12s}' + ':host([data-over]) .ring{border-color:#c96442;opacity:1}' + ':host([data-filled]) .ring{display:none}' +
  // Controls overlay INSIDE the frame, pinned to the top-right corner, so
  // a full-bleed slot in an overflow:hidden container still shows them
  // (the old below-mask placement got clipped). Credit sits bottom-left,
  // so top-right avoids collision. The blurred pill background keeps them
  // legible over the image.
  // The UA [popover] base rule styles the element in EVERY state (only
  // display:none is gated on :not(:popover-open), and the display:flex
  // below overrides that) — so the UA resets live HERE, like .spill's,
  // or the ordinary hover-state strip renders as a bordered Canvas box
  // centered by margin:auto. inset:auto precedes top/right (shorthand).
  '.ctl{position:absolute;inset:auto;top:8px;right:8px;margin:0;border:0;padding:0;' + '  background:transparent;overflow:visible;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' +
  // While reframing, the spill owns the top layer and would swallow every
  // click on the in-frame controls. Promoting .ctl into the top layer
  // ABOVE the spill (shown after it — later popovers stack higher) keeps
  // Edit-as-toggle and Replace clickable mid-reframe. _applyView pins it
  // to the frame's top-right in viewport px (translateX(-100%)
  // right-aligns against the computed left edge); inset:auto clears the
  // base rule's top/right so the inline left/top position it alone.
  '.ctl:popover-open{position:fixed;inset:auto;transform:translateX(-100%)}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' +
  // Replacement in flight: after a src swap the browser keeps painting
  // the PREVIOUS image until the new one decodes, so a Replace would
  // flash the old photo and then pop. Hide the stale frame (visibility,
  // not display — _applyView geometry still applies) and spin until the
  // new image reports in (load/error clears data-swapping).
  ':host([data-swapping]) .frame img{visibility:hidden}' + '.loading{position:absolute;inset:0;display:none;align-items:center;' + '  justify-content:center;pointer-events:none}' + ':host([data-swapping]) .loading{display:flex}' + '.loading::after{content:"";width:22px;height:22px;border-radius:50%;' + '  border:2px solid rgba(127,127,127,.25);border-top-color:currentColor;' + '  animation:om-slot-spin .7s linear infinite}' + '@keyframes om-slot-spin{to{transform:rotate(360deg)}}' +
  // Reduced motion: the static two-tone ring still reads as "working".
  '@media (prefers-reduced-motion:reduce){.loading::after{animation:none}}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' +
  // The credit is a SPAN holding one or two <a>s (Unsplash's prescribed
  // form links the photographer AND Unsplash) — anchors style inline so
  // the overlay reads as one line of text.
  '.credit a{color:inherit;text-decoration:none}' + '.credit a:hover,.credit a:focus-visible{text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}' +
  // Exports must ship JUST the image — no hover controls, no credit chip
  // (the host marks <html data-om-exporting> for the capture window; the
  // page-level hide script can't reach shadow DOM, this rule can).
  ':host-context([data-om-exporting]) .ctl,' + ':host-context([data-om-exporting]) .credit{display:none !important}' +
  // Print must ship just the image too: the hover-gated controls can be
  // mid-hover when print() fires, and the credit chip is screen chrome —
  // the same rule the capture window gets, keyed on print media instead
  // of the host's data-om-exporting mark (the print path sets no mark).
  '@media print{.ctl,.credit{display:none !important}}' +
  // No export-window mask rules here on purpose: the export capture
  // releases the replacement mask by REMOVING data-swapping (the
  // shadow-root pass in pages/export/shared.ts HIDE_EXPORT_CHROME_SCRIPT)
  // — attribute removal works in every engine (:host-context is
  // Chromium-only), is scoped by construction to slots actually
  // mid-swap, and hides the spinner through the same gate. A masked img
  // would otherwise be silently dropped from PPTX decks (the capture
  // walk skips visibility:hidden imgs).
  // Attribution error tile: REPLACES the photo when an Unsplash src has
  // no credit attribute — rendering the photo uncredited is the terms
  // violation, so the photo must not appear at all.
  // Calm and neutral on purpose (review feedback): the tile informs the
  // user; the fix instructions are machine-facing (usage docblock, tool
  // description, and the turn-end scan's bounce copy name the attributes
  // for the agent).
  '.attr-error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  background:#f2f1ef;color:#6e6c66;user-select:none;' + '  font:13px/1.45 system-ui,-apple-system,sans-serif}' + '.attr-error svg{opacity:.55}' + '.attr-error .cap{max-width:92%;font-weight:500;letter-spacing:.01em}' + ':host([data-attribution-error]) .attr-error{display:flex}' + ':host([data-attribution-error]) .ring{display:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  const warnIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>' + '<path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }

    /** Duplicate-slide hook (called by deck-stage, see its
     *  _remintDuplicateIds): copy this id's stored image, if any, under a
     *  freshly minted key and return that key — so a duplicated slide's
     *  slot keeps its dropped photo instead of reverting to the
     *  placeholder. 'isFree' is the caller's uniqueness check (document
     *  ids); candidates must ALSO be unused in the sidecar, which can
     *  hold keys from other pages sharing the project root. (An EMPTY
     *  slot on another page leaves no sidecar entry, so its id is not
     *  detectable here — a minted key can collide with it and that slot
     *  would show this photo. Same blast radius as two pages reusing an
     *  id by hand, which the shared sidecar already permits.) Returns null
     *  when no id could be minted (caller strips the id, today's
     *  behavior). */
    static cloneSlot(fromId, isFree) {
      if (typeof fromId !== 'string' || !fromId) return null;
      // Pre-hydration the store can't veto candidates or source the copy
      // — degrade to the strip (today's behavior) rather than mint
      // against keys we can't see yet. Any rendered (= droppable) slot
      // means load() has already settled.
      if (!loaded) return null;
      const stem = fromId.replace(/-\d+$/, '') || fromId;
      for (let n = 2; n < 100; n++) {
        const toId = stem + '-' + n;
        if (toId === fromId) continue;
        if (slots[toId] !== undefined) {
          // Reuse a key holding this exact value (bytes AND crop) if no
          // live element here owns it — a duplicate op the host refused
          // after minting leaves such a key behind, and reusing keeps
          // refused retries from accumulating one orphaned copy per
          // attempt. Full equality (not just bytes) so a byte-identical
          // key another PAGE owns with its own crop is stepped past, not
          // adopted or rewritten. (Entries without .u never match.)
          const prev = getSlot(toId);
          const cur = getSlot(fromId);
          if (!(prev && cur && prev.u && prev.u === cur.u && prev.s === cur.s && prev.x === cur.x && prev.y === cur.y && (typeof isFree !== 'function' || isFree(toId)))) continue;
          return toId;
        }
        if (typeof isFree === 'function' && !isFree(toId)) continue;
        const v = getSlot(fromId);
        if (v) setSlot(toId, Object.assign({}, v));
        return toId;
      }
      return null;
    }
    constructor() {
      super();
      // clonable: rail thumbnails deep-clone slides and carry this shadow
      // along; reuse an already-cloned root so upgrade-after-clone works.
      // (Deliberately NOT serializable — a getHTML consumer would embed
      // multi-MB sidecar data-URLs into serialized page HTML.)
      const root = this.shadowRoot || this.attachShadow({
        mode: 'open',
        clonable: true
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="attr-error" part="attribution-error">' + warnIcon + '    <div class="cap">This photo needs attribution</div></div>' + '  <div class="loading" part="loading"></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      // A SPAN, not an <a>: the prescribed Unsplash credit holds two links
      // (photographer + Unsplash), built per-render in _render().
      '<span class="credit" part="credit"></span>' + '<div class="spill" popover="manual" data-dc-edit-transparent>' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' +
      // data-dc-edit-transparent: the DC editor's edit-mode picker lets
      // clicks through for chrome marked with it (EDIT_TRANSPARENT_SEL)
      // — without it, Replace/Edit clicks in Edit mode are swallowed by
      // element selection and the controls look dead.
      '<div class="ctl" popover="manual" data-dc-edit-transparent><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="edit" title="Reframe image">Edit</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ctl = root.querySelector('.ctl');
      this._credit = root.querySelector('.credit');
      this._attrError = root.querySelector('.attr-error');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      // Encode-in-flight marker (the owning _ingest generation): while set,
      // the same-src "nothing in flight" clear in _render must not fire —
      // the stored value still points at the OLD image until the encode
      // lands, so that clear would unmask the stale image mid-replace.
      this._swapGen = 0;
      // Render-owned swap in flight: set when _render assigns a new src,
      // cleared only by the img's own load/error (or the empty branch).
      // img.complete CANNOT stand in for this — setting src only QUEUES
      // the current-request swap (a microtask), so synchronously after an
      // assignment, complete still reports the OLD settled request. The
      // pick path does exactly that: the host sets src, credit, and
      // credit-href back-to-back in one task, and renders #2/#3 would
      // read the stale complete === true and drop the mask one render
      // after it was set.
      this._loadPending = false;
      // See _render's empty branch: a transient attribution-error wipe of a
      // showing image must make the follow-up render a replacement (spinner),
      // not a first fill (blank frame).
      this._hidShowing = false;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        // The hidden controls are opacity-0 but still tabbable — without
        // this gate a keyboard user could drive them on a read-only share
        // link (mirrors the dblclick handler's editable gate).
        if (!this.hasAttribute('data-editable')) return;
        if (act === 'replace') {
          this._exitReframe(true);
          // Host-owned picker (Unsplash modal; it also offers local import).
          this.dispatchEvent(new CustomEvent('image-slot:pick', {
            bubbles: true,
            composed: true,
            detail: {
              id: this.id || null
            }
          }));
        }
        if (act === 'edit') {
          if (!this._reframes()) return;
          if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      // load/error also release the replacement-in-flight mask (via the
      // single discipline in _releaseMask): the swap is only revealed once
      // the new image can actually paint (on error the frame shows its
      // background, same as a fresh slot with a broken src).
      this._img.addEventListener('load', () => {
        this._loadPending = false;
        this._releaseMask(true);
        this._applyView();
      });
      this._img.addEventListener('error', () => {
        this._loadPending = false;
        this._releaseMask(true);
      });
      // Gated only on editable — any filled slot can be repositioned/scaled,
      // regardless of fit. Share links (no writeFile) stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
          const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // The host may inject window.omelette.writeFile AFTER the first render;
      // re-render on hover so the editable-gated controls reliably appear.
      this.addEventListener('pointerenter', this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      // commit=false: a disconnect is not a user intent — committing here
      // would persist whatever half-finished drag a React remount or DOM
      // splice happened to interrupt. Deliberate exits commit on their own
      // paths (Escape/click-out/toggle), and unloads commit via pagehide.
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._signalReframe(true);
      // Best-effort commit when the document unloads mid-reframe (a host
      // navigation racing the enter signal, a manual reload, tab close):
      // the sidecar write rides the host bridge, which outlives this
      // document, so the crop survives even though the mode dies with the
      // DOM. Held on the instance so _exitReframe detaches exactly what
      // was attached.
      this._pagehide = () => {
        this._exitReframe(true);
        flushNow();
      };
      window.addEventListener('pagehide', this._pagehide);
      // Promote spill to the top layer, then keep it pinned over the frame:
      // scroll/resize cover the common cases, and a per-frame rect check
      // catches layout shifts that fire neither (an image above finishing
      // load, streamed DOM pushing the slot down, an ancestor transform
      // change) so the overlay can't detach from the frame.
      try {
        this._spill.showPopover();
      } catch {}
      // After the spill, so the controls stack above it in the top layer.
      try {
        this._ctl.showPopover();
      } catch {}
      this._reposition = () => {
        if (this.hasAttribute('data-reframe')) this._applyView();
      };
      window.addEventListener('scroll', this._reposition, true);
      window.addEventListener('resize', this._reposition);
      this._lastRect = '';
      this._watch = () => {
        if (!this.hasAttribute('data-reframe')) return;
        const r = this.getBoundingClientRect();
        const key = r.left + ',' + r.top + ',' + r.width + ',' + r.height;
        if (key !== this._lastRect) {
          this._lastRect = key;
          this._applyView();
        }
        this._watchId = requestAnimationFrame(this._watch);
      };
      this._watchId = requestAnimationFrame(this._watch);
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (this._reposition) {
        window.removeEventListener('scroll', this._reposition, true);
        window.removeEventListener('resize', this._reposition);
        this._reposition = null;
      }
      if (this._watchId) {
        cancelAnimationFrame(this._watchId);
        this._watchId = 0;
      }
      if (this._pagehide) {
        window.removeEventListener('pagehide', this._pagehide);
        this._pagehide = null;
      }
      try {
        this._spill.hidePopover();
      } catch {}
      try {
        this._ctl.hidePopover();
      } catch {}
      this._ctl.style.left = '';
      this._ctl.style.top = '';
      if (commit) this._commitView();
      this._signalReframe(false);
    }

    // Reframe state lives only in this DOM until commit, invisible to the
    // host's dirty signals — announce enter/exit so the host can hold
    // auto-reloads for exactly the gesture (the guest bundle forwards
    // image-slot:reframe to the host as imageSlotReframe). Dispatched on
    // the element (composed, so it escapes shadow roots) while connected;
    // a disconnected exit (disconnectedCallback) falls back to document so
    // the host still hears it.
    _signalReframe(active) {
      const target = this.isConnected ? this : document;
      target.dispatchEvent(new CustomEvent('image-slot:reframe', {
        bubbles: true,
        composed: true,
        detail: {
          active: active,
          id: this.id || null
        }
      }));
    }

    // Public: host's "Import from computer" calls this to run local browse.
    openFilePicker() {
      this._exitReframe(true);
      this._input.click();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      // Replacing a shown image: surface the swap through the encode too,
      // not just the decode — otherwise the old photo sits there with no
      // feedback while the canvas re-encode runs. An empty slot keeps its
      // placeholder (no spinner) until the encode lands, as before.
      // _swapGen guards the mask against re-renders DURING the encode
      // (pointerenter, ResizeObserver, another slot's store write): the
      // stored value still resolves to the old image there, so _render's
      // same-src clear would otherwise unmask it mid-replace.
      if (this.hasAttribute('data-filled')) {
        this.setAttribute('data-swapping', '');
        this._swapGen = gen;
      }
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        // Clear BEFORE setSlot: its synchronous re-render must see no
        // pending encode, so a byte-identical re-upload (same data URL, no
        // load event coming) still clears the mask via the complete branch.
        this._swapGen = 0;
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._swapGen = 0;
        // Reveal the kept old image — unless another replacement (a
        // remote pick's src swap) is still in flight, in which case the
        // mask stays until THAT image settles (its load/error releases).
        this._releaseMask();
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is available on any filled slot — the user can
    // always reposition/scale. `fit` only sets the initial baseline (see
    // _geom): contain starts fully-visible, cover starts frame-filling.
    _reframes() {
      return this.hasAttribute('data-filled');
    }

    // The single release discipline for the replacement-in-flight mask
    // (data-swapping). The mask comes off only when BOTH hold:
    //  - no encode is pending (_swapGen) — mid-encode the stored value
    //    still resolves to the old image, so any reveal paints it;
    //  - the frame img has settled on its current src — an unsettled src
    //    means some replacement is still in flight (e.g. a remote pick),
    //    whoever started it, and revealing would paint the previous
    //    frame. The load/error listeners pass settled=true (the event IS
    //    the settlement signal, per spec complete is true by then);
    //    other callers rely on the complete flag (covers loaded AND
    //    failed).
    // Every release path funnels through here EXCEPT _render's empty
    // branch (the img is being cleared — nothing will ever settle).
    _releaseMask(settled) {
      if (!this._swapGen && !this._loadPending && (settled || this._img.complete)) {
        this.removeAttribute('data-swapping');
      }
    }

    // Baseline geometry, shared by clamp/apply/resize. `base` is the scale at
    // view-scale s=1: cover = fill the frame (overflow on the looser axis),
    // contain = fit fully inside (letterboxed). Zooming a contain image past
    // s where it overflows naturally becomes a crop. Null until the img has
    // loaded (naturalWidth is 0 before that) or when the slot has no layout
    // box — ResizeObserver fires with a 0×0 rect under display:none, and
    // clamping against a degenerate 1×1 frame would silently pull the stored
    // pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
      const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
      return {
        iw,
        ih,
        fw,
        fh,
        base
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      // Top-layer controls: pin to the frame's top-right in viewport px
      // (the same 8px inset as the in-frame layout; unscaled — top-layer UI
      // reads as chrome, not page content). BEFORE the geometry branch:
      // placement needs only the frame rect, and a not-yet-loaded or broken
      // src must not leave the promoted strip floating unpositioned. Gated
      // on the popover actually being open: without the Popover API,
      // showPopover() threw (swallowed in _enterReframe), .ctl stays in
      // its in-frame absolute layout, and viewport-px coordinates would
      // shove it off-frame — and matches(':popover-open') itself throws
      // there (unknown pseudo-class), hence the try/catch.
      if (this.hasAttribute('data-reframe')) {
        let onTop = false;
        try {
          onTop = this._ctl.matches(':popover-open');
        } catch {}
        if (onTop) {
          const r = this.getBoundingClientRect();
          this._ctl.style.left = r.right - 8 + 'px';
          this._ctl.style.top = r.top + 8 + 'px';
        }
      }
      if (!g) {
        // Dimensions not known yet (before img load) — centered fit so there
        // is no flash of an unpositioned image before the geometry lands.
        const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = contain ? 'contain' : 'cover';
        return;
      }
      // Baseline (cover-fill or contain-fit) × view scale. Width/height and
      // left/top are all frame-% — depends only on the frame aspect ratio, so
      // a responsive resize keeps the same crop. The spill layer mirrors the
      // same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      if (this.hasAttribute('data-reframe')) {
        // Top-layer spill: position in viewport px over the frame. The top
        // layer escapes ancestor transforms entirely, so EVERY term must be
        // in viewport units: getBoundingClientRect gives the frame's scaled
        // origin AND size, and the rect/layout ratio rescales the ghost —
        // sizing from layout px alone renders it 1/scale too large under a
        // scaled deck slide. Inner ghost + handles stay box-relative.
        const r = this.getBoundingClientRect();
        const sx = g.fw ? r.width / g.fw : 1;
        const sy = g.fh ? r.height / g.fh : 1;
        this._spill.style.width = g.iw * k * sx + 'px';
        this._spill.style.height = g.ih * k * sy + 'px';
        this._spill.style.left = r.left + (50 + this._view.x) / 100 * r.width + 'px';
        this._spill.style.top = r.top + (50 + this._view.y) / 100 * r.height + 'px';
      }
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      // An Unsplash src with no credit attribute must NOT render — showing
      // the photo uncredited is the Unsplash-terms violation itself. The
      // error tile replaces the photo until the credit is written. A
      // user-dropped image is the user's own content and always renders.
      // Trimmed: credit is agent/user-editable content, and a whitespace-
      // only value must count as missing — otherwise it would suppress the
      // error tile AND render an empty credit box (no text, no links),
      // exactly the unattributed state this gate exists to prevent.
      const credit = (this.getAttribute('credit') || '').trim();
      const attrError = !!(!credit && !this._userUrl && srcAttr && isUnsplashHost(srcAttr));
      this.toggleAttribute('data-attribution-error', attrError);
      if (url && !attrError) {
        const prev = this._img.getAttribute('src');
        if (prev !== url) {
          // Replacing an already-shown image: mark the swap BEFORE setting
          // src so the stale frame is never revealed (see the data-swapping
          // stylesheet rules). First fill (prev empty) keeps the existing
          // placeholder-until-load behavior — no spinner. _hidShowing
          // covers the pick path's transient attribution-error wipe: prev
          // is gone, but an image WAS showing, so this is a replacement.
          if (prev || this._hidShowing) this.setAttribute('data-swapping', '');
          // Mark the swap BEFORE assigning src: complete keeps reporting
          // the old settled request until the browser's
          // update-the-image-data microtask runs, so same-task re-renders
          // (the pick path's credit/credit-href setAttributes) need this
          // flag, not complete, to know a load is in flight.
          this._loadPending = true;
          this._img.src = url;
          this._ghost.src = url;
        } else {
          // Same-src re-render — release if settled, so an ingest-set
          // spinner can't stick after a byte-identical re-upload (same
          // data URL, no further load event ever fires).
          this._releaseMask();
        }
        this._hidShowing = false;
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this.removeAttribute('data-swapping');
        // The src is being removed — no load/error will ever fire for it.
        this._loadPending = false;
        // A transient attribution-error wipe of a showing image happens on
        // the pick path: the host sets src one setAttribute before credit,
        // so render N hides the old image (attrError) and render N+1
        // restores a URL. Remember the wipe so that restore renders as a
        // replacement (spinner), not a first fill (blank frame).
        this._hidShowing = attrError && !!this._img.getAttribute('src');
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        // The error tile owns the blocked-photo state; .empty stays for
        // the genuinely-empty slot.
        this._empty.style.display = attrError ? 'none' : 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + the http(s)-only funnel keep external strings inert.
      const showCredit = !!(url && credit && !this._userUrl && !attrError);
      this._credit.textContent = '';
      if (showCredit) {
        // Validate once (resolved against the document, http(s) only),
        // then append the terms-required utm referral params to links
        // that point back at unsplash.com.
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') {
              href = withReferral(u.href);
            }
          } catch {}
        }
        const mkLink = (text, linkHref) => {
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('href', linkHref);
          a.textContent = text;
          return a;
        };
        // Unsplash's prescribed credit is TWO links — the photographer's
        // name to their profile (credit-href) and 'Unsplash' to the
        // homepage. Render that split whenever the text has the canonical
        // shape; other text keeps the legacy single-link rendering.
        const m = /^Photo by (.+) on Unsplash$/.exec(credit);
        if (m) {
          this._credit.appendChild(document.createTextNode('Photo by '));
          this._credit.appendChild(href ? mkLink(m[1], href) : document.createTextNode(m[1]));
          this._credit.appendChild(document.createTextNode(' on '));
          this._credit.appendChild(mkLink('Unsplash', UNSPLASH_HOMEPAGE_HREF));
        } else if (href) {
          this._credit.appendChild(mkLink(credit, href));
        } else {
          this._credit.textContent = credit;
        }
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "marketing/image-slot.js", error: String((e && e.message) || e) }); }

// ui_kits/hospital-portal/PortalApp.jsx
try { (() => {
/* NewMed Skills — hospital workforce portal UI kit. Attaches PortalApp to window. */
const {
  Logo,
  Symbol,
  Button,
  IconButton,
  Input,
  Badge,
  Tag,
  Card,
  Stat,
  ProgressBar,
  Avatar,
  Eyebrow,
  StepFlow
} = window.NewMedSkillsDesignSystem_cd1078;
const STAGES = ["Source", "Assess", "Develop", "Certify", "Deploy", "Retain"];
const CANDIDATES = [{
  name: "Priya Nair",
  role: "ICU nurse",
  loc: "Kochi → Riyadh",
  stage: 3,
  license: "SCFHS",
  pct: 62,
  tags: ["ICU", "5 yrs"]
}, {
  name: "Joseph Mathew",
  role: "Theatre nurse",
  loc: "Manila → Dubai",
  stage: 4,
  license: "DHA",
  pct: 78,
  tags: ["OR", "Night"]
}, {
  name: "Amara Okafor",
  role: "Radiographer",
  loc: "Lagos → Doha",
  stage: 2,
  license: "Prometric",
  pct: 34,
  tags: ["Allied"]
}, {
  name: "Ravi Kumar",
  role: "ER nurse",
  loc: "Chennai → Abu Dhabi",
  stage: 5,
  license: "DHA",
  pct: 96,
  tags: ["ER", "6 yrs"]
}, {
  name: "Sara Haddad",
  role: "Midwife",
  loc: "Amman → Riyadh",
  stage: 1,
  license: "SCFHS",
  pct: 18,
  tags: ["Maternity"]
}, {
  name: "Grace Wanjiru",
  role: "Ward nurse",
  loc: "Nairobi → Dubai",
  stage: 3,
  license: "DHA",
  pct: 58,
  tags: ["Med-surg"]
}];
const stageTone = ["neutral", "amber", "amber", "teal", "coral", "success"];
function Sidebar({
  view,
  setView
}) {
  const items = [["pipeline", "Pipeline"], ["candidates", "Candidates"], ["requisitions", "Requisitions"], ["compliance", "Compliance"], ["reports", "Reports"]];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 232,
      flexShrink: 0,
      background: "var(--nm-ink)",
      color: "var(--nm-cream)",
      display: "flex",
      flexDirection: "column",
      padding: "22px 16px",
      height: "100%",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "4px 8px 24px"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "horizontal",
    size: 20,
    color: "var(--nm-cream)"
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, items.map(([k, label]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setView(k),
    style: {
      textAlign: "left",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 14.5,
      fontWeight: 500,
      padding: "11px 14px",
      borderRadius: "var(--radius-sm)",
      background: view === k ? "rgba(255,255,255,0.1)" : "transparent",
      color: view === k ? "var(--nm-cream)" : "rgba(248,243,234,0.6)"
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      padding: 14,
      background: "rgba(255,255,255,0.06)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      marginBottom: 4
    }
  }, "King Faisal Hospital"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "rgba(248,243,234,0.55)"
    }
  }, "Riyadh \xB7 Enterprise")));
}
function Topbar({
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 66,
      borderBottom: "1px solid var(--border-subtle)",
      background: "var(--color-bg-raised)",
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "0 28px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search candidates, requisitions\u2026",
    iconLeft: /*#__PURE__*/React.createElement("span", null, "\u2315")
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: onOpen
  }, "New requisition"), /*#__PURE__*/React.createElement(IconButton, {
    variant: "ghost",
    "aria-label": "Notifications"
  }, "\u25D4"), /*#__PURE__*/React.createElement(Avatar, {
    name: "You",
    size: "sm"
  })));
}
function StatRow() {
  const s = [["48", "Active candidates", true], ["12", "Ready to deploy", false], ["4–6 wks", "Avg. time to license", false], ["96%", "Retention at 12 mo", false]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 16,
      marginBottom: 26
    }
  }, s.map(([v, l, a]) => /*#__PURE__*/React.createElement(Card, {
    key: l,
    padding: 20
  }, /*#__PURE__*/React.createElement(Stat, {
    value: v,
    label: l,
    accent: a
  }))));
}
function CandidateCard({
  c,
  onClick
}) {
  return /*#__PURE__*/React.createElement(Card, {
    padding: 16,
    interactive: true,
    style: {
      cursor: "pointer"
    },
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: c.name
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-secondary)"
    }
  }, c.role))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "ink"
  }, c.license), c.tags.map(t => /*#__PURE__*/React.createElement(Badge, {
    key: t,
    tone: "neutral"
  }, t))), /*#__PURE__*/React.createElement(ProgressBar, {
    value: c.pct,
    label: STAGES[c.stage],
    showValue: true
  }));
}
function Pipeline({
  onSelect
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Workforce pipeline"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 30,
      letterSpacing: "-0.02em",
      margin: "8px 0 0",
      color: "var(--heading-color)"
    }
  }, "Every candidate, every stage.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    active: true
  }, "All"), /*#__PURE__*/React.createElement(Tag, null, "Nursing"), /*#__PURE__*/React.createElement(Tag, null, "Allied health"))), /*#__PURE__*/React.createElement(StatRow, null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(StepFlow, {
    active: 3
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 16
    }
  }, CANDIDATES.map(c => /*#__PURE__*/React.createElement(CandidateCard, {
    key: c.name,
    c: c,
    onClick: () => onSelect(c)
  }))));
}
function Drawer({
  c,
  onClose
}) {
  if (!c) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 40,
      background: "rgba(57,30,26,0.35)",
      backdropFilter: "blur(3px)",
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 440,
      maxWidth: "92%",
      height: "100%",
      background: "var(--nm-cream)",
      boxShadow: "var(--shadow-lg)",
      padding: 28,
      overflowY: "auto",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: c.name,
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 700,
      fontFamily: "var(--font-display)",
      letterSpacing: "-0.01em",
      color: "var(--heading-color)"
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-secondary)"
    }
  }, c.role, " \xB7 ", c.loc))), /*#__PURE__*/React.createElement(IconButton, {
    variant: "ghost",
    "aria-label": "Close",
    onClick: onClose
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      margin: "18px 0 22px"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: stageTone[c.stage],
    dot: true
  }, STAGES[c.stage]), /*#__PURE__*/React.createElement(Badge, {
    tone: "ink"
  }, c.license), c.tags.map(t => /*#__PURE__*/React.createElement(Badge, {
    key: t,
    tone: "neutral"
  }, t))), /*#__PURE__*/React.createElement(Card, {
    padding: 20,
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginBottom: 14
    }
  }, "Readiness"), /*#__PURE__*/React.createElement(ProgressBar, {
    value: c.pct,
    label: "Overall completion",
    showValue: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 28,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: STAGES[c.stage],
    label: "Current stage"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: c.license,
    label: "Licensing body",
    accent: true
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: 20,
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginBottom: 14
    }
  }, "Compliance"), [["Degree & transcripts", "Verified"], ["DataFlow", c.pct > 40 ? "Verified" : "In progress"], ["Home-country license", "Verified"], ["Visa", c.stage >= 4 ? "Issued" : "Pending"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "9px 0",
      borderBottom: "1px solid var(--border-subtle)",
      fontSize: 14.5
    }
  }, /*#__PURE__*/React.createElement("span", null, k), /*#__PURE__*/React.createElement(Badge, {
    tone: v === "Verified" || v === "Issued" ? "success" : "amber",
    dot: true
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true
  }, "Advance stage"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    fullWidth: true
  }, "Message"))));
}
function Placeholder({
  title
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: 420,
      gap: 14,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: 0.3
    }
  }, /*#__PURE__*/React.createElement(Symbol, {
    size: 56
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 24,
      margin: 0,
      color: "var(--heading-color)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-secondary)",
      margin: 0,
      maxWidth: 320
    }
  }, "This view is part of the product. The pipeline is the interactive demo."));
}
function PortalApp() {
  const [view, setView] = React.useState("pipeline");
  const [sel, setSel] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100vh",
      background: "var(--nm-cream)",
      color: "var(--text-primary)",
      fontFamily: "var(--font-sans)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    view: view,
    setView: setView
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    onOpen: () => {}
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "28px 28px 60px"
    }
  }, view === "pipeline" ? /*#__PURE__*/React.createElement(Pipeline, {
    onSelect: setSel
  }) : /*#__PURE__*/React.createElement(Placeholder, {
    title: {
      candidates: "Candidates",
      requisitions: "Requisitions",
      compliance: "Compliance",
      reports: "Reports"
    }[view]
  }))), /*#__PURE__*/React.createElement(Drawer, {
    c: sel,
    onClose: () => setSel(null)
  }));
}
window.PortalApp = PortalApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/hospital-portal/PortalApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/MarketingApp.jsx
try { (() => {
/* NewMed Skills — marketing site UI kit. Attaches MarketingApp to window. */
const {
  Logo,
  Button,
  Eyebrow,
  StepFlow,
  Card,
  Stat,
  Badge,
  Orb,
  Input,
  Select,
  ArrowButton,
  ArrowHighlight,
  ArrowBadge
} = window.NewMedSkillsDesignSystem_cd1078;
const wrap = {
  maxWidth: 1160,
  margin: "0 auto",
  padding: "0 40px"
};
function Nav({
  audience,
  setAudience,
  onBook
}) {
  const link = {
    fontSize: 15,
    color: "var(--text-primary)",
    textDecoration: "none",
    fontWeight: 500
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      background: "rgba(248,243,234,0.82)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 74
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "horizontal",
    size: 24
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 30,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      background: "var(--nm-cream-2)",
      padding: 4,
      borderRadius: 999
    }
  }, ["candidates", "hospitals"].map(a => /*#__PURE__*/React.createElement("button", {
    key: a,
    onClick: () => setAudience(a),
    style: {
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      fontWeight: 600,
      padding: "7px 16px",
      borderRadius: 999,
      textTransform: "capitalize",
      background: audience === a ? "var(--color-bg-raised)" : "transparent",
      color: audience === a ? "var(--text-primary)" : "var(--text-secondary)",
      boxShadow: audience === a ? "var(--shadow-xs)" : "none"
    }
  }, "For ", a))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: link
  }, "How it works"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: link
  }, "About"), /*#__PURE__*/React.createElement(ArrowButton, {
    size: "sm",
    onClick: onBook
  }, "Book a call"))));
}
const COPY = {
  candidates: {
    eyebrow: "For healthcare professionals",
    head: ["Take your career ", "across borders.", ""],
    sub: "You trained for years and passed the exams. We handle everything else — licensing, visa, placement — so paperwork is never the reason you don't go.",
    cta: "Start your application",
    stats: [["4–6 wks", "DataFlow verification", true], ["6", "stages, one team", false], ["0", "hidden fees", false]]
  },
  hospitals: {
    eyebrow: "For hospitals & HR teams",
    head: ["", "Workforce-ready talent.", " Not a stack of CVs."],
    sub: "Hiring nurses shouldn't take six months. We send you candidates who are already screened, licensed, and ready to contribute from day one.",
    cta: "Talk to our team",
    stats: [["1:3", "Offer-to-hire ratio", true], ["6 mo", "cut to weeks", false], ["100%", "DataFlow-cleared", false]]
  }
};
function GlobeGlyph({
  size = "1em"
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 12h20"
  }));
}
function Hero({
  audience,
  onBook
}) {
  const c = COPY[audience];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(Orb, {
    tone: "coral",
    size: 720,
    style: {
      position: "absolute",
      right: -240,
      top: -260
    }
  }), /*#__PURE__*/React.createElement(Orb, {
    tone: "amber",
    size: 420,
    style: {
      position: "absolute",
      left: -180,
      bottom: -240,
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      position: "relative",
      paddingTop: 96,
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 40,
      bottom: 0,
      width: 340,
      height: 520,
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    key: audience,
    id: "hero-cutout-" + audience,
    shape: "rect",
    fit: "cover",
    src: audience === "candidates" ? "../../assets/photos/nurse-newmed-hijab.png" : "../../assets/photos/nurse-paperwork-orange.png",
    placeholder: "Drop cutout \u2014 healthcare professional PNG (transparent bg)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 2,
      maxWidth: 780
    }
  }, /*#__PURE__*/React.createElement(ArrowBadge, {
    size: 34
  }, c.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 58,
      lineHeight: 1.08,
      letterSpacing: "-0.025em",
      margin: "22px 0 20px",
      maxWidth: 780,
      color: "var(--heading-color)"
    }
  }, c.head[0], /*#__PURE__*/React.createElement(ArrowHighlight, {
    icon: /*#__PURE__*/React.createElement(GlobeGlyph, null)
  }, c.head[1]), c.head[2]), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 20,
      lineHeight: 1.55,
      color: "var(--text-secondary)",
      maxWidth: 560,
      margin: "0 0 32px"
    }
  }, c.sub), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement(ArrowButton, {
    size: "lg",
    onClick: onBook
  }, c.cta), /*#__PURE__*/React.createElement(ArrowButton, {
    size: "lg",
    outline: true
  }, "See how it works")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 52
    }
  }, c.stats.map(([v, l, a]) => /*#__PURE__*/React.createElement(Stat, {
    key: l,
    value: v,
    label: l,
    accent: a
  }))))));
}
function TrustBar() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-subtle)",
      borderBottom: "1px solid var(--border-subtle)",
      background: "var(--color-bg-raised)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      display: "flex",
      alignItems: "center",
      gap: 28,
      height: 72,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "Compliant with"), ["DHA", "SCFHS", "Prometric", "DataFlow"].map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 20,
      color: "var(--text-primary)",
      opacity: 0.7
    }
  }, n))));
}
function Journey() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      paddingTop: 88,
      paddingBottom: 88
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 620,
      marginBottom: 44
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "The path"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 40,
      letterSpacing: "-0.02em",
      lineHeight: 1.08,
      margin: "14px 0 14px",
      color: "var(--heading-color)"
    }
  }, "One team, from sourcing to retention."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: 1.55,
      color: "var(--text-secondary)",
      margin: 0
    }
  }, "We manage the whole workforce journey. You always know which stage you're at.")), /*#__PURE__*/React.createElement(StepFlow, {
    active: 3
  }));
}
function Values() {
  const items = [["Screened before you see them", "Every candidate clears DataFlow, licensing, and clinical screening first — because readiness is the point."], ["Faster hiring", "Requisition to first shift in weeks, not months — because screening is already done."], ["Retention built in", "Ongoing professional development keeps early-stage exits from eroding your investment."]];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--color-bg-raised)",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      paddingTop: 80,
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24
    }
  }, items.map(([h, p]) => /*#__PURE__*/React.createElement(Card, {
    key: h,
    padding: 28,
    interactive: true
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "coral",
    style: {
      marginBottom: 16
    }
  }, "Ready"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 21,
      fontWeight: 600,
      margin: "0 0 10px",
      lineHeight: 1.2,
      color: "var(--heading-color)"
    }
  }, h), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15.5,
      lineHeight: 1.55,
      color: "var(--text-secondary)",
      margin: 0
    }
  }, p))))));
}
function CTABand({
  onBook
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--nm-ink)"
    }
  }, /*#__PURE__*/React.createElement(Orb, {
    tone: "coral",
    size: 560,
    style: {
      position: "absolute",
      right: -160,
      bottom: -300,
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      position: "relative",
      paddingTop: 76,
      paddingBottom: 76,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 42,
      letterSpacing: "-0.02em",
      color: "var(--nm-cream)",
      margin: "0 auto 14px",
      maxWidth: 620,
      lineHeight: 1.08
    }
  }, "We're here to get you across the border."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      color: "rgba(248,243,234,0.7)",
      margin: "0 auto 30px",
      maxWidth: 480
    }
  }, "A short call. We'll tell you plainly what your path looks like."), /*#__PURE__*/React.createElement(ArrowButton, {
    size: "lg",
    onClick: onBook
  }, "Book a call")));
}
function Footer() {
  const col = {
    display: "flex",
    flexDirection: "column",
    gap: 10
  };
  const link = {
    fontSize: 14,
    color: "var(--text-secondary)",
    textDecoration: "none"
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--color-bg-raised)",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      paddingTop: 52,
      paddingBottom: 40,
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 300
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "horizontal",
    size: 22
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--text-secondary)",
      lineHeight: 1.55,
      marginTop: 16
    }
  }, "Healthcare workforce readiness and deployment across the GCC and international markets.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 64
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginBottom: 4
    }
  }, "Platform"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: link
  }, "How it works"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: link
  }, "For candidates"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: link
  }, "For hospitals")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginBottom: 4
    }
  }, "Company"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: link
  }, "About"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: link
  }, "Contact"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: link
  }, "Careers")))));
}
function BookModal({
  open,
  onClose
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 50,
      background: "rgba(57,30,26,0.4)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: "var(--color-bg-raised)",
      borderRadius: "var(--radius-lg)",
      padding: 32,
      width: 440,
      maxWidth: "100%",
      boxShadow: "var(--shadow-lg)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Book a call"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 26,
      letterSpacing: "-0.02em",
      margin: "10px 0 20px",
      color: "var(--heading-color)"
    }
  }, "Tell us where you're starting."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Full name",
    placeholder: "Priya Nair"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Work email",
    placeholder: "you@hospital.org"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "I am a\u2026",
    options: ["Healthcare professional", "Hospital / HR team"]
  }), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    onClick: onClose
  }, "Request a call"))));
}
function MarketingApp() {
  const [audience, setAudience] = React.useState("candidates");
  const [modal, setModal] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--nm-cream)",
      color: "var(--text-primary)",
      minHeight: "100vh",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement(Nav, {
    audience: audience,
    setAudience: setAudience,
    onBook: () => setModal(true)
  }), /*#__PURE__*/React.createElement(Hero, {
    audience: audience,
    onBook: () => setModal(true)
  }), /*#__PURE__*/React.createElement(TrustBar, null), /*#__PURE__*/React.createElement(Journey, null), /*#__PURE__*/React.createElement(Values, null), /*#__PURE__*/React.createElement(CTABand, {
    onBook: () => setModal(true)
  }), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(BookModal, {
    open: modal,
    onClose: () => setModal(false)
  }));
}
window.MarketingApp = MarketingApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/MarketingApp.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Arrow = __ds_scope.Arrow;

__ds_ns.ArrowPortrait = __ds_scope.ArrowPortrait;

__ds_ns.ArrowIcon = __ds_scope.ArrowIcon;

__ds_ns.ArrowBadge = __ds_scope.ArrowBadge;

__ds_ns.ArrowButton = __ds_scope.ArrowButton;

__ds_ns.ArrowHighlight = __ds_scope.ArrowHighlight;

__ds_ns.ArrowList = __ds_scope.ArrowList;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Symbol = __ds_scope.Symbol;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Orb = __ds_scope.Orb;

__ds_ns.StepFlow = __ds_scope.StepFlow;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

})();
