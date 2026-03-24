reports = {}


def save_report(id, data):
    reports[id] = data


def get_report(id):
    return reports.get(id)


def get_all_reports():
    return [{"id": k, "summary": f"Report {k[:8]}"} for k in reports.keys()]