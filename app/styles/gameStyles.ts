import { StyleSheet } from "react-native";

const gameStyles = StyleSheet.create({
  colum: {
    flex: 1,
    padding: 1.5,
  },
  component: {
    flex: 1,
    marginTop: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyComponent: {
    flex: 1,
  },
  emptyMarginComponent: {
    flex: 1,
    marginTop: 1,
  },
  baseText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
});

export default gameStyles;
