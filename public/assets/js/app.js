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
            UserId: 2
        };

        $.post("api/rating/create", newRating, function () {
            console.log("Added a rating!");
            window.location.href = "/";
        });
    });

    $("#search-item").on("click", function (event) {
        event.preventDefault();

        $("#searched").empty();

        var searchItem = $("#item-search").val().trim();

        $.get("/item/" + searchItem, function (data) {
            console.log("Looking it up.")

            console.log(data);

            if (data.length !== 0) {

                

                    var row = $("<div>");
                    row.addClass("item");

                    row.append("<div class='panel panel-default'><div class='panel-heading'>" +
                    "<h2 class='panel-title'>" + data.ratings.User.username + "</h2>" +
                    "<p class='rating'>" + data.ratings.rating + "<span class='glyphicon glyphicon-star' aria-hidden='true'></span></p></div>" +
                    "<div class='panel-body'><p>" + data.ratings.comment + "</p></div></div>");

                    $("#searched").prepend(row);

            }
        });
        $("#item-search").val("");
    });

});