import React, { useCallback } from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
import colors from "../../../../../config/colors";
import gameStyles from "../../../../../styles/gameStyles";
import { getDiceValue } from "./operations/columnOperations";
import { AccionColumn, Component, GameState } from "../../../../../types/types";

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
  const { dice, locked, opportunities, accionColumns } = gameState;
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

    const updatedColumns = accionColumns.map((column) => {
      if (column.accion === accion) {
        const updatedColumn = {
          ...column,
          components: column.components.map((c) =>
            c.id === id
              ? {
                  ...c,
                  value: getDiceValue(dice, id, opportunities),
                  valid: false,
                }
              : c
          ),
          order: column.order.slice(1),
        };

        const normalSeccion = updatedColumn.components.slice(0, 6);
        let normalSeccionScore = normalSeccion.reduce(
          (acc, { value }) => acc + value,
          0
        );
        if (normalSeccionScore >= 60) normalSeccionScore += 30;

        const maxMinSeccion = updatedColumn.components.slice(6, 8);
        const maxMinSeccionScore =
          maxMinSeccion[0].value && maxMinSeccion[1].value
            ? Math.max(
                0,
                (maxMinSeccion[0].value - maxMinSeccion[1].value) *
                  normalSeccion[0].value
              )
            : 0;

        const specialSeccion = updatedColumn.components.slice(8, 12);
        const specialSeccionScore = specialSeccion.reduce(
          (acc, { value }) => acc + value,
          0
        );

        const scores = [
          normalSeccionScore,
          maxMinSeccionScore,
          specialSeccionScore,
        ];
        updatedColumn.scores = scores;

        return updatedColumn;
      }
      return column;
    });

    setGameState({
      ...gameState,
      opportunities: 3,
      dice: updatedDice,
      accionColumns: updatedColumns,
      locked: null,
    });
  };

  const openHelper = useCallback(() => helperHandler(id), [helperHandler]);

  return (
    <View style={styles.container}>
      <Pressable
        disabled={!isPressableValid}
        onPress={isLockComponent() ? setComponentLock : setColumValue}
        onLongPress={openHelper}
        style={[
          gameStyles.component,
          styles.border,
          isPressableValid && styles.validBackground,
        ]}
      >
        {({ pressed }) => (
          <Text
            style={[
              gameStyles.baseText,
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
  container: {
    flex: 1,
  },
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
