from cipher import caesar, atbash, vigenere, xor

class CipherService:
    def process(self, method, text, param, decrypt, logger=None):
        try:
            if method == "caesar":
                shift = int(param)
                result = caesar(text, shift, decrypt)
            elif method == "atbash":
                result = atbash(text)
            elif method == "vigenere":
                if not param.isalpha():
                    if logger:
                        logger.log(method, decrypt, param, text, "Ошибка: ключ должен содержать только буквы.")
                    raise ValueError("Ключ должен содержать только буквы.")
                result = vigenere(text, param, decrypt)
            elif method == "xor":
                key = str(param)
                result = xor(text, key)
            else:
                if logger:
                    logger.log(method, decrypt, param, text, "Ошибка: неизвестный метод.")
                raise ValueError("Неизвестный метод.")
            return result
        except Exception as e:
            if logger:
                logger.log(method, decrypt, param, text, f"Ошибка: {str(e)}")
            raise