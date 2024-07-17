curl -X PUT -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjQ0ZWE4ODI5ZDNhOGE3MzY4M2E4MDQiLCJpYXQiOjE3MTU3OTI1MjMsImV4cCI6MTcxNTc5NDMyM30.TWXf_uPzVkEzS9XwtHkzaE0_ixvyRr53Ebh244zpuTc" -H "Content-Type: application/json" -d '{
    "author": "6630b2e48a59336ed9bdda43",
    "products": ["662d4826d5e695f5203e0469"],
    "surgeryDate": "2024/06/08",
    "name": "Lumbar Posterior Artrodesis",
    "type": "Lumbar posterior",
    "hospital": "hospital",
    "note": "we need more implants"
}' http://localhost:8080/surgeries/663127f45ebd98f69c6760d2 -v
