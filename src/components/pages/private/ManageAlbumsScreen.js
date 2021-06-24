import { List } from "native-base";
import React, { Fragment, useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { View, ScrollView } from "react-native";
import { Text, ListItem, Avatar, Icon, Header } from "react-native-elements";

import { quaverApi } from "../../../api/quaverApi";

const ManageAlbumsScreen = ({ navigation }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    quaverApi
      .get("/albums")
      .then((resp) => {
        setAlbums(resp.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(albums);

  return (
    <View>
      <Fragment>
        <ScrollView style={{ flexGrow: 1 }}>
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
              text: "Manage Albums",
              style: { color: "#fff" },
            }}
            containerStyle={{
              backgroundColor: "#000",
              justifyContent: "space-around",
            }}
          />
          <View style={{ flex: 1 }}>
            {albums.map((album) => (
              <ListItem
                key={album._id}
                bottomDivider
                // onPress={() => {
                //   console.log(album);
                // }}
                onPress={() => {
                  navigation.navigate("ManageAlbumScreen", {
                    albums: album,
                  });
                }}
              >
                <Avatar size="large" source={{ uri: album.albumUrl }} />
                <ListItem.Content>
                  <ListItem.Title>{album.album}</ListItem.Title>
                  <ListItem.Subtitle>
                    {album.artist.artistName}
                  </ListItem.Subtitle>
                  {/* <ListItem.Subtitle>
                    <Avatar rounded source={{ uri: album.artist.artistUrl }} />
                    {album.artist.artistName}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    <Avatar rounded source={{ uri: album.genre.genreUrl }} />
                    {album.genre.nameGenre}
                  </ListItem.Subtitle> */}
                </ListItem.Content>
                <Icon name="chevron-forward-outline" type="ionicon" />
              </ListItem>
            ))}
          </View>
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              style={styles.appButtonContainerCreate}
              onPress={() => {
                navigation.navigate("CreateAlbumScreen");
              }}
            >
              <Text style={styles.appButtonEdit}>CREATE ALBUM</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Fragment>
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

export default ManageAlbumsScreen;
