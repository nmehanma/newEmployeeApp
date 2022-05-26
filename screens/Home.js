import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";

import { Card, FAB } from "react-native-paper";

import profileImage from "../assets/profile.png";

const Home = ({ navigation }) => {
  const data = [
    {
      id: 1,
      name: "najeam",
      email: "abc@abc.com",
      salary: "50 000",
      phone: "123",
      position: "web dev",
      picture: profileImage,
    },
    {
      id: 2,
      name: "suresh",
      email: "back@abc.com",
      salary: "60 000",
      phone: "456",
      position: "App dev",
      picture: profileImage,
    },
    {
      id: 3,
      name: "ramesh",
      email: "ramesh@abc.com",
      salary: "70 000",
      phone: "789",
      position: "Soft dev",
      picture: profileImage,
    },
    {
      id: 4,
      name: "hitesh",
      email: "hitesh@abc.com",
      salary: "80 000",
      phone: "135",
      position: "web dev",
      picture: profileImage,
    },
  ];

  const renderList = (item) => {
    return (
      <Card
        style={styles.mycard}
        key={item.id}
        onPress={() => navigation.navigate("Profile", { item })}
      >
        <View style={styles.cardView}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 30 }}
            source={profileImage}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.position}</Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderList(item);
        }}
      />
      <FAB
        onPress={() => navigation.navigate("Create")}
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{ colors: { accent: "#006aff" } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mycard: {
    margin: 5,
    padding: 5,
  },
  cardView: {
    flexDirection: "row",
    padding: 6,
  },
  text: {
    fontSize: 18,
  },

  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
export default Home;
