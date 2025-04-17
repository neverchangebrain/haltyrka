import os
from datetime import datetime

class LoggerService:
    def __init__(self, logfile="safe.txt"):
        self.logfile = logfile

    def log(self, method, decrypt, param, text, result):
        log_entry = f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] | method: {method} | decrypt: {decrypt} | param: {param} | text: {text[:100]} | result: {result[:100]}\n"
        with open(self.logfile, "a", encoding="utf-8") as f:
            f.write(log_entry)