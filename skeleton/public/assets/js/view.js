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

      function updateJokeList(jokeList) {
          $.ajax({
              method: "PUT",
              url: "/api/jokelist",
              data: jokeList
          }).then(jokeList);
      }

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
      function createNewRow(jokeList) {
        var $newInputRow = $(
          [
            "<li class='list-group-item joke-item'>",
            "<span>",
            jokeList.text,
            "</span>",
            "<input type='text' class='edit' style='display: none;'>",
            "<button class='delete btn btn-danger'>x</button>",
            "<button class='complete btn btn-primary'>✓</button>",
            "</li>"
          ].join("")
        );
    
        $newInputRow.find("button.delete").data("id", jokeList.id);
        $newInputRow.find("input.edit").css("display", "none");
        $newInputRow.data("jokeList", jokeList);
        if (jokeList.complete) {
          $newInputRow.find("span").css("text-decoration", "line-through");
        }
        return $newInputRow;
      }
      //puts joke in DB
      function insertJoke(event) {
        event.preventDefault();
        var jokelist = {
          name: $newItemInput.val().trim(),
          text: $newItemInput.val().trim(),
        };
    
        $.post("/api/jokeList", jokelist, getJokeList);
        $newItemInput.val("");
      }

  
})

    })
