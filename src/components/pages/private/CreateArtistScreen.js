import React, { Fragment, useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  Text,
  ListItem,
  Avatar,
  Icon,
  Header,
  Divider,
  Input,
} from "react-native-elements";

import DropDownPicker from "react-native-dropdown-picker";

import axios from "axios";

const CreateArtistScreen = ({ navigation, route }) => {
  const [state, setState] = useState({
    artist: "",
    artistUrl: "",
    genre: {
      idGenre: "",
      nameGenre: "",
    },
  });

  const { artist, artistUrl, genre } = state;
  const { nameGenre, idGenre } = genre;

  const [genres, setGenres] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Rock", value: "12389as8ads8asd" },
    { label: "Classical", value: "12389as8ads8asdasdasd" },
  ]);

  const createArtist = async (state) => {
    await axios({
      method: "post",
      url: `http://192.168.1.80:5000/api/v1/artists/`,
      data: { ...state },
      config: { headers: { "Content-Type": "application/json" } },
    })
      .then((response) => {
        // console.log(response.data.data);
        setState(response.data.data);
        console.log("CREATED");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  // useEffect(() => {
  //   genres.map((genre) => {
  //     setItems([...items, { label: genre.genre, value: genre.genre }]);
  //     console.log("Entrando", genre.genre);
  //   });
  // }, []);

  // console.log(items)

  useEffect(() => {
    axios({
      method: "get",
      url: `http://192.168.1.80:5000/api/v1/genres/`,
    })
      .then((response) => {
        setGenres(response.data.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  // const formatted = (genres) => {
  //   genres.map((genre) => {
  //     // setItems([...genre, { label: genre.genre, value: genre.genre }]);
  //     // console.log([...genre, { label: genre.genre, value: genre.genre }]);
  //     console.log(items);
  //   });
  // };

  // useEffect(() => {
  //   // genres.map((genre) => {
  //   //   // setItems([...items,{ label: genre.genre, value: genre.genre }]);
  //   //   setItems([{ genre: genre.genre }]);
  //   // });
  //   console.log("Ejecutando");
  // }, []);

  return (
    <Fragment>
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
            text: "Create Artist",
            style: { color: "#fff" },
          }}
          containerStyle={{
            backgroundColor: "#000",
          }}
        />
      </View>
      <View
        style={{
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Input
          style={{ color: "#808080" }}
          value={artist}
          leftIcon={
            <Icon type="ionicon" name="person" size={24} color="black" />
          }
          label="Artist"
          onChangeText={(artist) => setState({ ...state, artist: artist })}
        />
        <Input
          style={{ color: "#808080" }}
          value={artistUrl}
          leftIcon={
            <Icon type="ionicon" name="image" size={24} color="black" />
          }
          label="Artist Photo"
          onChangeText={(artistUrl) =>
            setState({ ...state, artistUrl: artistUrl })
          }
        />
        <Input
          style={{ color: "#808080" }}
          value={nameGenre}
          leftIcon={<Icon type="ionicon" name="disc" size={24} color="black" />}
          label="Genre"
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
          leftIcon={<Icon type="ionicon" name="key" size={24} color="black" />}
          label="idGenre"
          onChangeText={(idGenre) =>
            setState({ ...state, genre: { ...state.genre, idGenre: idGenre } })
          }
        />
        <View>
          <Text style={{ fontSize: 17, color: "#808080", fontWeight: "bold" }}>
            Genre
          </Text>
        </View>
        <View>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
      </View>
      <View style={{ paddingLeft: 40, paddingRight: 40 }}>
        <TouchableOpacity
          style={styles.appButtonContainerCreate}
          onPress={() => {
            createArtist(state) && navigation.navigate("HomeTabScreenAdmin");
            // console.log(items);
            // console.log(state);
          }}
        >
          <Text style={styles.appButtonEdit}>CREATE ARTIST</Text>
        </TouchableOpacity>
      </View>
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

export default CreateArtistScreen;
