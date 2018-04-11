 function Point2D(e, t) {
     arguments.length > 0 && (this.x = e, this.y = t)
 }

 function stackBlurImage(e, t, r, i) {
     var n = document.getElementById(e),
         a = n.naturalWidth,
         o = n.naturalHeight,
         s = document.getElementById(t);
     s.style.width = a + "px", s.style.height = o + "px", s.width = a, s.height = o;
     var h = s.getContext("2d");
     h.clearRect(0, 0, a, o), h.drawImage(n, 0, 0), isNaN(r) || 1 > r || (i ? stackBlurCanvasRGBA(t, 0, 0, a, o, r) : stackBlurCanvasRGB(t, 0, 0, a, o, r))
 }

 function stackBlurCanvasRGBA(e, t, r, i, n, a) {
     if (!(isNaN(a) || 1 > a)) {
         a |= 0;
         var o = e.getContext("2d"),
             s;
         try {
             try {
                 s = o.getImageData(t, r, i, n)
             } catch (h) {
                 try {
                     netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"), s = o.getImageData(t, r, i, n)
                 } catch (h) {
                     throw alert("Cannot access local image"), new Error("unable to access local image data: " + h);
                     return
                 }
             }
         } catch (h) {
             throw alert("Cannot access image"), new Error("unable to access image data: " + h)
         }
         var l = s.data,
             u, c, d, f, p, m, E, g, v, y, T, R, x, H, _, b, w, M, S, C, A, L, P, D, F = a + a + 1,
             k = i << 2,
             B = i - 1,
             N = n - 1,
             I = a + 1,
             O = I * (I + 1) / 2,
             U = new BlurStack,
             V = U;
         for (d = 1; F > d; d++)
             if (V = V.next = new BlurStack, d == I) var z = V;
         V.next = U;
         var G = null,
             W = null;
         E = m = 0;
         var j = mul_table[a],
             X = shg_table[a];
         for (c = 0; n > c; c++) {
             for (b = w = M = S = g = v = y = T = 0, R = I * (C = l[m]), x = I * (A = l[m + 1]), H = I * (L = l[m + 2]), _ = I * (P = l[m + 3]), g += O * C, v += O * A, y += O * L, T += O * P, V = U, d = 0; I > d; d++) V.r = C, V.g = A, V.b = L, V.a = P, V = V.next;
             for (d = 1; I > d; d++) f = m + ((d > B ? B : d) << 2), g += (V.r = C = l[f]) * (D = I - d), v += (V.g = A = l[f + 1]) * D, y += (V.b = L = l[f + 2]) * D, T += (V.a = P = l[f + 3]) * D, b += C, w += A, M += L, S += P, V = V.next;
             for (G = U, W = z, u = 0; i > u; u++) l[m + 3] = P = T * j >> X, 0 != P ? (P = 255 / P, l[m] = (g * j >> X) * P, l[m + 1] = (v * j >> X) * P, l[m + 2] = (y * j >> X) * P) : l[m] = l[m + 1] = l[m + 2] = 0, g -= R, v -= x, y -= H, T -= _, R -= G.r, x -= G.g, H -= G.b, _ -= G.a, f = E + ((f = u + a + 1) < B ? f : B) << 2, b += G.r = l[f], w += G.g = l[f + 1], M += G.b = l[f + 2], S += G.a = l[f + 3], g += b, v += w, y += M, T += S, G = G.next, R += C = W.r, x += A = W.g, H += L = W.b, _ += P = W.a, b -= C, w -= A, M -= L, S -= P, W = W.next, m += 4;
             E += i
         }
         for (u = 0; i > u; u++) {
             for (w = M = S = b = v = y = T = g = 0, m = u << 2, R = I * (C = l[m]), x = I * (A = l[m + 1]), H = I * (L = l[m + 2]), _ = I * (P = l[m + 3]), g += O * C, v += O * A, y += O * L, T += O * P, V = U, d = 0; I > d; d++) V.r = C, V.g = A, V.b = L, V.a = P, V = V.next;
             for (p = i, d = 1; a >= d; d++) m = p + u << 2, g += (V.r = C = l[m]) * (D = I - d), v += (V.g = A = l[m + 1]) * D, y += (V.b = L = l[m + 2]) * D, T += (V.a = P = l[m + 3]) * D, b += C, w += A, M += L, S += P, V = V.next, N > d && (p += i);
             for (m = u, G = U, W = z, c = 0; n > c; c++) f = m << 2, l[f + 3] = P = T * j >> X, P > 0 ? (P = 255 / P, l[f] = (g * j >> X) * P, l[f + 1] = (v * j >> X) * P, l[f + 2] = (y * j >> X) * P) : l[f] = l[f + 1] = l[f + 2] = 0, g -= R, v -= x, y -= H, T -= _, R -= G.r, x -= G.g, H -= G.b, _ -= G.a, f = u + ((f = c + I) < N ? f : N) * i << 2, g += b += G.r = l[f], v += w += G.g = l[f + 1], y += M += G.b = l[f + 2], T += S += G.a = l[f + 3], G = G.next, R += C = W.r, x += A = W.g, H += L = W.b, _ += P = W.a, b -= C, w -= A, M -= L, S -= P, W = W.next, m += i
         }
         o.putImageData(s, t, r)
     }
 }

 function stackBlurCanvasRGB(e, t, r, i, n, a) {
     if (!(isNaN(a) || 1 > a)) {
         a |= 0, null == e && alert("stackBlurCanvasRGB: cannot find canvas:" + id);
         var o = e.getContext("2d"),
             s;
         try {
             try {
                 s = o.getImageData(t, r, i, n)
             } catch (h) {
                 try {
                     netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"), s = o.getImageData(t, r, i, n)
                 } catch (h) {
                     throw alert("Cannot access local image"), new Error("unable to access local image data: " + h);
                     return
                 }
             }
         } catch (h) {
             throw alert("Cannot access image"), new Error("unable to access image data: " + h)
         }
         var l = s.data,
             u, c, d, f, p, m, E, g, v, y, T, R, x, H, _, b, w, M, S, C, A = a + a + 1,
             L = i << 2,
             P = i - 1,
             D = n - 1,
             F = a + 1,
             k = F * (F + 1) / 2,
             B = new BlurStack,
             N = B;
         for (d = 1; A > d; d++)
             if (N = N.next = new BlurStack, d == F) var I = N;
         N.next = B;
         var O = null,
             U = null;
         E = m = 0;
         var V = mul_table[a],
             z = shg_table[a];
         for (c = 0; n > c; c++) {
             for (H = _ = b = g = v = y = 0, T = F * (w = l[m]), R = F * (M = l[m + 1]), x = F * (S = l[m + 2]), g += k * w, v += k * M, y += k * S, N = B, d = 0; F > d; d++) N.r = w, N.g = M, N.b = S, N = N.next;
             for (d = 1; F > d; d++) f = m + ((d > P ? P : d) << 2), g += (N.r = w = l[f]) * (C = F - d), v += (N.g = M = l[f + 1]) * C, y += (N.b = S = l[f + 2]) * C, H += w, _ += M, b += S, N = N.next;
             for (O = B, U = I, u = 0; i > u; u++) l[m] = g * V >> z, l[m + 1] = v * V >> z, l[m + 2] = y * V >> z, g -= T, v -= R, y -= x, T -= O.r, R -= O.g, x -= O.b, f = E + ((f = u + a + 1) < P ? f : P) << 2, H += O.r = l[f], _ += O.g = l[f + 1], b += O.b = l[f + 2], g += H, v += _, y += b, O = O.next, T += w = U.r, R += M = U.g, x += S = U.b, H -= w, _ -= M, b -= S, U = U.next, m += 4;
             E += i
         }
         for (u = 0; i > u; u++) {
             for (_ = b = H = v = y = g = 0, m = u << 2, T = F * (w = l[m]), R = F * (M = l[m + 1]), x = F * (S = l[m + 2]), g += k * w, v += k * M, y += k * S, N = B, d = 0; F > d; d++) N.r = w, N.g = M, N.b = S, N = N.next;
             for (p = i, d = 1; a >= d; d++) m = p + u << 2, g += (N.r = w = l[m]) * (C = F - d), v += (N.g = M = l[m + 1]) * C, y += (N.b = S = l[m + 2]) * C, H += w, _ += M, b += S, N = N.next, D > d && (p += i);
             for (m = u, O = B, U = I, c = 0; n > c; c++) f = m << 2, l[f] = g * V >> z, l[f + 1] = v * V >> z, l[f + 2] = y * V >> z, g -= T, v -= R, y -= x, T -= O.r, R -= O.g, x -= O.b, f = u + ((f = c + F) < D ? f : D) * i << 2, g += H += O.r = l[f], v += _ += O.g = l[f + 1], y += b += O.b = l[f + 2], O = O.next, T += w = U.r, R += M = U.g, x += S = U.b, H -= w, _ -= M, b -= S, U = U.next, m += i
         }
         o.putImageData(s, t, r)
     }
 }

 function BlurStack() {
     this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null
 }

 function BackplaneCreator2() {
     this.m_greySamplingArray = new Array, this.m_whiteBalancedArray = new Array, this.m_WidthPixels = 0, this.m_HeightPixels = 0, this.m_StepsW = 0, this.m_StepsH = 0, this.lumaR = .212671, this.lumaG = .71516, this.lumaB = .072169
 }

 function Vector(e, t, r) {
     this.x = e || 0, this.y = t || 0, this.z = r || 0
 }

 function Matrix2(e, t, r, i) {
     this.m_afEntry = [e, t, r, i]
 }

 function HmSqrToQuad(e, t, r, i) {
     this.m_kT = new Vector2(0, 0), this.m_kG = new Vector2(0, 0), this.m_kD = new Vector2(0, 0), this.m_kM = new Matrix2(0, 0, 0, 0), this.m_kT = new Vector2(e.x, e.y), this.m_kM = new Matrix2(t.x - e.x, i.x - e.x, t.y - e.y, i.y - e.y), kInvM = this.m_kM.Inverse();
     var n = new Vector2(0, 0),
         a = new Vector2(r.x - e.x, r.y - e.y);
     n = kInvM.Multiply(a);
     var o = 1 / (n.x + n.y - 1);
     this.m_kG.x = o * (1 - n.y), this.m_kG.y = o * (1 - n.x), this.m_kD.x = o * n.x, this.m_kD.y = o * n.y
 }

 function HmQuadToSqr(e, t, r, i) {
     this.m_kT = new Vector2(0, 0), this.m_kG = new Vector2(0, 0), this.m_kD = new Vector2(0, 0), this.m_kM = new Matrix2(0, 0, 0, 0), this.m_kInvM = new Matrix2(0, 0, 0, 0), this.m_kT = new Vector2(e.x, e.y);
     var n = new Vector2(t.x - e.x, t.y - e.y),
         a = new Vector2(r.x - e.x, r.y - e.y),
         o = new Vector2(i.x - e.x, i.y - e.y);
     this.m_kInvM = new Matrix2(n.x, o.x, n.y, o.y), this.m_kM = this.m_kInvM.Inverse();
     var s = new Vector2(0, 0);
     s = this.m_kM.Multiply(a), this.m_kG.x = (s.y - 1) / s.x, this.m_kG.y = (s.x - 1) / s.y, this.m_kD.x = 1 + this.m_kG.x, this.m_kD.y = 1 + this.m_kG.y;
     var h = 10
 }! function(e, t) {
     "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
         if (!e.document) throw new Error("jQuery requires a window with a document");
         return t(e)
     } : t(e)
 }("undefined" != typeof window ? window : this, function(e, t) {
     function r(e) {
         var t = e.length,
             r = oe.type(e);
         return "function" === r || oe.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === r || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
     }

     function i(e, t, r) {
         if (oe.isFunction(t)) return oe.grep(e, function(e, i) {
             return !!t.call(e, i, e) !== r
         });
         if (t.nodeType) return oe.grep(e, function(e) {
             return e === t !== r
         });
         if ("string" == typeof t) {
             if (pe.test(t)) return oe.filter(t, e, r);
             t = oe.filter(t, e)
         }
         return oe.grep(e, function(e) {
             return oe.inArray(e, t) >= 0 !== r
         })
     }

     function n(e, t) {
         do e = e[t]; while (e && 1 !== e.nodeType);
         return e
     }

     function a(e) {
         var t = xe[e] = {};
         return oe.each(e.match(Re) || [], function(e, r) {
             t[r] = !0
         }), t
     }

     function o() {
         Ee.addEventListener ? (Ee.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1)) : (Ee.detachEvent("onreadystatechange", s), e.detachEvent("onload", s))
     }

     function s() {
         (Ee.addEventListener || "load" === event.type || "complete" === Ee.readyState) && (o(), oe.ready())
     }

     function h(e, t, r) {
         if (void 0 === r && 1 === e.nodeType) {
             var i = "data-" + t.replace(Me, "-$1").toLowerCase();
             if (r = e.getAttribute(i), "string" == typeof r) {
                 try {
                     r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : we.test(r) ? oe.parseJSON(r) : r
                 } catch (n) {}
                 oe.data(e, t, r)
             } else r = void 0
         }
         return r
     }

     function l(e) {
         var t;
         for (t in e)
             if (("data" !== t || !oe.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
         return !0
     }

     function u(e, t, r, i) {
         if (oe.acceptData(e)) {
             var n, a, o = oe.expando,
                 s = e.nodeType,
                 h = s ? oe.cache : e,
                 l = s ? e[o] : e[o] && o;
             if (l && h[l] && (i || h[l].data) || void 0 !== r || "string" != typeof t) return l || (l = s ? e[o] = Y.pop() || oe.guid++ : o), h[l] || (h[l] = s ? {} : {
                 toJSON: oe.noop
             }), ("object" == typeof t || "function" == typeof t) && (i ? h[l] = oe.extend(h[l], t) : h[l].data = oe.extend(h[l].data, t)), a = h[l], i || (a.data || (a.data = {}), a = a.data), void 0 !== r && (a[oe.camelCase(t)] = r), "string" == typeof t ? (n = a[t], null == n && (n = a[oe.camelCase(t)])) : n = a, n
         }
     }

     function c(e, t, r) {
         if (oe.acceptData(e)) {
             var i, n, a = e.nodeType,
                 o = a ? oe.cache : e,
                 s = a ? e[oe.expando] : oe.expando;
             if (o[s]) {
                 if (t && (i = r ? o[s] : o[s].data)) {
                     oe.isArray(t) ? t = t.concat(oe.map(t, oe.camelCase)) : t in i ? t = [t] : (t = oe.camelCase(t), t = t in i ? [t] : t.split(" ")), n = t.length;
                     for (; n--;) delete i[t[n]];
                     if (r ? !l(i) : !oe.isEmptyObject(i)) return
                 }(r || (delete o[s].data, l(o[s]))) && (a ? oe.cleanData([e], !0) : ne.deleteExpando || o != o.window ? delete o[s] : o[s] = null)
             }
         }
     }

     function d() {
         return !0
     }

     function f() {
         return !1
     }

     function p() {
         try {
             return Ee.activeElement
         } catch (e) {}
     }

     function m(e) {
         var t = Ne.split("|"),
             r = e.createDocumentFragment();
         if (r.createElement)
             for (; t.length;) r.createElement(t.pop());
         return r
     }

     function E(e, t) {
         var r, i, n = 0,
             a = typeof e.getElementsByTagName !== _e ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== _e ? e.querySelectorAll(t || "*") : void 0;
         if (!a)
             for (a = [], r = e.childNodes || e; null != (i = r[n]); n++) !t || oe.nodeName(i, t) ? a.push(i) : oe.merge(a, E(i, t));
         return void 0 === t || t && oe.nodeName(e, t) ? oe.merge([e], a) : a
     }

     function g(e) {
         Pe.test(e.type) && (e.defaultChecked = e.checked)
     }

     function v(e, t) {
         return oe.nodeName(e, "table") && oe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
     }

     function y(e) {
         return e.type = (null !== oe.find.attr(e, "type")) + "/" + e.type, e
     }

     function T(e) {
         var t = Ye.exec(e.type);
         return t ? e.type = t[1] : e.removeAttribute("type"), e
     }

     function R(e, t) {
         for (var r, i = 0; null != (r = e[i]); i++) oe._data(r, "globalEval", !t || oe._data(t[i], "globalEval"))
     }

     function x(e, t) {
         if (1 === t.nodeType && oe.hasData(e)) {
             var r, i, n, a = oe._data(e),
                 o = oe._data(t, a),
                 s = a.events;
             if (s) {
                 delete o.handle, o.events = {};
                 for (r in s)
                     for (i = 0, n = s[r].length; n > i; i++) oe.event.add(t, r, s[r][i])
             }
             o.data && (o.data = oe.extend({}, o.data))
         }
     }

     function H(e, t) {
         var r, i, n;
         if (1 === t.nodeType) {
             if (r = t.nodeName.toLowerCase(), !ne.noCloneEvent && t[oe.expando]) {
                 n = oe._data(t);
                 for (i in n.events) oe.removeEvent(t, i, n.handle);
                 t.removeAttribute(oe.expando)
             }
             "script" === r && t.text !== e.text ? (y(t).text = e.text, T(t)) : "object" === r ? (t.parentNode && (t.outerHTML = e.outerHTML), ne.html5Clone && e.innerHTML && !oe.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === r && Pe.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === r ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === r || "textarea" === r) && (t.defaultValue = e.defaultValue)
         }
     }

     function _(t, r) {
         var i = oe(r.createElement(t)).appendTo(r.body),
             n = e.getDefaultComputedStyle ? e.getDefaultComputedStyle(i[0]).display : oe.css(i[0], "display");
         return i.detach(), n
     }

     function b(e) {
         var t = Ee,
             r = et[e];
         return r || (r = _(e, t), "none" !== r && r || ($e = ($e || oe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = ($e[0].contentWindow || $e[0].contentDocument).document, t.write(), t.close(), r = _(e, t), $e.detach()), et[e] = r), r
     }

     function w(e, t) {
         return {
             get: function() {
                 var r = e();
                 return null != r ? r ? void delete this.get : (this.get = t).apply(this, arguments) : void 0
             }
         }
     }

     function M(e, t) {
         if (t in e) return t;
         for (var r = t.charAt(0).toUpperCase() + t.slice(1), i = t, n = ft.length; n--;)
             if (t = ft[n] + r, t in e) return t;
         return i
     }

     function S(e, t) {
         for (var r, i, n, a = [], o = 0, s = e.length; s > o; o++) i = e[o], i.style && (a[o] = oe._data(i, "olddisplay"), r = i.style.display, t ? (a[o] || "none" !== r || (i.style.display = ""), "" === i.style.display && Ae(i) && (a[o] = oe._data(i, "olddisplay", b(i.nodeName)))) : a[o] || (n = Ae(i), (r && "none" !== r || !n) && oe._data(i, "olddisplay", n ? r : oe.css(i, "display"))));
         for (o = 0; s > o; o++) i = e[o], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? a[o] || "" : "none"));
         return e
     }

     function C(e, t, r) {
         var i = lt.exec(t);
         return i ? Math.max(0, i[1] - (r || 0)) + (i[2] || "px") : t
     }

     function A(e, t, r, i, n) {
         for (var a = r === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > a; a += 2) "margin" === r && (o += oe.css(e, r + Ce[a], !0, n)), i ? ("content" === r && (o -= oe.css(e, "padding" + Ce[a], !0, n)), "margin" !== r && (o -= oe.css(e, "border" + Ce[a] + "Width", !0, n))) : (o += oe.css(e, "padding" + Ce[a], !0, n), "padding" !== r && (o += oe.css(e, "border" + Ce[a] + "Width", !0, n)));
         return o
     }

     function L(e, t, r) {
         var i = !0,
             n = "width" === t ? e.offsetWidth : e.offsetHeight,
             a = it(e),
             o = ne.boxSizing() && "border-box" === oe.css(e, "boxSizing", !1, a);
         if (0 >= n || null == n) {
             if (n = nt(e, t, a), (0 > n || null == n) && (n = e.style[t]), rt.test(n)) return n;
             i = o && (ne.boxSizingReliable() || n === e.style[t]), n = parseFloat(n) || 0
         }
         return n + A(e, t, r || (o ? "border" : "content"), i, a) + "px"
     }

     function P(e, t, r, i, n) {
         return new P.prototype.init(e, t, r, i, n)
     }

     function D() {
         return setTimeout(function() {
             pt = void 0
         }), pt = oe.now()
     }

     function F(e, t) {
         var r, i = {
                 height: e
             },
             n = 0;
         for (t = t ? 1 : 0; 4 > n; n += 2 - t) r = Ce[n], i["margin" + r] = i["padding" + r] = e;
         return t && (i.opacity = i.width = e), i
     }

     function k(e, t, r) {
         for (var i, n = (Tt[t] || []).concat(Tt["*"]), a = 0, o = n.length; o > a; a++)
             if (i = n[a].call(r, t, e)) return i
     }

     function B(e, t, r) {
         var i, n, a, o, s, h, l, u, c = this,
             d = {},
             f = e.style,
             p = e.nodeType && Ae(e),
             m = oe._data(e, "fxshow");
         r.queue || (s = oe._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, h = s.empty.fire, s.empty.fire = function() {
             s.unqueued || h()
         }), s.unqueued++, c.always(function() {
             c.always(function() {
                 s.unqueued--, oe.queue(e, "fx").length || s.empty.fire()
             })
         })), 1 === e.nodeType && ("height" in t || "width" in t) && (r.overflow = [f.overflow, f.overflowX, f.overflowY], l = oe.css(e, "display"), u = b(e.nodeName), "none" === l && (l = u), "inline" === l && "none" === oe.css(e, "float") && (ne.inlineBlockNeedsLayout && "inline" !== u ? f.zoom = 1 : f.display = "inline-block")), r.overflow && (f.overflow = "hidden", ne.shrinkWrapBlocks() || c.always(function() {
             f.overflow = r.overflow[0], f.overflowX = r.overflow[1], f.overflowY = r.overflow[2]
         }));
         for (i in t)
             if (n = t[i], Et.exec(n)) {
                 if (delete t[i], a = a || "toggle" === n, n === (p ? "hide" : "show")) {
                     if ("show" !== n || !m || void 0 === m[i]) continue;
                     p = !0
                 }
                 d[i] = m && m[i] || oe.style(e, i)
             }
         if (!oe.isEmptyObject(d)) {
             m ? "hidden" in m && (p = m.hidden) : m = oe._data(e, "fxshow", {}), a && (m.hidden = !p), p ? oe(e).show() : c.done(function() {
                 oe(e).hide()
             }), c.done(function() {
                 var t;
                 oe._removeData(e, "fxshow");
                 for (t in d) oe.style(e, t, d[t])
             });
             for (i in d) o = k(p ? m[i] : 0, i, c), i in m || (m[i] = o.start, p && (o.end = o.start, o.start = "width" === i || "height" === i ? 1 : 0))
         }
     }

     function N(e, t) {
         var r, i, n, a, o;
         for (r in e)
             if (i = oe.camelCase(r), n = t[i], a = e[r], oe.isArray(a) && (n = a[1], a = e[r] = a[0]), r !== i && (e[i] = a, delete e[r]), o = oe.cssHooks[i], o && "expand" in o) {
                 a = o.expand(a), delete e[i];
                 for (r in a) r in e || (e[r] = a[r], t[r] = n)
             } else t[i] = n
     }

     function I(e, t, r) {
         var i, n, a = 0,
             o = yt.length,
             s = oe.Deferred().always(function() {
                 delete h.elem
             }),
             h = function() {
                 if (n) return !1;
                 for (var t = pt || D(), r = Math.max(0, l.startTime + l.duration - t), i = r / l.duration || 0, a = 1 - i, o = 0, h = l.tweens.length; h > o; o++) l.tweens[o].run(a);
                 return s.notifyWith(e, [l, a, r]), 1 > a && h ? r : (s.resolveWith(e, [l]), !1)
             },
             l = s.promise({
                 elem: e,
                 props: oe.extend({}, t),
                 opts: oe.extend(!0, {
                     specialEasing: {}
                 }, r),
                 originalProperties: t,
                 originalOptions: r,
                 startTime: pt || D(),
                 duration: r.duration,
                 tweens: [],
                 createTween: function(t, r) {
                     var i = oe.Tween(e, l.opts, t, r, l.opts.specialEasing[t] || l.opts.easing);
                     return l.tweens.push(i), i
                 },
                 stop: function(t) {
                     var r = 0,
                         i = t ? l.tweens.length : 0;
                     if (n) return this;
                     for (n = !0; i > r; r++) l.tweens[r].run(1);
                     return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this
                 }
             }),
             u = l.props;
         for (N(u, l.opts.specialEasing); o > a; a++)
             if (i = yt[a].call(l, e, u, l.opts)) return i;
         return oe.map(u, k, l), oe.isFunction(l.opts.start) && l.opts.start.call(e, l), oe.fx.timer(oe.extend(h, {
             elem: e,
             anim: l,
             queue: l.opts.queue
         })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
     }

     function O(e) {
         return function(t, r) {
             "string" != typeof t && (r = t, t = "*");
             var i, n = 0,
                 a = t.toLowerCase().match(Re) || [];
             if (oe.isFunction(r))
                 for (; i = a[n++];) "+" === i.charAt(0) ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(r)) : (e[i] = e[i] || []).push(r)
         }
     }

     function U(e, t, r, i) {
         function n(s) {
             var h;
             return a[s] = !0, oe.each(e[s] || [], function(e, s) {
                 var l = s(t, r, i);
                 return "string" != typeof l || o || a[l] ? o ? !(h = l) : void 0 : (t.dataTypes.unshift(l), n(l), !1)
             }), h
         }
         var a = {},
             o = e === Wt;
         return n(t.dataTypes[0]) || !a["*"] && n("*")
     }

     function V(e, t) {
         var r, i, n = oe.ajaxSettings.flatOptions || {};
         for (i in t) void 0 !== t[i] && ((n[i] ? e : r || (r = {}))[i] = t[i]);
         return r && oe.extend(!0, e, r), e
     }

     function z(e, t, r) {
         for (var i, n, a, o, s = e.contents, h = e.dataTypes;
             "*" === h[0];) h.shift(), void 0 === n && (n = e.mimeType || t.getResponseHeader("Content-Type"));
         if (n)
             for (o in s)
                 if (s[o] && s[o].test(n)) {
                     h.unshift(o);
                     break
                 }
         if (h[0] in r) a = h[0];
         else {
             for (o in r) {
                 if (!h[0] || e.converters[o + " " + h[0]]) {
                     a = o;
                     break
                 }
                 i || (i = o)
             }
             a = a || i
         }
         return a ? (a !== h[0] && h.unshift(a), r[a]) : void 0
     }

     function G(e, t, r, i) {
         var n, a, o, s, h, l = {},
             u = e.dataTypes.slice();
         if (u[1])
             for (o in e.converters) l[o.toLowerCase()] = e.converters[o];
         for (a = u.shift(); a;)
             if (e.responseFields[a] && (r[e.responseFields[a]] = t), !h && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), h = a, a = u.shift())
                 if ("*" === a) a = h;
                 else if ("*" !== h && h !== a) {
             if (o = l[h + " " + a] || l["* " + a], !o)
                 for (n in l)
                     if (s = n.split(" "), s[1] === a && (o = l[h + " " + s[0]] || l["* " + s[0]])) {
                         o === !0 ? o = l[n] : l[n] !== !0 && (a = s[0], u.unshift(s[1]));
                         break
                     }
             if (o !== !0)
                 if (o && e["throws"]) t = o(t);
                 else try {
                     t = o(t)
                 } catch (c) {
                     return {
                         state: "parsererror",
                         error: o ? c : "No conversion from " + h + " to " + a
                     }
                 }
         }
         return {
             state: "success",
             data: t
         }
     }

     function W(e, t, r, i) {
         var n;
         if (oe.isArray(t)) oe.each(t, function(t, n) {
             r || Yt.test(e) ? i(e, n) : W(e + "[" + ("object" == typeof n ? t : "") + "]", n, r, i)
         });
         else if (r || "object" !== oe.type(t)) i(e, t);
         else
             for (n in t) W(e + "[" + n + "]", t[n], r, i)
     }

     function j() {
         try {
             return new e.XMLHttpRequest
         } catch (t) {}
     }

     function X() {
         try {
             return new e.ActiveXObject("Microsoft.XMLHTTP")
         } catch (t) {}
     }

     function q(e) {
         return oe.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
     }
     var Y = [],
         J = Y.slice,
         K = Y.concat,
         Q = Y.push,
         Z = Y.indexOf,
         ee = {},
         te = ee.toString,
         re = ee.hasOwnProperty,
         ie = "".trim,
         ne = {},
         ae = "1.11.0",
         oe = function(e, t) {
             return new oe.fn.init(e, t)
         },
         se = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
         he = /^-ms-/,
         le = /-([\da-z])/gi,
         ue = function(e, t) {
             return t.toUpperCase()
         };
     oe.fn = oe.prototype = {
         jquery: ae,
         constructor: oe,
         selector: "",
         length: 0,
         toArray: function() {
             return J.call(this)
         },
         get: function(e) {
             return null != e ? 0 > e ? this[e + this.length] : this[e] : J.call(this)
         },
         pushStack: function(e) {
             var t = oe.merge(this.constructor(), e);
             return t.prevObject = this, t.context = this.context, t
         },
         each: function(e, t) {
             return oe.each(this, e, t)
         },
         map: function(e) {
             return this.pushStack(oe.map(this, function(t, r) {
                 return e.call(t, r, t)
             }))
         },
         slice: function() {
             return this.pushStack(J.apply(this, arguments))
         },
         first: function() {
             return this.eq(0)
         },
         last: function() {
             return this.eq(-1)
         },
         eq: function(e) {
             var t = this.length,
                 r = +e + (0 > e ? t : 0);
             return this.pushStack(r >= 0 && t > r ? [this[r]] : [])
         },
         end: function() {
             return this.prevObject || this.constructor(null)
         },
         push: Q,
         sort: Y.sort,
         splice: Y.splice
     }, oe.extend = oe.fn.extend = function() {
         var e, t, r, i, n, a, o = arguments[0] || {},
             s = 1,
             h = arguments.length,
             l = !1;
         for ("boolean" == typeof o && (l = o, o = arguments[s] || {}, s++), "object" == typeof o || oe.isFunction(o) || (o = {}), s === h && (o = this, s--); h > s; s++)
             if (null != (n = arguments[s]))
                 for (i in n) e = o[i], r = n[i], o !== r && (l && r && (oe.isPlainObject(r) || (t = oe.isArray(r))) ? (t ? (t = !1, a = e && oe.isArray(e) ? e : []) : a = e && oe.isPlainObject(e) ? e : {}, o[i] = oe.extend(l, a, r)) : void 0 !== r && (o[i] = r));
         return o
     }, oe.extend({
         expando: "jQuery" + (ae + Math.random()).replace(/\D/g, ""),
         isReady: !0,
         error: function(e) {
             throw new Error(e)
         },
         noop: function() {},
         isFunction: function(e) {
             return "function" === oe.type(e)
         },
         isArray: Array.isArray || function(e) {
             return "array" === oe.type(e)
         },
         isWindow: function(e) {
             return null != e && e == e.window
         },
         isNumeric: function(e) {
             return e - parseFloat(e) >= 0
         },
         isEmptyObject: function(e) {
             var t;
             for (t in e) return !1;
             return !0
         },
         isPlainObject: function(e) {
             var t;
             if (!e || "object" !== oe.type(e) || e.nodeType || oe.isWindow(e)) return !1;
             try {
                 if (e.constructor && !re.call(e, "constructor") && !re.call(e.constructor.prototype, "isPrototypeOf")) return !1
             } catch (r) {
                 return !1
             }
             if (ne.ownLast)
                 for (t in e) return re.call(e, t);
             for (t in e);
             return void 0 === t || re.call(e, t)
         },
         type: function(e) {
             return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ee[te.call(e)] || "object" : typeof e
         },
         globalEval: function(t) {
             t && oe.trim(t) && (e.execScript || function(t) {
                 e.eval.call(e, t)
             })(t)
         },
         camelCase: function(e) {
             return e.replace(he, "ms-").replace(le, ue)
         },
         nodeName: function(e, t) {
             return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
         },
         each: function(e, t, i) {
             var n, a = 0,
                 o = e.length,
                 s = r(e);
             if (i) {
                 if (s)
                     for (; o > a && (n = t.apply(e[a], i), n !== !1); a++);
                 else
                     for (a in e)
                         if (n = t.apply(e[a], i), n === !1) break
             } else if (s)
                 for (; o > a && (n = t.call(e[a], a, e[a]), n !== !1); a++);
             else
                 for (a in e)
                     if (n = t.call(e[a], a, e[a]), n === !1) break; return e
         },
         trim: ie && !ie.call("\ufeff ") ? function(e) {
             return null == e ? "" : ie.call(e)
         } : function(e) {
             return null == e ? "" : (e + "").replace(se, "")
         },
         makeArray: function(e, t) {
             var i = t || [];
             return null != e && (r(Object(e)) ? oe.merge(i, "string" == typeof e ? [e] : e) : Q.call(i, e)), i
         },
         inArray: function(e, t, r) {
             var i;
             if (t) {
                 if (Z) return Z.call(t, e, r);
                 for (i = t.length, r = r ? 0 > r ? Math.max(0, i + r) : r : 0; i > r; r++)
                     if (r in t && t[r] === e) return r
             }
             return -1
         },
         merge: function(e, t) {
             for (var r = +t.length, i = 0, n = e.length; r > i;) e[n++] = t[i++];
             if (r !== r)
                 for (; void 0 !== t[i];) e[n++] = t[i++];
             return e.length = n, e
         },
         grep: function(e, t, r) {
             for (var i, n = [], a = 0, o = e.length, s = !r; o > a; a++) i = !t(e[a], a), i !== s && n.push(e[a]);
             return n
         },
         map: function(e, t, i) {
             var n, a = 0,
                 o = e.length,
                 s = r(e),
                 h = [];
             if (s)
                 for (; o > a; a++) n = t(e[a], a, i), null != n && h.push(n);
             else
                 for (a in e) n = t(e[a], a, i), null != n && h.push(n);
             return K.apply([], h)
         },
         guid: 1,
         proxy: function(e, t) {
             var r, i, n;
             return "string" == typeof t && (n = e[t], t = e, e = n), oe.isFunction(e) ? (r = J.call(arguments, 2), i = function() {
                 return e.apply(t || this, r.concat(J.call(arguments)))
             }, i.guid = e.guid = e.guid || oe.guid++, i) : void 0
         },
         now: function() {
             return +new Date
         },
         support: ne
     }), oe.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
         ee["[object " + t + "]"] = t.toLowerCase()
     });
     var ce = function(e) {
         function t(e, t, r, i) {
             var n, a, o, s, h, l, c, p, m, E;
             if ((t ? t.ownerDocument || t : U) !== P && L(t), t = t || P, r = r || [], !e || "string" != typeof e) return r;
             if (1 !== (s = t.nodeType) && 9 !== s) return [];
             if (F && !i) {
                 if (n = ye.exec(e))
                     if (o = n[1]) {
                         if (9 === s) {
                             if (a = t.getElementById(o), !a || !a.parentNode) return r;
                             if (a.id === o) return r.push(a), r
                         } else if (t.ownerDocument && (a = t.ownerDocument.getElementById(o)) && I(t, a) && a.id === o) return r.push(a), r
                     } else {
                         if (n[2]) return ee.apply(r, t.getElementsByTagName(e)), r;
                         if ((o = n[3]) && H.getElementsByClassName && t.getElementsByClassName) return ee.apply(r, t.getElementsByClassName(o)), r
                     }
                 if (H.qsa && (!k || !k.test(e))) {
                     if (p = c = O, m = t, E = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                         for (l = d(e), (c = t.getAttribute("id")) ? p = c.replace(Te, "\\$&") : t.setAttribute("id", p), p = "[id='" + p + "'] ", h = l.length; h--;) l[h] = p + f(l[h]);
                         m = $.test(e) && u(t.parentNode) || t, E = l.join(",")
                     }
                     if (E) try {
                         return ee.apply(r, m.querySelectorAll(E)), r
                     } catch (g) {} finally {
                         c || t.removeAttribute("id")
                     }
                 }
             }
             return R(e.replace(le, "$1"), t, r, i)
         }

         function r() {
             function e(r, i) {
                 return t.push(r + " ") > _.cacheLength && delete e[t.shift()], e[r + " "] = i
             }
             var t = [];
             return e
         }

         function i(e) {
             return e[O] = !0, e
         }

         function n(e) {
             var t = P.createElement("div");
             try {
                 return !!e(t)
             } catch (r) {
                 return !1
             } finally {
                 t.parentNode && t.parentNode.removeChild(t), t = null
             }
         }

         function a(e, t) {
             for (var r = e.split("|"), i = e.length; i--;) _.attrHandle[r[i]] = t
         }

         function o(e, t) {
             var r = t && e,
                 i = r && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
             if (i) return i;
             if (r)
                 for (; r = r.nextSibling;)
                     if (r === t) return -1;
             return e ? 1 : -1
         }

         function s(e) {
             return function(t) {
                 var r = t.nodeName.toLowerCase();
                 return "input" === r && t.type === e
             }
         }

         function h(e) {
             return function(t) {
                 var r = t.nodeName.toLowerCase();
                 return ("input" === r || "button" === r) && t.type === e
             }
         }

         function l(e) {
             return i(function(t) {
                 return t = +t, i(function(r, i) {
                     for (var n, a = e([], r.length, t), o = a.length; o--;) r[n = a[o]] && (r[n] = !(i[n] = r[n]))
                 })
             })
         }

         function u(e) {
             return e && typeof e.getElementsByTagName !== q && e
         }

         function c() {}

         function d(e, r) {
             var i, n, a, o, s, h, l, u = W[e + " "];
             if (u) return r ? 0 : u.slice(0);
             for (s = e, h = [], l = _.preFilter; s;) {
                 (!i || (n = ue.exec(s))) && (n && (s = s.slice(n[0].length) || s), h.push(a = [])), i = !1, (n = ce.exec(s)) && (i = n.shift(), a.push({
                     value: i,
                     type: n[0].replace(le, " ")
                 }), s = s.slice(i.length));
                 for (o in _.filter) !(n = me[o].exec(s)) || l[o] && !(n = l[o](n)) || (i = n.shift(), a.push({
                     value: i,
                     type: o,
                     matches: n
                 }), s = s.slice(i.length));
                 if (!i) break
             }
             return r ? s.length : s ? t.error(e) : W(e, h).slice(0)
         }

         function f(e) {
             for (var t = 0, r = e.length, i = ""; r > t; t++) i += e[t].value;
             return i
         }

         function p(e, t, r) {
             var i = t.dir,
                 n = r && "parentNode" === i,
                 a = z++;
             return t.first ? function(t, r, a) {
                 for (; t = t[i];)
                     if (1 === t.nodeType || n) return e(t, r, a)
             } : function(t, r, o) {
                 var s, h, l = [V, a];
                 if (o) {
                     for (; t = t[i];)
                         if ((1 === t.nodeType || n) && e(t, r, o)) return !0
                 } else
                     for (; t = t[i];)
                         if (1 === t.nodeType || n) {
                             if (h = t[O] || (t[O] = {}), (s = h[i]) && s[0] === V && s[1] === a) return l[2] = s[2];
                             if (h[i] = l, l[2] = e(t, r, o)) return !0
                         }
             }
         }

         function m(e) {
             return e.length > 1 ? function(t, r, i) {
                 for (var n = e.length; n--;)
                     if (!e[n](t, r, i)) return !1;
                 return !0
             } : e[0]
         }

         function E(e, t, r, i, n) {
             for (var a, o = [], s = 0, h = e.length, l = null != t; h > s; s++)(a = e[s]) && (!r || r(a, i, n)) && (o.push(a), l && t.push(s));
             return o
         }

         function g(e, t, r, n, a, o) {
             return n && !n[O] && (n = g(n)), a && !a[O] && (a = g(a, o)), i(function(i, o, s, h) {
                 var l, u, c, d = [],
                     f = [],
                     p = o.length,
                     m = i || T(t || "*", s.nodeType ? [s] : s, []),
                     g = !e || !i && t ? m : E(m, d, e, s, h),
                     v = r ? a || (i ? e : p || n) ? [] : o : g;
                 if (r && r(g, v, s, h), n)
                     for (l = E(v, f), n(l, [], s, h), u = l.length; u--;)(c = l[u]) && (v[f[u]] = !(g[f[u]] = c));
                 if (i) {
                     if (a || e) {
                         if (a) {
                             for (l = [], u = v.length; u--;)(c = v[u]) && l.push(g[u] = c);
                             a(null, v = [], l, h)
                         }
                         for (u = v.length; u--;)(c = v[u]) && (l = a ? re.call(i, c) : d[u]) > -1 && (i[l] = !(o[l] = c))
                     }
                 } else v = E(v === o ? v.splice(p, v.length) : v), a ? a(null, o, v, h) : ee.apply(o, v)
             })
         }

         function v(e) {
             for (var t, r, i, n = e.length, a = _.relative[e[0].type], o = a || _.relative[" "], s = a ? 1 : 0, h = p(function(e) {
                     return e === t
                 }, o, !0), l = p(function(e) {
                     return re.call(t, e) > -1
                 }, o, !0), u = [function(e, r, i) {
                     return !a && (i || r !== S) || ((t = r).nodeType ? h(e, r, i) : l(e, r, i))
                 }]; n > s; s++)
                 if (r = _.relative[e[s].type]) u = [p(m(u), r)];
                 else {
                     if (r = _.filter[e[s].type].apply(null, e[s].matches), r[O]) {
                         for (i = ++s; n > i && !_.relative[e[i].type]; i++);
                         return g(s > 1 && m(u), s > 1 && f(e.slice(0, s - 1).concat({
                             value: " " === e[s - 2].type ? "*" : ""
                         })).replace(le, "$1"), r, i > s && v(e.slice(s, i)), n > i && v(e = e.slice(i)), n > i && f(e))
                     }
                     u.push(r)
                 }
             return m(u)
         }

         function y(e, r) {
             var n = r.length > 0,
                 a = e.length > 0,
                 o = function(i, o, s, h, l) {
                     var u, c, d, f = 0,
                         p = "0",
                         m = i && [],
                         g = [],
                         v = S,
                         y = i || a && _.find.TAG("*", l),
                         T = V += null == v ? 1 : Math.random() || .1,
                         R = y.length;
                     for (l && (S = o !== P && o); p !== R && null != (u = y[p]); p++) {
                         if (a && u) {
                             for (c = 0; d = e[c++];)
                                 if (d(u, o, s)) {
                                     h.push(u);
                                     break
                                 }
                             l && (V = T)
                         }
                         n && ((u = !d && u) && f--, i && m.push(u))
                     }
                     if (f += p, n && p !== f) {
                         for (c = 0; d = r[c++];) d(m, g, o, s);
                         if (i) {
                             if (f > 0)
                                 for (; p--;) m[p] || g[p] || (g[p] = Q.call(h));
                             g = E(g)
                         }
                         ee.apply(h, g), l && !i && g.length > 0 && f + r.length > 1 && t.uniqueSort(h)
                     }
                     return l && (V = T, S = v), m
                 };
             return n ? i(o) : o
         }

         function T(e, r, i) {
             for (var n = 0, a = r.length; a > n; n++) t(e, r[n], i);
             return i
         }

         function R(e, t, r, i) {
             var n, a, o, s, h, l = d(e);
             if (!i && 1 === l.length) {
                 if (a = l[0] = l[0].slice(0), a.length > 2 && "ID" === (o = a[0]).type && H.getById && 9 === t.nodeType && F && _.relative[a[1].type]) {
                     if (t = (_.find.ID(o.matches[0].replace(Re, xe), t) || [])[0], !t) return r;
                     e = e.slice(a.shift().value.length)
                 }
                 for (n = me.needsContext.test(e) ? 0 : a.length; n-- && (o = a[n], !_.relative[s = o.type]);)
                     if ((h = _.find[s]) && (i = h(o.matches[0].replace(Re, xe), $.test(a[0].type) && u(t.parentNode) || t))) {
                         if (a.splice(n, 1), e = i.length && f(a), !e) return ee.apply(r, i), r;
                         break
                     }
             }
             return M(e, l)(i, t, !F, r, $.test(e) && u(t.parentNode) || t), r
         }
         var x, H, _, b, w, M, S, C, A, L, P, D, F, k, B, N, I, O = "sizzle" + -new Date,
             U = e.document,
             V = 0,
             z = 0,
             G = r(),
             W = r(),
             j = r(),
             X = function(e, t) {
                 return e === t && (A = !0), 0
             },
             q = "undefined",
             Y = 1 << 31,
             J = {}.hasOwnProperty,
             K = [],
             Q = K.pop,
             Z = K.push,
             ee = K.push,
             te = K.slice,
             re = K.indexOf || function(e) {
                 for (var t = 0, r = this.length; r > t; t++)
                     if (this[t] === e) return t;
                 return -1
             },
             ie = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
             ne = "[\\x20\\t\\r\\n\\f]",
             ae = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
             oe = ae.replace("w", "w#"),
             se = "\\[" + ne + "*(" + ae + ")" + ne + "*(?:([*^$|!~]?=)" + ne + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + oe + ")|)|)" + ne + "*\\]",
             he = ":(" + ae + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + se.replace(3, 8) + ")*)|.*)\\)|)",
             le = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
             ue = new RegExp("^" + ne + "*," + ne + "*"),
             ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
             de = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
             fe = new RegExp(he),
             pe = new RegExp("^" + oe + "$"),
             me = {
                 ID: new RegExp("^#(" + ae + ")"),
                 CLASS: new RegExp("^\\.(" + ae + ")"),
                 TAG: new RegExp("^(" + ae.replace("w", "w*") + ")"),
                 ATTR: new RegExp("^" + se),
                 PSEUDO: new RegExp("^" + he),
                 CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                 bool: new RegExp("^(?:" + ie + ")$", "i"),
                 needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
             },
             Ee = /^(?:input|select|textarea|button)$/i,
             ge = /^h\d$/i,
             ve = /^[^{]+\{\s*\[native \w/,
             ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
             $ = /[+~]/,
             Te = /'|\\/g,
             Re = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
             xe = function(e, t, r) {
                 var i = "0x" + t - 65536;
                 return i !== i || r ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
             };
         try {
             ee.apply(K = te.call(U.childNodes), U.childNodes), K[U.childNodes.length].nodeType
         } catch (He) {
             ee = {
                 apply: K.length ? function(e, t) {
                     Z.apply(e, te.call(t))
                 } : function(e, t) {
                     for (var r = e.length, i = 0; e[r++] = t[i++];);
                     e.length = r - 1
                 }
             }
         }
         H = t.support = {}, w = t.isXML = function(e) {
             var t = e && (e.ownerDocument || e).documentElement;
             return t ? "HTML" !== t.nodeName : !1
         }, L = t.setDocument = function(e) {
             var t, r = e ? e.ownerDocument || e : U,
                 i = r.defaultView;
             return r !== P && 9 === r.nodeType && r.documentElement ? (P = r, D = r.documentElement, F = !w(r), i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", function() {
                 L()
             }, !1) : i.attachEvent && i.attachEvent("onunload", function() {
                 L()
             })), H.attributes = n(function(e) {
                 return e.className = "i", !e.getAttribute("className")
             }), H.getElementsByTagName = n(function(e) {
                 return e.appendChild(r.createComment("")), !e.getElementsByTagName("*").length
             }), H.getElementsByClassName = ve.test(r.getElementsByClassName) && n(function(e) {
                 return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
             }), H.getById = n(function(e) {
                 return D.appendChild(e).id = O, !r.getElementsByName || !r.getElementsByName(O).length
             }), H.getById ? (_.find.ID = function(e, t) {
                 if (typeof t.getElementById !== q && F) {
                     var r = t.getElementById(e);
                     return r && r.parentNode ? [r] : []
                 }
             }, _.filter.ID = function(e) {
                 var t = e.replace(Re, xe);
                 return function(e) {
                     return e.getAttribute("id") === t
                 }
             }) : (delete _.find.ID, _.filter.ID = function(e) {
                 var t = e.replace(Re, xe);
                 return function(e) {
                     var r = typeof e.getAttributeNode !== q && e.getAttributeNode("id");
                     return r && r.value === t
                 }
             }), _.find.TAG = H.getElementsByTagName ? function(e, t) {
                 return typeof t.getElementsByTagName !== q ? t.getElementsByTagName(e) : void 0
             } : function(e, t) {
                 var r, i = [],
                     n = 0,
                     a = t.getElementsByTagName(e);
                 if ("*" === e) {
                     for (; r = a[n++];) 1 === r.nodeType && i.push(r);
                     return i
                 }
                 return a
             }, _.find.CLASS = H.getElementsByClassName && function(e, t) {
                 return typeof t.getElementsByClassName !== q && F ? t.getElementsByClassName(e) : void 0
             }, B = [], k = [], (H.qsa = ve.test(r.querySelectorAll)) && (n(function(e) {
                 e.innerHTML = "<select t=''><option selected=''></option></select>", e.querySelectorAll("[t^='']").length && k.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || k.push("\\[" + ne + "*(?:value|" + ie + ")"), e.querySelectorAll(":checked").length || k.push(":checked")
             }), n(function(e) {
                 var t = r.createElement("input");
                 t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && k.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || k.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), k.push(",.*:")
             })), (H.matchesSelector = ve.test(N = D.webkitMatchesSelector || D.mozMatchesSelector || D.oMatchesSelector || D.msMatchesSelector)) && n(function(e) {
                 H.disconnectedMatch = N.call(e, "div"), N.call(e, "[s!='']:x"), B.push("!=", he)
             }), k = k.length && new RegExp(k.join("|")), B = B.length && new RegExp(B.join("|")), t = ve.test(D.compareDocumentPosition), I = t || ve.test(D.contains) ? function(e, t) {
                 var r = 9 === e.nodeType ? e.documentElement : e,
                     i = t && t.parentNode;
                 return e === i || !(!i || 1 !== i.nodeType || !(r.contains ? r.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
             } : function(e, t) {
                 if (t)
                     for (; t = t.parentNode;)
                         if (t === e) return !0;
                 return !1
             }, X = t ? function(e, t) {
                 if (e === t) return A = !0, 0;
                 var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                 return i ? i : (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & i || !H.sortDetached && t.compareDocumentPosition(e) === i ? e === r || e.ownerDocument === U && I(U, e) ? -1 : t === r || t.ownerDocument === U && I(U, t) ? 1 : C ? re.call(C, e) - re.call(C, t) : 0 : 4 & i ? -1 : 1)
             } : function(e, t) {
                 if (e === t) return A = !0, 0;
                 var i, n = 0,
                     a = e.parentNode,
                     s = t.parentNode,
                     h = [e],
                     l = [t];
                 if (!a || !s) return e === r ? -1 : t === r ? 1 : a ? -1 : s ? 1 : C ? re.call(C, e) - re.call(C, t) : 0;
                 if (a === s) return o(e, t);
                 for (i = e; i = i.parentNode;) h.unshift(i);
                 for (i = t; i = i.parentNode;) l.unshift(i);
                 for (; h[n] === l[n];) n++;
                 return n ? o(h[n], l[n]) : h[n] === U ? -1 : l[n] === U ? 1 : 0
             }, r) : P
         }, t.matches = function(e, r) {
             return t(e, null, null, r)
         }, t.matchesSelector = function(e, r) {
             if ((e.ownerDocument || e) !== P && L(e), r = r.replace(de, "='$1']"), !(!H.matchesSelector || !F || B && B.test(r) || k && k.test(r))) try {
                 var i = N.call(e, r);
                 if (i || H.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
             } catch (n) {}
             return t(r, P, null, [e]).length > 0
         }, t.contains = function(e, t) {
             return (e.ownerDocument || e) !== P && L(e), I(e, t)
         }, t.attr = function(e, t) {
             (e.ownerDocument || e) !== P && L(e);
             var r = _.attrHandle[t.toLowerCase()],
                 i = r && J.call(_.attrHandle, t.toLowerCase()) ? r(e, t, !F) : void 0;
             return void 0 !== i ? i : H.attributes || !F ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
         }, t.error = function(e) {
             throw new Error("Syntax error, unrecognized expression: " + e)
         }, t.uniqueSort = function(e) {
             var t, r = [],
                 i = 0,
                 n = 0;
             if (A = !H.detectDuplicates, C = !H.sortStable && e.slice(0), e.sort(X), A) {
                 for (; t = e[n++];) t === e[n] && (i = r.push(n));
                 for (; i--;) e.splice(r[i], 1)
             }
             return C = null, e
         }, b = t.getText = function(e) {
             var t, r = "",
                 i = 0,
                 n = e.nodeType;
             if (n) {
                 if (1 === n || 9 === n || 11 === n) {
                     if ("string" == typeof e.textContent) return e.textContent;
                     for (e = e.firstChild; e; e = e.nextSibling) r += b(e)
                 } else if (3 === n || 4 === n) return e.nodeValue
             } else
                 for (; t = e[i++];) r += b(t);
             return r
         }, _ = t.selectors = {
             cacheLength: 50,
             createPseudo: i,
             match: me,
             attrHandle: {},
             find: {},
             relative: {
                 ">": {
                     dir: "parentNode",
                     first: !0
                 },
                 " ": {
                     dir: "parentNode"
                 },
                 "+": {
                     dir: "previousSibling",
                     first: !0
                 },
                 "~": {
                     dir: "previousSibling"
                 }
             },
             preFilter: {
                 ATTR: function(e) {
                     return e[1] = e[1].replace(Re, xe), e[3] = (e[4] || e[5] || "").replace(Re, xe), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                 },
                 CHILD: function(e) {
                     return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                 },
                 PSEUDO: function(e) {
                     var t, r = !e[5] && e[2];
                     return me.CHILD.test(e[0]) ? null : (e[3] && void 0 !== e[4] ? e[2] = e[4] : r && fe.test(r) && (t = d(r, !0)) && (t = r.indexOf(")", r.length - t) - r.length) && (e[0] = e[0].slice(0, t), e[2] = r.slice(0, t)), e.slice(0, 3))
                 }
             },
             filter: {
                 TAG: function(e) {
                     var t = e.replace(Re, xe).toLowerCase();
                     return "*" === e ? function() {
                         return !0
                     } : function(e) {
                         return e.nodeName && e.nodeName.toLowerCase() === t
                     }
                 },
                 CLASS: function(e) {
                     var t = G[e + " "];
                     return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && G(e, function(e) {
                         return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== q && e.getAttribute("class") || "")
                     })
                 },
                 ATTR: function(e, r, i) {
                     return function(n) {
                         var a = t.attr(n, e);
                         return null == a ? "!=" === r : r ? (a += "", "=" === r ? a === i : "!=" === r ? a !== i : "^=" === r ? i && 0 === a.indexOf(i) : "*=" === r ? i && a.indexOf(i) > -1 : "$=" === r ? i && a.slice(-i.length) === i : "~=" === r ? (" " + a + " ").indexOf(i) > -1 : "|=" === r ? a === i || a.slice(0, i.length + 1) === i + "-" : !1) : !0
                     }
                 },
                 CHILD: function(e, t, r, i, n) {
                     var a = "nth" !== e.slice(0, 3),
                         o = "last" !== e.slice(-4),
                         s = "of-type" === t;
                     return 1 === i && 0 === n ? function(e) {
                         return !!e.parentNode
                     } : function(t, r, h) {
                         var l, u, c, d, f, p, m = a !== o ? "nextSibling" : "previousSibling",
                             E = t.parentNode,
                             g = s && t.nodeName.toLowerCase(),
                             v = !h && !s;
                         if (E) {
                             if (a) {
                                 for (; m;) {
                                     for (c = t; c = c[m];)
                                         if (s ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) return !1;
                                     p = m = "only" === e && !p && "nextSibling"
                                 }
                                 return !0
                             }
                             if (p = [o ? E.firstChild : E.lastChild], o && v) {
                                 for (u = E[O] || (E[O] = {}), l = u[e] || [], f = l[0] === V && l[1], d = l[0] === V && l[2], c = f && E.childNodes[f]; c = ++f && c && c[m] || (d = f = 0) || p.pop();)
                                     if (1 === c.nodeType && ++d && c === t) {
                                         u[e] = [V, f, d];
                                         break
                                     }
                             } else if (v && (l = (t[O] || (t[O] = {}))[e]) && l[0] === V) d = l[1];
                             else
                                 for (;
                                     (c = ++f && c && c[m] || (d = f = 0) || p.pop()) && ((s ? c.nodeName.toLowerCase() !== g : 1 !== c.nodeType) || !++d || (v && ((c[O] || (c[O] = {}))[e] = [V, d]), c !== t)););
                             return d -= n, d === i || d % i === 0 && d / i >= 0
                         }
                     }
                 },
                 PSEUDO: function(e, r) {
                     var n, a = _.pseudos[e] || _.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                     return a[O] ? a(r) : a.length > 1 ? (n = [e, e, "", r], _.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                         for (var i, n = a(e, r), o = n.length; o--;) i = re.call(e, n[o]), e[i] = !(t[i] = n[o])
                     }) : function(e) {
                         return a(e, 0, n)
                     }) : a
                 }
             },
             pseudos: {
                 not: i(function(e) {
                     var t = [],
                         r = [],
                         n = M(e.replace(le, "$1"));
                     return n[O] ? i(function(e, t, r, i) {
                         for (var a, o = n(e, null, i, []), s = e.length; s--;)(a = o[s]) && (e[s] = !(t[s] = a))
                     }) : function(e, i, a) {
                         return t[0] = e, n(t, null, a, r), !r.pop()
                     }
                 }),
                 has: i(function(e) {
                     return function(r) {
                         return t(e, r).length > 0
                     }
                 }),
                 contains: i(function(e) {
                     return function(t) {
                         return (t.textContent || t.innerText || b(t)).indexOf(e) > -1
                     }
                 }),
                 lang: i(function(e) {
                     return pe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(Re, xe).toLowerCase(),
                         function(t) {
                             var r;
                             do
                                 if (r = F ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return r = r.toLowerCase(), r === e || 0 === r.indexOf(e + "-");
                             while ((t = t.parentNode) && 1 === t.nodeType);
                             return !1
                         }
                 }),
                 target: function(t) {
                     var r = e.location && e.location.hash;
                     return r && r.slice(1) === t.id
                 },
                 root: function(e) {
                     return e === D
                 },
                 focus: function(e) {
                     return e === P.activeElement && (!P.hasFocus || P.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                 },
                 enabled: function(e) {
                     return e.disabled === !1
                 },
                 disabled: function(e) {
                     return e.disabled === !0
                 },
                 checked: function(e) {
                     var t = e.nodeName.toLowerCase();
                     return "input" === t && !!e.checked || "option" === t && !!e.selected
                 },
                 selected: function(e) {
                     return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                 },
                 empty: function(e) {
                     for (e = e.firstChild; e; e = e.nextSibling)
                         if (e.nodeType < 6) return !1;
                     return !0
                 },
                 parent: function(e) {
                     return !_.pseudos.empty(e)
                 },
                 header: function(e) {
                     return ge.test(e.nodeName)
                 },
                 input: function(e) {
                     return Ee.test(e.nodeName)
                 },
                 button: function(e) {
                     var t = e.nodeName.toLowerCase();
                     return "input" === t && "button" === e.type || "button" === t
                 },
                 text: function(e) {
                     var t;
                     return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                 },
                 first: l(function() {
                     return [0]
                 }),
                 last: l(function(e, t) {
                     return [t - 1]
                 }),
                 eq: l(function(e, t, r) {
                     return [0 > r ? r + t : r]
                 }),
                 even: l(function(e, t) {
                     for (var r = 0; t > r; r += 2) e.push(r);
                     return e
                 }),
                 odd: l(function(e, t) {
                     for (var r = 1; t > r; r += 2) e.push(r);
                     return e
                 }),
                 lt: l(function(e, t, r) {
                     for (var i = 0 > r ? r + t : r; --i >= 0;) e.push(i);
                     return e
                 }),
                 gt: l(function(e, t, r) {
                     for (var i = 0 > r ? r + t : r; ++i < t;) e.push(i);
                     return e
                 })
             }
         }, _.pseudos.nth = _.pseudos.eq;
         for (x in {
                 radio: !0,
                 checkbox: !0,
                 file: !0,
                 password: !0,
                 image: !0
             }) _.pseudos[x] = s(x);
         for (x in {
                 submit: !0,
                 reset: !0
             }) _.pseudos[x] = h(x);
         return c.prototype = _.filters = _.pseudos, _.setFilters = new c, M = t.compile = function(e, t) {
             var r, i = [],
                 n = [],
                 a = j[e + " "];
             if (!a) {
                 for (t || (t = d(e)), r = t.length; r--;) a = v(t[r]), a[O] ? i.push(a) : n.push(a);
                 a = j(e, y(n, i))
             }
             return a
         }, H.sortStable = O.split("").sort(X).join("") === O, H.detectDuplicates = !!A, L(), H.sortDetached = n(function(e) {
             return 1 & e.compareDocumentPosition(P.createElement("div"))
         }), n(function(e) {
             return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
         }) || a("type|href|height|width", function(e, t, r) {
             return r ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
         }), H.attributes && n(function(e) {
             return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
         }) || a("value", function(e, t, r) {
             return r || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
         }), n(function(e) {
             return null == e.getAttribute("disabled")
         }) || a(ie, function(e, t, r) {
             var i;
             return r ? void 0 : e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
         }), t
     }(e);
     oe.find = ce, oe.expr = ce.selectors, oe.expr[":"] = oe.expr.pseudos, oe.unique = ce.uniqueSort, oe.text = ce.getText, oe.isXMLDoc = ce.isXML, oe.contains = ce.contains;
     var de = oe.expr.match.needsContext,
         fe = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
         pe = /^.[^:#\[\.,]*$/;
     oe.filter = function(e, t, r) {
         var i = t[0];
         return r && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? oe.find.matchesSelector(i, e) ? [i] : [] : oe.find.matches(e, oe.grep(t, function(e) {
             return 1 === e.nodeType
         }))
     }, oe.fn.extend({
         find: function(e) {
             var t, r = [],
                 i = this,
                 n = i.length;
             if ("string" != typeof e) return this.pushStack(oe(e).filter(function() {
                 for (t = 0; n > t; t++)
                     if (oe.contains(i[t], this)) return !0
             }));
             for (t = 0; n > t; t++) oe.find(e, i[t], r);
             return r = this.pushStack(n > 1 ? oe.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r
         },
         filter: function(e) {
             return this.pushStack(i(this, e || [], !1))
         },
         not: function(e) {
             return this.pushStack(i(this, e || [], !0))
         },
         is: function(e) {
             return !!i(this, "string" == typeof e && de.test(e) ? oe(e) : e || [], !1).length
         }
     });
     var me, Ee = e.document,
         ge = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
         ve = oe.fn.init = function(e, t) {
             var r, i;
             if (!e) return this;
             if ("string" == typeof e) {
                 if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ge.exec(e), !r || !r[1] && t) return !t || t.jquery ? (t || me).find(e) : this.constructor(t).find(e);
                 if (r[1]) {
                     if (t = t instanceof oe ? t[0] : t, oe.merge(this, oe.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : Ee, !0)), fe.test(r[1]) && oe.isPlainObject(t))
                         for (r in t) oe.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                     return this
                 }
                 if (i = Ee.getElementById(r[2]), i && i.parentNode) {
                     if (i.id !== r[2]) return me.find(e);
                     this.length = 1, this[0] = i
                 }
                 return this.context = Ee, this.selector = e, this
             }
             return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : oe.isFunction(e) ? "undefined" != typeof me.ready ? me.ready(e) : e(oe) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), oe.makeArray(e, this))
         };
     ve.prototype = oe.fn, me = oe(Ee);
     var ye = /^(?:parents|prev(?:Until|All))/,
         Te = {
             children: !0,
             contents: !0,
             next: !0,
             prev: !0
         };
     oe.extend({
         dir: function(e, t, r) {
             for (var i = [], n = e[t]; n && 9 !== n.nodeType && (void 0 === r || 1 !== n.nodeType || !oe(n).is(r));) 1 === n.nodeType && i.push(n), n = n[t];
             return i
         },
         sibling: function(e, t) {
             for (var r = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && r.push(e);
             return r
         }
     }), oe.fn.extend({
         has: function(e) {
             var t, r = oe(e, this),
                 i = r.length;
             return this.filter(function() {
                 for (t = 0; i > t; t++)
                     if (oe.contains(this, r[t])) return !0
             })
         },
         closest: function(e, t) {
             for (var r, i = 0, n = this.length, a = [], o = de.test(e) || "string" != typeof e ? oe(e, t || this.context) : 0; n > i; i++)
                 for (r = this[i]; r && r !== t; r = r.parentNode)
                     if (r.nodeType < 11 && (o ? o.index(r) > -1 : 1 === r.nodeType && oe.find.matchesSelector(r, e))) {
                         a.push(r);
                         break
                     }
             return this.pushStack(a.length > 1 ? oe.unique(a) : a)
         },
         index: function(e) {
             return e ? "string" == typeof e ? oe.inArray(this[0], oe(e)) : oe.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
         },
         add: function(e, t) {
             return this.pushStack(oe.unique(oe.merge(this.get(), oe(e, t))))
         },
         addBack: function(e) {
             return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
         }
     }), oe.each({
         parent: function(e) {
             var t = e.parentNode;
             return t && 11 !== t.nodeType ? t : null
         },
         parents: function(e) {
             return oe.dir(e, "parentNode")
         },
         parentsUntil: function(e, t, r) {
             return oe.dir(e, "parentNode", r)
         },
         next: function(e) {
             return n(e, "nextSibling")
         },
         prev: function(e) {
             return n(e, "previousSibling")
         },
         nextAll: function(e) {
             return oe.dir(e, "nextSibling")
         },
         prevAll: function(e) {
             return oe.dir(e, "previousSibling")
         },
         nextUntil: function(e, t, r) {
             return oe.dir(e, "nextSibling", r)
         },
         prevUntil: function(e, t, r) {
             return oe.dir(e, "previousSibling", r)
         },
         siblings: function(e) {
             return oe.sibling((e.parentNode || {}).firstChild, e)
         },
         children: function(e) {
             return oe.sibling(e.firstChild)
         },
         contents: function(e) {
             return oe.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : oe.merge([], e.childNodes)
         }
     }, function(e, t) {
         oe.fn[e] = function(r, i) {
             var n = oe.map(this, t, r);
             return "Until" !== e.slice(-5) && (i = r), i && "string" == typeof i && (n = oe.filter(i, n)), this.length > 1 && (Te[e] || (n = oe.unique(n)), ye.test(e) && (n = n.reverse())), this.pushStack(n)
         }
     });
     var Re = /\S+/g,
         xe = {};
     oe.Callbacks = function(e) {
         e = "string" == typeof e ? xe[e] || a(e) : oe.extend({}, e);
         var t, r, i, n, o, s, h = [],
             l = !e.once && [],
             u = function(a) {
                 for (r = e.memory && a, i = !0, o = s || 0, s = 0, n = h.length, t = !0; h && n > o; o++)
                     if (h[o].apply(a[0], a[1]) === !1 && e.stopOnFalse) {
                         r = !1;
                         break
                     }
                 t = !1, h && (l ? l.length && u(l.shift()) : r ? h = [] : c.disable())
             },
             c = {
                 add: function() {
                     if (h) {
                         var i = h.length;
                         ! function a(t) {
                             oe.each(t, function(t, r) {
                                 var i = oe.type(r);
                                 "function" === i ? e.unique && c.has(r) || h.push(r) : r && r.length && "string" !== i && a(r)
                             })
                         }(arguments), t ? n = h.length : r && (s = i, u(r))
                     }
                     return this
                 },
                 remove: function() {
                     return h && oe.each(arguments, function(e, r) {
                         for (var i;
                             (i = oe.inArray(r, h, i)) > -1;) h.splice(i, 1), t && (n >= i && n--, o >= i && o--)
                     }), this
                 },
                 has: function(e) {
                     return e ? oe.inArray(e, h) > -1 : !(!h || !h.length)
                 },
                 empty: function() {
                     return h = [], n = 0, this
                 },
                 disable: function() {
                     return h = l = r = void 0, this
                 },
                 disabled: function() {
                     return !h
                 },
                 lock: function() {
                     return l = void 0, r || c.disable(), this
                 },
                 locked: function() {
                     return !l
                 },
                 fireWith: function(e, r) {
                     return !h || i && !l || (r = r || [], r = [e, r.slice ? r.slice() : r], t ? l.push(r) : u(r)), this
                 },
                 fire: function() {
                     return c.fireWith(this, arguments), this
                 },
                 fired: function() {
                     return !!i
                 }
             };
         return c
     }, oe.extend({
         Deferred: function(e) {
             var t = [
                     ["resolve", "done", oe.Callbacks("once memory"), "resolved"],
                     ["reject", "fail", oe.Callbacks("once memory"), "rejected"],
                     ["notify", "progress", oe.Callbacks("memory")]
                 ],
                 r = "pending",
                 i = {
                     state: function() {
                         return r
                     },
                     always: function() {
                         return n.done(arguments).fail(arguments), this
                     },
                     then: function() {
                         var e = arguments;
                         return oe.Deferred(function(r) {
                             oe.each(t, function(t, a) {
                                 var o = oe.isFunction(e[t]) && e[t];
                                 n[a[1]](function() {
                                     var e = o && o.apply(this, arguments);
                                     e && oe.isFunction(e.promise) ? e.promise().done(r.resolve).fail(r.reject).progress(r.notify) : r[a[0] + "With"](this === i ? r.promise() : this, o ? [e] : arguments)
                                 })
                             }), e = null
                         }).promise()
                     },
                     promise: function(e) {
                         return null != e ? oe.extend(e, i) : i
                     }
                 },
                 n = {};
             return i.pipe = i.then, oe.each(t, function(e, a) {
                 var o = a[2],
                     s = a[3];
                 i[a[1]] = o.add, s && o.add(function() {
                     r = s
                 }, t[1 ^ e][2].disable, t[2][2].lock), n[a[0]] = function() {
                     return n[a[0] + "With"](this === n ? i : this, arguments), this
                 }, n[a[0] + "With"] = o.fireWith
             }), i.promise(n), e && e.call(n, n), n
         },
         when: function(e) {
             var t = 0,
                 r = J.call(arguments),
                 i = r.length,
                 n = 1 !== i || e && oe.isFunction(e.promise) ? i : 0,
                 a = 1 === n ? e : oe.Deferred(),
                 o = function(e, t, r) {
                     return function(i) {
                         t[e] = this, r[e] = arguments.length > 1 ? J.call(arguments) : i, r === s ? a.notifyWith(t, r) : --n || a.resolveWith(t, r)
                     }
                 },
                 s, h, l;
             if (i > 1)
                 for (s = new Array(i), h = new Array(i), l = new Array(i); i > t; t++) r[t] && oe.isFunction(r[t].promise) ? r[t].promise().done(o(t, l, r)).fail(a.reject).progress(o(t, h, s)) : --n;
             return n || a.resolveWith(l, r), a.promise()
         }
     });
     var He;
     oe.fn.ready = function(e) {
         return oe.ready.promise().done(e), this
     }, oe.extend({
         isReady: !1,
         readyWait: 1,
         holdReady: function(e) {
             e ? oe.readyWait++ : oe.ready(!0)
         },
         ready: function(e) {
             if (e === !0 ? !--oe.readyWait : !oe.isReady) {
                 if (!Ee.body) return setTimeout(oe.ready);
                 oe.isReady = !0, e !== !0 && --oe.readyWait > 0 || (He.resolveWith(Ee, [oe]), oe.fn.trigger && oe(Ee).trigger("ready").off("ready"))
             }
         }
     }), oe.ready.promise = function(t) {
         if (!He)
             if (He = oe.Deferred(), "complete" === Ee.readyState) setTimeout(oe.ready);
             else if (Ee.addEventListener) Ee.addEventListener("DOMContentLoaded", s, !1), e.addEventListener("load", s, !1);
         else {
             Ee.attachEvent("onreadystatechange", s), e.attachEvent("onload", s);
             var r = !1;
             try {
                 r = null == e.frameElement && Ee.documentElement
             } catch (i) {}
             r && r.doScroll && ! function n() {
                 if (!oe.isReady) {
                     try {
                         r.doScroll("left")
                     } catch (e) {
                         return setTimeout(n, 50)
                     }
                     o(), oe.ready()
                 }
             }()
         }
         return He.promise(t)
     };
     var _e = "undefined",
         be;
     for (be in oe(ne)) break;
     ne.ownLast = "0" !== be, ne.inlineBlockNeedsLayout = !1, oe(function() {
             var e, t, r = Ee.getElementsByTagName("body")[0];
             r && (e = Ee.createElement("div"), e.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", t = Ee.createElement("div"), r.appendChild(e).appendChild(t), typeof t.style.zoom !== _e && (t.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1", (ne.inlineBlockNeedsLayout = 3 === t.offsetWidth) && (r.style.zoom = 1)), r.removeChild(e), e = t = null)
         }),
         function() {
             var e = Ee.createElement("div");
             if (null == ne.deleteExpando) {
                 ne.deleteExpando = !0;
                 try {
                     delete e.test
                 } catch (t) {
                     ne.deleteExpando = !1
                 }
             }
             e = null
         }(), oe.acceptData = function(e) {
             var t = oe.noData[(e.nodeName + " ").toLowerCase()],
                 r = +e.nodeType || 1;
             return 1 !== r && 9 !== r ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
         };
     var we = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
         Me = /([A-Z])/g;
     oe.extend({
         cache: {},
         noData: {
             "applet ": !0,
             "embed ": !0,
             "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
         },
         hasData: function(e) {
             return e = e.nodeType ? oe.cache[e[oe.expando]] : e[oe.expando], !!e && !l(e)
         },
         data: function(e, t, r) {
             return u(e, t, r)
         },
         removeData: function(e, t) {
             return c(e, t)
         },
         _data: function(e, t, r) {
             return u(e, t, r, !0)
         },
         _removeData: function(e, t) {
             return c(e, t, !0)
         }
     }), oe.fn.extend({
         data: function(e, t) {
             var r, i, n, a = this[0],
                 o = a && a.attributes;
             if (void 0 === e) {
                 if (this.length && (n = oe.data(a), 1 === a.nodeType && !oe._data(a, "parsedAttrs"))) {
                     for (r = o.length; r--;) i = o[r].name, 0 === i.indexOf("data-") && (i = oe.camelCase(i.slice(5)), h(a, i, n[i]));
                     oe._data(a, "parsedAttrs", !0)
                 }
                 return n
             }
             return "object" == typeof e ? this.each(function() {
                 oe.data(this, e)
             }) : arguments.length > 1 ? this.each(function() {
                 oe.data(this, e, t)
             }) : a ? h(a, e, oe.data(a, e)) : void 0
         },
         removeData: function(e) {
             return this.each(function() {
                 oe.removeData(this, e)
             })
         }
     }), oe.extend({
         queue: function(e, t, r) {
             var i;
             return e ? (t = (t || "fx") + "queue", i = oe._data(e, t), r && (!i || oe.isArray(r) ? i = oe._data(e, t, oe.makeArray(r)) : i.push(r)), i || []) : void 0
         },
         dequeue: function(e, t) {
             t = t || "fx";
             var r = oe.queue(e, t),
                 i = r.length,
                 n = r.shift(),
                 a = oe._queueHooks(e, t),
                 o = function() {
                     oe.dequeue(e, t)
                 };
             "inprogress" === n && (n = r.shift(), i--), n && ("fx" === t && r.unshift("inprogress"), delete a.stop, n.call(e, o, a)), !i && a && a.empty.fire()
         },
         _queueHooks: function(e, t) {
             var r = t + "queueHooks";
             return oe._data(e, r) || oe._data(e, r, {
                 empty: oe.Callbacks("once memory").add(function() {
                     oe._removeData(e, t + "queue"), oe._removeData(e, r)
                 })
             })
         }
     }), oe.fn.extend({
         queue: function(e, t) {
             var r = 2;
             return "string" != typeof e && (t = e, e = "fx", r--), arguments.length < r ? oe.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                 var r = oe.queue(this, e, t);
                 oe._queueHooks(this, e), "fx" === e && "inprogress" !== r[0] && oe.dequeue(this, e)
             })
         },
         dequeue: function(e) {
             return this.each(function() {
                 oe.dequeue(this, e)
             })
         },
         clearQueue: function(e) {
             return this.queue(e || "fx", [])
         },
         promise: function(e, t) {
             var r, i = 1,
                 n = oe.Deferred(),
                 a = this,
                 o = this.length,
                 s = function() {
                     --i || n.resolveWith(a, [a])
                 };
             for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; o--;) r = oe._data(a[o], e + "queueHooks"), r && r.empty && (i++, r.empty.add(s));
             return s(), n.promise(t)
         }
     });
     var Se = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
         Ce = ["Top", "Right", "Bottom", "Left"],
         Ae = function(e, t) {
             return e = t || e, "none" === oe.css(e, "display") || !oe.contains(e.ownerDocument, e)
         },
         Le = oe.access = function(e, t, r, i, n, a, o) {
             var s = 0,
                 h = e.length,
                 l = null == r;
             if ("object" === oe.type(r)) {
                 n = !0;
                 for (s in r) oe.access(e, t, s, r[s], !0, a, o)
             } else if (void 0 !== i && (n = !0, oe.isFunction(i) || (o = !0), l && (o ? (t.call(e, i), t = null) : (l = t, t = function(e, t, r) {
                     return l.call(oe(e), r)
                 })), t))
                 for (; h > s; s++) t(e[s], r, o ? i : i.call(e[s], s, t(e[s], r)));
             return n ? e : l ? t.call(e) : h ? t(e[0], r) : a
         },
         Pe = /^(?:checkbox|radio)$/i;
     ! function() {
         var e = Ee.createDocumentFragment(),
             t = Ee.createElement("div"),
             r = Ee.createElement("input");
         if (t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a>", ne.leadingWhitespace = 3 === t.firstChild.nodeType, ne.tbody = !t.getElementsByTagName("tbody").length, ne.htmlSerialize = !!t.getElementsByTagName("link").length, ne.html5Clone = "<:nav></:nav>" !== Ee.createElement("nav").cloneNode(!0).outerHTML, r.type = "checkbox", r.checked = !0, e.appendChild(r), ne.appendChecked = r.checked, t.innerHTML = "<textarea>x</textarea>", ne.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, e.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", ne.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, ne.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function() {
                 ne.noCloneEvent = !1
             }), t.cloneNode(!0).click()), null == ne.deleteExpando) {
             ne.deleteExpando = !0;
             try {
                 delete t.test
             } catch (i) {
                 ne.deleteExpando = !1
             }
         }
         e = t = r = null
     }(),
     function() {
         var t, r, i = Ee.createElement("div");
         for (t in {
                 submit: !0,
                 change: !0,
                 focusin: !0
             }) r = "on" + t, (ne[t + "Bubbles"] = r in e) || (i.setAttribute(r, "t"), ne[t + "Bubbles"] = i.attributes[r].expando === !1);
         i = null
     }();
     var De = /^(?:input|select|textarea)$/i,
         Fe = /^key/,
         $ = /^(?:mouse|contextmenu)|click/,
         ke = /^(?:focusinfocus|focusoutblur)$/,
         Be = /^([^.]*)(?:\.(.+)|)$/;
     oe.event = {
         global: {},
         add: function(e, t, r, i, n) {
             var a, o, s, h, l, u, c, d, f, p, m, E = oe._data(e);
             if (E) {
                 for (r.handler && (h = r, r = h.handler, n = h.selector), r.guid || (r.guid = oe.guid++), (o = E.events) || (o = E.events = {}), (u = E.handle) || (u = E.handle = function(e) {
                         return typeof oe === _e || e && oe.event.triggered === e.type ? void 0 : oe.event.dispatch.apply(u.elem, arguments)
                     }, u.elem = e), t = (t || "").match(Re) || [""], s = t.length; s--;) a = Be.exec(t[s]) || [], f = m = a[1], p = (a[2] || "").split(".").sort(), f && (l = oe.event.special[f] || {}, f = (n ? l.delegateType : l.bindType) || f, l = oe.event.special[f] || {}, c = oe.extend({
                     type: f,
                     origType: m,
                     data: i,
                     handler: r,
                     guid: r.guid,
                     selector: n,
                     needsContext: n && oe.expr.match.needsContext.test(n),
                     namespace: p.join(".")
                 }, h), (d = o[f]) || (d = o[f] = [], d.delegateCount = 0, l.setup && l.setup.call(e, i, p, u) !== !1 || (e.addEventListener ? e.addEventListener(f, u, !1) : e.attachEvent && e.attachEvent("on" + f, u))), l.add && (l.add.call(e, c), c.handler.guid || (c.handler.guid = r.guid)), n ? d.splice(d.delegateCount++, 0, c) : d.push(c), oe.event.global[f] = !0);
                 e = null
             }
         },
         remove: function(e, t, r, i, n) {
             var a, o, s, h, l, u, c, d, f, p, m, E = oe.hasData(e) && oe._data(e);
             if (E && (u = E.events)) {
                 for (t = (t || "").match(Re) || [""], l = t.length; l--;)
                     if (s = Be.exec(t[l]) || [], f = m = s[1], p = (s[2] || "").split(".").sort(), f) {
                         for (c = oe.event.special[f] || {}, f = (i ? c.delegateType : c.bindType) || f, d = u[f] || [], s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), h = a = d.length; a--;) o = d[a], !n && m !== o.origType || r && r.guid !== o.guid || s && !s.test(o.namespace) || i && i !== o.selector && ("**" !== i || !o.selector) || (d.splice(a, 1), o.selector && d.delegateCount--, c.remove && c.remove.call(e, o));
                         h && !d.length && (c.teardown && c.teardown.call(e, p, E.handle) !== !1 || oe.removeEvent(e, f, E.handle), delete u[f])
                     } else
                         for (f in u) oe.event.remove(e, f + t[l], r, i, !0);
                 oe.isEmptyObject(u) && (delete E.handle, oe._removeData(e, "events"))
             }
         },
         trigger: function(t, r, i, n) {
             var a, o, s, h, l, u, c, d = [i || Ee],
                 f = re.call(t, "type") ? t.type : t,
                 p = re.call(t, "namespace") ? t.namespace.split(".") : [];
             if (s = u = i = i || Ee, 3 !== i.nodeType && 8 !== i.nodeType && !ke.test(f + oe.event.triggered) && (f.indexOf(".") >= 0 && (p = f.split("."), f = p.shift(), p.sort()), o = f.indexOf(":") < 0 && "on" + f, t = t[oe.expando] ? t : new oe.Event(f, "object" == typeof t && t), t.isTrigger = n ? 2 : 3, t.namespace = p.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), r = null == r ? [t] : oe.makeArray(r, [t]), l = oe.event.special[f] || {}, n || !l.trigger || l.trigger.apply(i, r) !== !1)) {
                 if (!n && !l.noBubble && !oe.isWindow(i)) {
                     for (h = l.delegateType || f, ke.test(h + f) || (s = s.parentNode); s; s = s.parentNode) d.push(s), u = s;
                     u === (i.ownerDocument || Ee) && d.push(u.defaultView || u.parentWindow || e)
                 }
                 for (c = 0;
                     (s = d[c++]) && !t.isPropagationStopped();) t.type = c > 1 ? h : l.bindType || f, a = (oe._data(s, "events") || {})[t.type] && oe._data(s, "handle"), a && a.apply(s, r), a = o && s[o], a && a.apply && oe.acceptData(s) && (t.result = a.apply(s, r), t.result === !1 && t.preventDefault());
                 if (t.type = f, !n && !t.isDefaultPrevented() && (!l._default || l._default.apply(d.pop(), r) === !1) && oe.acceptData(i) && o && i[f] && !oe.isWindow(i)) {
                     u = i[o], u && (i[o] = null), oe.event.triggered = f;
                     try {
                         i[f]()
                     } catch (m) {}
                     oe.event.triggered = void 0, u && (i[o] = u)
                 }
                 return t.result
             }
         },
         dispatch: function(e) {
             e = oe.event.fix(e);
             var t, r, i, n, a, o = [],
                 s = J.call(arguments),
                 h = (oe._data(this, "events") || {})[e.type] || [],
                 l = oe.event.special[e.type] || {};
             if (s[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                 for (o = oe.event.handlers.call(this, e, h), t = 0;
                     (n = o[t++]) && !e.isPropagationStopped();)
                     for (e.currentTarget = n.elem, a = 0;
                         (i = n.handlers[a++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((oe.event.special[i.origType] || {}).handle || i.handler).apply(n.elem, s), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
                 return l.postDispatch && l.postDispatch.call(this, e), e.result
             }
         },
         handlers: function(e, t) {
             var r, i, n, a, o = [],
                 s = t.delegateCount,
                 h = e.target;
             if (s && h.nodeType && (!e.button || "click" !== e.type))
                 for (; h != this; h = h.parentNode || this)
                     if (1 === h.nodeType && (h.disabled !== !0 || "click" !== e.type)) {
                         for (n = [], a = 0; s > a; a++) i = t[a], r = i.selector + " ", void 0 === n[r] && (n[r] = i.needsContext ? oe(r, this).index(h) >= 0 : oe.find(r, this, null, [h]).length), n[r] && n.push(i);
                         n.length && o.push({
                             elem: h,
                             handlers: n
                         })
                     }
             return s < t.length && o.push({
                 elem: this,
                 handlers: t.slice(s)
             }), o
         },
         fix: function(e) {
             if (e[oe.expando]) return e;
             var t, r, i, n = e.type,
                 a = e,
                 o = this.fixHooks[n];
             for (o || (this.fixHooks[n] = o = $.test(n) ? this.mouseHooks : Fe.test(n) ? this.keyHooks : {}), i = o.props ? this.props.concat(o.props) : this.props, e = new oe.Event(a), t = i.length; t--;) r = i[t], e[r] = a[r];
             return e.target || (e.target = a.srcElement || Ee), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, o.filter ? o.filter(e, a) : e
         },
         props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
         fixHooks: {},
         keyHooks: {
             props: "char charCode key keyCode".split(" "),
             filter: function(e, t) {
                 return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
             }
         },
         mouseHooks: {
             props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
             filter: function(e, t) {
                 var r, i, n, a = t.button,
                     o = t.fromElement;
                 return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || Ee, n = i.documentElement, r = i.body, e.pageX = t.clientX + (n && n.scrollLeft || r && r.scrollLeft || 0) - (n && n.clientLeft || r && r.clientLeft || 0), e.pageY = t.clientY + (n && n.scrollTop || r && r.scrollTop || 0) - (n && n.clientTop || r && r.clientTop || 0)), !e.relatedTarget && o && (e.relatedTarget = o === e.target ? t.toElement : o), e.which || void 0 === a || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
             }
         },
         special: {
             load: {
                 noBubble: !0
             },
             focus: {
                 trigger: function() {
                     if (this !== p() && this.focus) try {
                         return this.focus(), !1
                     } catch (e) {}
                 },
                 delegateType: "focusin"
             },
             blur: {
                 trigger: function() {
                     return this === p() && this.blur ? (this.blur(), !1) : void 0
                 },
                 delegateType: "focusout"
             },
             click: {
                 trigger: function() {
                     return oe.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                 },
                 _default: function(e) {
                     return oe.nodeName(e.target, "a")
                 }
             },
             beforeunload: {
                 postDispatch: function(e) {
                     void 0 !== e.result && (e.originalEvent.returnValue = e.result)
                 }
             }
         },
         simulate: function(e, t, r, i) {
             var n = oe.extend(new oe.Event, r, {
                 type: e,
                 isSimulated: !0,
                 originalEvent: {}
             });
             i ? oe.event.trigger(n, null, t) : oe.event.dispatch.call(t, n), n.isDefaultPrevented() && r.preventDefault()
         }
     }, oe.removeEvent = Ee.removeEventListener ? function(e, t, r) {
         e.removeEventListener && e.removeEventListener(t, r, !1)
     } : function(e, t, r) {
         var i = "on" + t;
         e.detachEvent && (typeof e[i] === _e && (e[i] = null), e.detachEvent(i, r))
     }, oe.Event = function(e, t) {
         return this instanceof oe.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && (e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault()) ? d : f) : this.type = e, t && oe.extend(this, t), this.timeStamp = e && e.timeStamp || oe.now(), void(this[oe.expando] = !0)) : new oe.Event(e, t)
     }, oe.Event.prototype = {
         isDefaultPrevented: f,
         isPropagationStopped: f,
         isImmediatePropagationStopped: f,
         preventDefault: function() {
             var e = this.originalEvent;
             this.isDefaultPrevented = d, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
         },
         stopPropagation: function() {
             var e = this.originalEvent;
             this.isPropagationStopped = d, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
         },
         stopImmediatePropagation: function() {
             this.isImmediatePropagationStopped = d, this.stopPropagation()
         }
     }, oe.each({
         mouseenter: "mouseover",
         mouseleave: "mouseout"
     }, function(e, t) {
         oe.event.special[e] = {
             delegateType: t,
             bindType: t,
             handle: function(e) {
                 var r, i = this,
                     n = e.relatedTarget,
                     a = e.handleObj;
                 return (!n || n !== i && !oe.contains(i, n)) && (e.type = a.origType, r = a.handler.apply(this, arguments), e.type = t), r
             }
         }
     }), ne.submitBubbles || (oe.event.special.submit = {
         setup: function() {
             return oe.nodeName(this, "form") ? !1 : void oe.event.add(this, "click._submit keypress._submit", function(e) {
                 var t = e.target,
                     r = oe.nodeName(t, "input") || oe.nodeName(t, "button") ? t.form : void 0;
                 r && !oe._data(r, "submitBubbles") && (oe.event.add(r, "submit._submit", function(e) {
                     e._submit_bubble = !0
                 }), oe._data(r, "submitBubbles", !0))
             })
         },
         postDispatch: function(e) {
             e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && oe.event.simulate("submit", this.parentNode, e, !0))
         },
         teardown: function() {
             return oe.nodeName(this, "form") ? !1 : void oe.event.remove(this, "._submit")
         }
     }), ne.changeBubbles || (oe.event.special.change = {
         setup: function() {
             return De.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (oe.event.add(this, "propertychange._change", function(e) {
                 "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
             }), oe.event.add(this, "click._change", function(e) {
                 this._just_changed && !e.isTrigger && (this._just_changed = !1), oe.event.simulate("change", this, e, !0)
             })), !1) : void oe.event.add(this, "beforeactivate._change", function(e) {
                 var t = e.target;
                 De.test(t.nodeName) && !oe._data(t, "changeBubbles") && (oe.event.add(t, "change._change", function(e) {
                     !this.parentNode || e.isSimulated || e.isTrigger || oe.event.simulate("change", this.parentNode, e, !0)
                 }), oe._data(t, "changeBubbles", !0))
             })
         },
         handle: function(e) {
             var t = e.target;
             return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
         },
         teardown: function() {
             return oe.event.remove(this, "._change"), !De.test(this.nodeName)
         }
     }), ne.focusinBubbles || oe.each({
         focus: "focusin",
         blur: "focusout"
     }, function(e, t) {
         var r = function(e) {
             oe.event.simulate(t, e.target, oe.event.fix(e), !0)
         };
         oe.event.special[t] = {
             setup: function() {
                 var i = this.ownerDocument || this,
                     n = oe._data(i, t);
                 n || i.addEventListener(e, r, !0), oe._data(i, t, (n || 0) + 1)
             },
             teardown: function() {
                 var i = this.ownerDocument || this,
                     n = oe._data(i, t) - 1;
                 n ? oe._data(i, t, n) : (i.removeEventListener(e, r, !0), oe._removeData(i, t))
             }
         }
     }), oe.fn.extend({
         on: function(e, t, r, i, n) {
             var a, o;
             if ("object" == typeof e) {
                 "string" != typeof t && (r = r || t, t = void 0);
                 for (a in e) this.on(a, t, r, e[a], n);
                 return this
             }
             if (null == r && null == i ? (i = t, r = t = void 0) : null == i && ("string" == typeof t ? (i = r, r = void 0) : (i = r, r = t, t = void 0)), i === !1) i = f;
             else if (!i) return this;
             return 1 === n && (o = i, i = function(e) {
                 return oe().off(e), o.apply(this, arguments)
             }, i.guid = o.guid || (o.guid = oe.guid++)), this.each(function() {
                 oe.event.add(this, e, i, r, t)
             })
         },
         one: function(e, t, r, i) {
             return this.on(e, t, r, i, 1)
         },
         off: function(e, t, r) {
             var i, n;
             if (e && e.preventDefault && e.handleObj) return i = e.handleObj, oe(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
             if ("object" == typeof e) {
                 for (n in e) this.off(n, t, e[n]);
                 return this
             }
             return (t === !1 || "function" == typeof t) && (r = t, t = void 0), r === !1 && (r = f), this.each(function() {
                 oe.event.remove(this, e, r, t)
             })
         },
         trigger: function(e, t) {
             return this.each(function() {
                 oe.event.trigger(e, t, this)
             })
         },
         triggerHandler: function(e, t) {
             var r = this[0];
             return r ? oe.event.trigger(e, t, r, !0) : void 0
         }
     });
     var Ne = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
         Ie = / jQuery\d+="(?:null|\d+)"/g,
         Oe = new RegExp("<(?:" + Ne + ")[\\s/>]", "i"),
         Ue = /^\s+/,
         Ve = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
         ze = /<([\w:]+)/,
         Ge = /<tbody/i,
         We = /<|&#?\w+;/,
         je = /<(?:script|style|link)/i,
         Xe = /checked\s*(?:[^=]|=\s*.checked.)/i,
         qe = /^$|\/(?:java|ecma)script/i,
         Ye = /^true\/(.*)/,
         Je = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
         Ke = {
             option: [1, "<select multiple='multiple'>", "</select>"],
             legend: [1, "<fieldset>", "</fieldset>"],
             area: [1, "<map>", "</map>"],
             param: [1, "<object>", "</object>"],
             thead: [1, "<table>", "</table>"],
             tr: [2, "<table><tbody>", "</tbody></table>"],
             col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
             td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
             _default: ne.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
         },
         Qe = m(Ee),
         Ze = Qe.appendChild(Ee.createElement("div"));
     Ke.optgroup = Ke.option, Ke.tbody = Ke.tfoot = Ke.colgroup = Ke.caption = Ke.thead, Ke.th = Ke.td, oe.extend({
         clone: function(e, t, r) {
             var i, n, a, o, s, h = oe.contains(e.ownerDocument, e);
             if (ne.html5Clone || oe.isXMLDoc(e) || !Oe.test("<" + e.nodeName + ">") ? a = e.cloneNode(!0) : (Ze.innerHTML = e.outerHTML, Ze.removeChild(a = Ze.firstChild)), !(ne.noCloneEvent && ne.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || oe.isXMLDoc(e)))
                 for (i = E(a), s = E(e), o = 0; null != (n = s[o]); ++o) i[o] && H(n, i[o]);
             if (t)
                 if (r)
                     for (s = s || E(e), i = i || E(a), o = 0; null != (n = s[o]); o++) x(n, i[o]);
                 else x(e, a);
             return i = E(a, "script"), i.length > 0 && R(i, !h && E(e, "script")), i = s = n = null, a
         },
         buildFragment: function(e, t, r, i) {
             for (var n, a, o, s, h, l, u, c = e.length, d = m(t), f = [], p = 0; c > p; p++)
                 if (a = e[p], a || 0 === a)
                     if ("object" === oe.type(a)) oe.merge(f, a.nodeType ? [a] : a);
                     else if (We.test(a)) {
                 for (s = s || d.appendChild(t.createElement("div")), h = (ze.exec(a) || ["", ""])[1].toLowerCase(),
                     u = Ke[h] || Ke._default, s.innerHTML = u[1] + a.replace(Ve, "<$1></$2>") + u[2], n = u[0]; n--;) s = s.lastChild;
                 if (!ne.leadingWhitespace && Ue.test(a) && f.push(t.createTextNode(Ue.exec(a)[0])), !ne.tbody)
                     for (a = "table" !== h || Ge.test(a) ? "<table>" !== u[1] || Ge.test(a) ? 0 : s : s.firstChild, n = a && a.childNodes.length; n--;) oe.nodeName(l = a.childNodes[n], "tbody") && !l.childNodes.length && a.removeChild(l);
                 for (oe.merge(f, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
                 s = d.lastChild
             } else f.push(t.createTextNode(a));
             for (s && d.removeChild(s), ne.appendChecked || oe.grep(E(f, "input"), g), p = 0; a = f[p++];)
                 if ((!i || -1 === oe.inArray(a, i)) && (o = oe.contains(a.ownerDocument, a), s = E(d.appendChild(a), "script"), o && R(s), r))
                     for (n = 0; a = s[n++];) qe.test(a.type || "") && r.push(a);
             return s = null, d
         },
         cleanData: function(e, t) {
             for (var r, i, n, a, o = 0, s = oe.expando, h = oe.cache, l = ne.deleteExpando, u = oe.event.special; null != (r = e[o]); o++)
                 if ((t || oe.acceptData(r)) && (n = r[s], a = n && h[n])) {
                     if (a.events)
                         for (i in a.events) u[i] ? oe.event.remove(r, i) : oe.removeEvent(r, i, a.handle);
                     h[n] && (delete h[n], l ? delete r[s] : typeof r.removeAttribute !== _e ? r.removeAttribute(s) : r[s] = null, Y.push(n))
                 }
         }
     }), oe.fn.extend({
         text: function(e) {
             return Le(this, function(e) {
                 return void 0 === e ? oe.text(this) : this.empty().append((this[0] && this[0].ownerDocument || Ee).createTextNode(e))
             }, null, e, arguments.length)
         },
         append: function() {
             return this.domManip(arguments, function(e) {
                 if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                     var t = v(this, e);
                     t.appendChild(e)
                 }
             })
         },
         prepend: function() {
             return this.domManip(arguments, function(e) {
                 if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                     var t = v(this, e);
                     t.insertBefore(e, t.firstChild)
                 }
             })
         },
         before: function() {
             return this.domManip(arguments, function(e) {
                 this.parentNode && this.parentNode.insertBefore(e, this)
             })
         },
         after: function() {
             return this.domManip(arguments, function(e) {
                 this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
             })
         },
         remove: function(e, t) {
             for (var r, i = e ? oe.filter(e, this) : this, n = 0; null != (r = i[n]); n++) t || 1 !== r.nodeType || oe.cleanData(E(r)), r.parentNode && (t && oe.contains(r.ownerDocument, r) && R(E(r, "script")), r.parentNode.removeChild(r));
             return this
         },
         empty: function() {
             for (var e, t = 0; null != (e = this[t]); t++) {
                 for (1 === e.nodeType && oe.cleanData(E(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                 e.options && oe.nodeName(e, "select") && (e.options.length = 0)
             }
             return this
         },
         clone: function(e, t) {
             return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                 return oe.clone(this, e, t)
             })
         },
         html: function(e) {
             return Le(this, function(e) {
                 var t = this[0] || {},
                     r = 0,
                     i = this.length;
                 if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(Ie, "") : void 0;
                 if (!("string" != typeof e || je.test(e) || !ne.htmlSerialize && Oe.test(e) || !ne.leadingWhitespace && Ue.test(e) || Ke[(ze.exec(e) || ["", ""])[1].toLowerCase()])) {
                     e = e.replace(Ve, "<$1></$2>");
                     try {
                         for (; i > r; r++) t = this[r] || {}, 1 === t.nodeType && (oe.cleanData(E(t, !1)), t.innerHTML = e);
                         t = 0
                     } catch (n) {}
                 }
                 t && this.empty().append(e)
             }, null, e, arguments.length)
         },
         replaceWith: function() {
             var e = arguments[0];
             return this.domManip(arguments, function(t) {
                 e = this.parentNode, oe.cleanData(E(this)), e && e.replaceChild(t, this)
             }), e && (e.length || e.nodeType) ? this : this.remove()
         },
         detach: function(e) {
             return this.remove(e, !0)
         },
         domManip: function(e, t) {
             e = K.apply([], e);
             var r, i, n, a, o, s, h = 0,
                 l = this.length,
                 u = this,
                 c = l - 1,
                 d = e[0],
                 f = oe.isFunction(d);
             if (f || l > 1 && "string" == typeof d && !ne.checkClone && Xe.test(d)) return this.each(function(r) {
                 var i = u.eq(r);
                 f && (e[0] = d.call(this, r, i.html())), i.domManip(e, t)
             });
             if (l && (s = oe.buildFragment(e, this[0].ownerDocument, !1, this), r = s.firstChild, 1 === s.childNodes.length && (s = r), r)) {
                 for (a = oe.map(E(s, "script"), y), n = a.length; l > h; h++) i = s, h !== c && (i = oe.clone(i, !0, !0), n && oe.merge(a, E(i, "script"))), t.call(this[h], i, h);
                 if (n)
                     for (o = a[a.length - 1].ownerDocument, oe.map(a, T), h = 0; n > h; h++) i = a[h], qe.test(i.type || "") && !oe._data(i, "globalEval") && oe.contains(o, i) && (i.src ? oe._evalUrl && oe._evalUrl(i.src) : oe.globalEval((i.text || i.textContent || i.innerHTML || "").replace(Je, "")));
                 s = r = null
             }
             return this
         }
     }), oe.each({
         appendTo: "append",
         prependTo: "prepend",
         insertBefore: "before",
         insertAfter: "after",
         replaceAll: "replaceWith"
     }, function(e, t) {
         oe.fn[e] = function(e) {
             for (var r, i = 0, n = [], a = oe(e), o = a.length - 1; o >= i; i++) r = i === o ? this : this.clone(!0), oe(a[i])[t](r), Q.apply(n, r.get());
             return this.pushStack(n)
         }
     });
     var $e, et = {};
     ! function() {
         var e, t, r = Ee.createElement("div"),
             i = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
         r.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = r.getElementsByTagName("a")[0], e.style.cssText = "float:left;opacity:.5", ne.opacity = /^0.5/.test(e.style.opacity), ne.cssFloat = !!e.style.cssFloat, r.style.backgroundClip = "content-box", r.cloneNode(!0).style.backgroundClip = "", ne.clearCloneStyle = "content-box" === r.style.backgroundClip, e = r = null, ne.shrinkWrapBlocks = function() {
             var e, r, n, a;
             if (null == t) {
                 if (e = Ee.getElementsByTagName("body")[0], !e) return;
                 a = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px", r = Ee.createElement("div"), n = Ee.createElement("div"), e.appendChild(r).appendChild(n), t = !1, typeof n.style.zoom !== _e && (n.style.cssText = i + ";width:1px;padding:1px;zoom:1", n.innerHTML = "<div></div>", n.firstChild.style.width = "5px", t = 3 !== n.offsetWidth), e.removeChild(r), e = r = n = null
             }
             return t
         }
     }();
     var tt = /^margin/,
         rt = new RegExp("^(" + Se + ")(?!px)[a-z%]+$", "i"),
         it, nt, at = /^(top|right|bottom|left)$/;
     e.getComputedStyle ? (it = function(e) {
         return e.ownerDocument.defaultView.getComputedStyle(e, null)
     }, nt = function(e, t, r) {
         var i, n, a, o, s = e.style;
         return r = r || it(e), o = r ? r.getPropertyValue(t) || r[t] : void 0, r && ("" !== o || oe.contains(e.ownerDocument, e) || (o = oe.style(e, t)), rt.test(o) && tt.test(t) && (i = s.width, n = s.minWidth, a = s.maxWidth, s.minWidth = s.maxWidth = s.width = o, o = r.width, s.width = i, s.minWidth = n, s.maxWidth = a)), void 0 === o ? o : o + ""
     }) : Ee.documentElement.currentStyle && (it = function(e) {
         return e.currentStyle
     }, nt = function(e, t, r) {
         var i, n, a, o, s = e.style;
         return r = r || it(e), o = r ? r[t] : void 0, null == o && s && s[t] && (o = s[t]), rt.test(o) && !at.test(t) && (i = s.left, n = e.runtimeStyle, a = n && n.left, a && (n.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : o, o = s.pixelLeft + "px", s.left = i, a && (n.left = a)), void 0 === o ? o : o + "" || "auto"
     }), ! function() {
         function t() {
             var t, r, i = Ee.getElementsByTagName("body")[0];
             i && (t = Ee.createElement("div"), r = Ee.createElement("div"), t.style.cssText = l, i.appendChild(t).appendChild(r), r.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%", oe.swap(i, null != i.style.zoom ? {
                 zoom: 1
             } : {}, function() {
                 n = 4 === r.offsetWidth
             }), a = !0, o = !1, s = !0, e.getComputedStyle && (o = "1%" !== (e.getComputedStyle(r, null) || {}).top, a = "4px" === (e.getComputedStyle(r, null) || {
                 width: "4px"
             }).width), i.removeChild(t), r = i = null)
         }
         var r, i, n, a, o, s, h = Ee.createElement("div"),
             l = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
             u = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
         h.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = h.getElementsByTagName("a")[0], r.style.cssText = "float:left;opacity:.5", ne.opacity = /^0.5/.test(r.style.opacity), ne.cssFloat = !!r.style.cssFloat, h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", ne.clearCloneStyle = "content-box" === h.style.backgroundClip, r = h = null, oe.extend(ne, {
             reliableHiddenOffsets: function() {
                 if (null != i) return i;
                 var e, t, r, n = Ee.createElement("div"),
                     a = Ee.getElementsByTagName("body")[0];
                 return a ? (n.setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = Ee.createElement("div"), e.style.cssText = l, a.appendChild(e).appendChild(n), n.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", t = n.getElementsByTagName("td"), t[0].style.cssText = "padding:0;margin:0;border:0;display:none", r = 0 === t[0].offsetHeight, t[0].style.display = "", t[1].style.display = "none", i = r && 0 === t[0].offsetHeight, a.removeChild(e), n = a = null, i) : void 0
             },
             boxSizing: function() {
                 return null == n && t(), n
             },
             boxSizingReliable: function() {
                 return null == a && t(), a
             },
             pixelPosition: function() {
                 return null == o && t(), o
             },
             reliableMarginRight: function() {
                 var t, r, i, n;
                 if (null == s && e.getComputedStyle) {
                     if (t = Ee.getElementsByTagName("body")[0], !t) return;
                     r = Ee.createElement("div"), i = Ee.createElement("div"), r.style.cssText = l, t.appendChild(r).appendChild(i), n = i.appendChild(Ee.createElement("div")), n.style.cssText = i.style.cssText = u, n.style.marginRight = n.style.width = "0", i.style.width = "1px", s = !parseFloat((e.getComputedStyle(n, null) || {}).marginRight), t.removeChild(r)
                 }
                 return s
             }
         })
     }(), oe.swap = function(e, t, r, i) {
         var n, a, o = {};
         for (a in t) o[a] = e.style[a], e.style[a] = t[a];
         n = r.apply(e, i || []);
         for (a in t) e.style[a] = o[a];
         return n
     };
     var ot = /alpha\([^)]*\)/i,
         st = /opacity\s*=\s*([^)]*)/,
         ht = /^(none|table(?!-c[ea]).+)/,
         lt = new RegExp("^(" + Se + ")(.*)$", "i"),
         ut = new RegExp("^([+-])=(" + Se + ")", "i"),
         ct = {
             position: "absolute",
             visibility: "hidden",
             display: "block"
         },
         dt = {
             letterSpacing: 0,
             fontWeight: 400
         },
         ft = ["Webkit", "O", "Moz", "ms"];
     oe.extend({
         cssHooks: {
             opacity: {
                 get: function(e, t) {
                     if (t) {
                         var r = nt(e, "opacity");
                         return "" === r ? "1" : r
                     }
                 }
             }
         },
         cssNumber: {
             columnCount: !0,
             fillOpacity: !0,
             fontWeight: !0,
             lineHeight: !0,
             opacity: !0,
             order: !0,
             orphans: !0,
             widows: !0,
             zIndex: !0,
             zoom: !0
         },
         cssProps: {
             "float": ne.cssFloat ? "cssFloat" : "styleFloat"
         },
         style: function(e, t, r, i) {
             if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                 var n, a, o, s = oe.camelCase(t),
                     h = e.style;
                 if (t = oe.cssProps[s] || (oe.cssProps[s] = M(h, s)), o = oe.cssHooks[t] || oe.cssHooks[s], void 0 === r) return o && "get" in o && void 0 !== (n = o.get(e, !1, i)) ? n : h[t];
                 if (a = typeof r, "string" === a && (n = ut.exec(r)) && (r = (n[1] + 1) * n[2] + parseFloat(oe.css(e, t)), a = "number"), null != r && r === r && ("number" !== a || oe.cssNumber[s] || (r += "px"), ne.clearCloneStyle || "" !== r || 0 !== t.indexOf("background") || (h[t] = "inherit"), !(o && "set" in o && void 0 === (r = o.set(e, r, i))))) try {
                     h[t] = "", h[t] = r
                 } catch (l) {}
             }
         },
         css: function(e, t, r, i) {
             var n, a, o, s = oe.camelCase(t);
             return t = oe.cssProps[s] || (oe.cssProps[s] = M(e.style, s)), o = oe.cssHooks[t] || oe.cssHooks[s], o && "get" in o && (a = o.get(e, !0, r)), void 0 === a && (a = nt(e, t, i)), "normal" === a && t in dt && (a = dt[t]), "" === r || r ? (n = parseFloat(a), r === !0 || oe.isNumeric(n) ? n || 0 : a) : a
         }
     }), oe.each(["height", "width"], function(e, t) {
         oe.cssHooks[t] = {
             get: function(e, r, i) {
                 return r ? 0 === e.offsetWidth && ht.test(oe.css(e, "display")) ? oe.swap(e, ct, function() {
                     return L(e, t, i)
                 }) : L(e, t, i) : void 0
             },
             set: function(e, r, i) {
                 var n = i && it(e);
                 return C(e, r, i ? A(e, t, i, ne.boxSizing() && "border-box" === oe.css(e, "boxSizing", !1, n), n) : 0)
             }
         }
     }), ne.opacity || (oe.cssHooks.opacity = {
         get: function(e, t) {
             return st.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
         },
         set: function(e, t) {
             var r = e.style,
                 i = e.currentStyle,
                 n = oe.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                 a = i && i.filter || r.filter || "";
             r.zoom = 1, (t >= 1 || "" === t) && "" === oe.trim(a.replace(ot, "")) && r.removeAttribute && (r.removeAttribute("filter"), "" === t || i && !i.filter) || (r.filter = ot.test(a) ? a.replace(ot, n) : a + " " + n)
         }
     }), oe.cssHooks.marginRight = w(ne.reliableMarginRight, function(e, t) {
         return t ? oe.swap(e, {
             display: "inline-block"
         }, nt, [e, "marginRight"]) : void 0
     }), oe.each({
         margin: "",
         padding: "",
         border: "Width"
     }, function(e, t) {
         oe.cssHooks[e + t] = {
             expand: function(r) {
                 for (var i = 0, n = {}, a = "string" == typeof r ? r.split(" ") : [r]; 4 > i; i++) n[e + Ce[i] + t] = a[i] || a[i - 2] || a[0];
                 return n
             }
         }, tt.test(e) || (oe.cssHooks[e + t].set = C)
     }), oe.fn.extend({
         css: function(e, t) {
             return Le(this, function(e, t, r) {
                 var i, n, a = {},
                     o = 0;
                 if (oe.isArray(t)) {
                     for (i = it(e), n = t.length; n > o; o++) a[t[o]] = oe.css(e, t[o], !1, i);
                     return a
                 }
                 return void 0 !== r ? oe.style(e, t, r) : oe.css(e, t)
             }, e, t, arguments.length > 1)
         },
         show: function() {
             return S(this, !0)
         },
         hide: function() {
             return S(this)
         },
         toggle: function(e) {
             return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                 Ae(this) ? oe(this).show() : oe(this).hide()
             })
         }
     }), oe.Tween = P, P.prototype = {
         constructor: P,
         init: function(e, t, r, i, n, a) {
             this.elem = e, this.prop = r, this.easing = n || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = a || (oe.cssNumber[r] ? "" : "px")
         },
         cur: function() {
             var e = P.propHooks[this.prop];
             return e && e.get ? e.get(this) : P.propHooks._default.get(this)
         },
         run: function(e) {
             var t, r = P.propHooks[this.prop];
             return this.pos = t = this.options.duration ? oe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), r && r.set ? r.set(this) : P.propHooks._default.set(this), this
         }
     }, P.prototype.init.prototype = P.prototype, P.propHooks = {
         _default: {
             get: function(e) {
                 var t;
                 return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = oe.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
             },
             set: function(e) {
                 oe.fx.step[e.prop] ? oe.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[oe.cssProps[e.prop]] || oe.cssHooks[e.prop]) ? oe.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
             }
         }
     }, P.propHooks.scrollTop = P.propHooks.scrollLeft = {
         set: function(e) {
             e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
         }
     }, oe.easing = {
         linear: function(e) {
             return e
         },
         swing: function(e) {
             return .5 - Math.cos(e * Math.PI) / 2
         }
     }, oe.fx = P.prototype.init, oe.fx.step = {};
     var pt, mt, Et = /^(?:toggle|show|hide)$/,
         gt = new RegExp("^(?:([+-])=|)(" + Se + ")([a-z%]*)$", "i"),
         vt = /queueHooks$/,
         yt = [B],
         Tt = {
             "*": [function(e, t) {
                 var r = this.createTween(e, t),
                     i = r.cur(),
                     n = gt.exec(t),
                     a = n && n[3] || (oe.cssNumber[e] ? "" : "px"),
                     o = (oe.cssNumber[e] || "px" !== a && +i) && gt.exec(oe.css(r.elem, e)),
                     s = 1,
                     h = 20;
                 if (o && o[3] !== a) {
                     a = a || o[3], n = n || [], o = +i || 1;
                     do s = s || ".5", o /= s, oe.style(r.elem, e, o + a); while (s !== (s = r.cur() / i) && 1 !== s && --h)
                 }
                 return n && (o = r.start = +o || +i || 0, r.unit = a, r.end = n[1] ? o + (n[1] + 1) * n[2] : +n[2]), r
             }]
         };
     oe.Animation = oe.extend(I, {
             tweener: function(e, t) {
                 oe.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                 for (var r, i = 0, n = e.length; n > i; i++) r = e[i], Tt[r] = Tt[r] || [], Tt[r].unshift(t)
             },
             prefilter: function(e, t) {
                 t ? yt.unshift(e) : yt.push(e)
             }
         }), oe.speed = function(e, t, r) {
             var i = e && "object" == typeof e ? oe.extend({}, e) : {
                 complete: r || !r && t || oe.isFunction(e) && e,
                 duration: e,
                 easing: r && t || t && !oe.isFunction(t) && t
             };
             return i.duration = oe.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in oe.fx.speeds ? oe.fx.speeds[i.duration] : oe.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                 oe.isFunction(i.old) && i.old.call(this), i.queue && oe.dequeue(this, i.queue)
             }, i
         }, oe.fn.extend({
             fadeTo: function(e, t, r, i) {
                 return this.filter(Ae).css("opacity", 0).show().end().animate({
                     opacity: t
                 }, e, r, i)
             },
             animate: function(e, t, r, i) {
                 var n = oe.isEmptyObject(e),
                     a = oe.speed(t, r, i),
                     o = function() {
                         var t = I(this, oe.extend({}, e), a);
                         (n || oe._data(this, "finish")) && t.stop(!0)
                     };
                 return o.finish = o, n || a.queue === !1 ? this.each(o) : this.queue(a.queue, o)
             },
             stop: function(e, t, r) {
                 var i = function(e) {
                     var t = e.stop;
                     delete e.stop, t(r)
                 };
                 return "string" != typeof e && (r = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                     var t = !0,
                         n = null != e && e + "queueHooks",
                         a = oe.timers,
                         o = oe._data(this);
                     if (n) o[n] && o[n].stop && i(o[n]);
                     else
                         for (n in o) o[n] && o[n].stop && vt.test(n) && i(o[n]);
                     for (n = a.length; n--;) a[n].elem !== this || null != e && a[n].queue !== e || (a[n].anim.stop(r), t = !1, a.splice(n, 1));
                     (t || !r) && oe.dequeue(this, e)
                 })
             },
             finish: function(e) {
                 return e !== !1 && (e = e || "fx"), this.each(function() {
                     var t, r = oe._data(this),
                         i = r[e + "queue"],
                         n = r[e + "queueHooks"],
                         a = oe.timers,
                         o = i ? i.length : 0;
                     for (r.finish = !0, oe.queue(this, e, []), n && n.stop && n.stop.call(this, !0), t = a.length; t--;) a[t].elem === this && a[t].queue === e && (a[t].anim.stop(!0), a.splice(t, 1));
                     for (t = 0; o > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
                     delete r.finish
                 })
             }
         }), oe.each(["toggle", "show", "hide"], function(e, t) {
             var r = oe.fn[t];
             oe.fn[t] = function(e, i, n) {
                 return null == e || "boolean" == typeof e ? r.apply(this, arguments) : this.animate(F(t, !0), e, i, n)
             }
         }), oe.each({
             slideDown: F("show"),
             slideUp: F("hide"),
             slideToggle: F("toggle"),
             fadeIn: {
                 opacity: "show"
             },
             fadeOut: {
                 opacity: "hide"
             },
             fadeToggle: {
                 opacity: "toggle"
             }
         }, function(e, t) {
             oe.fn[e] = function(e, r, i) {
                 return this.animate(t, e, r, i)
             }
         }), oe.timers = [], oe.fx.tick = function() {
             var e, t = oe.timers,
                 r = 0;
             for (pt = oe.now(); r < t.length; r++) e = t[r], e() || t[r] !== e || t.splice(r--, 1);
             t.length || oe.fx.stop(), pt = void 0
         }, oe.fx.timer = function(e) {
             oe.timers.push(e), e() ? oe.fx.start() : oe.timers.pop()
         }, oe.fx.interval = 13, oe.fx.start = function() {
             mt || (mt = setInterval(oe.fx.tick, oe.fx.interval))
         }, oe.fx.stop = function() {
             clearInterval(mt), mt = null
         }, oe.fx.speeds = {
             slow: 600,
             fast: 200,
             _default: 400
         }, oe.fn.delay = function(e, t) {
             return e = oe.fx ? oe.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, r) {
                 var i = setTimeout(t, e);
                 r.stop = function() {
                     clearTimeout(i)
                 }
             })
         },
         function() {
             var e, t, r, i, n = Ee.createElement("div");
             n.setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = n.getElementsByTagName("a")[0], r = Ee.createElement("select"), i = r.appendChild(Ee.createElement("option")), t = n.getElementsByTagName("input")[0], e.style.cssText = "top:1px", ne.getSetAttribute = "t" !== n.className, ne.style = /top/.test(e.getAttribute("style")), ne.hrefNormalized = "/a" === e.getAttribute("href"), ne.checkOn = !!t.value, ne.optSelected = i.selected, ne.enctype = !!Ee.createElement("form").enctype, r.disabled = !0, ne.optDisabled = !i.disabled, t = Ee.createElement("input"), t.setAttribute("value", ""), ne.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), ne.radioValue = "t" === t.value, e = t = r = i = n = null
         }();
     var Rt = /\r/g;
     oe.fn.extend({
         val: function(e) {
             var t, r, i, n = this[0];
             return arguments.length ? (i = oe.isFunction(e), this.each(function(r) {
                 var n;
                 1 === this.nodeType && (n = i ? e.call(this, r, oe(this).val()) : e, null == n ? n = "" : "number" == typeof n ? n += "" : oe.isArray(n) && (n = oe.map(n, function(e) {
                     return null == e ? "" : e + ""
                 })), t = oe.valHooks[this.type] || oe.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, n, "value") || (this.value = n))
             })) : n ? (t = oe.valHooks[n.type] || oe.valHooks[n.nodeName.toLowerCase()], t && "get" in t && void 0 !== (r = t.get(n, "value")) ? r : (r = n.value, "string" == typeof r ? r.replace(Rt, "") : null == r ? "" : r)) : void 0
         }
     }), oe.extend({
         valHooks: {
             option: {
                 get: function(e) {
                     var t = oe.find.attr(e, "value");
                     return null != t ? t : oe.text(e)
                 }
             },
             select: {
                 get: function(e) {
                     for (var t, r, i = e.options, n = e.selectedIndex, a = "select-one" === e.type || 0 > n, o = a ? null : [], s = a ? n + 1 : i.length, h = 0 > n ? s : a ? n : 0; s > h; h++)
                         if (r = i[h], !(!r.selected && h !== n || (ne.optDisabled ? r.disabled : null !== r.getAttribute("disabled")) || r.parentNode.disabled && oe.nodeName(r.parentNode, "optgroup"))) {
                             if (t = oe(r).val(), a) return t;
                             o.push(t)
                         }
                     return o
                 },
                 set: function(e, t) {
                     for (var r, i, n = e.options, a = oe.makeArray(t), o = n.length; o--;)
                         if (i = n[o], oe.inArray(oe.valHooks.option.get(i), a) >= 0) try {
                             i.selected = r = !0
                         } catch (s) {
                             i.scrollHeight
                         } else i.selected = !1;
                     return r || (e.selectedIndex = -1), n
                 }
             }
         }
     }), oe.each(["radio", "checkbox"], function() {
         oe.valHooks[this] = {
             set: function(e, t) {
                 return oe.isArray(t) ? e.checked = oe.inArray(oe(e).val(), t) >= 0 : void 0
             }
         }, ne.checkOn || (oe.valHooks[this].get = function(e) {
             return null === e.getAttribute("value") ? "on" : e.value
         })
     });
     var xt, Ht, _t = oe.expr.attrHandle,
         bt = /^(?:checked|selected)$/i,
         wt = ne.getSetAttribute,
         Mt = ne.input;
     oe.fn.extend({
         attr: function(e, t) {
             return Le(this, oe.attr, e, t, arguments.length > 1)
         },
         removeAttr: function(e) {
             return this.each(function() {
                 oe.removeAttr(this, e)
             })
         }
     }), oe.extend({
         attr: function(e, t, r) {
             var i, n, a = e.nodeType;
             return e && 3 !== a && 8 !== a && 2 !== a ? typeof e.getAttribute === _e ? oe.prop(e, t, r) : (1 === a && oe.isXMLDoc(e) || (t = t.toLowerCase(), i = oe.attrHooks[t] || (oe.expr.match.bool.test(t) ? Ht : xt)), void 0 === r ? i && "get" in i && null !== (n = i.get(e, t)) ? n : (n = oe.find.attr(e, t), null == n ? void 0 : n) : null !== r ? i && "set" in i && void 0 !== (n = i.set(e, r, t)) ? n : (e.setAttribute(t, r + ""), r) : void oe.removeAttr(e, t)) : void 0
         },
         removeAttr: function(e, t) {
             var r, i, n = 0,
                 a = t && t.match(Re);
             if (a && 1 === e.nodeType)
                 for (; r = a[n++];) i = oe.propFix[r] || r, oe.expr.match.bool.test(r) ? Mt && wt || !bt.test(r) ? e[i] = !1 : e[oe.camelCase("default-" + r)] = e[i] = !1 : oe.attr(e, r, ""), e.removeAttribute(wt ? r : i)
         },
         attrHooks: {
             type: {
                 set: function(e, t) {
                     if (!ne.radioValue && "radio" === t && oe.nodeName(e, "input")) {
                         var r = e.value;
                         return e.setAttribute("type", t), r && (e.value = r), t
                     }
                 }
             }
         }
     }), Ht = {
         set: function(e, t, r) {
             return t === !1 ? oe.removeAttr(e, r) : Mt && wt || !bt.test(r) ? e.setAttribute(!wt && oe.propFix[r] || r, r) : e[oe.camelCase("default-" + r)] = e[r] = !0, r
         }
     }, oe.each(oe.expr.match.bool.source.match(/\w+/g), function(e, t) {
         var r = _t[t] || oe.find.attr;
         _t[t] = Mt && wt || !bt.test(t) ? function(e, t, i) {
             var n, a;
             return i || (a = _t[t], _t[t] = n, n = null != r(e, t, i) ? t.toLowerCase() : null, _t[t] = a), n
         } : function(e, t, r) {
             return r ? void 0 : e[oe.camelCase("default-" + t)] ? t.toLowerCase() : null
         }
     }), Mt && wt || (oe.attrHooks.value = {
         set: function(e, t, r) {
             return oe.nodeName(e, "input") ? void(e.defaultValue = t) : xt && xt.set(e, t, r)
         }
     }), wt || (xt = {
         set: function(e, t, r) {
             var i = e.getAttributeNode(r);
             return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = t += "", "value" === r || t === e.getAttribute(r) ? t : void 0
         }
     }, _t.id = _t.name = _t.coords = function(e, t, r) {
         var i;
         return r ? void 0 : (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
     }, oe.valHooks.button = {
         get: function(e, t) {
             var r = e.getAttributeNode(t);
             return r && r.specified ? r.value : void 0
         },
         set: xt.set
     }, oe.attrHooks.contenteditable = {
         set: function(e, t, r) {
             xt.set(e, "" === t ? !1 : t, r)
         }
     }, oe.each(["width", "height"], function(e, t) {
         oe.attrHooks[t] = {
             set: function(e, r) {
                 return "" === r ? (e.setAttribute(t, "auto"), r) : void 0
             }
         }
     })), ne.style || (oe.attrHooks.style = {
         get: function(e) {
             return e.style.cssText || void 0
         },
         set: function(e, t) {
             return e.style.cssText = t + ""
         }
     });
     var St = /^(?:input|select|textarea|button|object)$/i,
         Ct = /^(?:a|area)$/i;
     oe.fn.extend({
         prop: function(e, t) {
             return Le(this, oe.prop, e, t, arguments.length > 1)
         },
         removeProp: function(e) {
             return e = oe.propFix[e] || e, this.each(function() {
                 try {
                     this[e] = void 0, delete this[e]
                 } catch (t) {}
             })
         }
     }), oe.extend({
         propFix: {
             "for": "htmlFor",
             "class": "className"
         },
         prop: function(e, t, r) {
             var i, n, a, o = e.nodeType;
             return e && 3 !== o && 8 !== o && 2 !== o ? (a = 1 !== o || !oe.isXMLDoc(e), a && (t = oe.propFix[t] || t, n = oe.propHooks[t]), void 0 !== r ? n && "set" in n && void 0 !== (i = n.set(e, r, t)) ? i : e[t] = r : n && "get" in n && null !== (i = n.get(e, t)) ? i : e[t]) : void 0
         },
         propHooks: {
             tabIndex: {
                 get: function(e) {
                     var t = oe.find.attr(e, "tabindex");
                     return t ? parseInt(t, 10) : St.test(e.nodeName) || Ct.test(e.nodeName) && e.href ? 0 : -1
                 }
             }
         }
     }), ne.hrefNormalized || oe.each(["href", "src"], function(e, t) {
         oe.propHooks[t] = {
             get: function(e) {
                 return e.getAttribute(t, 4)
             }
         }
     }), ne.optSelected || (oe.propHooks.selected = {
         get: function(e) {
             var t = e.parentNode;
             return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
         }
     }), oe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
         oe.propFix[this.toLowerCase()] = this
     }), ne.enctype || (oe.propFix.enctype = "encoding");
     var At = /[\t\r\n\f]/g;
     oe.fn.extend({
         addClass: function(e) {
             var t, r, i, n, a, o, s = 0,
                 h = this.length,
                 l = "string" == typeof e && e;
             if (oe.isFunction(e)) return this.each(function(t) {
                 oe(this).addClass(e.call(this, t, this.className))
             });
             if (l)
                 for (t = (e || "").match(Re) || []; h > s; s++)
                     if (r = this[s], i = 1 === r.nodeType && (r.className ? (" " + r.className + " ").replace(At, " ") : " ")) {
                         for (a = 0; n = t[a++];) i.indexOf(" " + n + " ") < 0 && (i += n + " ");
                         o = oe.trim(i), r.className !== o && (r.className = o)
                     }
             return this
         },
         removeClass: function(e) {
             var t, r, i, n, a, o, s = 0,
                 h = this.length,
                 l = 0 === arguments.length || "string" == typeof e && e;
             if (oe.isFunction(e)) return this.each(function(t) {
                 oe(this).removeClass(e.call(this, t, this.className))
             });
             if (l)
                 for (t = (e || "").match(Re) || []; h > s; s++)
                     if (r = this[s], i = 1 === r.nodeType && (r.className ? (" " + r.className + " ").replace(At, " ") : "")) {
                         for (a = 0; n = t[a++];)
                             for (; i.indexOf(" " + n + " ") >= 0;) i = i.replace(" " + n + " ", " ");
                         o = e ? oe.trim(i) : "", r.className !== o && (r.className = o)
                     }
             return this
         },
         toggleClass: function(e, t) {
             var r = typeof e;
             return "boolean" == typeof t && "string" === r ? t ? this.addClass(e) : this.removeClass(e) : this.each(oe.isFunction(e) ? function(r) {
                 oe(this).toggleClass(e.call(this, r, this.className, t), t)
             } : function() {
                 if ("string" === r)
                     for (var t, i = 0, n = oe(this), a = e.match(Re) || []; t = a[i++];) n.hasClass(t) ? n.removeClass(t) : n.addClass(t);
                 else(r === _e || "boolean" === r) && (this.className && oe._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : oe._data(this, "__className__") || "")
             })
         },
         hasClass: function(e) {
             for (var t = " " + e + " ", r = 0, i = this.length; i > r; r++)
                 if (1 === this[r].nodeType && (" " + this[r].className + " ").replace(At, " ").indexOf(t) >= 0) return !0;
             return !1
         }
     }), oe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
         oe.fn[t] = function(e, r) {
             return arguments.length > 0 ? this.on(t, null, e, r) : this.trigger(t)
         }
     }), oe.fn.extend({
         hover: function(e, t) {
             return this.mouseenter(e).mouseleave(t || e)
         },
         bind: function(e, t, r) {
             return this.on(e, null, t, r)
         },
         unbind: function(e, t) {
             return this.off(e, null, t)
         },
         delegate: function(e, t, r, i) {
             return this.on(t, e, r, i)
         },
         undelegate: function(e, t, r) {
             return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", r)
         }
     });
     var Lt = oe.now(),
         Pt = /\?/,
         Dt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
     oe.parseJSON = function(t) {
         if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
         var r, i = null,
             n = oe.trim(t + "");
         return n && !oe.trim(n.replace(Dt, function(e, t, n, a) {
             return r && t && (i = 0), 0 === i ? e : (r = n || t, i += !a - !n, "")
         })) ? Function("return " + n)() : oe.error("Invalid JSON: " + t)
     }, oe.parseXML = function(t) {
         var r, i;
         if (!t || "string" != typeof t) return null;
         try {
             e.DOMParser ? (i = new DOMParser, r = i.parseFromString(t, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(t))
         } catch (n) {
             r = void 0
         }
         return r && r.documentElement && !r.getElementsByTagName("parsererror").length || oe.error("Invalid XML: " + t), r
     };
     var Ft, kt, Bt = /#.*$/,
         Nt = /([?&])_=[^&]*/,
         It = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
         Ot = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
         Ut = /^(?:GET|HEAD)$/,
         Vt = /^\/\//,
         zt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
         Gt = {},
         Wt = {},
         jt = "*/".concat("*");
     try {
         kt = location.href
     } catch (Xt) {
         kt = Ee.createElement("a"), kt.href = "", kt = kt.href
     }
     Ft = zt.exec(kt.toLowerCase()) || [], oe.extend({
         active: 0,
         lastModified: {},
         etag: {},
         ajaxSettings: {
             url: kt,
             type: "GET",
             isLocal: Ot.test(Ft[1]),
             global: !0,
             processData: !0,
             async: !0,
             contentType: "application/x-www-form-urlencoded; charset=UTF-8",
             accepts: {
                 "*": jt,
                 text: "text/plain",
                 html: "text/html",
                 xml: "application/xml, text/xml",
                 json: "application/json, text/javascript"
             },
             contents: {
                 xml: /xml/,
                 html: /html/,
                 json: /json/
             },
             responseFields: {
                 xml: "responseXML",
                 text: "responseText",
                 json: "responseJSON"
             },
             converters: {
                 "* text": String,
                 "text html": !0,
                 "text json": oe.parseJSON,
                 "text xml": oe.parseXML
             },
             flatOptions: {
                 url: !0,
                 context: !0
             }
         },
         ajaxSetup: function(e, t) {
             return t ? V(V(e, oe.ajaxSettings), t) : V(oe.ajaxSettings, e)
         },
         ajaxPrefilter: O(Gt),
         ajaxTransport: O(Wt),
         ajax: function(e, t) {
             function r(e, t, r, i) {
                 var n, u, g, v, T, x = t;
                 2 !== y && (y = 2, s && clearTimeout(s), l = void 0, o = i || "", R.readyState = e > 0 ? 4 : 0, n = e >= 200 && 300 > e || 304 === e, r && (v = z(c, R, r)), v = G(c, v, R, n), n ? (c.ifModified && (T = R.getResponseHeader("Last-Modified"), T && (oe.lastModified[a] = T), T = R.getResponseHeader("etag"), T && (oe.etag[a] = T)), 204 === e || "HEAD" === c.type ? x = "nocontent" : 304 === e ? x = "notmodified" : (x = v.state, u = v.data, g = v.error, n = !g)) : (g = x, (e || !x) && (x = "error", 0 > e && (e = 0))), R.status = e, R.statusText = (t || x) + "", n ? p.resolveWith(d, [u, x, R]) : p.rejectWith(d, [R, x, g]), R.statusCode(E), E = void 0, h && f.trigger(n ? "ajaxSuccess" : "ajaxError", [R, c, n ? u : g]), m.fireWith(d, [R, x]), h && (f.trigger("ajaxComplete", [R, c]), --oe.active || oe.event.trigger("ajaxStop")))
             }
             "object" == typeof e && (t = e, e = void 0), t = t || {};
             var i, n, a, o, s, h, l, u, c = oe.ajaxSetup({}, t),
                 d = c.context || c,
                 f = c.context && (d.nodeType || d.jquery) ? oe(d) : oe.event,
                 p = oe.Deferred(),
                 m = oe.Callbacks("once memory"),
                 E = c.statusCode || {},
                 g = {},
                 v = {},
                 y = 0,
                 T = "canceled",
                 R = {
                     readyState: 0,
                     getResponseHeader: function(e) {
                         var t;
                         if (2 === y) {
                             if (!u)
                                 for (u = {}; t = It.exec(o);) u[t[1].toLowerCase()] = t[2];
                             t = u[e.toLowerCase()]
                         }
                         return null == t ? null : t
                     },
                     getAllResponseHeaders: function() {
                         return 2 === y ? o : null
                     },
                     setRequestHeader: function(e, t) {
                         var r = e.toLowerCase();
                         return y || (e = v[r] = v[r] || e, g[e] = t), this
                     },
                     overrideMimeType: function(e) {
                         return y || (c.mimeType = e), this
                     },
                     statusCode: function(e) {
                         var t;
                         if (e)
                             if (2 > y)
                                 for (t in e) E[t] = [E[t], e[t]];
                             else R.always(e[R.status]);
                         return this
                     },
                     abort: function(e) {
                         var t = e || T;
                         return l && l.abort(t), r(0, t), this
                     }
                 };
             if (p.promise(R).complete = m.add, R.success = R.done, R.error = R.fail, c.url = ((e || c.url || kt) + "").replace(Bt, "").replace(Vt, Ft[1] + "//"), c.type = t.method || t.type || c.method || c.type, c.dataTypes = oe.trim(c.dataType || "*").toLowerCase().match(Re) || [""], null == c.crossDomain && (i = zt.exec(c.url.toLowerCase()), c.crossDomain = !(!i || i[1] === Ft[1] && i[2] === Ft[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (Ft[3] || ("http:" === Ft[1] ? "80" : "443")))), c.data && c.processData && "string" != typeof c.data && (c.data = oe.param(c.data, c.traditional)), U(Gt, c, t, R), 2 === y) return R;
             h = c.global, h && 0 === oe.active++ && oe.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !Ut.test(c.type), a = c.url, c.hasContent || (c.data && (a = c.url += (Pt.test(a) ? "&" : "?") + c.data, delete c.data), c.cache === !1 && (c.url = Nt.test(a) ? a.replace(Nt, "$1_=" + Lt++) : a + (Pt.test(a) ? "&" : "?") + "_=" + Lt++)), c.ifModified && (oe.lastModified[a] && R.setRequestHeader("If-Modified-Since", oe.lastModified[a]), oe.etag[a] && R.setRequestHeader("If-None-Match", oe.etag[a])), (c.data && c.hasContent && c.contentType !== !1 || t.contentType) && R.setRequestHeader("Content-Type", c.contentType), R.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + ("*" !== c.dataTypes[0] ? ", " + jt + "; q=0.01" : "") : c.accepts["*"]);
             for (n in c.headers) R.setRequestHeader(n, c.headers[n]);
             if (c.beforeSend && (c.beforeSend.call(d, R, c) === !1 || 2 === y)) return R.abort();
             T = "abort";
             for (n in {
                     success: 1,
                     error: 1,
                     complete: 1
                 }) R[n](c[n]);
             if (l = U(Wt, c, t, R)) {
                 R.readyState = 1, h && f.trigger("ajaxSend", [R, c]), c.async && c.timeout > 0 && (s = setTimeout(function() {
                     R.abort("timeout")
                 }, c.timeout));
                 try {
                     y = 1, l.send(g, r)
                 } catch (x) {
                     if (!(2 > y)) throw x;
                     r(-1, x)
                 }
             } else r(-1, "No Transport");
             return R
         },
         getJSON: function(e, t, r) {
             return oe.get(e, t, r, "json")
         },
         getScript: function(e, t) {
             return oe.get(e, void 0, t, "script")
         }
     }), oe.each(["get", "post"], function(e, t) {
         oe[t] = function(e, r, i, n) {
             return oe.isFunction(r) && (n = n || i, i = r, r = void 0), oe.ajax({
                 url: e,
                 type: t,
                 dataType: n,
                 data: r,
                 success: i
             })
         }
     }), oe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
         oe.fn[t] = function(e) {
             return this.on(t, e)
         }
     }), oe._evalUrl = function(e) {
         return oe.ajax({
             url: e,
             type: "GET",
             dataType: "script",
             async: !1,
             global: !1,
             "throws": !0
         })
     }, oe.fn.extend({
         wrapAll: function(e) {
             if (oe.isFunction(e)) return this.each(function(t) {
                 oe(this).wrapAll(e.call(this, t))
             });
             if (this[0]) {
                 var t = oe(e, this[0].ownerDocument).eq(0).clone(!0);
                 this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                     for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                     return e
                 }).append(this)
             }
             return this
         },
         wrapInner: function(e) {
             return this.each(oe.isFunction(e) ? function(t) {
                 oe(this).wrapInner(e.call(this, t))
             } : function() {
                 var t = oe(this),
                     r = t.contents();
                 r.length ? r.wrapAll(e) : t.append(e)
             })
         },
         wrap: function(e) {
             var t = oe.isFunction(e);
             return this.each(function(r) {
                 oe(this).wrapAll(t ? e.call(this, r) : e)
             })
         },
         unwrap: function() {
             return this.parent().each(function() {
                 oe.nodeName(this, "body") || oe(this).replaceWith(this.childNodes)
             }).end()
         }
     }), oe.expr.filters.hidden = function(e) {
         return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ne.reliableHiddenOffsets() && "none" === (e.style && e.style.display || oe.css(e, "display"))
     }, oe.expr.filters.visible = function(e) {
         return !oe.expr.filters.hidden(e)
     };
     var qt = /%20/g,
         Yt = /\[\]$/,
         Jt = /\r?\n/g,
         Kt = /^(?:submit|button|image|reset|file)$/i,
         Qt = /^(?:input|select|textarea|keygen)/i;
     oe.param = function(e, t) {
         var r, i = [],
             n = function(e, t) {
                 t = oe.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
             };
         if (void 0 === t && (t = oe.ajaxSettings && oe.ajaxSettings.traditional), oe.isArray(e) || e.jquery && !oe.isPlainObject(e)) oe.each(e, function() {
             n(this.name, this.value)
         });
         else
             for (r in e) W(r, e[r], t, n);
         return i.join("&").replace(qt, "+")
     }, oe.fn.extend({
         serialize: function() {
             return oe.param(this.serializeArray())
         },
         serializeArray: function() {
             return this.map(function() {
                 var e = oe.prop(this, "elements");
                 return e ? oe.makeArray(e) : this
             }).filter(function() {
                 var e = this.type;
                 return this.name && !oe(this).is(":disabled") && Qt.test(this.nodeName) && !Kt.test(e) && (this.checked || !Pe.test(e))
             }).map(function(e, t) {
                 var r = oe(this).val();
                 return null == r ? null : oe.isArray(r) ? oe.map(r, function(e) {
                     return {
                         name: t.name,
                         value: e.replace(Jt, "\r\n")
                     }
                 }) : {
                     name: t.name,
                     value: r.replace(Jt, "\r\n")
                 }
             }).get()
         }
     }), oe.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function() {
         return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && j() || X()
     } : j;
     var Zt = 0,
         $t = {},
         er = oe.ajaxSettings.xhr();
     e.ActiveXObject && oe(e).on("unload", function() {
         for (var e in $t) $t[e](void 0, !0)
     }), ne.cors = !!er && "withCredentials" in er, er = ne.ajax = !!er, er && oe.ajaxTransport(function(e) {
         if (!e.crossDomain || ne.cors) {
             var t;
             return {
                 send: function(r, i) {
                     var n, a = e.xhr(),
                         o = ++Zt;
                     if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                         for (n in e.xhrFields) a[n] = e.xhrFields[n];
                     e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                     for (n in r) void 0 !== r[n] && a.setRequestHeader(n, r[n] + "");
                     a.send(e.hasContent && e.data || null), t = function(r, n) {
                         var s, h, l;
                         if (t && (n || 4 === a.readyState))
                             if (delete $t[o], t = void 0, a.onreadystatechange = oe.noop, n) 4 !== a.readyState && a.abort();
                             else {
                                 l = {}, s = a.status, "string" == typeof a.responseText && (l.text = a.responseText);
                                 try {
                                     h = a.statusText
                                 } catch (u) {
                                     h = ""
                                 }
                                 s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = l.text ? 200 : 404
                             }
                         l && i(s, h, l, a.getAllResponseHeaders())
                     }, e.async ? 4 === a.readyState ? setTimeout(t) : a.onreadystatechange = $t[o] = t : t()
                 },
                 abort: function() {
                     t && t(void 0, !0)
                 }
             }
         }
     }), oe.ajaxSetup({
         accepts: {
             script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
         },
         contents: {
             script: /(?:java|ecma)script/
         },
         converters: {
             "text script": function(e) {
                 return oe.globalEval(e), e
             }
         }
     }), oe.ajaxPrefilter("script", function(e) {
         void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
     }), oe.ajaxTransport("script", function(e) {
         if (e.crossDomain) {
             var t, r = Ee.head || oe("head")[0] || Ee.documentElement;
             return {
                 send: function(i, n) {
                     t = Ee.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function(e, r) {
                         (r || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, r || n(200, "success"))
                     }, r.insertBefore(t, r.firstChild)
                 },
                 abort: function() {
                     t && t.onload(void 0, !0)
                 }
             }
         }
     });
     var tr = [],
         rr = /(=)\?(?=&|$)|\?\?/;
     oe.ajaxSetup({
         jsonp: "callback",
         jsonpCallback: function() {
             var e = tr.pop() || oe.expando + "_" + Lt++;
             return this[e] = !0, e
         }
     }), oe.ajaxPrefilter("json jsonp", function(t, r, i) {
         var n, a, o, s = t.jsonp !== !1 && (rr.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && rr.test(t.data) && "data");
         return s || "jsonp" === t.dataTypes[0] ? (n = t.jsonpCallback = oe.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(rr, "$1" + n) : t.jsonp !== !1 && (t.url += (Pt.test(t.url) ? "&" : "?") + t.jsonp + "=" + n), t.converters["script json"] = function() {
             return o || oe.error(n + " was not called"), o[0]
         }, t.dataTypes[0] = "json", a = e[n], e[n] = function() {
             o = arguments
         }, i.always(function() {
             e[n] = a, t[n] && (t.jsonpCallback = r.jsonpCallback, tr.push(n)), o && oe.isFunction(a) && a(o[0]), o = a = void 0
         }), "script") : void 0
     }), oe.parseHTML = function(e, t, r) {
         if (!e || "string" != typeof e) return null;
         "boolean" == typeof t && (r = t, t = !1), t = t || Ee;
         var i = fe.exec(e),
             n = !r && [];
         return i ? [t.createElement(i[1])] : (i = oe.buildFragment([e], t, n), n && n.length && oe(n).remove(), oe.merge([], i.childNodes))
     };
     var ir = oe.fn.load;
     oe.fn.load = function(e, t, r) {
         if ("string" != typeof e && ir) return ir.apply(this, arguments);
         var i, n, a, o = this,
             s = e.indexOf(" ");
         return s >= 0 && (i = e.slice(s, e.length), e = e.slice(0, s)), oe.isFunction(t) ? (r = t, t = void 0) : t && "object" == typeof t && (a = "POST"), o.length > 0 && oe.ajax({
             url: e,
             type: a,
             dataType: "html",
             data: t
         }).done(function(e) {
             n = arguments, o.html(i ? oe("<div>").append(oe.parseHTML(e)).find(i) : e)
         }).complete(r && function(e, t) {
             o.each(r, n || [e.responseText, t, e])
         }), this
     }, oe.expr.filters.animated = function(e) {
         return oe.grep(oe.timers, function(t) {
             return e === t.elem
         }).length
     };
     var nr = e.document.documentElement;
     oe.offset = {
         setOffset: function(e, t, r) {
             var i, n, a, o, s, h, l, u = oe.css(e, "position"),
                 c = oe(e),
                 d = {};
             "static" === u && (e.style.position = "relative"), s = c.offset(), a = oe.css(e, "top"), h = oe.css(e, "left"), l = ("absolute" === u || "fixed" === u) && oe.inArray("auto", [a, h]) > -1, l ? (i = c.position(), o = i.top, n = i.left) : (o = parseFloat(a) || 0, n = parseFloat(h) || 0), oe.isFunction(t) && (t = t.call(e, r, s)), null != t.top && (d.top = t.top - s.top + o), null != t.left && (d.left = t.left - s.left + n), "using" in t ? t.using.call(e, d) : c.css(d)
         }
     }, oe.fn.extend({
         offset: function(e) {
             if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                 oe.offset.setOffset(this, e, t)
             });
             var t, r, i = {
                     top: 0,
                     left: 0
                 },
                 n = this[0],
                 a = n && n.ownerDocument;
             return a ? (t = a.documentElement, oe.contains(t, n) ? (typeof n.getBoundingClientRect !== _e && (i = n.getBoundingClientRect()), r = q(a), {
                 top: i.top + (r.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                 left: i.left + (r.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
             }) : i) : void 0
         },
         position: function() {
             if (this[0]) {
                 var e, t, r = {
                         top: 0,
                         left: 0
                     },
                     i = this[0];
                 return "fixed" === oe.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), oe.nodeName(e[0], "html") || (r = e.offset()), r.top += oe.css(e[0], "borderTopWidth", !0), r.left += oe.css(e[0], "borderLeftWidth", !0)), {
                     top: t.top - r.top - oe.css(i, "marginTop", !0),
                     left: t.left - r.left - oe.css(i, "marginLeft", !0)
                 }
             }
         },
         offsetParent: function() {
             return this.map(function() {
                 for (var e = this.offsetParent || nr; e && !oe.nodeName(e, "html") && "static" === oe.css(e, "position");) e = e.offsetParent;
                 return e || nr
             })
         }
     }), oe.each({
         scrollLeft: "pageXOffset",
         scrollTop: "pageYOffset"
     }, function(e, t) {
         var r = /Y/.test(t);
         oe.fn[e] = function(i) {
             return Le(this, function(e, i, n) {
                 var a = q(e);
                 return void 0 === n ? a ? t in a ? a[t] : a.document.documentElement[i] : e[i] : void(a ? a.scrollTo(r ? oe(a).scrollLeft() : n, r ? n : oe(a).scrollTop()) : e[i] = n)
             }, e, i, arguments.length, null)
         }
     }), oe.each(["top", "left"], function(e, t) {
         oe.cssHooks[t] = w(ne.pixelPosition, function(e, r) {
             return r ? (r = nt(e, t), rt.test(r) ? oe(e).position()[t] + "px" : r) : void 0
         })
     }), oe.each({
         Height: "height",
         Width: "width"
     }, function(e, t) {
         oe.each({
             padding: "inner" + e,
             content: t,
             "": "outer" + e
         }, function(r, i) {
             oe.fn[i] = function(i, n) {
                 var a = arguments.length && (r || "boolean" != typeof i),
                     o = r || (i === !0 || n === !0 ? "margin" : "border");
                 return Le(this, function(t, r, i) {
                     var n;
                     return oe.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (n = t.documentElement, Math.max(t.body["scroll" + e], n["scroll" + e], t.body["offset" + e], n["offset" + e], n["client" + e])) : void 0 === i ? oe.css(t, r, o) : oe.style(t, r, i, o)
                 }, t, a ? i : void 0, a, null)
             }
         })
     }), oe.fn.size = function() {
         return this.length
     }, oe.fn.andSelf = oe.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
         return oe
     });
     var ar = e.jQuery,
         or = e.$;
     return oe.noConflict = function(t) {
         return e.$ === oe && (e.$ = or), t && e.jQuery === oe && (e.jQuery = ar), oe
     }, typeof t === _e && (e.jQuery = e.$ = oe), oe
 }), window.Modernizr = function(e, t, r) {
         function i(e) {
             g.cssText = e
         }

         function n(e, t) {
             return i(R.join(e + ";") + (t || ""))
         }

         function a(e, t) {
             return typeof e === t
         }

         function o(e, t) {
             return !!~("" + e).indexOf(t)
         }

         function s(e, t) {
             for (var i in e) {
                 var n = e[i];
                 if (!o(n, "-") && g[n] !== r) return "pfx" == t ? n : !0
             }
             return !1
         }

         function h(e, t, i) {
             for (var n in e) {
                 var o = t[e[n]];
                 if (o !== r) return i === !1 ? e[n] : a(o, "function") ? o.bind(i || t) : o
             }
             return !1
         }

         function l(e, t, r) {
             var i = e.charAt(0).toUpperCase() + e.slice(1),
                 n = (e + " " + H.join(i + " ") + i).split(" ");
             return a(t, "string") || a(t, "undefined") ? s(n, t) : (n = (e + " " + _.join(i + " ") + i).split(" "), h(n, t, r))
         }

         function u() {
             d.input = function(r) {
                 for (var i = 0, n = r.length; n > i; i++) S[r[i]] = r[i] in v;
                 return S.list && (S.list = !!t.createElement("datalist") && !!e.HTMLDataListElement), S
             }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), d.inputtypes = function(e) {
                 for (var i = 0, n, a, o, s = e.length; s > i; i++) v.setAttribute("type", a = e[i]), n = "text" !== v.type, n && (v.value = y, v.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(a) && v.style.WebkitAppearance !== r ? (p.appendChild(v), o = t.defaultView, n = o.getComputedStyle && "textfield" !== o.getComputedStyle(v, null).WebkitAppearance && 0 !== v.offsetHeight, p.removeChild(v)) : /^(search|tel)$/.test(a) || (n = /^(url|email)$/.test(a) ? v.checkValidity && v.checkValidity() === !1 : v.value != y)), M[e[i]] = !!n;
                 return M
             }("search tel url email datetime date month week time datetime-local number range color".split(" "))
         }
         var c = "2.8.3",
             d = {},
             f = !0,
             p = t.documentElement,
             m = "modernizr",
             E = t.createElement(m),
             g = E.style,
             v = t.createElement("input"),
             y = ":)",
             T = {}.toString,
             R = " -webkit- -moz- -o- -ms- ".split(" "),
             x = "Webkit Moz O ms",
             H = x.split(" "),
             _ = x.toLowerCase().split(" "),
             b = {
                 svg: "http://www.w3.org/2000/svg"
             },
             w = {},
             M = {},
             S = {},
             C = [],
             A = C.slice,
             L, P = function(e, r, i, n) {
                 var a, o, s, h, l = t.createElement("div"),
                     u = t.body,
                     c = u || t.createElement("body");
                 if (parseInt(i, 10))
                     for (; i--;) s = t.createElement("div"), s.id = n ? n[i] : m + (i + 1), l.appendChild(s);
                 return a = ["&#173;", '<style id="s', m, '">', e, "</style>"].join(""), l.id = m, (u ? l : c).innerHTML += a, c.appendChild(l), u || (c.style.background = "", c.style.overflow = "hidden", h = p.style.overflow, p.style.overflow = "hidden", p.appendChild(c)), o = r(l, e), u ? l.parentNode.removeChild(l) : (c.parentNode.removeChild(c), p.style.overflow = h), !!o
             },
             D = function() {
                 function e(e, n) {
                     n = n || t.createElement(i[e] || "div"), e = "on" + e;
                     var o = e in n;
                     return o || (n.setAttribute || (n = t.createElement("div")), n.setAttribute && n.removeAttribute && (n.setAttribute(e, ""), o = a(n[e], "function"), a(n[e], "undefined") || (n[e] = r), n.removeAttribute(e))), n = null, o
                 }
                 var i = {
                     select: "input",
                     change: "input",
                     submit: "form",
                     reset: "form",
                     error: "img",
                     load: "img",
                     abort: "img"
                 };
                 return e
             }(),
             F = {}.hasOwnProperty,
             k;
         k = a(F, "undefined") || a(F.call, "undefined") ? function(e, t) {
             return t in e && a(e.constructor.prototype[t], "undefined")
         } : function(e, t) {
             return F.call(e, t)
         }, Function.prototype.bind || (Function.prototype.bind = function(e) {
             var t = this;
             if ("function" != typeof t) throw new TypeError;
             var r = A.call(arguments, 1),
                 i = function() {
                     if (this instanceof i) {
                         var n = function() {};
                         n.prototype = t.prototype;
                         var a = new n,
                             o = t.apply(a, r.concat(A.call(arguments)));
                         return Object(o) === o ? o : a
                     }
                     return t.apply(e, r.concat(A.call(arguments)))
                 };
             return i
         }), w.flexbox = function() {
             return l("flexWrap")
         }, w.flexboxlegacy = function() {
             return l("boxDirection")
         }, w.canvas = function() {
             var e = t.createElement("canvas");
             return !!e.getContext && !!e.getContext("2d")
         }, w.canvastext = function() {
             return !!d.canvas && !!a(t.createElement("canvas").getContext("2d").fillText, "function")
         }, w.webgl = function() {
             return !!e.WebGLRenderingContext
         }, w.touch = function() {
             var r;
             return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? r = !0 : P(["@media (", R.join("touch-enabled),("), m, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(e) {
                 r = 9 === e.offsetTop
             }), r
         }, w.geolocation = function() {
             return "geolocation" in navigator
         }, w.postmessage = function() {
             return !!e.postMessage
         }, w.websqldatabase = function() {
             return !!e.openDatabase
         }, w.indexedDB = function() {
             return !!l("indexedDB", e)
         }, w.hashchange = function() {
             return D("hashchange", e) && (t.documentMode === r || t.documentMode > 7)
         }, w.history = function() {
             return !!e.history && !!history.pushState
         }, w.draganddrop = function() {
             var e = t.createElement("div");
             return "draggable" in e || "ondragstart" in e && "ondrop" in e
         }, w.websockets = function() {
             return "WebSocket" in e || "MozWebSocket" in e
         }, w.rgba = function() {
             return i("background-color:rgba(150,255,150,.5)"), o(g.backgroundColor, "rgba")
         }, w.hsla = function() {
             return i("background-color:hsla(120,40%,100%,.5)"), o(g.backgroundColor, "rgba") || o(g.backgroundColor, "hsla")
         }, w.multiplebgs = function() {
             return i("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(g.background)
         }, w.backgroundsize = function() {
             return l("backgroundSize")
         }, w.borderimage = function() {
             return l("borderImage")
         }, w.borderradius = function() {
             return l("borderRadius")
         }, w.boxshadow = function() {
             return l("boxShadow")
         }, w.textshadow = function() {
             return "" === t.createElement("div").style.textShadow
         }, w.opacity = function() {
             return n("opacity:.55"), /^0.55$/.test(g.opacity)
         }, w.cssanimations = function() {
             return l("animationName")
         }, w.csscolumns = function() {
             return l("columnCount")
         }, w.cssgradients = function() {
             var e = "background-image:",
                 t = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
                 r = "linear-gradient(left top,#9f9, white);";
             return i((e + "-webkit- ".split(" ").join(t + e) + R.join(r + e)).slice(0, -e.length)), o(g.backgroundImage, "gradient")
         }, w.cssreflections = function() {
             return l("boxReflect")
         }, w.csstransforms = function() {
             return !!l("transform")
         }, w.csstransforms3d = function() {
             var e = !!l("perspective");
             return e && "webkitPerspective" in p.style && P("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(t, r) {
                 e = 9 === t.offsetLeft && 3 === t.offsetHeight
             }), e
         }, w.csstransitions = function() {
             return l("transition")
         }, w.fontface = function() {
             var e;
             return P('@font-face {font-family:"font";src:url("https://")}', function(r, i) {
                 var n = t.getElementById("smodernizr"),
                     a = n.sheet || n.styleSheet,
                     o = a ? a.cssRules && a.cssRules[0] ? a.cssRules[0].cssText : a.cssText || "" : "";
                 e = /src/i.test(o) && 0 === o.indexOf(i.split(" ")[0])
             }), e
         }, w.generatedcontent = function() {
             var e;
             return P(["#", m, "{font:0/0 a}#", m, ':after{content:"', y, '";visibility:hidden;font:3px/1 a}'].join(""), function(t) {
                 e = t.offsetHeight >= 3
             }), e
         }, w.video = function() {
             var e = t.createElement("video"),
                 r = !1;
             try {
                 (r = !!e.canPlayType) && (r = new Boolean(r), r.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), r.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), r.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
             } catch (i) {}
             return r
         }, w.audio = function() {
             var e = t.createElement("audio"),
                 r = !1;
             try {
                 (r = !!e.canPlayType) && (r = new Boolean(r), r.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), r.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, ""), r.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), r.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
             } catch (i) {}
             return r
         }, w.localstorage = function() {
             try {
                 return localStorage.setItem(m, m), localStorage.removeItem(m), !0
             } catch (e) {
                 return !1
             }
         }, w.sessionstorage = function() {
             try {
                 return sessionStorage.setItem(m, m), sessionStorage.removeItem(m), !0
             } catch (e) {
                 return !1
             }
         }, w.webworkers = function() {
             return !!e.Worker
         }, w.applicationcache = function() {
             return !!e.applicationCache
         }, w.svg = function() {
             return !!t.createElementNS && !!t.createElementNS(b.svg, "svg").createSVGRect
         }, w.inlinesvg = function() {
             var e = t.createElement("div");
             return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) == b.svg
         }, w.smil = function() {
             return !!t.createElementNS && /SVGAnimate/.test(T.call(t.createElementNS(b.svg, "animate")))
         }, w.svgclippaths = function() {
             return !!t.createElementNS && /SVGClipPath/.test(T.call(t.createElementNS(b.svg, "clipPath")))
         };
         for (var B in w) k(w, B) && (L = B.toLowerCase(), d[L] = w[B](), C.push((d[L] ? "" : "no-") + L));
         return d.input || u(), d.addTest = function(e, t) {
                 if ("object" == typeof e)
                     for (var i in e) k(e, i) && d.addTest(i, e[i]);
                 else {
                     if (e = e.toLowerCase(), d[e] !== r) return d;
                     t = "function" == typeof t ? t() : t, "undefined" != typeof f && f && (p.className += " " + (t ? "" : "no-") + e), d[e] = t
                 }
                 return d
             }, i(""), E = v = null,
             function(e, t) {
                 function r(e, t) {
                     var r = e.createElement("p"),
                         i = e.getElementsByTagName("head")[0] || e.documentElement;
                     return r.innerHTML = "x<style>" + t + "</style>", i.insertBefore(r.lastChild, i.firstChild)
                 }

                 function i() {
                     var e = v.elements;
                     return "string" == typeof e ? e.split(" ") : e
                 }

                 function n(e) {
                     var t = E[e[p]];
                     return t || (t = {}, m++, e[p] = m, E[m] = t), t
                 }

                 function a(e, r, i) {
                     if (r || (r = t), g) return r.createElement(e);
                     i || (i = n(r));
                     var a;
                     return a = i.cache[e] ? i.cache[e].cloneNode() : d.test(e) ? (i.cache[e] = i.createElem(e)).cloneNode() : i.createElem(e), !a.canHaveChildren || c.test(e) || a.tagUrn ? a : i.frag.appendChild(a)
                 }

                 function o(e, r) {
                     if (e || (e = t), g) return e.createDocumentFragment();
                     r = r || n(e);
                     for (var a = r.frag.cloneNode(), o = 0, s = i(), h = s.length; h > o; o++) a.createElement(s[o]);
                     return a
                 }

                 function s(e, t) {
                     t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(r) {
                         return v.shivMethods ? a(r, e, t) : t.createElem(r)
                     }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(/[\w\-]+/g, function(e) {
                         return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
                     }) + ");return n}")(v, t.frag)
                 }

                 function h(e) {
                     e || (e = t);
                     var i = n(e);
                     return v.shivCSS && !f && !i.hasCSS && (i.hasCSS = !!r(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), g || s(e, i), e
                 }
                 var l = "3.7.0",
                     u = e.html5 || {},
                     c = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                     d = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                     f, p = "_html5shiv",
                     m = 0,
                     E = {},
                     g;
                 ! function() {
                     try {
                         var e = t.createElement("a");
                         e.innerHTML = "<xyz></xyz>", f = "hidden" in e, g = 1 == e.childNodes.length || function() {
                             t.createElement("a");
                             var e = t.createDocumentFragment();
                             return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
                         }()
                     } catch (r) {
                         f = !0, g = !0
                     }
                 }();
                 var v = {
                     elements: u.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                     version: l,
                     shivCSS: u.shivCSS !== !1,
                     supportsUnknownElements: g,
                     shivMethods: u.shivMethods !== !1,
                     type: "default",
                     shivDocument: h,
                     createElement: a,
                     createDocumentFragment: o
                 };
                 e.html5 = v, h(t)
             }(this, t), d._version = c, d._prefixes = R, d._domPrefixes = _, d._cssomPrefixes = H, d.hasEvent = D, d.testProp = function(e) {
                 return s([e])
             }, d.testAllProps = l, d.testStyles = P, p.className = p.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + C.join(" ") : ""), d
     }(this, this.document),
     function(e, t, r) {
         function i(e) {
             return "[object Function]" == p.call(e)
         }

         function n(e) {
             return "string" == typeof e
         }

         function a() {}

         function o(e) {
             return !e || "loaded" == e || "complete" == e || "uninitialized" == e
         }

         function s() {
             var e = m.shift();
             E = 1, e ? e.t ? d(function() {
                 ("c" == e.t ? M.injectCss : M.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
             }, 0) : (e(), s()) : E = 0
         }

         function h(e, r, i, n, a, h, l) {
             function u(t) {
                 if (!p && o(c.readyState) && (T.r = p = 1, !E && s(), c.onload = c.onreadystatechange = null, t)) {
                     "img" != e && d(function() {
                         y.removeChild(c)
                     }, 50);
                     for (var i in _[r]) _[r].hasOwnProperty(i) && _[r][i].onload()
                 }
             }
             var l = l || M.errorTimeout,
                 c = t.createElement(e),
                 p = 0,
                 g = 0,
                 T = {
                     t: i,
                     s: r,
                     e: a,
                     a: h,
                     x: l
                 };
             1 === _[r] && (g = 1, _[r] = []), "object" == e ? c.data = r : (c.src = r, c.type = e), c.width = c.height = "0", c.onerror = c.onload = c.onreadystatechange = function() {
                 u.call(this, g)
             }, m.splice(n, 0, T), "img" != e && (g || 2 === _[r] ? (y.insertBefore(c, v ? null : f), d(u, l)) : _[r].push(c))
         }

         function l(e, t, r, i, a) {
             return E = 0, t = t || "j", n(e) ? h("c" == t ? R : T, e, t, this.i++, r, i, a) : (m.splice(this.i++, 0, e), 1 == m.length && s()), this
         }

         function u() {
             var e = M;
             return e.loader = {
                 load: l,
                 i: 0
             }, e
         }
         var c = t.documentElement,
             d = e.setTimeout,
             f = t.getElementsByTagName("script")[0],
             p = {}.toString,
             m = [],
             E = 0,
             g = "MozAppearance" in c.style,
             v = g && !!t.createRange().compareNode,
             y = v ? c : f.parentNode,
             c = e.opera && "[object Opera]" == p.call(e.opera),
             c = !!t.attachEvent && !c,
             T = g ? "object" : c ? "script" : "img",
             R = c ? "script" : T,
             x = Array.isArray || function(e) {
                 return "[object Array]" == p.call(e)
             },
             H = [],
             _ = {},
             b = {
                 timeout: function(e, t) {
                     return t.length && (e.timeout = t[0]), e
                 }
             },
             w, M;
         M = function(e) {
             function t(e) {
                 var e = e.split("!"),
                     t = H.length,
                     r = e.pop(),
                     i = e.length,
                     r = {
                         url: r,
                         origUrl: r,
                         prefixes: e
                     },
                     n, a, o;
                 for (a = 0; i > a; a++) o = e[a].split("="), (n = b[o.shift()]) && (r = n(r, o));
                 for (a = 0; t > a; a++) r = H[a](r);
                 return r
             }

             function o(e, n, a, o, s) {
                 var h = t(e),
                     l = h.autoCallback;
                 h.url.split(".").pop().split("?").shift(), h.bypass || (n && (n = i(n) ? n : n[e] || n[o] || n[e.split("/").pop().split("?")[0]]), h.instead ? h.instead(e, n, a, o, s) : (_[h.url] ? h.noexec = !0 : _[h.url] = 1, a.load(h.url, h.forceCSS || !h.forceJS && "css" == h.url.split(".").pop().split("?").shift() ? "c" : r, h.noexec, h.attrs, h.timeout), (i(n) || i(l)) && a.load(function() {
                     u(), n && n(h.origUrl, s, o), l && l(h.origUrl, s, o), _[h.url] = 2
                 })))
             }

             function s(e, t) {
                 function r(e, r) {
                     if (e) {
                         if (n(e)) r || (l = function() {
                             var e = [].slice.call(arguments);
                             u.apply(this, e), c()
                         }), o(e, l, t, 0, s);
                         else if (Object(e) === e)
                             for (f in d = function() {
                                     var t = 0,
                                         r;
                                     for (r in e) e.hasOwnProperty(r) && t++;
                                     return t
                                 }(), e) e.hasOwnProperty(f) && (!r && !--d && (i(l) ? l = function() {
                                 var e = [].slice.call(arguments);
                                 u.apply(this, e), c()
                             } : l[f] = function(e) {
                                 return function() {
                                     var t = [].slice.call(arguments);
                                     e && e.apply(this, t), c()
                                 }
                             }(u[f])), o(e[f], l, t, f, s))
                     } else !r && c()
                 }
                 var s = !!e.test,
                     h = e.load || e.both,
                     l = e.callback || a,
                     u = l,
                     c = e.complete || a,
                     d, f;
                 r(s ? e.yep : e.nope, !!h), h && r(h)
             }
             var h, l, c = this.yepnope.loader;
             if (n(e)) o(e, 0, c, 0);
             else if (x(e))
                 for (h = 0; h < e.length; h++) l = e[h], n(l) ? o(l, 0, c, 0) : x(l) ? M(l) : Object(l) === l && s(l, c);
             else Object(e) === e && s(e, c)
         }, M.addPrefix = function(e, t) {
             b[e] = t
         }, M.addFilter = function(e) {
             H.push(e)
         }, M.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", w = function() {
             t.removeEventListener("DOMContentLoaded", w, 0), t.readyState = "complete"
         }, 0)), e.yepnope = u(), e.yepnope.executeStack = s, e.yepnope.injectJs = function(e, r, i, n, h, l) {
             var u = t.createElement("script"),
                 c, p, n = n || M.errorTimeout;
             u.src = e;
             for (p in i) u.setAttribute(p, i[p]);
             r = l ? s : r || a, u.onreadystatechange = u.onload = function() {
                 !c && o(u.readyState) && (c = 1, r(), u.onload = u.onreadystatechange = null)
             }, d(function() {
                 c || (c = 1, r(1))
             }, n), h ? u.onload() : f.parentNode.insertBefore(u, f)
         }, e.yepnope.injectCss = function(e, r, i, n, o, h) {
             var n = t.createElement("link"),
                 l, r = h ? s : r || a;
             n.href = e, n.rel = "stylesheet", n.type = "text/css";
             for (l in i) n.setAttribute(l, i[l]);
             o || (f.parentNode.insertBefore(n, f), d(r, 0))
         }
     }(this, document), Modernizr.load = function() {
         yepnope.apply(window, [].slice.call(arguments, 0))
     },
     function() {
         var e = this,
             t = e._,
             r = Array.prototype,
             i = Object.prototype,
             n = Function.prototype,
             a = r.push,
             o = r.slice,
             s = r.concat,
             h = i.toString,
             l = i.hasOwnProperty,
             u = Array.isArray,
             c = Object.keys,
             d = n.bind,
             f = function(e) {
                 return e instanceof f ? e : this instanceof f ? void(this._wrapped = e) : new f(e)
             };
         "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = f), exports._ = f) : e._ = f, f.VERSION = "1.7.0";
         var p = function(e, t, r) {
             if (void 0 === t) return e;
             switch (null == r ? 3 : r) {
                 case 1:
                     return function(r) {
                         return e.call(t, r)
                     };
                 case 2:
                     return function(r, i) {
                         return e.call(t, r, i)
                     };
                 case 3:
                     return function(r, i, n) {
                         return e.call(t, r, i, n)
                     };
                 case 4:
                     return function(r, i, n, a) {
                         return e.call(t, r, i, n, a)
                     }
             }
             return function() {
                 return e.apply(t, arguments)
             }
         };
         f.iteratee = function(e, t, r) {
             return null == e ? f.identity : f.isFunction(e) ? p(e, t, r) : f.isObject(e) ? f.matches(e) : f.property(e)
         }, f.each = f.forEach = function(e, t, r) {
             if (null == e) return e;
             t = p(t, r);
             var i, n = e.length;
             if (n === +n)
                 for (i = 0; n > i; i++) t(e[i], i, e);
             else {
                 var a = f.keys(e);
                 for (i = 0, n = a.length; n > i; i++) t(e[a[i]], a[i], e)
             }
             return e
         }, f.map = f.collect = function(e, t, r) {
             if (null == e) return [];
             t = f.iteratee(t, r);
             for (var i, n = e.length !== +e.length && f.keys(e), a = (n || e).length, o = Array(a), s = 0; a > s; s++) i = n ? n[s] : s, o[s] = t(e[i], i, e);
             return o
         };
         var m = "Reduce of empty array with no initial value";
         f.reduce = f.foldl = f.inject = function(e, t, r, i) {
             null == e && (e = []), t = p(t, i, 4);
             var n, a = e.length !== +e.length && f.keys(e),
                 o = (a || e).length,
                 s = 0;
             if (arguments.length < 3) {
                 if (!o) throw new TypeError(m);
                 r = e[a ? a[s++] : s++]
             }
             for (; o > s; s++) n = a ? a[s] : s, r = t(r, e[n], n, e);
             return r
         }, f.reduceRight = f.foldr = function(e, t, r, i) {
             null == e && (e = []), t = p(t, i, 4);
             var n, a = e.length !== +e.length && f.keys(e),
                 o = (a || e).length;
             if (arguments.length < 3) {
                 if (!o) throw new TypeError(m);
                 r = e[a ? a[--o] : --o]
             }
             for (; o--;) n = a ? a[o] : o, r = t(r, e[n], n, e);
             return r
         }, f.find = f.detect = function(e, t, r) {
             var i;
             return t = f.iteratee(t, r), f.some(e, function(e, r, n) {
                 return t(e, r, n) ? (i = e, !0) : void 0
             }), i
         }, f.filter = f.select = function(e, t, r) {
             var i = [];
             return null == e ? i : (t = f.iteratee(t, r), f.each(e, function(e, r, n) {
                 t(e, r, n) && i.push(e)
             }), i)
         }, f.reject = function(e, t, r) {
             return f.filter(e, f.negate(f.iteratee(t)), r)
         }, f.every = f.all = function(e, t, r) {
             if (null == e) return !0;
             t = f.iteratee(t, r);
             var i, n, a = e.length !== +e.length && f.keys(e),
                 o = (a || e).length;
             for (i = 0; o > i; i++)
                 if (n = a ? a[i] : i, !t(e[n], n, e)) return !1;
             return !0
         }, f.some = f.any = function(e, t, r) {
             if (null == e) return !1;
             t = f.iteratee(t, r);
             var i, n, a = e.length !== +e.length && f.keys(e),
                 o = (a || e).length;
             for (i = 0; o > i; i++)
                 if (n = a ? a[i] : i, t(e[n], n, e)) return !0;
             return !1
         }, f.contains = f.include = function(e, t) {
             return null == e ? !1 : (e.length !== +e.length && (e = f.values(e)), f.indexOf(e, t) >= 0)
         }, f.invoke = function(e, t) {
             var r = o.call(arguments, 2),
                 i = f.isFunction(t);
             return f.map(e, function(e) {
                 return (i ? t : e[t]).apply(e, r)
             })
         }, f.pluck = function(e, t) {
             return f.map(e, f.property(t))
         }, f.where = function(e, t) {
             return f.filter(e, f.matches(t))
         }, f.findWhere = function(e, t) {
             return f.find(e, f.matches(t))
         }, f.max = function(e, t, r) {
             var i, n, a = -1 / 0,
                 o = -1 / 0;
             if (null == t && null != e) {
                 e = e.length === +e.length ? e : f.values(e);
                 for (var s = 0, h = e.length; h > s; s++) i = e[s], i > a && (a = i)
             } else t = f.iteratee(t, r), f.each(e, function(e, r, i) {
                 n = t(e, r, i), (n > o || n === -1 / 0 && a === -1 / 0) && (a = e, o = n)
             });
             return a
         }, f.min = function(e, t, r) {
             var i, n, a = 1 / 0,
                 o = 1 / 0;
             if (null == t && null != e) {
                 e = e.length === +e.length ? e : f.values(e);
                 for (var s = 0, h = e.length; h > s; s++) i = e[s], a > i && (a = i)
             } else t = f.iteratee(t, r), f.each(e, function(e, r, i) {
                 n = t(e, r, i), (o > n || 1 / 0 === n && 1 / 0 === a) && (a = e, o = n)
             });
             return a
         }, f.shuffle = function(e) {
             for (var t, r = e && e.length === +e.length ? e : f.values(e), i = r.length, n = Array(i), a = 0; i > a; a++) t = f.random(0, a), t !== a && (n[a] = n[t]), n[t] = r[a];
             return n
         }, f.sample = function(e, t, r) {
             return null == t || r ? (e.length !== +e.length && (e = f.values(e)), e[f.random(e.length - 1)]) : f.shuffle(e).slice(0, Math.max(0, t))
         }, f.sortBy = function(e, t, r) {
             return t = f.iteratee(t, r), f.pluck(f.map(e, function(e, r, i) {
                 return {
                     value: e,
                     index: r,
                     criteria: t(e, r, i)
                 }
             }).sort(function(e, t) {
                 var r = e.criteria,
                     i = t.criteria;
                 if (r !== i) {
                     if (r > i || void 0 === r) return 1;
                     if (i > r || void 0 === i) return -1
                 }
                 return e.index - t.index
             }), "value")
         };
         var E = function(e) {
             return function(t, r, i) {
                 var n = {};
                 return r = f.iteratee(r, i), f.each(t, function(i, a) {
                     var o = r(i, a, t);
                     e(n, i, o)
                 }), n
             }
         };
         f.groupBy = E(function(e, t, r) {
             f.has(e, r) ? e[r].push(t) : e[r] = [t]
         }), f.indexBy = E(function(e, t, r) {
             e[r] = t
         }), f.countBy = E(function(e, t, r) {
             f.has(e, r) ? e[r]++ : e[r] = 1
         }), f.sortedIndex = function(e, t, r, i) {
             r = f.iteratee(r, i, 1);
             for (var n = r(t), a = 0, o = e.length; o > a;) {
                 var s = a + o >>> 1;
                 r(e[s]) < n ? a = s + 1 : o = s
             }
             return a
         }, f.toArray = function(e) {
             return e ? f.isArray(e) ? o.call(e) : e.length === +e.length ? f.map(e, f.identity) : f.values(e) : []
         }, f.size = function(e) {
             return null == e ? 0 : e.length === +e.length ? e.length : f.keys(e).length
         }, f.partition = function(e, t, r) {
             t = f.iteratee(t, r);
             var i = [],
                 n = [];
             return f.each(e, function(e, r, a) {
                 (t(e, r, a) ? i : n).push(e)
             }), [i, n]
         }, f.first = f.head = f.take = function(e, t, r) {
             return null == e ? void 0 : null == t || r ? e[0] : 0 > t ? [] : o.call(e, 0, t)
         }, f.initial = function(e, t, r) {
             return o.call(e, 0, Math.max(0, e.length - (null == t || r ? 1 : t)))
         }, f.last = function(e, t, r) {
             return null == e ? void 0 : null == t || r ? e[e.length - 1] : o.call(e, Math.max(e.length - t, 0))
         }, f.rest = f.tail = f.drop = function(e, t, r) {
             return o.call(e, null == t || r ? 1 : t)
         }, f.compact = function(e) {
             return f.filter(e, f.identity)
         };
         var g = function(e, t, r, i) {
             if (t && f.every(e, f.isArray)) return s.apply(i, e);
             for (var n = 0, o = e.length; o > n; n++) {
                 var h = e[n];
                 f.isArray(h) || f.isArguments(h) ? t ? a.apply(i, h) : g(h, t, r, i) : r || i.push(h)
             }
             return i
         };
         f.flatten = function(e, t) {
             return g(e, t, !1, [])
         }, f.without = function(e) {
             return f.difference(e, o.call(arguments, 1))
         }, f.uniq = f.unique = function(e, t, r, i) {
             if (null == e) return [];
             f.isBoolean(t) || (i = r, r = t, t = !1), null != r && (r = f.iteratee(r, i));
             for (var n = [], a = [], o = 0, s = e.length; s > o; o++) {
                 var h = e[o];
                 if (t) o && a === h || n.push(h), a = h;
                 else if (r) {
                     var l = r(h, o, e);
                     f.indexOf(a, l) < 0 && (a.push(l), n.push(h))
                 } else f.indexOf(n, h) < 0 && n.push(h)
             }
             return n
         }, f.union = function() {
             return f.uniq(g(arguments, !0, !0, []))
         }, f.intersection = function(e) {
             if (null == e) return [];
             for (var t = [], r = arguments.length, i = 0, n = e.length; n > i; i++) {
                 var a = e[i];
                 if (!f.contains(t, a)) {
                     for (var o = 1; r > o && f.contains(arguments[o], a); o++);
                     o === r && t.push(a)
                 }
             }
             return t
         }, f.difference = function(e) {
             var t = g(o.call(arguments, 1), !0, !0, []);
             return f.filter(e, function(e) {
                 return !f.contains(t, e)
             })
         }, f.zip = function(e) {
             if (null == e) return [];
             for (var t = f.max(arguments, "length").length, r = Array(t), i = 0; t > i; i++) r[i] = f.pluck(arguments, i);
             return r
         }, f.object = function(e, t) {
             if (null == e) return {};
             for (var r = {}, i = 0, n = e.length; n > i; i++) t ? r[e[i]] = t[i] : r[e[i][0]] = e[i][1];
             return r
         }, f.indexOf = function(e, t, r) {
             if (null == e) return -1;
             var i = 0,
                 n = e.length;
             if (r) {
                 if ("number" != typeof r) return i = f.sortedIndex(e, t), e[i] === t ? i : -1;
                 i = 0 > r ? Math.max(0, n + r) : r
             }
             for (; n > i; i++)
                 if (e[i] === t) return i;
             return -1
         }, f.lastIndexOf = function(e, t, r) {
             if (null == e) return -1;
             var i = e.length;
             for ("number" == typeof r && (i = 0 > r ? i + r + 1 : Math.min(i, r + 1)); --i >= 0;)
                 if (e[i] === t) return i;
             return -1
         }, f.range = function(e, t, r) {
             arguments.length <= 1 && (t = e || 0, e = 0), r = r || 1;
             for (var i = Math.max(Math.ceil((t - e) / r), 0), n = Array(i), a = 0; i > a; a++, e += r) n[a] = e;
             return n
         };
         var v = function() {};
         f.bind = function(e, t) {
             var r, i;
             if (d && e.bind === d) return d.apply(e, o.call(arguments, 1));
             if (!f.isFunction(e)) throw new TypeError("Bind must be called on a function");
             return r = o.call(arguments, 2), i = function() {
                 if (!(this instanceof i)) return e.apply(t, r.concat(o.call(arguments)));
                 v.prototype = e.prototype;
                 var n = new v;
                 v.prototype = null;
                 var a = e.apply(n, r.concat(o.call(arguments)));
                 return f.isObject(a) ? a : n
             }
         }, f.partial = function(e) {
             var t = o.call(arguments, 1);
             return function() {
                 for (var r = 0, i = t.slice(), n = 0, a = i.length; a > n; n++) i[n] === f && (i[n] = arguments[r++]);
                 for (; r < arguments.length;) i.push(arguments[r++]);
                 return e.apply(this, i)
             }
         }, f.bindAll = function(e) {
             var t, r, i = arguments.length;
             if (1 >= i) throw new Error("bindAll must be passed function names");
             for (t = 1; i > t; t++) r = arguments[t], e[r] = f.bind(e[r], e);
             return e
         }, f.memoize = function(e, t) {
             var r = function(i) {
                 var n = r.cache,
                     a = t ? t.apply(this, arguments) : i;
                 return f.has(n, a) || (n[a] = e.apply(this, arguments)), n[a]
             };
             return r.cache = {}, r
         }, f.delay = function(e, t) {
             var r = o.call(arguments, 2);
             return setTimeout(function() {
                 return e.apply(null, r)
             }, t)
         }, f.defer = function(e) {
             return f.delay.apply(f, [e, 1].concat(o.call(arguments, 1)))
         }, f.throttle = function(e, t, r) {
             var i, n, a, o = null,
                 s = 0;
             r || (r = {});
             var h = function() {
                 s = r.leading === !1 ? 0 : f.now(), o = null, a = e.apply(i, n), o || (i = n = null)
             };
             return function() {
                 var l = f.now();
                 s || r.leading !== !1 || (s = l);
                 var u = t - (l - s);
                 return i = this, n = arguments, 0 >= u || u > t ? (clearTimeout(o), o = null, s = l, a = e.apply(i, n), o || (i = n = null)) : o || r.trailing === !1 || (o = setTimeout(h, u)), a
             }
         }, f.debounce = function(e, t, r) {
             var i, n, a, o, s, h = function() {
                 var l = f.now() - o;
                 t > l && l > 0 ? i = setTimeout(h, t - l) : (i = null, r || (s = e.apply(a, n), i || (a = n = null)))
             };
             return function() {
                 a = this, n = arguments, o = f.now();
                 var l = r && !i;
                 return i || (i = setTimeout(h, t)), l && (s = e.apply(a, n), a = n = null), s
             }
         }, f.wrap = function(e, t) {
             return f.partial(t, e)
         }, f.negate = function(e) {
             return function() {
                 return !e.apply(this, arguments)
             }
         }, f.compose = function() {
             var e = arguments,
                 t = e.length - 1;
             return function() {
                 for (var r = t, i = e[t].apply(this, arguments); r--;) i = e[r].call(this, i);
                 return i
             }
         }, f.after = function(e, t) {
             return function() {
                 return --e < 1 ? t.apply(this, arguments) : void 0
             }
         }, f.before = function(e, t) {
             var r;
             return function() {
                 return --e > 0 ? r = t.apply(this, arguments) : t = null, r
             }
         }, f.once = f.partial(f.before, 2), f.keys = function(e) {
             if (!f.isObject(e)) return [];
             if (c) return c(e);
             var t = [];
             for (var r in e) f.has(e, r) && t.push(r);
             return t
         }, f.values = function(e) {
             for (var t = f.keys(e), r = t.length, i = Array(r), n = 0; r > n; n++) i[n] = e[t[n]];
             return i
         }, f.pairs = function(e) {
             for (var t = f.keys(e), r = t.length, i = Array(r), n = 0; r > n; n++) i[n] = [t[n], e[t[n]]];
             return i
         }, f.invert = function(e) {
             for (var t = {}, r = f.keys(e), i = 0, n = r.length; n > i; i++) t[e[r[i]]] = r[i];
             return t
         }, f.functions = f.methods = function(e) {
             var t = [];
             for (var r in e) f.isFunction(e[r]) && t.push(r);
             return t.sort()
         }, f.extend = function(e) {
             if (!f.isObject(e)) return e;
             for (var t, r, i = 1, n = arguments.length; n > i; i++) {
                 t = arguments[i];
                 for (r in t) l.call(t, r) && (e[r] = t[r])
             }
             return e
         }, f.pick = function(e, t, r) {
             var i, n = {};
             if (null == e) return n;
             if (f.isFunction(t)) {
                 t = p(t, r);
                 for (i in e) {
                     var a = e[i];
                     t(a, i, e) && (n[i] = a)
                 }
             } else {
                 var h = s.apply([], o.call(arguments, 1));
                 e = new Object(e);
                 for (var l = 0, u = h.length; u > l; l++) i = h[l], i in e && (n[i] = e[i])
             }
             return n
         }, f.omit = function(e, t, r) {
             if (f.isFunction(t)) t = f.negate(t);
             else {
                 var i = f.map(s.apply([], o.call(arguments, 1)), String);
                 t = function(e, t) {
                     return !f.contains(i, t)
                 }
             }
             return f.pick(e, t, r)
         }, f.defaults = function(e) {
             if (!f.isObject(e)) return e;
             for (var t = 1, r = arguments.length; r > t; t++) {
                 var i = arguments[t];
                 for (var n in i) void 0 === e[n] && (e[n] = i[n])
             }
             return e
         }, f.clone = function(e) {
             return f.isObject(e) ? f.isArray(e) ? e.slice() : f.extend({}, e) : e
         }, f.tap = function(e, t) {
             return t(e), e
         };
         var y = function(e, t, r, i) {
             if (e === t) return 0 !== e || 1 / e === 1 / t;
             if (null == e || null == t) return e === t;
             e instanceof f && (e = e._wrapped), t instanceof f && (t = t._wrapped);
             var n = h.call(e);
             if (n !== h.call(t)) return !1;
             switch (n) {
                 case "[object RegExp]":
                 case "[object String]":
                     return "" + e == "" + t;
                 case "[object Number]":
                     return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
                 case "[object Date]":
                 case "[object Boolean]":
                     return +e === +t
             }
             if ("object" != typeof e || "object" != typeof t) return !1;
             for (var a = r.length; a--;)
                 if (r[a] === e) return i[a] === t;
             var o = e.constructor,
                 s = t.constructor;
             if (o !== s && "constructor" in e && "constructor" in t && !(f.isFunction(o) && o instanceof o && f.isFunction(s) && s instanceof s)) return !1;
             r.push(e), i.push(t);
             var l, u;
             if ("[object Array]" === n) {
                 if (l = e.length, u = l === t.length)
                     for (; l-- && (u = y(e[l], t[l], r, i)););
             } else {
                 var c, d = f.keys(e);
                 if (l = d.length, u = f.keys(t).length === l)
                     for (; l-- && (c = d[l], u = f.has(t, c) && y(e[c], t[c], r, i)););
             }
             return r.pop(), i.pop(), u
         };
         f.isEqual = function(e, t) {
             return y(e, t, [], [])
         }, f.isEmpty = function(e) {
             if (null == e) return !0;
             if (f.isArray(e) || f.isString(e) || f.isArguments(e)) return 0 === e.length;
             for (var t in e)
                 if (f.has(e, t)) return !1;
             return !0
         }, f.isElement = function(e) {
             return !(!e || 1 !== e.nodeType)
         }, f.isArray = u || function(e) {
             return "[object Array]" === h.call(e)
         }, f.isObject = function(e) {
             var t = typeof e;
             return "function" === t || "object" === t && !!e
         }, f.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
             f["is" + e] = function(t) {
                 return h.call(t) === "[object " + e + "]"
             }
         }), f.isArguments(arguments) || (f.isArguments = function(e) {
             return f.has(e, "callee")
         }), "function" != typeof /./ && (f.isFunction = function(e) {
             return "function" == typeof e || !1
         }), f.isFinite = function(e) {
             return isFinite(e) && !isNaN(parseFloat(e))
         }, f.isNaN = function(e) {
             return f.isNumber(e) && e !== +e
         }, f.isBoolean = function(e) {
             return e === !0 || e === !1 || "[object Boolean]" === h.call(e)
         }, f.isNull = function(e) {
             return null === e
         }, f.isUndefined = function(e) {
             return void 0 === e
         }, f.has = function(e, t) {
             return null != e && l.call(e, t)
         }, f.noConflict = function() {
             return e._ = t, this
         }, f.identity = function(e) {
             return e
         }, f.constant = function(e) {
             return function() {
                 return e
             }
         }, f.noop = function() {}, f.property = function(e) {
             return function(t) {
                 return t[e]
             }
         }, f.matches = function(e) {
             var t = f.pairs(e),
                 r = t.length;
             return function(e) {
                 if (null == e) return !r;
                 e = new Object(e);
                 for (var i = 0; r > i; i++) {
                     var n = t[i],
                         a = n[0];
                     if (n[1] !== e[a] || !(a in e)) return !1
                 }
                 return !0
             }
         }, f.times = function(e, t, r) {
             var i = Array(Math.max(0, e));
             t = p(t, r, 1);
             for (var n = 0; e > n; n++) i[n] = t(n);
             return i
         }, f.random = function(e, t) {
             return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
         }, f.now = Date.now || function() {
             return (new Date).getTime()
         };
         var T = {
                 "&": "&amp;",
                 "<": "&lt;",
                 ">": "&gt;",
                 '"': "&quot;",
                 "'": "&#x27;",
                 "`": "&#x60;"
             },
             R = f.invert(T),
             x = function(e) {
                 var t = function(t) {
                         return e[t]
                     },
                     r = "(?:" + f.keys(e).join("|") + ")",
                     i = RegExp(r),
                     n = RegExp(r, "g");
                 return function(e) {
                     return e = null == e ? "" : "" + e, i.test(e) ? e.replace(n, t) : e
                 }
             };
         f.escape = x(T), f.unescape = x(R), f.result = function(e, t) {
             if (null != e) {
                 var r = e[t];
                 return f.isFunction(r) ? e[t]() : r
             }
         };
         var H = 0;
         f.uniqueId = function(e) {
             var t = ++H + "";
             return e ? e + t : t
         }, f.templateSettings = {
             evaluate: /<%([\s\S]+?)%>/g,
             interpolate: /<%=([\s\S]+?)%>/g,
             escape: /<%-([\s\S]+?)%>/g
         };
         var _ = /(.)^/,
             b = {
                 "'": "'",
                 "\\": "\\",
                 "\r": "r",
                 "\n": "n",
                 "\u2028": "u2028",
                 "\u2029": "u2029"
             },
             w = /\\|'|\r|\n|\u2028|\u2029/g,
             M = function(e) {
                 return "\\" + b[e]
             };
         f.template = function(e, t, r) {
             !t && r && (t = r), t = f.defaults({}, t, f.templateSettings);
             var i = RegExp([(t.escape || _).source, (t.interpolate || _).source, (t.evaluate || _).source].join("|") + "|$", "g"),
                 n = 0,
                 a = "__p+='";
             e.replace(i, function(t, r, i, o, s) {
                 return a += e.slice(n, s).replace(w, M), n = s + t.length, r ? a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : i ? a += "'+\n((__t=(" + i + "))==null?'':__t)+\n'" : o && (a += "';\n" + o + "\n__p+='"), t
             }), a += "';\n", t.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
             try {
                 var o = new Function(t.variable || "obj", "_", a)
             } catch (s) {
                 throw s.source = a, s
             }
             var h = function(e) {
                     return o.call(this, e, f)
                 },
                 l = t.variable || "obj";
             return h.source = "function(" + l + "){\n" + a + "}", h
         }, f.chain = function(e) {
             var t = f(e);
             return t._chain = !0, t
         };
         var S = function(e) {
             return this._chain ? f(e).chain() : e
         };
         f.mixin = function(e) {
             f.each(f.functions(e), function(t) {
                 var r = f[t] = e[t];
                 f.prototype[t] = function() {
                     var e = [this._wrapped];
                     return a.apply(e, arguments), S.call(this, r.apply(f, e))
                 }
             })
         }, f.mixin(f), f.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
             var t = r[e];
             f.prototype[e] = function() {
                 var r = this._wrapped;
                 return t.apply(r, arguments), "shift" !== e && "splice" !== e || 0 !== r.length || delete r[0], S.call(this, r)
             }
         }), f.each(["concat", "join", "slice"], function(e) {
             var t = r[e];
             f.prototype[e] = function() {
                 return S.call(this, t.apply(this._wrapped, arguments))
             }
         }), f.prototype.value = function() {
             return this._wrapped
         }, "function" == typeof define && define.amd && define("underscore", [], function() {
             return f
         })
     }.call(this);
 var THREE = {
     REVISION: "71"
 };
 "object" == typeof module && (module.exports = THREE), void 0 === Math.sign && (Math.sign = function(e) {
         return 0 > e ? -1 : e > 0 ? 1 : +e
     }), THREE.log = function() {
         console.log.apply(console, arguments)
     }, THREE.warn = function() {
         console.warn.apply(console, arguments)
     }, THREE.error = function() {
         console.error.apply(console, arguments)
     }, THREE.MOUSE = {
         LEFT: 0,
         MIDDLE: 1,
         RIGHT: 2
     }, THREE.CullFaceNone = 0, THREE.CullFaceBack = 1, THREE.CullFaceFront = 2, THREE.CullFaceFrontBack = 3, THREE.FrontFaceDirectionCW = 0, THREE.FrontFaceDirectionCCW = 1, THREE.BasicShadowMap = 0, THREE.PCFShadowMap = 1, THREE.PCFSoftShadowMap = 2, THREE.FrontSide = 0, THREE.BackSide = 1, THREE.DoubleSide = 2, THREE.NoShading = 0, THREE.FlatShading = 1, THREE.SmoothShading = 2, THREE.NoColors = 0, THREE.FaceColors = 1, THREE.VertexColors = 2, THREE.NoBlending = 0, THREE.NormalBlending = 1, THREE.AdditiveBlending = 2, THREE.SubtractiveBlending = 3, THREE.MultiplyBlending = 4, THREE.CustomBlending = 5, THREE.AddEquation = 100, THREE.SubtractEquation = 101, THREE.ReverseSubtractEquation = 102, THREE.MinEquation = 103, THREE.MaxEquation = 104, THREE.ZeroFactor = 200, THREE.OneFactor = 201, THREE.SrcColorFactor = 202, THREE.OneMinusSrcColorFactor = 203, THREE.SrcAlphaFactor = 204, THREE.OneMinusSrcAlphaFactor = 205, THREE.DstAlphaFactor = 206, THREE.OneMinusDstAlphaFactor = 207, THREE.DstColorFactor = 208, THREE.OneMinusDstColorFactor = 209, THREE.SrcAlphaSaturateFactor = 210, THREE.MultiplyOperation = 0, THREE.MixOperation = 1, THREE.AddOperation = 2, THREE.UVMapping = 300, THREE.CubeReflectionMapping = 301, THREE.CubeRefractionMapping = 302, THREE.EquirectangularReflectionMapping = 303, THREE.EquirectangularRefractionMapping = 304, THREE.SphericalReflectionMapping = 305, THREE.RepeatWrapping = 1e3, THREE.ClampToEdgeWrapping = 1001, THREE.MirroredRepeatWrapping = 1002, THREE.NearestFilter = 1003, THREE.NearestMipMapNearestFilter = 1004, THREE.NearestMipMapLinearFilter = 1005, THREE.LinearFilter = 1006, THREE.LinearMipMapNearestFilter = 1007, THREE.LinearMipMapLinearFilter = 1008, THREE.UnsignedByteType = 1009, THREE.ByteType = 1010, THREE.ShortType = 1011, THREE.UnsignedShortType = 1012, THREE.IntType = 1013, THREE.UnsignedIntType = 1014, THREE.FloatType = 1015, THREE.HalfFloatType = 1025, THREE.UnsignedShort4444Type = 1016, THREE.UnsignedShort5551Type = 1017, THREE.UnsignedShort565Type = 1018, THREE.AlphaFormat = 1019, THREE.RGBFormat = 1020, THREE.RGBAFormat = 1021, THREE.LuminanceFormat = 1022, THREE.LuminanceAlphaFormat = 1023, THREE.RGBEFormat = THREE.RGBAFormat, THREE.RGB_S3TC_DXT1_Format = 2001, THREE.RGBA_S3TC_DXT1_Format = 2002, THREE.RGBA_S3TC_DXT3_Format = 2003, THREE.RGBA_S3TC_DXT5_Format = 2004, THREE.RGB_PVRTC_4BPPV1_Format = 2100, THREE.RGB_PVRTC_2BPPV1_Format = 2101, THREE.RGBA_PVRTC_4BPPV1_Format = 2102, THREE.RGBA_PVRTC_2BPPV1_Format = 2103, THREE.Projector = function() {
         THREE.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js."), this.projectVector = function(e, t) {
             THREE.warn("THREE.Projector: .projectVector() is now vector.project()."), e.project(t)
         }, this.unprojectVector = function(e, t) {
             THREE.warn("THREE.Projector: .unprojectVector() is now vector.unproject()."), e.unproject(t)
         }, this.pickingRay = function(e, t) {
             THREE.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")
         }
     }, THREE.CanvasRenderer = function() {
         THREE.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js"), this.domElement = document.createElement("canvas"), this.clear = function() {}, this.render = function() {}, this.setClearColor = function() {}, this.setSize = function() {}
     }, THREE.Color = function(e) {
         return 3 === arguments.length ? this.setRGB(arguments[0], arguments[1], arguments[2]) : this.set(e)
     }, THREE.Color.prototype = {
         constructor: THREE.Color,
         r: 1,
         g: 1,
         b: 1,
         set: function(e) {
             return e instanceof THREE.Color ? this.copy(e) : "number" == typeof e ? this.setHex(e) : "string" == typeof e && this.setStyle(e), this
         },
         setHex: function(e) {
             return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (255 & e) / 255, this
         },
         setRGB: function(e, t, r) {
             return this.r = e, this.g = t, this.b = r, this
         },
         setHSL: function(e, t, r) {
             if (0 === t) this.r = this.g = this.b = r;
             else {
                 var i = function(e, t, r) {
                     return 0 > r && (r += 1), r > 1 && (r -= 1), 1 / 6 > r ? e + 6 * (t - e) * r : .5 > r ? t : 2 / 3 > r ? e + 6 * (t - e) * (2 / 3 - r) : e
                 };
                 t = .5 >= r ? r * (1 + t) : r + t - r * t, r = 2 * r - t, this.r = i(r, t, e + 1 / 3), this.g = i(r, t, e), this.b = i(r, t, e - 1 / 3)
             }
             return this
         },
         setStyle: function(e) {
             return /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(e) ? (e = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(e), this.r = Math.min(255, parseInt(e[1], 10)) / 255, this.g = Math.min(255, parseInt(e[2], 10)) / 255, this.b = Math.min(255, parseInt(e[3], 10)) / 255, this) : /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(e) ? (e = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(e), this.r = Math.min(100, parseInt(e[1], 10)) / 100, this.g = Math.min(100, parseInt(e[2], 10)) / 100, this.b = Math.min(100, parseInt(e[3], 10)) / 100, this) : /^\#([0-9a-f]{6})$/i.test(e) ? (e = /^\#([0-9a-f]{6})$/i.exec(e), this.setHex(parseInt(e[1], 16)), this) : /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(e) ? (e = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(e), this.setHex(parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3], 16)), this) : /^(\w+)$/i.test(e) ? (this.setHex(THREE.ColorKeywords[e]), this) : void 0
         },
         copy: function(e) {
             return this.r = e.r, this.g = e.g, this.b = e.b, this
         },
         copyGammaToLinear: function(e, t) {
             return void 0 === t && (t = 2), this.r = Math.pow(e.r, t), this.g = Math.pow(e.g, t), this.b = Math.pow(e.b, t), this
         },
         copyLinearToGamma: function(e, t) {
             void 0 === t && (t = 2);
             var r = t > 0 ? 1 / t : 1;
             return this.r = Math.pow(e.r, r), this.g = Math.pow(e.g, r), this.b = Math.pow(e.b, r), this
         },
         convertGammaToLinear: function() {
             var e = this.r,
                 t = this.g,
                 r = this.b;
             return this.r = e * e, this.g = t * t, this.b = r * r, this
         },
         convertLinearToGamma: function() {
             return this.r = Math.sqrt(this.r), this.g = Math.sqrt(this.g), this.b = Math.sqrt(this.b), this
         },
         getHex: function() {
             return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
         },
         getHexString: function() {
             return ("000000" + this.getHex().toString(16)).slice(-6)
         },
         getHSL: function(e) {
             e = e || {
                 h: 0,
                 s: 0,
                 l: 0
             };
             var t = this.r,
                 r = this.g,
                 i = this.b,
                 n = Math.max(t, r, i),
                 a = Math.min(t, r, i),
                 o, s = (a + n) / 2;
             if (a === n) a = o = 0;
             else {
                 var h = n - a,
                     a = .5 >= s ? h / (n + a) : h / (2 - n - a);
                 switch (n) {
                     case t:
                         o = (r - i) / h + (i > r ? 6 : 0);
                         break;
                     case r:
                         o = (i - t) / h + 2;
                         break;
                     case i:
                         o = (t - r) / h + 4
                 }
                 o /= 6
             }
             return e.h = o, e.s = a, e.l = s, e
         },
         getStyle: function() {
             return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
         },
         offsetHSL: function(e, t, r) {
             var i = this.getHSL();
             return i.h += e, i.s += t, i.l += r, this.setHSL(i.h, i.s, i.l), this
         },
         add: function(e) {
             return this.r += e.r, this.g += e.g, this.b += e.b, this
         },
         addColors: function(e, t) {
             return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this
         },
         addScalar: function(e) {
             return this.r += e, this.g += e, this.b += e, this
         },
         multiply: function(e) {
             return this.r *= e.r, this.g *= e.g, this.b *= e.b, this
         },
         multiplyScalar: function(e) {
             return this.r *= e, this.g *= e, this.b *= e, this
         },
         lerp: function(e, t) {
             return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this
         },
         equals: function(e) {
             return e.r === this.r && e.g === this.g && e.b === this.b
         },
         fromArray: function(e) {
             return this.r = e[0], this.g = e[1], this.b = e[2], this
         },
         toArray: function(e, t) {
             return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e
         },
         clone: function() {
             return (new THREE.Color).setRGB(this.r, this.g, this.b)
         }
     }, THREE.ColorKeywords = {
         aliceblue: 15792383,
         antiquewhite: 16444375,
         aqua: 65535,
         aquamarine: 8388564,
         azure: 15794175,
         beige: 16119260,
         bisque: 16770244,
         black: 0,
         blanchedalmond: 16772045,
         blue: 255,
         blueviolet: 9055202,
         brown: 10824234,
         burlywood: 14596231,
         cadetblue: 6266528,
         chartreuse: 8388352,
         chocolate: 13789470,
         coral: 16744272,
         cornflowerblue: 6591981,
         cornsilk: 16775388,
         crimson: 14423100,
         cyan: 65535,
         darkblue: 139,
         darkcyan: 35723,
         darkgoldenrod: 12092939,
         darkgray: 11119017,
         darkgreen: 25600,
         darkgrey: 11119017,
         darkkhaki: 12433259,
         darkmagenta: 9109643,
         darkolivegreen: 5597999,
         darkorange: 16747520,
         darkorchid: 10040012,
         darkred: 9109504,
         darksalmon: 15308410,
         darkseagreen: 9419919,
         darkslateblue: 4734347,
         darkslategray: 3100495,
         darkslategrey: 3100495,
         darkturquoise: 52945,
         darkviolet: 9699539,
         deeppink: 16716947,
         deepskyblue: 49151,
         dimgray: 6908265,
         dimgrey: 6908265,
         dodgerblue: 2003199,
         firebrick: 11674146,
         floralwhite: 16775920,
         forestgreen: 2263842,
         fuchsia: 16711935,
         gainsboro: 14474460,
         ghostwhite: 16316671,
         gold: 16766720,
         goldenrod: 14329120,
         gray: 8421504,
         green: 32768,
         greenyellow: 11403055,
         grey: 8421504,
         honeydew: 15794160,
         hotpink: 16738740,
         indianred: 13458524,
         indigo: 4915330,
         ivory: 16777200,
         khaki: 15787660,
         lavender: 15132410,
         lavenderblush: 16773365,
         lawngreen: 8190976,
         lemonchiffon: 16775885,
         lightblue: 11393254,
         lightcoral: 15761536,
         lightcyan: 14745599,
         lightgoldenrodyellow: 16448210,
         lightgray: 13882323,
         lightgreen: 9498256,
         lightgrey: 13882323,
         lightpink: 16758465,
         lightsalmon: 16752762,
         lightseagreen: 2142890,
         lightskyblue: 8900346,
         lightslategray: 7833753,
         lightslategrey: 7833753,
         lightsteelblue: 11584734,
         lightyellow: 16777184,
         lime: 65280,
         limegreen: 3329330,
         linen: 16445670,
         magenta: 16711935,
         maroon: 8388608,
         mediumaquamarine: 6737322,
         mediumblue: 205,
         mediumorchid: 12211667,
         mediumpurple: 9662683,
         mediumseagreen: 3978097,
         mediumslateblue: 8087790,
         mediumspringgreen: 64154,
         mediumturquoise: 4772300,
         mediumvioletred: 13047173,
         midnightblue: 1644912,
         mintcream: 16121850,
         mistyrose: 16770273,
         moccasin: 16770229,
         navajowhite: 16768685,
         navy: 128,
         oldlace: 16643558,
         olive: 8421376,
         olivedrab: 7048739,
         orange: 16753920,
         orangered: 16729344,
         orchid: 14315734,
         palegoldenrod: 15657130,
         palegreen: 10025880,
         paleturquoise: 11529966,
         palevioletred: 14381203,
         papayawhip: 16773077,
         peachpuff: 16767673,
         peru: 13468991,
         pink: 16761035,
         plum: 14524637,
         powderblue: 11591910,
         purple: 8388736,
         red: 16711680,
         rosybrown: 12357519,
         royalblue: 4286945,
         saddlebrown: 9127187,
         salmon: 16416882,
         sandybrown: 16032864,
         seagreen: 3050327,
         seashell: 16774638,
         sienna: 10506797,
         silver: 12632256,
         skyblue: 8900331,
         slateblue: 6970061,
         slategray: 7372944,
         slategrey: 7372944,
         snow: 16775930,
         springgreen: 65407,
         steelblue: 4620980,
         tan: 13808780,
         teal: 32896,
         thistle: 14204888,
         tomato: 16737095,
         turquoise: 4251856,
         violet: 15631086,
         wheat: 16113331,
         white: 16777215,
         whitesmoke: 16119285,
         yellow: 16776960,
         yellowgreen: 10145074
     }, THREE.Quaternion = function(e, t, r, i) {
         this._x = e || 0, this._y = t || 0, this._z = r || 0, this._w = void 0 !== i ? i : 1
     }, THREE.Quaternion.prototype = {
         constructor: THREE.Quaternion,
         _x: 0,
         _y: 0,
         _z: 0,
         _w: 0,
         get x() {
             return this._x
         },
         set x(e) {
             this._x = e, this.onChangeCallback()
         },
         get y() {
             return this._y
         },
         set y(e) {
             this._y = e, this.onChangeCallback()
         },
         get z() {
             return this._z
         },
         set z(e) {
             this._z = e, this.onChangeCallback()
         },
         get w() {
             return this._w
         },
         set w(e) {
             this._w = e, this.onChangeCallback()
         },
         set: function(e, t, r, i) {
             return this._x = e, this._y = t, this._z = r, this._w = i, this.onChangeCallback(), this
         },
         copy: function(e) {
             return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this.onChangeCallback(), this
         },
         setFromEuler: function(e, t) {
             if (!1 == e instanceof THREE.Euler) throw Error("THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
             var r = Math.cos(e._x / 2),
                 i = Math.cos(e._y / 2),
                 n = Math.cos(e._z / 2),
                 a = Math.sin(e._x / 2),
                 o = Math.sin(e._y / 2),
                 s = Math.sin(e._z / 2);
             return "XYZ" === e.order ? (this._x = a * i * n + r * o * s, this._y = r * o * n - a * i * s, this._z = r * i * s + a * o * n, this._w = r * i * n - a * o * s) : "YXZ" === e.order ? (this._x = a * i * n + r * o * s, this._y = r * o * n - a * i * s, this._z = r * i * s - a * o * n, this._w = r * i * n + a * o * s) : "ZXY" === e.order ? (this._x = a * i * n - r * o * s, this._y = r * o * n + a * i * s, this._z = r * i * s + a * o * n, this._w = r * i * n - a * o * s) : "ZYX" === e.order ? (this._x = a * i * n - r * o * s, this._y = r * o * n + a * i * s, this._z = r * i * s - a * o * n, this._w = r * i * n + a * o * s) : "YZX" === e.order ? (this._x = a * i * n + r * o * s, this._y = r * o * n + a * i * s, this._z = r * i * s - a * o * n, this._w = r * i * n - a * o * s) : "XZY" === e.order && (this._x = a * i * n - r * o * s, this._y = r * o * n - a * i * s, this._z = r * i * s + a * o * n, this._w = r * i * n + a * o * s), !1 !== t && this.onChangeCallback(), this
         },
         setFromAxisAngle: function(e, t) {
             var r = t / 2,
                 i = Math.sin(r);
             return this._x = e.x * i, this._y = e.y * i, this._z = e.z * i, this._w = Math.cos(r), this.onChangeCallback(), this
         },
         setFromRotationMatrix: function(e) {
             var t = e.elements,
                 r = t[0];
             e = t[4];
             var i = t[8],
                 n = t[1],
                 a = t[5],
                 o = t[9],
                 s = t[2],
                 h = t[6],
                 t = t[10],
                 l = r + a + t;
             return l > 0 ? (r = .5 / Math.sqrt(l + 1), this._w = .25 / r, this._x = (h - o) * r, this._y = (i - s) * r, this._z = (n - e) * r) : r > a && r > t ? (r = 2 * Math.sqrt(1 + r - a - t), this._w = (h - o) / r, this._x = .25 * r, this._y = (e + n) / r, this._z = (i + s) / r) : a > t ? (r = 2 * Math.sqrt(1 + a - r - t), this._w = (i - s) / r, this._x = (e + n) / r, this._y = .25 * r, this._z = (o + h) / r) : (r = 2 * Math.sqrt(1 + t - r - a), this._w = (n - e) / r, this._x = (i + s) / r, this._y = (o + h) / r, this._z = .25 * r), this.onChangeCallback(), this
         },
         setFromUnitVectors: function() {
             var e, t;
             return function(r, i) {
                 return void 0 === e && (e = new THREE.Vector3), t = r.dot(i) + 1, 1e-6 > t ? (t = 0, Math.abs(r.x) > Math.abs(r.z) ? e.set(-r.y, r.x, 0) : e.set(0, -r.z, r.y)) : e.crossVectors(r, i), this._x = e.x, this._y = e.y, this._z = e.z, this._w = t, this.normalize(), this
             }
         }(),
         inverse: function() {
             return this.conjugate().normalize(), this
         },
         conjugate: function() {
             return this._x *= -1, this._y *= -1, this._z *= -1, this.onChangeCallback(), this
         },
         dot: function(e) {
             return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w
         },
         lengthSq: function() {
             return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
         },
         length: function() {
             return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
         },
         normalize: function() {
             var e = this.length();
             return 0 === e ? (this._z = this._y = this._x = 0, this._w = 1) : (e = 1 / e, this._x *= e, this._y *= e, this._z *= e, this._w *= e), this.onChangeCallback(), this
         },
         multiply: function(e, t) {
             return void 0 !== t ? (THREE.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(e, t)) : this.multiplyQuaternions(this, e)
         },
         multiplyQuaternions: function(e, t) {
             var r = e._x,
                 i = e._y,
                 n = e._z,
                 a = e._w,
                 o = t._x,
                 s = t._y,
                 h = t._z,
                 l = t._w;
             return this._x = r * l + a * o + i * h - n * s, this._y = i * l + a * s + n * o - r * h, this._z = n * l + a * h + r * s - i * o, this._w = a * l - r * o - i * s - n * h, this.onChangeCallback(), this
         },
         multiplyVector3: function(e) {
             return THREE.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), e.applyQuaternion(this)
         },
         slerp: function(e, t) {
             if (0 === t) return this;
             if (1 === t) return this.copy(e);
             var r = this._x,
                 i = this._y,
                 n = this._z,
                 a = this._w,
                 o = a * e._w + r * e._x + i * e._y + n * e._z;
             if (0 > o ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, o = -o) : this.copy(e), o >= 1) return this._w = a, this._x = r, this._y = i, this._z = n, this;
             var s = Math.acos(o),
                 h = Math.sqrt(1 - o * o);
             return .001 > Math.abs(h) ? (this._w = .5 * (a + this._w), this._x = .5 * (r + this._x), this._y = .5 * (i + this._y), this._z = .5 * (n + this._z), this) : (o = Math.sin((1 - t) * s) / h, s = Math.sin(t * s) / h, this._w = a * o + this._w * s, this._x = r * o + this._x * s, this._y = i * o + this._y * s, this._z = n * o + this._z * s, this.onChangeCallback(), this)
         },
         equals: function(e) {
             return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
         },
         fromArray: function(e, t) {
             return void 0 === t && (t = 0), this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this.onChangeCallback(), this
         },
         toArray: function(e, t) {
             return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e
         },
         onChange: function(e) {
             return this.onChangeCallback = e, this
         },
         onChangeCallback: function() {},
         clone: function() {
             return new THREE.Quaternion(this._x, this._y, this._z, this._w)
         }
     }, THREE.Quaternion.slerp = function(e, t, r, i) {
         return r.copy(e).slerp(t, i)
     }, THREE.Vector2 = function(e, t) {
         this.x = e || 0, this.y = t || 0
     }, THREE.Vector2.prototype = {
         constructor: THREE.Vector2,
         set: function(e, t) {
             return this.x = e, this.y = t, this
         },
         setX: function(e) {
             return this.x = e, this
         },
         setY: function(e) {
             return this.y = e, this
         },
         setComponent: function(e, t) {
             switch (e) {
                 case 0:
                     this.x = t;
                     break;
                 case 1:
                     this.y = t;
                     break;
                 default:
                     throw Error("index is out of range: " + e)
             }
         },
         getComponent: function(e) {
             switch (e) {
                 case 0:
                     return this.x;
                 case 1:
                     return this.y;
                 default:
                     throw Error("index is out of range: " + e)
             }
         },
         copy: function(e) {
             return this.x = e.x, this.y = e.y, this
         },
         add: function(e, t) {
             return void 0 !== t ? (THREE.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this)
         },
         addScalar: function(e) {
             return this.x += e, this.y += e, this
         },
         addVectors: function(e, t) {
             return this.x = e.x + t.x, this.y = e.y + t.y, this
         },
         sub: function(e, t) {
             return void 0 !== t ? (THREE.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this)
         },
         subScalar: function(e) {
             return this.x -= e, this.y -= e, this
         },
         subVectors: function(e, t) {
             return this.x = e.x - t.x, this.y = e.y - t.y, this
         },
         multiply: function(e) {
             return this.x *= e.x, this.y *= e.y, this
         },
         multiplyScalar: function(e) {
             return this.x *= e, this.y *= e, this
         },
         divide: function(e) {
             return this.x /= e.x, this.y /= e.y, this
         },
         divideScalar: function(e) {
             return 0 !== e ? (e = 1 / e, this.x *= e, this.y *= e) : this.y = this.x = 0, this
         },
         min: function(e) {
             return this.x > e.x && (this.x = e.x), this.y > e.y && (this.y = e.y), this
         },
         max: function(e) {
             return this.x < e.x && (this.x = e.x), this.y < e.y && (this.y = e.y), this
         },
         clamp: function(e, t) {
             return this.x < e.x ? this.x = e.x : this.x > t.x && (this.x = t.x), this.y < e.y ? this.y = e.y : this.y > t.y && (this.y = t.y), this
         },
         clampScalar: function() {
             var e, t;
             return function(r, i) {
                 return void 0 === e && (e = new THREE.Vector2, t = new THREE.Vector2), e.set(r, r), t.set(i, i), this.clamp(e, t)
             }
         }(),
         floor: function() {
             return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
         },
         ceil: function() {
             return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
         },
         round: function() {
             return this.x = Math.round(this.x), this.y = Math.round(this.y), this
         },
         roundToZero: function() {
             return this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x), this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y), this
         },
         negate: function() {
             return this.x = -this.x, this.y = -this.y, this
         },
         dot: function(e) {
             return this.x * e.x + this.y * e.y
         },
         lengthSq: function() {
             return this.x * this.x + this.y * this.y
         },
         length: function() {
             return Math.sqrt(this.x * this.x + this.y * this.y)
         },
         normalize: function() {
             return this.divideScalar(this.length())
         },
         distanceTo: function(e) {
             return Math.sqrt(this.distanceToSquared(e))
         },
         distanceToSquared: function(e) {
             var t = this.x - e.x;
             return e = this.y - e.y, t * t + e * e
         },
         setLength: function(e) {
             var t = this.length();
             return 0 !== t && e !== t && this.multiplyScalar(e / t), this
         },
         lerp: function(e, t) {
             return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this
         },
         lerpVectors: function(e, t, r) {
             return this.subVectors(t, e).multiplyScalar(r).add(e), this
         },
         equals: function(e) {
             return e.x === this.x && e.y === this.y
         },
         fromArray: function(e, t) {
             return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this
         },
         toArray: function(e, t) {
             return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e
         },
         fromAttribute: function(e, t, r) {
             return void 0 === r && (r = 0), t = t * e.itemSize + r, this.x = e.array[t], this.y = e.array[t + 1], this
         },
         clone: function() {
             return new THREE.Vector2(this.x, this.y)
         }
     }, THREE.Vector3 = function(e, t, r) {
         this.x = e || 0, this.y = t || 0, this.z = r || 0
     }, THREE.Vector3.prototype = {
         constructor: THREE.Vector3,
         set: function(e, t, r) {
             return this.x = e, this.y = t, this.z = r, this
         },
         setX: function(e) {
             return this.x = e, this
         },
         setY: function(e) {
             return this.y = e, this
         },
         setZ: function(e) {
             return this.z = e, this
         },
         setComponent: function(e, t) {
             switch (e) {
                 case 0:
                     this.x = t;
                     break;
                 case 1:
                     this.y = t;
                     break;
                 case 2:
                     this.z = t;
                     break;
                 default:
                     throw Error("index is out of range: " + e)
             }
         },
         getComponent: function(e) {
             switch (e) {
                 case 0:
                     return this.x;
                 case 1:
                     return this.y;
                 case 2:
                     return this.z;
                 default:
                     throw Error("index is out of range: " + e)
             }
         },
         copy: function(e) {
             return this.x = e.x, this.y = e.y, this.z = e.z, this
         },
         add: function(e, t) {
             return void 0 !== t ? (THREE.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this)
         },
         addScalar: function(e) {
             return this.x += e, this.y += e, this.z += e, this
         },
         addVectors: function(e, t) {
             return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this
         },
         sub: function(e, t) {
             return void 0 !== t ? (THREE.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this)
         },
         subScalar: function(e) {
             return this.x -= e, this.y -= e, this.z -= e, this
         },
         subVectors: function(e, t) {
             return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this
         },
         multiply: function(e, t) {
             return void 0 !== t ? (THREE.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(e, t)) : (this.x *= e.x, this.y *= e.y, this.z *= e.z, this)
         },
         multiplyScalar: function(e) {
             return this.x *= e, this.y *= e, this.z *= e, this
         },
         multiplyVectors: function(e, t) {
             return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this
         },
         applyEuler: function() {
             var e;
             return function(t) {
                 return !1 == t instanceof THREE.Euler && THREE.error("THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order."), void 0 === e && (e = new THREE.Quaternion), this.applyQuaternion(e.setFromEuler(t)), this
             }
         }(),
         applyAxisAngle: function() {
             var e;
             return function(t, r) {
                 return void 0 === e && (e = new THREE.Quaternion), this.applyQuaternion(e.setFromAxisAngle(t, r)), this
             }
         }(),
         applyMatrix3: function(e) {
             var t = this.x,
                 r = this.y,
                 i = this.z;
             return e = e.elements, this.x = e[0] * t + e[3] * r + e[6] * i, this.y = e[1] * t + e[4] * r + e[7] * i, this.z = e[2] * t + e[5] * r + e[8] * i, this
         },
         applyMatrix4: function(e) {
             var t = this.x,
                 r = this.y,
                 i = this.z;
             return e = e.elements, this.x = e[0] * t + e[4] * r + e[8] * i + e[12], this.y = e[1] * t + e[5] * r + e[9] * i + e[13], this.z = e[2] * t + e[6] * r + e[10] * i + e[14], this
         },
         applyProjection: function(e) {
             var t = this.x,
                 r = this.y,
                 i = this.z;
             e = e.elements;
             var n = 1 / (e[3] * t + e[7] * r + e[11] * i + e[15]);
             return this.x = (e[0] * t + e[4] * r + e[8] * i + e[12]) * n, this.y = (e[1] * t + e[5] * r + e[9] * i + e[13]) * n, this.z = (e[2] * t + e[6] * r + e[10] * i + e[14]) * n, this
         },
         applyQuaternion: function(e) {
             var t = this.x,
                 r = this.y,
                 i = this.z,
                 n = e.x,
                 a = e.y,
                 o = e.z;
             e = e.w;
             var s = e * t + a * i - o * r,
                 h = e * r + o * t - n * i,
                 l = e * i + n * r - a * t,
                 t = -n * t - a * r - o * i;
             return this.x = s * e + t * -n + h * -o - l * -a, this.y = h * e + t * -a + l * -n - s * -o, this.z = l * e + t * -o + s * -a - h * -n, this
         },
         project: function() {
             var e;
             return function(t) {
                 return void 0 === e && (e = new THREE.Matrix4), e.multiplyMatrices(t.projectionMatrix, e.getInverse(t.matrixWorld)), this.applyProjection(e)
             }
         }(),
         unproject: function() {
             var e;
             return function(t) {
                 return void 0 === e && (e = new THREE.Matrix4), e.multiplyMatrices(t.matrixWorld, e.getInverse(t.projectionMatrix)), this.applyProjection(e)
             }
         }(),
         transformDirection: function(e) {
             var t = this.x,
                 r = this.y,
                 i = this.z;
             return e = e.elements, this.x = e[0] * t + e[4] * r + e[8] * i, this.y = e[1] * t + e[5] * r + e[9] * i, this.z = e[2] * t + e[6] * r + e[10] * i, this.normalize(), this
         },
         divide: function(e) {
             return this.x /= e.x, this.y /= e.y, this.z /= e.z, this
         },
         divideScalar: function(e) {
             return 0 !== e ? (e = 1 / e, this.x *= e, this.y *= e, this.z *= e) : this.z = this.y = this.x = 0, this
         },
         min: function(e) {
             return this.x > e.x && (this.x = e.x), this.y > e.y && (this.y = e.y), this.z > e.z && (this.z = e.z), this
         },
         max: function(e) {
             return this.x < e.x && (this.x = e.x), this.y < e.y && (this.y = e.y), this.z < e.z && (this.z = e.z), this
         },
         clamp: function(e, t) {
             return this.x < e.x ? this.x = e.x : this.x > t.x && (this.x = t.x), this.y < e.y ? this.y = e.y : this.y > t.y && (this.y = t.y), this.z < e.z ? this.z = e.z : this.z > t.z && (this.z = t.z), this
         },
         clampScalar: function() {
             var e, t;
             return function(r, i) {
                 return void 0 === e && (e = new THREE.Vector3, t = new THREE.Vector3), e.set(r, r, r), t.set(i, i, i), this.clamp(e, t)
             }
         }(),
         floor: function() {
             return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
         },
         ceil: function() {
             return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
         },
         round: function() {
             return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
         },
         roundToZero: function() {
             return this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x), this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y), this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z), this
         },
         negate: function() {
             return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
         },
         dot: function(e) {
             return this.x * e.x + this.y * e.y + this.z * e.z
         },
         lengthSq: function() {
             return this.x * this.x + this.y * this.y + this.z * this.z
         },
         length: function() {
             return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
         },
         lengthManhattan: function() {
             return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
         },
         normalize: function() {
             return this.divideScalar(this.length())
         },
         setLength: function(e) {
             var t = this.length();
             return 0 !== t && e !== t && this.multiplyScalar(e / t), this
         },
         lerp: function(e, t) {
             return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this
         },
         lerpVectors: function(e, t, r) {
             return this.subVectors(t, e).multiplyScalar(r).add(e), this
         },
         cross: function(e, t) {
             if (void 0 !== t) return THREE.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(e, t);
             var r = this.x,
                 i = this.y,
                 n = this.z;
             return this.x = i * e.z - n * e.y, this.y = n * e.x - r * e.z, this.z = r * e.y - i * e.x, this
         },
         crossVectors: function(e, t) {
             var r = e.x,
                 i = e.y,
                 n = e.z,
                 a = t.x,
                 o = t.y,
                 s = t.z;
             return this.x = i * s - n * o, this.y = n * a - r * s, this.z = r * o - i * a, this
         },
         projectOnVector: function() {
             var e, t;
             return function(r) {
                 return void 0 === e && (e = new THREE.Vector3), e.copy(r).normalize(), t = this.dot(e), this.copy(e).multiplyScalar(t)
             }
         }(),
         projectOnPlane: function() {
             var e;
             return function(t) {
                 return void 0 === e && (e = new THREE.Vector3), e.copy(this).projectOnVector(t), this.sub(e)
             }
         }(),
         reflect: function() {
             var e;
             return function(t) {
                 return void 0 === e && (e = new THREE.Vector3), this.sub(e.copy(t).multiplyScalar(2 * this.dot(t)))
             }
         }(),
         angleTo: function(e) {
             return e = this.dot(e) / (this.length() * e.length()), Math.acos(THREE.Math.clamp(e, -1, 1))
         },
         distanceTo: function(e) {
             return Math.sqrt(this.distanceToSquared(e))
         },
         distanceToSquared: function(e) {
             var t = this.x - e.x,
                 r = this.y - e.y;
             return e = this.z - e.z, t * t + r * r + e * e
         },
         setEulerFromRotationMatrix: function(e, t) {
             THREE.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
         },
         setEulerFromQuaternion: function(e, t) {
             THREE.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
         },
         getPositionFromMatrix: function(e) {
             return THREE.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."), this.setFromMatrixPosition(e)
         },
         getScaleFromMatrix: function(e) {
             return THREE.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."), this.setFromMatrixScale(e)
         },
         getColumnFromMatrix: function(e, t) {
             return THREE.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."), this.setFromMatrixColumn(e, t)
         },
         setFromMatrixPosition: function(e) {
             return this.x = e.elements[12], this.y = e.elements[13], this.z = e.elements[14], this
         },
         setFromMatrixScale: function(e) {
             var t = this.set(e.elements[0], e.elements[1], e.elements[2]).length(),
                 r = this.set(e.elements[4], e.elements[5], e.elements[6]).length();
             return e = this.set(e.elements[8], e.elements[9], e.elements[10]).length(), this.x = t, this.y = r, this.z = e, this
         },
         setFromMatrixColumn: function(e, t) {
             var r = 4 * e,
                 i = t.elements;
             return this.x = i[r], this.y = i[r + 1], this.z = i[r + 2], this
         },
         equals: function(e) {
             return e.x === this.x && e.y === this.y && e.z === this.z
         },
         fromArray: function(e, t) {
             return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this
         },
         toArray: function(e, t) {
             return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e
         },
         fromAttribute: function(e, t, r) {
             return void 0 === r && (r = 0), t = t * e.itemSize + r, this.x = e.array[t], this.y = e.array[t + 1], this.z = e.array[t + 2], this
         },
         clone: function() {
             return new THREE.Vector3(this.x, this.y, this.z)
         }
     }, THREE.Vector4 = function(e, t, r, i) {
         this.x = e || 0, this.y = t || 0, this.z = r || 0, this.w = void 0 !== i ? i : 1
     }, THREE.Vector4.prototype = {
         constructor: THREE.Vector4,
         set: function(e, t, r, i) {
             return this.x = e, this.y = t, this.z = r, this.w = i, this
         },
         setX: function(e) {
             return this.x = e, this
         },
         setY: function(e) {
             return this.y = e, this
         },
         setZ: function(e) {
             return this.z = e, this
         },
         setW: function(e) {
             return this.w = e, this
         },
         setComponent: function(e, t) {
             switch (e) {
                 case 0:
                     this.x = t;
                     break;
                 case 1:
                     this.y = t;
                     break;
                 case 2:
                     this.z = t;
                     break;
                 case 3:
                     this.w = t;
                     break;
                 default:
                     throw Error("index is out of range: " + e)
             }
         },
         getComponent: function(e) {
             switch (e) {
                 case 0:
                     return this.x;
                 case 1:
                     return this.y;
                 case 2:
                     return this.z;
                 case 3:
                     return this.w;
                 default:
                     throw Error("index is out of range: " + e)
             }
         },
         copy: function(e) {
             return this.x = e.x, this.y = e.y, this.z = e.z, this.w = void 0 !== e.w ? e.w : 1, this
         },
         add: function(e, t) {
             return void 0 !== t ? (THREE.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this)
         },
         addScalar: function(e) {
             return this.x += e, this.y += e, this.z += e, this.w += e, this
         },
         addVectors: function(e, t) {
             return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this
         },
         sub: function(e, t) {
             return void 0 !== t ? (THREE.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this)
         },
         subScalar: function(e) {
             return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this
         },
         subVectors: function(e, t) {
             return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this
         },
         multiplyScalar: function(e) {
             return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this
         },
         applyMatrix4: function(e) {
             var t = this.x,
                 r = this.y,
                 i = this.z,
                 n = this.w;
             return e = e.elements, this.x = e[0] * t + e[4] * r + e[8] * i + e[12] * n, this.y = e[1] * t + e[5] * r + e[9] * i + e[13] * n, this.z = e[2] * t + e[6] * r + e[10] * i + e[14] * n, this.w = e[3] * t + e[7] * r + e[11] * i + e[15] * n, this
         },
         divideScalar: function(e) {
             return 0 !== e ? (e = 1 / e, this.x *= e, this.y *= e, this.z *= e, this.w *= e) : (this.z = this.y = this.x = 0, this.w = 1), this
         },
         setAxisAngleFromQuaternion: function(e) {
             this.w = 2 * Math.acos(e.w);
             var t = Math.sqrt(1 - e.w * e.w);
             return 1e-4 > t ? (this.x = 1, this.z = this.y = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this
         },
         setAxisAngleFromRotationMatrix: function(e) {
             var t, r, i;
             e = e.elements;
             var n = e[0];
             i = e[4];
             var a = e[8],
                 o = e[1],
                 s = e[5],
                 h = e[9];
             r = e[2], t = e[6];
             var l = e[10];
             return .01 > Math.abs(i - o) && .01 > Math.abs(a - r) && .01 > Math.abs(h - t) ? .1 > Math.abs(i + o) && .1 > Math.abs(a + r) && .1 > Math.abs(h + t) && .1 > Math.abs(n + s + l - 3) ? (this.set(1, 0, 0, 0), this) : (e = Math.PI, n = (n + 1) / 2, s = (s + 1) / 2, l = (l + 1) / 2, i = (i + o) / 4, a = (a + r) / 4, h = (h + t) / 4, n > s && n > l ? .01 > n ? (t = 0, i = r = .707106781) : (t = Math.sqrt(n), r = i / t, i = a / t) : s > l ? .01 > s ? (t = .707106781, r = 0, i = .707106781) : (r = Math.sqrt(s), t = i / r, i = h / r) : .01 > l ? (r = t = .707106781, i = 0) : (i = Math.sqrt(l), t = a / i, r = h / i), this.set(t, r, i, e), this) : (e = Math.sqrt((t - h) * (t - h) + (a - r) * (a - r) + (o - i) * (o - i)), .001 > Math.abs(e) && (e = 1), this.x = (t - h) / e, this.y = (a - r) / e, this.z = (o - i) / e, this.w = Math.acos((n + s + l - 1) / 2), this)
         },
         min: function(e) {
             return this.x > e.x && (this.x = e.x), this.y > e.y && (this.y = e.y), this.z > e.z && (this.z = e.z), this.w > e.w && (this.w = e.w), this
         },
         max: function(e) {
             return this.x < e.x && (this.x = e.x), this.y < e.y && (this.y = e.y), this.z < e.z && (this.z = e.z), this.w < e.w && (this.w = e.w), this
         },
         clamp: function(e, t) {
             return this.x < e.x ? this.x = e.x : this.x > t.x && (this.x = t.x), this.y < e.y ? this.y = e.y : this.y > t.y && (this.y = t.y), this.z < e.z ? this.z = e.z : this.z > t.z && (this.z = t.z), this.w < e.w ? this.w = e.w : this.w > t.w && (this.w = t.w), this
         },
         clampScalar: function() {
             var e, t;
             return function(r, i) {
                 return void 0 === e && (e = new THREE.Vector4, t = new THREE.Vector4), e.set(r, r, r, r), t.set(i, i, i, i), this.clamp(e, t)
             }
         }(),
         floor: function() {
             return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
         },
         ceil: function() {
             return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
         },
         round: function() {
             return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
         },
         roundToZero: function() {
             return this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x), this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y), this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z), this.w = 0 > this.w ? Math.ceil(this.w) : Math.floor(this.w), this
         },
         negate: function() {
             return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
         },
         dot: function(e) {
             return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w
         },
         lengthSq: function() {
             return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
         },
         length: function() {
             return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
         },
         lengthManhattan: function() {
             return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
         },
         normalize: function() {
             return this.divideScalar(this.length())
         },
         setLength: function(e) {
             var t = this.length();
             return 0 !== t && e !== t && this.multiplyScalar(e / t), this
         },
         lerp: function(e, t) {
             return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this
         },
         lerpVectors: function(e, t, r) {
             return this.subVectors(t, e).multiplyScalar(r).add(e), this
         },
         equals: function(e) {
             return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
         },
         fromArray: function(e, t) {
             return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this
         },
         toArray: function(e, t) {
             return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e
         },
         fromAttribute: function(e, t, r) {
             return void 0 === r && (r = 0), t = t * e.itemSize + r, this.x = e.array[t], this.y = e.array[t + 1], this.z = e.array[t + 2], this.w = e.array[t + 3], this
         },
         clone: function() {
             return new THREE.Vector4(this.x, this.y, this.z, this.w)
         }
     }, THREE.Euler = function(e, t, r, i) {
         this._x = e || 0, this._y = t || 0, this._z = r || 0, this._order = i || THREE.Euler.DefaultOrder
     }, THREE.Euler.RotationOrders = "XYZ YZX ZXY XZY YXZ ZYX".split(" "), THREE.Euler.DefaultOrder = "XYZ", THREE.Euler.prototype = {
         constructor: THREE.Euler,
         _x: 0,
         _y: 0,
         _z: 0,
         _order: THREE.Euler.DefaultOrder,
         get x() {
             return this._x
         },
         set x(e) {
             this._x = e, this.onChangeCallback()
         },
         get y() {
             return this._y
         },
         set y(e) {
             this._y = e, this.onChangeCallback()
         },
         get z() {
             return this._z
         },
         set z(e) {
             this._z = e, this.onChangeCallback()
         },
         get order() {
             return this._order
         },
         set order(e) {
             this._order = e, this.onChangeCallback()
         },
         set: function(e, t, r, i) {
             return this._x = e, this._y = t, this._z = r, this._order = i || this._order, this.onChangeCallback(), this
         },
         copy: function(e) {
             return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this.onChangeCallback(), this
         },
         setFromRotationMatrix: function(e, t, r) {
             var i = THREE.Math.clamp,
                 n = e.elements;
             e = n[0];
             var a = n[4],
                 o = n[8],
                 s = n[1],
                 h = n[5],
                 l = n[9],
                 u = n[2],
                 c = n[6],
                 n = n[10];
             return t = t || this._order, "XYZ" === t ? (this._y = Math.asin(i(o, -1, 1)), .99999 > Math.abs(o) ? (this._x = Math.atan2(-l, n), this._z = Math.atan2(-a, e)) : (this._x = Math.atan2(c, h), this._z = 0)) : "YXZ" === t ? (this._x = Math.asin(-i(l, -1, 1)), .99999 > Math.abs(l) ? (this._y = Math.atan2(o, n), this._z = Math.atan2(s, h)) : (this._y = Math.atan2(-u, e), this._z = 0)) : "ZXY" === t ? (this._x = Math.asin(i(c, -1, 1)), .99999 > Math.abs(c) ? (this._y = Math.atan2(-u, n), this._z = Math.atan2(-a, h)) : (this._y = 0, this._z = Math.atan2(s, e))) : "ZYX" === t ? (this._y = Math.asin(-i(u, -1, 1)), .99999 > Math.abs(u) ? (this._x = Math.atan2(c, n), this._z = Math.atan2(s, e)) : (this._x = 0, this._z = Math.atan2(-a, h))) : "YZX" === t ? (this._z = Math.asin(i(s, -1, 1)), .99999 > Math.abs(s) ? (this._x = Math.atan2(-l, h), this._y = Math.atan2(-u, e)) : (this._x = 0, this._y = Math.atan2(o, n))) : "XZY" === t ? (this._z = Math.asin(-i(a, -1, 1)), .99999 > Math.abs(a) ? (this._x = Math.atan2(c, h), this._y = Math.atan2(o, e)) : (this._x = Math.atan2(-l, n), this._y = 0)) : THREE.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + t), this._order = t, !1 !== r && this.onChangeCallback(), this
         },
         setFromQuaternion: function() {
             var e;
             return function(t, r, i) {
                 return void 0 === e && (e = new THREE.Matrix4), e.makeRotationFromQuaternion(t), this.setFromRotationMatrix(e, r, i), this
             }
         }(),
         setFromVector3: function(e, t) {
             return this.set(e.x, e.y, e.z, t || this._order)
         },
         reorder: function() {
             var e = new THREE.Quaternion;
             return function(t) {
                 e.setFromEuler(this), this.setFromQuaternion(e, t)
             }
         }(),
         equals: function(e) {
             return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order
         },
         fromArray: function(e) {
             return this._x = e[0], this._y = e[1], this._z = e[2], void 0 !== e[3] && (this._order = e[3]), this.onChangeCallback(), this
         },
         toArray: function(e, t) {
             return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e
         },
         toVector3: function(e) {
             return e ? e.set(this._x, this._y, this._z) : new THREE.Vector3(this._x, this._y, this._z)
         },
         onChange: function(e) {
             return this.onChangeCallback = e, this
         },
         onChangeCallback: function() {},
         clone: function() {
             return new THREE.Euler(this._x, this._y, this._z, this._order)
         }
     }, THREE.Line3 = function(e, t) {
         this.start = void 0 !== e ? e : new THREE.Vector3, this.end = void 0 !== t ? t : new THREE.Vector3
     }, THREE.Line3.prototype = {
         constructor: THREE.Line3,
         set: function(e, t) {
             return this.start.copy(e), this.end.copy(t), this
         },
         copy: function(e) {
             return this.start.copy(e.start), this.end.copy(e.end), this
         },
         center: function(e) {
             return (e || new THREE.Vector3).addVectors(this.start, this.end).multiplyScalar(.5)
         },
         delta: function(e) {
             return (e || new THREE.Vector3).subVectors(this.end, this.start)
         },
         distanceSq: function() {
             return this.start.distanceToSquared(this.end)
         },
         distance: function() {
             return this.start.distanceTo(this.end)
         },
         at: function(e, t) {
             var r = t || new THREE.Vector3;
             return this.delta(r).multiplyScalar(e).add(this.start)
         },
         closestPointToPointParameter: function() {
             var e = new THREE.Vector3,
                 t = new THREE.Vector3;
             return function(r, i) {
                 e.subVectors(r, this.start), t.subVectors(this.end, this.start);
                 var n = t.dot(t),
                     n = t.dot(e) / n;
                 return i && (n = THREE.Math.clamp(n, 0, 1)), n
             }
         }(),
         closestPointToPoint: function(e, t, r) {
             return e = this.closestPointToPointParameter(e, t), r = r || new THREE.Vector3, this.delta(r).multiplyScalar(e).add(this.start)
         },
         applyMatrix4: function(e) {
             return this.start.applyMatrix4(e), this.end.applyMatrix4(e), this
         },
         equals: function(e) {
             return e.start.equals(this.start) && e.end.equals(this.end)
         },
         clone: function() {
             return (new THREE.Line3).copy(this)
         }
     }, THREE.Box2 = function(e, t) {
         this.min = void 0 !== e ? e : new THREE.Vector2(1 / 0, 1 / 0), this.max = void 0 !== t ? t : new THREE.Vector2(-(1 / 0), -(1 / 0))
     }, THREE.Box2.prototype = {
         constructor: THREE.Box2,
         set: function(e, t) {
             return this.min.copy(e), this.max.copy(t), this
         },
         setFromPoints: function(e) {
             this.makeEmpty();
             for (var t = 0, r = e.length; r > t; t++) this.expandByPoint(e[t]);
             return this
         },
         setFromCenterAndSize: function() {
             var e = new THREE.Vector2;
             return function(t, r) {
                 var i = e.copy(r).multiplyScalar(.5);
                 return this.min.copy(t).sub(i), this.max.copy(t).add(i), this
             }
         }(),
         copy: function(e) {
             return this.min.copy(e.min), this.max.copy(e.max), this
         },
         makeEmpty: function() {
             return this.min.x = this.min.y = 1 / 0, this.max.x = this.max.y = -(1 / 0), this
         },
         empty: function() {
             return this.max.x < this.min.x || this.max.y < this.min.y
         },
         center: function(e) {
             return (e || new THREE.Vector2).addVectors(this.min, this.max).multiplyScalar(.5)
         },
         size: function(e) {
             return (e || new THREE.Vector2).subVectors(this.max, this.min)
         },
         expandByPoint: function(e) {
             return this.min.min(e), this.max.max(e), this
         },
         expandByVector: function(e) {
             return this.min.sub(e), this.max.add(e), this
         },
         expandByScalar: function(e) {
             return this.min.addScalar(-e), this.max.addScalar(e), this
         },
         containsPoint: function(e) {
             return e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y ? !1 : !0
         },
         containsBox: function(e) {
             return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y ? !0 : !1
         },
         getParameter: function(e, t) {
             return (t || new THREE.Vector2).set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y))
         },
         isIntersectionBox: function(e) {
             return e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y ? !1 : !0
         },
         clampPoint: function(e, t) {
             return (t || new THREE.Vector2).copy(e).clamp(this.min, this.max)
         },
         distanceToPoint: function() {
             var e = new THREE.Vector2;
             return function(t) {
                 return e.copy(t).clamp(this.min, this.max).sub(t).length()
             }
         }(),
         intersect: function(e) {
             return this.min.max(e.min), this.max.min(e.max), this
         },
         union: function(e) {
             return this.min.min(e.min), this.max.max(e.max), this
         },
         translate: function(e) {
             return this.min.add(e), this.max.add(e), this
         },
         equals: function(e) {
             return e.min.equals(this.min) && e.max.equals(this.max)
         },
         clone: function() {
             return (new THREE.Box2).copy(this)
         }
     }, THREE.Box3 = function(e, t) {
         this.min = void 0 !== e ? e : new THREE.Vector3(1 / 0, 1 / 0, 1 / 0), this.max = void 0 !== t ? t : new THREE.Vector3(-(1 / 0), -(1 / 0), -(1 / 0))
     }, THREE.Box3.prototype = {
         constructor: THREE.Box3,
         set: function(e, t) {
             return this.min.copy(e), this.max.copy(t), this
         },
         setFromPoints: function(e) {
             this.makeEmpty();
             for (var t = 0, r = e.length; r > t; t++) this.expandByPoint(e[t]);
             return this
         },
         setFromCenterAndSize: function() {
             var e = new THREE.Vector3;
             return function(t, r) {
                 var i = e.copy(r).multiplyScalar(.5);
                 return this.min.copy(t).sub(i), this.max.copy(t).add(i), this
             }
         }(),
         setFromObject: function() {
             var e = new THREE.Vector3;
             return function(t) {
                 var r = this;
                 return t.updateMatrixWorld(!0), this.makeEmpty(), t.traverse(function(t) {
                     var i = t.geometry;
                     if (void 0 !== i)
                         if (i instanceof THREE.Geometry)
                             for (var n = i.vertices, i = 0, a = n.length; a > i; i++) e.copy(n[i]), e.applyMatrix4(t.matrixWorld), r.expandByPoint(e);
                         else if (i instanceof THREE.BufferGeometry && void 0 !== i.attributes.position)
                         for (n = i.attributes.position.array, i = 0, a = n.length; a > i; i += 3) e.set(n[i], n[i + 1], n[i + 2]), e.applyMatrix4(t.matrixWorld), r.expandByPoint(e)
                 }), this
             }
         }(),
         copy: function(e) {
             return this.min.copy(e.min), this.max.copy(e.max), this
         },
         makeEmpty: function() {
             return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -(1 / 0), this
         },
         empty: function() {
             return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
         },
         center: function(e) {
             return (e || new THREE.Vector3).addVectors(this.min, this.max).multiplyScalar(.5)
         },
         size: function(e) {
             return (e || new THREE.Vector3).subVectors(this.max, this.min)
         },
         expandByPoint: function(e) {
             return this.min.min(e), this.max.max(e), this
         },
         expandByVector: function(e) {
             return this.min.sub(e), this.max.add(e), this
         },
         expandByScalar: function(e) {
             return this.min.addScalar(-e), this.max.addScalar(e), this
         },
         containsPoint: function(e) {
             return e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z ? !1 : !0
         },
         containsBox: function(e) {
             return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z ? !0 : !1
         },
         getParameter: function(e, t) {
             return (t || new THREE.Vector3).set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z))
         },
         isIntersectionBox: function(e) {
             return e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z ? !1 : !0
         },
         clampPoint: function(e, t) {
             return (t || new THREE.Vector3).copy(e).clamp(this.min, this.max)
         },
         distanceToPoint: function() {
             var e = new THREE.Vector3;
             return function(t) {
                 return e.copy(t).clamp(this.min, this.max).sub(t).length()
             }
         }(),
         getBoundingSphere: function() {
             var e = new THREE.Vector3;
             return function(t) {
                 return t = t || new THREE.Sphere, t.center = this.center(), t.radius = .5 * this.size(e).length(), t
             }
         }(),
         intersect: function(e) {
             return this.min.max(e.min), this.max.min(e.max), this
         },
         union: function(e) {
             return this.min.min(e.min), this.max.max(e.max), this
         },
         applyMatrix4: function() {
             var e = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
             return function(t) {
                 return e[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), e[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), e[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), e[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), e[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), e[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), e[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), e[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.makeEmpty(), this.setFromPoints(e), this
             }
         }(),
         translate: function(e) {
             return this.min.add(e), this.max.add(e), this
         },
         equals: function(e) {
             return e.min.equals(this.min) && e.max.equals(this.max)
         },
         clone: function() {
             return (new THREE.Box3).copy(this)
         }
     }, THREE.Matrix3 = function() {
         this.elements = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]), 0 < arguments.length && THREE.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
     }, THREE.Matrix3.prototype = {
         constructor: THREE.Matrix3,
         set: function(e, t, r, i, n, a, o, s, h) {
             var l = this.elements;
             return l[0] = e, l[3] = t, l[6] = r, l[1] = i, l[4] = n, l[7] = a, l[2] = o, l[5] = s, l[8] = h, this
         },
         identity: function() {
             return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
         },
         copy: function(e) {
             return e = e.elements, this.set(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]), this
         },
         multiplyVector3: function(e) {
             return THREE.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), e.applyMatrix3(this)
         },
         multiplyVector3Array: function(e) {
             return THREE.warn("THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(e)
         },
         applyToVector3Array: function() {
             var e = new THREE.Vector3;
             return function(t, r, i) {
                 void 0 === r && (r = 0), void 0 === i && (i = t.length);
                 for (var n = 0; i > n; n += 3, r += 3) e.x = t[r], e.y = t[r + 1], e.z = t[r + 2], e.applyMatrix3(this), t[r] = e.x, t[r + 1] = e.y, t[r + 2] = e.z;
                 return t
             }
         }(),
         multiplyScalar: function(e) {
             var t = this.elements;
             return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this
         },
         determinant: function() {
             var e = this.elements,
                 t = e[0],
                 r = e[1],
                 i = e[2],
                 n = e[3],
                 a = e[4],
                 o = e[5],
                 s = e[6],
                 h = e[7],
                 e = e[8];
             return t * a * e - t * o * h - r * n * e + r * o * s + i * n * h - i * a * s
         },
         getInverse: function(e, t) {
             var r = e.elements,
                 i = this.elements;
             if (i[0] = r[10] * r[5] - r[6] * r[9], i[1] = -r[10] * r[1] + r[2] * r[9], i[2] = r[6] * r[1] - r[2] * r[5], i[3] = -r[10] * r[4] + r[6] * r[8], i[4] = r[10] * r[0] - r[2] * r[8], i[5] = -r[6] * r[0] + r[2] * r[4], i[6] = r[9] * r[4] - r[5] * r[8], i[7] = -r[9] * r[0] + r[1] * r[8], i[8] = r[5] * r[0] - r[1] * r[4], r = r[0] * i[0] + r[1] * i[3] + r[2] * i[6], 0 === r) {
                 if (t) throw Error("Matrix3.getInverse(): can't invert matrix, determinant is 0");
                 return THREE.warn("Matrix3.getInverse(): can't invert matrix, determinant is 0"), this.identity(), this
             }
             return this.multiplyScalar(1 / r), this
         },
         transpose: function() {
             var e, t = this.elements;
             return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this
         },
         flattenToArrayOffset: function(e, t) {
             var r = this.elements;
             return e[t] = r[0], e[t + 1] = r[1], e[t + 2] = r[2], e[t + 3] = r[3], e[t + 4] = r[4], e[t + 5] = r[5], e[t + 6] = r[6], e[t + 7] = r[7], e[t + 8] = r[8], e
         },
         getNormalMatrix: function(e) {
             return this.getInverse(e).transpose(), this
         },
         transposeIntoArray: function(e) {
             var t = this.elements;
             return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this
         },
         fromArray: function(e) {
             return this.elements.set(e), this
         },
         toArray: function() {
             var e = this.elements;
             return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]]
         },
         clone: function() {
             return (new THREE.Matrix3).fromArray(this.elements)
         }
     }, THREE.Matrix4 = function() {
         this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]), 0 < arguments.length && THREE.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
     }, THREE.Matrix4.prototype = {
         constructor: THREE.Matrix4,
         set: function(e, t, r, i, n, a, o, s, h, l, u, c, d, f, p, m) {
             var E = this.elements;
             return E[0] = e, E[4] = t, E[8] = r, E[12] = i, E[1] = n, E[5] = a, E[9] = o, E[13] = s, E[2] = h, E[6] = l, E[10] = u, E[14] = c, E[3] = d, E[7] = f, E[11] = p, E[15] = m, this
         },
         identity: function() {
             return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
         },
         copy: function(e) {
             return this.elements.set(e.elements), this
         },
         extractPosition: function(e) {
             return THREE.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."), this.copyPosition(e)
         },
         copyPosition: function(e) {
             var t = this.elements;
             return e = e.elements, t[12] = e[12], t[13] = e[13], t[14] = e[14], this
         },
         extractBasis: function(e, t, r) {
             var i = this.elements;
             return e.set(i[0], i[1], i[2]), t.set(i[4], i[5], i[6]), r.set(i[8], i[9], i[10]), this
         },
         makeBasis: function(e, t, r) {
             return this.set(e.x, t.x, r.x, 0, e.y, t.y, r.y, 0, e.z, t.z, r.z, 0, 0, 0, 0, 1), this
         },
         extractRotation: function() {
             var e = new THREE.Vector3;
             return function(t) {
                 var r = this.elements;
                 t = t.elements;
                 var i = 1 / e.set(t[0], t[1], t[2]).length(),
                     n = 1 / e.set(t[4], t[5], t[6]).length(),
                     a = 1 / e.set(t[8], t[9], t[10]).length();
                 return r[0] = t[0] * i, r[1] = t[1] * i, r[2] = t[2] * i, r[4] = t[4] * n, r[5] = t[5] * n, r[6] = t[6] * n, r[8] = t[8] * a, r[9] = t[9] * a, r[10] = t[10] * a, this
             }
         }(),
         makeRotationFromEuler: function(e) {
             !1 == e instanceof THREE.Euler && THREE.error("THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
             var t = this.elements,
                 r = e.x,
                 i = e.y,
                 n = e.z,
                 a = Math.cos(r),
                 r = Math.sin(r),
                 o = Math.cos(i),
                 i = Math.sin(i),
                 s = Math.cos(n),
                 n = Math.sin(n);
             if ("XYZ" === e.order) {
                 e = a * s;
                 var h = a * n,
                     l = r * s,
                     u = r * n;
                 t[0] = o * s, t[4] = -o * n, t[8] = i, t[1] = h + l * i, t[5] = e - u * i, t[9] = -r * o, t[2] = u - e * i, t[6] = l + h * i, t[10] = a * o
             } else "YXZ" === e.order ? (e = o * s, h = o * n, l = i * s, u = i * n, t[0] = e + u * r, t[4] = l * r - h, t[8] = a * i, t[1] = a * n, t[5] = a * s, t[9] = -r, t[2] = h * r - l, t[6] = u + e * r, t[10] = a * o) : "ZXY" === e.order ? (e = o * s, h = o * n, l = i * s, u = i * n, t[0] = e - u * r, t[4] = -a * n, t[8] = l + h * r, t[1] = h + l * r, t[5] = a * s, t[9] = u - e * r, t[2] = -a * i, t[6] = r, t[10] = a * o) : "ZYX" === e.order ? (e = a * s, h = a * n, l = r * s, u = r * n, t[0] = o * s, t[4] = l * i - h, t[8] = e * i + u, t[1] = o * n, t[5] = u * i + e, t[9] = h * i - l, t[2] = -i, t[6] = r * o, t[10] = a * o) : "YZX" === e.order ? (e = a * o, h = a * i, l = r * o, u = r * i, t[0] = o * s, t[4] = u - e * n, t[8] = l * n + h, t[1] = n, t[5] = a * s, t[9] = -r * s, t[2] = -i * s, t[6] = h * n + l, t[10] = e - u * n) : "XZY" === e.order && (e = a * o, h = a * i, l = r * o, u = r * i, t[0] = o * s, t[4] = -n, t[8] = i * s, t[1] = e * n + u, t[5] = a * s, t[9] = h * n - l, t[2] = l * n - h, t[6] = r * s, t[10] = u * n + e);
             return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
         },
         setRotationFromQuaternion: function(e) {
             return THREE.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."), this.makeRotationFromQuaternion(e)
         },
         makeRotationFromQuaternion: function(e) {
             var t = this.elements,
                 r = e.x,
                 i = e.y,
                 n = e.z,
                 a = e.w,
                 o = r + r,
                 s = i + i,
                 h = n + n;
             e = r * o;
             var l = r * s,
                 r = r * h,
                 u = i * s,
                 i = i * h,
                 n = n * h,
                 o = a * o,
                 s = a * s,
                 a = a * h;
             return t[0] = 1 - (u + n), t[4] = l - a, t[8] = r + s, t[1] = l + a, t[5] = 1 - (e + n), t[9] = i - o, t[2] = r - s, t[6] = i + o, t[10] = 1 - (e + u), t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
         },
         lookAt: function() {
             var e = new THREE.Vector3,
                 t = new THREE.Vector3,
                 r = new THREE.Vector3;
             return function(i, n, a) {
                 var o = this.elements;
                 return r.subVectors(i, n).normalize(), 0 === r.length() && (r.z = 1), e.crossVectors(a, r).normalize(), 0 === e.length() && (r.x += 1e-4, e.crossVectors(a, r).normalize()), t.crossVectors(r, e), o[0] = e.x, o[4] = t.x, o[8] = r.x, o[1] = e.y, o[5] = t.y, o[9] = r.y, o[2] = e.z, o[6] = t.z, o[10] = r.z, this
             }
         }(),
         multiply: function(e, t) {
             return void 0 !== t ? (THREE.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(e, t)) : this.multiplyMatrices(this, e)
         },
         multiplyMatrices: function(e, t) {
             var r = e.elements,
                 i = t.elements,
                 n = this.elements,
                 a = r[0],
                 o = r[4],
                 s = r[8],
                 h = r[12],
                 l = r[1],
                 u = r[5],
                 c = r[9],
                 d = r[13],
                 f = r[2],
                 p = r[6],
                 m = r[10],
                 E = r[14],
                 g = r[3],
                 v = r[7],
                 y = r[11],
                 r = r[15],
                 T = i[0],
                 R = i[4],
                 x = i[8],
                 H = i[12],
                 _ = i[1],
                 b = i[5],
                 w = i[9],
                 M = i[13],
                 S = i[2],
                 C = i[6],
                 A = i[10],
                 L = i[14],
                 P = i[3],
                 D = i[7],
                 F = i[11],
                 i = i[15];
             return n[0] = a * T + o * _ + s * S + h * P, n[4] = a * R + o * b + s * C + h * D, n[8] = a * x + o * w + s * A + h * F, n[12] = a * H + o * M + s * L + h * i, n[1] = l * T + u * _ + c * S + d * P, n[5] = l * R + u * b + c * C + d * D, n[9] = l * x + u * w + c * A + d * F, n[13] = l * H + u * M + c * L + d * i, n[2] = f * T + p * _ + m * S + E * P, n[6] = f * R + p * b + m * C + E * D, n[10] = f * x + p * w + m * A + E * F, n[14] = f * H + p * M + m * L + E * i, n[3] = g * T + v * _ + y * S + r * P, n[7] = g * R + v * b + y * C + r * D, n[11] = g * x + v * w + y * A + r * F, n[15] = g * H + v * M + y * L + r * i, this
         },
         multiplyToArray: function(e, t, r) {
             var i = this.elements;
             return this.multiplyMatrices(e, t), r[0] = i[0], r[1] = i[1], r[2] = i[2], r[3] = i[3], r[4] = i[4], r[5] = i[5], r[6] = i[6], r[7] = i[7], r[8] = i[8], r[9] = i[9], r[10] = i[10], r[11] = i[11], r[12] = i[12], r[13] = i[13], r[14] = i[14], r[15] = i[15], this
         },
         multiplyScalar: function(e) {
             var t = this.elements;
             return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this
         },
         multiplyVector3: function(e) {
             return THREE.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead."), e.applyProjection(this)
         },
         multiplyVector4: function(e) {
             return THREE.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), e.applyMatrix4(this)
         },
         multiplyVector3Array: function(e) {
             return THREE.warn("THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(e)
         },
         applyToVector3Array: function() {
             var e = new THREE.Vector3;
             return function(t, r, i) {
                 void 0 === r && (r = 0), void 0 === i && (i = t.length);
                 for (var n = 0; i > n; n += 3, r += 3) e.x = t[r], e.y = t[r + 1], e.z = t[r + 2], e.applyMatrix4(this), t[r] = e.x, t[r + 1] = e.y, t[r + 2] = e.z;
                 return t
             }
         }(),
         rotateAxis: function(e) {
             THREE.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), e.transformDirection(this)
         },
         crossVector: function(e) {
             return THREE.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), e.applyMatrix4(this)
         },
         determinant: function() {
             var e = this.elements,
                 t = e[0],
                 r = e[4],
                 i = e[8],
                 n = e[12],
                 a = e[1],
                 o = e[5],
                 s = e[9],
                 h = e[13],
                 l = e[2],
                 u = e[6],
                 c = e[10],
                 d = e[14];
             return e[3] * (+n * s * u - i * h * u - n * o * c + r * h * c + i * o * d - r * s * d) + e[7] * (+t * s * d - t * h * c + n * a * c - i * a * d + i * h * l - n * s * l) + e[11] * (+t * h * u - t * o * d - n * a * u + r * a * d + n * o * l - r * h * l) + e[15] * (-i * o * l - t * s * u + t * o * c + i * a * u - r * a * c + r * s * l)
         },
         transpose: function() {
             var e = this.elements,
                 t;
             return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this
         },
         flattenToArrayOffset: function(e, t) {
             var r = this.elements;
             return e[t] = r[0], e[t + 1] = r[1], e[t + 2] = r[2], e[t + 3] = r[3], e[t + 4] = r[4], e[t + 5] = r[5], e[t + 6] = r[6], e[t + 7] = r[7], e[t + 8] = r[8], e[t + 9] = r[9], e[t + 10] = r[10], e[t + 11] = r[11], e[t + 12] = r[12], e[t + 13] = r[13], e[t + 14] = r[14], e[t + 15] = r[15], e
         },
         getPosition: function() {
             var e = new THREE.Vector3;
             return function() {
                 THREE.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");
                 var t = this.elements;
                 return e.set(t[12], t[13], t[14])
             }
         }(),
         setPosition: function(e) {
             var t = this.elements;
             return t[12] = e.x, t[13] = e.y, t[14] = e.z, this
         },
         getInverse: function(e, t) {
             var r = this.elements,
                 i = e.elements,
                 n = i[0],
                 a = i[4],
                 o = i[8],
                 s = i[12],
                 h = i[1],
                 l = i[5],
                 u = i[9],
                 c = i[13],
                 d = i[2],
                 f = i[6],
                 p = i[10],
                 m = i[14],
                 E = i[3],
                 g = i[7],
                 v = i[11],
                 i = i[15];
             if (r[0] = u * m * g - c * p * g + c * f * v - l * m * v - u * f * i + l * p * i, r[4] = s * p * g - o * m * g - s * f * v + a * m * v + o * f * i - a * p * i, r[8] = o * c * g - s * u * g + s * l * v - a * c * v - o * l * i + a * u * i, r[12] = s * u * f - o * c * f - s * l * p + a * c * p + o * l * m - a * u * m, r[1] = c * p * E - u * m * E - c * d * v + h * m * v + u * d * i - h * p * i, r[5] = o * m * E - s * p * E + s * d * v - n * m * v - o * d * i + n * p * i, r[9] = s * u * E - o * c * E - s * h * v + n * c * v + o * h * i - n * u * i, r[13] = o * c * d - s * u * d + s * h * p - n * c * p - o * h * m + n * u * m, r[2] = l * m * E - c * f * E + c * d * g - h * m * g - l * d * i + h * f * i, r[6] = s * f * E - a * m * E - s * d * g + n * m * g + a * d * i - n * f * i, r[10] = a * c * E - s * l * E + s * h * g - n * c * g - a * h * i + n * l * i, r[14] = s * l * d - a * c * d - s * h * f + n * c * f + a * h * m - n * l * m, r[3] = u * f * E - l * p * E - u * d * g + h * p * g + l * d * v - h * f * v, r[7] = a * p * E - o * f * E + o * d * g - n * p * g - a * d * v + n * f * v, r[11] = o * l * E - a * u * E - o * h * g + n * u * g + a * h * v - n * l * v, r[15] = a * u * d - o * l * d + o * h * f - n * u * f - a * h * p + n * l * p, r = n * r[0] + h * r[4] + d * r[8] + E * r[12], 0 == r) {
                 if (t) throw Error("THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0");
                 return THREE.warn("THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0"), this.identity(), this
             }
             return this.multiplyScalar(1 / r), this
         },
         translate: function(e) {
             THREE.error("THREE.Matrix4: .translate() has been removed.")
         },
         rotateX: function(e) {
             THREE.error("THREE.Matrix4: .rotateX() has been removed.")
         },
         rotateY: function(e) {
             THREE.error("THREE.Matrix4: .rotateY() has been removed.")
         },
         rotateZ: function(e) {
             THREE.error("THREE.Matrix4: .rotateZ() has been removed.")
         },
         rotateByAxis: function(e, t) {
             THREE.error("THREE.Matrix4: .rotateByAxis() has been removed.")
         },
         scale: function(e) {
             var t = this.elements,
                 r = e.x,
                 i = e.y;
             return e = e.z, t[0] *= r, t[4] *= i, t[8] *= e, t[1] *= r, t[5] *= i, t[9] *= e, t[2] *= r, t[6] *= i, t[10] *= e, t[3] *= r, t[7] *= i, t[11] *= e, this
         },
         getMaxScaleOnAxis: function() {
             var e = this.elements;
             return Math.sqrt(Math.max(e[0] * e[0] + e[1] * e[1] + e[2] * e[2], Math.max(e[4] * e[4] + e[5] * e[5] + e[6] * e[6], e[8] * e[8] + e[9] * e[9] + e[10] * e[10])))
         },
         makeTranslation: function(e, t, r) {
             return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, r, 0, 0, 0, 1), this
         },
         makeRotationX: function(e) {
             var t = Math.cos(e);
             return e = Math.sin(e), this.set(1, 0, 0, 0, 0, t, -e, 0, 0, e, t, 0, 0, 0, 0, 1), this
         },
         makeRotationY: function(e) {
             var t = Math.cos(e);
             return e = Math.sin(e), this.set(t, 0, e, 0, 0, 1, 0, 0, -e, 0, t, 0, 0, 0, 0, 1), this
         },
         makeRotationZ: function(e) {
             var t = Math.cos(e);
             return e = Math.sin(e), this.set(t, -e, 0, 0, e, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
         },
         makeRotationAxis: function(e, t) {
             var r = Math.cos(t),
                 i = Math.sin(t),
                 n = 1 - r,
                 a = e.x,
                 o = e.y,
                 s = e.z,
                 h = n * a,
                 l = n * o;
             return this.set(h * a + r, h * o - i * s, h * s + i * o, 0, h * o + i * s, l * o + r, l * s - i * a, 0, h * s - i * o, l * s + i * a, n * s * s + r, 0, 0, 0, 0, 1), this
         },
         makeScale: function(e, t, r) {
             return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, r, 0, 0, 0, 0, 1), this
         },
         compose: function(e, t, r) {
             return this.makeRotationFromQuaternion(t), this.scale(r), this.setPosition(e), this
         },
         decompose: function() {
             var e = new THREE.Vector3,
                 t = new THREE.Matrix4;
             return function(r, i, n) {
                 var a = this.elements,
                     o = e.set(a[0], a[1], a[2]).length(),
                     s = e.set(a[4], a[5], a[6]).length(),
                     h = e.set(a[8], a[9], a[10]).length();
                 0 > this.determinant() && (o = -o), r.x = a[12], r.y = a[13], r.z = a[14], t.elements.set(this.elements), r = 1 / o;
                 var a = 1 / s,
                     l = 1 / h;
                 return t.elements[0] *= r, t.elements[1] *= r, t.elements[2] *= r, t.elements[4] *= a, t.elements[5] *= a, t.elements[6] *= a, t.elements[8] *= l, t.elements[9] *= l, t.elements[10] *= l, i.setFromRotationMatrix(t), n.x = o, n.y = s, n.z = h, this
             }
         }(),
         makeFrustum: function(e, t, r, i, n, a) {
             var o = this.elements;
             return o[0] = 2 * n / (t - e), o[4] = 0, o[8] = (t + e) / (t - e), o[12] = 0, o[1] = 0, o[5] = 2 * n / (i - r), o[9] = (i + r) / (i - r), o[13] = 0, o[2] = 0, o[6] = 0, o[10] = -(a + n) / (a - n), o[14] = -2 * a * n / (a - n), o[3] = 0, o[7] = 0, o[11] = -1, o[15] = 0, this
         },
         makePerspective: function(e, t, r, i) {
             e = r * Math.tan(THREE.Math.degToRad(.5 * e));
             var n = -e;
             return this.makeFrustum(n * t, e * t, n, e, r, i)
         },
         makeOrthographic: function(e, t, r, i, n, a) {
             var o = this.elements,
                 s = t - e,
                 h = r - i,
                 l = a - n;
             return o[0] = 2 / s, o[4] = 0, o[8] = 0, o[12] = -((t + e) / s), o[1] = 0, o[5] = 2 / h, o[9] = 0, o[13] = -((r + i) / h), o[2] = 0, o[6] = 0, o[10] = -2 / l, o[14] = -((a + n) / l), o[3] = 0, o[7] = 0, o[11] = 0, o[15] = 1, this
         },
         fromArray: function(e) {
             return this.elements.set(e), this
         },
         toArray: function() {
             var e = this.elements;
             return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]]
         },
         clone: function() {
             return (new THREE.Matrix4).fromArray(this.elements)
         }
     }, THREE.Ray = function(e, t) {
         this.origin = void 0 !== e ? e : new THREE.Vector3, this.direction = void 0 !== t ? t : new THREE.Vector3
     }, THREE.Ray.prototype = {
         constructor: THREE.Ray,
         set: function(e, t) {
             return this.origin.copy(e), this.direction.copy(t), this
         },
         copy: function(e) {
             return this.origin.copy(e.origin), this.direction.copy(e.direction), this
         },
         at: function(e, t) {
             return (t || new THREE.Vector3).copy(this.direction).multiplyScalar(e).add(this.origin)
         },
         recast: function() {
             var e = new THREE.Vector3;
             return function(t) {
                 return this.origin.copy(this.at(t, e)), this
             }
         }(),
         closestPointToPoint: function(e, t) {
             var r = t || new THREE.Vector3;
             r.subVectors(e, this.origin);
             var i = r.dot(this.direction);
             return 0 > i ? r.copy(this.origin) : r.copy(this.direction).multiplyScalar(i).add(this.origin)
         },
         distanceToPoint: function() {
             var e = new THREE.Vector3;
             return function(t) {
                 var r = e.subVectors(t, this.origin).dot(this.direction);
                 return 0 > r ? this.origin.distanceTo(t) : (e.copy(this.direction).multiplyScalar(r).add(this.origin), e.distanceTo(t))
             }
         }(),
         distanceSqToSegment: function() {
             var e = new THREE.Vector3,
                 t = new THREE.Vector3,
                 r = new THREE.Vector3;
             return function(i, n, a, o) {
                 e.copy(i).add(n).multiplyScalar(.5), t.copy(n).sub(i).normalize(), r.copy(this.origin).sub(e);
                 var s = .5 * i.distanceTo(n),
                     h = -this.direction.dot(t),
                     l = r.dot(this.direction),
                     u = -r.dot(t),
                     c = r.lengthSq(),
                     d = Math.abs(1 - h * h),
                     f;
                 return d > 0 ? (i = h * u - l, n = h * l - u, f = s * d, i >= 0 ? n >= -f ? f >= n ? (s = 1 / d, i *= s, n *= s, h = i * (i + h * n + 2 * l) + n * (h * i + n + 2 * u) + c) : (n = s, i = Math.max(0, -(h * n + l)), h = -i * i + n * (n + 2 * u) + c) : (n = -s, i = Math.max(0, -(h * n + l)), h = -i * i + n * (n + 2 * u) + c) : -f >= n ? (i = Math.max(0, -(-h * s + l)), n = i > 0 ? -s : Math.min(Math.max(-s, -u), s), h = -i * i + n * (n + 2 * u) + c) : f >= n ? (i = 0, n = Math.min(Math.max(-s, -u), s), h = n * (n + 2 * u) + c) : (i = Math.max(0, -(h * s + l)), n = i > 0 ? s : Math.min(Math.max(-s, -u), s), h = -i * i + n * (n + 2 * u) + c)) : (n = h > 0 ? -s : s, i = Math.max(0, -(h * n + l)), h = -i * i + n * (n + 2 * u) + c), a && a.copy(this.direction).multiplyScalar(i).add(this.origin), o && o.copy(t).multiplyScalar(n).add(e), h
             }
         }(),
         isIntersectionSphere: function(e) {
             return this.distanceToPoint(e.center) <= e.radius
         },
         intersectSphere: function() {
             var e = new THREE.Vector3;
             return function(t, r) {
                 e.subVectors(t.center, this.origin);
                 var i = e.dot(this.direction),
                     n = e.dot(e) - i * i,
                     a = t.radius * t.radius;
                 return n > a ? null : (a = Math.sqrt(a - n), n = i - a, i += a, 0 > n && 0 > i ? null : 0 > n ? this.at(i, r) : this.at(n, r))
             }
         }(),
         isIntersectionPlane: function(e) {
             var t = e.distanceToPoint(this.origin);
             return 0 === t || 0 > e.normal.dot(this.direction) * t ? !0 : !1
         },
         distanceToPlane: function(e) {
             var t = e.normal.dot(this.direction);
             return 0 == t ? 0 == e.distanceToPoint(this.origin) ? 0 : null : (e = -(this.origin.dot(e.normal) + e.constant) / t, e >= 0 ? e : null)
         },
         intersectPlane: function(e, t) {
             var r = this.distanceToPlane(e);
             return null === r ? null : this.at(r, t)
         },
         isIntersectionBox: function() {
             var e = new THREE.Vector3;
             return function(t) {
                 return null !== this.intersectBox(t, e)
             }
         }(),
         intersectBox: function(e, t) {
             var r, i, n, a, o;
             i = 1 / this.direction.x, a = 1 / this.direction.y, o = 1 / this.direction.z;
             var s = this.origin;
             return i >= 0 ? (r = (e.min.x - s.x) * i, i *= e.max.x - s.x) : (r = (e.max.x - s.x) * i, i *= e.min.x - s.x), a >= 0 ? (n = (e.min.y - s.y) * a, a *= e.max.y - s.y) : (n = (e.max.y - s.y) * a, a *= e.min.y - s.y), r > a || n > i ? null : ((n > r || r !== r) && (r = n), (i > a || i !== i) && (i = a), o >= 0 ? (n = (e.min.z - s.z) * o, o *= e.max.z - s.z) : (n = (e.max.z - s.z) * o, o *= e.min.z - s.z), r > o || n > i ? null : ((n > r || r !== r) && (r = n), (i > o || i !== i) && (i = o), 0 > i ? null : this.at(r >= 0 ? r : i, t)))
         },
         intersectTriangle: function() {
             var e = new THREE.Vector3,
                 t = new THREE.Vector3,
                 r = new THREE.Vector3,
                 i = new THREE.Vector3;
             return function(n, a, o, s, h) {
                 if (t.subVectors(a, n), r.subVectors(o, n), i.crossVectors(t, r), a = this.direction.dot(i), a > 0) {
                     if (s) return null;
                     s = 1
                 } else {
                     if (!(0 > a)) return null;
                     s = -1, a = -a
                 }
                 return e.subVectors(this.origin, n), n = s * this.direction.dot(r.crossVectors(e, r)), 0 > n ? null : (o = s * this.direction.dot(t.cross(e)), 0 > o || n + o > a ? null : (n = -s * e.dot(i), 0 > n ? null : this.at(n / a, h)))
             }
         }(),
         applyMatrix4: function(e) {
             return this.direction.add(this.origin).applyMatrix4(e), this.origin.applyMatrix4(e), this.direction.sub(this.origin), this.direction.normalize(), this
         },
         equals: function(e) {
             return e.origin.equals(this.origin) && e.direction.equals(this.direction)
         },
         clone: function() {
             return (new THREE.Ray).copy(this)
         }
     }, THREE.Sphere = function(e, t) {
         this.center = void 0 !== e ? e : new THREE.Vector3, this.radius = void 0 !== t ? t : 0
     }, THREE.Sphere.prototype = {
         constructor: THREE.Sphere,
         set: function(e, t) {
             return this.center.copy(e), this.radius = t, this
         },
         setFromPoints: function() {
             var e = new THREE.Box3;
             return function(t, r) {
                 var i = this.center;
                 void 0 !== r ? i.copy(r) : e.setFromPoints(t).center(i);
                 for (var n = 0, a = 0, o = t.length; o > a; a++) n = Math.max(n, i.distanceToSquared(t[a]));
                 return this.radius = Math.sqrt(n), this
             }
         }(),
         copy: function(e) {
             return this.center.copy(e.center), this.radius = e.radius, this
         },
         empty: function() {
             return 0 >= this.radius
         },
         containsPoint: function(e) {
             return e.distanceToSquared(this.center) <= this.radius * this.radius
         },
         distanceToPoint: function(e) {
             return e.distanceTo(this.center) - this.radius
         },
         intersectsSphere: function(e) {
             var t = this.radius + e.radius;
             return e.center.distanceToSquared(this.center) <= t * t
         },
         clampPoint: function(e, t) {
             var r = this.center.distanceToSquared(e),
                 i = t || new THREE.Vector3;
             return i.copy(e), r > this.radius * this.radius && (i.sub(this.center).normalize(), i.multiplyScalar(this.radius).add(this.center)), i
         },
         getBoundingBox: function(e) {
             return e = e || new THREE.Box3, e.set(this.center, this.center), e.expandByScalar(this.radius), e
         },
         applyMatrix4: function(e) {
             return this.center.applyMatrix4(e), this.radius *= e.getMaxScaleOnAxis(), this
         },
         translate: function(e) {
             return this.center.add(e), this
         },
         equals: function(e) {
             return e.center.equals(this.center) && e.radius === this.radius
         },
         clone: function() {
             return (new THREE.Sphere).copy(this)
         }
     }, THREE.Frustum = function(e, t, r, i, n, a) {
         this.planes = [void 0 !== e ? e : new THREE.Plane, void 0 !== t ? t : new THREE.Plane, void 0 !== r ? r : new THREE.Plane, void 0 !== i ? i : new THREE.Plane, void 0 !== n ? n : new THREE.Plane, void 0 !== a ? a : new THREE.Plane]
     }, THREE.Frustum.prototype = {
         constructor: THREE.Frustum,
         set: function(e, t, r, i, n, a) {
             var o = this.planes;
             return o[0].copy(e), o[1].copy(t), o[2].copy(r), o[3].copy(i), o[4].copy(n), o[5].copy(a), this
         },
         copy: function(e) {
             for (var t = this.planes, r = 0; 6 > r; r++) t[r].copy(e.planes[r]);
             return this
         },
         setFromMatrix: function(e) {
             var t = this.planes,
                 r = e.elements;
             e = r[0];
             var i = r[1],
                 n = r[2],
                 a = r[3],
                 o = r[4],
                 s = r[5],
                 h = r[6],
                 l = r[7],
                 u = r[8],
                 c = r[9],
                 d = r[10],
                 f = r[11],
                 p = r[12],
                 m = r[13],
                 E = r[14],
                 r = r[15];
             return t[0].setComponents(a - e, l - o, f - u, r - p).normalize(), t[1].setComponents(a + e, l + o, f + u, r + p).normalize(), t[2].setComponents(a + i, l + s, f + c, r + m).normalize(), t[3].setComponents(a - i, l - s, f - c, r - m).normalize(), t[4].setComponents(a - n, l - h, f - d, r - E).normalize(), t[5].setComponents(a + n, l + h, f + d, r + E).normalize(), this
         },
         intersectsObject: function() {
             var e = new THREE.Sphere;
             return function(t) {
                 var r = t.geometry;
                 return null === r.boundingSphere && r.computeBoundingSphere(), e.copy(r.boundingSphere), e.applyMatrix4(t.matrixWorld), this.intersectsSphere(e)
             }
         }(),
         intersectsSphere: function(e) {
             var t = this.planes,
                 r = e.center;
             e = -e.radius;
             for (var i = 0; 6 > i; i++)
                 if (t[i].distanceToPoint(r) < e) return !1;
             return !0
         },
         intersectsBox: function() {
             var e = new THREE.Vector3,
                 t = new THREE.Vector3;
             return function(r) {
                 for (var i = this.planes, n = 0; 6 > n; n++) {
                     var a = i[n];
                     e.x = 0 < a.normal.x ? r.min.x : r.max.x, t.x = 0 < a.normal.x ? r.max.x : r.min.x, e.y = 0 < a.normal.y ? r.min.y : r.max.y, t.y = 0 < a.normal.y ? r.max.y : r.min.y, e.z = 0 < a.normal.z ? r.min.z : r.max.z, t.z = 0 < a.normal.z ? r.max.z : r.min.z;
                     var o = a.distanceToPoint(e),
                         a = a.distanceToPoint(t);
                     if (0 > o && 0 > a) return !1
                 }
                 return !0
             }
         }(),
         containsPoint: function(e) {
             for (var t = this.planes, r = 0; 6 > r; r++)
                 if (0 > t[r].distanceToPoint(e)) return !1;
             return !0
         },
         clone: function() {
             return (new THREE.Frustum).copy(this)
         }
     }, THREE.Plane = function(e, t) {
         this.normal = void 0 !== e ? e : new THREE.Vector3(1, 0, 0), this.constant = void 0 !== t ? t : 0
     }, THREE.Plane.prototype = {
         constructor: THREE.Plane,
         set: function(e, t) {
             return this.normal.copy(e), this.constant = t, this
         },
         setComponents: function(e, t, r, i) {
             return this.normal.set(e, t, r), this.constant = i, this
         },
         setFromNormalAndCoplanarPoint: function(e, t) {
             return this.normal.copy(e), this.constant = -t.dot(this.normal), this
         },
         setFromCoplanarPoints: function() {
             var e = new THREE.Vector3,
                 t = new THREE.Vector3;
             return function(r, i, n) {
                 return i = e.subVectors(n, i).cross(t.subVectors(r, i)).normalize(), this.setFromNormalAndCoplanarPoint(i, r), this
             }
         }(),
         copy: function(e) {
             return this.normal.copy(e.normal), this.constant = e.constant, this
         },
         normalize: function() {
             var e = 1 / this.normal.length();
             return this.normal.multiplyScalar(e), this.constant *= e, this
         },
         negate: function() {
             return this.constant *= -1, this.normal.negate(), this
         },
         distanceToPoint: function(e) {
             return this.normal.dot(e) + this.constant
         },
         distanceToSphere: function(e) {
             return this.distanceToPoint(e.center) - e.radius
         },
         projectPoint: function(e, t) {
             return this.orthoPoint(e, t).sub(e).negate()
         },
         orthoPoint: function(e, t) {
             var r = this.distanceToPoint(e);
             return (t || new THREE.Vector3).copy(this.normal).multiplyScalar(r)
         },
         isIntersectionLine: function(e) {
             var t = this.distanceToPoint(e.start);
             return e = this.distanceToPoint(e.end), 0 > t && e > 0 || 0 > e && t > 0
         },
         intersectLine: function() {
             var e = new THREE.Vector3;
             return function(t, r) {
                 var i = r || new THREE.Vector3,
                     n = t.delta(e),
                     a = this.normal.dot(n);
                 return 0 != a ? (a = -(t.start.dot(this.normal) + this.constant) / a, 0 > a || a > 1 ? void 0 : i.copy(n).multiplyScalar(a).add(t.start)) : 0 == this.distanceToPoint(t.start) ? i.copy(t.start) : void 0
             }
         }(),
         coplanarPoint: function(e) {
             return (e || new THREE.Vector3).copy(this.normal).multiplyScalar(-this.constant)
         },
         applyMatrix4: function() {
             var e = new THREE.Vector3,
                 t = new THREE.Vector3,
                 r = new THREE.Matrix3;
             return function(i, n) {
                 var a = n || r.getNormalMatrix(i),
                     a = e.copy(this.normal).applyMatrix3(a),
                     o = this.coplanarPoint(t);
                 return o.applyMatrix4(i), this.setFromNormalAndCoplanarPoint(a, o), this
             }
         }(),
         translate: function(e) {
             return this.constant -= e.dot(this.normal), this
         },
         equals: function(e) {
             return e.normal.equals(this.normal) && e.constant == this.constant
         },
         clone: function() {
             return (new THREE.Plane).copy(this)
         }
     }, THREE.Math = {
         generateUUID: function() {
             var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
                 t = Array(36),
                 r = 0,
                 i;
             return function() {
                 for (var n = 0; 36 > n; n++) 8 == n || 13 == n || 18 == n || 23 == n ? t[n] = "-" : 14 == n ? t[n] = "4" : (2 >= r && (r = 33554432 + 16777216 * Math.random() | 0), i = 15 & r, r >>= 4, t[n] = e[19 == n ? 3 & i | 8 : i]);
                 return t.join("")
             }
         }(),
         clamp: function(e, t, r) {
             return t > e ? t : e > r ? r : e
         },
         clampBottom: function(e, t) {
             return t > e ? t : e
         },
         mapLinear: function(e, t, r, i, n) {
             return i + (e - t) * (n - i) / (r - t)
         },
         smoothstep: function(e, t, r) {
             return t >= e ? 0 : e >= r ? 1 : (e = (e - t) / (r - t), e * e * (3 - 2 * e))
         },
         smootherstep: function(e, t, r) {
             return t >= e ? 0 : e >= r ? 1 : (e = (e - t) / (r - t), e * e * e * (e * (6 * e - 15) + 10))
         },
         random16: function() {
             return (65280 * Math.random() + 255 * Math.random()) / 65535
         },
         randInt: function(e, t) {
             return Math.floor(this.randFloat(e, t))
         },
         randFloat: function(e, t) {
             return e + Math.random() * (t - e)
         },
         randFloatSpread: function(e) {
             return e * (.5 - Math.random())
         },
         degToRad: function() {
             var e = Math.PI / 180;
             return function(t) {
                 return t * e
             }
         }(),
         radToDeg: function() {
             var e = 180 / Math.PI;
             return function(t) {
                 return t * e
             }
         }(),
         isPowerOfTwo: function(e) {
             return 0 === (e & e - 1) && 0 !== e
         },
         nextPowerOfTwo: function(e) {
             return e--, e |= e >> 1, e |= e >> 2, e |= e >> 4, e |= e >> 8, e |= e >> 16, e++, e
         }
     }, THREE.Spline = function(e) {
         function t(e, t, r, i, n, a, o) {
             return e = .5 * (r - e), i = .5 * (i - t), (2 * (t - r) + e + i) * o + (-3 * (t - r) - 2 * e - i) * a + e * n + t
         }
         this.points = e;
         var r = [],
             i = {
                 x: 0,
                 y: 0,
                 z: 0
             },
             n, a, o, s, h, l, u, c, d;
         this.initFromArray = function(e) {
             this.points = [];
             for (var t = 0; t < e.length; t++) this.points[t] = {
                 x: e[t][0],
                 y: e[t][1],
                 z: e[t][2]
             }
         }, this.getPoint = function(e) {
             return n = (this.points.length - 1) * e, a = Math.floor(n), o = n - a, r[0] = 0 === a ? a : a - 1, r[1] = a, r[2] = a > this.points.length - 2 ? this.points.length - 1 : a + 1, r[3] = a > this.points.length - 3 ? this.points.length - 1 : a + 2, l = this.points[r[0]], u = this.points[r[1]], c = this.points[r[2]], d = this.points[r[3]], s = o * o, h = o * s, i.x = t(l.x, u.x, c.x, d.x, o, s, h), i.y = t(l.y, u.y, c.y, d.y, o, s, h), i.z = t(l.z, u.z, c.z, d.z, o, s, h), i
         }, this.getControlPointsArray = function() {
             var e, t, r = this.points.length,
                 i = [];
             for (e = 0; r > e; e++) t = this.points[e], i[e] = [t.x, t.y, t.z];
             return i
         }, this.getLength = function(e) {
             var t, r, i, n = t = t = 0,
                 a = new THREE.Vector3,
                 o = new THREE.Vector3,
                 s = [],
                 h = 0;
             for (s[0] = 0, e || (e = 100), r = this.points.length * e, a.copy(this.points[0]), e = 1; r > e; e++) t = e / r, i = this.getPoint(t), o.copy(i), h += o.distanceTo(a), a.copy(i), t *= this.points.length - 1, t = Math.floor(t), t != n && (s[t] = h, n = t);
             return s[s.length] = h, {
                 chunks: s,
                 total: h
             }
         }, this.reparametrizeByArcLength = function(e) {
             var t, r, i, n, a, o, s = [],
                 h = new THREE.Vector3,
                 l = this.getLength();
             for (s.push(h.copy(this.points[0]).clone()), t = 1; t < this.points.length; t++) {
                 for (r = l.chunks[t] - l.chunks[t - 1], o = Math.ceil(e * r / l.total), n = (t - 1) / (this.points.length - 1), a = t / (this.points.length - 1), r = 1; o - 1 > r; r++) i = n + 1 / o * r * (a - n), i = this.getPoint(i), s.push(h.copy(i).clone());
                 s.push(h.copy(this.points[t]).clone())
             }
             this.points = s
         }
     }, THREE.Triangle = function(e, t, r) {
         this.a = void 0 !== e ? e : new THREE.Vector3, this.b = void 0 !== t ? t : new THREE.Vector3, this.c = void 0 !== r ? r : new THREE.Vector3
     }, THREE.Triangle.normal = function() {
         var e = new THREE.Vector3;
         return function(t, r, i, n) {
             return n = n || new THREE.Vector3, n.subVectors(i, r), e.subVectors(t, r), n.cross(e), t = n.lengthSq(), t > 0 ? n.multiplyScalar(1 / Math.sqrt(t)) : n.set(0, 0, 0)
         }
     }(), THREE.Triangle.barycoordFromPoint = function() {
         var e = new THREE.Vector3,
             t = new THREE.Vector3,
             r = new THREE.Vector3;
         return function(i, n, a, o, s) {
             e.subVectors(o, n), t.subVectors(a, n), r.subVectors(i, n), i = e.dot(e), n = e.dot(t), a = e.dot(r);
             var h = t.dot(t);
             o = t.dot(r);
             var l = i * h - n * n;
             return s = s || new THREE.Vector3, 0 == l ? s.set(-2, -1, -1) : (l = 1 / l, h = (h * a - n * o) * l, i = (i * o - n * a) * l, s.set(1 - h - i, i, h))
         }
     }(), THREE.Triangle.containsPoint = function() {
         var e = new THREE.Vector3;
         return function(t, r, i, n) {
             return t = THREE.Triangle.barycoordFromPoint(t, r, i, n, e), 0 <= t.x && 0 <= t.y && 1 >= t.x + t.y
         }
     }(), THREE.Triangle.prototype = {
         constructor: THREE.Triangle,
         set: function(e, t, r) {
             return this.a.copy(e), this.b.copy(t), this.c.copy(r), this
         },
         setFromPointsAndIndices: function(e, t, r, i) {
             return this.a.copy(e[t]), this.b.copy(e[r]), this.c.copy(e[i]), this
         },
         copy: function(e) {
             return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this
         },
         area: function() {
             var e = new THREE.Vector3,
                 t = new THREE.Vector3;
             return function() {
                 return e.subVectors(this.c, this.b), t.subVectors(this.a, this.b), .5 * e.cross(t).length()
             }
         }(),
         midpoint: function(e) {
             return (e || new THREE.Vector3).addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
         },
         normal: function(e) {
             return THREE.Triangle.normal(this.a, this.b, this.c, e)
         },
         plane: function(e) {
             return (e || new THREE.Plane).setFromCoplanarPoints(this.a, this.b, this.c)
         },
         barycoordFromPoint: function(e, t) {
             return THREE.Triangle.barycoordFromPoint(e, this.a, this.b, this.c, t)
         },
         containsPoint: function(e) {
             return THREE.Triangle.containsPoint(e, this.a, this.b, this.c)
         },
         equals: function(e) {
             return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c)
         },
         clone: function() {
             return (new THREE.Triangle).copy(this)
         }
     }, THREE.Clock = function(e) {
         this.autoStart = void 0 !== e ? e : !0, this.elapsedTime = this.oldTime = this.startTime = 0, this.running = !1
     }, THREE.Clock.prototype = {
         constructor: THREE.Clock,
         start: function() {
             this.oldTime = this.startTime = void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now() : Date.now(), this.running = !0
         },
         stop: function() {
             this.getElapsedTime(), this.running = !1
         },
         getElapsedTime: function() {
             return this.getDelta(), this.elapsedTime
         },
         getDelta: function() {
             var e = 0;
             if (this.autoStart && !this.running && this.start(), this.running) {
                 var t = void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now() : Date.now(),
                     e = .001 * (t - this.oldTime);
                 this.oldTime = t, this.elapsedTime += e
             }
             return e
         }
     }, THREE.EventDispatcher = function() {}, THREE.EventDispatcher.prototype = {
         constructor: THREE.EventDispatcher,
         apply: function(e) {
             e.addEventListener = THREE.EventDispatcher.prototype.addEventListener, e.hasEventListener = THREE.EventDispatcher.prototype.hasEventListener, e.removeEventListener = THREE.EventDispatcher.prototype.removeEventListener, e.dispatchEvent = THREE.EventDispatcher.prototype.dispatchEvent
         },
         addEventListener: function(e, t) {
             void 0 === this._listeners && (this._listeners = {});
             var r = this._listeners;
             void 0 === r[e] && (r[e] = []), -1 === r[e].indexOf(t) && r[e].push(t)
         },
         hasEventListener: function(e, t) {
             if (void 0 === this._listeners) return !1;
             var r = this._listeners;
             return void 0 !== r[e] && -1 !== r[e].indexOf(t) ? !0 : !1
         },
         removeEventListener: function(e, t) {
             if (void 0 !== this._listeners) {
                 var r = this._listeners[e];
                 if (void 0 !== r) {
                     var i = r.indexOf(t); - 1 !== i && r.splice(i, 1)
                 }
             }
         },
         dispatchEvent: function(e) {
             if (void 0 !== this._listeners) {
                 var t = this._listeners[e.type];
                 if (void 0 !== t) {
                     e.target = this;
                     for (var r = [], i = t.length, n = 0; i > n; n++) r[n] = t[n];
                     for (n = 0; i > n; n++) r[n].call(this, e)
                 }
             }
         }
     },
     function(e) {
         e.Raycaster = function(t, r, i, n) {
             this.ray = new e.Ray(t, r), this.near = i || 0, this.far = n || 1 / 0, this.params = {
                 Sprite: {},
                 Mesh: {},
                 PointCloud: {
                     threshold: 1
                 },
                 LOD: {},
                 Line: {}
             }
         };
         var t = function(e, t) {
                 return e.distance - t.distance
             },
             r = function(e, t, i, n) {
                 if (e.raycast(t, i), !0 === n) {
                     e = e.children, n = 0;
                     for (var a = e.length; a > n; n++) r(e[n], t, i, !0)
                 }
             };
         e.Raycaster.prototype = {
             constructor: e.Raycaster,
             precision: 1e-4,
             linePrecision: 1,
             set: function(e, t) {
                 this.ray.set(e, t)
             },
             setFromCamera: function(t, r) {
                 r instanceof e.PerspectiveCamera ? (this.ray.origin.copy(r.position), this.ray.direction.set(t.x, t.y, .5).unproject(r).sub(r.position).normalize()) : r instanceof e.OrthographicCamera ? (this.ray.origin.set(t.x, t.y, -1).unproject(r), this.ray.direction.set(0, 0, -1).transformDirection(r.matrixWorld)) : e.error("THREE.Raycaster: Unsupported camera type.")
             },
             intersectObject: function(e, i) {
                 var n = [];
                 return r(e, this, n, i), n.sort(t), n
             },
             intersectObjects: function(i, n) {
                 var a = [];
                 if (!1 == i instanceof Array) return e.warn("THREE.Raycaster.intersectObjects: objects is not an Array."), a;
                 for (var o = 0, s = i.length; s > o; o++) r(i[o], this, a, n);
                 return a.sort(t), a
             }
         }
     }(THREE), THREE.Object3D = function() {
         Object.defineProperty(this, "id", {
             value: THREE.Object3DIdCount++
         }), this.uuid = THREE.Math.generateUUID(), this.name = "", this.type = "Object3D", this.parent = void 0, this.children = [], this.up = THREE.Object3D.DefaultUp.clone();
         var e = new THREE.Vector3,
             t = new THREE.Euler,
             r = new THREE.Quaternion,
             i = new THREE.Vector3(1, 1, 1);
         t.onChange(function() {
             r.setFromEuler(t, !1)
         }), r.onChange(function() {
             t.setFromQuaternion(r, void 0, !1)
         }), Object.defineProperties(this, {
             position: {
                 enumerable: !0,
                 value: e
             },
             rotation: {
                 enumerable: !0,
                 value: t
             },
             quaternion: {
                 enumerable: !0,
                 value: r
             },
             scale: {
                 enumerable: !0,
                 value: i
             }
         }), this.rotationAutoUpdate = !0, this.matrix = new THREE.Matrix4, this.matrixWorld = new THREE.Matrix4, this.matrixAutoUpdate = !0, this.matrixWorldNeedsUpdate = !1, this.visible = !0, this.receiveShadow = this.castShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.userData = {}
     }, THREE.Object3D.DefaultUp = new THREE.Vector3(0, 1, 0), THREE.Object3D.prototype = {
         constructor: THREE.Object3D,
         get eulerOrder() {
             return THREE.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order."), this.rotation.order
         },
         set eulerOrder(e) {
             THREE.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order."), this.rotation.order = e
         },
         get useQuaternion() {
             THREE.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
         },
         set useQuaternion(e) {
             THREE.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
         },
         applyMatrix: function(e) {
             this.matrix.multiplyMatrices(e, this.matrix), this.matrix.decompose(this.position, this.quaternion, this.scale)
         },
         setRotationFromAxisAngle: function(e, t) {
             this.quaternion.setFromAxisAngle(e, t)
         },
         setRotationFromEuler: function(e) {
             this.quaternion.setFromEuler(e, !0)
         },
         setRotationFromMatrix: function(e) {
             this.quaternion.setFromRotationMatrix(e)
         },
         setRotationFromQuaternion: function(e) {
             this.quaternion.copy(e)
         },
         rotateOnAxis: function() {
             var e = new THREE.Quaternion;
             return function(t, r) {
                 return e.setFromAxisAngle(t, r), this.quaternion.multiply(e), this
             }
         }(),
         rotateX: function() {
             var e = new THREE.Vector3(1, 0, 0);
             return function(t) {
                 return this.rotateOnAxis(e, t)
             }
         }(),
         rotateY: function() {
             var e = new THREE.Vector3(0, 1, 0);
             return function(t) {
                 return this.rotateOnAxis(e, t)
             }
         }(),
         rotateZ: function() {
             var e = new THREE.Vector3(0, 0, 1);
             return function(t) {
                 return this.rotateOnAxis(e, t)
             }
         }(),
         translateOnAxis: function() {
             var e = new THREE.Vector3;
             return function(t, r) {
                 return e.copy(t).applyQuaternion(this.quaternion), this.position.add(e.multiplyScalar(r)), this
             }
         }(),
         translate: function(e, t) {
             return THREE.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."), this.translateOnAxis(t, e)
         },
         translateX: function() {
             var e = new THREE.Vector3(1, 0, 0);
             return function(t) {
                 return this.translateOnAxis(e, t)
             }
         }(),
         translateY: function() {
             var e = new THREE.Vector3(0, 1, 0);
             return function(t) {
                 return this.translateOnAxis(e, t)
             }
         }(),
         translateZ: function() {
             var e = new THREE.Vector3(0, 0, 1);
             return function(t) {
                 return this.translateOnAxis(e, t)
             }
         }(),
         localToWorld: function(e) {
             return e.applyMatrix4(this.matrixWorld)
         },
         worldToLocal: function() {
             var e = new THREE.Matrix4;
             return function(t) {
                 return t.applyMatrix4(e.getInverse(this.matrixWorld))
             }
         }(),
         lookAt: function() {
             var e = new THREE.Matrix4;
             return function(t) {
                 e.lookAt(t, this.position, this.up), this.quaternion.setFromRotationMatrix(e)
             }
         }(),
         add: function(e) {
             if (1 < arguments.length) {
                 for (var t = 0; t < arguments.length; t++) this.add(arguments[t]);
                 return this
             }
             return e === this ? (THREE.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e instanceof THREE.Object3D ? (void 0 !== e.parent && e.parent.remove(e), e.parent = this, e.dispatchEvent({
                 type: "added"
             }), this.children.push(e)) : THREE.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this)
         },
         remove: function(e) {
             if (1 < arguments.length)
                 for (var t = 0; t < arguments.length; t++) this.remove(arguments[t]);
             t = this.children.indexOf(e), -1 !== t && (e.parent = void 0, e.dispatchEvent({
                 type: "removed"
             }), this.children.splice(t, 1))
         },
         getChildByName: function(e) {
             return THREE.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."), this.getObjectByName(e)
         },
         getObjectById: function(e) {
             return this.getObjectByProperty("id", e)
         },
         getObjectByName: function(e) {
             return this.getObjectByProperty("name", e)
         },
         getObjectByProperty: function(e, t) {
             if (this[e] === t) return this;
             for (var r = 0, i = this.children.length; i > r; r++) {
                 var n = this.children[r].getObjectByProperty(e, t);
                 if (void 0 !== n) return n
             }
         },
         getWorldPosition: function(e) {
             return e = e || new THREE.Vector3, this.updateMatrixWorld(!0), e.setFromMatrixPosition(this.matrixWorld)
         },
         getWorldQuaternion: function() {
             var e = new THREE.Vector3,
                 t = new THREE.Vector3;
             return function(r) {
                 return r = r || new THREE.Quaternion, this.updateMatrixWorld(!0), this.matrixWorld.decompose(e, r, t), r
             }
         }(),
         getWorldRotation: function() {
             var e = new THREE.Quaternion;
             return function(t) {
                 return t = t || new THREE.Euler, this.getWorldQuaternion(e), t.setFromQuaternion(e, this.rotation.order, !1)
             }
         }(),
         getWorldScale: function() {
             var e = new THREE.Vector3,
                 t = new THREE.Quaternion;
             return function(r) {
                 return r = r || new THREE.Vector3, this.updateMatrixWorld(!0), this.matrixWorld.decompose(e, t, r), r
             }
         }(),
         getWorldDirection: function() {
             var e = new THREE.Quaternion;
             return function(t) {
                 return t = t || new THREE.Vector3, this.getWorldQuaternion(e), t.set(0, 0, 1).applyQuaternion(e)
             }
         }(),
         raycast: function() {},
         traverse: function(e) {
             e(this);
             for (var t = 0, r = this.children.length; r > t; t++) this.children[t].traverse(e)
         },
         traverseVisible: function(e) {
             if (!1 !== this.visible) {
                 e(this);
                 for (var t = 0, r = this.children.length; r > t; t++) this.children[t].traverseVisible(e)
             }
         },
         traverseAncestors: function(e) {
             this.parent && (e(this.parent), this.parent.traverseAncestors(e))
         },
         updateMatrix: function() {
             this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
         },
         updateMatrixWorld: function(e) {
             !0 === this.matrixAutoUpdate && this.updateMatrix(), (!0 === this.matrixWorldNeedsUpdate || !0 === e) && (void 0 === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
             for (var t = 0, r = this.children.length; r > t; t++) this.children[t].updateMatrixWorld(e)
         },
         toJSON: function() {
             var e = {
                     metadata: {
                         version: 4.3,
                         type: "Object",
                         generator: "ObjectExporter"
                     }
                 },
                 t = {},
                 r = {},
                 i = function(t) {
                     if (void 0 === e.materials && (e.materials = []), void 0 === r[t.uuid]) {
                         var i = t.toJSON();
                         delete i.metadata, r[t.uuid] = i, e.materials.push(i)
                     }
                     return t.uuid
                 },
                 n = function(r) {
                     var a = {};
                     if (a.uuid = r.uuid, a.type = r.type, "" !== r.name && (a.name = r.name), "{}" !== JSON.stringify(r.userData) && (a.userData = r.userData), !0 !== r.visible && (a.visible = r.visible), r instanceof THREE.PerspectiveCamera) a.fov = r.fov, a.aspect = r.aspect, a.near = r.near, a.far = r.far;
                     else if (r instanceof THREE.OrthographicCamera) a.left = r.left, a.right = r.right, a.top = r.top, a.bottom = r.bottom, a.near = r.near, a.far = r.far;
                     else if (r instanceof THREE.AmbientLight) a.color = r.color.getHex();
                     else if (r instanceof THREE.DirectionalLight) a.color = r.color.getHex(), a.intensity = r.intensity;
                     else if (r instanceof THREE.PointLight) a.color = r.color.getHex(), a.intensity = r.intensity, a.distance = r.distance, a.decay = r.decay;
                     else if (r instanceof THREE.SpotLight) a.color = r.color.getHex(), a.intensity = r.intensity, a.distance = r.distance, a.angle = r.angle, a.exponent = r.exponent, a.decay = r.decay;
                     else if (r instanceof THREE.HemisphereLight) a.color = r.color.getHex(), a.groundColor = r.groundColor.getHex();
                     else if (r instanceof THREE.Mesh || r instanceof THREE.Line || r instanceof THREE.PointCloud) {
                         var o = r.geometry;
                         if (void 0 === e.geometries && (e.geometries = []), void 0 === t[o.uuid]) {
                             var s = o.toJSON();
                             delete s.metadata, t[o.uuid] = s, e.geometries.push(s)
                         }
                         a.geometry = o.uuid, a.material = i(r.material), r instanceof THREE.Line && (a.mode = r.mode)
                     } else r instanceof THREE.Sprite && (a.material = i(r.material));
                     if (a.matrix = r.matrix.toArray(), 0 < r.children.length)
                         for (a.children = [], o = 0; o < r.children.length; o++) a.children.push(n(r.children[o]));
                     return a
                 };
             return e.object = n(this), e
         },
         clone: function(e, t) {
             if (void 0 === e && (e = new THREE.Object3D), void 0 === t && (t = !0), e.name = this.name, e.up.copy(this.up), e.position.copy(this.position), e.quaternion.copy(this.quaternion), e.scale.copy(this.scale), e.rotationAutoUpdate = this.rotationAutoUpdate, e.matrix.copy(this.matrix), e.matrixWorld.copy(this.matrixWorld), e.matrixAutoUpdate = this.matrixAutoUpdate, e.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate, e.visible = this.visible, e.castShadow = this.castShadow, e.receiveShadow = this.receiveShadow, e.frustumCulled = this.frustumCulled, e.userData = JSON.parse(JSON.stringify(this.userData)), !0 === t)
                 for (var r = 0; r < this.children.length; r++) e.add(this.children[r].clone());
             return e
         }
     }, THREE.EventDispatcher.prototype.apply(THREE.Object3D.prototype), THREE.Object3DIdCount = 0, THREE.Face3 = function(e, t, r, i, n, a) {
         this.a = e, this.b = t, this.c = r, this.normal = i instanceof THREE.Vector3 ? i : new THREE.Vector3, this.vertexNormals = i instanceof Array ? i : [], this.color = n instanceof THREE.Color ? n : new THREE.Color, this.vertexColors = n instanceof Array ? n : [], this.vertexTangents = [], this.materialIndex = void 0 !== a ? a : 0
     }, THREE.Face3.prototype = {
         constructor: THREE.Face3,
         clone: function() {
             var e = new THREE.Face3(this.a, this.b, this.c);
             e.normal.copy(this.normal), e.color.copy(this.color), e.materialIndex = this.materialIndex;
             for (var t = 0, r = this.vertexNormals.length; r > t; t++) e.vertexNormals[t] = this.vertexNormals[t].clone();
             for (t = 0, r = this.vertexColors.length; r > t; t++) e.vertexColors[t] = this.vertexColors[t].clone();
             for (t = 0, r = this.vertexTangents.length; r > t; t++) e.vertexTangents[t] = this.vertexTangents[t].clone();
             return e
         }
     }, THREE.Face4 = function(e, t, r, i, n, a, o) {
         return THREE.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead."), new THREE.Face3(e, t, r, n, a, o)
     }, THREE.BufferAttribute = function(e, t) {
         this.array = e, this.itemSize = t, this.needsUpdate = !1
     }, THREE.BufferAttribute.prototype = {
         constructor: THREE.BufferAttribute,
         get length() {
             return this.array.length
         },
         copyAt: function(e, t, r) {
             e *= this.itemSize, r *= t.itemSize;
             for (var i = 0, n = this.itemSize; n > i; i++) this.array[e + i] = t.array[r + i];
             return this
         },
         set: function(e, t) {
             return void 0 === t && (t = 0), this.array.set(e, t), this
         },
         setX: function(e, t) {
             return this.array[e * this.itemSize] = t, this
         },
         setY: function(e, t) {
             return this.array[e * this.itemSize + 1] = t, this
         },
         setZ: function(e, t) {
             return this.array[e * this.itemSize + 2] = t, this
         },
         setXY: function(e, t, r) {
             return e *= this.itemSize, this.array[e] = t, this.array[e + 1] = r, this
         },
         setXYZ: function(e, t, r, i) {
             return e *= this.itemSize, this.array[e] = t, this.array[e + 1] = r, this.array[e + 2] = i, this
         },
         setXYZW: function(e, t, r, i, n) {
             return e *= this.itemSize, this.array[e] = t, this.array[e + 1] = r, this.array[e + 2] = i, this.array[e + 3] = n, this
         },
         clone: function() {
             return new THREE.BufferAttribute(new this.array.constructor(this.array), this.itemSize)
         }
     }, THREE.Int8Attribute = function(e, t) {
         return THREE.warn("THREE.Int8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(e, t)
     }, THREE.Uint8Attribute = function(e, t) {
         return THREE.warn("THREE.Uint8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(e, t)
     }, THREE.Uint8ClampedAttribute = function(e, t) {
         return THREE.warn("THREE.Uint8ClampedAttribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(e, t)
     }, THREE.Int16Attribute = function(e, t) {
         return THREE.warn("THREE.Int16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(e, t)
     }, THREE.Uint16Attribute = function(e, t) {
         return THREE.warn("THREE.Uint16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(e, t)
     }, THREE.Int32Attribute = function(e, t) {
         return THREE.warn("THREE.Int32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(e, t)
     }, THREE.Uint32Attribute = function(e, t) {
         return THREE.warn("THREE.Uint32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(e, t)
     }, THREE.Float32Attribute = function(e, t) {
         return THREE.warn("THREE.Float32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(e, t)
     }, THREE.Float64Attribute = function(e, t) {
         return THREE.warn("THREE.Float64Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(e, t)
     }, THREE.DynamicBufferAttribute = function(e, t) {
         THREE.BufferAttribute.call(this, e, t), this.updateRange = {
             offset: 0,
             count: -1
         }
     }, THREE.DynamicBufferAttribute.prototype = Object.create(THREE.BufferAttribute.prototype), THREE.DynamicBufferAttribute.prototype.constructor = THREE.DynamicBufferAttribute, THREE.DynamicBufferAttribute.prototype.clone = function() {
         return new THREE.DynamicBufferAttribute(new this.array.constructor(this.array), this.itemSize)
     }, THREE.BufferGeometry = function() {
         Object.defineProperty(this, "id", {
             value: THREE.GeometryIdCount++
         }), this.uuid = THREE.Math.generateUUID(), this.name = "", this.type = "BufferGeometry", this.attributes = {}, this.attributesKeys = [], this.offsets = this.drawcalls = [], this.boundingSphere = this.boundingBox = null
     }, THREE.BufferGeometry.prototype = {
         constructor: THREE.BufferGeometry,
         addAttribute: function(e, t, r) {
             !1 == t instanceof THREE.BufferAttribute ? (THREE.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), this.attributes[e] = {
                 array: t,
                 itemSize: r
             }) : (this.attributes[e] = t, this.attributesKeys = Object.keys(this.attributes))
         },
         getAttribute: function(e) {
             return this.attributes[e]
         },
         addDrawCall: function(e, t, r) {
             this.drawcalls.push({
                 start: e,
                 count: t,
                 index: void 0 !== r ? r : 0
             })
         },
         applyMatrix: function(e) {
             var t = this.attributes.position;
             void 0 !== t && (e.applyToVector3Array(t.array), t.needsUpdate = !0), t = this.attributes.normal, void 0 !== t && ((new THREE.Matrix3).getNormalMatrix(e).applyToVector3Array(t.array), t.needsUpdate = !0), null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere()
         },
         center: function() {
             this.computeBoundingBox();
             var e = this.boundingBox.center().negate();
             return this.applyMatrix((new THREE.Matrix4).setPosition(e)), e
         },
         fromGeometry: function(e, t) {
             t = t || {
                 vertexColors: THREE.NoColors
             };
             var r = e.vertices,
                 i = e.faces,
                 n = e.faceVertexUvs,
                 a = t.vertexColors,
                 o = 0 < n[0].length,
                 s = 3 == i[0].vertexNormals.length,
                 h = new Float32Array(9 * i.length);
             this.addAttribute("position", new THREE.BufferAttribute(h, 3));
             var l = new Float32Array(9 * i.length);
             if (this.addAttribute("normal", new THREE.BufferAttribute(l, 3)), a !== THREE.NoColors) {
                 var u = new Float32Array(9 * i.length);
                 this.addAttribute("color", new THREE.BufferAttribute(u, 3))
             }
             if (!0 === o) {
                 var c = new Float32Array(6 * i.length);
                 this.addAttribute("uv", new THREE.BufferAttribute(c, 2))
             }
             for (var d = 0, f = 0, p = 0; d < i.length; d++, f += 6, p += 9) {
                 var m = i[d],
                     E = r[m.a],
                     g = r[m.b],
                     v = r[m.c];
                 h[p] = E.x, h[p + 1] = E.y, h[p + 2] = E.z, h[p + 3] = g.x, h[p + 4] = g.y, h[p + 5] = g.z, h[p + 6] = v.x, h[p + 7] = v.y, h[p + 8] = v.z, !0 === s ? (E = m.vertexNormals[0], g = m.vertexNormals[1], v = m.vertexNormals[2], l[p] = E.x, l[p + 1] = E.y, l[p + 2] = E.z, l[p + 3] = g.x, l[p + 4] = g.y, l[p + 5] = g.z, l[p + 6] = v.x, l[p + 7] = v.y, l[p + 8] = v.z) : (E = m.normal, l[p] = E.x, l[p + 1] = E.y, l[p + 2] = E.z, l[p + 3] = E.x, l[p + 4] = E.y, l[p + 5] = E.z, l[p + 6] = E.x, l[p + 7] = E.y, l[p + 8] = E.z), a === THREE.FaceColors ? (m = m.color, u[p] = m.r, u[p + 1] = m.g, u[p + 2] = m.b, u[p + 3] = m.r, u[p + 4] = m.g, u[p + 5] = m.b, u[p + 6] = m.r, u[p + 7] = m.g, u[p + 8] = m.b) : a === THREE.VertexColors && (E = m.vertexColors[0], g = m.vertexColors[1], m = m.vertexColors[2], u[p] = E.r, u[p + 1] = E.g, u[p + 2] = E.b, u[p + 3] = g.r, u[p + 4] = g.g, u[p + 5] = g.b, u[p + 6] = m.r, u[p + 7] = m.g, u[p + 8] = m.b), !0 === o && (m = n[0][d][0], E = n[0][d][1], g = n[0][d][2], c[f] = m.x, c[f + 1] = m.y, c[f + 2] = E.x, c[f + 3] = E.y, c[f + 4] = g.x, c[f + 5] = g.y)
             }
             return this.computeBoundingSphere(), this
         },
         computeBoundingBox: function() {
             var e = new THREE.Vector3;
             return function() {
                 null === this.boundingBox && (this.boundingBox = new THREE.Box3);
                 var t = this.attributes.position.array;
                 if (t) {
                     var r = this.boundingBox;
                     r.makeEmpty();
                     for (var i = 0, n = t.length; n > i; i += 3) e.set(t[i], t[i + 1], t[i + 2]), r.expandByPoint(e)
                 }(void 0 === t || 0 === t.length) && (this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0)), (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && THREE.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.')
             }
         }(),
         computeBoundingSphere: function() {
             var e = new THREE.Box3,
                 t = new THREE.Vector3;
             return function() {
                 null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere);
                 var r = this.attributes.position.array;
                 if (r) {
                     e.makeEmpty();
                     for (var i = this.boundingSphere.center, n = 0, a = r.length; a > n; n += 3) t.set(r[n], r[n + 1], r[n + 2]), e.expandByPoint(t);
                     e.center(i);
                     for (var o = 0, n = 0, a = r.length; a > n; n += 3) t.set(r[n], r[n + 1], r[n + 2]), o = Math.max(o, i.distanceToSquared(t));
                     this.boundingSphere.radius = Math.sqrt(o), isNaN(this.boundingSphere.radius) && THREE.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.')
                 }
             }
         }(),
         computeFaceNormals: function() {},
         computeVertexNormals: function() {
             var e = this.attributes;
             if (e.position) {
                 var t = e.position.array;
                 if (void 0 === e.normal) this.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(t.length), 3));
                 else
                     for (var r = e.normal.array, i = 0, n = r.length; n > i; i++) r[i] = 0;
                 var r = e.normal.array,
                     a, o, s, h = new THREE.Vector3,
                     l = new THREE.Vector3,
                     u = new THREE.Vector3,
                     c = new THREE.Vector3,
                     d = new THREE.Vector3;
                 if (e.index)
                     for (var f = e.index.array, p = 0 < this.offsets.length ? this.offsets : [{
                             start: 0,
                             count: f.length,
                             index: 0
                         }], m = 0, E = p.length; E > m; ++m) {
                         n = p[m].start, a = p[m].count;
                         for (var g = p[m].index, i = n, n = n + a; n > i; i += 3) a = 3 * (g + f[i]), o = 3 * (g + f[i + 1]), s = 3 * (g + f[i + 2]), h.fromArray(t, a), l.fromArray(t, o), u.fromArray(t, s), c.subVectors(u, l), d.subVectors(h, l), c.cross(d), r[a] += c.x, r[a + 1] += c.y, r[a + 2] += c.z, r[o] += c.x, r[o + 1] += c.y, r[o + 2] += c.z, r[s] += c.x, r[s + 1] += c.y, r[s + 2] += c.z
                     } else
                         for (i = 0, n = t.length; n > i; i += 9) h.fromArray(t, i), l.fromArray(t, i + 3), u.fromArray(t, i + 6), c.subVectors(u, l), d.subVectors(h, l), c.cross(d), r[i] = c.x, r[i + 1] = c.y, r[i + 2] = c.z, r[i + 3] = c.x, r[i + 4] = c.y, r[i + 5] = c.z, r[i + 6] = c.x, r[i + 7] = c.y, r[i + 8] = c.z;
                 this.normalizeNormals(), e.normal.needsUpdate = !0
             }
         },
         computeTangents: function() {
             function e(e, t, r) {
                 c.fromArray(i, 3 * e), d.fromArray(i, 3 * t), f.fromArray(i, 3 * r), p.fromArray(a, 2 * e), m.fromArray(a, 2 * t), E.fromArray(a, 2 * r), g = d.x - c.x, v = f.x - c.x,
                     y = d.y - c.y, T = f.y - c.y, R = d.z - c.z, x = f.z - c.z, H = m.x - p.x, _ = E.x - p.x, b = m.y - p.y, w = E.y - p.y, M = 1 / (H * w - _ * b), S.set((w * g - b * v) * M, (w * y - b * T) * M, (w * R - b * x) * M), C.set((H * v - _ * g) * M, (H * T - _ * y) * M, (H * x - _ * R) * M), h[e].add(S), h[t].add(S), h[r].add(S), l[e].add(C), l[t].add(C), l[r].add(C)
             }

             function t(e) {
                 O.fromArray(n, 3 * e), U.copy(O), z = h[e], N.copy(z), N.sub(O.multiplyScalar(O.dot(z))).normalize(), I.crossVectors(U, z), G = I.dot(l[e]), V = 0 > G ? -1 : 1, s[4 * e] = N.x, s[4 * e + 1] = N.y, s[4 * e + 2] = N.z, s[4 * e + 3] = V
             }
             if (void 0 === this.attributes.index || void 0 === this.attributes.position || void 0 === this.attributes.normal || void 0 === this.attributes.uv) THREE.warn("THREE.BufferGeometry: Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");
             else {
                 var r = this.attributes.index.array,
                     i = this.attributes.position.array,
                     n = this.attributes.normal.array,
                     a = this.attributes.uv.array,
                     o = i.length / 3;
                 void 0 === this.attributes.tangent && this.addAttribute("tangent", new THREE.BufferAttribute(new Float32Array(4 * o), 4));
                 for (var s = this.attributes.tangent.array, h = [], l = [], u = 0; o > u; u++) h[u] = new THREE.Vector3, l[u] = new THREE.Vector3;
                 var c = new THREE.Vector3,
                     d = new THREE.Vector3,
                     f = new THREE.Vector3,
                     p = new THREE.Vector2,
                     m = new THREE.Vector2,
                     E = new THREE.Vector2,
                     g, v, y, T, R, x, H, _, b, w, M, S = new THREE.Vector3,
                     C = new THREE.Vector3,
                     A, L, P, D, F;
                 0 === this.drawcalls.length && this.addDrawCall(0, r.length, 0);
                 var k = this.drawcalls,
                     u = 0;
                 for (L = k.length; L > u; ++u) {
                     A = k[u].start, P = k[u].count;
                     var B = k[u].index,
                         o = A;
                     for (A += P; A > o; o += 3) P = B + r[o], D = B + r[o + 1], F = B + r[o + 2], e(P, D, F)
                 }
                 var N = new THREE.Vector3,
                     I = new THREE.Vector3,
                     O = new THREE.Vector3,
                     U = new THREE.Vector3,
                     V, z, G, u = 0;
                 for (L = k.length; L > u; ++u)
                     for (A = k[u].start, P = k[u].count, B = k[u].index, o = A, A += P; A > o; o += 3) P = B + r[o], D = B + r[o + 1], F = B + r[o + 2], t(P), t(D), t(F)
             }
         },
         computeOffsets: function(e) {
             void 0 === e && (e = 65535);
             for (var t = this.attributes.index.array, r = this.attributes.position.array, i = t.length / 3, n = new Uint16Array(t.length), a = 0, o = 0, s = [{
                     start: 0,
                     count: 0,
                     index: 0
                 }], h = s[0], l = 0, u = 0, c = new Int32Array(6), d = new Int32Array(r.length), f = new Int32Array(r.length), p = 0; p < r.length; p++) d[p] = -1, f[p] = -1;
             for (r = 0; i > r; r++) {
                 for (var m = u = 0; 3 > m; m++) p = t[3 * r + m], -1 == d[p] ? (c[2 * m] = p, c[2 * m + 1] = -1, u++) : d[p] < h.index ? (c[2 * m] = p, c[2 * m + 1] = -1, l++) : (c[2 * m] = p, c[2 * m + 1] = d[p]);
                 if (o + u > h.index + e)
                     for (h = {
                             start: a,
                             count: 0,
                             index: o
                         }, s.push(h), u = 0; 6 > u; u += 2) m = c[u + 1], m > -1 && m < h.index && (c[u + 1] = -1);
                 for (u = 0; 6 > u; u += 2) p = c[u], m = c[u + 1], -1 === m && (m = o++), d[p] = m, f[m] = p, n[a++] = m - h.index, h.count++
             }
             return this.reorderBuffers(n, f, o), this.drawcalls = this.offsets = s
         },
         merge: function(e, t) {
             if (!1 != e instanceof THREE.BufferGeometry) {
                 void 0 === t && (t = 0);
                 var r = this.attributes,
                     i;
                 for (i in r)
                     if (void 0 !== e.attributes[i])
                         for (var n = r[i].array, a = e.attributes[i], o = a.array, s = 0, a = a.itemSize * t; s < o.length; s++, a++) n[a] = o[s];
                 return this
             }
             THREE.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", e)
         },
         normalizeNormals: function() {
             for (var e = this.attributes.normal.array, t, r, i, n = 0, a = e.length; a > n; n += 3) t = e[n], r = e[n + 1], i = e[n + 2], t = 1 / Math.sqrt(t * t + r * r + i * i), e[n] *= t, e[n + 1] *= t, e[n + 2] *= t
         },
         reorderBuffers: function(e, t, r) {
             var i = {},
                 n;
             for (n in this.attributes) "index" != n && (i[n] = new this.attributes[n].array.constructor(this.attributes[n].itemSize * r));
             for (var a = 0; r > a; a++) {
                 var o = t[a];
                 for (n in this.attributes)
                     if ("index" != n)
                         for (var s = this.attributes[n].array, h = this.attributes[n].itemSize, l = i[n], u = 0; h > u; u++) l[a * h + u] = s[o * h + u]
             }
             this.attributes.index.array = e;
             for (n in this.attributes) "index" != n && (this.attributes[n].array = i[n], this.attributes[n].numItems = this.attributes[n].itemSize * r)
         },
         toJSON: function() {
             var e = {
                     metadata: {
                         version: 4,
                         type: "BufferGeometry",
                         generator: "BufferGeometryExporter"
                     },
                     uuid: this.uuid,
                     type: this.type,
                     data: {
                         attributes: {}
                     }
                 },
                 t = this.attributes,
                 r = this.offsets,
                 i = this.boundingSphere,
                 n;
             for (n in t) {
                 var a = t[n],
                     o = Array.prototype.slice.call(a.array);
                 e.data.attributes[n] = {
                     itemSize: a.itemSize,
                     type: a.array.constructor.name,
                     array: o
                 }
             }
             return 0 < r.length && (e.data.offsets = JSON.parse(JSON.stringify(r))), null !== i && (e.data.boundingSphere = {
                 center: i.center.toArray(),
                 radius: i.radius
             }), e
         },
         clone: function() {
             var e = new THREE.BufferGeometry,
                 t;
             for (t in this.attributes) e.addAttribute(t, this.attributes[t].clone());
             t = 0;
             for (var r = this.offsets.length; r > t; t++) {
                 var i = this.offsets[t];
                 e.offsets.push({
                     start: i.start,
                     index: i.index,
                     count: i.count
                 })
             }
             return e
         },
         dispose: function() {
             this.dispatchEvent({
                 type: "dispose"
             })
         }
     }, THREE.EventDispatcher.prototype.apply(THREE.BufferGeometry.prototype), THREE.Geometry = function() {
         Object.defineProperty(this, "id", {
             value: THREE.GeometryIdCount++
         }), this.uuid = THREE.Math.generateUUID(), this.name = "", this.type = "Geometry", this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [
             []
         ], this.morphTargets = [], this.morphColors = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingSphere = this.boundingBox = null, this.hasTangents = !1, this.dynamic = !0, this.groupsNeedUpdate = this.lineDistancesNeedUpdate = this.colorsNeedUpdate = this.tangentsNeedUpdate = this.normalsNeedUpdate = this.uvsNeedUpdate = this.elementsNeedUpdate = this.verticesNeedUpdate = !1
     }, THREE.Geometry.prototype = {
         constructor: THREE.Geometry,
         applyMatrix: function(e) {
             for (var t = (new THREE.Matrix3).getNormalMatrix(e), r = 0, i = this.vertices.length; i > r; r++) this.vertices[r].applyMatrix4(e);
             for (r = 0, i = this.faces.length; i > r; r++) {
                 e = this.faces[r], e.normal.applyMatrix3(t).normalize();
                 for (var n = 0, a = e.vertexNormals.length; a > n; n++) e.vertexNormals[n].applyMatrix3(t).normalize()
             }
             null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this.normalsNeedUpdate = this.verticesNeedUpdate = !0
         },
         fromBufferGeometry: function(e) {
             for (var t = this, r = e.attributes, i = r.position.array, n = void 0 !== r.index ? r.index.array : void 0, a = void 0 !== r.normal ? r.normal.array : void 0, o = void 0 !== r.color ? r.color.array : void 0, s = void 0 !== r.uv ? r.uv.array : void 0, h = [], l = [], u = r = 0; r < i.length; r += 3, u += 2) t.vertices.push(new THREE.Vector3(i[r], i[r + 1], i[r + 2])), void 0 !== a && h.push(new THREE.Vector3(a[r], a[r + 1], a[r + 2])), void 0 !== o && t.colors.push(new THREE.Color(o[r], o[r + 1], o[r + 2])), void 0 !== s && l.push(new THREE.Vector2(s[u], s[u + 1]));
             var c = function(e, r, i) {
                 var n = void 0 !== a ? [h[e].clone(), h[r].clone(), h[i].clone()] : [],
                     u = void 0 !== o ? [t.colors[e].clone(), t.colors[r].clone(), t.colors[i].clone()] : [];
                 t.faces.push(new THREE.Face3(e, r, i, n, u)), void 0 !== s && t.faceVertexUvs[0].push([l[e].clone(), l[r].clone(), l[i].clone()])
             };
             if (void 0 !== n)
                 if (i = e.drawcalls, 0 < i.length)
                     for (r = 0; r < i.length; r++)
                         for (var u = i[r], d = u.start, f = u.count, p = u.index, u = d, d = d + f; d > u; u += 3) c(p + n[u], p + n[u + 1], p + n[u + 2]);
                 else
                     for (r = 0; r < n.length; r += 3) c(n[r], n[r + 1], n[r + 2]);
             else
                 for (r = 0; r < i.length / 3; r += 3) c(r, r + 1, r + 2);
             return this.computeFaceNormals(), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), this
         },
         center: function() {
             this.computeBoundingBox();
             var e = this.boundingBox.center().negate();
             return this.applyMatrix((new THREE.Matrix4).setPosition(e)), e
         },
         computeFaceNormals: function() {
             for (var e = new THREE.Vector3, t = new THREE.Vector3, r = 0, i = this.faces.length; i > r; r++) {
                 var n = this.faces[r],
                     a = this.vertices[n.a],
                     o = this.vertices[n.b];
                 e.subVectors(this.vertices[n.c], o), t.subVectors(a, o), e.cross(t), e.normalize(), n.normal.copy(e)
             }
         },
         computeVertexNormals: function(e) {
             var t, r, i;
             for (i = Array(this.vertices.length), t = 0, r = this.vertices.length; r > t; t++) i[t] = new THREE.Vector3;
             if (e) {
                 var n, a, o, s = new THREE.Vector3,
                     h = new THREE.Vector3;
                 for (e = 0, t = this.faces.length; t > e; e++) r = this.faces[e], n = this.vertices[r.a], a = this.vertices[r.b], o = this.vertices[r.c], s.subVectors(o, a), h.subVectors(n, a), s.cross(h), i[r.a].add(s), i[r.b].add(s), i[r.c].add(s)
             } else
                 for (e = 0, t = this.faces.length; t > e; e++) r = this.faces[e], i[r.a].add(r.normal), i[r.b].add(r.normal), i[r.c].add(r.normal);
             for (t = 0, r = this.vertices.length; r > t; t++) i[t].normalize();
             for (e = 0, t = this.faces.length; t > e; e++) r = this.faces[e], r.vertexNormals[0] = i[r.a].clone(), r.vertexNormals[1] = i[r.b].clone(), r.vertexNormals[2] = i[r.c].clone()
         },
         computeMorphNormals: function() {
             var e, t, r, i, n;
             for (r = 0, i = this.faces.length; i > r; r++)
                 for (n = this.faces[r], n.__originalFaceNormal ? n.__originalFaceNormal.copy(n.normal) : n.__originalFaceNormal = n.normal.clone(), n.__originalVertexNormals || (n.__originalVertexNormals = []), e = 0, t = n.vertexNormals.length; t > e; e++) n.__originalVertexNormals[e] ? n.__originalVertexNormals[e].copy(n.vertexNormals[e]) : n.__originalVertexNormals[e] = n.vertexNormals[e].clone();
             var a = new THREE.Geometry;
             for (a.faces = this.faces, e = 0, t = this.morphTargets.length; t > e; e++) {
                 if (!this.morphNormals[e]) {
                     this.morphNormals[e] = {}, this.morphNormals[e].faceNormals = [], this.morphNormals[e].vertexNormals = [], n = this.morphNormals[e].faceNormals;
                     var o = this.morphNormals[e].vertexNormals,
                         s, h;
                     for (r = 0, i = this.faces.length; i > r; r++) s = new THREE.Vector3, h = {
                         a: new THREE.Vector3,
                         b: new THREE.Vector3,
                         c: new THREE.Vector3
                     }, n.push(s), o.push(h)
                 }
                 for (o = this.morphNormals[e], a.vertices = this.morphTargets[e].vertices, a.computeFaceNormals(), a.computeVertexNormals(), r = 0, i = this.faces.length; i > r; r++) n = this.faces[r], s = o.faceNormals[r], h = o.vertexNormals[r], s.copy(n.normal), h.a.copy(n.vertexNormals[0]), h.b.copy(n.vertexNormals[1]), h.c.copy(n.vertexNormals[2])
             }
             for (r = 0, i = this.faces.length; i > r; r++) n = this.faces[r], n.normal = n.__originalFaceNormal, n.vertexNormals = n.__originalVertexNormals
         },
         computeTangents: function() {
             var e, t, r, i, n, a, o, s, h, l, u, c, d, f, p, m, E, g = [],
                 v = [];
             r = new THREE.Vector3;
             var y = new THREE.Vector3,
                 T = new THREE.Vector3,
                 R = new THREE.Vector3,
                 x = new THREE.Vector3;
             for (e = 0, t = this.vertices.length; t > e; e++) g[e] = new THREE.Vector3, v[e] = new THREE.Vector3;
             for (e = 0, t = this.faces.length; t > e; e++) n = this.faces[e], a = this.faceVertexUvs[0][e], i = n.a, E = n.b, n = n.c, o = this.vertices[i], s = this.vertices[E], h = this.vertices[n], l = a[0], u = a[1], c = a[2], a = s.x - o.x, d = h.x - o.x, f = s.y - o.y, p = h.y - o.y, s = s.z - o.z, o = h.z - o.z, h = u.x - l.x, m = c.x - l.x, u = u.y - l.y, l = c.y - l.y, c = 1 / (h * l - m * u), r.set((l * a - u * d) * c, (l * f - u * p) * c, (l * s - u * o) * c), y.set((h * d - m * a) * c, (h * p - m * f) * c, (h * o - m * s) * c), g[i].add(r), g[E].add(r), g[n].add(r), v[i].add(y), v[E].add(y), v[n].add(y);
             for (y = ["a", "b", "c", "d"], e = 0, t = this.faces.length; t > e; e++)
                 for (n = this.faces[e], r = 0; r < Math.min(n.vertexNormals.length, 3); r++) x.copy(n.vertexNormals[r]), i = n[y[r]], E = g[i], T.copy(E), T.sub(x.multiplyScalar(x.dot(E))).normalize(), R.crossVectors(n.vertexNormals[r], E), i = R.dot(v[i]), i = 0 > i ? -1 : 1, n.vertexTangents[r] = new THREE.Vector4(T.x, T.y, T.z, i);
             this.hasTangents = !0
         },
         computeLineDistances: function() {
             for (var e = 0, t = this.vertices, r = 0, i = t.length; i > r; r++) r > 0 && (e += t[r].distanceTo(t[r - 1])), this.lineDistances[r] = e
         },
         computeBoundingBox: function() {
             null === this.boundingBox && (this.boundingBox = new THREE.Box3), this.boundingBox.setFromPoints(this.vertices)
         },
         computeBoundingSphere: function() {
             null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere), this.boundingSphere.setFromPoints(this.vertices)
         },
         merge: function(e, t, r) {
             if (!1 == e instanceof THREE.Geometry) THREE.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", e);
             else {
                 var i, n = this.vertices.length,
                     a = this.vertices,
                     o = e.vertices,
                     s = this.faces,
                     h = e.faces,
                     l = this.faceVertexUvs[0];
                 e = e.faceVertexUvs[0], void 0 === r && (r = 0), void 0 !== t && (i = (new THREE.Matrix3).getNormalMatrix(t));
                 for (var u = 0, c = o.length; c > u; u++) {
                     var d = o[u].clone();
                     void 0 !== t && d.applyMatrix4(t), a.push(d)
                 }
                 for (u = 0, c = h.length; c > u; u++) {
                     var o = h[u],
                         f, p = o.vertexNormals,
                         m = o.vertexColors,
                         d = new THREE.Face3(o.a + n, o.b + n, o.c + n);
                     for (d.normal.copy(o.normal), void 0 !== i && d.normal.applyMatrix3(i).normalize(), t = 0, a = p.length; a > t; t++) f = p[t].clone(), void 0 !== i && f.applyMatrix3(i).normalize(), d.vertexNormals.push(f);
                     for (d.color.copy(o.color), t = 0, a = m.length; a > t; t++) f = m[t], d.vertexColors.push(f.clone());
                     d.materialIndex = o.materialIndex + r, s.push(d)
                 }
                 for (u = 0, c = e.length; c > u; u++)
                     if (r = e[u], i = [], void 0 !== r) {
                         for (t = 0, a = r.length; a > t; t++) i.push(r[t].clone());
                         l.push(i)
                     }
             }
         },
         mergeMesh: function(e) {
             !1 == e instanceof THREE.Mesh ? THREE.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", e) : (e.matrixAutoUpdate && e.updateMatrix(), this.merge(e.geometry, e.matrix))
         },
         mergeVertices: function() {
             var e = {},
                 t = [],
                 r = [],
                 i, n = Math.pow(10, 4),
                 a, o;
             for (a = 0, o = this.vertices.length; o > a; a++) i = this.vertices[a], i = Math.round(i.x * n) + "_" + Math.round(i.y * n) + "_" + Math.round(i.z * n), void 0 === e[i] ? (e[i] = a, t.push(this.vertices[a]), r[a] = t.length - 1) : r[a] = r[e[i]];
             for (e = [], a = 0, o = this.faces.length; o > a; a++)
                 for (n = this.faces[a], n.a = r[n.a], n.b = r[n.b], n.c = r[n.c], n = [n.a, n.b, n.c], i = 0; 3 > i; i++)
                     if (n[i] == n[(i + 1) % 3]) {
                         e.push(a);
                         break
                     }
             for (a = e.length - 1; a >= 0; a--)
                 for (n = e[a], this.faces.splice(n, 1), r = 0, o = this.faceVertexUvs.length; o > r; r++) this.faceVertexUvs[r].splice(n, 1);
             return a = this.vertices.length - t.length, this.vertices = t, a
         },
         toJSON: function() {
             function e(e, t, r) {
                 return r ? e | 1 << t : e & ~(1 << t)
             }

             function t(e) {
                 var t = e.x.toString() + e.y.toString() + e.z.toString();
                 return void 0 !== l[t] ? l[t] : (l[t] = h.length / 3, h.push(e.x, e.y, e.z), l[t])
             }

             function r(e) {
                 var t = e.r.toString() + e.g.toString() + e.b.toString();
                 return void 0 !== c[t] ? c[t] : (c[t] = u.length, u.push(e.getHex()), c[t])
             }

             function i(e) {
                 var t = e.x.toString() + e.y.toString();
                 return void 0 !== f[t] ? f[t] : (f[t] = d.length / 2, d.push(e.x, e.y), f[t])
             }
             var n = {
                 metadata: {
                     version: 4,
                     type: "BufferGeometry",
                     generator: "BufferGeometryExporter"
                 },
                 uuid: this.uuid,
                 type: this.type
             };
             if ("" !== this.name && (n.name = this.name), void 0 !== this.parameters) {
                 var a = this.parameters,
                     o;
                 for (o in a) void 0 !== a[o] && (n[o] = a[o]);
                 return n
             }
             for (a = [], o = 0; o < this.vertices.length; o++) {
                 var s = this.vertices[o];
                 a.push(s.x, s.y, s.z)
             }
             var s = [],
                 h = [],
                 l = {},
                 u = [],
                 c = {},
                 d = [],
                 f = {};
             for (o = 0; o < this.faces.length; o++) {
                 var p = this.faces[o],
                     m = void 0 !== this.faceVertexUvs[0][o],
                     E = 0 < p.normal.length(),
                     g = 0 < p.vertexNormals.length,
                     v = 1 !== p.color.r || 1 !== p.color.g || 1 !== p.color.b,
                     y = 0 < p.vertexColors.length,
                     T = 0,
                     T = e(T, 0, 0),
                     T = e(T, 1, !1),
                     T = e(T, 2, !1),
                     T = e(T, 3, m),
                     T = e(T, 4, E),
                     T = e(T, 5, g),
                     T = e(T, 6, v),
                     T = e(T, 7, y);
                 s.push(T), s.push(p.a, p.b, p.c), m && (m = this.faceVertexUvs[0][o], s.push(i(m[0]), i(m[1]), i(m[2]))), E && s.push(t(p.normal)), g && (E = p.vertexNormals, s.push(t(E[0]), t(E[1]), t(E[2]))), v && s.push(r(p.color)), y && (p = p.vertexColors, s.push(r(p[0]), r(p[1]), r(p[2])))
             }
             return n.data = {}, n.data.vertices = a, n.data.normals = h, 0 < u.length && (n.data.colors = u), 0 < d.length && (n.data.uvs = [d]), n.data.faces = s, n
         },
         clone: function() {
             for (var e = new THREE.Geometry, t = this.vertices, r = 0, i = t.length; i > r; r++) e.vertices.push(t[r].clone());
             for (t = this.faces, r = 0, i = t.length; i > r; r++) e.faces.push(t[r].clone());
             for (r = 0, i = this.faceVertexUvs.length; i > r; r++) {
                 t = this.faceVertexUvs[r], void 0 === e.faceVertexUvs[r] && (e.faceVertexUvs[r] = []);
                 for (var n = 0, a = t.length; a > n; n++) {
                     for (var o = t[n], s = [], h = 0, l = o.length; l > h; h++) s.push(o[h].clone());
                     e.faceVertexUvs[r].push(s)
                 }
             }
             return e
         },
         dispose: function() {
             this.dispatchEvent({
                 type: "dispose"
             })
         }
     }, THREE.EventDispatcher.prototype.apply(THREE.Geometry.prototype), THREE.GeometryIdCount = 0, THREE.Camera = function() {
         THREE.Object3D.call(this), this.type = "Camera", this.matrixWorldInverse = new THREE.Matrix4, this.projectionMatrix = new THREE.Matrix4
     }, THREE.Camera.prototype = Object.create(THREE.Object3D.prototype), THREE.Camera.prototype.constructor = THREE.Camera, THREE.Camera.prototype.getWorldDirection = function() {
         var e = new THREE.Quaternion;
         return function(t) {
             return t = t || new THREE.Vector3, this.getWorldQuaternion(e), t.set(0, 0, -1).applyQuaternion(e)
         }
     }(), THREE.Camera.prototype.lookAt = function() {
         var e = new THREE.Matrix4;
         return function(t) {
             e.lookAt(this.position, t, this.up), this.quaternion.setFromRotationMatrix(e)
         }
     }(), THREE.Camera.prototype.clone = function(e) {
         return void 0 === e && (e = new THREE.Camera), THREE.Object3D.prototype.clone.call(this, e), e.matrixWorldInverse.copy(this.matrixWorldInverse), e.projectionMatrix.copy(this.projectionMatrix), e
     }, THREE.CubeCamera = function(e, t, r) {
         THREE.Object3D.call(this), this.type = "CubeCamera";
         var i = new THREE.PerspectiveCamera(90, 1, e, t);
         i.up.set(0, -1, 0), i.lookAt(new THREE.Vector3(1, 0, 0)), this.add(i);
         var n = new THREE.PerspectiveCamera(90, 1, e, t);
         n.up.set(0, -1, 0), n.lookAt(new THREE.Vector3(-1, 0, 0)), this.add(n);
         var a = new THREE.PerspectiveCamera(90, 1, e, t);
         a.up.set(0, 0, 1), a.lookAt(new THREE.Vector3(0, 1, 0)), this.add(a);
         var o = new THREE.PerspectiveCamera(90, 1, e, t);
         o.up.set(0, 0, -1), o.lookAt(new THREE.Vector3(0, -1, 0)), this.add(o);
         var s = new THREE.PerspectiveCamera(90, 1, e, t);
         s.up.set(0, -1, 0), s.lookAt(new THREE.Vector3(0, 0, 1)), this.add(s);
         var h = new THREE.PerspectiveCamera(90, 1, e, t);
         h.up.set(0, -1, 0), h.lookAt(new THREE.Vector3(0, 0, -1)), this.add(h), this.renderTarget = new THREE.WebGLRenderTargetCube(r, r, {
             format: THREE.RGBFormat,
             magFilter: THREE.LinearFilter,
             minFilter: THREE.LinearFilter
         }), this.updateCubeMap = function(e, t) {
             var r = this.renderTarget,
                 l = r.generateMipmaps;
             r.generateMipmaps = !1, r.activeCubeFace = 0, e.render(t, i, r), r.activeCubeFace = 1, e.render(t, n, r), r.activeCubeFace = 2, e.render(t, a, r), r.activeCubeFace = 3, e.render(t, o, r), r.activeCubeFace = 4, e.render(t, s, r), r.generateMipmaps = l, r.activeCubeFace = 5, e.render(t, h, r)
         }
     }, THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype), THREE.CubeCamera.prototype.constructor = THREE.CubeCamera, THREE.OrthographicCamera = function(e, t, r, i, n, a) {
         THREE.Camera.call(this), this.type = "OrthographicCamera", this.zoom = 1, this.left = e, this.right = t, this.top = r, this.bottom = i, this.near = void 0 !== n ? n : .1, this.far = void 0 !== a ? a : 2e3, this.updateProjectionMatrix()
     }, THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype), THREE.OrthographicCamera.prototype.constructor = THREE.OrthographicCamera, THREE.OrthographicCamera.prototype.updateProjectionMatrix = function() {
         var e = (this.right - this.left) / (2 * this.zoom),
             t = (this.top - this.bottom) / (2 * this.zoom),
             r = (this.right + this.left) / 2,
             i = (this.top + this.bottom) / 2;
         this.projectionMatrix.makeOrthographic(r - e, r + e, i + t, i - t, this.near, this.far)
     }, THREE.OrthographicCamera.prototype.clone = function() {
         var e = new THREE.OrthographicCamera;
         return THREE.Camera.prototype.clone.call(this, e), e.zoom = this.zoom, e.left = this.left, e.right = this.right, e.top = this.top, e.bottom = this.bottom, e.near = this.near, e.far = this.far, e.projectionMatrix.copy(this.projectionMatrix), e
     }, THREE.PerspectiveCamera = function(e, t, r, i) {
         THREE.Camera.call(this), this.type = "PerspectiveCamera", this.zoom = 1, this.fov = void 0 !== e ? e : 50, this.aspect = void 0 !== t ? t : 1, this.near = void 0 !== r ? r : .1, this.far = void 0 !== i ? i : 2e3, this.updateProjectionMatrix()
     }, THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype), THREE.PerspectiveCamera.prototype.constructor = THREE.PerspectiveCamera, THREE.PerspectiveCamera.prototype.setLens = function(e, t) {
         void 0 === t && (t = 24), this.fov = 2 * THREE.Math.radToDeg(Math.atan(t / (2 * e))), this.updateProjectionMatrix()
     }, THREE.PerspectiveCamera.prototype.setViewOffset = function(e, t, r, i, n, a) {
         this.fullWidth = e, this.fullHeight = t, this.x = r, this.y = i, this.width = n, this.height = a, this.updateProjectionMatrix()
     }, THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function() {
         var e = THREE.Math.radToDeg(2 * Math.atan(Math.tan(.5 * THREE.Math.degToRad(this.fov)) / this.zoom));
         if (this.fullWidth) {
             var t = this.fullWidth / this.fullHeight,
                 e = Math.tan(THREE.Math.degToRad(.5 * e)) * this.near,
                 r = -e,
                 i = t * r,
                 t = Math.abs(t * e - i),
                 r = Math.abs(e - r);
             this.projectionMatrix.makeFrustum(i + this.x * t / this.fullWidth, i + (this.x + this.width) * t / this.fullWidth, e - (this.y + this.height) * r / this.fullHeight, e - this.y * r / this.fullHeight, this.near, this.far)
         } else this.projectionMatrix.makePerspective(e, this.aspect, this.near, this.far)
     }, THREE.PerspectiveCamera.prototype.clone = function() {
         var e = new THREE.PerspectiveCamera;
         return THREE.Camera.prototype.clone.call(this, e), e.zoom = this.zoom, e.fov = this.fov, e.aspect = this.aspect, e.near = this.near, e.far = this.far, e.projectionMatrix.copy(this.projectionMatrix), e
     }, THREE.Light = function(e) {
         THREE.Object3D.call(this), this.type = "Light", this.color = new THREE.Color(e)
     }, THREE.Light.prototype = Object.create(THREE.Object3D.prototype), THREE.Light.prototype.constructor = THREE.Light, THREE.Light.prototype.clone = function(e) {
         return void 0 === e && (e = new THREE.Light), THREE.Object3D.prototype.clone.call(this, e), e.color.copy(this.color), e
     }, THREE.AmbientLight = function(e) {
         THREE.Light.call(this, e), this.type = "AmbientLight"
     }, THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype), THREE.AmbientLight.prototype.constructor = THREE.AmbientLight, THREE.AmbientLight.prototype.clone = function() {
         var e = new THREE.AmbientLight;
         return THREE.Light.prototype.clone.call(this, e), e
     }, THREE.AreaLight = function(e, t) {
         THREE.Light.call(this, e), this.type = "AreaLight", this.normal = new THREE.Vector3(0, -1, 0), this.right = new THREE.Vector3(1, 0, 0), this.intensity = void 0 !== t ? t : 1, this.height = this.width = 1, this.constantAttenuation = 1.5, this.linearAttenuation = .5, this.quadraticAttenuation = .1
     }, THREE.AreaLight.prototype = Object.create(THREE.Light.prototype), THREE.AreaLight.prototype.constructor = THREE.AreaLight, THREE.DirectionalLight = function(e, t) {
         THREE.Light.call(this, e), this.type = "DirectionalLight", this.position.set(0, 1, 0), this.target = new THREE.Object3D, this.intensity = void 0 !== t ? t : 1, this.onlyShadow = this.castShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraLeft = -500, this.shadowCameraTop = this.shadowCameraRight = 500, this.shadowCameraBottom = -500, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapHeight = this.shadowMapWidth = 512, this.shadowCascade = !1, this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1e3), this.shadowCascadeCount = 2, this.shadowCascadeBias = [0, 0, 0], this.shadowCascadeWidth = [512, 512, 512], this.shadowCascadeHeight = [512, 512, 512], this.shadowCascadeNearZ = [-1, .99, .998], this.shadowCascadeFarZ = [.99, .998, 1], this.shadowCascadeArray = [], this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
     }, THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype), THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight, THREE.DirectionalLight.prototype.clone = function() {
         var e = new THREE.DirectionalLight;
         return THREE.Light.prototype.clone.call(this, e), e.target = this.target.clone(), e.intensity = this.intensity, e.castShadow = this.castShadow, e.onlyShadow = this.onlyShadow, e.shadowCameraNear = this.shadowCameraNear, e.shadowCameraFar = this.shadowCameraFar, e.shadowCameraLeft = this.shadowCameraLeft, e.shadowCameraRight = this.shadowCameraRight, e.shadowCameraTop = this.shadowCameraTop, e.shadowCameraBottom = this.shadowCameraBottom, e.shadowCameraVisible = this.shadowCameraVisible, e.shadowBias = this.shadowBias, e.shadowDarkness = this.shadowDarkness, e.shadowMapWidth = this.shadowMapWidth, e.shadowMapHeight = this.shadowMapHeight, e.shadowCascade = this.shadowCascade, e.shadowCascadeOffset.copy(this.shadowCascadeOffset), e.shadowCascadeCount = this.shadowCascadeCount, e.shadowCascadeBias = this.shadowCascadeBias.slice(0), e.shadowCascadeWidth = this.shadowCascadeWidth.slice(0), e.shadowCascadeHeight = this.shadowCascadeHeight.slice(0), e.shadowCascadeNearZ = this.shadowCascadeNearZ.slice(0), e.shadowCascadeFarZ = this.shadowCascadeFarZ.slice(0), e
     }, THREE.HemisphereLight = function(e, t, r) {
         THREE.Light.call(this, e), this.type = "HemisphereLight", this.position.set(0, 100, 0), this.groundColor = new THREE.Color(t), this.intensity = void 0 !== r ? r : 1
     }, THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype), THREE.HemisphereLight.prototype.constructor = THREE.HemisphereLight, THREE.HemisphereLight.prototype.clone = function() {
         var e = new THREE.HemisphereLight;
         return THREE.Light.prototype.clone.call(this, e), e.groundColor.copy(this.groundColor), e.intensity = this.intensity, e
     }, THREE.PointLight = function(e, t, r, i) {
         THREE.Light.call(this, e), this.type = "PointLight", this.intensity = void 0 !== t ? t : 1, this.distance = void 0 !== r ? r : 0, this.decay = void 0 !== i ? i : 1
     }, THREE.PointLight.prototype = Object.create(THREE.Light.prototype), THREE.PointLight.prototype.constructor = THREE.PointLight, THREE.PointLight.prototype.clone = function() {
         var e = new THREE.PointLight;
         return THREE.Light.prototype.clone.call(this, e), e.intensity = this.intensity, e.distance = this.distance, e.decay = this.decay, e
     }, THREE.SpotLight = function(e, t, r, i, n, a) {
         THREE.Light.call(this, e), this.type = "SpotLight", this.position.set(0, 1, 0), this.target = new THREE.Object3D, this.intensity = void 0 !== t ? t : 1, this.distance = void 0 !== r ? r : 0, this.angle = void 0 !== i ? i : Math.PI / 3, this.exponent = void 0 !== n ? n : 10, this.decay = void 0 !== a ? a : 1, this.onlyShadow = this.castShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraFov = 50, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapHeight = this.shadowMapWidth = 512, this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
     }, THREE.SpotLight.prototype = Object.create(THREE.Light.prototype), THREE.SpotLight.prototype.constructor = THREE.SpotLight, THREE.SpotLight.prototype.clone = function() {
         var e = new THREE.SpotLight;
         return THREE.Light.prototype.clone.call(this, e), e.target = this.target.clone(), e.intensity = this.intensity, e.distance = this.distance, e.angle = this.angle, e.exponent = this.exponent, e.decay = this.decay, e.castShadow = this.castShadow, e.onlyShadow = this.onlyShadow, e.shadowCameraNear = this.shadowCameraNear, e.shadowCameraFar = this.shadowCameraFar, e.shadowCameraFov = this.shadowCameraFov, e.shadowCameraVisible = this.shadowCameraVisible, e.shadowBias = this.shadowBias, e.shadowDarkness = this.shadowDarkness, e.shadowMapWidth = this.shadowMapWidth, e.shadowMapHeight = this.shadowMapHeight, e
     }, THREE.Cache = {
         files: {},
         add: function(e, t) {
             this.files[e] = t
         },
         get: function(e) {
             return this.files[e]
         },
         remove: function(e) {
             delete this.files[e]
         },
         clear: function() {
             this.files = {}
         }
     }, THREE.Loader = function(e) {
         this.statusDomElement = (this.showStatus = e) ? THREE.Loader.prototype.addStatusElement() : null, this.imageLoader = new THREE.ImageLoader, this.onLoadStart = function() {}, this.onLoadProgress = function() {}, this.onLoadComplete = function() {}
     }, THREE.Loader.prototype = {
         constructor: THREE.Loader,
         crossOrigin: void 0,
         addStatusElement: function() {
             var e = document.createElement("div");
             return e.style.position = "absolute", e.style.right = "0px", e.style.top = "0px", e.style.fontSize = "0.8em", e.style.textAlign = "left", e.style.background = "rgba(0,0,0,0.25)", e.style.color = "#fff", e.style.width = "120px", e.style.padding = "0.5em 0.5em 0.5em 0.5em", e.style.zIndex = 1e3, e.innerHTML = "Loading ...", e
         },
         updateProgress: function(e) {
             var t = "Loaded ",
                 t = e.total ? t + ((100 * e.loaded / e.total).toFixed(0) + "%") : t + ((e.loaded / 1024).toFixed(2) + " KB");
             this.statusDomElement.innerHTML = t
         },
         extractUrlBase: function(e) {
             return e = e.split("/"), 1 === e.length ? "./" : (e.pop(), e.join("/") + "/")
         },
         initMaterials: function(e, t) {
             for (var r = [], i = 0; i < e.length; ++i) r[i] = this.createMaterial(e[i], t);
             return r
         },
         needsTangents: function(e) {
             for (var t = 0, r = e.length; r > t; t++)
                 if (e[t] instanceof THREE.ShaderMaterial) return !0;
             return !1
         },
         createMaterial: function(e, t) {
             function r(e) {
                 return e = Math.log(e) / Math.LN2, Math.pow(2, Math.round(e))
             }

             function i(e, i, n, o, s, h, l) {
                 var u = t + n,
                     c, d = THREE.Loader.Handlers.get(u);
                 null !== d ? c = d.load(u) : (c = new THREE.Texture, d = a.imageLoader, d.crossOrigin = a.crossOrigin, d.load(u, function(e) {
                     if (!1 === THREE.Math.isPowerOfTwo(e.width) || !1 === THREE.Math.isPowerOfTwo(e.height)) {
                         var t = r(e.width),
                             i = r(e.height),
                             n = document.createElement("canvas");
                         n.width = t, n.height = i, n.getContext("2d").drawImage(e, 0, 0, t, i), c.image = n
                     } else c.image = e;
                     c.needsUpdate = !0
                 })), c.sourceFile = n, o && (c.repeat.set(o[0], o[1]), 1 !== o[0] && (c.wrapS = THREE.RepeatWrapping), 1 !== o[1] && (c.wrapT = THREE.RepeatWrapping)), s && c.offset.set(s[0], s[1]), h && (n = {
                     repeat: THREE.RepeatWrapping,
                     mirror: THREE.MirroredRepeatWrapping
                 }, void 0 !== n[h[0]] && (c.wrapS = n[h[0]]), void 0 !== n[h[1]] && (c.wrapT = n[h[1]])), l && (c.anisotropy = l), e[i] = c
             }

             function n(e) {
                 return (255 * e[0] << 16) + (255 * e[1] << 8) + 255 * e[2]
             }
             var a = this,
                 o = "MeshLambertMaterial",
                 s = {
                     color: 15658734,
                     opacity: 1,
                     map: null,
                     lightMap: null,
                     normalMap: null,
                     bumpMap: null,
                     wireframe: !1
                 };
             if (e.shading) {
                 var h = e.shading.toLowerCase();
                 "phong" === h ? o = "MeshPhongMaterial" : "basic" === h && (o = "MeshBasicMaterial")
             }
             return void 0 !== e.blending && void 0 !== THREE[e.blending] && (s.blending = THREE[e.blending]), void 0 !== e.transparent && (s.transparent = e.transparent), void 0 !== e.opacity && 1 > e.opacity && (s.transparent = !0), void 0 !== e.depthTest && (s.depthTest = e.depthTest), void 0 !== e.depthWrite && (s.depthWrite = e.depthWrite), void 0 !== e.visible && (s.visible = e.visible), void 0 !== e.flipSided && (s.side = THREE.BackSide), void 0 !== e.doubleSided && (s.side = THREE.DoubleSide), void 0 !== e.wireframe && (s.wireframe = e.wireframe), void 0 !== e.vertexColors && ("face" === e.vertexColors ? s.vertexColors = THREE.FaceColors : e.vertexColors && (s.vertexColors = THREE.VertexColors)), e.colorDiffuse ? s.color = n(e.colorDiffuse) : e.DbgColor && (s.color = e.DbgColor), e.colorSpecular && (s.specular = n(e.colorSpecular)), e.colorEmissive && (s.emissive = n(e.colorEmissive)), void 0 !== e.transparency && (console.warn("THREE.Loader: transparency has been renamed to opacity"), e.opacity = e.transparency), void 0 !== e.opacity && (s.opacity = e.opacity), e.specularCoef && (s.shininess = e.specularCoef), e.mapDiffuse && t && i(s, "map", e.mapDiffuse, e.mapDiffuseRepeat, e.mapDiffuseOffset, e.mapDiffuseWrap, e.mapDiffuseAnisotropy), e.mapLight && t && i(s, "lightMap", e.mapLight, e.mapLightRepeat, e.mapLightOffset, e.mapLightWrap, e.mapLightAnisotropy), e.mapBump && t && i(s, "bumpMap", e.mapBump, e.mapBumpRepeat, e.mapBumpOffset, e.mapBumpWrap, e.mapBumpAnisotropy), e.mapNormal && t && i(s, "normalMap", e.mapNormal, e.mapNormalRepeat, e.mapNormalOffset, e.mapNormalWrap, e.mapNormalAnisotropy), e.mapSpecular && t && i(s, "specularMap", e.mapSpecular, e.mapSpecularRepeat, e.mapSpecularOffset, e.mapSpecularWrap, e.mapSpecularAnisotropy), e.mapAlpha && t && i(s, "alphaMap", e.mapAlpha, e.mapAlphaRepeat, e.mapAlphaOffset, e.mapAlphaWrap, e.mapAlphaAnisotropy), e.mapBumpScale && (s.bumpScale = e.mapBumpScale), e.mapNormalFactor && (s.normalScale = new THREE.Vector2(e.mapNormalFactor, e.mapNormalFactor)), o = new THREE[o](s), void 0 !== e.DbgName && (o.name = e.DbgName), o
         }
     }, THREE.Loader.Handlers = {
         handlers: [],
         add: function(e, t) {
             this.handlers.push(e, t)
         },
         get: function(e) {
             for (var t = 0, r = this.handlers.length; r > t; t += 2) {
                 var i = this.handlers[t + 1];
                 if (this.handlers[t].test(e)) return i
             }
             return null
         }
     }, THREE.XHRLoader = function(e) {
         this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
     }, THREE.XHRLoader.prototype = {
         constructor: THREE.XHRLoader,
         load: function(e, t, r, i) {
             var n = this,
                 a = THREE.Cache.get(e);
             void 0 !== a ? t && t(a) : (a = new XMLHttpRequest, a.open("GET", e, !0), a.addEventListener("load", function(r) {
                 THREE.Cache.add(e, this.response), t && t(this.response), n.manager.itemEnd(e)
             }, !1), void 0 !== r && a.addEventListener("progress", function(e) {
                 r(e)
             }, !1), void 0 !== i && a.addEventListener("error", function(e) {
                 i(e)
             }, !1), void 0 !== this.crossOrigin && (a.crossOrigin = this.crossOrigin), void 0 !== this.responseType && (a.responseType = this.responseType), a.send(null), n.manager.itemStart(e))
         },
         setResponseType: function(e) {
             this.responseType = e
         },
         setCrossOrigin: function(e) {
             this.crossOrigin = e
         }
     }, THREE.ImageLoader = function(e) {
         this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
     }, THREE.ImageLoader.prototype = {
         constructor: THREE.ImageLoader,
         load: function(e, t, r, i) {
             var n = this,
                 a = THREE.Cache.get(e);
             return void 0 === a ? (a = document.createElement("img"), a.addEventListener("load", function(r) {
                 THREE.Cache.add(e, this), t && t(this), n.manager.itemEnd(e)
             }, !1), void 0 !== r && a.addEventListener("progress", function(e) {
                 r(e)
             }, !1), void 0 !== i && a.addEventListener("error", function(e) {
                 i(e)
             }, !1), void 0 !== this.crossOrigin && (a.crossOrigin = this.crossOrigin), a.src = e, n.manager.itemStart(e), a) : void t(a)
         },
         setCrossOrigin: function(e) {
             this.crossOrigin = e
         }
     }, THREE.JSONLoader = function(e) {
         THREE.Loader.call(this, e), this.withCredentials = !1
     }, THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype), THREE.JSONLoader.prototype.constructor = THREE.JSONLoader, THREE.JSONLoader.prototype.load = function(e, t, r) {
         r = r && "string" == typeof r ? r : this.extractUrlBase(e), this.onLoadStart(), this.loadAjaxJSON(this, e, t, r)
     }, THREE.JSONLoader.prototype.loadAjaxJSON = function(e, t, r, i, n) {
         var a = new XMLHttpRequest,
             o = 0;
         a.onreadystatechange = function() {
             if (a.readyState === a.DONE)
                 if (200 === a.status || 0 === a.status) {
                     if (a.responseText) {
                         var s = JSON.parse(a.responseText),
                             h = s.metadata;
                         if (void 0 !== h) {
                             if ("object" === h.type) return void THREE.error("THREE.JSONLoader: " + t + " should be loaded with THREE.ObjectLoader instead.");
                             if ("scene" === h.type) return void THREE.error("THREE.JSONLoader: " + t + " seems to be a Scene. Use THREE.SceneLoader instead.")
                         }
                         s = e.parse(s, i), r(s.geometry, s.materials)
                     } else THREE.error("THREE.JSONLoader: " + t + " seems to be unreachable or the file is empty.");
                     e.onLoadComplete()
                 } else THREE.error("THREE.JSONLoader: Couldn't load " + t + " (" + a.status + ")");
             else a.readyState === a.LOADING ? n && (0 === o && (o = a.getResponseHeader("Content-Length")), n({
                 total: o,
                 loaded: a.responseText.length
             })) : a.readyState === a.HEADERS_RECEIVED && void 0 !== n && (o = a.getResponseHeader("Content-Length"));
         }, a.open("GET", t, !0), a.withCredentials = this.withCredentials, a.send(null)
     }, THREE.JSONLoader.prototype.parse = function(e, t) {
         var r = new THREE.Geometry,
             i = void 0 !== e.scale ? 1 / e.scale : 1;
         return function(t) {
                 var i, n, a, o, s, h, l, u, c, d, f, p, m, E = e.faces;
                 h = e.vertices;
                 var g = e.normals,
                     v = e.colors,
                     y = 0;
                 if (void 0 !== e.uvs) {
                     for (i = 0; i < e.uvs.length; i++) e.uvs[i].length && y++;
                     for (i = 0; y > i; i++) r.faceVertexUvs[i] = []
                 }
                 for (o = 0, s = h.length; s > o;) i = new THREE.Vector3, i.x = h[o++] * t, i.y = h[o++] * t, i.z = h[o++] * t, r.vertices.push(i);
                 for (o = 0, s = E.length; s > o;)
                     if (t = E[o++], c = 1 & t, a = 2 & t, i = 8 & t, l = 16 & t, d = 32 & t, h = 64 & t, t &= 128, c) {
                         if (c = new THREE.Face3, c.a = E[o], c.b = E[o + 1], c.c = E[o + 3], f = new THREE.Face3, f.a = E[o + 1], f.b = E[o + 2], f.c = E[o + 3], o += 4, a && (a = E[o++], c.materialIndex = a, f.materialIndex = a), a = r.faces.length, i)
                             for (i = 0; y > i; i++)
                                 for (p = e.uvs[i], r.faceVertexUvs[i][a] = [], r.faceVertexUvs[i][a + 1] = [], n = 0; 4 > n; n++) u = E[o++], m = p[2 * u], u = p[2 * u + 1], m = new THREE.Vector2(m, u), 2 !== n && r.faceVertexUvs[i][a].push(m), 0 !== n && r.faceVertexUvs[i][a + 1].push(m);
                         if (l && (l = 3 * E[o++], c.normal.set(g[l++], g[l++], g[l]), f.normal.copy(c.normal)), d)
                             for (i = 0; 4 > i; i++) l = 3 * E[o++], d = new THREE.Vector3(g[l++], g[l++], g[l]), 2 !== i && c.vertexNormals.push(d), 0 !== i && f.vertexNormals.push(d);
                         if (h && (h = E[o++], h = v[h], c.color.setHex(h), f.color.setHex(h)), t)
                             for (i = 0; 4 > i; i++) h = E[o++], h = v[h], 2 !== i && c.vertexColors.push(new THREE.Color(h)), 0 !== i && f.vertexColors.push(new THREE.Color(h));
                         r.faces.push(c), r.faces.push(f)
                     } else {
                         if (c = new THREE.Face3, c.a = E[o++], c.b = E[o++], c.c = E[o++], a && (a = E[o++], c.materialIndex = a), a = r.faces.length, i)
                             for (i = 0; y > i; i++)
                                 for (p = e.uvs[i], r.faceVertexUvs[i][a] = [], n = 0; 3 > n; n++) u = E[o++], m = p[2 * u], u = p[2 * u + 1], m = new THREE.Vector2(m, u), r.faceVertexUvs[i][a].push(m);
                         if (l && (l = 3 * E[o++], c.normal.set(g[l++], g[l++], g[l])), d)
                             for (i = 0; 3 > i; i++) l = 3 * E[o++], d = new THREE.Vector3(g[l++], g[l++], g[l]), c.vertexNormals.push(d);
                         if (h && (h = E[o++], c.color.setHex(v[h])), t)
                             for (i = 0; 3 > i; i++) h = E[o++], c.vertexColors.push(new THREE.Color(v[h]));
                         r.faces.push(c)
                     }
             }(i),
             function() {
                 var t = void 0 !== e.influencesPerVertex ? e.influencesPerVertex : 2;
                 if (e.skinWeights)
                     for (var i = 0, n = e.skinWeights.length; n > i; i += t) r.skinWeights.push(new THREE.Vector4(e.skinWeights[i], t > 1 ? e.skinWeights[i + 1] : 0, t > 2 ? e.skinWeights[i + 2] : 0, t > 3 ? e.skinWeights[i + 3] : 0));
                 if (e.skinIndices)
                     for (i = 0, n = e.skinIndices.length; n > i; i += t) r.skinIndices.push(new THREE.Vector4(e.skinIndices[i], t > 1 ? e.skinIndices[i + 1] : 0, t > 2 ? e.skinIndices[i + 2] : 0, t > 3 ? e.skinIndices[i + 3] : 0));
                 r.bones = e.bones, r.bones && 0 < r.bones.length && (r.skinWeights.length !== r.skinIndices.length || r.skinIndices.length !== r.vertices.length) && THREE.warn("THREE.JSONLoader: When skinning, number of vertices (" + r.vertices.length + "), skinIndices (" + r.skinIndices.length + "), and skinWeights (" + r.skinWeights.length + ") should match."), r.animation = e.animation, r.animations = e.animations
             }(),
             function(t) {
                 if (void 0 !== e.morphTargets) {
                     var i, n, a, o, s, h;
                     for (i = 0, n = e.morphTargets.length; n > i; i++)
                         for (r.morphTargets[i] = {}, r.morphTargets[i].name = e.morphTargets[i].name, r.morphTargets[i].vertices = [], s = r.morphTargets[i].vertices, h = e.morphTargets[i].vertices, a = 0, o = h.length; o > a; a += 3) {
                             var l = new THREE.Vector3;
                             l.x = h[a] * t, l.y = h[a + 1] * t, l.z = h[a + 2] * t, s.push(l)
                         }
                 }
                 if (void 0 !== e.morphColors)
                     for (i = 0, n = e.morphColors.length; n > i; i++)
                         for (r.morphColors[i] = {}, r.morphColors[i].name = e.morphColors[i].name, r.morphColors[i].colors = [], o = r.morphColors[i].colors, s = e.morphColors[i].colors, t = 0, a = s.length; a > t; t += 3) h = new THREE.Color(16755200), h.setRGB(s[t], s[t + 1], s[t + 2]), o.push(h)
             }(i), r.computeFaceNormals(), r.computeBoundingSphere(), void 0 === e.materials || 0 === e.materials.length ? {
                 geometry: r
             } : (i = this.initMaterials(e.materials, t), this.needsTangents(i) && r.computeTangents(), {
                 geometry: r,
                 materials: i
             })
     }, THREE.LoadingManager = function(e, t, r) {
         var i = this,
             n = 0,
             a = 0;
         this.onLoad = e, this.onProgress = t, this.onError = r, this.itemStart = function(e) {
             a++
         }, this.itemEnd = function(e) {
             n++, void 0 !== i.onProgress && i.onProgress(e, n, a), n === a && void 0 !== i.onLoad && i.onLoad()
         }
     }, THREE.DefaultLoadingManager = new THREE.LoadingManager, THREE.BufferGeometryLoader = function(e) {
         this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
     }, THREE.BufferGeometryLoader.prototype = {
         constructor: THREE.BufferGeometryLoader,
         load: function(e, t, r, i) {
             var n = this,
                 a = new THREE.XHRLoader(n.manager);
             a.setCrossOrigin(this.crossOrigin), a.load(e, function(e) {
                 t(n.parse(JSON.parse(e)))
             }, r, i)
         },
         setCrossOrigin: function(e) {
             this.crossOrigin = e
         },
         parse: function(e) {
             var t = new THREE.BufferGeometry,
                 r = e.data.attributes,
                 i;
             for (i in r) {
                 var n = r[i],
                     a = new self[n.type](n.array);
                 t.addAttribute(i, new THREE.BufferAttribute(a, n.itemSize))
             }
             return r = e.data.offsets, void 0 !== r && (t.offsets = JSON.parse(JSON.stringify(r))), e = e.data.boundingSphere, void 0 !== e && (r = new THREE.Vector3, void 0 !== e.center && r.fromArray(e.center), t.boundingSphere = new THREE.Sphere(r, e.radius)), t
         }
     }, THREE.MaterialLoader = function(e) {
         this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
     }, THREE.MaterialLoader.prototype = {
         constructor: THREE.MaterialLoader,
         load: function(e, t, r, i) {
             var n = this,
                 a = new THREE.XHRLoader(n.manager);
             a.setCrossOrigin(this.crossOrigin), a.load(e, function(e) {
                 t(n.parse(JSON.parse(e)))
             }, r, i)
         },
         setCrossOrigin: function(e) {
             this.crossOrigin = e
         },
         parse: function(e) {
             var t = new THREE[e.type];
             if (void 0 !== e.color && t.color.setHex(e.color), void 0 !== e.emissive && t.emissive.setHex(e.emissive), void 0 !== e.specular && t.specular.setHex(e.specular), void 0 !== e.shininess && (t.shininess = e.shininess), void 0 !== e.uniforms && (t.uniforms = e.uniforms), void 0 !== e.vertexShader && (t.vertexShader = e.vertexShader), void 0 !== e.fragmentShader && (t.fragmentShader = e.fragmentShader), void 0 !== e.vertexColors && (t.vertexColors = e.vertexColors), void 0 !== e.shading && (t.shading = e.shading), void 0 !== e.blending && (t.blending = e.blending), void 0 !== e.side && (t.side = e.side), void 0 !== e.opacity && (t.opacity = e.opacity), void 0 !== e.transparent && (t.transparent = e.transparent), void 0 !== e.wireframe && (t.wireframe = e.wireframe), void 0 !== e.size && (t.size = e.size), void 0 !== e.sizeAttenuation && (t.sizeAttenuation = e.sizeAttenuation), void 0 !== e.materials)
                 for (var r = 0, i = e.materials.length; i > r; r++) t.materials.push(this.parse(e.materials[r]));
             return t
         }
     }, THREE.ObjectLoader = function(e) {
         this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager, this.texturePath = ""
     }, THREE.ObjectLoader.prototype = {
         constructor: THREE.ObjectLoader,
         load: function(e, t, r, i) {
             "" === this.texturePath && (this.texturePath = e.substring(0, e.lastIndexOf("/") + 1));
             var n = this,
                 a = new THREE.XHRLoader(n.manager);
             a.setCrossOrigin(this.crossOrigin), a.load(e, function(e) {
                 n.parse(JSON.parse(e), t)
             }, r, i)
         },
         setTexturePath: function(e) {
             this.texturePath = e
         },
         setCrossOrigin: function(e) {
             this.crossOrigin = e
         },
         parse: function(e, t) {
             var r = this.parseGeometries(e.geometries),
                 i = this.parseImages(e.images, function() {
                     void 0 !== t && t(n)
                 }),
                 i = this.parseTextures(e.textures, i),
                 i = this.parseMaterials(e.materials, i),
                 n = this.parseObject(e.object, r, i);
             return void 0 !== e.images && 0 !== e.images.length || void 0 === t || t(n), n
         },
         parseGeometries: function(e) {
             var t = {};
             if (void 0 !== e)
                 for (var r = new THREE.JSONLoader, i = new THREE.BufferGeometryLoader, n = 0, a = e.length; a > n; n++) {
                     var o, s = e[n];
                     switch (s.type) {
                         case "PlaneGeometry":
                         case "PlaneBufferGeometry":
                             o = new THREE[s.type](s.width, s.height, s.widthSegments, s.heightSegments);
                             break;
                         case "BoxGeometry":
                         case "CubeGeometry":
                             o = new THREE.BoxGeometry(s.width, s.height, s.depth, s.widthSegments, s.heightSegments, s.depthSegments);
                             break;
                         case "CircleGeometry":
                             o = new THREE.CircleGeometry(s.radius, s.segments);
                             break;
                         case "CylinderGeometry":
                             o = new THREE.CylinderGeometry(s.radiusTop, s.radiusBottom, s.height, s.radialSegments, s.heightSegments, s.openEnded);
                             break;
                         case "SphereGeometry":
                             o = new THREE.SphereGeometry(s.radius, s.widthSegments, s.heightSegments, s.phiStart, s.phiLength, s.thetaStart, s.thetaLength);
                             break;
                         case "IcosahedronGeometry":
                             o = new THREE.IcosahedronGeometry(s.radius, s.detail);
                             break;
                         case "TorusGeometry":
                             o = new THREE.TorusGeometry(s.radius, s.tube, s.radialSegments, s.tubularSegments, s.arc);
                             break;
                         case "TorusKnotGeometry":
                             o = new THREE.TorusKnotGeometry(s.radius, s.tube, s.radialSegments, s.tubularSegments, s.p, s.q, s.heightScale);
                             break;
                         case "BufferGeometry":
                             o = i.parse(s);
                             break;
                         case "Geometry":
                             o = r.parse(s.data).geometry
                     }
                     o.uuid = s.uuid, void 0 !== s.name && (o.name = s.name), t[s.uuid] = o
                 }
             return t
         },
         parseMaterials: function(e, t) {
             var r = {};
             if (void 0 !== e)
                 for (var i = function(e) {
                         return void 0 === t[e] && THREE.warn("THREE.ObjectLoader: Undefined texture", e), t[e]
                     }, n = new THREE.MaterialLoader, a = 0, o = e.length; o > a; a++) {
                     var s = e[a],
                         h = n.parse(s);
                     h.uuid = s.uuid, void 0 !== s.name && (h.name = s.name), void 0 !== s.map && (h.map = i(s.map)), void 0 !== s.bumpMap && (h.bumpMap = i(s.bumpMap), s.bumpScale && (h.bumpScale = new THREE.Vector2(s.bumpScale, s.bumpScale))), void 0 !== s.alphaMap && (h.alphaMap = i(s.alphaMap)), void 0 !== s.envMap && (h.envMap = i(s.envMap)), void 0 !== s.normalMap && (h.normalMap = i(s.normalMap), s.normalScale && (h.normalScale = new THREE.Vector2(s.normalScale, s.normalScale))), void 0 !== s.lightMap && (h.lightMap = i(s.lightMap)), void 0 !== s.specularMap && (h.specularMap = i(s.specularMap)), r[s.uuid] = h
                 }
             return r
         },
         parseImages: function(e, t) {
             var r = this,
                 i = {};
             if (void 0 !== e && 0 < e.length) {
                 var n = new THREE.LoadingManager(t),
                     a = new THREE.ImageLoader(n);
                 a.setCrossOrigin(this.crossOrigin);
                 for (var n = function(e) {
                         return r.manager.itemStart(e), a.load(e, function() {
                             r.manager.itemEnd(e)
                         })
                     }, o = 0, s = e.length; s > o; o++) {
                     var h = e[o],
                         l = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(h.url) ? h.url : r.texturePath + h.url;
                     i[h.uuid] = n(l)
                 }
             }
             return i
         },
         parseTextures: function(e, t) {
             var r = {};
             if (void 0 !== e)
                 for (var i = 0, n = e.length; n > i; i++) {
                     var a = e[i];
                     void 0 === a.image && THREE.warn('THREE.ObjectLoader: No "image" speficied for', a.uuid), void 0 === t[a.image] && THREE.warn("THREE.ObjectLoader: Undefined image", a.image);
                     var o = new THREE.Texture(t[a.image]);
                     o.needsUpdate = !0, o.uuid = a.uuid, void 0 !== a.name && (o.name = a.name), void 0 !== a.repeat && (o.repeat = new THREE.Vector2(a.repeat[0], a.repeat[1])), void 0 !== a.minFilter && (o.minFilter = THREE[a.minFilter]), void 0 !== a.magFilter && (o.magFilter = THREE[a.magFilter]), void 0 !== a.anisotropy && (o.anisotropy = a.anisotropy), a.wrap instanceof Array && (o.wrapS = THREE[a.wrap[0]], o.wrapT = THREE[a.wrap[1]]), r[a.uuid] = o
                 }
             return r
         },
         parseObject: function() {
             var e = new THREE.Matrix4;
             return function(t, r, i) {
                 var n;
                 n = function(e) {
                     return void 0 === r[e] && THREE.warn("THREE.ObjectLoader: Undefined geometry", e), r[e]
                 };
                 var a = function(e) {
                     return void 0 === i[e] && THREE.warn("THREE.ObjectLoader: Undefined material", e), i[e]
                 };
                 switch (t.type) {
                     case "Scene":
                         n = new THREE.Scene;
                         break;
                     case "PerspectiveCamera":
                         n = new THREE.PerspectiveCamera(t.fov, t.aspect, t.near, t.far);
                         break;
                     case "OrthographicCamera":
                         n = new THREE.OrthographicCamera(t.left, t.right, t.top, t.bottom, t.near, t.far);
                         break;
                     case "AmbientLight":
                         n = new THREE.AmbientLight(t.color);
                         break;
                     case "DirectionalLight":
                         n = new THREE.DirectionalLight(t.color, t.intensity);
                         break;
                     case "PointLight":
                         n = new THREE.PointLight(t.color, t.intensity, t.distance, t.decay);
                         break;
                     case "SpotLight":
                         n = new THREE.SpotLight(t.color, t.intensity, t.distance, t.angle, t.exponent, t.decay);
                         break;
                     case "HemisphereLight":
                         n = new THREE.HemisphereLight(t.color, t.groundColor, t.intensity);
                         break;
                     case "Mesh":
                         n = new THREE.Mesh(n(t.geometry), a(t.material));
                         break;
                     case "Line":
                         n = new THREE.Line(n(t.geometry), a(t.material), t.mode);
                         break;
                     case "PointCloud":
                         n = new THREE.PointCloud(n(t.geometry), a(t.material));
                         break;
                     case "Sprite":
                         n = new THREE.Sprite(a(t.material));
                         break;
                     case "Group":
                         n = new THREE.Group;
                         break;
                     default:
                         n = new THREE.Object3D
                 }
                 if (n.uuid = t.uuid, void 0 !== t.name && (n.name = t.name), void 0 !== t.matrix ? (e.fromArray(t.matrix), e.decompose(n.position, n.quaternion, n.scale)) : (void 0 !== t.position && n.position.fromArray(t.position), void 0 !== t.rotation && n.rotation.fromArray(t.rotation), void 0 !== t.scale && n.scale.fromArray(t.scale)), void 0 !== t.visible && (n.visible = t.visible), void 0 !== t.userData && (n.userData = t.userData), void 0 !== t.children)
                     for (var o in t.children) n.add(this.parseObject(t.children[o], r, i));
                 return n
             }
         }()
     }, THREE.TextureLoader = function(e) {
         this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
     }, THREE.TextureLoader.prototype = {
         constructor: THREE.TextureLoader,
         load: function(e, t, r, i) {
             var n = new THREE.ImageLoader(this.manager);
             n.setCrossOrigin(this.crossOrigin), n.load(e, function(e) {
                 e = new THREE.Texture(e), e.needsUpdate = !0, void 0 !== t && t(e)
             }, r, i)
         },
         setCrossOrigin: function(e) {
             this.crossOrigin = e
         }
     }, THREE.DataTextureLoader = THREE.BinaryTextureLoader = function() {
         this._parser = null
     }, THREE.BinaryTextureLoader.prototype = {
         constructor: THREE.BinaryTextureLoader,
         load: function(e, t, r, i) {
             var n = this,
                 a = new THREE.DataTexture,
                 o = new THREE.XHRLoader;
             return o.setResponseType("arraybuffer"), o.load(e, function(e) {
                 (e = n._parser(e)) && (void 0 !== e.image ? a.image = e.image : void 0 !== e.data && (a.image.width = e.width, a.image.height = e.height, a.image.data = e.data), a.wrapS = void 0 !== e.wrapS ? e.wrapS : THREE.ClampToEdgeWrapping, a.wrapT = void 0 !== e.wrapT ? e.wrapT : THREE.ClampToEdgeWrapping, a.magFilter = void 0 !== e.magFilter ? e.magFilter : THREE.LinearFilter, a.minFilter = void 0 !== e.minFilter ? e.minFilter : THREE.LinearMipMapLinearFilter, a.anisotropy = void 0 !== e.anisotropy ? e.anisotropy : 1, void 0 !== e.format && (a.format = e.format), void 0 !== e.type && (a.type = e.type), void 0 !== e.mipmaps && (a.mipmaps = e.mipmaps), 1 === e.mipmapCount && (a.minFilter = THREE.LinearFilter), a.needsUpdate = !0, t && t(a, e))
             }, r, i), a
         }
     }, THREE.CompressedTextureLoader = function() {
         this._parser = null
     }, THREE.CompressedTextureLoader.prototype = {
         constructor: THREE.CompressedTextureLoader,
         load: function(e, t, r) {
             var i = this,
                 n = [],
                 a = new THREE.CompressedTexture;
             a.image = n;
             var o = new THREE.XHRLoader;
             if (o.setResponseType("arraybuffer"), e instanceof Array) {
                 var s = 0;
                 r = function(r) {
                     o.load(e[r], function(e) {
                         e = i._parser(e, !0), n[r] = {
                             width: e.width,
                             height: e.height,
                             format: e.format,
                             mipmaps: e.mipmaps
                         }, s += 1, 6 === s && (1 == e.mipmapCount && (a.minFilter = THREE.LinearFilter), a.format = e.format, a.needsUpdate = !0, t && t(a))
                     })
                 };
                 for (var h = 0, l = e.length; l > h; ++h) r(h)
             } else o.load(e, function(e) {
                 if (e = i._parser(e, !0), e.isCubemap)
                     for (var r = e.mipmaps.length / e.mipmapCount, o = 0; r > o; o++) {
                         n[o] = {
                             mipmaps: []
                         };
                         for (var s = 0; s < e.mipmapCount; s++) n[o].mipmaps.push(e.mipmaps[o * e.mipmapCount + s]), n[o].format = e.format, n[o].width = e.width, n[o].height = e.height
                     } else a.image.width = e.width, a.image.height = e.height, a.mipmaps = e.mipmaps;
                 1 === e.mipmapCount && (a.minFilter = THREE.LinearFilter), a.format = e.format, a.needsUpdate = !0, t && t(a)
             });
             return a
         }
     }, THREE.Material = function() {
         Object.defineProperty(this, "id", {
             value: THREE.MaterialIdCount++
         }), this.uuid = THREE.Math.generateUUID(), this.name = "", this.type = "Material", this.side = THREE.FrontSide, this.opacity = 1, this.transparent = !1, this.blending = THREE.NormalBlending, this.blendSrc = THREE.SrcAlphaFactor, this.blendDst = THREE.OneMinusSrcAlphaFactor, this.blendEquation = THREE.AddEquation, this.blendEquationAlpha = this.blendDstAlpha = this.blendSrcAlpha = null, this.colorWrite = this.depthWrite = this.depthTest = !0, this.polygonOffset = !1, this.overdraw = this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0, this._needsUpdate = this.visible = !0
     }, THREE.Material.prototype = {
         constructor: THREE.Material,
         get needsUpdate() {
             return this._needsUpdate
         },
         set needsUpdate(e) {
             !0 === e && this.update(), this._needsUpdate = e
         },
         setValues: function(e) {
             if (void 0 !== e)
                 for (var t in e) {
                     var r = e[t];
                     if (void 0 === r) THREE.warn("THREE.Material: '" + t + "' parameter is undefined.");
                     else if (t in this) {
                         var i = this[t];
                         i instanceof THREE.Color ? i.set(r) : i instanceof THREE.Vector3 && r instanceof THREE.Vector3 ? i.copy(r) : this[t] = "overdraw" == t ? Number(r) : r
                     }
                 }
         },
         toJSON: function() {
             var e = {
                 metadata: {
                     version: 4.2,
                     type: "material",
                     generator: "MaterialExporter"
                 },
                 uuid: this.uuid,
                 type: this.type
             };
             return "" !== this.name && (e.name = this.name), this instanceof THREE.MeshBasicMaterial ? (e.color = this.color.getHex(), this.vertexColors !== THREE.NoColors && (e.vertexColors = this.vertexColors), this.blending !== THREE.NormalBlending && (e.blending = this.blending), this.side !== THREE.FrontSide && (e.side = this.side)) : this instanceof THREE.MeshLambertMaterial ? (e.color = this.color.getHex(), e.emissive = this.emissive.getHex(), this.vertexColors !== THREE.NoColors && (e.vertexColors = this.vertexColors), this.shading !== THREE.SmoothShading && (e.shading = this.shading), this.blending !== THREE.NormalBlending && (e.blending = this.blending), this.side !== THREE.FrontSide && (e.side = this.side)) : this instanceof THREE.MeshPhongMaterial ? (e.color = this.color.getHex(), e.emissive = this.emissive.getHex(), e.specular = this.specular.getHex(), e.shininess = this.shininess, this.vertexColors !== THREE.NoColors && (e.vertexColors = this.vertexColors), this.shading !== THREE.SmoothShading && (e.shading = this.shading), this.blending !== THREE.NormalBlending && (e.blending = this.blending), this.side !== THREE.FrontSide && (e.side = this.side)) : this instanceof THREE.MeshNormalMaterial ? (this.blending !== THREE.NormalBlending && (e.blending = this.blending), this.side !== THREE.FrontSide && (e.side = this.side)) : this instanceof THREE.MeshDepthMaterial ? (this.blending !== THREE.NormalBlending && (e.blending = this.blending), this.side !== THREE.FrontSide && (e.side = this.side)) : this instanceof THREE.PointCloudMaterial ? (e.size = this.size, e.sizeAttenuation = this.sizeAttenuation, e.color = this.color.getHex(), this.vertexColors !== THREE.NoColors && (e.vertexColors = this.vertexColors), this.blending !== THREE.NormalBlending && (e.blending = this.blending)) : this instanceof THREE.ShaderMaterial ? (e.uniforms = this.uniforms, e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader) : this instanceof THREE.SpriteMaterial && (e.color = this.color.getHex()), 1 > this.opacity && (e.opacity = this.opacity), !1 !== this.transparent && (e.transparent = this.transparent), !1 !== this.wireframe && (e.wireframe = this.wireframe), e
         },
         clone: function(e) {
             return void 0 === e && (e = new THREE.Material), e.name = this.name, e.side = this.side, e.opacity = this.opacity, e.transparent = this.transparent, e.blending = this.blending, e.blendSrc = this.blendSrc, e.blendDst = this.blendDst, e.blendEquation = this.blendEquation, e.blendSrcAlpha = this.blendSrcAlpha, e.blendDstAlpha = this.blendDstAlpha, e.blendEquationAlpha = this.blendEquationAlpha, e.depthTest = this.depthTest, e.depthWrite = this.depthWrite, e.polygonOffset = this.polygonOffset, e.polygonOffsetFactor = this.polygonOffsetFactor, e.polygonOffsetUnits = this.polygonOffsetUnits, e.alphaTest = this.alphaTest, e.overdraw = this.overdraw, e.visible = this.visible, e
         },
         update: function() {
             this.dispatchEvent({
                 type: "update"
             })
         },
         dispose: function() {
             this.dispatchEvent({
                 type: "dispose"
             })
         }
     }, THREE.EventDispatcher.prototype.apply(THREE.Material.prototype), THREE.MaterialIdCount = 0, THREE.LineBasicMaterial = function(e) {
         THREE.Material.call(this), this.type = "LineBasicMaterial", this.color = new THREE.Color(16777215), this.linewidth = 1, this.linejoin = this.linecap = "round", this.vertexColors = THREE.NoColors, this.fog = !0, this.setValues(e)
     }, THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype), THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial, THREE.LineBasicMaterial.prototype.clone = function() {
         var e = new THREE.LineBasicMaterial;
         return THREE.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.linewidth = this.linewidth, e.linecap = this.linecap, e.linejoin = this.linejoin, e.vertexColors = this.vertexColors, e.fog = this.fog, e
     }, THREE.LineDashedMaterial = function(e) {
         THREE.Material.call(this), this.type = "LineDashedMaterial", this.color = new THREE.Color(16777215), this.scale = this.linewidth = 1, this.dashSize = 3, this.gapSize = 1, this.vertexColors = !1, this.fog = !0, this.setValues(e)
     }, THREE.LineDashedMaterial.prototype = Object.create(THREE.Material.prototype), THREE.LineDashedMaterial.prototype.constructor = THREE.LineDashedMaterial, THREE.LineDashedMaterial.prototype.clone = function() {
         var e = new THREE.LineDashedMaterial;
         return THREE.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.linewidth = this.linewidth, e.scale = this.scale, e.dashSize = this.dashSize, e.gapSize = this.gapSize, e.vertexColors = this.vertexColors, e.fog = this.fog, e
     }, THREE.MeshBasicMaterial = function(e) {
         THREE.Material.call(this), this.type = "MeshBasicMaterial", this.color = new THREE.Color(16777215), this.envMap = this.alphaMap = this.specularMap = this.lightMap = this.map = null, this.combine = THREE.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = THREE.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinejoin = this.wireframeLinecap = "round", this.vertexColors = THREE.NoColors, this.morphTargets = this.skinning = !1, this.setValues(e)
     }, THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype), THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial, THREE.MeshBasicMaterial.prototype.clone = function() {
         var e = new THREE.MeshBasicMaterial;
         return THREE.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.map = this.map, e.lightMap = this.lightMap, e.specularMap = this.specularMap, e.alphaMap = this.alphaMap, e.envMap = this.envMap, e.combine = this.combine, e.reflectivity = this.reflectivity, e.refractionRatio = this.refractionRatio, e.fog = this.fog, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.wireframeLinecap = this.wireframeLinecap, e.wireframeLinejoin = this.wireframeLinejoin, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e
     }, THREE.MeshLambertMaterial = function(e) {
         THREE.Material.call(this), this.type = "MeshLambertMaterial", this.color = new THREE.Color(16777215), this.emissive = new THREE.Color(0), this.wrapAround = !1, this.wrapRGB = new THREE.Vector3(1, 1, 1), this.envMap = this.alphaMap = this.specularMap = this.lightMap = this.map = null, this.combine = THREE.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = THREE.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinejoin = this.wireframeLinecap = "round", this.vertexColors = THREE.NoColors, this.morphNormals = this.morphTargets = this.skinning = !1, this.setValues(e)
     }, THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype), THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial, THREE.MeshLambertMaterial.prototype.clone = function() {
         var e = new THREE.MeshLambertMaterial;
         return THREE.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.emissive.copy(this.emissive), e.wrapAround = this.wrapAround, e.wrapRGB.copy(this.wrapRGB), e.map = this.map, e.lightMap = this.lightMap, e.specularMap = this.specularMap, e.alphaMap = this.alphaMap, e.envMap = this.envMap, e.combine = this.combine, e.reflectivity = this.reflectivity, e.refractionRatio = this.refractionRatio, e.fog = this.fog, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.wireframeLinecap = this.wireframeLinecap, e.wireframeLinejoin = this.wireframeLinejoin, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
     }, THREE.MeshPhongMaterial = function(e) {
         THREE.Material.call(this), this.type = "MeshPhongMaterial", this.color = new THREE.Color(16777215), this.emissive = new THREE.Color(0), this.specular = new THREE.Color(1118481), this.shininess = 30, this.wrapAround = this.metal = !1, this.wrapRGB = new THREE.Vector3(1, 1, 1), this.bumpMap = this.lightMap = this.map = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new THREE.Vector2(1, 1), this.envMap = this.alphaMap = this.specularMap = null, this.combine = THREE.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = THREE.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinejoin = this.wireframeLinecap = "round", this.vertexColors = THREE.NoColors, this.morphNormals = this.morphTargets = this.skinning = !1, this.setValues(e)
     }, THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype), THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial, THREE.MeshPhongMaterial.prototype.clone = function() {
         var e = new THREE.MeshPhongMaterial;
         return THREE.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.emissive.copy(this.emissive), e.specular.copy(this.specular), e.shininess = this.shininess, e.metal = this.metal, e.wrapAround = this.wrapAround, e.wrapRGB.copy(this.wrapRGB), e.map = this.map, e.lightMap = this.lightMap, e.bumpMap = this.bumpMap, e.bumpScale = this.bumpScale, e.normalMap = this.normalMap, e.normalScale.copy(this.normalScale), e.specularMap = this.specularMap, e.alphaMap = this.alphaMap, e.envMap = this.envMap, e.combine = this.combine, e.reflectivity = this.reflectivity, e.refractionRatio = this.refractionRatio, e.fog = this.fog, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.wireframeLinecap = this.wireframeLinecap, e.wireframeLinejoin = this.wireframeLinejoin, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
     }, THREE.MeshDepthMaterial = function(e) {
         THREE.Material.call(this), this.type = "MeshDepthMaterial", this.wireframe = this.morphTargets = !1, this.wireframeLinewidth = 1, this.setValues(e)
     }, THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype), THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial, THREE.MeshDepthMaterial.prototype.clone = function() {
         var e = new THREE.MeshDepthMaterial;
         return THREE.Material.prototype.clone.call(this, e), e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e
     }, THREE.MeshNormalMaterial = function(e) {
         THREE.Material.call(this, e), this.type = "MeshNormalMaterial", this.wireframe = !1, this.wireframeLinewidth = 1, this.morphTargets = !1, this.setValues(e)
     }, THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype), THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial, THREE.MeshNormalMaterial.prototype.clone = function() {
         var e = new THREE.MeshNormalMaterial;
         return THREE.Material.prototype.clone.call(this, e), e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e
     }, THREE.MeshFaceMaterial = function(e) {
         this.uuid = THREE.Math.generateUUID(), this.type = "MeshFaceMaterial", this.materials = e instanceof Array ? e : []
     }, THREE.MeshFaceMaterial.prototype = {
         constructor: THREE.MeshFaceMaterial,
         toJSON: function() {
             for (var e = {
                     metadata: {
                         version: 4.2,
                         type: "material",
                         generator: "MaterialExporter"
                     },
                     uuid: this.uuid,
                     type: this.type,
                     materials: []
                 }, t = 0, r = this.materials.length; r > t; t++) e.materials.push(this.materials[t].toJSON());
             return e
         },
         clone: function() {
             for (var e = new THREE.MeshFaceMaterial, t = 0; t < this.materials.length; t++) e.materials.push(this.materials[t].clone());
             return e
         }
     }, THREE.PointCloudMaterial = function(e) {
         THREE.Material.call(this), this.type = "PointCloudMaterial", this.color = new THREE.Color(16777215), this.map = null, this.size = 1, this.sizeAttenuation = !0, this.vertexColors = THREE.NoColors, this.fog = !0, this.setValues(e)
     }, THREE.PointCloudMaterial.prototype = Object.create(THREE.Material.prototype), THREE.PointCloudMaterial.prototype.constructor = THREE.PointCloudMaterial, THREE.PointCloudMaterial.prototype.clone = function() {
         var e = new THREE.PointCloudMaterial;
         return THREE.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.map = this.map, e.size = this.size, e.sizeAttenuation = this.sizeAttenuation, e.vertexColors = this.vertexColors, e.fog = this.fog, e
     }, THREE.ParticleBasicMaterial = function(e) {
         return THREE.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointCloudMaterial."), new THREE.PointCloudMaterial(e)
     }, THREE.ParticleSystemMaterial = function(e) {
         return THREE.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointCloudMaterial."), new THREE.PointCloudMaterial(e)
     }, THREE.ShaderMaterial = function(e) {
         THREE.Material.call(this), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.attributes = null, this.vertexShader = "void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.shading = THREE.SmoothShading, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.lights = this.fog = !1, this.vertexColors = THREE.NoColors, this.morphNormals = this.morphTargets = this.skinning = !1, this.defaultAttributeValues = {
             color: [1, 1, 1],
             uv: [0, 0],
             uv2: [0, 0]
         }, this.index0AttributeName = void 0, this.setValues(e)
     }, THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype), THREE.ShaderMaterial.prototype.constructor = THREE.ShaderMaterial, THREE.ShaderMaterial.prototype.clone = function() {
         var e = new THREE.ShaderMaterial;
         return THREE.Material.prototype.clone.call(this, e), e.fragmentShader = this.fragmentShader, e.vertexShader = this.vertexShader, e.uniforms = THREE.UniformsUtils.clone(this.uniforms), e.attributes = this.attributes, e.defines = this.defines, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.fog = this.fog, e.lights = this.lights, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
     }, THREE.RawShaderMaterial = function(e) {
         THREE.ShaderMaterial.call(this, e), this.type = "RawShaderMaterial"
     }, THREE.RawShaderMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype), THREE.RawShaderMaterial.prototype.constructor = THREE.RawShaderMaterial, THREE.RawShaderMaterial.prototype.clone = function() {
         var e = new THREE.RawShaderMaterial;
         return THREE.ShaderMaterial.prototype.clone.call(this, e), e
     }, THREE.SpriteMaterial = function(e) {
         THREE.Material.call(this), this.type = "SpriteMaterial", this.color = new THREE.Color(16777215), this.map = null, this.rotation = 0, this.fog = !1, this.setValues(e)
     }, THREE.SpriteMaterial.prototype = Object.create(THREE.Material.prototype), THREE.SpriteMaterial.prototype.constructor = THREE.SpriteMaterial, THREE.SpriteMaterial.prototype.clone = function() {
         var e = new THREE.SpriteMaterial;
         return THREE.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.map = this.map, e.rotation = this.rotation, e.fog = this.fog, e
     }, THREE.Texture = function(e, t, r, i, n, a, o, s, h) {
         Object.defineProperty(this, "id", {
             value: THREE.TextureIdCount++
         }), this.uuid = THREE.Math.generateUUID(), this.sourceFile = this.name = "", this.image = void 0 !== e ? e : THREE.Texture.DEFAULT_IMAGE, this.mipmaps = [], this.mapping = void 0 !== t ? t : THREE.Texture.DEFAULT_MAPPING, this.wrapS = void 0 !== r ? r : THREE.ClampToEdgeWrapping, this.wrapT = void 0 !== i ? i : THREE.ClampToEdgeWrapping, this.magFilter = void 0 !== n ? n : THREE.LinearFilter, this.minFilter = void 0 !== a ? a : THREE.LinearMipMapLinearFilter, this.anisotropy = void 0 !== h ? h : 1, this.format = void 0 !== o ? o : THREE.RGBAFormat, this.type = void 0 !== s ? s : THREE.UnsignedByteType, this.offset = new THREE.Vector2(0, 0), this.repeat = new THREE.Vector2(1, 1), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this._needsUpdate = !1, this.onUpdate = null
     }, THREE.Texture.DEFAULT_IMAGE = void 0, THREE.Texture.DEFAULT_MAPPING = THREE.UVMapping, THREE.Texture.prototype = {
         constructor: THREE.Texture,
         get needsUpdate() {
             return this._needsUpdate
         },
         set needsUpdate(e) {
             !0 === e && this.update(), this._needsUpdate = e
         },
         clone: function(e) {
             return void 0 === e && (e = new THREE.Texture), e.image = this.image, e.mipmaps = this.mipmaps.slice(0), e.mapping = this.mapping, e.wrapS = this.wrapS, e.wrapT = this.wrapT, e.magFilter = this.magFilter, e.minFilter = this.minFilter, e.anisotropy = this.anisotropy, e.format = this.format, e.type = this.type, e.offset.copy(this.offset), e.repeat.copy(this.repeat), e.generateMipmaps = this.generateMipmaps, e.premultiplyAlpha = this.premultiplyAlpha, e.flipY = this.flipY, e.unpackAlignment = this.unpackAlignment, e
         },
         update: function() {
             this.dispatchEvent({
                 type: "update"
             })
         },
         dispose: function() {
             this.dispatchEvent({
                 type: "dispose"
             })
         }
     }, THREE.EventDispatcher.prototype.apply(THREE.Texture.prototype), THREE.TextureIdCount = 0, THREE.CubeTexture = function(e, t, r, i, n, a, o, s, h) {
         t = void 0 !== t ? t : THREE.CubeReflectionMapping, THREE.Texture.call(this, e, t, r, i, n, a, o, s, h), this.images = e
     }, THREE.CubeTexture.prototype = Object.create(THREE.Texture.prototype), THREE.CubeTexture.prototype.constructor = THREE.CubeTexture, THREE.CubeTexture.clone = function(e) {
         return void 0 === e && (e = new THREE.CubeTexture), THREE.Texture.prototype.clone.call(this, e), e.images = this.images, e
     }, THREE.CompressedTexture = function(e, t, r, i, n, a, o, s, h, l, u) {
         THREE.Texture.call(this, null, a, o, s, h, l, i, n, u), this.image = {
             width: t,
             height: r
         }, this.mipmaps = e, this.generateMipmaps = this.flipY = !1
     }, THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype), THREE.CompressedTexture.prototype.constructor = THREE.CompressedTexture, THREE.CompressedTexture.prototype.clone = function() {
         var e = new THREE.CompressedTexture;
         return THREE.Texture.prototype.clone.call(this, e), e
     }, THREE.DataTexture = function(e, t, r, i, n, a, o, s, h, l, u) {
         THREE.Texture.call(this, null, a, o, s, h, l, i, n, u), this.image = {
             data: e,
             width: t,
             height: r
         }
     }, THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype), THREE.DataTexture.prototype.constructor = THREE.DataTexture,
     THREE.DataTexture.prototype.clone = function() {
         var e = new THREE.DataTexture;
         return THREE.Texture.prototype.clone.call(this, e), e
     }, THREE.VideoTexture = function(e, t, r, i, n, a, o, s, h) {
         THREE.Texture.call(this, e, t, r, i, n, a, o, s, h), this.generateMipmaps = !1;
         var l = this,
             u = function() {
                 requestAnimationFrame(u), e.readyState === e.HAVE_ENOUGH_DATA && (l.needsUpdate = !0)
             };
         u()
     }, THREE.VideoTexture.prototype = Object.create(THREE.Texture.prototype), THREE.VideoTexture.prototype.constructor = THREE.VideoTexture, THREE.Group = function() {
         THREE.Object3D.call(this), this.type = "Group"
     }, THREE.Group.prototype = Object.create(THREE.Object3D.prototype), THREE.Group.prototype.constructor = THREE.Group, THREE.PointCloud = function(e, t) {
         THREE.Object3D.call(this), this.type = "PointCloud", this.geometry = void 0 !== e ? e : new THREE.Geometry, this.material = void 0 !== t ? t : new THREE.PointCloudMaterial({
             color: 16777215 * Math.random()
         })
     }, THREE.PointCloud.prototype = Object.create(THREE.Object3D.prototype), THREE.PointCloud.prototype.constructor = THREE.PointCloud, THREE.PointCloud.prototype.raycast = function() {
         var e = new THREE.Matrix4,
             t = new THREE.Ray;
         return function(r, i) {
             var n = this,
                 a = n.geometry,
                 o = r.params.PointCloud.threshold;
             if (e.getInverse(this.matrixWorld), t.copy(r.ray).applyMatrix4(e), null === a.boundingBox || !1 !== t.isIntersectionBox(a.boundingBox)) {
                 var s = o / ((this.scale.x + this.scale.y + this.scale.z) / 3),
                     h = new THREE.Vector3,
                     o = function(e, a) {
                         var o = t.distanceToPoint(e);
                         if (s > o) {
                             var h = t.closestPointToPoint(e);
                             h.applyMatrix4(n.matrixWorld);
                             var l = r.ray.origin.distanceTo(h);
                             i.push({
                                 distance: l,
                                 distanceToRay: o,
                                 point: h.clone(),
                                 index: a,
                                 face: null,
                                 object: n
                             })
                         }
                     };
                 if (a instanceof THREE.BufferGeometry) {
                     var l = a.attributes,
                         u = l.position.array;
                     if (void 0 !== l.index) {
                         var l = l.index.array,
                             c = a.offsets;
                         0 === c.length && (c = [{
                             start: 0,
                             count: l.length,
                             index: 0
                         }]);
                         for (var d = 0, f = c.length; f > d; ++d)
                             for (var p = c[d].start, m = c[d].index, a = p, p = p + c[d].count; p > a; a++) {
                                 var E = m + l[a];
                                 h.fromArray(u, 3 * E), o(h, E)
                             }
                     } else
                         for (l = u.length / 3, a = 0; l > a; a++) h.set(u[3 * a], u[3 * a + 1], u[3 * a + 2]), o(h, a)
                 } else
                     for (h = this.geometry.vertices, a = 0; a < h.length; a++) o(h[a], a)
             }
         }
     }(), THREE.PointCloud.prototype.clone = function(e) {
         return void 0 === e && (e = new THREE.PointCloud(this.geometry, this.material)), THREE.Object3D.prototype.clone.call(this, e), e
     }, THREE.ParticleSystem = function(e, t) {
         return THREE.warn("THREE.ParticleSystem has been renamed to THREE.PointCloud."), new THREE.PointCloud(e, t)
     }, THREE.Line = function(e, t, r) {
         THREE.Object3D.call(this), this.type = "Line", this.geometry = void 0 !== e ? e : new THREE.Geometry, this.material = void 0 !== t ? t : new THREE.LineBasicMaterial({
             color: 16777215 * Math.random()
         }), this.mode = void 0 !== r ? r : THREE.LineStrip
     }, THREE.LineStrip = 0, THREE.LinePieces = 1, THREE.Line.prototype = Object.create(THREE.Object3D.prototype), THREE.Line.prototype.constructor = THREE.Line, THREE.Line.prototype.raycast = function() {
         var e = new THREE.Matrix4,
             t = new THREE.Ray,
             r = new THREE.Sphere;
         return function(i, n) {
             var a = i.linePrecision,
                 a = a * a,
                 o = this.geometry;
             if (null === o.boundingSphere && o.computeBoundingSphere(), r.copy(o.boundingSphere), r.applyMatrix4(this.matrixWorld), !1 !== i.ray.isIntersectionSphere(r)) {
                 e.getInverse(this.matrixWorld), t.copy(i.ray).applyMatrix4(e);
                 var s = new THREE.Vector3,
                     h = new THREE.Vector3,
                     l = new THREE.Vector3,
                     u = new THREE.Vector3,
                     c = this.mode === THREE.LineStrip ? 1 : 2;
                 if (o instanceof THREE.BufferGeometry) {
                     var d = o.attributes;
                     if (void 0 !== d.index) {
                         var f = d.index.array,
                             d = d.position.array,
                             p = o.offsets;
                         0 === p.length && (p = [{
                             start: 0,
                             count: f.length,
                             index: 0
                         }]);
                         for (var m = 0; m < p.length; m++)
                             for (var E = p[m].start, g = p[m].count, v = p[m].index, o = E; E + g - 1 > o; o += c) {
                                 var y = v + f[o + 1];
                                 s.fromArray(d, 3 * (v + f[o])), h.fromArray(d, 3 * y), y = t.distanceSqToSegment(s, h, u, l), y > a || (y = t.origin.distanceTo(u), y < i.near || y > i.far || n.push({
                                     distance: y,
                                     point: l.clone().applyMatrix4(this.matrixWorld),
                                     index: o,
                                     offsetIndex: m,
                                     face: null,
                                     faceIndex: null,
                                     object: this
                                 }))
                             }
                     } else
                         for (d = d.position.array, o = 0; o < d.length / 3 - 1; o += c) s.fromArray(d, 3 * o), h.fromArray(d, 3 * o + 3), y = t.distanceSqToSegment(s, h, u, l), y > a || (y = t.origin.distanceTo(u), y < i.near || y > i.far || n.push({
                             distance: y,
                             point: l.clone().applyMatrix4(this.matrixWorld),
                             index: o,
                             face: null,
                             faceIndex: null,
                             object: this
                         }))
                 } else if (o instanceof THREE.Geometry)
                     for (s = o.vertices, h = s.length, o = 0; h - 1 > o; o += c) y = t.distanceSqToSegment(s[o], s[o + 1], u, l), y > a || (y = t.origin.distanceTo(u), y < i.near || y > i.far || n.push({
                         distance: y,
                         point: l.clone().applyMatrix4(this.matrixWorld),
                         index: o,
                         face: null,
                         faceIndex: null,
                         object: this
                     }))
             }
         }
     }(), THREE.Line.prototype.clone = function(e) {
         return void 0 === e && (e = new THREE.Line(this.geometry, this.material, this.mode)), THREE.Object3D.prototype.clone.call(this, e), e
     }, THREE.Mesh = function(e, t) {
         THREE.Object3D.call(this), this.type = "Mesh", this.geometry = void 0 !== e ? e : new THREE.Geometry, this.material = void 0 !== t ? t : new THREE.MeshBasicMaterial({
             color: 16777215 * Math.random()
         }), this.updateMorphTargets()
     }, THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype), THREE.Mesh.prototype.constructor = THREE.Mesh, THREE.Mesh.prototype.updateMorphTargets = function() {
         if (void 0 !== this.geometry.morphTargets && 0 < this.geometry.morphTargets.length) {
             this.morphTargetBase = -1, this.morphTargetForcedOrder = [], this.morphTargetInfluences = [], this.morphTargetDictionary = {};
             for (var e = 0, t = this.geometry.morphTargets.length; t > e; e++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[e].name] = e
         }
     }, THREE.Mesh.prototype.getMorphTargetIndexByName = function(e) {
         return void 0 !== this.morphTargetDictionary[e] ? this.morphTargetDictionary[e] : (THREE.warn("THREE.Mesh.getMorphTargetIndexByName: morph target " + e + " does not exist. Returning 0."), 0)
     }, THREE.Mesh.prototype.raycast = function() {
         var e = new THREE.Matrix4,
             t = new THREE.Ray,
             r = new THREE.Sphere,
             i = new THREE.Vector3,
             n = new THREE.Vector3,
             a = new THREE.Vector3;
         return function(o, s) {
             var h = this.geometry;
             if (null === h.boundingSphere && h.computeBoundingSphere(), r.copy(h.boundingSphere), r.applyMatrix4(this.matrixWorld), !1 !== o.ray.isIntersectionSphere(r) && (e.getInverse(this.matrixWorld), t.copy(o.ray).applyMatrix4(e), null === h.boundingBox || !1 !== t.isIntersectionBox(h.boundingBox)))
                 if (h instanceof THREE.BufferGeometry) {
                     var l = this.material;
                     if (void 0 !== l) {
                         var u = h.attributes,
                             c, d, f = o.precision;
                         if (void 0 !== u.index) {
                             var p = u.index.array,
                                 m = u.position.array,
                                 E = h.offsets;
                             0 === E.length && (E = [{
                                 start: 0,
                                 count: p.length,
                                 index: 0
                             }]);
                             for (var g = 0, v = E.length; v > g; ++g)
                                 for (var u = E[g].start, y = E[g].index, h = u, T = u + E[g].count; T > h; h += 3) {
                                     u = y + p[h], c = y + p[h + 1], d = y + p[h + 2], i.fromArray(m, 3 * u), n.fromArray(m, 3 * c), a.fromArray(m, 3 * d);
                                     var R = l.side === THREE.BackSide ? t.intersectTriangle(a, n, i, !0) : t.intersectTriangle(i, n, a, l.side !== THREE.DoubleSide);
                                     if (null !== R) {
                                         R.applyMatrix4(this.matrixWorld);
                                         var x = o.ray.origin.distanceTo(R);
                                         f > x || x < o.near || x > o.far || s.push({
                                             distance: x,
                                             point: R,
                                             face: new THREE.Face3(u, c, d, THREE.Triangle.normal(i, n, a)),
                                             faceIndex: null,
                                             object: this
                                         })
                                     }
                                 }
                         } else
                             for (m = u.position.array, p = h = 0, T = m.length; T > h; h += 3, p += 9) u = h, c = h + 1, d = h + 2, i.fromArray(m, p), n.fromArray(m, p + 3), a.fromArray(m, p + 6), R = l.side === THREE.BackSide ? t.intersectTriangle(a, n, i, !0) : t.intersectTriangle(i, n, a, l.side !== THREE.DoubleSide), null !== R && (R.applyMatrix4(this.matrixWorld), x = o.ray.origin.distanceTo(R), f > x || x < o.near || x > o.far || s.push({
                                 distance: x,
                                 point: R,
                                 face: new THREE.Face3(u, c, d, THREE.Triangle.normal(i, n, a)),
                                 faceIndex: null,
                                 object: this
                             }))
                     }
                 } else if (h instanceof THREE.Geometry)
                 for (p = this.material instanceof THREE.MeshFaceMaterial, m = !0 === p ? this.material.materials : null, f = o.precision, E = h.vertices, g = 0, v = h.faces.length; v > g; g++)
                     if (y = h.faces[g], l = !0 === p ? m[y.materialIndex] : this.material, void 0 !== l) {
                         if (u = E[y.a], c = E[y.b], d = E[y.c], !0 === l.morphTargets) {
                             R = h.morphTargets, x = this.morphTargetInfluences, i.set(0, 0, 0), n.set(0, 0, 0), a.set(0, 0, 0);
                             for (var T = 0, H = R.length; H > T; T++) {
                                 var _ = x[T];
                                 if (0 !== _) {
                                     var b = R[T].vertices;
                                     i.x += (b[y.a].x - u.x) * _, i.y += (b[y.a].y - u.y) * _, i.z += (b[y.a].z - u.z) * _, n.x += (b[y.b].x - c.x) * _, n.y += (b[y.b].y - c.y) * _, n.z += (b[y.b].z - c.z) * _, a.x += (b[y.c].x - d.x) * _, a.y += (b[y.c].y - d.y) * _, a.z += (b[y.c].z - d.z) * _
                                 }
                             }
                             i.add(u), n.add(c), a.add(d), u = i, c = n, d = a
                         }
                         R = l.side === THREE.BackSide ? t.intersectTriangle(d, c, u, !0) : t.intersectTriangle(u, c, d, l.side !== THREE.DoubleSide), null !== R && (R.applyMatrix4(this.matrixWorld), x = o.ray.origin.distanceTo(R), f > x || x < o.near || x > o.far || s.push({
                             distance: x,
                             point: R,
                             face: y,
                             faceIndex: g,
                             object: this
                         }))
                     }
         }
     }(), THREE.Mesh.prototype.clone = function(e, t) {
         return void 0 === e && (e = new THREE.Mesh(this.geometry, this.material)), THREE.Object3D.prototype.clone.call(this, e, t), e
     }, THREE.Bone = function(e) {
         THREE.Object3D.call(this), this.type = "Bone", this.skin = e
     }, THREE.Bone.prototype = Object.create(THREE.Object3D.prototype), THREE.Bone.prototype.constructor = THREE.Bone, THREE.Skeleton = function(e, t, r) {
         if (this.useVertexTexture = void 0 !== r ? r : !0, this.identityMatrix = new THREE.Matrix4, e = e || [], this.bones = e.slice(0), this.useVertexTexture ? (this.boneTextureHeight = this.boneTextureWidth = e = 256 < this.bones.length ? 64 : 64 < this.bones.length ? 32 : 16 < this.bones.length ? 16 : 8, this.boneMatrices = new Float32Array(this.boneTextureWidth * this.boneTextureHeight * 4), this.boneTexture = new THREE.DataTexture(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, THREE.RGBAFormat, THREE.FloatType), this.boneTexture.minFilter = THREE.NearestFilter, this.boneTexture.magFilter = THREE.NearestFilter, this.boneTexture.generateMipmaps = !1, this.boneTexture.flipY = !1) : this.boneMatrices = new Float32Array(16 * this.bones.length), void 0 === t) this.calculateInverses();
         else if (this.bones.length === t.length) this.boneInverses = t.slice(0);
         else
             for (THREE.warn("THREE.Skeleton bonInverses is the wrong length."), this.boneInverses = [], t = 0, e = this.bones.length; e > t; t++) this.boneInverses.push(new THREE.Matrix4)
     }, THREE.Skeleton.prototype.calculateInverses = function() {
         this.boneInverses = [];
         for (var e = 0, t = this.bones.length; t > e; e++) {
             var r = new THREE.Matrix4;
             this.bones[e] && r.getInverse(this.bones[e].matrixWorld), this.boneInverses.push(r)
         }
     }, THREE.Skeleton.prototype.pose = function() {
         for (var e, t = 0, r = this.bones.length; r > t; t++)(e = this.bones[t]) && e.matrixWorld.getInverse(this.boneInverses[t]);
         for (t = 0, r = this.bones.length; r > t; t++)(e = this.bones[t]) && (e.parent ? (e.matrix.getInverse(e.parent.matrixWorld), e.matrix.multiply(e.matrixWorld)) : e.matrix.copy(e.matrixWorld), e.matrix.decompose(e.position, e.quaternion, e.scale))
     }, THREE.Skeleton.prototype.update = function() {
         var e = new THREE.Matrix4;
         return function() {
             for (var t = 0, r = this.bones.length; r > t; t++) e.multiplyMatrices(this.bones[t] ? this.bones[t].matrixWorld : this.identityMatrix, this.boneInverses[t]), e.flattenToArrayOffset(this.boneMatrices, 16 * t);
             this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
         }
     }(), THREE.SkinnedMesh = function(e, t, r) {
         if (THREE.Mesh.call(this, e, t), this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new THREE.Matrix4, this.bindMatrixInverse = new THREE.Matrix4, e = [], this.geometry && void 0 !== this.geometry.bones) {
             for (var i, n, a, o, s = 0, h = this.geometry.bones.length; h > s; ++s) i = this.geometry.bones[s], n = i.pos, a = i.rotq, o = i.scl, t = new THREE.Bone(this), e.push(t), t.name = i.name, t.position.set(n[0], n[1], n[2]), t.quaternion.set(a[0], a[1], a[2], a[3]), void 0 !== o ? t.scale.set(o[0], o[1], o[2]) : t.scale.set(1, 1, 1);
             for (s = 0, h = this.geometry.bones.length; h > s; ++s) i = this.geometry.bones[s], -1 !== i.parent ? e[i.parent].add(e[s]) : this.add(e[s])
         }
         this.normalizeSkinWeights(), this.updateMatrixWorld(!0), this.bind(new THREE.Skeleton(e, void 0, r))
     }, THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype), THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh, THREE.SkinnedMesh.prototype.bind = function(e, t) {
         this.skeleton = e, void 0 === t && (this.updateMatrixWorld(!0), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.getInverse(t)
     }, THREE.SkinnedMesh.prototype.pose = function() {
         this.skeleton.pose()
     }, THREE.SkinnedMesh.prototype.normalizeSkinWeights = function() {
         if (this.geometry instanceof THREE.Geometry)
             for (var e = 0; e < this.geometry.skinIndices.length; e++) {
                 var t = this.geometry.skinWeights[e],
                     r = 1 / t.lengthManhattan();
                 1 / 0 !== r ? t.multiplyScalar(r) : t.set(1)
             }
     }, THREE.SkinnedMesh.prototype.updateMatrixWorld = function(e) {
         THREE.Mesh.prototype.updateMatrixWorld.call(this, !0), "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : THREE.warn("THREE.SkinnedMesh unreckognized bindMode: " + this.bindMode)
     }, THREE.SkinnedMesh.prototype.clone = function(e) {
         return void 0 === e && (e = new THREE.SkinnedMesh(this.geometry, this.material, this.useVertexTexture)), THREE.Mesh.prototype.clone.call(this, e), e
     }, THREE.MorphAnimMesh = function(e, t) {
         THREE.Mesh.call(this, e, t), this.type = "MorphAnimMesh", this.duration = 1e3, this.mirroredLoop = !1, this.currentKeyframe = this.lastKeyframe = this.time = 0, this.direction = 1, this.directionBackwards = !1, this.setFrameRange(0, this.geometry.morphTargets.length - 1)
     }, THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype), THREE.MorphAnimMesh.prototype.constructor = THREE.MorphAnimMesh, THREE.MorphAnimMesh.prototype.setFrameRange = function(e, t) {
         this.startKeyframe = e, this.endKeyframe = t, this.length = this.endKeyframe - this.startKeyframe + 1
     }, THREE.MorphAnimMesh.prototype.setDirectionForward = function() {
         this.direction = 1, this.directionBackwards = !1
     }, THREE.MorphAnimMesh.prototype.setDirectionBackward = function() {
         this.direction = -1, this.directionBackwards = !0
     }, THREE.MorphAnimMesh.prototype.parseAnimations = function() {
         var e = this.geometry;
         e.animations || (e.animations = {});
         for (var t, r = e.animations, i = /([a-z]+)_?(\d+)/, n = 0, a = e.morphTargets.length; a > n; n++) {
             var o = e.morphTargets[n].name.match(i);
             if (o && 1 < o.length) {
                 o = o[1], r[o] || (r[o] = {
                     start: 1 / 0,
                     end: -(1 / 0)
                 });
                 var s = r[o];
                 n < s.start && (s.start = n), n > s.end && (s.end = n), t || (t = o)
             }
         }
         e.firstAnimation = t
     }, THREE.MorphAnimMesh.prototype.setAnimationLabel = function(e, t, r) {
         this.geometry.animations || (this.geometry.animations = {}), this.geometry.animations[e] = {
             start: t,
             end: r
         }
     }, THREE.MorphAnimMesh.prototype.playAnimation = function(e, t) {
         var r = this.geometry.animations[e];
         r ? (this.setFrameRange(r.start, r.end), this.duration = (r.end - r.start) / t * 1e3, this.time = 0) : THREE.warn("THREE.MorphAnimMesh: animation[" + e + "] undefined in .playAnimation()")
     }, THREE.MorphAnimMesh.prototype.updateAnimation = function(e) {
         var t = this.duration / this.length;
         this.time += this.direction * e, this.mirroredLoop ? (this.time > this.duration || 0 > this.time) && (this.direction *= -1, this.time > this.duration && (this.time = this.duration, this.directionBackwards = !0), 0 > this.time && (this.time = 0, this.directionBackwards = !1)) : (this.time %= this.duration, 0 > this.time && (this.time += this.duration)), e = this.startKeyframe + THREE.Math.clamp(Math.floor(this.time / t), 0, this.length - 1), e !== this.currentKeyframe && (this.morphTargetInfluences[this.lastKeyframe] = 0, this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[e] = 0, this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = e), t = this.time % t / t, this.directionBackwards && (t = 1 - t), this.morphTargetInfluences[this.currentKeyframe] = t, this.morphTargetInfluences[this.lastKeyframe] = 1 - t
     }, THREE.MorphAnimMesh.prototype.interpolateTargets = function(e, t, r) {
         for (var i = this.morphTargetInfluences, n = 0, a = i.length; a > n; n++) i[n] = 0;
         e > -1 && (i[e] = 1 - r), t > -1 && (i[t] = r)
     }, THREE.MorphAnimMesh.prototype.clone = function(e) {
         return void 0 === e && (e = new THREE.MorphAnimMesh(this.geometry, this.material)), e.duration = this.duration, e.mirroredLoop = this.mirroredLoop, e.time = this.time, e.lastKeyframe = this.lastKeyframe, e.currentKeyframe = this.currentKeyframe, e.direction = this.direction, e.directionBackwards = this.directionBackwards, THREE.Mesh.prototype.clone.call(this, e), e
     }, THREE.LOD = function() {
         THREE.Object3D.call(this), this.objects = []
     }, THREE.LOD.prototype = Object.create(THREE.Object3D.prototype), THREE.LOD.prototype.constructor = THREE.LOD, THREE.LOD.prototype.addLevel = function(e, t) {
         void 0 === t && (t = 0), t = Math.abs(t);
         for (var r = 0; r < this.objects.length && !(t < this.objects[r].distance); r++);
         this.objects.splice(r, 0, {
             distance: t,
             object: e
         }), this.add(e)
     }, THREE.LOD.prototype.getObjectForDistance = function(e) {
         for (var t = 1, r = this.objects.length; r > t && !(e < this.objects[t].distance); t++);
         return this.objects[t - 1].object
     }, THREE.LOD.prototype.raycast = function() {
         var e = new THREE.Vector3;
         return function(t, r) {
             e.setFromMatrixPosition(this.matrixWorld);
             var i = t.ray.origin.distanceTo(e);
             this.getObjectForDistance(i).raycast(t, r)
         }
     }(), THREE.LOD.prototype.update = function() {
         var e = new THREE.Vector3,
             t = new THREE.Vector3;
         return function(r) {
             if (1 < this.objects.length) {
                 e.setFromMatrixPosition(r.matrixWorld), t.setFromMatrixPosition(this.matrixWorld), r = e.distanceTo(t), this.objects[0].object.visible = !0;
                 for (var i = 1, n = this.objects.length; n > i && r >= this.objects[i].distance; i++) this.objects[i - 1].object.visible = !1, this.objects[i].object.visible = !0;
                 for (; n > i; i++) this.objects[i].object.visible = !1
             }
         }
     }(), THREE.LOD.prototype.clone = function(e) {
         void 0 === e && (e = new THREE.LOD), THREE.Object3D.prototype.clone.call(this, e);
         for (var t = 0, r = this.objects.length; r > t; t++) {
             var i = this.objects[t].object.clone();
             i.visible = 0 === t, e.addLevel(i, this.objects[t].distance)
         }
         return e
     }, THREE.Sprite = function() {
         var e = new Uint16Array([0, 1, 2, 0, 2, 3]),
             t = new Float32Array([-.5, -.5, 0, .5, -.5, 0, .5, .5, 0, -.5, .5, 0]),
             r = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
             i = new THREE.BufferGeometry;
         return i.addAttribute("index", new THREE.BufferAttribute(e, 1)), i.addAttribute("position", new THREE.BufferAttribute(t, 3)), i.addAttribute("uv", new THREE.BufferAttribute(r, 2)),
             function(e) {
                 THREE.Object3D.call(this), this.type = "Sprite", this.geometry = i, this.material = void 0 !== e ? e : new THREE.SpriteMaterial
             }
     }(), THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype), THREE.Sprite.prototype.constructor = THREE.Sprite, THREE.Sprite.prototype.raycast = function() {
         var e = new THREE.Vector3;
         return function(t, r) {
             e.setFromMatrixPosition(this.matrixWorld);
             var i = t.ray.distanceToPoint(e);
             i > this.scale.x || r.push({
                 distance: i,
                 point: this.position,
                 face: null,
                 object: this
             })
         }
     }(), THREE.Sprite.prototype.clone = function(e) {
         return void 0 === e && (e = new THREE.Sprite(this.material)), THREE.Object3D.prototype.clone.call(this, e), e
     }, THREE.Particle = THREE.Sprite, THREE.LensFlare = function(e, t, r, i, n) {
         THREE.Object3D.call(this), this.lensFlares = [], this.positionScreen = new THREE.Vector3, this.customUpdateCallback = void 0, void 0 !== e && this.add(e, t, r, i, n)
     }, THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype), THREE.LensFlare.prototype.constructor = THREE.LensFlare, THREE.LensFlare.prototype.add = function(e, t, r, i, n, a) {
         void 0 === t && (t = -1), void 0 === r && (r = 0), void 0 === a && (a = 1), void 0 === n && (n = new THREE.Color(16777215)), void 0 === i && (i = THREE.NormalBlending), r = Math.min(r, Math.max(0, r)), this.lensFlares.push({
             texture: e,
             size: t,
             distance: r,
             x: 0,
             y: 0,
             z: 0,
             scale: 1,
             rotation: 1,
             opacity: a,
             color: n,
             blending: i
         })
     }, THREE.LensFlare.prototype.updateLensFlares = function() {
         var e, t = this.lensFlares.length,
             r, i = 2 * -this.positionScreen.x,
             n = 2 * -this.positionScreen.y;
         for (e = 0; t > e; e++) r = this.lensFlares[e], r.x = this.positionScreen.x + i * r.distance, r.y = this.positionScreen.y + n * r.distance, r.wantedRotation = r.x * Math.PI * .25, r.rotation += .25 * (r.wantedRotation - r.rotation)
     }, THREE.Scene = function() {
         THREE.Object3D.call(this), this.type = "Scene", this.overrideMaterial = this.fog = null, this.autoUpdate = !0
     }, THREE.Scene.prototype = Object.create(THREE.Object3D.prototype), THREE.Scene.prototype.constructor = THREE.Scene, THREE.Scene.prototype.clone = function(e) {
         return void 0 === e && (e = new THREE.Scene), THREE.Object3D.prototype.clone.call(this, e), null !== this.fog && (e.fog = this.fog.clone()), null !== this.overrideMaterial && (e.overrideMaterial = this.overrideMaterial.clone()), e.autoUpdate = this.autoUpdate, e.matrixAutoUpdate = this.matrixAutoUpdate, e
     }, THREE.Fog = function(e, t, r) {
         this.name = "", this.color = new THREE.Color(e), this.near = void 0 !== t ? t : 1, this.far = void 0 !== r ? r : 1e3
     }, THREE.Fog.prototype.clone = function() {
         return new THREE.Fog(this.color.getHex(), this.near, this.far)
     }, THREE.FogExp2 = function(e, t) {
         this.name = "", this.color = new THREE.Color(e), this.density = void 0 !== t ? t : 25e-5
     }, THREE.FogExp2.prototype.clone = function() {
         return new THREE.FogExp2(this.color.getHex(), this.density)
     }, THREE.ShaderChunk = {}, THREE.ShaderChunk.common = "#define PI 3.14159\n#define PI2 6.28318\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n\nfloat square( in float a ) { return a*a; }\nvec2  square( in vec2 a )  { return vec2( a.x*a.x, a.y*a.y ); }\nvec3  square( in vec3 a )  { return vec3( a.x*a.x, a.y*a.y, a.z*a.z ); }\nvec4  square( in vec4 a )  { return vec4( a.x*a.x, a.y*a.y, a.z*a.z, a.w*a.w ); }\nfloat saturate( in float a ) { return clamp( a, 0.0, 1.0 ); }\nvec2  saturate( in vec2 a )  { return clamp( a, 0.0, 1.0 ); }\nvec3  saturate( in vec3 a )  { return clamp( a, 0.0, 1.0 ); }\nvec4  saturate( in vec4 a )  { return clamp( a, 0.0, 1.0 ); }\nfloat average( in float a ) { return a; }\nfloat average( in vec2 a )  { return ( a.x + a.y) * 0.5; }\nfloat average( in vec3 a )  { return ( a.x + a.y + a.z) / 3.0; }\nfloat average( in vec4 a )  { return ( a.x + a.y + a.z + a.w) * 0.25; }\nfloat whiteCompliment( in float a ) { return saturate( 1.0 - a ); }\nvec2  whiteCompliment( in vec2 a )  { return saturate( vec2(1.0) - a ); }\nvec3  whiteCompliment( in vec3 a )  { return saturate( vec3(1.0) - a ); }\nvec4  whiteCompliment( in vec4 a )  { return saturate( vec4(1.0) - a ); }\nvec3 transformDirection( in vec3 normal, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( normal, 0.0 ) ).xyz );\n}\n// http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations\nvec3 inverseTransformDirection( in vec3 normal, in mat4 matrix ) {\n	return normalize( ( vec4( normal, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal) {\n	float distance = dot( planeNormal, point-pointOnPlane );\n	return point - distance * planeNormal;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n	return sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n	return pointOnLine + lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) );\n}\nfloat calcLightAttenuation( float lightDistance, float cutoffDistance, float decayExponent ) {\n	if ( decayExponent > 0.0 ) {\n	  return pow( saturate( 1.0 - lightDistance / cutoffDistance ), decayExponent );\n	}\n	return 1.0;\n}\n\nvec3 inputToLinear( in vec3 a ) {\n#ifdef GAMMA_INPUT\n	return pow( a, vec3( float( GAMMA_FACTOR ) ) );\n#else\n	return a;\n#endif\n}\nvec3 linearToOutput( in vec3 a ) {\n#ifdef GAMMA_OUTPUT\n	return pow( a, vec3( 1.0 / float( GAMMA_FACTOR ) ) );\n#else\n	return a;\n#endif\n}\n", THREE.ShaderChunk.alphatest_fragment = "#ifdef ALPHATEST\n\n	if ( diffuseColor.a < ALPHATEST ) discard;\n\n#endif\n", THREE.ShaderChunk.lights_lambert_vertex = "vLightFront = vec3( 0.0 );\n\n#ifdef DOUBLE_SIDED\n\n	vLightBack = vec3( 0.0 );\n\n#endif\n\ntransformedNormal = normalize( transformedNormal );\n\n#if MAX_DIR_LIGHTS > 0\n\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n	vec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\n	float dotProduct = dot( transformedNormal, dirVector );\n	vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n	#ifdef DOUBLE_SIDED\n\n		vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n		#ifdef WRAP_AROUND\n\n			vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n		#endif\n\n	#endif\n\n	#ifdef WRAP_AROUND\n\n		vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n		directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n\n		#ifdef DOUBLE_SIDED\n\n			directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n\n		#endif\n\n	#endif\n\n	vLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n\n	#ifdef DOUBLE_SIDED\n\n		vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n\n	#endif\n\n}\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n		float attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[ i ] );\n\n		lVector = normalize( lVector );\n		float dotProduct = dot( transformedNormal, lVector );\n\n		vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n		#ifdef DOUBLE_SIDED\n\n			vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n			#ifdef WRAP_AROUND\n\n				vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n			#endif\n\n		#endif\n\n		#ifdef WRAP_AROUND\n\n			vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n			pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n\n			#ifdef DOUBLE_SIDED\n\n				pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n\n			#endif\n\n		#endif\n\n		vLightFront += pointLightColor[ i ] * pointLightWeighting * attenuation;\n\n		#ifdef DOUBLE_SIDED\n\n			vLightBack += pointLightColor[ i ] * pointLightWeightingBack * attenuation;\n\n		#endif\n\n	}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n		float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\n\n		if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n			spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n			float attenuation = calcLightAttenuation( length( lVector ), spotLightDistance[ i ], spotLightDecay[ i ] );\n\n			lVector = normalize( lVector );\n\n			float dotProduct = dot( transformedNormal, lVector );\n			vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n			#ifdef DOUBLE_SIDED\n\n				vec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n				#ifdef WRAP_AROUND\n\n					vec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n				#endif\n\n			#endif\n\n			#ifdef WRAP_AROUND\n\n				vec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n				spotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n\n				#ifdef DOUBLE_SIDED\n\n					spotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n\n				#endif\n\n			#endif\n\n			vLightFront += spotLightColor[ i ] * spotLightWeighting * attenuation * spotEffect;\n\n			#ifdef DOUBLE_SIDED\n\n				vLightBack += spotLightColor[ i ] * spotLightWeightingBack * attenuation * spotEffect;\n\n			#endif\n\n		}\n\n	}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n		vec3 lVector = transformDirection( hemisphereLightDirection[ i ], viewMatrix );\n\n		float dotProduct = dot( transformedNormal, lVector );\n\n		float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n		float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\n\n		vLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n		#ifdef DOUBLE_SIDED\n\n			vLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n\n		#endif\n\n	}\n\n#endif\n\nvLightFront += ambientLightColor;\n\n#ifdef DOUBLE_SIDED\n\n	vLightBack += ambientLightColor;\n\n#endif\n", THREE.ShaderChunk.map_particle_pars_fragment = "#ifdef USE_MAP\n\n	uniform vec4 offsetRepeat;\n	uniform sampler2D map;\n\n#endif\n", THREE.ShaderChunk.default_vertex = "#ifdef USE_SKINNING\n\n	vec4 mvPosition = modelViewMatrix * skinned;\n\n#elif defined( USE_MORPHTARGETS )\n\n	vec4 mvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n\n#else\n\n	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\n#endif\n\ngl_Position = projectionMatrix * mvPosition;\n", THREE.ShaderChunk.map_pars_fragment = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	varying vec2 vUv;\n\n#endif\n\n#ifdef USE_MAP\n\n	uniform sampler2D map;\n\n#endif", THREE.ShaderChunk.skinnormal_vertex = "#ifdef USE_SKINNING\n\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\n	#ifdef USE_MORPHNORMALS\n\n	vec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n\n	#else\n\n	vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n\n	#endif\n\n#endif\n", THREE.ShaderChunk.logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		varying float vFragDepth;\n\n	#endif\n\n	uniform float logDepthBufFC;\n\n#endif", THREE.ShaderChunk.lightmap_pars_vertex = "#ifdef USE_LIGHTMAP\n\n	varying vec2 vUv2;\n\n#endif", THREE.ShaderChunk.lights_phong_fragment = "#ifndef FLAT_SHADED\n\n	vec3 normal = normalize( vNormal );\n\n	#ifdef DOUBLE_SIDED\n\n		normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\n	#endif\n\n#else\n\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n\n#endif\n\nvec3 viewPosition = normalize( vViewPosition );\n\n#ifdef USE_NORMALMAP\n\n	normal = perturbNormal2Arb( -vViewPosition, normal );\n\n#elif defined( USE_BUMPMAP )\n\n	normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\n#endif\n\nvec3 totalDiffuseLight = vec3( 0.0 );\nvec3 totalSpecularLight = vec3( 0.0 );\n\n#if MAX_POINT_LIGHTS > 0\n\n	for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n		float attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[ i ] );\n\n		lVector = normalize( lVector );\n\n		// diffuse\n\n		float dotProduct = dot( normal, lVector );\n\n		#ifdef WRAP_AROUND\n\n			float pointDiffuseWeightFull = max( dotProduct, 0.0 );\n			float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n			vec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n\n		#else\n\n			float pointDiffuseWeight = max( dotProduct, 0.0 );\n\n		#endif\n\n		totalDiffuseLight += pointLightColor[ i ] * pointDiffuseWeight * attenuation;\n\n				// specular\n\n		vec3 pointHalfVector = normalize( lVector + viewPosition );\n		float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n		float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, pointHalfVector ), 0.0 ), 5.0 );\n		totalSpecularLight += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * attenuation * specularNormalization;\n\n	}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n		float attenuation = calcLightAttenuation( length( lVector ), spotLightDistance[ i ], spotLightDecay[ i ] );\n\n		lVector = normalize( lVector );\n\n		float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\n\n		if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n			spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n			// diffuse\n\n			float dotProduct = dot( normal, lVector );\n\n			#ifdef WRAP_AROUND\n\n				float spotDiffuseWeightFull = max( dotProduct, 0.0 );\n				float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n				vec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n\n			#else\n\n				float spotDiffuseWeight = max( dotProduct, 0.0 );\n\n			#endif\n\n			totalDiffuseLight += spotLightColor[ i ] * spotDiffuseWeight * attenuation * spotEffect;\n\n			// specular\n\n			vec3 spotHalfVector = normalize( lVector + viewPosition );\n			float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\n			float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n\n			float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n			vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, spotHalfVector ), 0.0 ), 5.0 );\n			totalSpecularLight += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * attenuation * specularNormalization * spotEffect;\n\n		}\n\n	}\n\n#endif\n\n#if MAX_DIR_LIGHTS > 0\n\n	for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n		vec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\n		// diffuse\n\n		float dotProduct = dot( normal, dirVector );\n\n		#ifdef WRAP_AROUND\n\n			float dirDiffuseWeightFull = max( dotProduct, 0.0 );\n			float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n			vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n\n		#else\n\n			float dirDiffuseWeight = max( dotProduct, 0.0 );\n\n		#endif\n\n		totalDiffuseLight += directionalLightColor[ i ] * dirDiffuseWeight;\n\n		// specular\n\n		vec3 dirHalfVector = normalize( dirVector + viewPosition );\n		float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n		float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n\n		/*\n		// fresnel term from skin shader\n		const float F0 = 0.128;\n\n		float base = 1.0 - dot( viewPosition, dirHalfVector );\n		float exponential = pow( base, 5.0 );\n\n		float fresnel = exponential + F0 * ( 1.0 - exponential );\n		*/\n\n		/*\n		// fresnel term from fresnel shader\n		const float mFresnelBias = 0.08;\n		const float mFresnelScale = 0.3;\n		const float mFresnelPower = 5.0;\n\n		float fresnel = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( -viewPosition ), normal ), mFresnelPower );\n		*/\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		// 		dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;\n\n		vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n		totalSpecularLight += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\n\n	}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n		vec3 lVector = transformDirection( hemisphereLightDirection[ i ], viewMatrix );\n\n		// diffuse\n\n		float dotProduct = dot( normal, lVector );\n		float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\n		vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n		totalDiffuseLight += hemiColor;\n\n		// specular (sky light)\n\n		vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\n		float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\n		float hemiSpecularWeightSky = specularStrength * max( pow( max( hemiDotNormalHalfSky, 0.0 ), shininess ), 0.0 );\n\n		// specular (ground light)\n\n		vec3 lVectorGround = -lVector;\n\n		vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\n		float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\n		float hemiSpecularWeightGround = specularStrength * max( pow( max( hemiDotNormalHalfGround, 0.0 ), shininess ), 0.0 );\n\n		float dotProductGround = dot( normal, lVectorGround );\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );\n		vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );\n		totalSpecularLight += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n\n	}\n\n#endif\n\n#ifdef METAL\n\n	outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) * specular + totalSpecularLight + emissive;\n\n#else\n\n	outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) + totalSpecularLight + emissive;\n\n#endif\n",
     THREE.ShaderChunk.fog_pars_fragment = "#ifdef USE_FOG\n\n	uniform vec3 fogColor;\n\n	#ifdef FOG_EXP2\n\n		uniform float fogDensity;\n\n	#else\n\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n\n#endif", THREE.ShaderChunk.morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\n	vec3 morphedNormal = vec3( 0.0 );\n\n	morphedNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n	morphedNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n	morphedNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n	morphedNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n\n	morphedNormal += normal;\n\n#endif", THREE.ShaderChunk.envmap_pars_fragment = "#ifdef USE_ENVMAP\n\n	uniform float reflectivity;\n	#ifdef ENVMAP_TYPE_CUBE\n		uniform samplerCube envMap;\n	#else\n		uniform sampler2D envMap;\n	#endif\n	uniform float flipEnvMap;\n\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n		uniform float refractionRatio;\n\n	#else\n\n		varying vec3 vReflect;\n\n	#endif\n\n#endif\n", THREE.ShaderChunk.logdepthbuf_fragment = "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\n	gl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n\n#endif", THREE.ShaderChunk.normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n\n	// Per-Pixel Tangent Space Normal Mapping\n	// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( vUv.st );\n		vec2 st1 = dFdy( vUv.st );\n\n		vec3 S = normalize( q0 * st1.t - q1 * st0.t );\n		vec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n		vec3 N = normalize( surf_norm );\n\n		vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n		mapN.xy = normalScale * mapN.xy;\n		mat3 tsn = mat3( S, T, N );\n		return normalize( tsn * mapN );\n\n	}\n\n#endif\n", THREE.ShaderChunk.lights_phong_pars_vertex = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	varying vec3 vWorldPosition;\n\n#endif\n", THREE.ShaderChunk.lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\n	varying vec2 vUv2;\n	uniform sampler2D lightMap;\n\n#endif", THREE.ShaderChunk.shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\n	for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n		vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n\n	}\n\n#endif", THREE.ShaderChunk.lights_phong_vertex = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	vWorldPosition = worldPosition.xyz;\n\n#endif", THREE.ShaderChunk.map_fragment = "#ifdef USE_MAP\n\n	vec4 texelColor = texture2D( map, vUv );\n\n	texelColor.xyz = inputToLinear( texelColor.xyz );\n\n	diffuseColor *= texelColor;\n\n#endif", THREE.ShaderChunk.lightmap_vertex = "#ifdef USE_LIGHTMAP\n\n	vUv2 = uv2;\n\n#endif", THREE.ShaderChunk.map_particle_fragment = "#ifdef USE_MAP\n\n	diffuseColor *= texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy );\n\n#endif\n", THREE.ShaderChunk.color_pars_fragment = "#ifdef USE_COLOR\n\n	varying vec3 vColor;\n\n#endif\n", THREE.ShaderChunk.color_vertex = "#ifdef USE_COLOR\n\n	vColor.xyz = inputToLinear( color.xyz );\n\n#endif", THREE.ShaderChunk.skinning_vertex = "#ifdef USE_SKINNING\n\n	#ifdef USE_MORPHTARGETS\n\n	vec4 skinVertex = bindMatrix * vec4( morphed, 1.0 );\n\n	#else\n\n	vec4 skinVertex = bindMatrix * vec4( position, 1.0 );\n\n	#endif\n\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	skinned  = bindMatrixInverse * skinned;\n\n#endif\n", THREE.ShaderChunk.envmap_pars_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n	varying vec3 vReflect;\n\n	uniform float refractionRatio;\n\n#endif\n", THREE.ShaderChunk.linear_to_gamma_fragment = "\n	outgoingLight = linearToOutput( outgoingLight );\n", THREE.ShaderChunk.color_pars_vertex = "#ifdef USE_COLOR\n\n	varying vec3 vColor;\n\n#endif", THREE.ShaderChunk.lights_lambert_pars_vertex = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDecay[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDecay[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#ifdef WRAP_AROUND\n\n	uniform vec3 wrapRGB;\n\n#endif\n", THREE.ShaderChunk.map_pars_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	varying vec2 vUv;\n	uniform vec4 offsetRepeat;\n\n#endif\n", THREE.ShaderChunk.envmap_fragment = "#ifdef USE_ENVMAP\n\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n		vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\n		// Transforming Normal Vectors with the Inverse Transformation\n		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n		#ifdef ENVMAP_MODE_REFLECTION\n\n			vec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\n		#else\n\n			vec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\n		#endif\n\n	#else\n\n		vec3 reflectVec = vReflect;\n\n	#endif\n\n	#ifdef DOUBLE_SIDED\n		float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n	#else\n		float flipNormal = 1.0;\n	#endif\n\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n	#elif defined( ENVMAP_TYPE_EQUIREC )\n		vec2 sampleUV;\n		sampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n		sampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n		vec4 envColor = texture2D( envMap, sampleUV );\n\n	#elif defined( ENVMAP_TYPE_SPHERE )\n		vec3 reflectView = flipNormal * normalize((viewMatrix * vec4( reflectVec, 0.0 )).xyz + vec3(0.0,0.0,1.0));\n		vec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n	#endif\n\n	envColor.xyz = inputToLinear( envColor.xyz );\n\n	#ifdef ENVMAP_BLENDING_MULTIPLY\n\n		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\n	#elif defined( ENVMAP_BLENDING_MIX )\n\n		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\n	#elif defined( ENVMAP_BLENDING_ADD )\n\n		outgoingLight += envColor.xyz * specularStrength * reflectivity;\n\n	#endif\n\n#endif\n", THREE.ShaderChunk.specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\n	uniform sampler2D specularMap;\n\n#endif", THREE.ShaderChunk.logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\n	gl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		vFragDepth = 1.0 + gl_Position.w;\n\n#else\n\n		gl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\n	#endif\n\n#endif", THREE.ShaderChunk.morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\n	#ifndef USE_MORPHNORMALS\n\n	uniform float morphTargetInfluences[ 8 ];\n\n	#else\n\n	uniform float morphTargetInfluences[ 4 ];\n\n	#endif\n\n#endif", THREE.ShaderChunk.specularmap_fragment = "float specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n	vec4 texelSpecular = texture2D( specularMap, vUv );\n	specularStrength = texelSpecular.r;\n\n#else\n\n	specularStrength = 1.0;\n\n#endif", THREE.ShaderChunk.fog_fragment = "#ifdef USE_FOG\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		float depth = gl_FragDepthEXT / gl_FragCoord.w;\n\n	#else\n\n		float depth = gl_FragCoord.z / gl_FragCoord.w;\n\n	#endif\n\n	#ifdef FOG_EXP2\n\n		float fogFactor = exp2( - square( fogDensity ) * square( depth ) * LOG2 );\n		fogFactor = whiteCompliment( fogFactor );\n\n	#else\n\n		float fogFactor = smoothstep( fogNear, fogFar, depth );\n\n	#endif\n	\n	outgoingLight = mix( outgoingLight, fogColor, fogFactor );\n\n#endif", THREE.ShaderChunk.bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n\n	// Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen\n	// http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html\n\n	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n	vec2 dHdxy_fwd() {\n\n		vec2 dSTdx = dFdx( vUv );\n		vec2 dSTdy = dFdy( vUv );\n\n		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n		return vec2( dBx, dBy );\n\n	}\n\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\n		vec3 vSigmaX = dFdx( surf_pos );\n		vec3 vSigmaY = dFdy( surf_pos );\n		vec3 vN = surf_norm;		// normalized\n\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n\n		float fDet = dot( vSigmaX, R1 );\n\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n\n	}\n\n#endif\n", THREE.ShaderChunk.defaultnormal_vertex = "#ifdef USE_SKINNING\n\n	vec3 objectNormal = skinnedNormal.xyz;\n\n#elif defined( USE_MORPHNORMALS )\n\n	vec3 objectNormal = morphedNormal;\n\n#else\n\n	vec3 objectNormal = normal;\n\n#endif\n\n#ifdef FLIP_SIDED\n\n	objectNormal = -objectNormal;\n\n#endif\n\nvec3 transformedNormal = normalMatrix * objectNormal;\n", THREE.ShaderChunk.lights_phong_pars_fragment = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDecay[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDecay[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	varying vec3 vWorldPosition;\n\n#endif\n\n#ifdef WRAP_AROUND\n\n	uniform vec3 wrapRGB;\n\n#endif\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n	varying vec3 vNormal;\n\n#endif\n", THREE.ShaderChunk.skinbase_vertex = "#ifdef USE_SKINNING\n\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif", THREE.ShaderChunk.map_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n\n#endif", THREE.ShaderChunk.lightmap_fragment = "#ifdef USE_LIGHTMAP\n\n	outgoingLight *= diffuseColor.xyz * texture2D( lightMap, vUv2 ).xyz;\n\n#endif", THREE.ShaderChunk.shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\n	varying vec4 vShadowCoord[ MAX_SHADOWS ];\n	uniform mat4 shadowMatrix[ MAX_SHADOWS ];\n\n#endif", THREE.ShaderChunk.color_fragment = "#ifdef USE_COLOR\n\n	diffuseColor.rgb *= vColor;\n\n#endif", THREE.ShaderChunk.morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\n	vec3 morphed = vec3( 0.0 );\n	morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n	morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n	morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n	morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\n	#ifndef USE_MORPHNORMALS\n\n	morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n	morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n	morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n	morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\n	#endif\n\n	morphed += position;\n\n#endif", THREE.ShaderChunk.envmap_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n	vec3 worldNormal = transformDirection( objectNormal, modelMatrix );\n\n	vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n	#ifdef ENVMAP_MODE_REFLECTION\n\n		vReflect = reflect( cameraToVertex, worldNormal );\n\n	#else\n\n		vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n	#endif\n\n#endif\n", THREE.ShaderChunk.shadowmap_fragment = "#ifdef USE_SHADOWMAP\n\n	#ifdef SHADOWMAP_DEBUG\n\n		vec3 frustumColors[3];\n		frustumColors[0] = vec3( 1.0, 0.5, 0.0 );\n		frustumColors[1] = vec3( 0.0, 1.0, 0.8 );\n		frustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n\n	#endif\n\n	#ifdef SHADOWMAP_CASCADE\n\n		int inFrustumCount = 0;\n\n	#endif\n\n	float fDepth;\n	vec3 shadowColor = vec3( 1.0 );\n\n	for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n		vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\n\n				// if ( something && something ) breaks ATI OpenGL shader compiler\n				// if ( all( something, something ) ) using this instead\n\n		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n		bool inFrustum = all( inFrustumVec );\n\n				// don't shadow pixels outside of light frustum\n				// use just first frustum (for cascades)\n				// don't shadow pixels behind far plane of light frustum\n\n		#ifdef SHADOWMAP_CASCADE\n\n			inFrustumCount += int( inFrustum );\n			bvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n\n		#else\n\n			bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n		#endif\n\n		bool frustumTest = all( frustumTestVec );\n\n		if ( frustumTest ) {\n\n			shadowCoord.z += shadowBias[ i ];\n\n			#if defined( SHADOWMAP_TYPE_PCF )\n\n						// Percentage-close filtering\n						// (9 pixel kernel)\n						// http://fabiensanglard.net/shadowmappingPCF/\n\n				float shadow = 0.0;\n\n		/*\n						// nested loops breaks shader compiler / validator on some ATI cards when using OpenGL\n						// must enroll loop manually\n\n				for ( float y = -1.25; y <= 1.25; y += 1.25 )\n					for ( float x = -1.25; x <= 1.25; x += 1.25 ) {\n\n						vec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );\n\n								// doesn't seem to produce any noticeable visual difference compared to simple texture2D lookup\n								//vec4 rgbaDepth = texture2DProj( shadowMap[ i ], vec4( vShadowCoord[ i ].w * ( vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy ), 0.05, vShadowCoord[ i ].w ) );\n\n						float fDepth = unpackDepth( rgbaDepth );\n\n						if ( fDepth < shadowCoord.z )\n							shadow += 1.0;\n\n				}\n\n				shadow /= 9.0;\n\n		*/\n\n				const float shadowDelta = 1.0 / 9.0;\n\n				float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n				float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n				float dx0 = -1.25 * xPixelOffset;\n				float dy0 = -1.25 * yPixelOffset;\n				float dx1 = 1.25 * xPixelOffset;\n				float dy1 = 1.25 * yPixelOffset;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n			#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n						// Percentage-close filtering\n						// (9 pixel kernel)\n						// http://fabiensanglard.net/shadowmappingPCF/\n\n				float shadow = 0.0;\n\n				float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n				float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n				float dx0 = -1.0 * xPixelOffset;\n				float dy0 = -1.0 * yPixelOffset;\n				float dx1 = 1.0 * xPixelOffset;\n				float dy1 = 1.0 * yPixelOffset;\n\n				mat3 shadowKernel;\n				mat3 depthKernel;\n\n				depthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n				depthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n				depthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n				depthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n				depthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n				depthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n				depthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n				depthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n				depthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\n				vec3 shadowZ = vec3( shadowCoord.z );\n				shadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\n				shadowKernel[0] *= vec3(0.25);\n\n				shadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\n				shadowKernel[1] *= vec3(0.25);\n\n				shadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\n				shadowKernel[2] *= vec3(0.25);\n\n				vec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\n\n				shadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\n				shadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\n\n				vec4 shadowValues;\n				shadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\n				shadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\n				shadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\n				shadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\n\n				shadow = dot( shadowValues, vec4( 1.0 ) );\n\n				shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n			#else\n\n				vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\n				float fDepth = unpackDepth( rgbaDepth );\n\n				if ( fDepth < shadowCoord.z )\n\n		// spot with multiple shadows is darker\n\n					shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n\n		// spot with multiple shadows has the same color as single shadow spot\n\n		// 					shadowColor = min( shadowColor, vec3( shadowDarkness[ i ] ) );\n\n			#endif\n\n		}\n\n\n		#ifdef SHADOWMAP_DEBUG\n\n			#ifdef SHADOWMAP_CASCADE\n\n				if ( inFrustum && inFrustumCount == 1 ) outgoingLight *= frustumColors[ i ];\n\n			#else\n\n				if ( inFrustum ) outgoingLight *= frustumColors[ i ];\n\n			#endif\n\n		#endif\n\n	}\n\n	// NOTE: I am unsure if this is correct in linear space.  -bhouston, Dec 29, 2014\n	shadowColor = inputToLinear( shadowColor );\n\n	outgoingLight = outgoingLight * shadowColor;\n\n#endif\n", THREE.ShaderChunk.worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\n	#ifdef USE_SKINNING\n\n		vec4 worldPosition = modelMatrix * skinned;\n\n	#elif defined( USE_MORPHTARGETS )\n\n		vec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n\n	#else\n\n		vec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\n	#endif\n\n#endif\n", THREE.ShaderChunk.shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\n	uniform sampler2D shadowMap[ MAX_SHADOWS ];\n	uniform vec2 shadowMapSize[ MAX_SHADOWS ];\n\n	uniform float shadowDarkness[ MAX_SHADOWS ];\n	uniform float shadowBias[ MAX_SHADOWS ];\n\n	varying vec4 vShadowCoord[ MAX_SHADOWS ];\n\n	float unpackDepth( const in vec4 rgba_depth ) {\n\n		const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n		float depth = dot( rgba_depth, bit_shift );\n		return depth;\n\n	}\n\n#endif", THREE.ShaderChunk.skinning_pars_vertex = "#ifdef USE_SKINNING\n\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n\n	#ifdef BONE_TEXTURE\n\n		uniform sampler2D boneTexture;\n		uniform int boneTextureWidth;\n		uniform int boneTextureHeight;\n\n		mat4 getBoneMatrix( const in float i ) {\n\n			float j = i * 4.0;\n			float x = mod( j, float( boneTextureWidth ) );\n			float y = floor( j / float( boneTextureWidth ) );\n\n			float dx = 1.0 / float( boneTextureWidth );\n			float dy = 1.0 / float( boneTextureHeight );\n\n			y = dy * ( y + 0.5 );\n\n			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n			mat4 bone = mat4( v1, v2, v3, v4 );\n\n			return bone;\n\n		}\n\n	#else\n\n		uniform mat4 boneGlobalMatrices[ MAX_BONES ];\n\n		mat4 getBoneMatrix( const in float i ) {\n\n			mat4 bone = boneGlobalMatrices[ int(i) ];\n			return bone;\n\n		}\n\n	#endif\n\n#endif\n", THREE.ShaderChunk.logdepthbuf_pars_fragment = "#ifdef USE_LOGDEPTHBUF\n\n	uniform float logDepthBufFC;\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		#extension GL_EXT_frag_depth : enable\n		varying float vFragDepth;\n\n	#endif\n\n#endif", THREE.ShaderChunk.alphamap_fragment = "#ifdef USE_ALPHAMAP\n\n	diffuseColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n", THREE.ShaderChunk.alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\n	uniform sampler2D alphaMap;\n\n#endif\n", THREE.UniformsUtils = {
         merge: function(e) {
             for (var t = {}, r = 0; r < e.length; r++) {
                 var i = this.clone(e[r]),
                     n;
                 for (n in i) t[n] = i[n]
             }
             return t
         },
         clone: function(e) {
             var t = {},
                 r;
             for (r in e) {
                 t[r] = {};
                 for (var i in e[r]) {
                     var n = e[r][i];
                     t[r][i] = n instanceof THREE.Color || n instanceof THREE.Vector2 || n instanceof THREE.Vector3 || n instanceof THREE.Vector4 || n instanceof THREE.Matrix4 || n instanceof THREE.Texture ? n.clone() : n instanceof Array ? n.slice() : n
                 }
             }
             return t
         }
     }, THREE.UniformsLib = {
         common: {
             diffuse: {
                 type: "c",
                 value: new THREE.Color(15658734)
             },
             opacity: {
                 type: "f",
                 value: 1
             },
             map: {
                 type: "t",
                 value: null
             },
             offsetRepeat: {
                 type: "v4",
                 value: new THREE.Vector4(0, 0, 1, 1)
             },
             lightMap: {
                 type: "t",
                 value: null
             },
             specularMap: {
                 type: "t",
                 value: null
             },
             alphaMap: {
                 type: "t",
                 value: null
             },
             envMap: {
                 type: "t",
                 value: null
             },
             flipEnvMap: {
                 type: "f",
                 value: -1
             },
             reflectivity: {
                 type: "f",
                 value: 1
             },
             refractionRatio: {
                 type: "f",
                 value: .98
             },
             morphTargetInfluences: {
                 type: "f",
                 value: 0
             }
         },
         bump: {
             bumpMap: {
                 type: "t",
                 value: null
             },
             bumpScale: {
                 type: "f",
                 value: 1
             }
         },
         normalmap: {
             normalMap: {
                 type: "t",
                 value: null
             },
             normalScale: {
                 type: "v2",
                 value: new THREE.Vector2(1, 1)
             }
         },
         fog: {
             fogDensity: {
                 type: "f",
                 value: 25e-5
             },
             fogNear: {
                 type: "f",
                 value: 1
             },
             fogFar: {
                 type: "f",
                 value: 2e3
             },
             fogColor: {
                 type: "c",
                 value: new THREE.Color(16777215)
             }
         },
         lights: {
             ambientLightColor: {
                 type: "fv",
                 value: []
             },
             directionalLightDirection: {
                 type: "fv",
                 value: []
             },
             directionalLightColor: {
                 type: "fv",
                 value: []
             },
             hemisphereLightDirection: {
                 type: "fv",
                 value: []
             },
             hemisphereLightSkyColor: {
                 type: "fv",
                 value: []
             },
             hemisphereLightGroundColor: {
                 type: "fv",
                 value: []
             },
             pointLightColor: {
                 type: "fv",
                 value: []
             },
             pointLightPosition: {
                 type: "fv",
                 value: []
             },
             pointLightDistance: {
                 type: "fv1",
                 value: []
             },
             pointLightDecay: {
                 type: "fv1",
                 value: []
             },
             spotLightColor: {
                 type: "fv",
                 value: []
             },
             spotLightPosition: {
                 type: "fv",
                 value: []
             },
             spotLightDirection: {
                 type: "fv",
                 value: []
             },
             spotLightDistance: {
                 type: "fv1",
                 value: []
             },
             spotLightAngleCos: {
                 type: "fv1",
                 value: []
             },
             spotLightExponent: {
                 type: "fv1",
                 value: []
             },
             spotLightDecay: {
                 type: "fv1",
                 value: []
             }
         },
         particle: {
             psColor: {
                 type: "c",
                 value: new THREE.Color(15658734)
             },
             opacity: {
                 type: "f",
                 value: 1
             },
             size: {
                 type: "f",
                 value: 1
             },
             scale: {
                 type: "f",
                 value: 1
             },
             map: {
                 type: "t",
                 value: null
             },
             offsetRepeat: {
                 type: "v4",
                 value: new THREE.Vector4(0, 0, 1, 1)
             },
             fogDensity: {
                 type: "f",
                 value: 25e-5
             },
             fogNear: {
                 type: "f",
                 value: 1
             },
             fogFar: {
                 type: "f",
                 value: 2e3
             },
             fogColor: {
                 type: "c",
                 value: new THREE.Color(16777215)
             }
         },
         shadowmap: {
             shadowMap: {
                 type: "tv",
                 value: []
             },
             shadowMapSize: {
                 type: "v2v",
                 value: []
             },
             shadowBias: {
                 type: "fv1",
                 value: []
             },
             shadowDarkness: {
                 type: "fv1",
                 value: []
             },
             shadowMatrix: {
                 type: "m4v",
                 value: []
             }
         }
     }, THREE.ShaderLib = {
         basic: {
             uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap]),
             vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinbase_vertex, "	#ifdef USE_ENVMAP", THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "	#endif", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
             fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n	vec3 outgoingLight = vec3( 0.0 );\n	vec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, "	outgoingLight = diffuseColor.rgb;", THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}"].join("\n")
         },
         lambert: {
             uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
                 emissive: {
                     type: "c",
                     value: new THREE.Color(0)
                 },
                 wrapRGB: {
                     type: "v3",
                     value: new THREE.Vector3(1, 1, 1)
                 }
             }]),
             vertexShader: ["#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n	varying vec3 vLightBack;\n#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_lambert_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_lambert_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
             fragmentShader: ["uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n	varying vec3 vLightBack;\n#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n	vec3 outgoingLight = vec3( 0.0 );\n	vec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, "	#ifdef DOUBLE_SIDED\n		if ( gl_FrontFacing )\n			outgoingLight += diffuseColor.rgb * vLightFront + emissive;\n		else\n			outgoingLight += diffuseColor.rgb * vLightBack + emissive;\n	#else\n		outgoingLight += diffuseColor.rgb * vLightFront + emissive;\n	#endif", THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}"].join("\n")
         },
         phong: {
             uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.bump, THREE.UniformsLib.normalmap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
                 emissive: {
                     type: "c",
                     value: new THREE.Color(0)
                 },
                 specular: {
                     type: "c",
                     value: new THREE.Color(1118481)
                 },
                 shininess: {
                     type: "f",
                     value: 30
                 },
                 wrapRGB: {
                     type: "v3",
                     value: new THREE.Vector3(1, 1, 1)
                 }
             }]),
             vertexShader: ["#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "#ifndef FLAT_SHADED\n	vNormal = normalize( transformedNormal );\n#endif", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "	vViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
             fragmentShader: ["#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.bumpmap_pars_fragment, THREE.ShaderChunk.normalmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n	vec3 outgoingLight = vec3( 0.0 );\n	vec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}"].join("\n")
         },
         particle_basic: {
             uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.particle, THREE.UniformsLib.shadowmap]),
             vertexShader: ["uniform float size;\nuniform float scale;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n	#ifdef USE_SIZEATTENUATION\n		gl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n	#else\n		gl_PointSize = size;\n	#endif\n	gl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
             fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n	vec3 outgoingLight = vec3( 0.0 );\n	vec4 diffuseColor = vec4( psColor, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphatest_fragment, "	outgoingLight = diffuseColor.rgb;", THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}"].join("\n")
         },
         dashed: {
             uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, {
                 scale: {
                     type: "f",
                     value: 1
                 },
                 dashSize: {
                     type: "f",
                     value: 1
                 },
                 totalSize: {
                     type: "f",
                     value: 2
                 }
             }]),
             vertexShader: ["uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "	vLineDistance = scale * lineDistance;\n	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n	gl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
             fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n	if ( mod( vLineDistance, totalSize ) > dashSize ) {\n		discard;\n	}\n	vec3 outgoingLight = vec3( 0.0 );\n	vec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.color_fragment, "	outgoingLight = diffuseColor.rgb;", THREE.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}"].join("\n")
         },
         depth: {
             uniforms: {
                 mNear: {
                     type: "f",
                     value: 1
                 },
                 mFar: {
                     type: "f",
                     value: 2e3
                 },
                 opacity: {
                     type: "f",
                     value: 1
                 }
             },
             vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
             fragmentShader: ["uniform float mNear;\nuniform float mFar;\nuniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", THREE.ShaderChunk.logdepthbuf_fragment, "	#ifdef USE_LOGDEPTHBUF_EXT\n		float depth = gl_FragDepthEXT / gl_FragCoord.w;\n	#else\n		float depth = gl_FragCoord.z / gl_FragCoord.w;\n	#endif\n	float color = 1.0 - smoothstep( mNear, mFar, depth );\n	gl_FragColor = vec4( vec3( color ), opacity );\n}"].join("\n")
         },
         normal: {
             uniforms: {
                 opacity: {
                     type: "f",
                     value: 1
                 }
             },
             vertexShader: ["varying vec3 vNormal;", THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {\n	vNormal = normalize( normalMatrix * normal );", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
             fragmentShader: ["uniform float opacity;\nvarying vec3 vNormal;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n	gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
         },
         cube: {
             uniforms: {
                 tCube: {
                     type: "t",
                     value: null
                 },
                 tFlip: {
                     type: "f",
                     value: -1
                 }
             },
             vertexShader: ["varying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {\n	vWorldPosition = transformDirection( position, modelMatrix );\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
             fragmentShader: ["uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n	gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
         },
         equirect: {
             uniforms: {
                 tEquirect: {
                     type: "t",
                     value: null
                 },
                 tFlip: {
                     type: "f",
                     value: -1
                 }
             },
             vertexShader: ["varying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {\n	vWorldPosition = transformDirection( position, modelMatrix );\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
             fragmentShader: ["uniform sampler2D tEquirect;\nuniform float tFlip;\nvarying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\nvec3 direction = normalize( vWorldPosition );\nvec2 sampleUV;\nsampleUV.y = saturate( tFlip * direction.y * -0.5 + 0.5 );\nsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\ngl_FragColor = texture2D( tEquirect, sampleUV );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
         },
         depthRGBA: {
             uniforms: {},
             vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
             fragmentShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "vec4 pack_depth( const in float depth ) {\n	const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\n	const vec4 bit_mask = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\n	vec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );\n	res -= res.xxyz * bit_mask;\n	return res;\n}\nvoid main() {", THREE.ShaderChunk.logdepthbuf_fragment, "	#ifdef USE_LOGDEPTHBUF_EXT\n		gl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );\n	#else\n		gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n	#endif\n}"].join("\n")
         }
     }, THREE.WebGLRenderer = function(e) {
         function t(e) {
             var t = e.geometry;
             e = e.material;
             var r = t.vertices.length;
             if (e.attributes) {
                 void 0 === t.__webglCustomAttributesList && (t.__webglCustomAttributesList = []);
                 for (var i in e.attributes) {
                     var n = e.attributes[i];
                     if (!n.__webglInitialized || n.createUniqueBuffers) {
                         n.__webglInitialized = !0;
                         var a = 1;
                         "v2" === n.type ? a = 2 : "v3" === n.type ? a = 3 : "v4" === n.type ? a = 4 : "c" === n.type && (a = 3), n.size = a, n.array = new Float32Array(r * a), n.buffer = me.createBuffer(), n.buffer.belongsToAttribute = i, n.needsUpdate = !0
                     }
                     t.__webglCustomAttributesList.push(n)
                 }
             }
         }

         function r(e, t) {
             return e.material instanceof THREE.MeshFaceMaterial ? e.material.materials[t.materialIndex] : e.material
         }

         function i(e, t, r, i) {
             r = r.attributes;
             var n = t.attributes;
             t = t.attributesKeys;
             for (var a = 0, o = t.length; o > a; a++) {
                 var s = t[a],
                     h = n[s];
                 if (h >= 0) {
                     var l = r[s];
                     void 0 !== l ? (s = l.itemSize, me.bindBuffer(me.ARRAY_BUFFER, l.buffer), ve.enableAttribute(h), me.vertexAttribPointer(h, s, me.FLOAT, !1, 0, i * s * 4)) : void 0 !== e.defaultAttributeValues && (2 === e.defaultAttributeValues[s].length ? me.vertexAttrib2fv(h, e.defaultAttributeValues[s]) : 3 === e.defaultAttributeValues[s].length && me.vertexAttrib3fv(h, e.defaultAttributeValues[s]))
                 }
             }
             ve.disableUnusedAttributes()
         }

         function n(e, t) {
             return e.object.renderOrder !== t.object.renderOrder ? e.object.renderOrder - t.object.renderOrder : e.material.id !== t.material.id ? e.material.id - t.material.id : e.z !== t.z ? e.z - t.z : e.id - t.id
         }

         function a(e, t) {
             return e.object.renderOrder !== t.object.renderOrder ? e.object.renderOrder - t.object.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id
         }

         function o(e, t) {
             return t[0] - e[0]
         }

         function s(e) {
             if (!1 !== e.visible) {
                 if (!(e instanceof THREE.Scene || e instanceof THREE.Group)) {
                     void 0 === e.__webglInit && (e.__webglInit = !0, e._modelViewMatrix = new THREE.Matrix4, e._normalMatrix = new THREE.Matrix3, e.addEventListener("removed", Oe));
                     var r = e.geometry;
                     if (void 0 !== r && void 0 === r.__webglInit)
                         if (r.__webglInit = !0, r.addEventListener("dispose", Ue), r instanceof THREE.BufferGeometry) Y.info.memory.geometries++;
                         else if (e instanceof THREE.Mesh) c(e, r);
                     else if (e instanceof THREE.Line) {
                         if (void 0 === r.__webglVertexBuffer) {
                             r.__webglVertexBuffer = me.createBuffer(), r.__webglColorBuffer = me.createBuffer(), r.__webglLineDistanceBuffer = me.createBuffer(), Y.info.memory.geometries++;
                             var i = r.vertices.length;
                             r.__vertexArray = new Float32Array(3 * i), r.__colorArray = new Float32Array(3 * i), r.__lineDistanceArray = new Float32Array(1 * i), r.__webglLineCount = i, t(e), r.verticesNeedUpdate = !0, r.colorsNeedUpdate = !0, r.lineDistancesNeedUpdate = !0
                         }
                     } else e instanceof THREE.PointCloud && void 0 === r.__webglVertexBuffer && (r.__webglVertexBuffer = me.createBuffer(), r.__webglColorBuffer = me.createBuffer(), Y.info.memory.geometries++, i = r.vertices.length, r.__vertexArray = new Float32Array(3 * i), r.__colorArray = new Float32Array(3 * i), r.__webglParticleCount = i, t(e), r.verticesNeedUpdate = !0, r.colorsNeedUpdate = !0);
                     if (void 0 === e.__webglActive)
                         if (e.__webglActive = !0, e instanceof THREE.Mesh) {
                             if (r instanceof THREE.BufferGeometry) d(z, r, e);
                             else if (r instanceof THREE.Geometry)
                                 for (var r = Xe[r.id], i = 0, n = r.length; n > i; i++) d(z, r[i], e)
                         } else e instanceof THREE.Line || e instanceof THREE.PointCloud ? d(z, r, e) : (e instanceof THREE.ImmediateRenderObject || e.immediateRenderCallback) && G.push({
                             id: null,
                             object: e,
                             opaque: null,
                             transparent: null,
                             z: 0
                         });
                     if (e instanceof THREE.Light) V.push(e);
                     else if (e instanceof THREE.Sprite) X.push(e);
                     else if (e instanceof THREE.LensFlare) q.push(e);
                     else if ((r = z[e.id]) && (!1 === e.frustumCulled || !0 === le.intersectsObject(e)))
                         for (i = 0, n = r.length; n > i; i++) {
                             var a = r[i],
                                 o = a,
                                 h = o.object,
                                 l = o.buffer,
                                 u = h.geometry,
                                 h = h.material;
                             h instanceof THREE.MeshFaceMaterial ? (h = h.materials[u instanceof THREE.BufferGeometry ? 0 : l.materialIndex], o.material = h, h.transparent ? j.push(o) : W.push(o)) : h && (o.material = h, h.transparent ? j.push(o) : W.push(o)), a.render = !0, !0 === Y.sortObjects && (ce.setFromMatrixPosition(e.matrixWorld), ce.applyProjection(ue), a.z = ce.z)
                         }
                 }
                 for (i = 0, n = e.children.length; n > i; i++) s(e.children[i])
             }
         }

         function h(e, t, r, i, n) {
             for (var a, o = 0, s = e.length; s > o; o++) {
                 a = e[o];
                 var h = a.object,
                     l = a.buffer;
                 if (T(h, t), n) a = n;
                 else {
                     if (a = a.material, !a) continue;
                     E(a)
                 }
                 Y.setMaterialFaces(a), l instanceof THREE.BufferGeometry ? Y.renderBufferDirect(t, r, i, a, l, h) : Y.renderBuffer(t, r, i, a, l, h)
             }
         }

         function l(e, t, r, i, n, a) {
             for (var o, s = 0, h = e.length; h > s; s++) {
                 o = e[s];
                 var l = o.object;
                 if (l.visible) {
                     if (a) o = a;
                     else {
                         if (o = o[t], !o) continue;
                         E(o)
                     }
                     Y.renderImmediateObject(r, i, n, o, l)
                 }
             }
         }

         function u(e) {
             var t = e.object.material;
             t.transparent ? (e.transparent = t, e.opaque = null) : (e.opaque = t, e.transparent = null)
         }

         function c(e, t) {
             var i = e.material,
                 n = !1;
             if (void 0 === Xe[t.id] || !0 === t.groupsNeedUpdate) {
                 delete z[e.id];
                 for (var a = Xe, o = t.id, i = i instanceof THREE.MeshFaceMaterial, s = ye.get("OES_element_index_uint") ? 4294967296 : 65535, h, n = {}, l = t.morphTargets.length, u = t.morphNormals.length, c, f = {}, p = [], m = 0, E = t.faces.length; E > m; m++) {
                     h = t.faces[m];
                     var g = i ? h.materialIndex : 0;
                     g in n || (n[g] = {
                         hash: g,
                         counter: 0
                     }), h = n[g].hash + "_" + n[g].counter, h in f || (c = {
                         id: qe++,
                         faces3: [],
                         materialIndex: g,
                         vertices: 0,
                         numMorphTargets: l,
                         numMorphNormals: u
                     }, f[h] = c, p.push(c)), f[h].vertices + 3 > s && (n[g].counter += 1, h = n[g].hash + "_" + n[g].counter, h in f || (c = {
                         id: qe++,
                         faces3: [],
                         materialIndex: g,
                         vertices: 0,
                         numMorphTargets: l,
                         numMorphNormals: u
                     }, f[h] = c, p.push(c))), f[h].faces3.push(m), f[h].vertices += 3
                 }
                 a[o] = p, t.groupsNeedUpdate = !1
             }
             for (a = Xe[t.id], o = 0, i = a.length; i > o; o++) {
                 if (s = a[o], void 0 === s.__webglVertexBuffer) {
                     if (n = s, n.__webglVertexBuffer = me.createBuffer(), n.__webglNormalBuffer = me.createBuffer(), n.__webglTangentBuffer = me.createBuffer(), n.__webglColorBuffer = me.createBuffer(), n.__webglUVBuffer = me.createBuffer(), n.__webglUV2Buffer = me.createBuffer(), n.__webglSkinIndicesBuffer = me.createBuffer(), n.__webglSkinWeightsBuffer = me.createBuffer(), n.__webglFaceBuffer = me.createBuffer(), n.__webglLineBuffer = me.createBuffer(), u = n.numMorphTargets)
                         for (n.__webglMorphTargetsBuffers = [], l = 0; u > l; l++) n.__webglMorphTargetsBuffers.push(me.createBuffer());
                     if (u = n.numMorphNormals)
                         for (n.__webglMorphNormalsBuffers = [], l = 0; u > l; l++) n.__webglMorphNormalsBuffers.push(me.createBuffer());
                     if (Y.info.memory.geometries++, n = s, m = e, E = m.geometry, u = n.faces3, l = 3 * u.length, f = 1 * u.length, p = 3 * u.length, u = r(m, n), n.__vertexArray = new Float32Array(3 * l), n.__normalArray = new Float32Array(3 * l), n.__colorArray = new Float32Array(3 * l), n.__uvArray = new Float32Array(2 * l), 1 < E.faceVertexUvs.length && (n.__uv2Array = new Float32Array(2 * l)), E.hasTangents && (n.__tangentArray = new Float32Array(4 * l)), m.geometry.skinWeights.length && m.geometry.skinIndices.length && (n.__skinIndexArray = new Float32Array(4 * l), n.__skinWeightArray = new Float32Array(4 * l)), m = null !== ye.get("OES_element_index_uint") && f > 21845 ? Uint32Array : Uint16Array, n.__typeArray = m, n.__faceArray = new m(3 * f), n.__lineArray = new m(2 * p), E = n.numMorphTargets)
                         for (n.__morphTargetsArrays = [], m = 0; E > m; m++) n.__morphTargetsArrays.push(new Float32Array(3 * l));
                     if (E = n.numMorphNormals)
                         for (n.__morphNormalsArrays = [], m = 0; E > m; m++) n.__morphNormalsArrays.push(new Float32Array(3 * l));
                     if (n.__webglFaceCount = 3 * f, n.__webglLineCount = 2 * p, u.attributes)
                         for (f in void 0 === n.__webglCustomAttributesList && (n.__webglCustomAttributesList = []), f = void 0, u.attributes) {
                             var p = u.attributes[f],
                                 m = {},
                                 v;
                             for (v in p) m[v] = p[v];
                             (!m.__webglInitialized || m.createUniqueBuffers) && (m.__webglInitialized = !0, E = 1, "v2" === m.type ? E = 2 : "v3" === m.type ? E = 3 : "v4" === m.type ? E = 4 : "c" === m.type && (E = 3), m.size = E, m.array = new Float32Array(l * E), m.buffer = me.createBuffer(), m.buffer.belongsToAttribute = f, p.needsUpdate = !0, m.__original = p), n.__webglCustomAttributesList.push(m)
                         }
                     n.__inittedArrays = !0, t.verticesNeedUpdate = !0, t.morphTargetsNeedUpdate = !0, t.elementsNeedUpdate = !0, t.uvsNeedUpdate = !0, t.normalsNeedUpdate = !0, t.tangentsNeedUpdate = !0, n = t.colorsNeedUpdate = !0
                 } else n = !1;
                 (n || void 0 === e.__webglActive) && d(z, s, e)
             }
             e.__webglActive = !0
         }

         function d(e, t, r) {
             var i = r.id;
             e[i] = e[i] || [], e[i].push({
                 id: i,
                 buffer: t,
                 object: r,
                 material: null,
                 z: 0
             })
         }

         function f(e) {
             var t = e.geometry;
             if (t instanceof THREE.BufferGeometry)
                 for (var i = t.attributes, n = t.attributesKeys, a = 0, o = n.length; o > a; a++) {
                     var s = n[a],
                         h = i[s],
                         l = "index" === s ? me.ELEMENT_ARRAY_BUFFER : me.ARRAY_BUFFER;
                     void 0 === h.buffer ? (h.buffer = me.createBuffer(), me.bindBuffer(l, h.buffer), me.bufferData(l, h.array, h instanceof THREE.DynamicBufferAttribute ? me.DYNAMIC_DRAW : me.STATIC_DRAW), h.needsUpdate = !1) : !0 === h.needsUpdate && (me.bindBuffer(l, h.buffer), void 0 === h.updateRange || -1 === h.updateRange.count ? me.bufferSubData(l, 0, h.array) : 0 === h.updateRange.count ? console.error("THREE.WebGLRenderer.updateObject: using updateRange for THREE.DynamicBufferAttribute and marked as needsUpdate but count is 0, ensure you are using set methods or updating manually.") : (me.bufferSubData(l, h.updateRange.offset * h.array.BYTES_PER_ELEMENT, h.array.subarray(h.updateRange.offset, h.updateRange.offset + h.updateRange.count)), h.updateRange.count = 0), h.needsUpdate = !1)
                 } else if (e instanceof THREE.Mesh) {
                     !0 === t.groupsNeedUpdate && c(e, t);
                     for (var u = Xe[t.id], a = 0, d = u.length; d > a; a++) {
                         var f = u[a],
                             E = r(e, f),
                             g = E.attributes && p(E);
                         if (t.verticesNeedUpdate || t.morphTargetsNeedUpdate || t.elementsNeedUpdate || t.uvsNeedUpdate || t.normalsNeedUpdate || t.colorsNeedUpdate || t.tangentsNeedUpdate || g) {
                             var v = f,
                                 y = e,
                                 T = me.DYNAMIC_DRAW,
                                 R = !t.dynamic,
                                 x = E;
                             if (v.__inittedArrays) {
                                 var H = !1 == x instanceof THREE.MeshPhongMaterial && x.shading === THREE.FlatShading,
                                     _ = void 0,
                                     b = void 0,
                                     w = void 0,
                                     M = void 0,
                                     S = void 0,
                                     C = void 0,
                                     A = void 0,
                                     L = void 0,
                                     P = void 0,
                                     D = void 0,
                                     F = void 0,
                                     k = void 0,
                                     B = void 0,
                                     N = void 0,
                                     I = void 0,
                                     O = void 0,
                                     U = void 0,
                                     V = void 0,
                                     z = void 0,
                                     G = void 0,
                                     W = void 0,
                                     j = void 0,
                                     X = void 0,
                                     q = void 0,
                                     Y = void 0,
                                     J = void 0,
                                     K = void 0,
                                     Q = void 0,
                                     Z = void 0,
                                     ee = void 0,
                                     te = void 0,
                                     re = void 0,
                                     ie = void 0,
                                     ne = void 0,
                                     ae = void 0,
                                     oe = void 0,
                                     se = void 0,
                                     he = void 0,
                                     le = void 0,
                                     ue = void 0,
                                     ce = 0,
                                     de = 0,
                                     fe = 0,
                                     pe = 0,
                                     Ee = 0,
                                     ge = 0,
                                     ve = 0,
                                     ye = 0,
                                     Te = 0,
                                     Re = 0,
                                     xe = 0,
                                     He = 0,
                                     _e = void 0,
                                     be = v.__vertexArray,
                                     we = v.__uvArray,
                                     Me = v.__uv2Array,
                                     Se = v.__normalArray,
                                     Ce = v.__tangentArray,
                                     Ae = v.__colorArray,
                                     Le = v.__skinIndexArray,
                                     Pe = v.__skinWeightArray,
                                     De = v.__morphTargetsArrays,
                                     Fe = v.__morphNormalsArrays,
                                     ke = v.__webglCustomAttributesList,
                                     Be = void 0,
                                     Ne = v.__faceArray,
                                     Ie = v.__lineArray,
                                     Oe = y.geometry,
                                     Ue = Oe.elementsNeedUpdate,
                                     Ve = Oe.uvsNeedUpdate,
                                     ze = Oe.normalsNeedUpdate,
                                     Ge = Oe.tangentsNeedUpdate,
                                     We = Oe.colorsNeedUpdate,
                                     je = Oe.morphTargetsNeedUpdate,
                                     qe = Oe.vertices,
                                     $ = v.faces3,
                                     Ye = Oe.faces,
                                     Je = Oe.faceVertexUvs[0],
                                     Ke = Oe.faceVertexUvs[1],
                                     Qe = Oe.skinIndices,
                                     Ze = Oe.skinWeights,
                                     $e = Oe.morphTargets,
                                     et = Oe.morphNormals;
                                 if (Oe.verticesNeedUpdate) {
                                     for (_ = 0, b = $.length; b > _; _++) M = Ye[$[_]], k = qe[M.a], B = qe[M.b], N = qe[M.c], be[de] = k.x, be[de + 1] = k.y, be[de + 2] = k.z, be[de + 3] = B.x, be[de + 4] = B.y, be[de + 5] = B.z, be[de + 6] = N.x, be[de + 7] = N.y, be[de + 8] = N.z, de += 9;
                                     me.bindBuffer(me.ARRAY_BUFFER, v.__webglVertexBuffer), me.bufferData(me.ARRAY_BUFFER, be, T)
                                 }
                                 if (je)
                                     for (ae = 0, oe = $e.length; oe > ae; ae++) {
                                         for (_ = xe = 0, b = $.length; b > _; _++) le = $[_], M = Ye[le], k = $e[ae].vertices[M.a], B = $e[ae].vertices[M.b], N = $e[ae].vertices[M.c], se = De[ae], se[xe] = k.x, se[xe + 1] = k.y, se[xe + 2] = k.z, se[xe + 3] = B.x, se[xe + 4] = B.y, se[xe + 5] = B.z, se[xe + 6] = N.x, se[xe + 7] = N.y, se[xe + 8] = N.z, x.morphNormals && (H ? G = z = V = et[ae].faceNormals[le] : (ue = et[ae].vertexNormals[le], V = ue.a, z = ue.b, G = ue.c), he = Fe[ae], he[xe] = V.x, he[xe + 1] = V.y, he[xe + 2] = V.z, he[xe + 3] = z.x, he[xe + 4] = z.y, he[xe + 5] = z.z, he[xe + 6] = G.x, he[xe + 7] = G.y, he[xe + 8] = G.z), xe += 9;
                                         me.bindBuffer(me.ARRAY_BUFFER, v.__webglMorphTargetsBuffers[ae]), me.bufferData(me.ARRAY_BUFFER, De[ae], T), x.morphNormals && (me.bindBuffer(me.ARRAY_BUFFER, v.__webglMorphNormalsBuffers[ae]), me.bufferData(me.ARRAY_BUFFER, Fe[ae], T))
                                     }
                                 if (Ze.length) {
                                     for (_ = 0, b = $.length; b > _; _++) M = Ye[$[_]], q = Ze[M.a], Y = Ze[M.b], J = Ze[M.c], Pe[Re] = q.x, Pe[Re + 1] = q.y, Pe[Re + 2] = q.z, Pe[Re + 3] = q.w, Pe[Re + 4] = Y.x, Pe[Re + 5] = Y.y, Pe[Re + 6] = Y.z, Pe[Re + 7] = Y.w, Pe[Re + 8] = J.x, Pe[Re + 9] = J.y, Pe[Re + 10] = J.z, Pe[Re + 11] = J.w, K = Qe[M.a], Q = Qe[M.b], Z = Qe[M.c], Le[Re] = K.x, Le[Re + 1] = K.y, Le[Re + 2] = K.z, Le[Re + 3] = K.w, Le[Re + 4] = Q.x, Le[Re + 5] = Q.y, Le[Re + 6] = Q.z, Le[Re + 7] = Q.w, Le[Re + 8] = Z.x, Le[Re + 9] = Z.y, Le[Re + 10] = Z.z, Le[Re + 11] = Z.w, Re += 12;
                                     Re > 0 && (me.bindBuffer(me.ARRAY_BUFFER, v.__webglSkinIndicesBuffer), me.bufferData(me.ARRAY_BUFFER, Le, T), me.bindBuffer(me.ARRAY_BUFFER, v.__webglSkinWeightsBuffer), me.bufferData(me.ARRAY_BUFFER, Pe, T))
                                 }
                                 if (We) {
                                     for (_ = 0, b = $.length; b > _; _++) M = Ye[$[_]], A = M.vertexColors, L = M.color, 3 === A.length && x.vertexColors === THREE.VertexColors ? (W = A[0], j = A[1], X = A[2]) : X = j = W = L, Ae[Te] = W.r, Ae[Te + 1] = W.g, Ae[Te + 2] = W.b, Ae[Te + 3] = j.r, Ae[Te + 4] = j.g, Ae[Te + 5] = j.b, Ae[Te + 6] = X.r, Ae[Te + 7] = X.g, Ae[Te + 8] = X.b, Te += 9;
                                     Te > 0 && (me.bindBuffer(me.ARRAY_BUFFER, v.__webglColorBuffer), me.bufferData(me.ARRAY_BUFFER, Ae, T))
                                 }
                                 if (Ge && Oe.hasTangents) {
                                     for (_ = 0, b = $.length; b > _; _++) M = Ye[$[_]], P = M.vertexTangents, I = P[0], O = P[1], U = P[2], Ce[ve] = I.x, Ce[ve + 1] = I.y, Ce[ve + 2] = I.z, Ce[ve + 3] = I.w, Ce[ve + 4] = O.x, Ce[ve + 5] = O.y, Ce[ve + 6] = O.z, Ce[ve + 7] = O.w, Ce[ve + 8] = U.x, Ce[ve + 9] = U.y, Ce[ve + 10] = U.z, Ce[ve + 11] = U.w, ve += 12;
                                     me.bindBuffer(me.ARRAY_BUFFER, v.__webglTangentBuffer), me.bufferData(me.ARRAY_BUFFER, Ce, T)
                                 }
                                 if (ze) {
                                     for (_ = 0, b = $.length; b > _; _++)
                                         if (M = Ye[$[_]], S = M.vertexNormals, C = M.normal, 3 === S.length && !1 === H)
                                             for (ee = 0; 3 > ee; ee++) re = S[ee], Se[ge] = re.x, Se[ge + 1] = re.y, Se[ge + 2] = re.z, ge += 3;
                                         else
                                             for (ee = 0; 3 > ee; ee++) Se[ge] = C.x, Se[ge + 1] = C.y, Se[ge + 2] = C.z, ge += 3;
                                     me.bindBuffer(me.ARRAY_BUFFER, v.__webglNormalBuffer), me.bufferData(me.ARRAY_BUFFER, Se, T)
                                 }
                                 if (Ve && Je) {
                                     for (_ = 0, b = $.length; b > _; _++)
                                         if (w = $[_], D = Je[w], void 0 !== D)
                                             for (ee = 0; 3 > ee; ee++) ie = D[ee], we[fe] = ie.x, we[fe + 1] = ie.y, fe += 2;
                                     fe > 0 && (me.bindBuffer(me.ARRAY_BUFFER, v.__webglUVBuffer), me.bufferData(me.ARRAY_BUFFER, we, T))
                                 }
                                 if (Ve && Ke) {
                                     for (_ = 0, b = $.length; b > _; _++)
                                         if (w = $[_], F = Ke[w], void 0 !== F)
                                             for (ee = 0; 3 > ee; ee++) ne = F[ee], Me[pe] = ne.x, Me[pe + 1] = ne.y, pe += 2;
                                     pe > 0 && (me.bindBuffer(me.ARRAY_BUFFER, v.__webglUV2Buffer), me.bufferData(me.ARRAY_BUFFER, Me, T))
                                 }
                                 if (Ue) {
                                     for (_ = 0, b = $.length; b > _; _++) Ne[Ee] = ce, Ne[Ee + 1] = ce + 1, Ne[Ee + 2] = ce + 2, Ee += 3, Ie[ye] = ce, Ie[ye + 1] = ce + 1, Ie[ye + 2] = ce, Ie[ye + 3] = ce + 2, Ie[ye + 4] = ce + 1, Ie[ye + 5] = ce + 2, ye += 6, ce += 3;
                                     me.bindBuffer(me.ELEMENT_ARRAY_BUFFER, v.__webglFaceBuffer), me.bufferData(me.ELEMENT_ARRAY_BUFFER, Ne, T), me.bindBuffer(me.ELEMENT_ARRAY_BUFFER, v.__webglLineBuffer), me.bufferData(me.ELEMENT_ARRAY_BUFFER, Ie, T)
                                 }
                                 if (ke)
                                     for (ee = 0, te = ke.length; te > ee; ee++)
                                         if (Be = ke[ee], Be.__original.needsUpdate) {
                                             if (He = 0, 1 === Be.size) {
                                                 if (void 0 === Be.boundTo || "vertices" === Be.boundTo)
                                                     for (_ = 0, b = $.length; b > _; _++) M = Ye[$[_]], Be.array[He] = Be.value[M.a], Be.array[He + 1] = Be.value[M.b], Be.array[He + 2] = Be.value[M.c], He += 3;
                                                 else if ("faces" === Be.boundTo)
                                                     for (_ = 0, b = $.length; b > _; _++) _e = Be.value[$[_]], Be.array[He] = _e, Be.array[He + 1] = _e, Be.array[He + 2] = _e, He += 3
                                             } else if (2 === Be.size) {
                                                 if (void 0 === Be.boundTo || "vertices" === Be.boundTo)
                                                     for (_ = 0, b = $.length; b > _; _++) M = Ye[$[_]], k = Be.value[M.a], B = Be.value[M.b], N = Be.value[M.c], Be.array[He] = k.x, Be.array[He + 1] = k.y, Be.array[He + 2] = B.x, Be.array[He + 3] = B.y, Be.array[He + 4] = N.x, Be.array[He + 5] = N.y, He += 6;
                                                 else if ("faces" === Be.boundTo)
                                                     for (_ = 0, b = $.length; b > _; _++) N = B = k = _e = Be.value[$[_]], Be.array[He] = k.x, Be.array[He + 1] = k.y, Be.array[He + 2] = B.x, Be.array[He + 3] = B.y, Be.array[He + 4] = N.x, Be.array[He + 5] = N.y, He += 6
                                             } else if (3 === Be.size) {
                                                 var tt;
                                                 if (tt = "c" === Be.type ? ["r", "g", "b"] : ["x", "y", "z"], void 0 === Be.boundTo || "vertices" === Be.boundTo)
                                                     for (_ = 0, b = $.length; b > _; _++) M = Ye[$[_]], k = Be.value[M.a], B = Be.value[M.b], N = Be.value[M.c], Be.array[He] = k[tt[0]], Be.array[He + 1] = k[tt[1]], Be.array[He + 2] = k[tt[2]], Be.array[He + 3] = B[tt[0]], Be.array[He + 4] = B[tt[1]], Be.array[He + 5] = B[tt[2]], Be.array[He + 6] = N[tt[0]], Be.array[He + 7] = N[tt[1]], Be.array[He + 8] = N[tt[2]], He += 9;
                                                 else if ("faces" === Be.boundTo)
                                                     for (_ = 0, b = $.length; b > _; _++) N = B = k = _e = Be.value[$[_]], Be.array[He] = k[tt[0]], Be.array[He + 1] = k[tt[1]], Be.array[He + 2] = k[tt[2]], Be.array[He + 3] = B[tt[0]], Be.array[He + 4] = B[tt[1]], Be.array[He + 5] = B[tt[2]], Be.array[He + 6] = N[tt[0]], Be.array[He + 7] = N[tt[1]], Be.array[He + 8] = N[tt[2]], He += 9;
                                                 else if ("faceVertices" === Be.boundTo)
                                                     for (_ = 0, b = $.length; b > _; _++) _e = Be.value[$[_]], k = _e[0], B = _e[1], N = _e[2], Be.array[He] = k[tt[0]], Be.array[He + 1] = k[tt[1]], Be.array[He + 2] = k[tt[2]], Be.array[He + 3] = B[tt[0]], Be.array[He + 4] = B[tt[1]], Be.array[He + 5] = B[tt[2]], Be.array[He + 6] = N[tt[0]], Be.array[He + 7] = N[tt[1]], Be.array[He + 8] = N[tt[2]], He += 9
                                             } else if (4 === Be.size)
                                                 if (void 0 === Be.boundTo || "vertices" === Be.boundTo)
                                                     for (_ = 0, b = $.length; b > _; _++) M = Ye[$[_]], k = Be.value[M.a], B = Be.value[M.b], N = Be.value[M.c], Be.array[He] = k.x, Be.array[He + 1] = k.y, Be.array[He + 2] = k.z, Be.array[He + 3] = k.w, Be.array[He + 4] = B.x, Be.array[He + 5] = B.y, Be.array[He + 6] = B.z, Be.array[He + 7] = B.w, Be.array[He + 8] = N.x, Be.array[He + 9] = N.y, Be.array[He + 10] = N.z, Be.array[He + 11] = N.w, He += 12;
                                                 else if ("faces" === Be.boundTo)
                                                 for (_ = 0, b = $.length; b > _; _++) N = B = k = _e = Be.value[$[_]], Be.array[He] = k.x, Be.array[He + 1] = k.y, Be.array[He + 2] = k.z, Be.array[He + 3] = k.w, Be.array[He + 4] = B.x, Be.array[He + 5] = B.y, Be.array[He + 6] = B.z, Be.array[He + 7] = B.w, Be.array[He + 8] = N.x, Be.array[He + 9] = N.y, Be.array[He + 10] = N.z, Be.array[He + 11] = N.w, He += 12;
                                             else if ("faceVertices" === Be.boundTo)
                                                 for (_ = 0, b = $.length; b > _; _++) _e = Be.value[$[_]], k = _e[0], B = _e[1], N = _e[2], Be.array[He] = k.x, Be.array[He + 1] = k.y, Be.array[He + 2] = k.z, Be.array[He + 3] = k.w, Be.array[He + 4] = B.x, Be.array[He + 5] = B.y, Be.array[He + 6] = B.z, Be.array[He + 7] = B.w, Be.array[He + 8] = N.x, Be.array[He + 9] = N.y, Be.array[He + 10] = N.z, Be.array[He + 11] = N.w, He += 12;
                                             me.bindBuffer(me.ARRAY_BUFFER, Be.buffer), me.bufferData(me.ARRAY_BUFFER, Be.array, T)
                                         }
                                 R && (delete v.__inittedArrays, delete v.__colorArray, delete v.__normalArray, delete v.__tangentArray, delete v.__uvArray, delete v.__uv2Array, delete v.__faceArray, delete v.__vertexArray, delete v.__lineArray, delete v.__skinIndexArray, delete v.__skinWeightArray)
                             }
                         }
                     }
                     t.verticesNeedUpdate = !1, t.morphTargetsNeedUpdate = !1, t.elementsNeedUpdate = !1, t.uvsNeedUpdate = !1, t.normalsNeedUpdate = !1, t.colorsNeedUpdate = !1, t.tangentsNeedUpdate = !1, E.attributes && m(E)
                 } else if (e instanceof THREE.Line) {
                 if (E = r(e, t), g = E.attributes && p(E), t.verticesNeedUpdate || t.colorsNeedUpdate || t.lineDistancesNeedUpdate || g) {
                     var rt = me.DYNAMIC_DRAW,
                         it, nt, at, ot, st, ht, lt = t.vertices,
                         ut = t.colors,
                         ct = t.lineDistances,
                         dt = lt.length,
                         ft = ut.length,
                         pt = ct.length,
                         mt = t.__vertexArray,
                         Et = t.__colorArray,
                         gt = t.__lineDistanceArray,
                         vt = t.colorsNeedUpdate,
                         yt = t.lineDistancesNeedUpdate,
                         Tt = t.__webglCustomAttributesList,
                         Rt, xt, Ht, _t, bt, wt;
                     if (t.verticesNeedUpdate) {
                         for (it = 0; dt > it; it++) ot = lt[it], st = 3 * it, mt[st] = ot.x, mt[st + 1] = ot.y, mt[st + 2] = ot.z;
                         me.bindBuffer(me.ARRAY_BUFFER, t.__webglVertexBuffer), me.bufferData(me.ARRAY_BUFFER, mt, rt)
                     }
                     if (vt) {
                         for (nt = 0; ft > nt; nt++) ht = ut[nt], st = 3 * nt, Et[st] = ht.r, Et[st + 1] = ht.g, Et[st + 2] = ht.b;
                         me.bindBuffer(me.ARRAY_BUFFER, t.__webglColorBuffer), me.bufferData(me.ARRAY_BUFFER, Et, rt)
                     }
                     if (yt) {
                         for (at = 0; pt > at; at++) gt[at] = ct[at];
                         me.bindBuffer(me.ARRAY_BUFFER, t.__webglLineDistanceBuffer), me.bufferData(me.ARRAY_BUFFER, gt, rt)
                     }
                     if (Tt)
                         for (Rt = 0, xt = Tt.length; xt > Rt; Rt++)
                             if (wt = Tt[Rt], wt.needsUpdate && (void 0 === wt.boundTo || "vertices" === wt.boundTo)) {
                                 if (st = 0, _t = wt.value.length, 1 === wt.size)
                                     for (Ht = 0; _t > Ht; Ht++) wt.array[Ht] = wt.value[Ht];
                                 else if (2 === wt.size)
                                     for (Ht = 0; _t > Ht; Ht++) bt = wt.value[Ht], wt.array[st] = bt.x, wt.array[st + 1] = bt.y, st += 2;
                                 else if (3 === wt.size)
                                     if ("c" === wt.type)
                                         for (Ht = 0; _t > Ht; Ht++) bt = wt.value[Ht], wt.array[st] = bt.r, wt.array[st + 1] = bt.g, wt.array[st + 2] = bt.b, st += 3;
                                     else
                                         for (Ht = 0; _t > Ht; Ht++) bt = wt.value[Ht], wt.array[st] = bt.x, wt.array[st + 1] = bt.y, wt.array[st + 2] = bt.z, st += 3;
                                 else if (4 === wt.size)
                                     for (Ht = 0; _t > Ht; Ht++) bt = wt.value[Ht], wt.array[st] = bt.x, wt.array[st + 1] = bt.y, wt.array[st + 2] = bt.z, wt.array[st + 3] = bt.w, st += 4;
                                 me.bindBuffer(me.ARRAY_BUFFER, wt.buffer), me.bufferData(me.ARRAY_BUFFER, wt.array, rt), wt.needsUpdate = !1
                             }
                 }
                 t.verticesNeedUpdate = !1, t.colorsNeedUpdate = !1, t.lineDistancesNeedUpdate = !1, E.attributes && m(E)
             } else if (e instanceof THREE.PointCloud) {
                 if (E = r(e, t), g = E.attributes && p(E), t.verticesNeedUpdate || t.colorsNeedUpdate || g) {
                     var Mt = me.DYNAMIC_DRAW,
                         St, Ct, At, Lt, Pt, Dt = t.vertices,
                         Ft = Dt.length,
                         kt = t.colors,
                         Bt = kt.length,
                         Nt = t.__vertexArray,
                         It = t.__colorArray,
                         Ot = t.colorsNeedUpdate,
                         Ut = t.__webglCustomAttributesList,
                         Vt, zt, Gt, Wt, jt, Xt;
                     if (t.verticesNeedUpdate) {
                         for (St = 0; Ft > St; St++) At = Dt[St], Lt = 3 * St, Nt[Lt] = At.x, Nt[Lt + 1] = At.y, Nt[Lt + 2] = At.z;
                         me.bindBuffer(me.ARRAY_BUFFER, t.__webglVertexBuffer), me.bufferData(me.ARRAY_BUFFER, Nt, Mt)
                     }
                     if (Ot) {
                         for (Ct = 0; Bt > Ct; Ct++) Pt = kt[Ct], Lt = 3 * Ct, It[Lt] = Pt.r, It[Lt + 1] = Pt.g, It[Lt + 2] = Pt.b;
                         me.bindBuffer(me.ARRAY_BUFFER, t.__webglColorBuffer), me.bufferData(me.ARRAY_BUFFER, It, Mt)
                     }
                     if (Ut)
                         for (Vt = 0, zt = Ut.length; zt > Vt; Vt++) {
                             if (Xt = Ut[Vt], Xt.needsUpdate && (void 0 === Xt.boundTo || "vertices" === Xt.boundTo))
                                 if (Wt = Xt.value.length, Lt = 0, 1 === Xt.size)
                                     for (Gt = 0; Wt > Gt; Gt++) Xt.array[Gt] = Xt.value[Gt];
                                 else if (2 === Xt.size)
                                 for (Gt = 0; Wt > Gt; Gt++) jt = Xt.value[Gt], Xt.array[Lt] = jt.x, Xt.array[Lt + 1] = jt.y, Lt += 2;
                             else if (3 === Xt.size)
                                 if ("c" === Xt.type)
                                     for (Gt = 0; Wt > Gt; Gt++) jt = Xt.value[Gt], Xt.array[Lt] = jt.r, Xt.array[Lt + 1] = jt.g, Xt.array[Lt + 2] = jt.b, Lt += 3;
                                 else
                                     for (Gt = 0; Wt > Gt; Gt++) jt = Xt.value[Gt], Xt.array[Lt] = jt.x, Xt.array[Lt + 1] = jt.y, Xt.array[Lt + 2] = jt.z, Lt += 3;
                             else if (4 === Xt.size)
                                 for (Gt = 0; Wt > Gt; Gt++) jt = Xt.value[Gt], Xt.array[Lt] = jt.x, Xt.array[Lt + 1] = jt.y, Xt.array[Lt + 2] = jt.z, Xt.array[Lt + 3] = jt.w, Lt += 4;
                             me.bindBuffer(me.ARRAY_BUFFER, Xt.buffer), me.bufferData(me.ARRAY_BUFFER, Xt.array, Mt), Xt.needsUpdate = !1
                         }
                 }
                 t.verticesNeedUpdate = !1, t.colorsNeedUpdate = !1, E.attributes && m(E)
             }
         }

         function p(e) {
             for (var t in e.attributes)
                 if (e.attributes[t].needsUpdate) return !0;
             return !1
         }

         function m(e) {
             for (var t in e.attributes) e.attributes[t].needsUpdate = !1
         }

         function E(e) {
             !0 === e.transparent ? ve.setBlending(e.blending, e.blendEquation, e.blendSrc, e.blendDst, e.blendEquationAlpha, e.blendSrcAlpha, e.blendDstAlpha) : ve.setBlending(THREE.NoBlending), ve.setDepthTest(e.depthTest), ve.setDepthWrite(e.depthWrite), ve.setColorWrite(e.colorWrite), ve.setPolygonOffset(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits)
         }

         function g(e, t, r, i, n) {
             var a, o, s, h;
             if (re = 0, i.needsUpdate) {
                 i.program && je(i), i.addEventListener("dispose", Ge);
                 var l = Ye[i.type];
                 if (l) {
                     var u = THREE.ShaderLib[l];
                     i.__webglShader = {
                         uniforms: THREE.UniformsUtils.clone(u.uniforms),
                         vertexShader: u.vertexShader,
                         fragmentShader: u.fragmentShader
                     }
                 } else i.__webglShader = {
                     uniforms: i.uniforms,
                     vertexShader: i.vertexShader,
                     fragmentShader: i.fragmentShader
                 };
                 for (var c = 0, d = 0, f = 0, p = 0, m = 0, E = t.length; E > m; m++) {
                     var g = t[m];
                     g.onlyShadow || !1 === g.visible || (g instanceof THREE.DirectionalLight && c++, g instanceof THREE.PointLight && d++, g instanceof THREE.SpotLight && f++, g instanceof THREE.HemisphereLight && p++)
                 }
                 a = c, o = d, s = f, h = p;
                 for (var T, _ = 0, b = 0, w = t.length; w > b; b++) {
                     var C = t[b];
                     C.castShadow && (C instanceof THREE.SpotLight && _++, C instanceof THREE.DirectionalLight && !C.shadowCascade && _++)
                 }
                 T = _;
                 var A;
                 if (Se && n && n.skeleton && n.skeleton.useVertexTexture) A = 1024;
                 else {
                     var P = me.getParameter(me.MAX_VERTEX_UNIFORM_VECTORS),
                         D = Math.floor((P - 20) / 4);
                     void 0 !== n && n instanceof THREE.SkinnedMesh && (D = Math.min(n.skeleton.bones.length, D), D < n.skeleton.bones.length && THREE.warn("WebGLRenderer: too many bones - " + n.skeleton.bones.length + ", this GPU supports just " + D + " (try OpenGL instead of ANGLE)")), A = D
                 }
                 var F = {
                         precision: L,
                         supportsVertexTextures: Me,
                         map: !!i.map,
                         envMap: !!i.envMap,
                         envMapMode: i.envMap && i.envMap.mapping,
                         lightMap: !!i.lightMap,
                         bumpMap: !!i.bumpMap,
                         normalMap: !!i.normalMap,
                         specularMap: !!i.specularMap,
                         alphaMap: !!i.alphaMap,
                         combine: i.combine,
                         vertexColors: i.vertexColors,
                         fog: r,
                         useFog: i.fog,
                         fogExp: r instanceof THREE.FogExp2,
                         flatShading: i.shading === THREE.FlatShading,
                         sizeAttenuation: i.sizeAttenuation,
                         logarithmicDepthBuffer: I,
                         skinning: i.skinning,
                         maxBones: A,
                         useVertexTexture: Se && n && n.skeleton && n.skeleton.useVertexTexture,
                         morphTargets: i.morphTargets,
                         morphNormals: i.morphNormals,
                         maxMorphTargets: Y.maxMorphTargets,
                         maxMorphNormals: Y.maxMorphNormals,
                         maxDirLights: a,
                         maxPointLights: o,
                         maxSpotLights: s,
                         maxHemiLights: h,
                         maxShadows: T,
                         shadowMapEnabled: Y.shadowMapEnabled && n.receiveShadow && T > 0,
                         shadowMapType: Y.shadowMapType,
                         shadowMapDebug: Y.shadowMapDebug,
                         shadowMapCascade: Y.shadowMapCascade,
                         alphaTest: i.alphaTest,
                         metal: i.metal,
                         wrapAround: i.wrapAround,
                         doubleSided: i.side === THREE.DoubleSide,
                         flipSided: i.side === THREE.BackSide
                     },
                     k = [];
                 if (l ? k.push(l) : (k.push(i.fragmentShader), k.push(i.vertexShader)), void 0 !== i.defines)
                     for (var B in i.defines) k.push(B), k.push(i.defines[B]);
                 for (B in F) k.push(B), k.push(F[B]);
                 for (var N = k.join(), O, U = 0, V = J.length; V > U; U++) {
                     var z = J[U];
                     if (z.code === N) {
                         O = z, O.usedTimes++;
                         break
                     }
                 }
                 void 0 === O && (O = new THREE.WebGLProgram(Y, N, i, F), J.push(O), Y.info.memory.programs = J.length), i.program = O;
                 var G = O.attributes;
                 if (i.morphTargets) {
                     i.numSupportedMorphTargets = 0;
                     for (var W, j = "morphTarget", X = 0; X < Y.maxMorphTargets; X++) W = j + X, 0 <= G[W] && i.numSupportedMorphTargets++
                 }
                 if (i.morphNormals)
                     for (i.numSupportedMorphNormals = 0, j = "morphNormal", X = 0; X < Y.maxMorphNormals; X++) W = j + X,
                         0 <= G[W] && i.numSupportedMorphNormals++;
                 i.uniformsList = [];
                 for (var q in i.__webglShader.uniforms) {
                     var Q = i.program.uniforms[q];
                     Q && i.uniformsList.push([i.__webglShader.uniforms[q], Q])
                 }
                 i.needsUpdate = !1
             }
             i.morphTargets && !n.__webglMorphTargetInfluences && (n.__webglMorphTargetInfluences = new Float32Array(Y.maxMorphTargets));
             var ee = !1,
                 ie = !1,
                 ne = !1,
                 ae = i.program,
                 oe = ae.uniforms,
                 se = i.__webglShader.uniforms;
             if (ae.id !== K && (me.useProgram(ae.program), K = ae.id, ne = ie = ee = !0), i.id !== Z && (-1 === Z && (ne = !0), Z = i.id, ie = !0), (ee || e !== te) && (me.uniformMatrix4fv(oe.projectionMatrix, !1, e.projectionMatrix.elements), I && me.uniform1f(oe.logDepthBufFC, 2 / (Math.log(e.far + 1) / Math.LN2)), e !== te && (te = e), (i instanceof THREE.ShaderMaterial || i instanceof THREE.MeshPhongMaterial || i.envMap) && null !== oe.cameraPosition && (ce.setFromMatrixPosition(e.matrixWorld), me.uniform3f(oe.cameraPosition, ce.x, ce.y, ce.z)), (i instanceof THREE.MeshPhongMaterial || i instanceof THREE.MeshLambertMaterial || i instanceof THREE.MeshBasicMaterial || i instanceof THREE.ShaderMaterial || i.skinning) && null !== oe.viewMatrix && me.uniformMatrix4fv(oe.viewMatrix, !1, e.matrixWorldInverse.elements)), i.skinning)
                 if (n.bindMatrix && null !== oe.bindMatrix && me.uniformMatrix4fv(oe.bindMatrix, !1, n.bindMatrix.elements), n.bindMatrixInverse && null !== oe.bindMatrixInverse && me.uniformMatrix4fv(oe.bindMatrixInverse, !1, n.bindMatrixInverse.elements), Se && n.skeleton && n.skeleton.useVertexTexture) {
                     if (null !== oe.boneTexture) {
                         var he = y();
                         me.uniform1i(oe.boneTexture, he), Y.setTexture(n.skeleton.boneTexture, he)
                     }
                     null !== oe.boneTextureWidth && me.uniform1i(oe.boneTextureWidth, n.skeleton.boneTextureWidth), null !== oe.boneTextureHeight && me.uniform1i(oe.boneTextureHeight, n.skeleton.boneTextureHeight)
                 } else n.skeleton && n.skeleton.boneMatrices && null !== oe.boneGlobalMatrices && me.uniformMatrix4fv(oe.boneGlobalMatrices, !1, n.skeleton.boneMatrices);
             if (ie) {
                 if (r && i.fog && (se.fogColor.value = r.color, r instanceof THREE.Fog ? (se.fogNear.value = r.near, se.fogFar.value = r.far) : r instanceof THREE.FogExp2 && (se.fogDensity.value = r.density)), i instanceof THREE.MeshPhongMaterial || i instanceof THREE.MeshLambertMaterial || i.lights) {
                     if (fe) {
                         var ne = !0,
                             le, ue, Ee, ge = 0,
                             ve = 0,
                             ye = 0,
                             Te, Re, xe, He, _e, be = pe,
                             Ce = be.directional.colors,
                             Ae = be.directional.positions,
                             Le = be.point.colors,
                             Pe = be.point.positions,
                             Fe = be.point.distances,
                             ke = be.point.decays,
                             Be = be.spot.colors,
                             Ne = be.spot.positions,
                             Ie = be.spot.distances,
                             Oe = be.spot.directions,
                             Ue = be.spot.anglesCos,
                             ze = be.spot.exponents,
                             We = be.spot.decays,
                             Xe = be.hemi.skyColors,
                             qe = be.hemi.groundColors,
                             Je = be.hemi.positions,
                             Ke = 0,
                             Qe = 0,
                             Ze = 0,
                             $e = 0,
                             et = 0,
                             tt = 0,
                             rt = 0,
                             it = 0,
                             nt = 0,
                             at = 0,
                             ot = 0,
                             st = 0;
                         for (le = 0, ue = t.length; ue > le; le++) Ee = t[le], Ee.onlyShadow || (Te = Ee.color, He = Ee.intensity, _e = Ee.distance, Ee instanceof THREE.AmbientLight ? Ee.visible && (ge += Te.r, ve += Te.g, ye += Te.b) : Ee instanceof THREE.DirectionalLight ? (et += 1, Ee.visible && (de.setFromMatrixPosition(Ee.matrixWorld), ce.setFromMatrixPosition(Ee.target.matrixWorld), de.sub(ce), de.normalize(), nt = 3 * Ke, Ae[nt] = de.x, Ae[nt + 1] = de.y, Ae[nt + 2] = de.z, R(Ce, nt, Te, He), Ke += 1)) : Ee instanceof THREE.PointLight ? (tt += 1, Ee.visible && (at = 3 * Qe, R(Le, at, Te, He), ce.setFromMatrixPosition(Ee.matrixWorld), Pe[at] = ce.x, Pe[at + 1] = ce.y, Pe[at + 2] = ce.z, Fe[Qe] = _e, ke[Qe] = 0 === Ee.distance ? 0 : Ee.decay, Qe += 1)) : Ee instanceof THREE.SpotLight ? (rt += 1, Ee.visible && (ot = 3 * Ze, R(Be, ot, Te, He), de.setFromMatrixPosition(Ee.matrixWorld), Ne[ot] = de.x, Ne[ot + 1] = de.y, Ne[ot + 2] = de.z, Ie[Ze] = _e, ce.setFromMatrixPosition(Ee.target.matrixWorld), de.sub(ce), de.normalize(), Oe[ot] = de.x, Oe[ot + 1] = de.y, Oe[ot + 2] = de.z, Ue[Ze] = Math.cos(Ee.angle), ze[Ze] = Ee.exponent, We[Ze] = 0 === Ee.distance ? 0 : Ee.decay, Ze += 1)) : Ee instanceof THREE.HemisphereLight && (it += 1, Ee.visible && (de.setFromMatrixPosition(Ee.matrixWorld), de.normalize(), st = 3 * $e, Je[st] = de.x, Je[st + 1] = de.y, Je[st + 2] = de.z, Re = Ee.color, xe = Ee.groundColor, R(Xe, st, Re, He), R(qe, st, xe, He), $e += 1)));
                         for (le = 3 * Ke, ue = Math.max(Ce.length, 3 * et); ue > le; le++) Ce[le] = 0;
                         for (le = 3 * Qe, ue = Math.max(Le.length, 3 * tt); ue > le; le++) Le[le] = 0;
                         for (le = 3 * Ze, ue = Math.max(Be.length, 3 * rt); ue > le; le++) Be[le] = 0;
                         for (le = 3 * $e, ue = Math.max(Xe.length, 3 * it); ue > le; le++) Xe[le] = 0;
                         for (le = 3 * $e, ue = Math.max(qe.length, 3 * it); ue > le; le++) qe[le] = 0;
                         be.directional.length = Ke, be.point.length = Qe, be.spot.length = Ze, be.hemi.length = $e, be.ambient[0] = ge, be.ambient[1] = ve, be.ambient[2] = ye, fe = !1
                     }
                     if (ne) {
                         var ht = pe;
                         se.ambientLightColor.value = ht.ambient, se.directionalLightColor.value = ht.directional.colors, se.directionalLightDirection.value = ht.directional.positions, se.pointLightColor.value = ht.point.colors, se.pointLightPosition.value = ht.point.positions, se.pointLightDistance.value = ht.point.distances, se.pointLightDecay.value = ht.point.decays, se.spotLightColor.value = ht.spot.colors, se.spotLightPosition.value = ht.spot.positions, se.spotLightDistance.value = ht.spot.distances, se.spotLightDirection.value = ht.spot.directions, se.spotLightAngleCos.value = ht.spot.anglesCos, se.spotLightExponent.value = ht.spot.exponents, se.spotLightDecay.value = ht.spot.decays, se.hemisphereLightSkyColor.value = ht.hemi.skyColors, se.hemisphereLightGroundColor.value = ht.hemi.groundColors, se.hemisphereLightDirection.value = ht.hemi.positions, v(se, !0)
                     } else v(se, !1)
                 }
                 if (i instanceof THREE.MeshBasicMaterial || i instanceof THREE.MeshLambertMaterial || i instanceof THREE.MeshPhongMaterial) {
                     se.opacity.value = i.opacity, se.diffuse.value = i.color, se.map.value = i.map, se.lightMap.value = i.lightMap, se.specularMap.value = i.specularMap, se.alphaMap.value = i.alphaMap, i.bumpMap && (se.bumpMap.value = i.bumpMap, se.bumpScale.value = i.bumpScale), i.normalMap && (se.normalMap.value = i.normalMap, se.normalScale.value.copy(i.normalScale));
                     var lt;
                     if (i.map ? lt = i.map : i.specularMap ? lt = i.specularMap : i.normalMap ? lt = i.normalMap : i.bumpMap ? lt = i.bumpMap : i.alphaMap && (lt = i.alphaMap), void 0 !== lt) {
                         var ut = lt.offset,
                             ct = lt.repeat;
                         se.offsetRepeat.value.set(ut.x, ut.y, ct.x, ct.y)
                     }
                     se.envMap.value = i.envMap, se.flipEnvMap.value = i.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1, se.reflectivity.value = i.reflectivity, se.refractionRatio.value = i.refractionRatio
                 }
                 if (i instanceof THREE.LineBasicMaterial) se.diffuse.value = i.color, se.opacity.value = i.opacity;
                 else if (i instanceof THREE.LineDashedMaterial) se.diffuse.value = i.color, se.opacity.value = i.opacity, se.dashSize.value = i.dashSize, se.totalSize.value = i.dashSize + i.gapSize, se.scale.value = i.scale;
                 else if (i instanceof THREE.PointCloudMaterial) {
                     if (se.psColor.value = i.color, se.opacity.value = i.opacity, se.size.value = i.size, se.scale.value = S.height / 2, se.map.value = i.map, null !== i.map) {
                         var dt = i.map.offset,
                             ft = i.map.repeat;
                         se.offsetRepeat.value.set(dt.x, dt.y, ft.x, ft.y)
                     }
                 } else i instanceof THREE.MeshPhongMaterial ? (se.shininess.value = i.shininess, se.emissive.value = i.emissive, se.specular.value = i.specular, i.wrapAround && se.wrapRGB.value.copy(i.wrapRGB)) : i instanceof THREE.MeshLambertMaterial ? (se.emissive.value = i.emissive, i.wrapAround && se.wrapRGB.value.copy(i.wrapRGB)) : i instanceof THREE.MeshDepthMaterial ? (se.mNear.value = e.near, se.mFar.value = e.far, se.opacity.value = i.opacity) : i instanceof THREE.MeshNormalMaterial && (se.opacity.value = i.opacity);
                 if (n.receiveShadow && !i._shadowPass && se.shadowMatrix)
                     for (var pt = 0, mt = 0, $ = t.length; $ > mt; mt++) {
                         var Et = t[mt];
                         Et.castShadow && (Et instanceof THREE.SpotLight || Et instanceof THREE.DirectionalLight && !Et.shadowCascade) && (se.shadowMap.value[pt] = Et.shadowMap, se.shadowMapSize.value[pt] = Et.shadowMapSize, se.shadowMatrix.value[pt] = Et.shadowMatrix, se.shadowDarkness.value[pt] = Et.shadowDarkness, se.shadowBias.value[pt] = Et.shadowBias, pt++)
                     }
                 for (var gt = i.uniformsList, vt, yt, Tt, Rt = 0, xt = gt.length; xt > Rt; Rt++) {
                     var Ht = gt[Rt][0];
                     if (!1 !== Ht.needsUpdate) {
                         var _t = Ht.type,
                             bt = Ht.value,
                             wt = gt[Rt][1];
                         switch (_t) {
                             case "1i":
                                 me.uniform1i(wt, bt);
                                 break;
                             case "1f":
                                 me.uniform1f(wt, bt);
                                 break;
                             case "2f":
                                 me.uniform2f(wt, bt[0], bt[1]);
                                 break;
                             case "3f":
                                 me.uniform3f(wt, bt[0], bt[1], bt[2]);
                                 break;
                             case "4f":
                                 me.uniform4f(wt, bt[0], bt[1], bt[2], bt[3]);
                                 break;
                             case "1iv":
                                 me.uniform1iv(wt, bt);
                                 break;
                             case "3iv":
                                 me.uniform3iv(wt, bt);
                                 break;
                             case "1fv":
                                 me.uniform1fv(wt, bt);
                                 break;
                             case "2fv":
                                 me.uniform2fv(wt, bt);
                                 break;
                             case "3fv":
                                 me.uniform3fv(wt, bt);
                                 break;
                             case "4fv":
                                 me.uniform4fv(wt, bt);
                                 break;
                             case "Matrix3fv":
                                 me.uniformMatrix3fv(wt, !1, bt);
                                 break;
                             case "Matrix4fv":
                                 me.uniformMatrix4fv(wt, !1, bt);
                                 break;
                             case "i":
                                 me.uniform1i(wt, bt);
                                 break;
                             case "f":
                                 me.uniform1f(wt, bt);
                                 break;
                             case "v2":
                                 me.uniform2f(wt, bt.x, bt.y);
                                 break;
                             case "v3":
                                 me.uniform3f(wt, bt.x, bt.y, bt.z);
                                 break;
                             case "v4":
                                 me.uniform4f(wt, bt.x, bt.y, bt.z, bt.w);
                                 break;
                             case "c":
                                 me.uniform3f(wt, bt.r, bt.g, bt.b);
                                 break;
                             case "iv1":
                                 me.uniform1iv(wt, bt);
                                 break;
                             case "iv":
                                 me.uniform3iv(wt, bt);
                                 break;
                             case "fv1":
                                 me.uniform1fv(wt, bt);
                                 break;
                             case "fv":
                                 me.uniform3fv(wt, bt);
                                 break;
                             case "v2v":
                                 void 0 === Ht._array && (Ht._array = new Float32Array(2 * bt.length));
                                 for (var Mt = 0, St = bt.length; St > Mt; Mt++) Tt = 2 * Mt, Ht._array[Tt] = bt[Mt].x, Ht._array[Tt + 1] = bt[Mt].y;
                                 me.uniform2fv(wt, Ht._array);
                                 break;
                             case "v3v":
                                 for (void 0 === Ht._array && (Ht._array = new Float32Array(3 * bt.length)), Mt = 0, St = bt.length; St > Mt; Mt++) Tt = 3 * Mt, Ht._array[Tt] = bt[Mt].x, Ht._array[Tt + 1] = bt[Mt].y, Ht._array[Tt + 2] = bt[Mt].z;
                                 me.uniform3fv(wt, Ht._array);
                                 break;
                             case "v4v":
                                 for (void 0 === Ht._array && (Ht._array = new Float32Array(4 * bt.length)), Mt = 0, St = bt.length; St > Mt; Mt++) Tt = 4 * Mt, Ht._array[Tt] = bt[Mt].x, Ht._array[Tt + 1] = bt[Mt].y, Ht._array[Tt + 2] = bt[Mt].z, Ht._array[Tt + 3] = bt[Mt].w;
                                 me.uniform4fv(wt, Ht._array);
                                 break;
                             case "m3":
                                 me.uniformMatrix3fv(wt, !1, bt.elements);
                                 break;
                             case "m3v":
                                 for (void 0 === Ht._array && (Ht._array = new Float32Array(9 * bt.length)), Mt = 0, St = bt.length; St > Mt; Mt++) bt[Mt].flattenToArrayOffset(Ht._array, 9 * Mt);
                                 me.uniformMatrix3fv(wt, !1, Ht._array);
                                 break;
                             case "m4":
                                 me.uniformMatrix4fv(wt, !1, bt.elements);
                                 break;
                             case "m4v":
                                 for (void 0 === Ht._array && (Ht._array = new Float32Array(16 * bt.length)), Mt = 0, St = bt.length; St > Mt; Mt++) bt[Mt].flattenToArrayOffset(Ht._array, 16 * Mt);
                                 me.uniformMatrix4fv(wt, !1, Ht._array);
                                 break;
                             case "t":
                                 if (vt = bt, yt = y(), me.uniform1i(wt, yt), !vt) continue;
                                 if (vt instanceof THREE.CubeTexture || vt.image instanceof Array && 6 === vt.image.length) {
                                     var Ct = vt,
                                         At = yt;
                                     if (6 === Ct.image.length)
                                         if (Ct.needsUpdate) {
                                             Ct.image.__webglTextureCube || (Ct.addEventListener("dispose", Ve), Ct.image.__webglTextureCube = me.createTexture(), Y.info.memory.textures++), me.activeTexture(me.TEXTURE0 + At), me.bindTexture(me.TEXTURE_CUBE_MAP, Ct.image.__webglTextureCube), me.pixelStorei(me.UNPACK_FLIP_Y_WEBGL, Ct.flipY);
                                             for (var Lt = Ct instanceof THREE.CompressedTexture, Pt = Ct.image[0] instanceof THREE.DataTexture, Dt = [], Ft = 0; 6 > Ft; Ft++) Dt[Ft] = !Y.autoScaleCubemaps || Lt || Pt ? Pt ? Ct.image[Ft].image : Ct.image[Ft] : H(Ct.image[Ft], we);
                                             var kt = Dt[0],
                                                 Bt = THREE.Math.isPowerOfTwo(kt.width) && THREE.Math.isPowerOfTwo(kt.height),
                                                 Nt = M(Ct.format),
                                                 It = M(Ct.type);
                                             for (x(me.TEXTURE_CUBE_MAP, Ct, Bt), Ft = 0; 6 > Ft; Ft++)
                                                 if (Lt)
                                                     for (var Ot, Ut = Dt[Ft].mipmaps, Vt = 0, zt = Ut.length; zt > Vt; Vt++) Ot = Ut[Vt], Ct.format !== THREE.RGBAFormat && Ct.format !== THREE.RGBFormat ? -1 < De().indexOf(Nt) ? me.compressedTexImage2D(me.TEXTURE_CUBE_MAP_POSITIVE_X + Ft, Vt, Nt, Ot.width, Ot.height, 0, Ot.data) : THREE.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setCubeTexture()") : me.texImage2D(me.TEXTURE_CUBE_MAP_POSITIVE_X + Ft, Vt, Nt, Ot.width, Ot.height, 0, Nt, It, Ot.data);
                                                 else Pt ? me.texImage2D(me.TEXTURE_CUBE_MAP_POSITIVE_X + Ft, 0, Nt, Dt[Ft].width, Dt[Ft].height, 0, Nt, It, Dt[Ft].data) : me.texImage2D(me.TEXTURE_CUBE_MAP_POSITIVE_X + Ft, 0, Nt, Nt, It, Dt[Ft]);
                                             Ct.generateMipmaps && Bt && me.generateMipmap(me.TEXTURE_CUBE_MAP), Ct.needsUpdate = !1, Ct.onUpdate && Ct.onUpdate()
                                         } else me.activeTexture(me.TEXTURE0 + At), me.bindTexture(me.TEXTURE_CUBE_MAP, Ct.image.__webglTextureCube)
                                 } else if (vt instanceof THREE.WebGLRenderTargetCube) {
                                     var Gt = vt;
                                     me.activeTexture(me.TEXTURE0 + yt), me.bindTexture(me.TEXTURE_CUBE_MAP, Gt.__webglTexture)
                                 } else Y.setTexture(vt, yt);
                                 break;
                             case "tv":
                                 for (void 0 === Ht._array && (Ht._array = []), Mt = 0, St = Ht.value.length; St > Mt; Mt++) Ht._array[Mt] = y();
                                 for (me.uniform1iv(wt, Ht._array), Mt = 0, St = Ht.value.length; St > Mt; Mt++) vt = Ht.value[Mt], yt = Ht._array[Mt], vt && Y.setTexture(vt, yt);
                                 break;
                             default:
                                 THREE.warn("THREE.WebGLRenderer: Unknown uniform type: " + _t)
                         }
                     }
                 }
             }
             return me.uniformMatrix4fv(oe.modelViewMatrix, !1, n._modelViewMatrix.elements), oe.normalMatrix && me.uniformMatrix3fv(oe.normalMatrix, !1, n._normalMatrix.elements), null !== oe.modelMatrix && me.uniformMatrix4fv(oe.modelMatrix, !1, n.matrixWorld.elements), ae
         }

         function v(e, t) {
             e.ambientLightColor.needsUpdate = t, e.directionalLightColor.needsUpdate = t, e.directionalLightDirection.needsUpdate = t, e.pointLightColor.needsUpdate = t, e.pointLightPosition.needsUpdate = t, e.pointLightDistance.needsUpdate = t, e.pointLightDecay.needsUpdate = t, e.spotLightColor.needsUpdate = t, e.spotLightPosition.needsUpdate = t, e.spotLightDistance.needsUpdate = t, e.spotLightDirection.needsUpdate = t, e.spotLightAngleCos.needsUpdate = t, e.spotLightExponent.needsUpdate = t, e.spotLightDecay.needsUpdate = t, e.hemisphereLightSkyColor.needsUpdate = t, e.hemisphereLightGroundColor.needsUpdate = t, e.hemisphereLightDirection.needsUpdate = t
         }

         function y() {
             var e = re;
             return e >= He && THREE.warn("WebGLRenderer: trying to use " + e + " texture units while this GPU supports only " + He), re += 1, e
         }

         function T(e, t) {
             e._modelViewMatrix.multiplyMatrices(t.matrixWorldInverse, e.matrixWorld), e._normalMatrix.getNormalMatrix(e._modelViewMatrix)
         }

         function R(e, t, r, i) {
             e[t] = r.r * i, e[t + 1] = r.g * i, e[t + 2] = r.b * i
         }

         function x(e, t, r) {
             r ? (me.texParameteri(e, me.TEXTURE_WRAP_S, M(t.wrapS)), me.texParameteri(e, me.TEXTURE_WRAP_T, M(t.wrapT)), me.texParameteri(e, me.TEXTURE_MAG_FILTER, M(t.magFilter)), me.texParameteri(e, me.TEXTURE_MIN_FILTER, M(t.minFilter))) : (me.texParameteri(e, me.TEXTURE_WRAP_S, me.CLAMP_TO_EDGE), me.texParameteri(e, me.TEXTURE_WRAP_T, me.CLAMP_TO_EDGE), t.wrapS === THREE.ClampToEdgeWrapping && t.wrapT === THREE.ClampToEdgeWrapping || THREE.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping. ( " + t.sourceFile + " )"), me.texParameteri(e, me.TEXTURE_MAG_FILTER, w(t.magFilter)), me.texParameteri(e, me.TEXTURE_MIN_FILTER, w(t.minFilter)), t.minFilter !== THREE.NearestFilter && t.minFilter !== THREE.LinearFilter && THREE.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter. ( " + t.sourceFile + " )")), (r = ye.get("EXT_texture_filter_anisotropic")) && t.type !== THREE.FloatType && t.type !== THREE.HalfFloatType && (1 < t.anisotropy || t.__currentAnisotropy) && (me.texParameterf(e, r.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(t.anisotropy, Y.getMaxAnisotropy())), t.__currentAnisotropy = t.anisotropy)
         }

         function H(e, t) {
             if (e.width > t || e.height > t) {
                 var r = t / Math.max(e.width, e.height),
                     i = document.createElement("canvas");
                 return i.width = Math.floor(e.width * r), i.height = Math.floor(e.height * r), i.getContext("2d").drawImage(e, 0, 0, e.width, e.height, 0, 0, i.width, i.height), THREE.warn("THREE.WebGLRenderer: image is too big (" + e.width + "x" + e.height + "). Resized to " + i.width + "x" + i.height, e), i
             }
             return e
         }

         function _(e, t) {
             me.bindRenderbuffer(me.RENDERBUFFER, e), t.depthBuffer && !t.stencilBuffer ? (me.renderbufferStorage(me.RENDERBUFFER, me.DEPTH_COMPONENT16, t.width, t.height), me.framebufferRenderbuffer(me.FRAMEBUFFER, me.DEPTH_ATTACHMENT, me.RENDERBUFFER, e)) : t.depthBuffer && t.stencilBuffer ? (me.renderbufferStorage(me.RENDERBUFFER, me.DEPTH_STENCIL, t.width, t.height), me.framebufferRenderbuffer(me.FRAMEBUFFER, me.DEPTH_STENCIL_ATTACHMENT, me.RENDERBUFFER, e)) : me.renderbufferStorage(me.RENDERBUFFER, me.RGBA4, t.width, t.height)
         }

         function b(e) {
             e instanceof THREE.WebGLRenderTargetCube ? (me.bindTexture(me.TEXTURE_CUBE_MAP, e.__webglTexture), me.generateMipmap(me.TEXTURE_CUBE_MAP), me.bindTexture(me.TEXTURE_CUBE_MAP, null)) : (me.bindTexture(me.TEXTURE_2D, e.__webglTexture), me.generateMipmap(me.TEXTURE_2D), me.bindTexture(me.TEXTURE_2D, null))
         }

         function w(e) {
             return e === THREE.NearestFilter || e === THREE.NearestMipMapNearestFilter || e === THREE.NearestMipMapLinearFilter ? me.NEAREST : me.LINEAR
         }

         function M(e) {
             var t;
             if (e === THREE.RepeatWrapping) return me.REPEAT;
             if (e === THREE.ClampToEdgeWrapping) return me.CLAMP_TO_EDGE;
             if (e === THREE.MirroredRepeatWrapping) return me.MIRRORED_REPEAT;
             if (e === THREE.NearestFilter) return me.NEAREST;
             if (e === THREE.NearestMipMapNearestFilter) return me.NEAREST_MIPMAP_NEAREST;
             if (e === THREE.NearestMipMapLinearFilter) return me.NEAREST_MIPMAP_LINEAR;
             if (e === THREE.LinearFilter) return me.LINEAR;
             if (e === THREE.LinearMipMapNearestFilter) return me.LINEAR_MIPMAP_NEAREST;
             if (e === THREE.LinearMipMapLinearFilter) return me.LINEAR_MIPMAP_LINEAR;
             if (e === THREE.UnsignedByteType) return me.UNSIGNED_BYTE;
             if (e === THREE.UnsignedShort4444Type) return me.UNSIGNED_SHORT_4_4_4_4;
             if (e === THREE.UnsignedShort5551Type) return me.UNSIGNED_SHORT_5_5_5_1;
             if (e === THREE.UnsignedShort565Type) return me.UNSIGNED_SHORT_5_6_5;
             if (e === THREE.ByteType) return me.BYTE;
             if (e === THREE.ShortType) return me.SHORT;
             if (e === THREE.UnsignedShortType) return me.UNSIGNED_SHORT;
             if (e === THREE.IntType) return me.INT;
             if (e === THREE.UnsignedIntType) return me.UNSIGNED_INT;
             if (e === THREE.FloatType) return me.FLOAT;
             if (t = ye.get("OES_texture_half_float"), null !== t && e === THREE.HalfFloatType) return t.HALF_FLOAT_OES;
             if (e === THREE.AlphaFormat) return me.ALPHA;
             if (e === THREE.RGBFormat) return me.RGB;
             if (e === THREE.RGBAFormat) return me.RGBA;
             if (e === THREE.LuminanceFormat) return me.LUMINANCE;
             if (e === THREE.LuminanceAlphaFormat) return me.LUMINANCE_ALPHA;
             if (e === THREE.AddEquation) return me.FUNC_ADD;
             if (e === THREE.SubtractEquation) return me.FUNC_SUBTRACT;
             if (e === THREE.ReverseSubtractEquation) return me.FUNC_REVERSE_SUBTRACT;
             if (e === THREE.ZeroFactor) return me.ZERO;
             if (e === THREE.OneFactor) return me.ONE;
             if (e === THREE.SrcColorFactor) return me.SRC_COLOR;
             if (e === THREE.OneMinusSrcColorFactor) return me.ONE_MINUS_SRC_COLOR;
             if (e === THREE.SrcAlphaFactor) return me.SRC_ALPHA;
             if (e === THREE.OneMinusSrcAlphaFactor) return me.ONE_MINUS_SRC_ALPHA;
             if (e === THREE.DstAlphaFactor) return me.DST_ALPHA;
             if (e === THREE.OneMinusDstAlphaFactor) return me.ONE_MINUS_DST_ALPHA;
             if (e === THREE.DstColorFactor) return me.DST_COLOR;
             if (e === THREE.OneMinusDstColorFactor) return me.ONE_MINUS_DST_COLOR;
             if (e === THREE.SrcAlphaSaturateFactor) return me.SRC_ALPHA_SATURATE;
             if (t = ye.get("WEBGL_compressed_texture_s3tc"), null !== t) {
                 if (e === THREE.RGB_S3TC_DXT1_Format) return t.COMPRESSED_RGB_S3TC_DXT1_EXT;
                 if (e === THREE.RGBA_S3TC_DXT1_Format) return t.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                 if (e === THREE.RGBA_S3TC_DXT3_Format) return t.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                 if (e === THREE.RGBA_S3TC_DXT5_Format) return t.COMPRESSED_RGBA_S3TC_DXT5_EXT
             }
             if (t = ye.get("WEBGL_compressed_texture_pvrtc"), null !== t) {
                 if (e === THREE.RGB_PVRTC_4BPPV1_Format) return t.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                 if (e === THREE.RGB_PVRTC_2BPPV1_Format) return t.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                 if (e === THREE.RGBA_PVRTC_4BPPV1_Format) return t.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                 if (e === THREE.RGBA_PVRTC_2BPPV1_Format) return t.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
             }
             if (t = ye.get("EXT_blend_minmax"), null !== t) {
                 if (e === THREE.MinEquation) return t.MIN_EXT;
                 if (e === THREE.MaxEquation) return t.MAX_EXT
             }
             return 0
         }
         console.log("THREE.WebGLRenderer", THREE.REVISION), e = e || {};
         var S = void 0 !== e.canvas ? e.canvas : document.createElement("canvas"),
             C = void 0 !== e.context ? e.context : null,
             A = 1,
             L = void 0 !== e.precision ? e.precision : "highp",
             P = void 0 !== e.alpha ? e.alpha : !1,
             D = void 0 !== e.depth ? e.depth : !0,
             F = void 0 !== e.stencil ? e.stencil : !0,
             k = void 0 !== e.antialias ? e.antialias : !1,
             B = void 0 !== e.premultipliedAlpha ? e.premultipliedAlpha : !0,
             N = void 0 !== e.preserveDrawingBuffer ? e.preserveDrawingBuffer : !1,
             I = void 0 !== e.logarithmicDepthBuffer ? e.logarithmicDepthBuffer : !1,
             O = new THREE.Color(0),
             U = 0,
             V = [],
             z = {},
             G = [],
             W = [],
             j = [],
             X = [],
             q = [];
         this.domElement = S, this.context = null, this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0, this.gammaFactor = 2, this.shadowMapEnabled = this.gammaOutput = this.gammaInput = !1, this.shadowMapType = THREE.PCFShadowMap, this.shadowMapCullFace = THREE.CullFaceFront, this.shadowMapCascade = this.shadowMapDebug = !1, this.maxMorphTargets = 8, this.maxMorphNormals = 4, this.autoScaleCubemaps = !0, this.info = {
             memory: {
                 programs: 0,
                 geometries: 0,
                 textures: 0
             },
             render: {
                 calls: 0,
                 vertices: 0,
                 faces: 0,
                 points: 0
             }
         };
         var Y = this,
             J = [],
             K = null,
             Q = null,
             Z = -1,
             ee = "",
             te = null,
             re = 0,
             ie = 0,
             ne = 0,
             ae = S.width,
             oe = S.height,
             se = 0,
             he = 0,
             le = new THREE.Frustum,
             ue = new THREE.Matrix4,
             ce = new THREE.Vector3,
             de = new THREE.Vector3,
             fe = !0,
             pe = {
                 ambient: [0, 0, 0],
                 directional: {
                     length: 0,
                     colors: [],
                     positions: []
                 },
                 point: {
                     length: 0,
                     colors: [],
                     positions: [],
                     distances: [],
                     decays: []
                 },
                 spot: {
                     length: 0,
                     colors: [],
                     positions: [],
                     distances: [],
                     directions: [],
                     anglesCos: [],
                     exponents: [],
                     decays: []
                 },
                 hemi: {
                     length: 0,
                     skyColors: [],
                     groundColors: [],
                     positions: []
                 }
             },
             me;
         try {
             var Ee = {
                 alpha: P,
                 depth: D,
                 stencil: F,
                 antialias: k,
                 premultipliedAlpha: B,
                 preserveDrawingBuffer: N
             };
             if (me = C || S.getContext("webgl", Ee) || S.getContext("experimental-webgl", Ee), null === me) {
                 if (null !== S.getContext("webgl")) throw "Error creating WebGL context with your selected attributes.";
                 throw "Error creating WebGL context."
             }
             S.addEventListener("webglcontextlost", function(e) {
                 e.preventDefault(), xe(), Re(), z = {}
             }, !1)
         } catch (ge) {
             THREE.error("THREE.WebGLRenderer: " + ge)
         }
         var ve = new THREE.WebGLState(me, M);
         void 0 === me.getShaderPrecisionFormat && (me.getShaderPrecisionFormat = function() {
             return {
                 rangeMin: 1,
                 rangeMax: 1,
                 precision: 1
             }
         });
         var ye = new THREE.WebGLExtensions(me);
         ye.get("OES_texture_float"), ye.get("OES_texture_float_linear"), ye.get("OES_texture_half_float"), ye.get("OES_texture_half_float_linear"), ye.get("OES_standard_derivatives"), I && ye.get("EXT_frag_depth");
         var Te = function(e, t, r, i) {
                 !0 === B && (e *= i, t *= i, r *= i), me.clearColor(e, t, r, i)
             },
             Re = function() {
                 me.clearColor(0, 0, 0, 1), me.clearDepth(1), me.clearStencil(0), me.enable(me.DEPTH_TEST), me.depthFunc(me.LEQUAL), me.frontFace(me.CCW), me.cullFace(me.BACK), me.enable(me.CULL_FACE), me.enable(me.BLEND), me.blendEquation(me.FUNC_ADD), me.blendFunc(me.SRC_ALPHA, me.ONE_MINUS_SRC_ALPHA), me.viewport(ie, ne, ae, oe), Te(O.r, O.g, O.b, U)
             },
             xe = function() {
                 te = K = null, ee = "", Z = -1, fe = !0, ve.reset()
             };
         Re(), this.context = me, this.state = ve;
         var He = me.getParameter(me.MAX_TEXTURE_IMAGE_UNITS),
             _e = me.getParameter(me.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
             be = me.getParameter(me.MAX_TEXTURE_SIZE),
             we = me.getParameter(me.MAX_CUBE_MAP_TEXTURE_SIZE),
             Me = _e > 0,
             Se = Me && ye.get("OES_texture_float"),
             Ce = me.getShaderPrecisionFormat(me.VERTEX_SHADER, me.HIGH_FLOAT),
             Ae = me.getShaderPrecisionFormat(me.VERTEX_SHADER, me.MEDIUM_FLOAT),
             Le = me.getShaderPrecisionFormat(me.FRAGMENT_SHADER, me.HIGH_FLOAT),
             Pe = me.getShaderPrecisionFormat(me.FRAGMENT_SHADER, me.MEDIUM_FLOAT),
             De = function() {
                 var e;
                 return function() {
                     if (void 0 !== e) return e;
                     if (e = [], ye.get("WEBGL_compressed_texture_pvrtc") || ye.get("WEBGL_compressed_texture_s3tc"))
                         for (var t = me.getParameter(me.COMPRESSED_TEXTURE_FORMATS), r = 0; r < t.length; r++) e.push(t[r]);
                     return e
                 }
             }(),
             Fe = 0 < Ce.precision && 0 < Le.precision,
             ke = 0 < Ae.precision && 0 < Pe.precision;
         "highp" !== L || Fe || (ke ? (L = "mediump", THREE.warn("THREE.WebGLRenderer: highp not supported, using mediump.")) : (L = "lowp", THREE.warn("THREE.WebGLRenderer: highp and mediump not supported, using lowp."))), "mediump" !== L || ke || (L = "lowp", THREE.warn("THREE.WebGLRenderer: mediump not supported, using lowp."));
         var Be = new THREE.ShadowMapPlugin(this, V, z, G),
             Ne = new THREE.SpritePlugin(this, X),
             Ie = new THREE.LensFlarePlugin(this, q);
         this.getContext = function() {
             return me
         }, this.forceContextLoss = function() {
             ye.get("WEBGL_lose_context").loseContext()
         }, this.supportsVertexTextures = function() {
             return Me
         }, this.supportsFloatTextures = function() {
             return ye.get("OES_texture_float")
         }, this.supportsHalfFloatTextures = function() {
             return ye.get("OES_texture_half_float")
         }, this.supportsStandardDerivatives = function() {
             return ye.get("OES_standard_derivatives")
         }, this.supportsCompressedTextureS3TC = function() {
             return ye.get("WEBGL_compressed_texture_s3tc")
         }, this.supportsCompressedTexturePVRTC = function() {
             return ye.get("WEBGL_compressed_texture_pvrtc")
         }, this.supportsBlendMinMax = function() {
             return ye.get("EXT_blend_minmax")
         }, this.getMaxAnisotropy = function() {
             var e;
             return function() {
                 if (void 0 !== e) return e;
                 var t = ye.get("EXT_texture_filter_anisotropic");
                 return e = null !== t ? me.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
             }
         }(), this.getPrecision = function() {
             return L
         }, this.getPixelRatio = function() {
             return A
         }, this.setPixelRatio = function(e) {
             A = e
         }, this.setSize = function(e, t, r) {
             S.width = e * A, S.height = t * A, !1 !== r && (S.style.width = e + "px", S.style.height = t + "px"), this.setViewport(0, 0, e, t)
         }, this.setViewport = function(e, t, r, i) {
             ie = e * A, ne = t * A, ae = r * A, oe = i * A, me.viewport(ie, ne, ae, oe)
         }, this.setScissor = function(e, t, r, i) {
             me.scissor(e * A, t * A, r * A, i * A)
         }, this.enableScissorTest = function(e) {
             e ? me.enable(me.SCISSOR_TEST) : me.disable(me.SCISSOR_TEST)
         }, this.getClearColor = function() {
             return O
         }, this.setClearColor = function(e, t) {
             O.set(e), U = void 0 !== t ? t : 1, Te(O.r, O.g, O.b, U)
         }, this.getClearAlpha = function() {
             return U
         }, this.setClearAlpha = function(e) {
             U = e, Te(O.r, O.g, O.b, U)
         }, this.clear = function(e, t, r) {
             var i = 0;
             (void 0 === e || e) && (i |= me.COLOR_BUFFER_BIT), (void 0 === t || t) && (i |= me.DEPTH_BUFFER_BIT), (void 0 === r || r) && (i |= me.STENCIL_BUFFER_BIT), me.clear(i)
         }, this.clearColor = function() {
             me.clear(me.COLOR_BUFFER_BIT)
         }, this.clearDepth = function() {
             me.clear(me.DEPTH_BUFFER_BIT)
         }, this.clearStencil = function() {
             me.clear(me.STENCIL_BUFFER_BIT)
         }, this.clearTarget = function(e, t, r, i) {
             this.setRenderTarget(e), this.clear(t, r, i)
         }, this.resetGLState = xe;
         var Oe = function(e) {
                 e.target.traverse(function(e) {
                     if (e.removeEventListener("remove", Oe), e instanceof THREE.Mesh || e instanceof THREE.PointCloud || e instanceof THREE.Line) delete z[e.id];
                     else if (e instanceof THREE.ImmediateRenderObject || e.immediateRenderCallback)
                         for (var t = G, r = t.length - 1; r >= 0; r--) t[r].object === e && t.splice(r, 1);
                     delete e.__webglInit, delete e._modelViewMatrix, delete e._normalMatrix, delete e.__webglActive
                 })
             },
             Ue = function(e) {
                 if (e = e.target, e.removeEventListener("dispose", Ue), delete e.__webglInit, e instanceof THREE.BufferGeometry) {
                     for (var t in e.attributes) {
                         var r = e.attributes[t];
                         void 0 !== r.buffer && (me.deleteBuffer(r.buffer), delete r.buffer)
                     }
                     Y.info.memory.geometries--
                 } else if (t = Xe[e.id], void 0 !== t) {
                     for (var r = 0, i = t.length; i > r; r++) {
                         var n = t[r];
                         if (void 0 !== n.numMorphTargets) {
                             for (var a = 0, o = n.numMorphTargets; o > a; a++) me.deleteBuffer(n.__webglMorphTargetsBuffers[a]);
                             delete n.__webglMorphTargetsBuffers
                         }
                         if (void 0 !== n.numMorphNormals) {
                             for (a = 0, o = n.numMorphNormals; o > a; a++) me.deleteBuffer(n.__webglMorphNormalsBuffers[a]);
                             delete n.__webglMorphNormalsBuffers
                         }
                         We(n)
                     }
                     delete Xe[e.id]
                 } else We(e);
                 ee = ""
             },
             Ve = function(e) {
                 e = e.target, e.removeEventListener("dispose", Ve), e.image && e.image.__webglTextureCube ? (me.deleteTexture(e.image.__webglTextureCube), delete e.image.__webglTextureCube) : void 0 !== e.__webglInit && (me.deleteTexture(e.__webglTexture), delete e.__webglTexture, delete e.__webglInit), Y.info.memory.textures--
             },
             ze = function(e) {
                 if (e = e.target, e.removeEventListener("dispose", ze), e && void 0 !== e.__webglTexture) {
                     if (me.deleteTexture(e.__webglTexture), delete e.__webglTexture, e instanceof THREE.WebGLRenderTargetCube)
                         for (var t = 0; 6 > t; t++) me.deleteFramebuffer(e.__webglFramebuffer[t]), me.deleteRenderbuffer(e.__webglRenderbuffer[t]);
                     else me.deleteFramebuffer(e.__webglFramebuffer), me.deleteRenderbuffer(e.__webglRenderbuffer);
                     delete e.__webglFramebuffer, delete e.__webglRenderbuffer
                 }
                 Y.info.memory.textures--
             },
             Ge = function(e) {
                 e = e.target, e.removeEventListener("dispose", Ge), je(e)
             },
             We = function(e) {
                 for (var t = "__webglVertexBuffer __webglNormalBuffer __webglTangentBuffer __webglColorBuffer __webglUVBuffer __webglUV2Buffer __webglSkinIndicesBuffer __webglSkinWeightsBuffer __webglFaceBuffer __webglLineBuffer __webglLineDistanceBuffer".split(" "), r = 0, i = t.length; i > r; r++) {
                     var n = t[r];
                     void 0 !== e[n] && (me.deleteBuffer(e[n]), delete e[n])
                 }
                 if (void 0 !== e.__webglCustomAttributesList) {
                     for (n in e.__webglCustomAttributesList) me.deleteBuffer(e.__webglCustomAttributesList[n].buffer);
                     delete e.__webglCustomAttributesList
                 }
                 Y.info.memory.geometries--
             },
             je = function(e) {
                 var t = e.program.program;
                 if (void 0 !== t) {
                     e.program = void 0;
                     var r, i, n = !1;
                     for (e = 0, r = J.length; r > e; e++)
                         if (i = J[e], i.program === t) {
                             i.usedTimes--, 0 === i.usedTimes && (n = !0);
                             break
                         }
                     if (!0 === n) {
                         for (n = [], e = 0, r = J.length; r > e; e++) i = J[e], i.program !== t && n.push(i);
                         J = n, me.deleteProgram(t), Y.info.memory.programs--
                     }
                 }
             };
         this.renderBufferImmediate = function(e, t, r) {
             if (ve.initAttributes(), e.hasPositions && !e.__webglVertexBuffer && (e.__webglVertexBuffer = me.createBuffer()), e.hasNormals && !e.__webglNormalBuffer && (e.__webglNormalBuffer = me.createBuffer()), e.hasUvs && !e.__webglUvBuffer && (e.__webglUvBuffer = me.createBuffer()), e.hasColors && !e.__webglColorBuffer && (e.__webglColorBuffer = me.createBuffer()), e.hasPositions && (me.bindBuffer(me.ARRAY_BUFFER, e.__webglVertexBuffer), me.bufferData(me.ARRAY_BUFFER, e.positionArray, me.DYNAMIC_DRAW), ve.enableAttribute(t.attributes.position), me.vertexAttribPointer(t.attributes.position, 3, me.FLOAT, !1, 0, 0)), e.hasNormals) {
                 if (me.bindBuffer(me.ARRAY_BUFFER, e.__webglNormalBuffer), !1 == r instanceof THREE.MeshPhongMaterial && r.shading === THREE.FlatShading) {
                     var i, n, a, o, s, h, l, u, c, d, f, p = 3 * e.count;
                     for (f = 0; p > f; f += 9) d = e.normalArray, i = d[f], n = d[f + 1], a = d[f + 2], o = d[f + 3], h = d[f + 4], u = d[f + 5], s = d[f + 6], l = d[f + 7], c = d[f + 8], i = (i + o + s) / 3, n = (n + h + l) / 3, a = (a + u + c) / 3, d[f] = i, d[f + 1] = n, d[f + 2] = a, d[f + 3] = i, d[f + 4] = n, d[f + 5] = a, d[f + 6] = i, d[f + 7] = n, d[f + 8] = a
                 }
                 me.bufferData(me.ARRAY_BUFFER, e.normalArray, me.DYNAMIC_DRAW), ve.enableAttribute(t.attributes.normal), me.vertexAttribPointer(t.attributes.normal, 3, me.FLOAT, !1, 0, 0)
             }
             e.hasUvs && r.map && (me.bindBuffer(me.ARRAY_BUFFER, e.__webglUvBuffer), me.bufferData(me.ARRAY_BUFFER, e.uvArray, me.DYNAMIC_DRAW), ve.enableAttribute(t.attributes.uv), me.vertexAttribPointer(t.attributes.uv, 2, me.FLOAT, !1, 0, 0)), e.hasColors && r.vertexColors !== THREE.NoColors && (me.bindBuffer(me.ARRAY_BUFFER, e.__webglColorBuffer), me.bufferData(me.ARRAY_BUFFER, e.colorArray, me.DYNAMIC_DRAW), ve.enableAttribute(t.attributes.color), me.vertexAttribPointer(t.attributes.color, 3, me.FLOAT, !1, 0, 0)), ve.disableUnusedAttributes(), me.drawArrays(me.TRIANGLES, 0, e.count), e.count = 0
         }, this.renderBufferDirect = function(e, t, r, n, a, o) {
             if (!1 !== n.visible)
                 if (f(o), e = g(e, t, r, n, o), t = !1, r = "direct_" + a.id + "_" + e.id + "_" + (n.wireframe ? 1 : 0), r !== ee && (ee = r, t = !0), t && ve.initAttributes(), o instanceof THREE.Mesh) {
                     o = !0 === n.wireframe ? me.LINES : me.TRIANGLES;
                     var s = a.attributes.index;
                     if (s) {
                         var h, l;
                         if (s.array instanceof Uint32Array && ye.get("OES_element_index_uint") ? (h = me.UNSIGNED_INT, l = 4) : (h = me.UNSIGNED_SHORT, l = 2), r = a.offsets, 0 === r.length) t && (i(n, e, a, 0), me.bindBuffer(me.ELEMENT_ARRAY_BUFFER, s.buffer)), me.drawElements(o, s.array.length, h, 0), Y.info.render.calls++, Y.info.render.vertices += s.array.length, Y.info.render.faces += s.array.length / 3;
                         else {
                             t = !0;
                             for (var u = 0, c = r.length; c > u; u++) {
                                 var d = r[u].index;
                                 t && (i(n, e, a, d), me.bindBuffer(me.ELEMENT_ARRAY_BUFFER, s.buffer)), me.drawElements(o, r[u].count, h, r[u].start * l), Y.info.render.calls++, Y.info.render.vertices += r[u].count, Y.info.render.faces += r[u].count / 3
                             }
                         }
                     } else t && i(n, e, a, 0), n = a.attributes.position, me.drawArrays(o, 0, n.array.length / n.itemSize), Y.info.render.calls++, Y.info.render.vertices += n.array.length / n.itemSize, Y.info.render.faces += n.array.length / (3 * n.itemSize)
                 } else if (o instanceof THREE.PointCloud)
                 if (o = me.POINTS, s = a.attributes.index)
                     if (s.array instanceof Uint32Array && ye.get("OES_element_index_uint") ? (h = me.UNSIGNED_INT, l = 4) : (h = me.UNSIGNED_SHORT, l = 2), r = a.offsets, 0 === r.length) t && (i(n, e, a, 0), me.bindBuffer(me.ELEMENT_ARRAY_BUFFER, s.buffer)), me.drawElements(o, s.array.length, h, 0), Y.info.render.calls++, Y.info.render.points += s.array.length;
                     else
                         for (1 < r.length && (t = !0), u = 0, c = r.length; c > u; u++) d = r[u].index, t && (i(n, e, a, d), me.bindBuffer(me.ELEMENT_ARRAY_BUFFER, s.buffer)), me.drawElements(o, r[u].count, h, r[u].start * l), Y.info.render.calls++, Y.info.render.points += r[u].count;
             else if (t && i(n, e, a, 0), n = a.attributes.position, r = a.offsets, 0 === r.length) me.drawArrays(o, 0, n.array.length / 3), Y.info.render.calls++, Y.info.render.points += n.array.length / 3;
             else
                 for (u = 0, c = r.length; c > u; u++) me.drawArrays(o, r[u].index, r[u].count), Y.info.render.calls++, Y.info.render.points += r[u].count;
             else if (o instanceof THREE.Line)
                 if (o = o.mode === THREE.LineStrip ? me.LINE_STRIP : me.LINES, ve.setLineWidth(n.linewidth * A), s = a.attributes.index)
                     if (s.array instanceof Uint32Array ? (h = me.UNSIGNED_INT, l = 4) : (h = me.UNSIGNED_SHORT, l = 2), r = a.offsets, 0 === r.length) t && (i(n, e, a, 0), me.bindBuffer(me.ELEMENT_ARRAY_BUFFER, s.buffer)), me.drawElements(o, s.array.length, h, 0), Y.info.render.calls++, Y.info.render.vertices += s.array.length;
                     else
                         for (1 < r.length && (t = !0), u = 0, c = r.length; c > u; u++) d = r[u].index, t && (i(n, e, a, d), me.bindBuffer(me.ELEMENT_ARRAY_BUFFER, s.buffer)), me.drawElements(o, r[u].count, h, r[u].start * l), Y.info.render.calls++, Y.info.render.vertices += r[u].count;
             else if (t && i(n, e, a, 0), n = a.attributes.position, r = a.offsets, 0 === r.length) me.drawArrays(o, 0, n.array.length / 3),
                 Y.info.render.calls++, Y.info.render.vertices += n.array.length / 3;
             else
                 for (u = 0, c = r.length; c > u; u++) me.drawArrays(o, r[u].index, r[u].count), Y.info.render.calls++, Y.info.render.vertices += r[u].count
         }, this.renderBuffer = function(e, t, r, i, n, a) {
             if (!1 !== i.visible) {
                 if (f(a), r = g(e, t, r, i, a), t = r.attributes, e = !1, r = n.id + "_" + r.id + "_" + (i.wireframe ? 1 : 0), r !== ee && (ee = r, e = !0), e && ve.initAttributes(), !i.morphTargets && 0 <= t.position) e && (me.bindBuffer(me.ARRAY_BUFFER, n.__webglVertexBuffer), ve.enableAttribute(t.position), me.vertexAttribPointer(t.position, 3, me.FLOAT, !1, 0, 0));
                 else if (a.morphTargetBase) {
                     if (r = i.program.attributes, -1 !== a.morphTargetBase && 0 <= r.position ? (me.bindBuffer(me.ARRAY_BUFFER, n.__webglMorphTargetsBuffers[a.morphTargetBase]), ve.enableAttribute(r.position), me.vertexAttribPointer(r.position, 3, me.FLOAT, !1, 0, 0)) : 0 <= r.position && (me.bindBuffer(me.ARRAY_BUFFER, n.__webglVertexBuffer), ve.enableAttribute(r.position), me.vertexAttribPointer(r.position, 3, me.FLOAT, !1, 0, 0)), a.morphTargetForcedOrder.length)
                         for (var s = 0, h = a.morphTargetForcedOrder, l = a.morphTargetInfluences, u; s < i.numSupportedMorphTargets && s < h.length;) u = r["morphTarget" + s], u >= 0 && (me.bindBuffer(me.ARRAY_BUFFER, n.__webglMorphTargetsBuffers[h[s]]), ve.enableAttribute(u), me.vertexAttribPointer(u, 3, me.FLOAT, !1, 0, 0)), u = r["morphNormal" + s], u >= 0 && i.morphNormals && (me.bindBuffer(me.ARRAY_BUFFER, n.__webglMorphNormalsBuffers[h[s]]), ve.enableAttribute(u), me.vertexAttribPointer(u, 3, me.FLOAT, !1, 0, 0)), a.__webglMorphTargetInfluences[s] = l[h[s]], s++;
                     else {
                         for (h = [], l = a.morphTargetInfluences, s = a.geometry.morphTargets, l.length > s.length && (console.warn("THREE.WebGLRenderer: Influences array is bigger than morphTargets array."), l.length = s.length), s = 0, u = l.length; u > s; s++) h.push([l[s], s]);
                         h.length > i.numSupportedMorphTargets ? (h.sort(o), h.length = i.numSupportedMorphTargets) : h.length > i.numSupportedMorphNormals ? h.sort(o) : 0 === h.length && h.push([0, 0]);
                         for (var s = 0, c = i.numSupportedMorphTargets; c > s; s++)
                             if (h[s]) {
                                 var d = h[s][1];
                                 u = r["morphTarget" + s], u >= 0 && (me.bindBuffer(me.ARRAY_BUFFER, n.__webglMorphTargetsBuffers[d]), ve.enableAttribute(u), me.vertexAttribPointer(u, 3, me.FLOAT, !1, 0, 0)), u = r["morphNormal" + s], u >= 0 && i.morphNormals && (me.bindBuffer(me.ARRAY_BUFFER, n.__webglMorphNormalsBuffers[d]), ve.enableAttribute(u), me.vertexAttribPointer(u, 3, me.FLOAT, !1, 0, 0)), a.__webglMorphTargetInfluences[s] = l[d]
                             } else a.__webglMorphTargetInfluences[s] = 0
                     }
                     null !== i.program.uniforms.morphTargetInfluences && me.uniform1fv(i.program.uniforms.morphTargetInfluences, a.__webglMorphTargetInfluences)
                 }
                 if (e) {
                     if (n.__webglCustomAttributesList)
                         for (r = 0, l = n.__webglCustomAttributesList.length; l > r; r++) h = n.__webglCustomAttributesList[r], 0 <= t[h.buffer.belongsToAttribute] && (me.bindBuffer(me.ARRAY_BUFFER, h.buffer), ve.enableAttribute(t[h.buffer.belongsToAttribute]), me.vertexAttribPointer(t[h.buffer.belongsToAttribute], h.size, me.FLOAT, !1, 0, 0));
                     0 <= t.color && (0 < a.geometry.colors.length || 0 < a.geometry.faces.length ? (me.bindBuffer(me.ARRAY_BUFFER, n.__webglColorBuffer), ve.enableAttribute(t.color), me.vertexAttribPointer(t.color, 3, me.FLOAT, !1, 0, 0)) : void 0 !== i.defaultAttributeValues && me.vertexAttrib3fv(t.color, i.defaultAttributeValues.color)), 0 <= t.normal && (me.bindBuffer(me.ARRAY_BUFFER, n.__webglNormalBuffer), ve.enableAttribute(t.normal), me.vertexAttribPointer(t.normal, 3, me.FLOAT, !1, 0, 0)), 0 <= t.tangent && (me.bindBuffer(me.ARRAY_BUFFER, n.__webglTangentBuffer), ve.enableAttribute(t.tangent), me.vertexAttribPointer(t.tangent, 4, me.FLOAT, !1, 0, 0)), 0 <= t.uv && (a.geometry.faceVertexUvs[0] ? (me.bindBuffer(me.ARRAY_BUFFER, n.__webglUVBuffer), ve.enableAttribute(t.uv), me.vertexAttribPointer(t.uv, 2, me.FLOAT, !1, 0, 0)) : void 0 !== i.defaultAttributeValues && me.vertexAttrib2fv(t.uv, i.defaultAttributeValues.uv)), 0 <= t.uv2 && (a.geometry.faceVertexUvs[1] ? (me.bindBuffer(me.ARRAY_BUFFER, n.__webglUV2Buffer), ve.enableAttribute(t.uv2), me.vertexAttribPointer(t.uv2, 2, me.FLOAT, !1, 0, 0)) : void 0 !== i.defaultAttributeValues && me.vertexAttrib2fv(t.uv2, i.defaultAttributeValues.uv2)), i.skinning && 0 <= t.skinIndex && 0 <= t.skinWeight && (me.bindBuffer(me.ARRAY_BUFFER, n.__webglSkinIndicesBuffer), ve.enableAttribute(t.skinIndex), me.vertexAttribPointer(t.skinIndex, 4, me.FLOAT, !1, 0, 0), me.bindBuffer(me.ARRAY_BUFFER, n.__webglSkinWeightsBuffer), ve.enableAttribute(t.skinWeight), me.vertexAttribPointer(t.skinWeight, 4, me.FLOAT, !1, 0, 0)), 0 <= t.lineDistance && (me.bindBuffer(me.ARRAY_BUFFER, n.__webglLineDistanceBuffer), ve.enableAttribute(t.lineDistance), me.vertexAttribPointer(t.lineDistance, 1, me.FLOAT, !1, 0, 0))
                 }
                 ve.disableUnusedAttributes(), a instanceof THREE.Mesh ? (a = n.__typeArray === Uint32Array ? me.UNSIGNED_INT : me.UNSIGNED_SHORT, i.wireframe ? (ve.setLineWidth(i.wireframeLinewidth * A), e && me.bindBuffer(me.ELEMENT_ARRAY_BUFFER, n.__webglLineBuffer), me.drawElements(me.LINES, n.__webglLineCount, a, 0)) : (e && me.bindBuffer(me.ELEMENT_ARRAY_BUFFER, n.__webglFaceBuffer), me.drawElements(me.TRIANGLES, n.__webglFaceCount, a, 0)), Y.info.render.calls++, Y.info.render.vertices += n.__webglFaceCount, Y.info.render.faces += n.__webglFaceCount / 3) : a instanceof THREE.Line ? (a = a.mode === THREE.LineStrip ? me.LINE_STRIP : me.LINES, ve.setLineWidth(i.linewidth * A), me.drawArrays(a, 0, n.__webglLineCount), Y.info.render.calls++) : a instanceof THREE.PointCloud && (me.drawArrays(me.POINTS, 0, n.__webglParticleCount), Y.info.render.calls++, Y.info.render.points += n.__webglParticleCount)
             }
         }, this.render = function(e, t, r, i) {
             if (!1 == t instanceof THREE.Camera) THREE.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
             else {
                 var o = e.fog;
                 ee = "", Z = -1, te = null, fe = !0, !0 === e.autoUpdate && e.updateMatrixWorld(), void 0 === t.parent && t.updateMatrixWorld(), e.traverse(function(e) {
                     e instanceof THREE.SkinnedMesh && e.skeleton.update()
                 }), t.matrixWorldInverse.getInverse(t.matrixWorld), ue.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), le.setFromMatrix(ue), V.length = 0, W.length = 0, j.length = 0, X.length = 0, q.length = 0, s(e), !0 === Y.sortObjects && (W.sort(n), j.sort(a)), Be.render(e, t), Y.info.render.calls = 0, Y.info.render.vertices = 0, Y.info.render.faces = 0, Y.info.render.points = 0, this.setRenderTarget(r), (this.autoClear || i) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil), i = 0;
                 for (var c = G.length; c > i; i++) {
                     var d = G[i],
                         f = d.object;
                     f.visible && (T(f, t), u(d))
                 }
                 e.overrideMaterial ? (i = e.overrideMaterial, E(i), h(W, t, V, o, i), h(j, t, V, o, i), l(G, "", t, V, o, i)) : (ve.setBlending(THREE.NoBlending), h(W, t, V, o, null), l(G, "opaque", t, V, o, null), h(j, t, V, o, null), l(G, "transparent", t, V, o, null)), Ne.render(e, t), Ie.render(e, t, se, he), r && r.generateMipmaps && r.minFilter !== THREE.NearestFilter && r.minFilter !== THREE.LinearFilter && b(r), ve.setDepthTest(!0), ve.setDepthWrite(!0), ve.setColorWrite(!0)
             }
         }, this.renderImmediateObject = function(e, t, r, i, n) {
             var a = g(e, t, r, i, n);
             ee = "", Y.setMaterialFaces(i), n.immediateRenderCallback ? n.immediateRenderCallback(a, me, le) : n.render(function(e) {
                 Y.renderBufferImmediate(e, a, i)
             })
         };
         var Xe = {},
             qe = 0,
             Ye = {
                 MeshDepthMaterial: "depth",
                 MeshNormalMaterial: "normal",
                 MeshBasicMaterial: "basic",
                 MeshLambertMaterial: "lambert",
                 MeshPhongMaterial: "phong",
                 LineBasicMaterial: "basic",
                 LineDashedMaterial: "dashed",
                 PointCloudMaterial: "particle_basic"
             };
         this.setFaceCulling = function(e, t) {
             e === THREE.CullFaceNone ? me.disable(me.CULL_FACE) : (t === THREE.FrontFaceDirectionCW ? me.frontFace(me.CW) : me.frontFace(me.CCW), e === THREE.CullFaceBack ? me.cullFace(me.BACK) : e === THREE.CullFaceFront ? me.cullFace(me.FRONT) : me.cullFace(me.FRONT_AND_BACK), me.enable(me.CULL_FACE))
         }, this.setMaterialFaces = function(e) {
             ve.setDoubleSided(e.side === THREE.DoubleSide), ve.setFlipSided(e.side === THREE.BackSide)
         }, this.uploadTexture = function(e) {
             void 0 === e.__webglInit && (e.__webglInit = !0, e.addEventListener("dispose", Ve), e.__webglTexture = me.createTexture(), Y.info.memory.textures++), me.bindTexture(me.TEXTURE_2D, e.__webglTexture), me.pixelStorei(me.UNPACK_FLIP_Y_WEBGL, e.flipY), me.pixelStorei(me.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.premultiplyAlpha), me.pixelStorei(me.UNPACK_ALIGNMENT, e.unpackAlignment), e.image = H(e.image, be);
             var t = e.image,
                 r = THREE.Math.isPowerOfTwo(t.width) && THREE.Math.isPowerOfTwo(t.height),
                 i = M(e.format),
                 n = M(e.type);
             x(me.TEXTURE_2D, e, r);
             var a = e.mipmaps;
             if (e instanceof THREE.DataTexture)
                 if (0 < a.length && r) {
                     for (var o = 0, s = a.length; s > o; o++) t = a[o], me.texImage2D(me.TEXTURE_2D, o, i, t.width, t.height, 0, i, n, t.data);
                     e.generateMipmaps = !1
                 } else me.texImage2D(me.TEXTURE_2D, 0, i, t.width, t.height, 0, i, n, t.data);
             else if (e instanceof THREE.CompressedTexture)
                 for (o = 0, s = a.length; s > o; o++) t = a[o], e.format !== THREE.RGBAFormat && e.format !== THREE.RGBFormat ? -1 < De().indexOf(i) ? me.compressedTexImage2D(me.TEXTURE_2D, o, i, t.width, t.height, 0, t.data) : THREE.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : me.texImage2D(me.TEXTURE_2D, o, i, t.width, t.height, 0, i, n, t.data);
             else if (0 < a.length && r) {
                 for (o = 0, s = a.length; s > o; o++) t = a[o], me.texImage2D(me.TEXTURE_2D, o, i, i, n, t);
                 e.generateMipmaps = !1
             } else me.texImage2D(me.TEXTURE_2D, 0, i, i, n, e.image);
             e.generateMipmaps && r && me.generateMipmap(me.TEXTURE_2D), e.needsUpdate = !1, e.onUpdate && e.onUpdate()
         }, this.setTexture = function(e, t) {
             me.activeTexture(me.TEXTURE0 + t), e.needsUpdate ? Y.uploadTexture(e) : me.bindTexture(me.TEXTURE_2D, e.__webglTexture)
         }, this.setRenderTarget = function(e) {
             var t = e instanceof THREE.WebGLRenderTargetCube;
             if (e && void 0 === e.__webglFramebuffer) {
                 void 0 === e.depthBuffer && (e.depthBuffer = !0), void 0 === e.stencilBuffer && (e.stencilBuffer = !0), e.addEventListener("dispose", ze), e.__webglTexture = me.createTexture(), Y.info.memory.textures++;
                 var r = THREE.Math.isPowerOfTwo(e.width) && THREE.Math.isPowerOfTwo(e.height),
                     i = M(e.format),
                     n = M(e.type);
                 if (t) {
                     e.__webglFramebuffer = [], e.__webglRenderbuffer = [], me.bindTexture(me.TEXTURE_CUBE_MAP, e.__webglTexture), x(me.TEXTURE_CUBE_MAP, e, r);
                     for (var a = 0; 6 > a; a++) {
                         e.__webglFramebuffer[a] = me.createFramebuffer(), e.__webglRenderbuffer[a] = me.createRenderbuffer(), me.texImage2D(me.TEXTURE_CUBE_MAP_POSITIVE_X + a, 0, i, e.width, e.height, 0, i, n, null);
                         var o = e,
                             s = me.TEXTURE_CUBE_MAP_POSITIVE_X + a;
                         me.bindFramebuffer(me.FRAMEBUFFER, e.__webglFramebuffer[a]), me.framebufferTexture2D(me.FRAMEBUFFER, me.COLOR_ATTACHMENT0, s, o.__webglTexture, 0), _(e.__webglRenderbuffer[a], e)
                     }
                     r && me.generateMipmap(me.TEXTURE_CUBE_MAP)
                 } else e.__webglFramebuffer = me.createFramebuffer(), e.__webglRenderbuffer = e.shareDepthFrom ? e.shareDepthFrom.__webglRenderbuffer : me.createRenderbuffer(), me.bindTexture(me.TEXTURE_2D, e.__webglTexture), x(me.TEXTURE_2D, e, r), me.texImage2D(me.TEXTURE_2D, 0, i, e.width, e.height, 0, i, n, null), i = me.TEXTURE_2D, me.bindFramebuffer(me.FRAMEBUFFER, e.__webglFramebuffer), me.framebufferTexture2D(me.FRAMEBUFFER, me.COLOR_ATTACHMENT0, i, e.__webglTexture, 0), e.shareDepthFrom ? e.depthBuffer && !e.stencilBuffer ? me.framebufferRenderbuffer(me.FRAMEBUFFER, me.DEPTH_ATTACHMENT, me.RENDERBUFFER, e.__webglRenderbuffer) : e.depthBuffer && e.stencilBuffer && me.framebufferRenderbuffer(me.FRAMEBUFFER, me.DEPTH_STENCIL_ATTACHMENT, me.RENDERBUFFER, e.__webglRenderbuffer) : _(e.__webglRenderbuffer, e), r && me.generateMipmap(me.TEXTURE_2D);
                 t ? me.bindTexture(me.TEXTURE_CUBE_MAP, null) : me.bindTexture(me.TEXTURE_2D, null), me.bindRenderbuffer(me.RENDERBUFFER, null), me.bindFramebuffer(me.FRAMEBUFFER, null)
             }
             e ? (t = t ? e.__webglFramebuffer[e.activeCubeFace] : e.__webglFramebuffer, r = e.width, e = e.height, n = i = 0) : (t = null, r = ae, e = oe, i = ie, n = ne), t !== Q && (me.bindFramebuffer(me.FRAMEBUFFER, t), me.viewport(i, n, r, e), Q = t), se = r, he = e
         }, this.readRenderTargetPixels = function(e, t, r, i, n, a) {
             if (e instanceof THREE.WebGLRenderTarget) {
                 if (e.__webglFramebuffer)
                     if (e.format !== THREE.RGBAFormat) console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA format. readPixels can read only RGBA format.");
                     else {
                         var o = !1;
                         e.__webglFramebuffer !== Q && (me.bindFramebuffer(me.FRAMEBUFFER, e.__webglFramebuffer), o = !0), me.checkFramebufferStatus(me.FRAMEBUFFER) === me.FRAMEBUFFER_COMPLETE ? me.readPixels(t, r, i, n, me.RGBA, me.UNSIGNED_BYTE, a) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete."), o && me.bindFramebuffer(me.FRAMEBUFFER, Q)
                     }
             } else console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.")
         }, this.initMaterial = function() {
             THREE.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
         }, this.addPrePlugin = function() {
             THREE.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
         }, this.addPostPlugin = function() {
             THREE.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
         }, this.updateShadowMap = function() {
             THREE.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
         }
     }, THREE.WebGLRenderTarget = function(e, t, r) {
         this.width = e, this.height = t, r = r || {}, this.wrapS = void 0 !== r.wrapS ? r.wrapS : THREE.ClampToEdgeWrapping, this.wrapT = void 0 !== r.wrapT ? r.wrapT : THREE.ClampToEdgeWrapping, this.magFilter = void 0 !== r.magFilter ? r.magFilter : THREE.LinearFilter, this.minFilter = void 0 !== r.minFilter ? r.minFilter : THREE.LinearMipMapLinearFilter, this.anisotropy = void 0 !== r.anisotropy ? r.anisotropy : 1, this.offset = new THREE.Vector2(0, 0), this.repeat = new THREE.Vector2(1, 1), this.format = void 0 !== r.format ? r.format : THREE.RGBAFormat, this.type = void 0 !== r.type ? r.type : THREE.UnsignedByteType, this.depthBuffer = void 0 !== r.depthBuffer ? r.depthBuffer : !0, this.stencilBuffer = void 0 !== r.stencilBuffer ? r.stencilBuffer : !0, this.generateMipmaps = !0, this.shareDepthFrom = void 0 !== r.shareDepthFrom ? r.shareDepthFrom : null
     }, THREE.WebGLRenderTarget.prototype = {
         constructor: THREE.WebGLRenderTarget,
         setSize: function(e, t) {
             this.width = e, this.height = t
         },
         clone: function() {
             var e = new THREE.WebGLRenderTarget(this.width, this.height);
             return e.wrapS = this.wrapS, e.wrapT = this.wrapT, e.magFilter = this.magFilter, e.minFilter = this.minFilter, e.anisotropy = this.anisotropy, e.offset.copy(this.offset), e.repeat.copy(this.repeat), e.format = this.format, e.type = this.type, e.depthBuffer = this.depthBuffer, e.stencilBuffer = this.stencilBuffer, e.generateMipmaps = this.generateMipmaps, e.shareDepthFrom = this.shareDepthFrom, e
         },
         dispose: function() {
             this.dispatchEvent({
                 type: "dispose"
             })
         }
     }, THREE.EventDispatcher.prototype.apply(THREE.WebGLRenderTarget.prototype), THREE.WebGLRenderTargetCube = function(e, t, r) {
         THREE.WebGLRenderTarget.call(this, e, t, r), this.activeCubeFace = 0
     }, THREE.WebGLRenderTargetCube.prototype = Object.create(THREE.WebGLRenderTarget.prototype), THREE.WebGLRenderTargetCube.prototype.constructor = THREE.WebGLRenderTargetCube, THREE.WebGLExtensions = function(e) {
         var t = {};
         this.get = function(r) {
             if (void 0 !== t[r]) return t[r];
             var i;
             switch (r) {
                 case "EXT_texture_filter_anisotropic":
                     i = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                     break;
                 case "WEBGL_compressed_texture_s3tc":
                     i = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                     break;
                 case "WEBGL_compressed_texture_pvrtc":
                     i = e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                     break;
                 default:
                     i = e.getExtension(r)
             }
             return null === i && THREE.warn("THREE.WebGLRenderer: " + r + " extension not supported."), t[r] = i
         }
     }, THREE.WebGLProgram = function() {
         var e = 0;
         return function(t, r, i, n) {
             var a = t.context,
                 o = i.defines,
                 s = i.__webglShader.uniforms,
                 h = i.attributes,
                 l = i.__webglShader.vertexShader,
                 u = i.__webglShader.fragmentShader,
                 c = i.index0AttributeName;
             void 0 === c && !0 === n.morphTargets && (c = "position");
             var d = "SHADOWMAP_TYPE_BASIC";
             n.shadowMapType === THREE.PCFShadowMap ? d = "SHADOWMAP_TYPE_PCF" : n.shadowMapType === THREE.PCFSoftShadowMap && (d = "SHADOWMAP_TYPE_PCF_SOFT");
             var f = "ENVMAP_TYPE_CUBE",
                 p = "ENVMAP_MODE_REFLECTION",
                 m = "ENVMAP_BLENDING_MULTIPLY";
             if (n.envMap) {
                 switch (i.envMap.mapping) {
                     case THREE.CubeReflectionMapping:
                     case THREE.CubeRefractionMapping:
                         f = "ENVMAP_TYPE_CUBE";
                         break;
                     case THREE.EquirectangularReflectionMapping:
                     case THREE.EquirectangularRefractionMapping:
                         f = "ENVMAP_TYPE_EQUIREC";
                         break;
                     case THREE.SphericalReflectionMapping:
                         f = "ENVMAP_TYPE_SPHERE"
                 }
                 switch (i.envMap.mapping) {
                     case THREE.CubeRefractionMapping:
                     case THREE.EquirectangularRefractionMapping:
                         p = "ENVMAP_MODE_REFRACTION"
                 }
                 switch (i.combine) {
                     case THREE.MultiplyOperation:
                         m = "ENVMAP_BLENDING_MULTIPLY";
                         break;
                     case THREE.MixOperation:
                         m = "ENVMAP_BLENDING_MIX";
                         break;
                     case THREE.AddOperation:
                         m = "ENVMAP_BLENDING_ADD"
                 }
             }
             var E = 0 < t.gammaFactor ? t.gammaFactor : 1,
                 g, v;
             g = [];
             for (var y in o) v = o[y], !1 !== v && (v = "#define " + y + " " + v, g.push(v));
             g = g.join("\n"), o = a.createProgram(), i instanceof THREE.RawShaderMaterial ? t = i = "" : (i = ["precision " + n.precision + " float;", "precision " + n.precision + " int;", g, n.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", t.gammaInput ? "#define GAMMA_INPUT" : "", t.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define GAMMA_FACTOR " + E, "#define MAX_DIR_LIGHTS " + n.maxDirLights, "#define MAX_POINT_LIGHTS " + n.maxPointLights, "#define MAX_SPOT_LIGHTS " + n.maxSpotLights, "#define MAX_HEMI_LIGHTS " + n.maxHemiLights, "#define MAX_SHADOWS " + n.maxShadows, "#define MAX_BONES " + n.maxBones, n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + p : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.vertexColors ? "#define USE_COLOR" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.skinning ? "#define USE_SKINNING" : "", n.useVertexTexture ? "#define BONE_TEXTURE" : "", n.morphTargets ? "#define USE_MORPHTARGETS" : "", n.morphNormals ? "#define USE_MORPHNORMALS" : "", n.wrapAround ? "#define WRAP_AROUND" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + d : "", n.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", n.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\n	attribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\n	attribute vec3 morphTarget0;\n	attribute vec3 morphTarget1;\n	attribute vec3 morphTarget2;\n	attribute vec3 morphTarget3;\n	#ifdef USE_MORPHNORMALS\n		attribute vec3 morphNormal0;\n		attribute vec3 morphNormal1;\n		attribute vec3 morphNormal2;\n		attribute vec3 morphNormal3;\n	#else\n		attribute vec3 morphTarget4;\n		attribute vec3 morphTarget5;\n		attribute vec3 morphTarget6;\n		attribute vec3 morphTarget7;\n	#endif\n#endif\n#ifdef USE_SKINNING\n	attribute vec4 skinIndex;\n	attribute vec4 skinWeight;\n#endif\n"].join("\n"), t = ["precision " + n.precision + " float;", "precision " + n.precision + " int;", n.bumpMap || n.normalMap || n.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", g, "#define MAX_DIR_LIGHTS " + n.maxDirLights, "#define MAX_POINT_LIGHTS " + n.maxPointLights, "#define MAX_SPOT_LIGHTS " + n.maxSpotLights, "#define MAX_HEMI_LIGHTS " + n.maxHemiLights, "#define MAX_SHADOWS " + n.maxShadows, n.alphaTest ? "#define ALPHATEST " + n.alphaTest : "", t.gammaInput ? "#define GAMMA_INPUT" : "", t.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define GAMMA_FACTOR " + E, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + f : "", n.envMap ? "#define " + p : "", n.envMap ? "#define " + m : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.vertexColors ? "#define USE_COLOR" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.metal ? "#define METAL" : "", n.wrapAround ? "#define WRAP_AROUND" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + d : "", n.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", n.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n")), l = new THREE.WebGLShader(a, a.VERTEX_SHADER, i + l), u = new THREE.WebGLShader(a, a.FRAGMENT_SHADER, t + u), a.attachShader(o, l), a.attachShader(o, u), void 0 !== c && a.bindAttribLocation(o, 0, c), a.linkProgram(o), c = a.getProgramInfoLog(o), !1 === a.getProgramParameter(o, a.LINK_STATUS) && THREE.error("THREE.WebGLProgram: shader error: " + a.getError(), "gl.VALIDATE_STATUS", a.getProgramParameter(o, a.VALIDATE_STATUS), "gl.getPRogramInfoLog", c), "" !== c && THREE.warn("THREE.WebGLProgram: gl.getProgramInfoLog()" + c), a.deleteShader(l), a.deleteShader(u), c = "viewMatrix modelViewMatrix projectionMatrix normalMatrix modelMatrix cameraPosition morphTargetInfluences bindMatrix bindMatrixInverse".split(" "), n.useVertexTexture ? (c.push("boneTexture"), c.push("boneTextureWidth"), c.push("boneTextureHeight")) : c.push("boneGlobalMatrices"), n.logarithmicDepthBuffer && c.push("logDepthBufFC");
             for (var T in s) c.push(T);
             for (s = c, T = {}, c = 0, t = s.length; t > c; c++) d = s[c], T[d] = a.getUniformLocation(o, d);
             for (this.uniforms = T, c = "position normal uv uv2 tangent color skinIndex skinWeight lineDistance".split(" "), s = 0; s < n.maxMorphTargets; s++) c.push("morphTarget" + s);
             for (s = 0; s < n.maxMorphNormals; s++) c.push("morphNormal" + s);
             for (var R in h) c.push(R);
             for (n = c, h = {}, R = 0, s = n.length; s > R; R++) T = n[R], h[T] = a.getAttribLocation(o, T);
             return this.attributes = h, this.attributesKeys = Object.keys(this.attributes), this.id = e++, this.code = r, this.usedTimes = 1, this.program = o, this.vertexShader = l, this.fragmentShader = u, this
         }
     }(), THREE.WebGLShader = function() {
         var e = function(e) {
             e = e.split("\n");
             for (var t = 0; t < e.length; t++) e[t] = t + 1 + ": " + e[t];
             return e.join("\n")
         };
         return function(e, t, r) {
             return t = e.createShader(t), e.shaderSource(t, r), e.compileShader(t), !1 === e.getShaderParameter(t, e.COMPILE_STATUS) && THREE.error("THREE.WebGLShader: Shader couldn't compile."), "" !== e.getShaderInfoLog(t) && THREE.warn("THREE.WebGLShader: gl.getShaderInfoLog()", "CJC SUPPRESS", "CJC SUPPRESS"), t
         }
     }(), THREE.WebGLState = function(e, t) {
         var r = new Uint8Array(16),
             i = new Uint8Array(16),
             n = null,
             a = null,
             o = null,
             s = null,
             h = null,
             l = null,
             u = null,
             c = null,
             d = null,
             f = null,
             p = null,
             m = null,
             E = null,
             g = null,
             v = null,
             y = null;
         this.initAttributes = function() {
             for (var e = 0, t = r.length; t > e; e++) r[e] = 0
         }, this.enableAttribute = function(t) {
             r[t] = 1, 0 === i[t] && (e.enableVertexAttribArray(t), i[t] = 1)
         }, this.disableUnusedAttributes = function() {
             for (var t = 0, n = i.length; n > t; t++) i[t] !== r[t] && (e.disableVertexAttribArray(t), i[t] = 0)
         }, this.setBlending = function(r, i, c, d, f, p, m) {
             r !== n && (r === THREE.NoBlending ? e.disable(e.BLEND) : r === THREE.AdditiveBlending ? (e.enable(e.BLEND), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.SRC_ALPHA, e.ONE)) : r === THREE.SubtractiveBlending ? (e.enable(e.BLEND), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ZERO, e.ONE_MINUS_SRC_COLOR)) : r === THREE.MultiplyBlending ? (e.enable(e.BLEND), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ZERO, e.SRC_COLOR)) : r === THREE.CustomBlending ? e.enable(e.BLEND) : (e.enable(e.BLEND), e.blendEquationSeparate(e.FUNC_ADD, e.FUNC_ADD), e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA)), n = r), r === THREE.CustomBlending ? (f = f || i, p = p || c, m = m || d, (i !== a || f !== h) && (e.blendEquationSeparate(t(i), t(f)), a = i, h = f), (c !== o || d !== s || p !== l || m !== u) && (e.blendFuncSeparate(t(c), t(d), t(p), t(m)), o = c, s = d, l = p, u = m)) : u = l = h = s = o = a = null
         }, this.setDepthTest = function(t) {
             c !== t && (t ? e.enable(e.DEPTH_TEST) : e.disable(e.DEPTH_TEST), c = t)
         }, this.setDepthWrite = function(t) {
             d !== t && (e.depthMask(t), d = t)
         }, this.setColorWrite = function(t) {
             f !== t && (e.colorMask(t, t, t, t), f = t)
         }, this.setDoubleSided = function(t) {
             p !== t && (t ? e.disable(e.CULL_FACE) : e.enable(e.CULL_FACE), p = t)
         }, this.setFlipSided = function(t) {
             m !== t && (t ? e.frontFace(e.CW) : e.frontFace(e.CCW), m = t)
         }, this.setLineWidth = function(t) {
             t !== E && (e.lineWidth(t), E = t)
         }, this.setPolygonOffset = function(t, r, i) {
             g !== t && (t ? e.enable(e.POLYGON_OFFSET_FILL) : e.disable(e.POLYGON_OFFSET_FILL), g = t), !t || v === r && y === i || (e.polygonOffset(r, i), v = r, y = i)
         }, this.reset = function() {
             for (var e = 0; e < i.length; e++) i[e] = 0;
             m = p = f = d = c = n = null
         }
     }, THREE.LensFlarePlugin = function(e, t) {
         var r, i, n, a, o, s, h, l, u, c, d = e.context,
             f, p, m, E, g, v;
         this.render = function(y, T, R, x) {
             if (0 !== t.length) {
                 y = new THREE.Vector3;
                 var H = x / R,
                     _ = .5 * R,
                     b = .5 * x,
                     w = 16 / x,
                     M = new THREE.Vector2(w * H, w),
                     S = new THREE.Vector3(1, 1, 0),
                     C = new THREE.Vector2(1, 1);
                 if (void 0 === m) {
                     var w = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 1]),
                         A = new Uint16Array([0, 1, 2, 0, 2, 3]);
                     f = d.createBuffer(), p = d.createBuffer(), d.bindBuffer(d.ARRAY_BUFFER, f), d.bufferData(d.ARRAY_BUFFER, w, d.STATIC_DRAW), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, p), d.bufferData(d.ELEMENT_ARRAY_BUFFER, A, d.STATIC_DRAW), g = d.createTexture(), v = d.createTexture(), d.bindTexture(d.TEXTURE_2D, g), d.texImage2D(d.TEXTURE_2D, 0, d.RGB, 16, 16, 0, d.RGB, d.UNSIGNED_BYTE, null), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, d.CLAMP_TO_EDGE), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, d.CLAMP_TO_EDGE), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.NEAREST), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, d.NEAREST), d.bindTexture(d.TEXTURE_2D, v), d.texImage2D(d.TEXTURE_2D, 0, d.RGBA, 16, 16, 0, d.RGBA, d.UNSIGNED_BYTE, null), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, d.CLAMP_TO_EDGE), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, d.CLAMP_TO_EDGE), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.NEAREST), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, d.NEAREST);
                     var w = (E = 0 < d.getParameter(d.MAX_VERTEX_TEXTURE_IMAGE_UNITS)) ? {
                             vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility =        visibility.r / 9.0;\nvVisibility *= 1.0 - visibility.g / 9.0;\nvVisibility *=       visibility.b / 9.0;\nvVisibility *= 1.0 - visibility.a / 9.0;\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
                             fragmentShader: "uniform lowp int renderType;\nuniform sampler2D map;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
                         } : {
                             vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
                             fragmentShader: "precision mediump float;\nuniform lowp int renderType;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
                         },
                         A = d.createProgram(),
                         L = d.createShader(d.FRAGMENT_SHADER),
                         P = d.createShader(d.VERTEX_SHADER),
                         D = "precision " + e.getPrecision() + " float;\n";
                     d.shaderSource(L, D + w.fragmentShader), d.shaderSource(P, D + w.vertexShader), d.compileShader(L), d.compileShader(P), d.attachShader(A, L), d.attachShader(A, P), d.linkProgram(A), m = A, u = d.getAttribLocation(m, "position"), c = d.getAttribLocation(m, "uv"), r = d.getUniformLocation(m, "renderType"), i = d.getUniformLocation(m, "map"), n = d.getUniformLocation(m, "occlusionMap"), a = d.getUniformLocation(m, "opacity"), o = d.getUniformLocation(m, "color"), s = d.getUniformLocation(m, "scale"), h = d.getUniformLocation(m, "rotation"), l = d.getUniformLocation(m, "screenPosition")
                 }
                 for (d.useProgram(m), d.enableVertexAttribArray(u), d.enableVertexAttribArray(c), d.uniform1i(n, 0), d.uniform1i(i, 1), d.bindBuffer(d.ARRAY_BUFFER, f), d.vertexAttribPointer(u, 2, d.FLOAT, !1, 16, 0), d.vertexAttribPointer(c, 2, d.FLOAT, !1, 16, 8), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, p), d.disable(d.CULL_FACE), d.depthMask(!1), A = 0, L = t.length; L > A; A++)
                     if (w = 16 / x, M.set(w * H, w), P = t[A], y.set(P.matrixWorld.elements[12], P.matrixWorld.elements[13], P.matrixWorld.elements[14]), y.applyMatrix4(T.matrixWorldInverse), y.applyProjection(T.projectionMatrix), S.copy(y), C.x = S.x * _ + _, C.y = S.y * b + b, E || 0 < C.x && C.x < R && 0 < C.y && C.y < x) {
                         d.activeTexture(d.TEXTURE1), d.bindTexture(d.TEXTURE_2D, g), d.copyTexImage2D(d.TEXTURE_2D, 0, d.RGB, C.x - 8, C.y - 8, 16, 16, 0), d.uniform1i(r, 0), d.uniform2f(s, M.x, M.y), d.uniform3f(l, S.x, S.y, S.z), d.disable(d.BLEND), d.enable(d.DEPTH_TEST), d.drawElements(d.TRIANGLES, 6, d.UNSIGNED_SHORT, 0), d.activeTexture(d.TEXTURE0), d.bindTexture(d.TEXTURE_2D, v), d.copyTexImage2D(d.TEXTURE_2D, 0, d.RGBA, C.x - 8, C.y - 8, 16, 16, 0), d.uniform1i(r, 1), d.disable(d.DEPTH_TEST), d.activeTexture(d.TEXTURE1), d.bindTexture(d.TEXTURE_2D, g), d.drawElements(d.TRIANGLES, 6, d.UNSIGNED_SHORT, 0), P.positionScreen.copy(S), P.customUpdateCallback ? P.customUpdateCallback(P) : P.updateLensFlares(), d.uniform1i(r, 2), d.enable(d.BLEND);
                         for (var D = 0, F = P.lensFlares.length; F > D; D++) {
                             var k = P.lensFlares[D];.001 < k.opacity && .001 < k.scale && (S.x = k.x, S.y = k.y, S.z = k.z, w = k.size * k.scale / x, M.x = w * H, M.y = w, d.uniform3f(l, S.x, S.y, S.z), d.uniform2f(s, M.x, M.y), d.uniform1f(h, k.rotation), d.uniform1f(a, k.opacity), d.uniform3f(o, k.color.r, k.color.g, k.color.b), e.state.setBlending(k.blending, k.blendEquation, k.blendSrc, k.blendDst), e.setTexture(k.texture, 1), d.drawElements(d.TRIANGLES, 6, d.UNSIGNED_SHORT, 0))
                         }
                     }
                 d.enable(d.CULL_FACE), d.enable(d.DEPTH_TEST), d.depthMask(!0), e.resetGLState()
             }
         }
     }, THREE.ShadowMapPlugin = function(e, t, r, i) {
         function n(e, t, i) {
             if (t.visible) {
                 var a = r[t.id];
                 if (a && t.castShadow && (!1 === t.frustumCulled || !0 === u.intersectsObject(t)))
                     for (var o = 0, s = a.length; s > o; o++) {
                         var h = a[o];
                         t._modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, t.matrixWorld), m.push(h)
                     }
                 for (o = 0, s = t.children.length; s > o; o++) n(e, t.children[o], i)
             }
         }
         var a = e.context,
             o, s, h, l, u = new THREE.Frustum,
             c = new THREE.Matrix4,
             d = new THREE.Vector3,
             f = new THREE.Vector3,
             p = new THREE.Vector3,
             m = [],
             E = THREE.ShaderLib.depthRGBA,
             g = THREE.UniformsUtils.clone(E.uniforms);
         o = new THREE.ShaderMaterial({
             uniforms: g,
             vertexShader: E.vertexShader,
             fragmentShader: E.fragmentShader
         }), s = new THREE.ShaderMaterial({
             uniforms: g,
             vertexShader: E.vertexShader,
             fragmentShader: E.fragmentShader,
             morphTargets: !0
         }), h = new THREE.ShaderMaterial({
             uniforms: g,
             vertexShader: E.vertexShader,
             fragmentShader: E.fragmentShader,
             skinning: !0
         }), l = new THREE.ShaderMaterial({
             uniforms: g,
             vertexShader: E.vertexShader,
             fragmentShader: E.fragmentShader,
             morphTargets: !0,
             skinning: !0
         }), o._shadowPass = !0, s._shadowPass = !0, h._shadowPass = !0, l._shadowPass = !0, this.render = function(r, E) {
             if (!1 !== e.shadowMapEnabled) {
                 var g, v, y, T, R, x, H, _, b = [];
                 for (T = 0, a.clearColor(1, 1, 1, 1), a.disable(a.BLEND), a.enable(a.CULL_FACE), a.frontFace(a.CCW), e.shadowMapCullFace === THREE.CullFaceFront ? a.cullFace(a.FRONT) : a.cullFace(a.BACK), e.state.setDepthTest(!0),
                     g = 0, v = t.length; v > g; g++)
                     if (y = t[g], y.castShadow)
                         if (y instanceof THREE.DirectionalLight && y.shadowCascade)
                             for (R = 0; R < y.shadowCascadeCount; R++) {
                                 var w;
                                 if (y.shadowCascadeArray[R]) w = y.shadowCascadeArray[R];
                                 else {
                                     H = y;
                                     var M = R;
                                     w = new THREE.DirectionalLight, w.isVirtual = !0, w.onlyShadow = !0, w.castShadow = !0, w.shadowCameraNear = H.shadowCameraNear, w.shadowCameraFar = H.shadowCameraFar, w.shadowCameraLeft = H.shadowCameraLeft, w.shadowCameraRight = H.shadowCameraRight, w.shadowCameraBottom = H.shadowCameraBottom, w.shadowCameraTop = H.shadowCameraTop, w.shadowCameraVisible = H.shadowCameraVisible, w.shadowDarkness = H.shadowDarkness, w.shadowBias = H.shadowCascadeBias[M], w.shadowMapWidth = H.shadowCascadeWidth[M], w.shadowMapHeight = H.shadowCascadeHeight[M], w.pointsWorld = [], w.pointsFrustum = [], _ = w.pointsWorld, x = w.pointsFrustum;
                                     for (var S = 0; 8 > S; S++) _[S] = new THREE.Vector3, x[S] = new THREE.Vector3;
                                     _ = H.shadowCascadeNearZ[M], H = H.shadowCascadeFarZ[M], x[0].set(-1, -1, _), x[1].set(1, -1, _), x[2].set(-1, 1, _), x[3].set(1, 1, _), x[4].set(-1, -1, H), x[5].set(1, -1, H), x[6].set(-1, 1, H), x[7].set(1, 1, H), w.originalCamera = E, x = new THREE.Gyroscope, x.position.copy(y.shadowCascadeOffset), x.add(w), x.add(w.target), E.add(x), y.shadowCascadeArray[R] = w
                                 }
                                 M = y, _ = R, H = M.shadowCascadeArray[_], H.position.copy(M.position), H.target.position.copy(M.target.position), H.lookAt(H.target), H.shadowCameraVisible = M.shadowCameraVisible, H.shadowDarkness = M.shadowDarkness, H.shadowBias = M.shadowCascadeBias[_], x = M.shadowCascadeNearZ[_], M = M.shadowCascadeFarZ[_], H = H.pointsFrustum, H[0].z = x, H[1].z = x, H[2].z = x, H[3].z = x, H[4].z = M, H[5].z = M, H[6].z = M, H[7].z = M, b[T] = w, T++
                             } else b[T] = y, T++;
                 for (g = 0, v = b.length; v > g; g++) {
                     if (y = b[g], y.shadowMap || (R = THREE.LinearFilter, e.shadowMapType === THREE.PCFSoftShadowMap && (R = THREE.NearestFilter), y.shadowMap = new THREE.WebGLRenderTarget(y.shadowMapWidth, y.shadowMapHeight, {
                             minFilter: R,
                             magFilter: R,
                             format: THREE.RGBAFormat
                         }), y.shadowMapSize = new THREE.Vector2(y.shadowMapWidth, y.shadowMapHeight), y.shadowMatrix = new THREE.Matrix4), !y.shadowCamera) {
                         if (y instanceof THREE.SpotLight) y.shadowCamera = new THREE.PerspectiveCamera(y.shadowCameraFov, y.shadowMapWidth / y.shadowMapHeight, y.shadowCameraNear, y.shadowCameraFar);
                         else {
                             if (!(y instanceof THREE.DirectionalLight)) {
                                 THREE.error("THREE.ShadowMapPlugin: Unsupported light type for shadow", y);
                                 continue
                             }
                             y.shadowCamera = new THREE.OrthographicCamera(y.shadowCameraLeft, y.shadowCameraRight, y.shadowCameraTop, y.shadowCameraBottom, y.shadowCameraNear, y.shadowCameraFar)
                         }
                         r.add(y.shadowCamera), !0 === r.autoUpdate && r.updateMatrixWorld()
                     }
                     if (y.shadowCameraVisible && !y.cameraHelper && (y.cameraHelper = new THREE.CameraHelper(y.shadowCamera), r.add(y.cameraHelper)), y.isVirtual && w.originalCamera == E) {
                         for (R = E, T = y.shadowCamera, x = y.pointsFrustum, H = y.pointsWorld, d.set(1 / 0, 1 / 0, 1 / 0), f.set(-(1 / 0), -(1 / 0), -(1 / 0)), M = 0; 8 > M; M++) _ = H[M], _.copy(x[M]), _.unproject(R), _.applyMatrix4(T.matrixWorldInverse), _.x < d.x && (d.x = _.x), _.x > f.x && (f.x = _.x), _.y < d.y && (d.y = _.y), _.y > f.y && (f.y = _.y), _.z < d.z && (d.z = _.z), _.z > f.z && (f.z = _.z);
                         T.left = d.x, T.right = f.x, T.top = f.y, T.bottom = d.y, T.updateProjectionMatrix()
                     }
                     for (T = y.shadowMap, x = y.shadowMatrix, R = y.shadowCamera, R.position.setFromMatrixPosition(y.matrixWorld), p.setFromMatrixPosition(y.target.matrixWorld), R.lookAt(p), R.updateMatrixWorld(), R.matrixWorldInverse.getInverse(R.matrixWorld), y.cameraHelper && (y.cameraHelper.visible = y.shadowCameraVisible), y.shadowCameraVisible && y.cameraHelper.update(), x.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), x.multiply(R.projectionMatrix), x.multiply(R.matrixWorldInverse), c.multiplyMatrices(R.projectionMatrix, R.matrixWorldInverse), u.setFromMatrix(c), e.setRenderTarget(T), e.clear(), m.length = 0, n(r, r, R), y = 0, T = m.length; T > y; y++) H = m[y], x = H.object, H = H.buffer, M = x.material instanceof THREE.MeshFaceMaterial ? x.material.materials[0] : x.material, _ = void 0 !== x.geometry.morphTargets && 0 < x.geometry.morphTargets.length && M.morphTargets, S = x instanceof THREE.SkinnedMesh && M.skinning, _ = x.customDepthMaterial ? x.customDepthMaterial : S ? _ ? l : h : _ ? s : o, e.setMaterialFaces(M), H instanceof THREE.BufferGeometry ? e.renderBufferDirect(R, t, null, _, H, x) : e.renderBuffer(R, t, null, _, H, x);
                     for (y = 0, T = i.length; T > y; y++) H = i[y], x = H.object, x.visible && x.castShadow && (x._modelViewMatrix.multiplyMatrices(R.matrixWorldInverse, x.matrixWorld), e.renderImmediateObject(R, t, null, o, x))
                 }
                 g = e.getClearColor(), v = e.getClearAlpha(), a.clearColor(g.r, g.g, g.b, v), a.enable(a.BLEND), e.shadowMapCullFace === THREE.CullFaceFront && a.cullFace(a.BACK), e.resetGLState()
             }
         }
     }, THREE.SpritePlugin = function(e, t) {
         function r(e, t) {
             return e.z !== t.z ? t.z - e.z : t.id - e.id
         }
         var i, n, a, o, s, h, l, u, c, d, f, p, m, E, g, v, y, T = e.context,
             R, x, H, _, b = new THREE.Vector3,
             w = new THREE.Quaternion,
             M = new THREE.Vector3;
         this.render = function(S, C) {
             if (0 !== t.length) {
                 if (void 0 === H) {
                     var A = new Float32Array([-.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1]),
                         L = new Uint16Array([0, 1, 2, 0, 2, 3]);
                     R = T.createBuffer(), x = T.createBuffer(), T.bindBuffer(T.ARRAY_BUFFER, R), T.bufferData(T.ARRAY_BUFFER, A, T.STATIC_DRAW), T.bindBuffer(T.ELEMENT_ARRAY_BUFFER, x), T.bufferData(T.ELEMENT_ARRAY_BUFFER, L, T.STATIC_DRAW);
                     var A = T.createProgram(),
                         L = T.createShader(T.VERTEX_SHADER),
                         P = T.createShader(T.FRAGMENT_SHADER);
                     T.shaderSource(L, ["precision " + e.getPrecision() + " float;", "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position * scale;\nvec2 rotatedPosition;\nrotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\nrotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\nvec4 finalPosition;\nfinalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition;\nfinalPosition = projectionMatrix * finalPosition;\ngl_Position = finalPosition;\n}"].join("\n")), T.shaderSource(P, ["precision " + e.getPrecision() + " float;", "uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\nif ( texture.a < alphaTest ) discard;\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}"].join("\n")), T.compileShader(L), T.compileShader(P), T.attachShader(A, L), T.attachShader(A, P), T.linkProgram(A), H = A, v = T.getAttribLocation(H, "position"), y = T.getAttribLocation(H, "uv"), i = T.getUniformLocation(H, "uvOffset"), n = T.getUniformLocation(H, "uvScale"), a = T.getUniformLocation(H, "rotation"), o = T.getUniformLocation(H, "scale"), s = T.getUniformLocation(H, "color"), h = T.getUniformLocation(H, "map"), l = T.getUniformLocation(H, "opacity"), u = T.getUniformLocation(H, "modelViewMatrix"), c = T.getUniformLocation(H, "projectionMatrix"), d = T.getUniformLocation(H, "fogType"), f = T.getUniformLocation(H, "fogDensity"), p = T.getUniformLocation(H, "fogNear"), m = T.getUniformLocation(H, "fogFar"), E = T.getUniformLocation(H, "fogColor"), g = T.getUniformLocation(H, "alphaTest"), A = document.createElement("canvas"), A.width = 8, A.height = 8, L = A.getContext("2d"), L.fillStyle = "white", L.fillRect(0, 0, 8, 8), _ = new THREE.Texture(A), _.needsUpdate = !0
                 }
                 T.useProgram(H), T.enableVertexAttribArray(v), T.enableVertexAttribArray(y), T.disable(T.CULL_FACE), T.enable(T.BLEND), T.bindBuffer(T.ARRAY_BUFFER, R), T.vertexAttribPointer(v, 2, T.FLOAT, !1, 16, 0), T.vertexAttribPointer(y, 2, T.FLOAT, !1, 16, 8), T.bindBuffer(T.ELEMENT_ARRAY_BUFFER, x), T.uniformMatrix4fv(c, !1, C.projectionMatrix.elements), T.activeTexture(T.TEXTURE0), T.uniform1i(h, 0), L = A = 0, (P = S.fog) ? (T.uniform3f(E, P.color.r, P.color.g, P.color.b), P instanceof THREE.Fog ? (T.uniform1f(p, P.near), T.uniform1f(m, P.far), T.uniform1i(d, 1), L = A = 1) : P instanceof THREE.FogExp2 && (T.uniform1f(f, P.density), T.uniform1i(d, 2), L = A = 2)) : (T.uniform1i(d, 0), L = A = 0);
                 for (var P = 0, D = t.length; D > P; P++) {
                     var F = t[P];
                     F._modelViewMatrix.multiplyMatrices(C.matrixWorldInverse, F.matrixWorld), F.z = -F._modelViewMatrix.elements[14]
                 }
                 t.sort(r);
                 for (var k = [], P = 0, D = t.length; D > P; P++) {
                     var F = t[P],
                         B = F.material;
                     T.uniform1f(g, B.alphaTest), T.uniformMatrix4fv(u, !1, F._modelViewMatrix.elements), F.matrixWorld.decompose(b, w, M), k[0] = M.x, k[1] = M.y, F = 0, S.fog && B.fog && (F = L), A !== F && (T.uniform1i(d, F), A = F), null !== B.map ? (T.uniform2f(i, B.map.offset.x, B.map.offset.y), T.uniform2f(n, B.map.repeat.x, B.map.repeat.y)) : (T.uniform2f(i, 0, 0), T.uniform2f(n, 1, 1)), T.uniform1f(l, B.opacity), T.uniform3f(s, B.color.r, B.color.g, B.color.b), T.uniform1f(a, B.rotation), T.uniform2fv(o, k), e.state.setBlending(B.blending, B.blendEquation, B.blendSrc, B.blendDst), e.state.setDepthTest(B.depthTest), e.state.setDepthWrite(B.depthWrite), B.map && B.map.image && B.map.image.width ? e.setTexture(B.map, 0) : e.setTexture(_, 0), T.drawElements(T.TRIANGLES, 6, T.UNSIGNED_SHORT, 0)
                 }
                 T.enable(T.CULL_FACE), e.resetGLState()
             }
         }
     }, THREE.GeometryUtils = {
         merge: function(e, t, r) {
             THREE.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");
             var i;
             t instanceof THREE.Mesh && (t.matrixAutoUpdate && t.updateMatrix(), i = t.matrix, t = t.geometry), e.merge(t, i, r)
         },
         center: function(e) {
             return THREE.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead."), e.center()
         }
     }, THREE.ImageUtils = {
         crossOrigin: void 0,
         loadTexture: function(e, t, r, i) {
             var n = new THREE.ImageLoader;
             n.crossOrigin = this.crossOrigin;
             var a = new THREE.Texture(void 0, t);
             return n.load(e, function(e) {
                 a.image = e, a.needsUpdate = !0, r && r(a)
             }, void 0, function(e) {
                 i && i(e)
             }), a.sourceFile = e, a
         },
         loadTextureCube: function(e, t, r, i) {
             var n = new THREE.ImageLoader;
             n.crossOrigin = this.crossOrigin;
             var a = new THREE.CubeTexture([], t);
             a.flipY = !1;
             var o = 0;
             t = function(t) {
                 n.load(e[t], function(e) {
                     a.images[t] = e, o += 1, 6 === o && (a.needsUpdate = !0, r && r(a))
                 }, void 0, i)
             };
             for (var s = 0, h = e.length; h > s; ++s) t(s);
             return a
         },
         loadCompressedTexture: function() {
             THREE.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
         },
         loadCompressedTextureCube: function() {
             THREE.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
         },
         getNormalMap: function(e, t) {
             var r = function(e) {
                 var t = Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
                 return [e[0] / t, e[1] / t, e[2] / t]
             };
             t |= 1;
             var i = e.width,
                 n = e.height,
                 a = document.createElement("canvas");
             a.width = i, a.height = n;
             var o = a.getContext("2d");
             o.drawImage(e, 0, 0);
             for (var s = o.getImageData(0, 0, i, n).data, h = o.createImageData(i, n), l = h.data, u = 0; i > u; u++)
                 for (var c = 0; n > c; c++) {
                     var d = 0 > c - 1 ? 0 : c - 1,
                         f = c + 1 > n - 1 ? n - 1 : c + 1,
                         p = 0 > u - 1 ? 0 : u - 1,
                         m = u + 1 > i - 1 ? i - 1 : u + 1,
                         E = [],
                         g = [0, 0, s[4 * (c * i + u)] / 255 * t];
                     for (E.push([-1, 0, s[4 * (c * i + p)] / 255 * t]), E.push([-1, -1, s[4 * (d * i + p)] / 255 * t]), E.push([0, -1, s[4 * (d * i + u)] / 255 * t]), E.push([1, -1, s[4 * (d * i + m)] / 255 * t]), E.push([1, 0, s[4 * (c * i + m)] / 255 * t]), E.push([1, 1, s[4 * (f * i + m)] / 255 * t]), E.push([0, 1, s[4 * (f * i + u)] / 255 * t]), E.push([-1, 1, s[4 * (f * i + p)] / 255 * t]), d = [], p = E.length, f = 0; p > f; f++) {
                         var m = E[f],
                             v = E[(f + 1) % p],
                             m = [m[0] - g[0], m[1] - g[1], m[2] - g[2]],
                             v = [v[0] - g[0], v[1] - g[1], v[2] - g[2]];
                         d.push(r([m[1] * v[2] - m[2] * v[1], m[2] * v[0] - m[0] * v[2], m[0] * v[1] - m[1] * v[0]]))
                     }
                     for (E = [0, 0, 0], f = 0; f < d.length; f++) E[0] += d[f][0], E[1] += d[f][1], E[2] += d[f][2];
                     E[0] /= d.length, E[1] /= d.length, E[2] /= d.length, g = 4 * (c * i + u), l[g] = (E[0] + 1) / 2 * 255 | 0, l[g + 1] = (E[1] + 1) / 2 * 255 | 0, l[g + 2] = 255 * E[2] | 0, l[g + 3] = 255
                 }
             return o.putImageData(h, 0, 0), a
         },
         generateDataTexture: function(e, t, r) {
             var i = e * t,
                 n = new Uint8Array(3 * i),
                 a = Math.floor(255 * r.r),
                 o = Math.floor(255 * r.g);
             r = Math.floor(255 * r.b);
             for (var s = 0; i > s; s++) n[3 * s] = a, n[3 * s + 1] = o, n[3 * s + 2] = r;
             return e = new THREE.DataTexture(n, e, t, THREE.RGBFormat), e.needsUpdate = !0, e
         }
     }, THREE.SceneUtils = {
         createMultiMaterialObject: function(e, t) {
             for (var r = new THREE.Object3D, i = 0, n = t.length; n > i; i++) r.add(new THREE.Mesh(e, t[i]));
             return r
         },
         detach: function(e, t, r) {
             e.applyMatrix(t.matrixWorld), t.remove(e), r.add(e)
         },
         attach: function(e, t, r) {
             var i = new THREE.Matrix4;
             i.getInverse(r.matrixWorld), e.applyMatrix(i), t.remove(e), r.add(e)
         }
     }, THREE.FontUtils = {
         faces: {},
         face: "helvetiker",
         weight: "normal",
         style: "normal",
         size: 150,
         divisions: 10,
         getFace: function() {
             try {
                 return this.faces[this.face][this.weight][this.style]
             } catch (e) {
                 throw "The font " + this.face + " with " + this.weight + " weight and " + this.style + " style is missing."
             }
         },
         loadFace: function(e) {
             var t = e.familyName.toLowerCase();
             return this.faces[t] = this.faces[t] || {}, this.faces[t][e.cssFontWeight] = this.faces[t][e.cssFontWeight] || {}, this.faces[t][e.cssFontWeight][e.cssFontStyle] = e, this.faces[t][e.cssFontWeight][e.cssFontStyle] = e
         },
         drawText: function(e) {
             var t = this.getFace(),
                 r = this.size / t.resolution,
                 i = 0,
                 n = String(e).split(""),
                 a = n.length,
                 o = [];
             for (e = 0; a > e; e++) {
                 var s = new THREE.Path,
                     s = this.extractGlyphPoints(n[e], t, r, i, s),
                     i = i + s.offset;
                 o.push(s.path)
             }
             return {
                 paths: o,
                 offset: i / 2
             }
         },
         extractGlyphPoints: function(e, t, r, i, n) {
             var a = [],
                 o, s, h, l, u, c, d, f, p, m, E, g = t.glyphs[e] || t.glyphs["?"];
             if (g) {
                 if (g.o)
                     for (t = g._cachedOutline || (g._cachedOutline = g.o.split(" ")), l = t.length, e = 0; l > e;) switch (h = t[e++]) {
                         case "m":
                             h = t[e++] * r + i, u = t[e++] * r, n.moveTo(h, u);
                             break;
                         case "l":
                             h = t[e++] * r + i, u = t[e++] * r, n.lineTo(h, u);
                             break;
                         case "q":
                             if (h = t[e++] * r + i, u = t[e++] * r, f = t[e++] * r + i, p = t[e++] * r, n.quadraticCurveTo(f, p, h, u), o = a[a.length - 1])
                                 for (c = o.x, d = o.y, o = 1, s = this.divisions; s >= o; o++) {
                                     var v = o / s;
                                     THREE.Shape.Utils.b2(v, c, f, h), THREE.Shape.Utils.b2(v, d, p, u)
                                 }
                             break;
                         case "b":
                             if (h = t[e++] * r + i, u = t[e++] * r, f = t[e++] * r + i, p = t[e++] * r, m = t[e++] * r + i, E = t[e++] * r, n.bezierCurveTo(f, p, m, E, h, u), o = a[a.length - 1])
                                 for (c = o.x, d = o.y, o = 1, s = this.divisions; s >= o; o++) v = o / s, THREE.Shape.Utils.b3(v, c, f, m, h), THREE.Shape.Utils.b3(v, d, p, E, u)
                     }
                 return {
                     offset: g.ha * r,
                     path: n
                 }
             }
         }
     }, THREE.FontUtils.generateShapes = function(e, t) {
         t = t || {};
         var r = void 0 !== t.curveSegments ? t.curveSegments : 4,
             i = void 0 !== t.font ? t.font : "helvetiker",
             n = void 0 !== t.weight ? t.weight : "normal",
             a = void 0 !== t.style ? t.style : "normal";
         for (THREE.FontUtils.size = void 0 !== t.size ? t.size : 100, THREE.FontUtils.divisions = r, THREE.FontUtils.face = i, THREE.FontUtils.weight = n, THREE.FontUtils.style = a, r = THREE.FontUtils.drawText(e).paths, i = [], n = 0, a = r.length; a > n; n++) Array.prototype.push.apply(i, r[n].toShapes());
         return i
     },
     function(e) {
         var t = function(e) {
             for (var t = e.length, r = 0, i = t - 1, n = 0; t > n; i = n++) r += e[i].x * e[n].y - e[n].x * e[i].y;
             return .5 * r
         };
         return e.Triangulate = function(e, r) {
             var i = e.length;
             if (3 > i) return null;
             var n = [],
                 a = [],
                 o = [],
                 s, h, l;
             if (0 < t(e))
                 for (h = 0; i > h; h++) a[h] = h;
             else
                 for (h = 0; i > h; h++) a[h] = i - 1 - h;
             var u = 2 * i;
             for (h = i - 1; i > 2;) {
                 if (0 >= u--) {
                     THREE.warn("THREE.FontUtils: Warning, unable to triangulate polygon! in Triangulate.process()");
                     break
                 }
                 s = h, s >= i && (s = 0), h = s + 1, h >= i && (h = 0), l = h + 1, l >= i && (l = 0);
                 var c;
                 e: {
                     var d = c = void 0,
                         f = void 0,
                         p = void 0,
                         m = void 0,
                         E = void 0,
                         g = void 0,
                         v = void 0,
                         y = void 0,
                         d = e[a[s]].x,
                         f = e[a[s]].y,
                         p = e[a[h]].x,
                         m = e[a[h]].y,
                         E = e[a[l]].x,
                         g = e[a[l]].y;
                     if (1e-10 > (p - d) * (g - f) - (m - f) * (E - d)) c = !1;
                     else {
                         var T = void 0,
                             R = void 0,
                             x = void 0,
                             H = void 0,
                             _ = void 0,
                             b = void 0,
                             w = void 0,
                             M = void 0,
                             S = void 0,
                             C = void 0,
                             S = M = w = y = v = void 0,
                             T = E - p,
                             R = g - m,
                             x = d - E,
                             H = f - g,
                             _ = p - d,
                             b = m - f;
                         for (c = 0; i > c; c++)
                             if (v = e[a[c]].x, y = e[a[c]].y, !(v === d && y === f || v === p && y === m || v === E && y === g) && (w = v - d, M = y - f, S = v - p, C = y - m, v -= E, y -= g, S = T * C - R * S, w = _ * M - b * w, M = x * y - H * v, S >= -1e-10 && M >= -1e-10 && w >= -1e-10)) {
                                 c = !1;
                                 break e
                             }
                         c = !0
                     }
                 }
                 if (c) {
                     for (n.push([e[a[s]], e[a[h]], e[a[l]]]), o.push([a[s], a[h], a[l]]), s = h, l = h + 1; i > l; s++, l++) a[s] = a[l];
                     i--, u = 2 * i
                 }
             }
             return r ? o : n
         }, e.Triangulate.area = t, e
     }(THREE.FontUtils), self._typeface_js = {
         faces: THREE.FontUtils.faces,
         loadFace: THREE.FontUtils.loadFace
     }, THREE.typeface_js = self._typeface_js, THREE.Audio = function(e) {
         THREE.Object3D.call(this), this.type = "Audio", this.context = e.context, this.source = this.context.createBufferSource(), this.source.onended = this.onEnded.bind(this), this.gain = this.context.createGain(), this.gain.connect(this.context.destination), this.panner = this.context.createPanner(), this.panner.connect(this.gain), this.autoplay = !1, this.startTime = 0, this.isPlaying = !1
     }, THREE.Audio.prototype = Object.create(THREE.Object3D.prototype), THREE.Audio.prototype.constructor = THREE.Audio, THREE.Audio.prototype.load = function(e) {
         var t = this,
             r = new XMLHttpRequest;
         return r.open("GET", e, !0), r.responseType = "arraybuffer", r.onload = function(e) {
             t.context.decodeAudioData(this.response, function(e) {
                 t.source.buffer = e, t.autoplay && t.play()
             })
         }, r.send(), this
     }, THREE.Audio.prototype.play = function() {
         if (!0 === this.isPlaying) THREE.warn("THREE.Audio: Audio is already playing.");
         else {
             var e = this.context.createBufferSource();
             e.buffer = this.source.buffer, e.loop = this.source.loop, e.onended = this.source.onended, e.connect(this.panner), e.start(0, this.startTime), this.isPlaying = !0, this.source = e
         }
     }, THREE.Audio.prototype.pause = function() {
         this.source.stop(), this.startTime = this.context.currentTime
     }, THREE.Audio.prototype.stop = function() {
         this.source.stop(), this.startTime = 0
     }, THREE.Audio.prototype.onEnded = function() {
         this.isPlaying = !1
     }, THREE.Audio.prototype.setLoop = function(e) {
         this.source.loop = e
     }, THREE.Audio.prototype.setRefDistance = function(e) {
         this.panner.refDistance = e
     }, THREE.Audio.prototype.setRolloffFactor = function(e) {
         this.panner.rolloffFactor = e
     }, THREE.Audio.prototype.setVolume = function(e) {
         this.gain.gain.value = e
     }, THREE.Audio.prototype.updateMatrixWorld = function() {
         var e = new THREE.Vector3;
         return function(t) {
             THREE.Object3D.prototype.updateMatrixWorld.call(this, t), e.setFromMatrixPosition(this.matrixWorld), this.panner.setPosition(e.x, e.y, e.z)
         }
     }(), THREE.AudioListener = function() {
         THREE.Object3D.call(this), this.type = "AudioListener", this.context = new(window.AudioContext || window.webkitAudioContext)
     }, THREE.AudioListener.prototype = Object.create(THREE.Object3D.prototype), THREE.AudioListener.prototype.constructor = THREE.AudioListener, THREE.AudioListener.prototype.updateMatrixWorld = function() {
         var e = new THREE.Vector3,
             t = new THREE.Quaternion,
             r = new THREE.Vector3,
             i = new THREE.Vector3,
             n = new THREE.Vector3,
             a = new THREE.Vector3;
         return function(o) {
             THREE.Object3D.prototype.updateMatrixWorld.call(this, o), o = this.context.listener;
             var s = this.up;
             this.matrixWorld.decompose(e, t, r), i.set(0, 0, -1).applyQuaternion(t), n.subVectors(e, a), o.setPosition(e.x, e.y, e.z), o.setOrientation(i.x, i.y, i.z, s.x, s.y, s.z), o.setVelocity(n.x, n.y, n.z), a.copy(e)
         }
     }(), THREE.Curve = function() {}, THREE.Curve.prototype.getPoint = function(e) {
         return THREE.warn("THREE.Curve: Warning, getPoint() not implemented!"), null
     }, THREE.Curve.prototype.getPointAt = function(e) {
         return e = this.getUtoTmapping(e), this.getPoint(e)
     }, THREE.Curve.prototype.getPoints = function(e) {
         e || (e = 5);
         var t, r = [];
         for (t = 0; e >= t; t++) r.push(this.getPoint(t / e));
         return r
     }, THREE.Curve.prototype.getSpacedPoints = function(e) {
         e || (e = 5);
         var t, r = [];
         for (t = 0; e >= t; t++) r.push(this.getPointAt(t / e));
         return r
     }, THREE.Curve.prototype.getLength = function() {
         var e = this.getLengths();
         return e[e.length - 1]
     }, THREE.Curve.prototype.getLengths = function(e) {
         if (e || (e = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200), this.cacheArcLengths && this.cacheArcLengths.length == e + 1 && !this.needsUpdate) return this.cacheArcLengths;
         this.needsUpdate = !1;
         var t = [],
             r, i = this.getPoint(0),
             n, a = 0;
         for (t.push(0), n = 1; e >= n; n++) r = this.getPoint(n / e), a += r.distanceTo(i), t.push(a), i = r;
         return this.cacheArcLengths = t
     }, THREE.Curve.prototype.updateArcLengths = function() {
         this.needsUpdate = !0, this.getLengths()
     }, THREE.Curve.prototype.getUtoTmapping = function(e, t) {
         var r = this.getLengths(),
             i = 0,
             n = r.length,
             a;
         a = t ? t : e * r[n - 1];
         for (var o = 0, s = n - 1, h; s >= o;)
             if (i = Math.floor(o + (s - o) / 2), h = r[i] - a, 0 > h) o = i + 1;
             else {
                 if (!(h > 0)) {
                     s = i;
                     break
                 }
                 s = i - 1
             }
         return i = s, r[i] == a ? i / (n - 1) : (o = r[i], r = (i + (a - o) / (r[i + 1] - o)) / (n - 1))
     }, THREE.Curve.prototype.getTangent = function(e) {
         var t = e - 1e-4;
         return e += 1e-4, 0 > t && (t = 0), e > 1 && (e = 1), t = this.getPoint(t), this.getPoint(e).clone().sub(t).normalize()
     }, THREE.Curve.prototype.getTangentAt = function(e) {
         return e = this.getUtoTmapping(e), this.getTangent(e)
     }, THREE.Curve.Utils = {
         tangentQuadraticBezier: function(e, t, r, i) {
             return 2 * (1 - e) * (r - t) + 2 * e * (i - r)
         },
         tangentCubicBezier: function(e, t, r, i, n) {
             return -3 * t * (1 - e) * (1 - e) + 3 * r * (1 - e) * (1 - e) - 6 * e * r * (1 - e) + 6 * e * i * (1 - e) - 3 * e * e * i + 3 * e * e * n
         },
         tangentSpline: function(e, t, r, i, n) {
             return 6 * e * e - 6 * e + (3 * e * e - 4 * e + 1) + (-6 * e * e + 6 * e) + (3 * e * e - 2 * e)
         },
         interpolate: function(e, t, r, i, n) {
             e = .5 * (r - e), i = .5 * (i - t);
             var a = n * n;
             return (2 * t - 2 * r + e + i) * n * a + (-3 * t + 3 * r - 2 * e - i) * a + e * n + t
         }
     }, THREE.Curve.create = function(e, t) {
         return e.prototype = Object.create(THREE.Curve.prototype), e.prototype.constructor = e, e.prototype.getPoint = t, e
     }, THREE.CurvePath = function() {
         this.curves = [], this.bends = [], this.autoClose = !1
     }, THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype), THREE.CurvePath.prototype.constructor = THREE.CurvePath, THREE.CurvePath.prototype.add = function(e) {
         this.curves.push(e)
     }, THREE.CurvePath.prototype.checkConnection = function() {}, THREE.CurvePath.prototype.closePath = function() {
         var e = this.curves[0].getPoint(0),
             t = this.curves[this.curves.length - 1].getPoint(1);
         e.equals(t) || this.curves.push(new THREE.LineCurve(t, e))
     }, THREE.CurvePath.prototype.getPoint = function(e) {
         var t = e * this.getLength(),
             r = this.getCurveLengths();
         for (e = 0; e < r.length;) {
             if (r[e] >= t) return t = r[e] - t, e = this.curves[e], t = 1 - t / e.getLength(), e.getPointAt(t);
             e++
         }
         return null
     }, THREE.CurvePath.prototype.getLength = function() {
         var e = this.getCurveLengths();
         return e[e.length - 1]
     }, THREE.CurvePath.prototype.getCurveLengths = function() {
         if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
         var e = [],
             t = 0,
             r, i = this.curves.length;
         for (r = 0; i > r; r++) t += this.curves[r].getLength(), e.push(t);
         return this.cacheLengths = e
     }, THREE.CurvePath.prototype.getBoundingBox = function() {
         var e = this.getPoints(),
             t, r, i, n, a, o;
         t = r = Number.NEGATIVE_INFINITY, n = a = Number.POSITIVE_INFINITY;
         var s, h, l, u, c = e[0] instanceof THREE.Vector3;
         for (u = c ? new THREE.Vector3 : new THREE.Vector2, h = 0, l = e.length; l > h; h++) s = e[h], s.x > t ? t = s.x : s.x < n && (n = s.x), s.y > r ? r = s.y : s.y < a && (a = s.y), c && (s.z > i ? i = s.z : s.z < o && (o = s.z)), u.add(s);
         return e = {
             minX: n,
             minY: a,
             maxX: t,
             maxY: r
         }, c && (e.maxZ = i, e.minZ = o), e
     }, THREE.CurvePath.prototype.createPointsGeometry = function(e) {
         return e = this.getPoints(e, !0), this.createGeometry(e)
     }, THREE.CurvePath.prototype.createSpacedPointsGeometry = function(e) {
         return e = this.getSpacedPoints(e, !0), this.createGeometry(e)
     }, THREE.CurvePath.prototype.createGeometry = function(e) {
         for (var t = new THREE.Geometry, r = 0; r < e.length; r++) t.vertices.push(new THREE.Vector3(e[r].x, e[r].y, e[r].z || 0));
         return t
     }, THREE.CurvePath.prototype.addWrapPath = function(e) {
         this.bends.push(e)
     }, THREE.CurvePath.prototype.getTransformedPoints = function(e, t) {
         var r = this.getPoints(e),
             i, n;
         for (t || (t = this.bends), i = 0, n = t.length; n > i; i++) r = this.getWrapPoints(r, t[i]);
         return r
     }, THREE.CurvePath.prototype.getTransformedSpacedPoints = function(e, t) {
         var r = this.getSpacedPoints(e),
             i, n;
         for (t || (t = this.bends), i = 0, n = t.length; n > i; i++) r = this.getWrapPoints(r, t[i]);
         return r
     }, THREE.CurvePath.prototype.getWrapPoints = function(e, t) {
         var r = this.getBoundingBox(),
             i, n, a, o, s, h;
         for (i = 0, n = e.length; n > i; i++) a = e[i], o = a.x, s = a.y, h = o / r.maxX, h = t.getUtoTmapping(h, o), o = t.getPoint(h), h = t.getTangent(h), h.set(-h.y, h.x).multiplyScalar(s), a.x = o.x + h.x, a.y = o.y + h.y;
         return e
     }, THREE.Gyroscope = function() {
         THREE.Object3D.call(this)
     }, THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype), THREE.Gyroscope.prototype.constructor = THREE.Gyroscope, THREE.Gyroscope.prototype.updateMatrixWorld = function() {
         var e = new THREE.Vector3,
             t = new THREE.Quaternion,
             r = new THREE.Vector3,
             i = new THREE.Vector3,
             n = new THREE.Quaternion,
             a = new THREE.Vector3;
         return function(o) {
             this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || o) && (this.parent ? (this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorld.decompose(i, n, a), this.matrix.decompose(e, t, r), this.matrixWorld.compose(i, t, a)) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, o = !0);
             for (var s = 0, h = this.children.length; h > s; s++) this.children[s].updateMatrixWorld(o)
         }
     }(), THREE.Path = function(e) {
         THREE.CurvePath.call(this), this.actions = [], e && this.fromPoints(e)
     }, THREE.Path.prototype = Object.create(THREE.CurvePath.prototype), THREE.Path.prototype.constructor = THREE.Path, THREE.PathActions = {
         MOVE_TO: "moveTo",
         LINE_TO: "lineTo",
         QUADRATIC_CURVE_TO: "quadraticCurveTo",
         BEZIER_CURVE_TO: "bezierCurveTo",
         CSPLINE_THRU: "splineThru",
         ARC: "arc",
         ELLIPSE: "ellipse"
     }, THREE.Path.prototype.fromPoints = function(e) {
         this.moveTo(e[0].x, e[0].y);
         for (var t = 1, r = e.length; r > t; t++) this.lineTo(e[t].x, e[t].y)
     }, THREE.Path.prototype.moveTo = function(e, t) {
         var r = Array.prototype.slice.call(arguments);
         this.actions.push({
             action: THREE.PathActions.MOVE_TO,
             args: r
         })
     }, THREE.Path.prototype.lineTo = function(e, t) {
         var r = Array.prototype.slice.call(arguments),
             i = this.actions[this.actions.length - 1].args,
             i = new THREE.LineCurve(new THREE.Vector2(i[i.length - 2], i[i.length - 1]), new THREE.Vector2(e, t));
         this.curves.push(i), this.actions.push({
             action: THREE.PathActions.LINE_TO,
             args: r
         })
     }, THREE.Path.prototype.quadraticCurveTo = function(e, t, r, i) {
         var n = Array.prototype.slice.call(arguments),
             a = this.actions[this.actions.length - 1].args,
             a = new THREE.QuadraticBezierCurve(new THREE.Vector2(a[a.length - 2], a[a.length - 1]), new THREE.Vector2(e, t), new THREE.Vector2(r, i));
         this.curves.push(a), this.actions.push({
             action: THREE.PathActions.QUADRATIC_CURVE_TO,
             args: n
         })
     }, THREE.Path.prototype.bezierCurveTo = function(e, t, r, i, n, a) {
         var o = Array.prototype.slice.call(arguments),
             s = this.actions[this.actions.length - 1].args,
             s = new THREE.CubicBezierCurve(new THREE.Vector2(s[s.length - 2], s[s.length - 1]), new THREE.Vector2(e, t), new THREE.Vector2(r, i), new THREE.Vector2(n, a));
         this.curves.push(s), this.actions.push({
             action: THREE.PathActions.BEZIER_CURVE_TO,
             args: o
         })
     }, THREE.Path.prototype.splineThru = function(e) {
         var t = Array.prototype.slice.call(arguments),
             r = this.actions[this.actions.length - 1].args,
             r = [new THREE.Vector2(r[r.length - 2], r[r.length - 1])];
         Array.prototype.push.apply(r, e), r = new THREE.SplineCurve(r), this.curves.push(r), this.actions.push({
             action: THREE.PathActions.CSPLINE_THRU,
             args: t
         })
     }, THREE.Path.prototype.arc = function(e, t, r, i, n, a) {
         var o = this.actions[this.actions.length - 1].args;
         this.absarc(e + o[o.length - 2], t + o[o.length - 1], r, i, n, a)
     }, THREE.Path.prototype.absarc = function(e, t, r, i, n, a) {
         this.absellipse(e, t, r, r, i, n, a)
     }, THREE.Path.prototype.ellipse = function(e, t, r, i, n, a, o) {
         var s = this.actions[this.actions.length - 1].args;
         this.absellipse(e + s[s.length - 2], t + s[s.length - 1], r, i, n, a, o)
     }, THREE.Path.prototype.absellipse = function(e, t, r, i, n, a, o) {
         var s = Array.prototype.slice.call(arguments),
             h = new THREE.EllipseCurve(e, t, r, i, n, a, o);
         this.curves.push(h), h = h.getPoint(1), s.push(h.x), s.push(h.y), this.actions.push({
             action: THREE.PathActions.ELLIPSE,
             args: s
         })
     }, THREE.Path.prototype.getSpacedPoints = function(e, t) {
         e || (e = 40);
         for (var r = [], i = 0; e > i; i++) r.push(this.getPoint(i / e));
         return r
     }, THREE.Path.prototype.getPoints = function(e, t) {
         if (this.useSpacedPoints) return console.log("tata"), this.getSpacedPoints(e, t);
         e = e || 12;
         var r = [],
             i, n, a, o, s, h, l, u, c, d, f, p, m;
         for (i = 0, n = this.actions.length; n > i; i++) switch (a = this.actions[i], o = a.action, a = a.args, o) {
             case THREE.PathActions.MOVE_TO:
                 r.push(new THREE.Vector2(a[0], a[1]));
                 break;
             case THREE.PathActions.LINE_TO:
                 r.push(new THREE.Vector2(a[0], a[1]));
                 break;
             case THREE.PathActions.QUADRATIC_CURVE_TO:
                 for (s = a[2], h = a[3], c = a[0], d = a[1], 0 < r.length ? (o = r[r.length - 1], f = o.x, p = o.y) : (o = this.actions[i - 1].args, f = o[o.length - 2], p = o[o.length - 1]), a = 1; e >= a; a++) m = a / e, o = THREE.Shape.Utils.b2(m, f, c, s), m = THREE.Shape.Utils.b2(m, p, d, h), r.push(new THREE.Vector2(o, m));
                 break;
             case THREE.PathActions.BEZIER_CURVE_TO:
                 for (s = a[4], h = a[5], c = a[0], d = a[1], l = a[2], u = a[3], 0 < r.length ? (o = r[r.length - 1], f = o.x, p = o.y) : (o = this.actions[i - 1].args, f = o[o.length - 2], p = o[o.length - 1]), a = 1; e >= a; a++) m = a / e, o = THREE.Shape.Utils.b3(m, f, c, l, s), m = THREE.Shape.Utils.b3(m, p, d, u, h), r.push(new THREE.Vector2(o, m));
                 break;
             case THREE.PathActions.CSPLINE_THRU:
                 for (o = this.actions[i - 1].args, m = [new THREE.Vector2(o[o.length - 2], o[o.length - 1])], o = e * a[0].length, m = m.concat(a[0]), m = new THREE.SplineCurve(m), a = 1; o >= a; a++) r.push(m.getPointAt(a / o));
                 break;
             case THREE.PathActions.ARC:
                 for (s = a[0], h = a[1], d = a[2], l = a[3], o = a[4], c = !!a[5], f = o - l, p = 2 * e, a = 1; p >= a; a++) m = a / p, c || (m = 1 - m), m = l + m * f, o = s + d * Math.cos(m), m = h + d * Math.sin(m), r.push(new THREE.Vector2(o, m));
                 break;
             case THREE.PathActions.ELLIPSE:
                 for (s = a[0], h = a[1], d = a[2], u = a[3], l = a[4], o = a[5], c = !!a[6], f = o - l, p = 2 * e, a = 1; p >= a; a++) m = a / p, c || (m = 1 - m), m = l + m * f, o = s + d * Math.cos(m), m = h + u * Math.sin(m), r.push(new THREE.Vector2(o, m))
         }
         return i = r[r.length - 1], 1e-10 > Math.abs(i.x - r[0].x) && 1e-10 > Math.abs(i.y - r[0].y) && r.splice(r.length - 1, 1), t && r.push(r[0]), r
     }, THREE.Path.prototype.toShapes = function(e, t) {
         function r(e) {
             for (var t = [], r = 0, i = e.length; i > r; r++) {
                 var n = e[r],
                     a = new THREE.Shape;
                 a.actions = n.actions, a.curves = n.curves, t.push(a)
             }
             return t
         }

         function i(e, t) {
             for (var r = t.length, i = !1, n = r - 1, a = 0; r > a; n = a++) {
                 var o = t[n],
                     s = t[a],
                     h = s.x - o.x,
                     l = s.y - o.y;
                 if (1e-10 < Math.abs(l)) {
                     if (0 > l && (o = t[a], h = -h, s = t[n], l = -l), !(e.y < o.y || e.y > s.y))
                         if (e.y == o.y) {
                             if (e.x == o.x) return !0
                         } else {
                             if (n = l * (e.x - o.x) - h * (e.y - o.y), 0 == n) return !0;
                             0 > n || (i = !i)
                         }
                 } else if (e.y == o.y && (s.x <= e.x && e.x <= o.x || o.x <= e.x && e.x <= s.x)) return !0
             }
             return i
         }
         var n = function(e) {
             var t, r, i, n, a = [],
                 o = new THREE.Path;
             for (t = 0, r = e.length; r > t; t++) i = e[t], n = i.args, i = i.action, i == THREE.PathActions.MOVE_TO && 0 != o.actions.length && (a.push(o), o = new THREE.Path), o[i].apply(o, n);
             return 0 != o.actions.length && a.push(o), a
         }(this.actions);
         if (0 == n.length) return [];
         if (!0 === t) return r(n);
         var a, o, s, h = [];
         if (1 == n.length) return o = n[0], s = new THREE.Shape, s.actions = o.actions, s.curves = o.curves, h.push(s), h;
         var l = !THREE.Shape.Utils.isClockWise(n[0].getPoints()),
             l = e ? !l : l;
         s = [];
         var u = [],
             c = [],
             d = 0,
             f;
         u[d] = void 0, c[d] = [];
         var p, m;
         for (p = 0, m = n.length; m > p; p++) o = n[p], f = o.getPoints(), a = THREE.Shape.Utils.isClockWise(f), (a = e ? !a : a) ? (!l && u[d] && d++, u[d] = {
             s: new THREE.Shape,
             p: f
         }, u[d].s.actions = o.actions, u[d].s.curves = o.curves, l && d++, c[d] = []) : c[d].push({
             h: o,
             p: f[0]
         });
         if (!u[0]) return r(n);
         if (1 < u.length) {
             for (p = !1, m = [], o = 0, n = u.length; n > o; o++) s[o] = [];
             for (o = 0, n = u.length; n > o; o++)
                 for (a = c[o], l = 0; l < a.length; l++) {
                     d = a[l], f = !0;
                     for (var E = 0; E < u.length; E++) i(d.p, u[E].p) && (o != E && m.push({
                         froms: o,
                         tos: E,
                         hole: l
                     }), f ? (f = !1, s[E].push(d)) : p = !0);
                     f && s[o].push(d)
                 }
             0 < m.length && (p || (c = s))
         }
         for (p = 0, m = u.length; m > p; p++)
             for (s = u[p].s, h.push(s), o = c[p], n = 0, a = o.length; a > n; n++) s.holes.push(o[n].h);
         return h
     }, THREE.Shape = function() {
         THREE.Path.apply(this, arguments), this.holes = []
     }, THREE.Shape.prototype = Object.create(THREE.Path.prototype), THREE.Shape.prototype.constructor = THREE.Shape, THREE.Shape.prototype.extrude = function(e) {
         return new THREE.ExtrudeGeometry(this, e)
     }, THREE.Shape.prototype.makeGeometry = function(e) {
         return new THREE.ShapeGeometry(this, e)
     }, THREE.Shape.prototype.getPointsHoles = function(e) {
         var t, r = this.holes.length,
             i = [];
         for (t = 0; r > t; t++) i[t] = this.holes[t].getTransformedPoints(e, this.bends);
         return i
     }, THREE.Shape.prototype.getSpacedPointsHoles = function(e) {
         var t, r = this.holes.length,
             i = [];
         for (t = 0; r > t; t++) i[t] = this.holes[t].getTransformedSpacedPoints(e, this.bends);
         return i
     }, THREE.Shape.prototype.extractAllPoints = function(e) {
         return {
             shape: this.getTransformedPoints(e),
             holes: this.getPointsHoles(e)
         }
     }, THREE.Shape.prototype.extractPoints = function(e) {
         return this.useSpacedPoints ? this.extractAllSpacedPoints(e) : this.extractAllPoints(e)
     }, THREE.Shape.prototype.extractAllSpacedPoints = function(e) {
         return {
             shape: this.getTransformedSpacedPoints(e),
             holes: this.getSpacedPointsHoles(e)
         }
     }, THREE.Shape.Utils = {
         triangulateShape: function(e, t) {
             function r(e, t, r) {
                 return e.x != t.x ? e.x < t.x ? e.x <= r.x && r.x <= t.x : t.x <= r.x && r.x <= e.x : e.y < t.y ? e.y <= r.y && r.y <= t.y : t.y <= r.y && r.y <= e.y
             }

             function i(e, t, i, n, a) {
                 var o = t.x - e.x,
                     s = t.y - e.y,
                     h = n.x - i.x,
                     l = n.y - i.y,
                     u = e.x - i.x,
                     c = e.y - i.y,
                     d = s * h - o * l,
                     f = s * u - o * c;
                 if (1e-10 < Math.abs(d)) {
                     if (d > 0) {
                         if (0 > f || f > d) return [];
                         if (h = l * u - h * c, 0 > h || h > d) return []
                     } else {
                         if (f > 0 || d > f) return [];
                         if (h = l * u - h * c, h > 0 || d > h) return []
                     }
                     return 0 == h ? !a || 0 != f && f != d ? [e] : [] : h == d ? !a || 0 != f && f != d ? [t] : [] : 0 == f ? [i] : f == d ? [n] : (a = h / d, [{
                         x: e.x + a * o,
                         y: e.y + a * s
                     }])
                 }
                 return 0 != f || l * u != h * c ? [] : (s = 0 == o && 0 == s, h = 0 == h && 0 == l, s && h ? e.x != i.x || e.y != i.y ? [] : [e] : s ? r(i, n, e) ? [e] : [] : h ? r(e, t, i) ? [i] : [] : (0 != o ? (e.x < t.x ? (o = e, h = e.x, s = t, e = t.x) : (o = t, h = t.x, s = e, e = e.x), i.x < n.x ? (t = i, d = i.x, l = n, i = n.x) : (t = n, d = n.x, l = i, i = i.x)) : (e.y < t.y ? (o = e, h = e.y, s = t, e = t.y) : (o = t, h = t.y, s = e, e = e.y), i.y < n.y ? (t = i, d = i.y, l = n, i = n.y) : (t = n, d = n.y, l = i, i = i.y)), d >= h ? d > e ? [] : e == d ? a ? [] : [t] : i >= e ? [t, s] : [t, l] : h > i ? [] : h == i ? a ? [] : [o] : i >= e ? [o, s] : [o, l]));
             }

             function n(e, t, r, i) {
                 var n = t.x - e.x,
                     a = t.y - e.y;
                 t = r.x - e.x, r = r.y - e.y;
                 var o = i.x - e.x;
                 return i = i.y - e.y, e = n * r - a * t, n = n * i - a * o, 1e-10 < Math.abs(e) ? (t = o * r - i * t, e > 0 ? n >= 0 && t >= 0 : n >= 0 || t >= 0) : n > 0
             }
             var a, o, s, h, l, u = {};
             for (s = e.concat(), a = 0, o = t.length; o > a; a++) Array.prototype.push.apply(s, t[a]);
             for (a = 0, o = s.length; o > a; a++) l = s[a].x + ":" + s[a].y, void 0 !== u[l] && THREE.warn("THREE.Shape: Duplicate point", l), u[l] = a;
             a = function(e, t) {
                 function r(e, t) {
                     var r = s.length - 1,
                         i = e - 1;
                     0 > i && (i = r);
                     var a = e + 1;
                     return a > r && (a = 0), (r = n(s[e], s[i], s[a], h[t])) ? (r = h.length - 1, i = t - 1, 0 > i && (i = r), a = t + 1, a > r && (a = 0), (r = n(h[t], h[i], h[a], s[e])) ? !0 : !1) : !1
                 }

                 function a(e, t) {
                     var r, n;
                     for (r = 0; r < s.length; r++)
                         if (n = r + 1, n %= s.length, n = i(e, t, s[r], s[n], !0), 0 < n.length) return !0;
                     return !1
                 }

                 function o(e, r) {
                     var n, a, o, s;
                     for (n = 0; n < l.length; n++)
                         for (a = t[l[n]], o = 0; o < a.length; o++)
                             if (s = o + 1, s %= a.length, s = i(e, r, a[o], a[s], !0), 0 < s.length) return !0;
                     return !1
                 }
                 var s = e.concat(),
                     h, l = [],
                     u, c, d, f, p, m = [],
                     E, g, v, y = 0;
                 for (u = t.length; u > y; y++) l.push(y);
                 E = 0;
                 for (var T = 2 * l.length; 0 < l.length;) {
                     if (T--, 0 > T) {
                         console.log("Infinite Loop! Holes left:" + l.length + ", Probably Hole outside Shape!");
                         break
                     }
                     for (c = E; c < s.length; c++) {
                         for (d = s[c], u = -1, y = 0; y < l.length; y++)
                             if (f = l[y], p = d.x + ":" + d.y + ":" + f, void 0 === m[p]) {
                                 for (h = t[f], g = 0; g < h.length; g++)
                                     if (f = h[g], r(c, g) && !a(d, f) && !o(d, f)) {
                                         u = g, l.splice(y, 1), E = s.slice(0, c + 1), f = s.slice(c), g = h.slice(u), v = h.slice(0, u + 1), s = E.concat(g).concat(v).concat(f), E = c;
                                         break
                                     }
                                 if (u >= 0) break;
                                 m[p] = !0
                             }
                         if (u >= 0) break
                     }
                 }
                 return s
             }(e, t);
             var c = THREE.FontUtils.Triangulate(a, !1);
             for (a = 0, o = c.length; o > a; a++)
                 for (h = c[a], s = 0; 3 > s; s++) l = h[s].x + ":" + h[s].y, l = u[l], void 0 !== l && (h[s] = l);
             return c.concat()
         },
         isClockWise: function(e) {
             return 0 > THREE.FontUtils.Triangulate.area(e)
         },
         b2p0: function(e, t) {
             var r = 1 - e;
             return r * r * t
         },
         b2p1: function(e, t) {
             return 2 * (1 - e) * e * t
         },
         b2p2: function(e, t) {
             return e * e * t
         },
         b2: function(e, t, r, i) {
             return this.b2p0(e, t) + this.b2p1(e, r) + this.b2p2(e, i)
         },
         b3p0: function(e, t) {
             var r = 1 - e;
             return r * r * r * t
         },
         b3p1: function(e, t) {
             var r = 1 - e;
             return 3 * r * r * e * t
         },
         b3p2: function(e, t) {
             return 3 * (1 - e) * e * e * t
         },
         b3p3: function(e, t) {
             return e * e * e * t
         },
         b3: function(e, t, r, i, n) {
             return this.b3p0(e, t) + this.b3p1(e, r) + this.b3p2(e, i) + this.b3p3(e, n)
         }
     }, THREE.LineCurve = function(e, t) {
         this.v1 = e, this.v2 = t
     }, THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype), THREE.LineCurve.prototype.constructor = THREE.LineCurve, THREE.LineCurve.prototype.getPoint = function(e) {
         var t = this.v2.clone().sub(this.v1);
         return t.multiplyScalar(e).add(this.v1), t
     }, THREE.LineCurve.prototype.getPointAt = function(e) {
         return this.getPoint(e)
     }, THREE.LineCurve.prototype.getTangent = function(e) {
         return this.v2.clone().sub(this.v1).normalize()
     }, THREE.QuadraticBezierCurve = function(e, t, r) {
         this.v0 = e, this.v1 = t, this.v2 = r
     }, THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype), THREE.QuadraticBezierCurve.prototype.constructor = THREE.QuadraticBezierCurve, THREE.QuadraticBezierCurve.prototype.getPoint = function(e) {
         var t = new THREE.Vector2;
         return t.x = THREE.Shape.Utils.b2(e, this.v0.x, this.v1.x, this.v2.x), t.y = THREE.Shape.Utils.b2(e, this.v0.y, this.v1.y, this.v2.y), t
     }, THREE.QuadraticBezierCurve.prototype.getTangent = function(e) {
         var t = new THREE.Vector2;
         return t.x = THREE.Curve.Utils.tangentQuadraticBezier(e, this.v0.x, this.v1.x, this.v2.x), t.y = THREE.Curve.Utils.tangentQuadraticBezier(e, this.v0.y, this.v1.y, this.v2.y), t.normalize()
     }, THREE.CubicBezierCurve = function(e, t, r, i) {
         this.v0 = e, this.v1 = t, this.v2 = r, this.v3 = i
     }, THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype), THREE.CubicBezierCurve.prototype.constructor = THREE.CubicBezierCurve, THREE.CubicBezierCurve.prototype.getPoint = function(e) {
         var t;
         return t = THREE.Shape.Utils.b3(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x), e = THREE.Shape.Utils.b3(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y), new THREE.Vector2(t, e)
     }, THREE.CubicBezierCurve.prototype.getTangent = function(e) {
         var t;
         return t = THREE.Curve.Utils.tangentCubicBezier(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x), e = THREE.Curve.Utils.tangentCubicBezier(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y), t = new THREE.Vector2(t, e), t.normalize(), t
     }, THREE.SplineCurve = function(e) {
         this.points = void 0 == e ? [] : e
     }, THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype), THREE.SplineCurve.prototype.constructor = THREE.SplineCurve, THREE.SplineCurve.prototype.getPoint = function(e) {
         var t = this.points;
         e *= t.length - 1;
         var r = Math.floor(e);
         e -= r;
         var i = t[0 == r ? r : r - 1],
             n = t[r],
             a = t[r > t.length - 2 ? t.length - 1 : r + 1],
             t = t[r > t.length - 3 ? t.length - 1 : r + 2],
             r = new THREE.Vector2;
         return r.x = THREE.Curve.Utils.interpolate(i.x, n.x, a.x, t.x, e), r.y = THREE.Curve.Utils.interpolate(i.y, n.y, a.y, t.y, e), r
     }, THREE.EllipseCurve = function(e, t, r, i, n, a, o) {
         this.aX = e, this.aY = t, this.xRadius = r, this.yRadius = i, this.aStartAngle = n, this.aEndAngle = a, this.aClockwise = o
     }, THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype), THREE.EllipseCurve.prototype.constructor = THREE.EllipseCurve, THREE.EllipseCurve.prototype.getPoint = function(e) {
         var t = this.aEndAngle - this.aStartAngle;
         return 0 > t && (t += 2 * Math.PI), t > 2 * Math.PI && (t -= 2 * Math.PI), e = !0 === this.aClockwise ? this.aEndAngle + (1 - e) * (2 * Math.PI - t) : this.aStartAngle + e * t, t = new THREE.Vector2, t.x = this.aX + this.xRadius * Math.cos(e), t.y = this.aY + this.yRadius * Math.sin(e), t
     }, THREE.ArcCurve = function(e, t, r, i, n, a) {
         THREE.EllipseCurve.call(this, e, t, r, r, i, n, a)
     }, THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype), THREE.ArcCurve.prototype.constructor = THREE.ArcCurve, THREE.LineCurve3 = THREE.Curve.create(function(e, t) {
         this.v1 = e, this.v2 = t
     }, function(e) {
         var t = new THREE.Vector3;
         return t.subVectors(this.v2, this.v1), t.multiplyScalar(e), t.add(this.v1), t
     }), THREE.QuadraticBezierCurve3 = THREE.Curve.create(function(e, t, r) {
         this.v0 = e, this.v1 = t, this.v2 = r
     }, function(e) {
         var t = new THREE.Vector3;
         return t.x = THREE.Shape.Utils.b2(e, this.v0.x, this.v1.x, this.v2.x), t.y = THREE.Shape.Utils.b2(e, this.v0.y, this.v1.y, this.v2.y), t.z = THREE.Shape.Utils.b2(e, this.v0.z, this.v1.z, this.v2.z), t
     }), THREE.CubicBezierCurve3 = THREE.Curve.create(function(e, t, r, i) {
         this.v0 = e, this.v1 = t, this.v2 = r, this.v3 = i
     }, function(e) {
         var t = new THREE.Vector3;
         return t.x = THREE.Shape.Utils.b3(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x), t.y = THREE.Shape.Utils.b3(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y), t.z = THREE.Shape.Utils.b3(e, this.v0.z, this.v1.z, this.v2.z, this.v3.z), t
     }), THREE.SplineCurve3 = THREE.Curve.create(function(e) {
         this.points = void 0 == e ? [] : e
     }, function(e) {
         var t = this.points;
         e *= t.length - 1;
         var r = Math.floor(e);
         e -= r;
         var i = t[0 == r ? r : r - 1],
             n = t[r],
             a = t[r > t.length - 2 ? t.length - 1 : r + 1],
             t = t[r > t.length - 3 ? t.length - 1 : r + 2],
             r = new THREE.Vector3;
         return r.x = THREE.Curve.Utils.interpolate(i.x, n.x, a.x, t.x, e), r.y = THREE.Curve.Utils.interpolate(i.y, n.y, a.y, t.y, e), r.z = THREE.Curve.Utils.interpolate(i.z, n.z, a.z, t.z, e), r
     }), THREE.ClosedSplineCurve3 = THREE.Curve.create(function(e) {
         this.points = void 0 == e ? [] : e
     }, function(e) {
         var t = this.points;
         e *= t.length - 0;
         var r = Math.floor(e);
         e -= r;
         var r = r + (r > 0 ? 0 : (Math.floor(Math.abs(r) / t.length) + 1) * t.length),
             i = t[(r - 1) % t.length],
             n = t[r % t.length],
             a = t[(r + 1) % t.length],
             t = t[(r + 2) % t.length],
             r = new THREE.Vector3;
         return r.x = THREE.Curve.Utils.interpolate(i.x, n.x, a.x, t.x, e), r.y = THREE.Curve.Utils.interpolate(i.y, n.y, a.y, t.y, e), r.z = THREE.Curve.Utils.interpolate(i.z, n.z, a.z, t.z, e), r
     }), THREE.AnimationHandler = {
         LINEAR: 0,
         CATMULLROM: 1,
         CATMULLROM_FORWARD: 2,
         add: function() {
             THREE.warn("THREE.AnimationHandler.add() has been deprecated.")
         },
         get: function() {
             THREE.warn("THREE.AnimationHandler.get() has been deprecated.")
         },
         remove: function() {
             THREE.warn("THREE.AnimationHandler.remove() has been deprecated.")
         },
         animations: [],
         init: function(e) {
             if (!0 === e.initialized) return e;
             for (var t = 0; t < e.hierarchy.length; t++) {
                 for (var r = 0; r < e.hierarchy[t].keys.length; r++)
                     if (0 > e.hierarchy[t].keys[r].time && (e.hierarchy[t].keys[r].time = 0), void 0 !== e.hierarchy[t].keys[r].rot && !(e.hierarchy[t].keys[r].rot instanceof THREE.Quaternion)) {
                         var i = e.hierarchy[t].keys[r].rot;
                         e.hierarchy[t].keys[r].rot = (new THREE.Quaternion).fromArray(i)
                     }
                 if (e.hierarchy[t].keys.length && void 0 !== e.hierarchy[t].keys[0].morphTargets) {
                     for (i = {}, r = 0; r < e.hierarchy[t].keys.length; r++)
                         for (var n = 0; n < e.hierarchy[t].keys[r].morphTargets.length; n++) {
                             var a = e.hierarchy[t].keys[r].morphTargets[n];
                             i[a] = -1
                         }
                     for (e.hierarchy[t].usedMorphTargets = i, r = 0; r < e.hierarchy[t].keys.length; r++) {
                         var o = {};
                         for (a in i) {
                             for (n = 0; n < e.hierarchy[t].keys[r].morphTargets.length; n++)
                                 if (e.hierarchy[t].keys[r].morphTargets[n] === a) {
                                     o[a] = e.hierarchy[t].keys[r].morphTargetsInfluences[n];
                                     break
                                 }
                             n === e.hierarchy[t].keys[r].morphTargets.length && (o[a] = 0)
                         }
                         e.hierarchy[t].keys[r].morphTargetsInfluences = o
                     }
                 }
                 for (r = 1; r < e.hierarchy[t].keys.length; r++) e.hierarchy[t].keys[r].time === e.hierarchy[t].keys[r - 1].time && (e.hierarchy[t].keys.splice(r, 1), r--);
                 for (r = 0; r < e.hierarchy[t].keys.length; r++) e.hierarchy[t].keys[r].index = r
             }
             return e.initialized = !0, e
         },
         parse: function(e) {
             var t = function(e, r) {
                     r.push(e);
                     for (var i = 0; i < e.children.length; i++) t(e.children[i], r)
                 },
                 r = [];
             if (e instanceof THREE.SkinnedMesh)
                 for (var i = 0; i < e.skeleton.bones.length; i++) r.push(e.skeleton.bones[i]);
             else t(e, r);
             return r
         },
         play: function(e) {
             -1 === this.animations.indexOf(e) && this.animations.push(e)
         },
         stop: function(e) {
             e = this.animations.indexOf(e), -1 !== e && this.animations.splice(e, 1)
         },
         update: function(e) {
             for (var t = 0; t < this.animations.length; t++) this.animations[t].resetBlendWeights();
             for (t = 0; t < this.animations.length; t++) this.animations[t].update(e)
         }
     }, THREE.Animation = function(e, t) {
         this.root = e, this.data = THREE.AnimationHandler.init(t), this.hierarchy = THREE.AnimationHandler.parse(e), this.currentTime = 0, this.timeScale = 1, this.isPlaying = !1, this.loop = !0, this.weight = 0, this.interpolationType = THREE.AnimationHandler.LINEAR
     }, THREE.Animation.prototype = {
         constructor: THREE.Animation,
         keyTypes: ["pos", "rot", "scl"],
         play: function(e, t) {
             this.currentTime = void 0 !== e ? e : 0, this.weight = void 0 !== t ? t : 1, this.isPlaying = !0, this.reset(), THREE.AnimationHandler.play(this)
         },
         stop: function() {
             this.isPlaying = !1, THREE.AnimationHandler.stop(this)
         },
         reset: function() {
             for (var e = 0, t = this.hierarchy.length; t > e; e++) {
                 var r = this.hierarchy[e];
                 void 0 === r.animationCache && (r.animationCache = {
                     animations: {},
                     blending: {
                         positionWeight: 0,
                         quaternionWeight: 0,
                         scaleWeight: 0
                     }
                 });
                 var i = this.data.name,
                     n = r.animationCache.animations,
                     a = n[i];
                 for (void 0 === a && (a = {
                         prevKey: {
                             pos: 0,
                             rot: 0,
                             scl: 0
                         },
                         nextKey: {
                             pos: 0,
                             rot: 0,
                             scl: 0
                         },
                         originalMatrix: r.matrix
                     }, n[i] = a), r = 0; 3 > r; r++) {
                     for (var i = this.keyTypes[r], n = this.data.hierarchy[e].keys[0], o = this.getNextKeyWith(i, e, 1); o.time < this.currentTime && o.index > n.index;) n = o, o = this.getNextKeyWith(i, e, o.index + 1);
                     a.prevKey[i] = n, a.nextKey[i] = o
                 }
             }
         },
         resetBlendWeights: function() {
             for (var e = 0, t = this.hierarchy.length; t > e; e++) {
                 var r = this.hierarchy[e].animationCache;
                 void 0 !== r && (r = r.blending, r.positionWeight = 0, r.quaternionWeight = 0, r.scaleWeight = 0)
             }
         },
         update: function() {
             var e = [],
                 t = new THREE.Vector3,
                 r = new THREE.Vector3,
                 i = new THREE.Quaternion,
                 n = function(e, t) {
                     var r = [],
                         i = [],
                         n, o, s, h, l, u;
                     return n = (e.length - 1) * t, o = Math.floor(n), n -= o, r[0] = 0 === o ? o : o - 1, r[1] = o, r[2] = o > e.length - 2 ? o : o + 1, r[3] = o > e.length - 3 ? o : o + 2, o = e[r[0]], h = e[r[1]], l = e[r[2]], u = e[r[3]], r = n * n, s = n * r, i[0] = a(o[0], h[0], l[0], u[0], n, r, s), i[1] = a(o[1], h[1], l[1], u[1], n, r, s), i[2] = a(o[2], h[2], l[2], u[2], n, r, s), i
                 },
                 a = function(e, t, r, i, n, a, o) {
                     return e = .5 * (r - e), i = .5 * (i - t), (2 * (t - r) + e + i) * o + (-3 * (t - r) - 2 * e - i) * a + e * n + t
                 };
             return function(a) {
                 if (!1 !== this.isPlaying && (this.currentTime += a * this.timeScale, 0 !== this.weight)) {
                     a = this.data.length, (this.currentTime > a || 0 > this.currentTime) && (this.loop ? (this.currentTime %= a, 0 > this.currentTime && (this.currentTime += a), this.reset()) : this.stop()), a = 0;
                     for (var o = this.hierarchy.length; o > a; a++)
                         for (var s = this.hierarchy[a], h = s.animationCache.animations[this.data.name], l = s.animationCache.blending, u = 0; 3 > u; u++) {
                             var c = this.keyTypes[u],
                                 d = h.prevKey[c],
                                 f = h.nextKey[c];
                             if (0 < this.timeScale && f.time <= this.currentTime || 0 > this.timeScale && d.time >= this.currentTime) {
                                 for (d = this.data.hierarchy[a].keys[0], f = this.getNextKeyWith(c, a, 1); f.time < this.currentTime && f.index > d.index;) d = f, f = this.getNextKeyWith(c, a, f.index + 1);
                                 h.prevKey[c] = d, h.nextKey[c] = f
                             }
                             var p = (this.currentTime - d.time) / (f.time - d.time),
                                 m = d[c],
                                 E = f[c];
                             0 > p && (p = 0), p > 1 && (p = 1), "pos" === c ? this.interpolationType === THREE.AnimationHandler.LINEAR ? (r.x = m[0] + (E[0] - m[0]) * p, r.y = m[1] + (E[1] - m[1]) * p, r.z = m[2] + (E[2] - m[2]) * p, d = this.weight / (this.weight + l.positionWeight), s.position.lerp(r, d), l.positionWeight += this.weight) : (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) && (e[0] = this.getPrevKeyWith("pos", a, d.index - 1).pos, e[1] = m, e[2] = E, e[3] = this.getNextKeyWith("pos", a, f.index + 1).pos, p = .33 * p + .33, f = n(e, p), d = this.weight / (this.weight + l.positionWeight), l.positionWeight += this.weight, c = s.position, c.x += (f[0] - c.x) * d, c.y += (f[1] - c.y) * d, c.z += (f[2] - c.z) * d, this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD && (p = n(e, 1.01 * p), t.set(p[0], p[1], p[2]), t.sub(c), t.y = 0, t.normalize(), p = Math.atan2(t.x, t.z), s.rotation.set(0, p, 0))) : "rot" === c ? (THREE.Quaternion.slerp(m, E, i, p), 0 === l.quaternionWeight ? (s.quaternion.copy(i), l.quaternionWeight = this.weight) : (d = this.weight / (this.weight + l.quaternionWeight), THREE.Quaternion.slerp(s.quaternion, i, s.quaternion, d), l.quaternionWeight += this.weight)) : "scl" === c && (r.x = m[0] + (E[0] - m[0]) * p, r.y = m[1] + (E[1] - m[1]) * p, r.z = m[2] + (E[2] - m[2]) * p, d = this.weight / (this.weight + l.scaleWeight), s.scale.lerp(r, d), l.scaleWeight += this.weight)
                         }
                     return !0
                 }
             }
         }(),
         getNextKeyWith: function(e, t, r) {
             var i = this.data.hierarchy[t].keys;
             for (r = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? r < i.length - 1 ? r : i.length - 1 : r % i.length; r < i.length; r++)
                 if (void 0 !== i[r][e]) return i[r];
             return this.data.hierarchy[t].keys[0]
         },
         getPrevKeyWith: function(e, t, r) {
             var i = this.data.hierarchy[t].keys;
             for (r = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? r > 0 ? r : 0 : r >= 0 ? r : r + i.length; r >= 0; r--)
                 if (void 0 !== i[r][e]) return i[r];
             return this.data.hierarchy[t].keys[i.length - 1]
         }
     }, THREE.KeyFrameAnimation = function(e) {
         this.root = e.node, this.data = THREE.AnimationHandler.init(e), this.hierarchy = THREE.AnimationHandler.parse(this.root), this.currentTime = 0, this.timeScale = .001, this.isPlaying = !1, this.loop = this.isPaused = !0, e = 0;
         for (var t = this.hierarchy.length; t > e; e++) {
             var r = this.data.hierarchy[e].sids,
                 i = this.hierarchy[e];
             if (this.data.hierarchy[e].keys.length && r) {
                 for (var n = 0; n < r.length; n++) {
                     var a = r[n],
                         o = this.getNextKeyWith(a, e, 0);
                     o && o.apply(a)
                 }
                 i.matrixAutoUpdate = !1, this.data.hierarchy[e].node.updateMatrix(), i.matrixWorldNeedsUpdate = !0
             }
         }
     }, THREE.KeyFrameAnimation.prototype = {
         constructor: THREE.KeyFrameAnimation,
         play: function(e) {
             if (this.currentTime = void 0 !== e ? e : 0, !1 === this.isPlaying) {
                 this.isPlaying = !0;
                 var t = this.hierarchy.length,
                     r, i;
                 for (e = 0; t > e; e++) r = this.hierarchy[e], i = this.data.hierarchy[e], void 0 === i.animationCache && (i.animationCache = {}, i.animationCache.prevKey = null, i.animationCache.nextKey = null, i.animationCache.originalMatrix = r.matrix), r = this.data.hierarchy[e].keys, r.length && (i.animationCache.prevKey = r[0], i.animationCache.nextKey = r[1], this.startTime = Math.min(r[0].time, this.startTime), this.endTime = Math.max(r[r.length - 1].time, this.endTime));
                 this.update(0)
             }
             this.isPaused = !1, THREE.AnimationHandler.play(this)
         },
         stop: function() {
             this.isPaused = this.isPlaying = !1, THREE.AnimationHandler.stop(this);
             for (var e = 0; e < this.data.hierarchy.length; e++) {
                 var t = this.hierarchy[e],
                     r = this.data.hierarchy[e];
                 if (void 0 !== r.animationCache) {
                     var i = r.animationCache.originalMatrix;
                     i.copy(t.matrix), t.matrix = i, delete r.animationCache
                 }
             }
         },
         update: function(e) {
             if (!1 !== this.isPlaying) {
                 this.currentTime += e * this.timeScale, e = this.data.length, !0 === this.loop && this.currentTime > e && (this.currentTime %= e), this.currentTime = Math.min(this.currentTime, e), e = 0;
                 for (var t = this.hierarchy.length; t > e; e++) {
                     var r = this.hierarchy[e],
                         i = this.data.hierarchy[e],
                         n = i.keys,
                         i = i.animationCache;
                     if (n.length) {
                         var a = i.prevKey,
                             o = i.nextKey;
                         if (o.time <= this.currentTime) {
                             for (; o.time < this.currentTime && o.index > a.index;) a = o, o = n[a.index + 1];
                             i.prevKey = a, i.nextKey = o
                         }
                         o.time >= this.currentTime ? a.interpolate(o, this.currentTime) : a.interpolate(o, o.time), this.data.hierarchy[e].node.updateMatrix(), r.matrixWorldNeedsUpdate = !0
                     }
                 }
             }
         },
         getNextKeyWith: function(e, t, r) {
             for (t = this.data.hierarchy[t].keys, r %= t.length; r < t.length; r++)
                 if (t[r].hasTarget(e)) return t[r];
             return t[0]
         },
         getPrevKeyWith: function(e, t, r) {
             for (t = this.data.hierarchy[t].keys, r = r >= 0 ? r : r + t.length; r >= 0; r--)
                 if (t[r].hasTarget(e)) return t[r];
             return t[t.length - 1]
         }
     }, THREE.MorphAnimation = function(e) {
         this.mesh = e, this.frames = e.morphTargetInfluences.length, this.currentTime = 0, this.duration = 1e3, this.loop = !0, this.currentFrame = this.lastFrame = 0, this.isPlaying = !1
     }, THREE.MorphAnimation.prototype = {
         constructor: THREE.MorphAnimation,
         play: function() {
             this.isPlaying = !0
         },
         pause: function() {
             this.isPlaying = !1
         },
         update: function(e) {
             if (!1 !== this.isPlaying) {
                 this.currentTime += e, !0 === this.loop && this.currentTime > this.duration && (this.currentTime %= this.duration), this.currentTime = Math.min(this.currentTime, this.duration), e = this.duration / this.frames;
                 var t = Math.floor(this.currentTime / e),
                     r = this.mesh.morphTargetInfluences;
                 t != this.currentFrame && (r[this.lastFrame] = 0, r[this.currentFrame] = 1, r[t] = 0, this.lastFrame = this.currentFrame, this.currentFrame = t), r[t] = this.currentTime % e / e, r[this.lastFrame] = 1 - r[t]
             }
         }
     }, THREE.BoxGeometry = function(e, t, r, i, n, a) {
         function o(e, t, r, i, n, a, o, h) {
             var l, u = s.widthSegments,
                 c = s.heightSegments,
                 d = n / 2,
                 f = a / 2,
                 p = s.vertices.length;
             "x" === e && "y" === t || "y" === e && "x" === t ? l = "z" : "x" === e && "z" === t || "z" === e && "x" === t ? (l = "y", c = s.depthSegments) : ("z" === e && "y" === t || "y" === e && "z" === t) && (l = "x", u = s.depthSegments);
             var m = u + 1,
                 E = c + 1,
                 g = n / u,
                 v = a / c,
                 y = new THREE.Vector3;
             for (y[l] = o > 0 ? 1 : -1, n = 0; E > n; n++)
                 for (a = 0; m > a; a++) {
                     var T = new THREE.Vector3;
                     T[e] = (a * g - d) * r, T[t] = (n * v - f) * i, T[l] = o, s.vertices.push(T)
                 }
             for (n = 0; c > n; n++)
                 for (a = 0; u > a; a++) f = a + m * n, e = a + m * (n + 1), t = a + 1 + m * (n + 1), r = a + 1 + m * n, i = new THREE.Vector2(a / u, 1 - n / c), o = new THREE.Vector2(a / u, 1 - (n + 1) / c), l = new THREE.Vector2((a + 1) / u, 1 - (n + 1) / c), d = new THREE.Vector2((a + 1) / u, 1 - n / c), f = new THREE.Face3(f + p, e + p, r + p), f.normal.copy(y), f.vertexNormals.push(y.clone(), y.clone(), y.clone()), f.materialIndex = h, s.faces.push(f), s.faceVertexUvs[0].push([i, o, d]), f = new THREE.Face3(e + p, t + p, r + p), f.normal.copy(y), f.vertexNormals.push(y.clone(), y.clone(), y.clone()), f.materialIndex = h, s.faces.push(f), s.faceVertexUvs[0].push([o.clone(), l, d.clone()])
         }
         THREE.Geometry.call(this), this.type = "BoxGeometry", this.parameters = {
             width: e,
             height: t,
             depth: r,
             widthSegments: i,
             heightSegments: n,
             depthSegments: a
         }, this.widthSegments = i || 1, this.heightSegments = n || 1, this.depthSegments = a || 1;
         var s = this;
         i = e / 2, n = t / 2, a = r / 2, o("z", "y", -1, -1, r, t, i, 0), o("z", "y", 1, -1, r, t, -i, 1), o("x", "z", 1, 1, e, r, n, 2), o("x", "z", 1, -1, e, r, -n, 3), o("x", "y", 1, -1, e, t, a, 4), o("x", "y", -1, -1, e, t, -a, 5), this.mergeVertices()
     }, THREE.BoxGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.BoxGeometry.prototype.constructor = THREE.BoxGeometry, THREE.CircleGeometry = function(e, t, r, i) {
         THREE.Geometry.call(this), this.type = "CircleGeometry", this.parameters = {
             radius: e,
             segments: t,
             thetaStart: r,
             thetaLength: i
         }, e = e || 50, t = void 0 !== t ? Math.max(3, t) : 8, r = void 0 !== r ? r : 0, i = void 0 !== i ? i : 2 * Math.PI;
         var n, a = [];
         n = new THREE.Vector3;
         var o = new THREE.Vector2(.5, .5);
         for (this.vertices.push(n), a.push(o), n = 0; t >= n; n++) {
             var s = new THREE.Vector3,
                 h = r + n / t * i;
             s.x = e * Math.cos(h), s.y = e * Math.sin(h), this.vertices.push(s), a.push(new THREE.Vector2((s.x / e + 1) / 2, (s.y / e + 1) / 2))
         }
         for (r = new THREE.Vector3(0, 0, 1), n = 1; t >= n; n++) this.faces.push(new THREE.Face3(n, n + 1, 0, [r.clone(), r.clone(), r.clone()])), this.faceVertexUvs[0].push([a[n].clone(), a[n + 1].clone(), o.clone()]);
         this.computeFaceNormals(), this.boundingSphere = new THREE.Sphere(new THREE.Vector3, e)
     }, THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.CircleGeometry.prototype.constructor = THREE.CircleGeometry, THREE.CubeGeometry = function(e, t, r, i, n, a) {
         return THREE.warn("THREE.CubeGeometry has been renamed to THREE.BoxGeometry."), new THREE.BoxGeometry(e, t, r, i, n, a)
     }, THREE.CylinderGeometry = function(e, t, r, i, n, a, o, s) {
         THREE.Geometry.call(this), this.type = "CylinderGeometry", this.parameters = {
             radiusTop: e,
             radiusBottom: t,
             height: r,
             radialSegments: i,
             heightSegments: n,
             openEnded: a,
             thetaStart: o,
             thetaLength: s
         }, e = void 0 !== e ? e : 20, t = void 0 !== t ? t : 20, r = void 0 !== r ? r : 100, i = i || 8, n = n || 1, a = void 0 !== a ? a : !1, o = void 0 !== o ? o : 0, s = void 0 !== s ? s : 2 * Math.PI;
         var h = r / 2,
             l, u, c = [],
             d = [];
         for (u = 0; n >= u; u++) {
             var f = [],
                 p = [],
                 m = u / n,
                 E = m * (t - e) + e;
             for (l = 0; i >= l; l++) {
                 var g = l / i,
                     v = new THREE.Vector3;
                 v.x = E * Math.sin(g * s + o), v.y = -m * r + h, v.z = E * Math.cos(g * s + o), this.vertices.push(v), f.push(this.vertices.length - 1), p.push(new THREE.Vector2(g, 1 - m))
             }
             c.push(f), d.push(p)
         }
         for (r = (t - e) / r, l = 0; i > l; l++)
             for (0 !== e ? (o = this.vertices[c[0][l]].clone(), s = this.vertices[c[0][l + 1]].clone()) : (o = this.vertices[c[1][l]].clone(), s = this.vertices[c[1][l + 1]].clone()), o.setY(Math.sqrt(o.x * o.x + o.z * o.z) * r).normalize(), s.setY(Math.sqrt(s.x * s.x + s.z * s.z) * r).normalize(), u = 0; n > u; u++) {
                 var f = c[u][l],
                     p = c[u + 1][l],
                     m = c[u + 1][l + 1],
                     E = c[u][l + 1],
                     g = o.clone(),
                     v = o.clone(),
                     y = s.clone(),
                     T = s.clone(),
                     R = d[u][l].clone(),
                     x = d[u + 1][l].clone(),
                     H = d[u + 1][l + 1].clone(),
                     _ = d[u][l + 1].clone();
                 this.faces.push(new THREE.Face3(f, p, E, [g, v, T])), this.faceVertexUvs[0].push([R, x, _]), this.faces.push(new THREE.Face3(p, m, E, [v.clone(), y, T.clone()])), this.faceVertexUvs[0].push([x.clone(), H, _.clone()])
             }
         if (!1 === a && e > 0)
             for (this.vertices.push(new THREE.Vector3(0, h, 0)), l = 0; i > l; l++) f = c[0][l], p = c[0][l + 1], m = this.vertices.length - 1, g = new THREE.Vector3(0, 1, 0), v = new THREE.Vector3(0, 1, 0), y = new THREE.Vector3(0, 1, 0), R = d[0][l].clone(), x = d[0][l + 1].clone(), H = new THREE.Vector2(x.x, 0), this.faces.push(new THREE.Face3(f, p, m, [g, v, y])), this.faceVertexUvs[0].push([R, x, H]);
         if (!1 === a && t > 0)
             for (this.vertices.push(new THREE.Vector3(0, -h, 0)), l = 0; i > l; l++) f = c[n][l + 1], p = c[n][l], m = this.vertices.length - 1, g = new THREE.Vector3(0, -1, 0), v = new THREE.Vector3(0, -1, 0), y = new THREE.Vector3(0, -1, 0), R = d[n][l + 1].clone(), x = d[n][l].clone(), H = new THREE.Vector2(x.x, 1), this.faces.push(new THREE.Face3(f, p, m, [g, v, y])), this.faceVertexUvs[0].push([R, x, H]);
         this.computeFaceNormals()
     }, THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.CylinderGeometry.prototype.constructor = THREE.CylinderGeometry, THREE.ExtrudeGeometry = function(e, t) {
         "undefined" != typeof e && (THREE.Geometry.call(this), this.type = "ExtrudeGeometry", e = e instanceof Array ? e : [e], this.addShapeList(e, t), this.computeFaceNormals())
     }, THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.ExtrudeGeometry.prototype.constructor = THREE.ExtrudeGeometry, THREE.ExtrudeGeometry.prototype.addShapeList = function(e, t) {
         for (var r = e.length, i = 0; r > i; i++) this.addShape(e[i], t)
     }, THREE.ExtrudeGeometry.prototype.addShape = function(e, t) {
         function r(e, t, r) {
             return t || THREE.error("THREE.ExtrudeGeometry: vec does not exist"), t.clone().multiplyScalar(r).add(e)
         }

         function i(e, t, r) {
             var i = 1,
                 i = e.x - t.x,
                 n = e.y - t.y,
                 a = r.x - e.x,
                 o = r.y - e.y,
                 s = i * i + n * n;
             if (1e-10 < Math.abs(i * o - n * a)) {
                 var h = Math.sqrt(s),
                     l = Math.sqrt(a * a + o * o),
                     s = t.x - n / h;
                 if (t = t.y + i / h, a = ((r.x - o / l - s) * o - (r.y + a / l - t) * a) / (i * o - n * a), r = s + i * a - e.x, e = t + n * a - e.y, i = r * r + e * e, 2 >= i) return new THREE.Vector2(r, e);
                 i = Math.sqrt(i / 2)
             } else e = !1, i > 1e-10 ? a > 1e-10 && (e = !0) : -1e-10 > i ? -1e-10 > a && (e = !0) : Math.sign(n) == Math.sign(o) && (e = !0), e ? (r = -n, e = i, i = Math.sqrt(s)) : (r = i, e = n, i = Math.sqrt(s / 2));
             return new THREE.Vector2(r / i, e / i)
         }

         function n(e, t) {
             var r, i;
             for (U = e.length; 0 <= --U;) {
                 r = U, i = U - 1, 0 > i && (i = e.length - 1);
                 for (var n = 0, a = f + 2 * u, n = 0; a > n; n++) {
                     var o = N * n,
                         s = N * (n + 1),
                         h = t + r + o,
                         o = t + i + o,
                         l = t + i + s,
                         s = t + r + s,
                         h = h + S,
                         o = o + S,
                         l = l + S,
                         s = s + S;
                     M.faces.push(new THREE.Face3(h, o, s, null, null, v)), M.faces.push(new THREE.Face3(o, l, s, null, null, v)), h = y.generateSideWallUV(M, h, o, l, s), M.faceVertexUvs[0].push([h[0], h[1], h[3]]), M.faceVertexUvs[0].push([h[1], h[2], h[3]])
                 }
             }
         }

         function a(e, t, r) {
             M.vertices.push(new THREE.Vector3(e, t, r))
         }

         function o(e, t, r) {
             e += S, t += S, r += S, M.faces.push(new THREE.Face3(e, t, r, null, null, g)), e = y.generateTopUV(M, e, t, r), M.faceVertexUvs[0].push(e)
         }
         var s = void 0 !== t.amount ? t.amount : 100,
             h = void 0 !== t.bevelThickness ? t.bevelThickness : 6,
             l = void 0 !== t.bevelSize ? t.bevelSize : h - 2,
             u = void 0 !== t.bevelSegments ? t.bevelSegments : 3,
             c = void 0 !== t.bevelEnabled ? t.bevelEnabled : !0,
             d = void 0 !== t.curveSegments ? t.curveSegments : 12,
             f = void 0 !== t.steps ? t.steps : 1,
             p = t.extrudePath,
             m, E = !1,
             g = t.material,
             v = t.extrudeMaterial,
             y = void 0 !== t.UVGenerator ? t.UVGenerator : THREE.ExtrudeGeometry.WorldUVGenerator,
             T, R, x, H;
         p && (m = p.getSpacedPoints(f), E = !0, c = !1, T = void 0 !== t.frames ? t.frames : new THREE.TubeGeometry.FrenetFrames(p, f, !1), R = new THREE.Vector3, x = new THREE.Vector3, H = new THREE.Vector3), c || (l = h = u = 0);
         var _, b, w, M = this,
             S = this.vertices.length,
             p = e.extractPoints(d),
             d = p.shape,
             C = p.holes;
         if (p = !THREE.Shape.Utils.isClockWise(d)) {
             for (d = d.reverse(), b = 0, w = C.length; w > b; b++) _ = C[b], THREE.Shape.Utils.isClockWise(_) && (C[b] = _.reverse());
             p = !1
         }
         var A = THREE.Shape.Utils.triangulateShape(d, C),
             L = d;
         for (b = 0, w = C.length; w > b; b++) _ = C[b], d = d.concat(_);
         var P, D, F, k, B, N = d.length,
             I, O = A.length,
             p = [],
             U = 0;
         for (F = L.length, P = F - 1, D = U + 1; F > U; U++, P++, D++) P === F && (P = 0), D === F && (D = 0), p[U] = i(L[U], L[P], L[D]);
         var V = [],
             z, G = p.concat();
         for (b = 0, w = C.length; w > b; b++) {
             for (_ = C[b], z = [], U = 0, F = _.length, P = F - 1, D = U + 1; F > U; U++, P++, D++) P === F && (P = 0), D === F && (D = 0), z[U] = i(_[U], _[P], _[D]);
             V.push(z), G = G.concat(z)
         }
         for (P = 0; u > P; P++) {
             for (F = P / u, k = h * (1 - F), D = l * Math.sin(F * Math.PI / 2), U = 0, F = L.length; F > U; U++) B = r(L[U], p[U], D), a(B.x, B.y, -k);
             for (b = 0, w = C.length; w > b; b++)
                 for (_ = C[b], z = V[b], U = 0, F = _.length; F > U; U++) B = r(_[U], z[U], D), a(B.x, B.y, -k)
         }
         for (D = l, U = 0; N > U; U++) B = c ? r(d[U], G[U], D) : d[U], E ? (x.copy(T.normals[0]).multiplyScalar(B.x), R.copy(T.binormals[0]).multiplyScalar(B.y), H.copy(m[0]).add(x).add(R), a(H.x, H.y, H.z)) : a(B.x, B.y, 0);
         for (F = 1; f >= F; F++)
             for (U = 0; N > U; U++) B = c ? r(d[U], G[U], D) : d[U], E ? (x.copy(T.normals[F]).multiplyScalar(B.x), R.copy(T.binormals[F]).multiplyScalar(B.y), H.copy(m[F]).add(x).add(R), a(H.x, H.y, H.z)) : a(B.x, B.y, s / f * F);
         for (P = u - 1; P >= 0; P--) {
             for (F = P / u, k = h * (1 - F), D = l * Math.sin(F * Math.PI / 2), U = 0, F = L.length; F > U; U++) B = r(L[U], p[U], D), a(B.x, B.y, s + k);
             for (b = 0, w = C.length; w > b; b++)
                 for (_ = C[b], z = V[b], U = 0, F = _.length; F > U; U++) B = r(_[U], z[U], D), E ? a(B.x, B.y + m[f - 1].y, m[f - 1].x + k) : a(B.x, B.y, s + k)
         }! function() {
             if (c) {
                 var e;
                 for (e = 0 * N, U = 0; O > U; U++) I = A[U], o(I[2] + e, I[1] + e, I[0] + e);
                 for (e = f + 2 * u, e *= N, U = 0; O > U; U++) I = A[U], o(I[0] + e, I[1] + e, I[2] + e)
             } else {
                 for (U = 0; O > U; U++) I = A[U], o(I[2], I[1], I[0]);
                 for (U = 0; O > U; U++) I = A[U], o(I[0] + N * f, I[1] + N * f, I[2] + N * f)
             }
         }(),
         function() {
             var e = 0;
             for (n(L, e), e += L.length, b = 0, w = C.length; w > b; b++) _ = C[b], n(_, e), e += _.length
         }()
     }, THREE.ExtrudeGeometry.WorldUVGenerator = {
         generateTopUV: function(e, t, r, i) {
             return e = e.vertices, t = e[t], r = e[r], i = e[i], [new THREE.Vector2(t.x, t.y), new THREE.Vector2(r.x, r.y), new THREE.Vector2(i.x, i.y)]
         },
         generateSideWallUV: function(e, t, r, i, n) {
             return e = e.vertices, t = e[t], r = e[r], i = e[i], n = e[n], .01 > Math.abs(t.y - r.y) ? [new THREE.Vector2(t.x, 1 - t.z), new THREE.Vector2(r.x, 1 - r.z), new THREE.Vector2(i.x, 1 - i.z), new THREE.Vector2(n.x, 1 - n.z)] : [new THREE.Vector2(t.y, 1 - t.z), new THREE.Vector2(r.y, 1 - r.z), new THREE.Vector2(i.y, 1 - i.z), new THREE.Vector2(n.y, 1 - n.z)]
         }
     }, THREE.ShapeGeometry = function(e, t) {
         THREE.Geometry.call(this), this.type = "ShapeGeometry", !1 == e instanceof Array && (e = [e]), this.addShapeList(e, t), this.computeFaceNormals()
     }, THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.ShapeGeometry.prototype.constructor = THREE.ShapeGeometry, THREE.ShapeGeometry.prototype.addShapeList = function(e, t) {
         for (var r = 0, i = e.length; i > r; r++) this.addShape(e[r], t);
         return this
     }, THREE.ShapeGeometry.prototype.addShape = function(e, t) {
         void 0 === t && (t = {});
         var r = t.material,
             i = void 0 === t.UVGenerator ? THREE.ExtrudeGeometry.WorldUVGenerator : t.UVGenerator,
             n, a, o, s = this.vertices.length;
         n = e.extractPoints(void 0 !== t.curveSegments ? t.curveSegments : 12);
         var h = n.shape,
             l = n.holes;
         if (!THREE.Shape.Utils.isClockWise(h))
             for (h = h.reverse(), n = 0, a = l.length; a > n; n++) o = l[n], THREE.Shape.Utils.isClockWise(o) && (l[n] = o.reverse());
         var u = THREE.Shape.Utils.triangulateShape(h, l);
         for (n = 0, a = l.length; a > n; n++) o = l[n], h = h.concat(o);
         for (l = h.length, a = u.length, n = 0; l > n; n++) o = h[n], this.vertices.push(new THREE.Vector3(o.x, o.y, 0));
         for (n = 0; a > n; n++) l = u[n], h = l[0] + s, o = l[1] + s, l = l[2] + s, this.faces.push(new THREE.Face3(h, o, l, null, null, r)), this.faceVertexUvs[0].push(i.generateTopUV(this, h, o, l))
     }, THREE.LatheGeometry = function(e, t, r, i) {
         THREE.Geometry.call(this), this.type = "LatheGeometry", this.parameters = {
             points: e,
             segments: t,
             phiStart: r,
             phiLength: i
         }, t = t || 12, r = r || 0, i = i || 2 * Math.PI;
         for (var n = 1 / (e.length - 1), a = 1 / t, o = 0, s = t; s >= o; o++)
             for (var h = r + o * a * i, l = Math.cos(h), u = Math.sin(h), h = 0, c = e.length; c > h; h++) {
                 var d = e[h],
                     f = new THREE.Vector3;
                 f.x = l * d.x - u * d.y, f.y = u * d.x + l * d.y, f.z = d.z, this.vertices.push(f)
             }
         for (r = e.length, o = 0, s = t; s > o; o++)
             for (h = 0, c = e.length - 1; c > h; h++) {
                 t = u = h + r * o, i = u + r;
                 var l = u + 1 + r,
                     u = u + 1,
                     d = o * a,
                     f = h * n,
                     p = d + a,
                     m = f + n;
                 this.faces.push(new THREE.Face3(t, i, u)), this.faceVertexUvs[0].push([new THREE.Vector2(d, f), new THREE.Vector2(p, f), new THREE.Vector2(d, m)]), this.faces.push(new THREE.Face3(i, l, u)), this.faceVertexUvs[0].push([new THREE.Vector2(p, f), new THREE.Vector2(p, m), new THREE.Vector2(d, m)])
             }
         this.mergeVertices(), this.computeFaceNormals(), this.computeVertexNormals()
     }, THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.LatheGeometry.prototype.constructor = THREE.LatheGeometry, THREE.PlaneGeometry = function(e, t, r, i) {
         console.info("THREE.PlaneGeometry: Consider using THREE.PlaneBufferGeometry for lower memory footprint."), THREE.Geometry.call(this), this.type = "PlaneGeometry", this.parameters = {
             width: e,
             height: t,
             widthSegments: r,
             heightSegments: i
         }, this.fromBufferGeometry(new THREE.PlaneBufferGeometry(e, t, r, i))
     }, THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.PlaneGeometry.prototype.constructor = THREE.PlaneGeometry, THREE.PlaneBufferGeometry = function(e, t, r, i) {
         THREE.BufferGeometry.call(this), this.type = "PlaneBufferGeometry", this.parameters = {
             width: e,
             height: t,
             widthSegments: r,
             heightSegments: i
         };
         var n = e / 2,
             a = t / 2;
         r = r || 1, i = i || 1;
         var o = r + 1,
             s = i + 1,
             h = e / r,
             l = t / i;
         t = new Float32Array(o * s * 3), e = new Float32Array(o * s * 3);
         for (var u = new Float32Array(o * s * 2), c = 0, d = 0, f = 0; s > f; f++)
             for (var p = f * l - a, m = 0; o > m; m++) t[c] = m * h - n, t[c + 1] = -p, e[c + 2] = 1, u[d] = m / r, u[d + 1] = 1 - f / i, c += 3, d += 2;
         for (c = 0, n = new(65535 < t.length / 3 ? Uint32Array : Uint16Array)(r * i * 6), f = 0; i > f; f++)
             for (m = 0; r > m; m++) a = m + o * (f + 1), s = m + 1 + o * (f + 1), h = m + 1 + o * f, n[c] = m + o * f, n[c + 1] = a, n[c + 2] = h, n[c + 3] = a, n[c + 4] = s, n[c + 5] = h, c += 6;
         this.addAttribute("index", new THREE.BufferAttribute(n, 1)), this.addAttribute("position", new THREE.BufferAttribute(t, 3)), this.addAttribute("normal", new THREE.BufferAttribute(e, 3)), this.addAttribute("uv", new THREE.BufferAttribute(u, 2))
     }, THREE.PlaneBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype), THREE.PlaneBufferGeometry.prototype.constructor = THREE.PlaneBufferGeometry, THREE.RingGeometry = function(e, t, r, i, n, a) {
         THREE.Geometry.call(this), this.type = "RingGeometry", this.parameters = {
             innerRadius: e,
             outerRadius: t,
             thetaSegments: r,
             phiSegments: i,
             thetaStart: n,
             thetaLength: a
         }, e = e || 0, t = t || 50, n = void 0 !== n ? n : 0, a = void 0 !== a ? a : 2 * Math.PI, r = void 0 !== r ? Math.max(3, r) : 8, i = void 0 !== i ? Math.max(1, i) : 8;
         var o, s = [],
             h = e,
             l = (t - e) / i;
         for (e = 0; i + 1 > e; e++) {
             for (o = 0; r + 1 > o; o++) {
                 var u = new THREE.Vector3,
                     c = n + o / r * a;
                 u.x = h * Math.cos(c), u.y = h * Math.sin(c), this.vertices.push(u), s.push(new THREE.Vector2((u.x / t + 1) / 2, (u.y / t + 1) / 2))
             }
             h += l
         }
         for (t = new THREE.Vector3(0, 0, 1), e = 0; i > e; e++)
             for (n = e * (r + 1), o = 0; r > o; o++) a = c = o + n, l = c + r + 1, u = c + r + 2, this.faces.push(new THREE.Face3(a, l, u, [t.clone(), t.clone(), t.clone()])), this.faceVertexUvs[0].push([s[a].clone(), s[l].clone(), s[u].clone()]), a = c, l = c + r + 2, u = c + 1, this.faces.push(new THREE.Face3(a, l, u, [t.clone(), t.clone(), t.clone()])), this.faceVertexUvs[0].push([s[a].clone(), s[l].clone(), s[u].clone()]);
         this.computeFaceNormals(), this.boundingSphere = new THREE.Sphere(new THREE.Vector3, h)
     }, THREE.RingGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.RingGeometry.prototype.constructor = THREE.RingGeometry, THREE.SphereGeometry = function(e, t, r, i, n, a, o) {
         THREE.Geometry.call(this), this.type = "SphereGeometry", this.parameters = {
             radius: e,
             widthSegments: t,
             heightSegments: r,
             phiStart: i,
             phiLength: n,
             thetaStart: a,
             thetaLength: o
         }, e = e || 50, t = Math.max(3, Math.floor(t) || 8), r = Math.max(2, Math.floor(r) || 6), i = void 0 !== i ? i : 0, n = void 0 !== n ? n : 2 * Math.PI, a = void 0 !== a ? a : 0, o = void 0 !== o ? o : Math.PI;
         var s, h, l = [],
             u = [];
         for (h = 0; r >= h; h++) {
             var c = [],
                 d = [];
             for (s = 0; t >= s; s++) {
                 var f = s / t,
                     p = h / r,
                     m = new THREE.Vector3;
                 m.x = -e * Math.cos(i + f * n) * Math.sin(a + p * o), m.y = e * Math.cos(a + p * o), m.z = e * Math.sin(i + f * n) * Math.sin(a + p * o), this.vertices.push(m), c.push(this.vertices.length - 1), d.push(new THREE.Vector2(f, 1 - p))
             }
             l.push(c), u.push(d);
         }
         for (h = 0; r > h; h++)
             for (s = 0; t > s; s++) {
                 i = l[h][s + 1], n = l[h][s], a = l[h + 1][s], o = l[h + 1][s + 1];
                 var c = this.vertices[i].clone().normalize(),
                     d = this.vertices[n].clone().normalize(),
                     f = this.vertices[a].clone().normalize(),
                     p = this.vertices[o].clone().normalize(),
                     m = u[h][s + 1].clone(),
                     E = u[h][s].clone(),
                     g = u[h + 1][s].clone(),
                     v = u[h + 1][s + 1].clone();
                 Math.abs(this.vertices[i].y) === e ? (m.x = (m.x + E.x) / 2, this.faces.push(new THREE.Face3(i, a, o, [c, f, p])), this.faceVertexUvs[0].push([m, g, v])) : Math.abs(this.vertices[a].y) === e ? (g.x = (g.x + v.x) / 2, this.faces.push(new THREE.Face3(i, n, a, [c, d, f])), this.faceVertexUvs[0].push([m, E, g])) : (this.faces.push(new THREE.Face3(i, n, o, [c, d, p])), this.faceVertexUvs[0].push([m, E, v]), this.faces.push(new THREE.Face3(n, a, o, [d.clone(), f, p.clone()])), this.faceVertexUvs[0].push([E.clone(), g, v.clone()]))
             }
         this.computeFaceNormals(), this.boundingSphere = new THREE.Sphere(new THREE.Vector3, e)
     }, THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.SphereGeometry.prototype.constructor = THREE.SphereGeometry, THREE.TextGeometry = function(e, t) {
         t = t || {};
         var r = THREE.FontUtils.generateShapes(e, t);
         t.amount = void 0 !== t.height ? t.height : 50, void 0 === t.bevelThickness && (t.bevelThickness = 10), void 0 === t.bevelSize && (t.bevelSize = 8), void 0 === t.bevelEnabled && (t.bevelEnabled = !1), THREE.ExtrudeGeometry.call(this, r, t), this.type = "TextGeometry"
     }, THREE.TextGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype), THREE.TextGeometry.prototype.constructor = THREE.TextGeometry, THREE.TorusGeometry = function(e, t, r, i, n) {
         THREE.Geometry.call(this), this.type = "TorusGeometry", this.parameters = {
             radius: e,
             tube: t,
             radialSegments: r,
             tubularSegments: i,
             arc: n
         }, e = e || 100, t = t || 40, r = r || 8, i = i || 6, n = n || 2 * Math.PI;
         for (var a = new THREE.Vector3, o = [], s = [], h = 0; r >= h; h++)
             for (var l = 0; i >= l; l++) {
                 var u = l / i * n,
                     c = h / r * Math.PI * 2;
                 a.x = e * Math.cos(u), a.y = e * Math.sin(u);
                 var d = new THREE.Vector3;
                 d.x = (e + t * Math.cos(c)) * Math.cos(u), d.y = (e + t * Math.cos(c)) * Math.sin(u), d.z = t * Math.sin(c), this.vertices.push(d), o.push(new THREE.Vector2(l / i, h / r)), s.push(d.clone().sub(a).normalize())
             }
         for (h = 1; r >= h; h++)
             for (l = 1; i >= l; l++) e = (i + 1) * h + l - 1, t = (i + 1) * (h - 1) + l - 1, n = (i + 1) * (h - 1) + l, a = (i + 1) * h + l, u = new THREE.Face3(e, t, a, [s[e].clone(), s[t].clone(), s[a].clone()]), this.faces.push(u), this.faceVertexUvs[0].push([o[e].clone(), o[t].clone(), o[a].clone()]), u = new THREE.Face3(t, n, a, [s[t].clone(), s[n].clone(), s[a].clone()]), this.faces.push(u), this.faceVertexUvs[0].push([o[t].clone(), o[n].clone(), o[a].clone()]);
         this.computeFaceNormals()
     }, THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.TorusGeometry.prototype.constructor = THREE.TorusGeometry, THREE.TorusKnotGeometry = function(e, t, r, i, n, a, o) {
         function s(e, t, r, i, n) {
             var a = Math.cos(e),
                 o = Math.sin(e);
             return e *= t / r, t = Math.cos(e), a *= i * (2 + t) * .5, o = i * (2 + t) * o * .5, i = n * i * Math.sin(e) * .5, new THREE.Vector3(a, o, i)
         }
         THREE.Geometry.call(this), this.type = "TorusKnotGeometry", this.parameters = {
             radius: e,
             tube: t,
             radialSegments: r,
             tubularSegments: i,
             p: n,
             q: a,
             heightScale: o
         }, e = e || 100, t = t || 40, r = r || 64, i = i || 8, n = n || 2, a = a || 3, o = o || 1;
         for (var h = Array(r), l = new THREE.Vector3, u = new THREE.Vector3, c = new THREE.Vector3, d = 0; r > d; ++d) {
             h[d] = Array(i);
             var f = d / r * 2 * n * Math.PI,
                 p = s(f, a, n, e, o),
                 f = s(f + .01, a, n, e, o);
             for (l.subVectors(f, p), u.addVectors(f, p), c.crossVectors(l, u), u.crossVectors(c, l), c.normalize(), u.normalize(), f = 0; i > f; ++f) {
                 var m = f / i * 2 * Math.PI,
                     E = -t * Math.cos(m),
                     m = t * Math.sin(m),
                     g = new THREE.Vector3;
                 g.x = p.x + E * u.x + m * c.x, g.y = p.y + E * u.y + m * c.y, g.z = p.z + E * u.z + m * c.z, h[d][f] = this.vertices.push(g) - 1
             }
         }
         for (d = 0; r > d; ++d)
             for (f = 0; i > f; ++f) n = (d + 1) % r, a = (f + 1) % i, e = h[d][f], t = h[n][f], n = h[n][a], a = h[d][a], o = new THREE.Vector2(d / r, f / i), l = new THREE.Vector2((d + 1) / r, f / i), u = new THREE.Vector2((d + 1) / r, (f + 1) / i), c = new THREE.Vector2(d / r, (f + 1) / i), this.faces.push(new THREE.Face3(e, t, a)), this.faceVertexUvs[0].push([o, l, c]), this.faces.push(new THREE.Face3(t, n, a)), this.faceVertexUvs[0].push([l.clone(), u, c.clone()]);
         this.computeFaceNormals(), this.computeVertexNormals()
     }, THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.TorusKnotGeometry.prototype.constructor = THREE.TorusKnotGeometry, THREE.TubeGeometry = function(e, t, r, i, n, a) {
         THREE.Geometry.call(this), this.type = "TubeGeometry", this.parameters = {
             path: e,
             segments: t,
             radius: r,
             radialSegments: i,
             closed: n
         }, t = t || 64, r = r || 1, i = i || 8, n = n || !1, a = a || THREE.TubeGeometry.NoTaper;
         var o = [],
             s, h, l = t + 1,
             u, c, d, f, p, m = new THREE.Vector3,
             E, g, v;
         for (E = new THREE.TubeGeometry.FrenetFrames(e, t, n), g = E.normals, v = E.binormals, this.tangents = E.tangents, this.normals = g, this.binormals = v, E = 0; l > E; E++)
             for (o[E] = [], u = E / (l - 1), p = e.getPointAt(u), s = g[E], h = v[E], d = r * a(u), u = 0; i > u; u++) c = u / i * 2 * Math.PI, f = -d * Math.cos(c), c = d * Math.sin(c), m.copy(p), m.x += f * s.x + c * h.x, m.y += f * s.y + c * h.y, m.z += f * s.z + c * h.z, o[E][u] = this.vertices.push(new THREE.Vector3(m.x, m.y, m.z)) - 1;
         for (E = 0; t > E; E++)
             for (u = 0; i > u; u++) a = n ? (E + 1) % t : E + 1, l = (u + 1) % i, e = o[E][u], r = o[a][u], a = o[a][l], l = o[E][l], m = new THREE.Vector2(E / t, u / i), g = new THREE.Vector2((E + 1) / t, u / i), v = new THREE.Vector2((E + 1) / t, (u + 1) / i), s = new THREE.Vector2(E / t, (u + 1) / i), this.faces.push(new THREE.Face3(e, r, l)), this.faceVertexUvs[0].push([m, g, s]), this.faces.push(new THREE.Face3(r, a, l)), this.faceVertexUvs[0].push([g.clone(), v, s.clone()]);
         this.computeFaceNormals(), this.computeVertexNormals()
     }, THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.TubeGeometry.prototype.constructor = THREE.TubeGeometry, THREE.TubeGeometry.NoTaper = function(e) {
         return 1
     }, THREE.TubeGeometry.SinusoidalTaper = function(e) {
         return Math.sin(Math.PI * e)
     }, THREE.TubeGeometry.FrenetFrames = function(e, t, r) {
         var i = new THREE.Vector3,
             n = [],
             a = [],
             o = [],
             s = new THREE.Vector3,
             h = new THREE.Matrix4;
         t += 1;
         var l, u, c;
         for (this.tangents = n, this.normals = a, this.binormals = o, l = 0; t > l; l++) u = l / (t - 1), n[l] = e.getTangentAt(u), n[l].normalize();
         for (a[0] = new THREE.Vector3, o[0] = new THREE.Vector3, e = Number.MAX_VALUE, l = Math.abs(n[0].x), u = Math.abs(n[0].y), c = Math.abs(n[0].z), e >= l && (e = l, i.set(1, 0, 0)), e >= u && (e = u, i.set(0, 1, 0)), e >= c && i.set(0, 0, 1), s.crossVectors(n[0], i).normalize(), a[0].crossVectors(n[0], s), o[0].crossVectors(n[0], a[0]), l = 1; t > l; l++) a[l] = a[l - 1].clone(), o[l] = o[l - 1].clone(), s.crossVectors(n[l - 1], n[l]), 1e-4 < s.length() && (s.normalize(), i = Math.acos(THREE.Math.clamp(n[l - 1].dot(n[l]), -1, 1)), a[l].applyMatrix4(h.makeRotationAxis(s, i))), o[l].crossVectors(n[l], a[l]);
         if (r)
             for (i = Math.acos(THREE.Math.clamp(a[0].dot(a[t - 1]), -1, 1)), i /= t - 1, 0 < n[0].dot(s.crossVectors(a[0], a[t - 1])) && (i = -i), l = 1; t > l; l++) a[l].applyMatrix4(h.makeRotationAxis(n[l], i * l)), o[l].crossVectors(n[l], a[l])
     }, THREE.PolyhedronGeometry = function(e, t, r, i) {
         function n(e) {
             var t = e.normalize().clone();
             t.index = h.vertices.push(t) - 1;
             var r = Math.atan2(e.z, -e.x) / 2 / Math.PI + .5;
             return e = Math.atan2(-e.y, Math.sqrt(e.x * e.x + e.z * e.z)) / Math.PI + .5, t.uv = new THREE.Vector2(r, 1 - e), t
         }

         function a(e, t, r) {
             var i = new THREE.Face3(e.index, t.index, r.index, [e.clone(), t.clone(), r.clone()]);
             h.faces.push(i), E.copy(e).add(t).add(r).divideScalar(3), i = Math.atan2(E.z, -E.x), h.faceVertexUvs[0].push([s(e.uv, e, i), s(t.uv, t, i), s(r.uv, r, i)])
         }

         function o(e, t) {
             for (var r = Math.pow(2, t), i = n(h.vertices[e.a]), o = n(h.vertices[e.b]), s = n(h.vertices[e.c]), l = [], u = 0; r >= u; u++) {
                 l[u] = [];
                 for (var c = n(i.clone().lerp(s, u / r)), d = n(o.clone().lerp(s, u / r)), f = r - u, p = 0; f >= p; p++) l[u][p] = 0 == p && u == r ? c : n(c.clone().lerp(d, p / f))
             }
             for (u = 0; r > u; u++)
                 for (p = 0; 2 * (r - u) - 1 > p; p++) i = Math.floor(p / 2), 0 == p % 2 ? a(l[u][i + 1], l[u + 1][i], l[u][i]) : a(l[u][i + 1], l[u + 1][i + 1], l[u + 1][i])
         }

         function s(e, t, r) {
             return 0 > r && 1 === e.x && (e = new THREE.Vector2(e.x - 1, e.y)), 0 === t.x && 0 === t.z && (e = new THREE.Vector2(r / 2 / Math.PI + .5, e.y)), e.clone()
         }
         THREE.Geometry.call(this), this.type = "PolyhedronGeometry", this.parameters = {
             vertices: e,
             indices: t,
             radius: r,
             detail: i
         }, r = r || 1, i = i || 0;
         for (var h = this, l = 0, u = e.length; u > l; l += 3) n(new THREE.Vector3(e[l], e[l + 1], e[l + 2]));
         e = this.vertices;
         for (var c = [], d = l = 0, u = t.length; u > l; l += 3, d++) {
             var f = e[t[l]],
                 p = e[t[l + 1]],
                 m = e[t[l + 2]];
             c[d] = new THREE.Face3(f.index, p.index, m.index, [f.clone(), p.clone(), m.clone()])
         }
         for (var E = new THREE.Vector3, l = 0, u = c.length; u > l; l++) o(c[l], i);
         for (l = 0, u = this.faceVertexUvs[0].length; u > l; l++) t = this.faceVertexUvs[0][l], i = t[0].x, e = t[1].x, c = t[2].x, d = Math.max(i, Math.max(e, c)), f = Math.min(i, Math.min(e, c)), d > .9 && .1 > f && (.2 > i && (t[0].x += 1), .2 > e && (t[1].x += 1), .2 > c && (t[2].x += 1));
         for (l = 0, u = this.vertices.length; u > l; l++) this.vertices[l].multiplyScalar(r);
         this.mergeVertices(), this.computeFaceNormals(), this.boundingSphere = new THREE.Sphere(new THREE.Vector3, r)
     }, THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.PolyhedronGeometry.prototype.constructor = THREE.PolyhedronGeometry, THREE.DodecahedronGeometry = function(e, t) {
         this.parameters = {
             radius: e,
             detail: t
         };
         var r = (1 + Math.sqrt(5)) / 2,
             i = 1 / r;
         THREE.PolyhedronGeometry.call(this, [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -i, -r, 0, -i, r, 0, i, -r, 0, i, r, -i, -r, 0, -i, r, 0, i, -r, 0, i, r, 0, -r, 0, -i, r, 0, -i, -r, 0, i, r, 0, i], [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9], e, t)
     }, THREE.DodecahedronGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.DodecahedronGeometry.prototype.constructor = THREE.DodecahedronGeometry, THREE.IcosahedronGeometry = function(e, t) {
         var r = (1 + Math.sqrt(5)) / 2;
         THREE.PolyhedronGeometry.call(this, [-1, r, 0, 1, r, 0, -1, -r, 0, 1, -r, 0, 0, -1, r, 0, 1, r, 0, -1, -r, 0, 1, -r, r, 0, -1, r, 0, 1, -r, 0, -1, -r, 0, 1], [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], e, t), this.type = "IcosahedronGeometry", this.parameters = {
             radius: e,
             detail: t
         }
     }, THREE.IcosahedronGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.IcosahedronGeometry.prototype.constructor = THREE.IcosahedronGeometry, THREE.OctahedronGeometry = function(e, t) {
         this.parameters = {
             radius: e,
             detail: t
         }, THREE.PolyhedronGeometry.call(this, [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], e, t), this.type = "OctahedronGeometry", this.parameters = {
             radius: e,
             detail: t
         }
     }, THREE.OctahedronGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.OctahedronGeometry.prototype.constructor = THREE.OctahedronGeometry, THREE.TetrahedronGeometry = function(e, t) {
         THREE.PolyhedronGeometry.call(this, [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], e, t), this.type = "TetrahedronGeometry", this.parameters = {
             radius: e,
             detail: t
         }
     }, THREE.TetrahedronGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.TetrahedronGeometry.prototype.constructor = THREE.TetrahedronGeometry, THREE.ParametricGeometry = function(e, t, r) {
         THREE.Geometry.call(this), this.type = "ParametricGeometry", this.parameters = {
             func: e,
             slices: t,
             stacks: r
         };
         var i = this.vertices,
             n = this.faces,
             a = this.faceVertexUvs[0],
             o, s, h, l, u = t + 1;
         for (o = 0; r >= o; o++)
             for (l = o / r, s = 0; t >= s; s++) h = s / t, h = e(h, l), i.push(h);
         var c, d, f, p;
         for (o = 0; r > o; o++)
             for (s = 0; t > s; s++) e = o * u + s, i = o * u + s + 1, l = (o + 1) * u + s + 1, h = (o + 1) * u + s, c = new THREE.Vector2(s / t, o / r), d = new THREE.Vector2((s + 1) / t, o / r), f = new THREE.Vector2((s + 1) / t, (o + 1) / r), p = new THREE.Vector2(s / t, (o + 1) / r), n.push(new THREE.Face3(e, i, h)), a.push([c, d, p]), n.push(new THREE.Face3(i, l, h)), a.push([d.clone(), f, p.clone()]);
         this.computeFaceNormals(), this.computeVertexNormals()
     }, THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.ParametricGeometry.prototype.constructor = THREE.ParametricGeometry, THREE.AxisHelper = function(e) {
         e = e || 1;
         var t = new Float32Array([0, 0, 0, e, 0, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 0, e]),
             r = new Float32Array([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1]);
         e = new THREE.BufferGeometry, e.addAttribute("position", new THREE.BufferAttribute(t, 3)), e.addAttribute("color", new THREE.BufferAttribute(r, 3)), t = new THREE.LineBasicMaterial({
             vertexColors: THREE.VertexColors
         }), THREE.Line.call(this, e, t, THREE.LinePieces)
     }, THREE.AxisHelper.prototype = Object.create(THREE.Line.prototype), THREE.AxisHelper.prototype.constructor = THREE.AxisHelper, THREE.ArrowHelper = function() {
         var e = new THREE.Geometry;
         e.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0));
         var t = new THREE.CylinderGeometry(0, .5, 1, 5, 1);
         return t.applyMatrix((new THREE.Matrix4).makeTranslation(0, -.5, 0)),
             function(r, i, n, a, o, s) {
                 THREE.Object3D.call(this), void 0 === a && (a = 16776960), void 0 === n && (n = 1), void 0 === o && (o = .2 * n), void 0 === s && (s = .2 * o), this.position.copy(i), this.line = new THREE.Line(e, new THREE.LineBasicMaterial({
                     color: a
                 })), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new THREE.Mesh(t, new THREE.MeshBasicMaterial({
                     color: a
                 })), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(r), this.setLength(n, o, s)
             }
     }(), THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype), THREE.ArrowHelper.prototype.constructor = THREE.ArrowHelper, THREE.ArrowHelper.prototype.setDirection = function() {
         var e = new THREE.Vector3,
             t;
         return function(r) {.99999 < r.y ? this.quaternion.set(0, 0, 0, 1) : -.99999 > r.y ? this.quaternion.set(1, 0, 0, 0) : (e.set(r.z, 0, -r.x).normalize(), t = Math.acos(r.y), this.quaternion.setFromAxisAngle(e, t))
         }
     }(), THREE.ArrowHelper.prototype.setLength = function(e, t, r) {
         void 0 === t && (t = .2 * e), void 0 === r && (r = .2 * t), this.line.scale.set(1, e - t, 1), this.line.updateMatrix(), this.cone.scale.set(r, t, r), this.cone.position.y = e, this.cone.updateMatrix()
     }, THREE.ArrowHelper.prototype.setColor = function(e) {
         this.line.material.color.set(e), this.cone.material.color.set(e)
     }, THREE.BoxHelper = function(e) {
         var t = new THREE.BufferGeometry;
         t.addAttribute("position", new THREE.BufferAttribute(new Float32Array(72), 3)), THREE.Line.call(this, t, new THREE.LineBasicMaterial({
             color: 16776960
         }), THREE.LinePieces), void 0 !== e && this.update(e)
     }, THREE.BoxHelper.prototype = Object.create(THREE.Line.prototype), THREE.BoxHelper.prototype.constructor = THREE.BoxHelper, THREE.BoxHelper.prototype.update = function(e) {
         var t = e.geometry;
         null === t.boundingBox && t.computeBoundingBox();
         var r = t.boundingBox.min,
             t = t.boundingBox.max,
             i = this.geometry.attributes.position.array;
         i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = r.x, i[4] = t.y, i[5] = t.z, i[6] = r.x, i[7] = t.y, i[8] = t.z, i[9] = r.x, i[10] = r.y, i[11] = t.z, i[12] = r.x, i[13] = r.y, i[14] = t.z, i[15] = t.x, i[16] = r.y, i[17] = t.z, i[18] = t.x, i[19] = r.y, i[20] = t.z, i[21] = t.x, i[22] = t.y, i[23] = t.z, i[24] = t.x, i[25] = t.y, i[26] = r.z, i[27] = r.x, i[28] = t.y, i[29] = r.z, i[30] = r.x, i[31] = t.y, i[32] = r.z, i[33] = r.x, i[34] = r.y, i[35] = r.z, i[36] = r.x, i[37] = r.y, i[38] = r.z, i[39] = t.x, i[40] = r.y, i[41] = r.z, i[42] = t.x, i[43] = r.y, i[44] = r.z, i[45] = t.x, i[46] = t.y, i[47] = r.z, i[48] = t.x, i[49] = t.y, i[50] = t.z, i[51] = t.x, i[52] = t.y, i[53] = r.z, i[54] = r.x, i[55] = t.y, i[56] = t.z, i[57] = r.x, i[58] = t.y, i[59] = r.z, i[60] = r.x, i[61] = r.y, i[62] = t.z, i[63] = r.x, i[64] = r.y, i[65] = r.z, i[66] = t.x, i[67] = r.y, i[68] = t.z, i[69] = t.x, i[70] = r.y, i[71] = r.z, this.geometry.attributes.position.needsUpdate = !0, this.geometry.computeBoundingSphere(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1
     }, THREE.BoundingBoxHelper = function(e, t) {
         var r = void 0 !== t ? t : 8947848;
         this.object = e, this.box = new THREE.Box3, THREE.Mesh.call(this, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
             color: r,
             wireframe: !0
         }))
     }, THREE.BoundingBoxHelper.prototype = Object.create(THREE.Mesh.prototype), THREE.BoundingBoxHelper.prototype.constructor = THREE.BoundingBoxHelper, THREE.BoundingBoxHelper.prototype.update = function() {
         this.box.setFromObject(this.object), this.box.size(this.scale), this.box.center(this.position)
     }, THREE.CameraHelper = function(e) {
         function t(e, t, i) {
             r(e, i), r(t, i)
         }

         function r(e, t) {
             i.vertices.push(new THREE.Vector3), i.colors.push(new THREE.Color(t)), void 0 === a[e] && (a[e] = []), a[e].push(i.vertices.length - 1)
         }
         var i = new THREE.Geometry,
             n = new THREE.LineBasicMaterial({
                 color: 16777215,
                 vertexColors: THREE.FaceColors
             }),
             a = {};
         t("n1", "n2", 16755200), t("n2", "n4", 16755200), t("n4", "n3", 16755200), t("n3", "n1", 16755200), t("f1", "f2", 16755200), t("f2", "f4", 16755200), t("f4", "f3", 16755200), t("f3", "f1", 16755200), t("n1", "f1", 16755200), t("n2", "f2", 16755200), t("n3", "f3", 16755200), t("n4", "f4", 16755200), t("p", "n1", 16711680), t("p", "n2", 16711680), t("p", "n3", 16711680), t("p", "n4", 16711680), t("u1", "u2", 43775), t("u2", "u3", 43775), t("u3", "u1", 43775), t("c", "t", 16777215), t("p", "c", 3355443), t("cn1", "cn2", 3355443), t("cn3", "cn4", 3355443), t("cf1", "cf2", 3355443), t("cf3", "cf4", 3355443), THREE.Line.call(this, i, n, THREE.LinePieces), this.camera = e, this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = a, this.update()
     }, THREE.CameraHelper.prototype = Object.create(THREE.Line.prototype), THREE.CameraHelper.prototype.constructor = THREE.CameraHelper, THREE.CameraHelper.prototype.update = function() {
         var e, t, r = new THREE.Vector3,
             i = new THREE.Camera,
             n = function(n, a, o, s) {
                 if (r.set(a, o, s).unproject(i), n = t[n], void 0 !== n)
                     for (a = 0, o = n.length; o > a; a++) e.vertices[n[a]].copy(r)
             };
         return function() {
             e = this.geometry, t = this.pointMap, i.projectionMatrix.copy(this.camera.projectionMatrix), n("c", 0, 0, -1), n("t", 0, 0, 1), n("n1", -1, -1, -1), n("n2", 1, -1, -1), n("n3", -1, 1, -1), n("n4", 1, 1, -1), n("f1", -1, -1, 1), n("f2", 1, -1, 1), n("f3", -1, 1, 1), n("f4", 1, 1, 1), n("u1", .7, 1.1, -1), n("u2", -.7, 1.1, -1), n("u3", 0, 2, -1), n("cf1", -1, 0, 1), n("cf2", 1, 0, 1), n("cf3", 0, -1, 1), n("cf4", 0, 1, 1), n("cn1", -1, 0, -1), n("cn2", 1, 0, -1), n("cn3", 0, -1, -1), n("cn4", 0, 1, -1), e.verticesNeedUpdate = !0
         }
     }(), THREE.DirectionalLightHelper = function(e, t) {
         THREE.Object3D.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, t = t || 1;
         var r = new THREE.Geometry;
         r.vertices.push(new THREE.Vector3(-t, t, 0), new THREE.Vector3(t, t, 0), new THREE.Vector3(t, -t, 0), new THREE.Vector3(-t, -t, 0), new THREE.Vector3(-t, t, 0));
         var i = new THREE.LineBasicMaterial({
             fog: !1
         });
         i.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.lightPlane = new THREE.Line(r, i), this.add(this.lightPlane), r = new THREE.Geometry, r.vertices.push(new THREE.Vector3, new THREE.Vector3), i = new THREE.LineBasicMaterial({
             fog: !1
         }), i.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.targetLine = new THREE.Line(r, i), this.add(this.targetLine), this.update()
     }, THREE.DirectionalLightHelper.prototype = Object.create(THREE.Object3D.prototype), THREE.DirectionalLightHelper.prototype.constructor = THREE.DirectionalLightHelper, THREE.DirectionalLightHelper.prototype.dispose = function() {
         this.lightPlane.geometry.dispose(), this.lightPlane.material.dispose(), this.targetLine.geometry.dispose(), this.targetLine.material.dispose()
     }, THREE.DirectionalLightHelper.prototype.update = function() {
         var e = new THREE.Vector3,
             t = new THREE.Vector3,
             r = new THREE.Vector3;
         return function() {
             e.setFromMatrixPosition(this.light.matrixWorld), t.setFromMatrixPosition(this.light.target.matrixWorld), r.subVectors(t, e), this.lightPlane.lookAt(r), this.lightPlane.material.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.targetLine.geometry.vertices[1].copy(r), this.targetLine.geometry.verticesNeedUpdate = !0, this.targetLine.material.color.copy(this.lightPlane.material.color)
         }
     }(), THREE.EdgesHelper = function(e, t, r) {
         t = void 0 !== t ? t : 16777215, r = Math.cos(THREE.Math.degToRad(void 0 !== r ? r : 1));
         var i = [0, 0],
             n = {},
             a = function(e, t) {
                 return e - t
             },
             o = ["a", "b", "c"],
             s = new THREE.BufferGeometry,
             h;
         e.geometry instanceof THREE.BufferGeometry ? (h = new THREE.Geometry, h.fromBufferGeometry(e.geometry)) : h = e.geometry.clone(), h.mergeVertices(), h.computeFaceNormals();
         var l = h.vertices;
         h = h.faces;
         for (var u = 0, c = 0, d = h.length; d > c; c++)
             for (var f = h[c], p = 0; 3 > p; p++) {
                 i[0] = f[o[p]], i[1] = f[o[(p + 1) % 3]], i.sort(a);
                 var m = i.toString();
                 void 0 === n[m] ? (n[m] = {
                     vert1: i[0],
                     vert2: i[1],
                     face1: c,
                     face2: void 0
                 }, u++) : n[m].face2 = c
             }
         i = new Float32Array(6 * u), a = 0;
         for (m in n) o = n[m], (void 0 === o.face2 || h[o.face1].normal.dot(h[o.face2].normal) <= r) && (u = l[o.vert1], i[a++] = u.x, i[a++] = u.y, i[a++] = u.z, u = l[o.vert2], i[a++] = u.x, i[a++] = u.y, i[a++] = u.z);
         s.addAttribute("position", new THREE.BufferAttribute(i, 3)), THREE.Line.call(this, s, new THREE.LineBasicMaterial({
             color: t
         }), THREE.LinePieces), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1
     }, THREE.EdgesHelper.prototype = Object.create(THREE.Line.prototype), THREE.EdgesHelper.prototype.constructor = THREE.EdgesHelper, THREE.FaceNormalsHelper = function(e, t, r, i) {
         this.object = e, this.size = void 0 !== t ? t : 1, e = void 0 !== r ? r : 16776960, i = void 0 !== i ? i : 1, t = new THREE.Geometry, r = 0;
         for (var n = this.object.geometry.faces.length; n > r; r++) t.vertices.push(new THREE.Vector3, new THREE.Vector3);
         THREE.Line.call(this, t, new THREE.LineBasicMaterial({
             color: e,
             linewidth: i
         }), THREE.LinePieces), this.matrixAutoUpdate = !1, this.normalMatrix = new THREE.Matrix3, this.update()
     }, THREE.FaceNormalsHelper.prototype = Object.create(THREE.Line.prototype), THREE.FaceNormalsHelper.prototype.constructor = THREE.FaceNormalsHelper, THREE.FaceNormalsHelper.prototype.update = function() {
         var e = this.geometry.vertices,
             t = this.object,
             r = t.geometry.vertices,
             i = t.geometry.faces,
             n = t.matrixWorld;
         t.updateMatrixWorld(!0), this.normalMatrix.getNormalMatrix(n);
         for (var a = t = 0, o = i.length; o > t; t++, a += 2) {
             var s = i[t];
             e[a].copy(r[s.a]).add(r[s.b]).add(r[s.c]).divideScalar(3).applyMatrix4(n), e[a + 1].copy(s.normal).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size).add(e[a])
         }
         return this.geometry.verticesNeedUpdate = !0, this
     }, THREE.GridHelper = function(e, t) {
         var r = new THREE.Geometry,
             i = new THREE.LineBasicMaterial({
                 vertexColors: THREE.VertexColors
             });
         this.color1 = new THREE.Color(4473924), this.color2 = new THREE.Color(8947848);
         for (var n = -e; e >= n; n += t) {
             r.vertices.push(new THREE.Vector3(-e, 0, n), new THREE.Vector3(e, 0, n), new THREE.Vector3(n, 0, -e), new THREE.Vector3(n, 0, e));
             var a = 0 === n ? this.color1 : this.color2;
             r.colors.push(a, a, a, a)
         }
         THREE.Line.call(this, r, i, THREE.LinePieces)
     }, THREE.GridHelper.prototype = Object.create(THREE.Line.prototype), THREE.GridHelper.prototype.constructor = THREE.GridHelper, THREE.GridHelper.prototype.setColors = function(e, t) {
         this.color1.set(e), this.color2.set(t), this.geometry.colorsNeedUpdate = !0
     }, THREE.HemisphereLightHelper = function(e, t) {
         THREE.Object3D.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.colors = [new THREE.Color, new THREE.Color];
         var r = new THREE.SphereGeometry(t, 4, 2);
         r.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI / 2));
         for (var i = 0; 8 > i; i++) r.faces[i].color = this.colors[4 > i ? 0 : 1];
         i = new THREE.MeshBasicMaterial({
             vertexColors: THREE.FaceColors,
             wireframe: !0
         }), this.lightSphere = new THREE.Mesh(r, i), this.add(this.lightSphere), this.update()
     }, THREE.HemisphereLightHelper.prototype = Object.create(THREE.Object3D.prototype), THREE.HemisphereLightHelper.prototype.constructor = THREE.HemisphereLightHelper, THREE.HemisphereLightHelper.prototype.dispose = function() {
         this.lightSphere.geometry.dispose(), this.lightSphere.material.dispose()
     }, THREE.HemisphereLightHelper.prototype.update = function() {
         var e = new THREE.Vector3;
         return function() {
             this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity), this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity), this.lightSphere.lookAt(e.setFromMatrixPosition(this.light.matrixWorld).negate()), this.lightSphere.geometry.colorsNeedUpdate = !0
         }
     }(), THREE.PointLightHelper = function(e, t) {
         this.light = e, this.light.updateMatrixWorld();
         var r = new THREE.SphereGeometry(t, 4, 2),
             i = new THREE.MeshBasicMaterial({
                 wireframe: !0,
                 fog: !1
             });
         i.color.copy(this.light.color).multiplyScalar(this.light.intensity), THREE.Mesh.call(this, r, i), this.matrix = this.light.matrixWorld, this.matrixAutoUpdate = !1
     }, THREE.PointLightHelper.prototype = Object.create(THREE.Mesh.prototype), THREE.PointLightHelper.prototype.constructor = THREE.PointLightHelper, THREE.PointLightHelper.prototype.dispose = function() {
         this.geometry.dispose(), this.material.dispose()
     }, THREE.PointLightHelper.prototype.update = function() {
         this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
     }, THREE.SkeletonHelper = function(e) {
         this.bones = this.getBoneList(e);
         for (var t = new THREE.Geometry, r = 0; r < this.bones.length; r++) this.bones[r].parent instanceof THREE.Bone && (t.vertices.push(new THREE.Vector3), t.vertices.push(new THREE.Vector3), t.colors.push(new THREE.Color(0, 0, 1)), t.colors.push(new THREE.Color(0, 1, 0)));
         r = new THREE.LineBasicMaterial({
             vertexColors: THREE.VertexColors,
             depthTest: !1,
             depthWrite: !1,
             transparent: !0
         }), THREE.Line.call(this, t, r, THREE.LinePieces), this.root = e, this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.update()
     }, THREE.SkeletonHelper.prototype = Object.create(THREE.Line.prototype), THREE.SkeletonHelper.prototype.constructor = THREE.SkeletonHelper, THREE.SkeletonHelper.prototype.getBoneList = function(e) {
         var t = [];
         e instanceof THREE.Bone && t.push(e);
         for (var r = 0; r < e.children.length; r++) t.push.apply(t, this.getBoneList(e.children[r]));
         return t
     }, THREE.SkeletonHelper.prototype.update = function() {
         for (var e = this.geometry, t = (new THREE.Matrix4).getInverse(this.root.matrixWorld), r = new THREE.Matrix4, i = 0, n = 0; n < this.bones.length; n++) {
             var a = this.bones[n];
             a.parent instanceof THREE.Bone && (r.multiplyMatrices(t, a.matrixWorld), e.vertices[i].setFromMatrixPosition(r), r.multiplyMatrices(t, a.parent.matrixWorld), e.vertices[i + 1].setFromMatrixPosition(r), i += 2)
         }
         e.verticesNeedUpdate = !0, e.computeBoundingSphere()
     }, THREE.SpotLightHelper = function(e) {
         THREE.Object3D.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, e = new THREE.CylinderGeometry(0, 1, 1, 8, 1, !0), e.applyMatrix((new THREE.Matrix4).makeTranslation(0, -.5, 0)), e.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI / 2));
         var t = new THREE.MeshBasicMaterial({
             wireframe: !0,
             fog: !1
         });
         this.cone = new THREE.Mesh(e, t), this.add(this.cone), this.update()
     }, THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype), THREE.SpotLightHelper.prototype.constructor = THREE.SpotLightHelper, THREE.SpotLightHelper.prototype.dispose = function() {
         this.cone.geometry.dispose(), this.cone.material.dispose()
     }, THREE.SpotLightHelper.prototype.update = function() {
         var e = new THREE.Vector3,
             t = new THREE.Vector3;
         return function() {
             var r = this.light.distance ? this.light.distance : 1e4,
                 i = r * Math.tan(this.light.angle);
             this.cone.scale.set(i, i, r), e.setFromMatrixPosition(this.light.matrixWorld), t.setFromMatrixPosition(this.light.target.matrixWorld), this.cone.lookAt(t.sub(e)), this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
         }
     }(), THREE.VertexNormalsHelper = function(e, t, r, i) {
         this.object = e, this.size = void 0 !== t ? t : 1, t = void 0 !== r ? r : 16711680, i = void 0 !== i ? i : 1, r = new THREE.Geometry, e = e.geometry.faces;
         for (var n = 0, a = e.length; a > n; n++)
             for (var o = 0, s = e[n].vertexNormals.length; s > o; o++) r.vertices.push(new THREE.Vector3, new THREE.Vector3);
         THREE.Line.call(this, r, new THREE.LineBasicMaterial({
             color: t,
             linewidth: i
         }), THREE.LinePieces), this.matrixAutoUpdate = !1, this.normalMatrix = new THREE.Matrix3, this.update()
     }, THREE.VertexNormalsHelper.prototype = Object.create(THREE.Line.prototype), THREE.VertexNormalsHelper.prototype.constructor = THREE.VertexNormalsHelper, THREE.VertexNormalsHelper.prototype.update = function(e) {
         var t = new THREE.Vector3;
         return function(e) {
             e = ["a", "b", "c", "d"], this.object.updateMatrixWorld(!0), this.normalMatrix.getNormalMatrix(this.object.matrixWorld);
             for (var r = this.geometry.vertices, i = this.object.geometry.vertices, n = this.object.geometry.faces, a = this.object.matrixWorld, o = 0, s = 0, h = n.length; h > s; s++)
                 for (var l = n[s], u = 0, c = l.vertexNormals.length; c > u; u++) {
                     var d = l.vertexNormals[u];
                     r[o].copy(i[l[e[u]]]).applyMatrix4(a), t.copy(d).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size), t.add(r[o]), o += 1, r[o].copy(t), o += 1
                 }
             return this.geometry.verticesNeedUpdate = !0, this
         }
     }(), THREE.VertexTangentsHelper = function(e, t, r, i) {
         this.object = e, this.size = void 0 !== t ? t : 1, t = void 0 !== r ? r : 255, i = void 0 !== i ? i : 1, r = new THREE.Geometry, e = e.geometry.faces;
         for (var n = 0, a = e.length; a > n; n++)
             for (var o = 0, s = e[n].vertexTangents.length; s > o; o++) r.vertices.push(new THREE.Vector3), r.vertices.push(new THREE.Vector3);
         THREE.Line.call(this, r, new THREE.LineBasicMaterial({
             color: t,
             linewidth: i
         }), THREE.LinePieces), this.matrixAutoUpdate = !1, this.update()
     }, THREE.VertexTangentsHelper.prototype = Object.create(THREE.Line.prototype), THREE.VertexTangentsHelper.prototype.constructor = THREE.VertexTangentsHelper, THREE.VertexTangentsHelper.prototype.update = function(e) {
         var t = new THREE.Vector3;
         return function(e) {
             e = ["a", "b", "c", "d"], this.object.updateMatrixWorld(!0);
             for (var r = this.geometry.vertices, i = this.object.geometry.vertices, n = this.object.geometry.faces, a = this.object.matrixWorld, o = 0, s = 0, h = n.length; h > s; s++)
                 for (var l = n[s], u = 0, c = l.vertexTangents.length; c > u; u++) {
                     var d = l.vertexTangents[u];
                     r[o].copy(i[l[e[u]]]).applyMatrix4(a), t.copy(d).transformDirection(a).multiplyScalar(this.size), t.add(r[o]), o += 1, r[o].copy(t), o += 1
                 }
             return this.geometry.verticesNeedUpdate = !0, this
         }
     }(), THREE.WireframeHelper = function(e, t) {
         var r = void 0 !== t ? t : 16777215,
             i = [0, 0],
             n = {},
             a = function(e, t) {
                 return e - t
             },
             o = ["a", "b", "c"],
             s = new THREE.BufferGeometry;
         if (e.geometry instanceof THREE.Geometry) {
             for (var h = e.geometry.vertices, l = e.geometry.faces, u = 0, c = new Uint32Array(6 * l.length), d = 0, f = l.length; f > d; d++)
                 for (var p = l[d], m = 0; 3 > m; m++) {
                     i[0] = p[o[m]], i[1] = p[o[(m + 1) % 3]], i.sort(a);
                     var E = i.toString();
                     void 0 === n[E] && (c[2 * u] = i[0], c[2 * u + 1] = i[1], n[E] = !0, u++)
                 }
             for (i = new Float32Array(6 * u), d = 0, f = u; f > d; d++)
                 for (m = 0; 2 > m; m++) u = h[c[2 * d + m]], o = 6 * d + 3 * m, i[o + 0] = u.x, i[o + 1] = u.y, i[o + 2] = u.z;
             s.addAttribute("position", new THREE.BufferAttribute(i, 3))
         } else if (e.geometry instanceof THREE.BufferGeometry) {
             if (void 0 !== e.geometry.attributes.index) {
                 h = e.geometry.attributes.position.array, f = e.geometry.attributes.index.array, l = e.geometry.drawcalls, u = 0, 0 === l.length && (l = [{
                     count: f.length,
                     index: 0,
                     start: 0
                 }]);
                 for (var c = new Uint32Array(2 * f.length), p = 0, g = l.length; g > p; ++p)
                     for (var m = l[p].start, E = l[p].count, o = l[p].index, d = m, v = m + E; v > d; d += 3)
                         for (m = 0; 3 > m; m++) i[0] = o + f[d + m], i[1] = o + f[d + (m + 1) % 3], i.sort(a), E = i.toString(), void 0 === n[E] && (c[2 * u] = i[0], c[2 * u + 1] = i[1], n[E] = !0, u++);
                 for (i = new Float32Array(6 * u), d = 0, f = u; f > d; d++)
                     for (m = 0; 2 > m; m++) o = 6 * d + 3 * m, u = 3 * c[2 * d + m], i[o + 0] = h[u], i[o + 1] = h[u + 1], i[o + 2] = h[u + 2]
             } else
                 for (h = e.geometry.attributes.position.array, u = h.length / 3, c = u / 3, i = new Float32Array(6 * u), d = 0, f = c; f > d; d++)
                     for (m = 0; 3 > m; m++) o = 18 * d + 6 * m, c = 9 * d + 3 * m, i[o + 0] = h[c], i[o + 1] = h[c + 1], i[o + 2] = h[c + 2], u = 9 * d + (m + 1) % 3 * 3, i[o + 3] = h[u], i[o + 4] = h[u + 1], i[o + 5] = h[u + 2];
             s.addAttribute("position", new THREE.BufferAttribute(i, 3))
         }
         THREE.Line.call(this, s, new THREE.LineBasicMaterial({
             color: r
         }), THREE.LinePieces), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1
     }, THREE.WireframeHelper.prototype = Object.create(THREE.Line.prototype), THREE.WireframeHelper.prototype.constructor = THREE.WireframeHelper, THREE.ImmediateRenderObject = function() {
         THREE.Object3D.call(this), this.render = function(e) {}
     }, THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype), THREE.ImmediateRenderObject.prototype.constructor = THREE.ImmediateRenderObject, THREE.MorphBlendMesh = function(e, t) {
         THREE.Mesh.call(this, e, t), this.animationsMap = {}, this.animationsList = [];
         var r = this.geometry.morphTargets.length;
         this.createAnimation("__default", 0, r - 1, r / 1), this.setAnimationWeight("__default", 1)
     }, THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype), THREE.MorphBlendMesh.prototype.constructor = THREE.MorphBlendMesh, THREE.MorphBlendMesh.prototype.createAnimation = function(e, t, r, i) {
         t = {
             startFrame: t,
             endFrame: r,
             length: r - t + 1,
             fps: i,
             duration: (r - t) / i,
             lastFrame: 0,
             currentFrame: 0,
             active: !1,
             time: 0,
             direction: 1,
             weight: 1,
             directionBackwards: !1,
             mirroredLoop: !1
         }, this.animationsMap[e] = t, this.animationsList.push(t)
     }, THREE.MorphBlendMesh.prototype.autoCreateAnimations = function(e) {
         for (var t = /([a-z]+)_?(\d+)/, r, i = {}, n = this.geometry, a = 0, o = n.morphTargets.length; o > a; a++) {
             var s = n.morphTargets[a].name.match(t);
             if (s && 1 < s.length) {
                 var h = s[1];
                 i[h] || (i[h] = {
                     start: 1 / 0,
                     end: -(1 / 0)
                 }), s = i[h], a < s.start && (s.start = a), a > s.end && (s.end = a), r || (r = h)
             }
         }
         for (h in i) s = i[h], this.createAnimation(h, s.start, s.end, e);
         this.firstAnimation = r
     }, THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function(e) {
         (e = this.animationsMap[e]) && (e.direction = 1, e.directionBackwards = !1)
     }, THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function(e) {
         (e = this.animationsMap[e]) && (e.direction = -1, e.directionBackwards = !0)
     }, THREE.MorphBlendMesh.prototype.setAnimationFPS = function(e, t) {
         var r = this.animationsMap[e];
         r && (r.fps = t, r.duration = (r.end - r.start) / r.fps)
     }, THREE.MorphBlendMesh.prototype.setAnimationDuration = function(e, t) {
         var r = this.animationsMap[e];
         r && (r.duration = t, r.fps = (r.end - r.start) / r.duration)
     }, THREE.MorphBlendMesh.prototype.setAnimationWeight = function(e, t) {
         var r = this.animationsMap[e];
         r && (r.weight = t)
     }, THREE.MorphBlendMesh.prototype.setAnimationTime = function(e, t) {
         var r = this.animationsMap[e];
         r && (r.time = t)
     }, THREE.MorphBlendMesh.prototype.getAnimationTime = function(e) {
         var t = 0;
         return (e = this.animationsMap[e]) && (t = e.time), t
     }, THREE.MorphBlendMesh.prototype.getAnimationDuration = function(e) {
         var t = -1;
         return (e = this.animationsMap[e]) && (t = e.duration), t
     }, THREE.MorphBlendMesh.prototype.playAnimation = function(e) {
         var t = this.animationsMap[e];
         t ? (t.time = 0, t.active = !0) : THREE.warn("THREE.MorphBlendMesh: animation[" + e + "] undefined in .playAnimation()")
     }, THREE.MorphBlendMesh.prototype.stopAnimation = function(e) {
         (e = this.animationsMap[e]) && (e.active = !1)
     }, THREE.MorphBlendMesh.prototype.update = function(e) {
         for (var t = 0, r = this.animationsList.length; r > t; t++) {
             var i = this.animationsList[t];
             if (i.active) {
                 var n = i.duration / i.length;
                 i.time += i.direction * e, i.mirroredLoop ? (i.time > i.duration || 0 > i.time) && (i.direction *= -1, i.time > i.duration && (i.time = i.duration, i.directionBackwards = !0), 0 > i.time && (i.time = 0, i.directionBackwards = !1)) : (i.time %= i.duration, 0 > i.time && (i.time += i.duration));
                 var a = i.startFrame + THREE.Math.clamp(Math.floor(i.time / n), 0, i.length - 1),
                     o = i.weight;
                 a !== i.currentFrame && (this.morphTargetInfluences[i.lastFrame] = 0, this.morphTargetInfluences[i.currentFrame] = 1 * o, this.morphTargetInfluences[a] = 0, i.lastFrame = i.currentFrame, i.currentFrame = a), n = i.time % n / n, i.directionBackwards && (n = 1 - n), this.morphTargetInfluences[i.currentFrame] = n * o, this.morphTargetInfluences[i.lastFrame] = (1 - n) * o
             }
         }
     },
     function() {
         function e(e) {
             if (!e || "function" != typeof e.getImageData) return console.error("context blender called without a valid context prototype");
             Object.defineProperty(e, "blendOnto", {
                 value: t
             });
             for (var r = t.supportedBlendModes = "normal src-over screen multiply difference src-in plus add overlay hardlight colordodge dodge colorburn burn darken darker lighten lighter exclusion softlight luminosity color hue saturation lightercolor darkercolor".split(" "), i = t.supports = {}, n = r.length; n--;) i[r[n]] = !0;
             return t.aliases = {
                 "src-over": "normal",
                 plus: "add",
                 dodge: "colordodge",
                 burn: "colorburn",
                 darker: "darken",
                 lighter: "lighten"
             }, e
         }

         function t(e, t, i) {
             function n(e, t) {
                 var r = t << 1;
                 return 128 > t ? e * (r + (e * (255 - r) >> 8)) >> 8 : e * (511 - r) + Math.sqrt(e << 8) * (r - 255) >> 8
             }

             function a(e, t) {
                 return 128 > e ? e * t >> 7 : 255 - ((255 - t) * (255 - e) >> 7)
             }

             function o(e, t) {
                 return 255 == t && 0 == e ? 255 : Math.min(255, (e << 8) / (255 - t))
             }

             function s(e, t) {
                 return 255 == t && 0 == e ? 0 : 255 - Math.min(255, (255 - e << 8) / t)
             }

             function h(e, t, r) {
                 return {
                     r: .299 * e + .587 * t + .114 * r,
                     g: -.1687 * e - .3313 * t + .5 * r,
                     b: .5 * e - .4187 * t - .0813 * r
                 }
             }

             function l(e, t, r) {
                 return {
                     r: e + 1.402 * r,
                     g: e - .3441 * t - .7141 * r,
                     b: e + 1.772 * t
                 }
             }

             function u(e, t, r) {
                 var i = h(e, t, r),
                     n = Math.sqrt(i.g * i.g + i.b * i.b),
                     a = Math.atan2(i.g, i.b);
                 return {
                     h: a,
                     s: n,
                     v: i.r
                 }
             }

             function c(e, t, r) {
                 var i = t * Math.sin(e),
                     n = t * Math.cos(e);
                 return l(r, i, n)
             }
             var d = {};
             for (var f in r) r.hasOwnProperty(f) && (d[f] = i && i[f] || r[f]);
             "auto" == d.width && (d.width = this.canvas.width), "auto" == d.height && (d.height = this.canvas.height), d.width = Math.min(d.width, this.canvas.width - d.sourceX, e.canvas.width - d.destX), d.height = Math.min(d.height, this.canvas.height - d.sourceY, e.canvas.height - d.destY);
             for (var p = this.getImageData(d.sourceX, d.sourceY, d.width, d.height), m = e.getImageData(d.destX, d.destY, d.width, d.height), E = p.data, g = m.data, v, y, T = g.length, R, x, H, _, b, w, M, S, C, A, L, P, D, F, k = 0; T > k; k += 4) {
                 v = E[k + 3] / 255, y = g[k + 3] / 255, M = v + y - v * y, S = g[k], C = g[k + 1], A = g[k + 2], L = E[k], P = E[k + 1], D = E[k + 2], R = L / 255 * v, _ = S / 255 * y, x = P / 255 * v, b = C / 255 * y, H = D / 255 * v, w = A / 255 * y, F = 255 / M;
                 var B = y * v,
                     N = y - B,
                     I = v - B;
                 switch (t) {
                     case "normal":
                     case "src-over":
                         g[k] = (R + _ - _ * v) * F, g[k + 1] = (x + b - b * v) * F, g[k + 2] = (H + w - w * v) * F;
                         break;
                     case "screen":
                         g[k] = (R + _ - R * _) * F, g[k + 1] = (x + b - x * b) * F, g[k + 2] = (H + w - H * w) * F;
                         break;
                     case "multiply":
                         g[k] = (R * _ + R * (1 - y) + _ * (1 - v)) * F, g[k + 1] = (x * b + x * (1 - y) + b * (1 - v)) * F, g[k + 2] = (H * w + H * (1 - y) + w * (1 - v)) * F;
                         break;
                     case "difference":
                         g[k] = (R + _ - 2 * Math.min(R * y, _ * v)) * F, g[k + 1] = (x + b - 2 * Math.min(x * y, b * v)) * F, g[k + 2] = (H + w - 2 * Math.min(H * y, w * v)) * F;
                         break;
                     case "src-in":
                         M = v * y, F = 255 / M, g[k] = R * y * F, g[k + 1] = x * y * F, g[k + 2] = H * y * F, g[k + 3] = 255 * M;
                         break;
                     case "plus":
                     case "add":
                         g[k] = Math.min(R + _, 1) * F, g[k + 1] = Math.min(x + b, 1) * F, g[k + 2] = Math.min(H + w, 1) * F;
                         break;
                     case "overlay":
                         g[k] = B * a(S, L) + N * S + I * L, g[k + 1] = B * a(C, P) + N * C + I * P, g[k + 2] = B * a(A, D) + N * A + I * D;
                         break;
                     case "hardlight":
                         g[k] = B * a(L, S) + N * S + I * L, g[k + 1] = B * a(P, C) + N * C + I * P, g[k + 2] = B * a(D, A) + N * A + I * D;
                         break;
                     case "colordodge":
                     case "dodge":
                         g[k] = B * o(S, L) + N * S + I * L, g[k + 1] = B * o(C, P) + N * C + I * P, g[k + 2] = B * o(A, D) + N * A + I * D;
                         break;
                     case "colorburn":
                     case "burn":
                         g[k] = B * s(S, L) + N * S + I * L, g[k + 1] = B * s(C, P) + N * C + I * P, g[k + 2] = B * s(A, D) + N * A + I * D;
                         break;
                     case "darken":
                     case "darker":
                         g[k] = B * (L > S ? S : L) + N * S + I * L, g[k + 1] = B * (P > C ? C : P) + N * C + I * P, g[k + 2] = B * (D > A ? A : D) + N * A + I * D;
                         break;
                     case "lighten":
                     case "lighter":
                         g[k] = (_ > R ? _ : R) * F, g[k + 1] = (b > x ? b : x) * F, g[k + 2] = (w > H ? w : H) * F;
                         break;
                     case "exclusion":
                         g[k] = (_ + R - 2 * _ * R) * F, g[k + 1] = (b + x - 2 * b * x) * F, g[k + 2] = (w + H - 2 * w * H) * F;
                         break;
                     case "softlight":
                         g[k] = B * n(S, L) + N * S + I * L, g[k + 1] = B * n(C, P) + N * C + I * P, g[k + 2] = B * n(A, D) + N * A + I * D;
                         break;
                     case "luminosity":
                         var O = h(S, C, A),
                             U = h(L, P, D),
                             V = l(U.r, O.g, O.b);
                         g[k] = B * V.r + N * S + I * L, g[k + 1] = B * V.g + N * C + I * P, g[k + 2] = B * V.b + N * A + I * D;
                         break;
                     case "color":
                         var O = h(S, C, A),
                             U = h(L, P, D),
                             V = l(O.r, U.g, U.b);
                         g[k] = B * V.r + N * S + I * L, g[k + 1] = B * V.g + N * C + I * P, g[k + 2] = B * V.b + N * A + I * D;
                         break;
                     case "hue":
                         var O = u(S, C, A),
                             U = u(L, P, D),
                             V = c(U.h, O.s, O.v);
                         g[k] = B * V.r + N * S + I * L, g[k + 1] = B * V.g + N * C + I * P, g[k + 2] = B * V.b + N * A + I * D;
                         break;
                     case "saturation":
                         var O = u(S, C, A),
                             U = u(L, P, D),
                             V = c(O.h, U.s, O.v);
                         g[k] = B * V.r + N * S + I * L, g[k + 1] = B * V.g + N * C + I * P, g[k + 2] = B * V.b + N * A + I * D;
                         break;
                     case "lightercolor":
                         var V = 2.623 * (S - L) + 5.15 * (C - P) + A - D > 0 ? {
                             r: S,
                             g: C,
                             b: A
                         } : {
                             r: L,
                             g: P,
                             b: D
                         };
                         g[k] = B * V.r + N * S + I * L, g[k + 1] = B * V.g + N * C + I * P, g[k + 2] = B * V.b + N * A + I * D;
                         break;
                     case "darkercolor":
                         var V = 0 > 2.623 * (S - L) + 5.15 * (C - P) + A - D ? {
                             r: S,
                             g: C,
                             b: A
                         } : {
                             r: L,
                             g: P,
                             b: D
                         };
                         g[k] = B * V.r + N * S + I * L, g[k + 1] = B * V.g + N * C + I * P, g[k + 2] = B * V.b + N * A + I * D;
                         break;
                     default:
                         g[k] = g[k + 3] = 255, g[k + 1] = k % 8 == 0 ? 255 : 0, g[k + 2] = k % 8 == 0 ? 0 : 255
                 }
             }
             e.putImageData(m, d.destX, d.destY)
         }
         var r = {
             destX: 0,
             destY: 0,
             sourceX: 0,
             sourceY: 0,
             width: "auto",
             height: "auto"
         };
         if ("function" == typeof require && "object" == typeof module) {
             var i = require("canvas");
             e(i.Context2d.prototype), module.exports = i
         } else e(this.CanvasRenderingContext2D && this.CanvasRenderingContext2D.prototype)
     }(), Point2D.prototype.clone = function() {
         return new Point2D(this.x, this.y)
     }, Point2D.prototype.add = function(e) {
         return new Point2D(this.x + e.x, this.y + e.y)
     }, Point2D.prototype.addEquals = function(e) {
         return this.x += e.x, this.y += e.y, this
     }, Point2D.prototype.offset = function(e, t) {
         var r = 0;
         if (!(t.x <= this.x || this.x + e.x <= 0)) {
             var i = t.x * e.y - e.x * t.y,
                 n, a;
             i > 0 ? this.x < 0 ? (n = this.x * e.y, a = n / e.x - this.y) : this.x > 0 ? (n = this.x * t.y, a = n / t.x - this.y) : a = -this.y : t.x < this.x + e.x ? (n = (t.x - this.x) * e.y, a = t.y - (this.y + n / e.x)) : t.x > this.x + e.x ? (n = (e.x + this.x) * t.y, a = n / t.x - (this.y + e.y)) : a = t.y - (this.y + e.y), a > 0 && (r = a)
         }
         return r
     }, Point2D.prototype.rmoveto = function(e, t) {
         this.x += e, this.y += t
     }, Point2D.prototype.scalarAdd = function(e) {
         return new Point2D(this.x + e, this.y + e)
     }, Point2D.prototype.scalarAddEquals = function(e) {
         return this.x += e, this.y += e, this
     }, Point2D.prototype.subtract = function(e) {
         return new Point2D(this.x - e.x, this.y - e.y)
     }, Point2D.prototype.subtractEquals = function(e) {
         return this.x -= e.x, this.y -= e.y, this
     }, Point2D.prototype.scalarSubtract = function(e) {
         return new Point2D(this.x - e, this.y - e)
     }, Point2D.prototype.scalarSubtractEquals = function(e) {
         return this.x -= e, this.y -= e, this
     }, Point2D.prototype.multiply = function(e) {
         return new Point2D(this.x * e, this.y * e)
     }, Point2D.prototype.multiplyEquals = function(e) {
         return this.x *= e, this.y *= e, this
     }, Point2D.prototype.divide = function(e) {
         return new Point2D(this.x / e, this.y / e)
     }, Point2D.prototype.divideEquals = function(e) {
         return this.x /= e, this.y /= e, this
     }, Point2D.prototype.compare = function(e) {
         return this.x - e.x || this.y - e.y
     }, Point2D.prototype.eq = function(e) {
         return this.x == e.x && this.y == e.y
     }, Point2D.prototype.lt = function(e) {
         return this.x < e.x && this.y < e.y
     }, Point2D.prototype.lte = function(e) {
         return this.x <= e.x && this.y <= e.y
     }, Point2D.prototype.gt = function(e) {
         return this.x > e.x && this.y > e.y
     }, Point2D.prototype.gte = function(e) {
         return this.x >= e.x && this.y >= e.y
     }, Point2D.prototype.lerp = function(e, t) {
         return new Point2D(this.x + (e.x - this.x) * t, this.y + (e.y - this.y) * t)
     }, Point2D.prototype.distanceFrom = function(e) {
         var t = this.x - e.x,
             r = this.y - e.y;
         return Math.sqrt(t * t + r * r)
     }, Point2D.prototype.min = function(e) {
         return new Point2D(Math.min(this.x, e.x), Math.min(this.y, e.y))
     }, Point2D.prototype.max = function(e) {
         return new Point2D(Math.max(this.x, e.x), Math.max(this.y, e.y))
     }, Point2D.prototype.toString = function() {
         return this.x + "," + this.y
     }, Point2D.prototype.setXY = function(e, t) {
         this.x = e, this.y = t
     }, Point2D.prototype.setFromPoint = function(e) {
         this.x = e.x, this.y = e.y
     }, Point2D.prototype.asVector2 = function() {
         return new Vector2(this.x, this.y)
     }, Point2D.prototype.swap = function(e) {
         var t = this.x,
             r = this.y;
         this.x = e.x, this.y = e.y, e.x = t, e.y = r
     };
 var Matrix = function(e, t, r) {
     this.w = e, this.h = t, this.values = r || Matrix.allocate(t)
 };
 Matrix.allocate = function(e, t) {
     for (var r = [], i = 0; t > i; ++i) {
         r[i] = [];
         for (var n = 0; e > n; ++n) r[i][n] = 0
     }
     return r
 }, Matrix.cloneValues = function(e) {
     clone = [];
     for (var t = 0; t < e.length; ++t) clone[t] = [].concat(e[t]);
     return clone
 }, Matrix.prototype.add = function(e) {
     if (e.w != this.w || e.h != this.h) throw "Matrix add size mismatch";
     for (var t = Matrix.allocate(this.w, this.h), r = 0; r < this.h; ++r)
         for (var i = 0; i < this.w; ++i) t[r][i] = this.values[r][i] + e.values[r][i];
     return new Matrix(this.w, this.h, t)
 }, Matrix.prototype.transformProjectiveVector = function(e) {
     for (var t = [], r = 0; r < this.h; ++r) {
         t[r] = 0;
         for (var i = 0; i < this.w; ++i) t[r] += this.values[r][i] * e[i]
     }
     for (var n = 1 / t[t.length - 1], r = 0; r < this.h; ++r) t[r] *= n;
     return t
 }, Matrix.prototype.multiply = function(e) {
     if (+e !== e) {
         if (e.h != this.w) throw "Matrix mult size mismatch";
         for (var t = Matrix.allocate(this.w, this.h), r = 0; r < this.h; ++r)
             for (var i = 0; i < e.w; ++i) {
                 for (var n = 0, a = 0; a < this.w; a++) n += this.values[r][a] * e.values[a][i];
                 t[r][i] = n
             }
         return new Matrix(e.w, this.h, t)
     }
     for (var t = Matrix.allocate(this.w, this.h), r = 0; r < this.h; ++r)
         for (var i = 0; i < this.w; ++i) t[r][i] = this.values[r][i] * e;
     return new Matrix(this.w, this.h, t)
 }, Matrix.prototype.rowEchelon = function() {
     if (this.w <= this.h) throw "Matrix rowEchelon size mismatch";
     for (var e = Matrix.cloneValues(this.values), t = 0; t < this.h; ++t) {
         for (var r = e[t][t]; 0 == r;) {
             for (var i = t + 1; i < this.h; ++i)
                 if (0 != e[i][t]) {
                     var n = e[i];
                     e[i] = e[t], e[t] = n;
                     break
                 }
             if (i == this.h) return new Matrix(this.w, this.h, e);
             r = e[t][t]
         }
         for (var a = 1 / r, o = t; o < this.w; ++o) e[t][o] *= a;
         for (var s = 0; s < this.h; ++s)
             if (s != t) {
                 var h = e[s][t];
                 e[s][t] = 0;
                 for (var o = t + 1; o < this.w; ++o) e[s][o] -= h * e[t][o]
             }
     }
     return new Matrix(this.w, this.h, e)
 }, Matrix.prototype.invert = function() {
     if (this.w != this.h) throw "Matrix invert size mismatch";
     for (var e = Matrix.allocate(2 * this.w, this.h), t = 0; t < this.h; ++t)
         for (var r = 0; r < this.w; ++r) e[t][r] = this.values[t][r], e[t][r + this.w] = r == t ? 1 : 0;
     e = new Matrix(2 * this.w, this.h, e), e = e.rowEchelon();
     for (var i = Matrix.allocate(this.w, this.h), t = 0; t < this.w; ++t)
         for (var r = 0; r < this.w; ++r) i[t][r] = e.values[t][r + this.w];
     return new Matrix(this.w, this.h, i)
 }, Matrix.prototype.print = function() {
     for (var e = "<table>", t = 0; t < this.h; ++t) {
         e += "<tr>";
         for (var r = 0; r < this.w; ++r) e += "<td>", e += Math.round(100 * this.values[t][r]) / 100, e += "</td>";
         e += "</tr>"
     }
     return e += "</table>", $("body").append(e), this
 }, Grid = function(e) {
     this.id = "Grid", this.m_Name = e, this.m_Outlines = new Array, this.m_Quad = new Array, this.m_hSizeMM = 0, this.m_vSizeMM = 0, this.m_ValidAlignment = !1, this.m_AlignXY = new Point2D(0, 0), this.m_TransMatrix = null, this.setLightDefaults(), this.setTransDefaults()
 }, Grid.prototype = {
     getTransMatrix: function() {
         return this.m_TransMatrix
     },
     setTransMatrix: function(e) {
         this.m_TransMatrix = e
     },
     setLightDefaults: function() {
         this.m_LightSetup = new Object, this.m_LightSetup.x = 0, this.m_LightSetup.y = 0, this.m_LightSetup.z = 200, this.m_LightSetup.intensity = 2
     },
     setTransDefaults: function() {
         this.m_TransSetup = new Object, this.m_TransSetup.tx = 0, this.m_TransSetup.ty = 0, this.m_TransSetup.tz = .5, this.m_TransSetup.rx = 0, this.m_TransSetup.ry = 0, this.m_TransSetup.rz = 0, this.m_TransSetup.sx = 1, this.m_TransSetup.sy = 1, this.m_TransSetup.sz = 1
     },
     setLightsetup: function(e) {
         this.m_LightSetup = e
     },
     setTranssetup: function(e) {
         this.m_TransSetup = e
     },
     isColourationOnly: function() {
         return this.m_Quad && 4 == this.m_Quad.length ? !1 : !0
     },
     addOutlineFromSvgPointList: function(e) {
         for (var t = new Array, r = e.numberOfItems, i = 0; r > i; i++) {
             var n = e.getItem(i);
             t.push(new Point2D(n.x, n.y))
         }
         this.m_Outlines.push(t)
     },
     addQuadFromSvgPointList: function(e, t, r, i, n) {
         this.m_hSizeMM = t, this.m_vSizeMM = r, "undefined" == typeof i || "undefined" == typeof n ? this.m_ValidAlignment = !1 : (this.m_ValidAlignment = !0, this.m_AlignXY.x = i, this.m_AlignXY.y = n), this.m_Quad.length = 0;
         var a = e.numberOfItems,
             o, s;
         for (o = 0; a > o; o += 1) s = e.getItem(o), this.m_Quad.push(new Point2D(s.x, s.y))
     },
     initFromGridData: function(e, t, r, i, n) {
         this.m_Name = e, this.m_Outlines.length = 0, this.m_Outlines.push(t), this.m_Quad = r, this.m_hSizeMM = i, this.m_vSizeMM = n
     },
     getAlignmenLocationMM: function() {
         return this.m_ValidAlignment ? this.screenLocToMMTextureLoc(this.m_AlignXY.x, this.m_AlignXY.y) : -1
     },
     screenLocToMMTextureLoc: function(e, t) {
         var r = new Vector2(this.m_Quad[0].x, this.m_Quad[0].y),
             i = new Vector2(this.m_Quad[1].x, this.m_Quad[1].y),
             n = new Vector2(this.m_Quad[2].x, this.m_Quad[2].y),
             a = new Vector2(this.m_Quad[3].x, this.m_Quad[3].y),
             o = new HmQuadToSqr(r, i, n, a),
             s = o.transform(new Vector2(e, t));
         return new Point2D(s.x * this.m_hSizeMM, s.y * this.m_vSizeMM)
     },
     mmTextureLocToScreenLoc: function(e, t) {
         var r = e / this.m_hSizeMM,
             i = t / this.m_vSizeMM,
             n = new Vector2(this.m_Quad[0].x, this.m_Quad[0].y),
             a = new Vector2(this.m_Quad[1].x, this.m_Quad[1].y),
             o = new Vector2(this.m_Quad[2].x, this.m_Quad[2].y),
             s = new Vector2(this.m_Quad[3].x, this.m_Quad[3].y),
             h = new HmSqrToQuad(n, a, o, s),
             l = h.transform(new Vector2(r, i));
         return new Point2D(l.x, l.y)
     },
     dispose: function() {
         for (var e = 0; e < this.m_Outlines.length; e++) this.m_Outlines[e].length = 0;
         this.m_Outlines.length = null, this.m_Quad.length = null
     },
     getOutlines: function() {
         return this.m_Outlines
     },
     getOutlinesBounds: function() {
         var e, t, r, i;
         if (0 != this.m_Outlines.length) {
             e = this.m_Outlines[0][0].x, r = e, t = this.m_Outlines[0][0].y, i = t;
             for (var n = 0; n < this.m_Outlines.length; n++)
                 for (var a = this.m_Outlines[n], o = 0; o < a.length; o++) a[o].x < e && (e = a[o].x), a[o].x > r && (r = a[o].x), a[o].y < t && (t = a[o].y), a[o].y > i && (i = a[o].y);
             return new Rectangle(e, t, r - e, i - t)
         }
         return new Rectangle(0, 0, 0, 0)
     },
     ptInOutline: function(e, t) {
         for (var r = 0; r < this.m_Outlines.length; ++r) {
             var i = this.m_Outlines[r],
                 n = i.length,
                 a, o, s = 0;
             for (a = 0, o = n - 1; n > a; o = a++) i[a].y > t != i[o].y > t && e < (i[o].x - i[a].x) * (t - i[a].y) / (i[o].y - i[a].y) + i[a].x && (s = !s);
             if (s) return s
         }
         return s
     }
 }, Textureseed = function() {
     this.id = "Textureseed", this.m_TextureLoaded = !1, this.m_BumpLoaded = !1, this.m_TextureImageJS = new Image, this.m_BumpImageJS = new Image, this.m_LastTexturePath = "", this.m_LastBumpPath = "", this.m_NormalScale = 1, this.m_Reflectivity = 0, this.m_Shininess = 0, this.m_HDRalpha = 1
 }, Textureseed.prototype = {
     setMaterialProperties: function(e, t, r, i) {
         this.m_NormalScale = e, this.m_Reflectivity = t, this.m_Shininess = r, this.m_HDRalpha = i
     },
     setFromCanvases: function(e, t) {
         this.m_TextureImageJS = e, this.m_BumpImageJS = t
     },
     loadFromPaths: function(e, t, r) {
         var i = this;
         return this.m_Callback = r, this.m_TextureLoaded = !1, this.m_BumpLoaded = !1, e == this.m_LastTexturePath ? void(this.m_Callback && this.m_Callback()) : ("" != e ? this.m_TextureImageJS ? (this.m_TextureImageJS.onload = function() {
             i.m_TextureLoaded = !0, i.callbackIfDone()
         }, this.m_TextureImageJS.src = e, this.m_LastTexturePath = e) : alert("textureseed: Failed to create texture image") : alert("problem with texture path:" + e), void("" != t ? this.m_BumpImageJS ? (this.m_BumpImageJS.onload = function() {
             i.m_BumpLoaded = !0, i.callbackIfDone()
         }, this.m_BumpImageJS.src = t, this.m_LastBumpPath = t) : alert("textureseed: failed to create bump image") : alert("problem with bump path:" + t)))
     },
     isCanvas: function(e) {
         return null != e ? e instanceof HTMLCanvasElement : !1
     },
     callbackIfDone: function() {
         this.m_TextureLoaded && this.m_BumpLoaded && this.m_Callback && this.m_Callback()
     }
 };
 var mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259],
     shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
 if (BackplaneCreator2.prototype = {
         reset: function() {
             this.m_greySamplingArray = new Array, this.m_whiteBalancedArray = new Array
         },
         createBackplane: function(e, t) {
             this.m_SampleSpacing = t, this.m_WidthPixels = e.width, this.m_HeightPixels = e.height, 0 == this.m_whiteBalancedArray.length && this.makeWhiteBalanceArray(e, this.m_SampleSpacing);
             var r = document.createElement("CANVAS");
             r.width = this.m_WidthPixels, r.height = this.m_HeightPixels;
             var i = r.getContext("2d");
             return i.clearRect(0, 0, r.width, r.height), this.fillGreyLevels(r, this.m_whiteBalancedArray, 0), stackBlurCanvasRGB(r, 0, 0, this.m_WidthPixels, this.m_HeightPixels, 80), r
         },
         createBackplaneWhiteBalanceOnly: function(e) {
             var t = {
                     brightness: 65,
                     contrast: -.3
                 },
                 r = document.createElement("CANVAS");
             r.width = e.width, r.height = e.height;
             var i = r.getContext("2d");
             if (i.drawImage(e, 0, 0), !Pixastic.process(r, "brightness", t)) return alert("call failed: brightness"), null;
             var n = {
                 average: !1
             };
             return Pixastic.process(t.resultCanvas, "desaturate", n) ? n.resultCanvas : void alert("call failed: desaturate")
         },
         createHighlightPlane: function(e, t) {
             this.m_SampleSpacing = t, this.m_WidthPixels = e.width, this.m_HeightPixels = e.height, 0 == this.m_whiteBalancedArray.length && this.makeWhiteBalanceArray(e, t);
             var r = document.createElement("CANVAS");
             return r.width = this.m_WidthPixels, r.height = this.m_HeightPixels, r.width = r.width, this.fillGreyLevels(r, this.m_whiteBalancedArray, 210), stackBlurCanvasRGBA(r, 0, 0, this.m_WidthPixels, this.m_HeightPixels, 80), r
         },
         makeRGBA: function(e, t, r, i) {
             return "rgba(" + e + "," + t + "," + r + "," + i + ")"
         },
         fillGreyLevels: function(e, t, r) {
             for (var i = e.getContext("2d"), n = 0; n < this.m_StepsW; n++)
                 for (var a = 0; a < this.m_StepsH; a++) {
                     var o = this.getSampleGrey(t, n, a);
                     o >= r && (i.fillStyle = this.makeRGBA(o, o, o, 1), i.fillRect(n * this.m_SampleSpacing, a * this.m_SampleSpacing, this.m_SampleSpacing, this.m_SampleSpacing))
                 }
         },
         makeWhiteBalanceArray: function(e, t) {
             this.createGreySamplingArray(e, t), this.whiteBalance(150, 255)
         },
         createGreySamplingArray: function(e, t) {
             var r = document.createElement("CANVAS");
             r.width = this.m_WidthPixels, r.height = this.m_HeightPixels;
             var i = r.getContext("2d");
             i.clearRect(0, 0, r.width, r.height), i.drawImage(e, 0, 0), stackBlurCanvasRGB(r, 0, 0, this.m_WidthPixels, this.m_HeightPixels, 20), this.m_StepsW = Math.ceil(this.m_WidthPixels / t), this.m_StepsH = Math.ceil(this.m_HeightPixels / t), this.m_greySamplingArray = new Array(this.m_StepsW * this.m_StepsH);
             for (var n = 0; n < this.m_greySamplingArray.length; n++) this.m_greySamplingArray[n] = 125;
             for (var a = 0; a < this.m_StepsW; a++) {
                 sx = a * t;
                 for (var o = 0; o < this.m_StepsH; o++) {
                     sy = o * t;
                     var s = i.getImageData(sx, sy, 1, 1).data,
                         h = this.valueFromRGB(s);
                     this.setSampleGrey(this.m_greySamplingArray, a, o, h)
                 }
             }
             r = null
         },
         valueFromRGB: function(e) {
             var t = parseFloat(e[0]) * this.lumaR + parseFloat(e[1]) * this.lumaG + parseFloat(e[2]) * this.lumaB,
                 r = parseInt(t);
             return r ? r : void alert("bad val")
         },
         setSampleGrey: function(e, t, r, i) {
             var n = r * this.m_StepsH + t;
             e[n] = parseInt(i)
         },
         getSampleGrey: function(e, t, r) {
             var i = r * this.m_StepsH + t;
             return parseInt(e[i])
         },
         whiteBalance: function(e, t) {
             this.m_whiteBalancedArray = new Array(this.m_StepsW * this.m_StepsH);
             for (var r = this.m_greySamplingArray[0], i = this.m_greySamplingArray[0], n = 1; n < this.m_greySamplingArray.length; n++) {
                 var a = this.m_greySamplingArray[n];
                 a > r && (r = a), i > a && (i = a)
             }
             i > e && (e = i);
             for (var o = r - i, s = t - e, n = 0; n < this.m_greySamplingArray.length; n++) {
                 var h = this.m_greySamplingArray[n],
                     l = (h - i) / o,
                     u = e + l * s;
                 this.m_whiteBalancedArray[n] = u
             }
         }
     }, Texturemaker = function(e) {
         this.id = "Texturemaker", this.m_TextureLoaded = !1, this.m_BumpLoaded = !1, void 0 !== e ? this.TEXTURESIZE = e : this.TEXTURESIZE = 2048, this.LOWRESTEXTURESIZE = 256, 0 != this.TEXTURESIZE && (this.m_GLtextureCanvas = document.createElement("canvas"), this.m_GLtextureCanvas || alert("Texturemaker:failed to make m_GLtextureCanvas"), this.m_GLbumpCanvas = document.createElement("canvas"), this.m_GLbumpCanvas || alert("Texturemaker:failed to make m_GLbumpCanvas")), this.m_GLtextureCanvas.width = this.TEXTURESIZE, this.m_GLtextureCanvas.height = this.TEXTURESIZE, this.m_GLbumpCanvas.width = this.TEXTURESIZE, this.m_GLbumpCanvas.height = this.TEXTURESIZE, this.INCHES_TO_MM = 25.4, this.MM_TO_INCHES = .03937, this.m_isZodiaq = !1, this.m_TypicalTextureColour = null
     }, Texturemaker.prototype = {
         getGLtextureCanvas: function() {
             return this.m_GLtextureCanvas
         },
         getGLbumpCanvas: function() {
             return this.m_GLbumpCanvas
         },
         setMaterialProperties: function(e, t, r, i) {
             this.m_NormalScale = e, this.m_Reflectivity = t, this.m_Shininess = r, this.m_HDRalpha = i
         },
         makeFromSupertexturePaths: function(e, t, r) {
             var i = this;
             this.m_Callback = r, "" != e ? (this.m_TextureImageJS = new Image, this.m_TextureImageJS.onload = function() {
                 i.m_TextureLoaded = !0, i.callbackIfDone()
             }, this.m_TextureImageJS.src = e) : alert("problem with texture path:" + e), "" != t ? (this.m_BumpImageJS = new Image, this.m_BumpImageJS.onload = function() {
                 i.m_BumpLoaded = !0, i.callbackIfDone()
             }, this.m_BumpImageJS.src = t) : alert("problem with bump path:" + t)
         },
         getTextureCanvas: function() {
             return this.m_GLtextureCanvas
         },
         getBumpCanvas: function() {
             return this.m_GLbumpCanvas
         },
         glTextureFromImage: function(e, t, r) {
             var i = t.getContext("2d");
             1 == r ? (t.width = this.LOWRESTEXTURESIZE, t.height = this.LOWRESTEXTURESIZE, i.drawImage(e, 0, 0, this.LOWRESTEXTURESIZE, this.LOWRESTEXTURESIZE)) : (t.width = this.TEXTURESIZE, t.height = this.TEXTURESIZE, i.drawImage(e, 0, 0, this.TEXTURESIZE, this.TEXTURESIZE))
         },
         noResizeglTextureFromImage: function(e, t) {
             var r = document.createElement("canvas");
             if (1 == t) {
                 r.width = this.LOWRESTEXTURESIZE, r.height = this.LOWRESTEXTURESIZE;
                 var i = r.getContext("2d");
                 i.drawImage(e, 0, 0, this.LOWRESTEXTURESIZE, this.LOWRESTEXTURESIZE)
             } else {
                 r.width = e.width, r.height = e.height;
                 var i = r.getContext("2d");
                 i.drawImage(e, 0, 0, r.width, r.height)
             }
             return r
         },
         callbackIfDone: function() {
             this.m_TextureLoaded && this.m_BumpLoaded && (this.m_GLtextureCanvas = this.glTextureFromImage(this.m_TextureImageJS), this.m_GLbumpCanvas = this.glTextureFromImage(this.m_BumpImageJS), this.m_Callback && this.m_Callback())
         },
         OLDmakeFromTextureseed: function(e, t, r, i, n, a, o) {
             this.m_WidthMM = t, this.m_HeightMM = r, this.m_DPI = i, this.m_FillColour = n, this.m_AlignPtMM = o, this.m_Callback = null, this.makeSupertexture(e.m_TextureImageJS, e.m_BumpImageJS, a)
         },
         makeGLTexturesFromTextureseed: function(e, t, r, i, n, a) {
             this.m_TypicalTextureColour = null, this.m_WidthMM = t, this.m_HeightMM = r, this.m_isZodiaq = e.m_isZodiaq, this.m_DPI = e.m_DPI, this.m_FillColour = i, this.m_AlignPtMM = a, this.m_Callback = null, e.m_HasValidBump ? this.makeGLTexturesDirect(e.m_TextureImageJS, e.m_BumpImageJS, n) : this.makeGLTexturesDirect(e.m_TextureImageJS, null, n), this.m_Callback && this.m_Callback()
         },
         makeFromTexturePaths: function(e, t, r, i, n, a, o) {
             alert("Dont use this function now");
             var s = this;
             this.m_Callback = o, this.m_WidthMM = r, this.m_HeightMM = i, this.m_DPI = n, this.m_FillColour = a, "" != e ? (this.m_TextureImageJS = new Image, this.m_TextureImageJS.onload = function() {
                 s.m_TextureLoaded = !0, s.makeSupertextureIfDone()
             }, this.m_TextureImageJS.src = e) : alert("problem with texture path:" + e), "" != t ? (this.m_BumpImageJS = new Image, this.m_BumpImageJS.onload = function() {
                 s.m_BumpLoaded = !0, s.makeSupertextureIfDone()
             }, this.m_BumpImageJS.src = t) : alert("problem with bump path:" + t)
         },
         makeSupertextureIfDone: function() {
             this.m_TextureLoaded && this.m_BumpLoaded && this.makeSupertexture(this.m_TextureImageJS, this.m_BumpImageJS)
         },
         makeSupertexture: function(e, t, r) {
             var i = this.m_WidthMM * this.m_DPI / this.INCHES_TO_MM,
                 n = this.m_HeightMM * this.m_DPI / this.INCHES_TO_MM,
                 a = 0,
                 o = 0;
             if (-1 != this.m_AlignPtMM) {
                 var s = this.m_AlignPtMM.x * this.MM_TO_INCHES * this.m_DPI,
                     h = this.m_AlignPtMM.y * this.MM_TO_INCHES * this.m_DPI;
                 a = s % e.width, o = h % e.height
             }
             var l = document.createElement("CANVAS");
             l.width = i, l.height = n;
             var u = l.getContext("2d");
             u || Alert("supertexture creation failed"), this.m_FillColour && (u.fillStyle = this.m_FillColour, u.fillRect(0, 0, i, n));
             var c = u.createPattern(e, "repeat");
             u.rect(0, 0, i, n), u.fillStyle = c, u.translate(a, o), u.fill();
             var d = document.createElement("CANVAS");
             d.width = i, d.height = n;
             var f = d.getContext("2d");
             f.fillStyle = "rgba(127,127,225,1.0)", f.fillRect(0, 0, i, n);
             var p = f.createPattern(t, "repeat");
             f.rect(0, 0, i, n), f.fillStyle = p, f.translate(a, o), f.fill(), this.glTextureFromImage(l, this.m_GLtextureCanvas, r), this.glTextureFromImage(d, this.m_GLbumpCanvas, r), l = null, d = null, this.m_Callback && this.m_Callback()
         },
         makeGLTexturesDirect: function(e, t, r) {
             var i = this.m_WidthMM * this.m_DPI / this.INCHES_TO_MM,
                 n = this.m_HeightMM * this.m_DPI / this.INCHES_TO_MM;
             1 == r && (alert("Low res texture not supported at this moment"), this.m_GLtextureCanvas.width = this.LOWRESTEXTURESIZE, this.m_GLtextureCanvas.height = this.LOWRESTEXTURESIZE, this.m_GLbumpCanvas.width = this.LOWRESTEXTURESIZE, this.m_GLbumpCanvas.height = this.LOWRESTEXTURESIZE);
             var a = this.m_GLtextureCanvas.width / i,
                 o = this.m_GLtextureCanvas.width / n,
                 s = 0,
                 h = 0;
             if (-1 != this.m_AlignPtMM) {
                 var l = this.m_AlignPtMM.x * this.MM_TO_INCHES * this.m_DPI,
                     u = this.m_AlignPtMM.y * this.MM_TO_INCHES * this.m_DPI;
                 s = l % e.width, h = u % e.height
             }
             var c = this.m_GLtextureCanvas.getContext("2d");
             c.scale(a, o), c.fillStyle = "rgba(0,0,0,0)", c.fillRect(0, 0, i, n), this.m_FillColour && (c.fillStyle = this.m_FillColour, c.fillRect(0, 0, i, n)), this.m_Pattern = c.createPattern(e, "repeat"), this.m_Pattern ? (c.rect(0, 0, i, n), c.fillStyle = this.m_Pattern, c.translate(s, h), c.fill(), this.m_Pattern = null) : alert("texturemaker: failed to make pattern");
             var d = this.m_GLbumpCanvas.getContext("2d");
             d.scale(a, o), d.fillStyle = "rgba(127,127,225,1.0)", d.fillRect(0, 0, i, n), null != t && (this.m_PatternBump = d.createPattern(t, "repeat"), this.m_PatternBump ? (d.rect(0, 0, i, n), d.fillStyle = this.m_PatternBump, d.translate(s, h), d.fill(), this.m_PatternBump = null) : alert("texturemaker: failed to make bump pattern"))
         },
         getTypicalTextureColour: function() {
             return null == this.m_TypicalTextureColour && this.calculateTypicalTextureColour(), this.m_TypicalTextureColour
         },
         calculateTypicalTextureColour: function() {
             for (var e = 30, t = 0, r = 0, i = 0, n = this.m_GLtextureCanvas.width, a = this.m_GLtextureCanvas.height, o = this.m_GLtextureCanvas.getContext("2d"), s = 0; e > s; s++) {
                 var h = Math.random() * n,
                     l = Math.random() * a,
                     u = o.getImageData(h, l, 1, 1).data;
                 t += u[0], r += u[1], i += u[2]
             }
             var c = t / e,
                 d = r / e,
                 f = i / e,
                 p = parseInt(c),
                 m = parseInt(d),
                 E = parseInt(f);
             this.m_TypicalTextureColour = this.makeRGBA(p, m, E, 1)
         },
         makeRGBA: function(e, t, r, i) {
             return "rgba(" + e + "," + t + "," + r + "," + i + ")"
         },
         dispose: function() {
             this.m_GLtextureCanvas = null, this.m_GLbumpCanvas = null, this.m_TextureImageJS = null, this.m_BumpImageJS = null, this.m_Pattern = null, this.m_PatternBump = null, this.m_TypicalTextureColour = null
         },
         makeFromSuperCanvases: function(e, t) {
             alert("makeFromSuperCanvases: this process will be too slow on iPads"), this.glTextureFromImage(e, this.m_GLtextureCanvas, !1), this.glTextureFromImage(t, this.m_GLbumpCanvas, !1)
         },
         setGLCanvasesDirect: function(e, t) {
             if (this.m_GLtextureCanvas = e, this.TEXTURESIZE = e.width, null != t) this.m_GLbumpCanvas = t;
             else {
                 this.m_GLbumpCanvas.width = this.m_GLtextureCanvas.width, this.m_GLbumpCanvas.height = this.m_GLtextureCanvas.height;
                 var r = this.m_GLbumpCanvas.getContext("2d");
                 r.fillStyle = "rgba(127,0,225,1.0)", r.fillRect(0, 0, this.m_GLbumpCanvas.width, this.m_GLbumpCanvas.height)
             }
         }
     }, WebGLRenderer = function(e) {
         this.id = "WebGLRenderer", this.m_Scene = new THREE.Scene, this.m_Camera = new THREE.Camera, this.m_Scene.add(this.m_Camera), this.m_bumpColor = new THREE.Color(0), this.m_ldrMat = new THREE.MeshBasicMaterial({}), this.m_hdrMat = new THREE.MeshPhongMaterial({
             color: this.m_bumpColor,
             envMap: null
         }), this.m_plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), this.m_ldrMat), this.m_plane.matrixAutoUpdate = !1, this.m_Scene.add(this.m_plane), this.m_ambiLight = new THREE.AmbientLight(16777215), this.m_Scene.add(this.m_ambiLight), this.m_pointlight = new THREE.PointLight, this.m_Scene.add(this.m_pointlight), void 0 != e && e ? this.m_WebGLRenderer = new THREE.WebGLRenderer({
             stencil: !1,
             alpha: !0,
             premultipliedAlpha: !1
         }) : this.m_WebGLRenderer = new THREE.WebGLRenderer({
             stencil: !1,
             alpha: !0
         }), this.m_usingChrome = this.usingChromeBrowser(), this.m_usingChrome45 = this.isDesktopChromeVersion45()
     }, WebGLRenderer.prototype = {
         usingChromeBrowser: function() {
             var e = window.chrome,
                 t = window.navigator.vendor;
             return null !== e && void 0 !== e && "Google Inc." === t ? !0 : !1
         },
         isDesktopChromeVersion45: function() {
             return -1 != navigator.userAgent.toLowerCase().indexOf("android") ? !1 : -1 != navigator.userAgent.toLowerCase().indexOf("ipad") ? !1 : -1 != navigator.userAgent.toLowerCase().indexOf("iphone") ? !1 : -1 != navigator.userAgent.toLowerCase().indexOf("ipod") ? !1 : -1 != navigator.userAgent.indexOf("Chrome") && "45" == navigator.userAgent.substring(navigator.userAgent.indexOf("Chrome") + 7, navigator.userAgent.indexOf("Chrome") + 9) ? !0 : !1
         },
         degInRad: function(e) {
             return e * Math.PI / 180
         },
         hasActiveEnvironment: function() {
             return null != this.m_hdrMat.envMap ? !0 : !1
         },
         setEnvTransformsForGrid: function(e, t) {
             this.m_Scene.position.x = e.m_TransSetup.tx, this.m_Scene.position.y = e.m_TransSetup.ty, this.m_Scene.position.z = e.m_TransSetup.tz, this.m_Scene.rotation.x = this.degInRad(e.m_TransSetup.rx), this.m_Scene.rotation.y = this.degInRad(e.m_TransSetup.ry), this.m_Scene.rotation.z = this.degInRad(e.m_TransSetup.rz), this.m_Scene.scale.x = e.m_TransSetup.sx, this.m_Scene.scale.y = e.m_TransSetup.sy, this.m_Scene.scale.z = e.m_TransSetup.sz, this.m_Scene.needsUpdate = !0
         },
         setupCanvases: function(e, t) {
             var r = e.width,
                 i = e.height;
             this.m_usingChrome && (this.m_tempCanvas = document.createElement("canvas"), this.m_tempCanvas.width = r, this.m_tempCanvas.height = i), this.m_LDRCanvas = e, this.m_HDRCanvas = t, this.m_WebGLRenderer.setViewport(-1, -1, 2, 2), this.m_WebGLRenderer.autoClear = !1, this.m_WebGLRenderer.setClearColor(new THREE.Color(0, 0)), this.m_WebGLRenderer.setPixelRatio(1), this.m_WebGLRenderer.setSize(r, i), "undefined" != typeof this.m_CubeMap && (this.m_CubeMap = null)
         },
         renderGridLDR: function(e, t) {
             if (!this.m_LDRCanvas) return void alert("setupCanvases has not been called prior to rendering");
             this.clearScene();
             var r = e.getOutlinesBounds();
             this.m_WebGLRenderer.enableScissorTest(!0), this.m_WebGLRenderer.setScissor(r.x, this.m_LDRCanvas.height - (r.y + r.height), r.width, r.height);
             var i = this.m_WebGLRenderer.getMaxAnisotropy(),
                 n = e.getTransMatrix();
             null == n && (n = this.getMatrix(e, this.m_LDRCanvas.width, this.m_LDRCanvas.height), e.setTransMatrix(n));
             var a = new THREE.Texture(t.getTextureCanvas());
             this.m_usingChrome45 && (a.type = THREE.FloatType), a.needsUpdate = !0, a.anisotropy = i, this.m_ldrMat.map = a, this.m_ldrMat.needsUpdate = !0, this.m_plane.material = this.m_ldrMat;
             var o = new THREE.Matrix4;
             o.makeTranslation(0, 0, -.5), o.multiply(n), this.m_plane.matrix = o, this.m_plane.needsUpdate = !0, this.m_pointlight.intensity = 0, this.m_pointlight.needsUpdate = !0, this.m_ambiLight.intensity = 1, this.m_ambiLight.needsUpdate = !0, this.m_Scene.needsUpdate = !0, this.m_WebGLRenderer.render(this.m_Scene, this.m_Camera);
             var s = this.m_LDRCanvas.getContext("2d"),
                 h = this.m_WebGLRenderer.domElement;
             if (this.m_usingChrome) {
                 var l = this.m_tempCanvas.getContext("2d");
                 l.clearRect(0, 0, this.m_tempCanvas.width, this.m_tempCanvas.height), l.fillStyle = "rgb(255,0,0)", l.globalCompositeOperation = "source-over";
                 for (var u = 0; u < e.m_Outlines.length; u++) {
                     var c = e.m_Outlines[u];
                     l.beginPath(), l.moveTo(c[0].x, c[0].y);
                     for (var d = 1; d < c.length; d++) l.lineTo(c[d].x, c[d].y);
                     l.lineTo(c[0].x, c[0].y), l.closePath(), l.fill()
                 }
                 l.globalCompositeOperation = "source-atop", l.drawImage(h, 0, 0, this.m_LDRCanvas.width, this.m_LDRCanvas.height),
                     s.drawImage(this.m_tempCanvas, 0, 0, this.m_LDRCanvas.width, this.m_LDRCanvas.height)
             } else {
                 s.save(), s.beginPath();
                 for (var u = 0; u < e.m_Outlines.length; u++) {
                     var c = e.m_Outlines[u];
                     s.moveTo(c[0].x, c[0].y);
                     for (var d = 1; d < c.length; d++) s.lineTo(c[d].x, c[d].y);
                     s.lineTo(c[0].x, c[0].y)
                 }
                 s.closePath(), s.clip(), s.drawImage(h, 0, 0, this.m_LDRCanvas.width, this.m_LDRCanvas.height), s.restore()
             }
             this.m_ldrMat.map = null, a.dispose(), a = null, o = null
         },
         startRenderLDR: function() {
             if (10 == this.m_LoopCounter) {
                 cancelAnimationFrame(this.m_requestId);
                 var e = this.m_LDRCanvas.getContext("2d");
                 e.save(), e.beginPath();
                 for (var t = 0; t < grid.m_Outlines.length; t++) {
                     var r = grid.m_Outlines[t];
                     e.moveTo(r[0].x, r[0].y);
                     for (var i = 1; i < r.length; i++) e.lineTo(r[i].x, r[i].y);
                     e.lineTo(r[0].x, r[0].y)
                 }
                 e.closePath(), e.clip();
                 var n = this.m_WebGLRenderer.domElement;
                 e.drawImage(n, 0, 0, this.m_LDRCanvas.width, this.m_LDRCanvas.height), e.restore()
             } else 5 == this.m_LoopCounter && this.m_WebGLRenderer.render(this.m_Scene, this.m_Camera), this.m_LoopNumber++
         },
         renderGridHDR: function(e, t) {
             if (!this.m_HDRCanvas) return void alert("setupCanvases has not been called prior to rendering");
             this.clearScene();
             var r = this.m_WebGLRenderer.getMaxAnisotropy(),
                 i = e.getTransMatrix();
             null == i && (i = this.getMatrix(e, this.m_LDRCanvas.width, this.m_LDRCanvas.height), e.setTransMatrix(i)), this.setEnvTransformsForGrid(e, i);
             var n = t.getBumpCanvas(),
                 a = new THREE.Texture(n);
             a.anisotropy = r, this.m_usingChrome45 && (a.type = THREE.FloatType), a.needsUpdate = !0, this.m_hdrMat.normalMap = a, this.m_hdrMat.reflectivity = t.m_Reflectivity, this.m_hdrMat.shininess = t.m_Shininess, this.m_hdrMat.normalScale.x = t.m_NormalScale, this.m_hdrMat.normalScale.y = t.m_NormalScale, this.m_hdrMat.needsUpdate = !0, this.m_plane.material = this.m_hdrMat;
             var o = new THREE.Matrix4;
             o.makeTranslation(0, 0, -.5), o.multiply(i), this.m_plane.matrix = o, this.m_plane.needsUpdate = !0, this.m_pointlight.position.x = e.m_LightSetup.x, this.m_pointlight.position.y = e.m_LightSetup.y, this.m_pointlight.position.z = e.m_LightSetup.z, this.m_pointlight.needsUpdate = !0, this.m_pointlight.intensity = e.m_LightSetup.intensity, this.m_pointlight.needsUpdate = !0, this.m_ambiLight.intensity = 0, this.m_ambiLight.needsUpdate = !0, this.m_WebGLRenderer.render(this.m_Scene, this.m_Camera);
             var s = this.m_HDRCanvas.getContext("2d");
             s.fillStyle = "black";
             var h = 0;
             for (h = 0; h < e.m_Outlines.length; h++) {
                 var l = e.m_Outlines[h];
                 s.beginPath(), s.moveTo(l[0].x, l[0].y);
                 for (var u = 1; u < l.length; u++) s.lineTo(l[u].x, l[u].y);
                 s.lineTo(l[0].x, l[0].y), s.closePath(), s.fill()
             }
             s.save(), s.clip();
             var c = t.m_HDRalpha;
             s.globalAlpha = c;
             var d = this.m_WebGLRenderer.domElement;
             s.drawImage(d, 0, 0, this.m_HDRCanvas.width, this.m_HDRCanvas.height), s.globalAlpha = 1, s.restore(), this.m_hdrMat.normalMap = null, a.dispose(), a = null, o = null
         },
         renderGridPreview: function(e, t) {
             if (alert("dont use render grid preview needs updating"), !this.m_LDRCanvas) return void alert("setCanvasSize has not been called prior to rendering");
             this.clearScene();
             var r = this.m_WebGLRenderer.getMaxAnisotropy(),
                 i = this.getMatrix(e, this.m_LDRCanvas.width, this.m_LDRCanvas.height),
                 n = new THREE.Texture(t.getTextureCanvas());
             n.anisotropy = r, n.needsUpdate = !0;
             var a = new THREE.MeshBasicMaterial({
                 map: n,
                 side: THREE.DoubleSide
             });
             a.needsUpdate = !0;
             var o = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), a);
             o.matrixAutoUpdate = !1, this.m_Scene.add(o);
             var s = new THREE.Matrix4;
             s.makeTranslation(0, 0, -.5), s.multiply(i), o.matrix = s, o.needsUpdate = !0;
             var h = new THREE.AmbientLight(16777215);
             this.m_Scene.add(h), h.needsUpdate = !0, this.m_WebGLRenderer.render(this.m_Scene, this.m_Camera);
             var l = this.m_LDRCanvas.getContext("2d");
             l.clearRect(0, 0, this.m_LDRCanvas.width, this.m_LDRCanvas.height), l.save(), l.beginPath();
             for (var u = 0; u < e.m_Outlines.length; u++) {
                 var c = e.m_Outlines[u];
                 l.moveTo(c[0].x, c[0].y);
                 for (var d = 1; d < c.length; d++) l.lineTo(c[d].x, c[d].y);
                 l.lineTo(c[0].x, c[0].y)
             }
             l.closePath(), l.clip();
             var f = this.m_WebGLRenderer.domElement;
             l.drawImage(f, 0, 0, this.m_LDRCanvas.width, this.m_LDRCanvas.height), l.restore()
         },
         clearScene: function() {
             var e = this;
             e.m_WebGLRenderer.clear(!0, !0, !0)
         },
         removeEnvironmentImage: function() {
             null != this.m_hdrMat.envMap && this.m_hdrMat.envMap.dispose(), this.m_hdrMat.envMap = null
         },
         makeEnvironmentFromImage: function(e) {
             var t = e.width / 4,
                 r = document.createElement("canvas");
             r.width = t, r.height = t;
             var i = r.getContext("2d");
             i.drawImage(e, 0, t, t, t, 0, 0, t, t);
             var n = document.createElement("canvas");
             n.width = t, n.height = t;
             var a = n.getContext("2d");
             a.drawImage(e, t, 0, t, t, 0, 0, t, t);
             var o = document.createElement("canvas");
             o.width = t, o.height = t;
             var s = o.getContext("2d");
             s.drawImage(e, t, t, t, t, 0, 0, t, t);
             var h = document.createElement("canvas");
             h.width = t, h.height = t;
             var l = h.getContext("2d");
             l.drawImage(e, t, 2 * t, t, t, 0, 0, t, t);
             var u = document.createElement("canvas");
             u.width = t, u.height = t;
             var c = u.getContext("2d");
             c.drawImage(e, 2 * t, t, t, t, 0, 0, t, t);
             var d = document.createElement("canvas");
             d.width = t, d.height = t;
             var f = d.getContext("2d");
             f.drawImage(e, 3 * t, t, t, t, 0, 0, t, t);
             var p = [];
             p.push(u), p.push(r), p.push(n), p.push(h), p.push(o), p.push(d);
             var m = THREE.CubeReflectionMapping;
             this.m_CubeMap = new THREE.CubeTexture(p, m), this.m_CubeMap.format = THREE.RGBFormat, this.m_CubeMap.flipY = !1, this.m_CubeMap.wrapS = THREE.ClampToEdgeWrapping, this.m_CubeMap.wrapT = THREE.ClampToEdgeWrapping, this.m_CubeMap.needsUpdate = !0, this.m_hdrMat.envMap = this.m_CubeMap, u = null, r = null, n = null, h = null, o = null, d = null
         },
         getDomElement: function() {
             return this.m_WebGLRenderer.domElement
         },
         createMesh: function(e, t, r) {
             var i = new THREE.Texture(t);
             i.needsUpdate = !0, e.computeVertexNormals();
             var n = new THREE.MeshPhongMaterial;
             if (n.map = i, n.transparent = !0, a) {
                 var a = new THREE.Texture(r);
                 a.needsUpdate = !0, n.bumpMap = a, n.bumpScale = 1, console.log("d")
             }
             n.needsUpdate = !0;
             var o = new THREE.Mesh(e, n);
             return o.dynamic = !0, o.needsUpdate = !0, o
         },
         startRender: function() {
             if (5 == this.m_LoopCounter) {
                 cancelAnimationFrame(this.m_requestId);
                 var e = this.m_LDRCanvas.getContext("2d"),
                     t = this.m_WebGLRenderer.domElement;
                 e.drawImage(t, 0, 0, this.m_LDRCanvas.width, this.m_LDRCanvas.height)
             } else this.m_requestId = requestAnimationFrame(this.startRender.bind(this)), this.m_WebGLRenderer.render(this.m_Scene, this.m_Camera), this.m_LoopNumber++
         },
         getLDRCanvas: function() {
             return this.m_LDRCanvas
         },
         getHDRCanvas: function() {
             return this.m_HDRCanvas
         },
         getMatrix: function(e, t, r) {
             var i = this.canvasLocToGLVertex(e.m_Quad[0], t, r),
                 n = this.canvasLocToGLVertex(e.m_Quad[1], t, r),
                 a = this.canvasLocToGLVertex(e.m_Quad[2], t, r),
                 o = this.canvasLocToGLVertex(e.m_Quad[3], t, r),
                 s = i.x,
                 h = i.y,
                 l = n.x,
                 u = n.y,
                 c = a.x,
                 d = a.y,
                 f = o.x,
                 p = o.y,
                 m = new Matrix(4, 4, [
                     [1, 0, 0, 1],
                     [0, 1, 0, -1],
                     [0, 0, 1, 0],
                     [0, 0, 0, 1]
                 ]),
                 E = new Matrix(4, 4, [
                     [.5, 0, 0, 0],
                     [0, -.5, 0, 0],
                     [0, 0, 1, 0],
                     [0, 0, 0, 1]
                 ]),
                 g = new Matrix(4, 4, [
                     [l - s, f - s, 0, s],
                     [u - h, p - h, 0, h],
                     [0, 0, 1, 0],
                     [0, 0, 0, 1]
                 ]),
                 v = g.values[0][0] * g.values[1][1] - g.values[0][1] * g.values[1][0],
                 y = (g.values[1][1] * c - g.values[0][1] * d + g.values[0][1] * h - g.values[1][1] * s) / v,
                 T = (g.values[0][0] * d - g.values[1][0] * c + g.values[1][0] * s - g.values[0][0] * h) / v,
                 R = 0,
                 x = new Matrix(4, 4, [
                     [y / (y + T - 1), 0, 0, 0],
                     [0, T / (y + T - 1), 0, 0],
                     [0, R, 1, 0],
                     [y / (y + T - 1) - 1, T / (y + T - 1) - 1, 0, 1]
                 ]),
                 H = new Matrix(4, 4, [
                     [1, 0, 0, 0],
                     [0, 1, 0, 0],
                     [0, 0, 1, 0],
                     [0, 0, 0, 1]
                 ]);
             H = g.multiply(x), H = H.multiply(E), H = H.multiply(m);
             var _ = H.values[0][0],
                 b = H.values[1][0],
                 w = H.values[2][0],
                 M = H.values[3][0],
                 S = H.values[0][1],
                 C = H.values[1][1],
                 A = H.values[2][1],
                 L = H.values[3][1],
                 P = H.values[0][2],
                 D = H.values[1][2],
                 F = H.values[2][2],
                 k = H.values[3][2],
                 B = H.values[0][3],
                 N = H.values[1][3],
                 I = H.values[2][3],
                 O = H.values[3][3],
                 U = new THREE.Matrix4;
             return U.set(_.toFixed(10), b.toFixed(10), w.toFixed(10), M.toFixed(10), S.toFixed(10), C.toFixed(10), A.toFixed(10), L.toFixed(10), P.toFixed(10), D.toFixed(10), F.toFixed(10), k.toFixed(10), B.toFixed(10), N.toFixed(10), I.toFixed(10), O.toFixed(10)), U.transpose(), U
         },
         canvasLocToGLVertex: function(e, t, r) {
             if (e) {
                 var i = t / 2,
                     n = r / 2;
                 return new Point2D(e.x / i - 1, 2 - e.y / n - 1)
             }
         },
         createCubeMap: function() {
             var e = "../assets_GL/textures/cubemap/parliament/",
                 t = ".jpg",
                 r = [e + "posx" + t, e + "negx" + t, e + "posy" + t, e + "negy" + t, e + "posz" + t, e + "negz" + t],
                 i = THREE.ImageUtils.loadTextureCube(r, new THREE.CubeReflectionMapping);
             return i
         },
         setScissorArea: function(e, t, r, i, n) {
             this.m_WebGLRenderer.enableScissorTest(e), e && this.m_WebGLRenderer.setScissor(t, r, i, n)
         }
     }, ColouriseRenderer = function() {
         this.id = "ColouriseRenderer"
     }, ColouriseRenderer.prototype = {
         setupCanvases: function(e, t) {
             this.m_LDRCanvas = e, this.m_HDRCanvas = t
         },
         renderGrid: function(e, t) {
             if (!this.m_LDRCanvas) return void alert("setCanvasSize has not been called prior to rendering");
             var r = this.m_LDRCanvas.getContext("2d");
             r.fillStyle = t;
             var i = 0;
             for (i = 0; i < e.m_Outlines.length; i++) {
                 var n = e.m_Outlines[i];
                 r.beginPath(), r.moveTo(n[0].x, n[0].y);
                 for (var a = 1; a < n.length; a++) r.lineTo(n[a].x, n[a].y);
                 r.lineTo(n[0].x, n[0].y), r.closePath(), r.fill()
             }
             var o = this.m_HDRCanvas.getContext("2d");
             for (o.fillStyle = "black", i = 0; i < e.m_Outlines.length; i++) {
                 var n = e.m_Outlines[i];
                 o.beginPath(), o.moveTo(n[0].x, n[0].y);
                 for (var a = 1; a < n.length; a++) o.lineTo(n[a].x, n[a].y);
                 o.lineTo(n[0].x, n[0].y), o.closePath(), o.fill()
             }
         }
     }, ViziGL = function(e) {
         this.usingForLayers = e, this.id = "ViziGL renderer 1.3.0", this.copyright = "Copyright Visualize IT Ltd. 2014. All Rights Reserved", this.m_isASlowMachine = !1, this.m_Intialised = !1, this.m_SilentMode = !1, this.m_CanvasBlendSupported = !1, this.m_GridList = new Array, this.m_OriginalFileName = "", this.m_MaskFileName = "", this.m_FourPackFileName = "", this.m_LightingFileName = "", this.m_HighlightsFileName = "", this.m_EnvironmentFileName = "", this.m_SceneRootPath = "scenes/", this.m_EnvironmentRootPath = "env/", this.m_HighLightsAlpha = .5, this.m_FourPackImageDone = !1, this.m_OriginalImageDone = !1, this.m_MaskImageDone = !1, this.m_LightingImageDone = !1, this.m_HighlightsImageDone = !1, this.m_EnvironmentImageDone = !1, this.m_RenderCanvas = null, this.m_OverlayCanvas = null
     }, ViziGL.prototype = {
         initialise: function() {
             return Modernizr.canvas ? Modernizr.webgl ? Modernizr.svg ? (this.m_CanvasBlendSupported = this.canvasBlendSupported(), this.m_CanvasBlendSupported ? this.id += " blend HW " : this.id += " blend SW ", this.m_WebGLRenderer = new WebGLRenderer(this.usingForLayers), cout(this.id), this.m_ColouriseRenderer = new ColouriseRenderer, this.m_Initialised = !0, !0) : (this.viziAlert("This browser does not support SVG!"), !1) : (this.viziAlert("This browser does not support WebGL!"), !1) : (this.viziAlert("This browser does not support HTML5 canvas!"), !1)
         },
         setIsSlowMachine: function(e) {
             this.m_isASlowMachine = e
         },
         canvasBlendSupported: function() {
             var e = document.createElement("canvas");
             e.width = 1, e.height = 1;
             var t = e.getContext("2d");
             t.fillStyle = "#000", t.fillRect(0, 0, 1, 1), t.globalCompositeOperation = "multiply", t.fillStyle = "#fff", t.fillRect(0, 0, 1, 1);
             var r = 0 === t.getImageData(0, 0, 1, 1).data[0];
             return e = null, r
         },
         getGridHsizeMM: function(e) {
             if (e >= 0 && e < this.m_GridList.length) {
                 var t = this.m_GridList[e];
                 return t.m_hSizeMM
             }
             return -1
         },
         getGridVsizeMM: function(e) {
             if (e >= 0 && e < this.m_GridList.length) {
                 var t = this.m_GridList[e];
                 return t.m_vSizeMM
             }
             return -1
         },
         isAColourationGrid: function(e) {
             if (e >= 0 && e < this.m_GridList.length) {
                 var t = this.m_GridList[e];
                 return t.isColourationOnly()
             }
             return !1
         },
         getGridName: function(e) {
             return e >= 0 && e < this.m_GridList.length ? this.m_GridList[e].m_Name : "INVALID GRID INDEX"
         },
         getGridAlignmenLocationMM: function(e) {
             if (e >= 0 && e < this.m_GridList.length) {
                 var t = this.m_GridList[e];
                 return t.getAlignmenLocationMM()
             }
             return -1
         },
         screenLocToMMTextureLocForGrid: function(e, t, r) {
             if (e >= 0 && e < this.m_GridList.length) {
                 var i = this.m_GridList[e];
                 return i.screenLocToMMTextureLoc(t, r)
             }
             return -1
         },
         mmTextureLocToScreenLocForGrid: function(e, t, r) {
             if (e >= 0 && e < this.m_GridList.length) {
                 var i = this.m_GridList[e];
                 return i.mmTextureLocToScreenLoc(t, r)
             }
             return -1
         },
         getOutlinesForGrid: function(e) {
             if (e >= 0 && e < this.m_GridList.length) {
                 var t = this.m_GridList[e];
                 return t.getOutlines()
             }
             return null
         },
         getOverlayCanvas: function() {
             return this.m_OverlayCanvas
         },
         ptInAGrid: function(e, t) {
             if (0 != this.m_GridList.length) {
                 for (var r = 0; r < this.m_GridList.length; r++) {
                     var i = this.m_GridList[r];
                     if (i.ptInOutline(e, t)) return r
                 }
                 return -1
             }
             return -1
         },
         ptInOverlay: function(e, t) {
             if (null != this.m_OverlayCanvas) {
                 var r = this.m_OverlayCanvas.getContext("2d"),
                     i = r.getImageData(e, t, 1, 1);
                 return 0 != i.data[3] ? !0 : !1
             }
             return !1
         },
         getImageWidth: function() {
             return this.m_OriginalImageJS.width
         },
         getImageHeight: function() {
             return this.m_OriginalImageJS.height
         },
         setGridLightsetup: function(e, t) {
             if (e >= 0 && e < this.m_GridList.length) {
                 var r = this.m_GridList[e];
                 r.setLightsetup(t)
             }
         },
         setGridTranssetup: function(e, t) {
             if (e >= 0 && e < this.m_GridList.length) {
                 var r = this.m_GridList[e];
                 r.setTranssetup(t)
             }
         },
         findGridIdxWithName: function(e) {
             if (0 != this.m_GridList.length) {
                 for (var t = 0; t < this.m_GridList.length; t++) {
                     var r = this.m_GridList[t];
                     if (r.m_Name == e) return t
                 }
                 return -1
             }
             return -1
         },
         initRenderCanvasWithOriginalImage: function() {
             null == this.m_RenderCanvas ? this.m_RenderCanvas = document.createElement("canvas") : this.m_RenderCanvas.width = this.m_RenderCanvas.width, this.m_RenderCanvas.width = this.m_OriginalImageJS.width, this.m_RenderCanvas.height = this.m_OriginalImageJS.height;
             var e = this.m_RenderCanvas.getContext("2d");
             e.drawImage(this.m_OriginalImageJS, 0, 0)
         },
         renderToWhite: function() {
             var e = this.m_RenderCanvas.getContext("2d");
             this.m_CanvasBlendSupported ? e.drawImage(this.m_LightingImageJS, 0, 0) : e.drawImage(this.m_LightingCanvas, 0, 0), e.drawImage(this.m_OverlayCanvas, 0, 0);
             var t = this.m_LDRCanvas.getContext("2d");
             t.fillStyle = "#FFFFFF", t.fillRect(0, 0, this.m_LDRCanvas.width, this.m_LDRCanvas.height)
         },
         render: function(e, t) {
             var r = !0,
                 i = !0,
                 n = !0,
                 a = !0,
                 o = !0;
             if (t && (r = t.LDR, i = t.Lighting, n = t.Highlights, a = t.HDR, o = t.Overlay), e.length != this.m_GridList.length) return void this.viziAlert("Render Queue length not same as number of grids:" + e.length + "," + this.m_GridList.length);
             for (var s = this.m_RenderCanvas.getContext("2d"), h = this.m_LDRCanvas.getContext("2d"), l = this.m_HDRCanvas.getContext("2d"), u = 0; u < e.length; u++)
                 if (null != e[u])
                     if ("object" == typeof e[u]) {
                         var c = this.m_GridList[u];
                         0 == c.isColourationOnly() ? (r && this.m_WebGLRenderer.renderGridLDR(c, e[u]), a && this.m_WebGLRenderer.renderGridHDR(c, e[u])) : cout("WARNING, grid:" + c.name + " is colouration only and cannot be textured")
                     } else this.m_ColouriseRenderer.renderGrid(this.m_GridList[u], e[u]);
             if (r && s.drawImage(this.m_LDRCanvas, 0, 0), i)
                 if (this.m_CanvasBlendSupported) this.m_LightingImageJS && (s.globalCompositeOperation = "multiply", s.drawImage(this.m_LightingImageJS, 0, 0), s.globalCompositeOperation = "source-over");
                 else if (this.m_LightingCanvas) {
                 var d = this.m_LightingCanvas.getContext("2d");
                 d.blendOnto(s, "multiply")
             }
             if (n)
                 if (this.m_CanvasBlendSupported) null != this.m_HighlightsImageJS && (s.globalAlpha = this.m_HighLightsAlpha, s.globalCompositeOperation = "hard-light", s.drawImage(this.m_HighlightsImageJS, 0, 0), s.globalCompositeOperation = "source-over", s.globalAlpha = 1);
                 else if (null != this.m_HighlightsCanvas) {
                 var f = this.m_HighlightsCanvas.getContext("2d");
                 f.blendOnto(s, "hardlight")
             }
             a && (this.m_CanvasBlendSupported ? (s.globalCompositeOperation = "screen", s.drawImage(this.m_HDRCanvas, 0, 0), s.globalCompositeOperation = "source-over") : l.blendOnto(s, "screen")), o && null != this.m_OverlayCanvas && s.drawImage(this.m_OverlayCanvas, 0, 0)
         },
         testRenderGL: function() {
             this.m_WebGLRenderer.requestRenderToCanvas(this.m_RenderCanvas)
         },
         getNumGrids: function() {
             return this.m_GridList.length
         },
         getRenderCanvas: function() {
             return this.m_RenderCanvas
         },
         viziAlert: function(e) {
             0 == this.m_SilentMode && alert(e)
         },
         setSilentMode: function(e) {
             this.m_SilentMode = e
         },
         loadScene: function(e, t) {
             this.clearAllImages(), this.deleteAllGrids(), this.m_Callback = t, this.loadSVGFromURL(e)
         },
         loadImage: function(e, t) {
             this.clearAllImages(), this.deleteAllGrids(), this.m_Callback = t, this.viziAlert("Loading image for UYO:" + e), this.loadImageFromURL(e)
         },
         setImage: function(e, t) {
             this.m_Callback = t, this.clearAllImages(), this.deleteAllGrids(), this.m_OriginalImageJS = e, this.setupFromImage(e), m_FourPackImageDone = !0, this.m_OriginalImageDone = !0, this.m_MaskImageDone = !0, this.m_LightingImageDone = !0, this.m_HighlightsImageDone = !0, this.m_EnvironmentImageDone = !0, this.makeLightingCanvasFromOriginal(), this.callbackIfDone()
         },
         setupFromImage: function(e) {
             var t = e.width,
                 r = e.height;
             this.m_LDRCanvas = document.createElement("canvas"), this.m_LDRCanvas.width = t, this.m_LDRCanvas.height = r, this.m_HDRCanvas = document.createElement("canvas"), this.m_HDRCanvas.width = t, this.m_HDRCanvas.height = r, this.m_WebGLRenderer.setupCanvases(this.m_LDRCanvas, this.m_HDRCanvas), this.m_ColouriseRenderer.setupCanvases(this.m_LDRCanvas, this.m_HDRCanvas), this.initRenderCanvasWithOriginalImage()
         },
         processSVGData: function(e) {
             var t = this,
                 r = $.parseXML(e);
             $xml = $(r), this.m_FourPackFileName = $xml.find("vizidoc\\:fourpack, fourpack").text(), this.m_FourPackFileName ? (this.m_OriginalImageDone = !0, this.m_MaskImageDone = !0, this.m_LightingImageDone = !0, this.m_HighlightsImageDone = !0) : (this.m_FourPackImageDone = !0, this.m_OriginalFileName = $xml.find("vizidoc\\:original, original").text(), this.m_MaskFileName = $xml.find("vizidoc\\:mask, mask").text(), this.m_LightingFileName = $xml.find("vizidoc\\:lighting, lighting").text(), this.m_HighlightsFileName = $xml.find("vizidoc\\:highlights, highlights").text()), this.m_EnvironmentFileName = $xml.find("vizidoc\\:environment, environment").text(), this.m_EnvironmentFileName += "?uncache1", $xml.find("polygon").each(function(e) {
                 var r = this.id.split("_");
                 if (1 == t.isAGridIDBits(r)) {
                     var i = t.gridNameFromIDBits(r);
                     t.storeGridOutline(i, this.points)
                 } else if (1 == t.isAQuadIDBits(r)) {
                     var i = t.gridNameFromIDBits(r),
                         n = t.hSizeMMFromIDBits(r),
                         a = t.vSizeMMFromIDBits(r),
                         o = t.alignXFromIDBits(r),
                         s = t.alignYFromIDBits(r),
                         h = t.lightSetupFromIDBits(r),
                         l = t.transSetupFromIDBits(r);
                     t.storeGridQuad(i, this.points, n, a, o, s, h, l)
                 }
             }), this.loadSceneImages()
         },
         loadSceneImages: function() {
             var e = this;
             if ("" != this.m_FourPackFileName) {
                 var t = this.m_SceneRootPath + this.m_FourPackFileName;
                 this.m_FourPackImageJS = new Image, this.m_FourPackImageJS.onload = function() {
                     e.m_FourPackImageDone = !0, e.splitFourPackImage(), e.setupFromImage(e.m_OriginalImageJS), e.callbackIfDone()
                 }, this.m_FourPackImageJS.src = t
             } else e.m_FourPackImageDone = !0;
             if ("" != this.m_OriginalFileName) {
                 var r = this.m_SceneRootPath + this.m_OriginalFileName;
                 if (this.isFileBPG(this.m_OriginalFileName)) {
                     this.m_OriginalImageJS = document.createElement("canvas");
                     var i = this.m_OriginalImageJS.getContext("2d"),
                         n = new BPGDecoder(i);
                     n.onload = function() {
                         e.m_OriginalImageJS.width = this.imageData.width, e.m_OriginalImageJS.height = this.imageData.height, i.putImageData(this.imageData, 0, 0), e.m_OriginalImageDone = !0, e.setupFromImage(e.m_OriginalImageJS), e.callbackIfDone()
                     }, n.load(r)
                 } else this.m_OriginalImageJS = new Image, this.m_OriginalImageJS.onload = function() {
                     e.m_OriginalImageDone = !0, e.setupFromImage(e.m_OriginalImageJS), e.callbackIfDone()
                 }, this.m_OriginalImageJS.src = r
             } else e.m_OriginalImageDone = !0;
             if ("" != this.m_MaskFileName) {
                 var a = this.m_SceneRootPath + this.m_MaskFileName;
                 if (this.isFileBPG(this.m_MaskFileName)) {
                     this.m_MaskImageJS = document.createElement("canvas");
                     var o = this.m_MaskImageJS.getContext("2d"),
                         s = new BPGDecoder(o);
                     s.onload = function() {
                         e.m_MaskImageJS.width = this.imageData.width, e.m_MaskImageJS.height = this.imageData.height, o.putImageData(this.imageData, 0, 0), e.m_MaskImageDone = !0, e.callbackIfDone()
                     }, s.load(a)
                 } else this.m_MaskImageJS = new Image, this.m_MaskImageJS.onload = function() {
                     e.m_MaskImageDone = !0, e.callbackIfDone()
                 }, this.m_MaskImageJS.src = a
             } else e.m_MaskImageDone = !0;
             if ("" != this.m_LightingFileName) {
                 var h = this.m_SceneRootPath + this.m_LightingFileName;
                 if (this.isFileBPG(this.m_LightingFileName)) {
                     this.m_LightingImageJS = document.createElement("canvas");
                     var l = this.m_LightingImageJS.getContext("2d"),
                         u = new BPGDecoder(l);
                     u.onload = function() {
                         e.m_LightingImageJS.width = this.imageData.width, e.m_LightingImageJS.height = this.imageData.height, l.putImageData(this.imageData, 0, 0), e.m_LightingImageDone = !0, e.m_LightingCanvas = e.m_LightingImageJS, e.callbackIfDone()
                     }, u.load(h)
                 } else this.m_LightingImageJS = new Image, this.m_LightingImageJS.onload = function() {
                     if (0 == e.m_CanvasBlendSupported) {
                         e.m_LightingCanvas = document.createElement("canvas"), e.m_LightingCanvas.width = e.m_LightingImageJS.width, e.m_LightingCanvas.height = e.m_LightingImageJS.height;
                         var t = e.m_LightingCanvas.getContext("2d");
                         t.drawImage(e.m_LightingImageJS, 0, 0), e.m_LightingImageJS = null
                     }
                     e.m_LightingImageDone = !0, e.callbackIfDone()
                 }, this.m_LightingImageJS.src = h
             } else e.m_LightingImageDone = !0;
             if (1 == e.m_isASlowMachine && (e.m_HighlightsFileName = ""), "" != this.m_HighlightsFileName) {
                 var c = this.m_SceneRootPath + this.m_HighlightsFileName;
                 this.m_HighlightsCanvas = document.createElement("canvas");
                 var d = this.m_HighlightsCanvas.getContext("2d");
                 if (this.isFileBPG(this.m_HighlightsFileName)) {
                     var f = new BPGDecoder(d);
                     f.onload = function() {
                         if (e.m_HighlightsCanvas.width = this.imageData.width, e.m_HighlightsCanvas.height = this.imageData.height, d.putImageData(this.imageData, 0, 0), 1 != e.m_HighLightsAlpha) {
                             for (var t = d.getImageData(0, 0, e.m_HighlightsCanvas.width, e.m_HighlightsCanvas.height), r = t.data, i = r.length, n = 0; i > n; n += 4) r[n] = 127 + e.m_HighLightsAlpha * (r[n] - 127), r[n + 1] = 127 + e.m_HighLightsAlpha * (r[n + 1] - 127), r[n + 2] = 127 + e.m_HighLightsAlpha * (r[n + 2] - 127);
                             d.putImageData(t, 0, 0)
                         }
                         e.m_HighlightsImageDone = !0, r = null, t = null, e.callbackIfDone()
                     }, f.load(c)
                 } else this.m_HighlightsImageJS = new Image, this.m_HighlightsImageJS.onload = function() {
                     if (!0) {
                         e.m_HighlightsCanvas = document.createElement("canvas"), e.m_HighlightsCanvas.width = e.m_HighlightsImageJS.width, e.m_HighlightsCanvas.height = e.m_HighlightsImageJS.height;
                         var t = e.m_HighlightsCanvas.getContext("2d");
                         if (t.drawImage(e.m_HighlightsImageJS, 0, 0), 1 != e.m_HighLightsAlpha) {
                             for (var r = t.getImageData(0, 0, e.m_HighlightsCanvas.width, e.m_HighlightsCanvas.height), i = r.data, n = i.length, a = 0; n > a; a += 4) i[a] = 127 + e.m_HighLightsAlpha * (i[a] - 127), i[a + 1] = 127 + e.m_HighLightsAlpha * (i[a + 1] - 127), i[a + 2] = 127 + e.m_HighLightsAlpha * (i[a + 2] - 127);
                             t.putImageData(r, 0, 0)
                         }
                         e.m_HighlightsImageDone = !0, i = null, r = null, e.callbackIfDone()
                     }
                 }, this.m_HighlightsImageJS.src = c
             } else e.m_HighlightsImageDone = !0;
             this.m_WebGLRenderer.removeEnvironmentImage(), "" != this.m_EnvironmentFileName ? e.loadEnvironmentWithFileName(this.m_EnvironmentFileName) : e.m_EnvironmentImageDone = !0
         },
         isFileBPG: function(e) {
             var t = e.search("bpg");
             return -1 != t ? !0 : !1
         },
         splitFourPackImage: function() {
             var e = this.m_FourPackImageJS.width,
                 t = this.m_FourPackImageJS.height / 4;
             this.m_OriginalImageJS = document.createElement("canvas"), this.m_OriginalImageJS.width = e, this.m_OriginalImageJS.height = t;
             var r = this.m_OriginalImageJS.getContext("2d");
             r.drawImage(this.m_FourPackImageJS, 0, 0, e, t, 0, 0, e, t), this.m_MaskImageJS = document.createElement("canvas"), this.m_MaskImageJS.width = e, this.m_MaskImageJS.height = t;
             var i = this.m_MaskImageJS.getContext("2d");
             i.drawImage(this.m_FourPackImageJS, 0, t, e, t, 0, 0, e, t), this.m_LightingImageJS = document.createElement("canvas"), this.m_LightingImageJS.width = e, this.m_LightingImageJS.height = t;
             var n = this.m_LightingImageJS.getContext("2d");
             n.drawImage(this.m_FourPackImageJS, 0, 2 * t, e, t, 0, 0, e, t), this.m_HighlightsImageJS = document.createElement("canvas"), this.m_HighlightsImageJS.width = e, this.m_HighlightsImageJS.height = t;
             var a = this.m_HighlightsImageJS.getContext("2d");
             a.drawImage(this.m_FourPackImageJS, 0, 3 * t, e, t, 0, 0, e, t)
         },
         loadEnvironmentWithFileName: function(e) {
             var t = this,
                 r = this.m_EnvironmentRootPath + this.m_EnvironmentFileName;
             if (this.isFileBPG(this.m_EnvironmentFileName)) {
                 this.m_EnvironmentImageJS = document.createElement("canvas");
                 var i = this.m_EnvironmentImageJS.getContext("2d"),
                     n = new BPGDecoder(i);
                 n.onload = function() {
                     t.m_EnvironmentImageJS.width = this.imageData.width, t.m_EnvironmentImageJS.height = this.imageData.height, i.putImageData(this.imageData, 0, 0), t.m_EnvironmentImageDone = !0, t.environmentOK() && (t.m_WebGLRenderer.makeEnvironmentFromImage(t.m_EnvironmentImageJS), t.callbackIfDone())
                 }, n.load(r)
             } else this.m_EnvironmentImageJS = new Image, this.m_EnvironmentImageJS.onload = function() {
                 t.m_EnvironmentImageDone = !0, t.environmentOK() && (t.m_WebGLRenderer.makeEnvironmentFromImage(t.m_EnvironmentImageJS), t.callbackIfDone())
             }, this.m_EnvironmentImageJS.src = r
         },
         environmentOK: function() {
             return "" != this.m_EnvironmentFileName && this.m_EnvironmentImageJS.width > 0 ? !0 : !1
         },
         changeEnv: function(e) {
             this.m_WebGLRenderer.removeEnvironmentImage(), this.m_EnvironmentFileName = e, this.loadEnvironmentWithFileName(this.m_EnvironmentFileName)
         },
         callbackIfDone: function() {
             1 == this.m_FourPackImageDone && 1 == this.m_OriginalImageDone && 1 == this.m_MaskImageDone && 1 == this.m_LightingImageDone && 1 == this.m_HighlightsImageDone && 1 == this.m_EnvironmentImageDone && (this.makeOverlay(), this.m_Callback && this.m_Callback())
         },
         makeOverlay: function() {
             if (void 0 != this.m_OriginalImageJS && void 0 != this.m_MaskImageJS && null != this.m_MaskImageJS) {
                 this.m_OverlayCanvas = document.createElement("canvas"), this.m_OverlayCanvas.width = this.m_OriginalImageJS.width, this.m_OverlayCanvas.height = this.m_OriginalImageJS.height;
                 var e = this.m_OverlayCanvas.getContext("2d");
                 e.drawImage(this.m_OriginalImageJS, 0, 0);
                 var t = document.createElement("canvas");
                 t.width = this.m_OriginalImageJS.width, t.height = this.m_OriginalImageJS.height;
                 var r = t.getContext("2d");
                 r.drawImage(this.m_MaskImageJS, 0, 0);
                 for (var i = r.getImageData(0, 0, t.width, t.height).data, n = e.getImageData(0, 0, this.m_OverlayCanvas.width, this.m_OverlayCanvas.height), a = n.data, o = a.length, s = 3; o > s; s += 4) a[s] = 255 - i[s - 3];
                 e.putImageData(n, 0, 0), t = null, i = null, a = null, n = null, this.m_MaskImageJS = null
             }
         },
         makeOverlayFromMasks: function(e) {
             this.m_OverlayCanvas = document.createElement("canvas"), this.m_OverlayCanvas.width = this.m_OriginalImageJS.width, this.m_OverlayCanvas.height = this.m_OriginalImageJS.height;
             var t = this.m_OverlayCanvas.getContext("2d");
             t.clearRect(0, 0, this.m_OriginalImageJS.width, this.m_OriginalImageJS.height), t.save(), t.beginPath();
             for (var r = 0; r < e.length; r++) {
                 var i = e[r];
                 t.moveTo(i[0].x, i[0].y);
                 for (var n = 1; n < i.length; n++) t.lineTo(i[n].x, i[n].y);
                 t.lineTo(i[0].x, i[0].y)
             }
             t.closePath(), t.clip(), t.drawImage(this.m_OriginalImageJS, 0, 0, this.m_OriginalImageJS.width, this.m_OriginalImageJS.height), t.restore()
         },
         storeGridQuad: function(e, t, r, i, n, a, o, s) {
             var h = this.getExistingGrid(e);
             void 0 != h ? (h.addQuadFromSvgPointList(t, r, i, n, a), o && h.setLightsetup(o), s && h.setTranssetup(s)) : this.viziAlert("Error, the grid for quad does not pre-exist:" + e)
         },
         storeGridOutline: function(e, t) {
             var r = this.getExistingGrid(e);
             void 0 == r && (r = new Grid(e), this.m_GridList.push(r)), r.addOutlineFromSvgPointList(t)
         },
         getExistingGrid: function(e) {
             if (0 == this.m_GridList.length);
             else
                 for (var t = 0; t < this.m_GridList.length; t++) {
                     var r = this.m_GridList[t];
                     if (r.m_Name == e) return r
                 }
         },
         isAGridIDBits: function(e) {
             var t = e[0];
             return "grid" == t ? !0 : !1
         },
         isAQuadIDBits: function(e) {
             var t = e[0];
             return "quad" == t ? !0 : !1
         },
         gridNameFromIDBits: function(e) {
             return e[1]
         },
         outlineIdxFromIDBits: function(e) {
             return parseInt(e[2])
         },
         hSizeMMFromIDBits: function(e) {
             return parseInt(e[2])
         },
         vSizeMMFromIDBits: function(e) {
             return parseInt(e[3])
         },
         alignXFromIDBits: function(e) {
             var t = e[4];
             return t && "N" != t ? parseInt(t) : void 0
         },
         alignYFromIDBits: function(e) {
             var t = e[5];
             return t && "N" != t ? parseInt(t) : void 0
         },
         lightSetupFromIDBits: function(e) {
             var t = e[6];
             if (t && "N" != t) {
                 var r = new Object;
                 return r.x = parseInt(e[6]), r.y = parseInt(e[7]), r.z = parseInt(e[8]), r.intensity = parseFloat(e[9]), r
             }
         },
         transSetupFromIDBits: function(e) {
             var t = e[10];
             if (t && "N" != t) {
                 var r = new Object;
                 return r.tx = parseFloat(e[10]), r.ty = parseFloat(e[11]), r.tz = parseFloat(e[12]), r.sx = parseFloat(e[13]), r.sy = parseFloat(e[14]), r.sz = parseFloat(e[15]), r.rx = parseFloat(e[16]), r.ry = parseFloat(e[17]), r.rz = parseFloat(e[18]), r
             }
         },
         clearAllImages: function() {
             this.m_OriginalFileName = "", this.m_MaskFileName = "", this.m_LightingFileName = "", this.m_HighlightsFileName = "", this.m_EnvironmentFileName = "", this.m_FourPackFileName = "", this.m_FourPackImageJS = null, this.m_OriginalImageJS = null, this.m_MaskImageJS = null, this.m_LightingImageJS = null, this.m_HighlightsImageJS = null, this.m_EnvironementImageJS = null, this.m_LightingCanvas = null, this.m_HighlightsCanvas = null, this.m_HighLightAlpha = 1, this.m_FourPackImageDone = !1, this.m_OriginalImageDone = !1, this.m_MaskImageDone = !1, this.m_LightingImageDone = !1, this.m_HighlightsImageDone = !1, this.m_EnvironmentImageDone = !1, this.m_OverlayCanvas = null, this.m_LDRCanvas = null, this.m_HDRCanvas = null
         },
         deleteAllGrids: function() {
             for (var e = 0; e < this.m_GridList.Length; e++) {
                 var t = this.m_GridList[e];
                 t.dispose(), delete t
             }
             this.m_GridList.length = 0
         },
         loadImageFromURL: function(e) {
             var t = this,
                 r = e;
             this.m_OriginalImageJS = new Image, this.m_OriginalImageJS.onload = function() {
                 t.m_OriginalImageDone = !0, t.setupFromImage(t.m_OriginalImageJS), t.m_FourPackImageDone = !0, t.m_MaskImageDone = !0, t.m_LightingImageDone = !0, t.m_HighlightsImageDone = !0, t.m_EnvironmentImageDone = !0, t.makeLightingCanvasFromOriginal(), t.callbackIfDone()
             }, this.m_OriginalImageJS.src = r
         },
         gridToScene: function(e, t, r, i, n) {
             var a = new Grid;
             a.initFromGridData(e, t, r, i, n), this.m_GridList.push(a)
         },
         makeLightingCanvasFromOriginal: function() {
             var e = new BackplaneCreator2,
                 t = document.createElement("canvas");
             t.width = this.m_OriginalImageJS.width, t.height = this.m_OriginalImageJS.height;
             var r = t.getContext("2d");
             r.drawImage(this.m_OriginalImageJS, 0, 0), this.m_LightingCanvas = e.createBackplane(t, 50), t = null
         },
         setScissor: function(e, t, r, i, n) {
             this.m_WebGLRenderer.setScissorArea(e, t, r, i, n)
         },
         loadSVGFromURL: function(e) {
             var t = this;
             $.ajax({
                 type: "GET",
                 url: e,
                 dataType: "text",
                 success: function(e) {
                     t.processSVGData(e)
                 },
                 error: function(e, r, i) {
                     t.viziAlert("$.ajax error: jqXHR=" + e + " textStatus=" + r + " errorThrown=" + i)
                 },
                 statusCode: {
                     404: function() {
                         t.viziAlert("404 page not found")
                     },
                     405: function() {
                         t.viziAlert("405")
                     }
                 }
             })
         },
         renderLayer: function(e, t) {
             var r = !0,
                 i = !0,
                 n = !0,
                 a = !0,
                 o = !0;
             if (t && (r = t.LDR, i = t.Lighting, n = t.Highlights, a = t.HDR, o = t.Overlay), e.length != this.m_GridList.length) return void this.viziAlert("Render Queue length not same as number of grids:" + e.length + "," + this.m_GridList.length);
             var s = this.m_RenderCanvas.getContext("2d"),
                 h = this.m_LDRCanvas.getContext("2d"),
                 l = this.m_HDRCanvas.getContext("2d");
             this.m_RenderCanvas.width = this.m_RenderCanvas.width, this.m_LDRCanvas.width = this.m_LDRCanvas.width, this.m_HDRCanvas.width = this.m_HDRCanvas.width, s.globalCompositeOperation = "source-over";
             for (var u = 0; u < e.length; u++)
                 if (null != e[u])
                     if ("object" == typeof e[u]) {
                         var c = this.m_GridList[u];
                         0 == c.isColourationOnly() ? (r && this.m_WebGLRenderer.renderGridLDR(c, e[u], this.m_RenderCanvas), a && this.m_WebGLRenderer.renderGridHDR(c, e[u])) : cout("WARNING, grid:" + c.name + " is colouration only and cannot be textured")
                     } else this.m_ColouriseRenderer.renderGrid(this.m_GridList[u], e[u]);
             r && s.drawImage(this.m_LDRCanvas, 0, 0);
             var d = s.getImageData(0, 0, this.m_RenderCanvas.width, this.m_RenderCanvas.height);
             if (i)
                 if (this.m_CanvasBlendSupported) this.m_LightingImageJS && (s.globalCompositeOperation = "multiply", s.drawImage(this.m_LightingImageJS, 0, 0), s.globalCompositeOperation = "source-over");
                 else if (this.m_LightingCanvas) {
                 var f = this.m_LightingCanvas.getContext("2d");
                 f.blendOnto(s, "multiply")
             }
             if (n)
                 if (this.m_CanvasBlendSupported) null != this.m_HighlightsImageJS && (s.globalAlpha = this.m_HighLightsAlpha, s.globalCompositeOperation = "hard-light", s.drawImage(this.m_HighlightsImageJS, 0, 0), s.globalCompositeOperation = "source-over", s.globalAlpha = 1);
                 else if (null != this.m_HighlightsCanvas) {
                 var p = this.m_HighlightsCanvas.getContext("2d");
                 p.blendOnto(s, "hardlight")
             }
             a && (this.m_CanvasBlendSupported ? (s.globalCompositeOperation = "screen", s.drawImage(this.m_HDRCanvas, 0, 0), s.globalCompositeOperation = "source-over") : l.blendOnto(s, "screen"));
             var m = d.data,
                 E = m.length,
                 g = s.getImageData(0, 0, this.m_RenderCanvas.width, this.m_RenderCanvas.height),
                 v = g.data,
                 u, y;
             if (null != this.m_OverlayCanvas) {
                 var T = this.m_OverlayCanvas.getContext("2d");
                 for (y = T.getImageData(0, 0, this.m_OverlayCanvas.width, this.m_OverlayCanvas.height), overlayDataData = y.data, u = 0; E > u; u += 4) {
                     var R = Math.min(m[u + 3], 255 - overlayDataData[u + 3]);
                     v[u + 3] = R
                 }
             } else
                 for (u = 0; E > u; u += 4) v[u + 3] = m[u + 3];
             s.putImageData(g, 0, 0)
         }
     }, this.ViziUtils) throw Error("viziutils Library included multiple times");
 var ViziUtils = {};
 ViziUtils.getIntersection = function(e, t, r, i) {
     var n = t.y - e.y,
         a = e.x - t.x,
         o = i.y - r.y,
         s = r.x - i.x,
         h = n * s - o * a;
     if (0 == h) return null;
     var l = t.x * e.y - e.x * t.y,
         u = i.x * r.y - r.x * i.y,
         c = new Vector2((a * u - s * l) / h, (o * l - n * u) / h);
     return ViziUtils.pointDistance(c, t) > ViziUtils.pointDistance(e, t) ? null : ViziUtils.pointDistance(c, e) > ViziUtils.pointDistance(e, t) ? null : ViziUtils.pointDistance(c, i) > ViziUtils.pointDistance(r, i) ? null : ViziUtils.pointDistance(c, r) > ViziUtils.pointDistance(r, i) ? null : c
 }, ViziUtils.quadArea = function(e, t, r, i) {
     return Math.abs((e.x - i.x + (t.x - e.x)) * (i.y - e.y + (r.y - i.y)) - .5 * ((e.x - i.x) * (i.y - e.y) + (t.x - e.x) * (t.y - e.y) + (t.y - e.y) * (t.x - r.x) + (r.y - i.y) * (r.x - i.x)))
 }, ViziUtils.getIntersectionProjected = function(e, t, r, i) {
     var n = t.y - e.y,
         a = e.x - t.x,
         o = i.y - r.y,
         s = r.x - i.x,
         h = n * s - o * a;
     if (0 == h) return null;
     var l = t.x * e.y - e.x * t.y,
         u = i.x * r.y - r.x * i.y,
         c = new Vector2((a * u - s * l) / h, (o * l - n * u) / h);
     return c
 }, ViziUtils.potentialNewgetIntersectionProjected = function(e, t, r, i) {
     var n = this.checkLineIntersection(e.x, e.y, t.x, t.y, r.x, r.y, i.x, i.y);
     return null != n.x && null != n.y ? new Vector2(n.x, n.y) : null
 }, ViziUtils.checkLineIntersection = function(e, t, r, i, n, a, o, s) {
     var h, l, u, c, d, f = {
         x: null,
         y: null,
         onLine1: !1,
         onLine2: !1
     };
     return h = (s - a) * (r - e) - (o - n) * (i - t), 0 == h ? f : (l = t - a, u = e - n, c = (o - n) * l - (s - a) * u, d = (r - e) * l - (i - t) * u, l = c / h, u = d / h, f.x = e + l * (r - e), f.y = t + l * (i - t), l > 0 && 1 > l && (f.onLine1 = !0), u > 0 && 1 > u && (f.onLine2 = !0), f)
 }, ViziUtils.SGN = function(e) {
     return e ? 0 > e ? -1 : 1 : 0
 }, ViziUtils.windDirection = function(e, t, r) {
     var i = new Vector(t.x - e.x, t.y - e.y),
         n = new Vector(r.x - t.x, r.y - t.y),
         a = i.cross(n);
     return ViziUtils.SGN(a.z)
 }, ViziUtils.pointDistance = function(e, t) {
     return Math.sqrt((e.x - t.x) * (e.x - t.x) + (e.y - t.y) * (e.y - t.y))
 }, ViziUtils.getY = function(e) {
     for (var t = 0; null != e;) t += e.offsetTop, e = e.offsetParent;
     return t
 }, ViziUtils.getX = function(e) {
     for (var t = 0; null != e;) t += e.offsetLeft, e = e.offsetParent;
     return t
 }, ViziUtils.getcss = function(e, t) {
     var r = "." + e,
         i, n, a = document.styleSheets && document.styleSheets[0];
     if (a && (n = a.rules ? a.rules : a.cssRules))
         for (i = n.length; i--;)
             if (void 0 != n[i].selectorText && n[i].selectorText.toLowerCase() == r.toLowerCase()) return n[i].style[t];
     return null
 }, ViziUtils.is_touch_device = function() {
     try {
         return document.createEvent("TouchEvent"), !0
     } catch (e) {
         return !1
     }
 }, Vector.prototype = {
     negative: function() {
         return new Vector(-this.x, -this.y, -this.z)
     },
     add: function(e) {
         return e instanceof Vector ? new Vector(this.x + e.x, this.y + e.y, this.z + e.z) : new Vector(this.x + e, this.y + e, this.z + e)
     },
     subtract: function(e) {
         return e instanceof Vector ? new Vector(this.x - e.x, this.y - e.y, this.z - e.z) : new Vector(this.x - e, this.y - e, this.z - e)
     },
     multiply: function(e) {
         return e instanceof Vector ? new Vector(this.x * e.x, this.y * e.y, this.z * e.z) : new Vector(this.x * e, this.y * e, this.z * e)
     },
     divide: function(e) {
         return e instanceof Vector ? new Vector(this.x / e.x, this.y / e.y, this.z / e.z) : new Vector(this.x / e, this.y / e, this.z / e)
     },
     equals: function(e) {
         return this.x == e.x && this.y == e.y && this.z == e.z
     },
     dot: function(e) {
         return this.x * e.x + this.y * e.y + this.z * e.z
     },
     cross: function(e) {
         return new Vector(this.y * e.z - this.z * e.y, this.z * e.x - this.x * e.z, this.x * e.y - this.y * e.x)
     },
     length: function() {
         return Math.sqrt(this.dot(this))
     },
     unit: function() {
         return this.divide(this.length())
     },
     min: function() {
         return Math.min(Math.min(this.x, this.y), this.z)
     },
     max: function() {
         return Math.max(Math.max(this.x, this.y), this.z)
     },
     toAngles: function() {
         return {
             theta: Math.atan2(this.z, this.x),
             phi: Math.asin(this.y / this.length())
         }
     },
     toArray: function(e) {
         return [this.x, this.y, this.z].slice(0, e || 3)
     },
     clone: function() {
         return new Vector(this.x, this.y, this.z)
     },
     init: function(e, t, r) {
         return this.x = e, this.y = t, this.z = r, this
     }
 }, Vector.negative = function(e, t) {
     return t.x = -e.x, t.y = -e.y, t.z = -e.z, t
 }, Vector.add = function(e, t, r) {
     return t instanceof Vector ? (r.x = e.x + t.x, r.y = e.y + t.y, r.z = e.z + t.z) : (r.x = e.x + t, r.y = e.y + t, r.z = e.z + t), r
 }, Vector.subtract = function(e, t, r) {
     return t instanceof Vector ? (r.x = e.x - t.x, r.y = e.y - t.y, r.z = e.z - t.z) : (r.x = e.x - t, r.y = e.y - t, r.z = e.z - t), r
 }, Vector.multiply = function(e, t, r) {
     return t instanceof Vector ? (r.x = e.x * t.x, r.y = e.y * t.y, r.z = e.z * t.z) : (r.x = e.x * t, r.y = e.y * t, r.z = e.z * t), r
 }, Vector.divide = function(e, t, r) {
     return t instanceof Vector ? (r.x = e.x / t.x, r.y = e.y / t.y, r.z = e.z / t.z) : (r.x = e.x / t, r.y = e.y / t, r.z = e.z / t), r
 }, Vector.cross = function(e, t, r) {
     return r.x = e.y * t.z - e.z * t.y, r.y = e.z * t.x - e.x * t.z, r.z = e.x * t.y - e.y * t.x, r
 }, Vector.unit = function(e, t) {
     var r = e.length();
     return t.x = e.x / r, t.y = e.y / r, t.z = e.z / r, t
 }, Vector.fromAngles = function(e, t) {
     return new Vector(Math.cos(e) * Math.cos(t), Math.sin(t), Math.sin(e) * Math.cos(t))
 }, Vector.randomDirection = function() {
     return Vector.fromAngles(Math.random() * Math.PI * 2, Math.asin(2 * Math.random() - 1))
 }, Vector.min = function(e, t) {
     return new Vector(Math.min(e.x, t.x), Math.min(e.y, t.y), Math.min(e.z, t.z))
 }, Vector.max = function(e, t) {
     return new Vector(Math.max(e.x, t.x), Math.max(e.y, t.y), Math.max(e.z, t.z))
 }, Vector.lerp = function(e, t, r) {
     return t.subtract(e).multiply(r).add(e)
 }, Vector.fromArray = function(e) {
     return new Vector(e[0], e[1], e[2])
 }, Vector2 = function(e, t) {
     this.set(e || 0, t || 0)
 }, Vector2.prototype = {
     dot: function(e) {
         return this.x * e.x + this.y * e.y
     },
     set: function(e, t) {
         return this.x = e, this.y = t, this
     },
     copy: function(e) {
         return this.set(e.x, e.y), this
     },
     addSelf: function(e) {
         return this.set(this.x + e.x, this.y + e.y), this
     },
     add: function(e, t) {
         return this.set(e.x + t.x, e.y + t.y), this
     },
     subSelf: function(e) {
         return this.set(this.x - e.x, this.y - e.y), this
     },
     sub: function(e, t) {
         return this.set(e.x - t.x, e.y - t.y), this
     },
     multiplyScalar: function(e) {
         return this.set(this.x * e, this.y * e), this
     },
     negate: function() {
         return this.set(-this.x, -this.y), this
     },
     unit: function() {
         return this.multiplyScalar(1 / this.length()), this
     },
     length: function() {
         return Math.sqrt(this.lengthSq())
     },
     lengthSq: function() {
         return this.x * this.x + this.y * this.y
     },
     clone: function() {
         return new Vector2(this.x, this.y)
     },
     toString: function() {
         return "Vector2(" + this.x + "," + this.y + ")"
     },
     toNormalised: function() {
         var e = Math.sqrt(this.x * this.x + this.y * this.y);
         return new Vector2(this.x / e, this.y / e)
     },
     normalisedVectorTo: function(e) {
         var t = e.x - this.x,
             r = e.y - this.y,
             i = Math.sqrt(t * t + r * r);
         return new Vector2(t / i, r / i)
     },
     distanceTo: function(e) {
         var t = e.x - this.x,
             r = e.y - this.y,
             i = Math.sqrt(t * t + r * r);
         return i
     }
 }, Rectangle = function(e, t, r, i) {
     return isNaN(i) || isNaN(r) || isNaN(e) || isNaN(t) || "number" != typeof i || "number" != typeof r || "number" != typeof e || "number" != typeof t ? !1 : (this.height = i, this.width = r, this.x = e, this.y = t, void 0)
 }, Rectangle.prototype = {
     getHeight: function() {
         return this.height
     },
     getWidth: function() {
         return this.width
     },
     getX: function() {
         return this.x
     },
     getY: function() {
         return this.y
     },
     getSize: function() {
         return {
             height: this.height,
             width: this.width
         }
     },
     getLocation: function() {
         return {
             x: this.x,
             y: this.y
         }
     },
     setHeight: function(e) {
         return !isNaN(e) && "number" == typeof e && e >= 0 && e !== 1 / 0 ? (this.height = e, !0) : !1
     },
     setWidth: function(e) {
         return !isNaN(e) && "number" == typeof e && e >= 0 && e !== 1 / 0 ? (this.width = e, !0) : !1
     },
     setX: function(e) {
         return !isNaN(e) && "number" == typeof e && e >= 0 && e !== 1 / 0 ? (this.x = e, !0) : !1
     },
     setY: function(e) {
         return !isNaN(e) && "number" == typeof e && e >= 0 && e !== 1 / 0 ? (this.y = e, !0) : !1
     },
     setSize: function(e, t) {
         return !isNaN(t) && "number" == typeof t && t >= 0 && t !== 1 / 0 && !isNaN(e) && "number" == typeof e && e >= 0 && e !== 1 / 0 ? (this.width = t, this.height = e, !0) : !1
     },
     setLocation: function(e, t) {
         return !isNaN(e) && "number" == typeof e && e >= 0 && e !== 1 / 0 && !isNaN(t) && "number" == typeof t && t >= 0 && t !== 1 / 0 ? (this.y = t, this.x = e, !0) : !1
     },
     getCenter: function() {
         return {
             x: this.x + this.width / 2,
             y: this.y + this.height / 2
         }
     },
     contains: function(e, t) {
         return e.x && e.y && (t = e.y, e = e.x), e <= this.x || t <= this.y || t >= this.y + this.height || e >= this.x + this.width ? !1 : !0
     },
     containsX: function(e) {
         return e < this.x || e > this.x + this.width ? !1 : !0
     },
     containsY: function(e) {
         return e < this.y || e > this.y + this.height ? !1 : !0
     },
     toString: function() {
         return "{height: " + this.height + ", width: " + this.width + ", x: " + this.x + ", y: " + this.y + "}"
     }
 }, Matrix2.prototype.Inverse = function() {
     var e = new Matrix2(0, 0, 0, 0),
         t = this.m_afEntry[0] * this.m_afEntry[3] - this.m_afEntry[1] * this.m_afEntry[2];
     if (Math.abs(t) > 1e-6) {
         var r = 1 / t;
         e.m_afEntry[0] = this.m_afEntry[3] * r, e.m_afEntry[1] = -this.m_afEntry[1] * r, e.m_afEntry[2] = -this.m_afEntry[2] * r, e.m_afEntry[3] = this.m_afEntry[0] * r
     }
     return e
 }, Matrix2.prototype.Multiply = function(e) {
     return new Vector2(this.m_afEntry[0] * e.x + this.m_afEntry[1] * e.y, this.m_afEntry[2] * e.x + this.m_afEntry[3] * e.y)
 }, HmSqrToQuad.prototype.transform = function(e) {
     var t = new Vector2(e.x, e.y),
         r = new Vector2(0, 0),
         i = 1 / (1 + this.m_kG.dot(t)),
         r = new Vector2(this.m_kD.x * t.x, this.m_kD.y * t.y),
         n = this.m_kM.Multiply(r);
     return r.x = i * n.x + this.m_kT.x, r.y = i * n.y + this.m_kT.y, r
 }, HmQuadToSqr.prototype.transform = function(e) {
     var t = new Vector2(e.x, e.y),
         r = new Vector2(0, 0);
     r = this.m_kM.Multiply(t.subSelf(this.m_kT));
     var i = 1 / (1 + this.m_kG.dot(r)),
         n = r.multiplyScalar(i);
     if (n.x *= this.m_kD.x, n.y *= this.m_kD.y, n.x > 1) var a = 1;
     if (n.y > 1) var o = 1;
     return n
 };
 //# sourceMappingURL=./OtherAll-min.js.map