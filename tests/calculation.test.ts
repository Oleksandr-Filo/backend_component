import { calculationsServices } from '../src/services/calculations';

const { getMedians } = calculationsServices;

describe('getMedians', () => {
  it('should return an array', () => {
    const medians = getMedians(10);
  
    expect(medians)
      .toBeInstanceOf(Array);
  });
  
  it('should return one median if the length of the array of primes is odd', () => {
    const medians = getMedians(18);
  
    expect(medians)
      .toEqual([7]);
  });
  
  it('should return two medians if the length of the array of primes is even', () => {
    const medians = getMedians(10);
  
    expect(medians)
      .toEqual([3, 5]);
  });
});
