var urlAPI= "http://localhost/Velocity/api";
var user;

    // your standard jquery code goes here with $ prefix
    // best used inside a page with inline code, 
    // or outside the document ready, enter code here
    
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=d14aebea0e323a982ae35f24dc55997349182b9f",
        success: function (data) {
            console.log(data); //date = info de l'api jcdec
            data.forEach(function (marker) { //creation boucle avec foreach
                // create element for the marker
                var el = document.createElement('div'); //creer une nouvelle div ou il y aura les markers
                el.id = 'marker'; //remplace tout les id par marker (pour l'utiliser plus tard)
             

                // ajouter des markers à la map
                new mapboxgl.Marker(marker) //creer un nouveau marker
                    .setLngLat(marker.position) //chercher la position du tableau
                    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(`
                <h5>${marker.address}</h5>
                <p id="message-station"></p>  
                <strong> Vélos disponibles : <span id="velosdispos">${marker.available_bikes}</span> /${marker.bike_stands}</strong>
                <p>${marker.number}</p>
                <form id="form-reservation" onSubmit="formSubmitPopup(event, ${marker.number}, ${marker.available_bikes})">
                    <input type="submit" value="RESERVER">
                </form>
            `)) // message-station = pour afficher le message (plus bas) "plus de vélos disponibles !" ou "Bravo! Votre vélo est bien réservé"
                
                    .addTo(map);// ajout à la carte
            })

        },
        error: function (data) {
            console.log("error"); //afiche les erreurs
        }
    })

    


// pour la reservation
function formSubmitPopup(event, id_station, bike_stands){
    event.preventDefault();
    // AJAX request
    console.log(id_station);
    console.log(user.id);
    var user_id=user.id;

    $.ajax({
        type: "POST",
        url: `${urlAPI}/index.php`,
        crossDomain: true,
        data: {"idStation":id_station,"bikeStands":bike_stands,"userId":user_id},
        success: function(data){
            bike_stands = bike_stands - 1; //enleve 1 vélo au nombre de vélo 19/20 ===> 18/20
            if(bike_stands <= 0){ // si le nombre de vélo est à 0 et que l'on veut reserver = message d'erreur (au leiu d'un -1, -2..)
                $('#velosdispos').html('0'); // Afficher le nombre 0 quand plus de velos dispos
                $('#form-reservation').hide(); // cacher le formulaire
                $('#message-station').html('Plus de vélos disponibles!'); // Afficher ce message
            }else{
                $('#velosdispos').html(bike_stands); // Afficher le nouveau nombre de velos dispos
                $('#message-station').html('Bravo! Votre vélo est bien réservé.'); // Afficher ce message
                $('#form-reservation').attr('onsubmit', 'formSubmitPopup(event, '+id_station+', '+bike_stands+')');   // Réinjecter la fonction avec les bonnes valeurs pour pouvoir réserver un vélo de nouveau           
                IndiquerMinutes(timerPartie.temps.value);
                DemarrerChrono();
            }
        }
    })
}





/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }


/******************************Chrono***********************************************/

  
function IndiquerMinutes(min) {
  secondes = min * 60;
}


function DemarrerChrono(){
  timer = setInterval('Chrono()', 1000);
}


var secondes = 0;
var timer;
var pause = false;
var text = "";   
  
function Chrono(){
    // write ("Fin de la réservation dans");
    if(secondes>0){ //******* SI TEMPS
        var minutes = Math.floor(secondes/60);
        var heures = Math.floor(minutes/60);
        secondes -= minutes * 60;
        if(heures>0){ // si c'est en heure
            minutes -= heures * 60;
            minutes = minutes + (heures * 60);
            secondes = secondes + (minutes * 60) - 1;
        }//if heures >0
        else if(minutes<10 && secondes>9) {
            text = '0' + minutes + ' : ' + secondes;
            secondes = secondes + (minutes * 60) - 1;
        }
        else if (minutes>9 && secondes<10){
            text = minutes + ' : ' + '0'+ secondes;
            secondes = secondes + (minutes * 60) - 1;
        }
        else if (minutes<10 && secondes<10){
            text = '0' + minutes + ' : ' + '0' + secondes;
            secondes = secondes + (minutes * 60) - 1;
        }
        else {
            text = minutes + ' : ' + secondes;
            secondes = secondes + (minutes * 60) - 1;
        }
        $('#chrono').html(text);
    }else { //******* SI PAS TEMPS
        clearInterval(timer);
        text = "00 : 00";
    }//else
}//if final

//****************************************************
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//******************************************************* *
// Get the modal
var modale = document.getElementById('myModale');

// Get the button that opens the modal
var btn = document.getElementById("myBtn2");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closee")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modale.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modale.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modale) {
    modale.style.display = "none";
  }
}
//*******************************************************//
// Get the modal
var modalee = document.getElementById('myModalee');

// Get the button that opens the modal
var btn = document.getElementById("myBtn3");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeee")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modalee.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modalee.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalee) {
    modalee.style.display = "none";
  }
}
//********************************************************* *//
// Get the modal
var modaleee = document.getElementById('myModaleee');

// Get the button that opens the modal
var btn = document.getElementById("myBtn5");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeeee")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modaleee.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modaleee.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modaleee) {
    modaleee.style.display = "none";
  }
}
//***************************Modal droite**********************************//
// Get the modal
var modal1 = document.getElementById('myModal1');

// Get the button that opens the modal
var btn = document.getElementById("myBtn8");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close1")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal1.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal1.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
}