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
          
    fetch("underkategorier.json")
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
       



        

        //Kundvagnen
        $("#toCart").click(function() {
            cartRefresh();
            function cartRefresh(){
            $("#content").empty();
            $("#backgroundContact").css("background-image","none");
           
            
            var userLogin = '<span id = "totPrice"></span><div id = "userLogin"> <i class="fa fa-user" aria-hidden="true"></i>';
            userLogin += '<input id = "username" type="text" name="username">';
            userLogin += '<i class="fa fa-key" aria-hidden="true"></i>';
            userLogin += '<input id = "password" type="password" name="psw">';
            userLogin += '<button id = "submit">Ok</button></div>';
            $("#content").append(userLogin);
            $("#content").append("<h1 id = 'cartH1'>Varukorgen</h1>")

            $("#content").append("<div class = 'prodCardWrapper'></div");
            $("#content").append("<button id = 'member'>Bli medlem</button><button id = 'buyNow'>Slutför köp</button>");

            }

            //Skicka med från köp till kundvagn
            sendToCart = JSON.parse(sessionStorage.getItem("cart"));
            for (i = 0; i < sendToCart.length; i++) { 
               
                $(".prodCardWrapper").append("<div class = 'cards'>" + sendToCart[i] + "</div>");
                $(".buy").remove();
                console.log("<div class = 'cards'>" + sendToCart + "</div>");   
            } 
                
            if  (sessionStorage.getItem("cart") === null) {
                $("#content").append("<h1>Du har inget i kundvagnen</h1>")
                console.log("Du har inget i kundvagnen")
            }else{
               var myInteger = parseInt($("h3").text());
               $("#totPrice").append( myInteger + "+ 55kr i frakt. Totalt:" + Number(myInteger + 55)) 
               console.log(myInteger)
            }

            $("#member").click(function() {
                $("#content").empty();
               
                var form = '<form class = memberForm>';
                form += '<h4>Namn</h4><input id = "formName" type = "text" name = "Namn"><br>';
                form += '<h4>Email</h4><input id = "formEmail" type = "email" name = "Email"><br>';
                form += '<h4>Telefonnumer</h4><input id = "formNumber" type = "number" name = "Telefon"><br>';
                form += '<h4>Nyhetsbrev</h4><input id ="checkBoxNews" type="checkbox"><br>';
                form += '<h4>Lösenord</h4><input id = "password1" type = "password"><br>';
                form += '<h4>Repetera lösenord</h4><input id = "password2" type = "password"><br><br>';
                form += '<button id ="submitForm">Skicka</button>';
                form += '</form>'
                $("#content").append("<h1 class = memberForm> Bli medlem</h1>")
                $("#content").append(form);
   
                $("#submitForm").click(function() {
                    var members = [];
                  if($("#password1").val() == $("#password2").val()){
                    if($('#checkBoxNews').is(':checked')){
                        kundLista.push({id: 3 ,name: $("#formName").val(), email: $("#formEmail").val(),number: $("#formNumber").val(),password: $("#password1").val(), newsletter: "Ja"});
                        cartRefresh();
                        $("#member").remove();
                    }else{
                        kundLista.push({id: 3 ,name: $("#formName").val(), email: $("#formEmail").val(),number: $("#formNumber").val(),password: $("#password1").val(), newsletter: "Nej"});
                        cartRefresh();
                        $("#member").remove();
                    }
                  }else{
                      alert("Lösenorden matchar inte!! :(")
                  }

                });  
            });
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
            

                var headMenu = '<div class="dropdown"><button id = "'+i+'" class="dropbtn">'+ huvudKat[i].menyVal;
                headMenu += '<div class="dropdown-content' + i + '">';
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
           
            $(".dropdown").on("click", "a.underMeny", function() {
                $(".prodCardWrapper").empty();

                for (i = 0; i < underKat.length; i++){
                for (j = 0; j < produkter.length; j++){
                    
                    if(produkter[j].underKat == underKat[i].under && $(this).text() == underKat[i].name && produkter[j].huvudKat == underKat[i].huvudkategori){
                        var appendCard = '<div class = "cards">';
                        appendCard += '<div class = "cardPic"><img src = "' + produkter[j].prodImage + '"></div>';
                        appendCard += '<div class = "cardName"><h1>' + produkter[j].prodName + '</h1></div>';
                        appendCard += '<div class = "cardInfo"><p></p></div>';
                        appendCard += '<div class = "cardBuy">';
                        appendCard += '<h3>' + produkter[j].prodPrice + '</h3><h3 class = "buy">';
                        appendCard += '<a id="' + produkter[j].id + '" class = "buyProd" href = "#">Köp</a></h3></div><h3 class = "showMore">Visa mer';
                        appendCard += '</h3></div>';
                        

                        // a id utbytt så den skickar med rätt id . spara denna i lokalstorage och fixa så den skrivs ut ordentligt.
                        $(".prodCardWrapper").append(appendCard);
                        
                        $(".showMore").on("click", function() {
                            var showMore = $(event.currentTarget).parent().html();
                            
                            $(".prodCardWrapper").empty();
                            $(".prodCardWrapper").append('<div class = "cards"></div>')
                            $(".cards").append(showMore);
                            $(".cardInfo").append(produkter[j].prodDesc)  //BÖRJA HÄR!
                                console.log(showMore)

                        });
                    }   
                   
                   
                }
                }; 

                $(".buyProd").on("click",function(event) {
                    var cartArray;
                    var sendToCart = $(event.currentTarget).parents(".cards").html();
                    
                    if(sessionStorage.getItem("cart") == null){
                        cartArray = sessionStorage.setItem("cart", JSON.stringify([]));
                    }else{
                         cartArray = JSON.parse(sessionStorage.getItem("cart"));
                    }
                    
                    cartArray.push(sendToCart);
                    sessionStorage.setItem("cart", JSON.stringify(cartArray));
                    
                });
            }); 

             

        };        
 
    });
           
    });
    });
    });

});