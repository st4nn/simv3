var Alertify = function(e, t) {
    "use strict";
    var n, i = e.document;
    n = function() {
        function n(e, t, n) {
            for(var o = "undefined" != typeof n ? [n] : i.styleSheets, s = 0, r = o.length; r > s; s++)
                if(n = o[s], n.cssRules)
                    for(var a = 0, l = n.cssRules.length; l > a; a++) {
                        var c = n.cssRules[a];
                        if(c.selectorText && -1 !== c.selectorText.split(",").indexOf(t)) return c.style[e]
                    }
                return null
        }
        var o, s, r, a, l, c, u, f, d, y, p, h, m, v = {},
            b = {},
            g = !1,
            k = {
                ENTER: 13,
                ESC: 27,
                SPACE: 32
            },
            E = [];
        return b = {
            buttons: {
                holder: '<nav class="alertify-buttons">{{buttons}}</nav>',
                submit: '<button type="submit" class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</button>',
                ok: '<button class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</button>',
                cancel: '<button class="alertify-button alertify-button-cancel" id="alertify-cancel">{{cancel}}</button>'
            },
            input: '<div class="alertify-text-wrapper"><input type="text" class="alertify-text" id="alertify-text"></div>',
            message: '<p class="alertify-message">{{message}}</p>',
            log: '<article class="alertify-log{{class}}">{{message}}</article>'
        }, m = function() {
            var e, n, o = !1,
                s = i.createElement("fakeelement"),
                r = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "otransitionend",
                    transition: "transitionend"
                };
            for(e in r)
                if(r.hasOwnProperty(e) && s.style[e] !== t) {
                    n = r[e], o = !0;
                    break
                }
            return {
                type: n,
                supported: o
            }
        }, o = function(e) {
            return i.getElementById(e)
        }, v = {
            labels: {
                ok: "OK",
                cancel: "Cancelar"
            },
            delay: 5e3,
            buttonReverse: !1,
            buttonFocus: "ok",
            transition: t,
            keydown: !1,
            addListeners: function(t) {
                var n, i, o, c, u, f, d = "undefined" != typeof r,
                    y = "undefined" != typeof s,
                    p = "undefined" != typeof h,
                    m = "",
                    v = this;
                i = function(e) {
                    e.preventDefault(), c(e), "undefined" != typeof h && (m = h.value), "function" == typeof t && ("undefined" != typeof h ? t(!0, m) : t(!0))
                }, o = function(e) {
                    e.preventDefault(), c(e), "function" == typeof t && t(!1)
                }, c = function() {
                    v.hide(), e.removeEventListener("keyup", u), e.removeEventListener("keydown", n), e.removeEventListener("focus", f), d && r.removeEventListener("click", i), y && s.removeEventListener("click", o)
                }, u = function(e) {
                    var t = e.keyCode;
                    v.keydown = !1, t === k.SPACE && !p || p && t === k.ENTER ? i(e) : t === k.ESC && y && o(e)
                }, n = function() {
                    v.keydown = !0
                }, f = function() {
                    p ? h.focus() : !y || v.buttonReverse ? r.focus() : s.focus()
                }, a.addEventListener("focus", f), l.addEventListener("focus", f), d && r.addEventListener("click", i), y && s.addEventListener("click", o), e.addEventListener("keyup", u), e.addEventListener("keydown", n), this.transition.supported || this.setFocus()
            },
            handleErrors: function() {
                if("undefined" != typeof e.onerror) {
                    var t = this;
                    return e.onerror = function(e, n, i) {
                        t.error("[" + e + " on line " + i + " of " + n + "]", 0)
                    }, !0
                }
                return !1
            },
            appendButtons: function(e, t) {
                return this.buttonReverse ? t + e : e + t
            },
            build: function(e) {
                var t = "",
                    n = e.type,
                    i = e.message,
                    o = e.cssClass || "";
                switch(t += '<div class="alertify-dialog">', t += '<a id="alertify-resetFocusBack" class="alertify-resetFocus" href="#">Reset Focus</a>', "none" === v.buttonFocus && (t += '<a href="#" id="alertify-noneFocus" class="alertify-hidden"></a>'), "prompt" === n && (t += '<div id="alertify-form">'), t += '<article class="alertify-inner">', t += b.message.replace("{{message}}", i), "prompt" === n && (t += b.input), t += b.buttons.holder, t += "</article>", "prompt" === n && (t += "</div>"), t += '<a id="alertify-resetFocus" class="alertify-resetFocus" href="#">Reset Focus</a>', t += "</div>", n) {
                    case "confirm":
                        t = t.replace("{{buttons}}", this.appendButtons(b.buttons.cancel, b.buttons.ok)), t = t.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
                        break;
                    case "prompt":
                        t = t.replace("{{buttons}}", this.appendButtons(b.buttons.cancel, b.buttons.submit)), t = t.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
                        break;
                    case "alert":
                        t = t.replace("{{buttons}}", b.buttons.ok), t = t.replace("{{ok}}", this.labels.ok)
                }
                return d.className = "alertify alertify-" + n + " " + o, f.className = "alertify-cover", t
            },
            close: function(e, t) {
                var i, o, s = t && !isNaN(t) ? +t : this.delay,
                    r = this;
                e.addEventListener("click", function() {
                    i(e)
                }), o = function(e) {
                    e.stopPropagation(), this.removeEventListener(r.transition.type, o), y.removeChild(this), y.hasChildNodes() || (y.className += " alertify-logs-hidden")
                }, i = function(e) {
                    if("undefined" != typeof e && e.parentNode === y)
                        if(r.transition.supported) {
                            e.addEventListener(r.transition.type, o), e.className += " alertify-log-hide";
                            var t = (n("transition-duration", ".alertify-log-hide") || n("-webkit-transition-duration", ".alertify-log-hide") || n("-moz-transition-duration", ".alertify-log-hide") || n("-o-transition-duration", ".alertify-log-hide") || "0").toLowerCase(),
                                i = parseInt(t),
                                s = 1;
                            (!i || isNaN(i)) && (i = 500), t.indexOf("ms") > -1 ? i += s : t.indexOf("s") > -1 && (i *= 1e3, i += s), setTimeout(function() {
                                "undefined" != typeof e && e.parentNode === y && y.removeChild(e)
                            }, i)
                        } else y.removeChild(e), y.hasChildNodes() || (y.className += " alertify-logs-hidden")
                }, 0 !== t && setTimeout(function() {
                    i(e)
                }, s)
            },
            dialog: function(e, t, n, o, s) {
                u = i.activeElement;
                var r = function() {
                    y && null !== y.scrollTop && f && null !== f.scrollTop || r()
                };
                if("string" != typeof e) throw new Error("message must be a string");
                if("string" != typeof t) throw new Error("type must be a string");
                if("undefined" != typeof n && "function" != typeof n) throw new Error("fn must be a function");
                return this.init(), r(), E.push({
                    type: t,
                    message: e,
                    callback: n,
                    placeholder: o,
                    cssClass: s
                }), g || this.setup(), this
            },
            extend: function(e) {
                if("string" != typeof e) throw new Error("extend method must have exactly one parameter");
                return function(t, n) {
                    return this.log(t, e, n), this
                }
            },
            hide: function() {
                var e, t = this;
                E.splice(0, 1), E.length > 0 ? this.setup(!0) : (g = !1, e = function(n) {
                    n.stopPropagation(), d.removeEventListener(t.transition.type, e)
                }, this.transition.supported ? (d.addEventListener(this.transition.type, e), d.className = "alertify alertify-hide alertify-hidden") : d.className = "alertify alertify-hide alertify-hidden alertify-isHidden", f.className = "alertify-cover alertify-cover-hidden", setTimeout(function() {
                    t.keydown ? i.body.focus() : u.focus()
                }))
            },
            init: function() {
                null == o("alertify-cover") && (f = i.createElement("div"), f.setAttribute("id", "alertify-cover"), f.className = "alertify-cover alertify-cover-hidden", i.body.appendChild(f)), null == o("alertify") && (g = !1, E = [], d = i.createElement("section"), d.setAttribute("id", "alertify"), d.className = "alertify alertify-hidden", i.body.appendChild(d)), null == o("alertify-logs") && (y = i.createElement("section"), y.setAttribute("id", "alertify-logs"), y.className = "alertify-logs alertify-logs-hidden", i.body.appendChild(y)), i.body.setAttribute("tabindex", "0"), this.transition = m()
            },
            log: function(e, t, n, i) {
                var o = function() {
                    y && null !== y.scrollTop || o()
                };
                return this.init(), o(), y.className = "alertify-logs", this.notify(e, t, n, i), this
            },
            notify: function(e, t, n, o) {
                var s = i.createElement("article");
                s.className = "alertify-log" + ("string" == typeof t && "" !== t ? " alertify-log-" + t : ""), s.innerHTML = e, "function" == typeof o && s.addEventListener("click", o), y.appendChild(s), setTimeout(function() {
                    s.className = s.className + " alertify-log-show"
                }, 50), this.close(s, n)
            },
            set: function(e) {
                var t;
                if("object" != typeof e && e instanceof Array) throw new Error("args must be an object");
                for(t in e) e.hasOwnProperty(t) && (this[t] = e[t])
            },
            setFocus: function() {
                h ? (h.focus(), h.select()) : c.focus()
            },
            setup: function(e) {
                var n, i = E[0],
                    u = this;
                g = !0, n = function(e) {
                    e.stopPropagation(), u.setFocus(), d.removeEventListener(u.transition.type, n)
                }, this.transition.supported && !e && d.addEventListener(this.transition.type, n), d.innerHTML = this.build(i), a = o("alertify-resetFocus"), l = o("alertify-resetFocusBack"), r = o("alertify-ok") || t, s = o("alertify-cancel") || t, c = "cancel" === v.buttonFocus ? s : "none" === v.buttonFocus ? o("alertify-noneFocus") : r, h = o("alertify-text") || t, p = o("alertify-form") || t, "string" == typeof i.placeholder && "" !== i.placeholder && (h.value = i.placeholder), e && this.setFocus(), this.addListeners(i.callback)
            }
        }, {
            alert: function(e, t, n) {
                return v.dialog(e, "alert", t, "", n), this
            },
            confirm: function(e, t, n) {
                return v.dialog(e, "confirm", t, "", n), this
            },
            extend: v.extend,
            init: v.init,
            log: function(e, t, n, i) {
                return v.log(e, t, n, i), this
            },
            prompt: function(e, t, n, i) {
                return v.dialog(e, "prompt", t, n, i), this
            },
            success: function(e, t, n) {
                return v.log(e, "success", t, n), this
            },
            error: function(e, t, n) {
                return v.log(e, "error", t, n), this
            },
            set: function(e) {
                v.set(e)
            },
            labels: v.labels,
            debug: v.handleErrors
        }
    }, "undefined" != typeof module && module && module.exports ? module.exports = n : "function" == typeof define && define.amd ? define(function() {
        return n
    }) : e.alertify = new n
}("undefined" != typeof window ? window : {});
//# sourceMappingURL=alertify.js.map