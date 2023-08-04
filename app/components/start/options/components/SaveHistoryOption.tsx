import React, { useCallback, useState } from "react";
import { Image } from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../../database/firebase";
import Toast from "react-native-toast-message";

import Option from "./Option";
import { GameState } from "../../../../types/types";
import GameAlert from "../../../common/GameAlert";

interface SaveHistoryOptionProps {
  userInfo: any;
  gameHistories: (GameState | null)[];
  openLoginPanel: () => void;
  enqueueMessage: (type: string, text1: string, text2: string) => void;
}

const SaveHistoryOption: React.FC<SaveHistoryOptionProps> = ({
  userInfo,
  gameHistories,
  openLoginPanel,
  enqueueMessage,
}) => {
  const [alertVisibility, setAlertVisibility] = useState<boolean>(false);

  const closeAlert = useCallback(() => {
    setAlertVisibility(false);
  }, [setAlertVisibility]);

  const redirectToLoginScreen = useCallback(() => {
    closeAlert();
    openLoginPanel();
  }, [closeAlert, openLoginPanel]);

  const saveUserHistoriesToCloud = useCallback(() => {
    if (userInfo) {
      const saveUserHistoriesToCloudAsync = async () => {
        const userId = userInfo.id.toString();
        await setDoc(doc(db, "users", userId), {
          histories: gameHistories,
        });
      };
      saveUserHistoriesToCloudAsync()
        .catch((error) => console.error("Error closing user session:", error))
        .then(() =>
          enqueueMessage("success", "Game histories are succesfully saved.", "")
        );
    } else {
      setAlertVisibility(true);
    }
  }, [userInfo, setAlertVisibility]);

  return (
    <>
      <Option
        onPress={saveUserHistoriesToCloud}
        icon={
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../../../assets/save_histories.png")}
          />
        }
        text={"Save"}
      />
      <GameAlert
        alertVisibility={alertVisibility}
        title="LOGIN IS REQUIRED!"
        body="In order to save the game histories, you need to log in first."
        onAccept={redirectToLoginScreen}
        onReject={closeAlert}
      />
    </>
  );
};

export default React.memo(SaveHistoryOption);
