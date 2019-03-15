
        // afficher username et password (serialize)
    $("#FormInscription").on("submit",function(event){
        event.preventDefault(); //empecher le rechargement de la page
        
        

        // Récupérer pseudo du formulaire
        username = $("input[name=username]").val();
     
        // Récupérer password du formulaire
        password = $("input[name=password]").val();

        serializeFormInscription = $(this).serialize();

        console.log(serializeFormInscription);

        var urlAPI= "http://localhost/Velocity/api";
        
        // Ajax request (checkUser.php)
        $.ajax({
            type : "POST",
            url : `${urlAPI}/inscription.php`,
            data : serializeFormInscription,
            success : function(data){
                console.log(data);
        
            }
        })
    })
    
        
 
