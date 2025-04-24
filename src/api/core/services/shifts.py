from core.utils.constants import (
    ENG_LOWER,
    ENG_UPPER,
    RUS_LOWER,
    RUS_UPPER,
    UA_LOWER,
    UA_UPPER
)


def shift_char(char, shift, decrypt=False):
  if decrypt:
    shift = -shift
  
  for alphabet in [ENG_UPPER, ENG_LOWER, RUS_UPPER, RUS_LOWER, UA_UPPER, UA_LOWER]:
    if char in alphabet:
      index = alphabet.index(char)
      new_index = (index + shift) % len(alphabet)
      return alphabet[new_index]
  
  return char

def get_shift(k):
    for alphabet in [ENG_LOWER, RUS_LOWER, UA_LOWER]:
      if k in alphabet:
        return alphabet.index(k)
    return 0