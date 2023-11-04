import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  BackHandler,
  Alert,
  ScrollView,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Prospect from "./components/Prospect";
import Header from "./components/Header";
import { ActivityIndicator, FAB } from "react-native-paper";

export interface ProspectInterface {
  descricao: string;
  logradouro: string;
  nome: string;
  cidade: string;
  bairro: string;
  cep: string;
  createdAt?: Date;
  finalizado?: number;
  telefone: string;
  updatedAt?: Date;
  idprospect?: number;
  numero: number;
  uf: string;
  endereco_idendereco: number;
}

const getProspects = async () => {
  const token = await AsyncStorage.getItem("login-key");

  const response = await fetch("http://10.0.2.2:3000/prospect", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

const Home = ({ navigation, route }: any) => {
  const [prospects, setProspects] = useState<ProspectInterface[]>();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProspects().then((data: ProspectInterface[]) => {
      setProspects(data.filter((prospect) => prospect.finalizado == 0));
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    navigation.addListener("focus", () => {
      getProspects().then((data: ProspectInterface[]) => {
        BackHandler.addEventListener("hardwareBackPress", () => {
          Alert.alert("Atenção", "Deseja sair do aplicativo?", [
            {
              text: "Sim",
              onPress: async () => {
                await AsyncStorage.removeItem("login-key");
                navigation.navigate("Auth");
              },
            },
            { text: "Não", onPress: () => true },
          ]);

          return true;
        });
        setProspects(data.filter((prospect) => prospect.finalizado == 0));
      });
    });
  }, [navigation]);

  if (!prospects)
    return (
      <ActivityIndicator
        animating={true}
        color="#254CAF"
        size={50}
        style={{
          flex: 1,
        }}
      />
    );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerProspect}>
        <View style={styles.yourProspections}>
          <Text style={styles.yourProspectionsText}>
            Você tem {prospects.length} prospecções.
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {prospects.map((prospect: ProspectInterface) => (
          <Prospect
            key={prospect.idprospect}
            prospect={prospect}
            navigation={navigation}
          ></Prospect>
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        color="#fff"
        style={styles.fab}
        onPress={() => navigation.navigate("Novo Prospect")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
    width: "100%",
    flexGrow: 1,
  },
  containerProspect: {
    width: "100%",
  },
  yourProspections: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  yourProspectionsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  yourProspectionsLength: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#254CAF",
  },
});

export default Home;
