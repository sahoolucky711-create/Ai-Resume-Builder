import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def preprocess(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9 ]', '', text)
    return text


def calculate_match(resume_text, job_text):
    resume_text = preprocess(resume_text)
    job_text = preprocess(job_text)

    documents = [resume_text, job_text]

    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(documents)

    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    score = float(similarity[0][0]) * 100

    return round(score, 2)


def compare_skills(resume_skills, job_skills):
    resume_set = set([s.lower() for s in resume_skills])
    job_set = set([s.lower() for s in job_skills])

    matched = list(resume_set.intersection(job_set))
    missing = list(job_set.difference(resume_set))

    return matched, missing
