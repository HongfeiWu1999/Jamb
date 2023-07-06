import React from "react";
import { View } from "react-native";

import { commonStyles, tableStyles } from "../../../../../styles/GameStyles";
import HintComponent from "./columnComponents/HintComponent";

interface HintColumnProps {}

const TableHintColumn: React.FC<HintColumnProps> = () => {
  return (
    <View style={tableStyles.colum}>
      <View style={commonStyles.flex1View} />
      <HintComponent id="00" />
      <HintComponent id="01" />
      <HintComponent id="02" />
      <HintComponent id="03" />
      <HintComponent id="04" />
      <HintComponent id="05" />
      <View style={tableStyles.emptyMarginComponent} />
      <HintComponent id="06" />
      <HintComponent id="07" />
      <View style={tableStyles.emptyMarginComponent} />
      <HintComponent id="08" />
      <HintComponent id="09" />
      <HintComponent id="10" />
      <HintComponent id="11" />
      <View style={tableStyles.emptyMarginComponent} />
    </View>
  );
};

export default React.memo(TableHintColumn);
