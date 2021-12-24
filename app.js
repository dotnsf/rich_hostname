//.  app.js
var express = require( 'express' ),
    ejs = require( 'ejs' ),
    fs = require( 'fs' ),
    app = express();

var settings = require( './settings' );

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

var settings_bgcolor = 'BGCOLOR' in process.env ? process.env.BGCOLOR : settings.bgcolor;

app.get( '/', function( req, res ){
  fs.readFile( '/etc/hostname', "utf-8", function( err, text ){
    if( err ){
      res.render( 'index', { hostname: err, bgcolor: settings_bgcolor } );
    }else{
      res.render( 'index', { hostname: text, bgcolor: settings_bgcolor } );
    }
  });
});

var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );
