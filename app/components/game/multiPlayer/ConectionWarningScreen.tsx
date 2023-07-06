import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../database/firebase";

import { Route } from "@react-navigation/native";
import { Conection } from "../../../types/types";
import {
  buttonStyles,
  commonStyles,
  gameStyles,
} from "../../../styles/GameStyles";

interface ConectionWarningScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: Route<any, any>;
}

const ConectionWarningScreen: React.FC<ConectionWarningScreenProps> = ({
  navigation,
  route,
}) => {
  const [conectionState, setConectionState] = useState<Conection>({
    groupId: "",
    myConection: true,
    opponentConection: true,
  });

  const backToStartScreen = useCallback(() => {
    const deleteGameGroup = async () => {
      const groupRef = doc(db, "tables", conectionState.groupId);
      await deleteDoc(groupRef);
    };
    deleteGameGroup().catch((error) =>
      console.error("Error on deliting game group:", error)
    );
    navigation.navigate("StartScreen");
  }, [conectionState]);

  useEffect(() => {
    const groupId = route.params?.groupId;
    const myConection = route.params?.myConection;
    const opponentConection = route.params?.opponentConection;
    if (
      groupId !== undefined &&
      myConection !== undefined &&
      opponentConection !== undefined
    ) {
      setConectionState({
        groupId: groupId,
        myConection: myConection,
        opponentConection: opponentConection,
      });
    }
  }, [
    route.params?.groupId,
    route.params?.myConection,
    route.params?.opponentConection,
  ]);

  useEffect(() => {
    const handleBackPress = () => {
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  });

  return (
    <View style={gameStyles.mainBackGround}>
      <View style={gameStyles.viewContainer}>
        <Text style={gameStyles.warningTitle}>
          {!conectionState.myConection && "You have lost the conection!"}
          {!conectionState.opponentConection && "Congratulations!!!"}
        </Text>
        <Text style={gameStyles.warningBody}>
          {!conectionState.myConection &&
            "This will result in a loss for you, and your opponent will be declared the winner."}
          {!conectionState.opponentConection &&
            "You have won because your opponent has left the match."}
        </Text>

        <TouchableOpacity
          style={[buttonStyles.exitButton, commonStyles.marginTop30]}
          onPress={backToStartScreen}
          activeOpacity={0.8}
        >
          <Text style={commonStyles.baseText}>Back to Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(ConectionWarningScreen);
