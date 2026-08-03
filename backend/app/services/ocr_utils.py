import re

def normalize_ocr_text(text: str):
    """
    Normalizes text fields for accurate regex detection.

    - Example : 

    VID:0000 1111 2222 3333 -->0000111122223333
    """
    clean_text = text.upper().strip()

    # Remove common prefixes
    clean_text = re.sub(r"^VID\s*:?\s*", "", clean_text)

    # Collapse multiple spaces into one
    clean_text = re.sub(r"\s+", " ", clean_text)

    return clean_text