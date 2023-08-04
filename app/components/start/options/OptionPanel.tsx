import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Text,
} from "react-native";
import Toast from "react-native-toast-message";
import { commonStyles, gameStyles } from "../../../styles/GameStyles";
import SignInOutOption from "./components/SignInOutOption";
import VolumeOption from "./components/VolumeOption";
import {
  GameSettings,
  GameState,
  MessageType,
  PanelVisibilityState,
} from "../../../types/types";
import SaveHistoryOption from "./components/SaveHistoryOption";
import LoadHistoryOption from "./components/LoadHistoryOption";

interface OptionPanelProps {
  panelVisibility: boolean;
  setPanelVisibility: React.Dispatch<
    React.SetStateAction<PanelVisibilityState>
  >;
  gameSettings: GameSettings;
  setGameSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
  gameHistories: (GameState | null)[];
  setGameHistories: React.Dispatch<React.SetStateAction<(GameState | null)[]>>;
}

const SIZE = 35;

const OptionPanel: React.FC<OptionPanelProps> = ({
  panelVisibility,
  setPanelVisibility,
  gameSettings,
  setGameSettings,
  userInfo,
  setUserInfo,
  gameHistories,
  setGameHistories,
}) => {
  const [messageQueue, setMessageQueue] = useState<MessageType[]>([]);
  const [isDisplaying, setIsDisplaying] = useState<boolean>(false);
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  const onPressHandler = useCallback(() => {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setPanelVisibility((prevState) => ({
        ...prevState,
        isOptionPanelVisible: true,
      }));
      rotateAnimation.setValue(0);
    });
  }, [setPanelVisibility]);

  const spin = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const openLoginPanel = useCallback(() => {
    setPanelVisibility((prevState) => ({
      ...prevState,
      isLoginPanelVisible: true,
    }));
  }, [setPanelVisibility]);

  const closeOptionPanel = useCallback(() => {
    setMessageQueue([]);
    setIsDisplaying(false);
    setPanelVisibility((prevState) => ({
      ...prevState,
      isOptionPanelVisible: false,
    }));
  }, [setPanelVisibility]);

  const enqueueMessage = (type: string, text1: string, text2: string) => {
    setMessageQueue((prevQueue) => [...prevQueue, { type, text1, text2 }]);
  };

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
          visibilityTime: 1000,
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

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={onPressHandler}
        activeOpacity={0.8}
      >
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Image
            style={{ width: SIZE, height: SIZE }}
            source={require("../../../assets/setting.png")}
          />
        </Animated.View>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="fade"
        visible={panelVisibility}
        onRequestClose={closeOptionPanel}
      >
        <View style={gameStyles.modalContainer}>
          <View
            style={[
              gameStyles.viewContainer2,
              commonStyles.paddingHorizontal20,
            ]}
          >
            <Text style={gameStyles.title}>Game Settings</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <SignInOutOption
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                openLoginPanel={openLoginPanel}
              />
              <VolumeOption
                gameSettings={gameSettings}
                setGameSettings={setGameSettings}
              />
              <SaveHistoryOption
                userInfo={userInfo}
                gameHistories={gameHistories}
                openLoginPanel={openLoginPanel}
                enqueueMessage={enqueueMessage}
              />
              <LoadHistoryOption
                userInfo={userInfo}
                setGameHistories={setGameHistories}
                openLoginPanel={openLoginPanel}
                enqueueMessage={enqueueMessage}
              />
            </View>
          </View>
        </View>
        <Toast />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: "10%",
    right: "10%",
  },
});

export default React.memo(OptionPanel);
