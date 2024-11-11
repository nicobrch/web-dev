fetch("http://localhost:3000/api/users/1")
    .then((response) => response.json())
    .then((user) => {
        // Update the elements using their IDs
        document.getElementById('userId').textContent = user[0].id;
        document.getElementById('userName').textContent = user[0].name;
        document.getElementById('userWallet').textContent = `$${user[0].wallet.toLocaleString()}`
    })
    .catch(error => {
        console.error('Error:', error);
    });