import http.client
import json
import requests

def recieve_money(data):
    payload = json.dumps(data)
    headers = {
    'Authorization': 'Bearer CHASECK_TEST-KFlxkhGVkI9QwOkaorK8B9hMw48CpKmy',
    'Content-Type': 'application/json'
    }
    res = requests.post("https://api.chapa.co/v1/transaction/initialize", payload, headers=headers)
    
    datas = res.json()
    print(datas)
    if res.status_code == 200:
        return datas






