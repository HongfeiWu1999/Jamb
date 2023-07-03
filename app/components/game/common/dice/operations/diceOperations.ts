export const getRandomDie = () => {
  const number = Math.floor(Math.random() * 6) + 1;
  return number;
};

export const numberToDieImage = (number: number) => {
  switch (number) {
    case 1:
      return require("../../../../../assets/dice_one.png");
    case 2:
      return require("../../../../../assets/dice_two.png");
    case 3:
      return require("../../../../../assets/dice_three.png");
    case 4:
      return require("../../../../../assets/dice_four.png");
    case 5:
      return require("../../../../../assets/dice_five.png");
    default:
      return require("../../../../../assets/dice_six.png");
  }
};
