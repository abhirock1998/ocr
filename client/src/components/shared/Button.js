const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center  ${props.className}`}
    >
      {children}
    </button>
  );
};

export default Button;
