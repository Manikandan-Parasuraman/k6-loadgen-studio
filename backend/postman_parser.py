import json


def parse_postman(data):
    data = json.loads(data)

    results = []

    for item in data.get("item", []):
        req = item["request"]

        headers = {h['key']: h['value'] for h in req.get("header", [])}

        auth = req.get("auth", {})

        results.append({
            "name": item.get("name"),
            "url": req["url"]["raw"],
            "method": req["method"],
            "headers": headers,
            "auth": auth,
            "body": req.get("body", {})
        })

    return results