var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// app/routes/login.tsx
var require_login = __commonJS({
  "app/routes/login.tsx"() {
    "use strict";
  }
});

// app/routes/join.tsx
var require_join = __commonJS({
  "app/routes/join.tsx"() {
    "use strict";
  }
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_server = require("react-dom/server"), import_react = require("@remix-run/react"), import_jsx_runtime = require("react/jsx-runtime");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.RemixServer, { context: remixContext, url: request.url })
  );
  return responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_solid = require("@heroicons/react/20/solid"), import_outline2 = require("@heroicons/react/24/outline"), import_solid2 = require("@heroicons/react/24/solid"), import_node2 = require("@remix-run/node"), import_react5 = require("@remix-run/react");

// app/components/cimage.tsx
var import_react2 = require("react");

// public/fallbackImage.jpg
var fallbackImage_default = "/build/_assets/fallbackImage-KQKY2SFO.jpg";

// app/components/cimage.tsx
var import_jsx_runtime2 = require("react/jsx-runtime"), CImage = ({ src, className, brokenImageCallback, displayPlaceholder, widthLargerThan = 0, heightLargerThan = 0 }) => {
  let [errorLoadingImage, setErrorLoadingImage] = (0, import_react2.useState)(!1), [loaded, setLoaded] = (0, import_react2.useState)(!1);
  (0, import_react2.useEffect)(() => {
    setErrorLoadingImage(!1), setLoaded(!1);
  }, [src]);
  let ref = (0, import_react2.useRef)();
  if (errorLoadingImage)
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: fallbackImage_default, alt: "", className });
  let placeholder = displayPlaceholder ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, {});
  return src ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "img",
    {
      ref,
      src,
      className,
      onError: () => {
        console.log("Cannot load image"), brokenImageCallback == null || brokenImageCallback(src), setErrorLoadingImage(!0), setLoaded(!0);
      },
      onLoad: () => {
        var _a, _b;
        if (((_a = ref == null ? void 0 : ref.current) == null ? void 0 : _a.naturalWidth) <= widthLargerThan || ((_b = ref == null ? void 0 : ref.current) == null ? void 0 : _b.naturalHeight) <= heightLargerThan) {
          console.log(`image ${src} does not meet standard`), brokenImageCallback == null || brokenImageCallback(src), setErrorLoadingImage(!0), setLoaded(!0);
          return;
        }
        setLoaded(!0);
      },
      loading: "lazy"
    }
  ) : placeholder;
}, cimage_default = CImage;

// app/root.tsx
var import_react6 = require("react"), import_react_range = require("react-range"), import_react_resizable = require("react-resizable");

// app/components/Player.tsx
var import_react3 = require("react"), import_react_player = __toESM(require("react-player")), import_jsx_runtime3 = require("react/jsx-runtime");
function Player({
  playerRef,
  urls = [],
  playing,
  onStart,
  onBuffer,
  onBufferEnd,
  onReady,
  onProgress,
  onPause,
  onEnded,
  onDuration,
  onVideoError
}) {
  let [failedUrls, setFailedUrls] = (0, import_react3.useState)([]), url = urls.find((x) => !failedUrls.some((y) => y == x));
  return (0, import_react3.useEffect)(() => {
    urls.filter((x) => !failedUrls.some((y) => y == x)).length == 0 && onVideoError();
  }, [failedUrls]), url ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_react_player.default,
    {
      ref: playerRef,
      onBuffer,
      onBufferEnd,
      onReady,
      onStart,
      onProgress,
      onPause,
      onEnded,
      playing,
      onDuration,
      onError: (error) => {
        console.log("debug player error", error), console.log("remove", url), setFailedUrls((furls) => furls.concat(url));
      },
      className: "hidden",
      pip: !1,
      url
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, {});
}

// app/root.tsx
var import_auth_helpers_remix = require("@supabase/auth-helpers-remix");

// app/session.server.ts
var import_node = require("@remix-run/node"), sessionStorage = (0, import_node.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: !0,
    maxAge: 60,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: !0
  }
});
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function getUser(request) {
}
async function logout(request) {
  let session = await getSession(request);
  return (0, import_node.redirect)("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-KLKYTZRX.css";

// app/components/HeartButton.tsx
var import_react4 = require("react"), import_lottie_react = __toESM(require("lottie-react"));

// public/heart.json
var heart_default = { nm: "newScene", ddd: 0, h: 100, w: 100, meta: { g: "@lottiefiles/toolkit-js 0.26.1" }, layers: [{ ty: 4, nm: "Dot14", sr: 1, st: -44, op: 90, ip: 44, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [40, 40, 100] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, r: { a: 0, k: -320 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Shape 1", it: [{ ty: "sh", bm: 0, hd: !1, nm: "Path 1", d: 1, ks: { a: 0, k: { c: !1, i: [[0, 0], [0, 0]], o: [[0, 0], [0, 0]], v: [[-37.5, -40.5], [-1, 0.5]] } } }, { ty: "tm", bm: 0, hd: !1, nm: "Trim Paths 1", ix: 2, e: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [48], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [30], t: 56 }, { s: [10], t: 78 }], ix: 2 }, o: { a: 0, k: 0, ix: 3 }, s: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [47], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [29], t: 56 }, { s: [9], t: 78 }], ix: 1 }, m: 1 }, { ty: "st", bm: 0, hd: !1, nm: "Stroke 1", lc: 2, lj: 1, ml: 4, o: { a: 0, k: 100 }, w: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [5], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [2], t: 56 }, { s: [0], t: 70 }] }, c: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.6314, 0.8118, 0.9412], t: 44 }, { s: [0.8196, 0.651, 0.9098], t: 56 }] } }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 1 }, { ty: 4, nm: "Dot13", sr: 1, st: -44, op: 90, ip: 44, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [40, 40, 100] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, r: { a: 0, k: -306.6 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Shape 1", it: [{ ty: "sh", bm: 0, hd: !1, nm: "Path 1", d: 1, ks: { a: 0, k: { c: !1, i: [[0, 0], [0, 0]], o: [[0, 0], [0, 0]], v: [[-37.5, -40.5], [-1, 0.5]] } } }, { ty: "tm", bm: 0, hd: !1, nm: "Trim Paths 1", ix: 2, e: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [45], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [20], t: 56 }, { s: [1], t: 89 }], ix: 2 }, o: { a: 0, k: 0, ix: 3 }, s: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [44], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [19], t: 56 }, { s: [0], t: 89 }], ix: 1 }, m: 1 }, { ty: "st", bm: 0, hd: !1, nm: "Stroke 1", lc: 2, lj: 1, ml: 4, o: { a: 0, k: 100 }, w: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [5], t: 56 }, { s: [0], t: 89 }] }, c: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.6588, 0.8, 0.9686], t: 44 }, { s: [0.8196, 0.651, 0.9098], t: 56 }] } }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 2 }, { ty: 4, nm: "Dot12", sr: 1, st: -44, op: 90, ip: 44, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [40, 40, 100] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, r: { a: 0, k: -271.7 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Shape 1", it: [{ ty: "sh", bm: 0, hd: !1, nm: "Path 1", d: 1, ks: { a: 0, k: { c: !1, i: [[0, 0], [0, 0]], o: [[0, 0], [0, 0]], v: [[-37.5, -40.5], [-1, 0.5]] } } }, { ty: "tm", bm: 0, hd: !1, nm: "Trim Paths 1", ix: 2, e: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [48], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [30], t: 56 }, { s: [10], t: 78 }], ix: 2 }, o: { a: 0, k: 0, ix: 3 }, s: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [47], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [29], t: 56 }, { s: [9], t: 78 }], ix: 1 }, m: 1 }, { ty: "st", bm: 0, hd: !1, nm: "Stroke 1", lc: 2, lj: 1, ml: 4, o: { a: 0, k: 100 }, w: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [5], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [2], t: 56 }, { s: [0], t: 70 }] }, c: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [1, 1, 1], t: 44 }, { s: [0.8902, 0.8196, 0.5804], t: 56 }] } }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 3 }, { ty: 4, nm: "Dot11", sr: 1, st: -44, op: 90, ip: 44, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [40, 40, 100] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, r: { a: 0, k: -258.3 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Shape 1", it: [{ ty: "sh", bm: 0, hd: !1, nm: "Path 1", d: 1, ks: { a: 0, k: { c: !1, i: [[0, 0], [0, 0]], o: [[0, 0], [0, 0]], v: [[-37.5, -40.5], [-1, 0.5]] } } }, { ty: "tm", bm: 0, hd: !1, nm: "Trim Paths 1", ix: 2, e: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [45], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [20], t: 56 }, { s: [1], t: 89 }], ix: 2 }, o: { a: 0, k: 0, ix: 3 }, s: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [44], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [19], t: 56 }, { s: [0], t: 89 }], ix: 1 }, m: 1 }, { ty: "st", bm: 0, hd: !1, nm: "Stroke 1", lc: 2, lj: 1, ml: 4, o: { a: 0, k: 100 }, w: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [5], t: 56 }, { s: [0], t: 89 }] }, c: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.7804, 0.6196, 0.8902], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [1, 1, 1], t: 56 }, { s: [0.7098, 0.2706, 0.6431], t: 66 }] } }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 4 }, { ty: 4, nm: "Dot10", sr: 1, st: -44, op: 90, ip: 44, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [40, 40, 100] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, r: { a: 0, k: -220.3 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Shape 1", it: [{ ty: "sh", bm: 0, hd: !1, nm: "Path 1", d: 1, ks: { a: 0, k: { c: !1, i: [[0, 0], [0, 0]], o: [[0, 0], [0, 0]], v: [[-37.5, -40.5], [-1, 0.5]] } } }, { ty: "tm", bm: 0, hd: !1, nm: "Trim Paths 1", ix: 2, e: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [48], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [30], t: 56 }, { s: [10], t: 78 }], ix: 2 }, o: { a: 0, k: 0, ix: 3 }, s: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [47], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [29], t: 56 }, { s: [9], t: 78 }], ix: 1 }, m: 1 }, { ty: "st", bm: 0, hd: !1, nm: "Stroke 1", lc: 2, lj: 1, ml: 4, o: { a: 0, k: 100 }, w: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [5], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [2], t: 56 }, { s: [0], t: 70 }] }, c: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.8902, 0.6157, 0.6157], t: 44 }, { s: [0.7882, 0.6, 0.6], t: 56 }] } }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 5 }, { ty: 4, nm: "Dot9", sr: 1, st: -44, op: 90, ip: 44, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [40, 40, 100] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, r: { a: 0, k: -206.9 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Shape 1", it: [{ ty: "sh", bm: 0, hd: !1, nm: "Path 1", d: 1, ks: { a: 0, k: { c: !1, i: [[0, 0], [0, 0]], o: [[0, 0], [0, 0]], v: [[-37.5, -40.5], [-1, 0.5]] } } }, { ty: "tm", bm: 0, hd: !1, nm: "Trim Paths 1", ix: 2, e: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [45], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [20], t: 56 }, { s: [1], t: 89 }], ix: 2 }, o: { a: 0, k: 0, ix: 3 }, s: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [44], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [19], t: 56 }, { s: [0], t: 89 }], ix: 1 }, m: 1 }, { ty: "st", bm: 0, hd: !1, nm: "Stroke 1", lc: 2, lj: 1, ml: 4, o: { a: 0, k: 100 }, w: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [5], t: 56 }, { s: [0], t: 89 }] }, c: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.6196, 0.8784, 0.7804], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.7882, 0.6, 0.6], t: 56 }, { s: [0.7098, 0.2706, 0.6431], t: 66 }] } }, { ty: "tm", bm: 0, hd: !1, nm: "Trim Paths 2", ix: 4, e: { a: 0, k: 45, ix: 2 }, o: { a: 0, k: 0, ix: 3 }, s: { a: 0, k: 44, ix: 1 }, m: 1 }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 6 }, { ty: 4, nm: "Dot8", sr: 1, st: -44, op: 90, ip: 44, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [40, 40, 100] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, r: { a: 0, k: -168.2 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Shape 1", it: [{ ty: "sh", bm: 0, hd: !1, nm: "Path 1", d: 1, ks: { a: 0, k: { c: !1, i: [[0, 0], [0, 0]], o: [[0, 0], [0, 0]], v: [[-37.5, -40.5], [-1, 0.5]] } } }, { ty: "tm", bm: 0, hd: !1, nm: "Trim Paths 1", ix: 2, e: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [48], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [30], t: 56 }, { s: [10], t: 78 }], ix: 2 }, o: { a: 0, k: 0, ix: 3 }, s: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [47], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [29], t: 56 }, { s: [9], t: 78 }], ix: 1 }, m: 1 }, { ty: "st", bm: 0, hd: !1, nm: "Stroke 1", lc: 2, lj: 1, ml: 4, o: { a: 0, k: 100 }, w: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [5], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [2], t: 56 }, { s: [0], t: 70 }] }, c: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.8588, 0.6196, 0.6784], t: 44 }, { s: [0.3294, 0.6, 0.8], t: 56 }] } }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 7 }, { ty: 4, nm: "Dot7", sr: 1, st: -44, op: 90, ip: 44, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [40, 40, 100] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, r: { a: 0, k: -154.8 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Shape 1", it: [{ ty: "sh", bm: 0, hd: !1, nm: "Path 1", d: 1, ks: { a: 0, k: { c: !1, i: [[0, 0], [0, 0]], o: [[0, 0], [0, 0]], v: [[-37.5, -40.5], [-1, 0.5]] } } }, { ty: "tm", bm: 0, hd: !1, nm: "Trim Paths 1", ix: 2, e: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [45], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [20], t: 56 }, { s: [1], t: 89 }], ix: 2 }, o: { a: 0, k: 0, ix: 3 }, s: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [44], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [19], t: 56 }, { s: [0], t: 89 }], ix: 1 }, m: 1 }, { ty: "st", bm: 0, hd: !1, nm: "Stroke 1", lc: 2, lj: 1, ml: 4, o: { a: 0, k: 100 }, w: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [5], t: 56 }, { s: [0], t: 89 }] }, c: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.8902, 0.6, 0.6902], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.3294, 0.6, 0.8], t: 56 }, { s: [0.7098, 0.2706, 0.6431], t: 66 }] } }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 8 }, { ty: 4, nm: "Dot6", sr: 1, st: -44, op: 90, ip: 44, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [40, 40, 100] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, r: { a: 0, k: -117.1 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Shape 1", it: [{ ty: "sh", bm: 0, hd: !1, nm: "Path 1", d: 1, ks: { a: 0, k: { c: !1, i: [[0, 0], [0, 0]], o: [[0, 0], [0, 0]], v: [[-37.5, -40.5], [-1, 0.5]] } } }, { ty: "tm", bm: 0, hd: !1, nm: "Trim Paths 1", ix: 2, e: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [48], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [30], t: 56 }, { s: [10], t: 78 }], ix: 2 }, o: { a: 0, k: 0, ix: 3 }, s: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [47], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [29], t: 56 }, { s: [9], t: 78 }], ix: 1 }, m: 1 }, { ty: "st", bm: 0, hd: !1, nm: "Stroke 1", lc: 2, lj: 1, ml: 4, o: { a: 0, k: 100 }, w: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [5], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [2], t: 56 }, { s: [0], t: 70 }] }, c: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.6196, 0.8196, 0.9608], t: 44 }, { s: [0.702, 0.8392, 0.6588], t: 56 }] } }, { ty: "tm", bm: 0, hd: !1, nm: "Trim Paths 2", ix: 4, e: { a: 0, k: 30, ix: 2 }, o: { a: 0, k: 0, ix: 3 }, s: { a: 0, k: 29, ix: 1 }, m: 1 }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 9 }, { ty: 4, nm: "Dot5", sr: 1, st: -44, op: 90, ip: 44, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [40, 40, 100] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, r: { a: 0, k: -103.7 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Shape 1", it: [{ ty: "sh", bm: 0, hd: !1, nm: "Path 1", d: 1, ks: { a: 0, k: { c: !1, i: [[0, 0], [0, 0]], o: [[0, 0], [0, 0]], v: [[-37.5, -40.5], [-1, 0.5]] } } }, { ty: "tm", bm: 0, hd: !1, nm: "Trim Paths 1", ix: 2, e: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [45], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [20], t: 56 }, { s: [1], t: 89 }], ix: 2 }, o: { a: 0, k: 0, ix: 3 }, s: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [44], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [19], t: 56 }, { s: [0], t: 89 }], ix: 1 }, m: 1 }, { ty: "st", bm: 0, hd: !1, nm: "Stroke 1", lc: 2, lj: 1, ml: 4, o: { a: 0, k: 100 }, w: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [5], t: 56 }, { s: [0], t: 89 }] }, c: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.7216, 0.851, 0.949], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.702, 0.8392, 0.6706], t: 56 }, { s: [0.7098, 0.2706, 0.6431], t: 66 }] } }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 10 }, { ty: 4, nm: "Dot4", sr: 1, st: -44, op: 90, ip: 44, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [40, 40, 100] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, r: { a: 0, k: -69.3 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Shape 1", it: [{ ty: "sh", bm: 0, hd: !1, nm: "Path 1", d: 1, ks: { a: 0, k: { c: !1, i: [[0, 0], [0, 0]], o: [[0, 0], [0, 0]], v: [[-37.5, -40.5], [-1, 0.5]] } } }, { ty: "tm", bm: 0, hd: !1, nm: "Trim Paths 1", ix: 2, e: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [48], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [30], t: 56 }, { s: [10], t: 78 }], ix: 2 }, o: { a: 0, k: 0, ix: 3 }, s: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [47], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [29], t: 56 }, { s: [9], t: 78 }], ix: 1 }, m: 1 }, { ty: "st", bm: 0, hd: !1, nm: "Stroke 1", lc: 2, lj: 1, ml: 4, o: { a: 0, k: 100 }, w: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [5], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [2], t: 56 }, { s: [0], t: 70 }] }, c: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.9294, 0.5765, 0.5765], t: 44 }, { s: [0.851, 0.6549, 0.6549], t: 56 }] } }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 11 }, { ty: 4, nm: "Dot3", sr: 1, st: -44, op: 90, ip: 44, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [40, 40, 100] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, r: { a: 0, k: -55.9 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Shape 1", it: [{ ty: "sh", bm: 0, hd: !1, nm: "Path 1", d: 1, ks: { a: 0, k: { c: !1, i: [[0, 0], [0, 0]], o: [[0, 0], [0, 0]], v: [[-37.5, -40.5], [-1, 0.5]] } } }, { ty: "tm", bm: 0, hd: !1, nm: "Trim Paths 1", ix: 2, e: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [45], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [20], t: 56 }, { s: [1], t: 89 }], ix: 2 }, o: { a: 0, k: 0, ix: 3 }, s: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [44], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [19], t: 56 }, { s: [0], t: 89 }], ix: 1 }, m: 1 }, { ty: "st", bm: 0, hd: !1, nm: "Stroke 1", lc: 2, lj: 1, ml: 4, o: { a: 0, k: 100 }, w: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [5], t: 56 }, { s: [0], t: 89 }] }, c: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.6392, 0.8118, 0.9686], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.851, 0.6549, 0.6549], t: 56 }, { s: [0.7098, 0.2706, 0.6431], t: 66 }] } }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 12 }, { ty: 4, nm: "Dot2", sr: 1, st: -44, op: 90, ip: 44, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [40, 40, 100] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, r: { a: 0, k: -13.4 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Shape 1", it: [{ ty: "sh", bm: 0, hd: !1, nm: "Path 1", d: 1, ks: { a: 0, k: { c: !1, i: [[0, 0], [0, 0]], o: [[0, 0], [0, 0]], v: [[-37.5, -40.5], [-1, 0.5]] } } }, { ty: "tm", bm: 0, hd: !1, nm: "Trim Paths 1", ix: 2, e: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [48], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [30], t: 56 }, { s: [10], t: 78 }], ix: 2 }, o: { a: 0, k: 0, ix: 3 }, s: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [47], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [29], t: 56 }, { s: [9], t: 78 }], ix: 1 }, m: 1 }, { ty: "st", bm: 0, hd: !1, nm: "Stroke 1", lc: 2, lj: 1, ml: 4, o: { a: 0, k: 100 }, w: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [5], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [2], t: 56 }, { s: [0], t: 70 }] }, c: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.8902, 0.6157, 0.6157], t: 44 }, { s: [0.6314, 0.5098, 0.6196], t: 56 }] } }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 13 }, { ty: 4, nm: "Dot1", sr: 1, st: -44, op: 90, ip: 44, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [40, 40, 100] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, r: { a: 0, k: 0 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Shape 1", it: [{ ty: "sh", bm: 0, hd: !1, nm: "Path 1", d: 1, ks: { a: 0, k: { c: !1, i: [[0, 0], [0, 0]], o: [[0, 0], [0, 0]], v: [[-37.5, -40.5], [-1, 0.5]] } } }, { ty: "tm", bm: 0, hd: !1, nm: "Trim Paths 1", ix: 2, e: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [45], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [20], t: 56 }, { s: [1], t: 89 }], ix: 2 }, o: { a: 0, k: 0, ix: 3 }, s: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [44], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [19], t: 56 }, { s: [0], t: 89 }], ix: 1 }, m: 1 }, { ty: "st", bm: 0, hd: !1, nm: "Stroke 1", lc: 2, lj: 1, ml: 4, o: { a: 0, k: 100 }, w: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [5], t: 56 }, { s: [0], t: 89 }] }, c: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.6196, 0.8784, 0.7804], t: 44 }, { o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.8, 0.5216, 0.7608], t: 56 }, { s: [0.7098, 0.2706, 0.6431], t: 66 }] } }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 14 }, { ty: 4, nm: "C2", sr: 1, st: -47, op: 46, ip: 38, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [40, 40, 100] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, r: { a: 0, k: 0 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Ellipse 1", it: [{ ty: "el", bm: 0, hd: !1, nm: "Ellipse Path 1", d: 1, p: { a: 0, k: [0, 0] }, s: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [25.744, 25.744], t: 38 }, { s: [60.744, 60.744], t: 45 }] } }, { ty: "st", bm: 0, hd: !1, nm: "Stroke 1", lc: 1, lj: 1, ml: 4, o: { a: 0, k: 100 }, w: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [23.3], t: 38 }, { s: [1], t: 45 }] }, c: { a: 0, k: [0.8118, 0.5804, 0.9608] } }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 15 }, { ty: 4, nm: "C1", sr: 1, st: -46, op: 39, ip: 33, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [0, 0, 0] }, s: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [4, 4, 100], t: 33 }, { s: [40, 40, 100], t: 39 }] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, r: { a: 0, k: 0 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Ellipse 1", it: [{ ty: "el", bm: 0, hd: !1, nm: "Ellipse Path 1", d: 1, p: { a: 0, k: [0, 0] }, s: { a: 0, k: [57.344, 57.344] } }, { ty: "fl", bm: 0, hd: !1, nm: "Fill 1", c: { a: 1, k: [{ o: { x: 0.167, y: 0.167 }, i: { x: 0.833, y: 0.833 }, s: [0.0627, 0.7255, 0.5059], t: 33 }, { s: [0.8118, 0.5608, 0.9686], t: 39 }] }, r: 2, o: { a: 0, k: 100 } }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 16 }, { ty: 4, nm: "H2", sr: 1, st: -46, op: 136, ip: 43, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [2.958, 2.958, 0] }, s: { a: 1, k: [{ o: { x: 0.68, y: 0 }, i: { x: 0.32, y: 1 }, s: [4, 4, 100], t: 43 }, { o: { x: 0.68, y: 0 }, i: { x: 0.32, y: 1 }, s: [48.44, 48.44, 100], t: 54 }, { o: { x: 0.68, y: 0 }, i: { x: 0.32, y: 1 }, s: [37.04, 37.04, 100], t: 70 }, { s: [40, 40, 100], t: 91 }] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50.217, 50.85, 0] }, r: { a: 0, k: 0 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Shape 1", it: [{ ty: "sh", bm: 0, hd: !1, nm: "Path 1", d: 1, ks: { a: 0, k: { c: !0, i: [[4.833, 0], [0, -3.333], [-3.25, 0], [0, 8.333], [3.917, 0], [0, 0]], o: [[-4.833, 0], [0, 7.667], [3.25, 0], [0, -4.5], [-3.917, 0], [0, 0]], v: [[-4.583, -10.167], [-11.25, -2.25], [2.833, 16.083], [17.167, -2.333], [10.167, -10], [2.917, -5.917]] } } }, { ty: "fl", bm: 0, hd: !1, nm: "Fill 1", c: { a: 0, k: [0.1333, 0.7725, 0.3686] }, r: 2, o: { a: 0, k: 100 } }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 17 }, { ty: 4, nm: "H1", sr: 1, st: -46, op: 33, ip: 30, hd: !1, ddd: 0, bm: 0, hasMask: !1, ao: 0, ks: { a: { a: 0, k: [2.958, 2.958, 0] }, s: { a: 0, k: [40, 40, 100] }, sk: { a: 0, k: 0 }, p: { a: 0, k: [50.217, 50.85, 0] }, r: { a: 0, k: 0 }, sa: { a: 0, k: 0 }, o: { a: 0, k: 100 } }, ef: [], shapes: [{ ty: "gr", bm: 0, hd: !1, nm: "Shape 1", it: [{ ty: "sh", bm: 0, hd: !1, nm: "Path 1", d: 1, ks: { a: 0, k: { c: !0, i: [[4.833, 0], [0, -3.333], [-3.25, 0], [0, 8.333], [3.917, 0], [0, 0]], o: [[-4.833, 0], [0, 7.667], [3.25, 0], [0, -4.5], [-3.917, 0], [0, 0]], v: [[-4.583, -10.167], [-11.25, -2.25], [2.833, 16.083], [17.167, -2.333], [10.167, -10], [2.917, -5.917]] } } }, { ty: "fl", bm: 0, hd: !1, nm: "Fill 1", c: { a: 0, k: [0.6706, 0.7294, 0.7608] }, r: 2, o: { a: 0, k: 100 } }, { ty: "tr", a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, sk: { a: 0, k: 0, ix: 4 }, p: { a: 0, k: [0, 0], ix: 2 }, r: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 5 }, o: { a: 0, k: 100, ix: 7 } }] }], ind: 18 }], v: "4.4.26", fr: 60, op: 116, ip: 30, assets: [] };

// app/components/HeartButton.tsx
var import_outline = require("@heroicons/react/24/outline"), import_jsx_runtime4 = require("react/jsx-runtime");
function HeartButton({ videoId, onHeartClick }) {
  let [hearted, setHearted] = (0, import_react4.useState)(!1);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "w-6 h-6 relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      import_outline.HeartIcon,
      {
        className: `peer/hearticon text-gray-300 hover:text-white cursor-pointer ${hearted ? "opacity-0" : ""}`,
        onClick: () => {
          let h = !hearted;
          setHearted(h), onHeartClick == null || onHeartClick({
            videoId,
            hearted: h
          });
        }
      }
    ),
    hearted && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "div",
      {
        className: `overflow-hidden w-14 h-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        -mt-0.5
        scale-125
        peer-hover/hearticon:brightness-150
        pointer-events-none
        `,
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          import_lottie_react.default,
          {
            autoplay: !0,
            loop: !1,
            animationData: heart_default,
            className: `w-32 h-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                `
          }
        )
      }
    )
  ] });
}

// app/root.tsx
var import_jsx_runtime5 = require("react/jsx-runtime"), meta = () => ({ title: "Chomper" }), links = () => [{ rel: "stylesheet", href: tailwind_default }];
async function loader({ request }) {
  let env = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    COMMIT_REF: process.env.COMMIT_REF
  };
  return console.log("debug root loader"), (0, import_node2.json)({
    user: await getUser(request),
    env
  });
}
function App() {
  var _a, _b, _c, _d, _e, _f;
  let { env } = (0, import_react5.useLoaderData)(), [supabase] = (0, import_react6.useState)(
    () => (0, import_auth_helpers_remix.createBrowserClient)(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  ), [playingVideoData, setPlayingVideoData] = (0, import_react6.useState)(), fetcher = (0, import_react5.useFetcher)(), [fetcherDataShouldUpdateState, setFetcherDataShouldUpdateState] = (0, import_react6.useState)(!1);
  (0, import_react6.useEffect)(() => {
    console.log("debug fetcher.data", fetcher.data);
    let { video } = fetcher.data || {};
    if (!video) {
      console.log("Fetched empty data");
      return;
    }
    if (!fetcherDataShouldUpdateState) {
      console.log("Should not update state, fetcher.data could have called effect because user navigated");
      return;
    }
    video.videoId == (playingVideoData == null ? void 0 : playingVideoData.videoId) && (setPlayingVideoData((v) => v ? {
      ...video,
      videoThumbnails: v.videoThumbnails
    } : video), setPlayerState({
      playing: !0,
      played: 0,
      playedSeconds: 0,
      loaded: 0,
      loadedSeconds: 0,
      buffering: !1,
      duration: void 0,
      progressValues: [0],
      error: !1
    }), setFetcherDataShouldUpdateState(!1));
  }, [fetcher.data]), (0, import_react6.useEffect)(() => {
    console.log("debug root re-render");
  }, []);
  let onHeartClick = async ({ videoId, hearted }) => {
    console.log("debug heart clicked", videoId, hearted);
  }, onThumbnailClick = async ({ videoId, thumbnailUrl, title, author }) => {
    if (console.log("clicked", videoId), videoId == (playingVideoData == null ? void 0 : playingVideoData.videoId)) {
      setPlayerState((p) => ({
        ...p,
        playing: !0
      }));
      return;
    }
    setPlayingVideoData({
      videoThumbnails: [{
        url: thumbnailUrl
      }],
      title,
      author,
      videoId
    }), setPlayerState({
      playing: !0,
      played: 0,
      playedSeconds: 0,
      loaded: 0,
      loadedSeconds: 0,
      buffering: !0,
      duration: void 0,
      progressValues: [0],
      error: !1
    }), fetcher.load(`/video/${videoId}`), setFetcherDataShouldUpdateState(!0);
  }, [playerState, setPlayerState] = (0, import_react6.useState)({
    playing: !1,
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
    buffering: !1,
    duration: void 0,
    progressValues: [0],
    error: !1
  }), playerRef = (0, import_react6.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("html", { lang: "en", className: "h-full scrollbar-none", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react5.Meta, {}),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react5.Links, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("body", { className: "h-full font-inter", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "min-h-screen bg-black flex flex-col", children: [
        playerState.error && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "bg-red-800 px-4 py-2 text-white", children: "Cannot play this song, please try another" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex-grow flex mt-2 h-0 mx-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            import_react_resizable.ResizableBox,
            {
              className: "flex",
              width: 400,
              handle: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: `h-full w-2 hover:cursor-e-resize flex-none 
          opacity-0 hover:opacity-100
          transition-opacity relative`, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_solid2.EllipsisVerticalIcon, { className: "absolute w-4 h-4 text-white top-1/2 -translate-x-1" }) }),
              minConstraints: [320, -1],
              resizeHandles: ["e"],
              axis: "x",
              children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: `
          overflow-y-hidden hover:overflow-y-auto scrollbar scrollbar-thumb-white/40 hover:scrollbar-thumb-white/60 scrollbar-track-transparent
          flex-grow
          flex
          flex-col
          space-y-2
          `, children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-neutral-900 rounded-lg px-6 py-4 flex-none space-y-6", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_react5.NavLink, { to: "/", className: ({ isActive, isPending }) => `${isActive ? "text-white" : "text-neutral-400"} flex items-center  space-x-4`, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_solid.HomeIcon, { className: "w-6 h-6" }),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-semibold", children: "Home" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_react5.NavLink, { to: "/search", className: ({ isActive, isPending }) => `${isActive ? "text-white" : "text-neutral-400"} flex items-center  space-x-4`, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_solid.MagnifyingGlassIcon, { className: "w-6 h-6" }),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-semibold", children: "Search" })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "bg-neutral-900 rounded-lg px-6 py-4 flex-1", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center text-neutral-400 space-x-4", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_solid.RectangleStackIcon, { className: "w-6 h-6" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-semibold", children: "Your Library" })
                ] }) })
              ] })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: `
          bg-neutral-900 
            overflow-y-auto scrollbar scrollbar-thumb-white/40 hover:scrollbar-thumb-white/60 scrollbar-track-transparent
            overflow-x-hidden
            w-full
            rounded-lg
            `, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react5.Outlet, { context: { supabase, env, onThumbnailClick } }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex-none bg-black h-20 grid grid-cols-11 px-4 space-x-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "col-span-3 flex space-x-4 items-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              cimage_default,
              {
                className: "w-24 aspect-video object-cover rounded-lg flex-none",
                src: (_b = (_a = playingVideoData == null ? void 0 : playingVideoData.videoThumbnails) == null ? void 0 : _a.at(0)) == null ? void 0 : _b.url,
                widthLargerThan: 960,
                heightLargerThan: 640
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex-shrink", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-sm text-white font-semibold line-clamp-1", children: ((_c = playingVideoData == null ? void 0 : playingVideoData.musicTracks) == null ? void 0 : _c.at(0).song) || (playingVideoData == null ? void 0 : playingVideoData.title) || "No Title Playing" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-neutral-400 line-clamp-1", children: ((_d = playingVideoData == null ? void 0 : playingVideoData.musicTracks) == null ? void 0 : _d.at(0).artist) || (playingVideoData == null ? void 0 : playingVideoData.author) || "Author" })
            ] }),
            playingVideoData && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex-none", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HeartButton, { videoId: playingVideoData.videoId, onHeartClick }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "col-span-5 flex items-center ", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-1 w-full ", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_solid2.BackwardIcon, { className: "w-6 h-6 text-neutral-400" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "button",
                {
                  className: ` ${playingVideoData ? "hover:scale-105" : "opacity-70"}`,
                  onClick: () => {
                    playingVideoData != null && setPlayerState((p) => ({ ...p, playing: !p.playing }));
                  },
                  children: playerState.playing ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_solid2.PauseCircleIcon, { className: "w-10 h-10 text-white" }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_solid2.PlayCircleIcon, { className: "w-10 h-10 text-white" })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_solid2.ForwardIcon, { className: "w-6 h-6 text-neutral-400" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-x-2 mx-auto flex items-center ", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-neutral-400 w-10 text-center", children: new Date(playerState.playedSeconds * 1e3).toISOString().substring(14, 19) }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                import_react_range.Range,
                {
                  step: 1e-3,
                  min: 0,
                  max: 1,
                  values: playerState.progressValues,
                  onChange: (values) => {
                    setPlayerState((p) => ({
                      ...p,
                      progressValues: values
                    }));
                  },
                  onFinalChange: (values) => {
                    var _a2;
                    setPlayerState((p) => ({
                      ...p,
                      progressValues: values
                    })), (_a2 = playerRef == null ? void 0 : playerRef.current) == null || _a2.seekTo(values[0]);
                  },
                  renderTrack: ({ props, children }) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                    "div",
                    {
                      onMouseDown: props.onMouseDown,
                      onTouchStart: props.onTouchStart,
                      className: "w-full py-1 group flex ",
                      style: props.style,
                      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                        "div",
                        {
                          className: `w-full h-1 rounded-full overflow-hidden bg-white group-hover:bg-green-500 ${playerState.buffering ? "animate-pulse" : ""}`,
                          children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                            "div",
                            {
                              ref: props.ref,
                              style: {
                                background: (0, import_react_range.getTrackBackground)({
                                  values: playerState.progressValues,
                                  colors: [
                                    "transparent",
                                    playerState.buffering ? "#737373" : "#525252"
                                  ],
                                  min: 0,
                                  max: 1
                                })
                              },
                              className: "w-full h-1",
                              children
                            }
                          )
                        }
                      )
                    }
                  ),
                  renderThumb: ({ props, isDragged }) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                    "div",
                    {
                      className: "invisible group-hover:visible focus:outline-none h-3 w-3 rounded-full shadow bg-white",
                      ...props,
                      style: {
                        ...props.style,
                        ...isDragged && { visibility: "visible" }
                      }
                    }
                  )
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-neutral-400 w-10", children: playerState.duration ? new Date(playerState.duration * 1e3).toISOString().substring(14, 19) : "--:--" })
            ] })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "col-span-3 flex items-center space-x-2 justify-end ", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_outline2.Bars3BottomRightIcon, { className: "w-6 h-6 text-neutral-400 flex-none" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_outline2.SpeakerWaveIcon, { className: "w-6 h-6 text-neutral-400 flex-none" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "h-1 bg-white w-1/2 rounded-full flex-shrink" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            Player,
            {
              playerRef,
              onVideoError: () => {
                setPlayerState((p) => ({
                  ...p,
                  playing: !0,
                  played: 0,
                  playedSeconds: 0,
                  loaded: 0,
                  loadedSeconds: 0,
                  error: !0
                }));
              },
              onReady: () => {
                setPlayerState((p) => ({
                  ...p,
                  playing: !0,
                  played: 0,
                  playedSeconds: 0,
                  loaded: 0,
                  loadedSeconds: 0
                }));
              },
              playing: playerState.playing,
              onProgress: ({ played, playedSeconds, loaded, loadedSeconds }) => {
                setPlayerState((p) => ({
                  ...p,
                  played,
                  playedSeconds,
                  loaded,
                  loadedSeconds,
                  progressValues: [played]
                }));
              },
              onPause: () => setPlayerState((p) => ({
                ...p,
                playing: !1
              })),
              onEnded: () => setPlayerState((p) => ({
                ...p,
                playing: !1,
                played: 0,
                playedSeconds: 0,
                loaded: 0,
                loadedSeconds: 0,
                progressValues: [0]
              })),
              onBuffer: () => {
                console.log("Start buffering"), setPlayerState((p) => ({
                  ...p,
                  buffering: !0
                }));
              },
              onBufferEnd: () => {
                console.log("Done buffering"), setPlayerState((p) => ({
                  ...p,
                  buffering: !1
                }));
              },
              onDuration: (duration) => {
                console.log("debug duration", duration), setPlayerState((p) => ({
                  ...p,
                  duration
                }));
              },
              urls: [
                (_f = (_e = playingVideoData == null ? void 0 : playingVideoData.adaptiveFormats) == null ? void 0 : _e.at(0)) == null ? void 0 : _f.url,
                `https://www.youtube.com/watch?v=${playingVideoData == null ? void 0 : playingVideoData.videoId}`
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react5.ScrollRestoration, {}),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("script", { async: !0, src: "https://analytics.umami.is/script.js", "data-website-id": "c5be99c2-ff1e-4af1-9a2e-99f571f2d804", "data-domains": "chomper.tri" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react5.Scripts, {}),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react5.LiveReload, {})
    ] })
  ] });
}

