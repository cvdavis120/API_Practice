$("document").ready(function() {
  $("button").on("click", apiCall);
  function apiCall() {
    var person = $(this).attr("data-person");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      person +
      "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("h2").removeAttr("hidden");
      var results = response.data;
      console.log(response.data);
      $("#gifs-appear-here").text("");
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);
        p.attr("class", "rating");
        var personImage = $("<img>");
        personImage.attr("class", "gif");
        personImage.attr("src", results[i].images.original_still.url);
        personImage.attr("data-animate", results[i].images.original.url);
        personImage.attr("data-still", results[i].images.original_still.url);

        personImage.attr("data-state", "still");

        gifDiv.prepend(p);
        gifDiv.prepend(personImage);

        $("#gifs-appear-here").prepend(gifDiv);
        $(".gif").on("click", pauseGIF);
      }
    });
    // $(".gif").on("click", pauseGIF);
  }
  function pauseGIF() {
    var state = $(this).attr("data-state");
    console.log(state);

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));

      $(this).attr("data-state", "still");
    }
  }
  $(".rating").on("click", function() {
    console.log("your dumb:");
  });

  var toDoCount = 4;
  var toDoArray = [];
  if (localStorage.getItem("Tasks")) {
    var oldTasks = localStorage.getItem("Tasks");
    var oldarrayedTasks = JSON.parse(oldTasks);
    oldarrayedTasks.forEach(function(i) {
      toDoArray.push(i);
    });
  }
  $("#add-sport").on("click", function(event) {
    event.preventDefault();

    var toDoValue = $("#to-do").val();
    var newbutton = $("<button>");
    console.log(toDoValue);
    toDoArray.push(toDoValue);
    newbutton.attr("id", "sport-" + toDoCount);
    newbutton.text(toDoValue.toUpperCase());
    newbutton.attr("data-person", toDoValue);

    $("#buttons").append(newbutton);
    $("#to-do").val("");
    $("button").on("click", apiCall);
    toDoCount++;
    var stringArray = JSON.stringify(toDoArray);
    localStorage.setItem("Tasks", stringArray);
  });
});
