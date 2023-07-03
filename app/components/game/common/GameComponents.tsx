import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Table from "../common/table/Table";
import { FinalStatus, GameOperations } from "../../../types/types";
import CongratsPanel from "../common/congratsPanel/CongratsPanel";
import GameButtonsView from "../common/buttonsView/GameButtonsView";
import DiceComponent from "../common/dice/DiceComponent";
import ActionHelper from "../common/helper/ActionHelper";

interface GameComponentsProps {
  navigation: NativeStackNavigationProp<any, any>;
  gameSlot?: number;
  operations: GameOperations;
  currentScore: number;
  isPlayerTurn: boolean;
  backHandler: () => void;
  finalStatus?: FinalStatus;
}

const GameComponents: React.FC<GameComponentsProps> = ({
  navigation,
  gameSlot,
  operations,
  currentScore,
  isPlayerTurn,
  backHandler,
  finalStatus,
}) => {
  const {
    isGameFinished,
    isGameHelperVisible,
    setIsGameHelperVisible,
    gameState,
    setGameState,
    helperState,
    setHelperState,
    showTable,
    hideTable,
  } = operations;

  return (
    <>
      <DiceComponent
        gameState={gameState}
        setGameState={setGameState}
        isPlayerTurn={isPlayerTurn && !isGameFinished}
      />
      <GameButtonsView
        gameHelperVisibility={isGameHelperVisible}
        setGameHelperVisibility={setIsGameHelperVisible}
        backHandler={backHandler}
        showTable={showTable}
      />
      <Table
        gameState={gameState}
        setGameState={setGameState}
        setHelperState={setHelperState}
        hideTable={hideTable}
      />
      <ActionHelper helperState={helperState} setHelperState={setHelperState} />
      <CongratsPanel
        gameSlot={gameSlot}
        finalScore={currentScore}
        visible={isGameFinished}
        finalStatus={finalStatus}
        navigation={navigation}
      />
    </>
  );
};

export default React.memo(GameComponents);
