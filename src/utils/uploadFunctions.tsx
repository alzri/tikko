'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { useDropzone } from 'react-dropzone';

interface IUploadFileProps {
  url: string;
  name: string;
  size: number;
}

export const useUploadFunction = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<File[]>([]);
  const [fileList, setFileList] = useState<IUploadFileProps[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  const processFiles = (files: File[]) => {
    const validFiles: File[] = [];

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setFileError('File should be an image');
      } else if (file.size > 1024 * 50) {
        setFileError('File too large. Please upload an image under 500KB');
      } else {
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      setSelectedAvatar(validFiles);
      setFileError(null);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFiles = Array.from(e.target.files || []);
    processFiles(inputFiles);
  };

  useEffect(() => {
    if (selectedAvatar.length > 0) {
      const imageFiles = selectedAvatar.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
      }));

      setFileList((prevList) => {
        const newFiles = imageFiles.filter(
          (file) => !prevList.some((item) => item.name === file.name)
        );
        return [...prevList, ...newFiles];
      });
    }
  }, [selectedAvatar]);

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    onDrop: (files: File[]) => {
      processFiles(files);
    },
    multiple: false,
  });

  const removeFromList = () => {
    setFileList([]);
    setSelectedAvatar([]);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const replaceAvatar = (index: number) => {
    setFileList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return {
    fileList,
    fileError,
    handleFileChange,
    removeFromList,
    replaceAvatar,
    getRootProps,
    getInputProps,
  };
};
