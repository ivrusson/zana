import { register } from '@tauri-apps/plugin-global-shortcut';

await register('CommandOrControl+Shift+N', () => {
  console.log('Shortcut triggered: CommandOrControl+Shift+N');
});