import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "../../Components/Header";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
} from "../../Styles/style";
import CategoryCard from "../../Components/CategoryCard";
import { Button, TextInput } from "react-native-paper";

const categories = [
  {
    name: "Console",
    _id: "asdasd",
  },
  {
    name: "Console",
    _id: "apler",
  },
];

const Categories = () => {
  const [category, setCategory] = useState("");
  const deleteHandler = (id) => {
    console.log(`Deleting Category, ${id}`);
  };
  const submitHandler = () => {};

  const loading = false;
  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      {/* Heading */}

      <Header back={true} />

      <View style={{ marginBottom: 20 }}>
        <Text style={formHeading}>Category</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 20 }}>
        <View
          style={{
            backgroundColor: colors.color2,
            padding: 20,
            minWidth: 400,
          }}>
          {categories.map((i) => (
            <CategoryCard
              name={i.name}
              key={i._id}
              id={i._id}
              deleteHandler={deleteHandler}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.container}>
        <TextInput
          {...inputOptions}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        <Button
          loading={loading}
          onPress={submitHandler}
          disabled={!category}
          textColor={colors.color2}
          style={{ backgroundColor: colors.color1, margin: 20, padding: 6 }}>
          Add
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: colors.color3,
  },
});

export default Categories;
