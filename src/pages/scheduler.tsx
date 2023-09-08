import Head from 'next/head';
import type { ReactElement } from 'react';
import CardBox from '../components/CardBox';
import SchedulerSample from '../components/Scheduler/SchedulerSample';
import SectionMain from '../components/Section/Main';
import { getPageTitle } from '../config';
import LayoutAuthenticated from '../layouts/Authenticated';

const SchedulerPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Scheduling Tool')}</title>
      </Head>
      <SectionMain>
        <CardBox hasTable>
          <SchedulerSample />
        </CardBox>
      </SectionMain>
    </>
  );
};

// https://github.com/neuronetio/gantt-schedule-timeline-calendar

// https://gantt-schedule-timeline-calendar.neuronet.io/examples
SchedulerPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default SchedulerPage;
