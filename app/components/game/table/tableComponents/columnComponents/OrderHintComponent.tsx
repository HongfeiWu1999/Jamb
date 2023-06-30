import React from "react";
import { Pressable } from "react-native";

import colors from "../../../../../config/colors";
import gameStyles from "../../../../../styles/gameStyles";

interface OrderHintComponentProps {
  icon: React.ReactNode;
}

const OrderHintComponent: React.FC<OrderHintComponentProps> = ({ icon }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        gameStyles.component,
        pressed && { backgroundColor: colors.componentPressed },
      ]}
    >
      {icon}
    </Pressable>
  );
};

export default React.memo(OrderHintComponent);
