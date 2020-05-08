function createCart() {
	var main = document.querySelector(".cart_page")
	main.innerHTML = "";
	if (localStorage.getItem("cart")) { 
		var table = document.createElement("table");
		table.className = ".cart_table"
		var tr = document.createElement("tr");
		var thImg = document.createElement("th");
		thImg.textContent = "Photo"	
		var thName = document.createElement("th");
		thName.textContent = "Nom"
		var thPrice = document.createElement("th");
		thPrice.textContent = "Prix/u"
		var thQty = document.createElement("th");
		thQty.textContent = "Quantité"
		var thTotal = document.createElement("th")
		thTotal.textContent = "Prix Total"
		tr.appendChild(thImg)
		tr.appendChild(thName)
		tr.appendChild(thPrice)
		tr.appendChild(thQty)
		tr.appendChild(thTotal)
		table.appendChild(tr)
		var cart = JSON.parse(localStorage.getItem("cart"))
		var total = 0;
		cart.forEach(product => {
			var tr = document.createElement("tr")
			var tdImg = document.createElement("td")
			var img = document.createElement("img")
			img.src = product.imageUrl;
			img.className = "cart_img"
			tdImg.appendChild(img)
			var tdName = document.createElement("td")
			tdName.textContent = product.name 
			var tdPrice = document.createElement("td")
			tdPrice.textContent = product.price 
			var tdQty = document.createElement("td")
			tdQty.textContent = product.quantity 
			var incrBtn = document.createElement("button")
			incrBtn.textContent = "+";
			incrBtn.className = "btn_incr";
			var decrBtn = document.createElement("button")
			decrBtn.textContent = "-";
			decrBtn.className = "btn_decr";
			incrBtn.addEventListener('click', () => {
				addToCart(product, createCart)
			})	
			decrBtn.addEventListener('click', () => {
				reduceQuantity(product, createCart)
			})
			tdQty.appendChild(incrBtn)
			tdQty.appendChild(decrBtn)
			var tdTotal = document.createElement("td")
			tdTotal.textContent = product.price * product.quantity 
			total += product.price * product.quantity
			tr.appendChild(tdImg);
			tr.appendChild(tdName);
			tr.appendChild(tdPrice);
			tr.appendChild(tdQty);
			tr.appendChild(tdTotal);
			table.appendChild(tr)
		})
			var totalPrice = document.createElement("tr")
			totalPrice.textContent = total
			table.appendChild(totalPrice)
			main.appendChild(table)
	}
	manageForm()
}

function manageForm() {
	if (!document.querySelector(".order")) {
		var form = document.createElement("form")
		form.className = "order_form"
		var labFName = document.createElement("label")
		labFName.textContent = "Prénom :"
		labFName.for = "fname"
		var inpFName = document.createElement("input")
		inpFName.name = "fname"
		var labLName = document.createElement("label")
		labLName.textContent = "Nom :"
		labLName.for = "lname"
		var inpLName = document.createElement("input")
		inpLName.name = "lname"
		var labAddress = document.createElement("label")
		labAddress.textContent = "Asresse :"
		labAddress.for = "address"
		var inpAddress = document.createElement("input")
		inpAddress.name = "address"
		var labCity = document.createElement("label")
		labCity.textContent = "Ville :"
		labCity.for = "city"
		var inpCity = document.createElement("input")
		inpCity.name = "city"
		var labMail = document.createElement("label")
		labMail.textContent = "Email :"
		labMail.for = "mail"
		var inpMail = document.createElement("input")
		inpMail.name = "mail"
		var orderSect = document.createElement("section");
		orderSect.className = "order"
		var orderTitle = document.createElement("h2")
		orderTitle.textContent = "Finaliser votre commande"
		form.appendChild(labFName)
		form.appendChild(inpFName)
		form.appendChild(labLName)
		form.appendChild(inpLName)
		form.appendChild(labAddress)
		form.appendChild(inpAddress)
		form.appendChild(labCity)
		form.appendChild(inpCity)
		form.appendChild(labMail)
		form.appendChild(inpMail)
		orderSect.appendChild(orderTitle)
		orderSect.appendChild(form)
		document.querySelector("body").appendChild(orderSect)
	}
	if (!localStorage.getItem("cart")) {
		var body = document.querySelector("body")
		body.removeChild(document.querySelector(".order"))
	}
}



createCart()
