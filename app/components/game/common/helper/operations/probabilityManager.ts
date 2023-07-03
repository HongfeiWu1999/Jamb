const dbinom = (count: number, size: number, prob: number) => {
  if (count < 0 || count > size) {
    return 0;
  }

  const binomialCoefficient = calculateBinomialCoefficient(size, count);
  const successProbability =
    Math.pow(prob, count) * Math.pow(1 - prob, size - count);

  return binomialCoefficient * successProbability;
};

const calculateBinomialCoefficient = (n: number, k: number) => {
  const coefficient = factorial(n) / (factorial(k) * factorial(n - k));
  return coefficient;
};

const factorial = (num: number) => {
  if (num === 0 || num === 1) {
    return 1;
  }

  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }

  return result;
};

const probabilityOnce = (count: number, diceCount: number) => {
  return dbinom(count, diceCount, 1 / 6);
};

const probabilityTwice = (count: number, diceCount: number) => {
  if (count > diceCount) {
    return 0;
  }
  const binomialProb = probabilityOnce(count, diceCount);
  const results = Array.from({ length: count }, (_, i) => i);
  const pr = results.map((result) => probabilityOnce(result, diceCount));
  const pnext = results.map((result) =>
    probabilityOnce(count - result, diceCount - result)
  );

  const sumPrPnext = pr.reduce(
    (sum, value, index) => sum + value * pnext[index],
    0
  );
  return binomialProb + sumPrPnext;
};

export const calculateProbability = (
  count: number,
  diceCount: number,
  index: number
) => {
  let probability = 0;
  if (index === 0) {
    probability = probabilityOnce(count, diceCount);
  } else if (index == 1) probability = probabilityTwice(count, diceCount);

  return Math.floor(probability * 100);
};
