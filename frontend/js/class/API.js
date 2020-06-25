class API {
	static url = "http://localhost:3000/api/cameras/"
	
	static async getAllProducts() {
		let req = await fetch(API.url);
		let products = await req.json();
		return products;
	}

	static async getOneProduct(id) {
		let req = await fetch(API.url + id);
		let product = await req.json();
		return product;
	}

	/**
	 * @param {Object} {{Object} contact, {Array} productsId}
	 **/
	static async sendOrder(data) {
		let req = await fetch(API.url + "order", {
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

