import React, { useMemo, useState } from 'react';
import { TAP_DATA } from '../../../data/TapGroup';
import Tap from '../../Tab/Tab';
import IconButton from '../../IconButton/IconButton';
import ExpenditureTap from './ExpenditureTap';
import InComeTap from './InComeTap';
import 'react-datepicker/dist/react-datepicker.css';

const CalenderModal = ({ selectDate, expenseList }) => {
  const incomeTotal = useMemo(() => {
    let price = 0;
    if (expenseList && expenseList.length > 0) {
      for (let item of expenseList) {
        price += item.incomePrice;
      }
    }
    return price;
  }, []);

  const expenditureTotal = useMemo(() => {
    let price = 0;
    if (expenseList && expenseList.length > 0) {
      for (let item of expenseList) {
        price += item.expenditurePrice;
      }
    }
    return price;
  }, []);
  const total = useMemo(
    () => incomeTotal - expenditureTotal,
    [incomeTotal, expenditureTotal],
  );

  const [pageChange, setPageChange] = useState(false);

  return (
    <section className="flex flex-col">
      {pageChange === false ? (
        <>
          <table className="h-full w-full">
            <colgroup>
              <col width="30%" />
              <col width="40%" />
              <col width="30%" />
            </colgroup>

            <thead>
              <tr className="border-b border-grayscaleC">
                <th className="text-20px">
                  <span className="block">수입</span>
                  <span className="text-12px text-primaryColor">
                    {incomeTotal?.toLocaleString('ko-KR')}
                  </span>
                </th>
                <th className="text-20px">
                  <span className="block">지출</span>
                  <span className="text-12px text-secondaryColor">
                    {expenditureTotal?.toLocaleString('ko-KR')}
                  </span>
                </th>
                <th className="text-20px">
                  <span className="block">합계</span>
                  <span className="text-12px text-tertiaryColor">
                    {total?.toLocaleString('ko-KR')}
                  </span>
                </th>
              </tr>

              <tr className="h-full w-full whitespace-nowrap border-b border-grayscaleC">
                <th className="flex font-RubikRegular md:justify-center lg:justify-center">
                  <span className="flex items-center justify-center sm:text-12px md:text-14px lg:text-16px">
                    {selectDate.year}.
                  </span>
                  <span className="flex items-center justify-center sm:text-12px md:text-14px lg:text-16px">
                    {selectDate.month}.
                  </span>
                  <span className="flex items-center pr-1 sm:text-12px md:text-14px lg:text-16px">
                    {selectDate.day}
                  </span>
                  <span className="flex items-center rounded border bg-grayscaleC text-grayscaleA sm:text-10px md:text-12px lg:text-12px">
                    {selectDate.daysOfWeek}
                  </span>
                </th>
                <th className="text-center font-RubikRegular text-16px"></th>
                <th className="text-center font-RubikRegular text-16px"></th>
              </tr>
            </thead>

            {expenseList?.map(
              ({
                id,
                date,
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
              }) => {
                return (
                  <tbody
                    key={id}
                    className="h-28 w-full border-b border-grayscaleC"
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
                              <img
                                className="h-6 w-6"
                                src={assetSrc}
                                alt={asset}
                              />
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
              },
            )}
          </table>
          <IconButton
            className="absolute bottom-5 right-5 transition-all duration-300 hover:rotate-90 hover:scale-110"
            shape="add"
            onClick={null}
          />
        </>
      ) : (
        <>{null}</>
      )}
    </section>
  );
};

export default CalenderModal;
