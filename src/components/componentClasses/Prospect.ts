import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProspectInterface } from "../../Pages/Home/Home";

const ProspectService = {
  finalizar: async (prospect: any) => {
    const token = await AsyncStorage.getItem("login-key");

    const data = {
      ...prospect,
      finalizado: 1,
    };

    await fetch(`http://10.0.2.2:3000/prospect/${prospect.idprospect}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  create: async (prospect: any) => {
    const token = await AsyncStorage.getItem("login-key");

    const response = await fetch(`http://10.0.2.2:3000/prospect`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prospect),
    });

    return response
  },

  update: async (prospect: any, idEndereco:number) => {
    const token = await AsyncStorage.getItem("login-key");

    await fetch(`http://10.0.2.2:3000/prospect/${idEndereco}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prospect),
    });
  },
};

export default ProspectService;
