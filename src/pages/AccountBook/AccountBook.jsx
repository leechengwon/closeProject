import { useState } from 'react';
import Tap from '../../components/Tap/Tap';
import AccountBookItem from './components/AccountBookItem';
import { TAP_ACCOUNTBOOK_DATA } from '../../data/TapGroup';

const AccountBook = () => {
  /** Tab 컴포넌트에 필요한 useState 를 정의합니다.   */
  const [activeTab, setActiveTab] = useState('수입');

  /**클릭이벤트로 value값을 받는 클릭함수입니다. Tab 컴포넌트에서 사용합니다. */
  const handleTapClick = value => {
    setActiveTab(value);
  };

  //가상 데이터입니다.
  const expenses = [
    {
      id: 1,
      date: '2024-01-02',
      income: 10000000000,
      incomeTotal: 10000000000,
      expenditureTotal: 20000,
      total: 9998000,
      src: '../money-protector/images/Chip/chip_food.png',
      text: '식비',
      memo: '메모입니다.',
      daysOfWeek: '월요일',
      hour: '17',
      minute: '40',
      asset: '현금',
      type: '수입',
    },
    {
      id: 2,
      date: '2024-01-01',
      expenditure: 20000,
      incomeTotal: 10000000000,
      expenditureTotal: 20000,
      total: 10000000000,
      src: '../money-protector/images/Chip/chip_car.png',
      text: '교통차량',
      memo: '메모입니다.',
      daysOfWeek: '월요일',
      hour: '17',
      minute: '42',
      asset: '카드',
      type: '지출',
    },
  ];

  return (
    <main>
      <section className="mt-28">
        <Tap
          tapListData={TAP_ACCOUNTBOOK_DATA}
          onClick={handleTapClick}
          activeTab={activeTab}
        />
      </section>

      <section className="mt-8 flex w-full text-center">
        <div className="w-full text-[blue] sm:text-11px">
          {`${expenses[0].incomeTotal?.toLocaleString('ko-KR')}원`}
        </div>

        <div className="w-full text-[red] sm:text-11px ">
          {`${expenses[0].expenditureTotal?.toLocaleString('ko-KR')}원`}
        </div>

        <div className="w-full text-[green] sm:text-11px ">
          {`${expenses[0].total?.toLocaleString('ko-KR')}원`}
        </div>
      </section>

      <section className="mt-8 border-collapse">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border-b py-2 text-center sm:text-center md:text-center">
                날짜
              </th>

              <th className="border-b py-2 text-center sm:text-center md:text-center">
                카테고리
              </th>

              <th className="border-b py-2  text-center sm:text-center md:text-center">
                금액
              </th>

              <th className="border-b py-2 text-center">분류</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map(expense => (
              <AccountBookItem
                key={expense.id}
                date={expense.date}
                income={expense.income}
                type={expense.type}
                src={expense.src}
                text={expense.text}
                daysOfWeek={expense.daysOfWeek}
                expenditure={expense.expenditure}
                // onClick={onClick} 클릭이벤트함수를 정의합니다.
              />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default AccountBook;
