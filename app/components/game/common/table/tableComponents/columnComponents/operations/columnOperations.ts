import { AccionColumn, Die } from "../../../../../../../types/types";

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

      if (!numWithThreeReps) return 0;

      const leftDice = validNumbers.filter((num) => num !== numWithThreeReps);
      const anotherNumWithThreeReps = getRepeatedNumber(leftDice, 3);

      if (anotherNumWithThreeReps) {
        if (anotherNumWithThreeReps > numWithThreeReps) {
          return anotherNumWithThreeReps * 3 + numWithThreeReps * 2 + 30;
        } else {
          return numWithThreeReps * 3 + anotherNumWithThreeReps * 2 + 30;
        }
      }

      const numWithTwoReps = getRepeatedNumber(leftDice, 2);

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

export const getUpdatedAccionColumns = (
  accionColumns: AccionColumn[],
  accion: string,
  id: string,
  dice: Die[],
  opportunities: number
) => {
  return accionColumns.map((column) => {
    if (column.accion === accion) {
      const updatedColumn = {
        ...column,
        components: column.components.map((c) =>
          c.id === id
            ? {
                ...c,
                value: getDiceValue(dice, id, opportunities),
                valid: false,
              }
            : c
        ),
        order: column.order.slice(1),
      };

      const normalSeccion = updatedColumn.components.slice(0, 6);
      let normalSeccionScore = normalSeccion.reduce(
        (acc, { value }) => acc + value,
        0
      );
      if (normalSeccionScore >= 60) normalSeccionScore += 30;

      const maxMinSeccion = updatedColumn.components.slice(6, 8);
      const maxMinSeccionScore =
        maxMinSeccion[0].value && maxMinSeccion[1].value
          ? Math.max(
              0,
              (maxMinSeccion[0].value - maxMinSeccion[1].value) *
                normalSeccion[0].value
            )
          : 0;

      const specialSeccion = updatedColumn.components.slice(8, 12);
      const specialSeccionScore = specialSeccion.reduce(
        (acc, { value }) => acc + value,
        0
      );

      const scores = [
        normalSeccionScore,
        maxMinSeccionScore,
        specialSeccionScore,
      ];
      updatedColumn.scores = scores;

      return updatedColumn;
    }
    return column;
  });
};
