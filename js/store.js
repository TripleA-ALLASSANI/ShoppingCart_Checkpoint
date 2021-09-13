if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready(){
    //1 Suppresion + MAJ
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');    
    for (const button of removeCartItemButtons) {
        button.addEventListener('click', removeCartItem);
    }

    //1 Debut MAj le total lorsq on utilise le scroll pr incrmenter le nbre
    var quantityInput = document.getElementsByClassName('cart-quantity-input');
    for (const input of quantityInput) {
        input.addEventListener('change', quantityChanged);
    }

    //1 BEGINNING AddTocart buttons
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (const addToCartButton of addToCartButtons) {
        addToCartButton.addEventListener('click', addToCartButtonClicked);
    }

    //1 likedislike
    var likeDislikeButtons = document.getElementsByClassName('btnlike');
    for (const likeDislikeButton of likeDislikeButtons) {
        likeDislikeButton.addEventListener('click', changeLikeDislikeButtonColor);
    }
}

//2 Suppresion + MAJ
function removeCartItem(event){
    var buttonClicked = event.target;
    var parentGalThatContainsTheClickedButton =  buttonClicked.parentElement.parentElement;
    parentGalThatContainsTheClickedButton.remove();
    updateCartTotal();
}

//2  MAj le total... 
function quantityChanged(event){
    var input = event.target;
    console.log(input)
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
}

//2 AddTocart buttons
function addToCartButtonClicked(event){
    var addToCartButton = event.target;
    var shopitem = addToCartButton.parentElement.parentElement;
    var title = shopitem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopitem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopitem.getElementsByClassName('shop-item-image')[0].src;
    console.log(title , price , imageSrc);
    addItemToCart(title ,price ,imageSrc);
    updateCartTotal();
}

//2 likedislike
function changeLikeDislikeButtonColor(event){
    var likeDislikeButtons = event.target;
    var shopitem = likeDislikeButtons.parentElement.parentElement;
    var likeDislikeButton = shopitem.getElementsByClassName('fa-heart')[0];
    likeDislikeButton.setAttribute("style", "color:green"); 
    console.log(likeDislikeButton);
    
     
}


//3 AddTocart buttons(ajout ds le panier)
function addItemToCart(title ,price ,imageSrc){
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    // cartRow.innerText = title;
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (const cartItemName of cartItemNames) {
        if (cartItemName.innerText == title) {
            alert("This item is already added to the cart");
            return;
        }
    }
    var cartRowContent = `
    <div class="cart-item cart-column">
        <img alt="short1" class="cart-item-image" src="${imageSrc}" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;
    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);
   // alert(`${title} is successfully added to the cart`);
   cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem);
   cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged);
}

function updateCartTotal(){
    var elementContainingAllTheItemsThatAreInTheCart = document.getElementsByClassName('cart-items');
    var cartItemContainerFirstLine = elementContainingAllTheItemsThatAreInTheCart[0];
    var elementsOfcartItemContainerFirstLine = cartItemContainerFirstLine.getElementsByClassName('cart-row');
    var total = 0;
    for (const element of elementsOfcartItemContainerFirstLine) {
        var priceElement = element.getElementsByClassName('cart-price');
        var priceElementFirstline = priceElement[0];
        var quantityElement = element.getElementsByClassName('cart-quantity-input');
        var quantityElementFirstline = quantityElement[0];
        console.log(priceElementFirstline,quantityElementFirstline);
        var price = priceElementFirstline.innerText;
        var priceWithoutDollar = price.replace('$', '');
        var priceWithoutDollarToFloat = parseFloat(priceWithoutDollar);
        var quantity = quantityElementFirstline.value;
        total += (priceWithoutDollarToFloat * quantity);
        console.log(priceWithoutDollarToFloat * quantity);
        console.log(total);
    }
    total = Math.round(total*100) / 100;
    var totalPriceElementFirstline = document.getElementsByClassName('cart-total-price')[0];
    var totalPriceElementFirstlineText = totalPriceElementFirstline.innerText = '$'+total;
    console.log(totalPriceElementFirstlineText);
}