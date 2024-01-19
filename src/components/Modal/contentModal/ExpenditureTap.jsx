import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { customAxios } from '../../../API/API';
import CustomInput from './CustomInput';
import Button from '../../Button/Button';
import ChipGroup from '../../Chip/ChipGroup';
import EXPENDITURE_DATA from '../../../data/ExpenditureData';
import ASSET_DATA from '../../../data/AssetData';
import 'react-datepicker/dist/react-datepicker.css';

const ExpenditureTap = ({
  selectDate,
  addData,
  setAddData,
  handlePageChangeToggle,
  saveRequestAddData,
  activeTab,
}) => {
  const selectedDate = `${selectDate.year}-${selectDate.month}-${selectDate.day}`;
  /** datepicker를 사용하기 위해 startDate를 저장합니다. 초기값은 클릭한 날짜입니다. */
  const [startDate, setStateDate] = useState(new Date(selectedDate));
  /** 분류 Chip Component를 open/close 해주는 State입니다. */
  const [classificationToggle, setClassificationToggle] = useState(false);
  /** 자산 Chip Component를 open/close 해주는 State입니다. */
  const [assetToggle, setAssetToggle] = useState(false);
  /** 분류의 현재 선택한 값이 담기는 State입니다. */
  const [classificationCurrentValue, setClassificationCurrentValue] =
    useState('');
  /** 자산의 현재 선택한 값이 담기는 State입니다. */
  const [assetCurrentValue, setAssetCurrentValue] = useState('');
  /** startDate의 요일을 한국어 표기로 바꿔주는 메서드를 사용하였습니다.
   * 1. weekday: 'short'는 요일을 짧게 표기합니다. (long, short)
   * 2. timeZone: 'Asia/Seoul'은 한국 시간대로 표기합니다.
   */
  const daysOfWeekInKorean = startDate.toLocaleDateString('ko-KR', {
    weekday: 'short',
    timeZone: 'Asia/Seoul',
  });
  /** startDate의 AM/PM을 한국어 표기로 바꿔주는 메서드를 사용하였습니다.
   *  1. toLocaleTimeString() 메서드는 Date 객체의 시간을 문자열로 변환합니다.
   *  2. 그냥 메서드를 사용하면 오후 11:30:00 이런식으로 표기되기 때문에 slice 메서드를 사용하여 앞의 두 글자만 자릅니다.
   *  3. slice(0, 2)는 0번째 인덱스부터 2번째 인덱스 전까지 자릅니다.
   */
  const amPmInKorean = startDate.toLocaleTimeString().slice(0, 2);

  /** useEffect를 이용하여 post할 데이터의 변화가 감지될 때마다 변경된 데이터로 저장합니다.
   * 1. setAddData 함수는 CalenderModal.jsx에서 받아온 함수입니다.
   * 2. 스프레드 문법을 사용하여 기존의 데이터를 복사하고, 새로운 데이터를 추가합니다.
   * 3. format 함수는 date-fns 라이브러리를 사용하여 날짜를 원하는 형식으로 변환합니다.
   * 4. date에는 캘린더에서 선택된 날짜를 저장하는데, 형식은 yyyy-MM-dd 입니다.
   * 5. daysOfWeek에는 startDate의 요일을 한국어 표기로 바꾼 값을 저장합니다.
   * 6. amPm에는 startDate의 오전/오후를 저장합니다.
   * 7. hour에는 startDate의 시간을 저장합니다. (format 함수를 이용하여 00~11시로 표기)
   * 8. minute에는 startDate의 분을 저장합니다.
   * 9. classification에는 classificationCurrentValue의 값을 저장합니다.
   * 10. asset에는 assetCurrentValue의 값을 저장합니다.
   * 11. 값의 변경이 감지되면 classificationToggle과 assetToggle을 false로 바꿔줍니다.
   */
  useEffect(() => {
    setAddData({
      ...addData,
      date: format(startDate, 'yyyy-MM-dd'),
      daysOfWeek: daysOfWeekInKorean,
      amPm: amPmInKorean,
      hour: format(startDate, 'hh'),
      minute: format(startDate, 'mm'),
      classification: classificationCurrentValue,
      asset: assetCurrentValue,
      activeTab: activeTab,
    });

    setClassificationToggle(false);
    setAssetToggle(false);
  }, [classificationCurrentValue, assetCurrentValue, activeTab, startDate]);

  /** datepicker에서 date의 변화를 감지하고, 새로운 값을 저장시켜주는 함수입니다. */
  const handleDateChange = date => {
    setStateDate(date);
  };

  /** 분류의 선택을 위한 Chip Component의 open/close 하기위한 Toggle 입니다. */
  const handleClassificationToggle = () => {
    setClassificationToggle(!classificationToggle);
    setAssetToggle(false);
  };
  /** 자산의 선택을 위한 Chip Component의 open/close 하기위한 Toggle 입니다. */
  const handleAssetToggle = () => {
    setAssetToggle(!assetToggle);
    setClassificationToggle(false);
  };

  /** Chip 선택 시 선택된 value값을 CurrentValue로 바꿔주고, Component를 Close 시켜주는 함수입니다.*/
  const setClassificationCurrentValueAndCloseModal = value => {
    setClassificationCurrentValue(value);
    setClassificationToggle(false);
  };
  /** Chip 선택 시 선택된 value값을 CurrentValue로 바꿔주고, Component를 Close 시켜주는 함수입니다.*/
  const setAssetCurrentValueAndCloseModal = value => {
    setAssetCurrentValue(value);
    setAssetToggle(false);
  };
  /** Chip Component에서 src의 값을 받아와 저장하기 위한 함수입니다.
   * 1. Chip Component에서 src의 값을 받아와 저장합니다.
   * 2. setAddData 함수는 CalenderModal.jsx에서 받아온 함수입니다.
   * 3. 스프레드 문법을 사용하여 기존의 데이터를 복사하고, 새로운 데이터를 추가합니다.
   * 4. classificationSrc에는 classificationCurrentValue의 src 값을 저장합니다.
   * 5. assetSrc에는 assetCurrentValue의 src 값을 저장합니다.
   */
  const getClassificationSrcData = value => {
    setAddData({
      ...addData,
      classificationSrc: value,
    });
  };

  const getAssetSrcData = value => {
    setAddData({
      ...addData,
      assetSrc: value,
    });
  };

  const postClassificationDataOnSubmit = e => {
    // e.preventDefault();
    postClassificationData();
  };

  const postClassificationData = async () => {
    try {
      const request = await customAxios.post('/calender', addData);
      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form>
        <fieldset>
          <legend className="text-0px">지출</legend>
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
                    onChange={e =>
                      saveRequestAddData(e.target.value, 'expenditurePrice')
                    }
                    value={addData.expenditurePrice}
                  />
                </td>
              </tr>
              <tr className="h-5" />
              <tr
                className="cursor-pointer sm:text-14px md:text-16px lg:text-20px"
                onClick={handleClassificationToggle}
              >
                <th>분류</th>
                {classificationCurrentValue ? (
                  <td className="td-border-b py-1 pl-2 font-bold">
                    {classificationCurrentValue}
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
                onClick={handleAssetToggle}
              >
                <th>자산</th>
                {assetCurrentValue ? (
                  <td className="td-border-b py-1 pl-2">{assetCurrentValue}</td>
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
                    onChange={e => saveRequestAddData(e.target.value, 'memo')}
                    value={addData.memo}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex w-full items-center justify-center gap-3 pt-5">
            <Button
              type="submit"
              text="저장하기"
              onClick={postClassificationDataOnSubmit}
            />
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
          classificationToggle
            ? 'visible flex h-full w-full opacity-100'
            : 'invisible hidden opacity-0'
        } mt-5 items-center justify-center`}
      >
        <ChipGroup
          size="sm"
          ChipData={EXPENDITURE_DATA && EXPENDITURE_DATA}
          currentValue={classificationCurrentValue}
          setCurrentValue={setClassificationCurrentValueAndCloseModal}
          setAddData={getClassificationSrcData}
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
          setAddData={getAssetSrcData}
        />
      </div>
    </>
  );
};

export default ExpenditureTap;
