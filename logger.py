import datetime

class Logger:
    def __init__(self, logfile="cipher_log.txt"):
        self.logfile = logfile

    def log(self, method, decrypt, param, text, result):
        try:
            with open(self.logfile, "a", encoding="utf-8") as log:
                log.write(f"Время: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
                log.write(f"Метод: {method}, Дешифровка: {decrypt}, Параметр: {param}\n")
                log.write(f"Текст: {text[:100]}...\nРезультат: {result[:100]}...\n")
                log.write("-" * 40 + "\n")
        except Exception as e:
            # ексепшен колл чтобы не выключать мейн процесс (короче без втыка)
            pass