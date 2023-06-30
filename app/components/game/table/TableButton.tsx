import React from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

import colors from "../../../config/colors";

interface TableButtonProps {
  isTablevisible: boolean;
  showTable: () => void;
}

const TableButton: React.FC<TableButtonProps> = ({
  isTablevisible,
  showTable,
}) => {
  return (
    <IconButton
      style={[styles.tableButton, isTablevisible && { display: "none" }]}
      icon="table"
      mode="contained"
      iconColor="white"
      size={50}
      onPress={showTable}
    />
  );
};

const styles = StyleSheet.create({
  tableButton: {
    position: "absolute",
    backgroundColor: colors.tableBackground,
    bottom: "5%",
    right: "5%",
  },
});

export default React.memo(TableButton);
