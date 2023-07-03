import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../../database/firebase";
import { GameGroup } from "../../../types/types";
import colors from "../../../config/colors";
import { Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import LoadingBar from "./LoadingBar";
import Toast from "react-native-toast-message";

interface SearchGroupPanelProps {
  userInfo: any;
  startGameHandler: (userSlot: number, groupId: string) => void;
  setSearchGroupPanelVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchGroupPanel: React.FC<SearchGroupPanelProps> = ({
  userInfo,
  startGameHandler,
  setSearchGroupPanelVisibility,
}) => {
  const [isEnteringGame, setIsEnteringGame] = useState<boolean>(false);
  const [groupIdList, setGroupIdList] = useState<string[]>([]);
  const [groupList, setGroupList] = useState<GameGroup[] | undefined>(
    undefined
  );

  const showErrorToast = (message: string) => {
    Toast.show({
      type: "error",
      text1: message,
    });
  };

  const closePanel = useCallback(() => {
    setGroupIdList([]);
    setGroupList([]);
    setSearchGroupPanelVisibility(false);
  }, [setSearchGroupPanelVisibility]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tables"), (snapshot) => {
      const groupIdList: string[] = [];
      const groupList: GameGroup[] = [];
      snapshot.forEach((doc) => {
        const groupData = doc.data();
        if (groupData.users.length === 1) {
          groupIdList.push(doc.id);
          groupList.push({
            groupName: groupData.groupName,
            users: groupData.users,
            turn: groupData.turn,
          });
        }
      });
      setGroupIdList(groupIdList);
      setGroupList(groupList);
    });

    return () => unsubscribe();
  });

  const joinGroup = useCallback((groupId: string) => {
    setIsEnteringGame(true);
    const joinGroupInDB = async () => {
      const groupRef = doc(db, "tables", groupId);
      const docSnap = await getDoc(groupRef);
      let success = false;
      if (docSnap.exists()) {
        const groupData = docSnap.data();
        if (groupData.users.length === 1) {
          await updateDoc(groupRef, {
            users: [
              ...groupData.users,
              {
                image: userInfo?.picture,
                name: userInfo?.name,
                score: 0,
                active: true,
                finished: false,
              },
            ],
          });
          success = true;
          startGameHandler(1, groupId);
        }
      }
      if (!success) {
        showErrorToast("The match is no longer available.");
        setIsEnteringGame(false);
      }
    };
    setTimeout(() => {
      joinGroupInDB().catch((error) =>
        console.error("Error joining the match: ", error)
      );
    }, 750);
  }, []);

  return (
    <>
      <Text style={styles.title}>Search Group</Text>
      <View style={styles.groupListView}>
        {(isEnteringGame && (
          <View style={styles.marginTop}>
            <LoadingBar message="Entering the match" />
          </View>
        )) ||
          (groupList && (
            <FlatList
              data={groupList}
              renderItem={(itemData) => {
                const group = itemData.item;
                return (
                  <TouchableOpacity
                    style={styles.groupView}
                    activeOpacity={0.8}
                    onPress={() => joinGroup(groupIdList[itemData.index])}
                  >
                    <Text style={styles.groupName}>{group.groupName}</Text>
                    <View style={styles.groupUserInfo}>
                      <View style={styles.groupUserLeft}>
                        <Avatar.Image
                          size={30}
                          source={{ uri: group.users[0].image }}
                        />
                        <Text style={styles.groupUserName}>
                          {group.users[0].name}
                        </Text>
                      </View>
                      <View style={styles.groupUserRight}>
                        <Text style={styles.groupUserCount}>
                          1/2
                          <Ionicons
                            style={styles.iconMargin}
                            name="person"
                            size={18}
                            color={colors.smokeGray}
                          />
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              alwaysBounceVertical
              ListFooterComponent={
                <Text style={styles.footerText}>
                  No more available matches.
                </Text>
              }
            />
          )) || (
            <View style={styles.marginTop}>
              <LoadingBar message="Loading available matches" />
            </View>
          )}
      </View>
      {isEnteringGame || (
        <TouchableOpacity onPress={closePanel} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.cyan,
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
  groupListView: {
    height: 300,
  },
  groupView: {
    width: 240,
    backgroundColor: "white",
    borderColor: colors.brownGray,
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  groupName: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.cyan,
    marginBottom: 3,
  },
  groupUserInfo: {
    width: 240,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupUserLeft: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  groupUserName: {
    marginLeft: 3,
    color: colors.tableBackground,
  },
  groupUserRight: {
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  groupUserCount: {
    color: colors.smokeGray,
    fontSize: 20,
    marginRight: 3,
  },
  footerText: {
    marginTop: -5,
    alignSelf: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    color: colors.smokeGray,
  },
  backButton: {
    alignSelf: "center",
    backgroundColor: colors.popyRed,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderColor: colors.isabelline,
    borderWidth: 1,
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  marginTop: {
    marginTop: 100,
  },
  iconMargin: {
    marginBottom: -1,
  },
});

export default React.memo(SearchGroupPanel);
