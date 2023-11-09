import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
} from "../../Styles/style";
import Header from "../../Components/Header";
import Loader from "../../Components/Loader";
import { Button, TextInput } from "react-native-paper";
import { inputStyling } from "./../../Styles/style";
import SelectComponent from "../../Components/SelectComponent";

const UpdateProduct = ({ navigate, route }) => {
  const loading = false;
  const loadingOther = false;

  const [id] = useState(route.params.id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Laptop");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([
    { _id: "12334", category: "Kitchen" },
    { _id: "123345", category: "Appliance" },
    { _id: "1233456", category: "Clothes" },
  ]);
  const [visible, setVisible] = useState(false);

  const submitHandler = () => {
    console.log(name, description, price, stock, categoryId);
  };

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
        <Header back={true} />

        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Update Product</Text>
        </View>
        {loading ? (
          <Loader />
        ) : (
          <ScrollView
            style={{
              padding: 20,
              elevation: 10,
              borderRadius: 10,
              backgroundColor: colors.color3,
            }}>
            <View
              style={{
                justifyContent: "center",
                minHeight: 650,
              }}>
              <Button
                onPress={() =>
                  navigate.navigate("productimages", {
                    id,
                    images: [],
                  })
                }
                textColor={colors.color1}>
                Manage Images
              </Button>

              <TextInput
                {...inputOptions}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />

              <TextInput
                {...inputOptions}
                placeholder="Descriprion"
                value={description}
                onChangeText={setDescription}
              />

              <TextInput
                {...inputOptions}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
              />

              <TextInput
                {...inputOptions}
                placeholder="Stock"
                value={stock}
                onChangeText={setStock}
              />

              <Text
                onPress={() => setVisible(true)}
                style={{
                  ...inputStyling,
                  textAlign: "center",
                  borderRadius: 3,
                  textAlignVertical: "center",
                }}>
                {category}
              </Text>

              <Button
                disabled={loadingOther}
                style={{
                  backgroundColor: colors.color1,
                  margin: 20,
                  padding: 6,
                }}
                onPress={submitHandler}
                loading={loadingOther}
                textColor={colors.color2}>
                Update
              </Button>
            </View>
          </ScrollView>
        )}
      </View>
      <SelectComponent
        visible={visible}
        setVisible={setVisible}
        setCategoryId={setCategoryId}
        setCategory={setCategory}
        categories={categories}
      />
    </>
  );
};

export default UpdateProduct;
