import React from 'react';

const AccountBookItem = ({ date, category, price, type }) => {
  return (
    <tr className="border-b">
      <td className="px-4 py-2">{date}</td>
      <td className="px-4 py-2">{category}</td>
      <td
        className={`px-4 py-2 ${
          type === '지출' ? 'text-[red]' : 'text-[blue]'
        }`}
      >
        {price}
      </td>
      <td
        className={`px-4 py-2 ${
          type === '지출' ? 'text-[red]' : 'text-[blue]'
        }`}
      >
        {type}
      </td>
    </tr>
  );
};

export default AccountBookItem;
