import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { HelperState } from "../../../../../../types/types";
import ProbabilityCell from "../ProbabilityCell";
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

  return (
    <View>
      <View style={[helperStyles.optionView, commonStyles.marginTop20]}>
        <Text style={helperStyles.exampleText}>Examples:</Text>
        <View>
          <View style={helperStyles.optionView}>
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
          <View style={helperStyles.optionView}>
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
      <View style={helperStyles.opportunityView}>
        <Text style={helperStyles.oppotunityText}>Opportunity</Text>
      </View>
      <View style={helperStyles.probabilityView}>
        {[1, 2].map((opportunity, index) => {
          const valid = opportunity <= opportunities;
          return (
            <View key={opportunity} style={helperStyles.columnView}>
              <Text
                style={[helperStyles.hintText, opportunityTextColor(index)]}
              >
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

export default React.memo(KentaComponent);
