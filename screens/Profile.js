import React from "react";
import { StyleSheet, Text, View, Image, Linking, Platform } from "react-native";
import { Title, Card, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import profilePicture from "../assets/profile.png";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
// import { theme } from "./CreateEmployee";

const Profile = (props) => {
  const { _id, name, picture, phone, salary, email, position } =
    props.route.params.item;
    // console.log(props.route.params.item.picture)
  const openDial = () => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${12345}`);
    } else {
      Linking.openURL(`telprompt:${12345}`);
    }
  };
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#0033ff", "#6bc1ff"]}
        style={{ height: "20%" }}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: 140, height: 140, borderRadius: 70, marginTop: -50 }}
          source={{uri:picture}}
        />
      </View>
      <View style={{ alignItems: "center", margin: 15 }}>
        <Title>{name}</Title>
        <Text style={{ fontSize: 15 }}>{position}</Text>
      </View>
      {/* <Card style={styles.mycard}>
        <View style={styles.cardContent}>
          <MaterialIcons name="email" size={32} color="#006aff" />
          <Text style={styles.mytext}>Web Developer</Text>
        </View>
      </Card> */}
      <Card
        style={styles.mycard}
        onPress={() => {
          Linking.openURL(`mailto:${email}`);
        }}
      >
        <View style={styles.cardContent}>
          <Entypo name="email" size={32} color="#006aff" />
          <Text style={styles.mytext}>{email}</Text>
        </View>
      </Card>

      <Card
        style={styles.myCard}
        onPress={() => {
          openDial();
        }}
      >
        <View style={styles.cardContent}>
          <Entypo name="phone" size={32} color="#006aff" />
          <Text style={styles.mytext}>{phone}</Text>
        </View>
      </Card>
      <Card style={styles.mycard}>
        <View style={styles.cardContent}>
          <MaterialIcons name="attach-money" size={32} color="#006aff" />
          <Text style={styles.mytext}>{salary}</Text>
        </View>
      </Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        <Button
          icon="account-edit"
          theme={theme}
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Edit
        </Button>
        <Button
          icon="delete"
          theme={theme}
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Dismiss
        </Button>
      </View>
    </View>
  );
};
const theme = {
  colors: {
    primary: "#006aff",
  },
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  mycard: {
    margin: 3,
  },
  cardContent: {
    flexDirection: "row",
    padding: 8,
  },
  mytext: {
    fontSize: 18,
    marginTop: 3,
    marginLeft: 5,
  },
});

export default Profile;
