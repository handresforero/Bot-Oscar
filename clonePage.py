import requests

def clone_page(url, filename="cloned_page.html"):
    headers = {"User-Agent": "Mozilla/5.0"}  # To avoid blocking by some sites
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        with open(filename, "w", encoding="utf-8") as file:
            file.write(response.text)
        print(f"Page cloned successfully as {filename}")
    else:
        print(f"Failed to fetch the page. Status code: {response.status_code}")

# Example usage
url = "https://oscarsan85.wixsite.com/my-site-1"  # Replace with your target URL
clone_page(url)