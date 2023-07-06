import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

import colors from "../../../../config/colors";
import GameHelper from "../helper/GameHelper";
import { commonStyles } from "../../../../styles/GameStyles";

interface GameButtonsViewProps {
  gameHelperVisibility: boolean;
  setGameHelperVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  backHandler: () => void;
  showTable: () => void;
}

const GameButtonsView: React.FC<GameButtonsViewProps> = ({
  gameHelperVisibility,
  setGameHelperVisibility,
  backHandler,
  showTable,
}) => {
  return (
    <View style={styles.container}>
      <IconButton
        style={styles.exitButton}
        icon="exit-to-app"
        mode="contained"
        iconColor="white"
        size={40}
        onPress={backHandler}
      />
      <View style={commonStyles.centeredView}>
        <GameHelper
          isVisible={gameHelperVisibility}
          setIsVisible={setGameHelperVisibility}
        />
        <IconButton
          style={styles.tableButton}
          icon="table"
          mode="contained"
          iconColor="white"
          size={50}
          onPress={showTable}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: "5%",
    bottom: "3%",
    position: "absolute",
  },
  tableButton: {
    backgroundColor: colors.tableBackground,
  },
  exitButton: {
    alignSelf: "flex-end",
    backgroundColor: colors.darkRed2,
    borderColor: colors.rerollBorder,
    borderWidth: 0.2,
    transform: [{ rotateY: "180deg" }],
  },
});

export default React.memo(GameButtonsView);
