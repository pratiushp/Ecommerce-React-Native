import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from "../Styles/style";
import { Button, TextInput } from "react-native-paper";
import Footer from "../Components/Footer";

const Veridy = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const loading = false;

  const submitHandler = () => {
    alert("Yeah"); // remove in futre
    navigation.navigate("login");
  };

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
        {/* Heading */}

        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}> Reset Password </Text>
        </View>

        <View style={styles.container}>
          <View style={{ gap: 25 }}>
            <TextInput
              {...inputOptions}
              placeholder="OTP"
              value={otp}
              keyboardType="number-pad"
              onChangeText={setOtp}
            />
            <TextInput
              {...inputOptions}
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>

          <Button
            loading={loading}
            onPress={submitHandler}
            textColor={colors.color2}
            disabled={otp === "" || password === ""}
            style={styles.btn}>
            Reset Password
          </Button>
          <Text style={styles.or}> OR</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("forgetpassword")}>
            <Text style={styles.link}> Resend OTP </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer activeRoute="profile" />
    </>
  );
};

export default Veridy;
