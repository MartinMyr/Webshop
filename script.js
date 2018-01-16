$( document ).ready(function() {
    
    var huvudKat;
    
    fetch("huvudKategorier.json")
    .then(function(response)
    {
        return response.json();
    })
    .then(function(postsCollection)
    {
    huvudKat = postsCollection;
          
    fetch("underKategorier.json")
    .then(function(response)
        {
        return response.json();
    })
    .then(function(postsCollection1)
    {
        underKat = postsCollection1;
               
               
    fetch("produkter.json")
    .then(function(response)
        {
        return response.json();
    })
    .then(function(postsCollection2)
    {
        produkter = postsCollection2;


        fetch("kunder.json")
    .then(function(response)
    {
        return response.json();
    })
    .then(function(postsCollection3)
    {
        kundLista = postsCollection3;
     
 
        //Startup functions
        meny();
        var plusToCart = 0;
       //Functions
        function appendCard(){
            var appendCard = '<div class = "cards">';
                appendCard += '<div class = "cardPic"><img src = "' + produkter[j].prodImage + '"></div>';
                appendCard += '<div class = "cardName"><h1>' + produkter[j].prodName + '</h1></div>';
                appendCard += '<div class = "cardInfo"><p></p></div>';
                appendCard += '<div class = "cardBuy">';
                appendCard += '<h3>' + produkter[j].prodPrice + ' kr</h3><h3 class = "buy">';
                appendCard += '<a id="' + produkter[j].id + '" class = "buyProd" href = "#">Köp</a></h3></div><h3 id ="' + produkter[j].id + '" class  = "showMore">Visa mer';
                appendCard += '</h3></div>';
                
            $(".prodCardWrapper").append(appendCard);
        }



        

        //Kundvagnen
        $("#toCart").click(function() {
            cartRefresh();
           
            function cartRefresh(){
                $("#imgHolder").empty();
                $("#content").empty();
                $("#backgroundContact").css("background-image","none");
                
                //Användar login
                status();

                var userLogin = '<div id = "userLogin"> <i class="fa fa-user" aria-hidden="true"></i>';
                userLogin += '<input id = "username" type="text" name="username">';
                userLogin += '<i class="fa fa-key" aria-hidden="true"></i>';
                userLogin += '<input id = "password" type="password" name="psw">';
                userLogin += '<button id = "loginButton">Ok</button><button id = "logOutButton">Logga ut</button></div>';
                $("#content").append(userLogin);
                $("#content").append("<h1 id = 'cartH1'>Varukorgen</h1>");
                $("#content").append("<div class = 'prodCardWrapper'></div");
                $("#content").append("<span id = 'totPrice'><h3>55kr frakt Inkluderat Totalt:</h3></span><button id = 'member'>Bli medlem</button><button id = 'buyNow'>Slutför köp</button>");

                members = JSON.parse(localStorage.getItem("members"));
                
                for (i = 0; i < members.length; i++) {
                    var user = members[i].email;
                    var password = members[i].password;
                }
              
                $("#submit").click(function () {
                    if ($("#username").val() == user && $("#password").val() == password) {
                        sessionStorage.ourUser = user;
                        showMemberPage(); 
                    }
                });
        
                $("#logOutButton").click(function () {
                    sessionStorage.removeItem("ourUser");
                    showStartPage();
                    $("#content").empty();
                });
                function showMemberPage() {
                    $("#logOutButton").show();
                    $("#loginButton").hide();
                    alert("<h1>Välkommern"+user+"</h1>")
                };
                function showStartPage() {
                    $("#logOutButton").hide();
                    $("#loginButton").show();
                };
                
                $( "#loginButton" ).click(function() {
                    $("#loginButton").hide(1500);
                    $(".formInlogg").show(1500);
                });
            
                //Login funktion
        
                function status(){
                    if (sessionStorage.ourUser != null) {
                        showMemberPage();
                    } else {
                        showStartPage();
                    }
                };
                

                //Slutför köp och skicka till admin
                $("#buyNow").click(function() {
                   
                    var prodAdmin = [];
                    if(localStorage.getItem("admin") != null){
                        prodAdmin = JSON.parse(localStorage.getItem("admin"));
                    }
                    prodAdmin = sendToCart;
                   
                    localStorage.setItem("admin", JSON.stringify(prodAdmin));
                   
                    sessionStorage.clear();
                    cartRefresh();   
                    $("#content").append("<h2 id = 'emptyCart'>Tack för att du handlat hos oss, din order är nu skickad!!</h2>");
                    $("#emptyCart").hide();
                    plusToCart = 0;
                    $("#numbersInCart").empty()
                });
                
                

                //Skicka med från köp till kundvagn
                
                if  (sessionStorage.getItem("cart") === null) {
                    $("#content").append("<h1 id = 'emptyCart'>Du har inget i Varukorgen, var vänlig lägg till något först innan du kan slutföra köp</h1>");
                    $("#buyNow").hide();
                    $("#totPrice").hide();
                   
                }else{ sendToCart = JSON.parse(sessionStorage.getItem("cart"));
                var totPrice = 0;
                for (i = 0; i < sendToCart.length; i++) { 
                    for (j = 0; j < produkter.length; j++){
                        if (sendToCart[i] == produkter[j].id){
                            var appendCard = '<div class = "cards">';
                            appendCard += '<div class = "cardPic"><img src = "' + produkter[j].prodImage + '"></div>';
                            appendCard += '<div class = "cardName"><h1>' + produkter[j].prodName + '</h1></div>';
                            appendCard += '<h3>' + produkter[j].prodPrice  +' Kr</h3';
                            appendCard += '</h3></div>';
                            $(".prodCardWrapper").append(appendCard);
                        
                            
                            totPrice += produkter[j].prodPrice

                        }
                    }
                    
                } }
               
                
                $("#totPrice>h3").append(totPrice+ " kr")


             
               

                $("#member").click(function() {
                    $("#content").empty();
                
                    var form = '<form class = memberForm>';
                    form += '<h4>Namn</h4><input id = "formName" type = "text" name = "Namn"><br>';
                    form += '<h4>Email</h4><input id = "formEmail" type = "email" name = "Email"><br>';
                    form += '<h4>Telefonnumer</h4><input id = "formNumber" type = "number" name = "Telefon"><br>';
                    form += '<h4>Nyhetsbrev</h4><input id ="checkBoxNews" type="checkbox"><br>';
                    form += '<h4>Lösenord</h4><input id = "password1" type = "password"><br>';
                    form += '<h4>Repetera lösenord</h4><input id = "password2" type = "password"><br><br>';
                    form += '<button type = "button" id ="submitForm">Skicka</button>';
                    form += '</form>'
                    $("#content").append("<h1 class = memberForm> Bli medlem</h1>")
                    $("#content").append(form);
    
                    $("#submitForm").click(function() {
                      


                    if($("#password1").val() == $("#password2").val()){
                        if($('#checkBoxNews').is(':checked')){
                            kundLista.push({id: 3 ,name: $("#formName").val(), email: $("#formEmail").val(),number: $("#formNumber").val(),password: $("#password1").val(), newsletter: "Ja"});
                            localStorage.setItem('members', JSON.stringify(kundLista));
                            cartRefresh();
                            $("#member").remove();
                        }else{
                            kundLista.push({id: 3 ,name: $("#formName").val(), email: $("#formEmail").val(),number: $("#formNumber").val(),password: $("#password1").val(), newsletter: "Nej"});
                            localStorage.setItem('members', JSON.stringify(kundLista));
                            cartRefresh();
                            $("#member").remove();
                        }
                    }else{
                        alert("Lösenorden matchar inte!! :(")
                    }
                    });  
                });
            }
        });
       


   

        //BildKarusellen        
            var slideIndex = 0;
        carousel();

        function carousel() {
        var i;
        var x = document.getElementsByClassName("mySlides");
        for (i = 0; i < x.length; i++) {
        x[i].style.display = "none"; 
        }
        slideIndex++;
        if (slideIndex > x.length) {slideIndex = 1} 
        x[slideIndex-1].style.display = "block"; 
        setTimeout(carousel, 6000);
        };
  
  


        function meny(){
            //Funktion för sortering av Huvud och under meny
            underKat.sort(function(a, b){
                var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
                if (nameA < nameB) 
                    return -1 
                if (nameA > nameB)
                    return 1
                return 0 
            });
            huvudKat.sort(function(a, b){
                var menyValA=a.menyVal.toLowerCase(), menyValB=b.menyVal.toLowerCase()
                if (menyValA < menyValB) 
                    return -1 
                if (menyValA > menyValB)
                    return 1
                return 0 
            });
            //Funktion för sortering av Huvud och under meny SLUT
           
           


            for (i = 0; i < huvudKat.length; i++) { 
                var valueHKatt = i +1;
                var headMenu = '<div id = "'+valueHKatt+'" class="dropdown "><button id = "'+i+'" class="dropbtn">'+ huvudKat[i].menyVal;
                headMenu += '<div class= " dropdown-content' + i + '">';
                headMenu += '</button></div>';
                $(".navbar").append(headMenu);  
            };
             
            for (i = 0; i < underKat.length; i++){
                var underMenu;
                underMeny = '<a id =' + i +' href="#" class="underMeny">';
                underMeny += underKat[i].name + "</a>";      
        

                if(underKat[i].huvudkategori === 1){
                    $(".dropdown-content0").append(underMeny );
                }else if(underKat[i].huvudkategori === 2){
                    $(".dropdown-content1").append(underMeny );
                }else if(underKat[i].huvudkategori === 3){
                    $(".dropdown-content2").append(underMeny );
                }else if (underKat[i].huvudkategori === 4){
                    $(".dropdown-content3").append(underMeny );
                }
            };
            //Få ut alla relaterade produkter till huvudkategorin
            $(".dropdown").on("click",function(){
                $("#background-info").css("background-image","none");
                $("#content").empty();
                $("#content").append("<div class = 'prodCardWrapper'></div>");
                $("#backgroundContact").css("background-image","none");
                $(".prodCardWrapper").empty();
                for (i = 0; i < huvudKat.length; i++){
                    for (j = 0; j < produkter.length; j++){
                        if(this.id == huvudKat[i].id && this.id == produkter[j].huvudKat){
                            appendCard();
                            
                        };
                    };
                };   
            });
            
            
           
            $(".underMeny").on("click",  function(event) {
                event.stopPropagation();
                $("#background-info").css("background-image","none");
                $("#content").empty();
                $("#content").append("<div class = 'prodCardWrapper'></div>");
                $("#backgroundContact").css("background-image","none");
                for (i = 0; i < underKat.length; i++){
                for (j = 0; j < produkter.length; j++){
                    if(produkter[j].underKat == underKat[i].under && $(this).text() == underKat[i].name && produkter[j].huvudKat == underKat[i].huvudkategori){
                        appendCard();
                    };    
                };
                }; 

                    
                //Visa mer
                $(".showMore").on("click", function() {
                    for (j = 0; j < produkter.length; j++){
                        if (this.id == produkter[j].id){
                            $("#imgHolder").empty();
                            $("#content").empty();
                            $("#content").append("<div class = 'prodCardWrapper'></div>");
                            var showMoreInfo = '<div class = "moreInfo">';
                            showMoreInfo += '<div class = "cardName"><h1>'+produkter[j].prodName+'</h1></div>';
                            showMoreInfo += '<div class = "cardPic"><img src = "'+ produkter[j].prodImage +'"></div>';
                            showMoreInfo += '<div class = "cardInfo"><p>' + produkter[j].prodDesc + '</p></div>';
                            showMoreInfo += '<div class = "cardBuy">';
                            showMoreInfo += '<h3>'+ produkter[j].prodPrice +'</h3>';
                            showMoreInfo += '<h3 class = "buy"><a id="' + produkter[j].id + '" class = "buyProd" href = "#">Köp</a></h3></div>';
                    
                            $("#content").append(showMoreInfo)
                            
                        }
                    }
                    $(".buyProd").on("click",function() {
                        var cartArray;
                        var sendToCart = this.id;
                        
                            
                        if(sessionStorage.getItem("cart") == null){
                            cartArray = sessionStorage.setItem("cart", JSON.stringify([]));
                        }
                            
                        cartArray = JSON.parse(sessionStorage.getItem("cart"));
                            
                        cartArray.push(sendToCart);
                        sessionStorage.setItem("cart", JSON.stringify(cartArray));

                        plusToCart += 1;
                        $("#numbersInCart").html(plusToCart);
                    });
                   
                });
                
             
                $(".buyProd").on("click",function() {
                    var cartArray;
                    var sendToCart = this.id;
                    
                        
                    if(sessionStorage.getItem("cart") == null){
                        cartArray = sessionStorage.setItem("cart", JSON.stringify([]));
                    }
                        
                    cartArray = JSON.parse(sessionStorage.getItem("cart"));
                        
                    cartArray.push(sendToCart);
                    sessionStorage.setItem("cart", JSON.stringify(cartArray));
                    
                    plusToCart += 1;
                    $("#numbersInCart").html(plusToCart);
                }); 
            }); 

             

        };        
 
    });
           
    });
    });
    });

});