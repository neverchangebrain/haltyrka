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
python window_launcher.py
```

## Сборка exe-файла

1. Установите зависимости:

   ```bash
   pip install -r requirements.txt
   ```

2. Соберите exe-файл:

   ```bash
   pyinstaller --noconfirm --onefile --windowed --add-data "app/assets;assets" --add-data "app/templates;templates" --add-data "app/static;static" app/launcher.py
   ```

   - Готовый exe появится в папке `dist/`.
   - Если нужны дополнительные папки, добавьте их через `--add-data`.
