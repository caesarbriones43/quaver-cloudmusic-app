import React, { Fragment, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Button } from "react-native";
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

const CreateAlbumScreen = ({ navigation }) => {
  const initialState = {
    artist: {
      artistId: "",
      artistName: "",
    },
    genre: {
      idGenre: "",
      nameGenre: "",
    },
    album: "",
    albumUrl: "",
  };
  const [state, setState] = useState(initialState);
  const { album, albumUrl, genre, artist } = state;
  const { genreUrl, idGenre, nameGenre } = genre;
  const { artistUrl, artistId, artistName } = artist;

  const createAlbum = async (state) => {
    await axios({
      method: "post",
      url: `http://192.168.1.80:5000/api/v1/albums/`,
      data: { ...state },
      config: { headers: { "Content-Type": "application/json" } },
    })
      .then((response) => {
        console.log("CRATED!!!!", response.data.data);
        // setState(response.data.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
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
          text: "Create Album",
          style: { color: "#fff" },
        }}
      />
      <Input
        style={{ color: "#808080" }}
        value={album}
        leftIcon={<Icon type="ionicon" name="book" size={24} color="black" />}
        label="Album Name"
        onChangeText={(album) => setState({ ...state, album: album })}
      />
      <Input
        style={{ color: "#808080" }}
        value={albumUrl}
        leftIcon={<Icon type="ionicon" name="book" size={24} color="black" />}
        label="Album Name"
        onChangeText={(albumUrl) => setState({ ...state, albumUrl: albumUrl })}
      />
      <Input
        style={{ color: "#808080" }}
        value={nameGenre}
        leftIcon={<Icon type="ionicon" name="book" size={24} color="black" />}
        label="Genre Name"
        onChangeText={(nameGenre) =>
          setState({
            ...state,
            genre: { ...state.genre, nameGenre: nameGenre },
          })
        }
      />
      <Input
        style={{ color: "#808080" }}
        value={idGenre}
        leftIcon={<Icon type="ionicon" name="book" size={24} color="black" />}
        label="Id Genre"
        onChangeText={(idGenre) =>
          setState({
            ...state,
            genre: { ...state.genre, idGenre: idGenre },
          })
        }
      />
      <Input
        style={{ color: "#808080" }}
        value={artistName}
        leftIcon={
          <Icon type="ionicon" name="cloudy-outline" size={24} color="black" />
        }
        label="artistName"
        onChangeText={(artistName) =>
          setState({
            ...state,
            artist: { ...state.artist, artistName: artistName },
          })
        }
      />
      <Input
        style={{ color: "#808080" }}
        value={artistId}
        leftIcon={<Icon type="ionicon" name="key" size={24} color="black" />}
        label="artistId"
        onChangeText={(artistId) =>
          setState({
            ...state,
            artist: { ...state.artist, artistId: artistId },
          })
        }
      />
      {/* <Button
        title="Create user"
        onPress={() => {
          createAlbum(state) && navigation.navigate("HomeTabScreenAdmin");
        }}
      /> */}
      <View style={{ padding: 25 }}>
        <TouchableOpacity
          style={styles.appButtonContainerCreate}
          onPress={() => {
            createAlbum(state) && navigation.navigate("HomeTabScreenAdmin");
          }}
        >
          <Text style={styles.appButtonEdit}>Create</Text>
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

export default CreateAlbumScreen;
