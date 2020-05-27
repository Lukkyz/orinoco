manageCart()
window.addEventListener("pageshow", () => {
	manageCart();
})

var body = document.querySelector("body");
var loadSpin = document.querySelector("#spinner");

function createProduct(product) {
	return `
		<div class="product card" styl="width: 18rem;">
		  <img src="${product.imageUrl}" class="card-img-top" alt="">
		  <div class="card-body">
		  <h5 class="card-title">${product.name}</h5>
		<p class="card-text">${product.description}</p>
		<a href="product.html?id=${product._id}" class="btn btn-primary">Voir</a>
		<a href="#" class="btn btn-success">Ajouter au panier</a>
	  </div>
	</div>
	`	
}

Back.getAllProducts().then(products => {
	var productsNode = document.createElement("main");
	productsNode.className = "products d-flex";
	products.forEach(product => {
		productsNode.innerHTML += createProduct(product)	
	})	
	body.removeChild(loadSpin);
	body.appendChild(productsNode);
});

