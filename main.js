/* functionality for shopping cart and product images */

/* init cinammon roll */
class Roll {
    constructor(name, price, glaze, amount) {
        this.name = name;
        this.price = price;
        this.glaze = glaze;
        this.amount = amount;
    }
}

/* shopping cart variables */
var glaze = "";
var quant = 0;

/* update glazing selections */
var noGlazing = document.getElementById("none")
var sugar = document.getElementById("sugar-milk");
var vanilla = document.getElementById("vanilla-milk");
var chocolate = document.getElementById("double-chocolate");

/* variable for updating main product img */
var ogmainImg = "assets/walnutproduct.png";

/* functions for every glazing selection */
function selectNone() {
    var notSelected = [vanilla, sugar, chocolate];
    noGlazing.style.border = "2px #D1A4FF solid";
    noGlazing.style.color = "#D1A4FF";
    for (var i = 0; i < notSelected.length; i++) {
        notSelected[i].style.border = "2px #000000 solid";
        notSelected[i].style.color = "#000000";
    }
    document.getElementById("mainImg").src=ogmainImg;
}

function selectVanilla() {
    var notSelected = [noGlazing, sugar, chocolate];
    vanilla.style.border = "2px #D1A4FF solid";
    vanilla.style.color = "#D1A4FF";
    for (var i = 0; i < notSelected.length; i++) {
        notSelected[i].style.border = "2px #000000 solid";
        notSelected[i].style.color = "#000000";
    }
    document.getElementById("mainImg").src="assets/walnutproduct_vanilla.jpg"
}

function selectSugar() {
    var notSelected = [vanilla, noGlazing, chocolate];
    sugar.style.border = "2px #D1A4FF solid";
    sugar.style.color = "#D1A4FF";
    for (var i = 0; i < notSelected.length; i++) {
        notSelected[i].style.border = "2px #000000 solid";
        notSelected[i].style.color = "#000000";
    }
    document.getElementById("mainImg").src="assets/walnutproduct_sugar.jpg"
}

function selectChocolate() {
    var notSelected = [vanilla, sugar, noGlazing];
    chocolate.style.border = "2px #D1A4FF solid";
    chocolate.style.color = "#D1A4FF";
    for (var i = 0; i < notSelected.length; i++) {
        notSelected[i].style.border = "2px #000000 solid";
        notSelected[i].style.color = "#000000";
    }
    document.getElementById("mainImg").src="assets/walnutproduct_chocolate.jpg"
}
if (noGlazing) {
    noGlazing.addEventListener('click', selectNone);
    document.getElementById('none').onclick = function() {glaze = 'No Glaze'};
}
if (vanilla) {
    vanilla.addEventListener('click', selectVanilla);
    document.getElementById('sugar-milk').onclick = function() {glaze = "Sugar Glaze"};
}
if (sugar) {
    sugar.addEventListener('click', selectSugar);
    document.getElementById('vanilla-milk').onclick = function() {glaze = "Vanilla Glaze"};
}
if (chocolate) {
    chocolate.addEventListener('click', selectChocolate);
    document.getElementById('double-chocolate').onclick = function() {glaze = "Chocolate Glaze"};
}

/* update amount selections */
var one = document.getElementById("one")
var three = document.getElementById("three");
var six = document.getElementById("six");
var twelve = document.getElementById("twelve");

/* functions for every amount selection */
function selectOne() {
    var notSelected = [three, six, twelve];
    one.style.border = "2px #D1A4FF solid";
    one.style.color = "#D1A4FF";
    for (var i = 0; i < notSelected.length; i++) {
        notSelected[i].style.border = "2px #000000 solid";
        notSelected[i].style.color = "#000000";
    }
}

function selectThree() {
    var notSelected = [one, six, twelve];
    three.style.border = "2px #D1A4FF solid";
    three.style.color = "#D1A4FF";
    for (var i = 0; i < notSelected.length; i++) {
        notSelected[i].style.border = "2px #000000 solid";
        notSelected[i].style.color = "#000000";
    }
}

function selectSix() {
    var notSelected = [one, three, twelve];
    six.style.border = "2px #D1A4FF solid";
    six.style.color = "#D1A4FF";
    for (var i = 0; i < notSelected.length; i++) {
        notSelected[i].style.border = "2px #000000 solid";
        notSelected[i].style.color = "#000000";
    }
}

function selectTwelve() {
    var notSelected = [one, three, six];
    twelve.style.border = "2px #D1A4FF solid";
    twelve.style.color = "#D1A4FF";
    for (var i = 0; i < notSelected.length; i++) {
        notSelected[i].style.border = "2px #000000 solid";
        notSelected[i].style.color = "#000000";
    }
}

/* add quantities to cart storage */
if (one) {
    one.addEventListener('click', selectOne);
    document.getElementById("one").onclick = function() {quant = 1}
}
if (three) {
    three.addEventListener('click', selectThree);
    document.getElementById("three").onclick = function() {quant = 3}
}
if (six) {
    six.addEventListener('click', selectSix);
    document.getElementById("six").onclick = function() {quant = 6}
}
if (twelve) {
    twelve.addEventListener('click', selectTwelve);
    document.getElementById("twelve").onclick = function() {quant = 12}
}

