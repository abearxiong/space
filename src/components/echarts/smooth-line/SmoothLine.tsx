import { useMount } from 'ahooks';
import React, { useEffect, useRef } from 'react';
// import echarts from 'echarts';

const echarts: any = '';
const options = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ],
};

type Props = {
  //
};

export const SmoothLine = (props: Props) => {
  const LineRef = useRef(null);
  let chartInstance: any = null;
  useMount(() => {
    console.log('echart', echarts);
  });
  useEffect(() => {
    if (LineRef) {
      console.log('init', LineRef);
      const myChart = echarts.init(
        (LineRef.current as unknown) as HTMLDivElement,
      ); //初始化echarts
      const o: any = options;
      if (myChart) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        chartInstance = myChart;
        chartInstance.setOption(o);
        console.log('myChart', chartInstance);
      }
    }
  }, [LineRef]);
  return (
    <div ref={LineRef} style={{ height: 400 }}>
      hhh
    </div>
  );
};
