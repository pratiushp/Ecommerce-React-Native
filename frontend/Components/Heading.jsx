import { View, Text } from "react-native";
import React from "react";

const Heading = ({ text1 = "Our", text2 = "Products", containerStyle }) => {
  return (
    <View style={containerStyle}>
      <Text style={{ fontSize: 25, marginTop: 2, fontWeight: 600 }}>
        {" "}
        {text1}{" "}
      </Text>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}> {text2}</Text>
    </View>
  );
};

export default Heading;
