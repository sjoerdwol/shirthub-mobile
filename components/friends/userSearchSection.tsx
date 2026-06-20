import SingleIconInput from "@/components/inputs/singleIconInput";
import UserSearchResultItem from "@/components/users/userSearchResultItem";
import { useAuth } from "@/contexts/authContext";
import { searchUsers } from "@/services/shirthub_user_profile";
import useDebouncedValue from "@/utils/useDebouncedValue";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function UserSearchSection({ onResultPress }: { onResultPress?: () => void }) {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const debouncedQuery = useDebouncedValue(query.trim());

  useEffect(() => {
    let active = true;

    const runSearch = async () => {
      if (!session || debouncedQuery.length === 0) {
        if (active) {
          setResults([]);
          setLoading(false);
        }
        return;
      }

      if (active) setLoading(true);

      try {
        const users = await searchUsers(session, debouncedQuery);
        if (active) setResults(users);
      } catch {
        if (active) setResults([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    runSearch();

    return () => { active = false; };
  }, [session, debouncedQuery]);

  return (
    <View className="flex-1">
      <SingleIconInput
        firstIcon='search'
        keyboardType='default'
        onChangeText={setQuery}
        placeholder="Nutzer suchen ..."
        value={query}
      />
      <View className="flex-1 mt-4">
        {
          loading
            ? <Text className="text-white/50 font-Lexend text-center mt-4">Suche ...</Text>
            : debouncedQuery.length > 0 && results.length === 0
              ? <Text className="text-white/50 font-Lexend text-center mt-4">Keine Nutzer gefunden</Text>
              : <FlatList
                contentContainerStyle={{ gap: 4 }}
                data={results}
                keyboardShouldPersistTaps="handled"
                keyExtractor={(item) => item.ownerId}
                renderItem={({ item }) => <UserSearchResultItem onResultPress={onResultPress} user={item} />}
              />
        }
      </View>
    </View>
  );
}
