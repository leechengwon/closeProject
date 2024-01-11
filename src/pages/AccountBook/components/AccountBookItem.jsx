import React from 'react';

const AccountBookItem = ({
  src,
  date,
  category,
  income,
  type,
  expenditure,
  text,
}) => {
  return (
    <tr className="border-b">
      <td className="py-2 md:text-center">{date}</td>
      <td className="gap-1 py-2 sm:flex sm:flex-col  sm:items-center  md:flex md:items-center md:justify-center lg:flex lg:items-center">
        <div className="h-6 w-6">
          <img src={src} alt="지출이미지" />
        </div>
        {text}
      </td>
      {income ? (
        <td
          className={`py-2 sm:text-center  md:text-center ${
            type === '지출' ? 'text-[red]' : 'text-[blue]'
          }`}
        >
          {`${income?.toLocaleString('ko-KR')}원`}
        </td>
      ) : (
        <td
          className={`py-2 sm:text-center md:text-center ${
            type === '지출' ? 'text-[red]' : 'text-[blue]'
          }`}
        >
          {`${expenditure?.toLocaleString('ko-KR')}원`}
        </td>
      )}

      <td className={`py-2 ${type === '지출' ? 'text-[red]' : 'text-[blue]'}`}>
        {type}
      </td>
    </tr>
  );
};

export default AccountBookItem;
