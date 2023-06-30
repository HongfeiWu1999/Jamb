import React, { useEffect } from "react";
import { View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoogleImg from "../../assets/google.svg";
import colors from "../../config/colors";

interface LoginScreenProps {
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
}

WebBrowser.maybeCompleteAuthSession();

const LoginScreen: React.FC<LoginScreenProps> = ({ userInfo, setUserInfo }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId:
      "961179868263-rilh3535tf0hjok4d6790n9kfullgkmg.apps.googleusercontent.com",
    androidClientId:
      "961179868263-reuqim13304ua3mtevviund7hmfq0fpq.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSignInWithGoogle().catch((error) => {
      console.error("Error signing in with Google:", error);
    });
  }, [response]);

  const handleSignInWithGoogle = async () => {
    const user = await getUserSession();
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication?.accessToken);
      }
    } else {
      setUserInfo(user);
    }
  };

  const getUserSession = async () => {
    try {
      const data = await AsyncStorage.getItem("@User");
      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      console.error("Error getting user session:", error);
      throw error;
    }
  };

  const getUserInfo = async (token: string | undefined) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Error retrieving user info");
      }
      const user = await response.json();
      await AsyncStorage.setItem("@User", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error("Error getting user info:", error);
      throw error;
    }
  };

  return (
    <Modal transparent={true} animationType="fade" visible={!userInfo}>
      <View style={styles.modalContainer}>
        <View style={styles.viewContainer}>
          <Text style={styles.signInTitle}>Sign In</Text>
          <TouchableOpacity
            style={styles.loginButton}
            disabled={!request}
            activeOpacity={0.8}
            onPress={() => {
              promptAsync().catch((error) =>
                console.error("Error on sending login request:", error)
              );
            }}
          >
            <GoogleImg />
            <Text style={styles.loginText}>Sign in with Google</Text>
          </TouchableOpacity>
          <Text style={styles.hintText}>Sign in to continue playing</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba( 0, 0, 0, 0.3 )",
    justifyContent: "center",
    alignItems: "center",
  },
  viewContainer: {
    backgroundColor: colors.smokeWhite,
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    elevation: 10,
  },
  signInTitle: {
    color: colors.cyan,
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 15,
  },
  loginButton: {
    elevation: 3,
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  loginText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.moderateGray,
    marginLeft: 20,
  },
  hintText: {
    color: colors.smokeGray,
    fontWeight: "500",
    marginTop: 2,
    marginBottom: 5,
  },
});

export default React.memo(LoginScreen);
