// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const path = require('path');
var multer  = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
  //Config saved folder
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'upload'));
  },
  //Config file name in server
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now());
  }
})

//Upload handle
var upload = multer({ storage })

server.use(middlewares)



server.post('/datasets', upload.single('file'), function (req, res) {
  //Chua thong tin file req.request
  console.log(req.file, req.body)
  console.log(req.file.filename);
  //doc file roi day vao data base.
  //Ghi data vao db nhung lai ko lay duoc data => Y tuong la thu cach khac de ghi vao db, va 1 cach nua doc truc tiep file
  mock_status = "PROCESSING"
  var d = new Date()
  mock_job_id = d.getTime()
  mock_response_json = {
    "request": {
      "params": {
        "start_time": "2016-11-11T00:00:00Z",
        "end_time": "2016-11-14T00:00:00Z"
      }
    },
    "data_type": "job",
    "data": {
      "start_time": "2016-11-11T00:00:00Z",
      "url": null,
      "id_str": mock_job_id.toString(),
      "account_id": req.params.account_id,
      "status": mock_status,
      "created_at": "2016-11-15T00:00:16Z"
    }
  }

  var file = fs.readFileSync('db.json')
  var json = JSON.parse(file);

  var job = {
      "start_time": "2016-11-11T00:00:00Z",
      "url": null,
      "id_str": mock_job_id.toString(),
      "account_id": req.params.account_id,
      "status": mock_status,
      "created_at": "2016-11-15T00:00:16Z"
    }

  // json["jobs"] = [] //初期化
  json["datasets"].push({id_str: mock_job_id, res: job })
  fs.writeFileSync('db.json',JSON.stringify(json));
  res.jsonp(mock_response_json)
});

// Add custom routes before JSON Server router
server.post('/jobs/:account_id', function(req,res){
  console.log('posted job')
  // console.dir(req.params)
  mock_status = "PROCESSING"
  var d = new Date()
  mock_job_id = d.getTime()
  mock_response_json = {
    "request": {
      "params": {
        "start_time": "2016-11-11T00:00:00Z",
        "end_time": "2016-11-14T00:00:00Z"
      }
    },
    "data_type": "job",
    "data": {
      "start_time": "2016-11-11T00:00:00Z",
      "url": null,
      "id_str": mock_job_id.toString(),
      "account_id": req.params.account_id,
      "status": mock_status,
      "created_at": "2016-11-15T00:00:16Z"
    }
  }

  var file = fs.readFileSync('db.json')
  var json = JSON.parse(file);

  var job = {
      "start_time": "2016-11-11T00:00:00Z",
      "url": null,
      "id_str": mock_job_id.toString(),
      "account_id": req.params.account_id,
      "status": mock_status,
      "created_at": "2016-11-15T00:00:16Z"
    }

  // json["jobs"] = [] //初期化
  json["jobs"].push({id_str: mock_job_id, res: job })
  fs.writeFileSync('db.json',JSON.stringify(json));

  res.jsonp(mock_response_json)
})

//server.use(upload.any())
server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running')
})