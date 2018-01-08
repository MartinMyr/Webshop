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
            $("#content").empty();
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
            $("#content").append("<table class = 'kundTable'><tr> <th>Id:</th><th>Email:</th><th>Telefon:</th><th>Lösenord:</th></tr></table>");
            members = JSON.parse(localStorage.getItem("members"));
        
            for (i = 0; i < members.length; i++) {
            
                $(".kundTable").append("<tr><th>"+members[i].id + "</th>"+"<th>" + members[i].email + "<th>" + members[i].number + "</th>"+ "<th>"+members[i].password + "</th>"+"</tr>");     
            }
        });
        $( "#epostAdmin" ).click(function() {
            $("#content").empty();
            $("#content").append("<table class = 'kundTable'><tr> <th>Email:</th><th>Nyhetsbrev:</th></tr></table>"); 
            $("#content").append("<h2 class = 'memberForm'>Kopiera för att skicka mail här:</h2><br><ul id ='emailCopy'></ul>")
            members = JSON.parse(localStorage.getItem("members"));  
            for (i = 0; i < members.length; i++) {
                $(".kundTable").append("<tr><th>"+members[i].email+"</th><th>"+members[i].newsletter+"</th></tr>")
                if(members[i].newsletter === "Ja"){
                    $("#emailCopy").append("<li class = 'memberForm'>"+members[i].email+", </li>")
                };
                
            };
        
        
        });
        $( "#orderAdmin" ).click(function() {
        
        });
        
       
    });
});