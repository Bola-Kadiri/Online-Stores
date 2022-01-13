const cardEl = document.querySelector('.row');
const cartPageEl = document.querySelector('.sub-value');
const cartSubTotalEl = document.querySelector('.sub-total');
const cartCountEl = document.querySelector('.nav-link-2 span');
const menuEl = document.querySelector('.menu-link');
const navLinkEl = document.querySelector('.nav-link-1 img');
const cartPortion = document.querySelector('.nav-link-2 span');
const toggleCart = document.querySelector('.cart-page');
console.log(cartPortion);


navLinkEl.addEventListener('click', ()=>{
    menuEl.classList.toggle('menu-link-show');
});

cartPortion.addEventListener('click', ()=>{
        
    toggleCart.classList.toggle("cart-page-show")
       });

       function renderEl(){
        products.forEach((product)=>{
            cardEl.innerHTML +=`
            <div class='card'>
            <img src="${product.img}" alt="${product.name}" class='imgs'>
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <a href="#" class='btn' onClick="addToCart(${product.id})">Add To Cart</a>
        </div>
         `
        })
    }
    
    renderEl();

    let cart =JSON.parse(localStorage.getItem("CART",)) || [];
 updateCart();

 function addToCart(id){
    if(cart.some((item) => item.id ===id)){
        changeNumberOfUnit('plus', id)
    }else{
        const item = products.find((product) => product.id ===id);
   cart.push({
       ...item,
       numberOfUnits : 1,
   });
     }
     updateCart();
  }


 // render cart 
  function updateCart(){
      renderCartItem();
      renderSubTotal();
      localStorage.setItem("CART", JSON.stringify(cart));
  }

  function renderSubTotal(){
      let totalPrice=0;
      let totalItems=0;
          cart.forEach((item)=>{
          totalPrice += item.price *item.numberOfUnits;
          totalItems += item.numberOfUnits

      });
      cartSubTotalEl.innerHTML =  `Sub-Total: \u20A6${totalPrice}`
      cartCountEl.innerHTML=totalItems
  }

  function renderCartItem(){
    cartPageEl.innerHTML = "";
    cart.forEach((item)=>{
        cartPageEl.innerHTML +=`
        <div class="value">
                   
                      <img src="${item.img}" alt="${item.name}" onClick="removeCartItem(${item.id})">
            
                      <p>\u20A6${item.price}</p>
                    
                    <div class="btn2">
                        <button class='btn-minus' onClick="changeNumberOfUnit('minus', ${item.id})">-</button>
                        <span>${item.numberOfUnits}</span>
                        <button class='btn-plus' onClick="changeNumberOfUnit('plus', ${item.id})">+</button>
                    </div>
        </div>
     `
    })
}

function removeCartItem(id){
    cart= cart.filter(item=>item.id !==id);
    updateCart();
}



function changeNumberOfUnit(action, id){
    cart = cart.map((item)=>{

        let numberOfUnits = item.numberOfUnits;
        if(item.id===id){
         if(action==='minus' && numberOfUnits>0){
             numberOfUnits--;
         }else if(action==='plus' && numberOfUnits< item.inCart){
             numberOfUnits++;
         }
        }
        return {
            ...item,
            numberOfUnits,
        }
    });
    updateCart();
}


