import React from 'react';
import ECharts from 'echarts-for-react';
import {
  CHART_BAR_EXPENDITURE_DATA,
  CHART_BAR_INCOME_DATA,
} from '../../../../data/ChartData';

const BarChart = () => {
  return (
    <div className="mb-20 w-full">
      <div className="my-14 flex w-full justify-center">
        <h2 className="text-30px">수입내역</h2>
      </div>

      <ECharts
        option={CHART_BAR_INCOME_DATA[0]}
        opts={{ width: 'auto', height: 'auto' }}
        className="text-sm md:text-[6px] lg:text-[4px]"
      />

      <div className="my-14 flex w-full justify-center">
        <h2 className="text-30px">지출내역</h2>
      </div>

      <ECharts
        option={CHART_BAR_EXPENDITURE_DATA[0]}
        opts={{ width: 'auto', height: 'auto' }}
      />
    </div>
  );
};

export default BarChart;
