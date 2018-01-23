$(function () {
    
     $("#rateYo").rateYo({
       rating: 2.5,
       halfStar: true
     });
    
     $("#add-btn").on("click", function (event) {
         event.preventDefault();
         var rating = $("#rateYo").rateYo("rating");
         console.log("Rating is: " + rating);
     })

   });