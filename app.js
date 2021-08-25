var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config.js');
var routes = require('./routes/index');
var nft = require('./routes/nft');

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

//var User= require('./models/user');
// app.use(passport.initialize());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use('/', routes);
app.use('/nft', nft);


app.post('/authTest' , function(req,res){

console.log(req.headers);

res.send('done');
	

});

app.post('/tikcet', function(req,res){
  var ticket = req.body;
  console.log(ticket);
  var text = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGhvbmUiOiJpbml0IiwicGFzc3dvcmQiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfX3YiOiJpbml0IiwidXNlcm5hbWUiOiJpbml0IiwiYWRkcmVzcyI6ImluaXQiLCJsaWNlbmNlIjoiaW5pdCIsImhhc2giOiJpbml0Iiwic2FsdCI6ImluaXQiLCJjcmVhdGVkQXQiOiJpbml0IiwidXBkYXRlZEF0IjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwidXNlcm5hbWUiOnRydWUsImFkZHJlc3MiOnRydWUsImxpY2VuY2UiOnRydWUsInBob25lIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwibmFtZSI6dHJ1ZSwiaGFzaCI6dHJ1ZSwic2FsdCI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfX3YiOjAsInVzZXJuYW1lIjoiMTIzNDU2Nzg5MCIsImFkZHJlc3MiOiJOZXcgU2luZ2ggTWVkaWNhbCBTdG9yZXMiLCJsaWNlbmNlIjoiNTUiLCJwaG9uZSI6MTIzNDU2Nzg5MCwicGFzc3dvcmQiOiIxMjM0NTYiLCJuYW1lIjoiQXJ1biBLdW1hciBTaW5naCIsImhhc2giOiJiYzIzMDk5NmZiMjgxOTBjMDdiZTZmM2RhN2JkYWYwOWY4MmVmZjQzN2ZkNjNmOTRhOWJmMTUxOWNkMGIxOTIyOGFiYjcyMGExOTNkZGYwMzg4NTQ1OTY1MTlhOWYyNDZlYThhNjczMzg4ODZmYWE3NWE5NGM5MDI3YmRlYzhjOGM0ODIzZmNjZTZlNjMzZTVlZjcwYWNkNTgyZjUwNmNmMTllOTA2N2QzMWMzMmJkZjFhMDAxYmQxOWU2YWFkNTUxY2EyYWJiNjllMjNiZGY3YjYwNDI0ZjFlMWQ4MTM1MmQ0MzkyZmViMDhmMGEyOTA2Mjg0ZDI0MDU1Njg5MGM5ZWFlZTA3YjFhY2QwZDBlZWIzMWUwMmI4ZmVjYTRhNzJiMjNhZGRkN2NiYmJhYTJkNTY1MjBmMGE0NTkzMDcwZTcxNTY5MzFmMGNmZTYxNGFjM2E3ZmE0NDE4YTBkZjc5ZTU1ODUzNDgwYzA3MDc2NWM3ZDE1YjdhMmEyNjJlYWQxNjU4NGRhOTkyYzMzMThmMTc4YThkZTM1MTE4Njc2MTc0NTY4ZDZjYjhkYTQ3MTE0NTZhZjRmOTM3ODdkOGE1ODBhMjZlMDU3OTFhYmRiZjMyMDkyNTM0Y2YwMzc3Y2I5MGU4ODAwYTJlNjg4YTRiNTlhM2JkOTJjYmZlY2I1NTRhNzI3NTI2ZjhkNDUzZDE1MzdjMzk1MWEzOGM5NTMwMTAwMWE1ZDU3ZGVhOWMzNTBjMzBmNjI2ODNhNWE3ZjdiNjZkZWI2YTM0NjgyMzA5ZTdkYzVlYmY4ZWRlNGVkMTc4N2FmYTcxNjFkZGM2MmI4NGU5ODQyNDRiMDVmNjJhMWYyOWRkZDhjNGNiODZjOGE3ZDljOTkyNjIwZDBhNDQ1MmQxYmE0NDE0ZTZlNGRjMTc3ZWI4NDRhOWI4MmJjZjNlOTQ0ZGJiOWZhMDE2YTU5Njk3MGExZjNjMjAzZTZlYzJiN2QxZTQ0ZjQ4YzM2MGI1NTllOTgwNTExMzcyMDFmNWQxZjIyNTk4YjFmYmExYTNmZmUwODQwMWYzNmQzZTY1ODAxYTIzZGM5YzM0YWM5M2EwNmIwNTE1ZTJlNmI1YjlmMjlmNGRkMzNhZjI1YzcwNDJiZWM4NTlmMmRmYTFlMTRmNzYxZmJmMGE1Mjc2MTI5OWMxZDhjZDUxMTliYWM3ZDA5YTEzMzhhMGMwZWQ5YjA3YzdkNjk1NTZiNjZkNDk1ODMxNTY2YzM5NzViYWUxYWJmODc1ZDZkM2ZkNjlkMzEwYjg2NTk1Y2M4YWQwNjJiZWE4ZTYyZmE3NzllNTVjZDMxMjhlZTNkYWMyNDMxMGFiNWI0MDBmN2RmNzkzIiwic2FsdCI6Ijc2MTI1MjUyNTk4N2ZjODgwOGUwM2I3ODBiMzM0ZmZmZTA3YThjN2RhNzlmMzk4ZmU2ZmY0MTBkMjM5OWY2MmUiLCJjcmVhdGVkQXQiOiIyMDE2LTEwLTI2VDEwOjE0OjM0LjgyOVoiLCJ1cGRhdGVkQXQiOiIyMDE2LTEwLTI2VDEwOjE0OjM0LjgyOVoiLCJfaWQiOiI1ODEwODIwYTZlNThkYTE0YjhiYjAzNTQifSwiX3ByZXMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W251bGwsbnVsbCxudWxsLG51bGxdLCIkX19vcmlnaW5hbF92YWxpZGF0ZSI6W251bGxdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltdfSwiaWF0IjoxNDc3NDc3NjQ3LCJleHAiOjE0Nzc0ODEyNDd9.dlKtpv12yfdY-a62qNRnYZqU9hIujKLyFtLkpWc6Vyc";
  res.send(text);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
