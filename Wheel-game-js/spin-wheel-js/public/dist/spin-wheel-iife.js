/**
 * spin-wheel (IIFE) v4.3.1
 * https://github.com/CrazyTim/spin-wheel#readme
 * Copyright (c) CrazyTim 2023.
 * Distributed under the MIT license.
 */
var spinWheel = (() => {
  var p = Object.defineProperty;
  var N = Object.getOwnPropertyDescriptor;
  var j = Object.getOwnPropertyNames,
    y = Object.getOwnPropertySymbols;
  var I = Object.prototype.hasOwnProperty,
    H = Object.prototype.propertyIsEnumerable;
  var C = Math.pow,
    M = (i, e, t) =>
      e in i
        ? p(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
        : (i[e] = t),
    R = (i, e) => {
      for (var t in e || (e = {})) I.call(e, t) && M(i, t, e[t]);
      if (y) for (var t of y(e)) H.call(e, t) && M(i, t, e[t]);
      return i;
    };
  var X = (i, e) => {
      for (var t in e) p(i, t, { get: e[t], enumerable: !0 });
    },
    Y = (i, e, t, s) => {
      if ((e && typeof e == "object") || typeof e == "function")
        for (let r of j(e))
          !I.call(i, r) &&
            r !== t &&
            p(i, r, {
              get: () => e[r],
              enumerable: !(s = N(e, r)) || s.enumerable,
            });
      return i;
    };
  var q = (i) => Y(p({}, "__esModule", { value: !0 }), i);
  var Z = {};
  X(Z, { Wheel: () => w });
  function x(i = 0, e = 0, t = 14) {
    return parseFloat((Math.random() * (e - i) + i).toFixed(t));
  }
  function m(i = 0) {
    return (i * Math.PI) / 180;
  }
  function E(i, e, t) {
    return e < t ? e <= i && i < t : e <= i || i < t;
  }
  function W(i, e, t, s) {
    s.save(), (s.font = `1px ${e}`);
    let r = s.measureText(i).width;
    return s.restore(), t / r;
  }
  function A(i = { x: 0, y: 0 }, e, t, s) {
    return C(i.x - e, 2) + C(i.y - t, 2) <= C(s, 2);
  }
  function L(i = { x: 0, y: 0 }, e = {}, t = 1) {
    let s = e.getBoundingClientRect();
    return { x: (i.x - s.left) * t, y: (i.y - s.top) * t };
  }
  function P(i, e, t, s) {
    let r = i - t,
      n = e - s,
      a = Math.atan2(-n, -r);
    return (a *= 180 / Math.PI), a < 0 && (a += 360), a;
  }
  function $(i = 0, e = 0) {
    let t = i + e,
      s;
    return (
      t > 0 ? (s = t % 360) : (s = 360 + (t % 360)), s === 360 && (s = 0), s
    );
  }
  function T(i = 0, e = 0) {
    let t = 180 - e;
    return 180 - $(i, t);
  }
  function k(i = 0, e = 0, t = 1) {
    let s = ((i % 360) + e) % 360;
    return (
      (s = Q(s)), (s = (t === 1 ? 360 - s : 360 + s) % 360), (s *= t), i + s
    );
  }
  function c(i) {
    return typeof i == "object" && !Array.isArray(i) && i !== null;
  }
  function u(i) {
    return typeof i == "number" && !Number.isNaN(i);
  }
  function l({
    val: i,
    isValid: e,
    errorMessage: t,
    defaultValue: s,
    action: r = null,
  }) {
    if (e) return r ? r() : i;
    if (i === void 0) return s;
    throw new Error(t);
  }
  function v(i) {
    return i && i.complete && i.naturalWidth !== 0 && i.naturalHeight !== 0;
  }
  function Q(i = 0) {
    return Number(i.toFixed(9));
  }
  function V(i) {
    return Math.sin((i * Math.PI) / 2);
  }
  var U = Object.freeze({ left: "left", right: "right", center: "center" }),
    o = Object.freeze({
      wheel: {
        borderColor: "#000",
        borderWidth: 1,
        debug: !1,
        image: null,
        isInteractive: !0,
        itemBackgroundColors: ["#fff"],
        itemLabelAlign: U.right,
        itemLabelBaselineOffset: 0,
        itemLabelColors: ["#000"],
        itemLabelFont: "sans-serif",
        itemLabelFontSizeMax: 500,
        itemLabelRadius: 0.85,
        itemLabelRadiusMax: 0.2,
        itemLabelRotation: 0,
        itemLabelStrokeColor: "#fff",
        itemLabelStrokeWidth: 0,
        items: [],
        lineColor: "#000",
        lineWidth: 1,
        pixelRatio: 0,
        radius: 0.95,
        rotation: 0,
        rotationResistance: -35,
        rotationSpeedMax: 300,
        offset: { w: 0, h: 0 },
        onCurrentIndexChange: null,
        onRest: null,
        onSpin: null,
        overlayImage: null,
        pointerAngle: 0,
      },
      item: {
        backgroundColor: null,
        image: null,
        imageOpacity: 1,
        imageRadius: 0.5,
        imageRotation: 0,
        imageScale: 1,
        label: "",
        labelColor: null,
        value: null,
        weight: 1,
      },
    }),
    f = Object.freeze({
      pointerLineColor: "#ff00ff",
      labelOutlineColor: "#ff00ff",
      labelRadiusColor: "#00ff00",
      dragEventHue: 200,
    });
  function F(i = {}) {
    G(i),
      (i._handler_onResize = (t) => i.resize(t)),
      window.addEventListener("resize", i._handler_onResize);
    let e = () => {
      (i._mediaQueryList = window.matchMedia(
        `(resolution: ${window.devicePixelRatio}dppx)`
      )),
        i._mediaQueryList.addEventListener(
          "change",
          i._handler_onDevicePixelRatioChange,
          { once: !0 }
        );
    };
    (i._handler_onDevicePixelRatioChange = () => {
      i.resize(), e();
    }),
      e();
  }
  function D(i = {}) {
    let e = i.canvas;
    "PointerEvent" in window
      ? (e.removeEventListener("pointerdown", i._handler_onPointerDown),
        e.removeEventListener(
          "pointermove",
          i._handler_onPointerMoveRefreshCursor
        ))
      : (e.removeEventListener("touchstart", i._handler_onTouchStart),
        e.removeEventListener("mousedown", i._handler_onMouseDown),
        e.removeEventListener(
          "mousemove",
          i._handler_onMouseMoveRefreshCursor
        )),
      window.removeEventListener("resize", i._handler_onResize),
      i._mediaQueryList.removeEventListener(
        "change",
        i._handler_onDevicePixelRatioChange
      );
  }
  function G(i = {}) {
    let e = i.canvas;
    (i._handler_onPointerMoveRefreshCursor = (t = {}) => {
      let s = { x: t.clientX, y: t.clientY };
      (i._isCursorOverWheel = i.wheelHitTest(s)), i.refreshCursor();
    }),
      (i._handler_onMouseMoveRefreshCursor = (t = {}) => {
        let s = { x: t.clientX, y: t.clientY };
        (i._isCursorOverWheel = i.wheelHitTest(s)), i.refreshCursor();
      }),
      (i._handler_onPointerDown = (t = {}) => {
        let s = { x: t.clientX, y: t.clientY };
        if (!i.isInteractive || !i.wheelHitTest(s)) return;
        t.preventDefault(),
          i.dragStart(s),
          e.setPointerCapture(t.pointerId),
          e.addEventListener("pointermove", r),
          e.addEventListener("pointerup", n),
          e.addEventListener("pointercancel", n),
          e.addEventListener("pointerout", n);
        function r(a = {}) {
          a.preventDefault(), i.dragMove({ x: a.clientX, y: a.clientY });
        }
        function n(a = {}) {
          a.preventDefault(),
            e.releasePointerCapture(a.pointerId),
            e.removeEventListener("pointermove", r),
            e.removeEventListener("pointerup", n),
            e.removeEventListener("pointercancel", n),
            e.removeEventListener("pointerout", n),
            i.dragEnd();
        }
      }),
      (i._handler_onMouseDown = (t = {}) => {
        let s = { x: t.clientX, y: t.clientY };
        if (!i.isInteractive || !i.wheelHitTest(s)) return;
        i.dragStart(s),
          document.addEventListener("mousemove", r),
          document.addEventListener("mouseup", n);
        function r(a = {}) {
          a.preventDefault(), i.dragMove({ x: a.clientX, y: a.clientY });
        }
        function n(a = {}) {
          a.preventDefault(),
            document.removeEventListener("mousemove", r),
            document.removeEventListener("mouseup", n),
            i.dragEnd();
        }
      }),
      (i._handler_onTouchStart = (t = {}) => {
        let s = {
          x: t.targetTouches[0].clientX,
          y: t.targetTouches[0].clientY,
        };
        if (!i.isInteractive || !i.wheelHitTest(s)) return;
        t.preventDefault(),
          i.dragStart(s),
          e.addEventListener("touchmove", r),
          e.addEventListener("touchend", n),
          e.addEventListener("touchcancel", n);
        function r(a = {}) {
          a.preventDefault(),
            i.dragMove({
              x: a.targetTouches[0].clientX,
              y: a.targetTouches[0].clientY,
            });
        }
        function n(a = {}) {
          a.preventDefault(),
            e.removeEventListener("touchmove", r),
            e.removeEventListener("touchend", n),
            e.removeEventListener("touchcancel", n),
            i.dragEnd();
        }
      }),
      "PointerEvent" in window
        ? (e.addEventListener("pointerdown", i._handler_onPointerDown),
          e.addEventListener(
            "pointermove",
            i._handler_onPointerMoveRefreshCursor
          ))
        : (e.addEventListener("touchstart", i._handler_onTouchStart),
          e.addEventListener("mousedown", i._handler_onMouseDown),
          e.addEventListener("mousemove", i._handler_onMouseMoveRefreshCursor));
  }
  var S = class {
    constructor(e, t = {}) {
      if (!c(e)) throw new Error("wheel must be an instance of Wheel");
      if (!c(t) && t !== null)
        throw new Error("props must be an Object or null");
      this._wheel = e;
      for (let s of Object.keys(o.item)) this["_" + s] = o.item[s];
      t ? this.init(t) : this.init(o.item);
    }
    init(e = {}) {
      (this.backgroundColor = e.backgroundColor),
        (this.image = e.image),
        (this.imageOpacity = e.imageOpacity),
        (this.imageRadius = e.imageRadius),
        (this.imageRotation = e.imageRotation),
        (this.imageScale = e.imageScale),
        (this.label = e.label),
        (this.labelColor = e.labelColor),
        (this.value = e.value),
        (this.weight = e.weight);
    }
    get backgroundColor() {
      return this._backgroundColor;
    }
    set backgroundColor(e) {
      typeof e == "string"
        ? (this._backgroundColor = e)
        : (this._backgroundColor = o.item.backgroundColor),
        this._wheel.refresh();
    }
    get image() {
      return this._image;
    }
    set image(e) {
      let t;
      typeof e == "string"
        ? ((t = new Image()),
          (t.src = e),
          (t.onload = (s) => this._wheel.refresh()))
        : (t = o.item.image),
        (this._image = t),
        this._wheel.refresh();
    }
    get imageOpacity() {
      return this._imageOpacity;
    }
    set imageOpacity(e) {
      typeof e == "number"
        ? (this._imageOpacity = e)
        : (this._imageOpacity = o.item.imageOpacity),
        this._wheel.refresh();
    }
    get imageRadius() {
      return this._imageRadius;
    }
    set imageRadius(e) {
      typeof e == "number"
        ? (this._imageRadius = e)
        : (this._imageRadius = o.item.imageRadius),
        this._wheel.refresh();
    }
    get imageRotation() {
      return this._imageRotation;
    }
    set imageRotation(e) {
      typeof e == "number"
        ? (this._imageRotation = e)
        : (this._imageRotation = o.item.imageRotation),
        this._wheel.refresh();
    }
    get imageScale() {
      return this._imageScale;
    }
    set imageScale(e) {
      typeof e == "number"
        ? (this._imageScale = e)
        : (this._imageScale = o.item.imageScale),
        this._wheel.refresh();
    }
    get label() {
      return this._label;
    }
    set label(e) {
      typeof e == "string" ? (this._label = e) : (this._label = o.item.label),
        this._wheel.refresh();
    }
    get labelColor() {
      return this._labelColor;
    }
    set labelColor(e) {
      typeof e == "string"
        ? (this._labelColor = e)
        : (this._labelColor = o.item.labelColor),
        this._wheel.refresh();
    }
    get value() {
      return this._value;
    }
    set value(e) {
      e !== void 0 ? (this._value = e) : (this._value = o.item.value);
    }
    get weight() {
      return this._weight;
    }
    set weight(e) {
      typeof e == "number"
        ? (this._weight = e)
        : (this._weight = o.item.weight);
    }
    getIndex() {
      let e = this._wheel.items.findIndex((t) => t === this);
      if (e === -1) throw new Error("Item not found in parent Wheel");
      return e;
    }
    getCenterAngle() {
      let e = this._wheel.getItemAngles()[this.getIndex()];
      return e.start + (e.end - e.start) / 2;
    }
    getStartAngle() {
      return this._wheel.getItemAngles()[this.getIndex()].start;
    }
    getEndAngle() {
      return this._wheel.getItemAngles()[this.getIndex()].end;
    }
    getRandomAngle() {
      return x(this.getStartAngle(), this.getEndAngle());
    }
  };
  var w = class {
    constructor(e, t = {}) {
      if (!(e instanceof Element))
        throw new Error("container must be an instance of Element");
      if (!c(t) && t !== null)
        throw new Error("props must be an Object or null");
      (this._frameRequestId = null),
        (this._rotationSpeed = 0),
        (this._rotationDirection = 1),
        (this._spinToTimeEnd = null),
        (this._lastSpinFrameTime = null),
        (this._isCursorOverWheel = !1),
        this.add(e);
      for (let s of Object.keys(o.wheel)) this["_" + s] = o.wheel[s];
      t ? this.init(t) : this.init(o.wheel);
    }
    init(e = {}) {
      (this._isInitialising = !0),
        (this.borderColor = e.borderColor),
        (this.borderWidth = e.borderWidth),
        (this.debug = e.debug),
        (this.image = e.image),
        (this.isInteractive = e.isInteractive),
        (this.itemBackgroundColors = e.itemBackgroundColors),
        (this.itemLabelAlign = e.itemLabelAlign),
        (this.itemLabelBaselineOffset = e.itemLabelBaselineOffset),
        (this.itemLabelColors = e.itemLabelColors),
        (this.itemLabelFont = e.itemLabelFont),
        (this.itemLabelFontSizeMax = e.itemLabelFontSizeMax),
        (this.itemLabelRadius = e.itemLabelRadius),
        (this.itemLabelRadiusMax = e.itemLabelRadiusMax),
        (this.itemLabelRotation = e.itemLabelRotation),
        (this.itemLabelStrokeColor = e.itemLabelStrokeColor),
        (this.itemLabelStrokeWidth = e.itemLabelStrokeWidth),
        (this.items = e.items),
        (this.lineColor = e.lineColor),
        (this.lineWidth = e.lineWidth),
        (this.pixelRatio = e.pixelRatio),
        (this.rotationSpeedMax = e.rotationSpeedMax),
        (this.radius = e.radius),
        (this.rotation = e.rotation),
        (this.rotationResistance = e.rotationResistance),
        (this.offset = e.offset),
        (this.onCurrentIndexChange = e.onCurrentIndexChange),
        (this.onRest = e.onRest),
        (this.onSpin = e.onSpin),
        (this.overlayImage = e.overlayImage),
        (this.pointerAngle = e.pointerAngle);
    }
    add(e) {
      (this._canvasContainer = e),
        (this.canvas = document.createElement("canvas")),
        (this._context = this.canvas.getContext("2d")),
        this._canvasContainer.append(this.canvas),
        F(this),
        this._isInitialising === !1 && this.resize();
    }
    remove() {
      this.canvas !== null &&
        (window.cancelAnimationFrame(this._frameRequestId),
        D(this),
        this._canvasContainer.removeChild(this.canvas),
        (this._canvasContainer = null),
        (this.canvas = null),
        (this._context = null));
    }
    resize() {
      (this.canvas.style.width = this._canvasContainer.clientWidth + "px"),
        (this.canvas.style.height = this._canvasContainer.clientHeight + "px");
      let [e, t] = [
        this._canvasContainer.clientWidth * this.getActualPixelRatio(),
        this._canvasContainer.clientHeight * this.getActualPixelRatio(),
      ];
      (this.canvas.width = e), (this.canvas.height = t);
      let s = Math.min(e, t),
        r = { w: s - s * this.offset.w, h: s - s * this.offset.h },
        n = Math.min(e / r.w, t / r.h);
      (this._size = Math.max(r.w * n, r.h * n)),
        (this._center = {
          x: e / 2 + e * this.offset.w,
          y: t / 2 + t * this.offset.h,
        }),
        (this._actualRadius = (this._size / 2) * this.radius),
        (this.itemLabelFontSize =
          this.itemLabelFontSizeMax * (this._size / 500)),
        (this.labelMaxWidth =
          this._actualRadius *
          (this.itemLabelRadius - this.itemLabelRadiusMax));
      for (let a of this._items)
        this.itemLabelFontSize = Math.min(
          this.itemLabelFontSize,
          W(a.label, this.itemLabelFont, this.labelMaxWidth, this._context)
        );
      this.refresh();
    }
    draw(e = 0) {
      this._frameRequestId = null;
      let t = this._context;
      t.clearRect(0, 0, this.canvas.width, this.canvas.height),
        this.animateRotation(e);
      let s = this.getItemAngles(this._rotation),
        r = this.getScaledNumber(this._borderWidth);
      (t.textBaseline = "middle"),
        (t.textAlign = this.itemLabelAlign),
        (t.font = this.itemLabelFontSize + "px " + this.itemLabelFont),
        t.save();
      for (let [n, a] of s.entries()) {
        let h = new Path2D();
        h.moveTo(this._center.x, this._center.y),
          h.arc(
            this._center.x,
            this._center.y,
            this._actualRadius - r / 2,
            m(a.start + -90),
            m(a.end + -90)
          ),
          (this._items[n].path = h);
      }
      this.drawItemBackgrounds(t, s),
        this.drawItemImages(t, s),
        this.drawItemLines(t, s),
        this.drawItemLabels(t, s),
        this.drawBorder(t),
        this.drawImage(t, this._image, !1),
        this.drawImage(t, this._overlayImage, !0),
        this.drawPointerLine(t),
        this.drawDragEvents(t),
        (this._isInitialising = !1);
    }
    drawItemBackgrounds(e, t = []) {
      var s;
      for (let [r, n] of t.entries()) {
        let a = this._items[r];
        (e.fillStyle =
          (s = a.backgroundColor) != null
            ? s
            : this._itemBackgroundColors[
                r % this._itemBackgroundColors.length
              ]),
          e.fill(a.path);
      }
    }
    drawItemImages(e, t = []) {
      for (let [s, r] of t.entries()) {
        let n = this._items[s];
        if (!v(n.image)) continue;
        e.save(), e.clip(n.path);
        let a = r.start + (r.end - r.start) / 2;
        e.translate(
          this._center.x +
            Math.cos(m(a + -90)) * (this._actualRadius * n.imageRadius),
          this._center.y +
            Math.sin(m(a + -90)) * (this._actualRadius * n.imageRadius)
        ),
          e.rotate(m(a + n.imageRotation)),
          (e.globalAlpha = n.imageOpacity);
        let h = (this._size / 500) * n.image.width * n.imageScale,
          d = (this._size / 500) * n.image.height * n.imageScale,
          _ = -h / 2,
          b = -d / 2;
        e.drawImage(n.image, _, b, h, d), e.restore();
      }
    }
    drawImage(e, t, s = !1) {
      if (!v(t)) return;
      e.translate(this._center.x, this._center.y),
        s || e.rotate(m(this._rotation));
      let r = s ? this._size : this._size * this.radius,
        n = -(r / 2);
      e.drawImage(t, n, n, r, r), e.resetTransform();
    }
    drawPointerLine(e) {
      !this.debug ||
        (e.translate(this._center.x, this._center.y),
        e.rotate(m(this._pointerAngle + -90)),
        e.beginPath(),
        e.moveTo(0, 0),
        e.lineTo(this._actualRadius * 2, 0),
        (e.strokeStyle = f.pointerLineColor),
        (e.lineWidth = this.getScaledNumber(2)),
        e.stroke(),
        e.resetTransform());
    }
    drawBorder(e) {
      if (this._borderWidth <= 0) return;
      let t = this.getScaledNumber(this._borderWidth),
        s = this._borderColor || "transparent";
      if (
        (e.beginPath(),
        (e.strokeStyle = s),
        (e.lineWidth = t),
        e.arc(
          this._center.x,
          this._center.y,
          this._actualRadius - t / 2,
          0,
          2 * Math.PI
        ),
        e.stroke(),
        this.debug)
      ) {
        let r = this.getScaledNumber(1);
        e.beginPath(),
          (e.strokeStyle = e.strokeStyle = f.labelRadiusColor),
          (e.lineWidth = r),
          e.arc(
            this._center.x,
            this._center.y,
            this._actualRadius * this.itemLabelRadius,
            0,
            2 * Math.PI
          ),
          e.stroke(),
          e.beginPath(),
          (e.strokeStyle = e.strokeStyle = f.labelRadiusColor),
          (e.lineWidth = r),
          e.arc(
            this._center.x,
            this._center.y,
            this._actualRadius * this.itemLabelRadiusMax,
            0,
            2 * Math.PI
          ),
          e.stroke();
      }
    }
    drawItemLines(e, t = []) {
      if (this._lineWidth <= 0) return;
      let s = this.getScaledNumber(this._lineWidth),
        r = this.getScaledNumber(this._borderWidth);
      e.translate(this._center.x, this._center.y);
      for (let n of t)
        e.rotate(m(n.start + -90)),
          e.beginPath(),
          e.moveTo(0, 0),
          e.lineTo(this._actualRadius - r, 0),
          (e.strokeStyle = this.lineColor),
          (e.lineWidth = s),
          e.stroke(),
          e.rotate(-m(n.start + -90));
      e.resetTransform();
    }
    drawItemLabels(e, t = []) {
      let s = this.itemLabelFontSize * -this.itemLabelBaselineOffset,
        r = this.getScaledNumber(1),
        n = this.getScaledNumber(this._itemLabelStrokeWidth * 2);
      for (let [a, h] of t.entries()) {
        let d = this._items[a],
          _ =
            d.labelColor ||
            this._itemLabelColors[a % this._itemLabelColors.length] ||
            "transparent";
        if (d.label.trim() === "" || _ === "transparent") continue;
        e.save(), e.clip(d.path);
        let b = h.start + (h.end - h.start) / 2;
        e.translate(
          this._center.x +
            Math.cos(m(b + -90)) * (this._actualRadius * this.itemLabelRadius),
          this._center.y +
            Math.sin(m(b + -90)) * (this._actualRadius * this.itemLabelRadius)
        ),
          e.rotate(m(b + -90)),
          e.rotate(m(this.itemLabelRotation)),
          this.debug &&
            (e.beginPath(),
            e.moveTo(0, 0),
            e.lineTo(-this.labelMaxWidth, 0),
            (e.strokeStyle = f.labelOutlineColor),
            (e.lineWidth = r),
            e.stroke(),
            e.strokeRect(
              0,
              -this.itemLabelFontSize / 2,
              -this.labelMaxWidth,
              this.itemLabelFontSize
            )),
          this._itemLabelStrokeWidth > 0 &&
            ((e.lineWidth = n),
            (e.strokeStyle = this._itemLabelStrokeColor),
            (e.lineJoin = "round"),
            e.strokeText(d.label, 0, s)),
          (e.fillStyle = _),
          e.fillText(d.label, 0, s),
          e.restore();
      }
    }
    drawDragEvents(e) {
      var n;
      if (!this.debug || !((n = this.dragEvents) != null && n.length)) return;
      let t = [...this.dragEvents].reverse(),
        s = this.getScaledNumber(0.5),
        r = this.getScaledNumber(4);
      for (let [a, h] of t.entries()) {
        let d = (a / this.dragEvents.length) * 100;
        e.beginPath(),
          e.arc(h.x, h.y, r, 0, 2 * Math.PI),
          (e.fillStyle = `hsl(${f.dragEventHue},100%,${d}%)`),
          (e.strokeStyle = "#000"),
          (e.lineWidth = s),
          e.fill(),
          e.stroke();
      }
    }
    animateRotation(e = 0) {
      if (this._spinToTimeEnd !== null) {
        if (e >= this._spinToTimeEnd) {
          (this.rotation = this._spinToEndRotation),
            (this._spinToTimeEnd = null),
            this.raiseEvent_onRest();
          return;
        }
        let t = this._spinToTimeEnd - this._spinToTimeStart,
          s = (e - this._spinToTimeStart) / t;
        s = s < 0 ? 0 : s;
        let r = this._spinToEndRotation - this._spinToStartRotation;
        (this.rotation =
          this._spinToStartRotation + r * this._spinToEasingFunction(s)),
          this.refresh();
        return;
      }
      if (this._lastSpinFrameTime !== null) {
        let t = e - this._lastSpinFrameTime;
        t > 0 &&
          ((this.rotation += ((t / 1e3) * this._rotationSpeed) % 360),
          (this._rotationSpeed = this.getRotationSpeedPlusDrag(t)),
          this._rotationSpeed === 0
            ? (this.raiseEvent_onRest(), (this._lastSpinFrameTime = null))
            : (this._lastSpinFrameTime = e)),
          this.refresh();
        return;
      }
    }
    getRotationSpeedPlusDrag(e = 0) {
      let t =
        this._rotationSpeed +
        this.rotationResistance * (e / 1e3) * this._rotationDirection;
      return (this._rotationDirection === 1 && t < 0) ||
        (this._rotationDirection === -1 && t >= 0)
        ? 0
        : t;
    }
    spin(e = 0) {
      if (!u(e)) throw new Error("rotationSpeed must be a number");
      (this.dragEvents = []), this.beginSpin(e, "spin");
    }
    spinTo(e = 0, t = 0, s = null) {
      if (!u(e)) throw new Error("Error: rotation must be a number");
      if (!u(t)) throw new Error("Error: duration must be a number");
      this.stop(),
        (this.dragEvents = []),
        this.animate(e, t, s),
        this.raiseEvent_onSpin({
          method: "spinto",
          targetRotation: e,
          duration: t,
        });
    }
    spinToItem(e = 0, t = 0, s = !0, r = 1, n = 1, a = null) {
      this.stop(), (this.dragEvents = []);
      let h = s
          ? this.items[e].getCenterAngle()
          : this.items[e].getRandomAngle(),
        d = k(this.rotation, h - this._pointerAngle, n);
      (d += r * 360 * n),
        this.animate(d, t, a),
        this.raiseEvent_onSpin({
          method: "spintoitem",
          targetItemIndex: e,
          targetRotation: d,
          duration: t,
        });
    }
    animate(e, t, s) {
      (this._spinToStartRotation = this.rotation),
        (this._spinToEndRotation = e),
        (this._spinToTimeStart = performance.now()),
        (this._spinToTimeEnd = this._spinToTimeStart + t),
        (this._spinToEasingFunction = s || V),
        this.refresh();
    }
    stop() {
      (this._spinToTimeEnd = null),
        (this._rotationSpeed = 0),
        (this._lastSpinFrameTime = null);
    }
    getScaledNumber(e) {
      return (e / 500) * this._size;
    }
    getActualPixelRatio() {
      return this._pixelRatio !== 0
        ? this._pixelRatio
        : window.devicePixelRatio;
    }
    wheelHitTest(e = { x: 0, y: 0 }) {
      let t = L(e, this.canvas, this.getActualPixelRatio());
      return A(t, this._center.x, this._center.y, this._actualRadius);
    }
    refreshCursor() {
      if (this.isInteractive) {
        if (this.isDragging) {
          this.canvas.style.cursor = "grabbing";
          return;
        }
        if (this._isCursorOverWheel) {
          this.canvas.style.cursor = "grab";
          return;
        }
      }
      this.canvas.style.cursor = "";
    }
    getAngleFromCenter(e = { x: 0, y: 0 }) {
      return (P(this._center.x, this._center.y, e.x, e.y) + 90) % 360;
    }
    getCurrentIndex() {
      return this._currentIndex;
    }
    refreshCurrentIndex(e = []) {
      this._items.length === 0 && (this._currentIndex = -1);
      for (let [t, s] of e.entries())
        if (!!E(this._pointerAngle, s.start % 360, s.end % 360)) {
          if (this._currentIndex === t) break;
          (this._currentIndex = t),
            this._isInitialising || this.raiseEvent_onCurrentIndexChange();
          break;
        }
    }
    getItemAngles(e = 0) {
      let t = 0;
      for (let h of this.items) t += h.weight;
      let s = 360 / t,
        r,
        n = e,
        a = [];
      for (let h of this._items)
        (r = h.weight * s), a.push({ start: n, end: n + r }), (n += r);
      return (
        this._items.length > 1 && (a[a.length - 1].end = a[0].start + 360), a
      );
    }
    refresh() {
      this._frameRequestId === null &&
        (this._frameRequestId = window.requestAnimationFrame((e) =>
          this.draw(e)
        ));
    }
    limitSpeed(e = 0, t = 0) {
      let s = Math.min(e, t);
      return Math.max(s, -t);
    }
    beginSpin(e = 0, t = "") {
      this.stop(),
        (this._rotationSpeed = this.limitSpeed(e, this._rotationSpeedMax)),
        (this._lastSpinFrameTime = performance.now()),
        (this._rotationDirection = this._rotationSpeed >= 0 ? 1 : -1),
        this._rotationSpeed !== 0 &&
          this.raiseEvent_onSpin({
            method: t,
            rotationSpeed: this._rotationSpeed,
            rotationResistance: this._rotationResistance,
          }),
        this.refresh();
    }
    refreshAriaLabel() {
      this.canvas.setAttribute("role", "img");
      let e =
        this.items.length >= 2
          ? ` The wheel has ${this.items.length} slices.`
          : "";
      this.canvas.setAttribute(
        "aria-label",
        "An image of a spinning prize wheel." + e
      );
    }
    get borderColor() {
      return this._borderColor;
    }
    set borderColor(e) {
      (this._borderColor = l({
        val: e,
        isValid: typeof e == "string",
        errorMessage: "Wheel.borderColor must be a string",
        defaultValue: o.wheel.borderColor,
      })),
        this.refresh();
    }
    get borderWidth() {
      return this._borderWidth;
    }
    set borderWidth(e) {
      (this._borderWidth = l({
        val: e,
        isValid: u(e),
        errorMessage: "Wheel.borderWidth must be a number",
        defaultValue: o.wheel.borderWidth,
      })),
        this.refresh();
    }
    get debug() {
      return this._debug;
    }
    set debug(e) {
      (this._debug = l({
        val: e,
        isValid: typeof e == "boolean",
        errorMessage: "Wheel.debug must be a boolean",
        defaultValue: o.wheel.debug,
      })),
        this.refresh();
    }
    get image() {
      var e, t;
      return (t = (e = this._image) == null ? void 0 : e.src) != null
        ? t
        : null;
    }
    set image(e) {
      (this._image = l({
        val: e,
        isValid: typeof e == "string" || e === null,
        errorMessage: "Wheel.image must be a url (string) or null",
        defaultValue: o.wheel.image,
        action: () => {
          if (e === null) return null;
          let t = new Image();
          return (t.src = e), (t.onload = (s) => this.refresh()), t;
        },
      })),
        this.refresh();
    }
    get isInteractive() {
      return this._isInteractive;
    }
    set isInteractive(e) {
      (this._isInteractive = l({
        val: e,
        isValid: typeof e == "boolean",
        errorMessage: "Wheel.isInteractive must be a boolean",
        defaultValue: o.wheel.isInteractive,
      })),
        this.refreshCursor();
    }
    get itemBackgroundColors() {
      return this._itemBackgroundColors;
    }
    set itemBackgroundColors(e) {
      (this._itemBackgroundColors = l({
        val: e,
        isValid: Array.isArray(e),
        errorMessage: "Wheel.itemBackgroundColors must be an array",
        defaultValue: o.wheel.itemBackgroundColors,
      })),
        this.refresh();
    }
    get itemLabelAlign() {
      return this._itemLabelAlign;
    }
    set itemLabelAlign(e) {
      (this._itemLabelAlign = l({
        val: e,
        isValid: typeof e == "string",
        errorMessage: "Wheel.itemLabelAlign must be a string",
        defaultValue: o.wheel.itemLabelAlign,
      })),
        this.refresh();
    }
    get itemLabelBaselineOffset() {
      return this._itemLabelBaselineOffset;
    }
    set itemLabelBaselineOffset(e) {
      (this._itemLabelBaselineOffset = l({
        val: e,
        isValid: u(e),
        errorMessage: "Wheel.itemLabelBaselineOffset must be a number",
        defaultValue: o.wheel.itemLabelBaselineOffset,
      })),
        this.resize();
    }
    get itemLabelColors() {
      return this._itemLabelColors;
    }
    set itemLabelColors(e) {
      (this._itemLabelColors = l({
        val: e,
        isValid: Array.isArray(e),
        errorMessage: "Wheel.itemLabelColors must be an array",
        defaultValue: o.wheel.itemLabelColors,
      })),
        this.refresh();
    }
    get itemLabelFont() {
      return this._itemLabelFont;
    }
    set itemLabelFont(e) {
      (this._itemLabelFont = l({
        val: e,
        isValid: typeof e == "string",
        errorMessage: "Wheel.itemLabelFont must be a string",
        defaultValue: o.wheel.itemLabelFont,
      })),
        this.resize();
    }
    get itemLabelFontSizeMax() {
      return this._itemLabelFontSizeMax;
    }
    set itemLabelFontSizeMax(e) {
      (this._itemLabelFontSizeMax = l({
        val: e,
        isValid: u(e),
        errorMessage: "Wheel.itemLabelFontSizeMax must be a number",
        defaultValue: o.wheel.itemLabelFontSizeMax,
      })),
        this.resize();
    }
    get itemLabelRadius() {
      return this._itemLabelRadius;
    }
    set itemLabelRadius(e) {
      (this._itemLabelRadius = l({
        val: e,
        isValid: u(e),
        errorMessage: "Wheel.itemLabelRadius must be a number",
        defaultValue: o.wheel.itemLabelRadius,
      })),
        this.resize();
    }
    get itemLabelRadiusMax() {
      return this._itemLabelRadiusMax;
    }
    set itemLabelRadiusMax(e) {
      (this._itemLabelRadiusMax = l({
        val: e,
        isValid: u(e),
        errorMessage: "Wheel.itemLabelRadiusMax must be a number",
        defaultValue: o.wheel.itemLabelRadiusMax,
      })),
        this.resize();
    }
    get itemLabelRotation() {
      return this._itemLabelRotation;
    }
    set itemLabelRotation(e) {
      (this._itemLabelRotation = l({
        val: e,
        isValid: u(e),
        errorMessage: "Wheel.itemLabelRotation must be a number",
        defaultValue: o.wheel.itemLabelRotation,
      })),
        this.refresh();
    }
    get itemLabelStrokeColor() {
      return this._itemLabelStrokeColor;
    }
    set itemLabelStrokeColor(e) {
      (this._itemLabelStrokeColor = l({
        val: e,
        isValid: typeof e == "string",
        errorMessage: "Wheel.itemLabelStrokeColor must be a string",
        defaultValue: o.wheel.itemLabelStrokeColor,
      })),
        this.refresh();
    }
    get itemLabelStrokeWidth() {
      return this._itemLabelStrokeWidth;
    }
    set itemLabelStrokeWidth(e) {
      (this._itemLabelStrokeWidth = l({
        val: e,
        isValid: u(e),
        errorMessage: "Wheel.itemLabelStrokeWidth must be a number",
        defaultValue: o.wheel.itemLabelStrokeWidth,
      })),
        this.refresh();
    }
    get items() {
      return this._items;
    }
    set items(e) {
      (this._items = l({
        val: e,
        isValid: Array.isArray(e),
        errorMessage: "Wheel.items must be an array of Items",
        defaultValue: o.wheel.items,
        action: () => {
          let t = [];
          for (let s of e)
            t.push(
              new S(this, {
                backgroundColor: s.backgroundColor,
                image: s.image,
                imageRadius: s.imageRadius,
                imageRotation: s.imageRotation,
                imageScale: s.imageScale,
                label: s.label,
                labelColor: s.labelColor,
                value: s.value,
                weight: s.weight,
              })
            );
          return t;
        },
      })),
        this.refreshAriaLabel(),
        this.refreshCurrentIndex(this.getItemAngles(this._rotation)),
        this.resize();
    }
    get lineColor() {
      return this._lineColor;
    }
    set lineColor(e) {
      (this._lineColor = l({
        val: e,
        isValid: typeof e == "string",
        errorMessage: "Wheel.lineColor must be a string",
        defaultValue: o.wheel.lineColor,
      })),
        this.refresh();
    }
    get lineWidth() {
      return this._lineWidth;
    }
    set lineWidth(e) {
      (this._lineWidth = l({
        val: e,
        isValid: u(e),
        errorMessage: "Wheel.lineWidth must be a number",
        defaultValue: o.wheel.lineWidth,
      })),
        this.refresh();
    }
    get offset() {
      return this._offset;
    }
    set offset(e) {
      (this._offset = l({
        val: e,
        isValid: c(e),
        errorMessage: "Wheel.offset must be an object",
        defaultValue: o.wheel.offset,
      })),
        this.resize();
    }
    get onCurrentIndexChange() {
      return this._onCurrentIndexChange;
    }
    set onCurrentIndexChange(e) {
      this._onCurrentIndexChange = l({
        val: e,
        isValid: typeof e == "function" || e === null,
        errorMessage: "Wheel.onCurrentIndexChange must be a function or null",
        defaultValue: o.wheel.onCurrentIndexChange,
      });
    }
    get onRest() {
      return this._onRest;
    }
    set onRest(e) {
      this._onRest = l({
        val: e,
        isValid: typeof e == "function" || e === null,
        errorMessage: "Wheel.onRest must be a function or null",
        defaultValue: o.wheel.onRest,
      });
    }
    get onSpin() {
      return this._onSpin;
    }
    set onSpin(e) {
      this._onSpin = l({
        val: e,
        isValid: typeof e == "function" || e === null,
        errorMessage: "Wheel.onSpin must be a function or null",
        defaultValue: o.wheel.onSpin,
      });
    }
    get overlayImage() {
      var e, t;
      return (t = (e = this._overlayImage) == null ? void 0 : e.src) != null
        ? t
        : null;
    }
    set overlayImage(e) {
      (this._overlayImage = l({
        val: e,
        isValid: typeof e == "string" || e === null,
        errorMessage: "Wheel.overlayImage must be a url (string) or null",
        defaultValue: o.wheel.overlayImage,
        action: () => {
          if (e === null) return null;
          let t = new Image();
          return (t.src = e), (t.onload = (s) => this.refresh()), t;
        },
      })),
        this.refresh();
    }
    get pixelRatio() {
      return this._pixelRatio;
    }
    set pixelRatio(e) {
      (this._pixelRatio = l({
        val: e,
        isValid: u(e),
        errorMessage: "Wheel.pixelRatio must be a number",
        defaultValue: o.wheel.pixelRatio,
      })),
        (this.dragEvents = []),
        this.resize();
    }
    get pointerAngle() {
      return this._pointerAngle;
    }
    set pointerAngle(e) {
      (this._pointerAngle = l({
        val: e,
        isValid: u(e) && e >= 0,
        errorMessage: "Wheel.pointerAngle must be a number between 0 and 360",
        defaultValue: o.wheel.pointerAngle,
        action: () => e % 360,
      })),
        this.debug && this.refresh();
    }
    get radius() {
      return this._radius;
    }
    set radius(e) {
      (this._radius = l({
        val: e,
        isValid: u(e),
        errorMessage: "Wheel.radius must be a number",
        defaultValue: o.wheel.radius,
      })),
        this.resize();
    }
    get rotation() {
      return this._rotation;
    }
    set rotation(e) {
      (this._rotation = l({
        val: e,
        isValid: u(e),
        errorMessage: "Wheel.rotation must be a number",
        defaultValue: o.wheel.rotation,
      })),
        this.refreshCurrentIndex(this.getItemAngles(this._rotation)),
        this.refresh();
    }
    get rotationResistance() {
      return this._rotationResistance;
    }
    set rotationResistance(e) {
      this._rotationResistance = l({
        val: e,
        isValid: u(e),
        errorMessage: "Wheel.rotationResistance must be a number",
        defaultValue: o.wheel.rotationResistance,
      });
    }
    get rotationSpeed() {
      return this._rotationSpeed;
    }
    get rotationSpeedMax() {
      return this._rotationSpeedMax;
    }
    set rotationSpeedMax(e) {
      this._rotationSpeedMax = l({
        val: e,
        isValid: u(e) && e >= 0,
        errorMessage: "Wheel.rotationSpeedMax must be a number >= 0",
        defaultValue: o.wheel.rotationSpeedMax,
      });
    }
    dragStart(e = { x: 0, y: 0 }) {
      let t = L(e, this.canvas, this.getActualPixelRatio());
      (this.isDragging = !0),
        this.stop(),
        (this.dragEvents = [
          { distance: 0, x: t.x, y: t.y, now: performance.now() },
        ]),
        this.refreshCursor();
    }
    dragMove(e = { x: 0, y: 0 }) {
      let t = L(e, this.canvas, this.getActualPixelRatio()),
        s = this.getAngleFromCenter(t),
        r = this.dragEvents[0],
        n = this.getAngleFromCenter(r),
        a = T(n, s);
      this.dragEvents.unshift({
        distance: a,
        x: t.x,
        y: t.y,
        now: performance.now(),
      }),
        this.debug && this.dragEvents.length >= 40 && this.dragEvents.pop(),
        (this.rotation += a);
    }
    dragEnd() {
      this.isDragging = !1;
      let e = 0,
        t = performance.now();
      for (let [s, r] of this.dragEvents.entries()) {
        if (!this.isDragEventTooOld(t, r)) {
          e += r.distance;
          continue;
        }
        (this.dragEvents.length = s), this.debug && this.refresh();
        break;
      }
      this.refreshCursor(),
        e !== 0 && this.beginSpin(e * (1e3 / 250), "interact");
    }
    isDragEventTooOld(e = 0, t = {}) {
      return e - t.now > 250;
    }
    raiseEvent_onCurrentIndexChange(e = {}) {
      var t;
      (t = this.onCurrentIndexChange) == null ||
        t.call(
          this,
          R({ type: "currentIndexChange", currentIndex: this._currentIndex }, e)
        );
    }
    raiseEvent_onRest(e = {}) {
      var t;
      (t = this.onRest) == null ||
        t.call(
          this,
          R(
            {
              type: "rest",
              currentIndex: this._currentIndex,
              rotation: this._rotation,
            },
            e
          )
        );
    }
    raiseEvent_onSpin(e = {}) {
      var t;
      (t = this.onSpin) == null || t.call(this, R({ type: "spin" }, e));
    }
  };
  return q(Z);
})();
