import re
ID_PATTERNS = {
    "PAN": {
        "pattern": r"^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
        "mask_type": "FULL",
    },
    "AADHAAR": {
        "pattern": r"^\d{4}\s?\d{4}\s?\d{4}$",
        "mask_type": "FIRST_8",
    },
    "AADHAAR_VID": {
        "pattern": r"^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$",
        "mask_type": "FULL",
    },
    "PASSPORT_IN": {
        "pattern": r"^[A-Z]{1}[0-9]{7}$",
        "mask_type": "FULL",
    },
    "VOTER_ID": {
        "pattern": r"^[A-Z]{3}[0-9]{7}$",
        "mask_type": "FULL",
    },
}

# Detect Id type and mask type for futher processing
def detect_id_type(text: str):
    clean_text = text.strip()
    for id_type, config in ID_PATTERNS.items():
        if re.match(config["pattern"], clean_text):
            return id_type, config["mask_type"]
    return None, None
