export const fromRoman = (str) => {
  if (typeof(str) !== 'string') return
  let result = 0;
  let upCaseString = str.toUpperCase();
  const decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const roman = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];
  for (let i = 0;i<=decimal.length;i++) {
    while (upCaseString.indexOf(roman[i]) === 0){
      result += decimal[i];
      upCaseString = upCaseString.replace(roman[i],'');
    }
  }
  return result;
}
