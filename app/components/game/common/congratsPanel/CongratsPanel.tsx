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
    if (!gameSlot || !finalStatus) {
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
      <View style={styles.modalContainer}>
        <View style={styles.viewContainer}>
          <Text style={styles.helperTitle}>Congratulations!!!</Text>
          <Text style={styles.hintBody}>
            You have finished the game with the score below:
          </Text>
          <Text style={styles.finalScore}>{finalScore}</Text>
          {finalStatus !== undefined && (
            <Text
              style={[
                styles.winnerLosserTitle,
                (finalStatus.isWinner && styles.winnerColor) ||
                  styles.loserColor,
              ]}
            >
              {(finalStatus.isWinner && "Victory is yours!") ||
                "You Have Lost."}
            </Text>
          )}
          <TouchableOpacity
            style={styles.exitButton}
            onPress={backToStartScreen}
            activeOpacity={0.8}
          >
            <Text style={styles.exitButtonText}>Back to Start</Text>
          </TouchableOpacity>
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
  helperTitle: {
    fontSize: 36,
    alignSelf: "center",
    fontWeight: "bold",
    color: colors.cyan,
  },
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
  exitButton: {
    alignSelf: "center",
    backgroundColor: colors.popyRed,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderColor: colors.isabelline,
    borderWidth: 1,
    marginTop: 30,
  },
  exitButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  winnerColor: {
    color: colors.winnerGreen,
  },
  loserColor: {
    color: colors.gray,
  },
});

export default React.memo(CongratsPanel);
