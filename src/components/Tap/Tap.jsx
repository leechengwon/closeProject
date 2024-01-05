import { TAP_DATA } from '../../data/TapGroup';

const Tap = ({ tapListData, onClick, active }) => {
  return (
    <div className="flex w-full">
      {TAP_DATA.map(({ id, name, value, text }) => {
        return (
          <button
            id={id}
            name={name}
            value={value}
            onClick={onClick}
            active={active}
            className="text-20px  w-[100%] border-b-2 bg-grayscaleA py-2 text-grayscaleH"
          >
            {text}
          </button>
        );
      })}
    </div>
  );
};

export default Tap;
