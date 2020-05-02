//JSON configuration is currently hard coded to post to production.  You will need to add the prompted fields.
const requestPromise = require('request-promise-native');
const stationsToImport = require('./stations.json');

let succesCounter = 0;
let failedCounter = 0;

stationsToImport.forEach(station=>{

  //Java app doesn't currently like nest objects
  station.location = JSON.stringify(station.location);

  const options =  {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'json': true,
    'url': "http://localhost:8081/EnosJava/api/snotel/stations",
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
    console.log("body: " + JSON.stringify(station));
    console.log(`${failedCounter} failed`);
      requestPromise(options)
      .then(function (response) {
        succesCounter++;
        console.log(`${succesCounter} successful POSTs to /station`);
      })
      .catch(function (err) {
        failedCounter++
        console.log(`ERROR: ${err}`);
        console.log("body: " + JSON.stringify(station));
        console.log(`${failedCounter} failed`);
  });
  })
})//end of forEach
