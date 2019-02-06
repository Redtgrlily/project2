$(document).ready(function() {

    //Display jokes added in the joke list
    

    $(document).on("click", "#getJokes", GetJokes);


    function GetJokes() {
        var queryURL = 'https://api.chucknorris.io/jokes/random';

        console.log('omg');

       
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
                console.log(response);
                $('#myjoke').html(response.value);
        });
   
    }
});

