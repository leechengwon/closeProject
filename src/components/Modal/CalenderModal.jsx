import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { TAP_DATA } from '../../data/TapGroup';
import Tap from '../Tap/Tap';
import IconButton from '../IconButton/IconButton';
import ChipGroup from '../Chip/ChipGroup';
import EXPENDITURE_DATA from '../../data/ExpenditureData';
import INCOME_DATA from '../../data/IncomeData';
import 'react-datepicker/dist/react-datepicker.css';

const CalenderModal = ({ selectDate, data, originalData }) => {
  /** add 버튼을 눌렀을 때 페이지를 체인지 하기 위한 상태를 저장합니다. */
  const [pageChange, setPageChange] = useState(false);
  /** Tab 버튼의 상태를 저장합니다. */
  const [activeTab, setActiveTab] = useState('수입');
  /** startDate에 newDate로 표시하기 위해 받아온 selectDate를 형식에 맞춘 후 변수에 담아줍니다. */
  const selectedDate = `${selectDate.year}-${selectDate.month}-${selectDate.day}`;
  /** datepicker를 사용하기 위해 startDate를 저장합니다. 초기값은 클릭한 날짜입니다. */
  const [startDate, setStateDate] = useState(new Date(selectedDate));
  /** Chip의 현재 선택한 값이 담기는 State입니다. */
  const [currentValue, setCurrentValue] = useState('');

  const [expandedToggle, setExpandedToggle] = useState(false);

  /** 수입에 대한 금액을 모두 더한 값을 저장하는 변수입니다.
   * data 함수는 선택된 날짜의 데이터를 표시하고 있습니다.
   * reduce 함수는 배열의 각 요소에 대해 주어진 reducer 함수를 실행하고, 하나의 결과값을 반환합니다.
   * reduce 함수의 두번째 인자는 초기값을 의미합니다.
   */
  const incomeAmount = originalData.reduce((acc, cur) => {
    return cur.income ? acc + cur.income : acc;
  }, 0);

  const expenditureAmount = originalData.reduce((acc, cur) => {
    return cur.expenditure ? acc + cur.expenditure : acc;
  }, 0);

  /** totalAmount 변수는 수입 금액과 지출 금액을 뺀 가격을 저장합니다. */
  const totalAmount = incomeAmount - expenditureAmount;
  /** PageChange를 토글로 정의하고, onClick 될 때마다 Toggle 합니다. */
  const handlePageChangeToggle = () => {
    setPageChange(!pageChange);
  };
  /** Tap의 value값을 인자로 받아 Tap의 상태를 변경합니다. */
  const handleTapClick = value => {
    setActiveTab(value);
  };

  const handleDateChange = date => {
    // const formatted = /format(date, 'yy/MM/dd (E) a hh:mm');
    setStateDate(date);
  };

  const handleExpandedToggle = () => {
    setExpandedToggle(!expandedToggle);
  };

  console.log(currentValue);

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
                    {incomeAmount?.toLocaleString('ko-KR')}
                  </span>
                </th>
                <th className="text-20px">
                  <span className="block">지출</span>
                  <span className="text-12px text-secondaryColor">
                    {expenditureAmount?.toLocaleString('ko-KR')}
                  </span>
                </th>
                <th className="text-20px">
                  <span className="block">합계</span>
                  <span className="text-12px text-tertiaryColor">
                    {totalAmount?.toLocaleString('ko-KR')}
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

            {data?.map(
              (
                {
                  id,
                  expenditure,
                  income,
                  memo,
                  src,
                  text,
                  total,
                  asset,
                  daysOfWeek,
                  hour,
                  minute,
                },
                index,
              ) => {
                return (
                  <React.Fragment key={id}>
                    <tbody className="h-28 w-full border-b border-grayscaleC">
                      <tr>
                        <th>
                          <div className="flex justify-center">
                            <img className="h-6 w-6" src={src} alt={text} />
                            <span className="flex items-center pl-2 sm:text-10px md:text-12px lg:text-14px">
                              {text}
                            </span>
                          </div>
                        </th>
                        <td className="flex h-full flex-col justify-center">
                          <span className="ellipsis sm:text-12px md:text-14px lg:text-16px">
                            {memo}
                          </span>
                          <span className="text-grayscaleH text-opacity-30 sm:text-12px md:text-14px lg:text-14px">
                            {`${daysOfWeek} ${hour}:${minute} ${asset}`}
                          </span>
                        </td>
                        <td className="pr-5 text-end">
                          {income && (
                            <span className="text-primaryColor sm:text-12px md:text-14px lg:text-16px">
                              {income?.toLocaleString('ko-KR')}
                            </span>
                          )}
                          {expenditure && (
                            <span className="text-secondaryColor sm:text-12px md:text-14px lg:text-16px">
                              {expenditure?.toLocaleString('ko-KR')}
                            </span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </React.Fragment>
                );
              },
            )}
          </table>
          <IconButton
            className="absolute bottom-5 right-5 transition-all duration-300 hover:rotate-90 hover:scale-110"
            shape="add"
            onClick={handlePageChangeToggle}
          />
        </>
      ) : (
        <>
          <div>
            <Tap
              tapListData={TAP_DATA}
              onClick={handleTapClick}
              activeTab={activeTab}
            />
          </div>
          <table className="mt-5 h-full w-full">
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>

            <tbody className="font-R h-full w-full">
              <tr className="text-20px">
                <th>날짜</th>
                <td className="border-b border-grayscaleC">
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    dateFormat="yy/MM/dd (E) a hh:mm"
                    showTimeSelect
                    locale={ko}
                  />
                </td>
              </tr>
              <tr className="h-5" />
              <tr className="text-20px">
                <th>금액</th>
                <td>
                  {/* <Input className="border-b border-grayscaleH border-opacity-80" /> */}
                  3,000원
                </td>
              </tr>
              <tr className="h-5" />
              <tr className="text-20px" onClick={handleExpandedToggle}>
                <th>분류</th>
                <td>식비</td>
              </tr>
              <tr className="h-5" />
              <tr className="text-20px">
                <th>자산</th>
                <td>현금</td>
              </tr>
              <tr className="h-5" />
              <tr className="text-20px">
                <th>내용</th>
                <td>호두과자</td>
              </tr>
            </tbody>
          </table>
          {expandedToggle && (
            <div className="mt-24 flex h-full w-full items-center justify-center">
              <ChipGroup
                size="lg"
                ChipData={EXPENDITURE_DATA && EXPENDITURE_DATA}
                currentValue={currentValue}
                setCurrentValue={setCurrentValue}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CalenderModal;
