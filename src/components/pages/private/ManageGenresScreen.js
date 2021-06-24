import React, { useState, useEffect, Fragment } from "react";
import { TouchableOpacity } from "react-native";
import { View, ScrollView, StyleSheet } from "react-native";
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
            containerStyle={{
              backgroundColor: "#000",
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
        <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop:20}}>
          <TouchableOpacity
            style={styles.appButtonContainerCreate}
            onPress={() => {
              navigation.navigate("CreateGenreScreen");
            }}
          >
            <Text style={styles.appButtonEdit}>Create genre</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Fragment>
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

export default ManageGenresScreen;
