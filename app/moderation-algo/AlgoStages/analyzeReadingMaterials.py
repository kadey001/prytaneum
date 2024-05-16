import sys
sys.path.append('../')
import GoogleGemini as gemini
import json

def ExtractIssueFromReadingMaterials(model: str, reading_materials: str, force=False) -> str:
    "Use Google Gemini to extract the overall topic that the given reading material discusses"
    prompt = 'Write the overall topic that the following article deals with as a short phrase:\n'
    prompt += 'Article: """' + reading_materials + '"""\n'
    prompt += 'Topic:'
    
    response, safety_ratings = gemini.AskGoogleGemini(model, prompt, force=force)
    
    return response

def ExtractCategoriesDescriptions(model: str, reading_materials: str, force=False) -> dict:
    """Returns a list of categories and their descriptions gathered from given reading materials file

    Args:
        infile: The input reading materials from which to extract categories.

    Returns:
        allCategoriesDesc: {'topic':'description', ...}
    """
    prompt = 'I am giving you a political article, give me the broader topics discussed in the article '
    prompt += 'and a description of them in a '
    prompt += 'JSON format like so: {"the first topic":"the first description","second topic":"second description", ...}. '
    prompt += 'Only provide high level topics that are not similar to one another. '
    prompt += 'Condense the provided topics into a maximum of 7 broad topics. '
    prompt += 'The political article to extract topics from is as follows:\n"'
    prompt += reading_materials.replace('\n', ' ')
    prompt += '"\n'
    prompt += 'Topics and descriptions: '
    
    response, safety_ratings = gemini.AskGoogleGemini(model, prompt, force=force)
    
    # Convert the response to python dict and return
    allCategoriesDesc = json.loads(response)
    return allCategoriesDesc