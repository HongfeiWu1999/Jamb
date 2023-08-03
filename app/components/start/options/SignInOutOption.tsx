import React, { useCallback } from "react";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../database/firebase";

import Option from "./Option";
import { GameState, PanelVisibilityState } from "../../../types/types";
interface SignInOutOptionProps {
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
  gameHistories: (GameState | null)[];
  setPanelVisibility: React.Dispatch<
    React.SetStateAction<PanelVisibilityState>
  >;
}

const SignInOutOption: React.FC<SignInOutOptionProps> = ({
  userInfo,
  setUserInfo,
  gameHistories,
  setPanelVisibility,
}) => {
  const openLoginPanel = useCallback(() => {
    setPanelVisibility((prevState) => ({
      ...prevState,
      isLoginPanelVisible: true,
    }));
  }, [setPanelVisibility]);

  const closeUserSession = useCallback(() => {
    const closeUserSessionAsync = async () => {
      const userId = userInfo.id.toString();
      await setDoc(doc(db, "users", userId), {
        histories: gameHistories,
      });
      await AsyncStorage.removeItem("@User");
      setUserInfo(undefined);
    };
    closeUserSessionAsync().catch((error) =>
      console.error("Error closing user session:", error)
    );
  }, [userInfo, setUserInfo]);

  return (
    <Option
      onPress={(userInfo && closeUserSession) || openLoginPanel}
      icon={
        (userInfo && (
          <Image
            style={{ width: 45, height: 45 }}
            source={require("../../../assets/logout.png")}
          />
        )) || (
          <Image
            style={{ width: 45, height: 45 }}
            source={require("../../../assets/login.png")}
          />
        )
      }
      text={(userInfo && "Log out") || "Sign In"}
    />
  );
};

export default React.memo(SignInOutOption);
