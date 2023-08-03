import React, { useCallback } from "react";
import { View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../../../config/colors";
import { GameState, PanelVisibilityState } from "../../../types/types";
import GameHistory from "./GameHistory";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  buttonStyles,
  commonStyles,
  gameStyles,
} from "../../../styles/GameStyles";

interface GameHistoriesProps {
  navigation: NativeStackNavigationProp<any, any>;
  panelVisibility: boolean;
  setPanelVisibility: React.Dispatch<
    React.SetStateAction<PanelVisibilityState>
  >;
  gameHistories: (GameState | null)[];
  setGameHistories: React.Dispatch<React.SetStateAction<(GameState | null)[]>>;
}

const GameHistories: React.FC<GameHistoriesProps> = ({
  navigation,
  panelVisibility,
  setPanelVisibility,
  gameHistories,
  setGameHistories,
}) => {
  const closeHistoryPanel = useCallback(() => {
    setPanelVisibility((prevState) => ({
      ...prevState,
      isHistoryPanelVisible: false,
    }));
  }, [setPanelVisibility]);

  return (
    <Modal transparent={true} animationType="fade" visible={panelVisibility}>
      <View style={gameStyles.modalContainer}>
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
            onPress={closeHistoryPanel}
            style={[buttonStyles.exitButton, commonStyles.marginTop10]}
            activeOpacity={0.8}
          >
            <Text style={commonStyles.baseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: colors.smokeWhite,
    borderRadius: 20,
    paddingVertical: 15,
    paddingLeft: 30,
    paddingRight: 20,
    marginHorizontal: 20,
    elevation: 10,
  },
});

export default React.memo(GameHistories);
