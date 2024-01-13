import React, { useEffect, useState } from 'react';
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
import ASSET_DATA from '../../data/AssetData';
import CustomInput from './Components/CustomInput';
import Button from '../Button/Button';
import 'react-datepicker/dist/react-datepicker.css';
import ExpenditureTap from './Components/expenditureTap';
import InComeTap from './Components/InComeTap';

const CalenderModal = ({ selectDate, data, originalData }) => {
  const [addData, setAddData] = useState({
    expenditure: '',
    income: '',
    memo: '',
    src: '',
    text: '',
    price: '',
    asset: '',
    daysOfWeek: selectDate.daysOfWeek,
    hour: selectDate.hour,
    minute: selectDate.minute,
  });
  /** add 버튼을 눌렀을 때 페이지를 체인지 하기 위한 상태를 저장합니다. */
  const [pageChange, setPageChange] = useState(false);
  /** Tab 버튼의 상태를 저장합니다. */
  const [activeTab, setActiveTab] = useState('수입');
  /** startDate에 newDate로 표시하기 위해 받아온 selectDate를 형식에 맞춘 후 변수에 담아줍니다. */
  const selectedDate = `${selectDate.year}-${selectDate.month}-${selectDate.day}`;
  /** datepicker를 사용하기 위해 startDate를 저장합니다. 초기값은 클릭한 날짜입니다. */
  const [startDate, setStateDate] = useState(new Date(selectedDate));
  /** 분류의 현재 선택한 값이 담기는 State입니다. */
  const [expandCurrentValue, setExpandCurrentValue] = useState('');
  /** 자산의 현재 선택한 값이 담기는 State입니다. */
  const [assetCurrentValue, setAssetCurrentValue] = useState('');

  /** Chip을 open/close 해주는 State입니다. */
  const [expandedToggle, setExpandedToggle] = useState(false);
  const [assetToggle, setAssetToggle] = useState(false);

  useEffect(() => {
    setAddData({
      ...addData,
      expenditure: expandCurrentValue,
      asset: assetCurrentValue,
    });

    setExpandedToggle(false);
    setAssetToggle(false);
  }, [expandCurrentValue, assetCurrentValue, activeTab]);

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

  const saveRequestAddData = (value, name) => {
    setAddData({
      ...addData,
      [name]: value,
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
          {activeTab === '수입' && (
            <InComeTap
              selectDate={selectDate}
              addData={addData ? addData : null}
              setAddData={setAddData}
              handlePageChangeToggle={handlePageChangeToggle}
              saveRequestAddData={saveRequestAddData}
            />
          )}
          {activeTab === '지출' && (
            <ExpenditureTap
              selectDate={selectDate}
              addData={addData ? addData : null}
              setAddData={setAddData}
              handlePageChangeToggle={handlePageChangeToggle}
              saveRequestAddData={saveRequestAddData}
            />
          )}
        </>
      )}
    </section>
  );
};

export default CalenderModal;
