var showingLogin = false;
var showingCart = false;
var userLogged = false;
var revealedItems = [];

var loginDiv = document.getElementById("login");
var loginButton = document.getElementById("user");
var cartDiv = document.getElementById("shoppingCart");
var cartButton = document.getElementById("cart");

var gameArray = [
    [{ name: "Coal", image: "media2/gifts/coal.png" }, { name: "Coal", image: "media2/gifts/coal.png" }, { name: "Coal", image: "media2/gifts/coal.png" }, { name: "Coal", image: "media2/gifts/coal.png" }],
    [{ name: "Annoying Dog", image: "media2/gifts/annoyingdog.png" }, { name: "Ball Shoes", image: "media2/gifts/ballshoes.png" }, { name: "Bisicle", image: "media2/gifts/bisicle.png" }, { name: "Burnt Pan", image: "media2/gifts/burntpan.png" }],
    [{ name: "Cinnabun", image: "media2/gifts/cinnabun.png" }, { name: "Empty Gun", image: "media2/gifts/emptygun.png" }, { name: "Hot Cat", image: "media2/gifts/hotcat.png" }, { name: "Insta Noodles", image: "media2/gifts/instanoodles.png" }],
    [{ name: "Monster Candy", image: "media2/gifts/monstercandy.png" }, { name: "Notebook", image: "media2/gifts/notebook.png" }, { name: "Pie", image: "media2/gifts/pie.png" }, { name: "Real Knife", image: "media2/gifts/realknife.png" }],
    [{ name: "Sea Tea", image: "media2/gifts/seatea.png" }, { name: "Spider Donut", image: "media2/gifts/spiderdonut.png" }, { name: "Stick", image: "media2/gifts/stick.png" }, { name: "Sword Sandwich", image: "media2/gifts/swordsandwich.png" }],
    [{ name: "Tablet Cookie", image: "media2/gifts/tabletcookie.png" }, { name: "Tem Flakes", image: "media2/gifts/temflakes.png" }, { name: "Toy Knife", image: "media2/gifts/toyknife.png" }, { name: "Tuff Glove", image: "media2/gifts/tuffglove.png" }]
];

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

window.onload = start();

