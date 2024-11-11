import './../styles/components/_button.scss';

  interface ButtonProps {
    children: React.ReactNode;
    style: string;
  }

export default function Button({ children, style }: ButtonProps) {

  return (
    <>
        <button className={style}>
          { children }
        </button>
    </>
  );
}
