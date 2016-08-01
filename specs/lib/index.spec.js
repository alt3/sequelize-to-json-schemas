import { expect } from 'chai';
import myModule from '../../src/lib/index';

/** @test {myModule} */
describe('myModule', () => {
  it('exists', () => {
    expect(myModule).to.exist;
  });

  it('returns true', () => {
    expect(myModule()).to.be.true;
  });
});
