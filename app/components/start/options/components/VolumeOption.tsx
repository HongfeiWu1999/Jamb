import React from "react";
import Option from "./Option";
import { Image, Text, StyleSheet } from "react-native";
import { GameSettings } from "../../../../types/types";
import colors from "../../../../config/colors";

interface VolumeOptionProps {
  gameSettings: GameSettings;
  setGameSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
}

const VolumeOption: React.FC<VolumeOptionProps> = ({
  gameSettings,
  setGameSettings,
}) => {
  const { isVolumeOn } = gameSettings;
  return (
    <Option
      onPress={() =>
        setGameSettings((prevState) => ({
          ...prevState,
          isVolumeOn: !isVolumeOn,
        }))
      }
      icon={
        (isVolumeOn && (
          <Image
            style={{ width: 45, height: 45 }}
            source={require("../../../../assets/volume_on.png")}
          />
        )) || (
          <Image
            style={{ width: 45, height: 45 }}
            source={require("../../../../assets/volume_off.png")}
          />
        )
      }
      text={
        <Text>
          <Text style={isVolumeOn && styles.volumenOnText}>On</Text> /{" "}
          <Text style={!isVolumeOn && styles.volumenOffText}>Off</Text>
        </Text>
      }
    />
  );
};

export const styles = StyleSheet.create({
  volumenOnText: {
    color: "green",
  },
  volumenOffText: {
    color: colors.red,
  },
});

export default React.memo(VolumeOption);
