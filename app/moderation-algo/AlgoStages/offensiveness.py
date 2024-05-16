import sys
sys.path.append('../')
import PerspectiveAPI as pers

def IsOffensive(text: str, threshold=0.7) -> bool:
    "Returns True or False if a question meets the offensive threshold for any toxicity category"
    # Check if any toxicity category meets or surpasses the threshold
    toxicityScores = pers.GetToxicityScores(text)
    for score in toxicityScores.values():
        if(score >= threshold):
            return True
    return False