// app/routes/video.$videoId.tsx
var video_videoId_exports = {};
__export(video_videoId_exports, {
  loader: () => loader2
});
var import_node3 = require("@remix-run/node"), import_zod = require("zod"), import_zodix = require("zodix");

// app/utils.ts
var import_react7 = require("react"), import_react8 = require("@remix-run/react");
var SERVERS = [
  "https://vid.priv.au",
  "https://iv.melmac.space",
  // 'https://inv.tux.pizza',
  // 'https://inv.in.projectsegfau.lt',
  "https://inv.makerlab.tech",
  "https://invidious.slipfox.xyz",
  "https://inv.pistasjis.net",
  "https://par1.iv.ggtyler.dev",
  "https://iv.melmac.space",
  // 'https://invidious.lunar.icu',
  "https://yt.oelrichsgarcia.de"
  // 'https://inv.zzls.xyz'
], randomFetch = (input) => {
  let inp = `${SERVERS[Math.floor(Math.random() * SERVERS.length)]}/${input}`;
  return console.log("debug randomFetch", inp), fetch(inp);
};

// app/routes/video.$videoId.tsx
async function loader2({ params }) {
  let { videoId } = import_zodix.zx.parseParams(params, {
    videoId: import_zod.z.string().trim().min(1).max(256)
  });
  try {
    console.log("Fetching video data");
    let video = await (await randomFetch(`api/v1/videos/${videoId}`)).json();
    return console.log("got video"), (0, import_node3.json)({ video });
  } catch (error) {
    return console.error("Error fetching video:", error), (0, import_node3.json)({});
  }
}

