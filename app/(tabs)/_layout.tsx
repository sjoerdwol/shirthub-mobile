import TabBarIcon from "@/components/ui/tabBarIcon";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#606C38',
      tabBarInactiveTintColor: 'rgb(108,88,76 / 0.4)',
      tabBarShowLabel: true,
      tabBarStyle: {
        backgroundColor: 'rgb(240,234,210 / 0.5)',
        borderColor: 'rgb(108,88,76 / 0.35)',
        height: 90,
        paddingBottom: 24,
        paddingTop: 8
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Startseite",
          tabBarIcon: ({ color, size }) => <TabBarIcon name='home' color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "Sammlung",
          tabBarIcon: ({ color, size }) => <TabBarIcon name='shirt' color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistiken",
          tabBarIcon: ({ color, size }) => <TabBarIcon name='stats-chart' color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => <TabBarIcon name='person' color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
