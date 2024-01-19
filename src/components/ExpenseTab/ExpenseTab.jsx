import React, { useEffect, useState } from 'react';

import Button from '../Button/Button';
import CustomInput from '../Modal/contentModal/CustomInput';
import ChipGroup from '../Chip/ChipGroup';

import INCOME_DATA from '../../data/IncomeData';
import EXPENDITURE_DATA from '../../data/ExpenditureData';
import ASSET_DATA from '../../data/AssetData';

import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

const ExpenseTab = ({
  activeTab,
  expenseData,
  setExpenseData,
  closeTab,
  saveExpenseData,
}) => {
  const [expenseDataDate, setExpenseDataDate] = useState(new Date());

  useEffect(() => {
    if (expenseData.date) {
      const { date, hour, minute } = expenseData;
      const dateStr = `${date} ${hour}:${minute}`;
      setExpenseDataDate(new Date(dateStr));
    }
  }, []);

  useEffect(() => {
    let dateStr = '';
    let [year, month, day] = [
      expenseDataDate.getFullYear(),
      expenseDataDate.getMonth() + 1,
      expenseDataDate.getDate(),
    ];
    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;
    dateStr = `${year}-${month}-${day}`;
    setExpenseData(prev => ({
      ...prev,
      date: dateStr,
      hour: expenseDataDate.getHours(),
      minute: expenseDataDate.getMinutes(),
      dayOfWeek: expenseDataDate.toLocaleDateString('ko-KR', {
        weekday: 'short',
        timeZone: 'Asia/Seoul',
      }),
      amPm: expenseDataDate.toLocaleTimeString().slice(0, 2),
    }));
  }, [expenseDataDate]);

  const [chipGroupOpenStatus, setChipGroupOpenStatus] = useState('');

  return (
    <>
      <form>
        <fieldset onClick={() => setChipGroupOpenStatus('')}>
          <legend className="text-0px">수입</legend>
          <table className="mt-5 h-full w-full">
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>

            <tbody className="font-R h-full w-full">
              <tr className="sm:text-14px md:text-16px lg:text-20px">
                <th>날짜</th>
                <td className="td-border-b py-1 pl-2">
                  <DatePicker
                    className="cursor-pointer"
                    selected={expenseDataDate}
                    onChange={setExpenseDataDate}
                    dateFormat="yy/MM/dd (E) a hh:mm"
                    showTimeSelect
                    locale={ko}
                  />
                </td>
              </tr>
              <tr className="h-5" />
              <tr className="sm:text-14px md:text-16px lg:text-20px">
                <th>금액</th>
                <td className="td-border-b">
                  <CustomInput
                    className="pl-2 font-bold sm:text-14px md:text-16px lg:text-20px"
                    placeholder="금액을 입력해주세요."
                    type="number"
                    onChange={e => {
                      const value = Number(e.target.value);
                      if (activeTab == '수입') {
                        setExpenseData({
                          ...expenseData,
                          incomePrice: value,
                        });
                      } else {
                        setExpenseData({
                          ...expenseData,
                          expenditurePrice: value,
                        });
                      }
                    }}
                    value={
                      expenseData
                        ? activeTab == '수입'
                          ? expenseData.incomePrice
                          : expenseData.expenditurePrice
                        : null
                    }
                  />
                </td>
              </tr>
              <tr className="h-5" />
              <tr
                className="cursor-pointer sm:text-14px md:text-16px lg:text-20px"
                onClick={event => {
                  event.stopPropagation();
                  setChipGroupOpenStatus('classification');
                }}
              >
                <th>분류</th>
                {expenseData.classification ? (
                  <td className="td-border-b py-1 pl-2 font-bold">
                    {expenseData.classification}
                  </td>
                ) : (
                  <td className="td-border-b py-1 pl-2 text-grayscaleD text-opacity-60">
                    선택
                  </td>
                )}
              </tr>
              <tr className="h-5" />
              <tr
                className="cursor-pointer sm:text-14px md:text-16px lg:text-20px "
                onClick={event => {
                  event.stopPropagation();
                  setChipGroupOpenStatus('asset');
                }}
              >
                <th>자산</th>
                {expenseData.asset ? (
                  <td className="td-border-b py-1 pl-2">{expenseData.asset}</td>
                ) : (
                  <td className="td-border-b py-1 pl-2 text-grayscaleD text-opacity-60">
                    선택
                  </td>
                )}
              </tr>
              <tr className="h-5" />
              <tr className="sm:text-14px md:text-16px lg:text-20px">
                <th>내용</th>
                <td className="td-border-b">
                  <CustomInput
                    className="pl-2 font-bold sm:text-14px md:text-16px lg:text-20px"
                    placeholder="내용을 입력해주세요."
                    onChange={e => {
                      setExpenseData({
                        ...expenseData,
                        memo: e.target.value,
                      });
                    }}
                    value={expenseData?.memo}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex w-full items-center justify-center gap-3 pt-5">
            <Button type="submit" text="저장하기" onClick={saveExpenseData} />
            <Button text="취소" color="white" onClick={closeTab} />
          </div>
        </fieldset>
      </form>

      {chipGroupOpenStatus == 'classification' && (
        <div className="mt-4">
          <ChipGroup
            size="sm"
            ChipData={activeTab == '수입' ? INCOME_DATA : EXPENDITURE_DATA}
            currentValue={expenseData?.classification}
            changeValue={(classification, classificationSrc) =>
              setExpenseData({
                ...expenseData,
                classification,
                classificationSrc,
              })
            }
          />
        </div>
      )}
      {chipGroupOpenStatus == 'asset' && (
        <div className="mt-4">
          <ChipGroup
            size="sm"
            ChipData={ASSET_DATA}
            currentValue={expenseData?.asset}
            changeValue={(asset, assetSrc) =>
              setExpenseData({
                ...expenseData,
                asset,
                assetSrc,
              })
            }
          />
        </div>
      )}
    </>
  );
};

export default ExpenseTab;
