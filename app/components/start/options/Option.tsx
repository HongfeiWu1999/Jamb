import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import colors from "../../../config/colors";

interface OptionProps {
  onPress: any;
  icon: any;
  text: any;
}

const SIZE = 75;

const Option: React.FC<OptionProps> = ({ onPress, icon, text }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.optionContainer}
      activeOpacity={0.8}
    >
      {icon}
      <Text style={{ color: colors.tableBackground, fontWeight: "bold" }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    width: SIZE,
    height: SIZE,
    marginHorizontal: 3,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    elevation: 3,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default React.memo(Option);
