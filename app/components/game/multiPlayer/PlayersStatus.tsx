import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import colors from "../../../config/colors";
import { GameGroup } from "../../../types/types";
import { Avatar } from "react-native-paper";

interface PlayersStatusProps {
  userSlot: number;
  matchStatus: GameGroup;
  isPlayerTurn: boolean;
}

const PlayersStatus: React.FC<PlayersStatusProps> = ({
  userSlot,
  matchStatus,
  isPlayerTurn,
}) => {
  const [dotsText, setDotsText] = useState("");
  const [dotsCount, setDotsCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setDotsCount((count) => (count + 1) % 4);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const dots = ".".repeat(dotsCount);
    setDotsText(`${dots}`);
  }, [dotsCount]);

  return (
    <View style={styles.container}>
      <View style={styles.statusInfo}>
        <View style={styles.statusView}>
          <View style={styles.userInfo}>
            <Avatar.Image
              size={30}
              source={{ uri: matchStatus.users[0].image }}
            />
            <Text style={[styles.userName, !userSlot && styles.playerName]}>
              {userSlot ? matchStatus.users[0].name : "You"}
            </Text>
          </View>
          <Text style={styles.scoreText}>
            Score:{" "}
            <Text style={styles.scoreValue}>{matchStatus.users[0].score}</Text>
          </Text>
        </View>
        <Text style={styles.vsText}>VS</Text>
        <View style={styles.statusView}>
          <View style={styles.userInfo}>
            <Avatar.Image
              size={30}
              source={{ uri: matchStatus.users[1].image }}
            />
            <Text style={[styles.userName, userSlot > 0 && styles.playerName]}>
              {userSlot ? "You" : matchStatus.users[1].name}
            </Text>
          </View>
          <Text style={styles.scoreText}>
            Score:{" "}
            <Text style={styles.scoreValue}>{matchStatus.users[1].score}</Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          marginVertical: 10,
          width: 280,
          height: 1,
          backgroundColor: colors.brownGray,
        }}
      ></View>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            flexDirection: "row",
            fontWeight: "500",
            color: colors.tableBackground,
            fontSize: 16,
          }}
        >
          {(isPlayerTurn && "It's your turn, play your move") ||
            "Waiting for your opponent"}
          {dotsText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    top: "8%",
    position: "absolute",
    backgroundColor: colors.smokeWhite,
    alignItems: "center",
  },
  statusInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusView: {
    width: 115,
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.tableBackground,
  },
  playerName: {
    color: colors.red,
  },
  vsText: {
    marginHorizontal: 12,
    fontSize: 35,
    fontWeight: "bold",
    fontStyle: "italic",
    color: colors.popyRed,
  },
  scoreText: { fontSize: 20 },
  scoreValue: {
    fontSize: 22,
    color: colors.cyan,
    fontWeight: "bold",
  },
});

export default React.memo(PlayersStatus);
