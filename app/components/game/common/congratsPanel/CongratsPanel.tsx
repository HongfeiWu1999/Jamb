import React, { useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../../database/firebase";

import colors from "../../../../config/colors";
import { FinalStatus } from "../../../../types/types";
import {
  buttonStyles,
  commonStyles,
  gameStyles,
  helperStyles,
} from "../../../../styles/GameStyles";

interface CongratsPanelProps {
  gameSlot: number | undefined;
  finalScore: number;
  visible: boolean;
  finalStatus?: FinalStatus;
  navigation: NativeStackNavigationProp<any, any>;
}

const CongratsPanel: React.FC<CongratsPanelProps> = ({
  gameSlot,
  finalScore,
  visible,
  finalStatus,
  navigation,
}) => {
  const backToStartScreen = useCallback(() => {
    if (gameSlot || !finalStatus) {
      navigation.navigate({
        name: "StartScreen",
        params: { gameSlot: gameSlot, gameState: null },
        merge: true,
      });
    } else {
      const { groupId, matchStatus, userSlot } = finalStatus;
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
    }
  }, [gameSlot, finalStatus]);

  useEffect(() => {
    const handleBackPress = () => {
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  });

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={gameStyles.modalContainer}>
        <View style={gameStyles.viewContainer}>
          <Text style={helperStyles.helperTitle}>Congratulations!!!</Text>
          <Text style={styles.hintBody}>
            You have finished the game with the score below:
          </Text>
          <Text style={styles.finalScore}>{finalScore}</Text>
          {finalStatus !== undefined && (
            <Text
              style={[
                styles.winnerLosserTitle,
                (finalStatus.isWinner && styles.winnerColor) ||
                  commonStyles.grayTextColor,
              ]}
            >
              {(finalStatus.isWinner && "Victory is yours!") ||
                "You Have Lost."}
            </Text>
          )}
          <TouchableOpacity
            style={[buttonStyles.exitButton, commonStyles.marginTop30]}
            onPress={backToStartScreen}
            activeOpacity={0.8}
          >
            <Text style={commonStyles.baseText}>Back to Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  winnerLosserTitle: {
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "bold",
  },
  finalScore: {
    marginTop: 20,
    fontSize: 50,
    fontWeight: "bold",
    color: colors.cyan,
  },
  hintBody: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: colors.tableBackground,
    textAlign: "center",
  },
  winnerColor: {
    color: colors.winnerGreen,
  },
});

export default React.memo(CongratsPanel);
