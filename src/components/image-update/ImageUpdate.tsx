import { useUploadFunction } from '@/utils/uploadFunctions';
import UploadIcon from '@/assets/images/icon-upload.svg';
import InfoIcon from '@/assets/images/icon-info.svg';
import styles from './ImageUpdate.module.scss';
import clsx from 'clsx';
import Image from 'next/image';

export const ImageUploader = () => {
  const {
    fileList,
    fileError,
    handleFileChange,
    removeFromList,
    replaceAvatar,
    getRootProps,
    getInputProps,
  } = useUploadFunction();

  return (
    <div {...getRootProps()}>
      {fileList.length === 0 ? (
        <div className={styles.imageUpload}>
          <input {...getInputProps()} onChange={handleFileChange} />
          <div className={styles.imageInputWrapper}>
            <UploadIcon className={styles.uploadIcon} />
            <p>Drag & drop or click to upload</p>
          </div>
          {!fileError ? (
            <div className={styles.instructionsInfo}>
              <InfoIcon />
              <p>Upload your photo (JPG or PNG, max size 500KB).</p>
            </div>
          ) : (
            <div className={styles.errorWrapper}>
              <InfoIcon className={styles.infoIcon} />
              <p className={styles.errorMessage}>{fileError}</p>
            </div>
          )}
        </div>
      ) : (
        fileList.map((file, index) => (
          <div className={styles.imageUploaded} key={file.name}>
            <Image
              className={styles.uplodedImage}
              src={file.url}
              alt={file.name}
              width={42}
              height={42}
            />
            <div className={styles.buttonWrapper}>
              <button
                className={clsx(styles.button, styles.remove)}
                onClick={() => removeFromList()}
              >
                Remove image
              </button>
              <button
                className={clsx(styles.button, styles.change)}
                onClick={() => replaceAvatar(index)}
              >
                Change image
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
