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


## Tabel of content
- <a href= "https://github.com/AmrMohamed001/natours#overview">Overview</a>
- <a href= "https://github.com/AmrMohamed001/natours#purpose">Purpose</a>
- <a href= "https://github.com/AmrMohamed001/natours#demonstration">Demonstration</a>
- <a href= "https://github.com/AmrMohamed001/natours#main-tools-and-technologies-used">Main Tools And Technologies Used</a>
- <a href= "https://github.com/AmrMohamed001/natours#key-feature">Key feature</a>
- <a href= "https://github.com/AmrMohamed001/natours#installation">Installation</a>
- <a href= "https://github.com/AmrMohamed001/natours#schemas">Schemas</a>

    - <a href= "https://github.com/AmrMohamed001/natours#user-schema">User
      schema</a>
    - <a href= "https://github.com/AmrMohamed001/natours#tour-schema">Tour
      schema</a>
    - <a href= "https://github.com/AmrMohamed001/natours#review-schema">Review
      shema</a>
    - <a href= "https://github.com/AmrMohamed001/natours#booking-schema">Booking
      shema</a>

- <a href= "https://github.com/AmrMohamed001/natours#endpoints">Endpoints</a>
    - <a href= "https://github.com/AmrMohamed001/natours#auth-endpoints">Auth endpoints</a>
        - <a href = "https://github.com/AmrMohamed001/natours#sign-up-endpoint">Sign up endpoint</a>

        - <a href = "https://github.com/AmrMohamed001/natours#log-in-endpoint">Log in endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#fortgot-password-endpoint">Forgot password endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#reset-password-endpoint">Reset password endpoint</a>
    - <a href = "https://github.com/AmrMohamed001/natours#user-endpoints">User endpoints</a>
        - <a href = "https://github.com/AmrMohamed001/natours#create-new-user-endpoint">Create new user endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#get-all-users">Get all user endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#get-specific-user">Get a specific user endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#update-specific-user">Update a specific user endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#update-specific-user-password">Update a specific user password endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#delete-specific-user">Delete a specific user endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#get-logged-user-data">Get logged user data endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#updated-logged-user-data">Update logged user data endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#update-logged-user-password">Update logged user password end point</a>
        - <a href = "https://github.com/AmrMohamed001/natours#delete-logged-user">Delete logged user endpoint</a>
    - <a href = "https://github. com/AmrMohamed001/natours#tours-endpoints">Tours endpoints</a>
        - <a href = "https://github. com/AmrMohamed001/natours#create-a-new-tour">Create new Tour
          endpoint</a>
        - <a href = "https://github. com/AmrMohamed001/natours#get-all-tours">Get
          all tours endpoint</a>
        - <a href = "https://github. com/AmrMohamed001/natours#get-a-specific-tour">Get a specific tour
          endpoint</a>
        - <a href = "https://github. com/AmrMohamed001/natours#update-specific-tour">Update a specific
          tour
          endpoint</a>
        - <a href = "https://github./AmrMohamed001/natours#delete-specific-tour">Delete a specifc tour
          endpoint</a>
        - <a href = "https://github. /AmrMohamed001/natours#alising">Alising
          endpoint</a>
        - <a href = "https://github. /AmrMohamed001/natours#get-status">Get
          status endpoint</a>
        - <a href = "https://github. /AmrMohamed001/natours#monthly-plan">Monthly plan
          endpoint</a>
        - <a href = "https://github. /AmrMohamed001/natours#get-within-distance">Get tour within
          Distance</a>
        - <a href = "https://github. /AmrMohamed001/natours#delete-specific-tour">Distance from point to tours</a>

    - <a href = "https://github.com/AmrMohamed001/natours#review-endpoint">Reviews endpoints</a>
        - <a href = "https://github.com/AmrMohamed001/natours#add-a-new-review">Add a new review endpoint</a>
        - <a href = "https://github. com/AmrMohamed001/natours#get-all-reviews">Get all reviews endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#get-a-specific-review">Get a specific review endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#update-a-specific-review">Update a specific review endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#delete-a-specific-review">Delete a specific review endpoint</a>

    - <a href = "https://github.com/AmrMohamed001/natours#bookings-endpoints">Bookings endpoints</a>
        - <a href = "https://github.com/AmrMohamed001/natours#get-all-bookings">Get
          Bookings
          endpoint</a>

        - <a href = "https://github. com/AmrMohamed001/natours#add-booking">add
          Booking
          endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#get-a-specific-booking">Get
          Booking
          endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#update-a-specific-booking">Update
          Booking
          endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#delete-a-specific-booking">Delete
          Bookings
          endpoint</a>
        - <a href = "https://github.com/AmrMohamed001/natours#checkout-booking">Checkout
          endpoint</a>

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


