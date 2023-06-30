import React, { useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { HelperState } from "../../../../types/types";
import ProbabilityCell from "../ProbabilityCell";
import colors from "../../../../config/colors";

interface KentaComponentProps {
  helperState: HelperState;
}

const KentaComponent: React.FC<KentaComponentProps> = ({ helperState }) => {
  const { opportunities } = helperState;

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

  return (
    <View>
      <View style={[styles.optionView, styles.marginView]}>
        <Text style={styles.exampleText}>Examples:</Text>
        <View>
          <View style={styles.optionView}>
            <MaterialCommunityIcons
              name="dice-1"
              size={23}
              color={colors.exampleDice}
            />
            <MaterialCommunityIcons
              name="dice-2"
              size={23}
              color={colors.exampleDice}
            />
            <MaterialCommunityIcons
              name="dice-3"
              size={23}
              color={colors.exampleDice}
            />
            <MaterialCommunityIcons
              name="dice-4"
              size={23}
              color={colors.exampleDice}
            />
            <MaterialCommunityIcons
              name="dice-5"
              size={23}
              color={colors.exampleDice}
            />
          </View>
          <View style={styles.optionView}>
            <MaterialCommunityIcons
              name="dice-2"
              size={23}
              color={colors.exampleDice}
            />
            <MaterialCommunityIcons
              name="dice-3"
              size={23}
              color={colors.exampleDice}
            />
            <MaterialCommunityIcons
              name="dice-4"
              size={23}
              color={colors.exampleDice}
            />
            <MaterialCommunityIcons
              name="dice-5"
              size={23}
              color={colors.exampleDice}
            />
            <MaterialCommunityIcons
              name="dice-6"
              size={23}
              color={colors.exampleDice}
            />
          </View>
        </View>
      </View>
      <View style={styles.opportunityView}>
        <Text style={styles.oppotunityText}>Opportunity</Text>
      </View>
      <View style={styles.probabilityView}>
        {[1, 2].map((opportunity, index) => {
          const valid = opportunity <= opportunities;
          return (
            <View key={opportunity} style={styles.columnView}>
              <Text style={[styles.hintText, opportunityTextColor(index)]}>
                {opportunity}
              </Text>
              <ProbabilityCell probability={valid ? 0 : 0} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  marginView: {
    marginTop: 20,
  },
  optionView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 20,
    marginBottom: 5,
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

export default React.memo(KentaComponent);
