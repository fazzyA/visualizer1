function VPoint(e, t) {
    this.x = e, this.y = t, this.toString = function() {
        return "(" + this.x + "," + this.y + ")"
    }, this.clone = function() {
        return new VPoint(this.x, this.y)
    }
}

function VTileSet() {
    function e() {
        function e(e, t, a) {
            var r = 4 * a * e.width + 4 * t,
                o = e.data[r + 0] << 16;
            return o += e.data[r + 1] << 8, o += e.data[r + 2]
        }

        function t(e, t, a) {
            var r = 4 * a * e.width + 4 * t,
                o = e.data[r + 3] << 24;
            return o += e.data[r + 0] << 16, o += e.data[r + 1] << 8, o += e.data[r + 2]
        }

        function r(e, t, a, r) {
            var o = 4 * a * e.width + 4 * t;
            e.data[o + 0] = (16711680 & r) >> 16, e.data[o + 1] = (65280 & r) >> 8, e.data[o + 2] = 255 & r, e.data[o + 3] = r >>> 24
        }
        i.tiles = new Array;
        for (var o = 16711935, s = i.canvas.getContext("2d"), l = s.getImageData(0, 0, i.canvas.width, i.canvas.height), c = l.width, d = l.height, u = !1, h = 0; h < d; ++h)
            for (var p = 0; p < c; ++p) {
                var g = t(l, p, h),
                    f = g >>> 24,
                    v = 16777215 & g;
                16711935 == v && f < 63 && vout("IGNORE FF00FF AS ALPHA LOW SO MIGHT NOT REALLY BE FF00FF: " + a(f) + " - sku: " + i.sku), 16711935 != v && (16711680 & v) > 15728640 && (65280 & v) < 12032 && (255 & v) > 240 && (u || (++numFixedTileSets, vout("FIXED sku" + i.sku + " x,y=" + p + "," + h + " was " + a(v))), u = !0, "630651" != i.sku && "130088" != i.sku || vout("FIXED x,y=" + p + "," + h + " was " + a(v)), r(l, p, h, 4278190080 + o))
            }
        for (var h = 0; h < d;) {
            for (; e(l, 0, h) == o && h < d;) {
                for (var m = 0; m < c; ++m) r(l, m, h, 0);
                ++h
            }
            if (h == d) break;
            for (var b = h, p = 0, T = p; T < c && e(l, T, b) != o;) ++T;
            for (; b < d;) {
                if (e(l, p, b) == o) {
                    for (var m = 0; m < c; ++m) r(l, m, b, 0);
                    break
                }++b
            }
            var k = T - p,
                w = b - h,
                y = new Object;
            y.x = p, y.y = h, y.w = k, y.h = w, i.tiles.push(y), h = b + 1
        }
        s.putImageData(l, 0, 0), i.rotateForLandscape = !1, i.width = i.tiles[0].w, i.height = i.tiles[0].h, n || i.tiles[0].w < i.tiles[0].h && (y.noForceLandscape || (i.rotateForLandscape = !0, i.width = i.tiles[0].h, i.height = i.tiles[0].w))
    }

    function t() {
        if (1)
            for (var e = 0; e < i.tiles.length; ++e) i.tiles[e].width != i.tiles[0].width && vout("TILESET ERROR: Variations different widths - SKU: " + i.sku + " " + e + " " + i.tiles[e].width + " " + i.tiles[0].width), i.tiles[e].height != i.tiles[0].height && vout("TILESET ERROR: Variations different heights - SKU: " + i.sku + " " + e + " " + i.tiles[e].height + " " + i.tiles[0].height);
        vout(i.tiles.length)
    }

    function a(e) {
        return e < 0 && (e = 4294967295 + e + 1), e.toString(16).toUpperCase()
    }

    function r(e, t) {
        vtime("loadImageURLIntoCanvas(" + e + "): Start"), s.crossOrigin = "Anonymous", s.onload = function() {
            vtime("Loaded...copying"), i.canvas.width = s.width, i.canvas.height = s.height, i.canvas.getContext("2d").drawImage(s, 0, 0), vtime("loadImageURLIntoCanvas(): Done"), t()
        }, VUtils.isInternetExplorerBrowser() || (s.src = ""), s.src = e
    }

    function o() {
        function e(e, t) {
            e = (e + r.width) % r.width, t = (t + r.height) % r.height;
            var a = 4 * t * r.width + 4 * e;
            255 == n.data[a + 0] && 0 == n.data[a + 1] && 255 == n.data[a + 2] || (n.data[a + 3] = 0, n.data[a + 0] = 0, n.data[a + 1] = 0, n.data[a + 2] = 0)
        }
        vout("fattenTileGrout(): Start");
        var t = i.canvas.getContext("2d"),
            a = t.getImageData(0, 0, i.canvas.width, i.canvas.height),
            r = i.canvas2;
        r.width = i.canvas.width, r.height = i.canvas.height;
        var o = r.getContext("2d");
        o.drawImage(i.canvas, 0, 0);
        for (var n = o.getImageData(0, 0, r.width, r.height), s = 0; s < i.canvas.height; ++s)
            for (var l = 0; l < i.canvas.width; ++l) {
                var c = 4 * s * i.canvas.width + 4 * l;
                if ((255 != a.data[c + 0] || 0 != a.data[c + 1] || 255 != a.data[c + 2]) && a.data[c + 3] < 250)
                    for (var d = 3, u = -d; u <= d; ++u)
                        for (var h = -d; h <= d; ++h) e(l + u, s + h)
            }
        t.putImageData(n, 0, 0), vout("fattenTileGrout(): End")
    }
    var i = this;
    this.tile = null, this.sku = null, this.canvas = document.createElement("canvas"), this.canvas2 = document.createElement("canvas"), this.tiles = null, this.width = 0, this.height = 0, this.rotateForLandscape = !1;
    var n = !1,
        s = new Image;
    this.free = function() {}, this.setup = function(e) {
        this.tile = e, this.sku = e.sku, n = !1, "Mosaic" == e.type && (n = !0)
    }, this.load = function(a, n) {
        vtime("VTileSet.load sku " + i.sku);
        var s = 0;
        r(a, function() {
            vtime("Loaded...reading " + i.sku), e(), t(), vtime("Done2"), VUtils.isTabletOrPhoneDevice() && a.indexOf("_c.") != -1 && o(), n()
        })
    }
}

function SupertextureWebGL(e, t, a, r) {
    function o(e, t, a, r) {
        var o = {
            base64Data: e.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, ""),
            folder: t,
            filename: a
        };
        $.post("vsavebase64.php", o, function(e) {
            null != r && r()
        })
    }

    function i(e) {
        if (1 == e) return d;
        var t = document.createElement("canvas");
        return t.width = parseInt(d.width * e), t.height = parseInt(d.height * e), t.getContext("2d").clearRect(0, 0, t.width, t.height), t.getContext("2d").drawImage(d, 0, 0, t.width, t.height), t
    }

    function n(e) {
        function t(e) {
            return (255 != r.data[e + 0] || 0 != r.data[e + 1] || 255 != r.data[e + 2]) && r.data[e + 3] >= 250
        }
        if (VUtils.isTabletOrPhoneDevice()) return !1;
        vout("isSomeNonGroutAroundTileHV(): Start");
        for (var a = e.getContext("2d"), r = a.getImageData(0, 0, e.width, e.height), o = [!1, !1], i = 0; i < e.width; ++i)
            if (t(4 * i) && t(4 * ((e.height - 1) * e.width + i))) {
                o[1] = !0;
                break
            }
        for (var n = 0; n < e.height; ++n)
            if (t(4 * (n * e.width)) && t(4 * (n * e.width + e.width - 1))) {
                o[0] = !0;
                break
            }
        return vout("isSomeNonGroutAroundTileHV(): End"), r = null, o
    }
    var s = this,
        l = e,
        c = t,
        d = r;
    null == d && (d = document.createElement("canvas"), d.width = l, d.height = c);
    var u = d.getContext("2d");
    u.fillStyle = "#" + a, u.fillRect(0, 0, d.width, d.height), this.reuse = function(e, t, a, r) {
        l = e, c = t, r && (d.width = l, d.height = c, u = d.getContext("2d")), "Transparent" == a ? u.clearRect(0, 0, d.width, d.height) : (u.fillStyle = "#" + a, u.fillRect(0, 0, d.width, d.height))
    }, this.getCanvas = function() {
        return d
    }, this.tileAndGroutArea = function(e, t, a, r, o, i, s, h, p, g, f, v, m, b, T, k, w, y) {
        function S(e, t, a, r, o, i) {
            var n = !1;
            null == k ? n = !0 : k[(r + 1e4) % 10][(o + 1e4) % 10] == w && (n = !0);
            var s;
            if (n) {
                var l = Math.floor(VUtils.getRandom() * a.tiles.length),
                    s = a.tiles[l];
                void 0 != i ? u.drawImage(a.canvas, s.x, s.y, s.w, s.h, e, t, s.h, s.w) : u.drawImage(a.canvas, s.x, s.y, s.w, s.h, e, t, s.w, s.h), ++P
            }
            return s
        }

        function A(e, t, a, r, o, i) {
            var n = !1;
            null == k ? n = !0 : k[(r + 1e4) % 10][(o + 1e4) % 10] == w && (n = !0);
            var s;
            if (n) {
                var l = Math.floor(VUtils.getRandom() * a.tiles.length),
                    s = a.tiles[l];
                void 0 != i ? u.drawImage(a.canvas, s.x, s.y, s.w, s.h, e, t, G, U) : u.drawImage(a.canvas, s.x, s.y, s.w, s.h, e, t, U, G), F[0] && u.drawImage(a.canvas, s.x + .9 * s.w, s.y, .1 * s.w, s.h, e + .9 * U + 1, t, .1 * U, G), F[1] && u.drawImage(a.canvas, s.x, s.y + .9 * s.h, s.w, .1 * s.h, e, t + .9 * G + 1, U, .1 * G), ++P
            }
            return s
        }

        function x(e, t, a, r, o, i) {
            var n = !1;
            null == k ? n = !0 : k[(r + 1e4) % 10][(o + 1e4) % 10] == w && (n = !0);
            var s;
            if (n) {
                var l = Math.floor(VUtils.getRandom() * a.tiles.length),
                    s = a.tiles[l];
                u.translate(e, t), u.rotate(90 * Math.PI / 180), void 0 != i ? u.drawImage(a.canvas, s.x, s.y, s.w, s.h, 0, -G, U, G) : u.drawImage(a.canvas, s.x, s.y, s.w, s.h, 0, -U, G, U), F[0] && u.drawImage(a.canvas, s.x + .9 * s.w, s.y, .1 * s.w, s.h, 0 + .9 * G + 1, -U, .1 * G, U), F[1] && u.drawImage(a.canvas, s.x, s.y + .9 * s.h, s.w, .1 * s.h, 0, -U + .9 * U + 1, G, .1 * U), u.rotate(-90 * Math.PI / 180), u.translate(-e, -t), ++P
            }
            return s
        }

        function R(e, t, a, r, o, i) {
            var n = !1;
            null == k ? n = !0 : k[(r + 1e4) % 10][(o + 1e4) % 10] == w && (n = !0);
            var s;
            if (n) {
                var l = Math.floor(VUtils.getRandom() * a.tiles.length),
                    s = a.tiles[l];
                u.translate(e + U, t), u.rotate(180 * Math.PI / 180), void 0 != i ? u.drawImage(a.canvas, s.x, s.y, s.w, s.h, 0, -G, U, G) : u.drawImage(a.canvas, s.x, s.y, s.w, s.h, 0, -U, G, U), u.rotate(-180 * Math.PI / 180), u.translate(-e - U, -t), ++P
            }
            return s
        }

        function C(e, t, a, r, o, i) {
            var n = !1;
            null == k ? n = !0 : k[(r + 1e4) % 10][(o + 1e4) % 10] == w && (n = !0);
            var s;
            if (n) {
                var l = Math.floor(VUtils.getRandom() * a.tiles.length),
                    s = a.tiles[l];
                u.translate(e + U, t + G), u.rotate(270 * Math.PI / 180), void 0 != i ? u.drawImage(a.canvas, s.x, s.y, s.w, s.h, 0, -G, U, G) : u.drawImage(a.canvas, s.x, s.y, s.w, s.h, 0, -U, G, U), u.rotate(-270 * Math.PI / 180), u.translate(-e - U, -t - G), ++P
            }
            return s
        }

        function I(e, t, a, r, o) {
            var i = !1;
            null == k ? i = !0 : k[(r + 1e4) % 10][(o + 1e4) % 10] == w && (i = !0);
            var n;
            if (i) {
                var s = Math.floor(VUtils.getRandom() * a.tiles.length),
                    n = a.tiles[s];
                u.translate(e, t), u.rotate(45 * Math.PI / 180), u.drawImage(a.canvas, n.x, n.y, n.w, n.h, 0, 0, U, G), u.rotate(-45 * Math.PI / 180), u.translate(-e, -t), ++P
            }
            return n
        }

        function D(e, t, a, r, o) {
            var i = !1;
            null == k ? i = !0 : k[(r + 1e4) % 10][(o + 1e4) % 10] == w && (i = !0);
            var n;
            if (i) {
                var s = Math.floor(VUtils.getRandom() * a.tiles.length),
                    n = a.tiles[s];
                u.translate(e, t), u.rotate(135 * Math.PI / 180), u.drawImage(a.canvas, n.x, n.y, n.w, n.h, 0, 0, U, G), u.rotate(-135 * Math.PI / 180), u.translate(-e, -t), ++P
            }
            return n
        }

        function O(e, t, a, r, o) {
            var i = !1;
            null == k ? i = !0 : k[(r + 1e4) % 10][(o + 1e4) % 10] == w && (i = !0);
            var n;
            if (i) {
                var s = Math.floor(VUtils.getRandom() * a.tiles.length),
                    n = a.tiles[s];
                u.translate(e, t), u.rotate(225 * Math.PI / 180), u.drawImage(a.canvas, n.x, n.y, n.w, n.h, 0, 0, U, G), u.rotate(-225 * Math.PI / 180), u.translate(-e, -t), ++P
            }
            return n
        }
        var P = 0,
            B = 0,
            F = [!1, !1];
        "7F7FFF" != b && (F = n(f.canvas)), u.save();
        var M = o + i;
        VUtils.setRandomSeed(M);
        var E = new VPoint(v, m),
            W = !1;
        90 == a && (W = !0);
        var L = r.width,
            Y = r.height;
        L /= r.mosaicsMultiplierW, Y /= r.mosaicsMultiplierH;
        var U = L,
            G = Y;
        !r.isSyren && W && (U = Y, G = L), "StaggerWood" == t && (U = 0, G = 0), !r.isSyren && f.rotateForLandscape && (W = !W, a = 0, W && (a = 90));
        var V = d.width / l,
            H = d.height / c;
        u.scale(V, H);
        for (var X = 0; X < T.length; ++X) {
            var N = T[X];
            if ("" != N && "-" != N) {
                var q = N.split(","),
                    Z = parseInt(q[0]),
                    j = parseInt(q[2]),
                    _ = parseInt(q[1]) - Z + 1,
                    z = parseInt(q[3]) - j + 1;
                u.beginPath(), u.moveTo(0, 0), u.lineTo(d.width / V, 0), u.lineTo(d.width / V, d.height / H), u.lineTo(0, d.height / H), u.lineTo(0, 0), u.lineTo(Z, j), u.lineTo(Z, j + z), u.lineTo(Z + _, j + z), u.lineTo(Z + _, j), u.lineTo(Z, j), u.lineTo(0, 0), u.closePath(), u.clip()
            }
        }
        switch (null != p && (u.beginPath(), u.rect(p.x, p.y, p.w, p.h), u.closePath(), u.clip()), null != g && (u.beginPath(), u.rect(g.x, g.y, g.w, g.h), u.closePath(), u.clip()), u.beginPath(), u.rect(o, i, s, h), u.closePath(), u.clip(), null != k && 0 != w || "SingleTileDiamond" == t || ("Transparent" == b ? u.clearRect(o, i, s, h) : (u.fillStyle = "#" + b, u.fillRect(o, i, s, h))), r.isSyren && (t = "Syren"), t) {
            case "Syren":
                r.isSyren && (W = !W);
                for (var K = o + s, Q = i + h, J = E.x; J > o;) J -= U;
                for (var ee = E.y; ee > i;) ee -= G;
                var te = 1e4 - Math.floor((E.y - i) / G);
                E.y == i && ++te, Q += G, ee -= G + 8, W && 0 == i && (ee -= 18);
                var z = 84;
                W && (z = 79);
                for (var j = ee; j < Q; j += z) {
                    var ae = 0;
                    te % 2 == 1 && (ae = W ? 81 : 77);
                    var re = 0,
                        _ = U;
                    W && (_ += 7);
                    for (var Z = J - ae; Z < K; Z += _) W ? R(Z, j, f, re, te) : A(Z, j, f, re, te), ++re;
                    ++te
                }
                break;
            case "StaggerWood":
                if (W) {
                    for (var J = E.x - o; J > 0;) J -= f.height;
                    for (var re = 0, te = 0, Z = J; Z < s; Z += f.height)
                        for (var ee = -Math.floor(Math.random() * f.width), j = ee; j < h;) {
                            var oe = S(o + Z, i + j, f, re, te, "SwapWoodWH");
                            j += oe.w
                        }
                } else {
                    for (var ee = E.y - i; ee > 0;) ee -= f.height;
                    for (var re = 0, te = 0, j = ee; j < h; j += f.height)
                        for (var J = -Math.floor(Math.random() * f.width), Z = J; Z < s;) {
                            var oe = S(o + Z, i + j, f, re, te);
                            Z += oe.w
                        }
                }
                break;
            case "BlockHerringbone":
                for (var K = o + s, Q = i + h, J = E.x; J > o;) J -= U;
                for (var ee = E.y; ee > i;) ee -= G;
                if (W) {
                    for (var te = 0, re = 0, Z = J, j = ee;;) {
                        for (var ie = j, re = 0, ne = Z; ne < K; ne += G) x(ne, ie, f, re, te), --te, A(ne + U, ie + G - U, f, re, te, "SwapTileWH"), te += 3, ie += G;
                        if (Z -= U, ++re, j > Q) break;
                        j += U
                    }
                    for (var te = 0, re = 0, Z = J, j = ee;;) {
                        for (var ie = j, re = 0, ne = Z; ne < K; ne += G) x(ne, ie, f, re, te), --te, A(ne + U, ie + G - U, f, re, te, "SwapTileWH"), te += 3, ie += G;
                        if (Z += U, ++re, Z > K) break;
                        j -= U
                    }
                } else
                    for (var te = 0, re = 0, j = ee;;) {
                        for (var ie = j, re = 0, Z = J; Z < K; Z += U) A(Z, ie, f, re, te), --re, x(Z + U - G, ie - U, f, re, te, "SwapTileWH"), re += 3, ie -= U;
                        if (J -= U - G, ++te, ie > Q) break;
                        j += U + G
                    }
                break;
            case "Herringbone":
                var se = .7071067811881;
                if (W) {
                    var _ = G,
                        z = U,
                        le = U;
                    U = G, G = le;
                    for (var J = E.x - o; J > 0;) J -= _ * se;
                    for (var ee = E.y - i; ee > 0;) ee -= _ * se;
                    J -= 2 * U * se, ee -= 2 * U * se, s += 2 * U * se, h += 2 * U * se;
                    for (var te = 0, re = 0, Z = J; Z < s; Z += 1 * z / se) {
                        for (var j = ee; j < h; j += 2 * _ * se) D(o + Z, i + j, f, re, te), --te, O(o + Z, i + j, f, re, te), te += 3;
                        ++re
                    }
                } else {
                    for (var _ = U, z = G, J = E.x - o; J > 0;) J -= 1 * _ / se;
                    for (var ee = E.y - i; ee > 0;) ee -= 1 * _ / se;
                    J -= 2 * U * se, ee -= 2 * U * se, s += 2 * U * se, h += 2 * U * se;
                    for (var te = 0, re = 0, j = ee; j < h; j += 1 * z / se) {
                        for (var Z = J; Z < s; Z += 2 * _ * se) I(o + Z, i + j, f, re, te), --re, D(o + Z, i + j, f, re, te), re += 3;
                        ++te
                    }
                }
                break;
            case "SingleTileDiamond":
                I(o + s / 2, i, f, 0, 0);
                break;
            case "Diamond":
                var se = .7071067811881;
                _ = U / se, z = G / se, s += _, h += z;
                for (var K = o + s, Q = i + h, J = E.x; J > o;) J -= _;
                for (var ee = E.y; ee > i;) ee -= z;
                J -= _ / 2;
                for (var te = 0, j = ee; j < Q; j += z) {
                    for (var re = 0, Z = J; Z < K; Z += _) I(Z, j, f, re, te), I(Z - _ / 2, j - z / 2, f, re, te + 1), re += 2;
                    te += 2
                }
                break;
            case "3/4BrickBond":
                for (var K = o + s, Q = i + h, J = E.x; J > o;) J -= U;
                for (var ee = E.y; ee > i;) ee -= G;
                var te = 1e4 - Math.floor((E.y - i) / G);
                E.y == i && ++te, Q += G;
                for (var j = ee; j < Q; j += G) {
                    var ae = 0;
                    W || te % 2 == 1 && (ae = U / 4);
                    for (var re = 0, Z = J - ae; Z < K; Z += U) {
                        if (W) {
                            var ce = 0;
                            re % 2 == 1 && (ce = G / 4), x(Z, j - ce, f, re, te)
                        } else A(Z, j, f, re, te);
                        ++re
                    }++te
                }
                break;
            case "Brick":
                for (var K = o + s, Q = i + h, J = E.x; J > o;) J -= U;
                for (var ee = E.y; ee > i;) ee -= G;
                var te = 1e4 - Math.floor((E.y - i) / G);
                E.y == i && ++te, Q += G;
                for (var j = ee; j < Q; j += G) {
                    var ae = 0;
                    W || te % 2 == 1 && (ae = U / 2);
                    for (var re = 0, Z = J - ae; Z < K; Z += U) {
                        if (W) {
                            var ce = 0;
                            re % 2 == 1 && (ce = G / 2), x(Z, j - ce, f, re, te)
                        } else A(Z, j, f, re, te);
                        ++re
                    }++te
                }
                break;
            default:
                for (var K = o + s, Q = i + h, J = E.x; J > o;) J -= U;
                for (var ee = E.y; ee > i;) ee -= G;
                for (var te = 0, j = ee; j < Q; j += G) {
                    for (var re = 0, Z = J; Z < K; Z += U) 90 == a ? x(Z, j, f, re, te) : 180 == a ? R(Z, j, f, re, te) : 270 == a ? C(Z, j, f, re, te) : A(Z, j, f, re, te), ++re;
                    ++te
                }
        }
        if (0) {
            var se = parseInt(b, 16),
                de = (16711680 & se) >> 16,
                ue = (65280 & se) >> 8,
                he = 255 & se,
                pe = 255;
            "Transparent" == b && (de = 0, ue = 0, he = 0, pe = 0);
            for (var ge = u.getImageData(parseInt(V * E.x), H * i, 3, H * h), X = 0; X < H * h; ++X)
                for (var X = 0; X < ge.width * ge.height; ++X) ge.data[4 * X + 0 + 0] = de, ge.data[4 * X + 0 + 1] = ue, ge.data[4 * X + 0 + 2] = he, ge.data[4 * X + 0 + 3] = pe;
            u.putImageData(ge, V * E.x, H * i)
        }
        u.restore()
    }, this.colourArea = function(e, t, a, r, o, i, n) {
        u.save();
        var s = d.width / l,
            h = d.height / c;
        u.scale(s, h);
        for (var p = 0; p < n.length; ++p) {
            var g = n[p];
            if ("" != g && "-" != g) {
                var f = g.split(","),
                    v = parseInt(f[0]),
                    m = parseInt(f[2]),
                    b = parseInt(f[1]) - v + 1,
                    T = parseInt(f[3]) - m + 1;
                u.beginPath(), u.moveTo(0, 0), u.lineTo(d.width / s, 0), u.lineTo(d.width / s, d.height / h), u.lineTo(0, d.height / h), u.lineTo(0, 0), u.lineTo(v, m), u.lineTo(v, m + T), u.lineTo(v + b, m + T), u.lineTo(v + b, m), u.lineTo(v, m), u.lineTo(0, 0), u.closePath(), u.clip()
            }
        }
        null != i && (u.beginPath(), u.rect(i.x, i.y, i.w, i.h), u.closePath(), u.clip()), u.fillStyle = "#" + e, u.fillRect(t, a, r, o), u.restore()
    }, this.colourZone = function(e, t, a, r, o, i, n, s, h) {
        u.save();
        var p = d.width / l,
            g = d.height / c;
        u.scale(p, g);
        for (var f = 0; f < h.length; ++f) {
            var v = h[f];
            if ("" != v && "-" != v) {
                var m = v.split(","),
                    b = parseInt(m[0]),
                    T = parseInt(m[2]),
                    k = parseInt(m[1]) - b + 1,
                    w = parseInt(m[3]) - T + 1;
                u.beginPath(), u.moveTo(0, 0), u.lineTo(d.width / p, 0), u.lineTo(d.width / p, d.height / g), u.lineTo(0, d.height / g), u.lineTo(0, 0), u.lineTo(b, T), u.lineTo(b, T + w), u.lineTo(b + k, T + w), u.lineTo(b + k, T), u.lineTo(b, T), u.lineTo(0, 0), u.closePath(), u.clip()
            }
        }
        null != s && (u.beginPath(), u.rect(s.x, s.y, s.w, s.h), u.closePath(), u.clip()), u.fillStyle = "#" + e, u.fillRect(r, o, i, n), u.strokeStyle = "#" + t, u.lineWidth = a, u.beginPath(), u.moveTo(r, o), u.lineTo(r + i, o), u.lineTo(r + i, o + n), u.lineTo(r, o + n), u.lineTo(r, o), u.stroke(), u.closePath(), u.restore()
    }, this.saveAsPNG = function(e, t, a) {
        o(d, e, t, a)
    }
}

function VMapper(e) {
    var t = this,
        a = !1,
        r = null,
        o = new Array,
        i = new Array,
        n = null,
        s = null,
        l = null,
        c = null,
        d = !1,
        u = !1,
        h = new ViziGL(e),
        p = null,
        g = null,
        f = h.initialise();
    f || alert("WebGL Unsupported");
    var v;
    VUtils.isTabletOrPhoneDevice() ? (h.setIsSlowMachine(!0), v = new Texturemaker(1024)) : (h.setIsSlowMachine(!0), v = new Texturemaker(2048));
    var m = v.getGLtextureCanvas(),
        b = v.getGLbumpCanvas();
    this.getColourTextureCanvas = function() {
        return m
    }, this.getNormalTextureCanvas = function() {
        return b
    }, this.setViziGLPaths = function(e, t) {}, this.findGridIndexWithName = function(e) {
        return h.findGridIdxWithName(e)
    }, this.getGridName = function(e) {
        return h.getGridName(e)
    }, this.getGridIndexAtScreenXY = function(e, t, a) {
        var r = h.ptInAGrid(e, t);
        return a && h.ptInOverlay(e, t) ? -1 : r
    }, this.getTextureXYAtScreenXY = function(e, t, a) {
        var r = h.screenLocToMMTextureLocForGrid(e, t, a),
            o = new VPoint(parseInt(r.x), parseInt(r.y));
        return o
    }, this.getScreenXYAtTextureXY = function(e, t, a) {
        var r = h.mmTextureLocToScreenLocForGrid(e, t, a),
            o = new VPoint(r.x, r.y);
        return o
    }, this.loadSVGFromURL = function(e, t) {
        h.loadScene(e, function() {
            h.renderToWhite(), t()
        })
    }, this.getOutlineQuadMM = function(e) {
        var t = h.getGridHsizeMM(e),
            a = h.getGridVsizeMM(e);
        return [t, a]
    }, this.getOutlineAlignXYMM = function(e) {
        vobj("viziGL.getGridAlignmenLocationMM(outlineNum)=" + h.getGridAlignmenLocationMM(e));
        var t = h.getGridAlignmenLocationMM(e);
        return t == -1 ? new VPoint(0, 0) : new VPoint(t.x, t.y)
    }, this.getOutlineForGrid = function(e) {
        var t = h.getOutlinesForGrid(e);
        return t[0]
    }, this.getRenderedSceneCanvas = function() {
        return h.getRenderCanvas()
    }, this.getOverlayCanvas = function() {
        return h.getOverlayCanvas()
    }, this.getNumGrids = function() {
        return h.getNumGrids()
    }, this.renderStockScene = function(e) {
        function t() {
            for (var t = 0; t < h.getNumGrids(); ++t)
                if (null != e[t]) switch (e[t].type) {
                    case "Colour":
                        r[t] = "#" + e[t].colourRRGGBB;
                        break;
                    case "Texture":
                        if (a) {
                            var o = e[t].supertextureCanvas,
                                i = e[t].supernormalCanvas;
                            v.makeFromSuperCanvases(o, i)
                        }
                        v.setMaterialProperties(e[t].lighting.normalScale, e[t].lighting.reflectivity, e[t].lighting.shininess, e[t].lighting.HDRalpha), r[t] = v
                }
                h.render(r)
        }
        vout("renderStockScene()");
        for (var r = new Array, o = 0; o < h.getNumGrids(); ++o) r.push(null);
        t()
    }, this.renderStockSceneLayer = function(e) {
        function t() {
            for (var t = 0; t < h.getNumGrids(); ++t)
                if (null != e[t]) switch (e[t].type) {
                    case "Colour":
                        r[t] = "#" + e[t].colourRRGGBB;
                        break;
                    case "Texture":
                        if (a) {
                            var o = e[t].supertextureCanvas,
                                i = e[t].supernormalCanvas;
                            v.makeFromSuperCanvases(o, i)
                        }
                        v.setMaterialProperties(e[t].lighting.normalScale, e[t].lighting.reflectivity, e[t].lighting.shininess, e[t].lighting.HDRalpha), r[t] = v
                }
                h.renderLayer(r)
        }
        vout("renderStockSceneLayer()");
        for (var r = new Array, o = 0; o < h.getNumGrids(); ++o) r.push(null);
        t()
    }
}

function cout(e) {
    vDebugLoggingOn && console.log("cout " + e)
}

function vSetDebugLoggingOn() {
    vDebugLoggingOn = !0
}

function vout(e) {
    vDebugLoggingOn && console.log("vout " + (((new Date).getTime() - vInitialTimer) / 1e3).toFixed(2) + ": " + e)
}

function vobj(e) {
    if (vDebugLoggingOn) {
        var t = JSON.stringify(e, void 0, 2);
        return console.log("vobj(): " + t), "vobj(): " + t
    }
}

function vtime(e) {
    vDebugLoggingOn && console.log("vtime " + (((new Date).getTime() - vInitialTimer) / 1e3).toFixed(2) + ": " + e)
}

function verror(e) {
    alert("ERROR: " + e), vDebugLoggingOn && console.log("ERROR: " + e)
}

function vResetTimer() {
    vLastTimer = (new Date).getTime()
}

function vShowTimer() {
    if (vDebugLoggingOn) {
        var e = (new Date).getTime(),
            t = e - vLastTimer;
        console.log("vtimer: " + t + " (cur=" + e + " last=" + vLastTimer + ")"), vLastTimer = e
    }
}

function VStorage() {
    function e() {
        try {
            return "localStorage" in window && null !== window.localStorage
        } catch (e) {
            return !1
        }
    }

    function t() {
        for (var e = JSON.parse(localStorage.appData), t = localStorage.appData.length, a = 0; a < e.directory.length; ++a) t += localStorage[e.directory[a].fileID].length;
        return t
    }

    function a(e) {
        for (var t = JSON.parse(localStorage.appData), a = 0; a < t.directory.length; ++a)
            if (t.directory[a].fileID == e) return localStorage[t.directory[a].fileID].length;
        return 0
    }

    function r() {
        localStorage.clear();
        var e = new Object;
        e.dataVersion = s, e.directory = new Array, localStorage.appData = JSON.stringify(e)
    }

    function o() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            var t = 16 * Math.random() | 0,
                a = "x" == e ? t : 3 & t | 8;
            return a.toString(16)
        })
    }

    function i() {
        vout("App Data..."), vout("appData length=" + localStorage.appData.length);
        for (var e = JSON.parse(localStorage.appData), t = 0; t < e.directory.length; ++t) vout("FileID: " + e.directory[t].fileID + " length=" + localStorage[e.directory[t].fileID].length)
    }
    var n = this,
        s = 1,
        l = 2097152;
    if (!e()) return void verror("localstorage not supported");
    var c = !1;
    if (null == localStorage.appData) vout("VStorage: No saved data"), c = !0;
    else {
        var d = JSON.parse(localStorage.appData);
        d.dataVersion != s && (vout("VStorage: Updated data version"), c = !0)
    }
    c && r(), this.deleteAll = function() {
        r()
    }, this.deleteStorageData = function(e) {
        vout("deleteStorageData(fileID=" + e + ")");
        for (var t = JSON.parse(localStorage.appData), a = 0; a < t.directory.length; ++a) t.directory[a].fileID == e && (t.directory.splice(a, 1), localStorage.appData = JSON.stringify(t), localStorage.removeItem(e));
        i()
    }, this.saveStorageData = function(e, r) {
        vout("saveStorageData(fileID=" + e + ")"), null == e ? e = o : "" == e && (e = o);
        for (var n = (new Date).getTime(), s = JSON.parse(localStorage.appData), c = !1, d = 0; d < s.directory.length; ++d)
            if (s.directory[d].fileID == e) {
                c = !0;
                break
            }
        c ? s.directory[d].timeStamp = n : (entry = new Object, entry.fileID = e, entry.timeStamp = n, s.directory.push(entry));
        var u = 0;
        return c && (u = a(e)), vout("VStorage:saveStorageData(): " + t() + " - " + localStorage.appData.length + " - " + u + " + " + JSON.stringify(s).length + " + " + JSON.stringify(r).length + " > " + l), t() - localStorage.appData.length - u + JSON.stringify(s).length + JSON.stringify(r).length > l ? null : (localStorage.appData = JSON.stringify(s), localStorage[e] = JSON.stringify(r), vout("storage data length=" + localStorage[e].length), vout("saveFileData(): Done"), i(), e)
    }, this.getStorageList = function() {
        var e = JSON.parse(localStorage.appData);
        return e.directory
    }, this.loadStorageData = function(e) {
        for (var t = JSON.parse(localStorage.appData), a = 0; a < t.directory.length; ++a)
            if (t.directory[a].fileID == e) {
                var r = JSON.parse(localStorage[e]);
                return r
            }
        return null
    }
}

function VDatabase() {
    function e(e) {
        function t(e, t) {
            void 0 == t && (t = ","), t && t.length > 1 && (t = ",");
            for (var a = "\n", r = "", o = 0, i = e.charAt(o), n = 0, s = 0, l = new Array; i != r;) {
                for (;
                    " " == i || "\t" == i || "\r" == i;) i = e.charAt(++o);
                var c = "";
                if ('"' == i) {
                    i = e.charAt(++o);
                    do
                        if ('"' != i && (c += i, i = e.charAt(++o)), '"' == i) {
                            var d = e.charAt(o + 1);
                            '"' == d && (c += '"', o += 2, i = e.charAt(o))
                        }
                    while (i != r && '"' != i);
                    if (i == r) throw "Unexpected end of data, double-quote expected";
                    i = e.charAt(++o)
                } else
                    for (; i != r && i != t && i != a && "\t" != i && "\r" != i;) c += i, i = e.charAt(++o);
                for (l.length <= n && l.push(new Array), l[n].push(c);
                    " " == i || "\t" == i || "\r" == i;) i = e.charAt(++o);
                if (i == t) s++;
                else if (i == a) s = 0, n++;
                else if (i != r) throw "Delimiter expected after character " + o + "   " + i + "    " + i.charCodeAt(0);
                if (i = e.charAt(++o), i == r && n > 0)
                    for (; s < l[n - 1].length;) l[n].push(""), ++s
            }
            return l
        }
        for (var a = t(e), r = new Array, o = new Array, i = new Array, n = 0; n < a[0].length; ++n) {
            var s = a[0][n];
            s.indexOf("[]") != -1 ? i.push(!0) : i.push(!1), o.push(s.replace("[]", ""))
        }
        for (var l = 1; l < a.length; ++l) {
            for (var c = a[l], d = new Object, n = 0; n < a[l].length; ++n) {
                var u = c[n].replace(/^\s+|\s+$/gm, "");
                i[n] ? (void 0 == d[o[n]] && (d[o[n]] = new Array), "[BLANK]" == u ? d[o[n]].push("") : "" != u && d[o[n]].push(u)) : d[o[n]] = u
            }
            r.push(d)
        }
        return r
    }
    var t = this;
    this.load = function(a, r) {
        function o(n) {
            tableProperty = n.substring(n.lastIndexOf("/") + 1, n.lastIndexOf("-Table 1")), VUtils.loadTextFromURL(n, function(s) {
                vout(n), n.toLowerCase().indexOf(".csv") != -1 ? t[tableProperty] = e(s) : n.toLowerCase().indexOf(".json") != -1 ? t[tableProperty] = JSON.parse(s) : verror("VDatabase(): Unexpected file type: " + n), ++i, i < a.length ? o(a[i]) : r()
            })
        }
        var i = 0;
        o(a[i])
    }
}

function VShare() {
    var e = this;
    this.send = function(e, t, a, r) {
        switch (e) {
            case "Facebook":
                var o = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(a);
                window.open(o);
                break;
            case "Twitter":
                var o = "http://twitter.com/share";
                o += "?url=" + a, o += "&text=" + t, window.open(o);
                break;
            case "Pinterest":
                var o = "http://pinterest.com/pin/create/button/";
                o += "?url=" + r, o += "&media=" + a, o += "&description=" + t, window.open(o)
        }
    }, this.facebookScrapeURL = function(e, t) {
        $.post("https://graph.facebook.com", {
            id: e,
            scrape: !0
        }, function(e) {
            t()
        })
    }
}

function VEmail() {
    var e = this;
    this.send = function(e, t, a, r) {
        var o = {
            from: a,
            to: r,
            subject: t,
            htmlEmail: e
        };
        $.post("vsendemail.php", o, function(e) {})
    }, this.checkValidEmailAddress = function(e) {
        if (e.indexOf(".") == -1) return !1;
        var t = e.indexOf("@");
        if (t == -1) return !1;
        if (0 == t) return !1;
        if (t == e.length - 1) return !1;
        for (var a = 0, r = "", o = 0; o < e.length; ++o) {
            var i = e.charAt(o);
            if ("@" == i) {
                if (++a, 2 == a) return !1;
                if ("." == r) return !1
            } else if ("." == i && "@" == r) return !1;
            r = i
        }
        return !0
    }
}

function GUI(e, t) {
    function a(e) {
        Zt || ($(".modal-decorate-options").fadeOut(), gt.decorateOptionAction(e))
    }

    function r(e) {
        Zt || ($(".modal-area-options").fadeOut(), gt.decorateAreaOption(e))
    }

    function o() {
        $(".modal-styles-overlay").fadeOut()
    }

    function i(e) {
        var t = $("." + e).position().top;
        $(".vit-pane-container .vit-content-pane").scrollTop(t)
    }

    function n(e) {
        if (null != e) {
            kt = e;
            var t = e.data("entry-index");
            if (wt = lt()[t], "Cabinet" == wt.is || "Worktop" == wt.is) return;
            var a = e.offset().left + .75 * e.width();
            a + 1.1 * $(".select-tile-modal").width() > $(window).width() && (a = $(window).width() - 1.1 * $(".select-tile-modal").width());
            var r = e.offset().top + .75 * e.height();
            r + 1.1 * $(".select-tile-modal").height() > $(window).height() && (r = $(window).height() - 1.1 * $(".select-tile-modal").height()), a = 240 + (671 - $(".select-tile-modal").width()) / 2, r = e.offset().top + e.height() / 2 > $(window).height() / 2 ? 25 : $(window).height() - $(".select-tile-modal").height() - 25, VUtils.isTabletOrPhoneDevice() ? ($(".select-tile-modal").css("left", a + "px"), $(".select-tile-modal").css("top", r + "px")) : ($(".select-tile-modal").stop(), $t ? ($t = !1, $(".select-tile-modal").css("left", a + "px"), $(".select-tile-modal").css("top", r + "px")) : $(".select-tile-modal").animate({
                left: a + "px",
                top: r + "px"
            }, 100), $(".select-tile").hide(), $(".select-tile-modal .small-text").css("font-size", "13px"), $(".select-tile-modal .price").css("font-size", "16px")), $(".select-tile-modal .vit-thumbnail").attr("src", wt.thumbnail), $(".select-tile-modal p").eq(0).html(wt.nameText), $(".select-tile-modal p").eq(1).html("Code: " + wt.skuText), $(".select-tile-modal p").eq(2).html(wt.sizeText), $(".select-tile-modal p").eq(3).find("strong").html(wt.priceText), $(".select-tile-modal p").eq(3).find("span").html(wt.priceText2), $(".select-tile-modal").show(), "" != wt.priceM2Text ? ($(".select-tile-modal p").eq(4).find("strong").html(wt.priceM2Text), $(".select-tile-modal .price").eq(1).show()) : $(".select-tile-modal .price").eq(1).hide()
        } else $(".select-tile-modal").hide()
    }

    function s() {
        $(".modal-startup-overlay").fadeOut()
    }

    function l() {
        Q(wt.selectIdSelectTile), n(null)
    }

    function c() {
        n(null)
    }

    function d() {
        jt = !1, Xe(), n(null)
    }

    function u() {
        jt && gt.selection(Nt.selectIdApplyFilters), He()
    }

    function h() {
        $(".vit-search input").val(""), $(".vit-not-search-in-progress").hide(), $(".vit-search-in-progress").show(), gt.selection(Nt.tilesSearch.selectIdSearch, "", function() {
            $(".vit-not-search-in-progress").show(), $(".vit-search-in-progress").hide(), He()
        })
    }

    function p() {
        var e = $(".vit-search input").val();
        $(".vit-not-search-in-progress").hide(), $(".vit-search-in-progress").show(), gt.selection(Nt.tilesSearch.selectIdSearch, e, function() {
            $(".vit-not-search-in-progress").show(), $(".vit-search-in-progress").hide(), He()
        })
    }

    function g() {
        gt.selection(Nt.basket.selectIdPay)
    }

    function f(e, t) {
        var a = gt.selection(e, t);
        ze(a)
    }

    function v(e, t) {
        var a = gt.selection(e, t);
        _e(a)
    }

    function m(e) {
        gt.selection(Nt.addToBasketPopup.selectIdUpdateQuantity, e), et()
    }

    function b(e) {
        gt.selection(Nt.addToBasketPopup.selectIdUpdateCoverage, e), Je()
    }

    function T(e, t) {
        Nt.addRangeToBasketPopup.items[t].disable || (gt.selection(e), Qe(), Je(), et())
    }

    function k(e, t) {
        gt.selection(e, t), et()
    }

    function w(e, t) {
        gt.selection(e, t), Je()
    }

    function y(e, t) {
        Nt.addSampleTileRangePopup.items[t].disable || (gt.selection(e), at())
    }

    function S() {
        gt.selection(Nt.tilingAsRangeOrSinglePopup.selectIdAbort), rt(!1)
    }

    function A() {
        gt.selection(Nt.tilingAsRangeOrSinglePopup.selectIdSingle), rt(!1), st()
    }

    function x() {
        rt(!1), ot(!0)
    }

    function R(e) {
        gt.selection(e), it(!0, null)
    }

    function C(e, t) {
        var a = gt.selection(e, t);
        it(!1, a)
    }

    function I(e) {
        $(".modal-tiling-range .basket-btn a").hasClass("range-add-basket-disabled") || (gt.selection(Nt.tilingAsRangePopup.selectIdFinished), ot(!1), st())
    }

    function D() {
        gt.selection(Nt.tilingAsRangePopup.selectIdAbort), ot(!1)
    }

    function O() {
        switch (vt) {
            case -1:
            case 0:
                vt = 1;
                break;
            case -2:
            case 1:
            case 2:
                vt = 0;
                break;
            case 3:
                vt = 2, bt = -1, Be()
        }
        F()
    }

    function P() {
        switch (vt) {
            case -1:
            case 0:
                vt = 1, F();
                break;
            case 3:
                vt = 2, F(), bt = -1, Be()
        }
    }

    function B() {
        switch (vt) {
            case -1:
            case 0:
                break;
            case 1:
            case 2:
                vt = 0, F();
                break;
            case 3:
                vt = 0, F()
        }
    }

    function F(e) {
        if (void 0 == e) return void setTimeout(function() {
            F(0)
        }, 1);
        var t = $(".vl-main-nav").width(),
            a = $(".vl-pane").width();
        switch (vout("updateMainPaneOpenState(): " + vt), vt) {
            case -2:
                $(".vl-main-nav").css("left", "0px"), $(".vl-pane").css("left", "-" + a + "px"), $(".vit-pane-tab").css("left", "-" + a + "px");
                break;
            case -1:
                $(".vl-main-nav").css("left", "-" + t + "px"), $(".vl-pane").css("left", "-" + (a + t) + "px"), $(".vit-pane-tab").css("left", "-" + (a + t) + "px"), $(".vit-pane-tab img").attr("src", "images/vit_main_menu_tab_right.png");
                break;
            case 0:
                $(".vl-main-nav").animate({
                    left: "-" + t + "px"
                }, 500), $(".vl-pane").animate({
                    left: "-" + (a + t) + "px"
                }, 500), $(".vit-pane-tab").animate({
                    left: "-" + (a + t) + "px"
                }, 500, function() {
                    $(".vit-pane-tab img").attr("src", "images/vit_main_menu_tab_right.png")
                });
                break;
            case 1:
                $(".vl-main-nav").animate({
                    left: "0px"
                }, 500), $(".vl-pane").animate({
                    left: "-" + a + "px"
                }, 500), $(".vit-pane-tab").animate({
                    left: "-" + a + "px"
                }, 500, function() {
                    $(".vit-pane-tab img").attr("src", "images/vit_main_menu_tab_left.png")
                });
                break;
            case 2:
                $(".vl-pane").animate({
                    left: "-" + a + "px"
                }, 500), $(".vit-pane-tab").animate({
                    left: "-" + a + "px"
                }, 500), $(".vit-pane-tab img").attr("src", "images/vit_main_menu_tab_left.png");
                break;
            case 3:
                $(".vl-pane").animate({
                    left: "0"
                }, 500), $(".vit-pane").animate({
                    left: "0"
                }, 500), $(".vit-pane-tab").animate({
                    left: "0"
                }, 500), $(".vit-pane-tab-dead-surround").animate({
                    left: "0"
                }, 500)
        }
    }

    function M() {
        switch (mt) {
            case -1:
            case 0:
                mt = 1;
                break;
            case 1:
                mt = 2;
                break;
            case 2:
                mt = 0
        }
        L()
    }

    function E() {
        mt = 0, L()
    }

    function W() {
        mt = 1, L()
    }

    function L() {
        var e = $(".tools-container").width(),
            t = $(".tool-container").width() + 6;
        switch (mt) {
            case -1:
                $(".tools-container").css("right", -e + "px"), $(".vit-tools-tab").css("right", "0");
                break;
            case 0:
                $(".tools-container").animate({
                    right: -e + "px"
                }, 300), $(".vit-tools-tab").animate({
                    right: "0"
                }, 300, function() {
                    $(".vit-tools-tab img").attr("src", "images/vit_tool_tab_left.png")
                });
                break;
            case 1:
                $(".tools-container").animate({
                    right: -t + "px"
                }, 300), $(".vit-tools-tab").animate({
                    right: e - t + "px"
                }, 300, function() {
                    $(".vit-tools-tab img").attr("src", "images/vit_tool_tab_left.png")
                });
                break;
            case 2:
                $(".tools-container").animate({
                    right: "0"
                }, 300), $(".vit-tools-tab").animate({
                    right: e + "px"
                }, 300, function() {
                    $(".vit-tools-tab img").attr("src", "images/vit_tool_tab_right.png")
                })
        }
    }

    function Y() {
        $(".style-tile-modal").hide(), 0 == bt ? (bt = -1, vt = 2, F()) : (bt = 0, vt = 3, F(), E()), Be(), VUtils.isTabletOrPhoneDevice() ? ($(".vit-scrollbar1").show(), $(".vit-scrollbar2").hide()) : ($(".vit-scrollbar1").hide(), $(".vit-scrollbar2").hide())
    }

    function U() {
        1 == bt ? (bt = -1, vt = 2, F()) : (bt = 1, vt = 3, F(), E()), Be(), VUtils.isTabletOrPhoneDevice() ? ($(".vit-scrollbar1").show(), $(".vit-scrollbar2").hide()) : ($(".vit-scrollbar1").hide(), $(".vit-scrollbar2").hide())
    }

    function G() {
        $(".style-tile-modal").hide(), 3 == bt ? (bt = -1, vt = 2, F()) : (bt = 3, vt = 3, F(), E()), Be(), VUtils.isTabletOrPhoneDevice() ? ($(".vit-scrollbar1").show(), $(".vit-scrollbar2").hide()) : ($(".vit-scrollbar1").hide(), $(".vit-scrollbar2").hide())
    }

    function V() {
        3 == bt ? (bt = -1, vt = 2, F()) : (bt = 3, vt = 3, F(), E(), gt.selection(Nt.wishlist.selectIdRefreshWishlist)), Be(), VUtils.isTabletOrPhoneDevice() ? ($(".vit-scrollbar1").hide(), $(".vit-scrollbar2").show()) : ($(".vit-scrollbar1").hide(), $(".vit-scrollbar2").hide())
    }

    function H() {
        4 == bt ? (bt = -1, vt = 2, F()) : (bt = 4, vt = 3, F(), E()), Be(), VUtils.isTabletOrPhoneDevice() ? ($(".vit-scrollbar1").hide(), $(".vit-scrollbar2").show()) : ($(".vit-scrollbar1").hide(), $(".vit-scrollbar2").hide())
    }

    function X() {
        5 == bt ? (bt = -1, vt = 2, F()) : (bt = 5, vt = 3, F(), E(), gt.selection(Nt.basket.selectIdRefreshBasket)), Be(), Ze(), VUtils.isTabletOrPhoneDevice() ? ($(".vit-scrollbar1").hide(), $(".vit-scrollbar2").show()) : ($(".vit-scrollbar1").hide(), $(".vit-scrollbar2").hide())
    }

    function N() {
        ft.trackSelectHelp(), $(".style-tile-modal").hide(), 6 == bt ? (bt = -1, vt = 2, F()) : (bt = 6, vt = 3, F(), E()), Be(), je(), VUtils.isTabletOrPhoneDevice() ? ($(".vit-scrollbar1").hide(), $(".vit-scrollbar2").show()) : ($(".vit-scrollbar1").hide(), $(".vit-scrollbar2").hide())
    }

    function q(e) {
        gt.selection(e), Be()
    }

    function Z(e) {
        gt.selection(e), Be()
    }

    function j(e) {
        "" != e && (bt = -1, e.indexOf("SelectPredecoratedRoom") != -1 ? B() : VUtils.isTabletOrPhoneDevice() ? B() : P(), Be(), gt.selection(e), st())
    }

    function _(e) {
        "" != e && (gt.selection(e), Fe(!1))
    }

    function z(e) {
        gt.selection(Nt.tilesType.selectIdTilesType, e), Tt = e, Be()
    }

    function K() {
        gt.selection(Nt.tools.selectIdCreateArea), bt = -1, B(), Be()
    }

    function Q(e) {
        "" != e && (n(null), bt = -1, VUtils.isTabletOrPhoneDevice() ? B() : P(), W(), Be(), gt.selection(e) && rt(!0), st())
    }

    function J(e) {
        "" != e && (jt = !0, gt.selection(e), Xe())
    }

    function ee(e) {
        "" != e && (gt.selection(e), He())
    }

    function te(e) {
        gt.selection(e), Ne(), Be(), st()
    }

    function ae(e) {
        gt.selection(e), Ke(!0), $(".modal-basket").fadeIn()
    }

    function re(e) {
        gt.selection(e), st(), Be()
    }

    function oe(e) {
        gt.selection(e), Ze(), st(), Be()
    }

    function ie(e) {
        gt.selection(e), Ze(), st(), Be()
    }

    function ne() {
        if (!$(".tool.v-order-sample").hasClass("disabled")) {
            if (ft.trackToolButton("Order Sample", gt.getCurRoom()), gt.selection(Nt.tools.selectIdOrderSample)) return void tt(!0);
            st(), Be()
        }
    }

    function se() {
        $(".tool.v-add-to-basket").hasClass("disabled") || (ft.trackToolButton("Add to Basket", gt.getCurRoom()), gt.selection(Nt.tools.selectIdAddTileToBasketStart), Ke(!0))
    }

    function le() {
        gt.selection(Nt.addToBasketPopup.selectIdAddTileToBasket) && (Ke(!1), st(), Be())
    }

    function ce() {
        $(".modal-popup .range-basket .basket-btn a").hasClass("range-add-basket-disabled") || gt.selection(Nt.addRangeToBasketPopup.selectIdAddTileRangeToBasket) && (Ke(!1), st(), Be())
    }

    function de() {
        $(".modal-range-samples .basket-btn a").hasClass("range-add-basket-disabled") || (gt.selection(Nt.addSampleTileRangePopup.selectIdAddSampleTileRangeToBasket), tt(!1), st(), Be())
    }

    function ue() {
        Ke(!1), st(), Be()
    }

    function he() {
        tt(!1), st(), Be()
    }

    function pe(e) {
        gt.selection(Nt.tools.selectIdChangePattern, qt[e]),
            ft.trackSelectPattern(qt[e]), $(".modal-pattern").fadeOut(), st()
    }

    function ge() {
        $(".modal-pattern").fadeOut()
    }

    function fe() {
        $(".modal-share").fadeOut()
    }

    function ve(e) {
        return "Email" == e ? ($(".modal-share").fadeOut(), $(".modal-email").fadeIn(), void("DEV" == runningEnvironment && ($(".modal-email input").eq(0).val("Chris Chapman"), $(".modal-email input").eq(1).val("chipcjc@googlemail.com"), $(".modal-email textarea").val("hello")))) : ($(".modal-share .icons").hide(), $(".modal-share .exporting").show(), void gt.selection(Nt.tools.selectIdPrepareShareRoom, e, function() {
            $(".modal-share .exporting").hide(), $(".modal-share .share-it").show()
        }))
    }

    function me() {
        $(".modal-share").fadeOut(), gt.selection(Nt.tools.selectIdShareRoom)
    }

    function be() {
        $(".modal-email").fadeOut()
    }

    function Te() {
        $(".modal-email").fadeOut();
        var e = $(".modal-email input").eq(0).val(),
            t = $(".modal-email input").eq(1).val(),
            a = $(".modal-email textarea").val();
        gt.selection(Nt.tools.selectIdEmailRoom, e, t, a)
    }

    function ke() {
        $(".tool.v-undo-change").hasClass("disabled") || (ft.trackToolButton("Undo Change", gt.getCurRoom()), gt.selection(Nt.tools.selectIdUndoChanges), st())
    }

    function we() {
        $(".tool.v-redo-change").hasClass("disabled") || (ft.trackToolButton("Redo Change", gt.getCurRoom()), gt.selection(Nt.tools.selectIdRedoChanges), st())
    }

    function ye() {
        $(".tool.v-clear-all-changes").hasClass("disabled") || (ft.trackToolButton("Clear All Changes", gt.getCurRoom()), gt.selection(Nt.tools.selectIdClearAllChanges), st())
    }

    function Se() {
        if (!$(".tool.v-save-room").hasClass("disabled")) {
            var e = gt.getSortedRoomTilesUsed();
            ft.trackToolButton("Save Room", gt.getCurRoom(), e), gt.selection(Nt.tools.selectIdSaveRoom), st()
        }
    }

    function $e() {
        $(".tool.v-save-tile").hasClass("disabled") || (gt.selection(Nt.tools.selectIdAddToWishlist), st(), Be())
    }

    function Ae() {
        $(".tool.v-product-details").hasClass("disabled") || (ft.trackToolButton("Product Details", gt.getCurRoom()), gt.selection(Nt.tools.selectIdProductDetails), st(), Be())
    }

    function xe() {
        $(".tool.v-rotate-pattern").hasClass("disabled") || (ft.trackToolButton("Rotate Product", gt.getCurRoom()), gt.selection(Nt.tools.selectIdRotateProduct), st())
    }

    function Re() {
        $(".tool.v-change-pattern").hasClass("disabled") || (ft.trackToolButton("Change Pattern", gt.getCurRoom()), $(".tool.v-change-pattern").hasClass("selected") ? (gt.selection(Nt.tools.selectIdChangePattern, null), st()) : (nt(), $(".modal-pattern").fadeIn()))
    }

    function Ce() {
        $(".tool.v-single-tile-mode").hasClass("disabled") || (Nt.tools.singleTileSelected ? ft.trackToolButton("Single Tile - Deselect", gt.getCurRoom()) : ft.trackToolButton("Single Tile - Select", gt.getCurRoom()), gt.selection(Nt.tools.selectIdSingleTile), st())
    }

    function Ie() {
        if (!$(".tool.v-share-room").hasClass("disabled")) {
            var e = gt.getSortedRoomTilesUsed();
            ft.trackToolButton("Share Room", gt.getCurRoom(), e), $(".modal-share .icons").show(), $(".modal-share .exporting").hide(), $(".modal-share .share-it").hide(), $(".modal-share").fadeIn()
        }
    }

    function De() {
        if (!$(".tool.v-email-room").hasClass("disabled")) {
            var e = gt.getSortedRoomTilesUsed();
            ft.trackToolButton("Email Room", gt.getCurRoom(), e), ve("Email")
        }
    }

    function Oe() {
        $(".tool.v-print-room").hasClass("disabled") || gt.selection(Nt.tools.selectIdPrintRoom)
    }

    function Pe() {
        gt.selection(Nt.tools.selectIdPrintRoom)
    }

    function Be() {
        switch (n(null), $(".menu-items .menu-item").removeClass("selected"), bt) {
            case -1:
                $(".sub-menu-items").eq(0).html(""), $(".sub-menu-items").eq(1).html(""), $(".sub-menu-items").eq(2).html("");
                break;
            case 0:
                var e = "";
                $(".menu-items .menu-item.v-rooms-list").addClass("selected");
                for (var t = 0; t < Nt.roomTypes.length; ++t) {
                    var a = Nt.roomTypes[t],
                        r = "";
                    a.selected && (r = " selected"), e += '<a class="sub-menu-item' + r + '" data-select-id="' + a.selectIdSelectRoomType + '">', e += a.typeText, e += '<span class="pull-right fa fa-angle-right"></span>', e += "</a>"
                }
                $(".sub-menu-items").eq(0).html(e), $(".sub-menu-items").eq(0).find(".sub-menu-item").click(function() {
                    q($(this).data("select-id"))
                }), $(".sub-menu-items").eq(1).html(""), $(".sub-menu-items").eq(2).html(""), Fe(!1);
                break;
            case 1:
                var o = ["Wall Tiles", "Floor Tiles", "Mosaics", "Natural Stone", "Glass Splashbacks", "Borders", "Capping and Finishing Strips", "Grout", "Paint", "Cabinets", "Worktops"],
                    i = ["Wall Tiles", "Floor Tiles", "Mosaics", "Natural Stone", "Glass Splashbacks", "Borders", "Capping and Finishing Strips", "Grout", "Paint", "Cabinets", "Worktops"];
                gt.usingTexturedWorktopsAndCabinetsRooms() && (o = ["Wall Tiles", "Floor Tiles", "Mosaics", "Natural Stone", "Glass Splashbacks", "Borders", "Capping and Finishing Strips", "Grout", "Paint", "Cabinets Texture", "Worktops Texture"], i = ["Wall Tiles", "Floor Tiles", "Mosaics", "Natural Stone", "Glass Splashbacks", "Borders and Corners", "Capping and Finishing Strips", "Grout", "Paint", "Cabinets", "Worktops"]), $(".vl-tile-type-glass-splashbacks").show(), gt.roomAllowsGlassSplashback() || ($(".vl-tile-type-glass-splashbacks").hide(), o.splice(o.indexOf("Glass Splashbacks"), 1), i.splice(i.indexOf("Glass Splashbacks"), 1), "Glass Splashbacks" == Tt && (Tt = "None"));
                var e = "";
                $(".menu-items .menu-item.v-tiles-list").addClass("selected");
                for (var t = 0; t < o.length; ++t) {
                    var r = "";
                    o[t] == Tt && (r = " selected"), e += '<a class="sub-menu-item' + r + '" data-tiles-type="' + o[t] + '">', e += i[t], e += '<span class="pull-right fa fa-angle-right"></span>', e += "</a>"
                }
                $(".sub-menu-items").eq(0).html(""), $(".sub-menu-items").eq(1).html(e), $(".sub-menu-items").eq(1).find(".sub-menu-item").click(function() {
                    z($(this).data("tiles-type"))
                }), $(".sub-menu-items").eq(2).html(""), He();
                break;
            case 2:
                break;
                break;
            case 3:
                $(".menu-items .menu-item.v-favourites-list").addClass("selected"), $(".sub-menu-items").eq(0).html(""), $(".sub-menu-items").eq(1).html(""), $(".sub-menu-items").eq(2).html(""), Ne();
                break;
            case 4:
                $(".menu-items .menu-item.v-tiles-used-list").addClass("selected"), $(".sub-menu-items").eq(0).html(""), $(".sub-menu-items").eq(1).html(""), $(".sub-menu-items").eq(2).html(""), qe();
                break;
            case 5:
                $(".menu-items .menu-item.v-basket-list").addClass("selected"), $(".sub-menu-items").eq(0).html(""), $(".sub-menu-items").eq(1).html(""), $(".sub-menu-items").eq(2).html(""), Ze();
                break;
            case 6:
                $(".menu-items .menu-item.v-help").addClass("selected"), $(".sub-menu-items").eq(0).html(""), $(".sub-menu-items").eq(1).html(""), $(".sub-menu-items").eq(2).html(""), je()
        }
        $(".menu-item.v-basket-list p").html(Dt.replace("(123)", "(" + Nt.basket.count + ")")), $(".menu-item.v-favourites-list p").html(Ct.replace("(123)", "(" + Nt.wishlist.list.length + ")")), $(".menu-item.v-tiles-used-list p").html(It.replace("(123)", "(" + Nt.tilesUsed.list.length + ")"))
    }

    function Fe(e) {
        if ($(".vit-content-tiles-type").hide(), $(".vit-content-tiles").hide(), $(".vit-content-filters").hide(), $(".vit-content-wishlist").hide(), $(".vit-content-tiles-used").hide(), $(".vit-content-basket").hide(), $(".vit-content-help").hide(), "None" == Nt.roomType) return $(".vit-content-rooms").hide(), void $(".vit-content-rooms-type").show();
        $(".vit-content-rooms-type").hide(), $(".vit-content-rooms .heading").eq(3).hide(), $(".rooms-list").show();
        var t = Nt.rooms;
        if (e && (t = Nt.predecoratedRooms), Nt.isSavedRooms && 0 == t.length) return $(".vit-content-rooms .heading").eq(0).hide(), $(".vit-content-rooms .heading").eq(1).show(), $(".vit-content-rooms .heading").eq(2).hide(), $(".vit-commercial-rooms-sub-heading").hide(), $(".vit-content-rooms .rooms-empty").show(), $(".rooms-list").html(""), void $(".vit-content-rooms").show();
        $(".vit-content-rooms .rooms-empty").hide(), $(".vit-commercial-rooms-sub-heading").hide(), e || "Commercial Space" != Nt.roomType || $(".vit-commercial-rooms-sub-heading").show(), e ? ($(".vit-content-rooms .heading").eq(0).hide(), $(".vit-content-rooms .heading").eq(1).hide(), $(".vit-content-rooms .heading").eq(2).show()) : Nt.isSavedRooms ? ($(".vit-content-rooms .heading").eq(0).hide(), $(".vit-content-rooms .heading").eq(1).show(), $(".vit-content-rooms .heading").eq(2).hide()) : ($(".vit-content-rooms .heading").eq(0).show(), $(".vit-content-rooms .heading").eq(1).hide(), $(".vit-content-rooms .heading").eq(2).hide());
        for (var a = "", r = 0; r < t.length; ++r) {
            var o = t[r],
                i = Ft;
            i = i.replace("images/placeholder/thumbnails/rooms/Room1.jpg", o.thumbnail), i = i.replace("SELECT-ID-ROOM", o.selectIdSelectRoom), o.savedRoom ? (i = i.replace("SELECT-ID-DELETE", o.selectIdDeleteRoom), i = i.replace("SELECT-ID-SHARE", o.selectIdLoadSavedRoomAndShare), i = i.replace("SELECT-ID-EMAIL", o.selectIdLoadSavedRoomAndEmail), i = i.replace("SELECT-ID-PRINT", o.selectIdLoadSavedRoomAndPrint), i = i.replace("SELECT-ID-VIEW-TILES-USED", o.selectIdLoadSavedRoomAndViewTilesUsed), i = i.replace("HIDE-DELETE", ""), i = i.replace("HIDE-SHARE", ""), i = i.replace("HIDE-EMAIL", ""), i = i.replace("HIDE-PRINT", ""), i = i.replace("HIDE-VIEW-ROOM", ""), i = i.replace("HIDE-VIEW-TILES-USED", ""), i = i.replace("HIDE-SELECT-ROOM", "hide")) : (i = i.replace("HIDE-SELECT-ROOM", ""), i = i.replace("HIDE-DELETE", "hide"), i = i.replace("HIDE-SHARE", "hide"), i = i.replace("HIDE-EMAIL", "hide"), i = i.replace("HIDE-PRINT", "hide"), i = i.replace("HIDE-VIEW-ROOM", "hide"), i = i.replace("HIDE-VIEW-TILES-USED", "hide"));
            var n = "";
            o.selected && (n = " selected"), o.disabled && (n += " disabled"), i = i.replace("ROOM-STYLE", n), a += i
        }
        $(".rooms-list").html(a), $(".vit-content-rooms").show(), $(".vit-room-container button.close").click(function() {
            _($(this).data("select-id"))
        }), $(".v-room-selector").click(function() {
            Me("load", $(this).data("select-id"))
        }), $(".vit-room-container button.share").click(function() {
            Me("share", $(this).data("select-id"))
        }), $(".vit-room-container button.email").click(function() {
            Me("email", $(this).data("select-id"))
        }), $(".vit-room-container button.print").click(function() {
            Me("print", $(this).data("select-id"))
        }), $(".vit-room-container .v-view-tiles-used-button").click(function() {
            Me("view-tiles-used", $(this).data("select-id"))
        })
    }

    function Me(e, t) {
        return Rt = t, Nt.tools.saveRoomEnabled ? ($(".v-save-yn").hide(), $(".v-save-" + e).show(), $(".modal-save-room-changes-yn").fadeIn(), void event.stopPropagation()) : (We(!0), void event.stopPropagation())
    }

    function Ee() {
        Se(), Rt += ",HasSavedFirst", We()
    }

    function We(e) {
        return void 0 == e && $(".modal-save-room-changes-yn").hide(), Rt.indexOf("SelectSavedRoom=") != -1 ? void j(Rt) : (bt = -1, VUtils.isTabletOrPhoneDevice() ? B() : P(), Be(), gt.selection(Rt), Rt.indexOf(",PrintRoom") != -1 && Pe(), st(), void(Rt = null))
    }

    function Le() {
        Rt = null, $(".modal-save-room-changes-yn").fadeOut()
    }

    function Ye() {
        St += yt, He()
    }

    function Ue() {
        --Nt.pageNumber, He()
    }

    function Ge() {
        ++Nt.pageNumber, He()
    }

    function Ve(e) {
        Nt.pageNumber = e, He()
    }

    function He() {
        function e() {
            vout("unveilTileThumbnailsAsNecessary()");
            var e = 0,
                t = $(".vit-pane-container .vit-content-pane").scrollTop(),
                a = t + $(".vit-pane-container .vit-content-pane").height();
            $(".vit-pane-container .vit-content-pane img.vit-tile").each(function() {
                var e = t + $(this).parent().position().top,
                    r = e + $(this).height();
                e < a && r > t && $(this).attr("src") != $(this).data("thumbnail-src") && $(this).attr("src", $(this).data("thumbnail-src"))
            })
        }
        if ($(".vit-content-rooms-type").hide(), $(".vit-content-rooms").hide(), $(".vit-content-filters").hide(), $(".vit-content-wishlist").hide(), $(".vit-content-tiles-used").hide(), $(".vit-content-basket").hide(), $(".vit-content-help").hide(), "None" == Tt) return $(".vit-content-tiles").hide(), void $(".vit-content-tiles-type").show();
        $(".vit-content-tiles-type").hide();
        var t = "";
        if (("Wall Tiles" == Tt || "Floor Tiles" == Tt || "Mosaics" == Tt || "Natural Stone" == Tt) && 0 != Nt.currentFilters.length) {
            for (var a = 0; a < Nt.currentFilters.length; ++a) {
                var r = Mt.replace("CURRENT-FILTER-LABEL", Nt.currentFilters[a].filterValueText);
                r = r.replace("SELECT-CURRENT-FILTER", Nt.currentFilters[a].selectIdDeleteFilter), t += r
            }
            t += "<br><br>"
        }
        if ($(".current-filters").html(t), "" != Nt.tilesSearch.string) {
            var t = Gt;
            t = t.replace("[SEARCH-STRING]", Nt.tilesSearch.string), $(".vit-search-results-template").html(t), $(".vit-search-results-template").show()
        } else $(".vit-search-results-template").hide();
        var o = lt(),
            i = !1;
        "Paint" != Tt && "Cabinets" != Tt && "Worktops" != Tt || (i = !0);
        var s = 0,
            l = o.length - 1;
        i || "Grout" == Tt || "Worktops" != Tt && "Cabinets" != Tt && "Worktops Texture" != Tt && "Cabinets Texture" != Tt && (s = Nt.pageNumber * Nt.productsPerPage, l = s + Nt.productsPerPage - 1, l >= o.length && (l = o.length - 1));
        var c = parseInt(o.length / Nt.productsPerPage),
            t = Ut;
        t = t.replace("[TOTAL]", o.length), t = t.replace("[FROM]", s + 1), t = t.replace("[TO]", l + 1), 0 == o.length && (t = t.replace("[DISPLAYINGNONESTYLE]", "hide"));
        for (var d, u = 7, a = 0; a < u; ++a) {
            0 == a ? d = 0 : a == u - 1 ? d = c : 1 == a && (d = Nt.pageNumber - parseInt((u - 2) / 2) + a - 1, d < 1 ? d = 1 : d + (u - 2) >= c && (d = c - (u - 2)), 1 == d && (t = t.replace("[PAGEPREVGAPSTYLE]", "hide")), d + (u - 2) >= c && (t = t.replace("[PAGENEXTGAPSTYLE]", "hide"))), t = t.replace("[PAGENUM" + a + "]", d + 1);
            var p = "";
            d == Nt.pageNumber && (p = "selected"), d * Nt.productsPerPage >= o.length ? p = "hide" : d == c && a < u - 1 && (p = "hide"), t = t.replace("[PAGENUMSTYLE" + a + "]", p), t = t.replace("SELECT-TILE-PAGE", d), ++d
        }
        t = 0 == s ? t.replace("[NOPREV]", "hide") : t.replace("[NOPREV]", ""), t = s + Nt.productsPerPage > o.length ? t.replace("[NONEXT]", "hide") : t.replace("[NONEXT]", ""), $(".vit-tiles-nav-template").html(t);
        for (var g = "", t = "", a = s; a <= l; ++a) {
            var f = o[a],
                p = "";
            if (f.selected && (p = " selected"), f.disabled && (p += " disabled"), i) t += '<div class="vl-colour"><div title="' + f.name + '"class="vit-grout' + p + '" style="background-color: #' + f.colour + '" data-select-id="' + f.selectIdSelectColour + '"><div class="vit-grout2"></div></div><br></div>';
            else if ("Grout" == Tt) t += '<div class="vl-colour"><div title="' + f.name + '"class="vit-grout' + p + '" style="background-color: #' + f.colour + '" data-select-id="' + f.selectIdSelectGrout + '"><div class="vit-grout2"></div></div><div class="vit-grout-text">' + f.name + "</div></div>";
            else {
                var r = Yt;
                if (r = r.replace("SELECT-ID-TILE", f.selectIdSelectTile), r = r.replace("[ENTRY-INDEX]", a), r = r.replace("images/placeholder/thumbnails/tiles/811639.jpg", f.thumbnail), "Cabinet" == f.is || "Worktop" == f.is) "Colour" == g || f.skuText.indexOf("CColour") == -1 && f.skuText.indexOf("WColour") == -1 ? "Wood" == g || f.skuText.indexOf("CWood") == -1 && f.skuText.indexOf("WWood") == -1 ? "Granite" != g && f.skuText.indexOf("WGranite") != -1 && (t += Xt, g = "Granite") : (t += Ht, g = "Wood") : (t += Vt, g = "Colour"), r = r.replace("[HIDEDETAILS]", "hide"), r = r.replace("[CROPHEIGHT]", "v-no-details"), r = r.replace("[WORKTOPSCABINETS]", "v-worktops-cabinets"), r = r.replace("[WORKTOPSCABINETS]", "v-worktops-cabinets");
                else {
                    if (r = r.replace("[SIZE]", f.sizeText), r = r.replace("[SUITABLEFOR]", f.suitableFor), "" != f.priceM2Text) {
                        var v = gt.getTileOneMetreSquaredPrice(f).toFixed(2);
                        r = r.replace("[PRICE3]", f.priceM2Text).replace("[HIDEM2PRICE]", "")
                    } else r = r.replace("[HIDEM2PRICE]", "hide");
                    r = r.replace("[TILE-STYLE]", p)
                }
                t += r
            }
        }
        switch ($(".tiles-list").html(t), "Grout" == Tt ? $(".vit-grout-sub-heading").show() : $(".vit-grout-sub-heading").hide(), unveilTilesTimeout = setTimeout(e, 1), $(".vit-content-tiles .heading").hide(), Tt) {
            default:
                case "Wall Tiles":
                $(".vit-content-tiles .heading.wall").show(),
            $(".vit-search").show(),
            $(".vit-tiles-nav-template").show();
            break;
            case "Floor Tiles":
                    $(".vit-content-tiles .heading.floor").show(),
                $(".vit-search").show(),
                $(".vit-tiles-nav-template").show();
                break;
            case "Mosaics":
                    $(".vit-content-tiles .heading.mosaics").show(),
                $(".vit-search").show(),
                $(".vit-tiles-nav-template").show();
                break;
            case "Natural Stone":
                    $(".vit-content-tiles .heading.natural-stone").show(),
                $(".vit-search").show(),
                $(".vit-tiles-nav-template").show();
                break;
            case "Borders":
                    $(".vit-content-tiles .heading.borders").show(),
                $(".vit-search").hide(),
                "DEV" == runningEnvironment && $(".vit-search").show(),
                $(".vit-tiles-nav-template").show();
                break;
            case "Capping and Finishing Strips":
                    $(".vit-content-tiles .heading.capping").show(),
                $(".vit-search").hide(),
                $(".vit-tiles-nav-template").show();
                break;
            case "Glass Splashbacks":
                    $(".vit-content-tiles .heading.glass-splashbacks").show(),
                $(".vit-search").hide(),
                $(".vit-tiles-nav-template").hide();
                break;
            case "Wood Flooring":
                    $(".vit-content-tiles .heading.wood").show(),
                $(".vit-search").hide(),
                $(".vit-tiles-nav-template").show();
                break;
            case "Grout":
                    $(".vit-content-tiles .heading.grout").show(),
                $(".vit-search").hide(),
                $(".vit-tiles-nav-template").hide();
                break;
            case "Paint":
                    $(".vit-content-tiles .heading.paint-colour").show(),
                $(".vit-search").hide(),
                $(".vit-tiles-nav-template").hide();
                break;
            case "Cabinets":
                    $(".vit-content-tiles .heading.cabinet-colour").show(),
                $(".vit-search").hide(),
                $(".vit-tiles-nav-template").hide();
                break;
            case "Worktops":
                    $(".vit-content-tiles .heading.worktop-colour").show(),
                $(".vit-search").hide(),
                $(".vit-tiles-nav-template").hide();
                break;
            case "Cabinets Texture":
                    $(".vit-content-tiles .heading.cabinet-colour").show(),
                $(".vit-search").hide(),
                $(".vit-tiles-nav-template").hide();
                break;
            case "Worktops Texture":
                    $(".vit-content-tiles .heading.worktop-colour").show(),
                $(".vit-search").hide(),
                $(".vit-tiles-nav-template").hide()
        }
        $(".vit-content-tiles").show(), VUtils.isTabletOrPhoneDevice() ? "Cabinets Texture" == Tt || "Worktops Texture" == Tt ? $(".vl-tile").click(function() {
            Q($(this).data("select-id"))
        }) : $(".vl-tile").click(function() {
            n($(this))
        }) : ($(".vl-tile").click(function() {
            Q($(this).data("select-id"))
        }), $(".vl-tile").on("mouseenter", function() {
            n($(this))
        })), $(".vit-grout").click(function() {
            Q($(this).data("select-id"))
        }), $(".current-filters button").click(function() {
            ee($(this).data("select-id"))
        }), $(".vit-tiles-pages .page-prev").click(function() {
            Ue()
        }), $(".vit-tiles-pages .page-next").click(function() {
            Ge()
        }), $(".vit-tiles-pages .page-num").click(function() {
            Ve($(this).data("select-tile-page"))
        }), $(".vit-clear-search").click(function() {
            h()
        })
    }

    function Xe() {
        $(".vit-content-rooms-type").hide(), $(".vit-content-rooms").hide(), $(".vit-content-tiles-type").hide(), $(".vit-content-tiles").hide(), $(".vit-content-wishlist").hide(), $(".vit-content-tiles-used").hide(), $(".vit-content-basket").hide(), $(".vit-content-help").hide();
        for (var e = "", t = 0; t < Nt.filters.length; ++t) {
            var a = Nt.filters[t];
            e += '<div class="vit-filter-set vl-filter-set">', e += '<p class="vl-filter-set-heading"><strong>' + a.titleText + "</strong></p>";
            for (var r = 0; r < a.items.length; ++r) {
                var o = a.items[r].buttonSizeClass,
                    i = "";
                "Disabled" == a.items[r].state ? i = "disabled" : "Selected" == a.items[r].state && (i = "selected"), e += '<div class="' + o + '">', e += '<button class="' + i + '" data-select-id="' + a.items[r].selectIdFilter + '">' + a.items[r].filterValueText + "</button>", e += "</div>"
            }
            e += '<div class="vl-filter-set-line"><p class="vit-filter-set-divider"></p></div>', e += "</div>"
        }
        $(".vit-filter-sets").html(e), "Wall Tiles" == Tt || "Floor Tiles" == Tt ? ($(".vit-filters-desc-long").show(), $(".vit-filters-desc-short").hide()) : ($(".vit-filters-desc-long").hide(), $(".vit-filters-desc-short").show()), $(".vit-content-filters").show(), $(".vit-filter-sets button").click(function() {
            J($(this).data("select-id"))
        })
    }

    function Ne() {
        if ($(".vit-content-rooms-type").hide(), $(".vit-content-rooms").hide(), $(".vit-content-tiles-type").hide(), $(".vit-content-tiles").hide(), $(".vit-content-filters").hide(), $(".vit-content-tiles-used").hide(), $(".vit-content-basket").hide(), $(".vit-content-help").hide(), 0 == Nt.wishlist.list.length) return $(".vit-content-wishlist .wishlist-empty").show(), $(".wishlist-list").html(""), void $(".vit-content-wishlist").show();
        $(".vit-content-wishlist .wishlist-empty").hide();
        for (var e = "", t = 0; t < Nt.wishlist.list.length; ++t) {
            var a = Nt.wishlist.list[t],
                r = Ot.replace("images/placeholder/thumbnails/tiles/811639.jpg", a.thumbnail);
            r = r.replace("Tile Name", a.nameText), r = r.replace("123456", a.codeText), r = r.replace("20cm x 20cm", a.sizeText), r = r.replace("123.45", a.priceText), r = r.replace("price/box", a.priceText2), r = r.replace("678.99", a.priceM2Text), r = r.replace("SELECT-ID-CLOSE", a.selectIdDeleteFromWishlist), r = r.replace("SELECT-ID-ADD-TO-BASKET", a.selectIdAddTileToBasketStart), e += r
        }
        $(".wishlist-list").html(e), $(".vit-content-wishlist").show(), $(".vit-content-wishlist .close").click(function() {
            te($(this).data("select-id"))
        }), $(".vit-content-wishlist .add-to-basket button").click(function() {
            ae($(this).data("select-id"))
        })
    }

    function qe() {
        if ($(".vit-content-rooms-type").hide(), $(".vit-content-rooms").hide(), $(".vit-content-tiles-type").hide(), $(".vit-content-tiles").hide(), $(".vit-content-filters").hide(), $(".vit-content-wishlist").hide(), $(".vit-content-basket").hide(), $(".vit-content-help").hide(), 0 == Nt.tilesUsed.list.length) return $(".vit-content-tiles-used .tiles-used-empty").show(), $(".tiles-used-list").html(""), void $(".vit-content-tiles-used").show();
        $(".vit-content-tiles-used .tiles-used-empty").hide();
        for (var e = "", t = 0; t < Nt.tilesUsed.list.length; ++t) {
            var a = Nt.tilesUsed.list[t],
                r = Pt.replace("images/placeholder/thumbnails/tiles/811639.jpg", a.thumbnail);
            r = r.replace("Tile Name", a.nameText), r = r.replace("123456", a.codeText), r = r.replace("20cm x 20cm", a.sizeText), r = r.replace("123.45", a.priceText), r = r.replace("price/box", a.priceText2), r = r.replace("678.99", a.priceM2Text), r = r.replace("SELECT-ID-ADD-TO-BASKET", a.selectIdAddTileToBasketStart), r = r.replace("SELECT-ID-ADD-TO-FAVOURITES", a.selectIdAddToWishlist), e += r
        }
        $(".tiles-used-list").html(e), $(".vit-content-tiles-used").show(), $(".vit-content-tiles-used .add-to-basket button").click(function() {
            ae($(this).data("select-id"))
        }), $(".vit-content-tiles-used .add-to-favourites button").click(function() {
            re($(this).data("select-id"))
        })
    }

    function Ze() {
        if ($(".vit-content-rooms-type").hide(), $(".vit-content-rooms").hide(), $(".vit-content-tiles-type").hide(), $(".vit-content-tiles").hide(), $(".vit-content-filters").hide(), $(".vit-content-wishlist").hide(), $(".vit-content-tiles-used").hide(), $(".vit-content-help").hide(), 0 == Nt.basket.items.length) return $(".vit-content-basket .basket-empty").show(), $(".table-heading").hide(), $(".basket-items-container").hide(), $(".grand-total").hide(), $(".vit-content-basket").show(), void $(".vit-content-basket .pay").hide();
        $(".vit-content-basket .pay").show(), $(".vit-content-basket .basket-empty").hide(), $(".basket-items-container").show(), $(".pay").show(), $(".table-heading").show(), $(".basket-items-container").show(), $(".grand-total").show();
        for (var e = "", t = 0; t < Nt.basket.items.length; ++t) {
            var a = Nt.basket.items[t],
                r = Bt.replace("images/placeholder/thumbnails/tiles/811639.jpg", a.thumbnail);
            a.isSample || (r = r.replace("Sample Tile", "")), r = r.replace("Tile Name", a.nameText), r = r.replace("123456", a.codeText), r = r.replace("[111]", a.quantityText), "" != a.coverageText ? r = r.replace("[222]", a.coverageText) : (r = r.replace("show", "hide"), r = r.replace("show", "hide")), r = r.replace("88.88", a.itemPriceText), r = r.replace("99.99", a.totalPriceText), r = r.replace("SELECT-ID-CLOSE", a.selectIdDeleteFromBasket), r = r.replace("SELECT-ID-REFRESH", a.selectIdRefresh), r = r.replace("SELECT-ID-QUANTITY", a.selectIdUpdateQuantity), r = r.replace("SELECT-ID-COVERAGE", a.selectIdUpdateCoverage), e += r
        }
        $(".basket-items-container").html(e), $(".vit-content-basket").show(), $(".grand-total-price").html(Nt.basket.grandTotalText), $(".vit-content-basket .close").click(function() {
            ie($(this).data("select-id"))
        }), $(".vit-content-basket .refresh").click(function() {
            oe($(this).data("select-id"))
        }), $(".vit-content-basket input.quantity").keyup(function() {
            f($(this).data("select-id"), $(this).val())
        }), $(".vit-content-basket input.coverage").keyup(function() {
            v($(this).data("select-id"), $(this).val())
        })
    }

    function je() {
        $(".vit-content-rooms-type").hide(), $(".vit-content-rooms").hide(), $(".vit-content-tiles-type").hide(), $(".vit-content-tiles").hide(), $(".vit-content-filters").hide(), $(".vit-content-basket").hide(), $(".vit-content-wishlist").hide(), $(".vit-content-tiles-used").hide(), $(".vit-content-help").show()
    }

    function _e(e) {
        $(".vit-content-basket input.quantity").eq(e).val(Nt.basket.items[e].quantityText), $(".vit-content-basket .item-price").eq(e).html(Nt.basket.items[e].itemPriceText), $(".vit-content-basket .total-price").eq(e).html(Nt.basket.items[e].totalPriceText), $(".grand-total-price").html(Nt.basket.grandTotalText)
    }

    function ze(e) {
        $(".vit-content-basket input.coverage").eq(e).val(Nt.basket.items[e].coverageText), $(".vit-content-basket .item-price").eq(e).html(Nt.basket.items[e].itemPriceText), $(".vit-content-basket .total-price").eq(e).html(Nt.basket.items[e].totalPriceText), $(".grand-total-price").html(Nt.basket.grandTotalText)
    }

    function Ke(e) {
        if (null != Nt.addRangeToBasketPopup) {
            if (!e) return void $(".modal-range-basket").fadeOut();
            for (var t = "", a = 0; a < Nt.addRangeToBasketPopup.items.length; ++a) {
                var r = Et.replace("Tile Name", Nt.addRangeToBasketPopup.items[a].nameText);
                r = r.replace("images/placeholder/thumbnails/tiles/811639.jpg", Nt.addRangeToBasketPopup.items[a].thumbnailURL), r = r.replace("SELECT-ID-ENABLE", Nt.addRangeToBasketPopup.items[a].selectIdEnable), r = r.replace("LIST-INDEX", a), r = r.replace("SELECT-ID-QUANTITY", Nt.addRangeToBasketPopup.items[a].selectIdUpdateQuantity), r = r.replace("SELECT-ID-COVERAGE", Nt.addRangeToBasketPopup.items[a].selectIdUpdateCoverage), t += r
            }
            $(".vit-tile-range-list").html(t), $(".modal-range-basket .vit-tile-range-tick").click(function() {
                T($(this).data("select-id"), $(this).data("list-index"))
            }), $(".vit-tile-range-quantity input").keyup(function() {
                k($(this).data("select-id"), $(this).val())
            }), $(".vit-tile-range-coverage input").keyup(function() {
                w($(this).data("select-id"), $(this).val())
            }), Qe(), Je(), et(), $(".modal-range-basket").fadeIn(), setTimeout(function() {
                $(".vit-tile-range-list").scrollTop(0)
            }, 1)
        } else {
            if (!e) return void $(".modal-basket").fadeOut();
            Je(), et(), $(".modal-basket").fadeIn()
        }
    }

    function Qe() {
        for (var e = !1, t = 0; t < Nt.addRangeToBasketPopup.items.length; ++t)
            if (Nt.addRangeToBasketPopup.items[t].enable ? (e = !0, $(".modal-range-basket .vit-tile-range-tick").eq(t).attr("src", "images/checkbox_active.png")) : $(".modal-range-basket .vit-tile-range-tick").eq(t).attr("src", "images/checkbox_inactive.png"), Nt.addRangeToBasketPopup.items[t].disable) {
                $(".modal-range-basket .range-basket-margins").eq(t).addClass("range-disabled"), $(".modal-range-basket .vit-tile-range-tick").eq(t).addClass("range-tick-disabled");
                for (var a = 0; a < 5; ++a) $(".modal-range-basket .tile-range-not-in-basket").eq(5 * t + a).hide();
                $(".modal-range-basket .tile-range-is-in-basket").eq(t).show()
            } else {
                $(".modal-range-basket .range-basket-margins").eq(t).removeClass("range-disabled"), $(".modal-range-basket .vit-tile-range-tick").eq(t).removeClass("range-tick-disabled");
                for (var a = 0; a < 5; ++a) $(".modal-range-basket .tile-range-not-in-basket").eq(5 * t + a).show();
                $(".modal-range-basket .tile-range-is-in-basket").eq(t).hide()
            }
        e ? $(".modal-popup .range-basket .basket-btn a").removeClass("range-add-basket-disabled") : $(".modal-popup .range-basket .basket-btn a").addClass("range-add-basket-disabled")
    }

    function Je() {
        if (null != Nt.addRangeToBasketPopup)
            for (var e = 0; e < Nt.addRangeToBasketPopup.items.length; ++e) $(".modal-popup .range-basket input").eq(2 * e + 0).val(Nt.addRangeToBasketPopup.items[e].quantity), $(".modal-popup .range-basket .tile-range-price").eq(e).html(Nt.addRangeToBasketPopup.items[e].price), Nt.addRangeToBasketPopup.items[e].enable ? ($(".modal-popup .range-basket input").eq(2 * e + 0).prop("disabled", !1), $(".modal-popup .range-basket input").eq(2 * e + 0).removeClass("range-basket-disabled"), $(".modal-popup .range-basket .tile-range-price").eq(e).removeClass("range-basket-disabled")) : ($(".modal-popup .range-basket input").eq(2 * e + 0).prop("disabled", !0), $(".modal-popup .range-basket input").eq(2 * e + 0).addClass("range-basket-disabled"), $(".modal-popup .range-basket .tile-range-price").eq(e).addClass("range-basket-disabled"));
        else $(".modal-popup .basket input").eq(0).val(Nt.addToBasketPopup.quantity), $(".modal-popup .basket .normal-text strong").eq(1).html(Nt.addToBasketPopup.price)
    }

    function et() {
        if (null != Nt.addRangeToBasketPopup)
            for (var e = 0; e < Nt.addRangeToBasketPopup.items.length; ++e) $(".modal-popup .range-basket input").eq(2 * e + 1).val(Nt.addRangeToBasketPopup.items[e].coverage), $(".modal-popup .range-basket .tile-range-price").eq(e).html(Nt.addRangeToBasketPopup.items[e].price), Nt.addRangeToBasketPopup.items[e].enable ? ($(".modal-popup .range-basket input").eq(2 * e + 1).prop("disabled", !1), $(".modal-popup .range-basket input").eq(2 * e + 1).removeClass("range-basket-disabled"), $(".modal-popup .range-basket .tile-range-price").eq(e).removeClass("range-basket-disabled")) : ($(".modal-popup .range-basket input").eq(2 * e + 1).prop("disabled", !0), $(".modal-popup .range-basket input").eq(2 * e + 1).addClass("range-basket-disabled"), $(".modal-popup .range-basket .tile-range-price").eq(e).addClass("range-basket-disabled"));
        else $(".modal-popup .basket .normal-text strong").eq(1).html(Nt.addToBasketPopup.price), "" == Nt.addToBasketPopup.coverage ? ($(".no-metres-sq").show(), $(".basket-centre-or").hide(), $(".metres-sq").hide()) : ($(".modal-popup .basket input").eq(1).val(Nt.addToBasketPopup.coverage), $(".no-metres-sq").hide(), $(".basket-centre-or").show(), $(".metres-sq").show())
    }

    function tt(e) {
        if (!e) return void $(".modal-range-samples").fadeOut();
        for (var t = "", a = 0; a < Nt.addSampleTileRangePopup.items.length; ++a) {
            var r = Wt.replace("Tile Name", Nt.addSampleTileRangePopup.items[a].nameText);
            r = r.replace("images/placeholder/thumbnails/tiles/811639.jpg", Nt.addSampleTileRangePopup.items[a].thumbnailURL), r = r.replace("SELECT-ID-ENABLE", Nt.addSampleTileRangePopup.items[a].selectIdEnable), r = r.replace("LIST-INDEX", a), r = r.replace("0.00", Nt.addSampleTileRangePopup.items[a].price), t += r
        }
        $(".vit-range-samples-list").html(t), $(".modal-range-samples .vit-tile-range-tick").click(function() {
            y($(this).data("select-id"), $(this).data("list-index"))
        }), at(), $(".modal-range-samples").fadeIn(), setTimeout(function() {
            $(".vit-range-samples-list").scrollTop(0)
        }, 1)
    }

    function at() {
        for (var e = !1, t = 0; t < Nt.addSampleTileRangePopup.items.length; ++t) Nt.addSampleTileRangePopup.items[t].enable ? ($(".modal-range-samples .vit-tile-range-tick").eq(t).attr("src", "images/checkbox_active.png"), e = !0) : $(".modal-range-samples .vit-tile-range-tick").eq(t).attr("src", "images/checkbox_inactive.png"), Nt.addSampleTileRangePopup.items[t].disable ? ($(".modal-range-samples .range-samples-margins").eq(t).addClass("range-disabled"), $(".modal-range-samples .vit-tile-range-tick").eq(t).addClass("range-tick-disabled"), $(".modal-range-samples .tile-range-not-in-basket").eq(2 * t + 0).hide(), $(".modal-range-samples .tile-range-not-in-basket").eq(2 * t + 1).hide(), $(".modal-range-samples .tile-range-is-in-basket").eq(t).show(), Nt.addSampleTileRangePopup.items[t].cantOrderSample ? $(".modal-range-samples .tile-range-is-in-basket").eq(t).find("p").eq(0).hide() : $(".modal-range-samples .tile-range-is-in-basket").eq(t).find("p").eq(1).hide()) : ($(".modal-range-samples .range-samples-margins").eq(t).removeClass("range-disabled"), $(".modal-range-samples .vit-tile-range-tick").eq(t).removeClass("range-tick-disabled"), $(".modal-range-samples .tile-range-not-in-basket").eq(2 * t + 0).show(), $(".modal-range-samples .tile-range-not-in-basket").eq(2 * t + 1).show(), $(".modal-range-samples .tile-range-is-in-basket").eq(t).hide());
        e ? $(".modal-range-samples .basket-btn a").removeClass("range-add-basket-disabled") : $(".modal-range-samples .basket-btn a").addClass("range-add-basket-disabled")
    }

    function rt(e) {
        return e ? void $(".modal-tiling-range-or-single").fadeIn() : void $(".modal-tiling-range-or-single").fadeOut()
    }

    function ot(e) {
        if (!e) return void $(".modal-tiling-range").fadeOut();
        for (var t = "", a = 0; a < Nt.tilingAsRangePopup.items.length; ++a) {
            var r = Lt.replace("Tile Name", Nt.tilingAsRangePopup.items[a].nameText);
            r = r.replace("images/placeholder/thumbnails/tiles/811639.jpg", Nt.tilingAsRangePopup.items[a].thumbnailURL), r = r.replace("SELECT-ID-ENABLE", Nt.tilingAsRangePopup.items[a].selectIdEnable), r = r.replace("SELECT-ID-PERCENTAGE", Nt.tilingAsRangePopup.items[a].selectIdUpdatePercentage), t += r
        }
        $(".vit-tiling-range-list").html(t), $(".modal-tiling-range .vit-tile-range-tick").click(function() {
            R($(this).data("select-id"))
        }), $(".vit-tile-range-percentage input").keyup(function() {
            C($(this).data("select-id"), $(this).val())
        }), it(!0, null), $(".modal-tiling-range").fadeIn(), setTimeout(function() {
            $(".vit-tiling-range-list").scrollTop(0)
        }, 1)
    }

    function it(e, t) {
        for (var a = !1, r = 0; r < Nt.tilingAsRangePopup.items.length; ++r) e && $(".modal-popup .tiling-range input").eq(r).val(Nt.tilingAsRangePopup.items[r].percentage), Nt.tilingAsRangePopup.items[r].enable ? (a = !0, $(".modal-tiling-range .vit-tile-range-tick").eq(r).attr("src", "images/checkbox_active.png"), $(".modal-tiling-range input").eq(r).prop("disabled", !1), $(".modal-tiling-range input").eq(r).removeClass("range-basket-disabled")) : ($(".modal-tiling-range .vit-tile-range-tick").eq(r).attr("src", "images/checkbox_inactive.png"),
            $(".modal-tiling-range input").eq(r).prop("disabled", !0), $(".modal-tiling-range input").eq(r).addClass("range-basket-disabled"));
        a && null == t ? $(".modal-popup .tiling-range .basket-btn a").removeClass("range-add-basket-disabled") : $(".modal-popup .tiling-range .basket-btn a").addClass("range-add-basket-disabled"), null != t ? ($(".vit-tiling-range-error-message").html(t), $(".vit-tiling-range-error-message").show()) : $(".vit-tiling-range-error-message").hide()
    }

    function nt() {
        $(".modal-popup .pattern .select-pattern").removeClass("selected");
        for (var e = 0; e < qt.length; ++e) Nt.tools.currentPattern == qt[e] && $(".modal-popup .pattern .select-pattern").eq(e).addClass("selected")
    }

    function st() {
        function e(e, t, a) {
            t ? ($(".tool." + e).removeClass("disabled"), $(".tool." + e).find("span").removeClass("disabled"), $(".tool." + e).find("img").removeClass("disabled")) : ($(".tool." + e).addClass("disabled"), $(".tool." + e).find("span").addClass("disabled"), $(".tool." + e).find("img").addClass("disabled")), void 0 != a && (a ? $(".tool." + e).addClass("selected") : $(".tool." + e).removeClass("selected"))
        }
        null != Nt.tools.selectedColour ? ($(".current-tile div").css("background-color", "#" + Nt.tools.selectedColour), $(".current-tile div").show(), $(".current-tile img").hide()) : ($(".current-tile img").attr("src", Nt.tools.selectedTileThumbnail), $(".current-tile img").show(), $(".current-tile div").hide()), e("v-order-sample", Nt.tools.orderSampleEnabled), e("v-add-to-basket", Nt.tools.addToBasketEnabled), e("v-undo-change", Nt.tools.undoChangesEnabled), e("v-redo-change", Nt.tools.redoChangesEnabled), e("v-clear-all-changes", Nt.tools.clearAllChangesEnabled), e("v-save-room", Nt.tools.saveRoomEnabled), e("v-product-details", Nt.tools.productDetailsEnabled), e("v-rotate-pattern", Nt.tools.rotateProductEnabled, Nt.tools.rotateProductSelected), e("v-change-pattern", Nt.tools.changePatternEnabled, Nt.tools.changePatternSelected), e("v-share-room", Nt.tools.shareRoomEnabled), e("v-email-room", Nt.tools.shareRoomEnabled), e("v-print-room", Nt.tools.printRoomEnabled), e("v-save-tile", Nt.tools.addToWishlistEnabled), e("v-single-tile-mode", Nt.tools.singleTileEnabled, Nt.tools.singleTileSelected), e("v-view-basket", Nt.tools.viewBasketEnabled), Nt.tools.viewBasketEnabled ? (Nt.basket.count > 999 ? $(".v-view-basket-total").html("999+") : $(".v-view-basket-total").html(Nt.basket.count), $(".v-view-basket-total").show()) : $(".v-view-basket-total").hide()
    }

    function lt() {
        switch (Tt) {
            case "Grout":
                return Nt.grout;
            case "Paint":
                return Nt.wallColours;
            case "Cabinets":
                return Nt.cabinetColours;
            case "Worktops":
                return Nt.worktopColours;
            default:
                return Nt.tiles
        }
    }

    function ct(e) {
        if (null != gt.getCurRoom()) switch (dt(e), vout("GUI - PROCESS EVENT TYPE: " + e.type + " InputX/Y=" + inputX + "," + inputY), e.type) {
            case "touchstart":
                break;
            case "touchmove":
                break;
            case "touchend":
                break;
            case "mousedown":
                break;
            case "mousemove":
                gt.canDecorate(inputX, inputY) ? ut() : ht();
                break;
            case "mouseup":
                gt.decorate(inputX, inputY) && st();
                break;
            case "mouseout":
                ht(), dontHighlightArea = -1
        }
    }

    function dt(e) {
        null != gt.getCurRoom() && ("touchmove" == e.type || "touchstart" == e.type || "touchend" == e.type ? (inputX = e.originalEvent.changedTouches[0].pageX - $(".scene .render").offset().left, inputY = e.originalEvent.changedTouches[0].pageY - $(".scene .render").offset().top) : (inputX = e.pageX - $(".scene .render").offset().left, inputY = e.pageY - $(".scene .render").offset().top), pointerX = inputX, pointerY = inputY, inputX *= gt.getCurRoomWidth() / $(".scene .render").width(), inputY *= gt.getCurRoomHeight() / $(".scene .render").height(), inputX = parseInt(inputX), inputY = parseInt(inputY))
    }

    function ut() {
        $(".scene .render").css("cursor", "pointer")
    }

    function ht() {
        $(".scene .render").css("cursor", "default")
    }
    var pt = this,
        gt = e,
        ft = t,
        vt = -2,
        mt = -1,
        bt = -1,
        Tt = "None",
        kt = null,
        wt = null,
        yt = 128,
        St = yt,
        $t = !0,
        At = null,
        xt = !1,
        Rt = null;
    $(".modal-default-bkg").click(function(e) {
        e.stopPropagation()
    }), $(".vit-pane-tab img").click(function() {
        O()
    }), $(".vit-tools-tab img").click(function() {
        M()
    }), $(".current-tile").click(function() {
        M()
    }), $(".menu-items .menu-item.v-rooms-list").click(function() {
        Y()
    }), $(".menu-items .menu-item.v-tiles-list").click(function() {
        U()
    }), $(".menu-items .menu-item.v-tile-area").click(function() {
        K()
    }), $(".menu-items .menu-item.v-favourites-list").click(function() {
        V()
    }), $(".menu-items .menu-item.v-tiles-used-list").click(function() {
        H()
    }), $(".menu-items .menu-item.v-basket-list").click(function() {
        X()
    }), $(".menu-items .menu-item.v-help").click(function() {
        N()
    }), $(".vit-search .filter-button").click(function() {
        d()
    }), $(".vit-search-button").click(function() {
        p()
    }), $(".vit-search input").keyup(function() {
        13 == event.which && p($(this).val())
    }), $(".vit-apply-filters .filter-button").click(function() {
        u()
    }), $(".select-tile-modal .close").click(function() {
        c()
    }), $(".select-tile-modal .select-tile").click(function() {
        l()
    }), $(".modal-popup .basket .basket-btn").click(function() {
        le()
    }), $(".modal-popup .basket .close").click(function() {
        ue()
    }), $(".modal-basket").click(function() {
        ue()
    }), $(".modal-popup .basket input").eq(0).keyup(function() {
        m($(this).val())
    }), $(".modal-popup .basket input").eq(1).keyup(function() {
        b($(this).val())
    }), $(".modal-popup .pattern .close").click(function() {
        ge()
    }), $(".modal-pattern").click(function() {
        ge()
    }), $(".modal-popup .pattern .select-pattern").eq(0).click(function() {
        pe(0)
    }), $(".modal-popup .pattern .select-pattern").eq(1).click(function() {
        pe(1)
    }), $(".modal-popup .pattern .select-pattern").eq(2).click(function() {
        pe(2)
    }), $(".modal-popup .pattern .select-pattern").eq(3).click(function() {
        pe(3)
    }), $(".modal-popup .pattern .select-pattern").eq(4).click(function() {
        pe(4)
    }), $(".modal-popup .pattern .select-pattern").eq(5).click(function() {
        pe(5)
    }), $(".modal-popup .share .icons img").eq(0).click(function() {
        ve("Facebook")
    }), $(".modal-popup .share .icons img").eq(1).click(function() {
        ve("Twitter")
    }), $(".modal-popup .share .icons img").eq(2).click(function() {
        ve("Pinterest")
    }), $(".modal-popup .share .icons img").eq(3).click(function() {
        ve("Email")
    }), $(".modal-popup .share .close").click(function() {
        fe()
    }), $(".modal-share").click(function() {
        fe()
    }), $(".modal-share .share-it").click(function() {
        me()
    }), $(".modal-popup .email .close").click(function() {
        be()
    }), $(".modal-email").click(function() {
        be()
    }), $(".modal-email .email-btn").click(function() {
        Te()
    }), $(".modal-popup .save-room-changes-yn .close").click(function() {
        Le()
    }), $(".modal-popup .save-room-changes-yn .v-yes").click(function() {
        Ee()
    }), $(".modal-popup .save-room-changes-yn .v-no").click(function() {
        We()
    }), $(".vit-content-basket .pay").click(function() {
        g()
    }), $(".vit-content-help .section-jump").click(function() {
        i($(this).data("section-pos"))
    }), $(".modal-startup-overlay button.close").click(function() {
        s()
    }), $(".modal-startup-overlay").click(function() {
        s()
    }), $(".vit-startup-overlay").click(function(e) {
        e.stopPropagation()
    }), $(".modal-popup .range-basket .basket-btn").click(function() {
        ce()
    }), $(".modal-popup .range-basket .close").click(function() {
        ue()
    }), $(".modal-range-basket").click(function() {
        ue()
    }), $(".modal-range-samples .basket-btn").click(function() {
        de()
    }), $(".modal-range-samples .close").click(function() {
        he()
    }), $(".modal-range-samples").click(function() {
        he()
    }), $(".modal-tiling-range .basket-btn").click(function() {
        I()
    }), $(".modal-tiling-range .close").click(function() {
        D()
    }), $(".modal-tiling-range").click(function() {
        D()
    }), $(".modal-tiling-range-or-single").click(function() {
        S()
    }), $(".modal-tiling-range-or-single .close").click(function() {
        S()
    }), $(".modal-tiling-range-or-single .basket-btn").eq(0).click(function() {
        A()
    }), $(".modal-tiling-range-or-single .basket-btn").eq(1).click(function() {
        x()
    }), $(".modal-decorate-options .close").click(function() {
        a("Close")
    }), $(".modal-decorate-options").click(function() {
        a("Close")
    }), $(".decorate-grout-border").click(function() {
        a("GroutBorder")
    }), $(".decorate-change-border").click(function() {
        a("ChangeBorder")
    }), $(".decorate-edit-border").click(function() {
        a("EditBorder")
    }), $(".decorate-delete-border").click(function() {
        a("DeleteBorder")
    }), $(".decorate-delete-single-tile").click(function() {
        a("DeleteSingleTile")
    }), $(".decorate-change-single-tile").click(function() {
        a("ChangeSingleTile")
    }), $(".decorate-move-single-tile").click(function() {
        a("MoveSingleTile")
    }), $(".decorate-mosaic-border").click(function() {
        a("MosaicBorder")
    }), $(".decorate-mosaic-fill").click(function() {
        a("MosaicFill")
    }), $(".decorate-tile-zone").click(function() {
        a("TileZone")
    }), $(".decorate-tiles-zone").click(function() {
        a("TileZone")
    }), $(".decorate-grout-zone").click(function() {
        a("GroutZone")
    }), $(".decorate-edit-zone").click(function() {
        a("EditZone")
    }), $(".decorate-delete-zone").click(function() {
        a("DeleteZone")
    }), $(".decorate-grout-floor-border").click(function() {
        a("GroutFloorBorder")
    }), $(".decorate-delete-floor-border").click(function() {
        a("DeleteFloorBorder")
    }), $(".decorate-lay-floor-border").click(function() {
        a("LayFloorBorder")
    }), $(".decorate-delete-skirting").click(function() {
        a("DeleteSkirting")
    }), $(".decorate-change-skirting").click(function() {
        a("ChangeSkirting")
    }), $(".decorate-delete-glass-splashback").click(function() {
        a("DeleteGlassSplashback")
    }), $(".modal-area-options .close").click(function() {
        r("Close")
    }), $(".modal-area-options").click(function() {
        r("Close")
    }), $(".v-area-option-fill-whole-floor img").click(function() {
        r("FillWholeFloor")
    }), $(".v-area-option-fill-whole-floor-and-skirting img").click(function() {
        r("FillWholeFloorAndSkirting")
    }), $(".v-area-option-fill-whole-wall img").click(function() {
        r("FillWholeWall")
    }), $(".v-area-option-fill-half-wall img").click(function() {
        r("FillHalfWall")
    }), $(".v-area-option-lay-mosaic-border img").click(function() {
        r("LayMosaicBorder")
    }), $(".v-area-option-create-splashback img").click(function() {
        r("CreateSplashback")
    }), $(".v-area-option-draw-floor-area img").click(function() {
        r("DrawArea")
    }), $(".v-area-option-draw-wall-area img").click(function() {
        r("DrawArea")
    }), VUtils.isTabletOrPhoneDevice() || ($(".tiles-list").on("mouseleave", function() {
        n(null)
    }), $(".select-tile-modal").on("mouseenter", function() {
        n(kt)
    }), $(".select-tile-modal").on("mouseleave", function() {
        n(null)
    })), $(".tool.v-order-sample").click(function() {
        ne()
    }), $(".tool.v-add-to-basket").click(function() {
        se()
    }), $(".tool.v-undo-change").click(function() {
        ke()
    }), $(".tool.v-redo-change").click(function() {
        we()
    }), $(".tool.v-email-room").click(function() {
        De()
    }), $(".tool.v-clear-all-changes").click(function() {
        ye()
    }), $(".tool.v-save-room").click(function() {
        Se()
    }), $(".tool.v-save-tile").click(function() {
        $e()
    }), $(".tool.v-product-details").click(function() {
        Ae()
    }), $(".tool.v-rotate-pattern").click(function() {
        xe()
    }), $(".tool.v-change-pattern").click(function() {
        Re()
    }), $(".tool.v-single-tile-mode").click(function() {
        Ce()
    }), $(".tool.v-share-room").click(function() {
        Ie()
    }), $(".tool.v-print-room").click(function() {
        Oe()
    }), $(".tool.v-view-basket").click(function() {
        5 != bt && X()
    }), $(".modal-styles-overlay button.close").click(function() {
        o()
    }), $(".vit-get-started-button").click(function() {
        s(), Y()
    }), $(".vit-help-link").click(function() {
        s(), N()
    }), $(".v-room-type-selector").click(function() {
        q($(this).data("select-id"))
    }), $(".v-select-room-back").click(function() {
        q("SelectRoomType=None")
    }), $(".v-tile-type-selector").click(function() {
        z($(this).data("select-tile-type"))
    }), $(".v-select-tile-back").click(function() {
        z("None")
    });
    var Ct = $(".menu-item.v-favourites-list p").html(),
        It = $(".menu-item.v-tiles-used-list p").html(),
        Dt = $(".menu-item.v-basket-list p").html(),
        Ot = $(".wishlist-list").html(),
        Pt = $(".tiles-used-list").html(),
        Bt = $(".basket-items-container").html(),
        Ft = $(".rooms-list").html(),
        Mt = $.trim($(".current-filters").html()),
        Et = $(".vit-tile-range-list").html(),
        Wt = $(".vit-range-samples-list").html(),
        Lt = $(".vit-tiling-range-list").html(),
        Yt = $(".tiles-list").html(),
        Ut = $(".vit-tiles-nav-template").html(),
        Gt = $(".vit-search-results-template").html(),
        Vt = $(".vit-worktops-cabinets-subheading-colours-template").html(),
        Ht = $(".vit-worktops-cabinets-subheading-wood-template").html(),
        Xt = $(".vit-worktops-cabinets-subheading-granite-template").html(),
        Nt = gt.getGUIData();
    $(".vit-scrollbar1").hide(), $(".vit-scrollbar2").hide();
    var qt = ["Linear", "Brick", "Diamond", "Herringbone", "BlockHerringbone", "3/4BrickBond"],
        Zt = !1,
        jt = !1;
    F(), L(), Be(), st(), this.forceSelectEmailRoom = function() {
        De()
    }, this.forceSelectShareRoom = function() {
        Ie()
    }, this.forceViewTilesUsed = function() {
        H()
    }, this.setRoomStylesMode = function(e, t) {
        return;
        e ? ($(".menu-items .menu-item").eq(1).hide(), $(".menu-items .menu-item").eq(2).hide(), $(".menu-items .menu-item").eq(4).hide(), $(".vit-tools-tab").hide(), $(".tools-container").hide(), $(".vit-styles-overlay-title").html(t + " Style"), $(".modal-styles-overlay").fadeIn()) : ($(".style-tile-modal").hide(), $(".menu-items .menu-item").eq(1).show(), $(".menu-items .menu-item").eq(2).show(), $(".menu-items .menu-item").eq(4).show(), $(".vit-tools-tab").show(), $(".tools-container").show())
    }, this.showRoomStyleTilePopup = function(e, t, a) {
        return null == e ? void $(".style-tile-modal").hide() : bt != -1 ? void $(".style-tile-modal").hide() : ($(".style-tile-modal .vit-thumbnail").attr("src", e.thumbnail), $(".style-tile-modal p").eq(0).html(e.nameText), $(".style-tile-modal p").eq(2).html(e.sizeText), null != e.skuText ? ($(".style-tile-modal p").eq(1).html("Code: " + e.skuText), $(".style-tile-modal p").eq(3).find("strong").html(e.priceText), $(".style-tile-modal p").eq(3).find("span").html(e.priceText2), $(".style-tile-modal p").eq(4).find("strong").html(e.priceM2Text), $(".style-tile-modal p").show(), "" != e.priceM2Text ? ($(".style-tile-modal p").eq(4).find("strong").html(e.priceM2Text), $(".style-tile-modal .price").eq(1).show()) : $(".style-tile-modal .price").eq(1).hide()) : ($(".style-tile-modal p").eq(1).hide(), $(".style-tile-modal p").eq(3).hide(), $(".style-tile-modal p").eq(4).hide()), $(".style-tile-modal p").eq(0).show(), a > gt.getCurRoomHeight() / 2 ? ($(".style-tile-modal").css("top", "5%"), $(".style-tile-modal").css("bottom", "auto")) : ($(".style-tile-modal").css("top", "auto"), $(".style-tile-modal").css("bottom", "5%")), void $(".style-tile-modal").show())
    }, this.showDecorateOptionActions = function(e) {
        Zt = !0, setTimeout(function() {
            Zt = !1
        }, 500), $(".decorate-options-margins").hide();
        for (var t = 0; t < e.length; ++t) $(".decorate-options ." + e[t]).parent().parent().show();
        var a = 180 + 50 * (e.length - 2);
        $(".modal-container .modal-popup .decorate-options").css("height", a + "px"), $(".modal-decorate-options").fadeIn()
    }, this.showDecorateAreaOptions = function(e) {
        Zt = !0, setTimeout(function() {
            Zt = !1
        }, 500), 4 == e.length ? ($(".modal-container .modal-popup .area-options").css("width", "700px"), $(".modal-container .modal-popup .area-options").css("left", "-350px")) : ($(".modal-container .modal-popup .area-options").css("width", "530px"), $(".modal-container .modal-popup .area-options").css("left", "-265px")), $(".area-options-margins div").hide();
        for (var t = 0; t < e.length; ++t) $(".area-options-margins div.v-area-option-" + e[t]).show();
        $(".modal-area-options").fadeIn()
    }, this.doUpdateTools = function() {
        st()
    }, this.update = function() {
        Be(), st()
    }, this.scaleRoomImageForDisplay = function(e, t) {
        $(".scene .render").css({
            width: e,
            height: t
        })
    }, this.updateRoomRender = function(e) {
        var t = gt.getRenderData(function(t) {
            if (gt.usingWebGL()) {
                if (VUtils.isTabletOrPhoneDevice() || (null == At && (At = document.createElement("canvas")), At.width == t.width && At.height == t.height || (At.width = t.width, At.height = t.height), At.getContext("2d").drawImage(t, 0, 0)), !xt) {
                    var a = document.getElementById("scene");
                    null != At ? a.insertBefore(At, a.childNodes[0]) : a.insertBefore(t, a.childNodes[0]), $(".scene canvas").eq(0).addClass("render"), xt = !0
                }
                gt.showMessage(null), void 0 != e && e()
            } else VUtils.loadImageToSrc(t, ".scene .render", function(t, a, r) {
                gt.showMessage(null), void 0 != e && e()
            })
        })
    }
}

function Decorator(e, t, a, r, o, i) {
    function n() {
        for (var e = 0; e < ze.numAreas; ++e) {
            var t = "Area" + ze.areas.split(",")[e];
            je.areas[t] = new Object, "Tile" == Pe(t) ? (je.areas[t].colour = null, je.areas[t].decorateAreaTop = J(t), je.areas[t].decorateAreaBorder = null, je.areas[t].decorateAreaBottom = null, je.areas[t].decorateAreaZones = new Array, je.areas[t].decorateAreaFloorBorderZones = new Array, je.areas[t].decorateAreaSkirtingZones = new Array) : je.areas[t].colour = null
        }
    }

    function s(e, t, a) {
        function r(e, t, a) {
            if (ut) return null;
            Le();
            var r = me(t, a, !1);
            if (null == r) return null;
            if ("Tile" != Pe(r)) return null;
            var o = De(r, t, a);
            t = o.x, a = o.y;
            var i = c(r, t, a),
                n = h(i, t, a);
            return n != -1 ? [i.singleTiles[n].sku, null] : "TileRange" != i.sku ? [i.sku, null] : [i.sku, i.skus]
        }
        var o = t,
            i = a,
            n = r(e, t, a);
        return null == n ? (Ge.showRoomStyleTilePopup(null), !1) : (Ge.showRoomStyleTilePopup(n[0], n[1], o, i), !0)
    }

    function l(e, t, a) {
        if (ut) return !1;
        Le();
        var r = !0;
        "None" != outlines.getMode() && "WaitingToAddZone" != outlines.getMode() && (r = !1);
        var o = me(t, a, r);
        if (Rt = o, !e)
            if ("WaitingToEditZone" == outlines.getMode()) {
                if (null == o) return A(e, 99999, 99999);
                if ("Tile" != Pe(o)) return A(e, 99999, 99999)
            } else if ("WaitingToEditBorder" == outlines.getMode()) {
            if (null == o) return I(e, 99999, 99999);
            if ("Tile" != Pe(o)) return I(e, 99999, 99999)
        } else if ("WaitingToDragSingleTile" == outlines.getMode()) {
            if (null == o) return N(e, 99999, 99999);
            if ("Tile" != Pe(o)) return N(e, 99999, 99999)
        }
        if ("EditingZone" == outlines.getMode() && !e) return A(e, 88888, 88888);
        if ("EditingBorder" == outlines.getMode() && !e) return I(e, 88888, 88888);
        if ("DraggingSingleTile" == outlines.getMode() && !e) return N(e, 99999, 99999);
        if (null == o) return !1;
        if ("Tile" != Pe(o)) return p(e);
        if (at && outlines.clear(), xt = Oe(o), m(xt) && "WaitingToAddZone" == outlines.getMode()) return e || Me("You cannot draw a tile area there.", 1500), !1;
        var i = De(o, t, a);
        t = i.x, a = i.y, "DraggingSingleTile" != outlines.getMode() && "WaitingToDragSingleTile" != outlines.getMode() || na && (a -= outlines.getSingleTileGrabHandleYOffset());
        var n = c(o, t, a);
        if (Ct = n, vout(o + " " + t + "," + a), "BorderSplit" == Ct.areaType) return !1;
        if ("TileZone" == Ct.areaType && null != Ct.sku && "TileRange" != Ct.sku && Se(Ct.sku).isGlassSplashback) return S(e, t, a);
        if ("Tile" == nt && null != Ke) {
            if ("Cabinet" == Ke.is && !b(xt)) return e || Me("That surface cannot take a cabinet colour.", 1500), !1;
            if ("Worktop" == Ke.is && !T(xt)) return e || Me("That surface cannot take a worktop colour.", 1500), !1;
            if ("Cabinet" != Ke.is && "Worktop" != Ke.is && m(xt)) return e || Me("That surface cannot take a tile.", 1500), !1
        }
        if ("Grout" == nt && m(xt)) return e || Me("That surface cannot take grout.", 1500), !1;
        if ("WallColour" == nt && m(xt)) return e || Me("That surface cannot be painted.", 1500), !1;
        if ("TileZone" == Ct.areaType && (It = d(Rt, t, a)), "WaitingToAddZone" == outlines.getMode()) return w(e, t, a);
        if ("WaitingToEditZone" == outlines.getMode()) return A(e, t, a);
        if ("EditingZone" == outlines.getMode()) return x(e, t, a);
        if ("WaitingToDragSingleTile" == outlines.getMode()) return N(e, t, a);
        if ("DraggingSingleTile" == outlines.getMode()) return q(e, t, a);
        if ("WaitingToEditBorder" == outlines.getMode()) return I(e, t, a);
        if ("EditingBorder" == outlines.getMode()) return D(e, t, a);
        var n = c(o, t, a);
        return Dt = h(n, t, a), Dt != -1 ? H(e, t, a) : "TileZone" != Ct.areaType || null != Ct.sku && (at || rt || ot) ? "BorderTile" == Ct.areaType ? R(e, t, a) : "FloorBorderZone" == Ct.areaType ? k(e, t, a) : "SkirtingZone" == Ct.areaType ? V(e, t, a) : rt ? ne(e, t, a) : ot ? se(e, t, a) : "WallColour" == nt ? g(e) : "Grout" == nt ? ie(e, t, a) : "Tile" != nt && "WallColour" != nt ? (e || ("CabinetColour" == nt ? Me("That surface cannot take a cabinet colour.", 1500) : Me("That surface cannot take a worktop colour.", 1500)), !1) : null == Ke ? !e && (Me("First select a tile from Decorate Your Room on the left", 1500), !1) : at ? "" == Ke.cornerTileBorderSKU && (!Ke.isGlassSplashback && X(e, t, a)) : null != Ke && Ke.isGlassSplashback ? (e || Me("This product was automatically placed in the splashback area", 3e3), !1) : "Floor" != we(Rt) && (Ke.isBorder || Ke.isCapping || Ke.isFinishingStrip) ? C(e, t, a) : "Floor" != we(Rt) && "" != Ke.cornerTileBorderSKU ? (e || Me("Corner tiles cannot be placed here", 3e3), !1) : "Floor" != we(Rt) || "" == Ke.cornerTileBorderSKU && "" == Ke.borderTileCornerSKU ? "Mosaic" == Ke.type ? f(e, t, a) : v(e, t, a) : M(e, t, a) : y(e, t, a)
    }

    function c(e, t, a) {
        for (var r = 0; r < je.areas[e].decorateAreaZones.length; ++r) {
            var o = je.areas[e].decorateAreaZones[r];
            if (t >= o.areaX && a >= o.areaY && t < o.areaX + o.areaW && a < o.areaY + o.areaH) return o
        }
        if (void 0 != je.areas[e].decorateAreaFloorBorderZones)
            for (var r = 0; r < je.areas[e].decorateAreaFloorBorderZones.length; ++r) {
                var o = je.areas[e].decorateAreaFloorBorderZones[r];
                if (t >= o.areaX && a >= o.areaY && t < o.areaX + o.areaW && a < o.areaY + o.areaH) return o
            }
        if (void 0 != je.areas[e].decorateAreaSkirtingZones)
            for (var r = 0; r < je.areas[e].decorateAreaSkirtingZones.length; ++r) {
                var o = je.areas[e].decorateAreaSkirtingZones[r];
                if (t >= o.areaX && a >= o.areaY && t < o.areaX + o.areaW && a < o.areaY + o.areaH) return o
            }
        var i = je.areas[e].decorateAreaTop,
            n = je.areas[e].decorateAreaBorder,
            s = je.areas[e].decorateAreaBottom;
        return null != n && a >= n.areaY && a < n.areaY + n.areaH ? n : null != s && a >= s.areaY && a < s.areaY + s.areaH ? s : i
    }

    function d(e, t, a) {
        for (var r = 0; r < je.areas[e].decorateAreaZones.length; ++r) {
            var o = je.areas[e].decorateAreaZones[r];
            if (t >= o.areaX && a >= o.areaY && t < o.areaX + o.areaW && a < o.areaY + o.areaH) return r
        }
        return -1
    }

    function u(e, t, a) {
        var r = h(e, t, a);
        return r == -1 ? null : e.singleTiles[r]
    }

    function h(e, t, a) {
        function r(e, t, a) {
            if ("Diamond" == a.pattern) {
                var r = e - (a.areaX + a.areaW / 2),
                    o = t - (a.areaY + a.areaH / 2);
                return !(r + o < -a.areaW / 2) && (!(r + o > a.areaW / 2) && (!(r - o > a.areaW / 2) && !(o - r > a.areaW / 2)))
            }
            return e >= a.areaX && e < a.areaX + a.areaW && t >= a.areaY && t < a.areaY + a.areaH
        }
        for (var o = 0; o < e.singleTiles.length; ++o) {
            var i = e.singleTiles[o];
            if (r(t, a, i)) return o
        }
        return -1
    }

    function p(e) {
        return "Tile" == nt ? (e || Me("That surface cannot be tiled.", 1500), !1) : "Grout" == nt ? (e || Me("That surface cannot be take grout.", 1500), !1) : "WallColour" == nt && "Wall" != Pe(Rt) ? (e || Me("That surface cannot be painted.", 1500), !1) : "CabinetColour" == nt && "Cabinet" != Pe(Rt) ? (e || Me("That surface cannot take a cabinet colour.", 1500), !1) : "WorktopColour" == nt && "Worktop" != Pe(Rt) ? (e || Me("That surface cannot take a worktop colour.", 1500), !1) : !!e || (gt.push(VUtils.clone(je)), ft = new Array, "WallColour" == nt ? (je.areas[Rt].colour = Je, qe.track("Render Wall Colour", Je)) : "CabinetColour" == nt && (je.areas[Rt].colour = et, qe.track("Render Cabinet Colour", et)), "WorktopColour" == nt && (je.areas[Rt].colour = tt, qe.track("Render Worktop Colour", tt)), de(Rt), !0)
    }

    function g(e) {
        if ("Floor" == we(Rt)) return e || Me("That surface cannot be painted.", 1500), !1;
        if ("BottomTiles" == Ct.areaType) {
            var t = je.areas[Rt].decorateAreaBorder;
            if (null != t && "BorderSplit" == t.areaType) return e || Me("Only tiles can be placed on the bottom of a half tiled wall.", 1500), !1
        }
        return !!e || (gt.push(VUtils.clone(je)), ft = new Array, "WallColour" == nt ? je.areas[Rt].colour = Je : "CabinetColour" == nt && (je.areas[Rt].colour = et), "WorktopColour" == nt && (je.areas[Rt].colour = tt), je.areas[Rt].colour = null, Ct.rgb = Je, Ct.grout = "FFFFFF", Ct.sku = null, Ct.skus = null, Ct.rotation = 0, Ct.pattern = "Linear", de(Rt), qe.track("Render Wall Colour", Je), !0)
    }

    function f(e, t, a) {
        if (e) return !0;
        var r = !0;
        if ("Floor" == we(Rt) ? r = !1 : null == Ct.sku ? r = !1 : null != je.areas[Rt].decorateAreaBorder && (r = !1), !r) return v(e, t, a);
        Ot = t, Pt = a;
        var o = ["decorate-mosaic-fill", "decorate-mosaic-border"];
        return Ge.showDecorateOptionActions(o), !0
    }

    function v(e, t, a) {
        if ("TopTiles" == Ct.areaType) {
            var r = je.areas[Rt].decorateAreaBorder;
            if (null != r && "BorderSplit" == r.areaType) return e || Me("Only paint can be placed on the top of a half tiled wall.", 1500), !1
        }
        if ("BorderTile" == Ct.areaType) return e || Me("That tile cannot be laid as a border.", 1500), !1;
        if (Te(Rt) && !Ke.fireplaceTile) return e || Me("This tile is not suitable for use around a fireplace.", 1500), !1;
        if ("Indoor" == be(Rt) && "Outdoor" == Ke.canGoWhere) return e || Me("That tile cannot be laid indoors.", 1500), !1;
        if ("Outdoor" == be(Rt) && "Indoor" == Ke.canGoWhere) return e || Me("That tile cannot be laid outdoors.", 1500), !1;
        if ("Floor" == we(Rt) && "Wall" == Ke.canGo) return e || Me("That tile cannot be laid onto a floor.", 1500), !1;
        if ("Wall" == we(Rt) && "Floor" == Ke.canGo) return e || Me("That tile cannot be laid onto a wall.", 1500), !1;
        if (e) return !0;
        if (!m(xt) && W(t, a)) return !1;
        gt.push(VUtils.clone(je)), ft = new Array, re(Ct), de(Rt);
        for (var o in je.areas) {
            var i = o;
            if (i != Rt) {
                var n = Be(i),
                    s = n.linkedAreas.split(",");
                if (s.indexOf(Rt) != -1) {
                    var l = je.areas[i].decorateAreaTop;
                    re(l), de(i)
                }
            }
        }
        return !0
    }

    function m(e) {
        return Xe.getGridName(e).indexOf("WORKTOP") != -1 || Xe.getGridName(e).indexOf("CUPBOARD") != -1 || Xe.getGridName(e).indexOf("CABINET") != -1
    }

    function b(e) {
        return Xe.getGridName(e).indexOf("CUPBOARD") != -1 || Xe.getGridName(e).indexOf("CABINET") != -1
    }

    function T(e) {
        return Xe.getGridName(e).indexOf("WORKTOP") != -1
    }

    function k(e, t, a) {
        if (at || rt || ot) return !1;
        if (e) return !0;
        wt = xt, yt = Rt, St = Ct, $t = -1;
        var r = ["decorate-delete-floor-border"];
        switch (nt) {
            case "Grout":
                null != St.sku && r.push("decorate-grout-floor-border");
                break;
            case "Tile":
                null != Ke && ("" != Ke.borderTileCornerSKU && Ke.borderTileCornerSKU != je.areas[Rt].decorateAreaFloorBorderZones[0].sku || "" != Ke.cornerTileBorderSKU && Ke.cornerTileBorderSKU != je.areas[Rt].decorateAreaFloorBorderZones[1].sku) && r.push("decorate-lay-floor-border")
        }
        return Ge.showDecorateOptionActions(r), !1
    }

    function w(e, t, a) {
        if (Te(Rt)) return !1;
        if (e) return !0;
        Ve.trackCreateArea(), outlines.setMode("None"), Me(null), gt.push(VUtils.clone(je)), ft = new Array;
        var r = J(Rt);
        return r.areaType = "TileZone", r.areaX = t - 225, r.areaY = a - 225, r.areaW = 450, r.areaH = 450, r.alignX = r.areaX, r.alignY = r.areaY, je.areas[Rt].decorateAreaZones.push(r), de(Rt), !0
    }

    function y(e, t, a) {
        if (e) return !0;
        wt = xt, yt = Rt, St = Ct, $t = It;
        var r = ["decorate-delete-zone", "decorate-edit-zone"];
        switch (nt) {
            case "Grout":
                null != St.sku && r.push("decorate-grout-zone");
                break;
            case "Tile":
                null != Ke && (at ? (r.push("decorate-tile-zone"), r.push("decorate-tile-zone-text")) : rt || ot || (!Ke.isBorder || Ke.isCapping || Ke.isFinishingStrip) && (null == St.sku ? (null != st ? r.push("decorate-tiles-zone") : r.push("decorate-tile-zone"), r.push("decorate-tile-zone-text")) : Ke.sku == St.sku && null == st || (null != st ? r.push("decorate-tiles-zone") : r.push("decorate-tile-zone"), r.push("decorate-tile-zone-text"))))
        }
        return Ge.showDecorateOptionActions(r), !1
    }

    function S(e, t, a) {
        return !!e || (wt = xt, yt = Rt, St = Ct, $t = It, null != St.sku && Se(St.sku).isGlassSplashback && (actionsList = ["decorate-delete-glass-splashback"]), Ge.showDecorateOptionActions(actionsList), !1)
    }

    function A(e, t, a) {
        function r() {
            for (var e = je.areas[yt].decorateAreaZones[$t], t = 0; t < e.singleTiles.length; ++t) e.singleTiles[t].areaX += Ut - e.areaX, e.singleTiles[t].areaY += Gt - e.areaY, e.singleTiles[t].alignX = e.singleTiles[t].areaX, e.singleTiles[t].alignY = e.singleTiles[t].areaY;
            e.areaX = Ut, e.areaY = Gt, e.alignX = e.areaX, e.alignY = e.areaY, e.areaW = Vt, e.areaH = Ht, _(St), de(yt), outlines.setMode("None")
        }
        if (88888 == t && 88888 == a) return !e && (r(), Ue.doEditZone(!0, !1), !0);
        if (99999 == t && 99999 == a) return !e && (r(), !0);
        var o = je.areas[yt].decorateAreaZones[$t];
        if (xt != wt) return outlines.drawZone(wt, Ut, Gt, Vt, Ht, je.areas[yt], St.masksX1X2Y1Y2, !1, !0, ""), e || outlines.setMode("None"), !1;
        var i = "None";
        return outlines.isGrabDistance2(wt, t, a, Ut + Vt / 2, Gt + Ht / 2) ? i = "Centre" : outlines.isGrabDistance(wt, t, a, Ut, Gt) ? i = "Top-Left" : outlines.isGrabDistance(wt, t, a, Ut + Vt / 2, Gt) ? i = "Top" : outlines.isGrabDistance(wt, t, a, Ut + Vt, Gt) ? i = "Top-Right" : outlines.isGrabDistance(wt, t, a, Ut + Vt, Gt + Ht / 2) ? i = "Middle-Right" : outlines.isGrabDistance(wt, t, a, Ut + Vt, Gt + Ht) ? i = "Bottom-Right" : outlines.isGrabDistance(wt, t, a, Ut + Vt / 2, Gt + Ht) ? i = "Bottom" : outlines.isGrabDistance(wt, t, a, Ut, Gt + Ht) ? i = "Bottom-Left" : outlines.isGrabDistance(wt, t, a, Ut, Gt + Ht / 2) ? i = "Middle-Left" : outlines.isGrabHLineDistance(wt, t, a, Ut, Ut + Vt, Gt) ? i = "Top" : outlines.isGrabHLineDistance(wt, t, a, Ut, Ut + Vt, Gt + Ht) ? i = "Bottom" : outlines.isGrabVLineDistance(wt, t, a, Ut, Gt, Gt + Ht) ? i = "Middle-Left" : outlines.isGrabVLineDistance(wt, t, a, Ut + Vt, Gt, Gt + Ht) && (i = "Middle-Right"), "None" == i ? (outlines.drawZone(wt, Ut, Gt, Vt, Ht, je.areas[yt], St.masksX1X2Y1Y2, !1, !0, i), !!e || (r(), !0)) : "None" == i ? (outlines.drawZone(wt, Ut, Gt, Vt, Ht, je.areas[yt], St.masksX1X2Y1Y2, !1, !0, ""), !1) : (Bt = t, Ft = a, Et = Ut, Wt = Gt, Lt = Vt, Yt = Ht, outlines.drawZone(wt, Ut, Gt, Vt, Ht, je.areas[yt], St.masksX1X2Y1Y2, !1, !0, i), "Middle" != i && ("Finish" != i && (Mt = i, e || outlines.setMode("EditingZone"), !0)))
    }

    function x(e, t, a) {
        if (xt != wt) return e || Ue.doEditZone(!1, !1), !1;
        var r = Lt,
            o = Yt,
            i = 100;
        return Mt.indexOf("Centre") != -1 ? (t = Et + t - Bt, a = Wt + a - Ft) : (Mt.indexOf("Top") != -1 ? Yt + (Ft - a) >= i ? (o = Yt + (Ft - a), a = Wt + a - Ft) : (o = i, a = Wt + Yt - o) : Mt.indexOf("Bottom") != -1 ? Yt + a - Ft >= i ? (o = Yt + a - Ft, a = Wt) : (a = Wt, o = i) : a = Wt, Mt.indexOf("Left") != -1 ? Lt + (Bt - t) >= i ? (r = Lt + (Bt - t), t = Et + t - Bt) : (r = i, t = Et + Lt - r) : Mt.indexOf("Right") != -1 ? Lt + t - Bt >= i ? (r = Lt + t - Bt, t = Et) : (t = Et, r = i) : t = Et), Ut = t, Gt = a, Vt = r, Ht = o, outlines.drawZone(wt, Ut, Gt, Vt, Ht, je.areas[yt], St.masksX1X2Y1Y2, !0, !1, ""), !!e || (outlines.drawZone(wt, Ut, Gt, Vt, Ht, je.areas[yt], St.masksX1X2Y1Y2, !1, !0, ""), outlines.setMode("WaitingToEditZone"), !0)
    }

    function R(e, t, a) {
        if (e) return !0;
        if (rt) return F(), !0;
        wt = xt, yt = Rt, St = Ct, At = Dt;
        var r = ["decorate-delete-border", "decorate-edit-border"];
        "Tile" != nt && "Grout" != nt || ("Grout" == nt ? r.push("decorate-grout-border") : null != Ke && (Ke.isBorder || Ke.isCapping || Ke.isFinishingStrip || "Mosaic" == Ke.type) && St.sku != Ke.sku && r.push("decorate-change-border"));
        var o = Se(Ct.sku);
        return o.isCapping ? ($(".modal-decorate-options .border-type-border").hide(), $(".modal-decorate-options .border-type-capping").show(), $(".modal-decorate-options .border-type-finishing-strip").hide()) : o.isFinishingStrip ? ($(".modal-decorate-options .border-type-border").hide(), $(".modal-decorate-options .border-type-capping").hide(), $(".modal-decorate-options .border-type-finishing-strip").show()) : ($(".modal-decorate-options .border-type-border").show(), $(".modal-decorate-options .border-type-capping").hide(), $(".modal-decorate-options .border-type-finishing-strip").hide()), Ge.showDecorateOptionActions(r), !1
    }

    function C(e, t, a) {
        if ("Floor" == we(Rt)) return e || Me("Cannot place borders on the floor", 1500), !1;
        if (0) return e || Me("Place tiles before borders", 1500), !1;
        if (null != je.areas[Rt].decorateAreaBorder) {
            if (!e)
                if ("BorderSplit" == je.areas[Rt].decorateAreaBorder.areaType) Ke.isCapping ? Me("Capping cannot be placed on a half tiled wall.", 1500) : Ke.isFinishingStrip ? Me("Finishing Strips cannot be placed on a half tiled wall.", 1500) : Me("Borders cannot be placed on a half tiled wall.", 1500);
                else {
                    var r = Se(je.areas[Rt].decorateAreaBorder.sku);
                    r.isCapping ? Me("There is already capping on this surface", 1500) : r.isFinishingStrip ? Me("There is already a finishing strip on this surface", 1500) : Me("There is already a border on this surface", 1500)
                }
            return !1
        }
        if (e) return !0;
        gt.push(VUtils.clone(je)), ft = new Array;
        var o = a,
            i = Ke.height;
        "Mosaic" == Ke.type && Ke.smallMosaicsH > 1 && (i = Ke.height / Ke.smallMosaicsH * 3), o + i > Ct.areaH && (o = Ct.areaH - i - 5);
        var n = je.areas[Rt].decorateAreaTop;
        n.areaH = o, n.alignY = o;
        var s = J(Rt);
        s.areaType = "BorderTile", s.areaY = o, s.alignY = o, s.areaH = i, s.sku = Ke.sku, s.grout = n.grout, je.areas[Rt].decorateAreaBorder = s;
        var l = J(Rt);
        return l.areaType = "BottomTiles", l.areaY = o + i, l.alignY = o + i, l.areaH -= o + i, te(l, n), je.areas[Rt].decorateAreaBottom = l, j(n, l), z(n), z(l), _(n), _(l), de(Rt), qe.track("Render Border", Ke.sku), !0
    }

    function I(e, t, a) {
        function r() {
            gt.push(VUtils.clone(je)), ft = new Array, B(aa, ra), de(yt), outlines.setMode("None")
        }
        if (88888 == t && 88888 == a) return !e && (r(), Ue.doEditBorder(!0), !0);
        if (99999 == t && 99999 == a) return !e && (r(), !0);
        if (xt != wt) return outlines.drawBorder(wt, aa, ra, je.areas[yt], St.masksX1X2Y1Y2, !1, !0, ""), e || outlines.setMode("None"), !1;
        var o = outlines.getBorderGrabHandles(),
            i = "None";
        return outlines.isGrabDistance(wt, t, a, o[0].x, o[0].y) ? i = "Top" : outlines.isGrabDistance2(wt, t, a, o[1].x, o[1].y) ? i = "Centre" : outlines.isGrabDistance(wt, t, a, o[2].x, o[2].y) ? i = "Bottom" : outlines.isGrabHLineDistance(wt, t, a, 0, 99999, aa) ? i = "Top" : outlines.isGrabHLineDistance(wt, t, a, 0, 99999, aa + ra) && (i = "Bottom"), "None" == i ? (outlines.drawBorder(wt, aa, ra, je.areas[yt], St.masksX1X2Y1Y2, !1, !0, i), !!e || (r(), !0)) : "None" == i ? (outlines.drawBorder(wt, aa, ra, je.areas[yt], St.masksX1X2Y1Y2, !1, !0, ""), !1) : (Bt = t, Ft = a, ea = aa, ta = ra, outlines.drawBorder(wt, aa, ra, je.areas[yt], St.masksX1X2Y1Y2, !1, !0, i), Mt = i, e || outlines.setMode("EditingBorder"), !0)
    }

    function D(e, t, a) {
        if (xt != wt) return e || Ue.doEditBorder(!1), !1;
        var r = ta;
        if ("Centre" == Mt) a = ea + a - Ft, a + r > je.areas[Rt].decorateAreaBottom.areaY + je.areas[Rt].decorateAreaBottom.areaH && (a = je.areas[Rt].decorateAreaBottom.areaY + je.areas[Rt].decorateAreaBottom.areaH - r - 5);
        else {
            var o = Se(St.sku),
                i = o.height;
            if ("Mosaic" == o.type && (i = o.height / o.smallMosaicsH), 90 == St.rotation && (i = o.width, "Mosaic" == o.type && (i = o.width / o.smallMosaicsW)), "Top" == Mt) {
                r = ta + (Ft - a), a = ea + a - Ft;
                var n = Math.floor((r + i / 2) / i) * i;
                n < i && (n = i), a -= n - r, r = n
            } else r = ta + a - Ft, a = ea, r = Math.floor((r + i / 2) / i) * i, r < i && (r = i)
        }
        return aa = a, ra = r, outlines.drawBorder(wt, aa, ra, je.areas[yt], St.masksX1X2Y1Y2, !0, !1, ""), !!e || (outlines.drawBorder(wt, aa, ra, je.areas[yt], St.masksX1X2Y1Y2, !1, !0, ""),
            outlines.setMode("WaitingToEditBorder"), !0)
    }

    function O() {
        return gt.push(VUtils.clone(je)), ft = new Array, Ct.grout = Qe, de(Rt), !0
    }

    function P() {
        var e = ee(Rt),
            t = je.areas[Rt].decorateAreaTop,
            a = je.areas[Rt].decorateAreaBorder,
            r = je.areas[Rt].decorateAreaBottom,
            o = a.areaY,
            i = o,
            n = Ke.height;
        if (St.areaH > Se(St.sku).height)
            for (; n < St.areaH - Ke.height;) n += Ke.height;
        var s = n - a.areaH;
        i + n > r.areaY + r.areaH && (i = r.areaY + r.areaH - n - 5), t.areaH = i, t.alignY = i, a.areaY = i, a.alignY = i, a.areaH = n, a.sku = Ke.sku, r.areaY = i + n, r.alignY = i + n, r.areaH = e.areaH - (i + n), Z(r, s), _(r), de(Rt)
    }

    function B(e, t) {
        var a = ee(yt),
            r = je.areas[yt].decorateAreaTop,
            o = je.areas[yt].decorateAreaBorder,
            i = je.areas[yt].decorateAreaBottom,
            n = e - o.areaY,
            s = e + t - (o.areaY + o.areaH),
            l = e,
            c = t;
        r.areaH = l, r.alignY = l, o.areaY = l, o.alignY = l, o.areaH = c, i.areaY = l + c, i.alignY = l + c, i.areaH = a.areaH - (l + c), Z(r, n), Z(i, s), _(r), _(i)
    }

    function F() {
        var e = ee(Rt),
            t = je.areas[Rt].decorateAreaTop,
            a = je.areas[Rt].decorateAreaBorder,
            r = je.areas[Rt].decorateAreaBottom,
            o = Se(a.sku);
        if (0 == a.rotation) {
            if (a.rotation = 90, borderH = o.width, a.areaH > o.height)
                for (; borderH < a.areaH - o.width;) borderH += o.width
        } else if (a.rotation = 0, borderH = o.height, a.areaH > o.width)
            for (; borderH < a.areaH - o.height;) borderH += o.height;
        var i = borderH - a.areaH,
            n = a.areaY;
        t.areaH = n, t.alignY = n, a.areaY = n, a.alignY = n, a.areaH = borderH, r.areaY = n + borderH, r.alignY = n + borderH, r.areaH = e.areaH - (n + borderH), Z(r, i), _(r), Ge.disableRotateMode(), de(Rt)
    }

    function M(e, t, a) {
        if ("Outdoor" == be(Rt)) return !1;
        if (je.areas[Rt].decorateAreaFloorBorderZones.length > 0) return !1;
        for (var r = !1, o = 0; o < He.floorBorders.length; ++o)
            if (He.floorBorders[o].roomID == ze.id && (r = !0, He.floorBorders[o].areaRef != Rt)) return e || Me("Floor borders cannot be placed here", 3e3), !1;
        return r ? E(e, t, a) : (e || Me("Floor borders are not possible in this room", 3e3), !1)
    }

    function E(e, t, a) {
        function r(e, t) {
            var a = J(Rt);
            switch (a.areaType = "FloorBorderZone", a.sku = cornerTileSKU, a.areaX = e.x, a.areaY = e.y, a.areaW = t.width, a.areaH = t.height, e.cornerType) {
                case "InsideTopLeft":
                case "OutsideTopLeft":
                    u = a.areaX + a.areaW, h = a.areaY + a.areaH;
                    break;
                case "InsideTopRight":
                case "OutsideTopRight":
                    a.areaX -= a.areaW, u = a.areaX, h = a.areaY + a.areaH;
                    break;
                case "InsideBottomRight":
                case "OutsideBottomRight":
                    a.areaX -= a.areaW, a.areaY -= a.areaH;
                    break;
                case "InsideBottomLeft":
                case "OutsideBottomLeft":
                    a.areaY -= a.areaH, u = a.areaX + a.areaW, h = a.areaY
            }
            if (a.alignX = a.areaX, a.alignY = a.areaY, "" == t.cornerPointOnTile) a.rotation = 0;
            else switch (e.cornerType) {
                case "InsideTopLeft":
                case "OutsideBottomRight":
                    a.rotation = 0, "TopRight" == t.cornerPointOnTile ? a.rotation = 270 : "BottomRight" == t.cornerPointOnTile ? a.rotation = 180 : "BottomLeft" == t.cornerPointOnTile && (a.rotation = 90);
                    break;
                case "InsideTopRight":
                case "OutsideBottomLeft":
                    a.rotation = 0, "BottomRight" == t.cornerPointOnTile ? a.rotation = 270 : "BottomLeft" == t.cornerPointOnTile ? a.rotation = 180 : "TopLeft" == t.cornerPointOnTile && (a.rotation = 90);
                    break;
                case "InsideBottomRight":
                case "OutsideTopLeft":
                    a.rotation = 0, "BottomLeft" == t.cornerPointOnTile ? a.rotation = 270 : "TopLeft" == t.cornerPointOnTile ? a.rotation = 180 : "TopRight" == t.cornerPointOnTile && (a.rotation = 90);
                    break;
                case "InsideBottomLeft":
                case "OutsideTopRight":
                    a.rotation = 0, "TopLeft" == t.cornerPointOnTile ? a.rotation = 270 : "TopRight" == t.cornerPointOnTile ? a.rotation = 180 : "BottomRight" == t.cornerPointOnTile && (a.rotation = 90)
            }
            return a
        }
        if (Te(Rt)) return !1;
        if (e) return !0;
        gt.push(VUtils.clone(je)), ft = new Array;
        for (var o = null, i = 0; i < He.floorBorders.length; ++i)
            if (He.floorBorders[i].roomID == ze.id) {
                o = new Array;
                for (var n = 0; n < He.floorBorders[i].corners.length; ++n) {
                    var s = He.floorBorders[i].corners[n].split(",");
                    o.push({
                        cornerType: s[0],
                        x: parseInt(s[1]),
                        y: parseInt(s[2]),
                        nextBorderDir: s[3],
                        alignFloorToHere: !1
                    })
                }
                "" != He.floorBorders[i].alignFloorTo && (o[He.floorBorders[i].alignFloorTo].alignFloorToHere = !0);
                break
            }
        if (null == o) return !1;
        cornerTileSKU = null, borderTileSKU = null, "" != Ke.cornerTileBorderSKU ? (cornerTileSKU = Ke.sku, borderTileSKU = Ke.cornerTileBorderSKU) : "" != Ke.borderTileCornerSKU && (borderTileSKU = Ke.sku, cornerTileSKU = Ke.borderTileCornerSKU);
        var l = Se(cornerTileSKU),
            c = Se(borderTileSKU);
        je.areas[Rt].decorateAreaFloorBorderZones = new Array;
        for (var i = 0; i < o.length; ++i) {
            var d = o[i],
                u = -1,
                h = -1,
                p = r(d, l);
            if ("End" != o[i].nextBorderDir && je.areas[Rt].decorateAreaFloorBorderZones.push(p), d.alignFloorToHere && u != -1 && h != -1 && (je.areas[Rt].decorateAreaTop.alignX = u, je.areas[Rt].decorateAreaTop.alignY = h), i != o.length - 1 && "End" != o[i].nextBorderDir) {
                var g = null,
                    f = null;
                g = o[i + 1], f = r(g, l);
                var v = J(Rt);
                switch (v.areaType = "FloorBorderZone", v.sku = borderTileSKU, d.nextBorderDir) {
                    case "Right":
                        v.areaX = p.areaX + p.areaW, v.areaY = p.areaY, v.areaW = f.areaX - v.areaX, v.areaH = c.height;
                        break;
                    case "Down":
                        v.areaX = p.areaX + p.areaW - c.height, v.areaY = p.areaY + p.areaH, v.areaW = c.height, v.areaH = f.areaY - v.areaY, v.rotation = 90;
                        break;
                    case "Left":
                        v.areaX = f.areaX + f.areaW, v.areaY = p.areaY, v.areaW = p.areaX - v.areaX, v.areaH = c.height;
                        break;
                    case "Up":
                        v.areaX = p.areaX, v.areaY = f.areaY + f.areaH, v.areaW = c.height, v.areaH = p.areaY - v.areaY, v.rotation = 90
                }
                v.alignX = v.areaX, v.alignY = v.areaY, je.areas[Rt].decorateAreaFloorBorderZones.push(v)
            }
        }
        return de(Rt), !0
    }

    function W(e, t) {
        if (Te(Rt)) return !1;
        var a = Be(Rt);
        if ("" != a.justFill) return !1;
        var r = !1,
            o = !1;
        if (Fe() && "Floor" == we(Rt))
            for (var i in je.areas) {
                var n = i,
                    a = Be(n);
                if ("" != a.outdoor && (r = !0), "" != a.skirting && 0 == je.areas[n].decorateAreaSkirtingZones.length) {
                    o = !0;
                    break
                }
            }
        if (!o) {
            var s = je.areas[Rt].decorateAreaTop;
            if (null != s.rgb || null != s.sku || null != s.skus) return !1;
            var l = je.areas[Rt].decorateAreaBorder;
            if (null != l) return !1;
            var c = je.areas[Rt].decorateAreaBottom;
            if (null != c) return !1;
            if (je.areas[Rt].decorateAreaZones.length > 0) return !1
        }
        wt = xt, yt = Rt, St = Ct, Ot = e, Pt = t;
        var d = [];
        "Floor" == we(Rt) ? (d.push("draw-floor-area"), d.push("fill-whole-floor"), o && (r ? "Indoor" != Ke.canGoWhere && d.push("fill-whole-floor-and-skirting") : d.push("fill-whole-floor-and-skirting"))) : (d.push("draw-wall-area"), d.push("fill-whole-wall"));
        var a = Be(Rt);
        return "" != a.splitY && d.push("fill-half-wall"), "" != a.splashback && d.push("create-splashback"), "Wall" == we(Rt) && "Mosaic" == Ke.type && d.push("lay-mosaic-border"), Ge.showDecorateAreaOptions(d), !0
    }

    function L() {
        for (var e in je.areas) {
            var t = e,
                a = Be(t);
            if ("" != a.skirting) {
                var r = je.areas[t].decorateAreaSkirtingZones[0].areaH / 2;
                if (null == je.areas[t].decorateAreaBorder) {
                    var o = ee(t);
                    je.areas[t].decorateAreaTop.alignY = o.alignY, Z(je.areas[t].decorateAreaTop, r)
                }
                je.areas[t].decorateAreaSkirtingZones = new Array, de(t)
            }
        }
    }

    function Y() {
        for (var e in je.areas) {
            var t = e,
                a = Be(t);
            if ("" != a.skirting) {
                var r = ee(t),
                    o = a.skirting.split(",")[0];
                o = "Inherit" == o ? r.alignX : parseInt(o);
                var i = a.skirting.split(",")[1];
                i = "Inherit" == i ? r.alignY : parseInt(i);
                var n = 0;
                je.areas[t].decorateAreaSkirtingZones.length > 0 && (n = je.areas[t].decorateAreaSkirtingZones[0].areaH / 2);
                var s = dt;
                Se(Ke.sku).height < s && (s = Se(Ke.sku).height);
                var l = parseFloat(i) - s,
                    c = J(t);
                c.areaType = "SkirtingZone", c.grout = Qe, c.areaX = je.areas[t].decorateAreaTop.areaX, c.areaY = l, c.areaW = je.areas[t].decorateAreaTop.areaW, c.areaH = 2 * s, c.alignX = o, c.alignY = l, je.areas[t].decorateAreaSkirtingZones = new Array, je.areas[t].decorateAreaSkirtingZones.push(c), re(je.areas[t].decorateAreaSkirtingZones[je.areas[t].decorateAreaSkirtingZones.length - 1]), null == je.areas[t].decorateAreaBorder && (je.areas[t].decorateAreaTop.alignY = l, Z(je.areas[t].decorateAreaTop, n - s)), de(t)
            }
        }
    }

    function U() {
        for (var e in je.areas) {
            var t = e,
                a = Be(t);
            if ("" != a.skirting && 0 != je.areas[t].decorateAreaSkirtingZones.length) {
                var r = a.skirting.split(",")[1];
                if ("Inherit" == r) {
                    var o = ee(t);
                    r = o.alignY
                } else r = parseInt(r);
                var i = parseFloat(r) - dt;
                null == je.areas[t].decorateAreaBorder && (je.areas[t].decorateAreaTop.alignY = i, z(je.areas[t].decorateAreaTop)), de(t)
            }
        }
    }

    function G(e) {
        for (var t in je.areas) {
            var a = t;
            if ("Floor" != we(a)) {
                var r = Be(a);
                "" != r.skirting && 0 != je.areas[a].decorateAreaSkirtingZones.length && je.areas[a].decorateAreaSkirtingZones[0].sku == e && (je.areas[a].decorateAreaSkirtingZones[0].grout = Qe, de(a))
            } else je.areas[a].decorateAreaTop.sku == e && (je.areas[a].decorateAreaTop.grout = Qe, de(a))
        }
    }

    function V(e, t, a) {
        if (at || rt || ot) return !1;
        if (e) return !0;
        wt = xt, yt = Rt, St = Ct, $t = -1;
        var r = ["decorate-delete-skirting"];
        switch (nt) {
            case "Grout":
                r.push("decorate-grout-zone");
                break;
            case "Tile":
                if (null != Ke) {
                    var o = !1;
                    "Outdoor" == be(Rt) && "Indoor" == Ke.canGoWhere && (o = !0), o || (null != st || "" != Ke.sku && Ke.sku != je.areas[Rt].decorateAreaSkirtingZones[0].sku) && r.push("decorate-change-skirting")
                }
        }
        return Ge.showDecorateOptionActions(r), !1
    }

    function H(e, t, a) {
        if (e) return !0;
        wt = xt, yt = Rt, St = Ct, At = Dt;
        var r = ["decorate-delete-single-tile", "decorate-move-single-tile"];
        return "TileZone" == Ct.areaType && (at || ($t = It, r.push("decorate-delete-zone", "decorate-edit-zone"))), "Tile" != nt && "Grout" != nt || null != Ke && at && St.singleTiles[At].sku != Ke.sku && $e(Ke, Ct.pattern) && r.push("decorate-change-single-tile"), Ge.showDecorateOptionActions(r), !1
    }

    function X(e, t, a) {
        if (Te(Rt)) return !1;
        if (null == Ct.sku) return e || Me("You are in Single Tile mode. Change this in the top right panel and tile the whole surface before placing single tiles", 3e3), !1;
        if ("Indoor" == be(Rt) && "Outdoor" == Ke.canGoWhere) return e || Me("That tile cannot be laid indoors.", 1500), !1;
        if ("Outdoor" == be(Rt) && "Indoor" == Ke.canGoWhere) return e || Me("That tile cannot be laid outdoors.", 1500), !1;
        if ("Floor" == we(Rt)) {
            if ("Wood" == Se(Ct.sku).is) return e || Me("Cannot place single tiles on wood floors", 1500), !1;
            if ("Wall" == Ke.canGo) return e || Me("That tile cannot be laid onto a floor.", 1500), !1
        }
        if ("Wall" == we(Rt) && "Floor" == Ke.canGo) return e || Me("That tile cannot be laid onto a wall.", 1500), !1;
        if ("BorderTile" == Ct.areaType) return e || Me("Cannot place single tiles on borders", 1500), !1;
        if (!$e(Ke, Ct.pattern)) return e || Me("That single tile cannot be set in a " + xe(Ct.pattern) + " pattern.", 1500), !1;
        if ("Herringbone" == Ct.pattern || "BlockHerringbone" == Ct.pattern) return e || Me("You cannot add single tiles to a " + xe(Ct.pattern) + " pattern.", 1500), !1;
        if ("Diamond" == Ct.pattern) {
            var r = ae(Ct);
            if (Ke.width != r[0]) return e || Me("Singles tiles must be the same size as the base tile."), !1
        }
        if ("FloorBorderZone" == Ct.areaType) return !1;
        if ("SkirtingZone" == Ct.areaType) return !1;
        var o = Ke.width,
            i = Ke.height;
        90 == Ct.rotation && (o = Ke.height, i = Ke.width), "Diamond" == Ct.pattern && (o /= Ze, i /= Ze);
        var n = new Object;
        n.areaW = o, n.areaH = i;
        var s = K(Ct, n, t, a, "AutoLock");
        if (outlines.drawSingleTile(-1, -1, xt, s.x, s.y, o, i, Ct.areaX, Ct.areaY, Ct.areaW, Ct.areaH, Ct.masksX1X2Y1Y2, Ct.pattern, !0, !1, !1), e) return !0;
        gt.push(VUtils.clone(je)), ft = new Array;
        var n = J(Rt);
        return n.areaType = "SingleTile", n.sku = Ke.sku, n.grout = Ct.grout, n.rotation = Ct.rotation, "Diamond" == Ct.pattern && (n.pattern = Ct.pattern), Q(n), n.areaX = s.x, n.areaY = s.y, n.alignX = n.areaX, n.alignY = n.areaY, Ct.singleTiles.push(n), Ke.sku != sa && (Ve.trackPlaceSingleTile(Ke), sa = Ke.sku), de(Rt), qe.track("Render Single", Ke.sku), !0
    }

    function N(e, t, a) {
        function r() {
            gt.push(VUtils.clone(je)), ft = new Array;
            var e = J(yt);
            e.areaType = "SingleTile", e.sku = St.singleTiles[At].sku, e.grout = St.grout, e.rotation = Kt.rotation, "Diamond" == Kt.pattern && (e.pattern = Kt.pattern), Q(e), e.areaX = Qt, e.areaY = Jt, e.alignX = e.areaX, e.alignY = e.areaY, Kt.singleTiles.push(e), St.singleTiles.splice(At, 1), de(yt), yt != zt && de(zt), outlines.setMode("None")
        }
        if (99999 == t && 99999 == a) return !e && (r(), !0);
        var o = t,
            i = a;
        na && (i += outlines.getSingleTileGrabHandleYOffset());
        var n = St.singleTiles[At],
            s = n.areaW,
            l = n.areaH;
        Kt.rotation != St.rotation && (s = n.areaH, l = n.areaW), "Diamond" == n.pattern && "Diamond" != Kt.pattern ? (s *= Ze, l *= Ze) : "Diamond" != n.pattern && "Diamond" == Kt.pattern && (s /= Ze, l /= Ze);
        var c = !1;
        if (na) {
            var d = outlines.getSingleTileGrabHandle();
            outlines.isGrabDistance2(wt, o, i, d.x, d.y) && (c = !0)
        } else t >= Qt && t < Qt + s && a > Jt && a < Jt + l && (c = !0);
        return c ? (outlines.drawSingleTile(-1, -1, _t, Qt, Jt, s, l, Kt.areaX, Kt.areaY, Kt.areaW, Kt.areaH, Kt.masksX1X2Y1Y2, Kt.pattern, !0, !0, na), e || (Bt = o, Ft = i, Xt = _t, Nt = zt, qt = Kt, Zt = Qt + n.areaW / 2, jt = Jt + n.areaH / 2, outlines.setMode("DraggingSingleTile")), !0) : e ? (outlines.drawSingleTile(-1, -1, _t, Qt, Jt, s, l, Kt.areaX, Kt.areaY, Kt.areaW, Kt.areaH, Kt.masksX1X2Y1Y2, Kt.pattern, !1, !1, na), e || outlines.setMode("None"), !1) : (r(), !0)
    }

    function q(e, t, a) {
        var r = t,
            o = a;
        if (na && (o += outlines.getSingleTileGrabHandleYOffset()), _t = xt, zt = Rt, Kt = Ct, null == Ct.sku) return na && outlines.drawSingleTileGrabHandleOnly(r, o, _t), e || Ue.doMoveSingleTile(!1), !1;
        if ("BorderTile" == Ct.areaType) return na && outlines.drawSingleTileGrabHandleOnly(r, o, _t), e || Ue.doMoveSingleTile(!1), !1;
        var i = St.singleTiles[At];
        if (!$e(Se(i.sku), Ct.pattern)) return na && outlines.drawSingleTileGrabHandleOnly(r, o, _t), e || Ue.doMoveSingleTile(!1), !1;
        if ("Herringbone" == Ct.pattern || "BlockHerringbone" == Ct.pattern) return na && outlines.drawSingleTileGrabHandleOnly(r, o, _t), e || Ue.doMoveSingleTile(!1), !1;
        t = Zt + t - Bt, a = jt + o - Ft;
        var n = K(Ct, i, t, a, "AutoLock");
        Qt = n.x, Jt = n.y;
        var s = i.areaW,
            l = i.areaH;
        if (Ct.rotation != St.rotation && (s = i.areaH, l = i.areaW), "Diamond" == St.pattern && "Diamond" != Ct.pattern ? (s *= Ze, l *= Ze) : "Diamond" != St.pattern && "Diamond" == Ct.pattern && (s /= Ze, l /= Ze), outlines.drawSingleTile(r, o, _t, Qt, Jt, s, l, Ct.areaX, Ct.areaY, Ct.areaW, Ct.areaH, Ct.masksX1X2Y1Y2, Ct.pattern, !0, !0, na), e) return !0;
        var c = ia,
            d = ve(Rt);
        return Jt + l / 2 > d.h / 4 * 3 && (c = -ia), outlines.setSingleTileGrabHandle(St.areaX, St.areaY, St.areaW, St.areaH, c), outlines.drawSingleTile(-1, -1, _t, Qt, Jt, s, l, Ct.areaX, Ct.areaY, Ct.areaW, Ct.areaH, Ct.masksX1X2Y1Y2, Ct.pattern, !1, !1, na), outlines.setMode("WaitingToDragSingleTile"), !0
    }

    function Z(e, t) {
        for (var a = 0; a < e.singleTiles.length; ++a) {
            var r = e.singleTiles[a];
            r.areaY += t, r.alignY += t
        }
    }

    function j(e, t) {
        for (var a = 0; a < e.singleTiles.length; ++a)
            if (e.singleTiles[a].areaY > e.areaY + e.areaH) {
                var r = VUtils.clone(e.singleTiles[a]);
                t.singleTiles.push(r), e.singleTiles.splice(a, 1), --a
            }
    }

    function _(e) {
        for (var t = 0; t < e.singleTiles.length; ++t) {
            var a = e.singleTiles[t],
                r = !1;
            a.areaY + a.areaH <= e.areaY || a.areaY >= e.areaY + e.areaH ? r = !0 : ("Herringbone" == e.pattern || "BlockHerringbone" == e.pattern || "Diamond" == e.pattern && Se(a.sku).width != Se(a.sku).height) && (r = !0), r && (e.singleTiles.splice(t, 1), --t)
        }
    }

    function z(e) {
        var t = e.sku;
        "TileRange" == t && (t = e.skus[0]);
        for (var a = Se(t), r = 0; r < e.singleTiles.length; ++r) {
            var o = e.singleTiles[r],
                i = Se(o.sku);
            if ("Herringbone" == e.pattern || "BlockHerringbone" == e.pattern || "Diamond" == e.pattern && i.width != i.height || "Diamond" == e.pattern && (i.width != a.width || i.height != a.height)) e.singleTiles.splice(r, 1), --r;
            else if (i.width == a.width && i.height == a.height) {
                o.rotation != e.rotation && (o.rotation = e.rotation, Q(o)), "Diamond" == e.pattern ? ("Diamond" != o.pattern && (o.areaW /= Ze, o.areaH /= Ze), o.pattern = e.pattern) : ("Diamond" == o.pattern && (o.areaW *= Ze, o.areaH *= Ze), o.pattern = "Linear");
                var n = K(e, o, o.areaX + o.areaW / 2, o.areaY + o.areaH / 2, "BaseTileOnly");
                o.areaX = n.x, o.areaY = n.y, o.alignX = o.areaX, o.alignY = o.areaY, (o.areaY + o.areaH <= e.areaY || o.areaY >= e.areaY + e.areaH) && (e.singleTiles.splice(r, 1), --r)
            }
        }
    }

    function K(e, t, a, r, o) {
        function i(e, t, a, r) {
            return e = a + Math.floor((e - a) / d) * d, t = r + Math.floor((t - r) / u) * u, new VPoint(e, t)
        }

        function n(e) {
            for (var t = [new VPoint(a, r), new VPoint(a + d, r), new VPoint(a + d, r + u), new VPoint(a, r + u)], o = 0; o < t.length; ++o)
                for (var i = 0; i < e.length; ++i) {
                    var n = We(t[o].x, t[o].y, e[i].x, e[i].y);
                    n < h && n < p && (p = n, g = e[i].x - (t[o].x - a), f = e[i].y - (t[o].y - r))
                }
        }

        function s(t, a, r, o, i) {
            for (var n = ae(e), s = n[0], l = n[1], c = 0; c < i.length; ++c) {
                var d = We(t, a, i[c].x, i[c].y);
                d < h && d < p && (p = d, g = i[c].x, f = i[c].y)
            }
            for (var c = 0; c < i.length; ++c) {
                var d = We(t + r, a, i[c].x, i[c].y);
                d < h && d < p && (p = d, g = i[c].x - r, f = i[c].y)
            }
            for (var c = 0; c < i.length; ++c) {
                var d = We(t + r, a + o, i[c].x, i[c].y);
                d < h && d < p && (p = d, g = i[c].x - r, f = i[c].y - o)
            }
            for (var c = 0; c < i.length; ++c) {
                var d = We(t, a + o, i[c].x, i[c].y);
                d < h && d < p && (p = d, g = i[c].x, f = i[c].y - o)
            }
        }

        function l(e) {
            return [new VPoint(e.areaX, e.areaY), new VPoint(e.areaX + e.areaW, e.areaY), new VPoint(e.areaX + e.areaW, e.areaY + e.areaH), new VPoint(e.areaX, e.areaY + e.areaH)]
        }

        function c(a, r, i, n) {
            switch (e.pattern) {
                case "Linear":
                    a = e.alignX + Math.floor((a - e.alignX) / i) * i, r = e.alignY + Math.floor((r - e.alignY) / n) * n;
                    break;
                case "Brick":
                    for (var s = e.alignY; s > e.areaY;) s -= n;
                    var l = 1e4 - Math.floor((e.alignY - e.areaY) / n);
                    l += Math.floor((r - s) / n), e.alignY == e.areaY && ++l;
                    var c = e.alignX,
                        d = 1e4 - Math.floor((e.alignX - e.areaX) / i);
                    d += Math.floor((a - c) / i), e.alignX == e.areaX && ++d;
                    var u = 0;
                    0 == e.rotation && l % 2 == 1 && (u = i / 2);
                    var h = 0;
                    90 == e.rotation && d % 2 == 1 && (h = n / 2), a = parseInt(-u + e.alignX + Math.floor((a - e.alignX + u) / i) * i), r = parseInt(-h + e.alignY + Math.floor((r - e.alignY + h) / n) * n);
                    break;
                case "3/4BrickBond":
                    for (var s = e.alignY; s > e.areaY;) s -= n;
                    var l = 1e4 - Math.floor((e.alignY - e.areaY) / n);
                    l += Math.floor((r - s) / n), e.alignY == e.areaY && ++l;
                    var c = e.alignX,
                        d = 1e4 - Math.floor((e.alignX - e.areaX) / i);
                    d += Math.floor((a - c) / i), e.alignX == e.areaX && ++d;
                    var u = 0;
                    0 == e.rotation && l % 2 == 1 && (u = i / 4);
                    var h = 0;
                    90 == e.rotation && d % 2 == 1 && (h = n / 4), a = parseInt(-u + e.alignX + Math.floor((a - e.alignX + u) / i) * i), r = parseInt(-h + e.alignY + Math.floor((r - e.alignY + h) / n) * n);
                    break;
                case "Diamond":
                    "AutoLock" == o && (a += t.areaW / 2, r += t.areaH / 2);
                    var p = Ze,
                        g = a,
                        f = r;
                    a = e.alignX + Math.floor((a - e.alignX) / (i / p)) * i / p, r = e.alignY + Math.floor((r - e.alignY) / (n / p)) * n / p;
                    var v = g - (a + i / p / 2),
                        m = f - (r + n / p / 2);
                    return v + m < -i / p / 2 ? (a -= i / p / 2, r -= n / p / 2) : v + m > i / p / 2 ? (a += i / p / 2, r += n / p / 2) : v - m > i / p / 2 ? (a += i / p / 2, r -= n / p / 2) : m - v > i / p / 2 && (a -= i / p / 2, r += n / p / 2), [new VPoint(a, r), new VPoint(a + i / Ze, r), new VPoint(a + i / Ze, r + n / Ze), new VPoint(a, r + n / Ze)]
            }
            return [new VPoint(a, r), new VPoint(a + i, r), new VPoint(a + i, r + n), new VPoint(a, r + n)]
        }
        var d = t.areaW,
            u = t.areaH,
            h = 30,
            p = 99999,
            g = -1,
            f = -1,
            v = ae(e),
            m = v[0],
            b = v[1];
        if ("AutoLock" == o && (a -= t.areaW / 2, r -= t.areaH / 2), "BaseTileOnly" == o) {
            h = 99999;
            var T = c(a, r, m, b);
            return T = [T[0]], n(T), 99999 == p ? new VPoint(a, r) : new VPoint(g, f)
        }
        if ("NewTile" == o) {
            if ("Diamond" != e.pattern)
                for (var k = 0; k < e.singleTiles.length; ++k) {
                    var w = e.singleTiles[k];
                    if (a >= w.areaX - d && a < w.areaX + w.areaW + d && r >= w.areaY - u && r < w.areaY + w.areaH + u) {
                        if (a >= w.areaX + w.areaW) return r < w.areaY ? i(a, r, w.areaX + w.areaW, w.areaY - u) : r >= w.areaY + w.areaH ? i(a, r, w.areaX + w.areaW, w.areaY + w.areaH) : i(a, r, w.areaX + w.areaW, w.areaY);
                        if (a < w.areaX) return r < w.areaY ? i(a, r, w.areaX - d, w.areaY - u) : r >= w.areaY + w.areaH ? i(a, r, w.areaX - d, w.areaY + w.areaH) : i(a, r, w.areaX - d, w.areaY);
                        if (r < w.areaY) return i(a, r, w.areaX, w.areaY - u);
                        if (r >= w.areaY + w.areaH) return i(a, r, w.areaX, w.areaY + w.areaH)
                    }
                }
            h = 99999;
            var T = c(a, r, m, b);
            return T = [T[0]], n(T), 99999 == p ? new VPoint(a, r) : new VPoint(g, f)
        }
        if ("AutoLock" == o) {
            var T = c(a, r, m, b);
            n(T);
            var T = c(a + d, r, m, b);
            n(T);
            var T = c(a + d, r + u, m, b);
            n(T);
            var T = c(a, r + u, m, b);
            if (n(T), "Diamond" != e.pattern)
                for (var k = 0; k < e.singleTiles.length; ++k) {
                    var w = e.singleTiles[k],
                        T = l(w);
                    n(T)
                }
        }
        return 99999 == p ? new VPoint(a, r) : new VPoint(g, f)
    }

    function Q(e) {
        var t = Se(e.sku);
        "Diamond" == e.pattern ? (e.areaW = t.width / Ze, e.areaH = t.height / Ze) : 90 == e.rotation ? (e.areaW = t.height, e.areaH = t.width) : (e.areaW = t.width, e.areaH = t.height)
    }

    function J(e) {
        var t = ee(e);
        return t.rgb = null, t.sku = null, t.skus = null, t.tileRangeAreaCoverage = null, t.grout = "FFFFFF", t.pattern = "Linear", t.rotation = "0", t.singleTiles = new Array, t
    }

    function ee(e) {
        var t = new Object,
            a = Be(e),
            r = Xe.findGridIndexWithName(a.gridName),
            o = Xe.getOutlineQuadMM(r),
            i = o[0],
            n = o[1];
        t.areaType = "TopTiles", t.areaX = parseInt(a.areaX1), t.areaY = parseInt(a.areaY1), t.areaW = parseInt(a.areaX2 - a.areaX1 + 1), t.areaH = parseInt(a.areaY2 - a.areaY1 + 1), 9999 == a.areaX2 && (t.areaW = i - t.areaX), 9999 == a.areaY2 && (t.areaH = n - t.areaY);
        var s = Xe.getOutlineAlignXYMM(r);
        return t.alignX = parseInt(s.x), t.alignY = parseInt(s.y), t.masksX1X2Y1Y2 = a.masksX1X2Y1Y2, t
    }

    function te(e, t) {
        e.rgb = t.rgb, e.sku = t.sku, e.skus = VUtils.clone(t.skus), e.tileRangeAreaCoverage = VUtils.clone(t.tileRangeAreaCoverage), e.grout = t.grout, e.pattern = t.pattern, e.rotation = t.rotation
    }

    function ae(e) {
        var t = e.sku;
        "TileRange" == t && (t = e.skus[0]);
        var a = Se(t),
            r = a.width,
            o = a.height;
        return "Mosaic" == a.type && (r /= Ke.smallMosaicsW, o /= Ke.smallMosaicsH), 90 == e.rotation ? [o, r] : [r, o]
    }

    function re(e) {
        if (Ke.sku != e.sku && ("Mosaic" == Ke.type ? e.rotation = 0 : e.rotation = 0), null != st) {
            e.sku = "TileRange", e.skus = new Array, e.rgb = null;
            for (var t = new Array, a = 0; a < st.length; ++a) lt[a] && (e.skus.push(st[a].sku), t.push(ct[a]));
            e.tileRangeAreaCoverage = makeTileRangeAreaCoverage(t)
        } else e.sku = Ke.sku, e.skus = null, e.rgb = null, e.tileRangeAreaCoverage = null;
        e.grout = Qe, Ae(Ke, it) ? e.pattern = it : Ae(Ke, "Brick") ? e.pattern = "Brick" : e.pattern = "Linear", "Cabinet" != Ke.is && "Worktop" != Ke.is || (e.pattern = "Linear"), "634468" != Ke.sku && "634469" != Ke.sku && "634470" != Ke.sku || (e.pattern = "Diamond"), "SkirtingZone" == e.areaType && (e.pattern = "Linear"), "TileZone" != e.areaType && (je.areas[Rt].colour = null), qe.track("Render Fill", Ke.sku)
    }

    function oe(e, t) {
        if (gt.push(VUtils.clone(je)), ft = new Array, void 0 != je.areas[Rt].decorateAreaFloorBorderZones)
            for (var a = 0; a < je.areas[Rt].decorateAreaFloorBorderZones.length; ++a) je.areas[Rt].decorateAreaFloorBorderZones[a].grout = Qe;
        return de(Rt), !0
    }

    function ie(e, t, a) {
        if (null == Ct.sku) return e || Me("Place tiles before grout", 1500), !1;
        if (e) return !0;
        gt.push(VUtils.clone(je)), ft = new Array, Ct.grout = Qe;
        for (var r = 0; r < Ct.singleTiles.length; ++r) Ct.singleTiles[r].grout = Ct.grout;
        return Fe() && "Floor" == we(Rt) && G(Ct.sku), "SkirtingZone" == Ct.areaType && G(Ct.sku), de(Rt), qe.track("Render Grout", Qe), !0
    }

    function ne(e, t, a) {
        if (e) {
            if (null == Ct.sku) return !1;
            var r = ye(Ct);
            return r.width != r.height
        }
        if (null == Ct.sku) return Me("No tiles to rotate", 1500), !1;
        var r = ye(Ct);
        return r.width == r.height ? (Me("Cannot rotate square tiles", 1500), !1) : (gt.push(VUtils.clone(je)), ft = new Array, 0 == Ct.rotation ? Ct.rotation = 90 : Ct.rotation = 0, z(Ct), de(Rt), Ge.disableRotateMode(), !0)
    }

    function se(e, t, a) {
        if (e) {
            if (null == Ct.sku) return !1;
            var r = ye(Ct);
            return !!Ae(r, it)
        }
        if (null == Ct.sku) return Me("No tiles to change", 1500), !1;
        var r = ye(Ct);
        if (!Ae(r, it)) return Me("That tile cannot be set in a " + xe(it) + " pattern.", 1500), !1;
        gt.push(VUtils.clone(je)), ft = new Array, Ct.pattern = it, z(Ct);
        var o = null;
        if ("TopTiles" == Ct.areaType ? o = je.areas[Rt].decorateAreaBottom : "BottomTiles" == Ct.areaType && (o = je.areas[Rt].decorateAreaTop), null != o && null != o.sku) {
            var r = ye(o);
            Ae(r, it) && (o.pattern = it, z(o))
        }
        return de(Rt), Ge.disablePatternMode(), !0
    }

    function le(e) {
        setTimeout(function() {
            e()
        }, 100)
    }

    function ce(e, t) {
        function a(e, t, a) {
            if (null != t)
                if (null != t.rgb) {
                    var r = new Object;
                    r.type = "TextureColour", r.colour = t.rgb, r.tileRangeNum = -1, r.decorateArea = t, r.wholeAreaMask = ve(e), r.singleTileMask = null, n.push(r)
                } else if (a && null == t.sku) {
                var r = new Object;
                r.type = "EmptyZone", r.decorateArea = t, r.wholeAreaMask = ve(e), r.singleTileMask = null, n.push(r)
            } else if (null == t.sku) {
                var r = new Object;
                r.type = "Blank", r.wholeAreaMask = null, r.singleTileMask = null, n.push(r)
            } else {
                if ("TileRange" == t.sku)
                    for (var o = 0; o < t.skus.length; ++o) {
                        var r = new Object;
                        r.type = "Normal", r.tileRangeNum = o, r.decorateArea = t, r.wholeAreaMask = ve(e), r.singleTileMask = null, n.push(r)
                    } else {
                        var r = new Object;
                        r.type = "Normal", r.tileRangeNum = -1, r.decorateArea = t, r.wholeAreaMask = ve(e), r.singleTileMask = null, n.push(r)
                    }
                for (var i = 0; i < t.singleTiles.length; ++i) {
                    var r = new Object;
                    r.type = "Normal", r.tileRangeNum = -1, r.decorateArea = t.singleTiles[i], r.wholeAreaMask = ve(e), r.singleTileMask = {
                        x: t.areaX,
                        y: t.areaY,
                        w: t.areaW,
                        h: t.areaH
                    }, n.push(r)
                }
            }
        }
        for (var r = Xe.getOutlineQuadMM(t), o = r[0], i = r[1], n = new Array, s = ze, l = 0; l < s.tileAreaIds.length; ++l)
            for (var c = 0; c < He.tileAreas.length; ++c) {
                var d = He.tileAreas[c];
                if (d.id == s.tileAreaIds[l] && Xe.findGridIndexWithName(d.gridName) == t) {
                    var u = d.areaName;
                    if ("Tile" != d.type) {
                        var h = new Object;
                        h.type = "Colour", h.colour = e.areas[u].colour, n.push(h)
                    } else if (null != e.areas[u].colour) {
                        var h = new Object;
                        h.type = "TextureColour", h.colour = e.areas[u].colour, h.decorateArea = e.areas[u].decorateAreaTop, n.push(h);
                        for (var p = 0; p < e.areas[u].decorateAreaZones.length; ++p) a(u, e.areas[u].decorateAreaZones[p], !0)
                    } else {
                        a(u, e.areas[u].decorateAreaTop, !1), null != e.areas[u].decorateAreaBorder && "BorderSplit" != e.areas[u].decorateAreaBorder.areaType && a(u, e.areas[u].decorateAreaBorder, !1), a(u, e.areas[u].decorateAreaBottom, !1);
                        for (var p = 0; p < e.areas[u].decorateAreaZones.length; ++p) a(u, e.areas[u].decorateAreaZones[p], !0);
                        if (void 0 != e.areas[u].decorateAreaFloorBorderZones)
                            for (var p = 0; p < e.areas[u].decorateAreaFloorBorderZones.length; ++p) a(u, e.areas[u].decorateAreaFloorBorderZones[p], !0);
                        if (void 0 != e.areas[u].decorateAreaSkirtingZones)
                            for (var p = 0; p < e.areas[u].decorateAreaSkirtingZones.length; ++p) a(u, e.areas[u].decorateAreaSkirtingZones[p], !0)
                    }
                }
            }
        return n
    }

    function de(e) {
        if (Ge.usingWebGL()) {
            "Room1" == ze.id && "Area4" == e && pt.push(1);
            for (var t = fe(je, e), a = 0; a < t.length; ++a) {
                var r = t[a],
                    o = Xe.findGridIndexWithName(r.gridName);
                pt.indexOf(o) == -1 && pt.push(o)
            }
        }
    }

    function ue(e, t) {
        function a(e, t) {
            if (null == e && null != t) return !0;
            if (null != e && null == t) return !0;
            if (null == e && null == t) return !1;
            if (e.rgb != t.rgb) return !0;
            if (e.sku != t.sku) return !0;
            if (null != e.sku) {
                if (e.grout != t.grout || e.pattern != t.pattern || e.rotation != t.rotation) return !0;
                if ("TileRange" == e.sku) {
                    if (e.skus.length != t.skus.length) return !0;
                    for (var a = 0; a < e.tileRangeAreaCoverage.length; ++a)
                        for (var r = 0; r < e.tileRangeAreaCoverage[a].length; ++r)
                            if (e.tileRangeAreaCoverage[a][r] != t.tileRangeAreaCoverage[a][r]) return !0
                }
            }
            if (e.areaX != t.areaX) return !0;
            if (e.areaY != t.areaY) return !0;
            if (e.areaW != t.areaW) return !0;
            if (e.areaH != t.areaH) return !0;
            if (e.singleTiles.length != t.singleTiles.length) return !0;
            for (var a = 0; a < e.singleTiles.length; ++a) {
                if (e.singleTiles[a].sku != t.singleTiles[a].sku) return !0;
                if (e.singleTiles[a].areaX != t.singleTiles[a].areaX) return !0;
                if (e.singleTiles[a].areaY != t.singleTiles[a].areaY) return !0;
                if (e.singleTiles[a].areaW != t.singleTiles[a].areaW) return !0;
                if (e.singleTiles[a].areaH != t.singleTiles[a].areaH) return !0
            }
            return !1
        }
        for (var r in e.areas) {
            var o = !1,
                i = r;
            if ("Tile" == Pe(i)) {
                if (e.areas[i].colour != t.areas[i].colour) de(i);
                else if (a(e.areas[i].decorateAreaTop, t.areas[i].decorateAreaTop)) de(i);
                else if (a(e.areas[i].decorateAreaBorder, t.areas[i].decorateAreaBorder)) de(i);
                else if (a(e.areas[i].decorateAreaBottom, t.areas[i].decorateAreaBottom)) de(i);
                else {
                    if (e.areas[i].decorateAreaFloorBorderZones.length != t.areas[i].decorateAreaFloorBorderZones.length) {
                        de(i);
                        continue
                    }
                    if (e.areas[i].decorateAreaSkirtingZones.length != t.areas[i].decorateAreaSkirtingZones.length) {
                        de(i);
                        continue
                    }
                    for (var n = 0; n < e.areas[i].decorateAreaFloorBorderZones.length; ++n)
                        if (a(e.areas[i].decorateAreaFloorBorderZones[n], t.areas[i].decorateAreaFloorBorderZones[n])) {
                            de(i), o = !0;
                            break
                        }
                    if (!o)
                        for (var n = 0; n < e.areas[i].decorateAreaSkirtingZones.length; ++n)
                            if (a(e.areas[i].decorateAreaSkirtingZones[n], t.areas[i].decorateAreaSkirtingZones[n])) {
                                de(i), o = !0;
                                break
                            }
                }
                if (!o)
                    if (e.areas[i].decorateAreaZones.length != t.areas[i].decorateAreaZones.length) de(i);
                    else
                        for (var n = 0; n < e.areas[i].decorateAreaZones.length; ++n)
                            if (a(e.areas[i].decorateAreaZones[n], t.areas[i].decorateAreaZones[n])) {
                                de(i);
                                break
                            }
            } else e.areas[i].colour != t.areas[i].colour && de(i)
        }
    }

    function he() {
        if (Ge.usingWebGL()) {
            pt = new Array;
            for (var e = 0; e < Xe.getNumGrids(); ++e) pt.push(e)
        }
    }

    function pe() {
        if (Ge.usingWebGL())
            for (var e in je.areas) {
                var t = e,
                    a = je.areas[t],
                    r = !1;
                null != a.colour ? r = !0 : "Tile" == Pe(t) && (null != a.decorateAreaTop.sku && (r = !0), null != a.decorateAreaBottom && null != a.decorateAreaBottom.sku && (r = !0), null != a.decorateAreaBorder && null != a.decorateAreaBorder.sku && (r = !0), a.decorateAreaZones.length > 0 && (r = !0), void 0 != a.decorateAreaFloorBorderZones && a.decorateAreaFloorBorderZones.length > 0 && (r = !0), void 0 != a.decorateAreaSkirtingZones && a.decorateAreaSkirtingZones.length > 0 && (r = !0)), r && de(t)
            }
    }

    function ge() {
        for (var e in je.areas) {
            var t = e,
                a = je.areas[t];
            if ("Tile" == Pe(t)) {
                if (null == a.colour) {
                    if (null != a.decorateAreaTop.sku && a.decorateAreaTop.singleTiles.length > 0) return !0;
                    if (null != a.decorateAreaBottom && null != a.decorateAreaBottom.sku && a.decorateAreaBottom.singleTiles.length > 0) return !0
                }
                for (var r = 0; r < a.decorateAreaZones.length; ++r)
                    if (a.decorateAreaZones[r].singleTiles.length > 0) return !0
            }
        }
        return !1
    }

    function fe(e, t) {
        tileAreasList = new Array;
        for (var a = Ie(e.roomId), r = e.areas[t], o = e.roomId.replace("Room", "Room ") + " " + t.replace("Area", "Area "), i = 0; i < a.tileAreaIds.length; ++i)
            if (a.tileAreaIds[i].indexOf(o) != -1)
                for (var n = 0; n < He.tileAreas.length; ++n) {
                    var s = He.tileAreas[n];
                    s.id == a.tileAreaIds[i] && tileAreasList.push(s)
                }
            return tileAreasList
    }

    function ve(e) {
        var t = new Object;
        return t.x = je.areas[e].decorateAreaTop.areaX, t.y = je.areas[e].decorateAreaTop.areaY, t.w = je.areas[e].decorateAreaTop.areaW, t.h = je.areas[e].decorateAreaTop.areaY + je.areas[e].decorateAreaTop.areaH, null != je.areas[e].decorateAreaBottom && (t.h = je.areas[e].decorateAreaBottom.areaY + je.areas[e].decorateAreaBottom.areaH - je.areas[e].decorateAreaTop.areaY), t
    }

    function me(e, t, a) {
        var r = Xe.getGridIndexAtScreenXY(e, t, a);
        if (r == -1) return null;
        for (var o = Xe.getGridName(r), i = ze.id.replace("Room", "Room ") + " ", n = 0; n < He.tileAreas.length; ++n) {
            var s = He.tileAreas[n];
            if (s.id.indexOf(i) != -1 && s.gridName == o) {
                if ("Tile" != s.type) return s.areaName;
                var l = Xe.getTextureXYAtScreenXY(r, e, t),
                    c = l.x,
                    d = l.y;
                if (c >= s.areaX1 && c <= s.areaX2 && d >= s.areaY1 && d <= s.areaY2) {
                    for (var u = !1, h = 0; h < s.masksX1X2Y1Y2.length; ++h) {
                        var p = s.masksX1X2Y1Y2[h];
                        if ("" != p && "-" != p) {
                            var g = p.split(","),
                                f = parseInt(g[0]),
                                v = parseInt(g[1]),
                                m = parseInt(g[2]),
                                b = parseInt(g[3]);
                            if (c >= f && c <= v && d >= m && d <= b) {
                                u = !0;
                                break
                            }
                        }
                    }
                    if (!u) return s.areaName
                }
            }
        }
        return null
    }

    function be(e) {
        var t = ze.id.replace("Room", "Room ");
        t += " " + e.replace("Area", "Area ");
        for (var a = 0; a < He.tileAreas.length; ++a) {
            var r = He.tileAreas[a];
            if (r.id.indexOf(t) != -1 && "" != r.outdoor) return "Outdoor"
        }
        return "Indoor"
    }

    function Te(e) {
        var t = ze.id.replace("Room", "Room ");
        t += " " + e.replace("Area", "Area ");
        for (var a = 0; a < He.tileAreas.length; ++a) {
            var r = He.tileAreas[a];
            if (r.id.indexOf(t) != -1 && "" != r.fireplace) return !0
        }
        return !1
    }

    function ke(e) {
        var t = ze.id.replace("Room", "Room ");
        t += " " + e.replace("Area", "Area ");
        for (var a = 0; a < He.tileAreas.length; ++a) {
            var r = He.tileAreas[a];
            if (r.id.indexOf(t) != -1 && "" != r.glassSplashback) return !0
        }
        return !1
    }

    function we(e) {
        var t = ze.id.replace("Room", "Room ");
        t += " " + e.replace("Area", "Area ");
        for (var a = 0; a < He.tileAreas.length; ++a) {
            var r = He.tileAreas[a];
            if (r.id.indexOf(t) != -1) {
                if ("" != r.areaType) return r.areaType;
                if (r.gridName.toLowerCase().indexOf("floor") != -1) return "Floor"
            }
        }
        return "Wall"
    }

    function ye(e) {
        return "TileRange" == e.sku ? tile = Se(e.skus[0]) : tile = Se(e.sku), tile
    }

    function Se(e) {
        for (var t = 0; t < He.tiles.length; ++t)
            if (He.tiles[t].sku == e) return He.tiles[t];
        return null
    }

    function $e(e, t) {
        return ("Diamond" != t || e.width == e.height) && ("Herringbone" != t && "BlockHerringbone" != t || e.width != e.height)
    }

    function Ae(e, t) {
        return ("Linear" == t || "Wood" != e.is) && (("Diamond" != t || e.width == e.height) && (("Herringbone" != t && "BlockHerringbone" != t || e.width != e.height) && (e.patternsAllowed.indexOf(",All,") != -1 || e.patternsAllowed.indexOf("," + t + ",") != -1)))
    }

    function xe(e) {
        for (var t = 0; t < Tt.length; ++t)
            if (Tt[t] == e) return kt[t];
        return ""
    }

    function Re(e, t, a) {
        var r = Ce(e);
        return null == a ? r : "SingleTile" != t && "BorderTile" != t && r.shininess > a.shininess ? r : a
    }

    function Ce(e) {
        var t = new Object;
        return t.normalScale = 1, t.reflectivity = 0, t.shininess = 6, t.HDRalpha = .7, null == e ? t : (e.isGlassSplashback && e.finish.toLowerCase().indexOf(",glass,") != -1 ? (t.normalScale = 1, t.reflectivity = 1, t.shininess = 41, t.HDRalpha = 1) : e.finish.toLowerCase().indexOf(",polished,") != -1 ? (t.normalScale = 1, t.reflectivity = 1, t.shininess = 50, t.HDRalpha = 1) : e.finish.toLowerCase().indexOf(",glazed,") != -1 ? (t.normalScale = 1, t.reflectivity = 1, t.shininess = 45, t.HDRalpha = 1) : e.finish.toLowerCase().indexOf(",gloss,") != -1 ? (t.normalScale = 1, t.reflectivity = .9, t.shininess = 40, t.HDRalpha = .9) : e.finish.toLowerCase().indexOf(",satin,") != -1 && (t.normalScale = 1, t.reflectivity = .4, t.shininess = 20, t.HDRalpha = 1), t)
    }

    function Ie(e) {
        for (var t = 0; t < He.rooms.length; ++t)
            if (He.rooms[t].id == e) return He.rooms[t];
        return null
    }

    function De(e, t, a) {
        if ("Tile" != Pe(e)) return new VPoint(0, 0);
        var r = Oe(e);
        return Xe.getTextureXYAtScreenXY(r, t, a)
    }

    function Oe(e) {
        var t = Be(e),
            a = Xe.findGridIndexWithName(t.gridName);
        return a
    }

    function Pe(e) {
        var t = Be(e);
        return t.type
    }

    function Be(e) {
        var t = ze.id.replace("Room", "Room ");
        t += " " + e.replace("Area", "Area ");
        for (var a = 0; a < He.tileAreas.length; ++a) {
            var r = He.tileAreas[a];
            if (r.id.indexOf(t) != -1) return r
        }
        throw alert("ERROR: getAreaRefTileArea(): curRoom=" + ze.id + " areaRef=" + e), "err"
    }

    function Fe() {
        for (var e in je.areas) {
            var t = e,
                a = Be(t);
            if ("" != a.skirting) return !0
        }
        return !1
    }

    function Me(e, t) {
        return null != ht && (clearTimeout(ht), ht = null), null == e ? void $(".vit-message").hide() : ($(".vit-message img").hide(), $(".vit-message p").html(e), $(".vit-message").show(), void(void 0 != t && (1500 == t && (t = 2500), ht = setTimeout(function() {
            ht = null, $(".vit-message").hide()
        }, t))))
    }

    function Ee(e) {
        var t = e;
        return t
    }

    function We(e, t, a, r) {
        var o = Math.sqrt(Math.abs(a - e) * Math.abs(a - e) + Math.abs(r - t) * Math.abs(r - t));
        return o
    }

    function Le() {
        je = Ge.getData().curDecorateData, _e = Ge.getData().curRoomStylesModeOn, nt = Ge.getData().curDecorateMode, ze = Ge.getData().curRoom, Ke = Ge.getData().curTile, Qe = Ge.getData().curGroutColour, Je = Ge.getData().curWallColour, et = Ge.getData().curCabinetColour,
            tt = Ge.getData().curWorktopColour, at = Ge.getData().curSingleTileMode, rt = Ge.getData().curRotateProductMode, ot = Ge.getData().curChangePatternMode, it = Ge.getData().curPattern, st = Ge.getData().curTilingAsRangeTiles, lt = Ge.getData().curTilingAsRangeEnable, ct = Ge.getData().curTilingAsRangePercentages
    }

    function Ye(e, t, a, r) {
        var o = {
            base64Data: e.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, ""),
            folder: t,
            filename: a
        };
        $.post("vsavebase64.php", o, function(e) {
            null != r && r()
        })
    }
    var Ue = this,
        Ge = e,
        Ve = t,
        He = a,
        Xe = r,
        Ne = o,
        qe = i,
        Ze = .7071067811881,
        je = null,
        _e = !1,
        ze = null,
        Ke = null,
        Qe = null,
        Je = null,
        et = null,
        tt = null,
        at = null,
        rt = null,
        ot = null,
        it = null,
        nt = null,
        st = null,
        lt = null,
        ct = null,
        dt = 150,
        ut = !0,
        ht = null,
        pt = new Array,
        gt = new Array,
        ft = new Array,
        vt = null,
        mt = null;
    Ge.usingWebGL() && (Le(), vt = new SupertextureWebGL(100, 100, "FFFFFF", Xe.getColourTextureCanvas()), mt = new SupertextureWebGL(100, 100, "7F7FFF", Xe.getNormalTextureCanvas()));
    var bt = new VTileSet,
        Tt = ["Linear", "Brick", "Diamond", "Herringbone", "BlockHerringbone", "3/4BrickBond"],
        kt = ["Linear", "Brick", "Diamond", "Herringbone", "Block Herringbone", "&frac34; Brick Bond"],
        wt = -1,
        yt = null,
        St = null,
        $t = -1,
        At = -1,
        xt = -1,
        Rt = null,
        Ct = null,
        It = -1,
        Dt = -1,
        Ot = -1,
        Pt = -1,
        Bt = -1,
        Ft = -1,
        Mt = "",
        Et = -1,
        Wt = -1,
        Lt = -1,
        Yt = -1,
        Ut = -1,
        Gt = -1,
        Vt = -1,
        Ht = -1,
        Xt = -1,
        Nt = null,
        qt = -1,
        Zt = -1,
        jt = -1,
        _t = -1,
        zt = -1,
        Kt = -1,
        Qt = -1,
        Jt = -1,
        ea = -1,
        ta = -1,
        aa = -1,
        ra = -1,
        oa = 150;
    VUtils.isTabletOrPhoneDevice() && (oa = 300);
    var ia = 300,
        na = !1;
    VUtils.isTabletOrPhoneDevice() && (na = !0);
    var sa = "";
    this.upgradeDecorateData = function(e) {
        for (var t in e.areas) {
            var a = t,
                r = e.areas[a];
            "Tile" == Pe(a) && (null != r.decorateAreaTop && void 0 == r.decorateAreaTop.rgb && (r.decorateAreaTop.rgb = null), null != r.decorateAreaBorder && void 0 == r.decorateAreaBorder.rgb && (r.decorateAreaBorder.rgb = null), null != r.decorateAreaBottom && void 0 == r.decorateAreaBottom.rgb && (r.decorateAreaBottom.rgb = null), void 0 == r.decorateAreaFloorBorderZones && (r.decorateAreaFloorBorderZones = new Array), void 0 == r.decorateAreaSkirtingZones && (r.decorateAreaSkirtingZones = new Array))
        }
    }, this.getSortedTilesUsed = function() {
        function e(e) {
            if (null != e && null != e.sku) {
                if ("TileRange" == e.sku)
                    for (var a = 0; a < e.skus.length; ++a) t.indexOf(e.skus[a]) == -1 && t.push(e.skus[a]);
                else t.indexOf(e.sku) == -1 && t.push(e.sku);
                for (var a = 0; a < e.singleTiles.length; ++a) t.indexOf(e.singleTiles[a].sku) == -1 && t.push(e.singleTiles[a].sku)
            }
        }
        var t = new Array;
        for (var a in je.areas) {
            var r = a,
                o = je.areas[r];
            if ("Tile" == Pe(r)) {
                e(je.areas[r].decorateAreaTop), e(je.areas[r].decorateAreaBorder), e(je.areas[r].decorateAreaBottom);
                for (var i = 0; i < je.areas[r].decorateAreaZones.length; ++i) e(je.areas[r].decorateAreaZones[i]);
                if (void 0 != je.areas[r].decorateAreaFloorBorderZones)
                    for (var i = 0; i < je.areas[r].decorateAreaFloorBorderZones.length; ++i) e(je.areas[r].decorateAreaFloorBorderZones[i]);
                if (void 0 != je.areas[r].decorateAreaSkirtingZones)
                    for (var i = 0; i < je.areas[r].decorateAreaSkirtingZones.length; ++i) e(je.areas[r].decorateAreaSkirtingZones[i])
            }
        }
        return t.length > 1 && t.sort(function(e, t) {
            return Se(e).sortOrder - Se(t).sortOrder
        }), t
    }, this.abort = function() {
        "None" != outlines.getMode() ? outlines.setMode("None") : at && outlines.clear()
    }, this.newRoomLoading = function() {
        Le(), ut = !0
    }, this.roomLoaded = function(e) {
        if (dt = 150, "Room17" == ze.id && (dt = 112), Le(), ut = !1, e) je = new Object, je.roomId = ze.id, je.areas = new Object, n(), Ge.setNewCurDecorateData(je);
        else
            for (var t in je.areas) {
                var a = t,
                    r = je.areas[a];
                null != r.sku && "TileRange" != r.sku && null == Se(r.sku) && (r.sku = null)
            }
        gt = new Array, ft = new Array, outlines.setupNewRoom(ze)
    }, this.setInitialDecoration = function() {
        Le(), pe()
    }, this.predecorateInitialRoom = function(e) {
        Le();
        var t = Se(e);
        for (var a in je.areas) {
            var r = a;
            if (!("Indoor" == be(r) && "Outdoor" == t.canGoWhere || "Outdoor" == be(r) && "Indoor" == t.canGoWhere || "Floor" == we(r) && "Wall" == t.canGo || "Wall" == we(r) && "Floor" == t.canGo || m(Oe(r)))) {
                var o = je.areas[r].decorateAreaTop;
                o.sku = t.sku, o.skus = null, o.tileRangeAreaCoverage = null, o.grout = "FFFFFF", Ae(t, "Brick") ? o.pattern = "Brick" : o.pattern = "Linear", o.rotation = 0, o.colour = null
            }
        }
        pe(), Ge.refreshDecorate()
    }, this.isRoomDecorated = function() {
        for (var e in je.areas) {
            var t = e,
                a = je.areas[t];
            if (null != a.colour) return !0;
            if ("Tile" == Pe(t)) {
                if (null != a.decorateAreaTop.sku) return !0;
                if (null != a.decorateAreaBottom && null != a.decorateAreaBottom.sku) return !0;
                if (null != a.decorateAreaBorder && null != a.decorateAreaBorder.sku) return !0;
                if (a.decorateAreaZones.length > 0) return !0;
                if (void 0 != a.decorateAreaFloorBorderZones && a.decorateAreaFloorBorderZones.length > 0) return !0;
                if (void 0 != a.decorateAreaSkirtingZones && a.decorateAreaSkirtingZones.length > 0) return !0
            }
        }
        return !1
    }, this.roomContainsSingleTiles = function() {
        return ge()
    }, this.clearAll = function() {
        gt.push(VUtils.clone(je)), ft = new Array, n(), ue(gt[gt.length - 1], je), Ge.setUnsavedChanges()
    }, this.undo = function() {
        gt.length > 0 && (ue(je, gt[gt.length - 1]), ft.push(je), je = VUtils.clone(gt.pop()), Ge.setNewCurDecorateData(je)), Ge.setUnsavedChanges()
    }, this.redo = function() {
        ft.length > 0 && (ue(je, ft[ft.length - 1]), gt.push(VUtils.clone(je)), je = VUtils.clone(ft.pop()), Ge.setNewCurDecorateData(je)), Ge.setUnsavedChanges()
    }, this.anythingToUndo = function() {
        return gt.length > 0
    }, this.anythingToRedo = function() {
        return ft.length > 0
    }, this.canDecorate = function(e, t) {
        return Le(), _e ? !VUtils.isTabletOrPhoneDevice() && s(!0, e, t) : l(!0, e, t)
    }, this.decorate = function(e, t) {
        return Le(), _e ? !!VUtils.isTabletOrPhoneDevice() && s(!0, e, t) : !!l(!1, e, t) && (Ge.refreshDecorate(), !0)
    }, this.doLayFloorBorder = function() {
        E(!1, Ot, Pt), Ge.refreshDecorate()
    }, this.doGroutFloorBorder = function() {
        oe(Ot, Pt), Ge.refreshDecorate()
    }, this.doDeleteFloorBorder = function() {
        gt.push(VUtils.clone(je)), ft = new Array, je.areas[yt].decorateAreaFloorBorderZones = new Array, de(yt), Ge.refreshDecorate()
    }, this.doAddZone = function() {
        VUtils.isTabletOrPhoneDevice() ? Me("Tap on a surface to create a tile area.", 3e4) : Me("Click on a surface to create a tile area.", 3e4), outlines.setMode("WaitingToAddZone")
    }, this.doTileZone = function() {
        v(!1, Ot, Pt) && (Ve.trackTileArea(), at && Ge.forceSingleTileModeOff(), Ge.refreshDecorate())
    }, this.doGroutZone = function() {
        ie(!1, Ot, Pt), Ge.refreshDecorate()
    }, this.doDeleteZone = function() {
        Ve.trackDeleteArea(), gt.push(VUtils.clone(je)), ft = new Array, je.areas[yt].decorateAreaZones.splice($t, 1), de(yt), Ge.refreshDecorate()
    }, this.doDeleteGlassSplashback = function() {
        Ve.trackDeleteArea(), gt.push(VUtils.clone(je)), ft = new Array, je.areas[yt].decorateAreaZones.splice($t, 1), de(yt), Ge.refreshDecorate()
    }, this.doEditZone = function(e, t) {
        if (t && (gt.push(VUtils.clone(je)), ft = new Array), e) {
            Ve.trackEditArea();
            var a = je.areas[yt].decorateAreaZones[$t];
            Ut = a.areaX, Gt = a.areaY, Vt = a.areaW, Ht = a.areaH, VUtils.isTabletOrPhoneDevice() ? Me("Tap anywhere in the room once you've finished resizing your area.", 1500) : Me("Click anywhere in the room once you've finished resizing your area.", 1500)
        } else Ut = Et, Gt = Wt, Vt = Lt, Ht = Yt;
        outlines.drawZone(wt, Ut, Gt, Vt, Ht, je.areas[yt], St.masksX1X2Y1Y2, !1, !0, ""), outlines.setMode("WaitingToEditZone")
    }, this.doEditBorder = function(e) {
        if (e) {
            Ve.trackEditBorder(), aa = St.areaY, ra = St.areaH;
            var t = Se(St.sku);
            VUtils.isTabletOrPhoneDevice() ? t.isCapping ? Me("Tap anywhere in the room once you've finished editing your capping.", 1500) : t.isFinishingStrip ? Me("Tap anywhere in the room once you've finished editing your finishing strip.", 1500) : Me("Tap anywhere in the room once you've finished editing your border.", 1500) : t.isCapping ? Me("Click anywhere in the room once you've finished editing your capping.", 1500) : t.isFinishingStrip ? Me("Click anywhere in the room once you've finished editing your finishing strip.", 1500) : Me("Click anywhere in the room once you've finished editing your border.", 1500)
        } else aa = ea, ra = ta;
        outlines.setBorderGrabHandles(wt, aa, ra, St.areaX, St.areaW, oa), outlines.drawBorder(wt, aa, ra, je.areas[yt], St.masksX1X2Y1Y2, !1, !0, ""), outlines.setMode("WaitingToEditBorder")
    }, this.doDeleteBorder = function() {
        Ve.trackDeleteBorder(), gt.push(VUtils.clone(je)), ft = new Array;
        var e = je.areas[Rt].decorateAreaTop,
            t = je.areas[Rt].decorateAreaBorder,
            a = je.areas[Rt].decorateAreaBottom,
            r = -t.areaH;
        e.areaH += t.areaH + a.areaH, Z(a, r);
        for (var o = 0; o < a.singleTiles.length; ++o) {
            var i = VUtils.clone(a.singleTiles[o]);
            e.singleTiles.push(i)
        }
        je.areas[Rt].decorateAreaBorder = null, je.areas[Rt].decorateAreaBottom = null, U(), de(yt), Ge.refreshDecorate()
    }, this.doGroutBorder = function() {
        gt.push(VUtils.clone(je)), ft = new Array, O(), Ge.refreshDecorate()
    }, this.doChangeBorder = function() {
        gt.push(VUtils.clone(je)), ft = new Array, P(), Ge.refreshDecorate()
    }, this.doMosaicBorder = function() {
        Ve.trackLayMosaicBorder(), C(!1, Ot, Pt), Ge.refreshDecorate()
    }, this.doMosaicFill = function() {
        Ve.trackFillWithMosaic(), v(!1, Ot, Pt), Ge.refreshDecorate()
    }, this.roomAllowsGlassSplashback = function() {
        for (var e in je.areas) {
            var t = e;
            if (ke(t)) return !0
        }
        return !1
    }, this.addGlassSplashback = function(e) {
        st = null, lt = null, ct = null, gt.push(VUtils.clone(je)), ft = new Array;
        for (var t in je.areas) {
            var a = t;
            if (ke(a)) break
        }
        for (var r = 0; r < je.areas[a].decorateAreaZones.length; ++r) {
            var o = je.areas[a].decorateAreaZones[r].sku;
            if ("TileRange" != o && Se(o).isGlassSplashback) {
                je.areas[a].decorateAreaZones.splice(r, 1);
                break
            }
        }
        var i = J(a);
        i.areaType = "TileZone";
        var n = Be(a),
            s = n.glassSplashback.split(",");
        i.areaW = 10 * e.widthCM, i.areaH = 10 * e.heightCM, i.areaX = parseInt(s[0]) - i.areaW / 2, i.areaY = parseInt(s[1]) - i.areaH, i.alignX = i.areaX, i.alignY = i.areaY, je.areas[a].decorateAreaZones.push(i);
        var l = VUtils.clone(Ke);
        Ke = e, re(je.areas[a].decorateAreaZones[je.areas[a].decorateAreaZones.length - 1]), Ke = VUtils.clone(l), de(a), Ge.refreshDecorate()
    }, this.doFillWholeArea = function() {
        gt.push(VUtils.clone(je)), ft = new Array, je.areas[yt].colour = null, je.areas[yt].decorateAreaTop = J(yt), je.areas[yt].decorateAreaBorder = null, je.areas[yt].decorateAreaBottom = null, je.areas[yt].decorateAreaZones = new Array;
        var e = je.areas[yt].decorateAreaTop;
        if (re(e), de(yt), "Floor" == we(yt))
            for (var t in je.areas) {
                var a = t;
                if (a != yt && "Floor" == we(a)) {
                    if ("Outdoor" == Ke.canGoWhere && "Indoor" == be(a)) continue;
                    if ("Indoor" == Ke.canGoWhere && "Outdoor" == be(a)) continue;
                    var r = je.areas[a].decorateAreaTop;
                    re(r), de(a)
                }
            }
        Ge.refreshDecorate()
    }, this.doFillHalfWall = function() {
        gt.push(VUtils.clone(je)), ft = new Array, je.areas[yt].colour = null, je.areas[yt].decorateAreaTop = J(yt), je.areas[yt].decorateAreaBorder = null, je.areas[yt].decorateAreaBottom = null, je.areas[yt].decorateAreaZones = new Array;
        var e = Be(yt),
            t = parseInt(e.splitY),
            a = .1,
            r = je.areas[yt].decorateAreaTop;
        r.areaH = t, r.alignY = t;
        var o = J(yt);
        o.areaType = "BorderSplit", o.areaY = t, o.alignY = t, o.areaH = a, o.rgb = null, o.grout = r.grout, je.areas[yt].decorateAreaBorder = o;
        var i = J(yt);
        i.areaType = "BottomTiles", i.areaY = t + a, i.alignY = t + a, i.areaH -= t + a, te(i, r), je.areas[yt].decorateAreaBottom = i, i.rgb = null, i.sku = null, i.skus = null, j(r, i), z(r), z(i), _(r), _(i), re(i), de(yt), Ge.refreshDecorate()
    }, this.doCreateSplashback = function() {
        gt.push(VUtils.clone(je)), ft = new Array;
        var e = J(yt);
        e.areaType = "TileZone";
        var t = Be(yt),
            a = t.splashback.split(",");
        e.areaX = parseInt(a[0]), e.areaY = parseInt(a[2]), e.areaW = parseInt(a[1]) - e.areaX, e.areaH = parseInt(a[3]) - e.areaY, e.alignX = e.areaX, e.alignY = e.areaY, je.areas[yt].decorateAreaZones.push(e), re(je.areas[yt].decorateAreaZones[je.areas[yt].decorateAreaZones.length - 1]), de(yt), Ge.refreshDecorate()
    }, this.doFillFloorAndAddSkirting = function() {
        gt.push(VUtils.clone(je)), ft = new Array, je.areas[yt].colour = null, je.areas[yt].decorateAreaTop = J(yt), je.areas[yt].decorateAreaBorder = null, je.areas[yt].decorateAreaBottom = null, je.areas[yt].decorateAreaZones = new Array;
        var e = je.areas[yt].decorateAreaTop;
        if (re(e), de(yt), "Floor" == we(yt))
            for (var t in je.areas) {
                var a = t;
                if (a != yt && "Floor" == we(a)) {
                    if ("Outdoor" == Ke.canGoWhere && "Indoor" == be(a)) continue;
                    if ("Indoor" == Ke.canGoWhere && "Outdoor" == be(a)) continue;
                    var r = je.areas[a].decorateAreaTop;
                    re(r), de(a)
                }
            }
        Y(), Ge.refreshDecorate()
    }, this.doChangeSkirting = function() {
        gt.push(VUtils.clone(je)), ft = new Array, Y(), Ge.refreshDecorate()
    }, this.doDeleteSkirting = function() {
        gt.push(VUtils.clone(je)), ft = new Array, L(), Ge.refreshDecorate()
    }, this.doDrawArea = function() {
        gt.push(VUtils.clone(je)), ft = new Array;
        var e = J(yt);
        e.areaType = "TileZone", e.areaX = Ot - 225, e.areaY = Pt - 225, e.areaW = 450, e.areaH = 450, e.alignX = e.areaX, e.alignY = e.areaY, je.areas[yt].decorateAreaZones.push(e), re(je.areas[yt].decorateAreaZones[je.areas[yt].decorateAreaZones.length - 1]), $t = je.areas[yt].decorateAreaZones.length - 1, de(yt), Ge.refreshDecorate(), Ue.doEditZone(!0, !1)
    }, this.doMoveSingleTile = function(e) {
        var t = St.singleTiles[At];
        e ? (_t = wt, zt = yt, Kt = St, Qt = t.areaX, Jt = t.areaY, Me("Move the single tile to a new position.", 1500)) : (_t = Xt, zt = Nt, Kt = qt, Qt = Zt - t.areaW / 2, Jt = jt - t.areaH / 2);
        var a = ia,
            r = ve(Rt);
        Jt + t.areaH / 2 > r.h / 4 * 3 && (a = -ia), outlines.setSingleTileGrabHandle(St.areaX, St.areaY, St.areaW, St.areaH, a);
        var o = t.areaW,
            i = t.areaH;
        Kt.rotation != St.rotation && (o = t.areaH, i = t.areaW), "Diamond" == t.pattern && "Diamond" != Kt.pattern ? (o *= Ze, i *= Ze) : "Diamond" != t.pattern && "Diamond" == Kt.pattern && (o /= Ze, i /= Ze), outlines.drawSingleTile(-1, -1, _t, Qt, Jt, o, i, Kt.areaX, Kt.areaY, Kt.areaW, Kt.areaH, Kt.masksX1X2Y1Y2, Kt.pattern, !1, !1, na), outlines.setMode("WaitingToDragSingleTile")
    }, this.doDeleteSingleTile = function() {
        gt.push(VUtils.clone(je)), ft = new Array, St.singleTiles.splice(At, 1), de(yt), Ge.refreshDecorate()
    }, this.doChangeSingleTile = function() {
        gt.push(VUtils.clone(je)), ft = new Array;
        var e = St.singleTiles[At],
            t = e.areaX + e.areaW / 2,
            a = e.areaY + e.areaH / 2;
        e.sku = Ke.sku, Q(e), de(yt), Ge.refreshDecorate()
    };
    var la = 1;
    this.getWebGLRoomRenderCanvas = function(e) {
        function t(e, r, o, n) {
            if (o == r.length) return void n();
            var s = Xe.getOutlineQuadMM(l),
                c = s[0],
                u = s[1],
                h = r[o];
            if (0 == o && (e ? vt.reuse(c, u, "FFFFFF", !1) : mt.reuse(c, u, "7F7FFF", !1)), "Blank" == h.type) {
                for (var p = !0, g = 0; g < r.length; ++g)
                    if ("Blank" != r[g].type) {
                        p = !1;
                        break
                    }
                p && (d.colourRRGGBB = "FFFFFF", d.type = "Colour"), t(e, r, o + 1, n)
            } else if ("Colour" == h.type) d.colourRRGGBB = h.colour, null == h.colour && (d.colourRRGGBB = "FFFFFF"), d.type = "Colour", t(e, r, o + 1, n);
            else if ("TextureColour" == h.type) {
                d.lighting = Re(null, "", d.lighting), d.type = "Texture";
                var f = h.decorateArea;
                e ? (vt.colourArea(h.colour, f.areaX, f.areaY, f.areaW, f.areaH, h.wholeAreaMask, f.masksX1X2Y1Y2), d.supertexture = vt, d.supertextureCanvas = vt.getCanvas()) : (mt.colourArea("FF7FFF", f.areaX, f.areaY, f.areaW, f.areaH, h.wholeAreaMask, f.masksX1X2Y1Y2), d.supernormal = mt, d.supernormalCanvas = mt.getCanvas()), t(e, r, o + 1, n)
            } else if ("EmptyZone" == h.type) {
                d.lighting = Re(null, "", d.lighting), d.type = "Texture";
                var f = h.decorateArea;
                e ? (vt.colourZone("C0C0FF", "000000", 3, f.areaX, f.areaY, f.areaW, f.areaH, h.wholeAreaMask, f.masksX1X2Y1Y2), d.supertexture = vt, d.supertextureCanvas = vt.getCanvas()) : (mt.colourArea("FF7FFF", f.areaX, f.areaY, f.areaW, f.areaH, h.wholeAreaMask, f.masksX1X2Y1Y2), d.supernormal = mt, d.supernormalCanvas = mt.getCanvas()), t(e, r, o + 1, n)
            } else {
                var f = h.decorateArea,
                    v = f.sku;
                "TileRange" == v && (v = f.skus[h.tileRangeNum]);
                var m = h.wholeAreaMask,
                    b = h.singleTileMask,
                    T = Se(v),
                    k = f.pattern;
                "Wood" == T.is && (k = "StaggerWood"), "SingleTile" == f.areaType && "Diamond" == k && (k = "SingleTileDiamond");
                var w = f.rotation,
                    y = "Wall";
                Xe.getGridName(l).indexOf("FLOOR") != -1 && (y = "Floor"), d.lighting = Re(T, f.areaType, d.lighting), d.type = "Texture";
                var S = !1;
                "" != i.dontAddVerticalGroutAtAlignmentPoint && (S = !0), vtime("...loading tile set"), a(T, e, function() {
                    if (vtime("...loaded tile set"), e) {
                        if (vt.tileAndGroutArea(y, k, w, T, f.areaX, f.areaY, f.areaW, f.areaH, m, b, bt, f.alignX, f.alignY, f.grout, f.masksX1X2Y1Y2, f.tileRangeAreaCoverage, h.tileRangeNum, S), d.supertexture = vt, d.supertextureCanvas = vt.getCanvas(), 0) {
                            var a = "";
                            Ye(vt.getCanvas(), a, "supertexture-" + l + ".png", null)
                        }
                    } else if (mt.tileAndGroutArea(y, k, w, T, f.areaX, f.areaY, f.areaW, f.areaH, m, b, bt, f.alignX, f.alignY, "7F7FFF", f.masksX1X2Y1Y2, f.tileRangeAreaCoverage, h.tileRangeNum, S), d.supernormal = mt, d.supernormalCanvas = mt.getCanvas(), 0) {
                        var a = "";
                        Ye(mt.getCanvas(), a, "supernormal-" + l + ".png", null)
                    }
                    t(e, r, o + 1, n)
                })
            }
        }

        function a(e, t, a) {
            bt.setup(e);
            var r = "tiles/" + e.sku + "_c.png?" + uncache;
            t || (r = "tiles/" + e.sku + "_n.png?" + uncache), VUtils.isTabletOrPhoneDevice() && (r = r.replace("tiles/", "tiles-reduced/")), location.href.indexOf("testnewvariations") != -1 && (r = r.replace("tiles/", "tiles-new-variations/")), bt.load(Ee(r), function() {
                a()
            })
        }

        function r(t) {
            for (var a = new Array, r = 0; r < Xe.getNumGrids(); ++r) a.push(null);
            a[l] = t, Xe.renderStockScene(a), le(function() {
                Ue.getWebGLRoomRenderCanvas(e)
            })
        }
        vout("getWebGLRoomRenderCanvas"), vtime("getWebGLRoomRenderCanvas(): Start"), setWebGLTesting(), Le();
        var o = je,
            i = ze;
        if (0 == pt.length) return vtime("getWebGLRoomRenderCanvas(): End"), setWebGLOK(), void e(Xe.getRenderedSceneCanvas());
        for (var n = new Array, s = 0; s < Xe.getNumGrids(); ++s) n.push(null);
        var l = pt.pop();
        vout("REDRAWING GRID INDEX " + l);
        var c = ce(o, l),
            d = new Object;
        d.lighting = null, t(!0, c, 0, function() {
            t(!1, c, 0, function() {
                r(d)
            })
        })
    }
}

function makeTileRangeAreaCoverage(e) {
    for (var t = 10, a = 10, r = getRandomTileSet(t, a, e), o = new Array, i = 0; i < 10; ++i) {
        o.push(new Array);
        for (var n = 0; n < 10; ++n) o[o.length - 1].push(r[n * t + i])
    }
    return o
}

function old_simple_makeTileRangeAreaCoverage(e) {
    vobj(e);
    for (var t = new Array, a = 0; a < e.length; ++a)
        for (var r = 0; r < e[a]; ++r) t.push(a);
    for (var o = new Array, i = 0; i < 10; ++i) {
        o.push(new Array);
        for (var n = 0; n < 10; ++n) o[o.length - 1].push(-1)
    }
    VUtils.setRandomSeed(1);
    for (var s = 222, n = 0; n < 10; ++n)
        for (var i = 0; i < 10; ++i) {
            for (var l;;) {
                var c = s;
                for (vout("beforebeforebeforebeforebeforebeforebefore"); c-- > 0 && (l = t[Math.floor(100 * VUtils.getRandom())], vout("1tileNum=" + l), o[(i + 10 - 1) % 10][n] == l || o[(i + 1) % 10][n] == l || o[i][(n + 10 - 1) % 10] == l || o[i][(n + 1) % 10] == l););
                break
            }
            o[i][n] = l
        }
    for (var d = "", n = 0; n < 10; ++n) {
        for (var i = 0; i < 10; ++i) d += o[i][n];
        d += "\n"
    }
    vout("----------"), vout(d), vout("----------");
    for (var a = 0; a < e.length; ++a) {
        for (var u = 0, n = 0; n < 10; ++n)
            for (var i = 0; i < 10; ++i) o[i][n] == a && ++u;
        vout("tileNum " + a + " qty=" + u)
    }
    return o
}

function Outlines(e, t, a) {
    function r(e, t, a) {
        var r = [0, -5, 2, -3, 1, -3, 1, -1, 3, -1, 3, -2, 5, 0, 3, 2, 3, 1, 1, 1, 1, 3, 2, 3, 0, 5, -2, 3, -1, 3, -1, 1, -3, 1, -3, 2, -5, 0, -3, -2, -3, -1, -1, -1, -1, -3, -2, -3, 0, -5],
            o = v.getScreenXYAtTextureXY(D, e, t),
            i = o.x,
            n = o.y;
        a /= 5, b.beginPath(), b.moveTo(i + a * r[0], n + a * r[1]);
        for (var s = 1; s < r.length; ++s) b.lineTo(i + a * r[2 * s + 0], n + a * r[2 * s + 1]);
        b.fill(), b.stroke(), b.closePath()
    }

    function o(e, t, a) {
        return;
        var r = 2,
            o = v.getScreenXYAtTextureXY(D, e, t),
            i = o.x,
            n = o.y;
        b.save(), b.beginPath(), b.arc(i, n, a, 0, 2 * Math.PI), b.closePath(), b.fill(), b.stroke(), b.lineWidth = r, b.beginPath(), b.arc(i - .4 * a, n, .35 * a, 0, 2 * Math.PI), b.closePath(), b.stroke(), b.moveTo(i + .15 * a, n - .4 * a), b.lineTo(i + .15 * a, n + .4 * a), b.moveTo(i + .25 * a, n - 0 * a), b.lineTo(i + .65 * a, n - .4 * a), b.moveTo(i + .25 * a, n - 0 * a), b.lineTo(i + .65 * a, n + .4 * a), b.stroke(), b.restore()
    }

    function i(e, t, a) {
        b.beginPath();
        var r = v.getScreenXYAtTextureXY(D, e, t);
        b.arc(r.x, r.y, a, 0, 2 * Math.PI), b.stroke(), b.closePath()
    }

    function n(e, t, a) {
        b.beginPath();
        var r = v.getScreenXYAtTextureXY(D, e, t);
        b.arc(r.x, r.y, a, 0, 2 * Math.PI), b.fill(), b.stroke(), b.closePath()
    }

    function s(e, t) {
        var a = v.getScreenXYAtTextureXY(D, e, t);
        b.moveTo(a.x, a.y)
    }

    function l(e, t) {
        var a = v.getScreenXYAtTextureXY(D, e, t);
        b.lineTo(a.x, a.y)
    }

    function c() {
        $(".outlines-canvas").css("cursor", "pointer")
    }

    function d() {
        $(".outlines-canvas").css("cursor", "default")
    }

    function u(e) {
        if (null != g.getCurRoom()) {
            var t = -1,
                a = -1;
            switch (VUtils.isTabletOrPhoneDevice() && "touchmove" == e.type && e.preventDefault(), "touchmove" == e.type || "touchstart" == e.type || "touchend" == e.type ? (t = e.originalEvent.changedTouches[0].pageX - $(".scene .render").offset().left, a = e.originalEvent.changedTouches[0].pageY - $(".scene .render").offset().top) : (t = e.pageX - $(".scene .render").offset().left, a = e.pageY - $(".scene .render").offset().top), t *= g.getCurRoomWidth() / $(".scene .render").width(), a *= g.getCurRoomHeight() / $(".scene .render").height(), t = parseInt(t), a = parseInt(a), "touchstart" == e.type && (B = !0), e.type) {
                case "mousedown":
                    if (B) break;
                case "touchstart":
                    switch (I) {
                        case "None":
                            f.decorate(t, a);
                            break;
                        case "WaitingToDragSingleTile":
                        case "WaitingToEditBorder":
                        case "WaitingToEditZone":
                            f.decorate(t, a)
                    }
                    break;
                case "mousemove":
                    if (B) break;
                case "touchmove":
                    f.canDecorate(t, a) ? c() : d();
                    break;
                case "mouseup":
                    if (B) break;
                case "touchend":
                    switch (I) {
                        case "DraggingSingleTile":
                        case "EditingBorder":
                        case "EditingZone":
                        case "WaitingToAddZone":
                            f.decorate(t, a)
                    }
                    break;
                case "mouseout":
                    d()
            }
        }
    }
    var p = this,
        g = e,
        f = t,
        v = a,
        m = $(".outlines-canvas")[0],
        b = m.getContext("2d"),
        T = 10,
        k = 2 * T;
    VUtils.isTabletOrPhoneDevice() && (T = 30, k = 30);
    var y = "#ffff00",
        S = "#00ff00",
        A = "rgba(0,0,0,0.8)",
        x = "rgba(255,255,0,0.8)",
        R = "rgba(0,255,0,0.8)",
        C = 2,
        I = "None",
        D = -1,
        O = null,
        P = null,
        B = !1;
    $(".outlines-canvas").bind("mousedown mousemove mouseup mouseout touchstart touchmove touchend", function(e) {
        u(e)
    }), this.isGrabDistance = function(e, t, a, r, o) {
        var i = v.getScreenXYAtTextureXY(e, t, a),
            n = v.getScreenXYAtTextureXY(e, r, o),
            s = Math.sqrt(Math.abs(n.x - i.x) * Math.abs(n.x - i.x) + Math.abs(n.y - i.y) * Math.abs(n.y - i.y));
        return s <= T
    }, this.isGrabDistance2 = function(e, t, a, r, o) {
        var i = v.getScreenXYAtTextureXY(e, t, a),
            n = v.getScreenXYAtTextureXY(e, r, o),
            s = Math.sqrt(Math.abs(n.x - i.x) * Math.abs(n.x - i.x) + Math.abs(n.y - i.y) * Math.abs(n.y - i.y));
        return s <= k
    }, this.isGrabHLineDistance = function(e, t, a, r, o, i) {
        if (t < r || t > o) return !1;
        var n = v.getScreenXYAtTextureXY(e, t, a),
            s = v.getScreenXYAtTextureXY(e, t, i),
            l = Math.sqrt(Math.abs(s.x - n.x) * Math.abs(s.x - n.x) + Math.abs(s.y - n.y) * Math.abs(s.y - n.y));
        return l <= T
    }, this.isGrabVLineDistance = function(e, t, a, r, o, i) {
        if (a < o || a > i) return !1;
        var n = v.getScreenXYAtTextureXY(e, t, a),
            s = v.getScreenXYAtTextureXY(e, r, a),
            l = Math.sqrt(Math.abs(s.x - n.x) * Math.abs(s.x - n.x) + Math.abs(s.y - n.y) * Math.abs(s.y - n.y));
        return l <= T
    }, this.getBorderGrabHandles = function() {
        return O
    }, this.setBorderGrabHandles = function(e, t, a, r, o, i) {
        for (var n = 99999, s = 0, l = r; l < r + o; l += 100) {
            var c = v.getScreenXYAtTextureXY(e, l, t + a / 2);
            if (vout("x=" + l + " gridIndex=" + v.getGridIndexAtScreenXY(c.x, c.y, !0) + " screenXY=" + parseInt(c.x) + "," + parseInt(c.y)), v.getGridIndexAtScreenXY(c.x, c.y, !0) == e) {
                var d = v.getTextureXYAtScreenXY(e, c.x, c.y);
                d.x < n && (n = d.x), d.x > s && (s = d.x)
            }
        }
        var u = n + (s - n) / 2;
        O = [new VPoint(u - i, t), new VPoint(u, t + a / 2), new VPoint(u + i, t + a), new VPoint(u + 2 * i, t + a / 2)]
    }, this.getSingleTileGrabHandle = function() {
        return P
    }, this.setSingleTileGrabHandle = function(e, t, a, r, o) {
        singleTileGrabHandleYOffset = o, P = new VPoint(e + a / 2, t + r / 2 + singleTileGrabHandleYOffset)
    }, this.getSingleTileGrabHandleYOffset = function() {
        return singleTileGrabHandleYOffset
    }, this.getMode = function() {
        return I
    }, this.setMode = function(e) {
        vout("setMode(): " + e), I = e, "None" == I && b.clearRect(0, 0, m.width, m.height)
    }, this.setupNewRoom = function(e) {
        m.width = e.width, m.height = e.height
    }, this.scaleForDisplay = function() {
        var e = $(window).width() / m.width;
        w = "100%", h = "auto", m.height * e < $(window).height() && (w = "auto", h = "100%"), $(".outlines-canvas").css({
            width: w,
            height: h
        })
    }, this.clear = function() {
        b.clearRect(0, 0, m.width, m.height)
    }, this.drawZone = function(e, t, a, i, c, d, u, h, p, g) {
        function f(e, t, a, i, s) {
            (p || g == a) && (g == a ? b.fillStyle = R : b.fillStyle = x, b.strokeStyle = A, void 0 != s ? o(e, t, k) : i ? r(e, t, k) : n(e, t, T))
        }
        D = e, b.clearRect(0, 0, m.width, m.height), b.save();
        var w = v.getOutlineForGrid(e);
        b.beginPath(), b.moveTo(w[0].x, w[0].y);
        for (var I = 0; I < w.length; ++I) b.lineTo(w[I].x, w[I].y);
        b.closePath(), b.clip();
        var O = d.decorateAreaTop.areaX,
            P = d.decorateAreaTop.areaY,
            B = d.decorateAreaTop.areaW,
            F = d.decorateAreaTop.areaH;
        null != d.decorateAreaBottom && (F = d.decorateAreaBottom.areaY + d.decorateAreaBottom.areaH - d.decorateAreaTop.areaY), b.beginPath();
        var M = 5;
        s(O - M, P - M), l(O + B + M, P - M), l(O + B + M, P + F + M), l(O - M, P + F + M), b.closePath(), b.clip();
        for (var I = 0; I < u.length; ++I) {
            var E = u[I];
            if ("" != E && "-" != E) {
                var W = E.split(","),
                    L = parseInt(W[0]),
                    Y = parseInt(W[2]),
                    U = parseInt(W[1]) - L + 1,
                    G = parseInt(W[3]) - Y + 1;
                b.beginPath(), b.moveTo(0, 0), b.lineTo(m.width, 0), b.lineTo(m.width, m.height), b.lineTo(0, m.height), b.lineTo(0, 0), l(L, Y), l(L, Y + G), l(L + U, Y + G), l(L + U, Y), l(L, Y), b.closePath(), b.clip()
            }
        }
        b.lineWidth = C, h ? b.strokeStyle = S : b.strokeStyle = y, b.beginPath(), s(t, a), l(t + i, a), l(t + i, a + c), l(t, a + c), l(t, a), b.stroke(), b.closePath(), f(t, a, "Top-Left", !1), f(t + i / 2, a, "Top", !1), f(t + i, a, "Top-Right", !1), f(t + i, a + c / 2, "Middle-Right", !1), f(t + i, a + c, "Bottom-Right", !1), f(t + i / 2, a + c, "Bottom", !1), f(t, a + c, "Bottom-Left", !1), f(t, a + c / 2, "Middle-Left", !1), f(t + i / 2, a + c / 2, "Centre", !0), f(t + 1.5 * i / 2, a + c / 2, "Finish", !1, !0), b.restore(), b.drawImage(v.getOverlayCanvas(), 0, 0)
    }, this.drawBorder = function(e, t, a, i, c, d, u, h) {
        function p(e, t, a, i, s) {
            h == a ? b.fillStyle = R : b.fillStyle = x, b.strokeStyle = A, void 0 != s ? o(e, t, k) : i ? r(e, t, k) : n(e, t, T)
        }
        D = e, O[0].y = t, O[1].y = t + a / 2, O[2].y = t + a, O[3].y = t + a / 2, b.clearRect(0, 0, m.width, m.height), b.save();
        var g = v.getOutlineForGrid(e);
        b.beginPath(), b.moveTo(g[0].x, g[0].y);
        for (var f = 0; f < g.length; ++f) b.lineTo(g[f].x, g[f].y);
        b.closePath(), b.clip();
        var w = i.decorateAreaTop.areaX,
            I = i.decorateAreaTop.areaY,
            P = i.decorateAreaTop.areaW,
            B = i.decorateAreaTop.areaH;
        null != i.decorateAreaBottom && (B = i.decorateAreaBottom.areaY + i.decorateAreaBottom.areaH - i.decorateAreaTop.areaY), b.beginPath();
        var F = 5;
        s(w - F, I - F), l(w + P + F, I - F), l(w + P + F, I + B + F), l(w - F, I + B + F), b.closePath(), b.clip();
        for (var f = 0; f < c.length; ++f) {
            var M = c[f];
            if ("" != M && "-" != M) {
                var E = M.split(","),
                    W = parseInt(E[0]),
                    L = parseInt(E[2]),
                    Y = parseInt(E[1]) - W + 1,
                    U = parseInt(E[3]) - L + 1;
                b.beginPath(), b.moveTo(0, 0), b.lineTo(m.width, 0), b.lineTo(m.width, m.height), b.lineTo(0, m.height), b.lineTo(0, 0), l(W, L), l(W, L + U), l(W + Y, L + U), l(W + Y, L), l(W, L), b.closePath(), b.clip()
            }
        }
        b.lineWidth = C, b.beginPath(), d ? b.strokeStyle = S : b.strokeStyle = y, s(w, t), l(w + P, t), b.closePath(), b.stroke(), b.beginPath(), s(w, t + a), l(w + P, t + a), b.closePath(), b.stroke(), b.restore(), b.drawImage(v.getOverlayCanvas(), 0, 0), p(O[0].x, O[0].y, "Top", !1), p(O[1].x, O[1].y, "Centre", !0), p(O[2].x, O[2].y, "Bottom", !1), p(O[3].x, O[3].y, "Finish", !1, !0)
    }, this.drawSingleTileGrabHandleOnly = function(e, t, a) {
        D = a, P.x = e + w / 2, P.y = t + h / 2 + singleTileGrabHandleYOffset, b.clearRect(0, 0, m.width, m.height), b.strokeStyle = S, i(e, t, 1.1 * k), b.fillStyle = R, b.strokeStyle = A, r(e, t, k)
    }, this.drawSingleTile = function(e, t, a, o, n, c, d, u, h, p, g, f, T, w, I, O) {
        function B(e, t, a) {
            w ? b.strokeStyle = S : b.strokeStyle = y, b.lineWidth = C, w ? b.strokeStyle = S : b.strokeStyle = y, I ? b.strokeStyle = S : b.strokeStyle = y, i(e, t, 1.1 * k), I ? b.fillStyle = R : b.fillStyle = x, b.strokeStyle = A, r(e, t, k)
        }
        D = a, vout("DRAW SINGLE"), vout("tex " + (o + c / 2) + " " + (n + d / 2));
        var F = v.getScreenXYAtTextureXY(D, o + c / 2, n + d / 2);
        vout("screen XY= " + F.x + " " + F.y), O && (P.x = o + c / 2, P.y = n + d / 2 + singleTileGrabHandleYOffset, e == -1 && (e = P.x, t = P.y)), b.clearRect(0, 0, m.width, m.height), b.save();
        var M = v.getOutlineForGrid(a);
        b.beginPath(), b.moveTo(M[0].x, M[0].y);
        for (var E = 0; E < M.length; ++E) b.lineTo(M[E].x, M[E].y);
        b.closePath(), b.clip(), b.beginPath();
        var W = 5;
        s(u - W, h - W), l(u + p + W, h - W), l(u + p + W, h + g + W), l(u - W, h + g + W), b.closePath(), b.clip();
        for (var E = 0; E < f.length; ++E) {
            var L = f[E];
            if ("" != L && "-" != L) {
                var Y = L.split(","),
                    U = parseInt(Y[0]),
                    G = parseInt(Y[2]),
                    V = parseInt(Y[1]) - U + 1,
                    H = parseInt(Y[3]) - G + 1;
                b.beginPath(), b.moveTo(0, 0), b.lineTo(m.width, 0), b.lineTo(m.width, m.height), b.lineTo(0, m.height), b.lineTo(0, 0), l(U, G), l(U, G + H), l(U + V, G + H), l(U + V, G), l(U, G), b.closePath(), b.clip()
            }
        }
        w ? b.strokeStyle = S : b.strokeStyle = y, b.lineWidth = C, b.beginPath(), "Diamond" == T ? (s(o + c / 2, n), l(o + c, n + d / 2), l(o + c / 2, n + d), l(o, n + d / 2), l(o + c / 2, n)) : (s(o, n), l(o + c, n), l(o + c, n + d), l(o, n + d), l(o, n)), b.stroke(), b.closePath(), b.restore(), O && (b.lineWidth = C, w ? b.strokeStyle = S : b.strokeStyle = y, b.beginPath(), s(o + c / 2, n + d / 2), l(e, t), b.stroke(), b.closePath()), b.drawImage(v.getOverlayCanvas(), 0, 0), O && B(e, t, w)
    }
}

function UniversalAnalytics() {
    function e() {
        if (0 != o.length) {
            var e = {
                event: "productClick",
                ecommerce: {
                    currencyCode: "GBP",
                    click: {
                        actionField: {
                            list: "Visualiser"
                        },
                        products: o
                    }
                },
                category: "",
                action: "",
                label: ""
            };
            t(e), o = []
        }
    }

    function t(e) {
        n ? e.webGL = "true" : e.webGL = "false", dataLayer.push(e)
    }
    var a = this,
        r = 10,
        o = [],
        i = [],
        n = !0;
    location.href.indexOf("/basic") != -1 && (n = !1), window.onbeforeunload = function() {
        e()
    }, this.trackSelectRoom = function(e) {
        var a = {
            event: "visualiserLeftMenu",
            category: "Visualiser",
            action: "Select a Room",
            label: e.type,
            roomId: e.nameUA
        };
        t(a)
    }, this.trackSelectStyledRoom = function(e, a) {
        var r = {
            event: "visualiserLeftMenu",
            category: "Visualiser",
            action: "Choose Your Style",
            label: a,
            roomId: "preDecoratedRoom " + e
        };
        t(r)
    }, this.trackSelectHelp = function() {
        var e = {
            event: "visualiserLeftMenu",
            category: "Visualiser",
            action: "Help",
            label: ""
        };
        t(e)
    }, this.trackToolButton = function(e, a, r) {
        var o = {
            event: "visualiserRightMenu",
            category: "Visualiser",
            action: e,
            label: a.type,
            roomId: a.nameUA
        };
        void 0 != r && (o.tilesUsed = r.join()), t(o)
    }, this.trackSelectPattern = function(e) {
        var a = {
            event: "visualiserRightMenu",
            category: "Visualiser",
            action: "Change Laying Pattern",
            label: e
        };
        t(a)
    }, this.trackPlaceSingleTile = function(e) {
        var a = {
            event: "visualiserRightMenu",
            category: "Visualiser",
            action: "Single Tile",
            label: e.name,
            sku: e.sku
        };
        t(a)
    }, this.trackCreateArea = function() {
        var e = {
            event: "visualiserLeftMenu",
            category: "Visualiser",
            action: "Create An Area",
            label: "Initial Area"
        };
        t(e)
    }, this.trackDeleteArea = function() {
        var e = {
            event: "visualiserLeftMenu",
            category: "Visualiser",
            action: "Create An Area",
            label: "Delete Area"
        };
        t(e)
    }, this.trackEditArea = function() {
        var e = {
            event: "visualiserLeftMenu",
            category: "Visualiser",
            action: "Create An Area",
            label: "Edit Area"
        };
        t(e)
    }, this.trackTileArea = function() {
        var e = {
            event: "visualiserLeftMenu",
            category: "Visualiser",
            action: "Create An Area",
            label: "Tile Area"
        };
        t(e)
    }, this.trackDeleteBorder = function() {
        var e = {
            event: "visualiserLeftMenu",
            category: "Visualiser",
            action: "Border",
            label: "Delete Border"
        };
        t(e)
    }, this.trackEditBorder = function() {
        var e = {
            event: "visualiserLeftMenu",
            category: "Visualiser",
            action: "Border",
            label: "Edit Border"
        };
        t(e)
    }, this.trackFillWithMosaic = function() {
        var e = {
            event: "visualiserLeftMenu",
            category: "Visualiser",
            action: "Mosaic",
            label: "Fill With Mosaic"
        };
        t(e)
    }, this.trackLayMosaicBorder = function() {
        var e = {
            event: "visualiserLeftMenu",
            category: "Visualiser",
            action: "Mosaic",
            label: "Lay Mosaic Border"
        };
        t(e)
    }, this.trackSelectCabinetColour = function(e) {
        var a = {
            event: "visualiserLeftMenu",
            category: "Visualiser",
            action: "Personalise Your Room",
            label: "Cabinets",
            colour: e
        };
        t(a)
    }, this.trackSelectWorktopColour = function(e) {
        var a = {
            event: "visualiserLeftMenu",
            category: "Visualiser",
            action: "Personalise Your Room",
            label: "Worktops",
            colour: e
        };
        t(a)
    }, this.trackSelectWallColour = function(e) {
        var a = {
            event: "visualiserLeftMenu",
            category: "Visualiser",
            action: "Personalise Your Room",
            label: "Walls",
            colour: e
        };
        t(a)
    }, this.trackUpdateBasket = function(e, a) {
        var r = !0;
        1 == a.length && a[0] < 0 && (r = !1);
        var o;
        o = r ? {
            event: "addToCart",
            ecommerce: {
                currencyCode: "GBP",
                add: {
                    products: []
                }
            },
            category: "",
            action: "",
            label: ""
        } : {
            event: "removeFromCart",
            ecommerce: {
                remove: {
                    products: []
                }
            },
            category: "",
            action: "",
            label: ""
        };
        for (var i = 0; i < e.length; ++i) {
            var n = e[i],
                s = new Object;
            s.name = n.name, s.id = n.sku, s.price = n.price.toString(), s.brand = "Topps Tiles", s.category = "Tiles", "Wood" == n.is && (s.category = "Wood"), s.action = "", s.label = "", s.variant = n.colour.substr(1, n.colour.length - 2), a[i] == -999999 ? s.quantity = "1" : s.quantity = Math.abs(a[i]).toString(), r ? o.ecommerce.add.products.push(s) : o.ecommerce.remove.products.push(s)
        }
        t(o)
    }, this.trackSelectTile = function(t) {
        if (i.indexOf(t.sku) == -1) {
            i.push(t.sku);
            var a = {
                id: t.sku,
                price: t.price.toString(),
                brand: "Topps Tiles",
                category: "Tiles",
                action: "",
                label: "",
                name: t.name,
                variant: t.colour.substr(1, t.colour.length - 2)
            };
            "Wood" == t.is && (a.category = "Wood"), o.push(a), o.length == r && e()
        }
    }
}

function VAnalytics() {
    var e = this,
        t = "-",
        a = "-",
        r = "-";
    this.setup = function(o, i) {
        location.href.indexOf("cjc-macbookpro") == -1 && (t = o, a = i, r = VUtils.loadCookie(t + "-analytics-unique-user-id"), null == r ? (r = VUtils.getGUID().replace(/-/g, ""), VUtils.saveCookie(t + "-analytics-unique-user-id", r), e.track("First Visit")) : e.track("Re-Visit"))
    }, this.track = function(e, o) {
        if (location.href.indexOf("track") != -1) return void 0 == o && (o = ""), void alert(e + ": " + o);
        var i = "http://viziserve2.com/analytics/vtrack.php?";
        "https:" == location.protocol && (i = i.replace("http:", "https:")), i += "&userid=" + r, i += "&fromurl=" + encodeURIComponent(location.href), i += "&ref=" + t, i += "&version=" + a, i += "&code=" + e, i += void 0 != o ? "&data=" + o : "&data=", i += "&nocache=" + Math.random(), (new Image).src = i
    }
}

function checkWebGL(e) {
    var t = !0;
    if (VUtils.webGLSupported() || (t = !1), location.href.indexOf("testnowebgl") != -1 && (t = !1), location.href.indexOf("testwebglfail") != -1 && setWebGLTesting(), !t) return $(".run-layering").click(function() {
        $(".modal-webgl-overlay").fadeOut();
        var e = VUtils.getBaseURL() + "basic";
        window.location.href = e
    }), void $(".modal-webgl-overlay").fadeIn();
    var a = VUtils.loadCookie(webGLRanOKCookieName);
    return null != a && "Testing" == a ? ($(".run-layering").click(function() {
        $(".modal-webglfail-overlay").fadeOut();
        var e = VUtils.getBaseURL() + "basic";
        window.location.href = e
    }), $(".run-retrywebgl").click(function() {
        $(".modal-webglfail-overlay").fadeOut(), e()
    }), void $(".modal-webglfail-overlay").fadeIn()) : void e()
}

function setWebGLTesting() {
    VUtils.saveCookie(webGLRanOKCookieName, "Testing")
}

function setWebGLOK() {
    VUtils.saveCookie(webGLRanOKCookieName, "OK")
}

function VisualizerToppsTiles() {
    function e(e) {
        return "DEV" == runningEnvironment ? void e() : void $.getJSON("//www.toppstiles.co.uk/detect_mobile_script.asp?callback=?", {
            how: "jsonp"
        }, function(t) {
            var a = $.param(t);
            a.indexOf("bolMobile=1") != -1 && $("body").addClass("mobile-device"), e()
        })
    }

    function t() {
        VUtils.isTabletOrPhoneDevice() && ($("body").addClass("touch-device"), $(".decorate-tile-zone-text").html($(".decorate-tile-zone-text").html().replace("click", "tap"))), VUtils.isTabletOrPhoneDevice() ? ($(".vit-styles-overlay .tablet").show(), $(".vit-styles-overlay .non-tablet").hide()) : ($(".vit-styles-overlay .non-tablet").show(), $(".vit-styles-overlay .tablet").hide()), makingPredecoratedRooms && $(".save-saved-rooms-to-disk").show()
    }

    function a(e, t, a) {
        function o(i) {
            return i == e.length ? void(void 0 != a && a()) : void r(e[i], t[i], function() {
                o(i + 1)
            })
        }
        return wa.trackUpdateBasket(e, t), "DEV" == runningEnvironment || "TEST" == runningEnvironment ? void(void 0 != a && a()) : void o(0)
    }

    function r(e, t, a) {
        if ("DEV" == runningEnvironment || "TEST" == runningEnvironment) return void(void 0 != a && a());
        var r = "//www.toppstiles.co.uk/e360/s_basket_add_new.asp",
            o = {
                AjaxCall: "1",
                productid: e.id360,
                quantity: t,
                updatequantity: "yes",
                allownegative: ""
            };
        t == -999999 ? (o.sample_option_field = "true", o.quantity = 1) : t < 0 && (o.allownegative = "yes"), $.post(r, o, function(e) {
            void 0 != a && a()
        })
    }

    function o() {
        function e(e) {
            var t = "360DATASTART",
                a = e.indexOf(t);
            if (a != -1) {
                var r = new Array,
                    o = String(e.substring(a + t.length)).split(",");
                e.indexOf(",") == -1 && (o = []);
                for (var i = 0; i < o.length / 3; ++i) {
                    var n = o[3 * i + 0],
                        s = !1;
                    "true" == o[3 * i + 2] && (s = !0);
                    var l = parseInt(o[3 * i + 1]),
                        c = new Object;
                    if (c.tile = at(n), null != c.tile) {
                        c.isSample = s, c.quantity = l, c.mainSiteQuantity = l, c.tempQuantity = l, c.tempCoverageM2 = Ve(c.tile, c.tempQuantity), r.push(c.tile.sku);
                        for (var d = !1, u = 0; u < Et.length; ++u) Et[u].tile.sku == c.tile.sku && (Et[u].mainSiteQuantity = l, d = !0);
                        d || Et.push(c)
                    }
                }
                for (var u = 0; u < Et.length; ++u) r.indexOf(Et[u].tile.sku) == -1 && (Et.splice(u, 1), --u)
            }
        }
        if ("DEV" != runningEnvironment && "TEST" != runningEnvironment) {
            var t = "//www.toppstiles.co.uk/e360/s_basket_view_basket_visualize-it.asp?" + (new Date).getTime();
            VUtils.loadTextFromURL(t, function(t) {
                e(t), U(), q(), ga.update()
            })
        }
    }

    function i(e) {
        function t() {
            var t = "//www.toppstiles.co.uk/VIT/wishlisttoflash.asp?guid=" + Tt;
            VUtils.loadTextFromURL(t, function(t) {
                var a = t.indexOf("guid=");
                if (a != -1) {
                    for (Mt = new Array;;) {
                        var r = "&products=",
                            a = t.indexOf(r, a);
                        if (a == -1) break;
                        a += r.length;
                        var o = t.indexOf("&", a),
                            i = t.substring(a, o);
                        Mt.push(i), a = o
                    }
                    L(), ga.update(), void 0 != e && e()
                }
            })
        }
        return L(), ga.update(), void(void 0 != e && e());
        if ("DEV" != runningEnvironment)
            if (null == Tt) {
                var a = "//www.toppstiles.co.uk/VIT/wishlisttoflash.asp?guid=***UNKNOWN***";
                VUtils.loadTextFromURL(a, function(e) {
                    Tt = e.substring(e.indexOf("guid=") + "guid=".length, e.indexOf("&")), t()
                })
            } else t()
    }

    function n() {
        return void ga.update();
        if ("DEV" != runningEnvironment) {
            for (var e = "//www.toppstiles.co.uk/VIT/wishlistfromflash.asp?guid=" + Tt, t = 0; t < Mt.length; ++t) e += "&products[]=" + Mt[t];
            VUtils.loadTextFromURL(e, function(e) {
                ga.update()
            })
        }
    }

    function s() {
        for (var e = Sa.allProcessedTiles, t = 0, a = 0, r = new Array, o = 0; o < e.length; ++o) {
            for (var i = !1, n = 0; n < Sa.currentTTProducts.length; ++n)
                if (e[o].sku == Sa.currentTTProducts[n].sku) {
                    i = !0, r.push(e[o].sku);
                    break
                }
            i ? ++t : ++a
        }
        alert("numTilesProcessedAndStillCurrent: " + t), alert("numTilesProcessedAndNotCurrent: " + a);
        for (var s = 0, l = 0, c = new Array, o = 0; o < e.length; ++o) {
            for (var i = !1, n = 0; n < Sa.currentTTProducts2.length; ++n)
                if (e[o].sku == Sa.currentTTProducts2[n].sku) {
                    i = !0, c.push(e[o].sku);
                    break
                }
            i ? ++s : ++l
        }
        alert("numTilesProcessedAndStillCurrent2: " + s), alert("numTilesProcessedAndNotCurrent2: " + l), alert(Sa.processedTiles.length);
        for (var d = 0, o = 0; o < Sa.processedTiles.length; ++o) c.indexOf(Sa.processedTiles[o].sku) == -1 && (++d, vout(Sa.processedTiles[o].sku));
        alert("numMissing: " + d)
    }

    function l() {
        da = window.open("print.html?" + uncache), ua = !1
    }

    function c() {
        null != da && ua && null == ca && (da.start(), da = null)
    }

    function d(e, t, a) {
        from = "noreply@toppstiles.co.uk", A("Sending your email...", 1500), a = a.replace(/\r\n|\r|\n/g, "<br />");
        var r = "Topps Tiles Visualiser",
            o = 800,
            i = "email-",
            n = b(ta, o, 0, i),
            s = {};
        mt && (s.base64RoomImage = ot(o, 0).toDataURL("image/jpeg", .75).replace("data:image/jpeg;base64,", "")), $.post(n, s, function(o) {
            if (o.indexOf("[[[OK]]]") == -1) return void verror("Email Failed: " + o);
            for (var i = o.replace("[[[OK]]]", ""), n = new Array, s = $a.getSortedTilesUsed(), l = 0; l < s.length; ++l) {
                var c = tt(s[l]),
                    d = new Object;
                d.thumbnailURL = "http://www.toppstiles.co.uk/visualiser/thumbnails/tiles/" + c.sku + ".jpg?" + uncache, d.nameText = c.name, d.nameText = d.nameText.replace("™", "&trade;"), d.nameText = d.nameText.replace("®", "&reg;"), d.skuText = c.sku, "" != c.productDetailsLink ? d.link = c.productDetailsLink : d.link = "http://www.toppstiles.co.uk/product.asp?productid=" + c.id360, n.push(d)
            }
            var u = "http://www.toppstiles.co.uk/visualiser/images/email/TT_SampleService_SquareElement.jpg",
                h = "http://www.toppstiles.co.uk/visualiser/images/email/TT_IFC_SquareElement.jpg";
            "DEV" != runningEnvironment && location.href.indexOf("/VIT/testing") == -1 || (u = "http://www.toppstiles.co.uk/VIT/testing/ppe/newvisualiser2/images/email/TT_SampleService_SquareElement.jpg", h = "http://www.toppstiles.co.uk/VIT/testing/ppe/newvisualiser2/images/email/TT_IFC_SquareElement.jpg");
            var p = "http://www.toppstiles.co.uk/page105/Topps-Sample-Service.html",
                g = "http://www.toppstiles.co.uk/interest-free-credit/",
                f = "http://www.toppstiles.co.uk/visualiser/images/email/1x1Transparent.png";
            "DEV" != runningEnvironment && location.href.indexOf("/VIT/testing") == -1 || (f = "http://www.toppstiles.co.uk/VIT/testing/ppe/newvisualiser2/images/email/1x1Transparent.png");
            var v = "";
            v += "<!DOCTYPE HTML>\n", v += "<html>\n", v += "<head>\n", v += "<title>" + $("title").text() + "</title>\n", v += "</head>\n", v += "<body>\n", v += '<table width="600" cellspacing="10" cellpadding="" border="0" align="left" style="font-family: Sans-Serif;">\n', v += "<tr>\n", v += '<td colspan="5">\n', v += "" != $.trim(e) ? "Hi " + e + ",<br><br>\n" : "Hello,<br><br>\n", v += "Thank you for using the Tile Visualiser service.<br><br>\n", "" != $.trim(a) ? v += a + "<br><br>\n" : (v += "Your room design can be seen below along with all the product information you need to find the products you've used in store or online.<br><br>\n", v += "Happy designing!<br><br>\n"), v += "Topps Tiles\n", v += "<br><br>\n", v += "</td>\n", v += "</tr>\n", v += "<tr>\n", v += '<td colspan="5" align="center">\n', v += '<a target="_blank" href="' + dt + '"><img width="550" src="' + i + '" /></a>\n', v += "<br><br>\n", v += "</td>\n", v += "</tr>\n", v += "<tr>\n", v += '<td colspan="5" align="left">\n', v += "<p>Products used:</p>\n", v += "</td>\n", v += "</tr>\n";
            for (var m = 2, b = 100 / m, T = 0, l = 0; l < n.length; ++l)
                if (d = n[l], l % m == 0 && (v += "<tr>\n"), v += '<td width="250" align="center" valign="top" style="border: 1px solid #bbbbbb;">\n', v += "<br>\n", v += '<a style="text-decoration: none; color: black;" target="_blank" href="' + d.link + '">\n', v += '<img width="200" src="' + d.thumbnailURL + '" />\n', v += "<p>" + d.skuText + "<br>" + d.nameText + "</p>\n", v += "<br>\n", v += "</a>\n", v += "</td>\n", v += "</td>\n", v += "\n\n", l % m == m - 1 && (v += "</tr>\n"), l == n.length - 1)
                    for (;
                        (l + 1) % m != 0;) ++l, v += '<td width="250">\n', v += '<img width="200" src="' + f + '" />\n', v += "</td>\n", l % m == m - 1 && (v += "</tr>\n");
            if (v += "<tr>\n", v += '<td style="text-align: left;" colspan="5" align="left">\n', v += "<br><br>\n", v += '<a target="_blank" href="' + p + '"><img width="250" src="' + u + '" /></a>&nbsp;&nbsp;<a target="_blank" href="' + g + '"><img width="250" src="' + h + '" /></a>\n', v += "</td>\n", v += "</tr>\n", v += "</table>\n", v += "<br><br>\n", v += "</body>\n", v += "</html>\n", "DEV" == runningEnvironment) {
                var k = window.open("", "_blank");
                k.document.body.innerHTML = v
            }
            Ta.send(v, r, from, t), A("Your email has been sent.", 1500)
        })
    }

    function u(e, t) {
        var a = "",
            r = 800,
            o = "";
        switch (e) {
            case "Facebook":
                a = "facebook-", o = "Share-Facebook";
                break;
            case "Twitter":
                a = "twitter-", o = "Share-Twitter";
                break;
            case "Pinterest":
                a = "pinterest-", o = "Share-Pinterest"
        }
        var i = "";
        i += '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n', i += '<html xmlns="http://www.w3.org/1999/xhtml">\n', i += "<head>\n", i += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n', i += '<meta property="og:title" content="Topps Tiles Visualiser" />\n', i += '<meta property="og:description" content="I used the Topps Tiles Visualiser" />\n', i += '<meta property="og:image" content="[[[IMAGEURL]]]" />\n', i += "<title>Topps Tiles Visualiser</title>\n", i += "</head>\n", i += "<body>\n", i += '<[[[script]]] type="text/javascript">\n', i += 'window.location.href="' + window.location.href + '";', i += "</[[[script]]]>\n", i += "</body>\n", i += "</html>\n";
        var n = b(ta, r, 0, a),
            s = {
                facebookHTML: i
            };
        mt && (s.base64RoomImage = ot(r, 0).toDataURL("image/jpeg", .75).replace("data:image/jpeg;base64,", "")), $.post(n, s, function(a) {
            if (a.indexOf("[[[OK]]]") == -1) return t(!1), void verror("Share Failed: " + a);
            var r = a.replace("[[[OK]]]", "");
            na = r, ia = e, "Facebook" != e ? t(!0) : ka.facebookScrapeURL(na, function() {
                t(!0)
            })
        })
    }

    function p() {
        var e = "I used the Topps Tiles Visualiser";
        ka.send(ia, e, na, dt), ia = ""
    }

    function g() {
        if (null != Dt) {
            var e = $(window).width() / Dt.width;
            w = "100%", h = "auto", Dt.height * e < $(window).height() && (w = "auto", h = "100%"), ga.scaleRoomImageForDisplay(w, h), outlines.scaleForDisplay()
        }
    }

    function f(e, t, a) {
        var r = pt + "vgetroomimagejpg.php?cache=1&" + T(e, t, a);
        return r
    }

    function v(e, t, a) {
        var r = pt + "vgetroomimagejpg.php?cache=1&" + k(e, t, a);
        return r
    }

    function m(e, t, a) {
        var r = pt + "vgetroomimagejpg.php?cache=1&" + T(e, t, a);
        return r
    }

    function b(e, t, a, r) {
        var o = "vsaveroomimagejpg.php?" + T(e, t, a);
        return o += "&saveprefix=" + r
    }

    function T(e, t, a) {
        var r = Dt,
            o = "layers/",
            r = et(e.roomId);
        0 == a && 0 != t && (a = t / r.width * r.height), 0 == t && 0 != a && (t = a / r.height * r.width);
        var i = "width=" + t + "&height=" + a + "&path=" + o + "&base=" + r.id + ".JPEG",
            n = r.id + "/",
            s = new Array;
        for (var l in e.areas) {
            var c = l,
                d = e.areas[c],
                u = d.sku;
            if (null != u)
                if (null != tt(u)) {
                    var h = "-" + d.rotation + "-" + d.pattern,
                        p = d.grout;
                    i += "&layers[]=" + n + r.id + "_" + c + "_Grout_" + p + "_tpG0.png";
                    var g = Qe(u);
                    i += "&layers[]=" + n + r.id + "_" + c + "_Tile_" + u + h + "_" + g + ".png"
                } else {
                    var p = "FFFFFF";
                    i += "&layers[]=" + n + r.id + "_" + c + "_Grout_" + p + "_tpG0.png"
                } else {
                var p = "FFFFFF";
                i += "&layers[]=" + n + r.id + "_" + c + "_Grout_" + p + "_tpG0.png"
            }
        }
        return i += "&" + uncache
    }

    function k(e, t, a) {
        var r = "layers/",
            o = et(e);
        0 != t && 0 != a || (t = o.width, a = o.height);
        for (var i = "width=" + t + "&height=" + a + "&path=" + r + "&base=" + o.id + ".JPEG", n = o.id + "/", s = new Array, l = 0; l < o.numAreas; ++l) {
            var c = "Area" + o.areas.split(",")[l],
                d = "FFFFFF";
            i += "&layers[]=" + n + o.id + "_" + c + "_Grout_" + d + "_tpG0.png"
        }
        return i += "&" + uncache
    }

    function y(e) {
        if (oa = "Tile", null == e) Vt = !1;
        else {
            Yt = e, Vt = !0, Gt = !1, Ut = !1;
            var t = "Click on a surface to change the pattern.";
            VUtils.isTabletOrPhoneDevice() && (t = "Tap on a surface to change the pattern."), $a.roomContainsSingleTiles() && ("Herringbone" == Yt || "BlockHerringbone" == Yt ? t += "<br>Please note your single tiles will be removed." : "Diamond" == Yt && (t += "<br>Please note any non-square single tiles will be removed.")), A(t, 3e3)
        }
        q()
    }

    function S() {
        mt && (ta.savedThumbnailDataURL = ot(400, 300).toDataURL("image/jpeg", .5)), makingPredecoratedRooms && I(), aa.savedRoomsDecorateData.unshift(VUtils.clone(ta)), P(), B(), ha = !1, q(), A("Your room has now been saved.", 1500)
    }

    function A(e, t) {
        return null != sa && (clearTimeout(sa), sa = null), null == e ? void $(".vit-message").hide() : ($(".vit-message img").hide(), $(".vit-message p").html(e), $(".vit-message").show(), void(void 0 != t && (1500 == t && (t = 2500), sa = setTimeout(function() {
            sa = null, $(".vit-message").hide()
        }, t))))
    }

    function x(e, t) {
        return null != sa && (clearTimeout(sa), sa = null), null == e ? (sa = null, void $(".vit-message").hide()) : ($(".vit-message img").show(), $(".vit-message p").html(e), $(".vit-message").show(), void(void 0 != t && (sa = setTimeout(function() {
            sa = null, $(".vit-message").hide()
        }, t))))
    }

    function R(e) {
        var t = tt(e);
        "" != t.productDetailsLink ? window.open(t.productDetailsLink) : window.open("/product.asp?productid=" + t.id360)
    }

    function C(e) {
        if (makingPredecoratedRooms) return I(), void e();
        var t = "room-styles-data.txt?" + uncache;
        VUtils.loadTextFromURL(t, function(t) {
            ra = JSON.parse(t), e()
        })
    }

    function I() {
        ra = new Object, ra.version = vt, ra.predecoratedRoomsDecorateData = VUtils.clone(aa.savedRoomsDecorateData), $("a.save-saved-rooms-to-disk").attr("href", "data:text/plain," + JSON.stringify(ra))
    }

    function D(e) {
        wt = e, ga.setRoomStylesMode(e, It)
    }

    function O() {
        var e = ba.loadStorageData("TTSaveData");
        null != e && (aa = JSON.parse(e), aa.version != ft ? e = null : location.href.indexOf("resetvisualiser") != -1 && (e = null, alert("Resetting visualiser data"))), null == e && (aa = new Object, aa.version = ft, aa.savedRoomsDecorateData = new Array, P())
    }

    function P() {
        ba.saveStorageData("TTSaveData", JSON.stringify(aa))
    }

    function B() {
        function e() {
            for (var e = new Array, t = 0; t < Sa.rooms.length; ++t) "" == $.trim(Sa.rooms[t].ignore) && "" == $.trim(Sa.rooms[t].ignoreOldRoom) && (ct && "-" == Sa.rooms[t].texturedWorktopsCabinets || (ct || "+" != Sa.rooms[t].texturedWorktopsCabinets) && e.push(t));
            return e.sort(function(e, t) {
                return parseFloat(Sa.rooms[e].displayOrder) - parseFloat(Sa.rooms[t].displayOrder)
            }), e
        }
        var t = new Object;
        bt.noRoomType = "SelectRoomType=None", bt.roomTypes = new Array;
        for (var a = 0; a < Sa.roomTypes.length; ++a) {
            var r = new Object;
            r.typeText = Sa.roomTypes[a].displayText, r.selected = !1, Sa.roomTypes[a].type == Ct && (r.selected = !0), Sa.roomTypes[a].type == Ct && (r.selected = !0), r.selectIdSelectRoomType = "SelectRoomType=" + Sa.roomTypes[a].type, bt.roomTypes.push(r)
        }
        bt.predecoratedRoomStyles = new Array;
        for (var a = 0; a < Sa.predecoratedRoomStyles.length; ++a) {
            null == It && (It = Sa.predecoratedRoomStyles[a].style);
            var o = new Object;
            o.styleText = Sa.predecoratedRoomStyles[a].displayText, o.selected = !1, Sa.predecoratedRoomStyles[a].style == It && (o.selected = !0), o.selectIdSelectPredecoratedRoomStyle = "SelectPredecoratedRoomStyle=" + Sa.predecoratedRoomStyles[a].style, bt.predecoratedRoomStyles.push(o)
        }
        bt.predecoratedRooms = new Array;
        for (var i = 1; i <= ra.predecoratedRoomsDecorateData.length; ++i) {
            for (var a = 0; a < Sa.predecoratedRooms.length && Sa.predecoratedRooms[a].index != i; ++a);
            if (a != Sa.predecoratedRooms.length && It == Sa.predecoratedRooms[a].style) {
                var n = new Object;
                n.savedRoom = !1, n.selected = !1, n.disabled = !1, n.thumbnail = f(ra.predecoratedRoomsDecorateData[a], 400, 300), mt && (n.thumbnail = ra.predecoratedRoomsDecorateData[a].savedThumbnailDataURL), n.selectIdSelectRoom = "SelectPredecoratedRoom=" + a, bt.predecoratedRooms.push(n)
            }
        }
        if (bt.rooms = new Array, bt.isSavedRooms = !1, bt.roomType = Ct, "None" == Ct);
        else if ("Saved" == Ct) {
            bt.isSavedRooms = !0;
            for (var a = 0; a < aa.savedRoomsDecorateData.length; ++a) {
                var n = new Object;
                n.savedRoom = !0, n.selected = !1, n.disabled = !1, n.thumbnail = f(aa.savedRoomsDecorateData[a], 400, 300), mt && "undefined" != typeof aa.savedRoomsDecorateData[a].savedThumbnailDataURL && (n.thumbnail = aa.savedRoomsDecorateData[a].savedThumbnailDataURL), n.selectIdSelectRoom = "SelectSavedRoom=" + a, n.selectIdDeleteRoom = "DeleteSavedRoom=" + a, n.selectIdLoadSavedRoomAndShare = "LoadSavedRoomAnd=" + a + ",PrepareShareRoom", n.selectIdLoadSavedRoomAndEmail = "LoadSavedRoomAnd=" + a + ",EmailRoom", n.selectIdLoadSavedRoomAndPrint = "LoadSavedRoomAnd=" + a + ",PrintRoom", n.selectIdLoadSavedRoomAndViewTilesUsed = "LoadSavedRoomAnd=" + a + ",ViewTilesUsed", bt.rooms.push(n)
            }
        } else
            for (var s = e(), l = 0; l < s.length; ++l) {
                var a = s[l];
                if ("*" == Ct || Ct == Sa.rooms[a].type) {
                    var n = new Object;
                    n.savedRoom = !1, n.selected = !1, Sa.rooms[a].id == Dt.id && (n.selected = !0), n.thumbnail = v(Sa.rooms[a].id, 400, 300), "y" == Sa.rooms[a].hasThumbnail && (n.thumbnail = "thumbnails/rooms/" + Sa.rooms[a].id + ".png"), n.disabled = !1, n.selectIdSelectRoom = "SelectStockRoom=" + Sa.rooms[a].id, bt.rooms.push(n)
                }
            }
    }

    function F() {
        bt.tilesSearch = new Object, bt.tilesSearch.string = Pt, bt.tilesSearch.selectIdSearch = "Search", bt.tilesType = new Object, bt.tilesType.selectIdTilesType = "SelectTilesType";
        var e = X();
        bt.tiles = new Array, bt.pageNumber = 0, bt.productsPerPage = 20;
        for (var t = 0; t < e.tiles.length; ++t) {
            var a = e.tiles[t],
                r = new Object;
            r.nameText = a.name, r.skuText = a.sku, r.is = a.is, r.suitableFor = "", "Floor" != a.canGo && (r.suitableFor += ", Wall"), "Wall" != a.canGo && (r.suitableFor += ", Floor"), "Indoor" != a.canGoWhere && (r.suitableFor += ", Outdoor"), r.suitableFor = r.suitableFor.replace(", ", ""), r.sizeText = a.displaySize, r.priceText = "&pound;" + a.price.toFixed(2), a.soldInBoxes ? r.priceText2 = "price/box" : r.priceText2 = "price/tile";
            var o = Xe(a).toFixed(2);
            r.priceM2Text = "&pound;" + o, (a.isBorder || a.isCapping || a.isFinishingStrip) && (r.priceM2Text = ""), r.thumbnail = gt + "thumbnails/tiles/" + a.sku + ".jpg?" + uncache, r.selected = !1, a.sku == St && (r.selected = !0), r.disabled = !1, r.selectIdSelectTile = "SelectTile=" + a.sku, null != Dt && location.href.indexOf("testsubset") != -1 && ("" == Dt.testTilesSubset || "" != a.testSubset && Dt.testTilesSubset.indexOf(a.testSubset) != -1 || (r.disabled = !0, r.selectIdSelectTile = "")), bt.tiles.push(r)
        }
    }

    function M() {
        vout("updateGUIFiltersData()"), Z(), bt.selectIdApplyFilters = "ApplyFilters", bt.filters = new Array, bt.currentFilters = new Array;
        for (var e = 0; e < Sa.filters.length; ++e)
            if (("," + Sa.filters[e].useFor + ",").indexOf("," + yt + ",") != -1) {
                var t = new Object;
                t.titleText = Sa.filters[e].filterTitle, t.items = new Array;
                for (var a = 0; a < Sa.filters[e].filterValues.length; ++a) {
                    var r = new Object;
                    if (r.filterValueText = Sa.filters[e].filterValues[a], r.buttonSizeClass = Sa.filters[e].buttonSizeClass, r.selectIdFilter = "Filter=" + Sa.filters[e].dataProperty + "," + a, Wt[Sa.filters[e].dataProperty][a]) {
                        r.state = "Selected";
                        var o = new Object;
                        o.filterValueText = r.filterValueText, o.selectIdDeleteFilter = "DeleteFilter=" + Sa.filters[e].dataProperty + "," + a, bt.currentFilters.push(o)
                    } else 0 == Lt[Sa.filters[e].dataProperty][a] ? (r.state = "Disabled", r.selectIdFilter = "") : r.state = "Unselected";
                    t.items.push(r)
                }
                bt.filters.push(t)
            }
    }

    function E() {
        bt.grout = new Array;
        for (var e = 0; e < Sa.grout.length; ++e) {
            var t = Sa.grout[e],
                a = new Object;
            a.name = t.name, a.colour = t.rgb, a.selected = !1, t.rgb == $t && (a.selected = !0), a.disabled = !1, a.selectIdSelectGrout = "SelectGrout=" + t.rgb, bt.grout.push(a)
        }
    }

    function W() {
        bt.wallColours = new Array, bt.cabinetColours = new Array, bt.worktopColours = new Array;
        for (var e = 0; e < Sa.colours.length; ++e) {
            var t = Sa.colours[e].rgb,
                a = new Object;
            "Wall" == Sa.colours[e].type ? (a.colour = t, a.selected = !1, t == At && (a.selected = !0), a.disabled = !1, a.selectIdSelectColour = "SelectWallColour=" + t, bt.wallColours.push(a)) : "Cabinet" == Sa.colours[e].type ? (a.colour = t, a.selected = !1, t == xt && (a.selected = !0), a.disabled = !1, a.selectIdSelectColour = "SelectCabinetColour=" + t, bt.cabinetColours.push(a)) : (a.colour = t, a.selected = !1, t == Rt && (a.selected = !0), a.disabled = !1, a.selectIdSelectColour = "SelectWorktopColour=" + t, bt.worktopColours.push(a))
        }
    }

    function L() {
        bt.wishlist = new Object, bt.wishlist.selectIdRefreshWishlist = "RefreshWishlist", bt.wishlist.list = new Array;
        for (var e = 0; e < Mt.length; ++e) {
            var t = tt(Mt[e]);
            if (null != t) {
                var a = new Object;
                a.nameText = t.name, a.codeText = t.sku, a.sizeText = t.displaySize, a.priceText = "&pound;" + t.price.toFixed(2), t.soldInBoxes ? a.priceText2 = "price/box" : a.priceText2 = "price/tile";
                var r = Xe(t).toFixed(2);
                a.priceM2Text = "&pound;" + r, (t.isBorder || t.isCapping || t.isFinishingStrip) && (a.priceM2Text = ""), a.thumbnail = gt + "thumbnails/tiles/" + t.sku + ".jpg?" + uncache, a.selectIdAddTileToBasketStart = "AddTileToBasketStart=" + t.sku, a.selectIdDeleteFromWishlist = "DeleteWishlistTile=" + t.sku, bt.wishlist.list.push(a)
            }
        }
    }

    function Y() {
        if (bt.tilesUsed = new Object, bt.tilesUsed.list = new Array, null != Dt)
            for (var e = $a.getSortedTilesUsed().sort(), t = 0; t < e.length; ++t) {
                var a = tt(e[t]);
                if (null != a) {
                    var r = new Object;
                    r.nameText = a.name, r.codeText = a.sku, r.sizeText = a.displaySize, r.priceText = "&pound;" + a.price.toFixed(2), a.soldInBoxes ? r.priceText2 = "price/box" : r.priceText2 = "price/tile";
                    var o = Xe(a).toFixed(2);
                    r.priceM2Text = "&pound;" + o, (a.isBorder || a.isCapping || a.isFinishingStrip) && (r.priceM2Text = ""), r.thumbnail = gt + "thumbnails/tiles/" + a.sku + ".jpg?" + uncache, r.selectIdAddTileToBasketStart = "AddTileToBasketStart=" + a.sku, r.selectIdAddToWishlist = "AddTileToWishlist=" + a.sku, bt.tilesUsed.list.push(r)
                }
            }
    }

    function U() {
        var e = 0;
        bt.basket = new Object, bt.basket.selectIdRefreshBasket = "RefreshBasket", bt.basket.selectIdPay = "Pay", bt.basket.items = new Array;
        for (var t = 0, a = 0; a < Et.length; ++a) {
            var r = Et[a],
                o = r.tile,
                i = new Object;
            if (i.nameText = o.name, i.codeText = o.sku, i.quantityText = r.tempQuantity, t += r.quantity, i.isSample = r.isSample, o.isBorder || o.isCapping || o.isFinishingStrip ? i.coverageText = "" : i.coverageText = parseFloat(r.tempCoverageM2).toFixed(2).replace(/\.?0+$/, ""), r.isSample) {
                i.itemPriceText = "&pound;" + o.samplePrice.toFixed(2);
                var n = (r.quantity * o.samplePrice).toFixed(2);
                i.totalPriceText = "&pound;" + n, e += r.quantity * o.samplePrice
            } else {
                i.itemPriceText = "&pound;" + o.price.toFixed(2);
                var n = (r.quantity * o.price).toFixed(2);
                i.totalPriceText = "&pound;" + n, e += r.quantity * o.price
            }
            i.thumbnail = gt + "thumbnails/tiles/" + o.sku + ".jpg?" + uncache, i.selectIdUpdateQuantity = "UpdateBasketItemQuantity=" + a, i.selectIdUpdateCoverage = "UpdateBasketItemCoverage=" + a, i.selectIdDeleteFromBasket = "DeleteBasketItem=" + a, i.selectIdRefresh = "RefreshBasketItem=" + a, bt.basket.items.push(i)
        }
        bt.basket.grandTotalText = "&pound;" + e.toFixed(2), bt.basket.count = t
    }

    function G() {
        if (bt.addToBasketPopup = null, bt.addRangeToBasketPopup = null, null == qt) {
            bt.addRangeToBasketPopup = new Object, bt.addRangeToBasketPopup.items = new Array;
            for (var e = 0; e < _t.length; ++e) {
                bt.addRangeToBasketPopup.items.push(new Object), bt.addRangeToBasketPopup.items[e].nameText = _t[e].name, bt.addRangeToBasketPopup.items[e].thumbnailURL = gt + "thumbnails/tiles/" + _t[e].sku + ".jpg?" + uncache, bt.addRangeToBasketPopup.items[e].enable = zt[e], bt.addRangeToBasketPopup.items[e].quantity = Kt[e], bt.addRangeToBasketPopup.items[e].coverage = parseFloat(Qt[e]).toFixed(2).replace(/\.?0+$/, ""), bt.addRangeToBasketPopup.items[e].selectIdEnable = "UpdateAddTileRangeToBasketPopupEnable=" + e, bt.addRangeToBasketPopup.items[e].selectIdUpdateQuantity = "UpdateAddTileRangeToBasketPopupQuantity=" + e, bt.addRangeToBasketPopup.items[e].selectIdUpdateCoverage = "UpdateAddTileRangeToBasketPopupCoverage=" + e;
                var t = 0;
                null != _t[e] && (t = (Kt[e] * _t[e].price).toFixed(2)), bt.addRangeToBasketPopup.items[e].price = "&pound;" + t, bt.addRangeToBasketPopup.items[e].disable = !1;
                for (var a = !1, r = 0; r < Et.length; ++r)
                    if (Et[r].tile.sku == _t[e].sku && Et[r].isSample) {
                        a = !0;
                        break
                    }
                a = !1, a && (zt[e] = !1, bt.addRangeToBasketPopup.items[e].disable = !0, bt.addRangeToBasketPopup.items[e].enable = !1)
            }
            bt.addRangeToBasketPopup.selectIdAddTileRangeToBasket = "AddTileRangeToBasket"
        } else {
            bt.addToBasketPopup = new Object, bt.addToBasketPopup.quantity = Zt, Ot.isBorder || Ot.isCapping || Ot.isFinishingStrip ? bt.addToBasketPopup.coverage = "" : bt.addToBasketPopup.coverage = parseFloat(jt).toFixed(2).replace(/\.?0+$/, ""), bt.addToBasketPopup.selectIdUpdateQuantity = "UpdateAddTileToBasketPopupQuantity", bt.addToBasketPopup.selectIdUpdateCoverage = "UpdateAddTileToBasketPopupCoverage", bt.addToBasketPopup.selectIdAddTileToBasket = "AddTileToBasket";
            var t = 0;
            null != Ot && (t = (Zt * Ot.price).toFixed(2)), bt.addToBasketPopup.price = "&pound;" + t
        }
    }

    function V() {
        bt.addSampleTileRangePopup = new Object, bt.addSampleTileRangePopup.items = new Array;
        for (var e = 0; e < Jt.length; ++e) {
            bt.addSampleTileRangePopup.items.push(new Object), bt.addSampleTileRangePopup.items[e].nameText = Jt[e].name, bt.addSampleTileRangePopup.items[e].thumbnailURL = gt + "thumbnails/tiles/" + Jt[e].sku + ".jpg?" + uncache, bt.addSampleTileRangePopup.items[e].enable = ea[e], bt.addSampleTileRangePopup.items[e].selectIdEnable = "UpdateAddSampleTileRangeToBasketPopupEnable=" + e, bt.addSampleTileRangePopup.items[e].price = "&pound;" + Jt[e].samplePrice.toFixed(2), bt.addSampleTileRangePopup.items[e].disable = !1, bt.addSampleTileRangePopup.items[e].cantOrderSample = !1;
            var t = !1;
            if (Jt[e].canOrderSampleOnline) {
                for (var a = 0; a < Et.length; ++a)
                    if (Et[a].tile.sku == Jt[e].sku) {
                        t = !0;
                        break
                    }
            } else t = !0, bt.addSampleTileRangePopup.items[e].cantOrderSample = !0;
            t && (ea[e] = !1, bt.addSampleTileRangePopup.items[e].disable = !0, bt.addSampleTileRangePopup.items[e].enable = !1)
        }
        bt.addSampleTileRangePopup.selectIdAddSampleTileRangeToBasket = "AddSampleTileRangeToBasket"
    }

    function H() {
        bt.tilingAsRangeOrSinglePopup = new Object, bt.tilingAsRangeOrSinglePopup.selectIdSingle = "TilingAsRangeOrSinglePopupSetSingle", bt.tilingAsRangeOrSinglePopup.selectIdAbort = "TilingAsRangeOrSinglePopupAbort", bt.tilingAsRangePopup = new Object, bt.tilingAsRangePopup.items = new Array;
        for (var e = 0; e < Ht.length; ++e) bt.tilingAsRangePopup.items.push(new Object), bt.tilingAsRangePopup.items[e].nameText = Ht[e].name, bt.tilingAsRangePopup.items[e].thumbnailURL = gt + "thumbnails/tiles/" + Ht[e].sku + ".jpg?" + uncache, bt.tilingAsRangePopup.items[e].enable = Xt[e], bt.tilingAsRangePopup.items[e].percentage = Nt[e], bt.tilingAsRangePopup.items[e].selectIdEnable = "UpdateTilingAsRangePopupEnable=" + e, bt.tilingAsRangePopup.items[e].selectIdUpdatePercentage = "UpdateTilingAsRangePopupPercentage=" + e;
        bt.tilingAsRangePopup.selectIdFinished = "TilingAsRangePopupFinished", bt.tilingAsRangePopup.selectIdAbort = "TilingAsRangePopupAbort"
    }

    function X() {
        vout("getFilteredProducts()");
        var e = new Object;
        e.tiles = new Array;
        for (var t = new Array, a = 0; a < Sa.filters.length; ++a)
            if (t.push(!0), ("," + Sa.filters[a].useFor + ",").indexOf("," + yt + ",") != -1)
                for (var r = 0; r < Wt[Sa.filters[a].dataProperty].length; ++r)
                    if (Wt[Sa.filters[a].dataProperty][r]) {
                        t[a] = !1;
                        break
                    }
        for (var o = Pt.replace(/^\s+|\s+$/gm, ""), a = 0; a < Sa.tiles.length; ++a) {
            var i = Sa.tiles[a];
            switch (yt) {
                case "Wall Tiles":
                    if ("" != i.cornerTileBorderSKU) continue;
                    if ("Floor" == i.canGo) continue;
                    if (i.isBorder || i.isCapping || i.isFinishingStrip || i.isGlassSplashback) continue;
                    if ("Wood" == i.is) continue;
                    if ("Cabinet" == i.is || "Worktop" == i.is) continue;
                    break;
                case "Floor Tiles":
                    if ("" != i.cornerTileBorderSKU) continue;
                    if ("Wall" == i.canGo) continue;
                    if (i.isBorder || i.isCapping || i.isFinishingStrip || i.isGlassSplashback) continue;
                    if ("Wood" == i.is) continue;
                    if ("Cabinet" == i.is || "Worktop" == i.is) continue;
                    break;
                case "Mosaics":
                    if (i.isBorder || i.isCapping || i.isFinishingStrip || i.isGlassSplashback) continue;
                    if (i.typeFilter.indexOf(",Mosaic Tiles,") == -1) continue;
                    break;
                case "Natural Stone":
                    if (i.isBorder || i.isCapping || i.isFinishingStrip || i.isGlassSplashback) continue;
                    if (i.material.indexOf(",Natural Stone,") == -1) continue;
                    break;
                case "Borders":
                    i.isBorder || i.isCapping || i.isFinishingStrip ? e.tiles.push(i) : "" != i.cornerTileBorderSKU && e.tiles.push(i);
                    continue;
                    break;
                case "Capping and Finishing Strips":
                    (i.isCapping || i.isFinishingStrip) && e.tiles.push(i);
                    continue;
                    break;
                case "Wood Flooring":
                    if (i.isBorder || i.isCapping || i.isFinishingStrip || i.isGlassSplashback) continue;
                    "Wood" == i.is && e.tiles.push(i);
                    continue;
                    break;
                case "Cabinets Texture":
                    if (i.isBorder || i.isCapping || i.isFinishingStrip || i.isGlassSplashback) continue;
                    "Cabinet" == i.is && e.tiles.push(i);
                    continue;
                    break;
                case "Worktops Texture":
                    if (i.isBorder || i.isCapping || i.isFinishingStrip || i.isGlassSplashback) continue;
                    "Worktop" == i.is && e.tiles.push(i);
                    continue;
                    break;
                case "Glass Splashbacks":
                    i.isGlassSplashback && e.tiles.push(i);
                    continue
            }
            if ("" == o || null == Bt || Bt.indexOf(i.sku) != -1) {
                for (var n = 0, r = 0; r < Sa.filters.length; ++r)
                    for (var s = Sa.filters[r].dataProperty, l = 0; l < Wt[s].length; ++l)
                        if (t[r] || Wt[s][l] && "" != i[s] && i[s].indexOf("," + Sa.filters[r].filterValues[l] + ",") != -1) {
                            ++n;
                            break
                        }
                n == Sa.filters.length && e.tiles.push(i)
            }
        }
        return e
    }

    function N(e) {
        if ("DEV" == runningEnvironment || "TEST" == runningEnvironment || location.href.indexOf("?newtilesreview") != -1) {
            var t = Pt.replace(/^\s+|\s+$/gm, "");
            if ("" == t) return void e();
            Bt = new Array;
            for (var a = 0; a < Sa.tiles.length; ++a) {
                var r = Sa.tiles[a],
                    o = r.sku + " " + r.name + " " + r.material + " " + r.colour + " " + r.finish + " " + r.shape,
                    i = new RegExp("\\b" + t, "gi");
                null != o.match(i) && Bt.push(r.sku)
            }
            return void e()
        }
        var t = Pt.replace(/^\s+|\s+$/gm, "");
        if ("" == t) return void e();
        var n = "//www.toppstiles.co.uk/search/search_box_visualiser.php?search_phrase=" + t;
        VUtils.loadTextFromURL(n, function(t) {
            Bt = new Array;
            for (var a = t.split("|"), r = 0; r < a.length; ++r) {
                var o = at(a[r]);
                null != o && Bt.push(o.sku)
            }
            e()
        })
    }

    function q() {
        var e = !1;
        if (null != ta && (e = $a.isRoomDecorated()), bt.tools = new Object, bt.tools.selectIdCreateArea = "CreateZone", null == Ot) bt.tools.selectedTileThumbnail = null, bt.tools.selectedTileName = "", bt.tools.selectedColour = "FFFFFF";
        else {
            if (null != Ht) {
                for (var t = "", a = rt(Ot.sku), r = 0; r < a.length; ++r)
                    for (var o = 0; o < Ht.length; ++o) Xt[o] && Ht[o].sku == a[r] && ("" != t && (t += "-"), t += Ht[o].sku);
                bt.tools.selectedTileThumbnail = gt + "thumbnails/tiles/" + t + ".jpg?" + uncache
            } else bt.tools.selectedTileThumbnail = gt + "thumbnails/tiles/" + Ot.sku + ".jpg?" + uncache;
            bt.tools.selectedTileName = Ot.name, bt.tools.selectedColour = null;
            var i = null;
            "Grout" == oa && (i = $t), "WallColour" == oa ? i = At : "CabinetColour" == oa ? i = xt : "WorktopColour" == oa && (i = Rt), null != i && (bt.tools.selectedTileThumbnail = null, bt.tools.selectedColour = i, bt.tools.selectedTileName = "")
        }
        if (bt.tools.orderSampleEnabled = !1, null != Ot) {
            var a = rt(Ot.sku);
            if (null == Ht || null == a) {
                if (Ot.canOrderSampleOnline) {
                    for (var n = !1, r = 0; r < Et.length; ++r)
                        if (Et[r].tile.sku == Ot.sku) {
                            n = !0;
                            break
                        }
                    n || (bt.tools.orderSampleEnabled = !0, bt.tools.selectIdOrderSample = "OrderSample=" + Ot.sku)
                }
            } else {
                for (var s = !1, r = 0; r < a.length; ++r) {
                    var l = tt(a[r]);
                    if (null != l && l.canOrderSampleOnline) {
                        for (var n = !1, o = 0; o < Et.length; ++o)
                            if (Et[o].tile.sku == l.sku) {
                                n = !0;
                                break
                            }
                        if (!n) {
                            s = !0;
                            break
                        }
                    }
                }
                s && (bt.tools.orderSampleEnabled = !0, bt.tools.selectIdOrderSample = "OrderSample=" + Ot.sku)
            }
        }
        if (bt.tools.viewBasketEnabled = !1, Et.length > 0 && (bt.tools.viewBasketEnabled = !0), bt.tools.addToBasketEnabled = !1, null != Ot) {
            var a = rt(Ot.sku);
            if (null == Ht || null == a) {
                for (var c = !1, r = 0; r < Et.length; ++r)
                    if (Et[r].tile.sku == Ot.sku && Et[r].isSample) {
                        c = !0;
                        break
                    }
                c = !1, c || (bt.tools.selectIdAddTileToBasketStart = "AddTileToBasketStart=" + Ot.sku, bt.tools.addToBasketEnabled = !0)
            } else {
                for (var d = !1, r = 0; r < a.length; ++r) {
                    var l = tt(a[r]);
                    if (null != l) var c = !1;
                    for (var o = 0; o < Et.length; ++o)
                        if (Et[o].tile.sku == l.sku && Et[o].isSample) {
                            c = !0;
                            break
                        }
                    if (!c) {
                        d = !0;
                        break
                    }
                }
                d = !0, d && (bt.tools.selectIdAddTileToBasketStart = "AddTileToBasketStart=" + Ot.sku, bt.tools.addToBasketEnabled = !0)
            }
        }
        if (bt.tools.undoChangesEnabled = !1, $a.anythingToUndo() && (bt.tools.undoChangesEnabled = !0, bt.tools.selectIdUndoChanges = "UndoChanges"), bt.tools.redoChangesEnabled = !1, $a.anythingToRedo() && (bt.tools.redoChangesEnabled = !0, bt.tools.selectIdRedoChanges = "RedoChanges"), bt.tools.clearAllChangesEnabled = !1, $a.anythingToUndo() && (bt.tools.clearAllChangesEnabled = !0, bt.tools.selectIdClearAllChanges = "ClearAllChanges"), bt.tools.saveRoomEnabled = !1, e && e && ha && (bt.tools.saveRoomEnabled = !0, bt.tools.selectIdSaveRoom = "SaveRoom"), bt.tools.addToWishlistEnabled = !1, null != Ot) {
            bt.tools.selectIdAddToWishlist = "AddTileToWishlist=" + Ot.sku, bt.tools.addToWishlistEnabled = !0;
            for (var r = 0; r < Mt.length; ++r)
                if (Mt[r] == Ot.sku) {
                    bt.tools.addToWishlistEnabled = !1;
                    break
                }
        }
        bt.tools.productDetailsEnabled = !1, null != Ot && (bt.tools.selectIdProductDetails = "ProductDetails=" + Ot.sku, bt.tools.productDetailsEnabled = !0), bt.tools.rotateProductEnabled = !1, bt.tools.rotateProductSelected = !1, null != Ot && "Tile" == oa && "Cabinet" != Ot.is && "Worktop" != Ot.is && (bt.tools.rotateProductEnabled = !0, bt.tools.rotateProductSelected = Gt, bt.tools.selectIdRotateProduct = "RotateProductToggle"), bt.tools.changePatternEnabled = !1, bt.tools.changePatternSelected = !1, null != Ot && "Tile" == oa && ",None," != Ot.patternsAllowed && (bt.tools.changePatternEnabled = !0, bt.tools.selectIdChangePattern = "ChangePattern", bt.tools.currentPattern = Yt, Vt && (bt.tools.changePatternSelected = !0)), bt.tools.singleTileEnabled = !1, bt.tools.singleTileSelected = !1, null != Ot && "Tile" == oa && (Ot.size.indexOf("Modular Tiles") != -1 || "Wood" == Ot.is || "Cabinet" == Ot.is || "Worktop" == Ot.is || null != Ht || Ot.noSingleTile || (bt.tools.singleTileEnabled = !0, bt.tools.singleTileSelected = Ut, bt.tools.selectIdSingleTile = "SingleTileToggle")), bt.tools.shareRoomEnabled = !1, e && (bt.tools.shareRoomEnabled = !0, bt.tools.selectIdPrepareShareRoom = "PrepareShareRoom", bt.tools.selectIdShareRoom = "ShareRoom", bt.tools.selectIdEmailRoom = "EmailRoom"), bt.tools.printRoomEnabled = !1, e ? (bt.tools.printRoomEnabled = !0, bt.tools.selectIdPrintRoom = "PrintRoom") : bt.tools.selectIdPrintRoom = "PrintRoom"
    }

    function Z() {
        for (var e = new Array, t = 0; t < Sa.filters.length; ++t)
            if (e.push(!0), ("," + Sa.filters[t].useFor + ",").indexOf("," + yt + ",") != -1)
                for (var a = 0; a < Wt[Sa.filters[t].dataProperty].length; ++a)
                    if (Wt[Sa.filters[t].dataProperty][a]) {
                        e[t] = !1;
                        break
                    }
        for (var t = 0; t < Sa.filters.length; ++t)
            for (var a = 0; a < Wt[Sa.filters[t].dataProperty].length; ++a) Lt[Sa.filters[t].dataProperty][a] = 0;
        for (var t = 0; t < Sa.tiles.length; ++t)
            for (var r = Sa.tiles[t], a = 0; a < Sa.filters.length; ++a) {
                for (var o = 0, i = 0; i < Sa.filters.length; ++i)
                    if (i != a)
                        for (var n = Sa.filters[i].dataProperty, s = 0; s < Wt[n].length; ++s)
                            if (e[i] || Wt[n][s] && "" != r[n] && r[n].indexOf("," + Sa.filters[i].filterValues[s] + ",") != -1) {
                                ++o;
                                break
                            }
                if (o == Sa.filters.length - 1)
                    for (var n = Sa.filters[a].dataProperty, s = 0; s < Wt[n].length; ++s) r[n].indexOf("," + Sa.filters[a].filterValues[s] + ",") != -1 && ++Lt[n][s];
            }
    }

    function j(e, t, a, r) {
        var o = new Object,
            i = e.indexOf("=");
        if (i == -1) o.type = e, o.data = new Array;
        else
            for (o.type = e.substring(0, i), o.data = new Array; i < e.length - 1;) {
                var n = e.indexOf(",", i + 1);
                n == -1 && (n = e.length), o.data.push(e.substring(i + 1, n)), i = n
            }
        return void 0 != t && (o.data.push(t), void 0 != a && (o.data.push(a), void 0 != r && o.data.push(r))), o
    }

    function _(e, t) {
        D(!1);
        var a = !1;
        null == Dt && (a = !0), a || x("Loading..."), Ut = !1, Yt = "Brick";
        for (var r = 0; r < Sa.rooms.length; ++r)
            if (Sa.rooms[r].id == e) {
                Dt = Sa.rooms[r];
                break
            }
        if ($a.newRoomLoading(), B(), F(), mt) {
            var o = "scenes/" + Dt.id + "_Griddata.SVG?" + Math.random();
            va.loadSVGFromURL(o, function() {
                $a.roomLoaded(!0), ha = !1, q(), Y(), ga.update(), g(), ga.updateRoomRender(function() {
                    a || kt || A("Choose a tile from 'Decorate Your Room' on the left hand side to get started.", 1500), a || (kt = !0), Q(t)
                })
            })
        } else ga.updateRoomRender(function() {
            Q(t)
        })
    }

    function z(e, t) {
        D(!1), x("Loading..."), Ut = !1, Yt = "Brick";
        for (var a = 0; a < Sa.rooms.length; ++a)
            if (Sa.rooms[a].id == aa.savedRoomsDecorateData[e].roomId) {
                Dt = Sa.rooms[a];
                break
            }
        if ($a.newRoomLoading(), B(), B(), ya.track("Load Saved Stock Room"), mt) {
            var r = "scenes/" + Dt.id + "_Griddata.SVG?" + Math.random();
            va.loadSVGFromURL(r, function() {
                ta = VUtils.clone(aa.savedRoomsDecorateData[e]), $a.upgradeDecorateData(ta), $a.roomLoaded(!1), ha = !1, q(), Y(), ga.update(), g(), $a.setInitialDecoration(), ga.updateRoomRender(function() {
                    Q(function() {
                        null != ca && ("EmailRoom" == ca ? ga.forceSelectEmailRoom() : "PrepareShareRoom" == ca ? ga.forceSelectShareRoom() : "PrintRoom" == ca ? (ca = null, c()) : "ViewTilesUsed" == ca && (ca = null, ga.forceViewTilesUsed()), ca = null), void 0 != t && t()
                    })
                })
            })
        } else ga.updateRoomRender(function() {
            Q(t)
        })
    }

    function K(e, t) {
        x("Loading..."), D(!1), Ut = !1, Yt = "Brick";
        for (var a = 0; a < Sa.rooms.length; ++a)
            if (Sa.rooms[a].id == ra.predecoratedRoomsDecorateData[e].roomId) {
                Dt = Sa.rooms[a];
                break
            }
        if (wa.trackSelectStyledRoom(1 + parseInt(e), It), $a.newRoomLoading(), B(), q(), B(), mt) {
            var r = "scenes/" + Dt.id + "_Griddata.SVG?" + Math.random();
            va.loadSVGFromURL(r, function() {
                ta = VUtils.clone(ra.predecoratedRoomsDecorateData[e]), $a.roomLoaded(!1), g(), $a.setInitialDecoration(), ga.updateRoomRender(function() {
                    Q(t), D(!0)
                })
            })
        } else ga.updateRoomRender(function() {
            Q(t)
        })
    }

    function Q(e) {
        setTimeout(function() {
            var t = 0;
            switch (Dt.initialView) {
                case "Middle":
                    t = $(".scene")[0].scrollHeight / 2 - $(".scene").height() / 2;
                    break;
                case "Bottom":
                    t = $(".scene")[0].scrollHeight
            }
            $(".scene").scrollTop(t), void 0 != e && e()
        }, 1)
    }

    function J(e) {
        aa.savedRoomsDecorateData.splice(e, 1), P(), B()
    }

    function ee(e) {
        var t = Dt.id.replace("Room", "Room ");
        t += " " + e.replace("Area", "Area ");
        for (var a = 0; a < Sa.tileAreas.length; ++a) {
            var r = Sa.tileAreas[a];
            if (r.id.indexOf(t) != -1 && r.gridName.toLowerCase().indexOf("floor") != -1) return "Floor"
        }
        return "Wall"
    }

    function te(e, t) {
        for (var a = new Array, r = et(e.roomId), o = 0; o < r.tileAreaIds.length; ++o)
            for (var i = 0; i < Sa.tileAreas.length; ++i) {
                var n = Sa.tileAreas[i];
                if (n.id == r.tileAreaIds[o] && va.findGridIndexWithName(n.gridName) == t) {
                    var s = new Object;
                    s.decorateAreaData = e.areas[n.areaName], s.tileArea = n, a.push(s)
                }
            }
        return a
    }

    function ae(e) {
        for (var t = null, a = new Array, r = et(ta.roomId), o = 0; o < r.tileAreaIds.length; ++o)
            for (var i = 0; i < Sa.tileAreas.length; ++i) {
                var n = Sa.tileAreas[i];
                if (n.id == r.tileAreaIds[o] && va.findGridIndexWithName(n.gridName) == e) {
                    var s = new Object;
                    s.decorateAreaData = decorateData.areas[n.areaName], s.tileArea = n, a.push(s)
                }
            }
        return a
    }

    function re(e) {
        $a.getWebGLRoomRenderCanvas(e)
    }

    function oe(e, t, a, r) {
        var o = {
            base64Data: e.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, ""),
            folder: t,
            filename: a
        };
        $.post("vsavebase64.php", o, function(e) {
            null != r && r()
        })
    }

    function ie(e) {
        if (null != e && tt(e).isGlassSplashback && (Ht = null, Xt = null, Nt = null, $a.addGlassSplashback(tt(e))), oa = "Tile", St = e, Ot = tt(e), null != e) {
            var t = !1;
            null == ut && pa > 0 && (--pa, t = !0), Ot.isGlassSplashback && (t = !1), t && ("Cabinet" == Ot.is ? VUtils.isTabletOrPhoneDevice() ? A("Tap on a cabinet surface to apply.", 1500) : A("Click on a cabinet surface to apply.", 1500) : "Worktop" == Ot.is ? VUtils.isTabletOrPhoneDevice() ? A("Tap on a worktop surface to apply.", 1500) : A("Click on a worktop surface to apply.", 1500) : VUtils.isTabletOrPhoneDevice() ? A("Tap on a surface to lay your tiles.", 1500) : A("Click on a surface to lay your tiles.", 1500))
        }
        Gt = !1, Vt = !1, Ot.noSingleTile && (Ut = !1), "Wood" == Ot.is && (Ut = !1), "Cabinet" != Ot.is && "Worktop" != Ot.is || (Ut = !1), Ot.size.indexOf("Modular Tiles") != -1 && (Ut = !1), Ht = null, Xt = null, Nt = null;
        var a = rt(Ot.sku);
        if (null != a) {
            Ht = new Array, Nt = new Array, Xt = new Array, Ht.push(Ot), Nt.push(100), Xt.push(!0);
            for (var r = 0; r < a.length; ++r) a[r] != Ot.sku && (Ht.push(tt(a[r])), Nt.push(0), Xt.push(!1));
            H()
        }
        return F(), E(), q(), null != a
    }

    function ne(e) {
        oa = "Grout", $t = e, Gt = !1, Vt = !1, Ut = !1, E(), q()
    }

    function se(e) {
        wa.trackSelectWallColour(e), oa = "WallColour", At = e, Gt = !1, Vt = !1, Ut = !1, W(), q()
    }

    function le(e) {
        wa.trackSelectCabinetColour(e), oa = "CabinetColour", xt = e, Gt = !1, Vt = !1, Ut = !1, W(), q()
    }

    function ce(e) {
        wa.trackSelectWorktopColour(e), oa = "WorktopColour", Rt = e, Gt = !1, Vt = !1, Ut = !1, W(), q()
    }

    function de(e) {
        yt = e, M(), F()
    }

    function ue(e, t) {
        Wt[e][t] ? Wt[e][t] = !1 : Wt[e][t] = !0, M()
    }

    function he(e, t) {
        Wt[e][t] = !1, M(), F()
    }

    function pe() {
        F()
    }

    function ge(e, t) {
        function a() {
            ++Ft;
            var e = Ft;
            N(function() {
                Ft == e && (M(), F(), t())
            })
        }
        Pt = e, a()
    }

    function fe(e) {
        A("Your selected tile has been added to the 'Your Favourites' section which can be accessed from the left hand tab.", 1500), i(function() {
            Mt.indexOf(e) == -1 && Mt.push(e), n(), L(), q()
        })
    }

    function ve(e) {
        i(function() {
            for (var t = 0; t < Mt.length; ++t)
                if (Mt[t] == e) {
                    Mt.splice(t, 1);
                    break
                }
            n(), L(), q()
        })
    }

    function me() {
        i()
    }

    function be() {
        for (var e = 0; e < Et.length; ++e) {
            var t = Et[e];
            t.tempQuantity = t.quantity, t.tempCoverageM2 = Ve(t.tile, t.tempQuantity)
        }
        o()
    }

    function Te() {
        window.open("//www.toppstiles.co.uk/e360/s_basket_view_basket.asp")
    }

    function ke() {
        if (Jt = null, null == Ot) return !1;
        var e = rt(Ot.sku);
        if (null != Ht && null != e) {
            Jt = new Array, ea = new Array;
            for (var t = 0; t < Ht.length; ++t) Jt.push(Ht[t]), ea.push(Xt[t]);
            return V(), !0
        }
        for (var t = 0; t < Et.length; ++t) Et[t].tile.sku == Ot.sku && (Et[t].isSample || A("This product is already in the basket.", 1500));
        var a = new Object;
        return a.tile = Ot, a.isSample = !0, a.quantity = 1, a.tempQuantity = a.quantity, a.tempCoverageM2 = Ve(Ot, a.tempQuantity), Et.push(a), A("A sample has been added to your basket.", 1500), wa.trackUpdateBasket([Ot], [1]), r(Ot, -999999, function() {
            U(), q(), ga.update()
        }), !1
    }

    function we() {
        for (var e = !1, t = new Array, r = new Array, o = 0, i = 0; i < Jt.length; ++i)
            if (ea[i]) {
                for (var n = !1, s = 0; s < Et.length; ++s)
                    if (Et[s].tile.sku == Jt[i].sku && !Et[s].isSample) {
                        n = !0;
                        break
                    }
                if (!n) {
                    e = !0, ++o;
                    var l = new Object;
                    l.tile = Jt[i], l.isSample = !0, l.quantity = 1, l.tempQuantity = l.quantity, l.tempCoverageM2 = Ve(Jt[i], l.tempQuantity), Et.push(l), t.push(Jt[i]), r.push(-999999)
                }
            }
        o > 0 && a(t, r, function() {
            U(), q(), ga.update()
        }), e ? A("Sample(s) have been added to your basket.", 1500) : A("These product(s) are already in the basket.", 1500), 0 == o && (U(), q(), ga.update())
    }

    function ye(e) {
        qt = null, _t = null;
        var t = rt(e);
        if (null != Ht && null != t) {
            _t = new Array, zt = new Array, Kt = new Array, Qt = new Array;
            for (var a = 0; a < Ht.length; ++a) _t.push(Ht[a]), zt.push(Xt[a]), Kt.push(1), Qt.push(Ve(tt(t[a]), 1))
        } else qt = tt(e), Zt = 1, jt = Ve(qt, Zt);
        G()
    }

    function Se() {
        function e() {
            var e = new Object;
            e.tile = qt, e.isSample = !1, e.quantity = parseInt(Zt), e.tempQuantity = e.quantity, e.tempCoverageM2 = Ve(qt, e.tempQuantity), Et.push(e), wa.trackUpdateBasket([qt], [e.quantity]), r(qt, e.quantity, function() {
                U(), q(), ga.update()
            })
        }
        var t = parseInt(Zt);
        if (isNaN(t)) return A("Invalid quantity.", 1500), !1;
        if (0 == t) return A("Quantity must not be zero.", 1500), !1;
        A("The item has been added to your basket.", 1500);
        for (var a = 0; a < Et.length; ++a)
            if (Et[a].tile.sku == qt.sku && !Et[a].isSample) return Et[a].quantity += parseInt(Zt), Et[a].tempQuantity = Et[a].quantity, Et[a].tempCoverageM2 = Ve(Et[a].tile, Et[a].tempQuantity), wa.trackUpdateBasket([qt], [Et[a].quantity]), U(), q(), !0;
        for (var a = 0; a < Et.length; ++a)
            if (Et[a].tile.sku == qt.sku && Et[a].isSample) return Et.splice(a, 1), r(qt, -1, function() {
                e()
            }), !0;
        return e(), !0
    }

    function $e() {
        for (var e = 0; e < _t.length; ++e) {
            var t = parseInt(Kt[e]);
            if (isNaN(t)) return A("Invalid quantity.", 1500), !1;
            if (0 == t) return A("Quantity must not be zero.", 1500), !1
        }
        for (var r = !1, o = new Array, i = new Array, n = !1, s = 0, e = 0; e < _t.length; ++e)
            if (zt[e] && 0 != Kt[e]) {
                n = !0;
                for (var l = !1, c = 0; c < Et.length; ++c) Et[c].tile.sku == _t[e].sku && (Et[c].isSample || (Et[c].quantity += parseInt(Kt[e]), Et[c].tempQuantity = Et[c].quantity, Et[c].tempCoverageM2 = Ve(Et[c].tile, Et[c].tempQuantity), l = !0));
                if (!l)
                    for (var c = 0; c < Et.length; ++c) Et[c].tile.sku == _t[e].sku && Et[c].isSample && (l = !0, ++s, o.push(_t[e]), i.push(-1), Et[c].isSample = !1, Et[c].quantity = parseInt(Kt[e]), Et[c].tempQuantity = Et[c].quantity, Et[c].tempCoverageM2 = Ve(_t[e], Et[c].tempQuantity), o.push(_t[e]), i.push(Et[c].quantity));
                if (!l) {
                    ++s;
                    var d = new Object;
                    d.tile = _t[e], d.isSample = !1, d.quantity = parseInt(Kt[e]), d.tempQuantity = d.quantity, d.tempCoverageM2 = Ve(_t[e], d.tempQuantity), Et.push(d), o.push(_t[e]), i.push(d.quantity)
                }
            }
        return s > 0 && a(o, i, function() {
            U(), q(), ga.update()
        }), n && A("The item(s) have been added to your basket.", 1500), 0 == s && (U(), q(), ga.update()), !0
    }

    function Ae(e) {
        wa.trackUpdateBasket([Et[e].tile], [-Et[e].mainSiteQuantity]), r(Et[e].tile, -Et[e].mainSiteQuantity, function() {
            Et.splice(e, 1), U(), q(), ga.update()
        })
    }

    function xe(e) {
        e = parseInt(e);
        var t = parseInt(Et[e].tempQuantity);
        return isNaN(t) ? void A("Invalid quantity.", 1500) : 0 == t ? void A("Quantity must not be zero.", 1500) : Et[e].isSample && !1 ? void(1 != t && (Et[e].quantity = 1, Et[e].tempQuantity = 1, U(), q(), A("You can only order one sample tile.", 1500))) : (A("Your basket has been updated.", 1500), Et[e].isSample ? (Et[e].isSample = !1, Et[e].quantity = parseInt(t), Et[e].tempQuantity = Et[e].quantity, Et[e].tempCoverageM2 = Ve(Et[e].tile, Et[e].tempQuantity), void r(Et[e].tile, -1, function() {
            wa.trackUpdateBasket([Et[e].tile], [Et[e].quantity]), r(Et[e].tile, Et[e].quantity), U(), q(), ga.update()
        })) : (Et[e].quantity = Et[e].tempQuantity, wa.trackUpdateBasket([Et[e].tile], [Et[e].quantity]), r(Et[e].tile, Et[e].quantity), U(), void q()))
    }

    function Re(e, t) {
        t = parseInt(t), Et[parseInt(e)].tempQuantity = t, isNaN(t) ? Et[parseInt(e)].tempCoverageM2 = 0 : Et[parseInt(e)].tempCoverageM2 = Ve(Et[parseInt(e)].tile, t), U(), q()
    }

    function Ce(e, t) {
        if (t = parseFloat(t), Et[parseInt(e)].tempCoverageM2 = t, isNaN(t)) Et[parseInt(e)].tempQuantity = 0;
        else {
            var a = He(Et[parseInt(e)].tile, t);
            Et[parseInt(e)].tempQuantity = parseInt(a)
        }
        U(), q()
    }

    function Ie(e) {
        e = parseInt(e), Zt = e, isNaN(e) ? (Zt = 0, jt = 0) : jt = Ve(qt, e), G()
    }

    function De(e) {
        e = parseFloat(e), jt = e, Zt = isNaN(e) ? 0 : parseInt(He(qt, e)), G()
    }

    function Oe(e) {
        zt[e] = !zt[e], G()
    }

    function Pe(e, t) {
        t = parseInt(t), Kt[e] = t, isNaN(t) ? (Kt[e] = 0, Qt[e] = 0) : Qt[e] = Ve(_t[e], t), G()
    }

    function Be(e, t) {
        t = parseFloat(t), Qt[e] = t, isNaN(t) ? Kt[e] = 0 : Kt[e] = parseInt(He(_t[e], t)), G()
    }

    function Fe(e) {
        ea[e] = !ea[e], V()
    }

    function Me(e) {
        Xt[e] = !Xt[e];
        for (var t = 0, a = 0; a < Ht.length; ++a) Xt[a] && ++t;
        for (var a = 0; a < Ht.length; ++a) Xt[a] && 0 != t ? Nt[a] = parseInt(100 / t) : Nt[a] = 0;
        var r = 100 - t * parseInt(100 / t);
        if (0 != r)
            for (var a = 0; a < Ht.length && (!Xt[a] || (++Nt[a], --r, 0 != r)); ++a);
        H()
    }

    function Ee(e, t) {
        return t = parseInt(t), isNaN(t) && (t = 0), Nt[e] = t, H(), Ge()
    }

    function We() {
        for (var e = 0, t, a = 0; a < Ht.length; ++a) Xt[a] && (++e, t = Ht[a]);
        1 == e ? (Ht = null, Ot = t) : Ut = !1, q()
    }

    function Le() {
        Ht = null
    }

    function Ye() {
        Ht = null, q()
    }

    function Ue() {
        Ht = null
    }

    function Ge() {
        for (var e = null, t = 0, a = 0; a < Ht.length; ++a)
            if (Xt[a]) {
                if (0 == Nt[a]) return "Percentage must not be zero";
                if (Nt[a] > 100) return "Percentages must not be over 100";
                t += Nt[a]
            }
        return 100 != t ? "Your percentage mix of tiles must total 100%" : null
    }

    function Ve(e, t) {
        var a = t * (e.widthCM / 100) * (e.heightCM / 100);
        return 0 != e.packCoverageOverride ? a = t * e.packCoverageOverride : e.soldInBoxes && (a *= e.numberInBox), a = a.toFixed(4), a = a.replace(/\.?0+$/, "")
    }

    function He(e, t) {
        var a = e.widthCM / 100 * (e.heightCM / 100);
        e.soldInBoxes && (a *= e.numberInBox), 0 != e.packCoverageOverride && (a = e.packCoverageOverride);
        var r = Math.ceil(t / a);
        return r
    }

    function Xe(e) {
        var t = 1,
            a = e.widthCM / 100 * (e.heightCM / 100);
        e.soldInBoxes && (a *= e.numberInBox), 0 != e.packCoverageOverride && (a = e.packCoverageOverride);
        var r = t / a;
        return r * e.price
    }

    function Ne() {
        $a.doAddZone()
    }

    function qe() {
        Gt = !Gt, Gt && (VUtils.isTabletOrPhoneDevice() ? A("Tap on a surface to rotate the pattern. To change more than one surface tap ‘Rotate Pattern’ each time.", 3e3) : A("Click on a surface to rotate the pattern. To change more than one surface click ‘Rotate Pattern’ each time.", 3e3)), Vt = !1, Ut = !1, q()
    }

    function Ze() {
        Ut = !Ut, Gt = !1, Vt = !1, q()
    }

    function je() {
        for (var e = 0; e < aa.savedRoomsDecorateData.length; ++e) {
            var t = et(aa.savedRoomsDecorateData[e].roomId);
            "-" == t.texturedWorktopsCabinets && (aa.savedRoomsDecorateData.splice(e, 1), --e)
        }
        P();
        for (var e = 0; e < aa.savedRoomsDecorateData.length; ++e) {
            var t = et(aa.savedRoomsDecorateData[e].roomId);
            "" != t.ignoreOldRoom && (aa.savedRoomsDecorateData.splice(e, 1), --e)
        }
        P(), _e(), bt = new Object, it && (fe("631789"), fe("811490"), fe("811627"), fe("630089"), fe("811639")), nt && ie("634376"), F(), E(), W(), M(), L(), U(), q(), Y()
    }

    function _e() {
        Wt = new Object, Lt = new Object;
        for (var e = 0; e < Sa.filters.length; ++e) {
            Wt[Sa.filters[e].dataProperty] = new Array, Lt[Sa.filters[e].dataProperty] = new Array;
            for (var t = 0; t < Sa.filters[e].filterValues.length; ++t) Wt[Sa.filters[e].dataProperty].push(!1), Lt[Sa.filters[e].dataProperty].push(0)
        }
    }

    function ze(e) {
        if (mt) {
            Sa.rooms = Sa.webGLRooms, Sa.tileAreas = Sa.webGLTileAreas;
            for (var t = 0; t < Sa.colours.length; ++t) Sa.colours[t].rgb = VUtils.convertRGBToHex(Sa.colours[t].rgb.split(",")[0], Sa.colours[t].rgb.split(",")[1], Sa.colours[t].rgb.split(",")[2])
        }
        vout("setupDatabase(): Start"), skuEntries = new Object;
        for (var t = 0; t < Sa.processedTiles.length; ++t) "-" != Sa.processedTiles[t].sku && "" == $.trim(Sa.processedTiles[t].ignore) && (skuEntries[Sa.processedTiles[t].sku] = t);
        vout("setupDatabase(): Finish 0");
        var a = new Array;
        $xml = $(e);
        var r = 0;
        $xml.find("item").each(function(e) {
            ++r;
            var t = new Object,
                o = $("ToppsSKU", this).text(),
                i = !1;
            if (!i) {
                var n = skuEntries[o];
                if (void 0 != n) {
                    if (t.testSubset = Sa.processedTiles[n].testSubset, t.rangeSKUs = Sa.processedTiles[n].rangeSKUs, t.productDetailsLink = Sa.processedTiles[n].productDetailsLink, t.cornerPointOnTile = Sa.processedTiles[n].cornerPointOnTile, t.cornerTileBorderSKU = Sa.processedTiles[n].cornerTileBorderSKU, t.borderTileCornerSKU = Sa.processedTiles[n].borderTileCornerSKU, t.noSingleTile = !1, "" != Sa.processedTiles[n].noSingleTile && (t.noSingleTile = !0), t.sortOrder = parseInt($("visualizer_order", this).text()), t.ignore = Sa.processedTiles[n].ignore, t.patternsAllowed = "," + Sa.processedTiles[n].patternsAllowed + ",", t.is = "Tile", "Tile" != $("type", this).text() && "Splashbacks" != $("type", this).text() && (t.is = "Wood"), t.sku = o, t.id360 = $("id360", this).text(), t.name = $("title", this).text(), t.widthCM = parseFloat($("width", this).text()), t.heightCM = parseFloat($("height", this).text()), t.displaySize = $("width", this).text() + "cm x " + $("height", this).text() + "cm", t.canGo = "", $("Tile_Type", this).text().toLowerCase().indexOf("wall") != -1 && $("Tile_Type", this).text().toLowerCase().indexOf("floor") != -1 ? t.canGo = "Both" : $("Tile_Type", this).text().toLowerCase().indexOf("wall") != -1 ? t.canGo = "Wall" : $("Tile_Type", this).text().toLowerCase().indexOf("floor") != -1 && (t.canGo = "Floor"), location.href.indexOf("testsubset") != -1 && "" != t.testSubset && (t.canGo = "Both"), t.canGoWhere = "Indoor", $("Tile_Suitability", this).text().toLowerCase().indexOf("outdoor") != -1 && ($("Tile_Suitability", this).text().toLowerCase().indexOf("indoor") != -1 ? t.canGoWhere = "Both" : t.canGoWhere = "Outdoor"), t.typeFilter = ",", $("Tile_Type", this).text().toLowerCase().indexOf("wall") != -1 && (t.typeFilter += "Wall Tiles,"), $("Tile_Type", this).text().toLowerCase().indexOf("floor") != -1 && (t.typeFilter += "Floor Tiles,"), $("Tile_Suitability", this).text().toLowerCase().indexOf("outdoor") != -1 && (t.typeFilter += "Suitable For Outdoor,"), $("Tile_Sort", this).text().toLowerCase().indexOf("mosaic") != -1 && (t.typeFilter += "Mosaic Tiles,"), $("Tile_Sort", this).text().toLowerCase().indexOf("border") != -1 && (t.typeFilter += "Borders,"), $("Tile_Sort", this).text().toLowerCase().indexOf("decor") != -1 && (t.typeFilter += "Decors,"), t.fireplaceTile = !1, $("Tile_Suitability", this).text().toLowerCase().indexOf("use around a fireplace") != -1 && (t.typeFilter += "Suitable For Fireplaces,", t.fireplaceTile = !0), t.isBorder = !1, "border" == $("Tile_Sort", this).text().toLowerCase() && (t.isBorder = !0), t.isCapping = !1, "capping" == $("Tile_Sort", this).text().toLowerCase() && (t.isCapping = !0), t.isFinishingStrip = !1, "finishing strip" == $("Tile_Sort", this).text().toLowerCase() && (t.isFinishingStrip = !0), t.type = $("Tile_Sort", this).text(), t.width = Math.max(t.widthCM, t.heightCM) * ht, t.height = Math.min(t.widthCM, t.heightCM) * ht, t.noForceLandscape = !1, "" != Sa.processedTiles[n].noForceLandscape && (t.noForceLandscape = !0, t.width = t.widthCM * ht, t.height = t.heightCM * ht), "" != Sa.processedTiles[n].overrideWH && (t.width = parseInt(Sa.processedTiles[n].overrideWH.split(",")[0]), t.height = parseInt(Sa.processedTiles[n].overrideWH.split(",")[1])), t.smallMosaicsW = 1, t.smallMosaicsH = 1, t.mosaicsMultiplierW = 1, t.mosaicsMultiplierH = 1, "Mosaic" == t.type ? (t.width = t.widthCM * ht, t.height = t.heightCM * ht, "" == Sa.processedTiles[n].numSmallMosaics && (Sa.processedTiles[n].numSmallMosaics = "1,1"), t.smallMosaicsW = parseInt(Sa.processedTiles[n].numSmallMosaics.split(",")[0]), t.smallMosaicsH = parseInt(Sa.processedTiles[n].numSmallMosaics.split(",")[1]), "" != Sa.processedTiles[n].mosaicsMultiplier ? (t.mosaicsMultiplierW = Sa.processedTiles[n].mosaicsMultiplier.split(",")[0], t.mosaicsMultiplierH = Sa.processedTiles[n].mosaicsMultiplier.split(",")[1]) : (t.mosaicsMultiplierW = 1, t.mosaicsMultiplierH = 1)) : "" != Sa.processedTiles[n].mosaicsMultiplier && (t.mosaicsMultiplierW = Sa.processedTiles[n].mosaicsMultiplier.split(",")[0], t.mosaicsMultiplierH = Sa.processedTiles[n].mosaicsMultiplier.split(",")[1]), t.effect = "," + $("Collection", this).text() + ",", t.effect = t.effect.replace("Wood Effect Tiles", "Wood Effect"), t.effect = t.effect.replace("Brick Effect Tiles", "Brick Effect"), t.effect = t.effect.replace("Patchwork and Pattern", "Patterned Tiles"), t.size = "," + $("Size", this).text() + ",", t.material = "," + $("Tile_Material", this).text() + ",", t.colour = "," + $("Colour", this).text() + ",", t.shape = "," + $("Tile_Shape", this).text() + ",", ",," == t.shape && (t.shape = ""), t.finish = "," + $("Tile_Finish", this).text() + ",", t.mosaicFilter = ",", "Mosaic" == t.type) {
                        t.material.indexOf(",Natural Stone,") != -1 && (t.mosaicFilter += "Natural Stone Mosaics,"), t.colour.indexOf(",White,") == -1 && t.colour.indexOf(",Silver,") == -1 || (t.mosaicFilter += "White & Silver Mosaics,"), t.colour.indexOf(",Black,") == -1 && t.colour.indexOf(",White,") == -1 && t.colour.indexOf(",Grey,") == -1 || (t.mosaicFilter += "Black&#44; White & Grey Mosaics,");
                        for (var s = t.colour.split(","), l = 0; l < s.length; ++l)
                            if ("" != s[l]) {
                                var c = "," + s[l] + ",";
                                if (",Black," != c && ",White," != c && ",Grey," != c && ",Beige," != c && ",Cream," != c && ",Ivory," != c && ",Pearl," != c) {
                                    t.mosaicFilter += ",Coloured Mosaics,";
                                    break
                                }
                            }("," + $("Collection", this).text() + ",").indexOf("Neutrals") != -1 && (t.mosaicFilter += "Neutral Mosaics,")
                    }
                    if (t.naturalStoneFilter = ",", t.material.indexOf(",Natural Stone,") != -1) {
                        t.naturalStoneFilter = t.material;
                        var d = ["Natural Stone", "Glass", "Porcelain"];
                        for (l = 0; l < d.length; ++l)
                            do t.naturalStoneFilter = t.naturalStoneFilter.replace("," + d[l], ","); while (t.naturalStoneFilter.indexOf("," + d[l] + ",") != -1);
                        t.finish.indexOf("Splitface") != -1 && (t.naturalStoneFilter += "Split Face Mosaics,"), ("," + $("Collection", this).text() + ",").indexOf("Flagstones") != -1 && (t.naturalStoneFilter += "Flagstones,")
                    }
                    t.price = parseFloat($("price", this).text()), t.soldInBoxes = !1, t.numberInBox = 0, "0" != $("soldinboxes", this).text() && (t.soldInBoxes = !0, t.numberInBox = parseInt($("numberinbox", this).text()), t.price *= t.numberInBox), t.canOrderSampleOnline = !1, t.sampleSKU = "111111", t.samplePrice = 9999.99, "1" == $("sample_order_online", this).text() && (t.canOrderSampleOnline = !0, t.sampleSKU = $("samplesku", this).text(), t.samplePrice = parseFloat($("SamplePrice", this).text())), t.packCoverageOverride = parseFloat($("packcoverage", this).text()), t.isGlassSplashback = !1, "" != Sa.processedTiles[n].isGlassSplashback && (t.isGlassSplashback = !0), t.isSyren = !1, ["634374", "634375", "634376", "634377", "634378"].indexOf(t.sku) != -1 && (t.isSyren = !0), a.push(t)
                }
            }
        });
        for (var t = 0; t < Sa.processedTiles.length; ++t) {
            var o = Sa.processedTiles[t];
            if (o.sku.indexOf("CWood") != -1 || o.sku.indexOf("WWood") != -1 || o.sku.indexOf("WGranite") != -1 || o.sku.indexOf("CColour") != -1 || o.sku.indexOf("WColour") != -1) {
                var i = new Object;
                i.testSubset = "", i.rangeSKUs = "", i.productDetailsLink = "", i.noSingleTile = !0, i.sortOrder = 1e5 + t, i.ignore = "", i.patternsAllowed = "All", i.sku = o.sku, i.id360 = "", i.name = "", i.displaySize = "", i.canGo = "Both", i.canGoWhere = "Indoor", i.typeFilter = ",", i.fireplaceTile = !1, i.isBorder = !1, i.isCapping = !1, i.isFinishingStrip = !1, i.type = "Plain", i.smallMosaicsW = 1, i.smallMosaicsH = 1, i.mosaicsMultiplierW = 1, i.mosaicsMultiplierH = 1, i.effect = "", i.size = "", i.material = "", i.colour = "", i.shape = "", i.finish = "", i.mosaicFilter = "", i.naturalStoneFilter = "", i.price = 0, i.soldInBoxes = !1, i.numberInBox = 0, i.canOrderSampleOnline = !1, i.sampleSKU = "111111", i.samplePrice = 9999.99, i.packCoverageOverride = "", i.cornerTileBorderSKU = "", i.borderTileCornerSKU = "", i.isGlassSplashback = !1, o.sku.indexOf("CWood") != -1 ? (i.is = "Cabinet", i.widthCM = 121.92, i.heightCM = 121.92) : o.sku.indexOf("WWood") != -1 ? (i.is = "Worktop", i.widthCM = 61, i.heightCM = 61) : o.sku.indexOf("CColour") != -1 ? (i.is = "Cabinet", i.widthCM = 8, i.heightCM = 8) : o.sku.indexOf("WColour") != -1 ? (i.is = "Worktop", i.widthCM = 8, i.heightCM = 8) : (i.is = "Worktop", i.widthCM = parseInt(Sa.processedTiles[t].overrideWH.split(",")[0]), i.heightCM = parseInt(Sa.processedTiles[t].overrideWH.split(",")[1])), i.width = Math.max(i.widthCM, i.heightCM) * ht, i.height = Math.min(i.widthCM, i.heightCM) * ht, a.push(i)
            }
        }
        if (a.sort(function(e, t) {
                return e.sortOrder - t.sortOrder
            }), location.href.indexOf("testfinish") != -1)
            for (var n = ["matt", "satin", "gloss", "glazed", "polished"], s = 0; s < n.length; ++s) {
                var l = n[s];
                vout(l);
                for (var c = 0, t = 0; t < a.length && c < 8; ++t) a[t].finish.toLowerCase().indexOf(l) != -1 && (a.splice(0, 0, a[t]), a.splice(t + 1, 1), ++c)
            }
        if (location.href.indexOf("testsubset") != -1) {
            for (var t = 0; t < a.length; ++t) "" != a[t].testSubset && (a.unshift(a[t]), a.splice(t + 1, 1));
            for (var t = 0; t < a.length; ++t) "2" == a[t].testSubset && (a.unshift(a[t]), a.splice(t + 1, 1))
        }
        vout("setupDatabase(): Finish 1"), Sa.tiles = a, Sa.processedTiles = null;
        for (var t = 0; t < Sa.filters.length; ++t) {
            var d = Sa.filters[t].filterValues;
            if (!(d.length > 0)) {
                for (var u = Sa.filters[t].dataProperty, h = 0; h < Sa.tiles.length; ++h)
                    if ("" != Sa.tiles[h][u])
                        for (var p = Sa.tiles[h][u].split(","), g = 0; g < p.length; ++g) "" != p[g] && d.indexOf(p[g]) == -1 && d.push(p[g]);
                if (Sa.filters[t].filterValues.sort(), "-" != Sa.filters[t].orderOverride) {
                    var f = Sa.filters[t].orderOverride.split(","),
                        v = VUtils.clone(Sa.filters[t].filterValues);
                    Sa.filters[t].filterValues = new Array;
                    for (var h = 0; h < f.length; ++h) Sa.filters[t].filterValues.push(v[f[h]])
                }
            }
        }
        vout("setupDatabase(): Finish 2")
    }

    function Ke(e) {
        $xml = $(e);
        var t = "";
        t += "--- START ---\n";
        for (var a = 0; a < Sa.processedTiles.length; ++a) {
            var r = Sa.processedTiles[a];
            t += r.sku + "\t";
            var o = !1;
            $xml.find("item").each(function(e) {
                o || $("ToppsSKU", this).text() == r.sku && (o = !0)
            }), t += o ? "OK\n" : "Not In TT XML Feed 12-Mar-2015\n"
        }
        t += "--- END ---\n", vout(t)
    }

    function Qe(e) {
        var t = tt(e),
            a = "tp";
        return t.finish.toLowerCase().indexOf(",gloss,") != -1 ? a + "G4" : t.finish.toLowerCase().indexOf(",polished,") != -1 ? a + "G4" : t.finish.toLowerCase().indexOf(",glazed,") != -1 ? a + "G4" : t.finish.toLowerCase().indexOf(",satin,") != -1 ? a + "G1" : a + "G0"
    }

    function Je(e) {
        var t = new Object;
        return t.normalScale = 1, t.reflectivity = 0, t.shininess = 6, t.HDRalpha = .7, e.finish.toLowerCase().indexOf(",polished,") != -1 ? (t.normalScale = 1, t.reflectivity = 1, t.shininess = 50, t.HDRalpha = 1) : e.finish.toLowerCase().indexOf(",glazed,") != -1 ? (t.normalScale = 1, t.reflectivity = 1, t.shininess = 45, t.HDRalpha = 1) : e.finish.toLowerCase().indexOf(",gloss,") != -1 ? (t.normalScale = 1, t.reflectivity = .9, t.shininess = 40, t.HDRalpha = .9) : e.finish.toLowerCase().indexOf(",satin,") != -1 && (t.normalScale = 1, t.reflectivity = .4, t.shininess = 20, t.HDRalpha = 1), t
    }

    function et(e) {
        for (var t = 0; t < Sa.rooms.length; ++t)
            if (Sa.rooms[t].id == e) return Sa.rooms[t];
        return null
    }

    function tt(e) {
        for (var t = 0; t < Sa.tiles.length; ++t)
            if (Sa.tiles[t].sku == e) return Sa.tiles[t];
        return null
    }

    function at(e) {
        for (var t = 0; t < Sa.tiles.length; ++t)
            if (Sa.tiles[t].id360 == e) return Sa.tiles[t];
        return null
    }

    function rt(e) {
        if (!mt) return null;
        var t = tt(e);
        if (null == t) return null;
        if ("" == t.rangeSKUs) return null;
        for (var a = new Array, r = 0; r < t.rangeSKUs.split(",").length; ++r) null != tt(t.rangeSKUs.split(",")[r]) && a.push(t.rangeSKUs.split(",")[r]);
        return a
    }

    function ot(e, t) {
        var a = va.getRenderedSceneCanvas();
        0 == e && 0 == t ? (e = a.width, t = a.height) : 0 == e ? e = parseInt(a.width * t / a.height) : 0 == t && (t = parseInt(a.height * e / a.width)), vout("getCurDecoratedRoomScaled...");
        var r = 0,
            o = 0,
            i = a.width,
            n = a.height;
        return t / e < a.height / a.width ? (n = a.width / e * t, o = (a.height - n) / 2) : (i = a.height / t * e, r = (a.width - i) / 2), vout(r + " " + o + " " + i + " " + n + " " + e + " " + t), ma = document.createElement("canvas"), ma.width = e, ma.height = t, ma.getContext("2d").drawImage(a, r, o, i, n, 0, 0, e, t), ma
    }
    var it = !1,
        nt = !1,
        st = !1;
    "DEV" == runningEnvironment && (nt = !0);
    var lt = this;
    vout("*** new VisualizerToppsTiles()"), setWebGLTesting();
    var ct = !0;
    ct ? ($(".v-textured-worktops-cabinets").show(), $(".v-coloured-worktops-cabinets").hide()) : ($(".v-textured-worktops-cabinets").hide(), $(".v-coloured-worktops-cabinets").show());
    var dt = location.href.substring(0, location.href.lastIndexOf("/")) + "/",
        ut = VUtils.GetQueryStringParam("sku"),
        ht = 10;
    t(), x("Your Room Visualiser is Loading");
    var pt = "//toppstiles.viziserve2.com/",
        gt = "",
        ft = "TTWebGL1.00",
        vt = "1.00",
        mt = !0,
        bt = null,
        Tt = null,
        kt = !1,
        wt = !1,
        yt = "None",
        St = null,
        $t = "FFFFFF",
        At = "",
        xt = "",
        Rt = "",
        Ct = "None",
        It = null,
        Dt = null,
        Ot = null,
        Pt = "",
        Bt = null,
        Ft = 0,
        Mt = new Array,
        Et = new Array,
        Wt = null,
        Lt = null,
        Yt = "Brick";
    location.href.indexOf("testsubset") != -1 && (Yt = "Linear");
    var Ut = !1,
        Gt = !1,
        Vt = !1,
        Ht = null,
        Xt = null,
        Nt = null,
        qt = null,
        Zt = 0,
        jt = 0,
        _t = null,
        zt = null,
        Kt = null,
        Qt = null,
        Jt = null,
        ea = null,
        ta = null,
        aa = new Object,
        ra = null,
        oa = "Tile",
        ia = null,
        na = null,
        sa = null,
        la = null,
        ca = null,
        da = null,
        ua = !1,
        ha = !1,
        pa = 3,
        ga = null,
        fa = !1,
        va = null;
    mt && (va = new VMapper);
    var ma = null,
        ba = new VStorage,
        Ta = new VEmail,
        ka = new VShare,
        wa = new UniversalAnalytics,
        ya = new VAnalytics;
    ya.setup("ToppsTiles", "1");
    var Sa = new VDatabase,
        $a = null;
    tables = ["database/TTDatabase/rooms-Table 1.csv?" + uncache, "database/TTDatabase/predecoratedRooms-Table 1.csv?" + uncache, "database/TTDatabase/tileAreas-Table 1.csv?" + uncache, "database/TTDatabase/processedTiles-Table 1.csv?" + uncache, "database/TTDatabase/grout-Table 1.csv?" + uncache, "database/TTDatabase/roomTypes-Table 1.csv?" + uncache, "database/TTDatabase/predecoratedRoomStyles-Table 1.csv?" + uncache, "database/TTDatabase/filters-Table 1.csv?" + uncache], mt && (tables = ["database/TTDatabase/webGLRooms-Table 1.csv?" + uncache, "database/TTDatabase/predecoratedRooms-Table 1.csv?" + uncache, "database/TTDatabase/webGLTileAreas-Table 1.csv?" + uncache, "database/TTDatabase/floorBorders-Table 1.csv?" + uncache, "database/TTDatabase/processedTiles-Table 1.csv?" + uncache, "database/TTDatabase/grout-Table 1.csv?" + uncache, "database/TTDatabase/colours-Table 1.csv?" + uncache, "database/TTDatabase/roomTypes-Table 1.csv?" + uncache, "database/TTDatabase/predecoratedRoomStyles-Table 1.csv?" + uncache, "database/TTDatabase/filters-Table 1.csv?" + uncache]), e(function() {
        Sa.load(tables, function() {
            $a = new Decorator(lt, wa, Sa, va, gt, ya), outlines = new Outlines(lt, $a, va);
            var e = "//www.toppstiles.co.uk/vit.xml?" + uncache;
            "DEV" != runningEnvironment && "TEST" != runningEnvironment || (location.href.indexOf("toppstiles.co.uk") == -1 && (e = "vgetxml.php?url=" + e), e = "vit.xml"), location.href.indexOf("newtilesreview") != -1 && (e = "//www.toppstiles.co.uk/vit_v2.xml?" + uncache, "DEV" != runningEnvironment && "TEST" != runningEnvironment || (e = "vit_v2.xml")), VUtils.loadXMLFromURL(e, function(e) {
                O(), C(function() {
                    ze(e), je(), ga = new GUI(lt, wa);
                    var t = "Room3";
                    null != ut && null != tt(ut) && "Outdoor" == tt(ut).canGoWhere && (t = "Room33"), null != ut && null != tt(ut) && tt(ut).isGlassSplashback && (t = "Room209"), "DEV" == runningEnvironment && (t = "Room1"), _(t, function() {
                        st && 0 != aa.savedRoomsDecorateData.length && z(0), $("body").css("background-color", "#fff"), $(".vit-page-container").show(), ga.update(), "DEV" != runningEnvironment && null == ut && $(".modal-startup-overlay").fadeIn(), i(), o(), g(), $(window).resize(function() {
                            g()
                        }), null != ut && null != tt(ut) && (tt(ut).isGlassSplashback ? ie(ut) : (ie(ut), $a.predecorateInitialRoom(ut)), ya.track("Direct Link With SKU", ut)), ut = null
                    })
                })
            })
        })
    }), this.usingTexturedWorktopsAndCabinetsRooms = function() {
        return ct
    }, this.getCurGrout = function() {
        if (null == $t) return null;
        for (var e = 0; e < Sa.grout.length; ++e)
            if (Sa.grout[e].rgb == $t) return Sa.grout[e];
        alert("getCurGrout() not found: " + $t)
    }, this.getData = function() {}, this.getData = function() {
        var e = new Object;
        return e.curDecorateData = ta, e.curRoomStylesModeOn = wt, e.curDecorateMode = oa, e.curRoom = Dt, e.curTile = Ot, e.curGroutColour = $t, e.curWallColour = At, e.curCabinetColour = xt, e.curWorktopColour = Rt, e.curSingleTileMode = Ut, e.curRotateProductMode = Gt, e.curChangePatternMode = Vt, e.curPattern = Yt, e.curTilingAsRangeTiles = Ht, e.curTilingAsRangeEnable = Xt, e.curTilingAsRangePercentages = Nt, e
    }, this.showRoomStyleTilePopup = function(e, t, a, r) {
        if (null == e) return void ga.showRoomStyleTilePopup(null);
        var o = new Object,
            i;
        if ("TileRange" == e) {
            o.nameText = "";
            for (var n = 0; n < t.length; ++n) i = tt(t[n]), o.nameText += i.name + "<br>", o.sizeText = i.displaySize;
            o.skuText = null;
            for (var i = tt(t[0]), s = "", l = rt(i.sku), n = 0; n < l.length; ++n)
                for (var c = 0; c < t.length; ++c) t[c] == l[n] && ("" != s && (s += "-"), s += t[c]);
            o.thumbnail = gt + "thumbnails/tiles/" + s + ".jpg?" + uncache
        } else {
            i = tt(e), o.thumbnail = gt + "thumbnails/tiles/" + i.sku + ".jpg?" + uncache, o.nameText = i.name, o.skuText = i.sku, o.sizeText = i.displaySize, o.priceText = "&pound;" + i.price.toFixed(2), i.soldInBoxes ? o.priceText2 = "price/box" : o.priceText2 = "price/tile";
            var d = Xe(i).toFixed(2);
            o.priceM2Text = "&pound;" + d, (i.isBorder || i.isCapping || i.isFinishingStrip) && (o.priceM2Text = "")
        }
        ga.showRoomStyleTilePopup(o, a, r)
    }, this.showDecorateOptionActions = function(e) {
        ga.showDecorateOptionActions(e)
    }, this.decorateOptionAction = function(e) {
        switch (e) {
            case "GroutBorder":
                $a.doGroutBorder();
                break;
            case "ChangeBorder":
                $a.doChangeBorder();
                break;
            case "DeleteBorder":
                $a.doDeleteBorder();
                break;
            case "EditBorder":
                $a.doEditBorder(!0);
                break;
            case "ChangeSingleTile":
                $a.doChangeSingleTile();
                break;
            case "DeleteSingleTile":
                $a.doDeleteSingleTile();
                break;
            case "MoveSingleTile":
                $a.doMoveSingleTile(!0);
                break;
            case "MosaicFill":
                $a.doMosaicFill();
                break;
            case "MosaicBorder":
                $a.doMosaicBorder();
                break;
            case "TileZone":
                $a.doTileZone();
                break;
            case "GroutZone":
                $a.doGroutZone();
                break;
            case "DeleteZone":
                $a.doDeleteZone();
                break;
            case "EditZone":
                $a.doEditZone(!0, !0);
                break;
            case "LayFloorBorder":
                $a.doLayFloorBorder();
                break;
            case "GroutFloorBorder":
                $a.doGroutFloorBorder();
                break;
            case "DeleteFloorBorder":
                $a.doDeleteFloorBorder();
                break;
            case "ChangeSkirting":
                $a.doChangeSkirting();
                break;
            case "DeleteSkirting":
                $a.doDeleteSkirting();
                break;
            case "DeleteGlassSplashback":
                $a.doDeleteGlassSplashback()
        }
    }, this.showDecorateAreaOptions = function(e) {
        ga.showDecorateAreaOptions(e)
    }, this.decorateAreaOption = function(e) {
        switch (e) {
            case "FillWholeWall":
            case "FillWholeFloor":
                $a.doFillWholeArea();
                break;
            case "FillWholeFloorAndSkirting":
                $a.doFillFloorAndAddSkirting();
                break;
            case "FillHalfWall":
                $a.doFillHalfWall();
                break;
            case "CreateSplashback":
                $a.doCreateSplashback();
                break;
            case "DrawArea":
                $a.doDrawArea();
                break;
            case "LayMosaicBorder":
                $a.doMosaicBorder()
        }
    }, this.usingWebGL = function() {
        return mt
    }, this.setNewCurDecorateData = function(e) {
        ta = e
    }, this.getTileOneMetreSquaredPrice = function(e) {
        return Xe(e)
    }, this.getSortedRoomTilesUsed = function() {
        return $a.getSortedTilesUsed().sort()
    }, this.getPrintData = function() {
        var e = $a.getSortedTilesUsed().sort();
        wa.trackToolButton("Print Room", Dt, e);
        var t = Array(),
            a = m(ta, 0, 0);
        mt && (a = ot(0, 0).toDataURL("image/jpeg", .75)), t.src = a, t.tilesData = new Array;
        for (var r = $a.getSortedTilesUsed(), o = 0; o < r.length; ++o) {
            var i = tt(r[o]),
                n = new Object;
            n.thumbnailURL = gt + "thumbnails/tiles/" + i.sku + ".jpg?" + uncache, n.nameText = i.name, n.codeText = i.sku, t.tilesData.push(n)
        }
        return t
    }, this.printWindowReady = function() {
        ua = !0, c()
    }, this.getGUIData = function() {
        return bt
    }, this.selection = function(e, t, a, r) {
        var o = j(e, t, a, r);
        switch (vout("*** gui-api-selection: Start"), vobj("Selection: " + JSON.stringify(o)), $a.abort(), o.type) {
            case "SelectRoomType":
                Ct = o.data[0], B();
                break;
            case "SelectPredecoratedRoomStyle":
                It = o.data[0], B();
                break;
            case "SelectStockRoom":
                ya.track("Load Stock Room", o.data[0]), _(o.data[0]), wa.trackSelectRoom(Dt);
                break;
            case "SelectSavedRoom":
                z(o.data[0]);
                break;
            case "SelectPredecoratedRoom":
                K(o.data[0]);
                break;
            case "DeleteSavedRoom":
                J(o.data[0]);
                break;
            case "SelectTilesType":
                de(o.data[0]);
                break;
            case "SelectTile":
                var i = ie(o.data[0]);
                return wa.trackSelectTile(Ot), i;
                break;
            case "SelectGrout":
                ne(o.data[0]);
                break;
            case "SelectWallColour":
                se(o.data[0]);
                break;
            case "SelectCabinetColour":
                le(o.data[0]);
                break;
            case "SelectWorktopColour":
                ce(o.data[0]);
                break;
            case "Filter":
                ue(o.data[0], parseInt(o.data[1]));
                break;
            case "ApplyFilters":
                pe();
                break;
            case "DeleteFilter":
                he(o.data[0], parseInt(o.data[1]));
                break;
            case "Search":
                ge(o.data[0], o.data[1]);
                break;
            case "DeleteWishlistTile":
                ve(o.data[0]);
                break;
            case "RefreshBasket":
                be();
                break;
            case "UpdateBasketItemQuantity":
                return Re(o.data[0], o.data[1]), o.data[0];
                break;
            case "UpdateBasketItemCoverage":
                return Ce(o.data[0], o.data[1]), o.data[0];
                break;
            case "RefreshBasketItem":
                xe(o.data[0]);
                break;
            case "DeleteBasketItem":
                Ae(o.data[0]);
                break;
            case "AddTileToBasketStart":
                ye(o.data[0]);
                break;
            case "AddTileToBasket":
                return Se(o.data[0]);
                break;
            case "AddTileRangeToBasket":
                return $e();
                break;
            case "RefreshWishlist":
                me();
                break;
            case "AddTileToWishlist":
                fe(o.data[0]);
                break;
            case "UpdateAddTileToBasketPopupQuantity":
                Ie(o.data[0]);
                break;
            case "UpdateAddTileToBasketPopupCoverage":
                De(o.data[0]);
                break;
            case "UpdateAddTileRangeToBasketPopupEnable":
                Oe(o.data[0]);
                break;
            case "UpdateAddTileRangeToBasketPopupQuantity":
                Pe(o.data[0], o.data[1]);
                break;
            case "UpdateAddTileRangeToBasketPopupCoverage":
                Be(o.data[0], o.data[1]);
                break;
            case "UpdateAddSampleTileRangeToBasketPopupEnable":
                Fe(o.data[0]);
                break;
            case "UpdateTilingAsRangePopupEnable":
                Me(o.data[0]);
                break;
            case "UpdateTilingAsRangePopupPercentage":
                return Ee(o.data[0], o.data[1]);
                break;
            case "TilingAsRangePopupFinished":
                We();
                break;
            case "TilingAsRangePopupAbort":
                Le();
                break;
            case "TilingAsRangeOrSinglePopupSetSingle":
                Ye();
                break;
            case "TilingAsRangeOrSinglePopupAbort":
                Ue();
                break;
            case "RotateProductToggle":
                qe();
                break;
            case "SingleTileToggle":
                Ze();
                break;
            case "ClearAllChanges":
            case "selectIdClearAllChanges":
                $a.clearAll(), q(), x("Decorating..."), ga.updateRoomRender(), Y(), ga.update();
                break;
            case "UndoChanges":
            case "selectIdUndoChanges":
                $a.undo(), q(), x("Decorating..."), ga.updateRoomRender(), Y(), ga.update();
                break;
            case "RedoChanges":
            case "selectIdRedoChanges":
                $a.redo(), q(), x("Decorating..."), ga.updateRoomRender(), Y(), ga.update();
                break;
            case "Pay":
                Te();
                break;
            case "OrderSample":
                return ke();
                break;
            case "AddSampleTileRangeToBasket":
                we();
                break;
            case "SaveRoom":
                S();
                break;
            case "ProductDetails":
                R(o.data[0]);
                break;
            case "ChangePattern":
                y(o.data[0]);
                break;
            case "PrepareShareRoom":
                u(o.data[0], o.data[1]);
                break;
            case "ShareRoom":
                p();
                break;
            case "EmailRoom":
                d(o.data[0], o.data[1], o.data[2]);
                break;
            case "PrintRoom":
                l();
                break;
            case "CreateZone":
                Ne();
                break;
            case "LoadSavedRoomAnd":
                ca = o.data[1], z(3 == o.data.length ? parseInt(o.data[0]) + 1 : o.data[0]);
                break;
            default:
                vout("Selection handling code yet complete")
        }
        return vout("*** gui-api-selection: Finish"), null
    }, this.showMessage = function(e, t) {
        A(e, t)
    }, this.getCurRoom = function() {
        return Dt
    }, this.getCurTile = function() {
        return Ot
    }, this.getCurRoomWidth = function() {
        return Dt.width
    }, this.getCurRoomHeight = function() {
        return Dt.height
    }, this.disableRotateMode = function() {
        Gt = !1
    }, this.disablePatternMode = function() {
        Vt = !1
    }, this.forceSingleTileModeOff = function() {
        Ut = !1
    }, this.setUnsavedChanges = function() {
        ha = !0, q()
    }, this.refreshDecorate = function() {
        ha = !0, x("Decorating..."), ga.updateRoomRender(), q(), ga.doUpdateTools(), Y(), ga.update()
    }, this.canDecorate = function(e, t) {
        return $a.canDecorate(e, t)
    }, this.getRenderData = function(e) {
        if (mt) re(function(t) {
            e(t)
        });
        else {
            var t = m(ta, 0, 0);
            e(t)
        }
    }, this.roomAllowsGlassSplashback = function() {
        return $a.roomAllowsGlassSplashback()
    }
}
var numFixedTileSets = 0,
    VUtils = {},
    vIsTouch = void 0,
    vInitialTimer = (new Date).getTime(),
    vLastTimer = (new Date).getTime(),
    vDebugLoggingOn = !1,
    vImagesCache = new Array,
    vRandomSeed = 0;
"undefined" != typeof console && "undefined" != typeof console.log || (console = {}, console.log = function(e) {}), VUtils.webGLSupported = function() {
        function e() {
            alert("BogRats")
        }

        function t() {
            alert("context restored")
        }
        if (console.log("New WebGL: Checking"), window.WebGLRenderingContext) {
            var a = document.createElement("canvas"),
                r = ["webgl", "experimental-webgl", "moz-webgl"],
                o = !1;
            a.addEventListener("webglcontextlost", e, !0), a.addEventListener("webglcontextrestored", t, !0);
            for (var i in r) try {
                if (o = a.getContext(r[i]), o && "function" == typeof o.getParameter) return r[i]
            } catch (e) {}
            return console.log("WebGL: Supported, but disabled"), !0
        }
        return console.log("WebGL: Not suppported"), !1
    }, VUtils.OLDwebGLSupported = function() {
        if (console.log("WebGL: Checking"), window.WebGLRenderingContext) {
            var e = document.createElement("canvas"),
                t = ["webgl", "experimental-webgl", "moz-webgl"],
                a = !1;
            for (var r in t) try {
                if (a = e.getContext(t[r]), a && "function" == typeof a.getParameter) return t[r]
            } catch (e) {}
            return console.log("WebGL: Supported, but disabled"), !1
        }
        return console.log("WebGL: Not suppported"), !1
    }, VUtils.isTabletOrPhoneDevice = function() {
        return location.href.indexOf("vit-simtablet") != -1 || (navigator.userAgent.toLowerCase().indexOf("android") != -1 || (navigator.userAgent.toLowerCase().indexOf("ipad") != -1 || (navigator.userAgent.toLowerCase().indexOf("iphone") != -1 || navigator.userAgent.toLowerCase().indexOf("ipod") != -1)))
    }, VUtils.isDesktopChromeVersion45 = function() {
        return navigator.userAgent.toLowerCase().indexOf("android") == -1 && (navigator.userAgent.toLowerCase().indexOf("ipad") == -1 && (navigator.userAgent.toLowerCase().indexOf("iphone") == -1 && (navigator.userAgent.toLowerCase().indexOf("ipod") == -1 && (navigator.userAgent.indexOf("Chrome") != -1 && "45" == navigator.userAgent.substring(navigator.userAgent.indexOf("Chrome") + 7, navigator.userAgent.indexOf("Chrome") + 9)))))
    }, VUtils.isInternetExplorerBrowser = function() {
        return navigator.userAgent.indexOf("MSIE") != -1 || (navigator.userAgent.indexOf("Trident/") != -1 || navigator.userAgent.indexOf("Edge/") != -1)
    }, VUtils.isFirefoxBrowser = function() {
        return navigator.userAgent.indexOf("Firefox") != -1
    }, VUtils.getBaseURL = function() {
        var e = new RegExp(/^.*\//);
        return e.exec(window.location.href)
    }, VUtils.loadTextFromURL = function(e, t) {
        $.ajax({
            type: "GET",
            url: e,
            dataType: "text",
            crossDomain: !0,
            success: function(e) {
                t(e)
            },
            error: function(t, a, r) {
                verror("loadTextFromURL(): " + e + " - ajax error: jqXHR=" + t + " textStatus=" + a + " errorThrown=" + r)
            },
            statusCode: {
                404: function() {
                    verror("loadTextFromURL(): " + e + " - 404 page not found")
                },
                405: function() {
                    verror("loadTextFromURL(): " + e + " - 405 page not found")
                }
            }
        })
    }, VUtils.loadXMLFromURL = function(e, t) {
        $.ajax({
            type: "GET",
            url: e,
            dataType: "xml",
            success: function(e) {
                t(e)
            },
            error: function(t, a, r) {
                verror("loadXMLFromURL(): " + e + " - ajax error: jqXHR=" + t + " textStatus=" + a + " errorThrown=" + r)
            },
            statusCode: {
                404: function() {
                    verror("loadXMLFromURL(): " + e + " - 404 page not found")
                },
                405: function() {
                    verror("loadXMLFromURL(): " + e + " - 405 page not found")
                }
            }
        })
    }, VUtils.setRandomSeed = function(e) {
        e = Math.abs(e), vRandomSeed = e
    }, VUtils.getRandom = function() {
        return vRandomSeed = (9301 * vRandomSeed + 49297) % 233280, vRandomSeed / 233280
    }, Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
        for (var a = t || 0, r = this.length; a < r; a++)
            if (this[a] === e) return a;
        return -1
    }), VUtils.getGUID = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            var t = 16 * Math.random() | 0,
                a = "x" == e ? t : 3 & t | 8;
            return a.toString(16)
        })
    }, VUtils.isPointInPolygon = function(e, t, a) {
        for (var r = e, o = new VPoint(t, a), i = !1, n = -1, s = r.length, l = s - 1; ++n < s; l = n)(r[n].y <= o.y && o.y < r[l].y || r[l].y <= o.y && o.y < r[n].y) && o.x < (r[l].x - r[n].x) * (o.y - r[n].y) / (r[l].y - r[n].y) + r[n].x && (i = !i);
        return i
    }, VUtils.loadImageToSrc = function(e, t, a) {
        var r = new Image;
        r.onload = function() {
            $(t).attr("src") != e && $(t).attr("src", e), void 0 != a && null != a && a(t, r.width, r.height)
        }, r.src = e
    }, VUtils.loadImageURLIntoCanvas = function(e, t) {
        var a = new Image;
        a.crossOrigin = "Anonymous", a.onload = function() {
            canvas = document.createElement("canvas"), canvas.width = a.width, canvas.height = a.height, canvas.getContext("2d").drawImage(a, 0, 0), t(canvas)
        }, a.src = e
    }, VUtils.loadExactPNGImageURLIntoCanvas = function(e, t) {
        var a = new Image;
        a.onload = function() {
            var e = document.createElement("canvas");
            e.width = a.width, e.height = a.height, e.getContext("2d").drawImage(a, 0, 0), t(e)
        }, a.src = e
    }, VUtils.getCanvasPixel24 = function(e, t, a) {
        var r = e.getContext("2d"),
            o = r.getImageData(t, a, 1, 1),
            i = o.data,
            n = i[0] << 16;
        return n += i[1] << 8, n += i[2]
    }, VUtils.cacheImage = function(e, t) {
        vout("load: " + e);
        var a = new Image;
        a.onload = function() {
            vout("loaded: " + e), vImagesCache.push(a), void 0 != t && t()
        }, a.src = e
    }, VUtils.saveCookie = function(e, t) {
        var a = new Date;
        a.setMonth(a.getMonth() + 99), document.cookie = e + "=" + escape(t) + ";expires=" + a.toGMTString()
    }, VUtils.loadCookie = function(e) {
        cookieArray = document.cookie.split(";");
        for (var t = 0; t < cookieArray.length; ++t) {
            var a = cookieArray[t].substr(0, cookieArray[t].indexOf("=")),
                r = cookieArray[t].substr(cookieArray[t].indexOf("=") + 1);
            if (cookieArray[t].indexOf("=") == -1 && (a = cookieArray[t], r = ""), a = a.replace(/^\s+|\s+$/g, ""), a == e) return unescape(r)
        }
        return null
    }, VUtils.drawImage = function(e, t, a, r, o, i, n, s, l, c) {
        var d = l / r,
            u = c / o,
            h = t + r - e.width;
        h > 0 && (r -= h, l -= h * d);
        var h = a + o - e.height;
        h > 0 && (o -= h, c -= h * u), t < 0 && (n -= t * d, l += t * d, r += t, t = 0), a < 0 && (s -= a * u, c += a * u, o += a, a = 0), i.drawImage(e, t, a, r, o, n, s, l, c)
    }, VUtils.getScaledImage = function(e, t) {
        var a = e.width * t,
            r = e.height * t,
            o = document.createElement("canvas");
        return o.width = a, o.height = r, o.getContext("2d").drawImage(e, 0, 0, e.width, e.height, 0, 0, a, r), o
    }, VUtils.GetQueryStringParam = function(e) {
        for (var t = window.location.search.substring(1), a = t.split("&"), r = 0; r < a.length; ++r) {
            var o = a[r].split("=");
            if (o[0] == e) return o[1]
        }
        return null
    }, VUtils.convertRGBToHex = function(e, t, a) {
        return (("0" + parseInt(e, 10).toString(16)).slice(-2) + ("0" + parseInt(t, 10).toString(16)).slice(-2) + ("0" + parseInt(a, 10).toString(16)).slice(-2)).toUpperCase()
    }, VUtils.loadiPadPhoto = function(e, t) {
        var a = new FileReader;
        a.onload = function(e) {
            var r = atob(a.result.split(",")[1]),
                o = EXIF.readFromBinaryFile(new BinaryFile(r)),
                i = new Image;
            i.src = a.result, i.onload = function() {
                VUtils.getFixedPhotoImage(i, o.Orientation, function(e) {
                    void 0 != t && t(e)
                })
            }
        }, a.readAsDataURL(e)
    }, VUtils.getFixedPhotoImage = function(e, t, a) {
        function r(e, t, a) {
            var r = e.naturalWidth,
                s = e.naturalHeight,
                l = e.width,
                c = e.height,
                d = t.getContext("2d");
            d.save(), o(t, l, c, a);
            var u = n(e);
            u && (r /= 2, s /= 2);
            var h = 1024,
                p = document.createElement("canvas");
            p.width = p.height = h;
            for (var g = p.getContext("2d"), f = i(e, r, s), v = Math.ceil(h * l / r), m = Math.ceil(h * c / s / f), b = 0, T = 0; b < s;) {
                for (var k = 0, w = 0; k < r;) g.clearRect(0, 0, h, h), g.drawImage(e, -k, -b), d.drawImage(p, 0, 0, h, h, w, T, v, m), k += h, w += v;
                b += h, T += m
            }
            d.restore(), p = g = null
        }

        function o(e, t, a, r) {
            switch (r) {
                case 5:
                case 6:
                case 7:
                case 8:
                    e.width = a, e.height = t;
                    break;
                default:
                    e.width = t, e.height = a
            }
            var o = e.getContext("2d");
            switch (r) {
                case 2:
                    o.translate(t, 0), o.scale(-1, 1);
                    break;
                case 3:
                    o.translate(t, a), o.rotate(Math.PI);
                    break;
                case 4:
                    o.translate(0, a), o.scale(1, -1);
                    break;
                case 5:
                    o.rotate(.5 * Math.PI), o.scale(1, -1);
                    break;
                case 6:
                    o.rotate(.5 * Math.PI), o.translate(0, -a);
                    break;
                case 7:
                    o.rotate(.5 * Math.PI), o.translate(t, -a), o.scale(-1, 1);
                    break;
                case 8:
                    o.rotate(-.5 * Math.PI), o.translate(-t, 0)
            }
        }

        function i(e, t, a) {
            var r = document.createElement("canvas");
            r.width = 1, r.height = a;
            var o = r.getContext("2d");
            o.drawImage(e, 0, 0);
            for (var i = o.getImageData(0, 0, 1, a).data, n = 0, s = a, l = a; l > n;) {
                var c = i[4 * (l - 1) + 3];
                0 === c ? s = l : n = l, l = s + n >> 1
            }
            var d = l / a;
            return 0 === d ? 1 : d
        }

        function n(e) {
            var t = e.naturalWidth,
                a = e.naturalHeight;
            if (t * a > 1048576) {
                var r = document.createElement("canvas");
                r.width = r.height = 1;
                var o = r.getContext("2d");
                return o.drawImage(e, -t + 1, 0), 0 === o.getImageData(0, 0, 1, 1).data[3]
            }
            return !1
        }
        var s = document.createElement("canvas");
        r(e, s, t);
        var l = new Image;
        l.onload = function() {
            void 0 != a && a(l)
        }, l.src = s.toDataURL("image/png")
    }, VUtils.callAfterScreenRefresh = function(e, t, a, r, o, i, n, s, l, c, d, u, h, p, g, f, v, m, b, T, k) {
        var w = 25;
        setTimeout(function() {
            e(t, a, r, o, i, n, s, l, c, d, u, h, p, g, f, v, m, b, T, k)
        }, w)
    }, VUtils.callAfterScreenRefresh2 = function(e, t, a, r, o, i, n, s, l, c, d, u, h, p, g, f, v, m, b, T, k) {
        var w = 600;
        setTimeout(function() {
            e(t, a, r, o, i, n, s, l, c, d, u, h, p, g, f, v, m, b, T, k)
        }, w)
    }, VUtils.clone = function(e) {
        function t(e, t, a) {
            var r, o, i, n = {};
            for (r in t) o = t[r], r in e && (e[r] === o || r in n && n[r] === o) || (e[r] = a ? a(o) : o);
            return e
        }
        if (!e || "object" != typeof e || "[object Function]" === Object.prototype.toString.call(e)) return e;
        if (e.nodeType && "cloneNode" in e) return e.cloneNode(!0);
        if (e instanceof Date) return new Date(e.getTime());
        if (e instanceof RegExp) return new RegExp(e);
        var a, r, o;
        if (e instanceof Array)
            for (a = [], r = 0, o = e.length; r < o; ++r) r in e && a.push(VUtils.clone(e[r]));
        else a = e.constructor ? new e.constructor : {};
        return t(a, e, VUtils.clone)
    },
    function() {
        $(function() {
            function e(e) {
                for (var t = 0; t < e.length - 1; t++) {
                    var a = t + Math.floor(Math.random() * (e.length - t)),
                        r = e[a];
                    e[a] = e[t], e[t] = r
                }
            }

            function t(e, t) {
                for (var a = [], r = 0; r < e;) a[r++] = t;
                return a
            }

            function a(e) {
                for (var t = e.length, a = 1 / 0; t--;) e[t] < a && (a = e[t]);
                return a
            }
            return _int = function(e) {
                return parseInt($("#" + e).val(), 10)
            }, getRandomTileSet = function(e, a, r) {
                var o = percentArrayToRatioArray(r);
                ctx = null;
                var i = t(e * a, 0);
                return drawGF(e, a, o, i), i
            }, testRandomiser = function() {
                var e = 30,
                    a = 20,
                    r = [];
                r.push(0), r.push(1), r.push(0), r.push(1);
                var o = percentArrayToRatioArray(r);
                ctx = null, canvas = $("#floor").get(0), ctx = canvas.getContext("2d");
                var i = t(e * a, 0);
                drawGF(e, a, o, i)
            }, percentArrayToRatioArray = function(e) {
                var t = a(e);
                0 == t && (t = 1);
                for (var r = [], o = 0; o < e.length; o++) r.push(parseFloat(e[o] / t));
                return r
            }, drawGF = function(t, a, r, o) {
                var i, n, s, l, c, d, u, h, p, g, f, v, m, b, T, k, w, y, S, A, x, R, C, I, D, O, P, B, F, M;
                ctx && ctx.clearRect(0, 0, canvas.width, canvas.height), w = function() {
                    var e, t, a, o;
                    for (o = [], e = 0, t = r.length; e < t; e++) o.push({
                        idx: e,
                        ratio: r[e]
                    });
                    return o
                }().filter(function(e) {
                    return e.ratio > 0
                }), l = t, f = a, y = l * f, S = 10, k = function() {
                    var e, t, a;
                    for (a = [], e = 0, t = w.length; e < t; e++) T = w[e], a.push(0);
                    return a
                }(), m = function() {
                    var e, t, a;
                    for (a = [], e = 0, t = w.length; e < t; e++) T = w[e], a.push(T.ratio);
                    return a
                }(), b = m.reduce(function(e, t) {
                    return e + t
                }), v = function() {
                    var e, t, a;
                    for (a = [], e = 0, t = m.length; e < t; e++) g = m[e], a.push(g * Math.ceil(y / b));
                    return a
                }(), x = 1, A = function(e) {
                    return 1 - k[e] / v[e]
                }, u = function() {
                    var e;
                    return e = {}, {
                        get: function(t, a) {
                            return t < 0 || t > l - 1 || a < 0 || a > f - 1 ? -1 : e["" + t + "," + a] || -1
                        },
                        set: function(t, a, r) {
                            return e["" + t + "," + a] = r
                        }
                    }
                }(), h = function(e, t, a, r) {
                    var o, i;
                    return null == r && (r = 1), i = function(a, r, o) {
                        var i, n, s, l;
                        for (i = 0, l = [r.x, r.y], n = l[0], s = l[1], n += e * a, s += t * a; u.get(n, s) === o;) n += e * a, s += t * a, i += 1;
                        return i
                    }, o = function(a, r, o) {
                        var i, n, s;
                        return s = [r.x, r.y], i = s[0], n = s[1], i += e * a, n += t * a, u.get(i, n) === o ? 1 : 0
                    }, {
                        score: function(e, t) {
                            return {
                                cp: Math.pow(i(1, e, t) + i(-1, e, t), x) * r,
                                adj: o(1, e, t) + o(-1, e, t)
                            }
                        }
                    }
                };
                var E = 50,
                    W = 50,
                    L = 1,
                    Y = 1;
                for (p = [h(1, 0, "horizontal", E), h(0, 1, "vertical", W), h(1, 1, "diagonal1", L), h(1, -1, "diagonal2", Y)], d = function(e, t) {
                        var a, r, o, i;
                        return o = function() {
                                var r, o, i;
                                for (i = [], r = 0, o = p.length; r < o; r++) a = p[r], i.push(a.score(e, t));
                                return i
                            }(), i = function() {
                                var e, t, a;
                                for (a = [], e = 0, t = o.length; e < t; e++) r = o[e], a.push(r.adj);
                                return a
                            }().reduce(function(e, t) {
                                return e + t
                            }),
                            function() {
                                var e, t, a;
                                for (a = [], e = 0, t = o.length; e < t; e++) r = o[e], a.push(r.cp * ((r.adj + 1) / (i + 1)));
                                return a
                            }().reduce(function(e, t) {
                                return e + t
                            })
                    }, s = function(a) {
                        var r, i, n, s, l, c, h, p, g, f, v, m;
                        if (n = function() {
                                var e, t, r;
                                for (r = [], i = e = 0, t = w.length; e < t; i = ++e) T = w[i], r.push({
                                    e: d(a, i),
                                    color: i
                                });
                                return r
                            }().sort(function(e, t) {
                                return e.e - t.e
                            }), s = n[n.length - 1], s.e <= 0)
                            for (h = 0, f = n.length; h < f; h++) l = n[h], l.ep = A(l.color);
                        else
                            for (p = 0, v = n.length; p < v; p++) l = n[p], l.ep = A(l.color) * (1 - l.e / s.e);
                        for (n.sort(function(e, t) {
                                return e.ep - t.ep
                            }), c = [], g = 0, m = n.length; g < m; g++) l = n[g], 0 !== c.length && l.ep !== c[0].ep || c.push(l), l.ep > c[0].ep && (c = [l]);
                        e(c), r = c[0].color, k[r] += 1, u.set(a.x, a.y, r);
                        var b = w[r].idx;
                        o[a.y * t + a.x] = b, ctx && (ctx.fillStyle = "rgb(" + 40 * b + "," + 40 * b + "," + 40 * b + ")", ctx.fillRect(a.x * S, a.y * S, S, S))
                    }, n = [], R = I = 0, B = l - 1; 0 <= B ? I <= B : I >= B; R = 0 <= B ? ++I : --I)
                    for (C = D = 0, F = f - 1; 0 <= F ? D <= F : D >= F; C = 0 <= F ? ++D : --D) n.push({
                        x: R,
                        y: C
                    });
                for (e(n), M = [], O = 0, P = n.length; O < P; O++) i = n[O], M.push(s(i));
                return M
            }, $("#generate").click(testRandomiser)
        })
    }.call(this), location.href.indexOf("testnewvariations") != -1 && alert("Testing new tile variations");
var runningEnvironment = "PROD";
location.href.indexOf("localhost:8888") != -1 || location.href.indexOf("cjc-macbookpro.local") != -1 ? runningEnvironment = "DEV" : location.href.indexOf("test.viziserve") != -1 && (runningEnvironment = "TEST"), "DEV" == runningEnvironment && vSetDebugLoggingOn();
var uncache = "34",
    makingPredecoratedRooms = !1;
location.href.indexOf("makeroomstyles") != -1 && (makingPredecoratedRooms = !0);
var webGLRanOKCookieName = "WebGLRanOK";
//# sourceMappingURL=./All-min.js.map