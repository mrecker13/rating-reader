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
             comment: $("#comment").val().trim(),
             rating: rating,
             UserId: 1
         };

         $.post("api/rating/create", newRating, function() {
             console.log("Added a rating!");
             window.location.href="/";
         });
     });

   });