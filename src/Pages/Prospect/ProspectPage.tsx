import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProspectInterface } from "../Home/Home";
import { Icon, TextInput } from "react-native-paper";
import ProspectForm from "../../components/ProspectForm";

const ProspectPage = ({ navigation, route }: any) => {
  const { prospect } = route.params;

  console.log(prospect);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon source="home-account" size={70} color="#254CAF" />
        <View style={styles.info}>
          <Text style={styles.prospectName}>{prospect.nome}</Text>
          <Text style={styles.endereco}>
            {prospect.logradouro}, {prospect.cidade}
          </Text>
        </View>
      </View>
      <ProspectForm prospect={prospect} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  info: {
    flex: 1,
  },
  prospectName: {
    fontSize: 19,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#254CAF",
  },
  endereco: {
    fontSize: 11,
    color: "#7f7f7f",
  },
});

export default ProspectPage;
