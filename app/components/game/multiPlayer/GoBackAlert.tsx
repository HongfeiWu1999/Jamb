import React, { useCallback } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../database/firebase";

import colors from "../../../config/colors";
import { GameGroup } from "../../../types/types";

interface GoBackAlertProps {
  groupId: string;
  userSlot: number;
  matchStatus: GameGroup | undefined;
  isAlertVisible: boolean;
  setIsAlertVisible: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: NativeStackNavigationProp<any, any>;
}

const GoBackAlert: React.FC<GoBackAlertProps> = ({
  groupId,
  userSlot,
  matchStatus,
  isAlertVisible,
  setIsAlertVisible,
  navigation,
}) => {
  const hideAlert = useCallback(() => {
    setIsAlertVisible(false);
  }, []);

  const backToStartScreen = useCallback(() => {
    const opponentSlot = (userSlot + 1) % 2;

    if (matchStatus?.users[opponentSlot].active) {
      const setUserInActive = async () => {
        const groupRef = doc(db, "tables", groupId);
        await updateDoc(groupRef, {
          users: matchStatus.users.map((user, index) =>
            userSlot === index ? { ...user, active: false } : user
          ),
        });
      };
      setUserInActive().catch((error) =>
        console.error("Error on update user state:", error)
      );
    } else {
      const deleteGameGroup = async () => {
        const groupRef = doc(db, "tables", groupId);
        await deleteDoc(groupRef);
      };
      deleteGameGroup().catch((error) =>
        console.error("Error on deliting game group:", error)
      );
    }
    navigation.navigate("StartScreen");
  }, [userSlot, matchStatus]);

  return (
    <Modal transparent={true} animationType="fade" visible={isAlertVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.viewContainer}>
          <Text style={styles.warningTitle}>
            Exiting Will Result in Game Loss!
          </Text>
          <Text style={styles.warningBody}>
            Are you sure you want to exit the game? Exiting now will result in a
            loss for you, and your opponent will be declared the winner. Please
            reconsider your decision before proceeding.
          </Text>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={[styles.button, styles.yesButtonColor]}
              onPress={backToStartScreen}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.noButtonStyle]}
              onPress={hideAlert}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, styles.noButtonMargin]}>NO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  buttonView: {
    marginTop: 20,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  button: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderColor: colors.isabelline,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  yesButtonColor: {
    backgroundColor: colors.popyRed,
  },
  noButtonStyle: {
    marginLeft: 10,
    backgroundColor: colors.cyan,
  },
  noButtonMargin: {
    marginHorizontal: 2,
  },
});

export default React.memo(GoBackAlert);
