"""
Проект на коленке презент:
- Авторы: Назарка Халтурщик-Пацифист (KFC-босс фронтовиков) Эдосий СиСи-Халтурянин ('величайший' бекендеров)
- Время на проек: 0.15 наносекунд
- Что использовали: Flask, Python, HTML, CSS (tailwindcss), JS

Haltyrka® & Все права защищены.
"""

from flask import Flask, render_template, request, jsonify, send_file
from services.cipher_service import CipherService
from services.logger_service import LoggerService
import os
from io import BytesIO

app = Flask(__name__)
logger = LoggerService()
cipher_service = CipherService()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cipher/<method>')
def cipher_page(method):
    lang = request.args.get("lang", "en")
    method_map = {
        "caesar": {"ru": "Цезарь", "uk": "Цезар", "en": "Caesar"},
        "atbash": {"ru": "Атбаш", "uk": "Атбаш", "en": "Atbash"},
        "vigenere": {"ru": "Виженер", "uk": "Віженер", "en": "Vigenère"},
        "xor": {"ru": "XOR", "uk": "XOR", "en": "XOR"}
    }
    method_name = method_map.get(method, {}).get(lang, "Unknown method")
    if method not in method_map:
        return "Invalid encryption method", 404
    return render_template('cipher_page.html', method_name=method_name, method_value=method, lang=lang)

@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.json
    text = data.get("text")
    method = data.get("method")
    param = data.get("param")
    decrypt = data.get("decrypt", False)
    try:
        result = cipher_service.process(method, text, param, decrypt, logger)
        logger.log(method, decrypt, param, text, result)
        return jsonify({"result": result})
    except Exception as e:
        logger.log(method, decrypt, param, text, f"Ошибка: {str(e)}")
        return jsonify({"error": str(e)}), 400

@app.route('/open_file', methods=['POST'])
def open_file():
    file = request.files.get('file')
    if file:
        try:
            content = file.read().decode('utf-8')
            logger.log("open_file", False, "-", "-", "Файл успешно открыт")
            return jsonify({"content": content})
        except Exception as e:
            logger.log("open_file", False, "-", "-", f"Ошибка при открытии файла: {str(e)}")
            return jsonify({"error": "Ошибка при открытии файла"}), 400
    logger.log("open_file", False, "-", "-", "Ошибка: файл не выбран")
    return jsonify({"error": "Файл не выбран"}), 400

@app.route('/save_result', methods=['POST'])
def save_result():
    data = request.json
    result = data.get("result", "")
    filename = data.get("filename", "result.txt")
    mem = BytesIO()
    try:
        mem.write(result.encode('utf-8'))
        mem.seek(0)
        logger.log("save_result", False, filename, result[:100], "Результат успешно сохранён")
        return send_file(mem, as_attachment=True, download_name=filename, mimetype='text/plain')
    except Exception as e:
        logger.log("save_result", False, filename, result[:100], f"Ошибка при сохранении: {str(e)}")
        return jsonify({"error": "Ошибка при сохранении файла"}), 400

@app.route('/history', methods=['GET'])
def history():
    logfile = logger.logfile
    if not os.path.exists(logfile):
        logger.log("history", False, "-", "-", "Лог ещё не создан.")
        return jsonify({"log": "Лог ещё не создан."})
    try:
        with open(logfile, encoding='utf-8') as f:
            log_content = f.read()
        logger.log("history", False, "-", "-", "История успешно получена")
        return jsonify({"log": log_content})
    except Exception as e:
        logger.log("history", False, "-", "-", f"Ошибка при получении истории: {str(e)}")
        return jsonify({"log": "Ошибка при получении истории."})

if __name__ == '__main__':
    app.run(debug=True)
