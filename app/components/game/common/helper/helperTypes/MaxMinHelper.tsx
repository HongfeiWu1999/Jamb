import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { HelperState } from "../../../../../types/types";
import ProbabilityCell from "../helperComponents/ProbabilityCell";
import MaxMinDropDown from "../helperComponents/MaxMinDropDown";
import colors from "../../../../../config/colors";

interface MaxMinHelperProps {
  helperState: HelperState;
}

const MaxMinHelper: React.FC<MaxMinHelperProps> = ({ helperState }) => {
  const { dice, opportunities, componentId } = helperState;
  const [selectedValue, setSelectedValue] = useState("");

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
      <Text style={styles.helperMarginText}>
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
      <View style={styles.opportunityView}>
        <Text style={styles.oppotunityText}>Opportunity</Text>
      </View>
      <View style={styles.probabilityView}>
        {[1, 2].map((opportunity, index) => {
          const valid = opportunity <= opportunities && selectedValue;
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
  helperMarginText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  helperText: {
    color: colors.coral,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
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

export default React.memo(MaxMinHelper);
