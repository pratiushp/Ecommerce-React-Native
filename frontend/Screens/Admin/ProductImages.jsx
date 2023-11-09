import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors, defaultStyle, formHeading } from "../../Styles/style";
import Header from "../../Components/Header";
import ImageCard from "../../Components/ImageCard";
import { Avatar, Button } from "react-native-paper";

const ProductImages = ({ navigation, route }) => {
  const [images] = useState(route.params.images);
  const [productId] = useState(route.params.id);
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  const loading = false;
  const deleteHandler = (id) => {
    console.log("image id", id);
    console.log("Product Id", productId);
  };

  const submitHandler = () => {};
  return (
    <View
      style={{
        ...defaultStyle,
        backgroundColor: colors.color5,
      }}>
      <Header back={true} />
      <View style={{ marginBottom: 20 }}>
        <Text style={formHeading}>Product Images</Text>
      </View>

      <ScrollView style={{ marginBottom: 20 }}>
        <View
          style={{
            backgroundColor: colors.color2,
            padding: 40,
            minHeight: 400,
          }}>
          {images.map((i) => (
            <ImageCard
              src={i.url}
              id={i.id}
              key={i._id}
              deleteHandler={deleteHandler}
            />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: colors.color3,
        }}>
        <Image
          style={{
            backgroundColor: colors.color2,
            width: 100,
            height: 100,
            alignSelf: "center",
            resizeMode: "contain",
          }}
          source={{
            uri: image,
          }}
        />

        <View
          style={{ flexDirection: "row", justifyContent: "center", margin: 5 }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate("camera", { updateProduct: true })
            }>
            <Avatar.Icon
              icon={"camera"}
              size={30}
              style={{
                backgroundColor: colors.color2,
              }}
              color={colors.color3}
            />
          </TouchableOpacity>
        </View>
        <Button
          style={{
            backgroundColor: colors.color1,
            padding: 6,
          }}
          textColor={colors.color2}
          loading={loading}
          onPress={submitHandler}
          disabled={!imageChanged}>
          Add
        </Button>
      </View>
    </View>
  );
};

export default ProductImages;
