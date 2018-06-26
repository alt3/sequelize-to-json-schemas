import myModule from '../../src/lib/index';

/** @test {myModule} */
describe('myModule', () => {
  it('exists', () => {
    expect(myModule).toBeDefined();
  });

  it('returns true', () => {
    expect(myModule()).toBe(true);
  });
});
