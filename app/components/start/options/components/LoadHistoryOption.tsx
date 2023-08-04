import React, { useCallback, useState } from "react";
import { Image } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../database/firebase";
import Toast from "react-native-toast-message";

import Option from "./Option";
import { GameState } from "../../../../types/types";
import GameAlert from "../../../common/GameAlert";

interface LoadHistoryOptionProps {
  userInfo: any;
  setGameHistories: React.Dispatch<React.SetStateAction<(GameState | null)[]>>;
  openLoginPanel: () => void;
  enqueueMessage: (type: string, text1: string, text2: string) => void;
}

const LoadHistoryOption: React.FC<LoadHistoryOptionProps> = ({
  userInfo,
  setGameHistories,
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

  const obtainUserGameHistoriesFromCloud = useCallback(() => {
    if (userInfo) {
      const obtainUserGameHistoriesFromCloudAsync = async () => {
        const userId = userInfo.id.toString();
        const docSnap = await getDoc(doc(db, "users", userId));
        if (docSnap.exists()) {
          const gameHistories = docSnap.data().histories;
          setGameHistories(gameHistories);
          enqueueMessage(
            "success",
            "Game histories are succesfully loaded.",
            ""
          );
        } else {
          enqueueMessage(
            "error",
            "No game histories are stored in the cloud.",
            ""
          );
        }
      };
      obtainUserGameHistoriesFromCloudAsync().catch((error) =>
        console.error("Error closing user session:", error)
      );
    } else {
      setAlertVisibility(true);
    }
  }, [userInfo, setAlertVisibility]);

  return (
    <>
      <Option
        onPress={obtainUserGameHistoriesFromCloud}
        icon={
          <Image
            style={{ marginTop: 5, width: 36, height: 36 }}
            source={require("../../../../assets/load_histories.png")}
          />
        }
        text={"Load"}
      />
      <GameAlert
        alertVisibility={alertVisibility}
        title="LOGIN IS REQUIRED!"
        body="In order to load the game histories, you need to log in first."
        onAccept={redirectToLoginScreen}
        onReject={closeAlert}
      />
    </>
  );
};

export default React.memo(LoadHistoryOption);
