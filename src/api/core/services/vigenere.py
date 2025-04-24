from api.core.services.shifts import shift_char, get_shift


def vigenere(text, key, decrypt=False):
  result = ''
  key_index = 0
  key = key.lower()
  
  try:
    for char in text:
      if char.isalpha():
        shift = get_shift(key[key_index % len(key)])
        result += shift_char(char, shift, decrypt)
        key_index += 1
      else:
        result += char
    
    return result
  except Exception as e:
    return None