var reg = {
	firstName: /^[A-Za-zéèëäâï]{2,}$/,
	lastName:	/^[A-Za-zéèëäâï]{2,}$/,
	address: /[0-9]{1,3}\s[\w\s]{1,}/,
	city: /^[A-Za-zéèëäâï]{2,}$/,
	mail: /^\w{3,}@\w{3,}\.\w{2,3}$/
}

var valid = {
	firstName: false,
	lastName: false,
	address: false,
	city: false,
	mail: false
}

function isValid(element, regex) {
	var allValid = false;
	element.addEventListener("focus", (e) => {
		element.addEventListener("input", (e) => {
			if (regex.test(e.target.value)) {
				element.className = "input_valid"	
				valid[element.name] = true
			} else {
				element.className = "input_error"
				valid[element.name] = false
			}
			allValid = Object.values(valid).reduce((total, currentValue) => {
				return total && currentValue
			})
			var submit = document.querySelector(".order_submit")
			if (allValid) { 
				submit.disabled = false;
			} else {
				submit.disabled = true;
			}
		})
	})	
}

function manageform() {
	if (!document.queryselector(".order")) {
		var form = document.createelement("form")
		form.action = "confirmation.html"
		form.classname = "order_form"
		var labfname = document.createelement("label")
		labfname.textcontent = "prénom :"
		labfname.for = "fname"
		var inpfname = document.createelement("input")
		inpfname.name = "firstname"
		var lablname = document.createelement("label")
		lablname.textcontent = "nom :"
		lablname.for = "lastname"
		var inplname = document.createelement("input")
		inplname.name = "lastname"
		var labaddress = document.createelement("label")
		labaddress.textcontent = "adresse :"
		labaddress.for = "address"
		var inpaddress = document.createelement("input")
		inpaddress.name = "address"
		var labcity = document.createelement("label")
		labcity.textcontent = "ville :"
		labcity.for = "city"
		var inpcity = document.createelement("input")
		inpcity.name = "city"
		var labmail = document.createelement("label")
		labmail.textcontent = "email :"
		labmail.for = "mail"
		var inpmail = document.createelement("input")
		inpmail.name = "mail"
		var submit = document.createelement("input");
		submit.type = "button"
		submit.classname = "order_submit" 
		submit.disabled = true;
		submit.addeventlistener("click", () => {
			var fname = document.queryselector('input[name="firstname"]').value;
			var lname = document.queryselector('input[name=lastname]').value;
			var address = document.queryselector('input[name=address]').value;
			var city = document.queryselector("input[name=city]").value;
			var mail = document.queryselector("input[name=mail]").value;
			var infos = {
				firstname: fname,
				lastname: lname,
				address: address,
				city: city,
				email: mail
			}
			var products = json.parse(localstorage.getitem("cart"))
			var productsid = [] 
			products.foreach(product => {
				productsid.push(product._id)
			})	
			var reqobj = {
				contact: infos,
				products: productsid
			}
			var allvalid = object.values(valid).reduce((total, current) => {
				return total && current
			})
			if (allvalid) {
				sendorder(reqobj).then(res => {
					localstorage.setitem("confirmation_order", json.stringify(res)) 
					localstorage.removeitem("cart");
					window.location.href = "confirmation.html"
				})
			}

		})
		var ordersect = document.createelement("section");
		ordersect.classname = "order"
		var ordertitle = document.createelement("h2")
		ordertitle.textcontent = "finaliser votre commande"
		isvalid(inpfname, reg.firstname);
		isvalid(inplname, reg.lastname);
		isvalid(inpaddress, reg.address);
		isvalid(inpcity, reg.city);
		isvalid(inpmail, reg.mail);
		form.appendchild(labfname)
		form.appendchild(inpfname)
		form.appendchild(lablname)
		form.appendchild(inplname)
		form.appendchild(labaddress)
		form.appendchild(inpaddress)
		form.appendchild(labcity)
		form.appendchild(inpcity)
		form.appendchild(labmail)
		form.appendchild(inpmail)
		form.appendChild(submit)
		orderSect.appendChild(orderTitle)
		orderSect.appendChild(form)
		document.querySelector("body").appendChild(orderSect)
	}
	if (!localStorage.getItem("cart")) {
		var body = document.querySelector("body")
		body.removeChild(document.querySelector(".order"))
	}
}

Cart.manageCart()
window.addEventListener("pageshow", () => {
	Cart.manageCart();
})
