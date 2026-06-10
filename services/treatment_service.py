def normalize(p):
    """
    Ensures input is always a list of medicine names.
    Handles both:
    - list input from frontend
    - comma-separated string (fallback safety)
    """
    if isinstance(p, str):
        return [x.strip() for x in p.split(",") if x.strip()]
    elif isinstance(p, list):
        return [x.strip() for x in p if isinstance(x, str) and x.strip()]
    else:
        return []


def compare_treatment(p1, p2):

    # Normalize inputs FIRST (MOST IMPORTANT FIX)
    p1 = normalize(p1)
    p2 = normalize(p2)

    medicine_info = {
        "Paracetamol": {
            "purpose": "Reduces fever and pain",
            "category": "Pain Reliever"
        },
        "Amoxicillin": {
            "purpose": "Antibiotic used for bacterial infections",
            "category": "Antibiotic"
        },
        "Azithromycin": {
            "purpose": "Antibiotic used for respiratory infections",
            "category": "Antibiotic"
        },
        "Metformin": {
            "purpose": "Controls blood sugar levels",
            "category": "Diabetes Medication"
        },
        "Ibuprofen": {
            "purpose": "Reduces pain and inflammation",
            "category": "Pain Reliever"
        },
        "Cetirizine": {
            "purpose": "Used for allergy relief",
            "category": "Antihistamine"
        }
    }

    alternatives = {
        "Amoxicillin": ["Azithromycin", "Cefixime"],
        "Paracetamol": ["Acetaminophen"],
        "Ibuprofen": ["Naproxen"],
        "Cetirizine": ["Loratadine"]
    }

    # SAFE SET LOGIC
    set1 = set(p1)
    set2 = set(p2)

    common = list(set1 & set2)
    only_first = list(set1 - set2)
    only_second = list(set2 - set1)

    # SAFE similarity calculation
    union = set1 | set2
    similarity_score = round((len(common) / len(union)) * 100, 2) if union else 0

    # classification
    if similarity_score >= 70:
        similarity_level = "High Similarity"
        treatment_consistency = "High"
        risk_indicator = "Low"
        conclusion = "Prescriptions are highly similar."
    elif similarity_score >= 40:
        similarity_level = "Moderate Similarity"
        treatment_consistency = "Moderate"
        risk_indicator = "Medium"
        conclusion = "Prescriptions have moderate overlap."
    else:
        similarity_level = "Low Similarity"
        treatment_consistency = "Low"
        risk_indicator = "High"
        conclusion = "Prescriptions differ significantly."

    # medicine details
    medicine_details = []

    for med in only_first + only_second:
        medicine_details.append({
            "medicine": med,
            "purpose": medicine_info.get(med, {}).get("purpose", "Information unavailable"),
            "category": medicine_info.get(med, {}).get("category", "Unknown")
        })

    # alternatives
    alternative_suggestions = {
        med: alternatives[med]
        for med in only_first + only_second
        if med in alternatives
    }

    patient_summary = (
        f"Both prescriptions share {len(common)} common medicine(s). "
        f"There are {len(only_first) + len(only_second)} differing medicine(s). "
        f"The overall treatment similarity is {similarity_score}%."
    )

    return {
        "common_medicines": common,
        "only_in_first": only_first,
        "only_in_second": only_second,
        "similarity_percentage": similarity_score,
        "similarity_level": similarity_level,
        "treatment_consistency": treatment_consistency,
        "risk_indicator": risk_indicator,
        "conclusion": conclusion,
        "medicine_details": medicine_details,
        "alternative_suggestions": alternative_suggestions,
        "patient_summary": patient_summary,
        "advice": "Consult a healthcare professional before changing medication."
    }