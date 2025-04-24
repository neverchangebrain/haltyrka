def xor(text, key):
    try:
        data = str(key)
        result = ''.join(chr(ord(c) ^ ord(data[i % len(data)])) for i, c in enumerate(text))
        return result
    except Exception as e:
        print(e)
        return None
