// how can we sent request to the server from the frontend other than postman 

// till now we used postman and the search bar 

lets say you want to create a HTML page where 

1. you can see the names of 10 peoples 
2. you need to make sure that you get these data from API calls

<------------------------------------------------------------------------------------------->

project for today --> 

let people sign up to your website 
Only allow signed in users to see people (create a dummy people list)

All websites have Auth 

There are complicated ways to do this ( login with google)
easiest way is to use a username and password based auth


Authentication --> mildly hare concept to digest --> token based and cookie based

1. Hashing --> People repeat passwords , 1 way 
2. Encryption --> 2 way
3. Json web tokens --> decode(no password ) and encode and verify
4. Local storage

Assignment for today --> 

A website which has 2 endpoints 
POST /signin 
body {
  username: string
  password: string
}

returns a jwt with username encrypted 


get /users 
Headers --> Authorization: Bearer <token>

returns an array of all users if the user is signed in ( token is valid )
Return 403 status code if not 

jwt 

user gets back a token at every login 
user needs to send the token with every authenticated request


-------------------------------------------------------------------------------------------->

now lets do all the things again but this time we will have a database instance 


assignment.js 

/signup --> register 
/signin --> you are logged in but with a token sended as response
/users --> to see all the users  where we will be sending the headers with the request

steps to mongoose --> 
1. import 
2. connect to the database 
3. create a model --> mongoose.model(<name of the model>, <schema>) and export it 


steps to build signup 

1. collect all the required fields 
2. check if the user provided all the required fields 
3. if yes check if the user already exists
4. if no then create a new user 
5 .hash the password 
6 . generate a token and send it back to the user 
7. display a message to the user that user has been created 


steps to build login

1. collect all the required fields here username and password from the user 
2. if not provide return back and if provide then check if the user exists (Check from something which is unique )
3. if the user exists then check if the password is correct (bcrypt.compare(password, userPassword))
4. If the password matches create and token and send back the token to the user 
5. send the response to the user 


steps to build a protected route 

1. collect the toke from the headers 
2. if token is not provided then return a 403 status code
3. verify the token 
4. if ( username = decode.username ) then return a 200 status code
5. return the response to the user 
6. or else return invalid token

// points to note it is better to send a token during the signin process 