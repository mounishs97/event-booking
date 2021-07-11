PreRequistes:

```
* Docker (preferable v20.10.6)
* Docker-Compose (preferable v1.29.2)
* Node (preferable v14.11.0)
* Npm (preferable v6.14.8)
```

###### Note: `node and npm is needed only to build the frontend assets`

Run Steps:

1) Once the project is extracted, navigate to the project folder using cd command.
2) After that give, ```npm install``` to install express server dependencies.
3) Then navigate to frontend folder using ```cd frontend``` and give ```npm install```
4) After installation is completed, give ```npm run build```. Once build is completed, navigate to parent directory.
5) Then run ```docker-compose build``` to build the express-server backend docker image with frontend assets we generated in previous step.
6) Once build process is completed, run the project using ```docker-compose up```
7) Don't terminate the docker-compose up, because that will stop all containers. If you want that thing to run in background give ```docker-compose up -d``` and run in detach mode.
8) Wait for a minute to make sure that all containers are running. 
9) Go to browser and type ```http://localhost:3000```. You can see the events management webpage.

###### Note: `I'm using mongodb in replication mode to support transactions and our docker-compose already contains it. So don't have to worry about database`.

Frontend Points:

1) I have used React JS framework with [react-bootstrap](https://react-bootstrap.github.io/)
2) Used [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) package
3) [React Navigation](https://reactnavigation.org/) package
4) To see the frontend code, go and check in the **frontend** folder

Backend Points:

    1) Used Express, Mongoose packages for the project.

Extra Points:

    1) Incase if you want to seed or pre-populate events data, go to seed/event-seed.js file and update data json object.
    2) Once updated, take latest docker build using docker-compose build command and then run docker-compose up