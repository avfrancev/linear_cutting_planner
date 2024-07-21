import { cuttingPlan } from "./cutting.js";

describe('cuttingPlan', () => {
  it('should return correct cutting plan', () => {
    const cutList = [
      { length: 10, qty: 2 },
      { length: 20, qty: 1 },
      { length: 5, qty: 10 },
    ];
    const expected = [
        [5, 5, 5, 5, 5, 5],
        [5,5,5,5,10],
        [10,20],
      ];
    let o = cuttingPlan(cutList, { maxCutLength: 30, qty: 1 })
    expect(o).toEqual(expected);
  });
  it('should throw if cutList is not array', () => {
    expect(() => cuttingPlan(true, { maxCutLength: 30, qty: 1 })).toThrowError('cutList must be an array');
  });
  it('should throw if cutList is empty', () => {
    expect(() => cuttingPlan([], { maxCutLength: 30, qty: 1 })).toThrowError('cutList must be an array');
  });
});
