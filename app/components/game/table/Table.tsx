import React, { useCallback, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  StatusBar,
  BackHandler,
} from "react-native";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { GameState, HelperState } from "../../../types/types";

interface TableProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  setHelperState: React.Dispatch<React.SetStateAction<HelperState>>;
}

const Table: React.FC<TableProps> = ({
  gameState,
  setGameState,
  setHelperState,
}) => {
  const slideAnimation = useRef(new Animated.Value(-1)).current;

  const hideTable = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      tableVisibility: false,
    }));
  }, [setGameState]);

  useEffect(() => {
    if (gameState.tableVisibility) {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: -1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [gameState.tableVisibility]);

  useEffect(() => {
    const handleBackPress = () => {
      if (gameState.tableVisibility) {
        hideTable();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [gameState.tableVisibility]);

  const openHelper = useCallback(
    (id: string) =>
      setHelperState({
        helperVisibility: true,
        dice: gameState.dice,
        opportunities: gameState.opportunities,
        componentId: id,
      }),
    [gameState.dice, gameState.opportunities, setHelperState]
  );

  return (
    <Animated.View
      style={[
        styles.tableView,
        {
          transform: [
            {
              translateY: slideAnimation.interpolate({
                inputRange: [-1, 0],
                outputRange: [1000, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.tableContainer}>
        <TableHeader hideTable={hideTable} />
        <TableBody
          gameState={gameState}
          setGameState={setGameState}
          helperHandler={openHelper}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tableView: {
    position: "absolute",
    flexDirection: "column-reverse",
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  tableContainer: {
    height: "95%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default React.memo(Table);
