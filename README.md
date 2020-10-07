To start this app follow these steps:

1. Install Docker
2. Create a .env file in the server directory whit two variable:
   2a. ACCESS_TOKEN_SECRET "random value"
   2b. INIT_SECRET "random value"

3. Run `make build` from root to build containers
4. Run `make run` from root to run containers with docker-compose

5. Create a .env file in the client directory whit a variable REACT_APP_APP_ENDPOINT pointing to your localhost and port (by default is set to 5000)

G. Open in your browser http://localhost:3000/init and enter the value of the INIT_SECRET
