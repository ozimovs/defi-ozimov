# defi.ozimov.ru

Статические страницы на поддомене `defi.ozimov.ru`. Основной сайт `ozimov.ru`
остаётся на Тильде и этим репозиторием не затрагивается.

## Как устроено

| Что | Где |
|---|---|
| Домен и DNS | Руцентр (605246/NIC-D) |
| `ozimov.ru` | Тильда, project 51079 — **не трогаем** |
| `defi.ozimov.ru` | GitHub Pages из этого репозитория, ветка `main` |
| Почта на домене | Mail.ru — **не трогаем** |

Пуш в `main` → страница в сети примерно через минуту.

## Структура

```
CNAME              домен для GitHub Pages (defi.ozimov.ru)
.nojekyll          отключает Jekyll, файлы отдаются как есть
index.html         оглавление, генерируется build.py
pages.json         список страниц: slug, title, desc, date
build.py           пересобирает index.html из pages.json
_template.html     болванка для новой страницы
assets/style.css   общий стиль
<slug>/index.html  сама страница, адрес — defi.ozimov.ru/<slug>/
```

## Добавить страницу

1. Скопировать `_template.html` в `<slug>/index.html`, заполнить.
2. Дописать запись в `pages.json` (дата в формате `ГГГГ-ММ-ДД`).
3. `python3 build.py`
4. Закоммитить и запушить.

## Чего не делать

- Не удалять `CNAME` — слетит привязка домена.
- Не удалять `.nojekyll` — Jekyll начнёт съедать файлы и папки на `_`.
- Не менять А-записи `ozimov.ru` в Руцентре — на них стоит живой сайт.
