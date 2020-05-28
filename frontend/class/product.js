class Product {
	constructor(product) {
		this.product = product;
		this.lenses = product.lenses;
		this.id = product._id;
		this.name = product.name;
		this.price = product.price / 100;
		this.description = product.description;
		this.imgUrl = product.imageUrl;
	}
	createProductPreview() {
		let div = document.createElement("div");
		div.className = "product card offset-md-3 col-md-6";
		div.innerHTML = `
			  <img src="${this.imgUrl}" class="card-img-top" alt="${this.name}">
			  <div class="card-body">
			  <h5 class="card-title">${this.name}</h5>
			<p class="card-text">${this.description}</p>
			<div>${this.price} €</div>
			<a href="product.html?id=${this.id}" class="btn btn-primary">Voir</a>
			<button class="btn btn-success add-cart">Ajouter au panier</button>
		  </div>
		</div>
		`	 
		let btnAdd = div.querySelector(".add-cart");	
		btnAdd.addEventListener('click', () => {
			Cart.addToCart(this.product)
		})
		return div
	}
	createProduct() {
		let div = document.createElement("div");
		div.className = "card mb-3";
		div.innerHTML = `
		  <img src="${this.imgUrl}" class="card-img-top w-50 m-auto" alt="...">
		  <div class="card-body">
			<h5 class="card-title">${this.name}</h5>
			<p class="card-text">${this.description}</p>
			<div class="card-price">${this.price} €</div>
			<select class="lenses">
			${this.lensesHTML()}
			</select>
			<button class="btn btn-success add-cart">Ajouter au panier</button>
		  </div>
		`
		let btnAdd = div.querySelector(".add-cart") 
		btnAdd.addEventListener('click', () => {
			Cart.addToCart(this.product)
		})
		return div 
	}
	lensesHTML() {
		let html = '';
		this.lenses.forEach(lens => {
				html += `
				<option value=${lens}>${lens}</option>
				`
		})
		return html	
	}}
