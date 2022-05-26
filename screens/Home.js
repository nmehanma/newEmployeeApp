import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, Alert } from "react-native";
import { BASE_URL } from "@env";

console.log(BASE_URL)

import { ActivityIndicator, Card, FAB } from "react-native-paper";

import profileImage from "../assets/profile.png";

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch("https://7e5b-99-250-161-7.ngrok.io/")
      .then((res) => res.json())
      .then((results) => {
        setData(results), setLoading(false);
      })
      .catch((err) => {
        Alert.alert("something went wrong");
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

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
            source={{ uri: item.picture }}
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
        keyExtractor={(item) => item._id}
        onRefresh={() => {
          fetchData();
        }}
        refreshing={loading}
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
