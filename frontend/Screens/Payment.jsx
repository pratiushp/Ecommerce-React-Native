import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors, defaultStyle } from "../Styles/style";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import { Button, RadioButton } from "react-native-paper";

const Payment = ({ navigation, route }) => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  console.log(paymentMethod);

  const isAuthenticated = false;

  const redirectToLogin = () => {
    navigation.navigate("login");
  };

  const codHandler = () => {};

  const onlineHandler = () => {};

  return (
    <View style={defaultStyle}>
      <Header back={true} />

      <Heading
        text1="Payment"
        text2="Method"
        containerStyle={{
          paddingTop: 70,
        }}
      />
      <View style={styles.container}>
        <RadioButton.Group
          onValueChange={setPaymentMethod}
          value={paymentMethod}>
          <View style={styles.radio}>
            <Text style={styles.radioText}>Cash On Delivery </Text>
            <RadioButton color={colors.color1} value={"COD"} />
          </View>

          <View style={styles.radio}>
            <Text style={styles.radioText}>Online </Text>
            <RadioButton color={colors.color1} value={"ONLINE"} />
          </View>
        </RadioButton.Group>
      </View>

      <TouchableOpacity
        onPress={
          !isAuthenticated
            ? redirectToLogin
            : paymentMethod === "COD"
            ? codHandler
            : onlineHandler
        }>
        <Button
          textColor={colors.color2}
          style={styles.btn}
          icon={
            paymentMethod === "COD" ? "check-circle" : "circle-multiple-outline"
          }>
          {paymentMethod === "COD" ? "Place Order" : "Pay"}
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color3,
    // paddingLeft: 20,
    padding: 30,
    borderRadius: 10,
    marginVertical: 30,
    flex: 1,
    justifyContent: "center",
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  radioText: {
    fontWeight: "600",
    fontSize: 18,
    textTransform: "uppercase",
    color: colors.color2,
  },
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    margin: 10,
    padding: 5,
  },
});

export default Payment;
