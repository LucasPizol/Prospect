import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import Auth from "./src/Pages/Auth/Auth";
import MyDrawer from "./src/components/Drawer";
import ProspectPage from "./src/Pages/Prospect/ProspectPage";
import CreateProspect from "./src/Pages/CreateProspect/CreateProspect";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Drawer"
            component={MyDrawer}
            options={{ headerShown: false, gestureEnabled: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Prospect"
            component={ProspectPage}
            options={{
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: "#254CAF",
              },
              headerShadowVisible: false,
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="Novo Prospect"
            component={CreateProspect}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
