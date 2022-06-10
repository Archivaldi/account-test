# Auth Demo

----------------

[Heroku Link](https://google-auth-interview.herokuapp.com/)

----------------

Full-Stack Nodejs/React App that allows the user to SignIn/LogIn with email/google account

## Technologies used:

1. Node.js
2. React.js
3. JWT
4. Google Auth API
5. Cloudinary API
6. MySQL (with Sequelize ORM)

## Instructions how to run the application locally: 

* In the root folder run ***npm install***
* Run ***cd client && npm install***
* In the root folder create ***.env*** file
* In .env file you will need to write following variables: 

- DB_NAME (Name of your local mysql database)
- DB_USER (Your Username in your database --in most cases _local_)
- DB_PW (Database password)
- JWT_SECRET (Any randomly generated string)
- JWT_REFRESH_SECRET (Any randomly generated string)
- GOOGLE_CLIENT_ID (Google API)
- CLOUD_NAME (Cloudinary API)
- CLOUD_APIKEY (Cloudinary API)
- CLOUD_SECRET (Cloudinary API)

* create ***.env.local*** file and create the following variable: 
- REACT_APP_GOOGLE_CLIENT_ID (Google API) (The same value as previos GOOGLE_CLIENT_ID)

* in the root folder run ***npm start***
* open another terminal, go to the ***client*** folder and run ***npm start***
* open browser and go to ***localhost:3000***

Your server will run on port 8080
