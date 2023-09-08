import Head from 'next/head';
import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import CardBox from '../components/CardBox';
import ChartDoughnutSample from '../components/ChartDoughnutSample';
import { sampleChartData as DoughnutChartData } from '../components/ChartDoughnutSample/config';
import ChartLineSample from '../components/ChartLineSample';
import { sampleChartData as LinearChartData } from '../components/ChartLineSample/config';
import ChartPieSample from '../components/ChartPieSample';
import { sampleChartData as PieChartData } from '../components/ChartPieSample/config';
import SectionMain from '../components/Section/Main';
import TitleLineWithSubTitle from '../components/Section/TitleLineWithSubTitle';
import TableSampleClients from '../components/Table/SampleClients';
import { getPageTitle } from '../config';
import LayoutAuthenticated from '../layouts/Authenticated';

const RevenueTrackerPage = () => {
  const [chartData, setChartData] = useState(LinearChartData());
  const [chartDataDoughnut, setChartDataDoughnut] = useState(
    DoughnutChartData()
  );
  const [chartDataPie, setChartDataPie] = useState(PieChartData);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(LinearChartData());
      setChartDataDoughnut(DoughnutChartData());
      setChartDataPie(PieChartData());
    }, 5000);

    return () => {
      //we return a "cleanup" function that will be called on unmount, since we've set an interval we also need to clear it later.
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{getPageTitle('Revenue Tracker')}</title>
      </Head>
      <SectionMain>
        <TitleLineWithSubTitle
          main
          title="Revenue Tracker"
          subtitle="Get insights on all transactions"
        />

        {/* <SectionTitleLineWithButton icon={mdiChartPie} title="Trends overview">
          <Button icon={mdiReload} color="whiteDark" onClick={fillChartData} />
        </SectionTitleLineWithButton> */}

        <CardBox className="mb-6">
          {chartData && <ChartLineSample data={chartData} />}
        </CardBox>
        <div className="flex w-full justify-center items-center content-center flex-col lg:flex-row ">
          <CardBox className="mb-6 w-1/2 lg:w-full">
            {chartDataPie && <ChartPieSample data={chartDataPie} />}
          </CardBox>
          <CardBox className="mb-6 w-1/2 lg:w-full">
            {chartDataDoughnut && (
              <ChartDoughnutSample data={chartDataDoughnut} />
            )}
          </CardBox>
        </div>
        <CardBox hasTable>
          <TableSampleClients />
        </CardBox>
      </SectionMain>
    </>
  );
};

RevenueTrackerPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default RevenueTrackerPage;
