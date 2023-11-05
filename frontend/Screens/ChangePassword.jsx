import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from "../Styles/style";
import { Button, TextInput } from "react-native-paper";

import Header from "../Components/Header";
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const loading = false;

  const submitHandler = () => {
    alert("Yeah");
  };

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
      {/* Heading */}
      <Header back={true} />
      <View style={{ marginBottom: 20 }}>
        <Text style={formHeading}> Change Password </Text>
      </View>

      <View style={styles.container}>
        <View style={{ gap: 25, top: 70 }}>
          <TextInput
            {...inputOptions}
            placeholder="Old Password"
            value={oldPassword}
            secureTextEntry={true}
            onChangeText={setOldPassword}
          />
          <TextInput
            {...inputOptions}
            placeholder="New Password"
            value={newPassword}
            secureTextEntry={true}
            onChangeText={setnewPassword}
          />

          <Button
            loading={loading}
            onPress={submitHandler}
            textColor={colors.color2}
            disabled={oldPassword === "" || newPassword === ""}
            style={styles.btn}>
            Change Password
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;
