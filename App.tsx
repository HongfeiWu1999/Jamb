import React from "react";
import GameScreen from "./app/components/game/GameScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "./app/components/start/StartScreen";
import ConectionWarningScreen from "./app/components/game/multiplayer/ConectionWarningScreen";
import { View, StatusBar } from "react-native";
import colors from "./app/config/colors";
import { commonStyles } from "./app/styles/GameStyles";

interface AppProps {}

const Stack = createNativeStackNavigator();

const App: React.FC<AppProps> = () => {
  return (
    <View style={commonStyles.flex1View}>
      <StatusBar backgroundColor={colors.cyan} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            animationTypeForReplace: "pop",
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="GameScreen" component={GameScreen} />
          <Stack.Screen
            name="ConectionWarningScreen"
            component={ConectionWarningScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
