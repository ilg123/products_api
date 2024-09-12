document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('product-form');
    const errorDiv = document.getElementById('error-messages');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        errorDiv.innerHTML = ''; 

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
        };

        console.log("Sending data: ", data); 

        fetch('/api/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')  
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(({ status, body }) => {
            if (status === 201) {
                alert('Product added successfully!');
                form.reset();
                loadProducts();
            } else {
                displayErrors(body);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
    });

    function loadProducts() {
        fetch('/api/products/')
        .then(response => response.json())
        .then(data => {
            const productTable = document.getElementById('product-table');
            productTable.innerHTML = '<tr><th>Name</th><th>Description</th><th>Price</th></tr>';
            data.forEach(product => {
                const row = `<tr><td>${product.name}</td><td>${product.description}</td><td>${product.price}</td></tr>`;
                productTable.insertAdjacentHTML('beforeend', row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function displayErrors(errors) {
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                const messages = errors[key];
                messages.forEach(message => {
                    const errorItem = document.createElement('p');
                    errorItem.innerText = `${key}: ${message}`;
                    errorDiv.appendChild(errorItem);
                });
            }
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    loadProducts();
});