// app/routes/auth.callback.tsx
var auth_callback_exports = {};
__export(auth_callback_exports, {
  loader: () => loader3
});
var import_node4 = require("@remix-run/node"), import_auth_helpers_remix2 = require("@supabase/auth-helpers-remix"), loader3 = async ({ request }) => {
  let response = new Response(), code = new URL(request.url).searchParams.get("code");
  return code && await (0, import_auth_helpers_remix2.createServerClient)(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    { request, response }
  ).auth.exchangeCodeForSession(code), (0, import_node4.redirect)("/", {
    headers: response.headers
  });
};

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action,
  loader: () => loader4
});
var import_node5 = require("@remix-run/node");
var action = async ({ request }) => logout(request);
async function loader4() {
  return (0, import_node5.redirect)("/");
}

// app/routes/search.tsx
var search_exports = {};
__export(search_exports, {
  action: () => action2,
  default: () => SearchPage,
  meta: () => meta2
});
var import_node6 = require("@remix-run/node"), import_react9 = require("@remix-run/react"), import_zodix2 = require("zodix"), import_zod2 = require("zod"), import_react_router = require("react-router"), import_jsx_runtime6 = require("react/jsx-runtime"), meta2 = () => ({ title: "Chomper - Search" });
async function action2({ request, params }) {
  let validate_results = await import_zodix2.zx.parseFormSafe(request, {
    q: import_zod2.z.string({
      invalid_type_error: "q is not string",
      required_error: "q is required"
    }).trim().min(1).max(256)
  });
  if (validate_results.success == !1)
    return console.log("error validate form", validate_results.error), (0, import_react_router.json)({
      errors: validate_results.error.errors.map((e) => e.message)
    });
  let url = `/search/${validate_results.data.q}`;
  return (0, import_node6.redirect)(url);
}
function SearchPage() {
  let context = (0, import_react9.useOutletContext)();
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "px-6 py-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react9.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "input",
      {
        type: "text",
        name: "q",
        className: `
            focus:outline-none
            focus:ring-none
            border-2
            border-white
            border-opacity-0
            focus:border-opacity-100
            bg-white/10 hover:bg-white/20 shadow  text-white px-4 py-2 rounded-full
            placeholder:text-neutral-400
            `,
        placeholder: "Search"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react9.Outlet, { context })
  ] });
}

