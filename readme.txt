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