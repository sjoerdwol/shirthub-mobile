import { useAuth } from "@/contexts/authContext";
import { useProfileStore } from "@/stores/profileStore";
import { handleAvatarRemove, handleAvatarUpload } from "@/utils/handleProfileOperations";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";
import AvatarPicker from "./avatarPicker";

export default function AvatarPickerContainer({ profile }: { profile: Profile }) {
  const { session } = useAuth();
  const { updateProfile } = useProfileStore(state => state);
  const [loading, setLoading] = useState(false);

  const pickFrom = async (source: 'camera' | 'library') => {
    if (!session) return;

    const permission = source === 'camera' ? await ImagePicker.requestCameraPermissionsAsync() : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Berechtigung erforderlich', 'Bitte erlaube den Zugriff in den Einstellungen, um ein Profilbild zu wählen.');
      return;
    }

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    };

    const result = source === 'camera' ? await ImagePicker.launchCameraAsync(options) : await ImagePicker.launchImageLibraryAsync(options);
    if (result.canceled) return;

    const base64 = result.assets[0]?.base64;
    if (!base64) return;

    try {
      setLoading(true);
      await handleAvatarUpload(session, updateProfile, base64);
    } catch (e) {
      Alert.alert('Fehler', 'Das Profilbild konnte nicht hochgeladen werden.');
    } finally {
      setLoading(false);
    }
  };

  const removeAvatar = async () => {
    if (!session) return;

    try {
      setLoading(true);
      await handleAvatarRemove(session, updateProfile);
    } catch {
      Alert.alert('Fehler', 'Das Profilbild konnte nicht entfernt werden.');
    } finally {
      setLoading(false);
    }
  };

  const showOptions = () => {
    const buttons: { text: string; style?: 'cancel' | 'destructive'; onPress?: () => void }[] = [];

    buttons.push({ text: 'Kamera', onPress: () => pickFrom('camera') });
    buttons.push({ text: 'Aus Galerie wählen', onPress: () => pickFrom('library') });
    if (profile.avatar_url) { buttons.push({ text: 'Bild entfernen', style: 'destructive', onPress: removeAvatar }); }
    buttons.push({ text: 'Abbrechen', style: 'cancel' });

    Alert.alert('Profilbild', 'Wähle eine Quelle für dein Profilbild.', buttons);
  };

  return (
    <AvatarPicker loading={loading} profile={profile} showOptions={showOptions} />
  )
}
