# Haltyrka — Web App

## Архитектура

- **app.py** — только Flask-маршруты и связывание сервисов.
- **services/cipher_service.py** — тайтл-логика шифрования (SRP, OCP).
- **services/logger_service.py** — сервис логирования (SRP).
- **cipher.py** — реализации алгоритмов шифрования.
- **templates/** — HTML-шаблоны.
- **static/** — статические файлы (JS).

## Запуск
```bash
python app.py
```