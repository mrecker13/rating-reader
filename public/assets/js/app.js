$(document).ready(function () {
    var token = localStorage.getItem("token");
    var localId = localStorage.getItem("id");
    var localUser = localStorage.getItem("username");

    if(token) {
        $("#user-greeting").append("<h2>Hello, " + localUser + "!");
    }

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
             UserId: localId
         };

         if (!token) {
            $("#itemDiv").addClass("has-error");
            $("#labelError").append("<span class='label label-danger'> Please log in to add a rating</span>");
            $("#labelError").attr("style", "color:rgb(156, 59, 59)");
             $("#item").val("");
             $("#category").val("");
             $("#comment").val("");
             return false;
         }

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
    });

    $("#register-btn").on("click", function(event) {
        event.preventDefault();

        var newUser = {
            username: $("#user-login").val().trim(),
            password: $("#pw-login").val().trim()
        };

        $.get("/user", function(data) {
            for(var i = 0; i < data.length; i++) {
                if (newUser.username === data[i].username) {
                    $("#unDiv").addClass("has-error");
                    $("#labelError").append("<span class='label label-danger'> Username already in use</span>");
                    $("#labelError").attr("style", "color:rgb(156, 59, 59)");
                    return false;
                }
            }
            $.post("api/users/create", newUser, function() {
                console.log("Registered!");
                $("#unDiv").addClass("has-success");
                $("#labelError").append("<span class='label label-success'>  Successfully registered!</span>");
                $("#labelError").attr("style", "color:rgb(115, 181, 102)");
            });
        })

        $("#user-login").val("");
        $("#pw-login").val("");
    });

    $("#loginForm").submit(function(e){
        e.preventDefault();
        // serialize all of our form fields
        var user = $("#user-login").val().trim();
        var formDataSerialized = $(this).serialize();
        console.log(user);

        $.get("api/users/all", function(data) {
            console.log(data);
            var pos = data.map(function(e) { return e.username; }).indexOf(user);
            if (pos === -1) {
                $("#unDiv").addClass("has-error");
                $("#labelError").append("<span class='label label-danger'> Username does not exist. Please register</span>");
                $("#labelError").attr("style", "color:rgb(156, 59, 59)");
                return false;
            }
            // post that data to our user/new route
            $.post("/user/login", formDataSerialized).then(function(data){
                console.log(data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("id", data.id);
                localStorage.setItem("username", data.username);
                window.location.href = '/';
                return;
            }).catch(function(err){
                console.log(err);
            });
        });

        $("#user-login").val("");
        $("#pw-login").val("");
    });

    $("#logOut-btn").on("click", function(event) {
        event.preventDefault();
        localStorage.clear();
        window.location.href = "/login";
    })

   });

   $("#user-btn").on("click", function(event) {
    event.preventDefault();
    $("#searched").empty();
    $("#user-heading").empty();
    var item = $("#search-user").val().trim();

    $.get("user" + User, function (data) {
       console.log("Looking it up.")
       console.log(data);
       if (data.length !== 0) {
           $("#user-heading").html("<h3>" + User + "</h3>");

           for(var i = 0; i < data.length; i++) {
               var row = $("<div>");
               row.addClass("user");
               row.append("<div class='panel panel-default'><div class='panel-heading'>" +
               "<h3 class='panel-title'>" + data[i].User + " - " + data[i].category + "</h3>" +
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
           none.html("<h3>Currently no ratings for " + User + ".  Click <a href='/add'>here</a> to add one!");
           $("#user-heading").append(none);
       }
   });
   $("#search-user").val("");
})