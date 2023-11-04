import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserInterface {
  userNome: string;
  userSobrenome: string;
  userEmail: string;
  supervisorNome: string;
  supervisorSobrenome: string;
}

const getUser = async () => {
  const token = await AsyncStorage.getItem("login-key");

  const response = await fetch("http://10.0.2.2:3000/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.log(data);
  return data;
};

const Header = () => {
  const [user, setUser] = useState<UserInterface>();

  useEffect(() => {
    getUser().then((data: UserInterface[]) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <View style={styles.header}>
      <Text style={styles.headerSubtitle}>Bem vindo</Text>
      <Text style={styles.headerTitle}>
        {user?.userNome} {user?.userSobrenome[0]}.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: "#254CAF",
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    paddingBottom: 15,
  },
  headerSubtitle: {
    color: "#fff",
    fontSize: 18,
  },
  headerTitle: {
    color: "#ffbb00",
    fontWeight: "bold",
    fontSize: 28,
    textTransform: "uppercase",
  },
  endereco: {
    fontSize: 11,
    color: "#7f7f7f",
  },
});

export default Header;
