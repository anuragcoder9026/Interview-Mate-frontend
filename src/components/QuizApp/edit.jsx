import React from 'react';
import { Editor } from '@monaco-editor/react';
import './editcss.css'; // Import external CSS file for responsive styling
const CodeEditor = ({ codeString }) => {
  const formattedCode = codeString;
//   preprocessCode(codeString);

  return (
    <div className="code-editor-container">
      <Editor
        height="92%"
        language="cpp"
        value={formattedCode}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          lineNumbers: 'off',
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;