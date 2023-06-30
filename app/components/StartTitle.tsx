import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface StartTitleProps {}

const StartTitle: React.FC<StartTitleProps> = () => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const FONT_SIZE_RATIO = 0.3;

  const handleLayout = (event: {
    nativeEvent: { layout: { width: any; height: any } };
  }) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerWidth(width);
    setContainerHeight(height);
  };

  const fontSize = Math.min(containerWidth, containerHeight) * FONT_SIZE_RATIO;
  return (
    <View style={styles.titleView} onLayout={handleLayout}>
      <Text style={[styles.gameTitle, { fontSize }]}>JAMB</Text>
      <View
        style={{
          width: "75%",
          height: 5,
          backgroundColor: "white",
          borderRadius: 5,
        }}
      ></View>
      <View style={styles.optionView}>
        <MaterialCommunityIcons name="dice-1" size={23} color="white" />
        <MaterialCommunityIcons name="dice-2" size={23} color="white" />
        <MaterialCommunityIcons name="dice-3" size={23} color="white" />
        <MaterialCommunityIcons name="dice-4" size={23} color="white" />
        <MaterialCommunityIcons name="dice-5" size={23} color="white" />
        <MaterialCommunityIcons name="dice-6" size={23} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleView: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  gameTitle: {
    color: "white",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  optionView: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default React.memo(StartTitle);
