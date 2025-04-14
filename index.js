import { registerRootComponent } from 'expo';
import App from './App.js';

// Example: Custom initialization logic for bridgeless mode
if (__DEV__) {
  console.log('Running in development mode');
}

// Register the root component
registerRootComponent(App);
