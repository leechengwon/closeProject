import React, { useMemo } from 'react';
import IconButton from '../../IconButton/IconButton';
import 'react-datepicker/dist/react-datepicker.css';

const ExpenseListTab = ({ selectDate, expenseList, showExpenseBoxModal }) => {
  const incomeTotal = useMemo(() => {
    let price = 0;
    if (expenseList && expenseList.length > 0) {
      for (let item of expenseList) {
        price += item.incomePrice;
      }
    }
    return price;
  }, [expenseList]);

  const expenditureTotal = useMemo(() => {
    let price = 0;
    if (expenseList && expenseList.length > 0) {
      for (let item of expenseList) {
        price += item.expenditurePrice;
      }
    }
    return price;
  }, [expenseList]);

  const total = useMemo(
    () => incomeTotal - expenditureTotal,
    [incomeTotal, expenditureTotal],
  );

  return (
    <>
      <table className="h-full w-full">
        <colgroup>
          <col width="30%" />
          <col width="40%" />
          <col width="30%" />
        </colgroup>

        <thead>
          <tr>
            {[
              { title: '수입', value: incomeTotal, color: 'primary' },
              {
                title: '지출',
                value: expenditureTotal,
                color: 'secondary',
              },
              { title: '합계', value: total, color: 'tertiary' },
            ].map(({ title, value, color }) => (
              <th key={title} className="text-20px">
                <span className="block">{title}</span>
                <span className={`text-12px text-${color}Color`}>
                  {value?.toLocaleString('ko-KR')}
                </span>
              </th>
            ))}
          </tr>

          <tr className="h-full w-full whitespace-nowrap border-b border-grayscaleC">
            <th className="flex font-RubikRegular md:justify-center lg:justify-center">
              <span className="flex items-center justify-center sm:text-12px md:text-14px lg:text-16px">
                {selectDate.year}.{selectDate.month}.{selectDate.day}
              </span>
              <span className="flex items-center rounded border bg-grayscaleC text-grayscaleA sm:text-10px md:text-12px lg:text-12px">
                {selectDate.daysOfWeek}
              </span>
            </th>
          </tr>
        </thead>

        {expenseList?.map(expense => {
          const {
            id,
            daysOfWeek,
            amPm,
            hour,
            minute,
            incomePrice,
            expenditurePrice,
            classificationSrc,
            classification,
            assetSrc,
            asset,
            memo,
            activeTab,
          } = expense;
          return (
            <tbody
              key={id}
              className="h-28 w-full border-b border-grayscaleC"
              onClick={() => showExpenseBoxModal(expense)}
            >
              <tr>
                <th>
                  <div className="flex justify-center">
                    {activeTab === '수입' ? (
                      <>
                        <img
                          className="h-6 w-6"
                          src={classificationSrc}
                          alt={classification}
                        />
                        <span className="flex items-center pl-2 sm:text-10px md:text-12px lg:text-14px">
                          {classification}
                        </span>
                      </>
                    ) : (
                      <>
                        <img className="h-6 w-6" src={assetSrc} alt={asset} />
                        <span className="flex items-center pl-2 sm:text-10px md:text-12px lg:text-14px">
                          {asset}
                        </span>
                      </>
                    )}
                  </div>
                </th>
                <td className="flex h-full flex-col justify-center">
                  <span className="ellipsis sm:text-12px md:text-14px lg:text-16px">
                    {memo}
                  </span>
                  <span className="text-grayscaleH text-opacity-30 sm:text-12px md:text-14px lg:text-14px">
                    {`${daysOfWeek}요일 / ${amPm} ${hour}:${minute} / ${asset}`}
                  </span>
                </td>
                <td className="pr-5 text-end">
                  {incomePrice > 0 && expenditurePrice === 0 && (
                    <span className="text-primaryColor sm:text-12px md:text-14px lg:text-16px">
                      {incomePrice?.toLocaleString('ko-KR')}
                    </span>
                  )}
                  {expenditurePrice > 0 && incomePrice === 0 && (
                    <span className="text-secondaryColor sm:text-12px md:text-14px lg:text-16px">
                      {expenditurePrice?.toLocaleString('ko-KR')}
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <IconButton
        className="absolute bottom-5 right-5 transition-all duration-300 hover:rotate-90 hover:scale-110"
        shape="add"
        onClick={() => showExpenseBoxModal(null)}
      />
    </>
  );
};

export default ExpenseListTab;
