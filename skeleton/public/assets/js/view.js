
$(document).ready(function () {
    //Input field reference where user adds a new joke.
    var $newItemInput = $("textarea");
    //console.log($newItemInput)
    //Display jokes added in the joke list
    var $jokelistContainer = $(".jokelist-container");
    //Event listeners for CRUD
    $(document).on("click", "button.delete", deleteJoke);
    $(document).on("click", "#jokelist-item", editJoke);
    $(document).on("keyup", "#jokelist-item", finishEdit);
    $(document).on("blur", "#jokelist-item", cancelEdit);
    $(document).on("click", "#jokelist-form", insertJoke);

    //Jokes array

    var jokelist = [];
  
    // Getting jokes from database when page loads
    getJokeList();
  
    // This function resets the todos displayed with new todos from the database
    function initializeRows() {
      $jokelistContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < jokelist.length; i++) {
        rowsToAdd.push(createNewRow(jokelist[i]));
      }
      $jokelistContainer.prepend(rowsToAdd);
    }
  
    // This function grabs jokes from the database and updates the view
    function getJokeList() {
      $.get("/api/jokeList", function(data) {
        jokelist = data;
        initializeRows();
      });
    }
  
    // This function deletes a todo when the user clicks the delete button
    function deleteJoke(event) {
        //event.stopPropogation();
        var id = $(this).data("id");
        $.ajax({
            method: "DELETE",
            url: "/api/jokelist/" + id
        }).then(getJokeList);

    }
  
    // This function handles showing the input box for a user to edit a todo
    function editJoke() {
      var currentJoke = $(this).data("joke-list");
      $(this).children().hide();
      $(this).children("input.input").val(currentJoke.text);
      $(this).children("input.input").show();
      $(this).children("input.input").focus();
    }
  
    // Toggles complete status
    function toggleComplete(event) {
      event.stopPropagation();
      var jokelist = $(this).parent().data("joke-list");
      jokelist.complete = !jokelist.complete;
      updateJoke(jokelist);
    }
  
    // This function starts updating a todo in the database if a user hits the "Enter Key"
    // While in edit mode
    function finishEdit(event) {
      var updatedJoke = $(this).data("joke-list");
      if (event.which === 13) {
        updatedJoke.text = $(this).children("input").val().trim();
        $(this).blur();
        updateJoke(updatedJoke);
      }
    }
  
    // This function updates a todo in our database
    function updateJoke(jokelist) {
      $.ajax({
        method: "PUT",
        url: "/api/jokeList",
        data: jokelist
      }).then(getJokeList);
    }
  
    // This function is called whenever a todo item is in edit mode and loses focus
    // This cancels any edits being made
    function cancelEdit() {
      var currentJoke = $(this).data("joke-list");
      if (currentJoke) {
        $(this).children().hide();
        $(this).children("input.input").val(currentJoke.text);
        $(this).children("span").show();
        $(this).children("button").show();
      }
    }
  
    // This function constructs a todo-item row
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
    console.log(createNewRow)
  
    // This function inserts a new todo into our database and then updates the view
    function insertJoke(event) {
        event.preventDefault();
        var jokelist = {
            joke: $newItemInput.val().trim()
        };

        $.post("/api/jokelist", jokelist, getJokeList);
        $newItemInput.val("");
    }
  });
  