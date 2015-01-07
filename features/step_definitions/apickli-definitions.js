'use strict';

var jsonPath = require('JSONPath').eval;

//////////////////////////////////////////////
// Setup variables and data related         //
// to this specific feature implementation  //
//////////////////////////////////////////////
var url;
var headers;


// Step definitions
var apickliWraper = function () {

  // overwrite default World constructor
  this.World = require('../functions/world.js').World;

  /* GIVEN */


  /* WHEN */

  this.When('I GET a $resourcepath resource', function(path,callback) {

    url = 'http://httpbin.org';
    url = url+'/'+path;
    this.get(url,headers,callback)

  })


  /* THEN */

  // Generic definition to validate http response code
  this.Then('the http response status should be $status', function(status, callback) {
    if (!this.assertResponse(this.lastResponse, callback)) { return }
    if (this.lastResponse.statusCode != status) {
      callback.fail('The http response did not have the expected ' +
        'response code, expected ' + status + ' but got ' +
        this.lastResponse.statusCode)
    } else {
      callback()
    }
  });

  // Generic definition to test if response body contains a string
  this.Then('the response message should contain "$string"', function(string, callback) {

    // this function also checks for valid response body
    // and valid JSON
    if (!this.assertStringInResponse(this.lastResponse, string, callback)){
      callback.fail('Response body has no string: '+string+' present. Response body: '+this.lastResponse.body)
    } else {
      callback()
    }
  });

  // Generic definition for testing http response header contents
  this.Then('the response header should have "$string" element', function(string, callback) {
    if (!this.assertHeaderInResponse(this.lastResponse, string, callback)){
      callback.fail('Response header has no element: '+string+' present. Response headers: '+this.lastResponse.headers)
    } else {
      callback()
    }
  });

}

module.exports = apickliWraper