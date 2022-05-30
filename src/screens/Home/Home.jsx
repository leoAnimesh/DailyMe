import { createDrawerNavigator } from "@react-navigation/drawer";
import DashBoard from "../DashBoard/DashBoard";
import CustomDrawer from "./CustomDrawer";
import Projects from "../Projects/Projects";
import Tasks from "../Tasks/Tasks";
import { News } from "..";

const Drawer = createDrawerNavigator();

const Home = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"News"}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Tasks" component={Tasks} />
      <Drawer.Screen name="News" component={News} />
    </Drawer.Navigator>
  );
};

export default Home;
