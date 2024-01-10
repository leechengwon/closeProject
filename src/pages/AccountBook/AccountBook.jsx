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
      date: '2024-01-10',
      category: '식비',
      price: '50000',
      type: '지출',
    },
    {
      id: 2,
      date: '2024-01-11',
      category: '교통비',
      price: '30000',
      type: '지출',
    },
    {
      id: 3,
      date: '2024-01-12',
      category: '월급',
      price: '1000000',
      type: '수입',
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
                <th className="px-4 py-2 text-left">날짜</th>
                <th className="px-4 py-2 text-left">카테고리</th>
                <th className="px-4 py-2 text-left">금액</th>
                <th className="px-4 py-2 text-left">지출/수입</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map(expense => (
                <AccountBookItem
                  key={expense.id}
                  date={expense.date}
                  category={expense.category}
                  price={expense.price}
                  type={expense.type}
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
