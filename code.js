let cartCount = 0;
var showingLogin = false;
var showingCart = false;
var userLogged = false;
let globalIndex = 0;

var loginDiv = document.getElementById("login");
var loginButton = document.getElementById("user");
var cartDiv = document.getElementById("shoppingCart");
var cartButton = document.getElementById("cart");


window.addEventListener('mouseup',function(event){
    if(event.target != loginDiv && !loginDiv.contains(event.target) && !user.contains(event.target)){
        showingLogin = false;
        loginDiv.style.display = 'none';
    }
});

window.addEventListener('mouseup',function(event){
    if(event.target != cartDiv && !cartDiv.contains(event.target) && !cart.contains(event.target)){
        showingCart = false;
        cartDiv.style.display = 'none';
    }
});

const weapons = [
    {
        name: "STICK",
        image: "media/weapons/stick.png",
        description: "ATK +2",
        price: 150
    },
    {
        name: "TOY KNIFE",
        image: "media/weapons/toyknife.png",
        description: "ATK +4",
        price: 300
    },
    {
        name: "BURNT PAN",
        image: "media/weapons/burntpan.png",
        description: "ATK +7",
        price: 700
    },
    {
        name: "EMPTY GUN",
        image: "media/weapons/emptygun.png",
        description: "ATK +8",
        price: 1000
    },
    {
        name: "REAL KNIFE",
        image: "media/weapons/realknife.png",
        description: "ATK +10",
        price: 1500
    }
];

const items = [
    {
        name: "ANNOYING DOG",
        image: "media/items/annoyingdog.png",
        description: "Just annoying",
        price: 9999
    },
    {
        name: "CINNABUN",
        image: "media/items/cinnabun.png",
        description: "HP +20",
        price: 300
    },
    {
        name: "HOT CAT",
        image: "media/items/hotcat.png",
        description: "HP +40",
        price: 900
    },
    {
        name: "MNSTR.CANDY",
        image: "media/items/monstercandy.png",
        description: "Luck +1",
        price: 10
    },
    {
        name: "PIE",
        image: "media/items/pie.png",
        description: "Full heal",
        price: 1200
    }
];

window.onload = start();

function start(){
    cartCount = parseInt(localStorage.getItem("cartCount"));
    userLogged = localStorage.getItem("userLogged");
    if (!userLogged){
        document.getElementById("loggedStore").classList.add('blur');
        cartCount = 0;
        localStorage.setItem("cartCount", cartCount);
        localStorage.removeItem("cartItems");
    }
    else{
        userID = localStorage.getItem("userID");
        document.getElementById("loggedStore").classList.remove('blur');
        document.getElementById("notLoggedStore").style.display = "none";
        document.getElementById("loginInput").style.display = "none";
        document.getElementById("loginOutput").style.display = "block";
        document.getElementById("loginOutput").insertAdjacentHTML("afterbegin", "<p>Currently logged in as: " + userID + "</p>");      
        document.getElementById("cartCount").innerHTML = parseInt(localStorage.getItem("cartCount"));
        document.getElementById("showCartCount").innerHTML = parseInt(localStorage.getItem("cartCount"));
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.forEach((item) => {
            let name = item.name;
            let price = item.price;
            document.getElementById("cartList").insertAdjacentHTML("beforeend", `<div id='cartItem'><p>${name}</p><p>${price}</p></div>`);
        });
    }    
    listProducts(weapons, "weaponCatalog");
    listProducts(items, "itemCatalog");
}

function acceptCookies(){
    document.getElementById("cookies").style.display = "none";
    document.getElementById("blurredContent").classList.remove('blur');
    var bgMusic = document.getElementById('bgShop');
    bgMusic.volume = 0.1;
    bgMusic.play();
}

function selectSound(){
    var sfxSelect = new Audio('media/audio/select.wav');
    sfxSelect.volume = 0.3;
    sfxSelect.play();
}

function toggleMute() {   
    selectSound();
    var bgMusic = document.getElementById('bgShop'); 
    bgMusic.muted = !bgMusic.muted;
    if(bgMusic.muted){
        document.getElementById("mute").innerHTML = "<img src='media/muteicon.png'>";
    }
    else{
        document.getElementById("mute").innerHTML = "<img src='media/soundicon.png'>";
    }
}

function showCart(){
    selectSound();
    showingCart = !showingCart;
    if(showingCart){
        document.getElementById("shoppingCart").style.display = "block";
        showingLogin = false;
        document.getElementById("login").style.display = "none";
    }
    else{
        document.getElementById("shoppingCart").style.display = "none";
    }
}

