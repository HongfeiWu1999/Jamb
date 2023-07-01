import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import DieComponent from "./DieComponent";
import { getRandomDie } from "./operations/diceOperations";
import colors from "../../config/colors";

import { GameState } from "../../types/types";

const opportunityImage = require("../../assets/icon_o.png");
const noOpportunityImage = require("../../assets/icon_x.png");

interface DiceProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  isPlayerTurn: boolean;
}

const DiceComponent: React.FC<DiceProps> = ({
  gameState,
  setGameState,
  isPlayerTurn,
}) => {
  const { dice, opportunities, accionColumns } = gameState;
  const [isOnlyBlockColumnRemains, setIsOnlyBlockColumnRemains] =
    useState<boolean>(false);

  const rerollDice = () => {
    setGameState((prevState) => ({
      ...prevState,
      opportunities: prevState.opportunities - 1,
      dice: prevState.dice.map((die) =>
        die.locked ? die : { ...die, ...getRandomDie() }
      ),
    }));
  };

  useEffect(() => {
    if (
      !gameState.accionColumns.reduce((acc, accionColumn) => {
        if (accionColumn.accion !== "lock") {
          return (
            acc +
            accionColumn.components.filter((component) => component.valid)
              .length
          );
        }
        return acc;
      }, 0)
    ) {
      setIsOnlyBlockColumnRemains(true);
    }
  }, accionColumns);

  const isValid =
    isPlayerTurn &&
    (isOnlyBlockColumnRemains ? opportunities === 3 : opportunities);

  return (
    <View style={styles.container}>
      <View style={[styles.board, opportunities === 3 && { display: "none" }]}>
        {dice.map((die) => (
          <DieComponent key={die.id} die={die} setGameState={setGameState} />
        ))}
      </View>
      <TouchableOpacity
        style={[styles.btnReroll, !isValid && { backgroundColor: colors.gray }]}
        onPress={rerollDice}
        activeOpacity={0.85}
        disabled={!isValid}
      >
        {[...Array(3)].map((_, index) => (
          <Image
            key={`image${index + 1}`}
            style={styles.margin}
            source={
              opportunities > 2 - index ? opportunityImage : noOpportunityImage
            }
          />
        ))}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  btnReroll: {
    marginTop: 20,
    flexDirection: "row",
    padding: 10,
    elevation: 3,
    backgroundColor: colors.rerollBackground,
    borderColor: colors.rerollBorder,
    borderWidth: 1,
    borderRadius: 12,
  },
  margin: {
    marginHorizontal: 3,
  },
});

export default DiceComponent;
