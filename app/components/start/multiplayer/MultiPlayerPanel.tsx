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
import { PanelVisibilityState } from "../../../types/types";
import GameAlert from "../../common/GameAlert";

interface MultiplayerPanelProps {
  navigation: NativeStackNavigationProp<any, any>;
  panelVisibility: boolean;
  setPanelVisibility: React.Dispatch<
    React.SetStateAction<PanelVisibilityState>
  >;
  userInfo: any;
}

const MultiplayerPanel: React.FC<MultiplayerPanelProps> = ({
  navigation,
  panelVisibility,
  setPanelVisibility,
  userInfo,
}) => {
  const [createGroupPanelVisibility, setCreateGroupPanelVisibility] =
    useState<boolean>(false);
  const [searchGroupPanelVisibility, setSearchGroupPanelVisibility] =
    useState<boolean>(false);

  const closeMultiplayerPanel = useCallback(() => {
    setPanelVisibility((prevState) => ({
      ...prevState,
      isMultiplayerPanelVisible: false,
    }));
  }, [setPanelVisibility]);

  const openCreateGroupPanel = useCallback(() => {
    setCreateGroupPanelVisibility(true);
  }, [setCreateGroupPanelVisibility]);

  const openSearchGroupPanel = useCallback(() => {
    setSearchGroupPanelVisibility(true);
  }, [setSearchGroupPanelVisibility]);

  const closeCreateGroupPanel = useCallback(() => {
    setCreateGroupPanelVisibility(false);
  }, [setCreateGroupPanelVisibility]);

  const closeSearchGroupPanel = useCallback(() => {
    setSearchGroupPanelVisibility(false);
  }, [setSearchGroupPanelVisibility]);

  const startGameHandler = useCallback((userSlot: number, groupId: string) => {
    navigation.navigate("GameScreen", {
      userSlot: userSlot,
      gameState: startNewGame(),
      groupId: groupId,
    });
  }, []);

  const redirectToLoginScreen = useCallback(() => {
    closeMultiplayerPanel();
    setPanelVisibility((prevState) => ({
      ...prevState,
      isLoginPanelVisible: true,
    }));
  }, [closeMultiplayerPanel, setPanelVisibility]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      closeMultiplayerPanel();
      closeCreateGroupPanel();
      closeSearchGroupPanel();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        closeCreateGroupPanel();
        closeSearchGroupPanel();
      }
    });

    return () => {
      subscription.remove();
    };
  });

  return (
    <>
      {(userInfo && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={panelVisibility}
          onRequestClose={() => {
            if (createGroupPanelVisibility) {
              closeCreateGroupPanel();
            } else if (searchGroupPanelVisibility) {
              closeSearchGroupPanel();
            } else {
              closeMultiplayerPanel();
            }
          }}
        >
          <View style={gameStyles.modalContainer}>
            <View style={gameStyles.viewContainer2}>
              {(createGroupPanelVisibility && (
                <CreateGroupPanel
                  userInfo={userInfo}
                  startGameHandler={startGameHandler}
                  createGroupPanelVisibility={createGroupPanelVisibility}
                  closeCreateGroupPanel={closeCreateGroupPanel}
                />
              )) ||
                (searchGroupPanelVisibility && (
                  <SearchGroupPanel
                    userInfo={userInfo}
                    startGameHandler={startGameHandler}
                    closeSearchGroupPanel={closeSearchGroupPanel}
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
                      onPress={closeMultiplayerPanel}
                      style={[
                        buttonStyles.exitButton,
                        commonStyles.marginTop10,
                      ]}
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
      )) || (
        <GameAlert
          alertVisibility={panelVisibility}
          title="LOGIN IS REQUIRED!"
          body="In order to play the multiplayer mode, you need to log in first."
          onAccept={redirectToLoginScreen}
          onReject={closeMultiplayerPanel}
        />
      )}
    </>
  );
};

export default React.memo(MultiplayerPanel);
