const url = "http://localhost:3000/api/cameras/"

class Back {
	static url = "http://localhost:3000/api/cameras/"
	
	static async getAllProducts() {
		let req = await fetch(url);
		let products = await req.json();
		return products;
	}

	static async getOneProduct(id) {
		let req = await fetch(url + id);
		let product = await req.json();
		return product;
	}

	static async sendOrder(data) {
		let req = await fetch(url + "order", {
		method: 'POST', 
		body: JSON.stringify(data),
		headers: {
			"Content-Type": 'application/json'
		}
		});
		let res = await req.json()
		return res
	}
}

