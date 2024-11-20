import './../styles/components/_button.scss';

  interface ButtonProps {
    children: React.ReactNode;
    style: string;
  }

export default function Button({ children, style }: ButtonProps) {

  return (
    <>
        <button className={style} role="button" tabIndex={0} aria-label="Кнопка">
          { children }
        </button>
    </>
  );
}
