import React, { useMemo } from "react";
import { Text, StyleSheet, Pressable } from "react-native";

import colors from "../../../../../config/colors";
import gameStyles from "../../../../../styles/gameStyles";

interface HintComponentProps {
  id: string;
}

const HintComponent: React.FC<HintComponentProps> = ({ id }) => {
  const text = useMemo(() => {
    switch (id) {
      case "00":
        return "1";
      case "01":
        return "2";
      case "02":
        return "3";
      case "03":
        return "4";
      case "04":
        return "5";
      case "05":
        return "6";
      case "06":
        return "MAX";
      case "07":
        return "MIN";
      case "08":
        return "K";
      case "09":
        return "F";
      case "10":
        return "P";
      default:
        return "Y";
    }
  }, [id]);

  return (
    <Pressable
      style={({ pressed }) => [
        gameStyles.component,
        pressed && { backgroundColor: colors.componentPressed },
      ]}
    >
      <Text style={[gameStyles.baseText, styles.textColor]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  textColor: {
    color: colors.gray,
  },
});

export default React.memo(HintComponent);
