import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import colors from "../../../config/colors";
import DiceComponent from "../../dice/DiceComponent";
import Table from "../table/Table";
import { GameState, HelperState } from "../../../types/types";
import ActionHelper from "../../helper/ActionHelper";
import CongratsPanel from "../congratsPanel/CongratsPanel";
import GameButtonsView from "../GameButtonsView";

interface SinglePlayerMatchProps {
  navigation: NativeStackNavigationProp<any, any>;
  gameSlot: number;
  game: GameState;
}

const SinglePlayerMatch: React.FC<SinglePlayerMatchProps> = ({
  navigation,
  gameSlot,
  game,
}) => {
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [isGameHelperVisible, setIsGameHelperVisible] =
    useState<boolean>(false);
  const [gameState, setGameState] = useState<GameState>(game);
  const [helperState, setHelperState] = useState<HelperState>({
    helperVisibility: false,
    dice: [],
    opportunities: 0,
    componentId: "",
  });

  const currentScore = gameState.accionColumns.reduce(
    (acc, accionColumn) =>
      acc + accionColumn.scores.reduce((sum, score) => sum + score, 0),
    0
  );

  const showTable = useCallback(
    () =>
      setGameState((prevState) => ({
        ...prevState,
        tableVisibility: true,
      })),
    [setGameState]
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
      backToStartScreen();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  });

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
    <View style={styles.container}>
      <DiceComponent
        gameState={gameState}
        setGameState={setGameState}
        isPlayerTurn={true}
      />
      <GameButtonsView
        gameHelperVisibility={isGameHelperVisible}
        setGameHelperVisibility={setIsGameHelperVisible}
        backToStartScreen={backToStartScreen}
        showTable={showTable}
      />
      <Table
        gameState={gameState}
        setGameState={setGameState}
        setHelperState={setHelperState}
      />

      <ActionHelper helperState={helperState} setHelperState={setHelperState} />
      <CongratsPanel
        gameSlot={gameSlot}
        finalScore={currentScore}
        visible={isGameFinished}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cyan,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default React.memo(SinglePlayerMatch);
