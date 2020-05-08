// Return true if product is in cart
function isInCart(id) {
	var cart = JSON.parse(localStorage.getItem("cart"));
	return cart.some(product => product._id == id)
}

function addToCart(product) {
	product.quantity = 1;	
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
	manageCart()
}

function removeFromCart(product) {
	var cart = JSON.parse(localStorage.getItem("cart"))
	cart = cart.filter(elem => {
		return elem._id !== product._id
	})		
	console.log(cart)
	if (cart.length > 0) {
		localStorage.setItem("cart", JSON.stringify(cart))
	} else {
		localStorage.removeItem("cart")
	}
	manageCart()
}

function reduceQuantity(product) {
	var cart = JSON.parse(localStorage.getItem("cart"))
	cart.map(elem => {
		if (elem._id == product._id) {
			elem.quantity -= 1;
			if (elem.quantity == 0) {
				removeFromCart(product)
			} else {
				localStorage.setItem("cart", JSON.stringify(cart))
				manageCart()
			}
		}
	})
}

function manageCart() {
	document.querySelector(".cart").addEventListener('mouseover', () => {
	if (localStorage.getItem("cart")){
		document.querySelector(".cart_body").classList.add("cart_body--active")
		}
	})

	document.querySelector(".cart_body").addEventListener('mouseleave', () => {
		document.querySelector(".cart_body").classList.remove("cart_body--active")
	})
	try {
		var cartBody = document.querySelector(".cart_body");
		cartBody.innerHTML = "";
		document.querySelector(".cart_qty").textContent = "0"
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
		document.querySelector(".cart_body").appendChild(entries)		
	} catch {
	}
}
