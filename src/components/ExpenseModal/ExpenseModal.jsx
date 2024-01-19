import React, { useEffect, useState } from 'react';
import { TAP_DATA } from '../../data/TapGroup';
import Tap from '../Tap/Tap';
import ExpenseTab from '../ExpenseTab/ExpenseTab';

const ExpenseModal = ({ expenseData, saveInputExpenseData, closeModal }) => {
  const [activeTab, setActiveTab] = useState('수입');

  const [inputExpenseData, setInputExpenseData] = useState({});

  useEffect(() => {
    if (expenseData) {
      const copyData = { ...expenseData };
      setInputExpenseData(copyData);
    }
  }, [expenseData]);

  const handleTapClick = value => {
    setActiveTab(value);
  };

  /* ExpenseTab에 작성한 데이터를 저장합니다. */
  const saveExpenseData = () => {
    // 지출/수입 금액을 0으로 초기화해서 저장합니다.
    if (activeTab === '수입') {
      saveInputExpenseData({
        ...inputExpenseData,
        expenditurePrice: 0,
        activeTab,
      });
    } else {
      saveInputExpenseData({
        ...inputExpenseData,
        incomePrice: 0,
        activeTab,
      });
    }
    closeModal();
  };

  return (
    <>
      <div>
        <Tap
          tapListData={TAP_DATA}
          onClick={handleTapClick}
          activeTab={activeTab}
        />
      </div>

      <ExpenseTab
        activeTab={activeTab}
        expenseData={inputExpenseData}
        setExpenseData={setInputExpenseData}
        closeTab={closeModal}
        saveExpenseData={saveExpenseData}
      />
    </>
  );
};

export default ExpenseModal;
