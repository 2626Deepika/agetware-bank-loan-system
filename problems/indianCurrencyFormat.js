function formatIndianCurrency(number) {
  const [intPart, decimalPart] = number.toString().split(".");
  let lastThree = intPart.slice(-3);
  let rest = intPart.slice(0, -3);
  if (rest !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted =
    rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return decimalPart ? `${formatted}.${decimalPart}` : formatted;
}

// Example usage:
console.log(formatIndianCurrency(123456.7891)); // 1,23,456.7891
