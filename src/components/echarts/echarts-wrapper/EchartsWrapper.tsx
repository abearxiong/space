import { useMount } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import echarts from 'echarts';

type Props = {
  option: any;
  style?: React.CSSProperties;
};
export const EchartsWrapper = ({ option, style }: Props) => {
  const EchartsRef = useRef(null);
  let chartInstance: any = null;
  useMount(() => {
    console.log('echart', echarts);
  });
  useEffect(() => {
    if (EchartsRef) {
      console.log('init', EchartsRef);
      if (!chartInstance) {
        const myChart = echarts.init(
          (EchartsRef.current as unknown) as HTMLDivElement,
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
        chartInstance = myChart;
      }
      //初始化echarts
      const o: any = option;
      if (chartInstance && option) {
        chartInstance.setOption(o);
        console.log('chartInstance', chartInstance);
      }
    } else {
      if (chartInstance && option) {
        chartInstance.setOption(option);
        console.log('chartInstance', chartInstance);
      }
    }
  }, [EchartsRef, option]);

  return (
    <div ref={EchartsRef} style={{ height: 400, ...style }}>
      loading
    </div>
  );
};
