var sdk = require("../index.js");
var Mitm = require('mitm');

describe("sdk", function() {

  describe("SDK#init", function() {

    it("should be a publicly available method", function() {
      spyOn(sdk, "init");

      sdk.init({
        "app_id": "91312294",
        "app_key": "9fce4bb6bc33d780002fda854e6aaa03"
      });

      expect(sdk.init).toHaveBeenCalled();
    });

    it("should not throw an Error when configuration object contains app_key and app_id", function() {

      expect(function() {
        sdk.init({
          "app_id": "91312294",
          "app_key": "9fce4bb6bc33d780002fda854e6aaa03"
        });
      }).not.toThrow();
    });

    it("should throw an Error when app_id is not provided", function() {

      expect(function() {
        sdk.init({
          "app_key": "9fce4bb6bc33d780002fda854e6aaa03"
        });
      }).toThrow();
    });

    it("should throw an Error when app_key is not provided", function() {

      expect(function() {
        sdk.init({
          "app_id": "91312294"
        });
      }).toThrow();
    });

  });

  describe("SDK#api", function() {

    var mitm;

    beforeEach(function() {

      mitm = Mitm();

      var callback = function(data) {
        return data;
      };

      var data = {
        "test": "test"
      };

      sdk.init({
        "app_id": "91312294",
        "app_key": "9fce4bb6bc33d780002fda854e6aaa03"
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
        "app_id": "91312294",
        "app_key": "9fce4bb6bc33d780002fda854e6aaa03"
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
        "app_id": "91312294",
        "app_key": "9fce4bb6bc33d780002fda854e6aaa03",
        "api_url": "http://mocktest"
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

    it("should set the X-Lifestreams-3scale-AppId request header", function(done) {
      mitm.on("request", function(req, resp) {
        expect(req.headers["x-lifestreams-3scale-appid"]).toBe("91312294");
        done();
      });
      sdk.api("/t", "POST", function(){});
    });

    it("should set the X-Lifestreams-3scale-AppKey request header", function(done) {
      mitm.on("request", function(req, resp) {
        expect(req.headers["x-lifestreams-3scale-appkey"]).toBe("9fce4bb6bc33d780002fda854e6aaa03");
        done();
      });
      sdk.api("/t", "POST", function(){});
    });
  });
});