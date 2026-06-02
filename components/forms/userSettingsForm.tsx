import PrimaryButton from "@/components/buttons/primaryButton";
import CustomToggle from "@/components/inputs/customToggle";
import SingleIconInputWithLabel from "@/components/inputs/singleIconInputWithLabel";
import { useState } from "react";
import { View } from "react-native";
import { useForm } from "@tanstack/react-form";
import { useAuth } from "@/contexts/authContext";
import { handleProfileUpdate } from "@/utils/handleProfileOperations";
import { useProfileStore } from "@/stores/profileStore";
import { router } from "expo-router";

export default function UserSettingsForm({ profile }: { profile: Profile }) {
  const { session } = useAuth();
  const { updateProfile } = useProfileStore(state => state);
  const [loading, setLoading] = useState(false);

  const settingsForm = useForm({
    defaultValues: {
      username: profile.username,
      is_public: profile.is_public
    },
    onSubmit: async ({ value }) => {
      if (!session) return; // TODO: Guard clause instead of early return
      if (profile.username === value.username && profile.is_public === value.is_public) return; // TODO: Guard clause instead of early return
      setLoading(true);
      try {
        const updatedProfile: Partial<Profile> = {
          username: value.username,
          is_public: value.is_public,
        }
        await handleProfileUpdate(session, updateProfile, updatedProfile);
        router.back();
      } finally {
        setLoading(false);
      }
    }
  })

  return (
    <View className="px-2">
      <View className="flex-row">
        <settingsForm.Field
          name='username'
          validators={{ onChange: ({ value }) => !value ? 'A username is required!' : undefined }}
        >
          {(field) => (
            <SingleIconInputWithLabel
              errorMessage={field.state.meta.errors.join(', ')}
              firstIcon='person-outline'
              isValid={field.state.meta.isValid}
              keyboardType='default'
              label='Benutzername'
              onChangeText={field.handleChange}
              placeholder='Benutzername'
              value={field.state.value}
            />
          )}
        </settingsForm.Field>
      </View>
      <View className="mt-6">
        <settingsForm.Field name='is_public'>
          {(field) => (
            <CustomToggle
              description='Andere Nutzer können dein Profil und deine Sammlung sehen.'
              label='Profil öffentlich'
              onValueChange={field.handleChange}
              value={field.state.value}
            />
          )}
        </settingsForm.Field>
      </View>
      <View className="px-6 mt-6">
        <PrimaryButton
          loading={loading}
          onPress={settingsForm.handleSubmit}
          text='Speichern'
        />
      </View>
    </View>
  );
}
