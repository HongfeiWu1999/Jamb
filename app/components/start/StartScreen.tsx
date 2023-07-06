import React, { useState, useEffect, useCallback } from "react";
import { View, AppState } from "react-native";
import { Button } from "react-native-paper";
import { Route } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../database/firebase";

import colors from "../../config/colors";
import LoginScreen from "./login/LoginScreen";
import { GameState, UserState } from "../../types/types";
import GameHistories from "./histories/GameHistories";
import MultiPlayerPanel from "./multiplayer/MultiPlayerPanel";
import StartTitle from "./StartTitle";
import {
  buttonStyles,
  commonStyles,
  gameStyles,
} from "../../styles/GameStyles";

interface StartScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: Route<any, any>;
}

const StartScreen: React.FC<StartScreenProps> = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState<UserState | undefined>(undefined);
  const [userGameHistories, setUserGameHistories] = useState<
    (GameState | null)[]
  >([]);
  const [historyVisibility, setHistoryVisibility] = useState<boolean>(false);
  const [multiPlayerVisibility, setMultiPlayerVisibility] =
    useState<boolean>(false);

  useEffect(() => {
    obtainUserGameHistories().catch((error) => {
      console.error("Error accesing user's game histories:", error);
    });
  }, [userInfo]);

  const obtainUserGameHistories = async () => {
    if (userInfo) {
      const userId = userInfo.id.toString();
      let gameHistories = await getUserHistories();
      if (!gameHistories) {
        const docSnap = await getDoc(doc(db, "users", userId));
        if (docSnap.exists()) {
          gameHistories = docSnap.data().histories;
        } else {
          gameHistories = [null, null, null];
        }
      }
      setUserGameHistories(gameHistories);
    } else {
      setUserGameHistories([]);
    }
  };

  const getUserHistories = async () => {
    try {
      const data = await AsyncStorage.getItem("@Game_Histories");
      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      console.error("Error getting user's game histories:", error);
      throw error;
    }
  };

  const openGameHistory = useCallback(() => {
    setHistoryVisibility(true);
  }, [setHistoryVisibility]);

  const openMultiplayerPanel = useCallback(() => {
    setMultiPlayerVisibility(true);
  }, [setMultiPlayerVisibility]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setHistoryVisibility(false);
      setMultiPlayerVisibility(false);
    });
    return unsubscribe;
  });

  useEffect(() => {
    const gameSlot = route.params?.gameSlot;
    const newGameState = route.params?.gameState;
    if (!isNaN(gameSlot)) {
      setUserGameHistories((prevState) =>
        prevState.map((gameHistory, index) =>
          index === gameSlot ? newGameState : gameHistory
        )
      );
    }
  }, [route.params?.gameSlot, route.params?.gameState]);

  const closeUserSession = () => {
    const closeUserSessionAsync = async () => {
      if (userInfo) {
        const userId = userInfo.id.toString();
        await setDoc(doc(db, "users", userId), {
          histories: userGameHistories,
        });
        await AsyncStorage.removeItem("@User");
        await AsyncStorage.removeItem("@Game_Histories");
        setUserInfo(undefined);
        setUserGameHistories([]);
      }
    };
    closeUserSessionAsync().catch((error) =>
      console.error("Error closing user session:", error)
    );
  };

  const saveLocalGameHistories = async () => {
    if (userGameHistories && userGameHistories.length !== 0) {
      await AsyncStorage.setItem(
        "@Game_Histories",
        JSON.stringify(userGameHistories)
      );
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        saveLocalGameHistories().catch((error) =>
          console.error("Error saving user's game histories:", error)
        );
      }
    });

    return () => {
      subscription.remove();
    };
  });

  return (
    <View style={gameStyles.mainBackGround}>
      <StartTitle />
      <View style={commonStyles.flex1View}>
        <Button
          onPress={openGameHistory}
          mode="contained"
          labelStyle={buttonStyles.buttonText}
          buttonColor="red"
          textColor="white"
        >
          Start Game
        </Button>
        <Button
          style={commonStyles.marginTop10}
          onPress={openMultiplayerPanel}
          mode="contained"
          labelStyle={buttonStyles.buttonText}
          buttonColor={colors.brownGray}
          textColor="white"
        >
          Multiplayer
        </Button>
        <Button
          style={[commonStyles.marginTop10, !userInfo && { display: "none" }]}
          onPress={closeUserSession}
          labelStyle={buttonStyles.buttonText}
          icon="logout"
          mode="contained"
          buttonColor="white"
          textColor="black"
        >
          Sign off
        </Button>
        <GameHistories
          navigation={navigation}
          historyVisibility={historyVisibility}
          setHistoryVisibility={setHistoryVisibility}
          gameHistories={userGameHistories}
          setGameHistories={setUserGameHistories}
        />
        <LoginScreen userInfo={userInfo} setUserInfo={setUserInfo} />
        <MultiPlayerPanel
          navigation={navigation}
          isVisible={multiPlayerVisibility}
          setVisibility={setMultiPlayerVisibility}
          userInfo={userInfo}
        />
      </View>
    </View>
  );
};

export default React.memo(StartScreen);
