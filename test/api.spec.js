var sdk = require("../index.js");
var http = require("http");
var sha1sum = require('sha1'); // replace with native 'crypto' module?
var Mitm = require('mitm');
var nock = require('nock');

describe("sdk", function() {

  describe("SDK#init", function() {

    it("should be a publicly available method", function() {
      spyOn(sdk, "init");

      sdk.init({
        api_id: "53e21090dd574893d4000024",
        api_key: "53298519-5d13-454d-99be-4c0fe22ced88"
      });

      expect(sdk.init).toHaveBeenCalled();
    });

    it("should not throw an Error when configuration object contains API KEY and API ID", function() {

      expect(function() {
        sdk.init({
          api_id: "53e21090dd574893d4000024",
          api_key: "53298519-5d13-454d-99be-4c0fe22ced88"
        });
      }).not.toThrow();
    });

    it("should throw an Error when api_key is not provided", function() {

      expect(function() {
        sdk.init({
          api_id: "53e21090dd574893d4000024"
        });
      }).toThrow();
    });

    it("should throw an Error when api_id is not provided", function() {

      expect(function() {
        sdk.init({
          api_key: "53298519-5d13-454d-99be-4c0fe22ced88"
        });
      }).toThrow();
    });

  });

  describe("SDK#api", function() {

    var mitm;
    var req;
    var resp;

    beforeEach(function() {

      mitm = Mitm();

      var callback = function(data) {
        return data;
      };

      var data = {
        "test": "test"
      };

      sdk.init({
        api_id: "53e21090dd574893d4000024",
        api_key: "53298519-5d13-454d-99be-4c0fe22ced88"
      });

      // http.get('http://localhost:6100/v2/mock');

    });

    afterEach(function() {
      mitm.disable();
    });

    it("should be a publicly available method", function() {
      spyOn(sdk, "api");
      sdk.api("/mock", "get", function(){});
      expect(sdk.api).toHaveBeenCalled();
    });

    it("should set request endpoint properly with a default url", function(done) {

      sdk.init({
        api_id: "53e21090dd574893d4000024",
        api_key: "53298519-5d13-454d-99be-4c0fe22ced88",
      });

      var url = "http://localhost:6100/v2/mocktest";

      mitm.on("request", function(req, resp) {
        expect("http://" + req.headers.host + req.url).toBe(url);
        done();
      });

      sdk.api("/mocktest", "get", function(){});

    });

    it("should set request endpoint properly with a provided url", function(done) {
      var url = "http://mocktest/t";

      sdk.init({
        api_id: "53e21090dd574893d4000024",
        api_key: "53298519-5d13-454d-99be-4c0fe22ced88",
        api_url: "http://mocktest"
      });

      mitm.on("request", function(req, resp) {
        expect("http://" + req.headers.host + req.url).toBe(url);
        done();
      });

      sdk.api("/t", "get", function(){});

    });

    it("should set request method properly", function(done) {

      mitm.on("request", function(req, resp) {
        expect(req.method).toBe("POST");
        done();
      });

      sdk.api("/t", "post", function(){});

    });

    it("should set Content-type to application/json", function(done) {
      mitm.on("request", function(req, resp) {
        expect(req.headers["content-type"]).toBe("application/json;charset=UTF-8");
        done();
      })
      sdk.api("/t", "POST", function(){});
    });

    it("should set the X-Auth-ApiKeyId request header", function(done) {
      mitm.on("request", function(req, resp) {
        expect(req.headers["x-auth-apikeyid"]).toBe("53e21090dd574893d4000024");
        done();
      });
      sdk.api("/t", "POST", function(){});
    });

    it("should set the X-Auth-Timestamp request header", function(done) {
      mitm.on("request", function(req, resp) {
        expect(req.headers["x-auth-timestamp"]).toBe("" + (Date.now() / 1000 | 0));
        done();
      });
      sdk.api("/t", "POST", function(){});
    });

    it("should set the signature hash correctly", function(done) {
      mitm.on("request", function(req, resp) {
        var timestamp = Date.now() / 1000 | 0
        var hash = sha1sum("53298519-5d13-454d-99be-4c0fe22ced88" + timestamp, "TEXT");
        expect(req.headers["x-auth-signature"]).toBe(hash);
        done();
      });
      sdk.api("/t", "POST", function(){});
    });
  });
});