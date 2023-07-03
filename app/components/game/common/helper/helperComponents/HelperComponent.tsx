import React, { useCallback, useMemo } from "react";
import { Text, StyleSheet, Pressable } from "react-native";

import colors from "../../../../../config/colors";

interface HelperComponentProps {
  icon?: React.ReactNode;
  current: number;
  value: number;
  setValue: (number: number) => void;
}

const HelperComponent: React.FC<HelperComponentProps> = ({
  icon,
  current,
  value,
  setValue,
}) => {
  const isComponentSelected = useMemo(
    () => value === current,
    [current, value]
  );
  const valueHandler = useCallback(() => setValue(value), [value, setValue]);

  return (
    <Pressable
      disabled={isComponentSelected}
      onPress={valueHandler}
      style={({ pressed }) => [
        styles.container,
        pressed && {
          backgroundColor: colors.popyRed,
        },
        isComponentSelected && { backgroundColor: colors.moderateCyan },
        icon ? styles.iconContainer : styles.numberContainer,
      ]}
    >
      {icon ? icon : <Text style={styles.text}>{value}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderRadius: 5,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    paddingHorizontal: 4,
  },
  numberContainer: {
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default React.memo(HelperComponent);
