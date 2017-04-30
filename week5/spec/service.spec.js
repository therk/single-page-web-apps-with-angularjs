describe("MyService", function() {

  var myService;
  var $httpBackend;

  beforeEach(function() {
    module('MyApp');

    inject(function ($injector) {
      myService = $injector.get('MyService');
      $httpBackend = $injector.get('$httpBackend');
    });
  });

  it('should return categories list', function () {
    $httpBackend.whenGET("http://davids-restaurant.herokuapp.com/categories.json")
    .respond(['Lunch', 'Dessert']);
    myService.getCategories().then(function (response) {
      expect(response.data).toEqual(['Lunch', 'Dessert']);
    });
    $httpBackend.flush();
  });

});
