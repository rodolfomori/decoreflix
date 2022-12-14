import { Platform, StatusBar } from 'react-native';
import OneSignal from 'react-native-onesignal';
import Constants from 'expo-constants';
import { Container, WebViewComponent } from './styles';

export default function App() {
  const isAndroid = Platform.OS === 'android';
  const INJECTEDJAVASCRIPT = 'const meta = document.createElement(\'meta\'); meta.setAttribute(\'content\', \'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0\'); meta.setAttribute(\'name\', \'viewport\'); document.getElementsByTagName(\'head\')[0].appendChild(meta); ';

  OneSignal.setAppId('8a27b9c4-8f4e-4b50-b0ae-113f96b56b0e');

  OneSignal.promptForPushNotificationsWithUserResponse();

  OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
    console.log('OneSignal: notification will show in foreground:', notificationReceivedEvent);
    const notification = notificationReceivedEvent.getNotification();
    console.log('notification: ', notification);
    const data = notification.additionalData;
    console.log('additionalData: ', data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  });

  // Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler((notification) => {
    console.log('OneSignal: notification opened:', notification);
  });

  return (
    <Container>
      <StatusBar barStyle={isAndroid ? 'dark-content' : 'light-content'} translucent />
      <WebViewComponent
        scalesPageToFit={false}
        injectedJavaScript={INJECTEDJAVASCRIPT}
        scrollEnabled
        source={{ uri: 'https://miembros.decoreflix.com' }}
        // source={{ uri: 'https://decoreflix.netlify.app/' }}
        // source={{ uri: 'http://localhost:3000/' }}
        style={{ backgroundColor: '#2B2E33', marginTop: isAndroid ? 25 : 0, flex: 1 }}
      />
    </Container>
  );
}
