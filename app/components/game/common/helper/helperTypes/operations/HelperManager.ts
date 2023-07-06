import { helperStyles } from "../../../../../../styles/GameStyles";

export const opportunityTextColor = (index: number) => {
  if (index === 0) {
    return helperStyles.oppOneText;
  }
  return helperStyles.oppTwoText;
};
