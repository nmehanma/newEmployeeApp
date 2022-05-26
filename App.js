import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Contants from "expo-constants";

import Home from "./screens/Home";

import CreateEmployee from "./screens/CreateEmployee";
import Profile from "./screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const myOptions = {
  title: "My Sweet Home",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#006aff",
  },
};

const App = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={myOptions} />
        <Stack.Screen
          name="Create"
          component={CreateEmployee}
          options={{ ...myOptions, title: "Create Employee" }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ ...myOptions, title: "Profile" }}
        />
      </Stack.Navigator>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    // marginTop: Contants.statusBarHeight,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
