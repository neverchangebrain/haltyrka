RUS_UPPER = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'
RUS_LOWER = RUS_UPPER.lower()
ENG_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
ENG_LOWER = ENG_UPPER.lower()

from logger import Logger
logger = Logger()

def shift_char(char, shift, decrypt=False):
    try:
        if decrypt:
            shift = -shift
        if char in ENG_UPPER:
            return ENG_UPPER[(ENG_UPPER.index(char) + shift) % len(ENG_UPPER)]
        elif char in ENG_LOWER:
            return ENG_LOWER[(ENG_LOWER.index(char) + shift) % len(ENG_LOWER)]
        elif char in RUS_UPPER:
            return RUS_UPPER[(RUS_UPPER.index(char) + shift) % len(RUS_UPPER)]
        elif char in RUS_LOWER:
            return RUS_LOWER[(RUS_LOWER.index(char) + shift) % len(RUS_LOWER)]
        return char
    except Exception as e:
        logger.log("shift_char", decrypt, shift, char, f"Ошибка: {str(e)}")
        return char

def caesar(text, shift, decrypt=False):
    try:
        result = ''.join(shift_char(char, shift, decrypt) for char in text)
        logger.log("caesar", decrypt, shift, text[:100], result[:100])
        return result
    except Exception as e:
        logger.log("caesar", decrypt, shift, text[:100], f"Ошибка: {str(e)}")
        raise

def atbash(text):
    result = ''
    try:
        for char in text:
            if char in ENG_UPPER:
                result += ENG_UPPER[::-1][ENG_UPPER.index(char)]
            elif char in ENG_LOWER:
                result += ENG_LOWER[::-1][ENG_LOWER.index(char)]
            elif char in RUS_UPPER:
                result += RUS_UPPER[::-1][RUS_UPPER.index(char)]
            elif char in RUS_LOWER:
                result += RUS_LOWER[::-1][RUS_LOWER.index(char)]
            else:
                result += char
        logger.log("atbash", False, "-", text[:100], result[:100])
        return result
    except Exception as e:
        logger.log("atbash", False, "-", text[:100], f"Ошибка: {str(e)}")
        raise

def vigenere(text, key, decrypt=False):
    result = ''
    key_index = 0
    key = key.lower()
    def get_shift(k):
        if k in ENG_LOWER:
            return ENG_LOWER.index(k)
        elif k in RUS_LOWER:
            return RUS_LOWER.index(k)
        return 0
    try:
        for char in text:
            if char.isalpha():
                shift = get_shift(key[key_index % len(key)])
                result += shift_char(char, shift, decrypt)
                key_index += 1
            else:
                result += char
        logger.log("vigenere", decrypt, key, text[:100], result[:100])
        return result
    except Exception as e:
        logger.log("vigenere", decrypt, key, text[:100], f"Ошибка: {str(e)}")
        raise

def xor(text, key):
    try:
        result = ''.join(chr(ord(c) ^ ord(key[i % len(key)])) for i, c in enumerate(text))
        logger.log("xor", False, key, text[:100], result[:100])
        return result
    except Exception as e:
        logger.log("xor", False, key, text[:100], f"Ошибка: {str(e)}")
        raise
