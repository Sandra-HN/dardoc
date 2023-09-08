import {
  mdiCalendarBlankOutline,
  mdiRefresh,
  mdiTimerAlertOutline,
} from '@mdi/js';
import Head from 'next/head';
import type { ReactElement } from 'react';
import CardBox from '../components/CardBox';
import CardBoxWidget from '../components/CardBox/Widget';
import SectionMain from '../components/Section/Main';
import TitleLineWithSubTitle from '../components/Section/TitleLineWithSubTitle';
import TableSampleBookings from '../components/Table/SampleBookings';
import { getPageTitle } from '../config';
import LayoutAuthenticated from '../layouts/Authenticated';

const ReportBookingsPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Upload Reports')}</title>
      </Head>
      <SectionMain>
        <TitleLineWithSubTitle
          main
          title="Upload Reports"
          subtitle="Find all booking that needs to be reported or have been delayed for reporting. Error in reported bookings? Now you can replace the report of patients in a booking."
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBoxWidget
            trendLabel="12%"
            trendType="up"
            trendColor="success"
            icon={mdiRefresh}
            iconColor="success"
            number={512}
            label="Reporting"
          />
          <CardBoxWidget
            trendLabel="16%"
            trendType="down"
            trendColor="danger"
            icon={mdiTimerAlertOutline}
            iconColor="info"
            number={777}
            // numberPrefix="$"
            label="Delayed reportings"
          />
          <CardBoxWidget
            trendLabel="20%"
            trendType="warning"
            trendColor="warning"
            icon={mdiCalendarBlankOutline}
            iconColor="danger"
            number={256}
            numberSuffix="%"
            label="Bookings till date"
          />
        </div>

        <CardBox hasTable>
          <TableSampleBookings bookingType={'Report'} />
        </CardBox>
      </SectionMain>
    </>
  );
};

ReportBookingsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default ReportBookingsPage;
