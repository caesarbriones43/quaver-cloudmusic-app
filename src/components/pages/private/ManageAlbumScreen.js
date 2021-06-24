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

const ManageAlbumScreen = ({
  navigation,
  route: {
    params: { albums },
  },
}) => {
  const [state, setState] = useState(albums);
  const { album, albumUrl, artist, _id, genre } = albums;
  const { artistId, artistName } = artist;
  const { idGenre, nameGenre } = genre;

  const updateAlbumById = async (_id, state) => {
    await axios({
      method: "put",
      url: `http://192.168.1.80:5000/api/v1/albums/${_id}`,
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

  const deleteAlbumById = async (_id) => {
    const resp = await quaverApi.delete(`/albums/${_id}`);
    setState(resp.data.data);
    console.log(`Deleting album whit id:${_id}`);
  };

  return (
    <View>
      <ScrollView>
        <Header
          leftComponent={
            <Icon name="arrow-back-outline" type="ionicon" color="#fff" />
          }
          centerComponent={{
            text: `Manage: ${albums.album}`,
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
              uri: albumUrl,
            }}
          />
          <Text style={{ fontSize: 18, padding: 5 }}>{album}</Text>
          <Text style={{ fontSize: 15, padding: 5 }}>
            {state?.artist?.artistName}
          </Text>
        </View>
        <Divider />
        <View>
          <Input
            style={{ color: "#808080" }}
            value={album}
            leftIcon={
              <Icon type="ionicon" name="disc" size={24} color="black" />
            }
            label="Album Name"
            onChangeText={(album) => setState({ ...state, album: album })}
          />
          <Input
            style={{ color: "#808080" }}
            value={albumUrl}
            leftIcon={
              <Icon type="ionicon" name="disc" size={24} color="black" />
            }
            label="Album URL"
            onChangeText={(albumUrl) =>
              setState({ ...state, albumUrl: albumUrl })
            }
          />
          <Input
            style={{ color: "#808080" }}
            value={artistId}
            leftIcon={
              <Icon type="ionicon" name="disc" size={24} color="black" />
            }
            label="Artist Id"
            onChangeText={(artistId) =>
              setState({
                ...state,
                artist: { ...state?.artist, artistId: artistId },
              })
            }
          />
          <Input
            style={{ color: "#808080" }}
            value={artistName}
            leftIcon={
              <Icon type="ionicon" name="disc" size={24} color="black" />
            }
            label="artistName"
            onChangeText={(artistName) =>
              setState({
                ...state,
                artist: { ...state?.artist, artistName: artistName },
              })
            }
          />
          <Input
            style={{ color: "#808080" }}
            value={idGenre}
            leftIcon={
              <Icon type="ionicon" name="disc" size={24} color="black" />
            }
            label="Genre Id"
            onChangeText={(idGenre) =>
              setState({
                ...state,
                genre: { ...state?.genre, idGenre: idGenre },
              })
            }
          />
          <Input
            style={{ color: "#808080" }}
            value={nameGenre}
            leftIcon={
              <Icon type="ionicon" name="disc" size={24} color="black" />
            }
            label="Genre Id"
            onChangeText={(nameGenre) =>
              setState({
                ...state,
                genre: { ...state?.genre, nameGenre: nameGenre },
              })
            }
          />
        </View>
        {/* <View>
          <Button
            title="Test state"
            onPress={() => {
              updateAlbumById(_id, state) &&
                navigation.navigate("HomeTabScreenAdmin");
            }}
          />
        </View> */}
        <View style={{ padding: 25 }}>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => {
              updateAlbumById(_id, state) &&
                navigation.navigate("HomeTabScreenAdmin");
            }}
          >
            <Text style={styles.appButton}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.appButtonSpace}></View>
          <TouchableOpacity
            style={styles.appButtonContainerDelete}
            onPress={() => {
              deleteAlbumById(_id) && navigation.navigate("HomeTabScreenAdmin");
            }}
          >
            <Text style={styles.appButton}>Delete</Text>
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
  appButtonContainerCreate: {
    elevation: 8,
    backgroundColor: "#000",
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

export default ManageAlbumScreen;
