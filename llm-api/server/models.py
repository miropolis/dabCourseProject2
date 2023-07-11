from transformers import pipeline

generator = pipeline('text-generation', model="facebook/opt-350m", do_sample=True)

# TODO try opt-1.3b for better performance