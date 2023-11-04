import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface props {
  navigation: any;
}

const Form = ({ navigation }: props) => {
  const [areaText, setAreaText] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginToApp = async () => {
    if (areaText === "") return Alert.alert("Atenção", "Preencha a área");
    if (password === "") return Alert.alert("Atenção", "Preencha sua senha.");

    const login = {
      code: areaText,
      password: password,
    };

    try {
      const response = await fetch("http://10.0.2.2:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });
      const data = await response.json();

      if (data.message) throw new Error(data.message);

      await AsyncStorage.setItem("login-key", data.token);
      Alert.alert("Sucesso", "Logado com sucesso");

      setAreaText("")
      setPassword("")

      navigation.navigate("Drawer");
    } catch (err) {
      if (err instanceof Error) {
        Alert.alert("Atenção", err.message);
      }
    }
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Seja bem vindo de volta!</Text>
      <Text style={styles.subTitle}>Faça a gestão da sua carteira</Text>
      <TextInput
        label="Cód. Área"
        value={areaText}
        onChangeText={(text) => setAreaText(text)}
        mode="outlined"
        style={styles.textInput}
        outlineColor="#0072C3"
        activeOutlineColor="#0072C3"
      />
      <TextInput
        secureTextEntry={!showPassword}
        mode="outlined"
        style={styles.textInput}
        value={password}
        onChangeText={(text) => setPassword(text)}
        label="Senha"
        outlineColor="#0072C3"
        activeOutlineColor="#0072C3"
        right={
          <TextInput.Icon
            onPress={() => setShowPassword(!showPassword)}
            icon={showPassword ? "eye-off" : "eye"}
          />
        }
      />
      <Button
        style={styles.button}
        icon="account-check"
        mode="contained"
        onPress={loginToApp}
        buttonColor="#0072C3"
      >
        Entrar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#254CAF",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#7f7f7f",
  },
  view: {
    width: "100%",
  },
  textInput: {
    width: "100%",
  },
  button: {
    marginTop: 30,
    width: "100%",
  },
});

export default Form;
