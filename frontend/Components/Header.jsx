import { TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { colors } from "../Styles/style";
import { useNavigation, useRoute } from "@react-navigation/native";

const Header = ({ back, emptyCart = false }) => {
  const navigate = useNavigation();
  const route = useRoute();

  const emptyCartHnadler = () => {
    console.log("Empty Cart");
  };
  return (
    <>
      {back && (
        <TouchableOpacity
          style={{ position: "absolute", left: 10, top: 30, zIndex: 10 }}
          onPress={() => navigate.goBack()}>
          <Avatar.Icon
            style={{ backgroundColor: colors.color4 }}
            icon={"arrow-left"}
            color={
              route.name === "productdetails" ? colors.color2 : colors.color3
            }
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={{ position: "absolute", right: 10, top: 30, zIndex: 10 }}
        onPress={
          emptyCart ? emptyCartHnadler : () => navigate.navigate("cart")
        }>
        <Avatar.Icon
          style={{ backgroundColor: colors.color4 }}
          icon={emptyCart ? "delete-outline" : "cart-outline"}
          color={
            route.name === "productdetails" ? colors.color2 : colors.color3
          }
        />
      </TouchableOpacity>
    </>
  );
};

export default Header;
