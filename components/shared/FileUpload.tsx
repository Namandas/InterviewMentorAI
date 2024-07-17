// FileUpload.tsx
import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

interface FileUploadProps {
  onUploadComplete: (response: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadComplete }) => {
  return (
    <FilePond
      acceptedFileTypes={['application/pdf']}
      labelIdle='Drag & Drop your resume or <span class="filepond--label-action">Browse</span>'
      server={{
        process: {
          url: '/api/upload',
          onload: (response) => {
            onUploadComplete(response);
            return response;
          },
        },
        fetch: null,
        revert: null,
      }}
    />
  );
};

export default FileUpload;
