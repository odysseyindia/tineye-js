var   express 	  = require('express');
var   cors        = require('cors');
var   bodyParser 	= require('body-parser');
const mkdirp      = require('mkdirp');
const fs 			    = require('fs'); 
var   getDirName  = require('path').dirname;
const yaml 			  = require('js-yaml');
const readline    = require('readline');
var   app 			  = express(); 
const port        = 1314;

require('dotenv').config();
// console.log( process.env );

const dir         = process.env.TINEYE_PATH+"/tineye-js";
const deleted     = process.env.TINEYE_PATH+"/tineye-js/static/deleted/";

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1313');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   res.setHeader('Access-Control-Allow-Credentials', true);
   res.setHeader('Content-Type', 'application/json');
   next();
});

app.post('/tineye',function (req, res) {

  var request = JSON.parse(req.body.data);
  var reqfile = request.file;
  var file    = dir+"/"+reqfile.substring(0,reqfile.length-4) + ".tineye";
  var output  = {};
 
  // console.log("Writing data "+reqfile);
  // see tineye.com for sandbox testing details  

  var TinEye  = require('tineye-api');
  var params  = {offset: 0, limit: 10, sort: "score", order: "desc", tags: "stock"};
  var api     = new TinEye('https://api.tineye.com/rest/', process.env.TINEYE_PUBLIC_KEY, process.env.TINEYE_PRIVATE_KEY );
  var img     = fs.readFileSync( dir + "/" + request.file );

  api.searchData(img, params)
  .then(
    function (response) {
      output = yaml.dump(response);
      fs.writeFileSync(file, yaml.dump(response), 'utf8', (err) => {       
        if (err) throw err; 
        // break the textblock into an array of lines
        var lines = rl.split('\n');
        // remove one line, starting at the first position
        lines.splice(0,1);
        // join the array back into a single string
        var newtext = lines.join('\n');
        console.log(newtext);
        fs.writeFileSync('images.txt', newtext, 'utf8', (err) => {  
           if (err) throw err; 
        });
      }); 
      // console.table(output);
    }
  )
  .catch(
    function (error) {
      output = error;
      console.log(error);
    }
  )
  console.log("TinEye report created for ",reqfile);
  res.end();
});

app.post('/delete',function (req, res) {

  var request  = JSON.parse(req.body.data);
  var from     = dir +"/"+ request.file;
  var tofile   = request.file ;
  var to       = deleted + tofile.split("/").pop();
  var tinfile  = from.substring(0,from.length-4) + ".tineye";

  fs.rename(from, to, function (err) {
    if(err) throw err;
    console.log('Successfully moved ', to);
    fs.unlink(tinfile, (err) => {
      if (err) throw err
      console.error(err);
    })
  })
});


app.post('/falsepos',function (req, res) {

  var request  = JSON.parse(req.body.data);
  var from     = dir+request.file;
  var file     = from.substring(0,from.length-4) + ".tineye";

  try {
   var fileContents = fs.readFileSync(file, 'utf8', (err) => {       
     if (err) throw err; }) 
  } 
  catch (error) {
    console.log('Route falsepos reading: ' + error.message);
  } 

  try {
    // var data = yaml.loadAll(fileContents);
    // data[0].stats.positive = false;

    var data = fileContents.toString().split("\n");
    var lineNumber = 8;
    data.splice(lineNumber, 0, "  positive: false");
    var output = data.join("\n");

    //var output = yaml.dump(data, {
    //  'indent': 0,
    //  'noArrayIndent': true,
    //  'lineWidth': -1,
    //});

    fs.writeFileSync(file, output, 'utf8', (err) => {       
      if (err) throw err;  }) 
      console.log('False positive added: ',file);
  } 
  catch (error) {
    console.log('Route falsepos writing: ' + error.message);
  } 
  res.end();
});


app.get('/', function(req, res){ 
  res.send({ title: 'Welcome to TinEye',test:'Success, the server is running' }); 
}); 

app.listen(port, function(err){ 
  if (err) console.log(err); 
  console.log("Server listening on port ", port); 
}); 