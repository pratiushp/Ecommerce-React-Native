import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultImg,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from "../Styles/style";

import { Avatar, Button, TextInput } from "react-native-paper";
import Footer from "../Components/Footer";

const Register = ({ navigation }) => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");

  const loading = false;

  const submitHandler = () => {
    alert("Yeah"); // remove in futre
    navigation.navigate("verify");
  };

  const disableBtn =
    !name || !email || !password || city || !address || !pincode || !country;
  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
        {/* Heading */}

        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Register</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: 20,
            elevation: 10,
            borderRadius: 10,
            backgroundColor: colors.color3,
          }}>
          <View style={{ minHeight: 800 }}>
            <Avatar.Image
              style={{
                alignSelf: "center",
                backgroundColor: colors.color1,
              }}
              size={80}
              source={{
                uri: avatar ? avatar : defaultImg,
              }}
            />

            <TouchableOpacity onPress={() => navigation.navigate("camera")}>
              <Button textColor={colors.color2}> Change Photo</Button>
            </TouchableOpacity>

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
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
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
              Register
            </Button>
            <Text style={styles.or}> OR</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("login")}>
              <Text style={styles.link}> Login </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <Footer activeRoute="profile" />
    </>
  );
};

export default Register;
