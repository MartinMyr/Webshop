$( document ).ready(function() {
    
  
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
     };
    
    $( "#loginButton" ).click(function() {
        $("#loginButton").hide(1500);
        $(".formInlogg").show(1500);
      });

      function appendMenu(){
        $(".navbar").append("<a id = 'EpostAdmin' href='#'>Epostlista</a>");
        $(".navbar").append("<a id = 'KundAdmin' href='#'>Kundlista</a>");
        $(".navbar").append("<a id = 'orderAdmin' href='#'>Orderlista</a>");
      };
});