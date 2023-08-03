import React from "react";
import Option from "./Option";
import { Image, Text } from "react-native";

interface VolumeOptionProps {}

const VolumeOption: React.FC<VolumeOptionProps> = () => {
  return (
    <Option
      onPress={() => {}}
      icon={
        <Image
          style={{ width: 45, height: 45 }}
          source={require("../../../assets/volume_up.png")}
        />
      }
      text={
        <Text>
          <Text style={{ color: "green" }}>On</Text> / <Text>Off</Text>
        </Text>
      }
    />
  );
};

export default React.memo(VolumeOption);
