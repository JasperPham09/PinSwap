export {};

declare global {
  var myVariable: string;
}

global.myVariable = "Xin chào từ biến toàn cục!";
console.log(global.myVariable); // "Xin chào từ biến toàn cục!"
