import React, { useState, useEffect, useCallback } from "react";
import { View, AppState } from "react-native";
import { Button } from "react-native-paper";
import { Route } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../database/firebase";

import colors from "../../config/colors";
import LoginScreen from "./login/LoginScreen";
import { GameState, PanelVisibilityState, UserState } from "../../types/types";
import GameHistories from "./histories/GameHistories";
import StartTitle from "./StartTitle";
import {
  buttonStyles,
  commonStyles,
  gameStyles,
} from "../../styles/GameStyles";
import OptionPanel from "./options/OptionPanel";
import MultiplayerPanel from "./multiplayer/MultiplayerPanel";

interface StartScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: Route<any, any>;
}

const initPanelVisbilityState = () => ({
  isLoginPanelVisible: false,
  isHistoryPanelVisible: false,
  isMultiplayerPanelVisible: false,
  isOptionPanelVisible: false,
});

const StartScreen: React.FC<StartScreenProps> = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState<UserState | undefined>(undefined);
  const [gameHistories, setGameHistories] = useState<(GameState | null)[]>([]);
  const [panelVisibilityState, setPanelVisibilityState] =
    useState<PanelVisibilityState>(initPanelVisbilityState());

  useEffect(() => {
    const getLocalHistories = async () => {
      const data = await AsyncStorage.getItem("@Game_Histories");
      if (!data) setGameHistories([null, null, null]);
      else setGameHistories(JSON.parse(data));
    };
    getLocalHistories();
  }, []);

  const obtainUserGameHistories = useCallback(async () => {
    if (userInfo) {
      const userId = userInfo.id.toString();
      const docSnap = await getDoc(doc(db, "users", userId));
      let cloudHistories;
      if (docSnap.exists()) {
        cloudHistories = docSnap.data().histories;
      } else {
        cloudHistories = [null, null, null];
      }
      setGameHistories(cloudHistories);
    }
  }, [userInfo]);

  const openGameHistory = useCallback(() => {
    setPanelVisibilityState((prevState) => ({
      ...prevState,
      isHistoryPanelVisible: true,
    }));
  }, [setPanelVisibilityState]);

  const openMultiplayerPanel = useCallback(() => {
    setPanelVisibilityState((prevState) => ({
      ...prevState,
      isMultiplayerPanelVisible: true,
    }));
  }, [setPanelVisibilityState]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      initPanelVisbilityState();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const gameSlot = route.params?.gameSlot;
    const newGameState = route.params?.gameState;
    if (!isNaN(gameSlot)) {
      setGameHistories((prevState) =>
        prevState.map((gameHistory, index) =>
          index === gameSlot ? newGameState : gameHistory
        )
      );
    }
  }, [route.params?.gameSlot, route.params?.gameState]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        const saveLocalGameHistories = async () => {
          await AsyncStorage.setItem(
            "@Game_Histories",
            JSON.stringify(gameHistories)
          );
        };
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
          buttonColor={colors.sinopia}
          textColor="white"
        >
          Multiplayer
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
      </View>
      <LoginScreen
        setUserInfo={setUserInfo}
        panelVisibility={panelVisibilityState.isLoginPanelVisible}
        setPanelVisibility={setPanelVisibilityState}
      />
      <GameHistories
        navigation={navigation}
        panelVisibility={panelVisibilityState.isHistoryPanelVisible}
        setPanelVisibility={setPanelVisibilityState}
        gameHistories={gameHistories}
        setGameHistories={setGameHistories}
      />
      <MultiplayerPanel
        navigation={navigation}
        panelVisibility={panelVisibilityState.isMultiplayerPanelVisible}
        setPanelVisibility={setPanelVisibilityState}
        userInfo={userInfo}
      />
      <OptionPanel
        panelVisibility={panelVisibilityState.isOptionPanelVisible}
        setPanelVisibility={setPanelVisibilityState}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        gameHistories={gameHistories}
        setGameHistories={setGameHistories}
      />
    </View>
  );
};

export default React.memo(StartScreen);
