# ArtWatch

This my source code for the front and backend of my application. The application has now completed its development stage and from now on there will be incremental updates brought to it. Watch this Github repository to be notified of the latest features implemented

##Process for Testing

1. navigate to the ArtWatch folder using your terminal and navigate to `backartwatch` folder
2. type and run the following `npm i` in the `backartwatch` folder
3. Add .env file to this folder with and write the following into your .env file: `ATLAS_URI = <your mongodb atlas URI>`
4. Go back to your terminal and set your JWT signature by typing the following: `export artwatch_jwtPrivateKey=<your key>`
5. Then run `nodemon server.js`. After running this it should display `server running` and `connected to Mongo`
6. Open a new window of your terminal and navigate to `frontartwatch` folder
7. type the following and run `npm i`
8. After npm has installed all the dependencies type and run `npm start` and your computer should start a development and start up the website in your default browser
