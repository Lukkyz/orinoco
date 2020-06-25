class Cart {
  static isInCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    return cart.some((product) => product._id == id);
  }

  static addToCart(product, func) {
    product.quantity = 1;
    if (!localStorage.getItem("cart")) {
      var cart = [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      var cart = JSON.parse(localStorage.getItem("cart"));
      if (Cart.isInCart(product._id)) {
        cart.forEach((elem) => {
          if (elem._id == product._id) {
            elem.quantity += 1;
          }
        });
      } else {
        cart.push(product);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    func ? func() : 0;
  }

  static removeFromCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter((elem) => {
      return elem._id !== product._id;
    });
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }

  static reduceQuantity(product, func) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach((elem) => {
      if (elem._id == product._id) {
        elem.quantity -= 1;
        if (elem.quantity == 0) {
          Cart.removeFromCart(product);
        } else {
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    });
    func ? func() : 0;
  }

  static manageCart() {
    let main = document.querySelector(".cart_page");
    main.innerHTML = "";
    if (localStorage.getItem("cart")) {
      let table = document.createElement("table");
      table.className = "table table-striped w-50 m-auto";
      table.innerHTML = `
			<thead>
				<tr>
					<th>Photo</th>
					<th>Nom</th>
					<th>Prix / U</th>
					<th>Quantité</th>
					<th>Prix Total</th>
				</tr>
			</thead>
		`;
      let body = document.createElement("tbody");
      let cart = JSON.parse(localStorage.getItem("cart"));
      let totalPrice = 0;

      cart.forEach((product) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
				<td class="w-50"><img class="mr-0 card-img-top w-50" src="${
          product.imageUrl
        }"></td>
				<td>${product.name}</td>
				<td>${product.price / 100}</td>
				<td>${
          product.quantity
        }<button class="btn-sm btn-primary btn-add">+</button><button class="btn-sm btn-danger btn-reduce">-</button></td>
				<td>${(product.price / 100) * product.quantity}</td>
			`;
        totalPrice += (product.price / 100) * product.quantity;
        let btnAdd = tr.querySelector(".btn-add");
        btnAdd.addEventListener("click", () => {
          Cart.addToCart(product, Cart.manageCart);
        });
        let btnReduce = tr.querySelector(".btn-reduce");
        btnReduce.addEventListener("click", () => {
          Cart.reduceQuantity(product, Cart.manageCart);
        });
        body.appendChild(tr);
      });

      let total = document.createElement("tr");
      total.innerHTML = `
				<td class="w-50"></td>
				<td></td>
				<td></td>
				<td></td>
				<td>${totalPrice} €</td>
			`;
      table.appendChild(body);
      table.appendChild(total);
      main.appendChild(table);
      Form.manageForm();
    } else {
      var noCart = document.createElement("h2");
      noCart.className = "text-center m-2";
      noCart.textContent = "Votre panier est vide.";
      main.appendChild(noCart);
    }
  }
}
