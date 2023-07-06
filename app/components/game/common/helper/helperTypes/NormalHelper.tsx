import React, { useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";

import { calculateProbability } from "../operations/ProbabilityManager";
import colors from "../../../../../config/colors";
import { HelperState } from "../../../../../types/types";
import ProbabilityCell from "../helperComponents/ProbabilityCell";
import { helperStyles } from "../../../../../styles/GameStyles";
import { opportunityTextColor } from "./operations/HelperManager";

interface NormalHelperProps {
  helperState: HelperState;
}

const NormalHelper: React.FC<NormalHelperProps> = ({ helperState }) => {
  const { dice, opportunities, componentId } = helperState;

  const validDiceCounts = useMemo(() => {
    const dieValue = parseInt(componentId) + 1;
    return dice.filter((die) => die.value !== dieValue).length;
  }, [dice, componentId]);

  return (
    <View>
      <View style={helperStyles.opportunityView2}>
        <Text style={styles.oppotunityText}>Opportunity</Text>
      </View>
      <View style={helperStyles.probabilityView}>
        <View style={helperStyles.columnView}>
          <Text style={helperStyles.countText}>Count</Text>
          <Text style={helperStyles.diceCountView}>1</Text>
          <Text style={helperStyles.diceCountView}>2</Text>
          <Text style={helperStyles.diceCountView}>3</Text>
          <Text style={helperStyles.diceCountView}>4</Text>
          <Text style={helperStyles.diceCountView}>5</Text>
        </View>
        {[1, 2].map((opportunity, index) => {
          const valid = opportunity <= opportunities;
          return (
            <View key={opportunity} style={helperStyles.columnView}>
              <Text
                style={[helperStyles.hintText, opportunityTextColor(index)]}
              >
                {opportunity}
              </Text>
              <ProbabilityCell
                probability={
                  valid ? calculateProbability(1, validDiceCounts, index) : 0
                }
              />
              <ProbabilityCell
                probability={
                  valid ? calculateProbability(2, validDiceCounts, index) : 0
                }
              />
              <ProbabilityCell
                probability={
                  valid ? calculateProbability(3, validDiceCounts, index) : 0
                }
              />
              <ProbabilityCell
                probability={
                  valid ? calculateProbability(4, validDiceCounts, index) : 0
                }
              />
              <ProbabilityCell
                probability={
                  valid ? calculateProbability(5, validDiceCounts, index) : 0
                }
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  oppotunityText: {
    marginTop: 20,
    marginBottom: 5,
    marginRight: 50,
    fontWeight: "bold",
    fontSize: 22,
    color: colors.popyRed,
  },
});

export default React.memo(NormalHelper);
