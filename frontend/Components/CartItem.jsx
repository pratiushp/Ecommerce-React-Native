import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../Styles/style";
import { Avatar } from "react-native-paper";
import { iconOptions } from "../Screens/ProductDetails";

const CartItem = ({
  name,
  amount,
  qty,
  stock,
  index,
  imgSrc,
  id,
  decrementHandler,
  incrementHandler,
  navigate,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 100,
        marginVertical: 20,
      }}>
      <View
        style={{
          width: "40%",
          backgroundColor: index % 2 === 0 ? colors.color1 : colors.color3,
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
        }}>
        <Image
          source={{
            uri: imgSrc,
          }}
          style={styles.img}
        />
      </View>
      <View
        style={{
          width: "40%",
          paddingHorizontal: 25,
        }}>
        <Text
          onPress={() => navigate.navigate("productdetails", { id })}
          style={{ fontSize: 17 }}
          numberOfLines={1}>
          {name}
        </Text>
        <Text style={{ fontSize: 17, fontWeight: 600 }} numberOfLines={1}>
          ${amount}
        </Text>
      </View>

      <View style={styles.qtyContainer}>
        <TouchableOpacity onPress={() => decrementHandler(id, qty)}>
          <Avatar.Icon icon={"minus"} size={20} {...iconOptions} />
        </TouchableOpacity>
        <Text style={styles.qtyText}>{qty}</Text>

        <TouchableOpacity onPress={() => incrementHandler(id, qty, stock)}>
          <Avatar.Icon icon={"plus"} size={20} {...iconOptions} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  qtyText: {
    backgroundColor: colors.color4,
    height: 20,
    width: 20,
    textAlignVertical: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.color5,
  },

  qtyContainer: {
    alignItems: "center",
    width: "20%",
    height: 80,
    justifyContent: "space-between",
    alignSelf: "center",
  },

  img: {
    width: 200,
    height: "100%",
    resizeMode: "contain",
    top: "-20%",
    left: "15%",
  },
});

export default CartItem;
