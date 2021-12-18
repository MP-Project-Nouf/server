# Coding challenge
This is a site where those interested in programming can select the programming language they are interested in, make programming challenges and get points.

Heroku Link:
While running locally:

# Getting Started
## Installing Dependencies

### Node js
Follow instructions to install the latest version of Node js for your platform in the [ Node js docs](https://nodejs.org/en/)

### NPM Dependencies
Once you have the project in your local machine, install dependencies by running:
```
 npm install
  ```
  This will install all of the required packages.
### Key Dependencies
* [ Express](https://nodejs.org/en/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [ mongoose ](https://mongoosejs.com/) is an elegant mongodb object modeling for node.js.
*  [ cors ](https://www.npmjs.com/package/cors) is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
* [ morgan ](https://www.npmjs.com/package/morgan) is a HTTP request logger middleware for node.js
* [ bcrypt ](https://www.npmjs.com/package/bcrypt) is a A library to help you hash passwords.
* [ jsonwebtoken ](https://www.npmjs.com/package/jsonwebtoken) is a JSON Web Token implementation (symmetric and asymmetric)
* [ dotenv ](https://www.npmjs.com/package/dotenv)  is a zero-dependency module that loads environment variables from a .env file into process.env.
* [ nodemailer ](https://www.npmjs.com/package/nodemailer) is a module for Node.js applications to allow easy as cake email sending. 

### Setting up the variables
You have to set up some variables in the ```.env``` file, for the app to run properly:
```
PORT=5000
DB_URL=`Your MongoDB DB URL`
SALT=`Your SALT here`
SECRET_KEY=`Your SECRET KEY here`
USER=your email id
PASS=your password
SERVICE=gmail
GOOGLE_CLIENT_ID=your clint id
GOOGLE_CLIENT_SECRET=your clint secret
```

## Running the server
To run the server, execute:
```
npm run dev
```
For running the server in development mode, and execute:
```
npm run start
```
To run the server on production mode.

# Getting Started
Base URL: This application can be run locally on the http:/localhost:5000.
# Error Handling
Errors are returned as JSON objects depend on the error.

The API will return two error types when requests fail:

* 400: Bad Request
* 403: Forbidden
* 404: Not Found

# API Reference
HTTP Method   | authorize     |    Path                                |  Request Body
------------- | -----------   | ---------------------------            |----------------------
POST          | everyone      |`/user/create`                          |{email, password, role}
POST          | everyone      |`/user/log`                             |{email, password}
GET           | admin only    |`/user/`                                |
DELETE        | admin only    |`/user/`                                |
GET           | everyone      |`/user/confirmation/:email/:token`      |
PUT           | everyone      |`/user/forgetPassword`                  |{email}
PUT           | everyone      |`/user/resetPassword`                   |{resetLink, newPassword}
GET           | user+admin    |`/user/:_id”`                           |
POST          | everyone      |`/user/googlelogin`                     |{idToken}
PUT           | admin + user  |`/likes/`                               |{by, onPost}
GET           | admin + user  |`/likes/:onPost`                        |
POST          | admin + user  |`/comment/create`                       |{title, by, onPost}
PUT           | admin + user  |`/comment/update`                       |{id, title}
DELETE        | admin + user  |`/comment/delete/:_id`                  |
GET           | admin + user  |`/posts/`                               |
GET           | admin + user  |`/posts/userPost/:postedBy`             |
GET           | admin + user  |`/posts/onePost/:_id`                   |
POST          | admin + user  |`/posts/create`                         |{img, describe, postedBy}
PUT           | admin + user  |`/posts/archivePost/:_id`               |{id}
DELETE        | admin + user  |`/posts/delete/:_id`                    |
PUT           | admin + user  |`/posts/update`                         |{id, newdescribe}

# components
* home
* profile
* challenges
* challenge
* comments
* solutions
* signin
* register
* forgit
* users


# Entity Relationship Diagram

![Untitled%20Diagram-db.drawio img](https://github.com/Nouf112233/masterproject-backend/blob/main/Untitled%20Diagram-db.drawio.png)


# UML

![uml-backend img](https://github.com/Nouf112233/masterproject-backend/blob/main/uml-backend.png)

