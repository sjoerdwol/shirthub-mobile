import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: 'rgb(255 255 255)',
      tabBarInactiveTintColor: 'rgb(255 255 255)',
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: '#151D28',
        borderColor: 'rgb(44, 58, 78)',
        borderTopWidth: 1,
        height: 90,
        paddingBottom: 10,
        paddingTop: 10
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Startseite",
          tabBarIcon: ({ color, focused, size }) => <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "Sammlung",
          tabBarIcon: ({ color, focused, size }) => <Ionicons name={focused ? 'shirt' : 'shirt-outline'} color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistiken",
          tabBarIcon: ({ color, focused, size }) => <Ionicons name={focused ? 'stats-chart' : 'stats-chart-outline'} color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, focused, size }) => <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