// app/routes/search/index.tsx
var search_exports2 = {};
__export(search_exports2, {
  default: () => SearchIndexPage
});
var import_jsx_runtime7 = require("react/jsx-runtime");
function SearchIndexPage() {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { children: " Index " }) });
}

// app/routes/search/$q.tsx
var q_exports = {};
__export(q_exports, {
  default: () => SearchIndexPage2,
  loader: () => loader5
});
var import_node7 = require("@remix-run/node"), import_react10 = require("@remix-run/react"), import_zod3 = require("zod"), import_zodix3 = require("zodix");

// app/components/videoThumbnail.tsx
var import_solid3 = require("@heroicons/react/20/solid");
var import_jsx_runtime8 = require("react/jsx-runtime");
function VideoThumbnail({ url, title, author, videoId, onThumbnailClick }) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    "div",
    {
      className: `w-full p-4 bg-white/5 hover:bg-white/10 rounded transition-all duration-150
      cursor-pointer
      group
      `,
      onClick: () => {
        onThumbnailClick({
          videoId,
          thumbnailUrl: url,
          title,
          author
        });
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            cimage_default,
            {
              className: "object-cover aspect-video w-full rounded",
              src: url,
              widthLargerThan: 960,
              heightLargerThan: 640
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: `
                absolute
                hover:scale-105
                bottom-2 right-2
                drop-shadow-2xl 
                `, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { className: `p-3 
                    translate-y-2 opacity-0 
                    bg-green-500 
                    hover:bg-green-400 
                    group-hover:opacity-100 group-hover:translate-y-0 
                    transition-all duration-300
                    rounded-full
                `, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_solid3.PlayIcon, { className: "w-6 h-6 text-black" }) }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "pt-4 pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-sm font-semibold text-white line-clamp-2", children: title }) }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-sm text-neutral-400 line-clamp-1", children: author })
      ]
    }
  );
}
var videoThumbnail_default = VideoThumbnail;

