import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import Tasks from '../Tasks/Tasks';
import WebApps from '../WebApps/WebApps';
import Focus from '../Focus/Focus';
import DashBoard from '../DashBoard/DashBoard';
import {
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const Home = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, swipeEnabled: false }}
      initialRouteName={'Dashboard'}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        options={{
          title: 'Dashboard',
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={20}
              color="black"
            />
          ),
        }}
        name="DashBoard"
        component={DashBoard}
      />
      <Drawer.Screen
        options={{
          title: 'Tasks',
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'list-circle-sharp' : 'list-circle-outline'}
              size={20}
              color="black"
            />
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
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name={focused ? 'work' : 'work-outline'}
              size={17}
              color="black"
            />
          ),
        }}
        name="Focus"
        component={Focus}
      />
    </Drawer.Navigator>
  );
};

export default Home;
