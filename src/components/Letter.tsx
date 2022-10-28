interface IProps {
  element: JSX.Element;
}

const Letter = ({ element }: IProps) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 aspect-square">
      <img
        className="relative"
        src={`${process.env.PUBLIC_URL}/img/letter.jpg`}
        alt="letter-bg"
      />
      {element}
    </div>
  );
};

export default Letter;
