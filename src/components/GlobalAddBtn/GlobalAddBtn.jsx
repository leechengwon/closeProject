import IconButton from '../IconButton/IconButton';

const GlobalAddBtn = () => {
  return (
    <IconButton
      shape="add"
      type="button"
      className="fixed bottom-[50px] right-[20px] z-30 transition-all duration-300 hover:rotate-90 hover:scale-110 "
    ></IconButton>
  );
};

export default GlobalAddBtn;
