import React from "react";
import { View, Text } from "react-native";

import { commonStyles, tableStyles } from "../../../../../../styles/GameStyles";

interface TextComponentProps {
  number: number;
}

const TextComponent: React.FC<TextComponentProps> = ({ number }) => {
  return (
    <View style={tableStyles.component}>
      <Text style={[commonStyles.baseText, commonStyles.popyredTextColor]}>
        {number ? number : ""}
      </Text>
    </View>
  );
};

export default TextComponent;
