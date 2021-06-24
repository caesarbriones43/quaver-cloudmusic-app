import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Header,
  Icon,
  Avatar,
  Divider,
  Input,
  Button,
} from "react-native-elements";
import axios from "axios";
import { quaverApi } from "../../../api/quaverApi";

const ManageArtistScreen = ({
  navigation,
  route: {
    params: { artists },
  },
}) => {
  const [state, setState] = useState(artists);
  const { artist, artistUrl, _id, genre } = artists;
  const { idGenre, nameGenre } = genre;

  console.log("genre", nameGenre);

  const updateArtistById = async (_id, state) => {
    await axios({
      method: "put",
      url: `http://192.168.1.80:5000/api/v1/artists/${_id}`,
      data: { ...state },
      config: { headers: { "Content-Type": "application/json" } },
    })
      .then((response) => {
        console.log(response.data.data);
        setState(response.data.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const deleteArtist = async (_id) => {
    const resp = await quaverApi.delete(`/artists/${_id}`);
    setState(resp.data.data);
    console.log(`Deleting artist whit id:${_id}`);
  };

  return (
    <View>
      <Header
        leftComponent={
          <Icon name="arrow-back-outline" type="ionicon" color="#fff" />
        }
        centerComponent={{
          text: `Manage: ${artists.artist}`,
          style: { color: "#fff" },
        }}
        containerStyle={{
          backgroundColor: "#000",
        }}
      />
      <View
        style={{
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          rounded
          size="xlarge"
          source={{
            uri: artistUrl,
          }}
        />
        <Text style={{ fontSize: 18 }}>{artist}</Text>
      </View>
      <Divider />
      <View>
        <Input
          style={{ color: "#808080" }}
          value={state?.artist}
          leftIcon={<Icon type="ionicon" name="disc" size={24} color="black" />}
          label="Artist Name"
          onChangeText={(artist) => setState({ ...state, artist: artist })}
        />
        <Input
          style={{ color: "#808080" }}
          value={state?.artistUrl}
          leftIcon={<Icon type="ionicon" name="disc" size={24} color="black" />}
          label="Artist Url"
          onChangeText={(artistUrl) =>
            setState({ ...state, artistUrl: artistUrl })
          }
        />
        <Input
          style={{ color: "#808080" }}
          value={state.genre?.nameGenre}
          leftIcon={<Icon type="ionicon" name="disc" size={24} color="black" />}
          label="nameGenre"
          onChangeText={(nameGenre) =>
            setState({
              ...state,
              genre: { ...state.genre, nameGenre: nameGenre },
            })
          }
        />
        <Input
          style={{ color: "#808080" }}
          value={state.genre?.idGenre}
          leftIcon={<Icon type="ionicon" name="key" size={24} color="black" />}
          label="idGenre"
          onChangeText={(idGenre) =>
            setState({ ...state, genre: { ...state.genre, idGenre: idGenre } })
          }
        />
      </View>
      <View style={{ padding: 25 }}>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => {
            updateArtistById(_id, state) &&
              navigation.navigate("HomeTabScreenAdmin");
          }}
        >
          <Text style={styles.appButton}>Edit</Text>
        </TouchableOpacity>
        <View style={styles.appButtonSpace}></View>
        <TouchableOpacity
          style={styles.appButtonContainerDelete}
          onPress={() => {
            deleteArtist(_id) && navigation.navigate("HomeTabScreenAdmin");
          }}
        >
          <Text style={styles.appButton}>Delete User</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  appButtonContainerDelete: {
    elevation: 8,
    backgroundColor: "#b20000",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButton: {
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

export default ManageArtistScreen;
