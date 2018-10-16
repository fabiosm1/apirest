import null as null
from django.shortcuts import render
import requests

import json, requests
cpf = {'cpf': '090876732'}
url = ('http://127.0.0.1:3001/')
cpf1 = 321313

response = requests.get(url).json()

x = 0

for r in response:
    print(r['cpf'])
    if(r['cpf']==cpf[r]):
        x = 1;

print(x)









