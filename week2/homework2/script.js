function collatz(n) {
  let length = 1;
  while (n != 1) {
    n = n % 2 == 0 ? n / 2 : n * 3 + 1;
    length++;
  }
  return length;
}
function calculate(limit) {
  let maxLength = 0;
  let biggestNumber = 0;

  for (let i = 1; i < limit; i++) {
    let length = collatz(i);
    if (length > maxLength) {
      maxLength = length;
      biggestNumber = i;
    }
  }
  console.log(
    `En uzun zinciri yapan sayı: ${biggestNumber}, zincir uzunluğu: ${maxLength}`
  );
  alert(
    `En uzun zinciri yapan sayı: ${biggestNumber}, zincir uzunluğu: ${maxLength}`
  );
}
calculate(1000000);
