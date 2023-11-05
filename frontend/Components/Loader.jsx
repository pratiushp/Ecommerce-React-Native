import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../Styles/style";

const Loader = () => {
  return (
    <ActivityIndicator
      style={{
        top: "50%",
        position: "absolute",
        alignSelf: "center",
      }}
      size={80}
      color={colors.color3}
    />
  );
};

export default Loader;
