import { useCallback, useEffect, useState } from 'react';
import Tap from '../../components/Tab/Tab';
import AccountBookItem from './components/AccountBookItem';
import { TAP_ACCOUNTBOOK_DATA } from '../../data/TapGroup';
import IconButton from '../../components/IconButton/IconButton';
import {
  getExpenditureTotalMoney,
  getIncomeTotalMoney,
  getAllMoneyData,
  getTotalMoney,
  postMoneyData,
  putMoneyDataById,
  deleteMoneyDataById,
} from '../../API/TEST_API';

import Modal from '../../components/Modal/Modal';
import ExpenseTab from '../../components/Modal/ExpenseTab/ExpenseTab';

const MODAL_TYPE = {
  NEW: {
    title: '수입/지출 입력하기',
  },
  DETAIL: {
    title: '내역 상세보기',
  },
};

const AccountBook = () => {
  /** Tab 컴포넌트에 필요한 useState 를 정의합니다.   */
  const [activeTab, setActiveTab] = useState('수입');

  const [modalType, setModalType] = useState(MODAL_TYPE.NEW);

  /**클릭이벤트로 value값을 받는 클릭함수입니다. Tab 컴포넌트에서 사용합니다. */
  const handleTapClick = value => {
    setActiveTab(value);
  };

  const [editModalPageToggle, setEditModalPageToggle] = useState(false);

  const [expenses, setExpenses] = useState([]);

  const [incomeTotal, setIncomeTotal] = useState(0);

  const [expenditureTotal, setExpenditureTotal] = useState(0);

  const [total, setTotal] = useState(0);

  const [clickedExpense, setClickedExpense] = useState({});

  /**
   * 필요한 데이터를 가져옵니다.
   * 1. 모든 수입/지출 데이터
   * 2. 모든 수입 총합 금액
   * 3. 모든 지출 총합 금액
   * 4. 모든 수입+지출 총합 금액
   */

  const getExpenseInfo = useCallback(() => {
    getAllMoneyData().then(data => {
      setExpenses(data.data);
    });

    getIncomeTotalMoney().then(data => {
      setIncomeTotal(data.data);
    });

    getExpenditureTotalMoney().then(data => {
      setExpenditureTotal(data.data);
    });

    getTotalMoney().then(data => {
      setTotal(data.data);
    });
  }, []);

  const deleteExpenseData = id => {
    deleteMoneyDataById(id);
    setEditModalPageToggle(false);
    getExpenseInfo();
  };

  useEffect(() => {
    getExpenseInfo();
  }, []);

  const showExpenseModal = data => {
    setModalType(data ? MODAL_TYPE.DETAIL : MODAL_TYPE.NEW);
    setClickedExpense(data);
    setEditModalPageToggle(true);
  };

  const requestSaveData = data => {
    if (modalType === MODAL_TYPE.NEW) {
      // 새로운 데이터를 업로드합니다.
      postMoneyData(data).then(data => {
        data.status === 200 && alert('저장되었습니다.');
      });
    } else {
      // 기존 데이터를 업데이트합니다.
      putMoneyDataById(data.id, data).then(data => {
        data.status === 200 && alert('수정되었습니다.');
      });
    }
    getExpenseInfo();
  };

  return (
    <main className="relative">
      <section className="mt-28">
        <Tap
          tapListData={TAP_ACCOUNTBOOK_DATA}
          onClick={handleTapClick}
          activeTab={activeTab}
        />
      </section>

      <section className="mt-8 flex w-full text-center">
        <div className="w-full text-[blue] sm:text-11px">
          {`${incomeTotal?.toLocaleString('ko-KR')}원`}
        </div>

        <div className="w-full text-[red] sm:text-11px ">
          {`${expenditureTotal?.toLocaleString('ko-KR')}원`}
        </div>

        <div className="w-full text-[green] sm:text-11px ">
          {`${total?.toLocaleString('ko-KR')}원`}
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
            {expenses.map(expense => {
              if (
                (activeTab !== '통합' && activeTab === expense.activeTab) ||
                activeTab == '통합'
              ) {
                return (
                  <AccountBookItem
                    key={expense.id}
                    date={expense.date}
                    income={expense.income}
                    activeTab={expense.activeTab}
                    classificationSrc={expense.classificationSrc}
                    classification={expense.classification}
                    daysOfWeek={expense.daysOfWeek}
                    price={
                      expense.incomePrice
                        ? expense.incomePrice
                        : expense.expenditurePrice
                    }
                    onClick={() => showExpenseModal(expense)}
                  />
                );
              }
            })}
          </tbody>
        </table>
        <IconButton
          className="absolute bottom-2 right-0 transition-all duration-300 hover:rotate-90 hover:scale-110"
          shape="add"
          onClick={() => showExpenseModal()}
        />
      </section>

      {editModalPageToggle && (
        <Modal
          title={modalType.title}
          content={
            <ExpenseTab
              expenseData={clickedExpense}
              saveInputExpenseData={requestSaveData}
              closeTab={() => setEditModalPageToggle(false)}
              removeExpenseData={
                modalType === MODAL_TYPE.NEW
                  ? null
                  : () => {
                      deleteExpenseData(clickedExpense.id);
                    }
              }
            />
          }
          size="lg"
          isCloseBtn={() => setEditModalPageToggle(false)}
          isModalOpen={editModalPageToggle}
          setIsModalOpen={setEditModalPageToggle}
        />
      )}
    </main>
  );
};

export default AccountBook;
