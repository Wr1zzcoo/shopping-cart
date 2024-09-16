let basket = JSON.parse(localStorage.getItem("data")) || [];

let label = document.getElementById('label');

let ShoppingCart = document.getElementById('shopping-cart');

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  };
  calculation();

  let GenerateCartItem = () => {
    if(basket.length !==0){

      return(ShoppingCart.innerHTML = basket 
        .map((x) => {
        let {id,item} = x;
        let search = shopItemsData.find((y) =>  y.id === id) || [] ;
      return`

    <div class=cart-item >

    <img width ="100" src =${search.img} alt="" />

    <div class="title-price-x">
      <h4 clas="title-pricce" >
      <p>${search.name}</p></h4>
      <h4>
      <p class="cart-item-price">$ ${search.price}</p>
      </h4>
      <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
    </div>  

    <div class="buttons">
      <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
      <div id=${id} class="quantity">${item}
      </div>
      <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
    </div>

    <h3>
    $ ${item * search.price}
    </h3>  

    </div>
      `;
        })
        .join(""));

    }else{

      ShoppingCart.innerHTML = ``; 
      label.innerHTML = `
      <h2>Card is Empty</h2>
      <a href="index.html">
      <button class="Home-Btn">
      Back to home
      </button>
      </a>  
      `
    }
  }

  GenerateCartItem();

  let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) {
      basket.push({
        id: selectedItem.id,
        item: 1,
      });
    } else {
      search.item += 1;
    }
    
    GenerateCartItem();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
  };

  let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined)return
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x)=>x.item !== 0);
    GenerateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));
  }; 

  let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation();
  };

  let removeItem = (id) => {
    let selectedItem = id
    // console.log(selectedItem.id); 
    basket = basket.filter((x) =>x.id !== selectedItem.id);
    GenerateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));
  }
