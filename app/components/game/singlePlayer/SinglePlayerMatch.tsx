import React, { useCallback, useEffect } from "react";
import { BackHandler } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { GameOperations } from "../../../types/types";
import GameComponents from "../common/GameComponents";

interface SinglePlayerMatchProps {
  navigation: NativeStackNavigationProp<any, any>;
  gameSlot: number;
  operations: GameOperations;
}

const SinglePlayerMatch: React.FC<SinglePlayerMatchProps> = ({
  navigation,
  gameSlot,
  operations,
}) => {
  const { setIsGameFinished, gameState, hideTable } = operations;

  const currentScore = gameState.accionColumns.reduce(
    (acc, accionColumn) =>
      acc + accionColumn.scores.reduce((sum, score) => sum + score, 0),
    0
  );

  const backToStartScreen = useCallback(() => {
    navigation.navigate({
      name: "StartScreen",
      params: { gameSlot: gameSlot, gameState: gameState },
      merge: true,
    });
  }, [gameSlot, gameState]);

  useEffect(() => {
    const handleBackPress = () => {
      if (gameState.tableVisibility) {
        hideTable();
      } else {
        backToStartScreen();
      }

      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [gameState.tableVisibility]);

  useEffect(() => {
    if (
      !gameState.accionColumns.reduce(
        (acc, accionColumn) =>
          acc +
          accionColumn.components.filter((component) => component.valid).length,
        0
      )
    ) {
      setIsGameFinished(true);
    }
  }, gameState.accionColumns);

  return (
    <GameComponents
      navigation={navigation}
      gameSlot={gameSlot}
      operations={operations}
      currentScore={currentScore}
      isPlayerTurn={true}
      backHandler={backToStartScreen}
    />
  );
};

export default React.memo(SinglePlayerMatch);
