import React from "react";
import { Pressable } from "react-native";

import colors from "../../../../../../config/colors";
import { tableStyles } from "../../../../../../styles/GameStyles";

interface OrderHintComponentProps {
  icon: React.ReactNode;
}

const OrderHintComponent: React.FC<OrderHintComponentProps> = ({ icon }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        tableStyles.component,
        pressed && { backgroundColor: colors.componentPressed },
      ]}
    >
      {icon}
    </Pressable>
  );
};

export default React.memo(OrderHintComponent);
