import { prependZero } from '../../app/core/utils/prependZero';

describe('prependZero', () => {
  it('should add 0 before number if length of number = 1', () => {
    expect(prependZero(5)).toBe('05');
    expect(prependZero('5')).toBe('05');
    expect(prependZero(0)).toBe('00');
  });

  it('should not add 0 before number if length of number != 1', () => {
    expect(prependZero(10)).toBe('10');
    expect(prependZero(111)).toBe('111');
    expect(prependZero('111')).toBe('111');
  });
});
