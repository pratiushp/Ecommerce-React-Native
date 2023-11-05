import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { colors, defaultStyle } from "../Styles/style";
import Header from "./../Components/Header";
import { Avatar, Button } from "react-native-paper";
import SearchModal from "../Components/SearchModal";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../Components/ProductCard";
import Footer from "../Components/Footer";
import Heading from "../Components/Heading";

const categories = [
  { category: "Nice", _id: "abc" },
  { category: "Nice1", _id: "bcd" },
  { category: "Nice2", _id: "def" },
  { category: "Nice3", _id: "efg" },
  { category: "Nice4", _id: "fgh" },
  { category: "Nive5", _id: "ghi" },
];

const products = [
  {
    price: 123,
    stock: 20,
    name: "Sample",
    _id: "123",
    images: [
      {
        url: "data:image/jpeg;base64,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",
      },
    ],
  },

  {
    price: 999,
    stock: 20,
    name: "IPHONE 13",
    _id: "32",
    images: [
      {
        url: "data:image/jpeg;base64,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",
      },
    ],
  },
];

const Home = () => {
  const [category, setCategory] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigation();

  const categoryButtonHandler = (id) => {
    setCategory(id);
  };

  const addToCardHandler = (id) => {
    console.log("Add to cart");
  };
  return (
    <>
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        />
      )}
      <View style={defaultStyle}>
        <View>
          <Header />
        </View>
        <View
          style={{
            paddingTop: 70,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          {/* Coontent  */}
          <Heading text1="Our" text2="Product" />
          {/* Search Bar */}
          <View>
            <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
              <Avatar.Icon
                icon={"magnify"}
                size={50}
                color="gray"
                style={{
                  backgroundColor: colors.color2,
                  elevation: 15,
                  right: 30,
                  marginTop: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Category */}
        <View style={{ flexDirection: "row", height: 80 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center" }}>
            {categories.map((item, index) => (
              <Button
                key={item._id}
                style={{
                  backgroundColor:
                    category === item._id ? colors.color1 : colors.color5,
                  borderRadius: 100,
                  margin: 5,
                }}
                onPress={() => categoryButtonHandler(item._id)}>
                <Text
                  style={{
                    fontSize: 12,
                    color: category === item._id ? colors.color2 : "gray",
                  }}>
                  {item.category}
                </Text>
              </Button>
            ))}
          </ScrollView>
        </View>

        {/* Products */}

        <View style={{ flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item, index) => (
              <ProductCard
                stock={item.stock}
                name={item.name}
                price={item.price}
                image={item.images[0]?.url}
                addToCardHandler={addToCardHandler}
                id={item._id}
                key={item._id}
                i={index}
                navigate={navigate}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <Footer activeRoute={"home"} />
    </>
  );
};

export default Home;
