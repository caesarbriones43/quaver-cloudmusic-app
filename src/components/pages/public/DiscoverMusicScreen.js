import { Fab } from "native-base";
import React, { Fragment, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, ListItem, Avatar, Icon, Header } from "react-native-elements";

import { quaverApi } from "../../../api/quaverApi";
import FabComponent from "./FabComponent";

const DiscoverMusicScreen = ({ navigation }) => {
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
              text: "Discover Music",
              style: { color: "#fff" },
            }}
            rightComponent={<FabComponent />}
            containerStyle={{
              backgroundColor: "#000",
            }}
          />
          <View style={{ flex: 1 }}>
            {tracks.map((track) => (
              <ListItem key={track._id} bottomDivider>
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
                <Icon
                  name="play"
                  type="ionicon"
                  onPress={() => {
                    navigation.navigate("Play", { track: track });
                  }}
                />
              </ListItem>
            ))}
          </View>
        </ScrollView>
      </Fragment>
    </View>
  );
};

export default DiscoverMusicScreen;
