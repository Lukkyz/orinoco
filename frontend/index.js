var body = document.querySelector("body");

Back.getAllProducts().then(products => {
	var productsNode = document.createElement("main");
	productsNode.className = "products container-fluid ";
	products.forEach(data => {
		let product = new Product(data)
		productsNode.appendChild(product.createProductPreview())	
	})	
	body.appendChild(productsNode);
});

