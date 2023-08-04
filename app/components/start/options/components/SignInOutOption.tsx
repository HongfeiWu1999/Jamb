import React, { useCallback } from "react";
import { View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "react-native-paper";

import Option from "./Option";
interface SignInOutOptionProps {
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
  openLoginPanel: () => void;
}

const SignInOutOption: React.FC<SignInOutOptionProps> = ({
  userInfo,
  setUserInfo,
  openLoginPanel,
}) => {
  const closeUserSession = useCallback(() => {
    const closeUserSessionAsync = async () => {
      await AsyncStorage.removeItem("@User");
      setUserInfo(undefined);
    };
    closeUserSessionAsync().catch((error) =>
      console.error("Error closing user session:", error)
    );
  }, [setUserInfo]);

  return (
    <Option
      onPress={(userInfo && closeUserSession) || openLoginPanel}
      icon={
        (userInfo && (
          <View style={{ borderRadius: 25, borderWidth: 2.5 }}>
            <Avatar.Image size={40} source={{ uri: userInfo.picture }} />
          </View>
        )) || (
          <Image
            style={{ width: 45, height: 45 }}
            source={require("../../../../assets/login.png")}
          />
        )
      }
      text={(userInfo && "Log out") || "Sign In"}
    />
  );
};

export default React.memo(SignInOutOption);
