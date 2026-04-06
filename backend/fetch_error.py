import urllib.request

def fetch(url):
    with open('error_output.txt', 'a', encoding='utf-8') as f:
        f.write(f"--- Fetching {url} ---\n")
        try:
            res = urllib.request.urlopen(url)
            f.write(f"Success: {res.status}\n")
        except Exception as e:
            f.write(f"Error: {e}\n")
            if hasattr(e, 'read'):
                html = e.read().decode('utf-8', errors='ignore')
                import re
                title = re.search(r'<title>(.*?)</title>', html)
                if title:
                    f.write(f"Title: {title.group(1)}\n")
                exception_value = re.search(r'<div class="exception_value">(.*?)</div>', html, re.DOTALL)
                if exception_value:
                    f.write(f"Exception: {exception_value.group(1).strip()}\n")


fetch("http://127.0.0.1:8000/swagger/")
fetch("http://127.0.0.1:8000/api/resumes/list/")
fetch("http://127.0.0.1:8000/")
