from flask import jsonify, request
from core.utils.constants import ErrorCodes
from core.services.logger import log
from core.services.atbash import atbash
from core.services.caesar import caesar
from core.services.vigenere import vigenere
from core.services.xor import xor


def encrypt_controller():
  try:
    data = request.get_json()
    text = data.get("text")
    method = data.get("method")
    param = data.get("param")
    decrypt = data.get("decrypt", False)
    
    if method == "caesar":
      try:
        result = caesar(text, param, decrypt)

        if result == None:
          return jsonify({ "status_code": ErrorCodes.PARAM_NOT_INTEGER }), 400

        log(method, decrypt, param, text, result)
        return jsonify({ "result": result }), 200
      except ValueError:
        return jsonify({ "status_code": ErrorCodes.CONTROLLER_METHOD_BUG }), 400
    
    elif method == "atbash":
      result = atbash(text)

      log(method, decrypt, param, text, result)
      return jsonify({ "result": result }), 200
    
    elif method == "vigenere":
      if not param.isalpha():
        return jsonify({ "status_code": ErrorCodes.KEY_JUST_HAVE_LETTERS }), 400
      
      result = vigenere(text, param, decrypt)

      if result == None:
        return jsonify({ "status_code": ErrorCodes.PARAM_NOT_STRING }), 400

      log(method, decrypt, param, text, result)
      return jsonify({ "result": result }), 200
    
    elif method == "xor":
      result = xor(str(text), param)

      if result == None:
        return jsonify({ "status_code": ErrorCodes.PARAM_NOT_INTEGER }), 400

      log(method, decrypt, param, str(text), result)
      return jsonify({ "result": result }), 200
    
    else:
      return jsonify({ "status_code": ErrorCodes.UNKNOWN_METHOD }), 400
  
  except Exception:
    return jsonify({ "status_code": ErrorCodes.CONTROLLER_BUG }), 500
