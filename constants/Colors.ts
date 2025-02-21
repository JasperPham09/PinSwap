/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#004d40', // Dark green
    background: '#f0f7da', // Light green
    tint: tintColorLight,
    tabIconDefault: '#7ea372', // Medium green
    tabIconSelected: tintColorLight,
    border: '#00796b',
    card: '#e1f0c4', // Lighter green
    icon: '#00796b',
    secondary: '#2e7d32',
  },
  dark: {
    text: '#a5d6a7', // Light green
    background: '#00291e', // Darker green
    tint: tintColorDark,
    tabIconDefault: '#a5d6a7', // Light green
    tabIconSelected: tintColorDark,
    border: '#00796b',
    card: '#003329', // Dark green
    icon: '#64ffda',
    secondary: '#66bb6a',
  },
};
