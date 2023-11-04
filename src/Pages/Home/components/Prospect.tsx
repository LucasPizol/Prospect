import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import { ProspectInterface } from "../Home";
import { Icon } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface props {
  prospect: ProspectInterface;
  navigation: any;
}

const Prospect = ({ prospect, navigation }: props) => {
  const handleChangePage = () => {
    navigation.navigate("Prospect", { prospect });
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack()
      return true;
    });
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={handleChangePage}>
      <Icon source="home-account" size={45} color="#254CAF" />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{prospect.nome}</Text>
        <Text style={styles.endereco}>
          {prospect.logradouro}, {prospect.cidade}
        </Text>
      </View>
      <Icon source="square-edit-outline" size={20} color="#254CAF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    gap: 10,
    marginBottom: 10,
    paddingVertical: 20,
    borderRadius: 9,
    shadowColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.33,
    shadowRadius: 10.32,
    marginHorizontal: 20,
    elevation: 16,
  },
  name: {
    fontSize: 21,
    fontWeight: "bold",
  },
  endereco: {
    fontSize: 11,
    color: "#7f7f7f",
  },
});

export default Prospect;
