def compare_treatment(p1, p2):

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

    p1 = set(p1)
    p2 = set(p2)

    common = list(p1.intersection(p2))
    only_first = list(p1 - p2)
    only_second = list(p2 - p1)

    similarity_score = 0

    if len(p1.union(p2)) > 0:
        similarity_score = round(
            (len(common) / len(p1.union(p2))) * 100,
            2
        )

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

    medicine_details = []

    for med in only_first + only_second:

        if med in medicine_info:
            medicine_details.append({
                "medicine": med,
                "purpose": medicine_info[med]["purpose"],
                "category": medicine_info[med]["category"]
            })
        else:
            medicine_details.append({
                "medicine": med,
                "purpose": "Information unavailable",
                "category": "Unknown"
            })

    alternative_suggestions = {}

    for med in only_first + only_second:
        if med in alternatives:
            alternative_suggestions[med] = alternatives[med]

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