import json

with open('../config.json', 'r') as f:
     data = json.load(f)

print data['address']
