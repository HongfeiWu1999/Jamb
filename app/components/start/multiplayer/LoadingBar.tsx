import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import colors from "../../../config/colors";

interface LoadingBarProps {
  message: string;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ message }) => {
  const [loadingText, setLoadingText] = useState(message);
  const [dotsCount, setDotsCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setDotsCount((count) => (count + 1) % 4);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const dots = ".".repeat(dotsCount);
    setLoadingText(`${message}${dots}`);
  }, [dotsCount]);

  return (
    <>
      <ActivityIndicator size="large" />
      <Text style={styles.hintText}>{loadingText}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  hintText: {
    color: colors.tableBackground,
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default React.memo(LoadingBar);
