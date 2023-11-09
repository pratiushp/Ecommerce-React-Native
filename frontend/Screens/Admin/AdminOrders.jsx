import { View, Text, ScrollView } from "react-native";
import React from "react";
import { colors, defaultStyle, formHeading } from "../../Styles/style";
import Header from "../../Components/Header";
import Loader from "../../Components/Loader";
import OrderItem from "../../Components/OrderItem";
import { orders } from "../Orders";

const AdminOrders = () => {
  const loading = false;

  const processOrderLoading = false;
  const updadteHandler = () => {};

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      <Header back={true} />

      <View style={{ marginBottom: 20 }}>
        <Text style={formHeading}>Admin Orders</Text>
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
                  admin={true}
                  updadteHandler={updadteHandler}
                  loading={processOrderLoading}
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

export default AdminOrders;