// app/components/ThumbnailGrid.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function ThumbnailGrid({ videos, onThumbnailClick }) {
  let thumbnails = videos == null ? void 0 : videos.map((video) => {
    let thumbnail = video.videoThumbnails.find((x) => x.quality == "maxresdefault");
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      videoThumbnail_default,
      {
        onThumbnailClick,
        author: video.author,
        title: video.title,
        url: thumbnail.url,
        videoId: video.videoId
      },
      video.videoId
    );
  });
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "@container", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "grid grid-cols-1 @lg:grid-cols-2 @xl:grid-cols-3 @3xl:grid-cols-4 gap-6", children: thumbnails }) });
}

// app/routes/search/$q.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
async function loader5({ params }) {
  let { q } = import_zodix3.zx.parseParams(params, {
    q: import_zod3.z.string().trim().min(1).max(256)
  });
  try {
    let url = `api/v1/search?${new URLSearchParams({
      q,
      sort_by: "relevance"
    })}`, results = await (await randomFetch(url)).json();
    return console.log("got search results"), (0, import_node7.json)({
      results,
      q
    });
  } catch (error) {
    return console.error("Cannot fetch search results:", error), (0, import_node7.json)({
      errors: ["Cannot fetch search results"]
    });
  }
}
function SearchIndexPage2() {
  var _a;
  let loaderData = (0, import_react10.useLoaderData)(), { onThumbnailClick } = (0, import_react10.useOutletContext)(), videos = (_a = loaderData == null ? void 0 : loaderData.results) == null ? void 0 : _a.filter((x) => x.type == "video");
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-white font-bold text-2xl tracking-tight py-6", children: "Songs" }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      ThumbnailGrid,
      {
        videos,
        onThumbnailClick
      }
    )
  ] });
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => IndexPage,
  loader: () => loader6
});
var import_node8 = require("@remix-run/node"), import_react11 = require("@remix-run/react");
var import_jsx_runtime11 = require("react/jsx-runtime");
async function loader6({ request }) {
  try {
    let trendingVideos = await (await randomFetch("api/v1/trending?type=music")).json();
    return (0, import_node8.json)(
      { trendingVideos }
      // { headers: response.headers }
    );
  } catch (error) {
    return console.error("Error fetching trending videos:", error), (0, import_node8.json)({});
  }
}
function IndexPage() {
  let { trendingVideos } = (0, import_react11.useLoaderData)(), { onThumbnailClick } = (0, import_react11.useOutletContext)();
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "px-6 py-8 bg-gradient-to-b from-violet-950/60 bg-no-repeat bg-[length:auto_50vh]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-white font-bold text-3xl tracking-tight", children: "Good morning" }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-white font-bold text-2xl tracking-tight py-6", children: "Trending" }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      ThumbnailGrid,
      {
        videos: trendingVideos,
        onThumbnailClick
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "py-16", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-sm text-white font-semibold py-2", children: "Organization" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-sm text-neutral-400 py-2", children: "Chomper is a modern, open source front-end to both decentralized/centralized music. Powered by Invidious." })
    ] })
  ] });
}

