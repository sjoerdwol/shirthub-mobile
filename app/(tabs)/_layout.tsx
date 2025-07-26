import HeaderIcon from "@/components/ui/headerIcon";
import TabBarIcon from "@/components/ui/tabBarIcon";
import { Tabs, router } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: {
        backgroundColor: '#23272e',
      },
      headerTitleStyle: {
        color: '#e0e5eb',
      },
      tabBarActiveTintColor: '#3673c4',
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
          title: "My Collection",
          tabBarIcon: ({ color, size }) => <TabBarIcon name='shirt' color={color} size={size} />,
          headerRight: () => <HeaderIcon name='add' size={28} color='#e0e5eb' className='mr-6' onPress={() => router.navigate('/shirts/manage')} />
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
          title: "My Profile",
          tabBarIcon: ({ color, size }) => <TabBarIcon name='person' color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