function start(){
    userLogged = localStorage.getItem("userLogged");
    if (!userLogged){
        document.getElementById("loggedGame").classList.add('blur');
    }
    else{
        userID = localStorage.getItem("userID");
        playerID = userID;
        document.getElementById("playerName").innerHTML = playerID;
        document.getElementById("loggedGame").classList.remove('blur');
        document.getElementById("notLoggedGame").style.display = "none";
        document.getElementById("loginInput").style.display = "none";
        document.getElementById("loginOutput").style.display = "block";
        document.getElementById("loginOutput").insertAdjacentHTML("afterbegin", "<p>Currently logged in as: " + userID + "</p>");      
    }
    drawGrid();
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
        document.getElementById("loggedGame").classList.remove('blur');
        document.getElementById("notLoggedGame").style.display = "none";
        playerID = userID;
        document.getElementById("playerName").innerHTML = playerID;
        document.getElementById("loginInput").style.display = "none";
        document.getElementById("loginOutput").style.display = "block";
        document.getElementById("loginOutput").insertAdjacentHTML("afterbegin", "<p style='color: green'>* Login successful!</p><p>Currently logged in as: " + userID + "</p>");
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
    localStorage.removeItem("userID");
    localStorage.removeItem("userLogged");
    document.getElementById("loggedGame").classList.add('blur');
    document.getElementById("notLoggedGame").style.display = "block";
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

function guestName(){
    selectSound();
    document.getElementById("notLoggedGame").innerHTML = "<h2>What's your name?</h2><div id='failedGuest'></div><input type='text' id='guestID' name='guestID'><br><button onclick='guestLogin()'>Enter</button><p style='padding-top: 10px; margin: 0px'>Be warned, if you reload the page before finishing the game, you'll have to start over!</p>";
    document.getElementById("guestID").focus();
    document.getElementById("notLoggedGame").style.height = "320px";
}

function guestLogin(){
    let guestCheck = document.getElementById("guestID").value;
    if(guestCheck == ""){
        var errorSound = new Audio('media/audio/error.wav');    
        errorSound.volume = 0.3;
        errorSound.play();
        document.getElementById("failedGuest").innerHTML = "<p style='color: red;'>Can't use an empty name...";
    }
    else{
        var loginSound = new Audio('media/audio/save.wav');    
        loginSound.volume = 0.3;
        loginSound.play();
        var playerID = document.getElementById("guestID").value;
        document.getElementById("loggedGame").classList.remove('blur');
        document.getElementById("notLoggedGame").style.display = "none";
        document.getElementById("playerName").innerHTML = playerID;
    }
}

function arrayShuffle(array) {
    // random de filas
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    // random de posiciones dentro de fila
    for (var i = 0; i < array.length; i++) {
        for (var j = array[i].length - 1; j > 0; j--) {
            var k = Math.floor(Math.random() * (j + 1));
            [array[i][j], array[i][k]] = [array[i][k], array[i][j]];
        }
    }
    // random de filas entre si
    for (var i = 0; i < array[0].length; i++) {
        for (var j = array.length - 1; j > 0; j--) {
            var k = Math.floor(Math.random() * (j + 1));
            [array[j][i], array[k][i]] = [array[k][i], array[j][i]];
        }
    }
}

function drawGrid() {
    var shuffledArray = JSON.parse(JSON.stringify(gameArray));
    arrayShuffle(shuffledArray);
    var gridContainer = document.getElementById("gameGrid");
    gridContainer.innerHTML = "";
    let days = 1;
    var attempts = 5;
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 4; j++) {
            var cell = document.createElement("div");
            cell.className = "grid-item";
            cell.id = "cell-" + i + "-" + j;

            var paragraph = document.createElement("p");
            paragraph.textContent = days;
            document.getElementById("playerAttempts").innerHTML = attempts;

            function createClickHandler(content, cellId) {                
                return function() {      
                    attempts--;
                    document.getElementById("playerAttempts").innerHTML = attempts;
                    if (content.image === "media2/gifts/coal.png") {
                        var emptySound = new Audio('media/audio/delete.wav');    
                        emptySound.volume = 0.3;
                        emptySound.play();
                        document.getElementById("loggedGame").style.padding = "40px";
                        document.getElementById("loggedGame").innerHTML = "<div id='results'><h2>You found <span style='color: red'>coal</span>...</h2><img class='cellImage' src='media2/gifts/coal.png'><p>Now you lose all your gifts.</p><button onclick='restart()'>Play again</button></div>";
                    }
                    else if (attempts === 0) {
                        revealedItems.push(content);
                        var emptySound = new Audio('media/audio/purchaseComplete.wav');    
                        emptySound.volume = 0.3;
                        emptySound.play();
                        document.getElementById("loggedGame").style.padding = "40px";
                        document.getElementById("loggedGame").innerHTML = "<div id='results'><h2>You <span style='color: #FEF200'>won</span>!</h2><p>Congratulations, <span style='color: #FEF200'>" + document.getElementById("playerName").textContent + "</span>!</p><p>Here's everything you got:</p><ul id='revealedItemsList'></ul><button onclick='restart()'>Play again</button></div>";
                    } else {
                        revealedItems.push(content);
                        var fillSound = new Audio('media/audio/snd_heal_c.wav');    
                        fillSound.volume = 0.3;
                        fillSound.play();
                        document.getElementById(cellId).innerHTML = "<img class='cellImage' src=" + content.image + ">";
                        document.getElementById(cellId).classList.remove('grid-item');
                        document.getElementById(cellId).classList.add('grid-item-revealed');
                    }

                    var revealedItemsList = document.getElementById("revealedItemsList");
                    for (var i = 0; i < revealedItems.length; i++) {
                        var listItem = document.createElement("li");
                        var itemImage = document.createElement("img");
                        itemImage.className = "resultImage";
                        itemImage.src = revealedItems[i].image;
                        listItem.textContent = revealedItems[i].name;
                        listItem.appendChild(itemImage);
                        revealedItemsList.appendChild(listItem);
                    }
                };
            }
            cell.addEventListener('click', createClickHandler(shuffledArray[i][j], cell.id));
            cell.appendChild(paragraph);
            gridContainer.appendChild(cell);
            days++;
        }
    }
}

function restart(){
    window.location.reload();
}