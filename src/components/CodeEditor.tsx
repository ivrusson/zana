import { Editor, useMonaco } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";

export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

export default function CodeEditor() {
  const editorRef = useRef();
  const monaco = useMonaco();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("typescript");

  const onMount = (editor) => {
    editorRef.current = editor;
    // editor.focus();
  };

  useEffect(() => {
    if (monaco) {
      // Set TypeScript compiler options
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ESNext,
        allowNonTsExtensions: true,
        moduleResolution:
          monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.ESNext,
        noLib: true,
        allowJs: true,
        typeRoots: ["https://cdn.jsdelivr.net/npm/@denoland"],
      });

      // Load Deno typings
      fetch("https://cdn.jsdelivr.net/npm/@denoland/idk/types.d.ts").then(
        async (res) => {
          const denoTypes = await res.text();
          monaco.languages.typescript.typescriptDefaults.addExtraLib(
            denoTypes,
            "deno.d.ts"
          );
        }
      );
    }
  }, [monaco]);

  return (
    <div>
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
        }}
        height="75vh"
        theme="vs-dark"
        language={language}
        defaultValue={""}
        onMount={onMount}
        value={value}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
}
