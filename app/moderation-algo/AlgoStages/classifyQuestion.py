import sys
sys.path.append('../')
import GoogleGemini as gemini

def DoesQuestionFitCategory(model: str, question: str, category: str, description: str) -> list:
    "Use Google Gemini to see if the question fits the given category or not"
    prompt = 'Does the text fit into the category? '
    if(len(description) > 0):
        prompt += 'A description of the category is provided. '
    prompt += 'Provide your answer as either "yes" or "no".\n'
    prompt += 'Category: "' + category + '"\n'
    if(len(description) > 0):
        prompt += 'Category description: "' + description + '"\n'
    prompt += 'Text: "' + question + '"\n'
    prompt += 'Answer: '
    response, safety_ratings = gemini.AskGoogleGemini(model, prompt)
    if('yes' in response.lower()):
        return True
    else:
        return False