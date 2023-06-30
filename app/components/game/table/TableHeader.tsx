import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../../../config/colors";

interface TableHeaderProps {
  hideTable: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ hideTable }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.baseText}>Jamb</Text>
      </View>
      <TouchableOpacity
        style={styles.mainButton}
        onPress={hideTable}
        activeOpacity={0.8}
      >
        <FontAwesome style={styles.icon} name="close" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.tableBackground,
    borderTopRightRadius: 50,
  },
  header: {
    flex: 8,
    justifyContent: "center",
  },
  baseText: {
    marginLeft: 15,
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  mainButton: {
    height: "70%",
    flex: 2,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 20,
  },
  icon: { marginRight: 10 },
});

export default TableHeader;
