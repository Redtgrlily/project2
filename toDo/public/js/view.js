$(document).ready(function() {
  // Getting a reference to the input field where user adds a new joke
  var $newItemInput = $("input.new-item");
  // Our new jokes will go inside the todoContainer
  var $todoContainer = $(".todo-container");
  // Adding event listeners for deleting, editing, and adding jokes
  $(document).on("click", "button.delete", deleteJoke);
  $(document).on("click", ".todo-item", editJoke);
  $(document).on("keyup", ".todo-item", finishEdit);
  $(document).on("blur", ".todo-item", cancelEdit);
  $(document).on("submit", "#todo-form", insertJoke);

  // Our initial jokes array
  var jokeList = [];

  // Getting jokes from database when page loads
  getJokes();

  // This function resets the jokes displayed with new jokes from the database
  function initializeRows() {
    $todoContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < jokeList.length; i++) {
      rowsToAdd.push(createNewRow(jokeList[i]));
    }
    $todoContainer.prepend(rowsToAdd);
  }

  // This function grabs jokes from the database and updates the view
  function getJokes() {
    $.get("/api/todos", function(data) {
      todos = data;
      initializeRows();
    });
  }

  // This function deletes a joke when the user clicks the delete button
  function deleteJoke(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/jokes/" + id
    }).then(getJokeList);
  }

  // This function handles showing the input box for a user to edit a joke
  function editJoke() {
    var currentJoke = $(this).data("todo");
    $(this).children().hide();
    $(this).children("input.edit").val(currentJoke.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // This function starts updating a joke in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    var updatedJokeList = $(this).data("todo");
    if (event.which === 13) {
      updatedJokeList.text = $(this).children("input").val().trim();
      $(this).blur();
      updateJokeList(updatedJokeList);
    }
  }

  // This function updates a joke in our database
  function updateJokeList(jokeList) {
    $.ajax({
      method: "PUT",
      url: "/api/todos",
      data: jokeList
    }).then(getJokeList);
  }

  // This function is called whenever a joke item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentJoke = $(this).data("todo");
    if (currentJoke) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentJoke.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a joke-item row
  function createNewRow(jokeList) {
    var $newInputRow = $(
      [
        "<li class='list-group-item todo-item'>",
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

  // This function inserts a new joke into our database and then updates the view
  function insertJoke(event) {
    event.preventDefault();
    var jokelist = {
      name: $newItemInput.val().trim(),
      text: $newItemInput.val().trim(),
    };

    $.post("/api/jokeList", jokelist, getJokeList);
    $newItemInput.val("");
  }
});
