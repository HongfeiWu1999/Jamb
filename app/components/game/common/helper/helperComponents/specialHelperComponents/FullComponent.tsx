import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import {
  FullProbabilityState,
  HelperState,
} from "../../../../../../types/types";
import ProbabilityCell from "../ProbabilityCell";
import HelperComponent from "../HelperComponent";
import colors from "../../../../../../config/colors";
import {
  commonStyles,
  helperStyles,
} from "../../../../../../styles/GameStyles";
import { opportunityTextColor } from "../../helperTypes/operations/HelperManager";

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

  return (
    <View>
      <View style={[helperStyles.optionView, commonStyles.marginTop20]}>
        <Text style={helperStyles.exampleText}>Examples:</Text>
        <View>
          <View style={helperStyles.optionView}>
            <FontAwesome5 name="dice" size={20} color={colors.kaki} />
            <FontAwesome5 name="dice" size={20} color={colors.kaki} />
            <FontAwesome5 name="dice" size={20} color={colors.kaki} />
            <FontAwesome5 name="dice" size={20} color={colors.exampleDice} />
            <FontAwesome5 name="dice" size={20} color={colors.exampleDice} />
          </View>
        </View>
      </View>
      <View>
        <Text style={helperStyles.helperMarginText}>
          Select the die that you want to obtain for{" "}
          <View style={helperStyles.optionView}>
            <FontAwesome5 name="dice" size={20} color={colors.kaki} />
            <FontAwesome5 name="dice" size={20} color={colors.kaki} />
            <FontAwesome5 name="dice" size={20} color={colors.kaki} />
          </View>{" "}
          dice.
        </Text>
        <View style={helperStyles.optionView2}>
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
      <View style={commonStyles.marginBottom10}>
        <Text style={helperStyles.helperMarginText}>
          Select the die that you want to obtain for{" "}
          <View style={helperStyles.optionView}>
            <FontAwesome5 name="dice" size={20} color={colors.exampleDice} />
            <FontAwesome5 name="dice" size={20} color={colors.exampleDice} />
          </View>{" "}
          dice.
        </Text>
        <View style={helperStyles.optionView2}>
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
      <View style={helperStyles.opportunityView2}>
        <Text style={styles.oppotunityText}>Opportunity</Text>
      </View>
      <View style={helperStyles.probabilityView}>
        <View style={helperStyles.columnView}>
          <Text style={helperStyles.countText}>Count</Text>
          <Text style={helperStyles.diceCountView}>1</Text>
        </View>
        {[1, 2].map((opportunity, index) => {
          const valid =
            opportunity <= opportunities &&
            probabilityState.requiredNumber1 &&
            probabilityState.requiredNumber2;
          return (
            <View key={opportunity} style={helperStyles.columnView}>
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
  oppotunityText: {
    marginTop: 20,
    marginBottom: 5,
    marginRight: 80,
    fontWeight: "bold",
    fontSize: 22,
    color: colors.popyRed,
  },
});

export default React.memo(KentaComponent);
