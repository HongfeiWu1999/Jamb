import React from "react";
import GameScreen from "./app/components/game/GameScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "./app/components/StartScreen";
import ConectionWarningScreen from "./app/components/game/multiPlayer/ConectionWarningScreen";
import { View, StatusBar, StyleSheet } from "react-native";
import colors from "./app/config/colors";

interface AppProps {}

const Stack = createNativeStackNavigator();

const App: React.FC<AppProps> = () => {
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
