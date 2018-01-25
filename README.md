# Rating-Reader

Welcome to Rating Reader! This website is dedicated to giving anything you can imagine a rating.

Rate a sports team, rate a video game, rate a beer, rate a fictional bar. Anything you want!

# Getting Started

1) Please either git clone this repository or head to [Heroku URL] to get started. If going to to the Heroku app, please skip to Using the App.

2) When cloned, please put npm install in the terminal and run it to grab the dependencies.

3) Run 'node server.js' in the terminal after.

4) Navigate to localhost:8080 by default or change the PORT variable to your own port and head to that local host.

# Using the App

1) Upon reaching the page, you will be on our homepage where you may see other ratings other users have left.

2) Click the Login/Register button in the top right corner and enter in a username and password then click register. If such a username already exists, you will hit an error and need another username.

3) Once logged in, you can add your own ratings using the 'Add Your Rating!' button on the home page and enter the item you want to rate, it's general category, a comment why you rate it as you do and how many stars out of 5 you give it. When done, hit submit to see your new rating in our database.

4) Regardless of whether you are logged in or not, you can use the 'Item', 'User' or 'Category' buttons at the top to search for ratings based on the item name, the user who has entered it or a category of items.

5) When done, you can leave the webpage or logout on your own using the 'Logout' button.

# Our Dependencies

We have used
    * Express
    * Body-Parser
    * Handlebars
    * Sequelize
    * Bcrypt-NodeJS
    * JSONWebToken
    * Rateyo
    * Bootstrap
    * jQuery
Within this app.

