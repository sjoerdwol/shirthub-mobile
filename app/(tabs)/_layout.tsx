import TabBarIcon from "@/components/ui/tabBarIcon";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: {
        backgroundColor: '#23272e',
      },
      headerTitleStyle: {
        color: '#e0e5eb',
      },
      tabBarActiveTintColor: '#006dff',
      tabBarInactiveTintColor: '#94b5e1',
      tabBarItemStyle: {
        marginTop: 5
      },
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: '#23272e',
        borderColor: '#23272e',
        height: 80,
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <TabBarIcon name='home' color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "Collection",
          tabBarIcon: ({ color, size }) => <TabBarIcon name='shirt' color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistics",
          tabBarIcon: ({ color, size }) => <TabBarIcon name='stats-chart' color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <TabBarIcon name='person' color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
