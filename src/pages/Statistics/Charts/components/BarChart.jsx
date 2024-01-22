import React, { useEffect, useState } from 'react';
import ECharts from 'echarts-for-react';
import {
  getAllIncomeByMonth,
  getAllExpenditureByMonth,
} from '../../../../API/TEST_API';

/**
 * Bar Chart의 기본 설정을 저장합니다.
 */
const BAR_CHART_CONFIG = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['수입', '지출'],
    top: '0', // 탑 바텀 라이트 레프트 다양
    center: 'center', // 라이트 레프트 센터등 정렬
  },
  toolbox: {
    show: true,
    feature: {
      // dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      // restore: { show: true }, 새로고침을 기능 유무
      // saveAsImage: { show: true }, 그래프를 캡쳐나 저장할수있는 기능 유무
    },
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: Array(12)
        .fill()
        .map((_, i) => i + 1 + '월'), // 1월부터 12월까지 배열로 만들어줌
    },
  ],
  yAxis: [
    {
      type: 'value',
      width: 'auto',
    },
  ],
};

const { tooltip, legend, toolbox, calculable, xAxis, yAxis } = BAR_CHART_CONFIG;

const BarChart = () => {
  const [incomeChartData, setIncomeChartData] = useState(null);
  const [expenditureChartData, setExpenditureChartData] = useState(null);

  useEffect(() => {
    getAllIncomeByMonth().then(res => {
      setIncomeChartData(Object.values(res.data));
    });

    getAllExpenditureByMonth().then(res => {
      setExpenditureChartData(Object.values(res.data));
    });
  }, []);

  return (
    <div className="mb-20 w-full">
      <div className="my-14 flex w-full justify-center">
        <h2 className="text-30px">수입내역</h2>
      </div>

      <ECharts
        option={{
          tooltip,
          legend,
          toolbox,
          calculable,
          xAxis,
          yAxis,
          series: [
            {
              name: '수입',
              type: 'bar',
              data: incomeChartData,
            },
            {
              name: '지출',
              type: 'bar',
              data: expenditureChartData,
            },
          ],
        }}
        opts={{ width: 'auto', height: 'auto' }}
        className="text-sm md:text-[6px] lg:text-[4px]"
      />
    </div>
  );
};

export default BarChart;
