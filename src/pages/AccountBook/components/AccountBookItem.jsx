import React from 'react';

const AccountBookItem = ({
  src,
  date,
  daysOfWeek,
  income,
  type,
  expenditure,
  text,
}) => {
  return (
    <tr className="border-b">
      <td className="py-2 text-center md:text-center">
        {daysOfWeek}
        <br />
        {date}
      </td>

      <td className="flex flex-col items-center justify-center gap-1 py-2 text-center lg:flex lg:flex-col">
        <div className="h-6 w-6">
          <img src={src} alt="지출이미지" />
        </div>
        <span>{text}</span>
      </td>

      {income ? (
        <td
          className={`py-2 text-center sm:text-center md:text-center ${
            type === '지출' ? 'text-[red]' : 'text-[blue]'
          }`}
        >
          {`${income?.toLocaleString('ko-KR')}원`}
        </td>
      ) : (
        <td
          className={`py-2 text-center sm:text-center md:text-center ${
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
