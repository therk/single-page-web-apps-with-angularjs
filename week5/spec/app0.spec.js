xdescribe("MyApp v2", function () {

  beforeEach(function () {
    module(function ($provider) {
      $provider.service('MyServiceErrorMock', function () {
        this.getSomething = function (value) {
          throw new Error("Error");
        };
      });
    });
    module('MyApp');
  });

  var $controller;
  var myController;

  beforeEach(inject(function (_$controller_, MyServiceErrorMock) {
    $controller = _$controller_;
    console.warn(MyServiceErrorMock);
    myController = $controller('FormController',
      {MyService: MyServiceErrorMock});
  }));

  it("should throw an error", function () {
    myController.doSomething();
    expect(myController.errorMessage).toBe("Error");
  });

});
