import React, { useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";

import HelperComponent from "./HelperComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SelectDiceComponentProps {
  requiredNumber: number;
  setProbabilityState: React.Dispatch<React.SetStateAction<any>>;
}

const SelectDiceComponent: React.FC<SelectDiceComponentProps> = ({
  requiredNumber,
  setProbabilityState,
}) => {
  const setRequiredNumber = useCallback(
    (requiredNumber: number) => {
      setProbabilityState((prevState: Object) => ({
        ...prevState,
        requiredNumber: requiredNumber,
      }));
    },
    [setProbabilityState]
  );

  return (
    <View>
      <Text style={styles.helperMarginText}>
        Select the die that you want to obtain.
      </Text>
      <View style={styles.optionView}>
        <HelperComponent
          icon={
            <MaterialCommunityIcons name="dice-1" size={28} color="black" />
          }
          current={requiredNumber}
          value={1}
          setValue={setRequiredNumber}
        />
        <HelperComponent
          icon={
            <MaterialCommunityIcons name="dice-2" size={28} color="black" />
          }
          current={requiredNumber}
          value={2}
          setValue={setRequiredNumber}
        />
        <HelperComponent
          icon={
            <MaterialCommunityIcons name="dice-3" size={28} color="black" />
          }
          current={requiredNumber}
          value={3}
          setValue={setRequiredNumber}
        />
        <HelperComponent
          icon={
            <MaterialCommunityIcons name="dice-4" size={28} color="black" />
          }
          current={requiredNumber}
          value={4}
          setValue={setRequiredNumber}
        />
        <HelperComponent
          icon={
            <MaterialCommunityIcons name="dice-5" size={28} color="black" />
          }
          current={requiredNumber}
          value={5}
          setValue={setRequiredNumber}
        />
        <HelperComponent
          icon={
            <MaterialCommunityIcons name="dice-6" size={28} color="black" />
          }
          current={requiredNumber}
          value={6}
          setValue={setRequiredNumber}
        />
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
  optionView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
});

export default React.memo(SelectDiceComponent);
