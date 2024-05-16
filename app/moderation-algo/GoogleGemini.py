import os
import google.generativeai as genai
import hashlib
import json

def AskGoogleGemini(model: str, prompt: str, max_output_tokens=1024, force=False, temperature=0.2, top_k=40) -> str | dict:
    "Ask a prompt to given Google Cloud model and return the response text and safety ratings."
    model = genai.GenerativeModel(model)
    
    # Check if the prompt has been executed before
    folder = os.path.dirname(os.path.abspath(__file__)) + '/' # Folder of this script
    response = ''
    hashedPrompt = str(hashlib.md5(prompt.encode('utf-8')).hexdigest()[:8])
    filepath = folder + 'GooglegeminiCache/' + hashedPrompt
    filepath_safety = folder + 'GooglegeminiCache/' + hashedPrompt + '_safety_ratings'
    if(os.path.isfile(filepath)):
        with open(filepath, 'r') as f:
            response = f.read()
        with open(filepath_safety, 'r') as f:
            safety_ratings = json.load(f)
        
    # Set the safety filter to not block anything
    safety_settings=[
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_NONE"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_NONE"
            },
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_NONE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_NONE"
            },
        ]
    
    # If force is True, always get a new response from Gemini
    if(force):
        response = ''
        
    # Get the response and its safety ratings from Gemini if it was not cached
    if(response == ''):
        completion = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                max_output_tokens=max_output_tokens,
                temperature=temperature, # Randomness: Low temp = low randomness, high temp = high creativity
                top_k=top_k,
            ),
            safety_settings=safety_settings
        )
        response = completion.text
        if(response is None):
            response = 'unknown'
            
        safety_ratings = {}
        for safety_rating in completion.prompt_feedback.safety_ratings:
            # Extract category (ex: HARM_CATEGORY_TOXICITY --> TOXICITY)
            category = safety_rating.category.name
            probability = safety_rating.probability.name
            safety_ratings[category] = probability
        
        # Create the cache folder if it does not exist
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        # Output the response and its safety ratings to cache if it has not been executed before
        with open(filepath, 'w') as f:
            f.write(response)
        with open(filepath_safety, 'w') as f:
            json.dump(safety_ratings, f)
    
    return response, safety_ratings
