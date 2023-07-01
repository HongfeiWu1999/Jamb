import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

import colors from "../../../config/colors";
import TableHintColumn from "./tableComponents/TableHintColumn";
import TableAccionColumn from "./tableComponents/TableAccionColumn";
import { GameState } from "../../../types/types";

interface TableBodyProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  helperHandler: (id: string) => void;
}

const TableBody: React.FC<TableBodyProps> = ({
  gameState,
  setGameState,
  helperHandler,
}) => {
  const getAccionColumnIcon = useCallback((accion: string) => {
    switch (accion) {
      case "descending":
        return <Entypo name="chevron-down" size={36} color={colors.gray} />;
      case "free":
        return (
          <View style={styles.upDownView}>
            <Entypo name="chevron-down" size={36} color={colors.gray} />
            <Entypo
              style={styles.specialUpIcon}
              name="chevron-up"
              size={36}
              color={colors.gray}
            />
          </View>
        );
      case "ascending":
        return <Entypo name="chevron-up" size={36} color={colors.gray} />;
      default:
        return <Entypo name="lock" size={24} color={colors.gray} />;
    }
  }, []);

  return (
    <View style={styles.tableBody}>
      <TableHintColumn />
      {gameState.accionColumns.map((accionColumn) => (
        <TableAccionColumn
          key={accionColumn.accion}
          icon={getAccionColumnIcon(accionColumn.accion)}
          accionColumn={accionColumn}
          gameState={gameState}
          setGameState={setGameState}
          helperHandler={helperHandler}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  tableBody: {
    flex: 9,
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: colors.tableBackground,
  },
  upDownView: {
    flexDirection: "row",
  },
  specialUpIcon: {
    marginLeft: -17,
    marginTop: 1,
  },
});
export default TableBody;
