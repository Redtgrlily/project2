$(document).ready(function() {
    //Input field reference where user adds a new joke.
    var $newItemInput = $("input.new-item");
    //Display jokes added in the joke list
    var $jokeListContainer = $(".jokelist-container");
    //Event listeners for CRUD
    $(document).on("click", "button.delete", deleteJoke);
    $(document).on("click", ".jokelist-item", editJoke);
    $(document).on("keyup", ".jokelist-item", finishEdit);
    $(document).on("blur", ".jokelist-item", cancelEdit);
    $(document).on("submit", "#jokelist-form", insertJoke);

    //Jokes array
    var jokeList = [];

    //Get jokes from DB on page load
    getJokes();

    //Resets jokes on list with new jokes from the DB
    function initializeRows() {
        $jokeListContainer.empty();
        var rowsToAdd = [];
        for (var i = 0; i < jokeList.length; i++) {
            rowsToAdd.push(createNewRow(jokeList[i]));
        }
        $jokeListContainer.prepend(rowsToAdd);
    }

    //Gets jokes from DB and update list view
    function getJokes() {
        $.get("/api/jokelist", function(data) {
            jokelist = data;
            initializeRows();
        });
    }

    // Delete Joke when clicking on delete icon
    function deleteJoke(event) {
        event.stopPropogation();
        var id = $(this).data("id");
        $.ajax({
            method: "DELETE",
            url: "/api/jokes/" + id
        }).then(getJokes);
    }

   
})