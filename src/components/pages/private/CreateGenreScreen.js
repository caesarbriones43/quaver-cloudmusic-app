import React, { Fragment, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  Text,
  ListItem,
  Avatar,
  Icon,
  Header,
  Divider,
  Input,
} from "react-native-elements";

import axios from "axios";

const CreateGenreScreen = ({ navigation }) => {
  const [state, setState] = useState({
    genre: "",
    genreUrl: "",
  });
  const { genre, genreUrl } = state;

  const createUser = async (state) => {
    await axios({
      method: "post",
      url: `http://192.168.1.80:5000/api/v1/genres/`,
      data: { ...state },
      config: { headers: { "Content-Type": "application/json" } },
    })
      .then((response) => {
        console.log(response.data.data);
        // setState(response.data.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <Fragment>
      <View>
        <Header
          leftComponent={
            <Icon
              name="arrow-back-outline"
              type="ionicon"
              color="#fff"
              // onPress={() => goBack()}
            />
          }
          centerComponent={{
            text: "Create Genre",
            style: { color: "#fff" },
          }}
        />
      </View>
      <View
        style={{
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Input
          style={{ color: "#808080" }}
          value={genre}
          leftIcon={<Icon type="ionicon" name="book" size={24} color="black" />}
          label="Genre Name"
          onChangeText={(genre) => setState({ ...state, genre: genre })}
        />
        <Input
          style={{ color: "#808080" }}
          value={genreUrl}
          leftIcon={
            <Icon type="ionicon" name="image" size={24} color="black" />
          }
          label="Genre Photo"
          onChangeText={(genreUrl) =>
            setState({ ...state, genreUrl: genreUrl })
          }
        />
        <View>
          <TouchableOpacity
            style={styles.appButtonContainerCreate}
            onPress={() => {
              // ;
              createUser(state) && navigation.navigate("HomeTabScreenAdmin");
            }}
          >
            <Text style={styles.appButtonEdit}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonContainerCreate: {
    backgroundColor: "#001900",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonEdit: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  appButtonSpace: {
    padding: 5,
  },
});

export default CreateGenreScreen;
