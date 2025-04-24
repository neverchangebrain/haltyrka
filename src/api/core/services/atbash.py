from core.utils.constants import (
    ENG_LOWER,
    ENG_UPPER,
    RUS_LOWER,
    RUS_UPPER,
    UA_LOWER,
    UA_UPPER
)


def atbash(text):
  mapping = {}

  for alphabet, reversed_alphabet in [
    (ENG_UPPER, ENG_UPPER[::-1]),
    (ENG_LOWER, ENG_LOWER[::-1]),
    (RUS_UPPER, RUS_UPPER[::-1]),
    (RUS_LOWER, RUS_LOWER[::-1]),
    (UA_UPPER, UA_UPPER[::-1]),
    (UA_LOWER, UA_LOWER[::-1])
  ]:
    for i, char in enumerate(alphabet):
      mapping[char] = reversed_alphabet[i]
  
  return ''.join(mapping.get(char, char) for char in text)
