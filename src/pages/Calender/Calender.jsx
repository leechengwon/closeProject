import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import RenderHeader from './components/RenderHeader';
import RenderDays from './components/RenderDays';
import RenderCells from './components/RenderCells';
import Portal from '../../components/Portal/Portal';
import Modal from '../../components/Modal/Modal';
import CalenderModal from '../../components/Modal/CalenderModal';

/**
 * 캘린더 페이지 입니다.
 * 수입/지출 내역을 확인할 수 있습니다.
 * @returns
 */
const Calender = () => {
  /** 현재 실제 날짜의 데이터를 저장합니다.  */
  const [currentMonth, setCurrentMonth] = useState(new Date());
  /** 선택한 날짜의 데이터를 저장합니다. */
  const [selectedDate, setSelectedDate] = useState(new Date());
  /** Modal의 Open/Close 여부를 저장합니다. */
  const [isModalOpen, setIsModalOpen] = useState(false);
  /** 해당 날짜의 요일을 구하기 위해 해당 배열의 숫자를 표시할 변수를 만들어줍니다.
   * getDay() 함수는 해당 날짜의 요일을 숫자로 반환합니다.
   * EX) 일요일 = 0, 월요일 = 1, 화요일 = 2, 수요일 = 3, 목요일 = 4, 금요일 = 5, 토요일 = 6
   */
  const daysOfWeek = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];

  /** Modal Component에 표시할 날짜 데이터를 변수로 저장합니다. */
  const date = {
    year: selectedDate?.getFullYear(),
    month:
      selectedDate?.getMonth() + 1 < 10
        ? `0${selectedDate?.getMonth() + 1}`
        : selectedDate?.getMonth() + 1,
    day:
      selectedDate?.getDate() < 10
        ? `0${selectedDate?.getDate()}`
        : selectedDate?.getDate(),
    ampm: currentMonth.toLocaleTimeString().slice(0, 2),
    hour: currentMonth?.getHours(),
    minute: currentMonth?.getMinutes(),
    daysOfWeek: daysOfWeek[selectedDate?.getDay()],
  };

  const dateWrap = `${date.year}-${date.month}-${date.day}`;

  const filterDate = CALENDER_DATA.filter(date => date.date === dateWrap);

  /** onClick 시 이전 달로 이동 시키기 위한 함수 입니다.
   * subMonths 함수는 date-fns 라이브러리에서 제공하는 함수로 현재 날짜에서 원하는 달 만큼 빼는 함수 입니다.
   */
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  /** onClick 시 다음 달로 이동 시키기 위한 함수 입니다.
   * addMonths 함수는 date-fns 라이브러리에서 제공하는 함수로 현재 날짜에서 원하는 달 만큼 더하는 함수 입니다.
   */
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  /** onClick 시 선택한 날짜의 데이터를 저장하기 위한 함수 입니다. */
  const onDateClick = day => {
    setSelectedDate(day);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <main className="pb-24">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        data={CALENDER_DATA ? CALENDER_DATA : null}
      />
      <Portal>
        {isModalOpen && (
          <Modal
            title="내역 상세보기"
            content={
              <CalenderModal
                selectDate={date}
                data={filterDate && filterDate}
                originalData={CALENDER_DATA}
              />
            }
            size="lg"
            isCloseBtn={true}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </Portal>
    </main>
  );
};

export default Calender;

const CALENDER_DATA = [
  {
    id: 1,
    date: '2024-01-01',
    income: 10000000,
    total: 10000000,
    src: '../money-protector/images/Chip/chip_food.png',
    text: '식비',
    memo: '메모입니다.',
    daysOfWeek: '월',
    hour: '17',
    minute: '40',
    asset: '현금',
  },
  {
    id: 2,
    date: '2024-01-01',
    expenditure: 20000,
    total: 9998000,
    src: '../money-protector/images/Chip/chip_food.png',
    text: '식비',
    memo: '메모입니다.',
    daysOfWeek: '월',
    hour: '17',
    minute: '42',
    asset: '카드',
  },

  {
    id: 3,
    date: '2024-01-02',
    income: 30000,
    total: 10001000,
    src: '../money-protector/images/Chip/chip_shop.png',
    text: '마트/편의점',
    memo: '메모입니다.메모입니다.메모입니다.메모입니다.메모입니다.',
    daysOfWeek: '화',
    hour: '18',
    minute: '22',
    asset: '카드',
  },
  {
    id: 4,
    date: '2024-01-13',
    income: 550000,
    total: 10001000,
    src: '../money-protector/images/Chip/chip_shop.png',
    text: '마트/편의점',
    memo: '메모입니다.메모입니다.메모입니다.메모입니다.메모입니다.',
    daysOfWeek: '토',
    hour: '19',
    minute: '22',
    asset: '카드',
  },
];
