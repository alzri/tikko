'use client';
import { useEffect, useState } from 'react';
import styles from './InputField.module.scss';
import { clsx } from 'clsx';
import { ImageUploader } from '../image-update/ImageUpdate';

export interface IInputFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  type: 'text' | 'file' | 'email';
  value?: string | File;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({ label, type, value, onChange, ...rest }: IInputFieldProps) => {
  const [previewImage, setPreviewImage] = useState<string>('');
  const inputId = label.replace(/\s/g, '-').toLowerCase();

  useEffect(() => {
    if (type === 'file' && value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreviewImage(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [value, type]);

  return (
    <div {...rest}>
      <label
        htmlFor={inputId}
        className={clsx(styles.label, type === 'file' ? styles.labelImage : styles.labelText)}
      >
        {label}
        {type === 'file' ? (
          <>
            <ImageUploader />
          </>
        ) : (
          <input id={inputId} type={type} value={value as string} onChange={onChange} />
        )}
      </label>
    </div>
  );
};
