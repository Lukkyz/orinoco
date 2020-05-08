function createCart() {
	var main = document.querySelector(".cart_page")
	main.innerHTML = "";
	var table = document.createElement("table");
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



createCart()
