import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, BackHandler, AppState } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../database/firebase";

import colors from "../../../config/colors";
import DiceComponent from "../../dice/DiceComponent";
import Table from "../table/Table";
import {
  GameGroup,
  GameState,
  HelperState,
  MessageType,
} from "../../../types/types";
import ActionHelper from "../../helper/ActionHelper";
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";
import PlayersStatus from "./PlayersStatus";
import { BaseToastProps } from "react-native-toast-message/lib/src/types";
import CongratsPanel from "../congratsPanel/CongratsPanel";
import GoBackAlert from "./GoBackAlert";
import GameButtonsView from "../GameButtonsView";

interface MultiPlayerMatchProps {
  navigation: NativeStackNavigationProp<any, any>;
  userSlot: number;
  groupId: string;
  game: GameState;
}

const toastConfig = {
  success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={styles.successColor}
      contentContainerStyle={styles.toastContainer}
      text1Style={styles.successToast1Text}
    />
  ),
  info: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <InfoToast
      {...props}
      style={styles.successColor}
      contentContainerStyle={styles.toastContainer}
      text1Style={styles.infoToast1Text}
      text2Style={styles.toast2Text}
    />
  ),
  error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={styles.errorColor}
      contentContainerStyle={styles.toastContainer}
      text1Style={styles.infoToast1Text}
      text2Style={styles.toast2Text}
    />
  ),
};

