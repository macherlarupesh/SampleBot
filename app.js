var restify = require('restify');
var builder = require('botbuilder');
var message = require('botbuilder/lib/Message');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3971, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot and listen to messages
var connector = new builder.ChatConnector({
    appId: 'd93ccbaa-61e7-4c4c-87c2-4be9ffdb730b',
    appPassword: 'XMwqWWgttBHxyBKmTV284yp'
});
server.post('/api/messages', connector.listen())

var DialogLabels = {
    Courses: 'Courses',
    Contact: 'Contact'
};

var bot = new builder.UniversalBot(connector, [
    function (session) {
        // Destination
        // prompt for search option
        builder.Prompts.choice(
            session,
            'Are you looking for..?',
            [DialogLabels.Courses, DialogLabels.Contact],
            {
                maxRetries: 3,
                retryPrompt: 'I cant understand please select either '
            });
    },
    function (session, result) {
        if (!result.response) {
            // exhausted attemps and no selection, start over
            session.send('Ooops! Too many attemps :( But don\'t worry, I\'m handling that exception and you can try again!');
            return session.endDialog();
        }

        // on error, start over
        session.on('error', function (err) {
            session.send('Failed with message: %s', err.message);
            session.endDialog();
        });

        // continue on proper dialog
        var selection = result.response.entity;
        switch (selection) {
            case DialogLabels.Courses:
                return session.beginDialog('courses');
            case DialogLabels.Contact:
                return session.beginDialog('contact');
        }
    }
]);

bot.dialog('courses',require('./courses'));
bot.dialog('contact',require('./contact'))
    .triggerAction({
        matches: [/help/i, /support/i, /problem/i]
    });

server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

// log any bot errors into the console
bot.on('error', function (e) {
    console.log('And error ocurred', e);
});



