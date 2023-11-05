import { View, Text, ScrollView } from "react-native";
import React from "react";
import { colors, defaultStyle, formHeading } from "../Styles/style";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import { Headline } from "react-native-paper";
import OrderItem from "../Components/OrderItem";

const orders = [
  {
    id: "sxgasd",
    shippingInfo: {
      address: "Pingalasthan ",
      city: "Kathmandu",
      country: "Nepal",
      pinCode: 44600,
    },
    createdAt: "12-02-2023T2343",
    orderStatus: "Processing",
    paymentMethod: "COD",
    totalAmount: 2000,
  },
  {
    id: "effscvfg",
    shippingInfo: {
      address: "LaskeSide ",
      city: "Pokhara",
      country: "Nepal",
      pinCode: 44600,
    },
    createdAt: "12-02-2023T2343",
    orderStatus: "Processing",
    paymentMethod: "Online",
    totalAmount: 3000,
  },
];

const Orders = () => {
  const loading = false;
  return (
    <View
      style={{
        height: "60%",
        ...defaultStyle,
        backgroundColor: colors.color5,
      }}>
      <Header back={true} />

      <View style={{ marginBottom: 20 }}>
        <Text style={formHeading}>Orders</Text>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <View style={{ padding: 10, flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <OrderItem
                  key={item._id}
                  id={item.id}
                  i={index}
                  price={item.totalAmount}
                  staus={item.orderStatus}
                  paymentMethod={item.paymentMethod}
                  orderOn={item.createdAt.split("T")[0]}
                  address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country}, ${item.shippingInfo.pinCode}`}
                  //   admin={true}
                />
              ))
            ) : (
              <Headline style={{ textAlign: "center" }}>No Order Yet</Headline>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Orders;
