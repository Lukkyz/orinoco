class Form {
  static reg = {
    firstName: /^[A-Za-zéèëäâï]{2,}$/,
    lastName: /^[A-Za-zéèëäâï]{2,}$/,
    address: /[0-9]{1,3}\s[\w\s]{1,}\s[A-Za-zéèêëâä]/,
    city: /^[A-Za-zéèëäâï]{2,}$/,
    email: /^\w{3,}@\w{3,}\.\w{2,3}$/,
  };

  static valid = {
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    email: false,
  };

  static value = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
  };

  static allValid() {
    return Object.values(Form.valid).reduce((total, currentValue) => {
      return total && currentValue;
    });
  }

  static isValid(element) {
    element.addEventListener("input", (e) => {
      Form.value[element.name] = element.value;
      if (Form.reg[element.name].test(e.target.value)) {
        element.classList = "form-control border border-success";
        Form.valid[element.name] = true;
      } else {
        element.className = "form-control border border-danger";
        Form.valid[element.name] = false;
      }
      let submit = document.querySelector(".order_send");
      Form.allValid() ? (submit.disabled = false) : (submit.disabled = true);
    });
  }
  static manageForm() {
    if (localStorage.getItem("cart")) {
      let form = document.createElement("form");
      form.className = "order_form w-50 m-auto";
      form.innerHTML = `
			  <div class="form-group">
				<label for="formGroupExampleInput">Prénom</label>
				<input name="firstName" type="text" class="form-control" id="formGroupExampleInput" placeholder="Jean">
			  </div>
			  <div class="form-group">
				<label for="formGroupExampleInput2">Nom</label>
				<input name="lastName" type="text" class="form-control" id="formGroupExampleInput2" placeholder="Dupont">
			  </div>
			  <div class="form-group">
				<label for="formGroupExampleInput2">Adresse</label>
				<input name="address" type="text" class="form-control" id="formGroupExampleInput2" placeholder="1 rue ...">
			  </div>
			<div class="form-group">
				<label for="formGroupExampleInput2">Ville</label>
				<input name="city" type="text" class="form-control" id="formGroupExampleInput2" placeholder="Paris">
			  </div>
			<div class="form-group">
				<label for="formGroupExampleInput2">E-email</label>
				<input name="email" type="text" class="form-control" id="formGroupExampleInput2" placeholder="jean@dupont.com">
			  </div>
			<button type="button" disabled="${Form.allValid()}" class="order_send btn btn-primary">Envoyez</button>
			`;
      let firstName = form.querySelector("input[name='firstName']");
      let lastName = form.querySelector("input[name='lastName']");
      let address = form.querySelector("input[name='address']");
      let city = form.querySelector("input[name='city']");
      let email = form.querySelector("input[name='email']");
      let btn = form.querySelector(".order_send");
      btn.addEventListener("click", () => {
        if (Form.allValid()) {
          let cart = JSON.parse(localStorage.getItem("cart"));
          let productsId = [];
          cart.forEach((elem) => {
            for (let i = 0; i < elem.quantity; i++) {
              productsId.push(elem._id);
            }
          });
          let data = {
            contact: Form.value,
            products: productsId,
          };
          Back.sendOrder(data).then((res) => {
            let order = JSON.stringify(res);
            localStorage.setItem("confirmation_order", order);
            localStorage.removeItem("cart");
            window.location.href = "confirmation.html";
          });
        }
      });
      Form.isValid(firstName);
      Form.isValid(lastName);
      Form.isValid(address);
      Form.isValid(city);
      Form.isValid(email);
      let main = document.querySelector("main");
      main.appendChild(form);
    }
  }
}
