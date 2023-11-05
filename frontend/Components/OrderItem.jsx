import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../Styles/style";
import { Button } from "react-native-paper";

const OrderItem = ({
  id,
  price,
  address,
  orderOn,
  staus,
  paymentMethod,
  updadteHandler,
  admin = false,
  loading,
  i = 0,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: i % 2 === 0 ? colors.color2 : colors.color3,
      }}>
      <Text
        style={{
          ...styles.text,
          backgroundColor: i % 2 === 0 ? colors.color3 : colors.color1,
        }}>
        ID - #{id}
      </Text>
      <TextBox title={"address"} value={address} i={i} />
      <TextBox title={"Ordered On"} value={orderOn} i={i} />
      <TextBox title={"Price"} value={price} i={i} />
      <TextBox title={"Status"} value={staus} i={i} />
      <TextBox title={"Paymment Method"} value={paymentMethod} i={i} />
      {admin && (
        <Button
          onPress={() => updateHandler(id)}
          loading={loading}
          disabled={loading}
          icon={"update"}
          mode="contianed"
          style={{
            width: 120,
            alignSelf: "center",
            marginTop: 20,
            backgroundColor: i % 2 === 0 ? colors.color3 : colors.color2,
          }}
          textColor={i % 2 === 0 ? colors.color2 : colors.color3}>
          Update
        </Button>
      )}
    </View>
  );
};

const TextBox = ({ title, value, i }) => (
  <Text
    style={{
      marginVertical: 6,
      color: i % 2 === 0 ? colors.color3 : colors.color2,
    }}>
    <Text style={{ fontWeight: "900" }}>{title} - </Text>
    {title === "Price" ? "$" : ""}
    {value}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  text: {
    color: colors.color2,
    fontSize: 16,
    marginHorizontal: -20,
    fontWeight: "900",
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
  },
});
export default OrderItem;
