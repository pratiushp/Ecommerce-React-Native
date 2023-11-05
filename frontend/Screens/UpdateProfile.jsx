import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from "../Styles/style";

import { Button, TextInput } from "react-native-paper";

import Header from "../Components/Header";

const UpdateProfile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");

  const loading = false;

  const submitHandler = () => {
    alert("Yeah"); // remove in futre
  };

  const disableBtn =
    !name || !email || !password || city || !address || !pincode || !country;
  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
      {/* Heading */}

      <Header back={true} />

      <View style={{ marginBottom: 20 }}>
        <Text style={formHeading}>Edit Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          padding: 20,
          elevation: 10,
          borderRadius: 10,
          backgroundColor: colors.color3,
        }}>
        <View style={{ minHeight: 600, justifyContent: "center" }}>
          <View style={{ gap: 5 }}>
            <TextInput
              {...inputOptions}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              {...inputOptions}
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
            />

            <TextInput
              {...inputOptions}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />

            <TextInput
              {...inputOptions}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />

            <TextInput
              {...inputOptions}
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
            />

            <TextInput
              {...inputOptions}
              placeholder="Pin Code"
              value={pincode}
              keyboardType="number-pad"
              onChangeText={setPincode}
            />
          </View>

          <Button
            loading={loading}
            onPress={submitHandler}
            textColor={colors.color2}
            disabled={disableBtn}
            style={styles.btn}>
            Update
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;
