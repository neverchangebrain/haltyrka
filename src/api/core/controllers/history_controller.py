from os import path
from flask import jsonify
from core.utils.constants import ErrorCodes


def history_controller():
    file_path = "api/assets/safe.txt"
    if not path.exists(file_path):
        return jsonify({"status_code": ErrorCodes.LOG_NOT_CREATED})
    if path.getsize(file_path) == 0:
        return jsonify({"status_code": ErrorCodes.EMPTY_LOG })
    
    try:
        with open(file_path, encoding='utf-8') as f:
            log_content = f.read()
        return jsonify({"result": log_content})
    except Exception:
        return jsonify({"status_code": ErrorCodes.OPEN_LOG_BUG})