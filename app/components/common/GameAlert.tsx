import React from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";

import colors from "../../config/colors";
import {
  buttonStyles,
  commonStyles,
  gameStyles,
} from "../../styles/GameStyles";

interface GoBackAlertProps {
  alertVisibility: boolean;
  title: string;
  body: string;
  onAccept: () => void;
  onReject: () => void;
}

const GoBackAlert: React.FC<GoBackAlertProps> = ({
  alertVisibility,
  title,
  body,
  onAccept,
  onReject,
}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={alertVisibility}>
      <View style={gameStyles.modalContainer}>
        <View style={gameStyles.viewContainer}>
          <Text style={gameStyles.warningTitle}>{title}</Text>
          <Text style={gameStyles.warningBody}>{body}</Text>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={[styles.button, buttonStyles.yesButtonColor]}
              onPress={onAccept}
              activeOpacity={0.8}
            >
              <Text style={commonStyles.baseText}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, buttonStyles.noButtonStyle]}
              onPress={onReject}
              activeOpacity={0.8}
            >
              <Text style={[commonStyles.baseText, styles.noButtonMargin]}>
                NO
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 20,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  button: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderColor: colors.isabelline,
    borderWidth: 1,
  },
  noButtonMargin: {
    marginHorizontal: 2,
  },
});

export default React.memo(GoBackAlert);
