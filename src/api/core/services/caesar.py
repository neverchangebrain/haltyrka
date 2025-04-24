from core.services.shifts import shift_char


def caesar(text, shift, decrypt=False):
    try:
        result = ''.join(shift_char(char, shift, decrypt) for char in text)
        return result
    except Exception as e:
        return None