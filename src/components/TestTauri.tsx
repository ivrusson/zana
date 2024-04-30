import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/plugin-notification';
import { appCacheDir, homeDir } from '@tauri-apps/api/path';
import { Button } from './ui/button';
import { Command } from '@tauri-apps/plugin-shell';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { PhysicalSize } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api/core';

export default function TestTauri() {
  async function checker_window() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    const item = await invoke('checker_window');
    console.log(item);
  }

  async function checkPermissions() {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === 'granted';
    }
    if (permissionGranted) {
      sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' });
    }
  }

  async function pathCheck() {
    const appCacheDirPath = await appCacheDir();
    console.log('appCacheDirPath', appCacheDirPath);
  }

  async function testCommand() {
    const command = await Command.create('node', ['--help']);
    command.on('close', (data) => {
      console.log(
        `command finished with code ${data.code} and signal ${data.signal}`,
      );
    });
    command.on('error', (error) => console.error(`command error: "${error}"`));
    command.stdout.on('data', (line) => console.log(`${line}`));
    command.stderr.on('data', (line) =>
      console.log(`command stderr: "${line}"`),
    );

    const child = await command.spawn();
    console.log('pid:', child.pid);
  }

  async function denoChecker() {
    const command = await Command.create('deno', ['--version']);
    command.on('close', (data) => {
      console.log(
        `command finished with code ${data.code} and signal ${data.signal}`,
      );
    });
    command.on('error', (error) => {
      console.error(`command error: "${error}"`);
      if (error) {
        //do something
      }
    });
    command.stdout.on('data', (line) => {
      console.log(`${line}`);
      if (line) {
        //do something
      }
    });
    command.stderr.on('data', (line) =>
      console.log(`command stderr: "${line}"`),
    );
    try {
      const child = await command.spawn();
      console.log('pid:', child.pid);
    } catch (e) {
      console.log('OUTPUT', e);
    }
  }

  const openSecondaryWindow = () => {
    // Crea una nueva instancia de la ventana si aún no existe
    const webview = new WebviewWindow('new-script', {
      url: '/new-script',
      title: 'New Script',
      titleBarStyle: 'overlay',
      hiddenTitle: true,
    });
    webview.once('tauri://created', function () {
      // webview window successfully created
    });
    webview.once('tauri://error', function (e) {
      // an error happened creating the webview window
    });
    webview.setSize(new PhysicalSize(200, 200));
  };

  async function runScript() {
    try {
      const home = await homeDir();
      const scriptPath = `${home}/zana/test-files/hello.sh`; // Adjust path as needed
      const output = await invoke('run_bash_script', { path: scriptPath });
      console.log(output);
      alert(output as string);
    } catch (error) {
      console.error('Failed to run script:', error);
      alert('Error: ' + error);
    }
  }

  async function runDenoScript() {
    const home = await homeDir();
    invoke('run_deno_script', {
      scriptPath: `${home}/zana/test-files/deno_read_file.ts`,
      filePath: `${home}/zana/test-files/hello.sh`,
    })
      .then((response) => alert('File content: ' + response))
      .catch((error) => alert('Error: ' + error));
  }

  return (
    <div className=''>
      <div className='grid gap-4'>
        <h1>Welcome to Tauri!</h1>
        <Button onClick={() => checker_window()}>RUN WINDOW COMMAND</Button>
        <Button onClick={checkPermissions}>Check permissions</Button>
        <Button onClick={pathCheck}>pathCheck</Button>
        <Button onClick={testCommand}>testCommand</Button>
        <Button onClick={denoChecker}>Check for Deno</Button>
        <Button onClick={runScript}>runScript</Button>
        <Button onClick={runDenoScript}>runDenoScript</Button>
        <Button onClick={openSecondaryWindow}>openSecondaryWindow</Button>
      </div>
    </div>
  );
}
