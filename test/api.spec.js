var sdk = require("../index.js");
var https = require("https");
var Mitm = require('mitm');
var nock = require('nock');

describe("sdk", function() {

  describe("SDK#init", function() {

    it("should be a publicly available method", function() {
      spyOn(sdk, "init");

      sdk.init({
        consumer_key: "SlNgHQlVduKKNWkezPxe0dfEHIP2dlTh"
      });

      expect(sdk.init).toHaveBeenCalled();
    });

    it("should not throw an Error when configuration object contains consumer_key", function() {

      expect(function() {
        sdk.init({
          consumer_key: "SlNgHQlVduKKNWkezPxe0dfEHIP2dlTh"
        });
      }).not.toThrow();
    });

    it("should throw an Error when consumer_key is not provided", function() {

      expect(function() {
        sdk.init({});
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
        consumer_key: "SlNgHQlVduKKNWkezPxe0dfEHIP2dlTh"
      });

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
        consumer_key: "SlNgHQlVduKKNWkezPxe0dfEHIP2dlTh"
      });

      var url = "https://api.lifestreams.com/beta1/mocktest";

      mitm.on("request", function(req, resp) {
        expect("https://" + req.headers.host + req.url).toBe(url);
        done();
      });

      sdk.api("/mocktest", "get", function(){});

    });

    it("should set request endpoint properly with a provided url", function(done) {
      var url = "http://mocktest/t";

      sdk.init({
        consumer_key: "SlNgHQlVduKKNWkezPxe0dfEHIP2dlTh",
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

    it("should set the X-Lisestreams-ConsumerKey request header", function(done) {
      mitm.on("request", function(req, resp) {
        expect(req.headers["x-lifestreams-consumerkey"]).toBe("SlNgHQlVduKKNWkezPxe0dfEHIP2dlTh");
        done();
      });
      sdk.api("/t", "POST", function(){});
    });
  });
});