import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  TextInput,
} from "react-native";
import { Button } from "react-native-paper";
import { ProspectInterface } from "../Pages/Home/Home";
import ProspectService from "./componentClasses/Prospect";
import CEPService from "./componentClasses/CEPService";

interface props {
  prospect?: ProspectInterface;
  navigation: any;
}

interface inputProps {
  label: string;
  change: any;
  value: string;
  styleLabel: any;
  styleInput: any;
  styleView?: any;
  disabled?: any;
}

const MyInput = ({
  label,
  change,
  value,
  styleLabel,
  styleInput,
  styleView,
  disabled,
}: inputProps) => {
  return (
    <View style={styleView}>
      <Text style={styleLabel}>{label}</Text>
      <TextInput
        onChangeText={change}
        value={value}
        style={styleInput}
        editable={disabled}
      />
    </View>
  );
};

const ProspectForm = ({ prospect, navigation }: props) => {
  const [nome, setNome] = useState<string>(prospect?.nome || "");
  const [descricao, setDescricao] = useState<string>(prospect?.descricao || "");
  const [logradouro, setLogradouro] = useState<string>(
    prospect?.logradouro || ""
  );
  const [telefone, setTelefone] = useState<string>(prospect?.telefone || "");
  const [cep, setCep] = useState<string>(prospect?.cep || "");
  const [bairro, setBairro] = useState<string>(prospect?.bairro || "");
  const [cidade, setCidade] = useState<string>(prospect?.cidade || "");
  const [numero, setNumero] = useState<string>(
    prospect?.numero.toString() || ""
  );
  const [uf, setUf] = useState<string>(prospect?.nome || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [blockLogradouro, setBlockLogradouro] = useState<boolean>(false);
  const [blockCidade, setBlockCidade] = useState<boolean>(false);

  const createProspect = async () => {
    const fields = {
      nome,
      descricao,
      logradouro,
      cep,
      bairro,
      numero,
      UF: uf,
      telefone,
      cidade,
    };
    const response = await ProspectService.create(fields);
    if (response.status === 400) {
      Alert.alert("Atenção.", "Preencha todos os campos");
    }
  };

  const saveDataValues = async () => {
    const fields = {
      nome,
      descricao,
      logradouro,
      cep,
      bairro,
      numero,
      idendereco: prospect!.endereco_idendereco,
      finalizado: prospect!.finalizado,
      UF: uf,
      telefone,
      cidade,
    };

    await ProspectService.update(fields, Number(prospect!.idprospect));
  };

  const handleEndProspect = async () => {
    Alert.alert("Atenção", "Deseja encerrar este prospect?", [
      {
        text: "Sim",
        onPress: async () => {
          await ProspectService.finalizar(prospect);
          navigation.navigate("Início", { reset: true });
        },
      },
      { text: "Não", onPress: () => true },
    ]);
  };

  const lookForCep = async (text: string) => {
    if (text.length != 8) {
      if (blockCidade) {
        setBlockCidade(false);
        setBlockLogradouro(false);
        setLogradouro("");
        setBairro("");
        setUf("");
        setCidade("");
      }
      return;
    }

    setLoading(true);
    const cep = await CEPService.get(text);

    setCidade(cep.localidade);
    setUf(cep.uf);
    setBlockCidade(true);
    setLoading(false);

    if (cep.logradouro) {
      setLogradouro(cep.logradouro);
      setBairro(cep.bairro);
      setBlockLogradouro(true);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.containerScroll}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {prospect ? null : <Text style={styles.title}>Novo Prospect</Text>}
        <Text style={styles.info}>Informações da loja</Text>
        <MyInput
          change={setNome}
          value={nome}
          styleInput={styles.inputText}
          styleLabel={styles.styleLabel}
          label={"Nome"}
        />
        <MyInput
          change={setDescricao}
          value={descricao}
          styleInput={styles.inputText}
          styleLabel={styles.styleLabel}
          label={"Descrição"}
        />
        <MyInput
          change={setTelefone}
          value={telefone}
          styleInput={styles.inputText}
          styleLabel={styles.styleLabel}
          label={"Telefone"}
        />
        <Text style={styles.info}>Endereço da loja</Text>
        <MyInput
          change={(text: string) => {
            setCep(text);
            lookForCep(text);
          }}
          value={cep}
          styleInput={styles.inputText}
          styleLabel={styles.styleLabel}
          label={"CEP"}
        />
        <View style={styles.line}>
          <MyInput
            change={setLogradouro}
            value={logradouro}
            styleInput={styles.inputText}
            styleLabel={styles.styleLabel}
            label={"Logradouro"}
            styleView={{ flex: 3 }}
            disabled={!blockLogradouro || loading}
          />
          <MyInput
            change={setNumero}
            value={numero}
            styleInput={styles.inputText}
            styleLabel={styles.styleLabel}
            styleView={{ flex: 1 }}
            label={"Nº"}
          />
        </View>

        <MyInput
          change={setBairro}
          value={bairro}
          styleInput={styles.inputText}
          styleLabel={styles.styleLabel}
          label={"Bairro"}
          disabled={!blockLogradouro || loading}
        />
        <View style={styles.line}>
          <MyInput
            change={setUf}
            value={uf}
            styleInput={styles.inputText}
            styleLabel={styles.styleLabel}
            label={"UF"}
            styleView={{ flex: 1 }}
            disabled={!blockCidade || loading}
          />
          <MyInput
            change={setCidade}
            value={cidade}
            styleInput={styles.inputText}
            styleLabel={styles.styleLabel}
            label={"Cidade"}
            styleView={{ flex: 3 }}
            disabled={!blockCidade || loading}
          />
        </View>
      </ScrollView>

      {!prospect ? (
        <Button onPress={createProspect}>Criar Prospect</Button>
      ) : (
        <View style={styles.line}>
          <Button
            textColor="green"
            onPress={handleEndProspect}
            disabled={prospect.finalizado == 1}
          >
            Encerrar Prospect
          </Button>
          <Button
            buttonColor="#254CAF"
            textColor="#fff"
            onPress={saveDataValues}
          >
            Salvar Alterações
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 27,
    color: "#254CAF",
    fontWeight: "bold",
    marginTop: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "white",
    flexGrow: 1,
    padding: 20,
  },
  inputText: {
    padding: 10,
    backgroundColor: "#c7d9ff",
    borderColor: "#254CAF",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  styleLabel: {
    fontSize: 15,
    marginBottom: 2,
    color: "#444",
  },
  containerScroll: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  line: {
    flexDirection: "row",
    width: "100%",
    gap: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ProspectForm;
