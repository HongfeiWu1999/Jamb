import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { IconButton } from "react-native-paper";
import colors from "../../../../config/colors";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

interface GameHelperProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameHelper: React.FC<GameHelperProps> = ({ isVisible, setIsVisible }) => {
  const openHelper = useCallback(() => {
    setIsVisible(true);
  }, [setIsVisible]);
  const hideHelper = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  return (
    <>
      <IconButton
        style={styles.helpButton}
        icon="help"
        mode="contained"
        iconColor="white"
        size={25}
        onPress={openHelper}
      />
      <Modal transparent={true} animationType="fade" visible={isVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.viewContainer}>
            <View style={styles.headerView}>
              <Text style={styles.ruleText}>Rules of the Game</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={hideHelper}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons name="close" size={30} color="white" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.textView}>
              <Text style={styles.title1}>Jamb</Text>
              <Text style={styles.body1}>
                <Text style={styles.title2}>Jamb</Text> is a five or six-dice
                game in which the goal is to score as many{" "}
                <Text style={styles.title2}>points</Text> as possible. You fill{" "}
                <Text style={styles.title2}>in the fields</Text> as indicated
                above each <Text style={styles.title2}>column</Text>.{" "}
                <Text style={styles.title2}>The fields in</Text> which the{" "}
                <Text style={styles.title2}>result</Text> can be entered are
                highlighted in a darker color.{" "}
                <Text style={styles.title2}>You roll dice</Text> by clicking on
                a button marked with characters, and it is possible to roll the
                dice no more than three times. After{" "}
                <Text style={styles.title2}>each</Text> roll, you can save{" "}
                <Text style={styles.title2}>the dice</Text> by{" "}
                <Text style={styles.title2}>clicking</Text> on them.
              </Text>
              <Text style={[styles.title1, styles.marginTop]}>Columns</Text>
              <Entypo
                style={styles.upDownIcon}
                name="chevron-down"
                size={36}
                color={colors.gray}
              />
              <Text style={styles.body1}>
                <Text style={styles.title2}>The column</Text> fills in the order
                from up, down.
              </Text>
              <View style={styles.upDownView}>
                <Entypo name="chevron-down" size={36} color={colors.gray} />
                <Entypo
                  style={styles.specialUpIcon}
                  name="chevron-up"
                  size={36}
                  color={colors.gray}
                />
              </View>
              <Text style={styles.body1}>
                <Text style={styles.title2}>Free column</Text> - fields can be
                filled in arbitrarily.
              </Text>
              <Entypo
                style={styles.upDownIcon}
                name="chevron-up"
                size={36}
                color={colors.gray}
              />
              <Text style={styles.body1}>
                <Text style={styles.title2}>The column</Text> fills in the order
                from down, up.
              </Text>
              <Entypo
                style={styles.lockIcon}
                name="lock"
                size={24}
                color={colors.gray}
              />
              <Text style={[styles.body1, styles.marginDesc]}>
                <Text style={styles.title2}>The field</Text> can only be locked
                after the first throw. After locking the fields,{" "}
                <Text style={styles.title2}>the cubes</Text> can be rolled two
                more times.
              </Text>
              <Text style={[styles.title1, styles.marginTop]}>Types</Text>
              <Text style={styles.iconText}>1-6</Text>
              <Text style={[styles.body1, styles.marginDesc]}>
                The <Text style={styles.title2}>number of dice</Text> from 1 to
                6 that the player receives after three{" "}
                <Text style={styles.title2}>rolls</Text> is entered into the
                fields. The value is multiplied by{" "}
                <Text style={styles.title2}>
                  multiplying the number of cubes
                </Text>{" "}
                and the value of the type in which they are entered.
              </Text>
              <Text style={[styles.body1, styles.marginDesc]}>
                First:{"\n"}1 x 3 = 3{"\n"}2 x 4 = 8{"\n"}3 x 2 = 6{"\n"}4 x 4 =
                16{"\n"}5 x 2 = 10{"\n"}6 x 3 = 18
              </Text>
              <Text style={[styles.body1, styles.marginDesc]}>
                All field values from 1 to 6 are added up, and if the sum is
                equal to or greater than 60,{" "}
                <Text style={styles.title2}>the player receives a bonus</Text>{" "}
                of 30 <Text style={styles.title2}>points</Text>.
              </Text>
              <Text style={[styles.body1, styles.marginDesc]}>
                <Text style={styles.title2}>Example</Text>:{"\n"}3 + 8 + 6 + 16
                + 10 + 18 = 61 + <Text style={styles.title2}>bonus</Text> 30 =
                91
              </Text>
              <Text style={styles.iconText}>MAX-MIN</Text>
              <Text style={[styles.body1, styles.marginDesc]}>
                The goal is to get as many{" "}
                <Text style={styles.title2}>dice</Text> as possible in the{" "}
                <Text style={styles.title2}>MAX</Text> field and as small as
                possible in the <Text style={styles.title2}>MIN</Text> field.{" "}
                <Text style={styles.title2}>The difference</Text> between the
                two fields is multiplied by the number of units of the first
                type.
              </Text>
              <Text style={[styles.body1, styles.marginDesc]}>
                <Text style={styles.title2}>Example</Text>:{"\n"}MAX: 4 + 5 + 6
                + 3 + 6 = 24{"\n"}MIN: 1 + 1 + 1 + 3 + 2 = 8
              </Text>
              <Text style={[styles.body1, styles.marginDesc]}>
                <Text style={styles.title2}>Result</Text>: (MAX - MIN) x F1 =
                (24 - 8) x 3 = 16 x 3 = 48
              </Text>
              <Text style={[styles.title11, styles.marginTop]}>Kenta</Text>
              <Text style={styles.iconText}>K</Text>
              <Text style={[styles.body1, styles.marginDesc]}>
                <Text style={styles.title2}>The goal</Text> is to get at least
                one <Text style={styles.title2}>die with a value</Text> from 1
                to 5 or from 2 to 6. After the first{" "}
                <Text style={styles.title2}>roll</Text>, the player scores 66
                points, after the second <Text style={styles.title2}>roll</Text>{" "}
                56 points, and after the third{" "}
                <Text style={styles.title2}>roll</Text> 46 points.
              </Text>
              <Text style={[styles.title11, styles.marginTop]}>Full</Text>
              <Text style={styles.iconText}>F</Text>
              <Text style={[styles.body1, styles.marginDesc]}>
                <Text style={styles.title2}>The goal</Text> is to get three{" "}
                <Text style={styles.title2}>dice</Text> of the same value and
                two <Text style={styles.title2}>dice</Text> of the same value.
                The sum is increased by 30.
              </Text>
              <Text style={[styles.body1, styles.marginDesc]}>
                <Text style={styles.title2}>Example</Text>: 5 + 5 + 5 + 6 + 6 =
                27 + <Text style={styles.title2}>bonus</Text> 30 = 57
              </Text>
              <Text style={[styles.title11, styles.marginTop]}>Poker</Text>
              <Text style={styles.iconText}>P</Text>
              <Text style={[styles.body1, styles.marginDesc]}>
                <Text style={styles.title2}>The goal</Text> is to get four{" "}
                <Text style={styles.title2}>dice</Text> of the same value.{" "}
                <Text style={styles.title2}>The sum</Text> is increased by 40.
              </Text>
              <Text style={[styles.body1, styles.marginDesc]}>
                <Text style={styles.title2}>Example</Text>: 4 + 4 + 4 + 4 = 16 +{" "}
                <Text style={styles.title2}>bonus</Text> 40 = 56
              </Text>
              <Text style={[styles.title11, styles.marginTop]}>Yamb</Text>
              <Text style={styles.iconText}>Y</Text>
              <Text style={[styles.body1, styles.marginDesc]}>
                <Text style={styles.title2}>The goal</Text> is to get five{" "}
                <Text style={styles.title2}>dice</Text> of the same value.{" "}
                <Text style={styles.title2}>The sum</Text> is increased by 50.
              </Text>
              <Text style={[styles.body1, styles.marginDesc]}>
                <Text style={styles.title2}>Example</Text>: 5 + 5 + 5 + 5 + 5 =
                25 + <Text style={styles.title2}>bonus</Text> 50 = 75
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
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
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 20,
    margin: 20,
    elevation: 10,
    alignItems: "center",
  },
  helpButton: {
    backgroundColor: colors.popyRed,
    borderColor: colors.isabelline,
    borderWidth: 2.5,
  },
  closeButton: {
    alignSelf: "flex-end",
    width: "20%",
    alignItems: "center",
    marginRight: "-2%",
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: colors.popyRed,
    borderColor: colors.rerollBorder,
  },
  textView: {
    width: "90%",
    marginTop: 10,
    paddingHorizontal: 5,
  },
  marginTop: {
    marginTop: 15,
  },
  title1: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.tableBackground,
  },
  title11: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.tableBackground,
  },
  title2: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.tableBackground,
  },
  body1: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "400",
    textAlign: "justify",
  },
  upDownIcon: {
    marginTop: 10,
  },
  lockIcon: {
    marginTop: 20,
  },
  upDownView: {
    marginTop: 10,
    flexDirection: "row",
  },
  specialUpIcon: {
    marginLeft: -17,
    marginTop: 1,
  },
  marginDesc: {
    marginTop: 25,
  },
  iconText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.gray,
  },
  headerView: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ruleText: {
    color: colors.cyan,
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default React.memo(GameHelper);
