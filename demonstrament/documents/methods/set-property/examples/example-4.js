import { Recourse, cessors, regularExpressions, set, /*splitPath,*/ typeOf, variables } from '/dependencies/recourse.js'
const { Getters, Setters, Deleters } = cessors
console.log("------------------------")
console.log("Set Property | Example 4")
console.log("------------------------")
const regex = /\.(?=(?:[^"]*"[^"]*")*[^"]*$)/g;
