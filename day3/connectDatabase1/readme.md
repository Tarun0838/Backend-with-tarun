
# What is Middleware 

* # middlewareka simple matlab hota hai " like koi kaam karne ja rehe ho to uss kaam ko karne se phele mere se milte hue jaana " ye middleware hota hai 


* middleware is nothing but ek checking code hota hai jo execute or run hota hai req and response ke bich mai 

* jab client request karta hai server se e.g instagram.com/chat 
* toh server response send karne se phele check karta hai ki 
jo request aayi hai vo cabale hai ya nhi response lene keliye 
*  i.e : response send krne se phele middle ware check karega ki clint logges IN hai ya nhi instagram.com par 
* if yes then response send kar dega nhi jo error de dega



# Higher Order Function 

* higher order function vo function hote hai jo ek function ko as a paramerter accept kar sakte hai and unko return or execute bhi kar sakte hai such function are known as Higher order function 




# Custom error handling or show 

*  ✅ Normal Error (kam information):
throw new Error("User nahi mila");
 Sirf message hai, kuch extra nahi

*  ✅ Custom AppError (zyada information):
throw new AppError("User nahi mila", 404, "NOT_FOUND");
 * ✅ Message
 * ✅ HTTP Code (404)
 * ✅ Error Type (NOT_FOUND)
 * ✅ Timestamp (kab hua)