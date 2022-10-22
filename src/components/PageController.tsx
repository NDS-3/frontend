import React from "react";

interface IProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PageController = ({ currentPage, setCurrentPage }: IProps) => {
  const changePage = (num: number) => {
    const newNum = currentPage + num;
    setCurrentPage(newNum);
  };

  return (
    <div>
      {currentPage > 0 && (
        <img
          src={`${process.env.PUBLIC_URL}/img/left.png`}
          alt="left"
          className="absolute left-5 top-1/2 cursor-pointer"
          onClick={() => changePage(-1)}
        />
      )}
      {currentPage < 2 && (
        <img
          src={`${process.env.PUBLIC_URL}/img/right.png`}
          alt="right"
          className="absolute right-5 top-1/2 cursor-pointer"
          onClick={() => changePage(+1)}
        />
      )}
    </div>
  );
};

export default PageController;
