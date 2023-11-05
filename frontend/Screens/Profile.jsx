import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, defaultStyle, formHeading } from "../Styles/style";
import { Avatar, Button } from "react-native-paper";
import { useState } from "react";
import ButtonBox from "../Components/ButtonBox";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";

const user = {
  name: "Pratiush",
  email: "pratiushprasain@gmail.com",
};

const loading = false;

const Profile = ({ navigation }) => {
  const [avatar, setAvatar] = useState(null);

  const logoutHandler = () => {
    console.log("Logout");
  };

  const navigateHandler = (text) => {
    switch (text) {
      case "Admin":
        navigation.navigate("adminpanel");

        break;

      case "Orders":
        navigation.navigate("orders");

        break;
      case "Profile":
        navigation.navigate("updateprofile");

        break;
      case "Password":
        navigation.navigate("changepassword");

        break;
      case "Log Out":
        logoutHandler();
        break;

      default:
      case "Orders":
        navigation.navigate("orders");

        break;
        break;
    }
  };
  return (
    <>
      <View style={{ ...defaultStyle }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Profile</Text>
        </View>
        {/* Loading */}

        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.container}>
              <Avatar.Image
                size={100}
                style={{ backgroundColor: colors.color1 }}
                source={{
                  uri: avatar,
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("camera", { updateProfile: true })
                }>
                <Button style={{}} textColor={colors.color2}>
                  {" "}
                  Change Photo
                </Button>
              </TouchableOpacity>

              <Text style={styles.name}>{user?.name} </Text>
              <Text
                style={{
                  fontWeight: "400",
                  color: colors.color2,
                }}>
                {user?.email}{" "}
              </Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-between",
                }}>
                <ButtonBox
                  handler={navigateHandler}
                  text={"Order"}
                  icon={"format-list-bulleted-square"}
                />
                <ButtonBox
                  handler={navigateHandler}
                  icon={"view-dashboard"}
                  text={"Admin"}
                  reverse={true}
                />
                <ButtonBox
                  handler={navigateHandler}
                  text={"Profile"}
                  icon={"pencil"}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-evenly",
                }}>
                <ButtonBox
                  handler={navigateHandler}
                  text={"Password"}
                  icon={"pencil"}
                />
                <ButtonBox
                  handler={navigateHandler}
                  text={"Log Out"}
                  icon={"exit-to-app"}
                />
              </View>
            </View>
          </>
        )}
      </View>
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 7,
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },

  name: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    color: colors.color2,
  },
});

export default Profile;
