import { FC } from 'react';

interface MyButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export const MyButton: FC<MyButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#495159] hover:bg-[#576069] transition-colors duration-500 text-white rounded p-4"
    >
      {children}
    </button>
  );
};

export default MyButton;