const MultiPlayerMatch: React.FC<MultiPlayerMatchProps> = ({
  navigation,
  userSlot,
  groupId,
  game,
}) => {
  const opponentSlot = (userSlot + 1) % 2;
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [isUserTurn, setIsUserTurn] = useState<boolean>(false);
  const [matchStatus, setMatchStatus] = useState<GameGroup>();
  const [gameState, setGameState] = useState<GameState>(game);
  const [helperState, setHelperState] = useState<HelperState>({
    helperVisibility: false,
    dice: [],
    opportunities: 0,
    componentId: "",
  });
  const [messageQueue, setMessageQueue] = useState<MessageType[]>([]);
  const [isDisplaying, setIsDisplaying] = useState<boolean>(false);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [isGameHelperVisible, setIsGameHelperVisible] =
    useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const showToastFromQueue = () => {
      if (messageQueue.length > 0 && !isDisplaying) {
        setIsDisplaying(true);
        const { type, text1, text2 } = messageQueue[0];
        Toast.show({
          type,
          text1: text1,
          text2: text2,
          visibilityTime: 2000,
          autoHide: true,
          onHide: () => {
            setMessageQueue((prevQueue) => prevQueue.slice(1));
            setIsDisplaying(false);
          },
        });
      }
    };

    timer = setInterval(() => {
      showToastFromQueue();
    }, 750);

    return () => {
      clearInterval(timer);
    };
  }, [messageQueue, isDisplaying]);

  const enqueueMessage = (type: string, text1: string, text2: string) => {
    setMessageQueue((prevQueue) => [...prevQueue, { type, text1, text2 }]);
  };

  useEffect(() => {
    if (!matchStatus) {
      setIsDisplaying(true);
      setTimeout(
        () =>
          Toast.show({
            type: "success",
            text1: "Someone has entered the match. Get ready!!!",
            visibilityTime: 2000,
            autoHide: true,
            onHide: () => setIsDisplaying(false),
          }),
        500
      );
    } else if (
      matchStatus.users.reduce((fin, user) => fin && user.finished, true)
    ) {
      const isWinner =
        matchStatus.users[userSlot].score >=
        matchStatus.users[opponentSlot].score;
      setIsGameFinished(true);
      setIsWinner(isWinner);
    } else if (!matchStatus.users[opponentSlot].active) {
      navigation.navigate("ConectionWarningScreen", {
        groupId: groupId,
        myConection: true,
        opponentConection: false,
      });
    } else {
      const currentTurn = matchStatus.turn === userSlot;
      setIsUserTurn(currentTurn);
      if (currentTurn) {
        enqueueMessage(
          "info",
          "It's Your Turn.",
          `It's ${matchStatus.users[userSlot].name}'s turn now.`
        );
      } else {
        enqueueMessage(
          "error",
          "It's the opponent's turn.",
          `It's ${matchStatus.users[opponentSlot].name}'s turn now.`
        );
      }
    }
  }, [matchStatus]);

  useEffect(() => {
    const groupRef = doc(db, "tables", groupId);
    const unsubscribe = onSnapshot(groupRef, (snapshot) => {
      if (snapshot.exists()) {
        const doc = snapshot.data();
        const matchStatus: GameGroup = {
          groupName: doc.groupName,
          users: doc.users,
          turn: doc.turn,
        };
        setMatchStatus(matchStatus);
      }
    });

    return () => unsubscribe();
  }, [groupId]);

  const currentScore = gameState.accionColumns.reduce(
    (acc, accionColumn) =>
      acc + accionColumn.scores.reduce((sum, score) => sum + score, 0),
    0
  );

  useEffect(() => {
    const updateUserScore = async () => {
      if (matchStatus) {
        const groupRef = doc(db, "tables", groupId);
        await updateDoc(groupRef, {
          users: matchStatus.users.map((user, index) =>
            userSlot === index ? { ...user, score: currentScore } : user
          ),
          turn: opponentSlot,
        });
      }
    };
    updateUserScore().catch((error) =>
      console.error("Error on update user's score:", error)
    );
  }, [gameState.accionColumns, setGameState]);

  const showTable = useCallback(
    () =>
      setGameState((prevState) => ({
        ...prevState,
        tableVisibility: true,
      })),
    [setGameState]
  );

  const showExitAlert = useCallback(() => {
    setIsAlertVisible(true);
  }, [setIsAlertVisible]);

  useEffect(() => {
    const handleBackPress = () => {
      showExitAlert();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  });

  const setUserInActive = useCallback(async () => {
    if (matchStatus) {
      const groupRef = doc(db, "tables", groupId);
      await updateDoc(groupRef, {
        users: matchStatus.users.map((user, index) =>
          userSlot === index ? { ...user, active: false } : user
        ),
      });
    }
    navigation.navigate("ConectionWarningScreen", {
      groupId: groupId,
      myConection: false,
      opponentConection: true,
    });
  }, [matchStatus]);

  useEffect(() => {
    if (
      !gameState.accionColumns.reduce(
        (acc, accionColumn) =>
          acc +
          accionColumn.components.filter((component) => component.valid).length,
        0
      )
    ) {
      const announceFinished = async () => {
        if (matchStatus) {
          const groupRef = doc(db, "tables", groupId);
          await updateDoc(groupRef, {
            users: matchStatus.users.map((user, index) =>
              userSlot === index ? { ...user, finished: true } : user
            ),
            turn: opponentSlot,
          });
        }
      };
      announceFinished().catch((error) =>
        console.error("Error on annouce the game is finished:", error)
      );
    }
  }, gameState.accionColumns);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        setUserInActive().catch((error) =>
          console.error("Error on update user state:", error)
        );
      }
    });

    return () => {
      subscription.remove();
    };
  });

  return (
    <View style={styles.container}>
      {matchStatus && (
        <PlayersStatus
          userSlot={userSlot}
          matchStatus={matchStatus}
          isPlayerTurn={isUserTurn}
        />
      )}
      <DiceComponent
        gameState={gameState}
        setGameState={setGameState}
        isPlayerTurn={isUserTurn && !isGameFinished}
      />
      <GameButtonsView
        gameHelperVisibility={isGameHelperVisible}
        setGameHelperVisibility={setIsGameHelperVisible}
        backToStartScreen={showExitAlert}
        showTable={showTable}
      />
      <Table
        gameState={gameState}
        setGameState={setGameState}
        setHelperState={setHelperState}
      />
      <ActionHelper helperState={helperState} setHelperState={setHelperState} />
      <GoBackAlert
        groupId={groupId}
        userSlot={userSlot}
        matchStatus={matchStatus}
        isAlertVisible={isAlertVisible}
        setIsAlertVisible={setIsAlertVisible}
        navigation={navigation}
      />
      <CongratsPanel
        gameSlot={null}
        finalScore={currentScore}
        visible={isGameFinished}
        finalStatus={{
          groupId: groupId,
          matchStatus: matchStatus,
          isWinner: isWinner,
          userSlot: userSlot,
        }}
        navigation={navigation}
      />

      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cyan,
    alignItems: "center",
    justifyContent: "center",
  },
  successColor: {
    borderLeftColor: "green",
  },
  errorColor: {
    borderLeftColor: "red",
  },
  toastContainer: {
    paddingHorizontal: 15,
  },
  successToast1Text: {
    fontSize: 13,
    fontWeight: "400",
  },
  infoToast1Text: {
    fontSize: 16,
    fontWeight: "400",
  },
  toast2Text: {
    fontSize: 13,
    fontWeight: "400",
  },
});

export default React.memo(MultiPlayerMatch);
