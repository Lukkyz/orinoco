var body = document.querySelector("body");
var loadSpin = document.querySelector("#spinner");

getProducts().then(products => {
	var productsNode = document.createElement("main");
	productsNode.className = "products";
	products.forEach(product => {
		var productNode = document.createElement("article");
		productNode.className = "product";
		productNode.id = product._id
		var title = document.createElement("h2");
		title.textContent = product.name;
		title.className = "product_title";
		var img = document.createElement("img");
		img.src = product.imageUrl;
		img.className = "product_img";
		var descr = document.createElement("p");
		descr.textContent = product.description;
		descr.className = "product_descr";
		var price = document.createElement("div")
		price.textContent = product.price + "€";
		price.className = "product_price";
		var linkSee = document.createElement("a");
		linkSee.textContent = "Voir";
		linkSee.className = "product_see";
		var addToCart = document.createElement("a")
		addToCart.textContent = "Ajouter au panier";
		addToCart.className = "product_add-cart";
		productNode.appendChild(title);
		productNode.appendChild(img);
		productNode.appendChild(descr);
		productNode.appendChild(price);
		productNode.appendChild(linkSee);
		productNode.appendChild(addToCart);
		productsNode.appendChild(productNode);
	})	
	body.removeChild(loadSpin);
	body.appendChild(productsNode);
});



