# Auth Demo

----------------

[Heroku Link](https://google-auth-interview.herokuapp.com/)

----------------

Full-Stack Nodejs/React App that allows the user to SignIn/LogIn with email/google account: 
- jwt access token is vallid for 10 seconds
- jwt refresh token is set and passed through cookie with "httpOnly" flag which makes it unaccessible by the browser. The refresh token is valid for 24 hours
- the access token is refreshed automatically by axios interceptions which makes the login to be persisted after the page was closed or reloaded
- the email and password are validated on the client side and on the server side by the database
- the ui is responsive for all screen sizes
- you can use Google Account to sign up and log in
- heroku doesn't allow to upload pictures on the server. The cloudinary api was used for that matter
- the password is saved in the database as a encrypted hash created by bcrypt npm package

## Technologies used:

1. Node.js
2. React.js
3. JWT
4. Google Auth API
5. Cloudinary API
6. MySQL (with Sequelize ORM)

## Instructions how to run the application locally: 

1. In the root folder run ***npm install***
2. Run ***cd client && npm install***
3. In the root folder create ***.env*** file
4. In .env file you will need to write following variables: 

- DB_NAME (Name of your local mysql database)
- DB_USER (Your Username in your database --in most cases _local_)
- DB_PW (Database password)
- JWT_SECRET (Any randomly generated string)
- JWT_REFRESH_SECRET (Any randomly generated string)
- GOOGLE_CLIENT_ID (Google API)
- CLOUD_NAME (Cloudinary API)
- CLOUD_APIKEY (Cloudinary API)
- CLOUD_SECRET (Cloudinary API)

5. create ***.env.local*** file and create the following variable: 
- REACT_APP_GOOGLE_CLIENT_ID (Google API) (The same value as previos GOOGLE_CLIENT_ID)

6. in the root folder run ***npm start***
7. open another terminal, go to the ***client*** folder and run ***npm start***
8. open browser and go to ***localhost:3000***

Your server will run on port 8080
