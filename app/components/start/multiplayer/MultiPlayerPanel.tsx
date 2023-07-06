import React, { useState, useCallback, useEffect } from "react";
import { View, Modal, TouchableOpacity, Text, AppState } from "react-native";
import colors from "../../../config/colors";
import SearchGroupPanel from "./SearchGroupPanel";
import CreateGroupPanel from "./CreateGroupPanel";
import { Button } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { startNewGame } from "../../game/operations/GameManager";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  buttonStyles,
  commonStyles,
  gameStyles,
} from "../../../styles/GameStyles";

interface MultiPlayerPanelProps {
  navigation: NativeStackNavigationProp<any, any>;
  isVisible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: any;
}

const MultiPlayerPanel: React.FC<MultiPlayerPanelProps> = ({
  navigation,
  isVisible,
  setVisibility,
  userInfo,
}) => {
  const [createGroupPanelVisibility, setCreateGroupPanelVisibility] =
    useState<boolean>(false);
  const [searchGroupPanelVisibility, setSearchGroupPanelVisibility] =
    useState<boolean>(false);

  const closePanel = useCallback(() => {
    setVisibility(false);
  }, []);

  const openCreateGroupPanel = useCallback(() => {
    setCreateGroupPanelVisibility(true);
  }, []);

  const openSearchGroupPanel = useCallback(() => {
    setSearchGroupPanelVisibility(true);
  }, []);

  const startGameHandler = useCallback((userSlot: number, groupId: string) => {
    navigation.navigate("GameScreen", {
      userSlot: userSlot,
      gameState: startNewGame(),
      groupId: groupId,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setCreateGroupPanelVisibility(false);
      setSearchGroupPanelVisibility(false);
    });
    return unsubscribe;
  });

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        setCreateGroupPanelVisibility(false);
        setSearchGroupPanelVisibility(false);
      }
    });

    return () => {
      subscription.remove();
    };
  });

  return (
    <Modal transparent={true} animationType="fade" visible={isVisible}>
      <View style={gameStyles.modalContainer}>
        <View style={gameStyles.viewContainer2}>
          {(createGroupPanelVisibility && (
            <CreateGroupPanel
              userInfo={userInfo}
              startGameHandler={startGameHandler}
              setCreateGroupPanelVisibility={setCreateGroupPanelVisibility}
            />
          )) ||
            (searchGroupPanelVisibility && (
              <SearchGroupPanel
                userInfo={userInfo}
                startGameHandler={startGameHandler}
                setSearchGroupPanelVisibility={setSearchGroupPanelVisibility}
              />
            )) || (
              <>
                <Button
                  style={commonStyles.marginTop10}
                  mode="contained"
                  onPress={openCreateGroupPanel}
                  labelStyle={buttonStyles.buttonText}
                  buttonColor={colors.cyan}
                  textColor="white"
                >
                  Create Group
                </Button>
                <Button
                  style={commonStyles.marginTop10}
                  mode="contained"
                  onPress={openSearchGroupPanel}
                  labelStyle={buttonStyles.buttonText}
                  buttonColor={colors.kaki}
                  textColor="white"
                >
                  {"  "}
                  Join Group{"  "}
                </Button>
                <TouchableOpacity
                  onPress={closePanel}
                  style={[buttonStyles.exitButton, commonStyles.marginTop10]}
                  activeOpacity={0.8}
                >
                  <Text style={commonStyles.baseText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
        </View>
      </View>
      <Toast />
    </Modal>
  );
};

export default React.memo(MultiPlayerPanel);
