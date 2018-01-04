$( document ).ready(function() {
    fetch("kunder.json")
    .then(function(response)
    {
        return response.json();
    })
    .then(function(postsCollection)
    {
        kundLista = postsCollection;
       
      
        
  
    //Startup functions
    status();

    var user = "test";
    var password = "password";
  
  

      
   
    //Login funktion

    function status(){
        if (sessionStorage.ourUser != null) {
            showMemberPage();
        } else {
            showStartPage();
        }
    };


    $("#submit").click(function () {
        if ($("#username").val() == user && $("#password").val() == password) {
            sessionStorage.ourUser = user;
             showMemberPage(); 
        }
    });

    $("#logOutButton").click(function () {
        sessionStorage.removeItem("ourUser");
        showStartPage();
    });
    function showMemberPage() {
        $("#logOutButton").show();
        $(".formInlogg").hide();
        $("#loginButton").hide();
        appendMenu()
    };
    function showStartPage() {
        $(".formInlogg").hide();
        $("#logOutButton").hide();
        $("#loginButton").show();
        $("#epostAdmin").hide();
        $("#kundAdmin").hide();
        $("#orderAdmin").hide();
     };
    
    $( "#loginButton" ).click(function() {
        $("#loginButton").hide(1500);
        $(".formInlogg").show(1500);
      });

      function appendMenu(){
        $(".navbar").append("<a id = 'epostAdmin' href='#'>Epostlista</a>");
        $(".navbar").append("<a id = 'KundAdmin' href='#'>Kundlista</a>");
        $(".navbar").append("<a id = 'orderAdmin' href='#'>Orderlista</a>");
      };

      $( "#KundAdmin" ).click(function() {
        $("#content").empty();
        $("#content").append("<table class = 'kundTable'><tr> <th>Id:</th><th>Email:</th><th>Lösenord:</th></tr></table>");
    
        for (i = 0; i < kundLista.length; i++) {
           
            $(".kundTable").append("<tr><th>"+kundLista[i].id + "</th>"+"<th>" + kundLista[i].email + "<th>"+kundLista[i].password + "</th>"+"</tr>");     
        }
      });
      $( "#epostAdmin" ).click(function() {
        $("#content").empty();
        $("#content").append("<table class = 'kundTable'><tr> <th>Email:</th><th>Nyhetsbrev:</th></tr></table>");   
      });
      $( "#orderAdmin" ).click(function() {
       
      });
       
    });
});