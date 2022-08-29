import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

import { FaSpinner } from 'react-icons/fa'; // npm install react-icons --save ou yar add react-icons

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean, // opcional (?)
  children: ReactNode,
}

export function Button({ loading, children, ...rest }: ButtonProps) {
  return (
    <button 
        className={styles.button}
        disabled={loading}
        {...rest}>
      { loading ? (
        <FaSpinner color="#FFF" size={16} />
      ) : (
        <a className={styles.buttonText}>
          {children}
        </a>
      )}
    </button>
  )
}