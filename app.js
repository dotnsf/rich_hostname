//.  app.js
var express = require( 'express' ),
    ejs = require( 'ejs' ),
    fs = require( 'fs' ),
    app = express();

var settings = require( './settings' );

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

var settings_color = 'COLOR' in process.env ? process.env.COLOR : settings.color;
var settings_bgcolor = 'BGCOLOR' in process.env ? process.env.BGCOLOR : settings.bgcolor;

app.get( '/', function( req, res ){
  fs.readFile( '/etc/hostname', "utf-8", function( err, text ){
    if( err ){
      if( !settings_color && !settings_bgcolor ){
        res.write( JSON.stringify( err, null, 2 ) );
        res.end();
      }else{
        res.render( 'index', { hostname: JSON.stringify( err, null, 2 ), bgcolor: settings_bgcolor } );
      }
    }else{
      if( !settings_color && !settings_bgcolor ){
        res.write( text );
        res.end();
      }else{
        res.render( 'index', { hostname: text, bgcolor: settings_bgcolor } );
      }
    }
  });
});

var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );
