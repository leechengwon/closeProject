import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import CustomInput from './CustomInput';
import Button from '../../Button/Button';
import ChipGroup from '../../Chip/ChipGroup';
import INCOME_DATA from '../../../data/IncomeData';
import ASSET_DATA from '../../../data/AssetData';
import 'react-datepicker/dist/react-datepicker.css';

const InComeTap = ({
  selectDate,
  addData,
  setAddData,
  handlePageChangeToggle,
  saveRequestAddData,
}) => {
  const selectedDate = `${selectDate.year}-${selectDate.month}-${selectDate.day}`;
  /** datepicker를 사용하기 위해 startDate를 저장합니다. 초기값은 클릭한 날짜입니다. */
  const [startDate, setStateDate] = useState(new Date(selectedDate));
  /** 분류 Chip Component를 open/close 해주는 State입니다. */
  const [expandedToggle, setExpandedToggle] = useState(false);
  /** 자산 Chip Component를 open/close 해주는 State입니다. */
  const [assetToggle, setAssetToggle] = useState(false);
  /** 분류의 현재 선택한 값이 담기는 State입니다. */
  const [expandCurrentValue, setExpandCurrentValue] = useState('');
  /** 자산의 현재 선택한 값이 담기는 State입니다. */
  const [assetCurrentValue, setAssetCurrentValue] = useState('');

  /** datepicker에서 date의 변화를 감지하고, 새로운 값을 저장시켜주는 함수입니다. */
  const handleDateChange = date => {
    setStateDate(date);
  };

  /** 분류를 onClick하면 value를 선택할 수 있도록 Chip을 open/close 해줍니다. */
  const handleExpandedToggle = () => {
    setExpandedToggle(!expandedToggle);
    setAssetToggle(false);
  };

  const handleAssetToggle = () => {
    setAssetToggle(!assetToggle);
    setExpandedToggle(false);
  };

  /** Chip 선택 시 선택된 value값을 CurrentValue로 바꿔주고, Expanded를 Close 시켜주는 함수입니다.*/
  const setExpandCurrentValueAndCloseModal = value => {
    setExpandCurrentValue(value);
    setExpandedToggle(false); // Close the modal when a chip is selected
  };

  const setAssetCurrentValueAndCloseModal = value => {
    setAssetCurrentValue(value);
    setAssetToggle(false);
  };

  return (
    <>
      <form>
        <fieldset>
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
                    selected={startDate}
                    onChange={handleDateChange}
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
                    onChange={e => saveRequestAddData(e.target.value, 'price')}
                    value={addData.price.toLocaleString('ko-KR')}
                  />
                </td>
              </tr>
              <tr className="h-5" />
              <tr
                className="cursor-pointer sm:text-14px md:text-16px lg:text-20px"
                onClick={handleExpandedToggle}
              >
                <th>분류</th>
                {expandCurrentValue ? (
                  <td className="td-border-b py-1 pl-2 font-bold">
                    {expandCurrentValue}
                  </td>
                ) : (
                  <td className="td-border-b py-1 pl-2">선택</td>
                )}
              </tr>
              <tr className="h-5" />
              <tr
                className="cursor-pointer sm:text-14px md:text-16px lg:text-20px "
                onClick={handleAssetToggle}
              >
                <th>자산</th>
                {assetCurrentValue ? (
                  <td className="td-border-b py-1 pl-2">{assetCurrentValue}</td>
                ) : (
                  <td className="td-border-b py-1 pl-2">선택</td>
                )}
              </tr>
              <tr className="h-5" />
              <tr className="sm:text-14px md:text-16px lg:text-20px">
                <th>내용</th>
                <td className="td-border-b">
                  <CustomInput
                    className="pl-2 font-bold sm:text-14px md:text-16px lg:text-20px"
                    placeholder="내용을 입력해주세요."
                    onChange={e => saveRequestAddData(e.target.value, 'memo')}
                    value={addData.memo}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex w-full items-center justify-center gap-3 pt-5">
            <Button type="submit" text="저장하기" />
            <Button
              text="취소"
              color="white"
              onClick={handlePageChangeToggle}
            />
          </div>
        </fieldset>
      </form>

      <div
        className={`${
          expandedToggle
            ? 'visible flex h-full w-full opacity-100'
            : 'invisible hidden opacity-0'
        } mt-5 items-center justify-center`}
      >
        <ChipGroup
          size="sm"
          ChipData={INCOME_DATA && INCOME_DATA}
          currentValue={expandCurrentValue}
          setCurrentValue={setExpandCurrentValueAndCloseModal}
        />
      </div>

      <div
        className={`${
          assetToggle
            ? 'flex h-full w-full opacity-100'
            : 'hidden h-0 w-0 opacity-0'
        } mt-5  items-center justify-center`}
      >
        <ChipGroup
          size="lg"
          ChipData={ASSET_DATA && ASSET_DATA}
          currentValue={assetCurrentValue}
          setCurrentValue={setAssetCurrentValueAndCloseModal}
        />
      </div>
    </>
  );
};

export default InComeTap;
