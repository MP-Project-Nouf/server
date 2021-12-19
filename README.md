# Coding challenge
This is a site where those interested in programming can select the programming language they are interested in, make programming challenges and get points.

# Heroku:
Heroku Link:
While running locally:

# Trello:
Trello Link :[trello](https://trello.com/b/yelGfTJ9/teaching-weekly-planning)

# slides
presentation slides Link :[prezi](https://prezi.com/p/edit/4wyaz0nyy0v7/)


# Getting Started
Base URL: This application can be run locally on the http:/localhost:5000.
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


# Error Handling
Errors are returned as JSON objects depend on the error.

The API will return two error types when requests fail:

* 400: Bad Request
* 403: Forbidden
* 404: Not Found

# API Reference
HTTP Method   | authorize     |    Path                                |  Request Body
------------- | -----------   | ---------------------------            |----------------------
get          | admin      |`/allchallenge`                          |{idToken.roleToken}
POST          | guest      |`/register`                             |{firstName,lastName,email,userName,phone,password}
post           | guest    |`/signin`                                |{name,password}
get        | guest    |`/confirmEmail/:email/:rand`                    |
GET           | guest      |`/resendLink`      |
post           | user      |`/forgit`                  |{email}
PUT           | user      |`/changepass`                   |{email,rand password}
GET           | user    |`/leaderbord`                           |{idToken}
GET          | user      |`/user/:id`                     |{idToken}
DELETE           | admin + user  |`/account`                               |{idToken.roleToken}
POST           | admin + user  |`/likes/:onPost`                        |
POST          |  user  |`/interst`                       |{interest}{idToken}
PUT           |  user  |`/favoritLang`                       |{expertise}{idToken}
PUT        |  user  |`/personalWeb`                  |{website}{idToken}
PUT           |  user  |`/stackflow`                               |{stackflow}{idToken}
PUT           |  user  |`/github`             |{github}{idToken}
PUT          |  user  |`/email`                   |{email}{idToken}
PUT          |  user  |`/phone`                         |{phone}{idToken}
PUT           |  user  |`/personalInfo`               |{parthDate,country,city,nationality,sex,imployeeState}{idToken}
PUT        |  user  |`/accountInfo`                    |{image,firstName,lastName,userName}{idToken}
POST           |  user  |`/favoritLang`                         |{lang,expertise}{idToken}
delete           |  user  |`/favoritLang`                         |{lang}{idToken}
post           |  user  |`/education`                         |{level,college,speciall,enrollment,graduation}{idToken}
DELETE           |  user  |`/education`                         |{level}{idToken}
post           |  user  |`/traning`                         |{center,certificate,begining,end}{idToken}
DELETE           |  user  |`/training`                         |{certificate}{idToken}
DELETE           |  user  |`/interest`                         |{interest}{idToken}
GET           |  user  |`/challenges/:userId`                         |{idToken}
GET           |  user  |`/oneChallenge/:id`                         |{idToken}
POST           |  user poin>500,admin  |`/challenge`                         |{kind,title,disc,point,input,output}{idToken}
GET           |  admin  |`/allChallenges`                         |
PUT           |  admin  |`/challenge`                         |{kind,title,disc,point,input,output}{idToken}
DELETE           |  admin  |`/challenge/:id`                         |
PUT           |  admin  |`/confirmChallenge/:id`                         |
GET           |  user  |`/challengelevel/:level`                         |{idToken}
GET           |  user  |`/userSolution/:userId`                         |{idToken}
GET           |  user  |`/solution/:challId`                         |{idToken}
POST           |  user   |`/solution`                         |{solution,chall,lang,level}{idToken}
POST           |  user   |`/comment`                         |{image,username,date,disc,challengeId,userId}{idToken}
GET           |  user  |`/comment/challId`                         |{idToken}
DELETE           |  user+admin  |`/comment/:Id`                     |{idToken.roleToken}
DELETE           |  user+admin  |`/account/:userId`                     |{idToken.roleToken}

# Models
- user model

| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| image      | String          |                  | n/a           |
| firstName  | String          | required         | n/a           |
| lastName   | String          | required         | n/a           |
| userName   | String          | required  uniq   | n/a           |
| email      | String          | required  uniq   | n/a           |
| password   | String          | required         | n/a           |
| pirth      |date             |                  | n/a           |
| country    | String          |                  | n/a           |
| city       | String          |                  | n/a           |
|natinalality| String          |                  | n/a           |
| sex        | String          |                  | n/a           |
| status     | String          |                  | n/a           |
| roles      | Schema <roles>  | required         | n/a           |
| githup     | string          |                  | n/a           |
| stack      | string          |                  | n/a           |
| website    | string          |                  | n/a           |
| twitter    | string          |                  | n/a           |
| linkedin   | String          |                  | n/a           |
| favLang    | Array           |                  | n/a           |
| education  | Array           |                  | n/a           |
| training   | Array           |                  | n/a           |
| interest   | Array           |                  | n/a           |
| isdeleted  | Boolean         |                  | false         |
| isactive   | Boolean         |                  | false         |
| totalpoint | Number          |                  | 10            |
| level      | Number          |                  | n/a           |

- roles model

| key  | type   | options          | default value |
| ---- | ------ | ---------------- | ------------- |
| role | String | required | n/a           |
| permision | Array | required | n/a           |

- comments model

| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| username    | string          | required | n/a           |
| image       | string          |          | n/a           |
| user        | Schema <user>   | required | n/a           |
| desc        | String          | required | n/a           |
| challenge   |Schema<challeng> | required | n/a           |
| date        | Date            | required | new date      |

- solution model

| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| soulution   | string          | required | n/a           |
| lang        | string          |          | n/a           |
| user        | Schema <user>   | required | n/a           |
| kind        | String          | required | n/a           |
| challenge   |Schema<challeng> | required | n/a           |
| date        | Date            | required | new date      |

- challenge model

| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| kind        | string          | required | n/a           |
| title       | string          |          | n/a           |
| user        | Schema <user>   | required | n/a           |
| disc        | String          | required | n/a           |
| point       | Number          | required | n/a           |
| level       | Number          | required | n/a           |
| input       | Array           | required | n/a           |
| output      | Array           | required | n/a           |
| active      | Boolean         | required | false         |







# Entity Relationship Diagram

![daigrame-Backend img](https://github.com/MP-Project-Nouf/server/blob/main/daigrame-Backend.png)


# UML

![uml-Backend%20(1) img](https://github.com/MP-Project-Nouf/server/blob/main/uml-Backend%20(1).png)

