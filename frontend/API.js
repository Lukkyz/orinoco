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