function addToCart(index){  
    document.getElementById("shoppingCart").style.display = "block";
    showingLogin = false;
    document.getElementById("login").style.display = "none";
    showingCart = true;
    if(cartCount>=10){        
        document.getElementById("purchaseOut").innerHTML = "<h3 style='color: red;'>Max items per purchase is 10</h3>";
        var emptySound = new Audio('media/audio/error.wav');    
        emptySound.volume = 0.3;
        emptySound.play();
        setTimeout(function(){
            document.getElementById("purchaseOut").innerHTML = "";
        }, 2000);
    } 
    else{
        switch (parseInt(index)) {
            case 0:
                document.getElementById("cartList").insertAdjacentHTML("beforeend", "<div id='cartItem'><p>STICK</p><p>150G</p></div>");
                break;
            case 1:
                document.getElementById("cartList").insertAdjacentHTML("beforeend", "<div id='cartItem'><p>TOY KNIFE</p><p>300G</p></div>");
                break;
            case 2:
                document.getElementById("cartList").insertAdjacentHTML("beforeend", "<div id='cartItem'><p>BURNT PAN</p><p>700G</p></div>");
                break;
            case 3:
                document.getElementById("cartList").insertAdjacentHTML("beforeend", "<div id='cartItem'><p>EMPTY GUN</p><p>1000G</p></div>");
                break;
            case 4:
                document.getElementById("cartList").insertAdjacentHTML("beforeend", "<div id='cartItem'><p>REAL KNIFE</p><p>1500G</p></div>");
                break;
            case 5:
                document.getElementById("cartList").insertAdjacentHTML("beforeend", "<div id='cartItem'><p>ANNOYING DOG</p><p>9999G</p></div>");
                break;
            case 6:
                document.getElementById("cartList").insertAdjacentHTML("beforeend", "<div id='cartItem'><p>CINNABUN</p><p>300G</p></div>");
                break;
            case 7:
                document.getElementById("cartList").insertAdjacentHTML("beforeend", "<div id='cartItem'><p>HOT CAT</p><p>900G</p></div>");
                break;
            case 8:
                document.getElementById("cartList").insertAdjacentHTML("beforeend", "<div id='cartItem'><p>MNSTR.CANDY</p><p>10G</p></div>");
                break;
            case 9:
                document.getElementById("cartList").insertAdjacentHTML("beforeend", "<div id='cartItem'><p>PIE</p><p>1200G</p></div>");
                break;
        }
        addCartCount();
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let item;
        switch (parseInt(index)) {
            case 0:
                item = { name: 'STICK', price: '150G' };
                break;
            case 1:
                item = { name: 'TOY KNIFE', price: '300G' };
                break;
            case 2:
                item = { name: 'BURNT PAN', price: '700G' };
                break;
            case 3:
                item = { name: 'EMPTY GUN', price: '1000G' };
                break;
            case 4:
                item = { name: 'REAL KNIFE', price: '1500G' };
                break;
            case 5:
                item = { name: 'ANNOYING DOG', price: '9999G' };
                break;
            case 6:
                item = { name: 'CINNABUN', price: '300G' };
                break;
            case 7:
                item = { name: 'HOT CAT', price: '900G' };
                break;
            case 8:
                item = { name: 'MNSTR.CANDY', price: '10G' };
                break;
            case 9:
                item = { name: 'PIE', price: '1200G' };
                break;
        }
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem("cartCount", cartCount);
    }   
}

function listProducts(productArray, divName){
    productArray.forEach((product, index) => {
        let insert = `<div class="product">
                        <img src="${product.image}">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p class="price">${product.price}G</p>
                        <button class="addButton" data-index="${globalIndex}">Add to cart</button>
                    </div>`;
        document.getElementById(divName).insertAdjacentHTML("beforeend", insert);
        const addToCartButton = document.querySelectorAll(".addButton")[globalIndex];
        addToCartButton.addEventListener('click', function(){
            const dataIndex = addToCartButton.getAttribute('data-index');
            addToCart(dataIndex);
            console.log(dataIndex);
        });
        globalIndex++;
    });
}

function addCartCount(){
    document.getElementById("cartCount").style.display = "block";
    cartCount = parseInt(document.getElementById("cartCount").innerHTML); 
    cartCount++;
    var purchaseSound = new Audio('media/audio/purchase.wav');
    purchaseSound.volume = 0.2;
    purchaseSound.play();
    document.getElementById("cartCount").innerHTML = cartCount;
    document.getElementById("showCartCount").innerHTML = cartCount;
}

