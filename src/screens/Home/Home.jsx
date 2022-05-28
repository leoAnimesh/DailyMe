import { createDrawerNavigator } from '@react-navigation/drawer'
import DashBoard from '../DashBoard/DashBoard';
import CustomDrawer from './CustomDrawer';
import Projects from '../Projects/Projects';
import Tasks from '../Tasks/Tasks';

const Drawer = createDrawerNavigator();

const Home = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown:false}}  drawerContent={(props)=> <CustomDrawer {...props} />} >
      <Drawer.Screen name="dashboard" component={DashBoard} />
      <Drawer.Screen name="Projects" component={Projects} />
      <Drawer.Screen name="Tasks" component={Tasks} />
    </Drawer.Navigator>
  );
};

export default Home;
