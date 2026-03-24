import chromadb
import uuid

client = chromadb.Client()
collection = client.get_or_create_collection("tests")


def store_result(config, result):
    doc_id = str(uuid.uuid4())

    metadata = {
        "endpoint": config["url"],
        "vus": config["vus"],
        "duration": config["duration"],
        "latency": 120,
        "error_rate": 0.01
    }

    collection.add(
        documents=[config["url"]],
        metadatas=[metadata],
        ids=[doc_id]
    )


def get_similar(endpoint):
    return collection.query(query_texts=[endpoint], n_results=3)