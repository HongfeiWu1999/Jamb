import { GameState } from "../../types/types";

const TABLE_COLUMNS = ["descending", "free", "ascending", "lock"];

const getColumnOrderByAccion = (accion: string): string[] => {
  switch (accion) {
    case "ascending":
      return Array.from({ length: 12 }, (_, index) =>
        (11 - index).toString().padStart(2, "0")
      );
    case "descending":
      return Array.from({ length: 12 }, (_, index) =>
        index.toString().padStart(2, "0")
      );
    default:
      return Array(12).fill("*");
  }
};

export const startNewGame = (): GameState => {
  return {
    tableVisibility: false,
    opportunities: 3,
    dice: Array.from({ length: 6 }, (_, index) => ({
      id: `die_${index + 1}`,
      value: 0,
      locked: false,
    })),
    accionColumns: TABLE_COLUMNS.map((accion) => ({
      accion: accion,
      components: Array.from({ length: 12 }, (_, index) => ({
        id: index.toString().padStart(2, "0"),
        value: 0,
        valid: true,
      })),
      scores: [0, 0, 0],
      order: getColumnOrderByAccion(accion),
    })),
    locked: null,
    autoHide: false,
  };
};
