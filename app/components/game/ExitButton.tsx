import React from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

import colors from "../../config/colors";

interface ExitButtonProps {
  isTablevisible: boolean;
  onPress: () => void;
}

const ExitButton: React.FC<ExitButtonProps> = ({ isTablevisible, onPress }) => {
  return (
    <IconButton
      style={[styles.exitButton, isTablevisible && { display: "none" }]}
      icon="exit-to-app"
      mode="contained"
      iconColor="white"
      size={40}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  exitButton: {
    position: "absolute",
    backgroundColor: colors.darkRed2,
    borderColor: colors.rerollBorder,
    borderWidth: 0.2,
    bottom: "5%",
    left: "5%",
    transform: [{ rotateY: "180deg" }],
  },
});

export default React.memo(ExitButton);
