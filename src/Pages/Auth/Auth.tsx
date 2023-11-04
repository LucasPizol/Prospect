import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Form from "./components/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface props {
  navigation: any;
}

const Auth = ({ navigation }: props) => {
  useEffect(() => {
    navigation.addListener("focus", async () => {
      const loginKey = await AsyncStorage.getItem("login-key");
      if (loginKey) navigation.navigate("Drawer");
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../Images/moura_pack_frontal.png")}
        style={styles.image}
      />
      <View style={styles.form}>
        <Form navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    backgroundColor: "#254CAF",
  },
  form: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    height: "60%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    display: "flex",
    justifyContent: "space-between",
  },
  description: {
    textAlign: "center",
    color: "#5f5f5f",
    fontWeight: "bold",
    fontSize: 18,
  },
  image: {
    maxWidth: "100%",
    flex: 1,
  },
});

export default Auth;
