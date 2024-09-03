import React from 'react';
import { Editor } from '@monaco-editor/react';
import PropTypes from 'prop-types'; // Import PropTypes for validation

const CodeEditor = ({ codeString }) => {
  const formattedCode = codeString;

  return (
    <div className="w-full max-h-[300px] rounded-lg mb-2.5
                    sm:h-[300px] md:h-[400px] lg:h-[500px]">
      <Editor
        height="100%" // Use 100% to fit the container height
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

// Define prop types for better validation
CodeEditor.propTypes = {
  codeString: PropTypes.string.isRequired,
};

export default CodeEditor;
