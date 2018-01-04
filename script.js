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
               
           
           
           
                    
           
               
        
 
        //Startup functions

  
  
  
   
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
         

            var headMenu = '<div class="dropdown"><button class="dropbtn">'+ huvudKat[i].menyVal;
            headMenu += '<div class="dropdown-content' + i + '">';
            headMenu += '</button></div></div> ';
            $(".navbar").append(headMenu);
           
           
            
        };
            
        for (i = 0; i < underKat.length; i++){
            var underMenu;
            underMeny = '<a href="#">';
            underMeny += underKat[i].name + "</a>";      
        
            if(underKat[i].huvudkategori === 1){
            $(".dropdown-content0").append(underMeny );
            }else if(underKat[i].huvudkategori === 2){
                $(".dropdown-content1").append(underMeny );
            }else if(underKat[i].huvudkategori === 3){
                $(".dropdown-content2").append(underMeny );
            }else if (underKat[i].huvudkategori === 4){
                $(".dropdown-content3").append(underMeny );
            };  
            
           
           
        };

      
        
        $("this,a").on("click", function(){
            for (i = 0; i < produkter.length; i++){
                if(underKat[i].under === produkter[i].underKat && underKat[i].huvudkategori === produkter[i].huvudKat){
                    $("#content").append(produkter[i].prodName)
                }

               
            }
          
        }); 
 
    });
           
    });
    });

});