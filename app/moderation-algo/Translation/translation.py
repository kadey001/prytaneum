from google.cloud import translate
import os

def TranslateText(text: str) -> str:
    """Returns the given text in both English and Spanish. If the text was written in one language, it translates to the other
    language and returns which language was the original. Ex: Input spanish sentence, output is the sentence in english, then
    in spanish, then the 'es' language code to show that it was originally in spanish.
    @Return: english_text, spanish_text, original_lang"""
    # Retrieve my personal project ID
    folder = os.path.dirname(os.path.abspath(__file__)) + '/' # Folder of this script
    filepath = folder + '../MyPersonalKeyAPI/secret3'
    # For local testing
    if(os.path.isfile(filepath)):
        with open(filepath, 'r') as f:
            projectID = f.read()
    # For production environment
    else:
        projectID = os.environ.get('GCP_PROJECT_ID')
    parent = 'projects/{}/locations/global'.format(projectID)

    # Find which language this is written in
    client = translate.TranslationServiceClient()
    response = client.detect_language(
        content=text,
        parent=parent,
        mime_type='text/plain', # mime types; text/plain or text/html
    )
    
    # Get the language code of the original text (Ex: 'en' or 'es')
    original_lang = response.languages[0].language_code

    # Temporarily set these as the original text (will be overwritten later)
    english_text = text
    spanish_text = text
    
    # Translate text to English if it is not already
    if(original_lang != 'en'):
        response = client.translate_text(
            request={
                'contents':[text],
                'mime_type': 'text/plain', # mime types; text/plain or text/html
                'target_language_code': 'en',
                'parent':parent,
            }
        )
        english_text = response.translations[0].translated_text
    # Translate text to Spanish if it is not already
    elif(original_lang != 'es'):
        response = client.translate_text(
            request={
                'contents':[text],
                'mime_type': 'text/plain', # mime types; text/plain or text/html
                'target_language_code': 'es',
                'parent':parent,
            }
        )
        spanish_text = response.translations[0].translated_text

    return english_text, spanish_text, original_lang