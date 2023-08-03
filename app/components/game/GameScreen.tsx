import React, { useState, useCallback } from "react";
import { Route } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import MultiplayerMatch from "./multiplayer/MultiplayerMatch";
import { GameState, HelperState } from "../../types/types";
import { View } from "react-native";
import { gameStyles } from "../../styles/GameStyles";
import SoloMatch from "./singleplayer/SoloMatch";

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
    <View style={gameStyles.mainBackGround}>
      {(route.params?.gameSlot !== undefined && (
        <SoloMatch
          navigation={navigation}
          gameSlot={route.params?.gameSlot}
          operations={gameOperations}
        />
      )) || (
        <MultiplayerMatch
          navigation={navigation}
          userSlot={route.params?.userSlot}
          groupId={route.params?.groupId}
          operations={gameOperations}
        />
      )}
    </View>
  );
};

export default React.memo(GameScreen);
