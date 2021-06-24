import React, { useEffect } from "react";
import { Button, PermissionsAndroid, View, Text } from "react-native";
import GoogleCloudSpeechToText, {
  SpeechRecognizeEvent,
  VoiceStartEvent,
  SpeechErrorEvent,
  VoiceEvent,
  SpeechStartEvent,
} from "react-native-google-cloud-speech-to-text";
import { FAB, Icon } from "react-native-elements";
import * as Speech from "expo-speech";
import SpeechToText from "react-native-google-speech-to-text";
import { Pressable } from "react-native";

const Separator = () => <View style={styles.separator} />;

const FabComponent = () => {
  const [transcript, setResult] = React.useState("");

  useEffect(() => {
    // GoogleCloudSpeechToText.setApiKey('key_____');
    GoogleCloudSpeechToText.onVoice(onVoice);
    GoogleCloudSpeechToText.onVoiceStart(onVoiceStart);
    GoogleCloudSpeechToText.onVoiceEnd(onVoiceEnd);
    GoogleCloudSpeechToText.onSpeechError(onSpeechError);
    GoogleCloudSpeechToText.onSpeechRecognized(onSpeechRecognized);
    GoogleCloudSpeechToText.onSpeechRecognizing(onSpeechRecognizing);
    return () => {
      GoogleCloudSpeechToText.removeListeners();
    };
  }, []);

  const onSpeechError = (_error) => {
    console.log("onSpeechError: ", _error);
  };

  const onSpeechRecognized = (result) => {
    console.log("onSpeechRecognized: ", result);
    setResult(result.transcript);
  };

  const onSpeechRecognizing = (result) => {
    console.log("onSpeechRecognizing: ", result);
    setResult(result.transcript);
  };

  const onVoiceStart = (_event) => {
    console.log("onVoiceStart", _event);
  };

  const onVoice = (_event) => {
    console.log("onVoice", _event);
  };

  const onVoiceEnd = () => {
    console.log("onVoiceEnd: ");
  };

  const startRecognizing = async () => {
    const result = await GoogleCloudSpeechToText.start({
      speechToFile: true,
    });
    console.log("startRecognizing", result);
  };

  const stopRecognizing = async () => {
    await GoogleCloudSpeechToText.stop();
  };

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
      title: "Quaver Permission",
      message:
        "Quaver App needs access to your microphone " +
        "so you can search good music.",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    });
  }, []);

  const speak = () => {
    const artist = "Timbiriche";
    const voiceText = "Tu y yo somos uno mismo";
    const voiceQuerySuccess = `Reproduciendo ${voiceText} de ${artist}`;
    const voiceQueryError = "Cancion no encontrada, intenta de nuevo";
    Speech.speak(voiceQuerySuccess);
    // Speech.speak(voiceQueryError);
  };

  return (
    <View>
      <Icon
        raised
        name="microphone"
        type="font-awesome"
        size={15}
        onPress={speak}
      />
      {/* <Button title="Start me" onPress={startRecognizing} />
      <Button title="Stop me" color="#f194ff" onPress={stopRecognizing} /> */}
      {/* <Text>Im searching for ...{transcript}</Text> */}
    </View>
  );
};

export default FabComponent;
