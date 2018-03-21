var kue = require('kue'),
  jobs = kue.createQueue(),
  fs = require('fs');

var pathFile = './tmp/';

function newJob (name){
  name = name || 'Default_Name';
  var job = jobs.create('new job', {
    name: name,
  });

  job
    .on('complete', function (){
      console.log('Job', job.id, 'with name', job.data.name, 'is done');
    })
    .on('failed', function (){
      console.log('Job', job.id, 'with name', job.data.name, 'has failed');
    });

  job.save();
}

jobs.process('new job', function (job, done){
  /* carry out all the job function here */
  // write your customer worker code in below
  fs.createWriteStream(pathFile + job.id + '.txt');
  done && done();
});


setInterval(function (){
  newJob('Send_Email');
}, 3000);
