from flask import request, jsonify
from core.utils.constants import ErrorCodes


def open_file_controller():
    file = request.files.get('file')
    
    if file:
        try:
            return jsonify({ "result": file.read().decode('utf-8') })
        except Exception as e:
            return jsonify({ "status_code": ErrorCodes.OPEN_FILE_BUG }), 400
    return jsonify({ "status_code": ErrorCodes.FILE_NOT_SELECTED }), 400