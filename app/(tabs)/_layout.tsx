import HeaderIcon from "@/components/ui/headerIcon";
import TabBarIcon from "@/components/ui/tabBarIcon";
import { Tabs, router } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: {
        backgroundColor: 'rgb(240,234,210 / 0.9)',
        borderBottomColor: '#6C584C',
        borderBottomWidth: 0.2
      },
      headerTitleStyle: {
        color: '#6C584C',
        lineHeight: 36,
        fontFamily: 'Lexend',
        fontSize: 28,
        fontStyle: "italic",
        fontWeight: 'bold'
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
          title: "ShirtHub",
          tabBarIcon: ({ color, size }) => <TabBarIcon name='home' color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "My Collection",
          tabBarIcon: ({ color, size }) => <TabBarIcon name='shirt' color={color} size={size} />,
          headerRight: () => <HeaderIcon name='add' size={28} color='#e0e5eb' className='mr-6' onPress={() => router.navigate({ pathname: '/shirts/manage', params: { mode: 'add' } })} />
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
