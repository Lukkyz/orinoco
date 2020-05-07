document.querySelector(".cart").addEventListener('mouseover', () => {
	if (Object.keys(localStorage).length > 0){
		document.querySelector(".cart_body").classList.add("cart_body--active")
	}
})

document.querySelector(".cart_body").addEventListener('mouseleave', () => {
	document.querySelector(".cart_body").classList.remove("cart_body--active")
})

// Return true if product is in cart
function isInCart(id) {
	var cart = JSON.parse(localStorage.getItem("cart"));
	return cart.some(product => product._id == id)
}

function manageCart(element) {
	try {
		var cartBody = document.querySelector(element);
		cartBody.innerHTML = "";
		var entries = document.createElement("table");	
		var name = document.createElement("th");
		name.textContent = "Nom";
		var quantity = document.createElement("th")
		quantity.textContent = "Quantité";
		var price = document.createElement("th");
		price.textContent = "Prix/u";
		var total = 0;
		entries.appendChild(name);
		entries.appendChild(quantity);
		entries.appendChild(price);
		var cart = JSON.parse(localStorage.getItem("cart"));
		document.querySelector(".cart_qty").textContent = cart.length
		cart.forEach(product => {
			var tr = document.createElement("tr");
			var name = document.createElement("td");
			name.textContent = product.name;
			var qty = document.createElement("td");
			qty.textContent = product.quantity;
			var price = document.createElement("td");
			price.textContent = product.price
			total += product.price * product.quantity 
			tr.appendChild(name);	
			tr.appendChild(qty);	
			tr.appendChild(price);	
			entries.appendChild(tr);
		})
		var totalPrice = document.createElement("span");
		totalPrice.textContent = "Prix Total : " + total
		entries.appendChild(totalPrice)
		console.log(document.querySelector(element));
		document.querySelector(element).appendChild(entries)		
	} catch {}
}