// server-entry-module:@remix-run/dev/server-build
var route8 = __toESM(require_login()), route9 = __toESM(require_join());

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-6GVYCR4Y.js", imports: ["/build/_shared/chunk-VLYQO22T.js", "/build/_shared/chunk-62AYJGH4.js", "/build/_shared/chunk-JEXTG4C4.js", "/build/_shared/chunk-G5WX4PPA.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-VCAHZQDK.js", imports: ["/build/_shared/chunk-YNNGUTJ2.js", "/build/_shared/chunk-5TRFQBKG.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/auth.callback": { id: "routes/auth.callback", parentId: "root", path: "auth/callback", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.callback-AGR54CDW.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-AGJCL2QJ.js", imports: ["/build/_shared/chunk-KSL6T6QH.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/join": { id: "routes/join", parentId: "root", path: "join", index: void 0, caseSensitive: void 0, module: "/build/routes/join-H7TW5SQN.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-3KKR5BET.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-MWX2H6AO.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/search": { id: "routes/search", parentId: "root", path: "search", index: void 0, caseSensitive: void 0, module: "/build/routes/search-YT4LNTBN.js", imports: ["/build/_shared/chunk-FBVO3J4V.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/search/$q": { id: "routes/search/$q", parentId: "routes/search", path: ":q", index: void 0, caseSensitive: void 0, module: "/build/routes/search/$q-OSAWIGVD.js", imports: ["/build/_shared/chunk-KSL6T6QH.js", "/build/_shared/chunk-YNNGUTJ2.js", "/build/_shared/chunk-5TRFQBKG.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/search/index": { id: "routes/search/index", parentId: "routes/search", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/search/index-Q3FSX3GB.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/video.$videoId": { id: "routes/video.$videoId", parentId: "root", path: "video/:videoId", index: void 0, caseSensitive: void 0, module: "/build/routes/video.$videoId-CB7TDQAY.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, version: "e3f66ff8", hmr: void 0, url: "/build/manifest-E3F66FF8.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { v2_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !1, v2_headers: !1, v2_meta: !1, v2_normalizeFormMethod: !1, v2_routeConvention: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/video.$videoId": {
    id: "routes/video.$videoId",
    parentId: "root",
    path: "video/:videoId",
    index: void 0,
    caseSensitive: void 0,
    module: video_videoId_exports
  },
  "routes/auth.callback": {
    id: "routes/auth.callback",
    parentId: "root",
    path: "auth/callback",
    index: void 0,
    caseSensitive: void 0,
    module: auth_callback_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/search": {
    id: "routes/search",
    parentId: "root",
    path: "search",
    index: void 0,
    caseSensitive: void 0,
    module: search_exports
  },
  "routes/search/index": {
    id: "routes/search/index",
    parentId: "routes/search",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: search_exports2
  },
  "routes/search/$q": {
    id: "routes/search/$q",
    parentId: "routes/search",
    path: ":q",
    index: void 0,
    caseSensitive: void 0,
    module: q_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/join": {
    id: "routes/join",
    parentId: "root",
    path: "join",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
