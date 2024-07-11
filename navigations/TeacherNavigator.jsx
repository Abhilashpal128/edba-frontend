import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import Header from "../screens/common/Header";
import CustomDrawer from "../screens/common/Drawer/Drawer";
// import TeacherHome from "../screens/teacher/Home";
// import TeacherProfile from "../screens/teacher/profile";
import TeacherTabNavigation from "./TeacherTabNavigation";
// import TeacherAssignment from "../screens/teacher/Assignment";
// import TeacherTimeTable from "../screens/teacher/TimeTable";
// import TeacherAttendence from "../screens/teacher/Attendence";
// import TeacherPersonalDetail from "../screens/common/PersonalDetail";
import HelpSupport from "../screens/common/Helpsupport";
import AddAssignment from "../screens/teacher/Assignment/AddAssignment";
import Grade from "../screens/teacher/Assignment/Grade";
import Logout from "../screens/teacher/Logout/Logout";
import ResetPassword from "../screens/common/ResetPassword";
import TeacherNotification from "../screens/teacher/Notification";
// import NoticesAndEvents from "../screens/teacher/NoticeEvents";
import Settings from "../screens/common/Settings";
import Profile from "../screens/common/Profile";
import PersonalDetail from "../screens/common/PersonalDetail";
import SingleNoticeEvent from "../screens/common/NoticesEvents/SingleNoticeEvent";
import ShowAssignment from "../screens/teacher/Assignment/ShowAssignment";
import EditAssignment from "../screens/teacher/Assignment/EditAssignment";
import Inbox from "../screens/common/Inbox";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const TeacherStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="TeacherTab"
        component={TeacherTabNavigation}
      />
      <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen name="TimeTable" component={TeacherTimeTable} /> */}
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="PersonalDetail" component={PersonalDetail} />
      <Stack.Screen name="AddAssignment" component={AddAssignment} />
      <Stack.Screen name="Grade" component={Grade} />
      <Stack.Screen name="HelpAndsupport" component={HelpSupport} />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Notification" component={TeacherNotification} />
      <Stack.Screen name="singleNotice" component={SingleNoticeEvent} />
      <Stack.Screen name="ShowAssignment" component={ShowAssignment} />
      <Stack.Screen name="EditAssignment" component={EditAssignment} />
      <Stack.Screen name="inbox" component={Inbox} />
    </Stack.Navigator>
  );
};

const TeacherNavigator = () => {
  return (
    <>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        {/* ({ navigation, route }) => Header({ navigation, route }) */}
        {/* <Drawer.Screen name="Home" component={TeacherHome} />
        <Drawer.Screen name="Profile" component={TeacherProfile} />
        <Drawer.Screen name="Assignments" component={TeacherAssignment} />
        <Drawer.Screen name="TimeTable" component={TeacherTimeTable} />
        <Drawer.Screen name="Settings" component={TeacherSettings} />
        <Drawer.Screen name="Attendence" component={TeacherAttendence} />
        <Drawer.Screen
          name="PersonalDetail"
          component={TeacherPersonalDetail}
        />
        <Drawer.Screen name="AddAssignment" component={AddAssignment} />
        <Drawer.Screen name="Grade" component={Grade} />
        <Drawer.Screen name="HelpAndsupport" component={HelpSupport} /> */}
        <Drawer.Screen name="TeacherStack" component={TeacherStack} />
      </Drawer.Navigator>
    </>
  );
};

export default TeacherNavigator;
