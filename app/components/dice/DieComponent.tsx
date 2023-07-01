import React, { useCallback, useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";

import colors from "../../config/colors";
import { numberToDieImage } from "./operations/diceOperations";
import { Die, GameState } from "../../types/types";

interface DieProps {
  die: Die;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const DieComponent: React.FC<DieProps> = ({ die, setGameState }) => {
  const [dieImage, setDieImage] = useState<any>(0);

  useEffect(() => {
    setDieImage(numberToDieImage(die.value));
  }, [die.value, setDieImage]);

  const setDieLock = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      dice: prevState.dice.map((d) =>
        d.id === die.id ? { ...d, locked: !d.locked } : d
      ),
    }));
  }, [setGameState]);

  return (
    <Pressable
      onPress={setDieLock}
      style={[styles.dieBorder, die.locked && { backgroundColor: "red" }]}
    >
      <View style={styles.dieBackground}>
        {dieImage !== 0 && <Image source={dieImage} />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dieBorder: {
    padding: 3,
    margin: 5,
    backgroundColor: colors.dieBorder,
    borderRadius: 8,
    elevation: 8,
  },
  dieBackground: {
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default DieComponent;
