def xor(text, key):
    try:
        result = ''.join(chr(ord(c) ^ ord(key[i % len(key)])) for i, c in enumerate(text))
        return result
    except Exception as e:
        return None
