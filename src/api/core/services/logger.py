from datetime import datetime


def log(method, decrypt, param, text, result):
    log_entry = f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] | method: {method} | decrypt: {decrypt} | param: {param} | text: {text[:100]} | result: {result[:100]}\n"
    with open("api/assets/safe.txt", "a", encoding="utf-8") as f:
        f.write(log_entry)