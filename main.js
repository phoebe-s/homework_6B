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
var ogmainImg = "images/walnutproduct.png";

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
    document.getElementById("mainImg").src="images/walnutproduct_vanilla.jpg"
}

function selectSugar() {
    var notSelected = [vanilla, noGlazing, chocolate];
    sugar.style.border = "2px #D1A4FF solid";
    sugar.style.color = "#D1A4FF";
    for (var i = 0; i < notSelected.length; i++) {
        notSelected[i].style.border = "2px #000000 solid";
        notSelected[i].style.color = "#000000";
    }
    document.getElementById("mainImg").src="images/walnutproduct_sugar.jpg"
}

function selectChocolate() {
    var notSelected = [vanilla, sugar, noGlazing];
    chocolate.style.border = "2px #D1A4FF solid";
    chocolate.style.color = "#D1A4FF";
    for (var i = 0; i < notSelected.length; i++) {
        notSelected[i].style.border = "2px #000000 solid";
        notSelected[i].style.color = "#000000";
    }
    document.getElementById("mainImg").src="images/walnutproduct_chocolate.jpg"
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

/* add to cart function */
function addToCart(cart, glaze, quant) {
    var crt = JSON.parse(sessionStorage.getItem("cart"))
    var item = initializeItem(glaze, quant);
    var check = checkItemInCart(crt, item);
    if (check == "add") {
        crt.push(item);
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

var ct = document.getElementById("submit");
if (ct) document.getElementById("submit").onclick = function() {addToCart(cart, glaze, quant);confirm()};


/* ---------------------------------------------------------------- */


/* CART PAGE */
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
    if (i != 0) {
        for (var i = 0; i < newCart.length; i++) {
            if (newCart[i].amount != 0) {
                var row = viewCart.insertRow(-1);

                var prodCell = row.insertCell(0);
                var quanCell = row.insertCell(1);
                var pricCell = row.insertCell(2);

                prodCell.innerHTML = '<img src="images/walnutproduct_sugar.jpg">'+ newCart[i].name + ", " + newCart[i].glaze
                quanCell.innerHTML = newCart[i].amount.toString()
                pricCell.innerHTML = "$" + (newCart[i].amount * newCart[i].price).toString() + ".00"
            }
        }
    }

}