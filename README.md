# AngularSampleProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.3 and Node version 8.9.4 and npm version 5.6.0.

## Development server
Navigate to project i.e. `angular-sample-project` and go to terminal and run `npm install` which will install all the dependencies listed in package.json file of the project.

Run `npm run json-server` and wait for json server to start. Once the json-server is up run `npm run start` for an angular dev server. Navigate to `https://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests with code coverage and automatic watch of code change at run time via [Karma](https://karma-runner.github.io).
Code coverage for the project is 100% with respect to Statements, Branches, Functions and Lines.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## User Login
Credentials are as below.
username : `azad.pal@sc.com`
password: `abc123`

Make sure, you are connected to internet while running the application as for authentication api - `https://reqres.in/api/` has been used. For registration and 
display of records in table post-login, json-server has been used which is watching file db.json placed directly under folder `angular-sample project`. Once registration 
for a user is completed, then an entry for that user will be added to db.json which can be updated or deleted from user table shown post-login.

The api `https://reqres.in/api/` which is used for authentication does not throw any error on providing wrong credentials that is why credentials have been hardcoded at 
front end itself to check on error if wrong credentials are entered.

## User Registration
Once on the login page of the application, click on `Sign Up` hyperlink at the top of the login box to go to user registration. The user registration contains four fields -
First Name - only alphabets, must start with capital letter with no special characters.
Last Name - only alphabets, must start with capital letter with no special characters.
username - must be an email.
password - alphanumeric with no special characters.

## User table update
Once logged in successfully, a table with users' records will be displayed with `Userlist` quick link being active at the left side of the screen. Table will display 
four columns - Profile Picture, First Name, Last Name and Edit/ Delete with input field at the top of the table to filter the data. Table data can be sorted by `First Name` and 
`Last Name` columns by clicking the respective column head.
Each table row will have edit and delete icon.

Table has pagination given at the bottom which can be used to navigate through the different pages of the table.

Click on edit icon will result in expansion of the row with a UI form where `First Name` and `Last Name` can be edited.
First Name - only alphabets, must start with capital letter with no special characters.
Last Name - only alphabets, must start with capital letter with no special characters.
Once form is submitted, table with reflect the changes automatically.

Click on delete icon will delete the the particular row immediately and table will reflect the changes automatically.

## User Home page - post-login
When clicked `Home` quick link at left side of the page, User table will disappear and only welcome message will be shown which can be modified accordingly.

## User Logout
When clicked `Logout`, user will be logged out and taken to login page.

## Note
The UIs developed are fully responsive and adaptive to any screen size and fit well to mobile screens as well.
There is authentication guard implemented, which does not allow navigation to post-login page without successful login.

## Known Issue
While deleting items from user table, json server is firing the delete request twice for a particular id.
