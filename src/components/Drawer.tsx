import "react-native-gesture-handler";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../Pages/Home/Home";
import { Image } from "react-native";
import Agenda from "../Pages/Agenda/Agenda";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Início"
        component={Home}
        options={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#254CAF",
          },
          headerShadowVisible: false,
          headerRight: () => (
            <Image
              source={require("../Images/moura-logo.png")}
              style={{
                flex: 1,
                height: 100,
                width: 100,
                objectFit: "contain",
                marginRight: 20,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen name="Agenda" component={Agenda}></Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default MyDrawer;
