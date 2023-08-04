import React, { useCallback } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../database/firebase";

import { GameGroup } from "../../../types/types";
import GameAlert from "../../common/GameAlert";

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
  const closeAlert = useCallback(() => {
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
    <GameAlert
      alertVisibility={isAlertVisible}
      title="Exiting Will Result in Game Loss!"
      body="Are you sure you want to exit the game? Exiting now will result in a loss for you, and your opponent will be declared the winner. Please reconsider your decision before proceeding."
      onAccept={backToStartScreen}
      onReject={closeAlert}
    />
  );
};

export default React.memo(GoBackAlert);
