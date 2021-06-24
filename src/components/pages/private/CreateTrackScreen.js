import React, { Fragment, useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import {
  Text,
  ListItem,
  Avatar,
  Icon,
  Header,
  Divider,
  Input,
  Button,
} from "react-native-elements";

import DropDownPicker from "react-native-dropdown-picker";

import axios from "axios";
const CreateTrackScreen = ({ navigation, route }) => {
  const [state, setState] = useState({
    rating: 4,
    track: "",
    trackUrl: "",
    album: {
      idAlbum: "",
      nameAlbum: " ",
    },
    genre: {
      idGenre: "",
      nameGenre: "",
    },
    artist: {
      artistName: "",
      artistId: "",
    },
  });

  const { track, trackUrl, album, genre, artist } = state;
  const { idAlbum, nameAlbum } = album;
  const { idGenre, nameGenre } = genre;
  const { artistId, artistName } = artist;

  const createTrack = async (state) => {
    await axios({
      method: "post",
      url: `http://192.168.1.80:5000/api/v1/tracks/`,
      data: { ...state },
      config: { headers: { "Content-Type": "application/json" } },
    })
      .then((response) => {
        setState(response.data.data);
        console.log("CREATED");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <ScrollView>
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
            text: "Create Track",
            style: { color: "#fff" },
          }}
          containerStyle={{
            backgroundColor: "#000",
          }}
        />
        <View>
          <Input
            style={{ color: "#808080" }}
            value={track}
            leftIcon={
              <Icon type="ionicon" name="person" size={24} color="black" />
            }
            label="Track"
            onChangeText={(track) => setState({ ...state, track: track })}
          />
          <Input
            style={{ color: "#808080" }}
            value={trackUrl}
            leftIcon={
              <Icon type="ionicon" name="person" size={24} color="black" />
            }
            label="Track URL"
            onChangeText={(trackUrl) =>
              setState({ ...state, trackUrl: trackUrl })
            }
          />
          <Input
            style={{ color: "#808080" }}
            value={nameAlbum}
            leftIcon={
              <Icon type="ionicon" name="person" size={24} color="black" />
            }
            label="Album Name"
            onChangeText={(nameAlbum) =>
              setState({
                ...state,
                album: { ...state.album, nameAlbum: nameAlbum },
              })
            }
          />
          <Input
            style={{ color: "#808080" }}
            value={idAlbum}
            leftIcon={
              <Icon type="ionicon" name="person" size={24} color="black" />
            }
            label="Album id"
            onChangeText={(idAlbum) =>
              setState({
                ...state,
                album: { ...state.album, idAlbum: idAlbum },
              })
            }
          />
          <Input
            style={{ color: "#808080" }}
            value={idGenre}
            leftIcon={
              <Icon type="ionicon" name="person" size={24} color="black" />
            }
            label="idGenre"
            onChangeText={(idGenre) =>
              setState({
                ...state,
                genre: { ...state.genre, idGenre: idGenre },
              })
            }
          />
          <Input
            style={{ color: "#808080" }}
            value={nameGenre}
            leftIcon={
              <Icon type="ionicon" name="person" size={24} color="black" />
            }
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
            value={artistId}
            leftIcon={
              <Icon type="ionicon" name="person" size={24} color="black" />
            }
            label="artistId"
            onChangeText={(artistId) =>
              setState({
                ...state,
                artist: { ...state.artist, artistId: artistId },
              })
            }
          />
          <Input
            style={{ color: "#808080" }}
            value={artistName}
            leftIcon={
              <Icon type="ionicon" name="person" size={24} color="black" />
            }
            label="artistName"
            onChangeText={(artistName) =>
              setState({
                ...state,
                artist: { ...state.artist, artistName: artistName },
              })
            }
          />
        </View>
        {/* <View style={{ padding: 50 }}>
          <Button
            title="CREATE TRACK"
            onPress={() => {
              createTrack(state) && navigation.navigate("HomeTabScreenAdmin");
            }}
          />
        </View> */}
        <View style={{ padding: 30 }}>
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
    </ScrollView>
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
    backgroundColor: "#000",
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

export default CreateTrackScreen;
