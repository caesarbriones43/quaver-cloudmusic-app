import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
} from "react-native";

import { Dimensions } from "react-native";

import { Video, AVPlaybackStatus } from "expo-av";

import {
  Badge,
  Avatar,
  Slider,
  Rating,
  AirbnbRating,
} from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";

const PlayingScreen = ({ navigation, route }) => {
  const [track, setTrack] = React.useState({
    track: "Caballeros Britanicos",
    trackUrl:
      "https://res.cloudinary.com/dslc2vjcz/video/upload/v1619660219/Albums/rock/jose_madero/Alba/caballeros_britanicos_xcavhv.mp4",
    active: true,
    rating: 4,
    album: {
      idAlbum: "608a1ed8b2ca1e1ac8e0170f",
      nameAlbum: "Alba",
      albumUrl:
        "https://res.cloudinary.com/dslc2vjcz/image/upload/v1619660228/Albums/rock/jose_madero/Alba/alba_phxayq.jpg",
    },
    artist: {
      artistName: "José Madero Vizcaíno",
      artistUrl:
        "https://res.cloudinary.com/dslc2vjcz/image/upload/v1618439733/Artists/classical/jose_madero_jhe68w.jpg",
    },
  });
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [icon, setIcon] = React.useState("play");
  const [song, setSong] = React.useState({});

  const msToTime = (duration) => {
    let milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  };
  React.useEffect(() => {
    if (route?.params !== undefined) {
      console.log("props llegadas", route?.params.track);
      setTrack(route?.params.track);
    } else {
      console.log("props por defecto");
    }
  }, [route?.params]);

  console.log("Playing screen", route?.params);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        source={{
          // uri: route.params.track.trackUrl,
          uri: track.trackUrl,
        }}
        useNativeControls
        resizeMode="contain"
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.authBox}>
        <View style={styles.imageBox}>
          <Image
            style={{
              width: 275,
              height: 275,
              borderRadius: 1000,
              borderWidth: 1,
              // borderColor: "black",
            }}
            source={{
              // uri: route.params.track.artist.artistUrl,
              uri: track.artist.artistUrl,
            }}
          />
          <Image
            style={{
              position: "absolute",
              width: 75,
              height: 75,
              borderRadius: 1000,
              // opacity: 0.2,
              left: 200,
              right: 0,
              top: 0,
              borderWidth: 1,
              // borderColor: "black",
            }}
            source={{
              // uri: route.params.track.artist.artistUrl,
              uri: track.album.albumUrl,
            }}
          />
        </View>
        <View>
          <AirbnbRating
            count={5}
            reviews={["Bad", "OK", "Good", "Very Good", "Amazing"]}
            defaultRating={track.rating}
            size={20}
            readonly={true}
          />
        </View>

        <Text style={styles.titleTrack}>{track.track}</Text>
        <Text style={styles.titleAlbum}>{track.album.nameAlbum}</Text>
        <Text style={styles.artists}>{track.artist.artistName}</Text>
        <Slider
          thumbStyle={{
            height: 10,
            width: 10,
            backgroundColor: "transparent",
          }}
          value={status.positionMillis}
          maximumValue={status.durationMillis}
          disabled={true}
        />
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              color: "#000",
            }}
          >
            {msToTime(status.positionMillis)}/{msToTime(status.durationMillis)}
          </Text>
        </View>

        <View style={styles.buttonsControl}>
          <View style={styles.spaceBetweenButtons}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 75,
                height: 75,
              }}
            >
              <Ionicons name={"play-back"} size={40} color="#000000" />
            </TouchableOpacity>
          </View>
          <View style={styles.spaceBetweenButtons}>
            <TouchableOpacity
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync() && setIcon("play")
                  : video.current.playAsync() && setIcon("pause")
              }
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 75,
                height: 75,
                backgroundColor: "#ffffff",
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <Ionicons name={icon} size={40} color="#000000" />
            </TouchableOpacity>
          </View>
          <View style={styles.spaceBetweenButtons}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 75,
                height: 75,
              }}
              onPress={() => {
                console.log(status.durationMillis);
              }}
            >
              <Ionicons name={"play-forward"} size={40} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#f4f9f9",
  },
  bigCircle: {
    width: Dimensions.get("window").height * 0.7,
    height: Dimensions.get("window").height * 0.7,
    backgroundColor: "#FBBEDF",
    borderRadius: 1000,
    position: "absolute",
    right: Dimensions.get("window").width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get("window").height,
    height: Dimensions.get("window").height,
    backgroundColor: "#a37eba",
    borderRadius: 1000,
    position: "absolute",
    bottom: Dimensions.get("window").width,
    right: Dimensions.get("window").width * 0.5,
    left: -25,
  },
  authBox: {
    width: "100%",
    // backgroundColor: "#f1d1d0",
    alignSelf: "center",
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageBox: {
    marginTop: 50,
    borderRadius: 1000,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 25,
  },
  titleTrack: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 35,
    textAlign: "center",
    color: "#000",
  },
  titleAlbum: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
  },
  artists: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 35,
    textAlign: "center",
    color: "#000",
  },
  buttonsControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  spaceBetweenButtons: {
    padding: 25,
  },
});

export default PlayingScreen;
