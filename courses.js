var builder = require('botbuilder');
module.exports = [
    // Destination
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results,next) {
        session.dialogData.destination = results.response;
        session.send('Hello %s!', results.response);
        next();
    },

    function (session) {
        session.send('We offered Full-time and Part-time courses');
        builder.Prompts.text(session,'Please select any one');
    },
    function (session, results, next) {
        session.dialogData.destination = results.response;
        session.send('List of %s courses are..\r\n1.Business & Accountancy, 2.Design & Environment, 3.Health Sciences', results.response);
        next();
     
    },
    
    function (session){
        //session.send('Enter your Course name what you want..');
        builder.Prompts.text(session,'Enter your Course name what you want..');
    },
    function (session, results, next) {
        session.dialogData.destination = results.response;
        session.send('Curriculum of %s is 1.Accountancy(N51), 2.International Trade & Business(N85), 3.Banking & Financial Services(N53) ' 
        +'4.Tourism & Resort Management(N72), 5.Business Studies(N45)	', results.response);
        next();
    },

    function(session){
        session.send('Thank you.. visit again ')
    },
];
