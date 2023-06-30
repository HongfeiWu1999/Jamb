import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";

import { calculateProbability } from "../operations/probabilityManager";
import colors from "../../../config/colors";
import { HelperState } from "../../../types/types";
import ProbabilityCell from "../helperComponents/ProbabilityCell";

interface NormalHelperProps {
  helperState: HelperState;
}

const NormalHelper: React.FC<NormalHelperProps> = ({ helperState }) => {
  const { dice, opportunities, componentId } = helperState;

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

  const validDiceCounts = useMemo(() => {
    const dieValue = parseInt(componentId) + 1;
    return dice.filter((die) => die.value !== dieValue).length;
  }, [dice, componentId]);

  return (
    <View>
      <View style={styles.opportunityView}>
        <Text style={styles.oppotunityText}>Opportunity</Text>
      </View>
      <View style={styles.probabilityView}>
        <View style={styles.columnView}>
          <Text style={styles.countText}>Count</Text>
          <Text style={styles.diceCount}>1</Text>
          <Text style={styles.diceCount}>2</Text>
          <Text style={styles.diceCount}>3</Text>
          <Text style={styles.diceCount}>4</Text>
          <Text style={styles.diceCount}>5</Text>
        </View>
        {[1, 2].map((opportunity, index) => {
          const valid = opportunity <= opportunities;
          return (
            <View key={opportunity} style={styles.columnView}>
              <Text style={[styles.hintText, opportunityTextColor(index)]}>
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
  opportunityView: {
    flexDirection: "row-reverse",
  },
  oppotunityText: {
    marginTop: 20,
    marginBottom: 5,
    marginRight: 50,
    fontWeight: "bold",
    fontSize: 22,
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
  hintText: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
});

export default React.memo(NormalHelper);
