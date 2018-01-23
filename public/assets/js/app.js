$(function () {
    
     $("#rateYo").rateYo({
       rating: 2.5,
       halfStar: true
     });
    
     $("#add-btn").on("click", function (event) {
         event.preventDefault();
         var rating = $("#rateYo").rateYo("rating");
         console.log("Rating is: " + rating);

         var newRating = {
             item: $("#item").val().trim(),
             category: $("#category").val().trim(),
             comment: $("#comment").val().trim(),
             rating: rating,
             UserId: 1
         };

         $.post("api/rating/create", newRating, function() {
             console.log("Added a rating!");
             window.location.href="/";
         });
     });

     $("#item-btn").on("click", function(event) {
         event.preventDefault();
         $("#searched").empty();
         var item = $("#search-item").val().trim();

         $.get("/item/" + item, function (data) {
            console.log("Looking it up.")
            console.log(data);
            if (data.length !== 0) {
            
            for(var i = 0; i < data.length; i++) {
                var row = $("<div>");
                row.addClass("item");
                row.append("<div class='panel panel-default'><div class='panel-heading'>" +
                "<h3 class='panel-title'>" + data[i].item + "</h3>" +
                "<p class='rating'>" + data[i].rating + " <span class='glyphicon glyphicon-star' aria-hidden='true'></span></p></div>" +
                "<div class='panel-body'><b><p>" + data[i].User.username + ":</p></b><p>" + data[i].comment + "</p></div></div>");
                $("#searched").prepend(row);
            }
            }
        });
        $("#search-item").val("");
     })

   });