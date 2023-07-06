import React from "react";
import { View } from "react-native";

import { tableStyles } from "../../../../../styles/GameStyles";
import OrderHintComponent from "./columnComponents/OrderHintComponent";
import TextComponent from "./columnComponents/TextComponent";
import ColumnComponent from "./columnComponents/ColumnComponent";
import { AccionColumn, GameState } from "../../../../../types/types";

interface AccionColumnProps {
  icon: React.ReactNode;
  accionColumn: AccionColumn;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  helperHandler: (id: string) => void;
}

const TableAccionColumn: React.FC<AccionColumnProps> = ({
  icon,
  accionColumn,
  gameState,
  setGameState,
  helperHandler,
}) => {
  const normalSeccion = accionColumn.components.slice(0, 6);
  const maxMinSeccion = accionColumn.components.slice(6, 8);
  const specialSeccion = accionColumn.components.slice(8, 12);

  return (
    <View style={tableStyles.colum}>
      <OrderHintComponent icon={icon} />
      {normalSeccion.map((component) => (
        <ColumnComponent
          key={component.id}
          component={component}
          accionColumn={accionColumn}
          gameState={gameState}
          setGameState={setGameState}
          helperHandler={helperHandler}
        />
      ))}
      <TextComponent number={accionColumn.scores[0]} />
      {maxMinSeccion.map((component) => (
        <ColumnComponent
          key={component.id}
          component={component}
          accionColumn={accionColumn}
          gameState={gameState}
          setGameState={setGameState}
          helperHandler={helperHandler}
        />
      ))}
      <TextComponent number={accionColumn.scores[1]} />
      {specialSeccion.map((component) => (
        <ColumnComponent
          key={component.id}
          component={component}
          accionColumn={accionColumn}
          gameState={gameState}
          setGameState={setGameState}
          helperHandler={helperHandler}
        />
      ))}
      <TextComponent number={accionColumn.scores[2]} />
    </View>
  );
};

export default TableAccionColumn;