/* cart storage */
var cart = [];
if (sessionStorage.getItem("cart") == null) {
    sessionStorage.setItem("cart", JSON.stringify(cart));
}

function initializeItem(glaze, quant) {
    var name = document.getElementsByClassName("product-name")[0].innerHTML;
    var price = parseInt(document.getElementsByClassName("product-price")[0].innerHTML.slice(1));
    var prod = new Roll(name, price, glaze, quant);
    return prod
}
/* checking items to add to cart */
function checkItemInCart(cart, item) {
    if (cart.length == 0) {

        return "add";
    } else {
        var l = cart.length;
        for (var i = 0; i < cart.length; i++) {
            if ((item.name == cart[i].name && item.glaze == cart[i].glaze) == true) {
                return i;
            }
        }
        return "add";
    }
    return "add";
}

function totalPrice() {
    var crt = JSON.parse(sessionStorage.getItem("cart"));
    var subtotal = 0;
    var grandTotal = 0;
    var shipping = document.getElementById("shipping").innerText;
    for (var i=0; i<crt.length; i++) {
        subtotal = subtotal + crt[i].price * crt[i].amount
        grandTotal = Number(subtotal) + Number(shipping)
    }
    document.getElementById("subtotal").innerText = subtotal + ".00"
    document.getElementById("grand-total").innerText = grandTotal
}

/* add to cart function */
function addToCart(cart, glaze, quant) {
    var crt = JSON.parse(sessionStorage.getItem("cart"));
    var item = initializeItem(glaze, quant);
    var check = checkItemInCart(crt, item);
    if (check == "add") {
        crt.push(item);
        document.getElementById("cart-count").innerText = crt.length;
      
    } else {
        var i = checkItemInCart(crt, item);
        var name1 = crt[i].name;
        var price1 = crt[i].price;
        var glaze1 = crt[i].glaze;
        var am1 = crt[i].amount;
        am1 = am1 + item.amount;
        var r = new Roll(name1, price1, glaze1, am1);
        crt.splice(i, 1, r);
    };
    sessionStorage.removeItem("cart");
    sessionStorage.setItem("cart", JSON.stringify(crt));
}

/* confirmation upon adding item to cart */
function confirm() {
    var text = document.getElementById("notification");
    if (text.style.display === "none") text.style.display = "block";
}

/* removing items from cart */
function removeFromCart(name, glaze) {
    var crt = JSON.parse(sessionStorage.getItem("cart"));
    var y;
    /* matches name and glaze and removes entire item */
    for (var z=0; z < crt.length; z++) {
        y = crt[z];
        if (y.name == name && y.glaze == glaze) {
            crt.splice(z, 1);
            break;
        }
    }
    /* removes item from storage and reloads page to show update */
    sessionStorage.removeItem("cart");
    sessionStorage.setItem("cart", JSON.stringify(crt));
    location.reload();
}

var ct = document.getElementById("submit");
if (ct) document.getElementById("submit").onclick = function() {addToCart(cart, glaze, quant);confirm()};


/* init new cart */
var emptyCart = document.getElementById("empty-cart");
var newCart = JSON.parse(sessionStorage.getItem("cart"));

if (emptyCart) {
    if (newCart.length != 0) {
        document.getElementById('empty-cart').innerHTML = "";       
    }
}

/* view cart items */
var viewCart = document.getElementById("view-cart");
if (viewCart) {
    if (x != 0) {
        for (var x = 0; x < newCart.length; x++) {
            if (newCart[x].amount != 0) {
                var row = viewCart.insertRow(-1);

                var prodCell = row.insertCell(0);
                var quanCell = row.insertCell(1);
                var pricCell = row.insertCell(2);
                var remCell = row.insertCell(3);

                /* remove button functionality */
                var inputElement = document.createElement('BUTTON');
                inputElement.innerHTML = "Remove";
                inputElement.addEventListener('click', function(){
                    var unformat = this.parentNode.parentNode.firstChild.getElementsByTagName("p")[0].innerHTML;
                    var form = unformat.split(", ");
                    removeFromCart(form[0], form[1]);
                });
                remCell.appendChild(inputElement);
                
                /* item information */
                prodCell.innerHTML = '<img src="assets/walnutproduct_sugar.jpg">'+ "<p>"+newCart[x].name + ", " + newCart[x].glaze+"</p>"
                quanCell.innerHTML = newCart[x].amount.toString()
                pricCell.innerHTML = "$" + (newCart[x].amount * newCart[x].price).toString() + ".00"

               // document.getElementById("subtotal").innerText 
            }
        }
    }
}

//document.getElementById("subtotal").innerText = 
//var checkOut = document.getElementById("checkout")




/* recommended items carousel */
var span = document.getElementsByTagName("span");
var div = document.getElementsByTagName("rol");

/* left arrow */
var l = 0;
span[1].onclick = ()=>{
    l++;
    for(var i of div) {
        if (l==0) {i.syle.left="0px";}
        if (l==1) {i.syle.left="-740px";}
        if (l==2) {i.syle.left="-1480px";}
        if (l>2) {l=2;}
    }
}

/* right arrow */

/* number of items in cart consistent across pages */
function onLoad() {
    var crt = JSON.parse(sessionStorage.getItem("cart"));
    document.getElementById("cart-count").innerText = crt.length;
    totalPrice()
}