import sys
sys.path.append('../')
import GoogleGemini as gemini

def SummarizePosts(model: str, topic: str, posts: list, subtopic='', force=False) -> str:
    if(len(subtopic) > 0):
        prompt = f'Summarize the viewpoints on "{subtopic}", within the broad topic of "{topic}",'
    else:
        prompt = f'Summarize the viewpoints on "{topic}" '
    prompt += 'in the following comments in just one to five sentences. '
    prompt += 'Start each sentence on a new line with a dash. '
    prompt += 'The comments are:\n'
    for i, post in enumerate(posts):
        prompt += f'Comment {i+1}: "{post}"\n'
    prompt += 'The viewpoints are:\n'

    # Get response and change it to list format
    response, safety_ratings = gemini.AskGoogleGemini(model, prompt, force=force)
    response = response.replace('\n', '')
    response = response.split('- ')
    response = response[1:]
    return response