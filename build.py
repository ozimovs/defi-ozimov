#!/usr/bin/env python3
"""Пересобирает index.html из pages.json. Запускать после добавления страницы."""

import json
import pathlib

ROOT = pathlib.Path(__file__).parent
MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня",
          "июля", "августа", "сентября", "октября", "ноября", "декабря"]


def ru_date(iso: str) -> str:
    y, m, d = iso.split("-")
    return f"{int(d)} {MONTHS[int(m) - 1]} {y}"


def esc(s: str) -> str:
    return (s.replace("&", "&amp;").replace("<", "&lt;")
             .replace(">", "&gt;").replace('"', "&quot;"))


def main() -> None:
    pages = json.loads((ROOT / "pages.json").read_text(encoding="utf-8"))
    pages.sort(key=lambda p: p["date"], reverse=True)

    items = "\n".join(
        f'''      <li>
        <a href="/{esc(p["slug"])}/">
          <div class="t">{esc(p["title"])}</div>
          <div class="d">{esc(p["desc"])}</div>
          <div class="dt">{ru_date(p["date"])}</div>
        </a>
      </li>'''
        for p in pages
    )

    html = f'''<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Станислав Озимов — страницы</title>
<meta name="description" content="Заметки и материалы Станислава Озимова: инвестиции, крипта, DeFi.">
<meta property="og:title" content="Станислав Озимов — страницы">
<meta property="og:description" content="Заметки и материалы: инвестиции, крипта, DeFi.">
<meta property="og:type" content="website">
<link rel="stylesheet" href="/assets/style.css">
</head>
<body>
  <div class="wrap">
    <header class="site-head">
      <a class="brand" href="/">Станислав Озимов</a>
      <a class="home" href="https://ozimov.ru/">ozimov.ru →</a>
    </header>

    <h1>Страницы</h1>
    <p class="lede">Заметки, разборы и материалы, которые удобнее дать ссылкой,
      чем пересказывать.</p>

    <ul class="index-list">
{items}
    </ul>

    <footer class="site-foot">
      <a href="https://ozimov.ru/">Основной сайт</a>
      <a href="https://t.me/stanislavozimov">Telegram</a>
    </footer>
  </div>
</body>
</html>
'''
    (ROOT / "index.html").write_text(html, encoding="utf-8")
    print(f"index.html пересобран, страниц: {len(pages)}")


if __name__ == "__main__":
    main()
