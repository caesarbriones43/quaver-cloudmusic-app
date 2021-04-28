import React, { useState, useEffect, Fragment } from "react";
import { View, ScrollView } from "react-native";
import { Text, ListItem, Avatar, Icon, Header } from "react-native-elements";

import { quaverApi } from "../../../api/quaverApi";

const ManageGenresScreen = ({ navigation }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    quaverApi
      .get("/genres")
      .then((resp) => {
        setGenres(resp.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(genres);

  return (
    <Fragment>
      <ScrollView style={{ flexGrow: 1 }}>
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
              text: "Manage Genres",
              style: { color: "#fff" },
            }}
          />
          <View style={{ flex: 1 }}>
            {genres.map((genre) => (
              <ListItem
                key={genre._id}
                bottomDivider
                onPress={() => {
                  navigation.navigate("ManageGenreScreen", { genres: genre });
                }}
              >
                <Avatar rounded source={{ uri: genre.genreUrl }} />
                <ListItem.Content>
                  <ListItem.Title>{genre.genre}</ListItem.Title>
                </ListItem.Content>
                <Icon name="chevron-forward-outline" type="ionicon" />
              </ListItem>
            ))}
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
};

export default ManageGenresScreen;
