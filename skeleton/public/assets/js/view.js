$(document).ready(function () {
    //Input field reference where user adds a new joke.
    var $newItemInput = $("textarea");
    //console.log($newItemInput)
    //Display jokes added in the joke list
    var $jokeListContainer = $(".jokelist-container");
    //Event listeners for CRUD
    $(document).on("click", "button.delete", deleteJoke);
    $(document).on("click", "#jokelist-item", editJoke);
    $(document).on("keyup", "#jokelist-item", finishEdit);
    $(document).on("blur", "#jokelist-item", cancelEdit);
    $(document).on("click", "#jokelist-form", insertJoke);

    //Jokes array
    var jokelist = [];

    //Get jokes from DB on page load
    getJokeList();

    //Resets jokes on list with new jokes from the DB
    function initializeRows() {
        $jokeListContainer.empty();
        var rowsToAdd = [];
        for (var i = 0; i < jokelist.length; i++) {
            rowsToAdd.push(createNewRow(jokelist[i]));
        }
        $jokeListContainer.prepend(rowsToAdd);
    }

    //Gets jokes from DB and update list view
    function getJokeList() {
        $.get("/api/jokelist", function (data) {
            jokelist = data;
            initializeRows();
        });
    }

    // Delete Joke when clicking on delete icon
    function deleteJoke(event) {
        //event.stopPropogation();
        var id = $(this).data("id");
        $.ajax({
            method: "DELETE",
            url: "/api/jokelist/" + id
        }).then(getJokeList);
    }


    //SHowing input box for jokes to be edited
    function editJoke() {
        var currentJoke = $(this).data("jokeitem");
        $(this).children().hide();
        $(this).children("input.edit").val(currentJoke.text);
        $(this).children("input.edit").show();
        $(this).children("input.edit").focus();
    }

    //finishes the updates
    function finishEdit(event) {
        var updatedJokeList = $(this).data("jokeitem");
        if (event.which === 13) {
            updatedJokeList.text = $(this).children("input").val().trim();
            $(this).blur();
            updateJokeList(updatedJokeList);
        }
    }

      //updates the joke item in list
      function updateJokeList(jokelist) {
          $.ajax({
              method: "PUT",
              url: "/api/jokelist",
              data: jokelist
          }).then(getJokeList);
      }
      //cancel editing the joke
      function cancelEdit() {
          var currentJoke = $(this).data("jokeitem");
          if (currentJoke) {
            $(this).children().hide();
            $(this).children("input.edit").val(currentJoke.text);
            $(this).children("span").show();
            $(this).children("button").show();
        }
    }

    //new joke
    function createNewRow(jokelist) {
        var $newInputRow = $(
            [
                "<li class='list-group-item joke-item'>",
                "<span>",
                jokelist.joke,
                "</span>",
                "<input type='text' class='edit' style='display: none;'>",
                "<button class='delete btn btn-danger'>x</button>",
                "</li>"
            ].join("")
        );

        $newInputRow.find("button.delete").data("id", jokelist.id);
        $newInputRow.find("input.edit").css("display", "none");
        $newInputRow.data("jokeitem", jokelist);
        if (jokelist.complete) {
            $newInputRow.find("span").css("text-decoration", "line-through");
        }
        return $newInputRow;
    }
    //puts joke in DB
    function insertJoke(event) {
        event.preventDefault();
        var jokelist = {
            joke: $newItemInput.val().trim()
        };

        $.post("/api/jokelist", jokelist, getJokeList);
        $newItemInput.val("");
    }


});
