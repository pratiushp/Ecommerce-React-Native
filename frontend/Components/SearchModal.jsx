import {
  View,
  Text,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../Styles/style";
import { StatusBar } from "expo-status-bar";

import { Headline, Searchbar } from "react-native-paper";

const SearchModal = ({
  searchQuery,
  setActiveSearch,
  setSearchQuery,
  products = [],
}) => {
  const navigate = useNavigation();
  const backAction = () => {
    setSearchQuery("");
    setActiveSearch(false);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        zIndex: 100,
        backgroundColor: colors.color2,
        padding: 35,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}>
      <SafeAreaView>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          style={{ marginTop: 20, width: "full" }}
        />

        <ScrollView>
          <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
            {products.map((i) => (
              <SearchItem
                key={i._id}
                imgSrc={i.images[0]?.url}
                name={i.name}
                price={i.price}
                handler={() =>
                  navigate.navigate("productdetails", { id: i._id })
                }
              />
            ))}
          </View>
          <View>
            {products.map((product) => (
              <SearchItem key={product._id}>
                <Image
                  source={{ uri: product.images[0]?.url }}
                  style={{ width: 200, height: 200 }}
                />
                <Text>{product.name}</Text>
                <Text>${product.price}</Text>
              </SearchItem>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const SearchItem = ({ price, name, imgSrc, handler }) => (
  <TouchableOpacity onPress={handler} activeOpacity={1}>
    <View
      style={{
        padding: 20,
        borderRadius: 10,
        backgroundColor: colors.color2,
        elevation: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        marginVertical: 30,
      }}>
      <Image
        source={{ uri: imgSrc }}
        style={{
          marginLeft: -5,
          width: 90,
          height: 90,
          position: "absolute",
          resizeMode: "contain",

          left: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      />
      <View style={{ width: "80%", paddingHorizontal: 30 }}>
        <Text
          style={{
            alignItems: "center",
            top: -15,
            marginLeft: 50,
            fontWeight: "bold",
            fontSize: 20,
          }}
          numberOfLines={1}>
          {name}
        </Text>
        <Headline style={{ fontWeight: "900", fontSize: 18 }} numberOfLines={1}>
          {price}
        </Headline>
      </View>
    </View>
  </TouchableOpacity>
);
export default SearchModal;
