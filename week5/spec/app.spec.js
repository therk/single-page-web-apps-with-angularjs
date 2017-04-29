'use strict';

describe("MyApp", function () {

  beforeEach(module('MyApp'));

  var $controller;
  var myController;

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;

    var MyServiceErrorMock = {};
    MyServiceErrorMock.getSomething = function(value) {
      throw new Error("Error");
    };

    myController =
      $controller('MyApp', {MyService: MyServiceErrorMock});

  }));

  it("should throw an error", function () {
    myController.doSomething();
    expect(myController.errorMessage).toBe("Error");
  });

});
