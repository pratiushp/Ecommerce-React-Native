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
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loading = false;

  const submitHandler = () => {
    alert("Yeah");
  };

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
        {/* Heading */}

        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}> Login </Text>
        </View>

        <View style={styles.container}>
          <View style={{ gap: 15 }}>
            <Text
              style={{
                color: colors.color2,
                textAlign: "center",
                fontSize: 24,
                fontWeight: "600",
              }}>
              {" "}
              Welcome Back{" "}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                color: colors.color2,
                marginBottom: 50,
              }}>
              {" "}
              Login to your account{" "}
            </Text>
          </View>
          <View style={{ gap: 25 }}>
            <TextInput
              {...inputOptions}
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
            />

            <TextInput
              {...inputOptions}
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("forgetpassword")}>
            <Text style={styles.forget}> Forget Password</Text>
          </TouchableOpacity>

          <Button
            loading={loading}
            onPress={submitHandler}
            textColor={colors.color2}
            disabled={email === "" || password === ""}
            style={styles.btn}>
            Log In
          </Button>
          <Text style={styles.or}> OR</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("register")}>
            <Text style={styles.link}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer activeRoute="profile" />
    </>
  );
};

export default Login;
