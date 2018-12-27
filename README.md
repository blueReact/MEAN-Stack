# MEAN-STACK
### I am developing my own MEAN stack which I would like to use for faster and consistent application development in my day-to-day life. 

It is a collection of 4 major technologies as listed below:

* [ MongoDB ](https://www.mongodb.com/) - MongoDB is the leading NoSQL database, empowering businesses to be more agile and scalable
* [ Express ](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [ AngularJS ](https://angularjs.org/) - based framework. AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop.
* [ NodeJS ](https://nodejs.org/en/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine for easily building fast, scalable web and network applications.

# Pre-Requisites
* Download and Install mongodb
    * [ OSX MongoDB ](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
    * [ Windows Mongodb ](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

* [ Download and Install Node.js ](https://nodejs.org/en/)

# Getting Started
### Start in just 4 simple steps!

##### Get the latest snapshot
git clone https://github.com/roycodeman/MEAN-Stack

##### Change directory
cd MEAN-Stack

##### Install NPM dependencies
npm install

##### Start up the server
npm start
##### or
node index.js || node index


# Style Guides and References
* [ Johnpapa Angularjs Styleguide ](https://github.com/johnpapa/angular-styleguide/tree/master/a1)
* [ Angularjs ](https://angularjs.org/)
* [ NodeJS v10 ](https://github.com/nodejs/Release#lts_schedule)
* [ ExpressJS 4 ](https://expressjs.com/en/4x/api.html)
* [ MongoDB v4 ](https://www.mongodb.com/download-center/community)


# Custom Build Tools for production
### One of the major enhancement post development & testing is to minify the codebase. Well this is boring, stressful and demoralizing task. But despite saying this, it must and should be executed. One of the main reasons being getting higher application performance and to uglify the codebase. So to make my life little simple; I have built my own JS minifier. 

*[ JS minifier ](https://github.com/roycodeman/minifier)

##### To run minification of the client side JS
npm run minify
