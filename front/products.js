fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document.querySelector("tbody");
    let products = "";
    data.forEach((product) => {
      let newProduct = `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
        </tr>
        `;
      products += newProduct;
    });

    tableBody.innerHTML = products;
  });