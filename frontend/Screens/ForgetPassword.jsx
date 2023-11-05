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

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const loading = false;

  const submitHandler = () => {
    alert("Yeah"); // remove in futre
    navigation.navigate("verify");
  };

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
        {/* Heading */}

        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}> Forget Password </Text>
        </View>

        <View style={styles.container}>
          <View style={{ gap: 25 }}>
            <TextInput
              {...inputOptions}
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
          </View>

          <Button
            loading={loading}
            onPress={submitHandler}
            textColor={colors.color2}
            disabled={email === ""}
            style={styles.btn}>
            Send OTP
          </Button>
          <Text style={styles.or}> OR</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("login")}>
            <Text style={styles.link}> Login </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer activeRoute="profile" />
    </>
  );
};

export default ForgetPassword;
