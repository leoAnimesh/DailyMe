import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import Tasks from '../Tasks/Tasks';
import WebApps from '../WebApps/WebApps';
import Focus from '../Focus/Focus';

const Drawer = createDrawerNavigator();

const Home = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'Focus'}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Tasks" component={Tasks} />
      <Drawer.Screen name="Apps" component={WebApps} />
      <Drawer.Screen name="Focus" component={Focus} />
    </Drawer.Navigator>
  );
};

export default Home;
