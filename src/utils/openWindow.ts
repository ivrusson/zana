import { PhysicalSize, WindowOptions } from "@tauri-apps/api/window";
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { v4 as uuidv4 } from 'uuid';

export interface OpenWindow extends WindowOptions {
  url: string;
  size?: [number, number];
}

export const openWindow = ({ url, title, titleBarStyle = "overlay", hiddenTitle = true, size = [200, 400] }: OpenWindow) => {
  console.log('trigger openWindow');
  const winId = uuidv4();
  const webview = new WebviewWindow(winId, {
    url,
    title,
    titleBarStyle,
    hiddenTitle,
  });
  const physicalSize = new PhysicalSize(size[0], size[1]);
  webview.setSize(physicalSize);
};