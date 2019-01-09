//JSON configuration is currently hard coded to post to production.  You will need to add the prompted fields.
const requestPromise = require('request-promise-native');
const stationsToImport = require('./stations.json');

let succesCounter = 0;
let failedCounter = 0;

stationsToImport.forEach(station=>{
  const options =  {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'json': true,
    'url': "http://localhost:3000/station",
    'body': station
  };
  requestPromise(options)
  .then(function (response) {
    succesCounter++;
    console.log(`${succesCounter} successful POSTs to /station`);
  })
  .catch(function (err) {
    failedCounter++
    console.log(`ERROR: ${err}`);
    console.log("body: " + station);
    console.log(`${failedCounter} failed`);
      requestPromise(options)
      .then(function (response) {
        succesCounter++;
        console.log(`${succesCounter} successful POSTs to /station`);
      })
      .catch(function (err) {
        failedCounter++
        console.log(`ERROR: ${err}`);
        console.log("body: " + station);
        console.log(`${failedCounter} failed`);
  });
  })
})//end of forEach
