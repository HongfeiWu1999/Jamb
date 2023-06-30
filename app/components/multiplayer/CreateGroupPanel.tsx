import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  AppState,
} from "react-native";
import {
  doc,
  addDoc,
  deleteDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../database/firebase";
import colors from "../../config/colors";
import { HelperText, TextInput } from "react-native-paper";
import LoadingBar from "./LoadingBar";

interface CreateGroupPanelProps {
  userInfo: any;
  startGameHandler: (userSlot: number, groupId: string) => void;
  setCreateGroupPanelVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroupPanel: React.FC<CreateGroupPanelProps> = ({
  userInfo,
  startGameHandler,
  setCreateGroupPanelVisibility,
}) => {
  const [groupName, setGroupName] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [groupId, setGroupId] = useState<string>("");

  const closePanel = useCallback(() => {
    if (groupId) {
      deleteDoc(doc(db, "tables", groupId)).catch((error) =>
        console.error("Error deleting game group:", error)
      );
    }
    setGroupName("");
    setCreateGroupPanelVisibility(false);
  }, [groupId, setGroupName, setCreateGroupPanelVisibility]);

  const createGroup = useCallback(() => {
    if (groupName) {
      const creteGroupInDB = async () => {
        const group = await addDoc(collection(db, "tables"), {
          groupName: groupName,
          users: [
            {
              image: userInfo?.picture,
              name: userInfo?.name,
              score: 0,
              active: true,
              finished: false,
            },
          ],
          turn: Math.floor(Math.random() * 2),
        });
        setGroupId(group.id);
      };
      creteGroupInDB().catch((error) =>
        console.error("Error creating group:", error)
      );
    } else {
      setIsValid(false);
    }
  }, [groupName, setGroupId, setIsValid]);

  const handleUseInput = useCallback(
    (name: string) => {
      setGroupName(name);
      setIsValid(true);
    },
    [setGroupName, setIsValid]
  );

  useEffect(() => {
    if (groupId) {
      const unsubscribe = onSnapshot(doc(db, "tables", groupId), (snapshot) => {
        if (snapshot.data()?.users[1]) {
          startGameHandler(0, groupId);
        }
      });

      return () => unsubscribe();
    }
  }, [groupId]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        if (groupId) {
          deleteDoc(doc(db, "tables", groupId)).catch((error) =>
            console.error("Error deleting game group:", error)
          );
        }
        setGroupName("");
      }
    });

    return () => {
      subscription.remove();
    };
  });

  return (
    <>
      <Text style={styles.title}>Create Group</Text>
      {(!groupId && (
        <>
          <TextInput
            style={styles.userInput}
            activeOutlineColor="black"
            mode="outlined"
            label="Group Name"
            placeholder="Enter the group name"
            keyboardType="default"
            value={groupName}
            error={!isValid}
            maxLength={10}
            onChangeText={(text) => handleUseInput(text)}
          />
          <HelperText
            style={styles.errorText}
            type="error"
            padding="none"
            visible={!isValid}
          >
            Error: The group name cant be empty
          </HelperText>
        </>
      )) || <LoadingBar message="Looking for another player" />}

      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={closePanel}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        {!groupId && (
          <TouchableOpacity
            onPress={createGroup}
            style={styles.createButton}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.cyan,
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 15,
  },
  userInput: {
    width: 235,
  },
  errorText: {
    marginLeft: 15,
    alignSelf: "flex-start",
  },
  buttonView: {
    width: 250,
    flexDirection: "row",
    justifyContent: "space-evenly",
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
  createButton: {
    alignSelf: "center",
    backgroundColor: colors.cyan,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: colors.isabelline,
    borderWidth: 1,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  hintText: {
    color: colors.tableBackground,
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default React.memo(CreateGroupPanel);
