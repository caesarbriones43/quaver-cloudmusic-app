import React, { Fragment, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, ListItem, Avatar, Icon, Header } from "react-native-elements";

import { quaverApi } from "../../../api/quaverApi";

const ManageArtistsScreen = ({ navigation }) => {
  const [artists, setArtists] = useState([]);

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

  console.log(artists);

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
              text: "Manage Artists",
              style: { color: "#fff" },
            }}
            containerStyle={{
              backgroundColor: "#000",
            }}
          />
          <View style={{ flex: 1 }}>
            {artists.map((artist) => (
              <ListItem
                key={artist._id}
                bottomDivider
                onPress={() => {
                  navigation.navigate("ManageArtistScreen", {
                    artists: artist,
                  });
                }}
              >
                <Avatar rounded source={{ uri: artist.artistUrl }} />
                <ListItem.Content>
                  <ListItem.Title>{artist.artist}</ListItem.Title>
                  <ListItem.Subtitle>
                    {artist.genre.nameGenre}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <Icon name="chevron-forward-outline" type="ionicon" />
              </ListItem>
            ))}
          </View>
          <View style={{ padding: 25 }}>
            <TouchableOpacity
              style={styles.appButtonContainerCreate}
              // onPress={() => {
              //   createUser(state) &&
              //     navigation.navigate("HomeTabScreenAdmin");
              // }}
              onPress={() => {
                navigation.navigate("CreateArtistScreen");
              }}
            >
              <Text style={styles.appButtonEdit}>Create Artist</Text>
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
  appButtonContainerCreate: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 10,
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

export default ManageArtistsScreen;
