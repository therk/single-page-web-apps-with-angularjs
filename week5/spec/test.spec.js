describe("Test checkName in test", function () {
  it("should return true if passing in 'test'", function () {
    expect(checkName("test")).toBe(true);
  });

  it("should return false if passing in other then 'test'", function () {
    expect(checkName("bad")).not.toBe(true);
  });
});
