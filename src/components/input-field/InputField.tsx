import styles from './InputField.module.scss';
import { clsx } from 'clsx';

export interface IInputFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  type: 'text' | 'email';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({ label, type, value, onChange, ...rest }: IInputFieldProps) => {
  const inputId = label.replace(/\s/g, '-').toLowerCase();

  return (
    <div {...rest}>
      <label htmlFor={inputId} className={clsx(styles.label, styles.labelText)}>
        {label}
        <input id={inputId} type={type} value={value ?? ''} onChange={onChange} />
      </label>
    </div>
  );
};
