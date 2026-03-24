from chroma_client import get_similar


def recommend(endpoint):
    results = get_similar(endpoint)

    if not results['metadatas']:
        return {"vus": 10, "duration": "10s"}

    meta = results['metadatas'][0][0]

    vus = meta['vus']

    if meta['error_rate'] > 0.02:
        vus = int(vus * 0.7)
    elif meta['latency'] < 200:
        vus = int(vus * 1.5)

    return {
        "vus": vus,
        "duration": meta['duration']
    }