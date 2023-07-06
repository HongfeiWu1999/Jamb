import React, { useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import { HelperState } from "../../../../types/types";
import colors from "../../../../config/colors";
import NormalHelper from "./helperTypes/NormalHelper";
import MaxMinHelper from "./helperTypes/MaxMinHelper";
import SpecialHelper from "./helperTypes/SpecialHelper";
import {
  commonStyles,
  gameStyles,
  helperStyles,
} from "../../../../styles/GameStyles";

interface ActionHelperProps {
  helperState: HelperState;
  setHelperState: React.Dispatch<React.SetStateAction<HelperState>>;
}

const ActionHelper: React.FC<ActionHelperProps> = ({
  helperState,
  setHelperState,
}) => {
  const { helperVisibility, opportunities, componentId } = helperState;

  const closeHelper = useCallback(
    () =>
      setHelperState((prevState) => ({
        ...prevState,
        helperVisibility: false,
      })),
    [setHelperState]
  );

  useEffect(() => {
    const handleBackPress = () => {
      if (helperVisibility) {
        closeHelper();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [helperVisibility]);

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={helperVisibility}
      onRequestClose={closeHelper}
    >
      <View style={gameStyles.modalContainer}>
        <View style={styles.viewContainer}>
          <Text style={helperStyles.helperTitle}>Probability Table</Text>
          {opportunities ? (
            (componentId < "06" && (
              <NormalHelper helperState={helperState} />
            )) ||
            (componentId < "08" && (
              <MaxMinHelper helperState={helperState} />
            )) || <SpecialHelper helperState={helperState} />
          ) : (
            <View style={commonStyles.centeredView}>
              <Text style={styles.hintTitle}>
                Oops!!! <Entypo name="emoji-sad" size={50} color="black" />
              </Text>
              <Text style={styles.hintBody}>
                There are no more opportunities to roll, please fill one of the
                table cells to reset the dice opportunities.
              </Text>
            </View>
          )}
          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={closeHelper}
              style={styles.closeButton}
              activeOpacity={0.8}
            >
              <Text style={commonStyles.baseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    margin: 20,
    elevation: 10,
  },
  hintTitle: {
    fontSize: 50,
    fontWeight: "bold",
    color: colors.cyan,
  },
  hintBody: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: colors.gray,
    textAlign: "justify",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
  },
  closeButton: {
    backgroundColor: colors.popyRed,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderColor: colors.isabelline,
    borderWidth: 1,
  },
});

export default React.memo(ActionHelper);
