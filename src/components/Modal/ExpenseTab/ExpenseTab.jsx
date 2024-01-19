import React, { useEffect, useState } from 'react';

import { TAP_DATA } from '../../../data/TapGroup';

import Tab from '../../Tab/Tab';
import Button from '../../Button/Button';
import CustomInput from '../contentModal/CustomInput';
import ChipGroup from '../../Chip/ChipGroup';

import INCOME_DATA from '../../../data/IncomeChipData';
import EXPENDITURE_DATA from '../../../data/ExpenditureChipData';
import ASSET_DATA from '../../../data/AssetData';

import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

const TAB_TYPE = {
  NEW: {
    save: '등록하기',
  },
  DETAIL: {
    save: '수정하기',
  },
};
const ExpenseTab = ({
  expenseData,
  closeTab,
  saveInputExpenseData,
  removeExpenseData,
}) => {
  const handleTapClick = value => {
    setInputExpenseData({
      ...inputExpenseData,
      activeTab: value,
    });
  };

  const [inputDate, setInputDate] = useState(new Date());

  const [inputExpenseData, setInputExpenseData] = useState({
    activeTab: '수입',
    incomePrice: '',
    expenditurePrice: '',
  });

  const [tabType, setTabType] = useState(TAB_TYPE.NEW);

  useEffect(() => {
    if (expenseData) {
      const copyData = { ...expenseData };
      setInputExpenseData(copyData);
      setTabType(TAB_TYPE.DETAIL);
    }
  }, [expenseData]);

  const save = () => {
    // 지출/수입 금액을 0으로 초기화해서 저장합니다.
    if (inputExpenseData.activeTab === '수입') {
      saveInputExpenseData({
        ...inputExpenseData,
        expenditurePrice: 0,
        incomePrice: Number(inputExpenseData.incomePrice),
        activeTab: inputExpenseData.activeTab,
      });
    } else {
      saveInputExpenseData({
        ...inputExpenseData,
        incomePrice: 0,
        expenditurePrice: Number(inputExpenseData.expenditurePrice),
        activeTab: inputExpenseData.activeTab,
      });
    }
    closeTab();
  };

  useEffect(() => {
    if (expenseData && expenseData.date) {
      const { date, hour, minute } = expenseData;
      const dateStr = `${date} ${hour}:${minute}`;
      setInputDate(new Date(dateStr));
    }
  }, []);

  useEffect(() => {
    let dateStr = '';
    let [year, month, day] = [
      inputDate.getFullYear(),
      inputDate.getMonth() + 1,
      inputDate.getDate(),
    ];
    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;
    dateStr = `${year}-${month}-${day}`;
    setInputExpenseData(prev => ({
      ...prev,
      date: dateStr,
      hour: inputDate.getHours(),
      minute: inputDate.getMinutes(),
      daysOfWeek: inputDate.toLocaleDateString('ko-KR', {
        weekday: 'short',
        timeZone: 'Asia/Seoul',
      }),
      amPm: inputDate.toLocaleTimeString().slice(0, 2),
    }));
  }, [inputDate]);

  const [chipGroupOpenStatus, setChipGroupOpenStatus] = useState('');

  return (
    <>
      <div>
        <Tab
          tapListData={TAP_DATA}
          onClick={handleTapClick}
          activeTab={inputExpenseData.activeTab}
        />
      </div>
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
                    selected={inputDate}
                    onChange={setInputDate}
                    dateFormat="yy/MM/dd (E) a hh:mm"
                    showTimeSelect
                    locale={ko}
                  />
                </td>
              </tr>

              <tr
                className="h-5
              "
              />
              <tr className="sm:text-14px md:text-16px lg:text-20px">
                <th>금액</th>

                <td className="td-border-b">
                  <CustomInput
                    className="pl-2 font-bold sm:text-14px md:text-16px lg:text-20px"
                    placeholder="금액을 입력해주세요."
                    type="number"
                    onChange={e => {
                      const value = e.target.value;
                      if (inputExpenseData.activeTab == '수입') {
                        setInputExpenseData({
                          ...inputExpenseData,
                          incomePrice: value,
                        });
                      } else {
                        setInputExpenseData({
                          ...inputExpenseData,
                          expenditurePrice: value,
                        });
                      }
                    }}
                    value={
                      inputExpenseData
                        ? inputExpenseData.activeTab == '수입'
                          ? inputExpenseData.incomePrice
                          : inputExpenseData.expenditurePrice
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

                {inputExpenseData.classification ? (
                  <td className="td-border-b py-1 pl-2 font-bold">
                    {inputExpenseData.classification}
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

                {inputExpenseData.asset ? (
                  <td className="td-border-b py-1 pl-2">
                    {inputExpenseData.asset}
                  </td>
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
                      setInputExpenseData({
                        ...inputExpenseData,
                        memo: e.target.value,
                      });
                    }}
                    value={inputExpenseData?.memo}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex w-full items-center justify-center gap-3 pt-5">
            <Button type="submit" text={tabType.save} onClick={save} />
            {tabType == TAB_TYPE.NEW ? (
              <Button text="취소" color="white" onClick={closeTab} />
            ) : (
              <Button
                text="삭제"
                color="tertiary"
                onClick={removeExpenseData}
              />
            )}
          </div>
        </fieldset>
      </form>

      {chipGroupOpenStatus == 'classification' && (
        <div className="mt-4">
          <ChipGroup
            size="sm"
            ChipData={
              inputExpenseData.activeTab == '수입'
                ? INCOME_DATA
                : EXPENDITURE_DATA
            }
            currentValue={expenseData?.classification}
            changeValue={(classification, classificationSrc) =>
              setInputExpenseData({
                ...inputExpenseData,
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
              setInputExpenseData({
                ...inputExpenseData,
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
