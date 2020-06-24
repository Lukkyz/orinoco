let queryString = window.location.search;
let id = new URLSearchParams(queryString).get("id");

let body = document.querySelector("body");
let main = document.createElement("main");
let spinner = document.querySelector(".spinner");
main.className = "product";

API.getOneProduct(id)
  .then((data) => {
    let product = new Product(data);
    main.appendChild(product.createProduct());
    body.appendChild(main);
    body.removeChild(spinner);
  })
  .catch((e) => {
    var container = document.createElement("section");
    container.className = "error";
    var gif = document.createElement("img");
    var title = document.createElement("h2");
    title.textContent = "Erreur 404 : Le produit n'existe pas !";
    gif.src = "https://media.giphy.com/media/fV1yHo8YyoKjzvMCKr/giphy.gif";
    container.appendChild(title);
    container.appendChild(gif);
    body.removeChild(spinner);
    body.appendChild(container);
  });
