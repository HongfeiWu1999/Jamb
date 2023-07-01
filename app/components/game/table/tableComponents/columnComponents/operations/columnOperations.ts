import { Die } from "../../../../../../types/types";

export const getDiceValue = (
  dice: Die[],
  id: string,
  opportunities: number
) => {
  let validNumbers: number[] = dice.map((die) => die.value);
  switch (id) {
    case "00":
      validNumbers = validNumbers.filter((number) => number === 1);
      break;
    case "01":
      validNumbers = validNumbers.filter((number) => number === 2);
      break;
    case "02":
      validNumbers = validNumbers.filter((number) => number === 3);
      break;
    case "03":
      validNumbers = validNumbers.filter((number) => number === 4);
      break;
    case "04":
      validNumbers = validNumbers.filter((number) => number === 5);
      break;
    case "05":
      validNumbers = validNumbers.filter((number) => number === 6);
      break;
    case "06":
      validNumbers.sort((a, b) => b - a);
      break;
    case "07":
      validNumbers.sort((a, b) => a - b);
      break;
    case "08":
      return getKento(validNumbers, opportunities);
    case "09":
      const numWithThreeReps = getRepeatedNumber(validNumbers, 3);
      if (!numWithThreeReps) return numWithThreeReps;
      const newDice = validNumbers.filter((num) => num !== numWithThreeReps);
      const numWithTwoReps = getRepeatedNumber(newDice, 2);
      return numWithTwoReps
        ? numWithThreeReps * 3 + numWithTwoReps * 2 + 30
        : numWithTwoReps;
    case "10":
      const numWithFourReps = getRepeatedNumber(validNumbers, 4);
      return numWithFourReps ? numWithFourReps * 4 + 40 : numWithFourReps;
    default:
      const numWithFiveReps = getRepeatedNumber(validNumbers, 5);
      return numWithFiveReps ? numWithFiveReps * 5 + 50 : numWithFiveReps;
  }
  const sum = validNumbers.slice(0, 5).reduce((acc, number) => acc + number, 0);
  return sum;
};

const getRepeatedNumber = (numbers: number[], n: number): number => {
  const result: number | undefined = numbers.find(
    (val: number, index: number, array: number[]) =>
      array.indexOf(val) !== index &&
      array.lastIndexOf(val) === index &&
      numbers.filter((x) => x === val).length >= n
  );
  return result ? result : 0;
};

const isSequentialNumbers = (numbers: number[]): boolean => {
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] - numbers[i - 1] !== 1) {
      return false;
    }
  }
  return true;
};

const getKento = (numbers: number[], opportunities: number): number => {
  const uniques = [...new Set(numbers)];
  if (uniques.length === 6) {
    return 46 + opportunities * 10;
  } else if (uniques.length === 5) {
    uniques.sort((a, b) => a - b);
    if (isSequentialNumbers(uniques)) return 46 + opportunities * 10;
  }
  return 0;
};
