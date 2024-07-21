export function cuttingPlan(cutList, {maxCutLength = 6000, bladeThickness = 100}) {
  if (!Array.isArray(cutList) || cutList.length === 0) {
      throw new Error('cutList must be an array');
  }
  let _cutList = [...cutList].sort((a, b) => a.length - b.length);
  // console.log({maxCutLength});
  const patternList = [];
  let currentPattern = [];
  let currentLength = 0;
  // console.log({cutList});
  for (const cut of _cutList) {
      let _maxCutLength = _cutList.materialMaxLength || maxCutLength 
      for (let qty = 0; qty < cut.qty; qty++) {
          if (cut.length > _maxCutLength) {
            // throw new Error('cut length exceeds _maxCutLength');
            currentPattern.push(null)
            break
          } 
          if (currentLength + cut.length + (currentPattern.length ? bladeThickness : 0) <= _maxCutLength) {
            currentPattern.push(cut.length);
            currentLength += cut.length + (currentPattern.length ? bladeThickness : 0);
          // } else if (cut.length <= maxCutLength) {
          //     patternList.push([...currentPattern, cut.length]);
          //     currentPattern = [cut.length];
          //     currentLength = cut.length;
          } else {
              patternList.push(currentPattern);
              currentPattern = [cut.length];
              currentLength = cut.length;
          }
      }
  }
  
  if (currentPattern.length) {
      patternList.push(currentPattern);
  }
  
  return patternList;
}




// import { howToCutBoards1D } from "stock-cutting"
// import * as util from "util"

// function print(obj) {
// 	// console.log((obj, false, null, true))
//   console.log(obj);
// }

// // Some numbers from a real project:
// // https://github.com/ccorcos/couch

// const bladeSize = 0.125
// const stockSizes = [{ size: 12 * 8, cost: 11 }, { size: 12 * 2, cost: 1 / 1 }]

// const input1 = [
// 	{ size: 7, count: 20 },
// 	{ size: 9, count: 10 },
// 	{ size: 80, count: 5 },
// ]
// const output1 = howToCutBoards1D({
// 	stockSizes: stockSizes,
// 	bladeSize: bladeSize,
// 	requiredCuts: input1,
// })
// print({ stockSizes, input1, output1 })

// const input2 = [
// 	{ size: 11, count: 28 },
// 	{ size: 21, count: 14 },
// 	{ size: 84, count: 8 },
// 	{ size: 3.5, count: 42 },
// 	{ size: 79.5, count: 4 },
// ]
// const output2 = howToCutBoards1D({
// 	stockSizes: stockSizes,
// 	bladeSize: bladeSize,
// 	requiredCuts: input2,
// })
// print({ stockSizes, input2, output2 })


// import { lessEq, equalTo, greaterEq, inRange, solve } from "yalps"

// import { Model, Constraint, OptimizationDirection, Options, Solution } from "yalps"

// const model = {
//   direction: "maximize",
//   objective: "profit",
//   constraints: {
//     wood: { max: 300 },
//     labor: { max: 110 }, // labor should be <= 110
//     storage: lessEq(400), // you can use the helper functions instead
//   },
//   variables: {
//     table: { wood: 30, labor: 5, profit: 1200, storage: 30 },
//     dresser: { wood: 20, labor: 10, profit: 1600, storage: 50 },
//   },
//   integers: ["table", "dresser"], // these variables must have an integer value in the solution
// }
// const model2 = {
//   direction: "minimize",
//   objective: "qty",
//   constraints: {
//     m1: {length: 6000, qty: 12 },
//     // wood: { max: 300 },
//     // labor: { max: 110 }, // labor should be <= 110
//     // storage: lessEq(400), // you can use the helper functions instead
//   },
//   variables: {
//     _m1: {m1, length: 1000, qty: 22 },
//     // table: { wood: 30, labor: 5, profit: 1200, storage: 30 },
//     // dresser: { wood: 20, labor: 10, profit: 1600, storage: 50 },
//   },
//   integers: ["_m1"], // these variables must have an integer value in the solution
// }

// const solution = solve(model2)
// console.log(solution);