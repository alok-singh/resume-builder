const Card = (props) => {
  return (
    <div
      className={`
        w-full rounded-2xl
        shadow-xl
        px-8 py-7
        ${props.className || ''}
      `}
    >
      {props.children}
    </div>
  );
};

export default Card;