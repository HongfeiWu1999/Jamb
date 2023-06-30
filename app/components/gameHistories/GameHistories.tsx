import React, { useCallback } from "react";
import { View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../../config/colors";
import { GameState } from "../../types/types";
import GameHistory from "./GameHistory";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface GameHistoriesProps {
  navigation: NativeStackNavigationProp<any, any>;
  historyVisibility: boolean;
  setHistoryVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  gameHistories: (GameState | null)[];
  setGameHistories: React.Dispatch<React.SetStateAction<(GameState | null)[]>>;
}

const GameHistories: React.FC<GameHistoriesProps> = ({
  navigation,
  historyVisibility,
  setHistoryVisibility,
  gameHistories,
  setGameHistories,
}) => {
  const closeGameHistory = useCallback(() => {
    setHistoryVisibility(false);
  }, [setHistoryVisibility]);

  return (
    <Modal transparent={true} animationType="fade" visible={historyVisibility}>
      <View style={styles.modalContainer}>
        <View style={styles.viewContainer}>
          {Array.from({ length: 3 }, (_, index) => (
            <GameHistory
              key={`Game_Slot_${index + 1}`}
              navigation={navigation}
              gameSlot={index}
              gameHistories={gameHistories}
              setGameHistories={setGameHistories}
            />
          ))}
          <TouchableOpacity
            onPress={closeGameHistory}
            style={styles.closeButton}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba( 0, 0, 0, 0.3 )",
    justifyContent: "center",
    alignItems: "center",
  },
  viewContainer: {
    backgroundColor: colors.smokeWhite,
    borderRadius: 20,
    paddingVertical: 15,
    paddingLeft: 30,
    paddingRight: 20,
    marginHorizontal: 20,
    elevation: 10,
  },
  closeButton: {
    alignSelf: "center",
    backgroundColor: colors.popyRed,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderColor: colors.isabelline,
    borderWidth: 1,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
});

export default React.memo(GameHistories);
