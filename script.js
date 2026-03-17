const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if(bar){
bar.addEventListener('click',()=>{
nav.classList.add('active');
})
}

if(close){
close.addEventListener('click',()=>{
nav.classList.remove('active');
})
}



let cart = JSON.parse(localStorage.getItem("cart")) || [];


function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart))
}



function addToCart(id,name,price,image){

let item = cart.find(p=>p.id===id)

if(item){
item.quantity++
}else{

cart.push({
id:id,
name:name,
price:price,
image:image,
quantity:1
})

}

saveCart()

alert("Added to cart")

}



function removeFromCart(id){

cart = cart.filter(p=>p.id!==id)

saveCart()

loadCart()

}



function updateQuantity(id,value){

let item = cart.find(p=>p.id===id)

item.quantity = parseInt(value)

saveCart()

loadCart()

}



function calculateTotal(){

let subtotal=0

cart.forEach(item=>{
subtotal += item.price * item.quantity
})

let discount=0

if(subtotal>10000){
discount=subtotal*0.05
}

let total=subtotal-discount

return{
subtotal,
discount,
total
}

}



function loadCart(){

const container=document.getElementById("cart-items")

if(!container) return

container.innerHTML=""

cart.forEach(item=>{

container.innerHTML +=

`<tr>

<td>
<button onclick="removeFromCart('${item.id}')">X</button>
</td>

<td>
<img src="${item.image}" width="60">
</td>

<td>${item.name}</td>

<td>$${item.price}</td>

<td>
<input type="number"
value="${item.quantity}"
min="1"
onchange="updateQuantity('${item.id}',this.value)">
</td>

<td>$${item.price * item.quantity}</td>

</tr>`

})


let totals = calculateTotal()

document.getElementById("subtotal").innerText="$"+totals.subtotal
document.getElementById("discount").innerText="$"+totals.discount
document.getElementById("total").innerText="$"+totals.total

}


document.addEventListener("DOMContentLoaded",loadCart)