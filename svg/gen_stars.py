#!/usr/bin/env python3
"""Generates the seamless starfield SVG tiles used by #stars/#stars2/#stars3.

Run from svg/:  python gen_stars.py
Outputs: stars-small.svg, stars-medium.svg, stars-large.svg (512x512 tiles).

Stdlib only, seeded for reproducibility. Re-run any time to reshuffle
star positions. Twinkle is CSS-animated inside the SVG and gated by
@media (prefers-reduced-motion: no-preference).
"""
import random
import re
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SIZE = 512
ACCENTS = ["#ffffff", "#ffffff", "#ffffff", "#c9b8ff", "#9d7bff"]

STYLE = """<style>
@media (prefers-reduced-motion: no-preference) {
  .tw { animation: tw var(--td, 4s) ease-in-out infinite; }
}
@keyframes tw {
  0%, 100% { opacity: var(--o, 0.9); }
  50% { opacity: calc(var(--o, 0.9) * 0.2); }
}
</style>"""


def wrap_copies(x, y, pad):
    xs = [x]
    ys = [y]
    if x < pad:
        xs.append(x + SIZE)
    if x > SIZE - pad:
        xs.append(x - SIZE)
    if y < pad:
        ys.append(y + SIZE)
    if y > SIZE - pad:
        ys.append(y - SIZE)
    return [(a, b) for a in xs for b in ys]


def twinkle(rng, base_opacity, chance):
    if rng.random() < chance:
        dur = round(rng.uniform(2.8, 6.5), 1)
        delay = round(rng.uniform(0, dur), 1)
        return (f' class="tw" style="--o:{base_opacity};--td:{dur}s;'
                f'animation-delay:-{delay}s"')
    return ""


def sparkle_d(s):
    """4-point sparkle path centered on 0,0 with tip radius s."""
    k = round(s * 0.22, 2)
    return (f"M0 {-s}Q{k} {-k} {s} 0Q{k} {k} 0 {s}"
            f"Q{-k} {k} {-s} 0Q{-k} {-k} 0 {-s}Z")


def sw_wisp():
    """One wave band path pulled from sw1.svg, for the occasional odd shape."""
    with open(os.path.join(HERE, "sw1.svg"), encoding="utf-8") as f:
        src = f.read()
    paths = re.findall(r'<path d="([^"]+)" fill="([^"]+)"', src)
    d, fill = paths[-1]  # bottom #6f00ff band
    return d, fill


def build(seed, dots, dot_r, twinkle_chance, sparkles, wisps):
    rng = random.Random(seed)
    parts = [STYLE]

    for _ in range(dots):
        x = round(rng.uniform(0, SIZE), 1)
        y = round(rng.uniform(0, SIZE), 1)
        r = round(rng.uniform(*dot_r), 2)
        o = round(rng.uniform(0.25, 1.0), 2)
        fill = rng.choice(ACCENTS) if r > 1.0 else "#ffffff"
        tw = twinkle(rng, o, twinkle_chance)
        for wx, wy in wrap_copies(x, y, r + 2):
            parts.append(
                f'<circle cx="{wx}" cy="{wy}" r="{r}" fill="{fill}"'
                f' opacity="{o}"{tw}/>')

    for _ in range(sparkles):
        x = round(rng.uniform(20, SIZE - 20), 1)
        y = round(rng.uniform(20, SIZE - 20), 1)
        s = round(rng.uniform(2.5, 5.5), 2)
        rot = round(rng.uniform(0, 90), 1)
        o = round(rng.uniform(0.35, 0.9), 2)
        fill = rng.choice(ACCENTS)
        tw = twinkle(rng, o, 0.6)
        d = sparkle_d(s)
        for wx, wy in wrap_copies(x, y, s + 2):
            parts.append(
                f'<path d="{d}" fill="{fill}" opacity="{o}"{tw}'
                f' transform="translate({wx} {wy}) rotate({rot})"/>')

    if wisps:
        d, fill = sw_wisp()
        for _ in range(wisps):
            x = round(rng.uniform(0, SIZE), 1)
            y = round(rng.uniform(30, SIZE - 30), 1)
            sc = round(rng.uniform(0.02, 0.032), 4)
            rot = round(rng.uniform(-10, 10), 1)
            o = round(rng.uniform(0.1, 0.2), 2)
            w, h = 2400 * sc, 400 * sc
            for wx, wy in wrap_copies(x, y, max(w, h)):
                parts.append(
                    f'<path d="{d}" fill="{fill}" opacity="{o}"'
                    f' transform="translate({wx} {wy}) scale({sc})'
                    f' rotate({rot})"/>')

    body = "".join(parts)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{SIZE}"'
            f' height="{SIZE}" viewBox="0 0 {SIZE} {SIZE}">{body}</svg>\n')


LAYERS = [
    ("stars-small.svg", build(seed=1101, dots=95, dot_r=(0.5, 1.0),
                              twinkle_chance=0.22, sparkles=0, wisps=0)),
    ("stars-medium.svg", build(seed=2202, dots=48, dot_r=(1.0, 1.7),
                               twinkle_chance=0.3, sparkles=2, wisps=0)),
    ("stars-large.svg", build(seed=3303, dots=22, dot_r=(1.7, 2.7),
                              twinkle_chance=0.35, sparkles=5, wisps=2)),
]

for name, svg in LAYERS:
    with open(os.path.join(HERE, name), "w", encoding="utf-8") as f:
        f.write(svg)
    print(f"wrote {name} ({os.path.getsize(os.path.join(HERE, name))} bytes)")
