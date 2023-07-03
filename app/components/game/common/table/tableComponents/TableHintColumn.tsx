import React from "react";
import { View } from "react-native";

import gameStyles from "../../../../../styles/gameStyles";
import HintComponent from "./columnComponents/HintComponent";

interface HintColumnProps {}

const TableHintColumn: React.FC<HintColumnProps> = () => {
  return (
    <View style={gameStyles.colum}>
      <View style={gameStyles.emptyComponent} />
      <HintComponent id="00" />
      <HintComponent id="01" />
      <HintComponent id="02" />
      <HintComponent id="03" />
      <HintComponent id="04" />
      <HintComponent id="05" />
      <View style={gameStyles.emptyMarginComponent} />
      <HintComponent id="06" />
      <HintComponent id="07" />
      <View style={gameStyles.emptyMarginComponent} />
      <HintComponent id="08" />
      <HintComponent id="09" />
      <HintComponent id="10" />
      <HintComponent id="11" />
      <View style={gameStyles.emptyMarginComponent} />
    </View>
  );
};

export default React.memo(TableHintColumn);
