import React, { useCallback } from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
import colors from "../../../../../../config/colors";
import { commonStyles, tableStyles } from "../../../../../../styles/GameStyles";
import {
  getDiceValue,
  getUpdatedAccionColumns,
} from "./operations/columnOperations";
import {
  AccionColumn,
  Component,
  GameState,
} from "../../../../../../types/types";

interface ColumnComponentProps {
  component: Component;
  accionColumn: AccionColumn;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  helperHandler: (id: string) => void;
}

const ColumnComponent: React.FC<ColumnComponentProps> = ({
  gameState,
  component,
  accionColumn,
  setGameState,
  helperHandler,
}) => {
  const { dice, locked, opportunities, accionColumns, autoHide } = gameState;
  const { accion, order } = accionColumn;
  const { id, valid, value } = component;

  const isLockComponent = (): boolean =>
    !locked && accion === "lock" && opportunities === 2;

  const isComponentValid = (): boolean =>
    valid && new RegExp(`${id}|\\*`).test(order[0]);

  const isAccionValid = (): boolean => {
    if (locked) {
      return locked.accion === accion && locked.componentId === id;
    } else {
      return accion === "lock" ? opportunities === 2 : opportunities !== 3;
    }
  };

  const isPressableValid: boolean = isComponentValid() && isAccionValid();

  const getComponentText = (): string => {
    if (!valid) {
      return value ? value.toString() : "-";
    } else if (isPressableValid) {
      const diceValue = getDiceValue(dice, id, opportunities);
      return diceValue ? diceValue.toString() : "-";
    } else return "";
  };

  const setComponentLock = () => {
    setGameState((prevState) => ({
      ...prevState,
      locked: {
        accion: accion,
        componentId: id,
      },
    }));
  };

  const setColumValue = () => {
    const updatedDice = dice.map((die) =>
      die.locked
        ? { ...die, locked: !die.locked, value: 0 }
        : { ...die, value: 0 }
    );

    const updatedColumns = getUpdatedAccionColumns(
      accionColumns,
      accion,
      id,
      dice,
      opportunities
    );

    setGameState((prevState) => {
      const newGameState = {
        ...prevState,
        opportunities: 3,
        dice: updatedDice,
        accionColumns: updatedColumns,
        locked: null,
      };
      if (autoHide) newGameState.tableVisibility = false;
      return newGameState;
    });
  };

  const openHelper = useCallback(() => helperHandler(id), [helperHandler]);

  return (
    <View style={commonStyles.flex1View}>
      <Pressable
        disabled={!isPressableValid}
        onPress={isLockComponent() ? setComponentLock : setColumValue}
        onLongPress={openHelper}
        style={[
          tableStyles.component,
          styles.border,
          isPressableValid && styles.validBackground,
        ]}
      >
        {({ pressed }) => (
          <Text
            style={[
              commonStyles.baseText,
              !pressed && component.valid && styles.validTextColor,
            ]}
          >
            {getComponentText()}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: colors.grayBorder,
  },
  validBackground: {
    backgroundColor: colors.componentBackground,
  },
  validTextColor: {
    color: colors.blueText,
  },
});

export default ColumnComponent;
