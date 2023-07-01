import React, { useCallback } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../../../config/colors";
import { Switch } from "react-native-paper";
import { GameState } from "../../../types/types";

interface TableHeaderProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  hideTable: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  gameState,
  setGameState,
  hideTable,
}) => {
  const { autoHide } = gameState;

  const onOffAutoHide = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      autoHide: !autoHide,
    }));
  }, [autoHide, setGameState]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.baseText}>Jamb</Text>
        <View style={styles.autoHideView}>
          <Text style={styles.hintText}>
            AutoHide <Text style={autoHide && styles.onOffTextStyle}>On</Text>/
            <Text style={!autoHide && styles.onOffTextStyle}>Off</Text>
          </Text>
          <Switch
            color={colors.cyan}
            value={autoHide}
            onValueChange={onOffAutoHide}
          />
        </View>
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
    flexDirection: "row",
    alignItems: "center",
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
  icon: {
    marginRight: 10,
  },
  autoHideView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  hintText: {
    color: colors.gray,
    fontSize: 16,
    fontWeight: "bold",
  },
  onOffTextStyle: {
    color: colors.popyRed,
  },
});

export default TableHeader;
