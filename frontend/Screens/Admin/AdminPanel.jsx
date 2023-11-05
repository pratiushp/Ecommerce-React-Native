import { View, Text, ScrollView } from "react-native";
import React from "react";
import { colors, defaultStyle, formHeading } from "../../Styles/style";
import Header from "../../Components/Header";
import Loader from "../../Components/Loader";
import ButtonBox from "../../Components/ButtonBox";
import ProductListHeading from "../../Components/ProductListHeading";
import { products } from "../Home";
import ProductListItem from "../../Components/ProductListItem";
import Chart from "../../Components/Chart";

const AdminPanel = ({ navigation }) => {
  const loading = false;

  const navigationHandler = () => {};

  const deleteProductHandler = (id) => {
    console.log(`Delete Product with ID ${id}`);
  };

  return (
    <View style={defaultStyle}>
      <Header back={true} />
      {/* Heading */}
      <View style={{ paddingTop: 70, marginBottom: 20 }}>
        <Text style={formHeading}>Admin Panel</Text>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View
            style={{
              backgroundColor: colors.color3,
              borderRadius: 20,
              alignItems: "center",
            }}>
            <Chart inStock={12} outOfStock={2} />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 10,
            }}>
            <ButtonBox
              icon={"plus"}
              text={"Product"}
              handler={navigationHandler}
            />

            <ButtonBox
              icon={"format-list-bulleted-square"}
              text={"All Orders"}
              reverse={true}
              handler={navigationHandler}
            />

            <ButtonBox
              icon={"plus"}
              text={"Category"}
              handler={navigationHandler}
            />
          </View>

          <ProductListHeading />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {products.map((item, index) => (
                <ProductListItem
                  key={item._id}
                  id={item._id}
                  i={index}
                  price={item.price}
                  stock={item.stock}
                  name={item.name}
                  category={item.category}
                  imgSrc={item.images[0].url}
                  navigate={navigation}
                  deleteHandler={deleteProductHandler}
                />
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default AdminPanel;
