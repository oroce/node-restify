/*
  This file provides a content handler that will send a response from restify as a jsonp callback
*/var url;
url = require('url');
exports.contentWriter = function(key) {
  if (key == null) {
    key = 'callback';
  }
  return function(obj, req, res) {
    var callbackName, query, response;
    query = url.parse(req.url, true).query;
    callbackName = query[key] ? query[key] : 'callback';
    response = {
      code: res.code,
      data: obj
    };
    res.code = 200;
    return callbackName + '(' + JSON.stringify(response) + ');';
  };
};