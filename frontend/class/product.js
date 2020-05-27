class Product {
	constructor(product) {
		this.lenses = product.lenses;
		this.id = product._id;
		this.name = product.name;
		this.price = product.price / 100;
		this.description = product.description;
		this.imgUrl = product.imageUrl;
		console.log(product)
	}
	createProductPreview() {
		return `
			<div class="product card offset-md-3 col-md-6" style="">
			  <img src="${this.imgUrl}" class="card-img-top" alt="${this.name}">
			  <div class="card-body">
			  <h5 class="card-title">${this.name}</h5>
			<p class="card-text">${this.description}</p>
			<div>${this.price} €</div>
			<a href="product.html?id=${this.id}" class="btn btn-primary">Voir</a>
			<a href="#" class="btn btn-success">Ajouter au panier</a>
		  </div>
		</div>
		`	
	}
	createProduct() {
		return `
		<div class="card mb-3">
		  <img src="${this.imgUrl}" class="card-img-top w-50 m-auto" alt="...">
		  <div class="card-body">
			<h5 class="card-title">${this.name}</h5>
			<p class="card-text">${this.description}</p>
			<div class="card-price">${this.price} €</div>
			<select class="lenses">
			${this.lensesHTML()}
			</select>
			<a class="btn btn-success">Ajouter au panier</a>
		  </div>
		</div>
		`
	}
	lensesHTML() {
		let html = '';
		this.lenses.forEach(lens => {
				html += `
				<option value=${lens}>${lens}</option>
				`
		})
		return html	
	}
}
