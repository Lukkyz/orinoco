const API_URL = "http://localhost:3000/api/cameras/"

async function getAllProducts() {
	var req = await fetch(API_URL);
	var products = await req.json();
	return products;
}

async function getOneProduct(id) {
	var req = await fetch(API_URL + id);
	var product = await req.json();
	return product;
}

async function sendOrder(data) {
	console.log(data)
	console.log(API_URL + 'order')
	var req = await fetch(API_URL + "order", {
		method: 'POST', 
		body: JSON.stringify(data),
		headers: {
			"Content-Type": 'application/json'
		}
	});
	var res = await req.json()
	return res
}
