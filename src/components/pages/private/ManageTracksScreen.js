import { List } from "native-base";
import React, { Fragment, useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import {
  Text,
  ListItem,
  Avatar,
  Icon,
  Header,
  Button,
} from "react-native-elements";

import { quaverApi } from "../../../api/quaverApi";

const ManageTracksScreen = ({ navigation }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    quaverApi
      .get("/tracks")
      .then((resp) => {
        setTracks(resp.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(tracks);

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
              text: "Manage Tracks",
              style: { color: "#fff" },
            }}
            containerStyle={{
              backgroundColor: "#000",
            }}
          />
          <View style={{ flex: 1 }}>
            {tracks.map((track) => (
              <ListItem
                key={track._id}
                bottomDivider
                onPress={() => {
                  navigation.navigate("ManageTrackScreen", { tracks: track });
                }}
              >
                <Avatar
                  rounded
                  size="large"
                  source={{ uri: track.album.albumUrl }}
                />
                <ListItem.Content>
                  <ListItem.Title>{`${track.track}`}</ListItem.Title>
                  <ListItem.Subtitle>
                    - {track.album.nameAlbum} -
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    <Avatar rounded source={{ uri: track.artist.artistUrl }} />
                    {track.artist.artistName}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    <Avatar rounded source={{ uri: track.genre.genreAvatar }} />
                    {track.genre.nameGenre}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <Icon name="chevron-forward-outline" type="ionicon" />
              </ListItem>
            ))}
          </View>
          {/* <View>
            <Button
              title="CREATE"
              onPress={() => {
                navigation.navigate("CreateTrackScreen");
              }}
            />
          </View> */}
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              style={styles.appButtonContainerCreate}
              onPress={() => {
                navigation.navigate("CreateTrackScreen");
              }}
            >
              <Text style={styles.appButtonEdit}>CREATE TRACK</Text>
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

export default ManageTracksScreen;
