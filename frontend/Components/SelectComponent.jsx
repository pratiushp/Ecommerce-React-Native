import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { colors, inputStyling } from "../Styles/style";
import { Avatar, Headline } from "react-native-paper";

const SelectComponent = ({
  visible,
  setVisible,
  setCategory,
  setCategoryId,
  categories = [],
}) => {
  const seleCategoryHandler = (item) => {
    setCategory(item.category);
    setCategoryId(item._id);
    setVisible(false);
  };

  return (
    visible && (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Avatar.Icon
            icon={"close"}
            size={30}
            style={{
              alignSelf: "flex-end",
              backgroundColor: colors.color1,
            }}
          />
        </TouchableOpacity>
        <Headline style={styles.heading}> Select a Category </Headline>
        <ScrollView>
          {categories.map((i) => (
            <Text
              onPress={() => seleCategoryHandler(i)}
              style={styles.text}
              key={i._id}>
              {i.category}
            </Text>
          ))}
        </ScrollView>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color2,
    marginTop: 60,
    position: "absolute",
    padding: 35,
    borderRadius: 10,
    width: "90%",
    minHeight: 700,
    alignSelf: "center",
    elevation: 5,
    top: 50,
  },

  heading: {
    textAlign: "center",
    marginVertical: 10,
    backgroundColor: colors.color1,
    borderRadius: 5,
    padding: 3,
    color: colors.color2,
  },
  text: {
    fontSize: 17,
    fontWeight: "100",
    textTransform: "uppercase",
    marginVertical: 10,
  },
});

export default SelectComponent;
