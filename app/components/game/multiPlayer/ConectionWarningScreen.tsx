import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../database/firebase";

import colors from "../../../config/colors";
import { Route } from "@react-navigation/native";
import { Conection } from "../../../types/types";

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
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <Text style={styles.warningTitle}>
          {!conectionState.myConection && "You have lost the conection!"}
          {!conectionState.opponentConection && "Congratulations!!!"}
        </Text>
        <Text style={styles.warningBody}>
          {!conectionState.myConection &&
            "This will result in a loss for you, and your opponent will be declared the winner."}
          {!conectionState.opponentConection &&
            "You have won because your opponent has left the match."}
        </Text>

        <TouchableOpacity
          style={styles.exitButton}
          onPress={backToStartScreen}
          activeOpacity={0.8}
        >
          <Text style={styles.exitButtonText}>Back to Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cyan,
    alignItems: "center",
    justifyContent: "center",
  },
  viewContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    margin: 20,
    elevation: 10,
    alignItems: "center",
  },
  warningTitle: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: colors.coral,
  },
  warningBody: {
    marginTop: 20,
    fontSize: 15,
    textAlign: "justify",
    fontWeight: "bold",
    color: colors.tableBackground,
  },
  exitButton: {
    alignSelf: "center",
    backgroundColor: colors.popyRed,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderColor: colors.isabelline,
    borderWidth: 1,
    marginTop: 30,
  },
  exitButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
});

export default React.memo(ConectionWarningScreen);
