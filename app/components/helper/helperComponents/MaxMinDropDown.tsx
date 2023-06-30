import React, { useState, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import colors from "../../../config/colors";
import { Die } from "../../../types/types";
import { getDiceValue } from "../../game/table/tableComponents/columnComponents/operations/columnOperations";

interface MaxMinDropDownProps {
  dice: Die[];
  type: string;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

const range = (start: number, end: number, step = 1) => {
  const len = Math.floor((end - start) / step) + 1;
  return Array(len)
    .fill(0)
    .map((_, idx) => start + idx * step);
};

const MaxMinDropDown: React.FC<MaxMinDropDownProps> = ({
  dice,
  type,
  selectedValue,
  setSelectedValue,
}) => {
  const data = useMemo(() => {
    let validValues;
    if (type === "06") {
      const max = getDiceValue(dice, "06", 3);
      validValues = range(max ? max + 1 : 5, 30);
    } else {
      const min = getDiceValue(dice, "07", 3);
      validValues = range(5, min ? min - 1 : 30);
    }

    return validValues.map((value) => {
      const number = value.toString();
      return { label: number, value: number };
    });
  }, [type, dice]);

  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && { color: colors.popyRed }]}>
        {type === "06" ? "Max Value" : "Min Value"}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.containerStyle}
        itemTextStyle={styles.itemTextStyle}
        data={data}
        maxHeight={170}
        autoScroll={false}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select value" : "..."}
        value={selectedValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setSelectedValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    marginTop: 5,
  },
  dropdown: {
    height: 50,
    borderColor: colors.cyan,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    color: colors.cyan,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: "bold",
  },
  placeholderStyle: {
    textAlign: "center",
    color: colors.gray,
  },
  selectedTextStyle: {
    color: colors.kaki,
    fontWeight: "bold",
    textAlign: "center",
  },
  containerStyle: {
    borderRadius: 8,
  },
  itemTextStyle: {
    textAlign: "center",
  },
});

export default React.memo(MaxMinDropDown);
