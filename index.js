// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var bodyParser = require('body-parser');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
    console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
    databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
    cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
    appId: process.env.APP_ID || 'myAppId',
    masterKey: process.env.MASTER_KEY || 'myMasterKey', //Add your master key here. Keep it secret!
    serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed

    //**** Email Verification ****//
    /* Enable email verification */
    verifyUserEmails: true,
    /* The public URL of your app * /
    // This will appear in the link that is used to verify email addresses and reset passwords.
    /* Set the mount path as it is in serverURL */
    publicServerURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
    /* This will appear in the subject and body of the emails that are sent */
    appName: process.env.APP_NAME || "Resume Builder 1.0",

    emailAdapter: {
    	module: 'parse-server-simple-mailgun-adapter',
    	options: {
    		fromAddress: process.env.EMAIL_FROM || "test@example.com",
    		domain: process.env.MAILGUN_DOMAIN || "example.com",
    		apiKey: process.env.MAILGUN_API_KEY  || "apikey"
    	}
    }
});

// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Add middlewares to console every request
// logs the response
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

app.use(express.static('public'));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
