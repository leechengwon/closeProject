import { useState } from 'react';
import Tap from '../../components/Tap/Tap';
import { TAP_ACCOUNTBOOK_DATA } from '../../data/TapGroup';
import AccountBookItem from './components/AccountBookItem';

const AccountBook = () => {
  /** Tab 컴포넌트에 필요한 useState 를 정의합니다.   */
  const [activeTab, setActiveTab] = useState('수입');

  /**클릭이벤트로 value값을 받는 클릭함수입니다. Tab 컴포넌트에서 사용합니다. */
  const handleTapClick = value => {
    setActiveTab(value);
  };

  const expenses = [
    {
      id: 1,
      date: '2024-01-01',
      income: 1000000000,
      total: 10000000,
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
      total: 9998000,
      src: '../money-protector/images/Chip/chip_bonus.png',
      text: '대중교통',
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
      <section>
        <Tap
          tapListData={TAP_ACCOUNTBOOK_DATA}
          onClick={handleTapClick}
          activeTab={activeTab}
        />
        <div className="App">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 text-left sm:text-center md:text-center">
                  날짜
                </th>
                <th className="py-2 text-left sm:text-center md:text-center">
                  카테고리
                </th>
                <th className="py-2 text-left sm:text-center md:text-center">
                  금액
                </th>
                <th className="py-2 text-left">분류</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map(expense => (
                <AccountBookItem
                  key={expense.id}
                  date={expense.date}
                  category={expense.category}
                  income={expense.income}
                  expenditure={expense.expenditure}
                  type={expense.type}
                  src={expense.src}
                  text={expense.text}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default AccountBook;
