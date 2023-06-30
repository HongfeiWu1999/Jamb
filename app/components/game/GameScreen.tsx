import React from "react";
import { Route } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import SinglePlayerMatch from "./singlePlayer/SinglePlayerMatch";
import MultiPlayerMatch from "./multiPlayer/MultiPlayerMatch";

interface GameScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: Route<any, any>;
}

const GameScreen: React.FC<GameScreenProps> = ({ navigation, route }) => {
  return (
    (route.params?.gameSlot !== undefined && (
      <SinglePlayerMatch
        navigation={navigation}
        gameSlot={route.params?.gameSlot}
        game={route.params?.gameState}
      />
    )) || (
      <MultiPlayerMatch
        navigation={navigation}
        userSlot={route.params?.userSlot}
        groupId={route.params?.groupId}
        game={route.params?.gameState}
      />
    )
  );
};

export default React.memo(GameScreen);
