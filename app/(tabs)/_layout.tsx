import HeaderIcon from "@/components/ui/headerIcon";
import TabBarIcon from "@/components/ui/tabBarIcon";
import { Tabs, router } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: {
        backgroundColor: 'rgb(240,234,210 / 0.95)',
        borderBottomColor: 'rgb(108,88,76 / 0.1)',
        borderBottomWidth: 1
      },
      headerTitleStyle: {
        color: '#6C584C',
        letterSpacing: -0.25,
        lineHeight: 36,
        fontFamily: 'Lexend',
        fontSize: 28,
        fontStyle: "italic",
        fontWeight: 'bold',
        paddingBottom: 2
      },
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
          tabBarLabel: 'Startseite',
          title: "ShirtHub",
          tabBarIcon: ({ color, size }) => <TabBarIcon name='home' color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          tabBarLabel: 'Sammlung',
          title: "Meine Sammlung",
          tabBarIcon: ({ color, size }) => <TabBarIcon name='shirt' color={color} size={size} />,
          headerRight: () => <HeaderIcon name='add' size={28} color='#e0e5eb' className='mr-6' onPress={() => router.navigate({ pathname: '/shirts/manage', params: { mode: 'add' } })} />
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
          tabBarLabel: 'Profil',
          title: "Mein Profil",
          tabBarIcon: ({ color, size }) => <TabBarIcon name='person' color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
