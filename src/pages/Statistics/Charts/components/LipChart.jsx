import React, { useEffect, useMemo, useState } from 'react';
import ECharts from 'echarts-for-react';
import {
  CHART_INCOME_DATA,
  CHART_EXPENDITURE_DATA,
} from '../../../../data/ChartData';
import {
  getAllIncomeByClassification,
  getAllExpenditureByClassification,
} from '../../../../API/TEST_API';

const Chart = () => {
  const [incomeChartData, setIncomeChartData] = useState(null);
  const [expenditureChartData, setExpenditureChartData] = useState(null);

  useEffect(() => {
    getAllIncomeByClassification().then(res => {
      const data = res.data.map(item => ({
        value: item.price,
        name: item.classification,
        formattedValue: item.price.toLocaleString(),
      }));
      CHART_INCOME_DATA.series[0].data = data;
      setIncomeChartData(CHART_INCOME_DATA);
    });

    getAllExpenditureByClassification().then(res => {
      const data = res.data.map(item => ({
        value: item.price,
        name: item.classification,
        formattedValue: item.price.toLocaleString(),
      }));
      console.log('지출', res.data);
      CHART_EXPENDITURE_DATA.series[0].data = data;
      setExpenditureChartData(CHART_EXPENDITURE_DATA);
    });
  }, []);

  return (
    <div className="mb-20 w-full">
      <div className="my-14 flex w-full justify-center">
        <h2 className="text-30px">수입내역</h2>
      </div>
      {incomeChartData ? (
        <ECharts
          option={incomeChartData}
          opts={{ width: 'auto', height: 'auto' }}
          className="text-sm md:text-[6px] lg:text-[4px]"
        />
      ) : null}

      <div className="my-14 flex w-full justify-center">
        <h2 className="text-30px">지출내역</h2>
      </div>

      {expenditureChartData ? (
        <ECharts
          option={expenditureChartData}
          opts={{ width: 'auto', height: 'auto' }}
        />
      ) : null}
    </div>
  );
};

export default Chart;
