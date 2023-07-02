import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  AppState,
} from "react-native";
import colors from "../../config/colors";
import SearchGroupPanel from "./SearchGroupPanel";
import CreateGroupPanel from "./CreateGroupPanel";
import { Button } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { startNewGame } from "../operations/GameManager";
import { Toast } from "react-native-toast-message/lib/src/Toast";

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
      <View style={styles.modalContainer}>
        <View style={styles.viewContainer}>
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
                  style={styles.marginTop}
                  mode="contained"
                  onPress={openCreateGroupPanel}
                  labelStyle={styles.buttonText}
                  buttonColor={colors.cyan}
                  textColor="white"
                >
                  Create Group
                </Button>
                <Button
                  style={styles.marginTop}
                  mode="contained"
                  onPress={openSearchGroupPanel}
                  labelStyle={styles.buttonText}
                  buttonColor={colors.kaki}
                  textColor="white"
                >
                  {"  "}
                  Join Group{"  "}
                </Button>
                <TouchableOpacity
                  onPress={closePanel}
                  style={styles.closeButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
        </View>
      </View>
      <Toast />
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
    backgroundColor: colors.smokeWhite,
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    elevation: 10,
  },
  marginTop: {
    marginTop: 10,
  },
  paddingHorizontal: {
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 30,
    paddingTop: 15,
  },
  closeButton: {
    alignSelf: "center",
    backgroundColor: colors.popyRed,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderColor: colors.isabelline,
    borderWidth: 1,
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
});

export default React.memo(MultiPlayerPanel);
