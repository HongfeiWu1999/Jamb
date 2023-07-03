import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../../../../../../config/colors";
import { HelperState, PokerYambState } from "../../../../../../types/types";
import ProbabilityCell from "../ProbabilityCell";
import SelectDiceComponent from "../SelectDiceComponent";
import { calculateProbability } from "../../operations/probabilityManager";

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

  const opportunityTextColor = useCallback((index: number) => {
    switch (index) {
      case 0:
        return styles.oppOneText;
      case 1:
        return styles.oppTwoText;
      default:
        return styles.oppThreeText;
    }
  }, []);

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
      <View style={[styles.optionView, styles.marginView]}>
        <Text style={styles.exampleText}>Examples:</Text>
        <View style={styles.optionView}>
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
      <View style={styles.marginBottomView} />
      <View style={styles.opportunityView}>
        <Text style={styles.oppotunityText}>Opportunity</Text>
      </View>
      <View style={styles.probabilityView}>
        {[1, 2].map((opportunity, index) => {
          const valid =
            opportunity <= opportunities && probabilityState.requiredNumber;
          return (
            <View key={opportunity} style={styles.columnView}>
              <Text style={[styles.hintText, opportunityTextColor(index)]}>
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
  optionView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  marginView: {
    marginTop: 20,
  },
  hintText: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  exampleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.gray,
    marginRight: 15,
  },
  opportunityView: {
    alignSelf: "center",
  },
  oppotunityText: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 5,
    color: colors.popyRed,
  },
  diceCount: {
    backgroundColor: colors.diceGray,
    marginTop: 1,
    height: 50,
    width: 50,
    borderRadius: 8,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  probabilityView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  columnView: {
    padding: 1,
  },
  countText: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.popyRed,
  },
  oppOneText: {
    color: colors.green,
  },
  oppTwoText: {
    color: colors.lightBrown,
  },
  oppThreeText: {
    color: colors.darkRed,
  },

  marginBottomView: {
    marginBottom: 10,
  },
});

export default React.memo(PokerYambComponent);
