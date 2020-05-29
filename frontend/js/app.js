const API_URL = "http://localhost:3000/api/cameras"

async function getProducts() {
	var req = await fetch(API_URL);
	var products = await req.json();
	return products;
}
