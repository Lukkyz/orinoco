class Back {
	static url = "http://localhost:3000/api/cameras/"
	
	static async getAllProducts() {
		let req = await fetch(Back.url);
		let products = await req.json();
		return products;
	}

	static async getOneProduct(id) {
		let req = await fetch(Back.url + id);
		let product = await req.json();
		return product;
	}

	static async sendOrder(data) {
		console.log(data)
		let req = await fetch(Back.url + "order", {
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

