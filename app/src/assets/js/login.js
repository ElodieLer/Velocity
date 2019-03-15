$(document).ready(function () {
    var urlAPI= "http://localhost/Velocity/api";
    
// on submit form login
        // afficher username et password (serialize)



    $("#formLogin").on("submit",function(event){
        event.preventDefault(); //empecher le rechargement de la page
        const serializeFormLogin = $(this).serialize();
        console.log(serializeFormLogin);
        // Ajax request (checkUser.php)
        $.ajax({
            type : "POST",
            url : `${urlAPI}/checkUser.php`,
            data : serializeFormLogin,
            success : function(data){
                console.log(data);
                data = JSON.parse(data);
                console.log(data);

                user = data;

                if(data.username){
                    $("#formLogin").hide(); //fait disparaitre le formulaire de connexion une fois log
                    
                    $("#FormInscription").hide(); //fait disparaitre le formulaire de connexion une fois log
                    $("#logotitre").hide(); //fait disparaitre le logo et le titre fois log

                    $("#chr").show(); //chrono une fois log
                    $("#map").show(); //fait apparaitre la map une fois log
                    $("#burger").show();
                    $("#sidebar").show();
                    $("#sidebarD").show();
                   
                    
                    var mapDiv = $("#map");
                    var canvasMap = $(".mapboxgl-canvas");

                    mapDiv.css("width", "100%");
                    canvasMap.css("width", "100%");
                    map.resize();
                }
            }
        })
    })
    
        
 
})