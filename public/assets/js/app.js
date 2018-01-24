$(document).ready(function () {
    $.get("/api/home", function(data) {
        for(var i = 0; i < data.length; i++) {
            var row = $("<div>");
            row.addClass("item");
            row.append("<div class='panel panel-default'><div class='panel-heading'>" +
            "<h3 class='panel-title'>" + data[i].item + " - " + data[i].category + "</h3>" +
            "<div class='rating'></div></div>" +
            "<div class='panel-body'><b><p>" + data[i].User.username + ":</p></b><p>" + data[i].comment + "</p></div></div>");
            $(".start-data").append(row);
            $(".rating").rateYo({
                rating: data[i].rating,
                readOnly: true,
                starWidth: "16px"
            });
        }
        console.log(data);
    })

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
         $("#item-heading").empty();
         var item = $("#search-item").val().trim();

         $.get("/item/" + item, function (data) {
            console.log("Looking it up.")
            console.log(data);
            if (data.length !== 0) {
                $("#item-heading").html("<h3>" + item + "</h3>");

                for(var i = 0; i < data.length; i++) {
                    var row = $("<div>");
                    row.addClass("item");
                    row.append("<div class='panel panel-default'><div class='panel-heading'>" +
                    "<h3 class='panel-title'>" + data[i].item + " - " + data[i].category + "</h3>" +
                    "<div class='rating'></div></div>" +
                    "<div class='panel-body'><b><p>" + data[i].User.username + ":</p></b><p>" + data[i].comment + "</p></div></div>");
                    $("#searched").prepend(row);
                    $(".rating").rateYo({
                        rating: data[i].rating,
                        readOnly: true,
                        starWidth: "16px"
                    });
                };
            } else {
                var none = $("<div>");
                none.addClass("none");
                none.html("<h3>Currently no ratings for " + item + ".  Click <a href='/add'>here</a> to add one!");
                $("#item-heading").append(none);
            }
        });
        $("#search-item").val("");
     })

     $("#category-btn").on("click", function(event) {
        event.preventDefault();
        $("#category-searched").empty();
        $("#cat-heading").empty();
        var catSearch = $("#search-category").val().trim();

        $.get("/category/" + catSearch, function (data) {
           console.log("Looking it up.")
           console.log(data);
           if (data.length !== 0) {
               $("#cat-heading").html("<h3>" + catSearch + "</h3>")
           
                for(var i = 0; i < data.length; i++) {
                    var row = $("<div>");
                    row.addClass("item");
                    row.append("<div class='panel panel-default'><div class='panel-heading'>" +
                    "<h3 class='panel-title'>" + data[i].item + " - " + data[i].category + "</h3>" +
                    "<div class='rating'></div></div>" +
                    "<div class='panel-body'><b><p>" + data[i].User.username + ":</p></b><p>" + data[i].comment + "</p></div></div>");
                    $("#category-searched").prepend(row);
                    $(".rating").rateYo({
                        rating: data[i].rating,
                        readOnly: true,
                        starWidth: "16px"
                    });
                };
           }else {
               var none = $("<div>");
               none.addClass("none");
               none.html("<h3>Currently no ratings under the " + catSearch + " category.  Click <a href='/add'>here</a> to add one!");
               $("#cat-heading").append(none);
           }
       });
       $("#search-category").val("");
    })

   });