```

## Schemas

### Tours Schema

```Javascript
  name: {
  type: String,
    required: [true, 'name should be specified'],
    unique: true,
    trim: true,
    maxLength: [40, 'name should be lt 40'],
    minLength: [5, 'name should be gt 5'],
},
    slug: {
      type: String,
    },
    
    duration: {
      type: Number,
        required: [true, 'enter the duration'],
    },
    maxGroupSize: {
      type: Number,
        required: [true, 'enter the group size'],
    },
    difficulty: {
      type: String,
        required: [true, 'enter the difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
          message: 'difficulty should be E M D only',
      },
    },
    ratingsAverage: {
      type: Number,
    default: 4.5,
        min: [1, 'ratingsAverage lte 1'],
        max: [6, 'ratingsAverage gte 6'],
    },
    ratingsQuantity: {
      type: Number,
    default: 0,
    },
    price: {
      type: Number,
        required: [true, 'enter the price'],
    },
    priceDiscount: {
      type: Number,
    default: 0.1
    },
    summary: {
      type: String,
        trim: true, //to remove spaces
    },
    description: {
      type: String,
        trim: true,
    },
    imageCover: {
      type: String,
        required: [true, 'enter the cover image'],
    },
    images: {
      type: [String], //  array of strings
    },
    createdAt: {
      type: Date,
    default: Date.now(),
        select: false,
    },
    startDates: [Date],
      secret: Boolean,
      startLocation: {
      //Geo data
      type: {
        type: String,
      default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
        description: String,
        address: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        description: String,
        address: String,
        day: Number,
      },
    ],
      guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: User,
      },
    ],
}
```

### User schema

```Javascript
  {
  name: {
    type: String,
      required: [true, 'enter your name please'],
  },
  photo: {
    type: String,
  default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'guide', 'lead-guide'],
  default: 'user',
  },
  password: {
    type: String,
      minLength: 8,
      required: [true, 'enter password'],
      select: false,
  },
  confirmPassword: {
    type: String,
      required: [true, 'enter confirm password'],
      validate: {
      validator: function (ele) {
        return ele === this.password;
        // ONLY WORK SAVE(), CREATE() NOT REGULAR UPDATE()
      },
      message: 'confirm Password not equal password',
    },
  },
  email: {
    type: String,
      validate: [validator.isEmail, 'enter valid mail'],
      required: [true, 'enter your mail'],
      unique: true,
      lowerCase: true,
  },
  active: {
    type: Boolean,
  default: true,
      select: false,
  },
  passwordChangedAt: Date,
    passwordResetToken: String,
    passwordExpireIn: Date,
}
```

### Review schema

```Javascript
{
  review: {
    type: String,
      required: [true, 'Review can not be empty'],
  },
  rating: {
    type: Number,
      min: 1,
      max: 5//4.666667 => 46.66667 => 47
    // => 4.7
  },
  createAt: {
    type: Date,
  default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
      ref: User,
      required: [true, 'Review must belong to a user'],
  },
  tour: {
    type: mongoose.Schema.ObjectId,
      ref: Tour,
      required: [true, 'Review must belong to a tour'],
  },
}
```
### Bookings schema

```Javascript
  {
  tour: {
    type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'book must belong to a tour'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'book must belong to a user'],
  },
  price: {
    type: Number,
      required: [true, 'book must have price'],
  },
  createdAt: {
    type: Date,
  default: Date.now(),
  },
  paid: {
    type: Boolean,
  default: true,
  }
  }
