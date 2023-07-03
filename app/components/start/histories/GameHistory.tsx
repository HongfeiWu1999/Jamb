import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AccionColumn, GameState } from "../../../types/types";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { startNewGame } from "../../game/operations/GameManager";

import colors from "../../../config/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IconButton } from "react-native-paper";

interface GameHistoryProps {
  navigation: NativeStackNavigationProp<any, any>;
  gameSlot: number;
  gameHistories: (GameState | null)[];
  setGameHistories: React.Dispatch<React.SetStateAction<(GameState | null)[]>>;
}

const getTotalFilledColumns = (accionColumns: AccionColumn[]) => {
  let sumNotFilled = 0;
  accionColumns.forEach(
    (accionColumn) => (sumNotFilled += accionColumn.order.length)
  );
  return 48 - sumNotFilled;
};

const GameHistory: React.FC<GameHistoryProps> = ({
  navigation,
  gameSlot,
  gameHistories,
  setGameHistories,
}) => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const gameHistory: GameState | null = gameHistories[gameSlot];

  const startNewGameHandler = useCallback(() => {
    navigation.navigate("GameScreen", {
      gameSlot: gameSlot,
      gameState: startNewGame(),
    });
  }, [gameSlot]);

  const resumeGameHandler = useCallback(() => {
    navigation.navigate("GameScreen", {
      gameSlot: gameSlot,
      gameState: gameHistory,
    });
  }, [gameSlot, gameHistory]);

  const openDeleteAlert = useCallback(() => {
    setIsDelete(true);
  }, [setIsDelete]);

  const closeDeleteAlert = useCallback(() => {
    setIsDelete(false);
  }, [setIsDelete]);

  const deleteGameHistoryHandler = useCallback(() => {
    setGameHistories((prevState) =>
      prevState.map((gameHistory, index) =>
        index === gameSlot ? null : gameHistory
      )
    );
  }, [gameSlot, setGameHistories]);

  return (
    <>
      {(gameHistory && (
        <View style={styles.container}>
          {(isDelete && (
            <View style={styles.resumeButton}>
              <Text style={styles.deleteWarning}>Delete Slot?</Text>
              <View style={styles.deleteView}>
                <IconButton
                  onPress={deleteGameHistoryHandler}
                  icon="check"
                  iconColor="green"
                  size={30}
                />
                <IconButton
                  onPress={closeDeleteAlert}
                  icon="window-close"
                  iconColor="red"
                  size={30}
                />
              </View>
            </View>
          )) || (
            <TouchableOpacity
              style={styles.resumeButton}
              onPress={resumeGameHandler}
              activeOpacity={0.8}
            >
              <Text style={styles.hintText}>Resume Game</Text>
              <View style={styles.hintView}>
                <View style={styles.iconView}>
                  <MaterialCommunityIcons
                    name="table-check"
                    size={24}
                    color={colors.popyRed}
                  />
                  <Text style={styles.columnFilledText}>
                    {getTotalFilledColumns(gameHistory.accionColumns)}/48
                  </Text>
                </View>
                <View style={styles.iconView}>
                  <MaterialIcons
                    name="replay"
                    size={21}
                    color={colors.popyRed}
                  />
                  <Text style={styles.columnFilledText}>
                    {gameHistory.opportunities}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={openDeleteAlert}
            activeOpacity={0.8}
          >
            <Text style={styles.deleteText}>X</Text>
          </TouchableOpacity>
        </View>
      )) || (
        <TouchableOpacity
          style={styles.startButton}
          onPress={startNewGameHandler}
          activeOpacity={0.8}
        >
          <Text style={styles.hintText}>New Game</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  resumeButton: {
    width: 204.5,
    height: 68.5,
    elevation: 3,
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  startButton: {
    justifyContent: "center",
    width: 204.5,
    height: 68.5,
    elevation: 3,
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
    marginRight: 10,
  },
  columnFilledText: {
    marginLeft: 3,
    fontStyle: "italic",
    fontWeight: "bold",
    color: colors.moderateGray,
  },
  deleteButton: {
    elevation: 3,
    backgroundColor: "white",
    marginLeft: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  hintView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  hintText: {
    alignSelf: "center",
    fontSize: 25,
    color: colors.cyan,
    fontWeight: "bold",
  },
  iconView: {
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  deleteView: {
    marginTop: -15,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  deleteWarning: {
    color: colors.cyan,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  deleteText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.moderateGray,
  },
});

export default React.memo(GameHistory);
