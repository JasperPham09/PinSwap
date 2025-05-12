import { Slot } from 'expo-router';
import { AuthProvider } from './context/AuthContext';

export default function Layout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
