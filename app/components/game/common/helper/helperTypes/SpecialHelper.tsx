import React from "react";
import { View } from "react-native";

import { HelperState } from "../../../../../types/types";
import PokerYambComponent from "../helperComponents/specialHelperComponents/PokerYambComponent";
import KentaComponent from "../helperComponents/specialHelperComponents/KentaComponent";
import FullComponent from "../helperComponents/specialHelperComponents/FullComponent";

interface SpecialHelperProps {
  helperState: HelperState;
}

const SpecialHelper: React.FC<SpecialHelperProps> = ({ helperState }) => {
  const { componentId } = helperState;
  return (
    <View>
      {(componentId === "08" && <KentaComponent helperState={helperState} />) ||
        (componentId === "09" && (
          <FullComponent helperState={helperState} />
        )) || <PokerYambComponent helperState={helperState} />}
    </View>
  );
};

export default React.memo(SpecialHelper);
