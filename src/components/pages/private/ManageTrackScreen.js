import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
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

const ManageTrackScreen = ({
  navigation,
  route: {
    params: { tracks },
  },
}) => {
  const [state, setState] = useState(tracks);
  const { artist, album, track, trackUrl, genre, _id } = tracks;
  const { nameAlbum, idAlbum } = album;
  const { artistName, artistId } = artist;
  const { nameGenre, idGenre } = genre;

  const updateTrackById = async (_id, state) => {
    await axios({
      method: "put",
      url: `http://192.168.1.80:5000/api/v1/tracks/${_id}`,
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

  const deleteTrackById = async (_id) => {
    const resp = await quaverApi.delete(`/tracks/${_id}`);
    setState(resp.data.data);
    console.log(`Deleting track whit id:${_id}`);
  };

  return (
    <View>
      <ScrollView>
        <Header
          leftComponent={
            <Icon name="arrow-back-outline" type="ionicon" color="#fff" />
          }
          centerComponent={{
            text: `Manage: ${tracks.track}`,
            style: { color: "#fff" },
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
              uri: album?.albumUrl,
            }}
          />
          <Text style={{ fontSize: 18, paddingTop: 5, fontWeight: "bold" }}>
            {tracks.track}
          </Text>
          <Text style={{ fontSize: 15, paddingTop: 5 }}>{nameAlbum}</Text>
          <Text style={{ fontSize: 15, paddingTop: 5 }}>{artistName}</Text>
        </View>
        <Divider />
        <View>
          <Input
            style={{ color: "#808080" }}
            value={track}
            leftIcon={
              <Icon type="ionicon" name="disc" size={24} color="black" />
            }
            label="Track Name"
            onChangeText={(track) => setState({ ...state, track: track })}
          />
          <Input
            style={{ color: "#808080" }}
            value={trackUrl}
            leftIcon={
              <Icon type="ionicon" name="disc" size={24} color="black" />
            }
            label="Track Url"
            onChangeText={(trackUrl) =>
              setState({ ...state, trackUrl: trackUrl })
            }
          />
          <Input
            disabled={true}
            style={{ color: "#808080" }}
            value={state.album?.idAlbum}
            leftIcon={
              <Icon type="ionicon" name="disc" size={24} color="black" />
            }
            label="Album ID"
            onChangeText={(idAlbum) =>
              setState({
                ...state,
                album: { ...state?.album, idAlbum: idAlbum },
              })
            }
          />
          <Input
            style={{ color: "#808080" }}
            value={state.album?.nameAlbum}
            leftIcon={
              <Icon type="ionicon" name="disc" size={24} color="black" />
            }
            label="Name Album"
            onChangeText={(nameAlbum) =>
              setState({
                ...state,
                album: { ...state?.album, nameAlbum: nameAlbum },
              })
            }
          />
          <Input
            style={{ color: "#808080" }}
            value={state.genre?.nameGenre}
            leftIcon={
              <Icon type="ionicon" name="disc" size={24} color="black" />
            }
            label="Name Genre"
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
            leftIcon={
              <Icon type="ionicon" name="disc" size={24} color="black" />
            }
            label="Id Gnere"
            onChangeText={(idGenre) =>
              setState({
                ...state,
                genre: { ...state.genre, idGenre: idGenre },
              })
            }
          />
          <Input
            style={{ color: "#808080" }}
            value={state.artist?.artistName}
            leftIcon={
              <Icon type="ionicon" name="disc" size={24} color="black" />
            }
            label="Name Artist"
            onChangeText={(artistName) =>
              setState({
                ...state,
                artist: { ...state.artist, artistName: artistName },
              })
            }
          />
          <Input
            style={{ color: "#808080" }}
            value={state.artist?.artistId}
            leftIcon={
              <Icon type="ionicon" name="disc" size={24} color="black" />
            }
            label="artistId"
            onChangeText={(artistId) =>
              setState({
                ...state,
                artist: { ...state.artist, artistId: artistId },
              })
            }
          />
        </View>
        <View style={{ padding: 25 }}>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => {
              updateTrackById(_id, state) &&
                navigation.navigate("HomeTabScreenAdmin");
            }}
          >
            <Text style={styles.appButtonEdit}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.appButtonSpace}></View>
          <TouchableOpacity
            style={styles.appButtonContainerDelete}
            onPress={() => {
              deleteTrackById(_id) && navigation.navigate("HomeTabScreenAdmin");
            }}
          >
            <Text style={styles.appButtonEdit}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

export default ManageTrackScreen;
