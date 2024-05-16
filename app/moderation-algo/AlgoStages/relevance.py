import GoogleGemini as gemini

def IsRelevant(model: str, text: str, topic: str) -> bool:
    "Asks Google Gemini if the question is relevant to the given topic. Returns True/False."
    prompt = 'Could the given text be relevant in any way in a discussion about the given topic? '
    #prompt += 'Comments that discuss subjects related to the topic are still relevant. '
    prompt += 'Output your answer as a simple "yes" or "no".\n'
    prompt += 'Text: {}\n'.format(text)
    prompt += 'Topic: {}\n'.format(topic)
    prompt += 'Your answer: '
    
    response, safety_ratings = gemini.AskGoogleGemini(model, prompt)
    
    if('yes' in response.lower()):
        return True
    return False