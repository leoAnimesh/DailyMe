import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import Tasks from '../Tasks/Tasks';
import WebApps from '../WebApps/WebApps';
import Focus from '../Focus/Focus';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const Home = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'Focus'}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        options={{
          title: 'Tasks',
          drawerIcon: () => (
            <FontAwesome5 name="tasks" size={15} color="black" />
          ),
        }}
        name="Tasks"
        component={Tasks}
      />
      <Drawer.Screen
        options={{
          title: 'Apps',
          drawerIcon: ({ focused }) => (
            <AntDesign
              name={focused ? 'appstore1' : 'appstore-o'}
              size={15}
              color="black"
            />
          ),
        }}
        name="Apps"
        component={WebApps}
      />
      <Drawer.Screen
        options={{
          title: 'Focus',
          drawerIcon: () => (
            <FontAwesome5 name="tasks" size={15} color="black" />
          ),
        }}
        name="Focus"
        component={Focus}
      />
    </Drawer.Navigator>
  );
};

export default Home;
