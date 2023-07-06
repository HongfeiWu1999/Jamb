import { StyleSheet } from "react-native";
import colors from "../config/colors";

export const tableStyles = StyleSheet.create({
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
  emptyMarginComponent: {
    flex: 1,
    marginTop: 1,
  },
  specialUpIcon: {
    marginLeft: -17,
    marginTop: 1,
  },
});

export const helperStyles = StyleSheet.create({
  helperTitle: {
    fontSize: 36,
    alignSelf: "center",
    fontWeight: "bold",
    color: colors.cyan,
  },
  helperMarginText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  opportunityView: {
    alignSelf: "center",
  },
  opportunityView2: {
    flexDirection: "row-reverse",
  },
  oppotunityText: {
    marginTop: 20,
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 22,
    color: colors.popyRed,
  },
  diceCountView: {
    backgroundColor: colors.diceGray,
    marginTop: 1,
    height: 50,
    width: 50,
    borderRadius: 8,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  probabilityView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  columnView: {
    padding: 1,
  },
  hintText: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  countText: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.popyRed,
  },
  oppOneText: {
    color: colors.green,
  },
  oppTwoText: {
    color: colors.lightBrown,
  },
  optionView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  optionView2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  exampleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.gray,
    marginRight: 15,
  },
});

export const buttonStyles = StyleSheet.create({
  exitButton: {
    alignSelf: "center",
    backgroundColor: colors.popyRed,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderColor: colors.isabelline,
    borderWidth: 1,
  },
  yesButtonColor: {
    backgroundColor: colors.popyRed,
  },
  noButtonStyle: {
    marginLeft: 10,
    backgroundColor: colors.cyan,
  },
  buttonText: {
    fontSize: 30,
    paddingTop: 15,
  },
});

export const gameStyles = StyleSheet.create({
  mainBackGround: {
    flex: 1,
    backgroundColor: colors.cyan,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba( 0, 0, 0, 0.3 )",
    justifyContent: "center",
    alignItems: "center",
  },
  viewContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    margin: 20,
    elevation: 10,
    alignItems: "center",
  },
  viewContainer2: {
    backgroundColor: colors.smokeWhite,
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    elevation: 10,
  },
  warningTitle: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: colors.coral,
  },
  warningBody: {
    marginTop: 20,
    fontSize: 15,
    textAlign: "justify",
    fontWeight: "bold",
    color: colors.tableBackground,
  },
  title: {
    color: colors.cyan,
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 15,
  },
});

export const commonStyles = StyleSheet.create({
  flex1View: {
    flex: 1,
  },
  marginTop10: {
    marginTop: 10,
  },
  marginTop15: {
    marginTop: 15,
  },
  marginTop20: {
    marginTop: 20,
  },
  marginTop25: {
    marginTop: 25,
  },
  marginTop30: {
    marginTop: 30,
  },
  marginTop100: {
    marginTop: 100,
  },
  marginRight10: {
    marginRight: 10,
  },
  paddingHorizontal15: {
    paddingHorizontal: 15,
  },
  centeredView: {
    alignItems: "center",
  },
  rowCenteredView: {
    flexDirection: "row",
    alignItems: "center",
  },
  marginBottom10: {
    marginBottom: 10,
  },
  popyredTextColor: {
    color: colors.popyRed,
  },
  grayTextColor: {
    color: colors.gray,
  },
  redTextColor: {
    color: colors.red,
  },
  baseText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  fontSize20Text: {
    fontSize: 20,
  },
});
