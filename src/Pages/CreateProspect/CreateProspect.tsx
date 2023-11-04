import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ProspectForm from "../../components/ProspectForm";
import ProspectNewForm from "../../components/ProspectForm";

interface props {
  navigation: any;
}

const CreateProspect = ({ navigation }: props) => {
  return (
    <View style={styles.container}>
      <ProspectForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#254CAF"
  }
})

export default CreateProspect;
