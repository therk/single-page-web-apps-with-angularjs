describe('ItemList directive', function () {
  var $compiler;
  var $rootScope;

  var expectedHtml = '<h1 class="ng-binding"> test </h1>\
<ul>\
  <!-- ngRepeat: item in list.items --><li ng-repeat="item in list.items" class="ng-binding ng-scope">\
    item1\
  </li><!-- end ngRepeat: item in list.items --><li ng-repeat="item in list.items" class="ng-binding ng-scope">\
    item2\
  </li><!-- end ngRepeat: item in list.items -->\
</ul>'.replace(/\s/g, ''); // removes spaces

  beforeEach(module('MyApp'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(inject(function ($templateCache) {
    var directiveTemplate = null;
    var req = new XMLHttpRequest();

    req.onload = function () {
      directiveTemplate = this.responseText;
    };

    req.open("get", "../src/itemList.html", false);
    req.send();
    $templateCache.put("src/itemList.html", directiveTemplate);
  }));

  it('Replaces the element with proper content', function () {
    var list = {};
    list.items = [
      {name: 'item1'},
      {name: 'item2'}
    ];
    $rootScope.list = list;

    var html = "<item-list my-list='list' title='test'></shopping-list>";
    var element = $compile(html)($rootScope);

    $rootScope.$digest();
    console.log(element.html());
    expect(element.html().replace(/\s/g,'')).toContain(expectedHtml);
  });
})
