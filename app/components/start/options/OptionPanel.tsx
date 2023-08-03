import React, { useCallback, useRef } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Text,
} from "react-native";
import { commonStyles, gameStyles } from "../../../styles/GameStyles";
import SignInOutOption from "./SignInOutOption";
import VolumeOption from "./VolumeOption";
import { GameState, PanelVisibilityState } from "../../../types/types";

interface OptionPanelProps {
  panelVisibility: boolean;
  setPanelVisibility: React.Dispatch<
    React.SetStateAction<PanelVisibilityState>
  >;
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
  gameHistories: (GameState | null)[];
  setGameHistories: React.Dispatch<React.SetStateAction<(GameState | null)[]>>;
}

const SIZE = 35;

const OptionPanel: React.FC<OptionPanelProps> = ({
  panelVisibility,
  setPanelVisibility,
  userInfo,
  setUserInfo,
  gameHistories,
  setGameHistories,
}) => {
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
        onRequestClose={() =>
          setPanelVisibility((prevState) => ({
            ...prevState,
            isOptionPanelVisible: false,
          }))
        }
      >
        <View style={gameStyles.modalContainer}>
          <View
            style={[
              gameStyles.viewContainer2,
              commonStyles.paddingHorizontal20,
            ]}
          >
            <Text>Game Setting</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <SignInOutOption
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                gameHistories={gameHistories}
                setPanelVisibility={setPanelVisibility}
              />
              <VolumeOption />
            </View>
          </View>
        </View>
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
