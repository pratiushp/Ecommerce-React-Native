import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { colors } from "../Styles/style";
import Modal from "./Modal";

const ProductListItem = ({
  navigate,
  id,
  i,
  price,
  stock,
  name,
  imgSrc,
  deleteHandler,
  category,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <TouchableOpacity
        onLongPress={() => setOpenModal((prev) => !prev)}
        activeOpacity={0.9}
        onPress={() => navigate.navigate("productdetails", { id })}>
        <View
          style={{
            ...styles.container,
            backgroundColor: i % 2 === 0 ? colors.color1 : colors.color3,
          }}>
          <Image
            source={{
              uri: imgSrc,
            }}
            style={{
              width: 40,
              height: 40,
              resizeMode: "contain",
            }}
          />
          <Text style={{ width: 60, color: colors.color2 }} numberOfLines={1}>
            ${price}
          </Text>

          <Text
            style={{ maxWidth: 120, color: colors.color2 }}
            numberOfLines={1}>
            {name}
          </Text>

          <Text style={{ width: 60, color: colors.color2 }} numberOfLines={1}>
            {category}
          </Text>

          <Text style={{ width: 40, color: colors.color2 }} numberOfLines={1}>
            {stock}
          </Text>
        </View>
      </TouchableOpacity>

      {openModal && (
        <Modal
          id={id}
          navigate={navigate}
          deleteHandler={deleteHandler}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default ProductListItem;
