import myModule from '.';

/** @test {myModule} */
describe('myModule', () => {
  it('exists', () => {
    expect(myModule).toBeDefined();
  });

  it('returns true', () => {
    expect(myModule()).toBe(true);
  });
});
