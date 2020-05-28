let body = document.querySelector("body");
let spinner = document.querySelector(".spinner");

Back.getAllProducts().then((products) => {
  var productsNode = document.createElement("main");
  productsNode.className = "products container-fluid ";
  products.forEach((data) => {
    let product = new Product(data);
    productsNode.appendChild(product.createProductPreview());
  });
  body.removeChild(spinner);
  body.appendChild(productsNode);
});
