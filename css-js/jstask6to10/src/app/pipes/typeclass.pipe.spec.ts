import { TypeclassPipe } from './typeclass.pipe';

describe('TypeclassPipe', () => {
  it('create an instance', () => {
    const pipe = new TypeclassPipe();
    expect(pipe).toBeTruthy();
  });
});
