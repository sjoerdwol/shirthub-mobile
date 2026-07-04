import FriendButton from "@/components/friends/friendButton";
import JumpRow from "@/components/profile/jumpRow";
import StatBox from "@/components/statistics/statBox";
import ShirtImage from "@/components/ui/shirtImage";
import { getAvatarSourceFromParts } from "@/utils/getAvatarSource";
import Ionicons from "@react-native-vector-icons/ionicons";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { router } from "expo-router";
import { Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function OtherUserProfileView({ profile }: { profile: PublicProfile }) {
  // Collection and statistics are only visible for public profiles or friends.
  const canView = profile.isPublic || profile.friendStatus === 'friends';

  return (
    <Animated.View
      className="flex-1 px-4"
      entering={FadeIn.duration(500)}
    >
      <View className="mt-14 items-center">
        <ShirtImage
          imageSrc={getAvatarSourceFromParts(profile.username, profile.avatarUrl)}
          type='profile'
        />
        <Text className="text-white/80 text-3xl font-LexendBold mb-0.5 mt-4">{profile.username}</Text>
        {canView && <Text className="text-white/70 text-base font-Lexend">Mitglied seit {new Date(profile.createdAt).getFullYear()}</Text>}
        <View className="w-full mt-6">
          <FriendButton
            avatarUrl={profile.avatarUrl}
            initialStatus={profile.friendStatus}
            ownerId={profile.ownerId}
            username={profile.username}
          />
        </View>
        {
          canView &&
          <>
            <View className="w-full flex-row gap-4 mt-6">
              <StatBox
                currencyVisible={false}
                icon={<MaterialIcons name="groups" size={16} color='rgb(141, 157, 180)' />}
                subtitle={`${profile.shirtCount} ${profile.shirtCount != 1 ? 'Trikots' : 'Trikot'}`}
                title='Versch. Vereine'
                value={profile.distinctTeamsCount ?? 0}
              />
              <StatBox
                currencyVisible
                icon={<MaterialIcons name="inventory-2" size={16} color='rgb(141, 157, 180)' />}
                subtitle={`${profile.shirtCount} ${profile.shirtCount != 1 ? 'Trikots' : 'Trikot'}`}
                title='Gesamtwert'
                value={profile.totalValue ?? 0}
              />
            </View>
            <View className="w-full gap-4 mt-4">
              <JumpRow
                icon={<Ionicons name="shirt-outline" size={20} color='rgb(141, 157, 180)' />}
                label='Trikotsammlung'
                onPress={() => router.navigate(`/users/${profile.ownerId}/collection`)}
                testID="jump_collection"
              />
              <JumpRow
                icon={<Ionicons name="stats-chart-outline" size={20} color='rgb(141, 157, 180)' />}
                label='Statistiken'
                onPress={() => router.navigate(`/users/${profile.ownerId}/statistics`)}
                testID="jump_statistics"
              />
            </View>
          </>
        }
      </View>
    </Animated.View>
  );
}
