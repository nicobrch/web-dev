fetch("http://localhost:3000/api/auth/me", { method: "GET" })
.then((res) => res.json())
.then((user) => {
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("user-wallet").textContent = `$${user.wallet.toLocaleString()}`
})
.catch(error => {
    console.error('Error:', error);
});

fetch("http://localhost:3000/api/products", { method: "GET" })
.then((res) => res.json())
.then((products) => {
    const productListElement = document.getElementById("product-list");
    let productList = "";
    products.forEach(product => {
        productList += `
            <div class="card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title"> ${product.name}</h5>
                    <p class="card-text"><strong>Precio:</strong> ${product.price.toLocaleString()} </p>
                    <p class="card-text"><strong>Stock:</strong> ${product.stock} unidades</p>
                    <button class="btn btn-primary w-100">Agregar al Carrito</button>
                </div>
            </div>
        `;
    });
    productListElement.innerHTML = productList;
})
.catch(error => {
    console.error('Error:', error);
});