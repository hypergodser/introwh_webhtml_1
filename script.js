
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id, name, price) {
    cart.push({id: id, name: name, price: price});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('เพิ่ม ' + name + ' ลงในตะกร้าแล้วครับ ราคา ' + price + ' บาท');
}

function loadCart() {
    let cartBody = document.getElementById('cart-body');
    let cartTotal = document.getElementById('cart-total');
    if (!cartBody) return;

    let total = 0;
    cartBody.innerHTML = '';
    
    if (cart.length === 0) {
        cartBody.innerHTML = '<tr><td colspan="4">ยังไม่มีสินค้าในตะกร้าครับ</td></tr>';
        cartTotal.innerText = '0 บาท';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;
        cartBody.innerHTML += `<tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.price.toLocaleString()}</td>
            <td><button class="btn-danger" onclick="removeFromCart(${index})">ลบ</button></td>
        </tr>`;
    });
    
    cartTotal.innerText = total.toLocaleString() + ' บาท';
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function confirmOrder() {
    if (cart.length === 0) {
        alert('ตะกร้าว่างเปล่าครับ ไม่สามารถสั่งซื้อได้');
        return;
    }
    localStorage.setItem('order', JSON.stringify(cart));
    localStorage.removeItem('cart');
    window.location.href = 'confirm.html';
}

function loadOrder() {
    let orderBody = document.getElementById('order-body');
    let orderTotal = document.getElementById('order-total');
    let orderId = document.getElementById('order-id');
    if (!orderBody) return;

    let order = JSON.parse(localStorage.getItem('order')) || [];
    let total = 0;
    
    orderBody.innerHTML = '';
    
    if (order.length === 0) {
        orderBody.innerHTML = '<tr><td colspan="3">ไม่พบข้อมูลคำสั่งซื้อ</td></tr>';
        return;
    }

    order.forEach((item, index) => {
        total += item.price;
        orderBody.innerHTML += `<tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.price.toLocaleString()}</td>
        </tr>`;
    });
    
    orderTotal.innerText = total.toLocaleString() + ' บาท';
    let randomId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    orderId.innerText = randomId;
}

window.onload = function() {
    loadCart();
    loadOrder();
};
