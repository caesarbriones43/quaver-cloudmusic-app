import React, { Fragment, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import ImagesSwiper from "react-native-image-swiper";

import { Card, ListItem, Avatar, Icon } from "react-native-elements";
import { quaverApi } from "../../../api/quaverApi";

const HomeScreen = () => {
  const customImg = [
    "https://res.cloudinary.com/dslc2vjcz/image/upload/v1618804634/3838310_d8mkdf.png",
    "https://res.cloudinary.com/dslc2vjcz/image/upload/v1618805795/Albums/rock/jose_madero/banner_jose_xg4ufc.png",
    "https://res.cloudinary.com/dslc2vjcz/image/upload/v1620088199/banner_zw29xy.jpg",
  ];
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);

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

  useEffect(() => {
    quaverApi
      .get("/artists")
      .then((resp) => {
        setArtists(resp.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const playTrack = (_id) => {
    quaverApi
      // .get("/tracks")
      // .get("/tracks/608a3645b2ca1e1ac8e0171e")
      .get(`/tracks/${_id}`)
      .then((resp) => {
        // setAlbums(resp.data.data);
        console.log(`Playing ... ${_id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView>
      <View>
        <ImagesSwiper
          images={customImg}
          showsPagination={true}
          autoplay={true}
          autoplayTimeout={3}
          showsPagination={true}
          width={null}
          height={200}
        />
      </View>
      <View>
        <Text
          style={{
            paddingLeft: 10,
            fontSize: 16,
            fontWeight: "bold",
            padding: 15,
          }}
        >
          Discover Albums ...
        </Text>
      </View>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View>
            <View style={{ flexDirection: "row" }}>
              {albums.map((album) => (
                <ListItem
                  key={album._id}
                  style={{ padding: 5 }}
                  bottomDivider
                  // onPress={() => {
                  //   navigation.navigate("ManageArtistScreen", {
                  //     albums: album,
                  //   });
                  // }}
                >
                  <Avatar size="xlarge" source={{ uri: album.albumUrl }} />
                  <ListItem.Content>
                    <ListItem.Subtitle>
                      <Text
                        style={{
                          paddingLeft: 10,
                          fontSize: 16,
                          fontWeight: "bold",
                          paddingTop: 30,
                        }}
                      >
                        {album.album}
                      </Text>
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>
                      {album.artist.artistName}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <Icon name="chevron-forward-outline" type="ionicon" />
                </ListItem>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <View>
        <Text
          style={{
            paddingLeft: 10,
            fontSize: 16,
            fontWeight: "bold",
            padding: 15,
          }}
        >
          Discover Artists ...
        </Text>
      </View>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View>
            <View style={{ flexDirection: "row" }}>
              {artists.map((artist) => (
                <ListItem
                  key={artist._id}
                  bottomDivider
                  style={{ padding: 5 }}
                  // onPress={() => {
                  //   navigation.navigate("ManageArtistScreen", {
                  //     albums: album,
                  //   });
                  // }}
                >
                  <Avatar
                    rounded
                    size="large"
                    source={{ uri: artist.artistUrl }}
                  />
                  <ListItem.Content>
                    <ListItem.Subtitle>
                      <Text style={{ fontWeight: "bold" }}>
                        {artist.artist}
                      </Text>
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>
                      {artist.genre.nameGenre}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <Icon name="chevron-forward-outline" type="ionicon" />
                </ListItem>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <View>
        <Text
          style={{
            paddingLeft: 10,
            fontSize: 16,
            fontWeight: "bold",
            padding: 15,
          }}
        >
          Discover Songs ...
        </Text>
      </View>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View>
            <View style={{ flexDirection: "row" }}>
              {tracks.map((track) => (
                <ListItem
                  key={track._id}
                  bottomDivider
                  style={{ padding: 5 }}
                  // onPress={() => {
                  //   navigation.navigate("ManageArtistScreen", {
                  //     albums: album,
                  //   });
                  // }}
                >
                  <Avatar
                    rounded
                    size="large"
                    source={{ uri: track.album.albumUrl }}
                  />
                  <ListItem.Content>
                    <ListItem.Subtitle>
                      <Text style={{ fontWeight: "bold" }}>{track.track}</Text>
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>
                      {track.artist.artistName}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <Icon
                    name="play"
                    type="ionicon"
                    onPress={() => {
                      playTrack(track._id);
                    }}
                  />
                </ListItem>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
