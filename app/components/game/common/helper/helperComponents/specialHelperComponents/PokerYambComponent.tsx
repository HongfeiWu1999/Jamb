import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../../../../../../config/colors";
import { HelperState, PokerYambState } from "../../../../../../types/types";
import ProbabilityCell from "../ProbabilityCell";
import SelectDiceComponent from "../SelectDiceComponent";
import { calculateProbability } from "../../operations/ProbabilityManager";
import {
  commonStyles,
  helperStyles,
} from "../../../../../../styles/GameStyles";
import { opportunityTextColor } from "../../helperTypes/operations/HelperManager";

interface PokerYambComponentProps {
  helperState: HelperState;
}

const PokerYambComponent: React.FC<PokerYambComponentProps> = ({
  helperState,
}) => {
  const { dice, opportunities, componentId } = helperState;
  const [probabilityState, setProbabilityState] = useState<PokerYambState>({
    requiredNumber: 0,
    counts: 0,
  });

  useEffect(() => {
    const dieValue = probabilityState.requiredNumber;
    const counts = componentId === "10" ? 4 : 5;
    setProbabilityState((prevState) => ({
      ...prevState,
      counts: Math.max(
        0,
        counts - dice.filter((die) => die.value === dieValue).length
      ),
    }));
  }, [componentId, probabilityState.requiredNumber]);

  return (
    <View>
      <View style={[helperStyles.optionView, commonStyles.marginTop20]}>
        <Text style={helperStyles.exampleText}>Examples:</Text>
        <View style={helperStyles.optionView}>
          <FontAwesome5 name="dice" size={20} color={colors.exampleDice} />
          <FontAwesome5 name="dice" size={20} color={colors.exampleDice} />
          <FontAwesome5 name="dice" size={20} color={colors.exampleDice} />
          <FontAwesome5 name="dice" size={20} color={colors.exampleDice} />
          {componentId === "11" && (
            <FontAwesome5 name="dice" size={20} color={colors.exampleDice} />
          )}
        </View>
      </View>
      <SelectDiceComponent
        requiredNumber={probabilityState.requiredNumber}
        setProbabilityState={setProbabilityState}
      />
      <View style={commonStyles.marginBottom10} />
      <View style={helperStyles.opportunityView}>
        <Text style={styles.oppotunityText}>Opportunity</Text>
      </View>
      <View style={helperStyles.probabilityView}>
        {[1, 2].map((opportunity, index) => {
          const valid =
            opportunity <= opportunities && probabilityState.requiredNumber;
          return (
            <View key={opportunity} style={helperStyles.columnView}>
              <Text
                style={[helperStyles.hintText, opportunityTextColor(index)]}
              >
                {opportunity}
              </Text>
              <ProbabilityCell
                probability={
                  valid
                    ? calculateProbability(
                        probabilityState.counts,
                        probabilityState.counts + 1,
                        index
                      )
                    : 0
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
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 5,
    color: colors.popyRed,
  },
});

export default React.memo(PokerYambComponent);
