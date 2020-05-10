if (!localStorage.getItem('confirmation_order')) {
	window.location.href = "index.html"
}

var order = JSON.parse(localStorage.getItem("confirmation_order"))
var contact = order.contact
var products = order.products
var main = document.querySelector(".confirmation_order");
var title = document.createElement("h2")
title.textContent = "Recapitulatif de votre commande"
main.appendChild(title)
var infos = document.createElement('section')
var title = document.createElement("h3");
title.textContent = "Informations"
infos.appendChild(title);
var orderId = document.createElement("div");
orderId.textContent = "Numéro de commande : " + order.orderId
main.appendChild(orderId)
Object.values(contact).forEach(info => {
	var div = document.createElement("div")
	div.textContent = info
	infos.appendChild(div)
	console.log(info)
})

main.appendChild(infos)

Object.values(products).forEach(product => {
	var div = document.createElement("div")
	div.className = "product_order"
	var img = document.createElement("img")
	img.src = product.imageUrl;
	img.className = "product_order_img"
	div.appendChild(img);
	var name = document.createElement("h4");
	name.textContent = product.name
	div.appendChild(name)
	var price = document.createElement("div");
	price.textContent = product.price + "€"
	div.appendChild(price)
	main.appendChild(div)
})
