/**
 * Take an array of object whichs contains multiple same product and return quantity
 * @param {array} ex: [ttem1, item1, item2, item2]
 * @return {array} ex: [item1 (item.quantity: 2), item2 (item.quantity: 2)]
 **/
function quantifyProducts(products) {
  products.forEach((product) => {
    product.quantity = 0;
  });
  let current = 0;
  for (let i = 0; i < products.length; i++) {
    if (products[i]._id == products[current]._id) {
      products[current].quantity += 1;
      if (current != i) {
        products.splice(i, 1);
        i -= 1;
      }
    } else {
      current = i;
      i -= 1;
    }
  }
  return products;
}

try {
  let order = JSON.parse(sessionStorage.getItem("confirmation_order"));
  let products = order.products;

  let table = document.createElement("table");
  table.className = "table table-striped w-50 mx-auto mt-3";
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

  let tbody = document.createElement("tbody");
  let totalPrice = 0;
  quantifyProducts(products).forEach((product) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
			<td class="w-50"><img class="mr-0 card-img-top w-50" src="${
        product.imageUrl
      }"></td>
			<td>${product.name}</td>
			<td>${product.price / 100}</td>
			<td>${product.quantity}	
			<td>${(product.price / 100) * product.quantity}</td>
		`;
    totalPrice += (product.price / 100) * product.quantity;
    tbody.appendChild(tr);
  });

  let total = document.createElement("tr");
  total.innerHTML = `
			<td class="w-50"></td>
			<td></td>
			<td></td>
			<td></td>	
			<td>${totalPrice} €</td>
`;
  tbody.appendChild(total);
  let main = document.querySelector(".confirmation_order");
  main.innerHTML = `
	<h3>Récapitulaif de votre commande</h3>
	<p>Numéro de commande : ${order.orderId}
	<div class="mb-3">
		<div>Prénom : ${order.contact.firstName}</div>
		<div>Nom : ${order.contact.lastName}</div>
		<div>Adresse : ${order.contact.address}</div>
		<div>Ville : ${order.contact.city}</div>
		<div>Email : ${order.contact.email}</div>
	</div>
	<h4>Vos achats : </h4>
`;
  main.className = "text-center";
  table.appendChild(tbody);
  main.appendChild(table);
} catch {
  window.location.href = "index.html";
}
