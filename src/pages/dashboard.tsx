import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
} from '@mdi/js';
import Head from 'next/head';
import type { ReactElement } from 'react';
import React, { useState } from 'react';
import Button from '../components/Button';
import CardBox from '../components/CardBox';
import CardBoxClient from '../components/CardBox/Client';
import CardBoxTransaction from '../components/CardBox/Transaction';
import CardBoxWidget from '../components/CardBox/Widget';
import ChartLineSample from '../components/ChartLineSample';
import { sampleChartData } from '../components/ChartLineSample/config';
import NotificationBar from '../components/NotificationBar';
import SectionMain from '../components/Section/Main';
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton';
import TableSampleClients from '../components/Table/SampleClients';
import { getPageTitle } from '../config';
import { useSampleClients, useSampleTransactions } from '../hooks/sampleData';
import { Client, Transaction } from '../interfaces';
import LayoutAuthenticated from '../layouts/Authenticated';

const DashboardPage = () => {
  const { clients } = useSampleClients();
  const { transactions } = useSampleTransactions();

  const clientsListed = clients.slice(0, 4);

  const [chartData, setChartData] = useState(sampleChartData());

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault();

    setChartData(sampleChartData());
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBoxWidget
            trendLabel="12%"
            trendType="up"
            trendColor="success"
            icon={mdiAccountMultiple}
            iconColor="success"
            number={512}
            label="Clients"
          />
          <CardBoxWidget
            trendLabel="16%"
            trendType="down"
            trendColor="danger"
            icon={mdiCartOutline}
            iconColor="info"
            number={7770}
            numberPrefix="$"
            label="Sales"
          />
          <CardBoxWidget
            trendLabel="Overflow"
            trendType="warning"
            trendColor="warning"
            icon={mdiChartTimelineVariant}
            iconColor="danger"
            number={256}
            numberSuffix="%"
            label="Performance"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col justify-between">
            {transactions.map((transaction: Transaction) => (
              <CardBoxTransaction
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </div>
          <div className="flex flex-col justify-between">
            {clientsListed.map((client: Client) => (
              <CardBoxClient key={client.id} client={client} />
            ))}
          </div>
        </div>

        <SectionTitleLineWithButton icon={mdiChartPie} title="Trends overview">
          <Button icon={mdiReload} color="whiteDark" onClick={fillChartData} />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6">
          {chartData && <ChartLineSample data={chartData} />}
        </CardBox>

        <SectionTitleLineWithButton icon={mdiAccountMultiple} title="Clients" />

        <NotificationBar color="info" icon={mdiMonitorCellphone}>
          <b>Responsive table.</b> Collapses on mobile
        </NotificationBar>

        <CardBox hasTable>
          <TableSampleClients />
        </CardBox>
      </SectionMain>
    </>
  );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default DashboardPage;
