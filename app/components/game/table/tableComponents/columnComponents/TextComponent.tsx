import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../../../../../config/colors";
import gameStyles from "../../../../../styles/gameStyles";

interface TextComponentProps {
  number: number;
}

const TextComponent: React.FC<TextComponentProps> = ({ number }) => {
  return (
    <View style={gameStyles.component}>
      <Text style={[gameStyles.baseText, styles.textColor]}>
        {number ? number : ""}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textColor: {
    color: colors.popyRed,
  },
});

export default TextComponent;
