import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import Footer from "../Components/Footer";
import { colors, inputStyling } from "../Styles/style";

const ForgetPassword = ({ navigation }) => {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Input styling options
  const inputOptions = {
    style: {
      mode: "outline",
      activeOutlineColor: colors.color1,
    },
  };

  // Loading state
  const loading = false;

  // Function to handle form submission
  const submitHandler = () => {
    alert("Yeah");
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Login</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            {...inputOptions}
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Enter Your Email"
            placeholderTextColor="gray"
            style={styles.inputStyle}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder="Enter Your Password"
            placeholderTextColor="gray"
            style={styles.inputStyle}
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
          style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Login</Text>
        </Button>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("register")}>
          <Text style={styles.createAccountText}>
            Don't have an account? Create it
          </Text>
        </TouchableOpacity>
      </View>

      <Footer activeRoute="profile" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    marginTop: 100,
  },

  forget: {
    color: colors.color3,
    top: "-10%",
    right: "-20%",
    marginVertical: 10,
    marginHorizontal: 20,
    textAlign: "right",
    fontWeight: "500",
    fontSize: 15,
  },
  titleContainer: {
    marginTop: 50,
  },
  titleText: {
    color: "#4A5582",
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
  },
  labelText: {
    fontSize: 20,
    fontWeight: "600",
    color: "gray",
  },
  inputStyle: {
    borderRadius: 5,
    marginVertical: 10,
    width: 300,
    height: 30,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
  },
  buttonStyle: {
    borderRadius: 10,
    width: 300,
    backgroundColor: colors.color3,
    padding: 15,
    margin: "auto",
    marginTop: 30,
    shadowColor: "black",
    elevation: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  createAccountText: {
    color: "gray",
    marginTop: 7,
    textAlign: "center",
  },
});

export default ForgetPassword;
