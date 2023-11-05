import { StyleSheet, Platform, StatusBar } from "react-native";

export const colors = {
  color1: "#c70049",
  color1_light: "rgba(277,25,99, 1)",
  color2_light2: "rgba(199, 0,73,0.8)",
  color2: "white",
  color3: "rgb(45,45,45)",
  color4: "transparent",
  color5: "#f2f2f2",

  color6: "#f7f7f7",
};

export const defaultStyle = StyleSheet.create({
  padding: 10,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  flex: 1,
  backgroundColor: colors.color2,
});

export const inputStyling = {
  height: 40,
  backgroundColor: colors.color2,
  marginVertical: 10,
  marginHorizontal: 20,
};

export const formHeading = {
  marginTop: 10,
  fontSize: 25,

  fontWeight: "500",
  textAlign: "center",
  fontSize: 28,

  color: colors.color3,
  padding: 5,
  borderRadius: 5,
};

export const inputOptions = {
  style: inputStyling,
  mode: "outline",
  activeOutlineColor: colors.color1,
};

export const formStyles = StyleSheet.create({
  input: {
    height: 50,
    flexDirection: "column",
    marginBottom: 20,
    backgroundColor: colors.color2,
    marginVertical: 10,
    marginHorizontal: 20,
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 10,

    elevation: 10,
  },
  forget: {
    color: colors.color2,
    marginVertical: 10,
    marginHorizontal: 20,
    alignSelf: "flex-end",
    fontWeight: "200",
  },

  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    fontWeight: "400",
    fontSize: 18,
    padding: 6,
  },

  or: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "100",
    color: colors.color2,
  },

  link: {
    alignSelf: "center",
    color: colors.color2,
    fontSize: 18,
    textTransform: "uppercase",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export const defaultImg =
  "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
