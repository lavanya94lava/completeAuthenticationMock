
Complete Authentication Starting Mock
===========================

A complete starter code for authentication using passport, which can be embedded in any application.

Setting Up The Project 
----------------------
1. Clone or Download the Repo using https://github.com/lavanya94lava/completeAuthenticationMock.

2. Set up your directory structure to point to current folder.

3. Put your gmail credentials in "config/nodemailer.js"

4. use npm start to start your application. 



Tools and Libraries used
---------------
Project has been set up using Model, View, and Controller Approach.

1. Passport, both passport local and passport google Oauth were used.

2. for recaptcha, express-captcha version 2 was used.

3. for sending out emails, we used nodemailer using npm install.

4. mongoose was used for connecting to our Mongo Database.

5. We used flash messages to inform user about the proceedings of the actions, we used it along with the combination of NOTY.

6. Bootstrap was used for beautification of the pages.

7. EJS was used for rendering dynamic data from our controllers.


Routes
-------

1. Homepage : `http://localhost:8000/`

2. Sign Up : `http://localhost:8000/users/sign-up`

3. Sign In : `http://localhost:8000/users/sign-in`

4. Sign out : `http://localhost:8000/users/sign-out`

5. Forgot Password : `http://localhost:8000/users/forgot-password`

6. Reset PassWord : `http://localhost:8000/users/reset-password/:token`