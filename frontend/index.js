const API_URL = "http://localhost:3000/api/cameras"

async function getProducts() {
	var req = await fetch(API_URL);
	var products = await req.json();
	return products;
}

manageCart(".cart_body")

var body = document.querySelector("body");
var loadSpin = document.querySelector("#spinner");

function addToCart(product) {
	if (!localStorage.getItem("cart")) {
		var cart = [];
			cart.push(product);
			localStorage.setItem("cart", JSON.stringify(cart))
	} else {
		var cart = JSON.parse(localStorage.getItem("cart"))
		if (isInCart(product._id)) {
			cart.map(elem => {
				if (elem._id == product._id) {
					elem.quantity += 1
				}
			})
		} else {
			cart.push(product);
		}
		localStorage.setItem("cart", JSON.stringify(cart))
	}
	manageCart('.cart_body')
}

function createProduct(product) {
	var productNode = document.createElement("article");
		productNode.className = "product";
		var title = document.createElement("h2");
		title.textContent = product.name;
		title.className = "product_title";
		var img = document.createElement("img");
		img.src = product.imageUrl;
		img.className = "product_img";
		var descr = document.createElement("p");
		descr.textContent = product.description;
		descr.className = "product_descr";
		var lenses = document.createElement("ul");
		lenses.className = "product_lenses";
		product.lenses.forEach(lense => {
			var lens = document.createElement("li");
			lens.textContent = lense;
			lenses.appendChild(lens);
		})
		var price = document.createElement("div")
		price.textContent = product.price + "€";
		price.className = "product_price";
		var linkSee = document.createElement("button");
		linkSee.textContent = "Voir";
		linkSee.className = "product_see";
		var btnCart = document.createElement("button")
		btnCart.textContent = "Ajouter au panier";
		btnCart.className = "product_add-cart";
		btnCart.addEventListener('click', () => {
			addToCart(product)	
		})
		btnCart.id = product._id;
		productNode.appendChild(title);
		productNode.appendChild(img);
		productNode.appendChild(descr);
		productNode.appendChild(lenses);
		productNode.appendChild(price);
		productNode.appendChild(linkSee);
		productNode.appendChild(btnCart);
		return productNode
}

getProducts().then(products => {
	var productsNode = document.createElement("main");
	productsNode.className = "products";
	products.forEach(product => {
		product.quantity = 1;	
		productsNode.appendChild(createProduct(product))	
	})	
	body.removeChild(loadSpin);
	body.appendChild(productsNode);
});