function emptyCart(){
    var emptySound = new Audio('media/audio/delete.wav');    
    emptySound.volume = 0.3;
    emptySound.play();
    cartCount = 0;
    localStorage.removeItem('cartItems');
    localStorage.setItem('cartCount', cartCount);
    document.getElementById("cartList").innerHTML = "";
    document.getElementById("cartCount").innerHTML = 0;
    document.getElementById("showCartCount").innerHTML = 0;
}

function purchaseComplete(){
    if(cartCount==0){
        var emptySound = new Audio('media/audio/empty.wav');    
        emptySound.volume = 0.3;
        emptySound.play();
        document.getElementById("purchaseOut").innerHTML = "<h3 style='color: red;'>It's empty?</h3>";
    }
    else{
        var emptySound = new Audio('media/audio/purchaseComplete.wav');    
        emptySound.volume = 0.3;
        emptySound.play();
        document.getElementById("purchaseOut").innerHTML = "<h3 style='color: #FEF200;'>Thank you for your purchase!</h3>";
        cartCount = 0;
        document.getElementById("cartList").innerHTML = "";
        document.getElementById("cartCount").innerHTML = 0;
        document.getElementById("showCartCount").innerHTML = 0;
        localStorage.setItem("cartCount", cartCount);
        localStorage.removeItem("cartItems");
    }
    setTimeout(function(){
        document.getElementById("purchaseOut").innerHTML = "";
    }, 2000);
    
}

function login(){
    var userID = document.getElementById("userID").value;
    var password = document.getElementById("pass").value;
    document.getElementById("userID").value = "";
    document.getElementById("pass").value = "";
    if(userID == "venom" && password == "venom"){
        var loginSound = new Audio('media/audio/save.wav');    
        loginSound.volume = 0.3;
        loginSound.play();
        document.getElementById("failedLogin").innerHTML = "";
        userLogged = true;
        localStorage.setItem("userLogged", userLogged);
        localStorage.setItem("userID", userID);
        cartCount = parseInt(localStorage.getItem("cartCount"));
        document.getElementById("cartCount").innerHTML = parseInt(localStorage.getItem("cartCount"));
        document.getElementById("showCartCount").innerHTML = parseInt(localStorage.getItem("cartCount"));
        document.getElementById("loggedStore").classList.remove('blur');
        document.getElementById("notLoggedStore").style.display = "none";
        document.getElementById("loginInput").style.display = "none";
        document.getElementById("loginOutput").style.display = "block";
        document.getElementById("loginOutput").insertAdjacentHTML("afterbegin", "<p style='color: green'>* Login successful!</p><p>Currently logged in as: " + userID + "</p>");
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.forEach((item) => {
            let name = item.name;
            let price = item.price;
            document.getElementById("cartList").insertAdjacentHTML("beforeend", `<div id='cartItem'><p>${name}</p><p>${price}</p></div>`);
        });
    }
    else{
        var errorSound = new Audio('media/audio/error.wav');    
        errorSound.volume = 0.3;
        errorSound.play();
        document.getElementById("failedLogin").innerHTML = "<p style='color: red; padding-top: 5px;'>* Wrong credentials! Surely it's not venom...";
    }
}

function fillUser(){
    var fillSound = new Audio('media/audio/fill.wav');    
    fillSound.volume = 0.3;
    fillSound.play();
    document.getElementById("userID").value = "venom";
    document.getElementById("pass").value = "venom";
}

function logout(){   
    document.getElementById("loginOutput").innerHTML = "<button onclick='logout()'>Logout</button>";
    userLogged = false;
    var emptySound = new Audio('media/audio/delete.wav');    
    emptySound.volume = 0.3;
    emptySound.play();
    cartCount = 0;
    document.getElementById("cartList").innerHTML = "";
    document.getElementById("cartCount").innerHTML = 0;
    document.getElementById("showCartCount").innerHTML = 0;
    localStorage.removeItem("userID");
    localStorage.removeItem("userLogged");
    document.getElementById("loggedStore").classList.add('blur');
    document.getElementById("notLoggedStore").style.display = "block";
    document.getElementById("loginOutput").style.display = "none";
    document.getElementById("loginInput").style.display = "block";
}

function showLogin(){
    selectSound();    
    showingLogin = !showingLogin;
    if(showingLogin){
        document.getElementById("login").style.display = "block";
        showingCart = false;
        document.getElementById("shoppingCart").style.display = "none";
    }
    else{
        document.getElementById("login").style.display = "none";
    }
}