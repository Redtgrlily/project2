//run code once page is ready
$(document).ready(function() {

//signaling on click event with button will run function
   $(document).on("click", "#getJokes", GetJokes);


//Functions
        function GetJokes() {
            var queryURL = 'https://api.chucknorris.io/jokes/random';

            console.log('omg');
        
            var audioElement = document.createElement("audio");
            audioElement.setAttribute("src", "assets/laughter.mp3");

        // Laughter Button
    $("#getJokes").on("click", function() {
        audioElement.play();
      });
        
//retreiving API
            $.ajax({
                    url: queryURL,
                    method: "GET"
                }).done(function(response) {
                        console.log(response);
                   $('#myjoke').html(response.value);
                   
            });
    
        }
    
});






