import React, { useState } from 'react';
import { TAP_DATA } from '../../../data/TapGroup';
import Tap from '../../Tab/Tab';
import IconButton from '../../IconButton/IconButton';
import ExpenditureTap from './ExpenditureTap';
import InComeTap from './InComeTap';
import 'react-datepicker/dist/react-datepicker.css';

const CalenderModalTmp = ({ selectDate, data, originalData }) => {
  const [expenditureAddData, setExpenditureAddData] = useState({
    date: `${selectDate.year}-${selectDate.month}-${selectDate.day}`, // 날짜
    daysOfWeek: selectDate.daysOfWeek, // 요일
    amPm: selectDate.ampm, // 오전/오후
    hour: selectDate.hour, // 시간
    minute: selectDate.minute, // 분
    incomePrice: '', // 수입 금액
    expenditurePrice: '', // 지출 금액
    classificationSrc: '', // 분류 src
    classification: '', // 분류
    assetSrc: '', // 자산 src
    asset: '', // 자산
    memo: '', // 메모
    activeTab: '', // 수입/지출
  });

  /** add 버튼을 눌렀을 때 페이지를 체인지 하기 위한 상태를 저장합니다. */
  const [pageChange, setPageChange] = useState(false);
  /** Tab 버튼의 상태를 저장합니다. */
  const [activeTab, setActiveTab] = useState('수입');
  /** 분류의 현재 선택한 값이 담기는 State입니다. */
  const [classificationCurrentValue, setClassificationCurrentValue] =
    useState('');
  /** 자산의 현재 선택한 값이 담기는 State입니다. */
  const [assetCurrentValue, setAssetCurrentValue] = useState('');

  /** Chip을 open/close 해주는 State입니다. */
  const [classificationToggle, setClassificationToggle] = useState(false);
  const [assetToggle, setAssetToggle] = useState(false);

  console.log(originalData);
  /** 수입에 대한 금액을 모두 더한 값을 저장하는 변수입니다.
   * data 함수는 선택된 날짜의 데이터를 표시하고 있습니다.
   * reduce 함수는 배열의 각 요소에 대해 주어진 reducer 함수를 실행하고, 하나의 결과값을 반환합니다.
   * reduce 함수의 두번째 인자는 초기값을 의미합니다.
   */
  const incomeAmount = originalData.reduce((acc, cur) => {
    return cur.incomePrice ? acc + cur.incomePrice : acc;
  }, 0);

  const expenditureAmount = originalData.reduce((acc, cur) => {
    return cur.expenditurePrice ? acc + cur.expenditurePrice : acc;
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

  const saveRequestAddData = (value, name) => {
    const numericValue = parseInt(value);

    setExpenditureAddData({
      ...expenditureAddData,
      [name]:
        name === 'incomePrice' || name === 'expenditurePrice'
          ? numericValue
          : value,
    });
  };

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
                },
                index,
              ) => {
                return (
                  <div key={id}>
                    <tbody className="h-28 w-full border-b border-grayscaleC">
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
                  </div>
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
          {activeTab === '수입' && (
            <InComeTap
              selectDate={selectDate}
              addData={expenditureAddData ? expenditureAddData : null}
              setAddData={setExpenditureAddData}
              handlePageChangeToggle={handlePageChangeToggle}
              saveRequestAddData={saveRequestAddData}
              activeTab={activeTab}
            />
          )}
          {activeTab === '지출' && (
            <ExpenditureTap
              selectDate={selectDate}
              addData={expenditureAddData ? expenditureAddData : null}
              setAddData={setExpenditureAddData}
              handlePageChangeToggle={handlePageChangeToggle}
              saveRequestAddData={saveRequestAddData}
              activeTab={activeTab}
            />
          )}
        </>
      )}
    </section>
  );
};

export default CalenderModalTmp;
