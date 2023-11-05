import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { colors, defaultStyle } from "../Styles/style";
import React from "react";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import { cartItems } from "./Cart";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import ConfirmOrderItem from "../Components/ConfirmOrderItem";

const ConfirmOrder = () => {
  const itemsPrice = 4000;
  const shippingCharge = 200;
  const tax = 0.18 * itemsPrice;
  const totalAmount = itemsPrice + shippingCharge + tax;

  const navigate = useNavigation();

  return (
    <View style={defaultStyle}>
      <Header back={true} />

      {/* Heading */}

      <Heading
        text1="Confrim"
        text2=" Order"
        containerStyle={{
          padding: 70,
        }}
      />
      <View
        style={{
          paddingTop: -5,
          paddingVertical: 10,
          flex: 1,
          marginTop: -50,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartItems.map((i) => (
            <ConfirmOrderItem
              key={i.product}
              image={i.image}
              name={i.name}
              price={i.price}
              quantity={i.quantity}
            />
          ))}
        </ScrollView>
      </View>
      <PriceTag heading={"Sub Total"} value={itemsPrice} />
      <PriceTag heading={"Shipping"} value={shippingCharge} />
      <PriceTag heading={"Tax"} value={tax} />
      <PriceTag heading={"Total"} value={totalAmount} />

      <TouchableOpacity
        onPress={() =>
          navigate.navigate("payment", {
            itemsPrice,
            shippingCharge,
            tax,
            totalAmount,
          })
        }>
        <Button
          style={{
            backgroundColor: colors.color3,
            borderRadius: 100,
            padding: 5,
            margin: 10,
          }}
          textColor={colors.color2}
          icon={"chevron-right"}>
          Payment
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const PriceTag = ({ heading, value }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 5,
    }}>
    <Text style={{ fontWeight: "800" }}>{heading}</Text>
    <Text>${value}</Text>
  </View>
);

export default ConfirmOrder;
