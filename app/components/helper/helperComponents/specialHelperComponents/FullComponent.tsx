import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import { FullProbabilityState, HelperState } from "../../../../types/types";
import ProbabilityCell from "../ProbabilityCell";
import HelperComponent from "../HelperComponent";
import colors from "../../../../config/colors";

interface KentaComponentProps {
  helperState: HelperState;
}

const KentaComponent: React.FC<KentaComponentProps> = ({ helperState }) => {
  const { opportunities } = helperState;
  const [probabilityState, setProbabilityState] =
    useState<FullProbabilityState>({
      requiredNumber1: 0,
      requiredNumber2: 0,
    });

  const setThreeRequiredNumber = useCallback((requiredNumber: number) => {
    setProbabilityState((prevState) => ({
      ...prevState,
      requiredNumber1: requiredNumber,
    }));
  }, []);

  const setTwoRequiredNumber = useCallback((requiredNumber: number) => {
    setProbabilityState((prevState) => ({
      ...prevState,
      requiredNumber2: requiredNumber,
    }));
  }, []);

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
            <FontAwesome5 name="dice" size={20} color={colors.kaki} />
            <FontAwesome5 name="dice" size={20} color={colors.kaki} />
            <FontAwesome5 name="dice" size={20} color={colors.kaki} />
            <FontAwesome5 name="dice" size={20} color={colors.exampleDice} />
            <FontAwesome5 name="dice" size={20} color={colors.exampleDice} />
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.helperMarginText}>
          Select the die that you want to obtain for{" "}
          <View style={styles.optionView}>
            <FontAwesome5 name="dice" size={20} color={colors.kaki} />
            <FontAwesome5 name="dice" size={20} color={colors.kaki} />
            <FontAwesome5 name="dice" size={20} color={colors.kaki} />
          </View>{" "}
          dice.
        </Text>
        <View style={styles.optionView2}>
          <HelperComponent
            icon={
              <MaterialCommunityIcons name="dice-1" size={28} color="black" />
            }
            current={probabilityState.requiredNumber1}
            value={1}
            setValue={setThreeRequiredNumber}
          />
          <HelperComponent
            icon={
              <MaterialCommunityIcons name="dice-2" size={28} color="black" />
            }
            current={probabilityState.requiredNumber1}
            value={2}
            setValue={setThreeRequiredNumber}
          />
          <HelperComponent
            icon={
              <MaterialCommunityIcons name="dice-3" size={28} color="black" />
            }
            current={probabilityState.requiredNumber1}
            value={3}
            setValue={setThreeRequiredNumber}
          />
          <HelperComponent
            icon={
              <MaterialCommunityIcons name="dice-4" size={28} color="black" />
            }
            current={probabilityState.requiredNumber1}
            value={4}
            setValue={setThreeRequiredNumber}
          />
          <HelperComponent
            icon={
              <MaterialCommunityIcons name="dice-5" size={28} color="black" />
            }
            current={probabilityState.requiredNumber1}
            value={5}
            setValue={setThreeRequiredNumber}
          />
          <HelperComponent
            icon={
              <MaterialCommunityIcons name="dice-6" size={28} color="black" />
            }
            current={probabilityState.requiredNumber1}
            value={6}
            setValue={setThreeRequiredNumber}
          />
        </View>
      </View>
      <View style={styles.marginBottomView}>
        <Text style={styles.helperMarginText}>
          Select the die that you want to obtain for{" "}
          <View style={styles.optionView}>
            <FontAwesome5 name="dice" size={20} color={colors.exampleDice} />
            <FontAwesome5 name="dice" size={20} color={colors.exampleDice} />
          </View>{" "}
          dice.
        </Text>
        <View style={styles.optionView2}>
          <HelperComponent
            icon={
              <MaterialCommunityIcons name="dice-1" size={28} color="black" />
            }
            current={probabilityState.requiredNumber2}
            value={1}
            setValue={setTwoRequiredNumber}
          />
          <HelperComponent
            icon={
              <MaterialCommunityIcons name="dice-2" size={28} color="black" />
            }
            current={probabilityState.requiredNumber2}
            value={2}
            setValue={setTwoRequiredNumber}
          />
          <HelperComponent
            icon={
              <MaterialCommunityIcons name="dice-3" size={28} color="black" />
            }
            current={probabilityState.requiredNumber2}
            value={3}
            setValue={setTwoRequiredNumber}
          />
          <HelperComponent
            icon={
              <MaterialCommunityIcons name="dice-4" size={28} color="black" />
            }
            current={probabilityState.requiredNumber2}
            value={4}
            setValue={setTwoRequiredNumber}
          />
          <HelperComponent
            icon={
              <MaterialCommunityIcons name="dice-5" size={28} color="black" />
            }
            current={probabilityState.requiredNumber2}
            value={5}
            setValue={setTwoRequiredNumber}
          />
          <HelperComponent
            icon={
              <MaterialCommunityIcons name="dice-6" size={28} color="black" />
            }
            current={probabilityState.requiredNumber2}
            value={6}
            setValue={setTwoRequiredNumber}
          />
        </View>
      </View>
      <View style={styles.opportunityView}>
        <Text style={styles.oppotunityText}>Opportunity</Text>
      </View>
      <View style={styles.probabilityView}>
        <View style={styles.columnView}>
          <Text style={styles.countText}>Count</Text>
          <Text style={styles.diceCount}>1</Text>
        </View>
        {[1, 2].map((opportunity, index) => {
          const valid =
            opportunity <= opportunities &&
            probabilityState.requiredNumber1 &&
            probabilityState.requiredNumber2;
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
  optionView2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  exampleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.gray,
    marginRight: 15,
  },
  helperMarginText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  helperText: {
    fontSize: 20,
    textAlign: "center",
  },
  probabilityText: {
    color: colors.red,
    fontSize: 25,
    fontWeight: "bold",
  },
  hintMarginText: {
    color: colors.gray,
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  hintText: {
    color: colors.gray,
    fontSize: 20,
    textAlign: "center",
  },
  resultView: {
    marginTop: 30,
    marginHorizontal: 15,
  },
  lineView: {
    borderWidth: 1,
    marginVertical: 10,
  },
  opportunityView: {
    flexDirection: "row-reverse",
  },
  oppotunityText: {
    marginTop: 20,
    marginBottom: 5,
    marginRight: 80,
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

export default React.memo(KentaComponent);
