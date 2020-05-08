manageCart()
window.addEventListener("pageshow", () => {
	manageCart();
});

var queryString = window.location.search;
var id = new URLSearchParams(queryString).get("id")

var body = document.querySelector("body")
var loadSpinner = document.querySelector("#spinner");
var main = document.createElement("main");
main.className = "product"

getOneProduct(id).then(product => {
	var title = document.createElement("h1");
	title.textContent = product.name;
	var img = document.createElement("img")
	img.src = product.imageUrl;
	img.className = "product_img"
	var descr = document.createElement("p");
	descr.textContent = product.description;
	var price = document.createElement("div");
	price.textContent = product.price + "€";
	var select = document.createElement("select");
	select.name = "lenses";
	product.lenses.forEach(lens => {
		var option = document.createElement("option");
		option.value = lens;
		option.textContent = lens;
		select.appendChild(option)
	})
	var btnCart = document.createElement("button");
	btnCart.className = "product_add-cart"
	btnCart.textContent = "Ajouter au panier"
	btnCart.addEventListener("click", () => {
		addToCart(product)
	})
	main.appendChild(title);
	main.appendChild(img);
	main.appendChild(descr);
	main.appendChild(price);
	main.appendChild(select);
	main.appendChild(btnCart);
	body.removeChild(loadSpinner)
	body.appendChild(main);
})
.catch((e) => {
	var container = document.createElement("section");
	container.className = "error";
	var gif = document.createElement("img");
	var title = document.createElement("h2");
	title.textContent = "Erreur 404 : Le produit n'existe pas !"
	gif.src = "https://media.giphy.com/media/fV1yHo8YyoKjzvMCKr/giphy.gif"	
	body.removeChild(loadSpinner)
	container.appendChild(title)
	container.appendChild(gif)
	body.appendChild(container);
})
