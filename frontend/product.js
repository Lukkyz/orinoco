

var queryString = window.location.search;
var id = new URLSearchParams(queryString).get("id")

var body = document.querySelector("body")
var main = document.createElement("main");
main.className = "product"

Back.getOneProduct(id).then(data => {
	let product = new Product(data);	
	main.innerHTML += product.createProduct();
	body.appendChild(main)
})
.catch((e) => {
	var container = document.createElement("section");
	container.className = "error";
	var gif = document.createElement("img");
	var title = document.createElement("h2");
	title.textContent = "Erreur 404 : Le produit n'existe pas !"
	gif.src = "https://media.giphy.com/media/fV1yHo8YyoKjzvMCKr/giphy.gif"	
	container.appendChild(title)
	container.appendChild(gif)
	body.appendChild(container);
})
