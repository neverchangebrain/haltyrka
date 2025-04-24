from io import BytesIO
from flask import request, jsonify, send_file
from core.utils.constants import ErrorCodes


def save_result_controller():
    data = request.json
    mem = BytesIO()

    result = data.get("result", "")
    filename = data.get("filename", "result.txt")
    
    try:
        mem.write(result.encode('utf-8'))
        mem.seek(0)

        return send_file(mem, as_attachment=True, download_name=filename, mimetype='text/plain')
    except Exception as e:
        return jsonify({ "status_code": ErrorCodes.FILE_SAVE_BUG }), 400