Group 22
Student names and numbers: Charles Klijnman (5995272), Raoul Alam (7538839), Faun Snelder (4923464)
http://webtech.science.uu.nl/group22/index.html
Description:
Our website is a burger delivery service. People can order burgers/meals/drinks/sides online through this web applications. (inspiration and images: burgerbar.nl)  The dishes are stored in our database.db. As well as the user login credentials, orders, adresses, carts etc. 
Passwords are stored encrypted (using bcrypt) in our database making it more secure. Below a short description of the files:
HTML:
index.html (Homepage)
menu.html (menu page created through menu.js, containing all dishes that can be ordered online)
about.html (short description of who we are as a burger selling company)
cart.html (cart page to handle orders)
jobs.html (For people looking to work at our burgerbar)
contact.html (contact page)
login.html (Register and login page)
user.html (users dashboard after login)
orderhistory.html (supposed to contain users order history)
dishform.html (build to add dishes and users, can be done through login/register page as well, dishes were also added through the use of SQLiteStudio)
JS:
main.js (main application)
database.js (database script file, SQL definition of our database)
cart.js (to run the cart (as aside))
header.js (to generate header)
login.js (login handler)
menu.js (gets dishes from database.db and shows them on menu.html)
router > api_router

public > src > fonts (contains fonts used)
public > src > images (contains all images used on webapp)

database structure:
TABLES
addresses:id,country,city,postalcode,street,number
cartdishes:id,quantity,cart_id,dish_id
carts:id,user_id
dishes:id,name,price,img,description,category
orderdishes:id,quantity,order_id,dish_id
orders:id,user_id,total,datetime,addresses
reviews:id,user_id,dish_id,datetime,rating,review
users:id,email,name,password,addresses
SQL definition of your database