```
## Endpoints

### Auth endpoints

#### Sign up endpoint

```
POST /api/v1/users/signup
```
- Open endpoint.
- Request body type: form-data.

Request body example:

| Key | Value          |
|----:|----------------|
| name | new user       |
| email | user@email.com |
| password | new password   |
| passwordConfirmation | new pawword    |




#### Log in endpoint

```
POST /api/v1/users/login
```
- Open endpoint.

Request body example:

```json
{
    "email": "user@email.com",
    "password": "new password"
}
```

#### Fortgot password endpoint

```curl
POST /api/v1/users/forget-password
```
- Open endpoint

Request body example:
```json
{
    "email": "user@email.com"
}
```



#### Reset password endpoint

```curl
POST /api/v1/auth/reset-password/:token
```

- Open endpoint

Request body example:

```json
{
    "password": "new password",
    "confirmPassword": "new password"
}
```

### User endpoints

#### Create new user endpoint(Sign up)

```curl
POST /api/v1/users/signup
```

- Allowed to: only admins.
- Request body type: form-data

Request body example:

| Key | Value |
|----:|-------|
| name | new admin |
| email | admin@email.com |
| role | admin |
| password | new password|
| confirmPassword | new password |


#### Get all users

```curl
GET /api/v1/users
```

- Allowed to: only admins


#### Get specific user

```curl
GET /api/v1/users/:id
```
- Allowed to: only admins

#### Update specific logged user data

```curl
PATCH /api/v1/users/updateme
```

- Allowed to:  admins and users
- Request body type: form-data

Request body example:

| Key | Value |
|----:|-------|
| name | updated admin |
| email | admin@email.com |
| photo | user image|

#### Update specific user password

```curl
PATCH /api/v1/users/update-password/
```

- Allowed to:  admins and users

Request body example:

```json
{
    "passwordCurrent": "password",
    "password": "updated password",
    "confirmPassword": "updated password"
}
```

#### Delete specific user

```curl
DELETE /api/v1/users/:id
```
- Allowed to: only admins

#### Get logged user data

```curl
GET /api/v1/users/me
```
- Allowed to: users and admins


#### Delete logged user

```curl
DELETE /api/v1/user/deleteme
```
- Allowed to: users and admins


### Tours endpoints

#### Create new Tour:

```bash
POST /api/v1/tours
```

- Allowed to: only admins.
- Type: form data.


Request body example:

| Key | Value                  |
|----:|------------------------|
|name | new tour               |
|duration| tour duration          |
|maxGroupSize| tour group size        |
|difficulty| difficulty of the tour |
|price| tour price             |
|summary| tour summary           |
|description| tour description       |
|startDates| dates                  |
|startLocation| locations              |
|imageCover| tour image cover       |
|image| tour images            |


#### Get all Tours:

```
GET /api/v1/tours
```

- Open endpoint.
- No authentication is required for this endpoint call.
- Endpoint supports pagination by adding page and size to request query, e.g.
  `/tours?page=1&limit=20`.
- Endpoint support field limiting by adding which fields to return in request query e.g. `/tours?fields=name,image`.
- Endpoint supports filter by adding search keywords to request query, e.g.
  `/tours?filter=user`.
- Endpoint supports sorting by adding a sort method to request query, e.g. `/tours?sort=name`.


#### Get a specific Tour:
```
GET /api/v1/tours/:id
```

- Open endpoint.
- No authentication is required for this endpoint call.


#### Update specific Tour:
```
PATCH /api/v1/tours/:id
```
- Allowed to: only admins.
- Type: form data.

Request body example:

|        Key | Value            |
|-----------:|------------------|
|       name | Tour name        |
|      image | Tour images      |
| imageCover | Tour image cover |


#### Delete specific Tour:
```
DELETE /api/v1/tours/:id
```
- Allowed to: only users.
#### Top-five-cheap Tours:
```
GET /api/v1/top-five-cheap
```
- Allowed to: only users.
#### Get status of Tours:
```
GET /api/v1/tours/get-stats
```
- Allowed to: only users.

#### Get tour within Distance:
```
GET /api/v1/tours/tours-within/:WITHIN/center/:LNGLAT/unit/:UNIT
```
- Allowed to: only users.

#### Distance from point to tours:
```
GET /api/v1/tours/distances/:LNGLAT/unit/:UNIT
```

- Allowed to: only users.




### Reviews endpoints

#### Create a new review

```
POST /api/v1/reviews
```
- Allowed to: only users.
- Type: body.

Request body example:

| Key | Value       |
|----:|-------------|
|review | review body |
|rating| the rating  |


#### Get all reviews:

```
GET /api/v1/reviews
```



#### Get a specific review:

```
GET /api/v1/review/:id
```

#### Update a specific review:

```
PATCH /api/v1/reviews/:id
```

- Allowed to: only users
- Request body type: body

Request body example:

| Key | Value |
|----:|-------|
|review | review body |
|rating| the rating  |


#### Delete a specific review:

```
DELETE /api/v1/reviews/:id
```

- Allowed to: only admins

### Bookings endpoints

#### Create a new booking

```
POST /api/v1/booking
```
- Allowed to: only users.
- Request body type: body

Request body example:

|   Key | Value             |
|------:|-------------------|
| price | new booking price |



#### Get all bookings:

```
GET /api/v1/booking
```


#### Get a specific booking:

```
GET /api/v1/booking/:id
```


#### Update a specific booking

```
PATCH /api/v1/booking/:id
```

- Allowed to: only admins.
- Request body type: body.

Request body example:

|   Key | Value                 |
|------:|-----------------------|
| price | updated booking price |
|  paid | true or false         |


#### Delete a specific booking
```
DELETE /api/v1/booking/:id
```
- Allowed to: only admins.

#### Checkout booking

```
GET /api/v1/booking/checkout-session/:TOURID
```

