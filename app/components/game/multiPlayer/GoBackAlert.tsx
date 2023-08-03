import React, { useCallback } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../database/firebase";

import colors from "../../../config/colors";
import { GameGroup } from "../../../types/types";
import {
  buttonStyles,
  commonStyles,
  gameStyles,
} from "../../../styles/GameStyles";

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
  }, [setIsAlertVisible]);

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
      <View style={gameStyles.modalContainer}>
        <View style={gameStyles.viewContainer}>
          <Text style={gameStyles.warningTitle}>
            Exiting Will Result in Game Loss!
          </Text>
          <Text style={gameStyles.warningBody}>
            Are you sure you want to exit the game? Exiting now will result in a
            loss for you, and your opponent will be declared the winner. Please
            reconsider your decision before proceeding.
          </Text>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={[styles.button, buttonStyles.yesButtonColor]}
              onPress={backToStartScreen}
              activeOpacity={0.8}
            >
              <Text style={commonStyles.baseText}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, buttonStyles.noButtonStyle]}
              onPress={hideAlert}
              activeOpacity={0.8}
            >
              <Text style={[commonStyles.baseText, styles.noButtonMargin]}>
                NO
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  noButtonMargin: {
    marginHorizontal: 2,
  },
});

export default React.memo(GoBackAlert);
