import React, { useState, useCallback } from "react";
import { Route } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import SinglePlayerMatch from "./singlePlayer/SinglePlayerMatch";
import MultiPlayerMatch from "./multiPlayer/MultiPlayerMatch";
import { GameState, HelperState } from "../../types/types";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";

interface GameScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: Route<any, any>;
}

const GameScreen: React.FC<GameScreenProps> = ({ navigation, route }) => {
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [isGameHelperVisible, setIsGameHelperVisible] =
    useState<boolean>(false);
  const [gameState, setGameState] = useState<GameState>(
    route.params?.gameState
  );
  const [helperState, setHelperState] = useState<HelperState>({
    helperVisibility: false,
    dice: [],
    opportunities: 0,
    componentId: "",
  });

  const showTable = useCallback(
    () =>
      setGameState((prevState) => ({
        ...prevState,
        tableVisibility: true,
      })),
    [setGameState]
  );

  const hideTable = useCallback(
    () =>
      setGameState((prevState) => ({
        ...prevState,
        tableVisibility: false,
      })),
    [setGameState]
  );

  const gameOperations = {
    isGameFinished: isGameFinished,
    setIsGameFinished: setIsGameFinished,
    isGameHelperVisible: isGameHelperVisible,
    setIsGameHelperVisible: setIsGameHelperVisible,
    gameState: gameState,
    setGameState: setGameState,
    helperState: helperState,
    setHelperState: setHelperState,
    showTable: showTable,
    hideTable: hideTable,
  };

  return (
    <View style={styles.mainBackGround}>
      {(route.params?.gameSlot !== undefined && (
        <SinglePlayerMatch
          navigation={navigation}
          gameSlot={route.params?.gameSlot}
          operations={gameOperations}
        />
      )) || (
        <MultiPlayerMatch
          navigation={navigation}
          userSlot={route.params?.userSlot}
          groupId={route.params?.groupId}
          operations={gameOperations}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainBackGround: {
    flex: 1,
    backgroundColor: colors.cyan,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default React.memo(GameScreen);
