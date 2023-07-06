import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { HelperState } from "../../../../../types/types";
import ProbabilityCell from "../helperComponents/ProbabilityCell";
import MaxMinDropDown from "../helperComponents/MaxMinDropDown";
import colors from "../../../../../config/colors";
import { helperStyles } from "../../../../../styles/GameStyles";
import { opportunityTextColor } from "./operations/HelperManager";

interface MaxMinHelperProps {
  helperState: HelperState;
}

const MaxMinHelper: React.FC<MaxMinHelperProps> = ({ helperState }) => {
  const { dice, opportunities, componentId } = helperState;
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <View>
      <Text style={helperStyles.helperMarginText}>
        Select the{"  "}
        <Text style={styles.helperText}>
          {componentId === "06" ? "MAXIMUM" : "MINIMUM"}
        </Text>
        {"  "}
        values that you would like to obtain.
      </Text>
      <MaxMinDropDown
        dice={dice}
        type={componentId}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
      <View style={helperStyles.opportunityView}>
        <Text style={helperStyles.oppotunityText}>Opportunity</Text>
      </View>
      <View style={helperStyles.probabilityView}>
        {[1, 2].map((opportunity, index) => {
          const valid = opportunity <= opportunities && selectedValue;
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
const styles = StyleSheet.create({
  helperText: {
    color: colors.coral,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default React.memo(MaxMinHelper);
