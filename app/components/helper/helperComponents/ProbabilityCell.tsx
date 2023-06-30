import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../../config/colors";

interface ProbabilityCellProps {
  probability: number;
}

const ProbabilityCell: React.FC<ProbabilityCellProps> = ({ probability }) => {
  return (
    <View>
      {probability ? (
        <Text style={styles.validComponent}>{probability}</Text>
      ) : (
        <View style={styles.noValidComponent} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  validComponent: {
    marginTop: 1,
    height: 50,
    width: 50,
    borderColor: colors.lightGray,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  noValidComponent: {
    marginTop: 1,
    height: 50,
    width: 50,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
});

export default React.memo(ProbabilityCell);
