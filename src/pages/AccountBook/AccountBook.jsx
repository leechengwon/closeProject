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
import ExpenseBoxTab from '../../components/Modal/ExpenseBoxTab/ExpenseBoxTab';
import Pagination from '../../components/Pagination/Pagination';

const MODAL_TYPE = {
  NEW: {
    title: '수입/지출 입력하기',
  },
  DETAIL: {
    title: '내역 상세보기',
  },
};

const pageSize = 6; // 페이지당 항목 수

const AccountBook = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  /** Tab 컴포넌트에 필요한 useState 를 정의합니다.   */
  const [modalType, setModalType] = useState(MODAL_TYPE.NEW);

  const [activeTab, setActiveTab] = useState('통합');
  /**클릭이벤트로 value값을 받는 클릭함수입니다. Tab 컴포넌트에서 사용합니다. */
  const handleTapClick = value => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  const [editModalPageToggle, setEditModalPageToggle] = useState(false);

  const [expenseList, setExpenseList] = useState([]);
  const [clickedExpense, setClickedExpense] = useState({});

  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenditureTotal, setExpenditureTotal] = useState(0);
  const [total, setTotal] = useState(0);

  /**
   * 필요한 데이터를 가져옵니다.
   * 1. 모든 수입/지출 데이터
   * 2. 모든 수입 총합 금액
   * 3. 모든 지출 총합 금액
   * 4. 모든 수입+지출 총합 금액
   */
  const getExpenseInfo = useCallback(() => {
    getAllMoneyData(currentPage, pageSize, activeTab).then(response => {
      setExpenseList(response.data);
      setTotalPages(Math.ceil(response.totalItems / pageSize));
    });

    // 모든 수입 총합 금액을 가져옵니다.
    getIncomeTotalMoney().then(data => {
      setIncomeTotal(data.data);
    });

    // 모든 지출 총합 금액을 가져옵니다.
    getExpenditureTotalMoney().then(data => {
      setExpenditureTotal(data.data);
    });

    // 모든 수입 - 지출 총합 금액을 가져옵니다.
    getTotalMoney().then(data => {
      setTotal(data.data);
    });
  }, [currentPage, pageSize, activeTab]);

  useEffect(() => {
    // 필요한 모든 데이터를 가져옵니다.
    getExpenseInfo();
  }, [getExpenseInfo, currentPage]);

  /**
   * id에 해당하는 데이터를 삭제합니다.
   * @param {*} id
   * 데이터를 삭제하면 DB에서 삭제된 데이터를 제외한 데이터를 가져옵니다.
   */
  const deleteExpenseData = id => {
    deleteMoneyDataById(id).then(data => {
      data.status === 200 && alert('삭제되었습니다.');
      setEditModalPageToggle(false);
      getExpenseInfo();
    });
  };

  /**
   * Modal을 열어줍니다.
   * @param {*} data
   * data가 있으면 DETAIL 모달을, (수정을 위함)
   * data가 없으면 NEW 모달을 엽니다. (새로운 데이터를 추가하기 위함)
   */
  const showExpenseModal = data => {
    setModalType(data ? MODAL_TYPE.DETAIL : MODAL_TYPE.NEW);
    setClickedExpense(data);
    setEditModalPageToggle(true);
  };

  /**
   * 데이터를 저장합니다.
   * @param {*} data
   * data가 있으면 기존 데이터를 수정하고,
   * data가 없으면 새로운 데이터를 추가합니다.
   * 데이터가 저장되면 DB에서 업데이트된 데이터를 가져옵니다.
   * 데이터가 저장되면 모달을 닫습니다.
   */
  const requestSaveData = data => {
    if (modalType === MODAL_TYPE.NEW) {
      // 새로운 데이터를 업로드합니다.
      postMoneyData(data).then(data => {
        data.status === 200 && alert('저장되었습니다.');
        getExpenseInfo();
      });
    } else {
      // 기존 데이터를 업데이트합니다.
      putMoneyDataById(data.id, data).then(data => {
        data.status === 200 && alert('수정되었습니다.');
        getExpenseInfo();
      });
    }
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
        <div className="w-full text-[green] sm:text-11px ">
          {`${total?.toLocaleString('ko-KR')}원`}
        </div>

        <div className="w-full text-[blue] sm:text-11px">
          {`${incomeTotal?.toLocaleString('ko-KR')}원`}
        </div>

        <div className="w-full text-[red] sm:text-11px ">
          {`${expenditureTotal?.toLocaleString('ko-KR')}원`}
        </div>
      </section>

      <section className="mb-32 mt-8 border-collapse">
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
            {expenseList.map(expense => {
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

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPages}
          pageLimit={5} // 이 예에서는 페이지네이션 컨트롤에 5개의 페이지 번호를 표시합니다
        />

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
            <ExpenseBoxTab
              expenseData={clickedExpense}
              saveInputExpenseData={requestSaveData}
              closeTab={() => setEditModalPageToggle(false)}
              cancel={() => setEditModalPageToggle(false)}
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
