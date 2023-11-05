# Natours Application
![Static Badge](https://img.shields.io/badge/Language-JavaScript-yellow)
![Static Badge](https://img.shields.io/badge/18.13.0-Node.Js-green)
![Static Badge](https://img.shields.io/badge/4.18.2-Express.Js-blue)
![Static Badge](https://img.shields.io/badge/DB-MongoDB-green)
![Static Badge](https://img.shields.io/badge/7.4.0-mongoose-green)
![Static Badge](https://img.shields.io/badge/3.0.1-nodemon-red)
![Static Badge](https://img.shields.io/badge/2.8.5-cors-red)
![Static Badge](https://img.shields.io/badge/1.7.4-compression-red)
![Static Badge](https://img.shields.io/badge/16.3.1-dotenv-red)
![Static Badge](https://img.shields.io/badge/7.0.1-express--validator-red)
![Static Badge](https://img.shields.io/badge/1.2.0-express--async--handler-red)
![Static Badge](https://img.shields.io/badge/5.1.0-bcrypt-red)
![Static Badge](https://img.shields.io/badge/9.0.1-jsonwebtoken-red)
![Static Badge](https://img.shields.io/badge/6.9.4-nodemailer-red)
![Static Badge](https://img.shields.io/badge/1.10.0-morgan-red)
![Static Badge](https://img.shields.io/badge/1.6.6-slugify-red)
![Static Badge](https://img.shields.io/badge/0.32.5-sharp-red)
![Static Badge](https://img.shields.io/badge/13.6.0-stripe-blue)

This full stack web application is specially designed for persons who love travelling and going on tour vacations.

This app can be found at [https://natours-app-5pcf.onrender.com/](https://natours-app-5pcf.onrender.com/).
The documentation of the API for this app can be found at [https://documenter.getpostman.com/view/13036021/TWDfEZ3P](https://documenter.getpostman.com/view/13036021/TWDfEZ3P)
The API and the app itself are hosted on the same server.



## Overview

This web application allows it's users to book tour vacations.

A tour refers to a series of locations, specially picked to excite the adventurous spirit of the individual who books it.

A visiting user who has not yet created an account on the app can simply see all the current tours as well as detailed information about each tour.

Once signed up or logged in, they can then book any tour of their choice.

Users can write only one review for any tour they book.

## Purpose

This app is a pet project, built for the express purpose of honing my skills in full stack web development.

## Demonstration

#### Home Page :

<!-- ![natoursHomePage](https://github.com/NachiketaDhal/Natours-API/blob/master/public/Screenshots/Home.png | width=640) -->
<img src="https://github.com/NachiketaDhal/Natours-API/blob/master/public/Screenshots/Home.png" width="640">

#### Tour Details :

![tourOverview](https://github.com/NachiketaDhal/Natours-API/blob/master/public/Screenshots/Booked-Tour.gif)

#### Payment Process :

<!-- ![paymentprocess](https://github.com/NachiketaDhal/Natours-API/blob/master/public/Screenshots/Payment.png | width=640) -->
<img src="https://github.com/NachiketaDhal/Natours-API/blob/master/public/Screenshots/Payment.png" width="640">

#### LOGIN PAGE :

<!-- ![login](https://github.com/NachiketaDhal/Natours-API/blob/master/public/Screenshots/Login.png | width=640) -->
<img src="https://github.com/NachiketaDhal/Natours-API/blob/master/public/Screenshots/Login.png" width="640">

#### User Profile :

<!-- ![userprofile](https://github.com/NachiketaDhal/Natours-API/blob/master/public/Screenshots/Admin.png | width=640) -->
<img src="https://github.com/NachiketaDhal/Natours-API/blob/master/public/Screenshots/Admin.png" width="640">

## Main Tools And Technologies Used

- HTML (Create the structure and content of the web pages).
- CSS (Styling of the web pages).
- PUG (Template engine for generating the web pages dynamically).
- JAVASCRIPT (Interactivity, as well as making requests to the API from the client-side).
- NODE (Run JavaScript code on the server-side).
- EXPRESS (Node framework, meant to simplify the process of building complex server-side applications).
- MONGODB (Database for data persistence).
- MONGOOSE (Interacting with mongodb).
- MAPBOX (Displaying the different locations of each tour).
- STRIPE (Making payments on the app).
- JSON WEB TOKEN (Authenticating users)
- NODEMAILER (Sending emails to users of the app)
- MAILTRAP (Trapping the emails we send in our development environment, so they don't actually get sent to the user's email address)
- SENDGRID (Sending actual emails to the users in production).


        

## Key feature

1. Authentication:

    - The user can sign up, then he can log in to the system.
    - A new Admin can be added only by another admin.

2. Authorization:

- Admin:

    - Can add, modify, and delete touts .
    - Can add, modify, and delete either users or admins.
    - Can delete offensive user's reviews.


- User:

    - Can modify his own data _like  email ,name , photo_.
    - Can modify his password or reset it.
    - Can add tour in Bookings.

## Installation

First, clone a fresh copy:

```Bash

git clone https://github.com/AmrMohamed001/natours.git

```

Then, you need to run `npm install` to install app dependencies.

Finally, you need to set up the environment variables:

``` env
# DB
DATABASE: either a local or atlas mongodb connection

# APP SETTINGS
NODE_ENV: either development or production
PORT: listen port for the app


# JWT
JWT_SECRET: create a JWT secret key of at least 32 characters.
JWT_EXPIRE_IN: how long the JWT user access token will be valid


# STRIPE SETTINGS
SECRET_STRIPE: strip the secret api key, and the public key will be sent to the front-end developer


