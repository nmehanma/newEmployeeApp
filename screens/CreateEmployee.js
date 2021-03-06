import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
// import * as Permissions from "expo-permissions";
import { BASE_URL } from "@env";

// const KEY = process.env.BASE_URL;
console.log(BASE_URL);
// console.log(BASE_URL);

const CreateEmployee = ({ navigation }) => {
  const [name, setName] = useState(""); //1st parameter is the parameter to be changed by second parameter
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [picture, setPicture] = useState("");
  const [position, setPosition] = useState("");
  const [modal, setModal] = useState(false);
  // const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const submitData = () => {
    fetch(`${{BASE_URL}}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        salary,
        picture,
        position,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} is saved successfully`);
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("error saving");
      });
  };

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test/${data.uri.split(".")[1]}`,
        };
        handleUpload(newfile);
      }
    } else {
      Alert.alert("You need to give us permission to work");
    }
  };
  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test/${data.uri.split(".")[1]}`,
        };
        handleUpload(newfile);
      }
    } else {
      Alert.alert("You need to give us permission to work");
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("folder", "newEmployeeApp");
    data.append("upload_preset", "newEmployeeApp");
    data.append("cloud_name", "doqlk4ocr");

    fetch("http://api.cloudinary.com/v1_1/doqlk4ocr/image/upload/", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPicture(data.url);
        setModal(false);
      })
      .catch((err) => {
        Alert.alert("error while image is uploading");
      });
  };

  return (
    <View style={styles.root}>
      <TextInput
        label="Name"
        style={styles.inputStyle}
        value={name}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="Email"
        style={styles.inputStyle}
        value={email}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="phone"
        keyboardType="numeric"
        style={styles.inputStyle}
        value={phone}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        label="salary"
        keyboardType="numeric"
        style={styles.inputStyle}
        value={salary}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setSalary(text)}
      />
      <TextInput
        label="position"
        style={styles.inputStyle}
        value={position}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setPosition(text)}
      />
      <Button
        icon={picture == "" ? "upload" : "check"}
        theme={theme}
        mode="contained"
        onPress={() => setModal(true)}
      >
        Upload Image
      </Button>
      <Button
        style={styles.inputStyle}
        icon="content-save"
        theme={theme}
        mode="contained"
        onPress={() => submitData()}
      >
        save
      </Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button
              style={styles.inputStyle}
              icon="camera"
              mode="contained"
              theme={theme}
              onPress={() => pickFromCamera()}
            >
              Camera
            </Button>
            <Button
              style={styles.inputStyle}
              icon="image-area"
              theme={theme}
              mode="contained"
              onPress={() => pickFromGallery()}
            >
              Gallery
            </Button>
          </View>
          <Button onPress={() => setModal(false)}>Cancel</Button>
        </View>
      </Modal>
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
  inputStyle: {
    margin: 5,
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white",
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
export default CreateEmployee;
