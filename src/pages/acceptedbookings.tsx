import {
  mdiCalendarBlankOutline,
  mdiCalendarCheckOutline,
  mdiRefresh,
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

const AcceptedBookingsPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('New Bookings')}</title>
      </Head>
      <SectionMain>
        <TitleLineWithSubTitle
          main
          title="New Bookings"
          subtitle="Get access to all new bookings, search patients and view their status in detail. You can also export the details in Excel and print a quick schedule for your team."
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBoxWidget
            trendLabel="12%"
            trendType="up"
            trendColor="success"
            icon={mdiCalendarCheckOutline}
            iconColor="success"
            number={50}
            label="Accepted bookings"
          />
          <CardBoxWidget
            trendLabel="16%"
            trendType="down"
            trendColor="danger"
            icon={mdiRefresh}
            iconColor="info"
            number={100}
            // numberPrefix="$"
            label="Processing"
          />
          <CardBoxWidget
            trendLabel="20%"
            trendType="warning"
            trendColor="warning"
            icon={mdiCalendarBlankOutline}
            iconColor="danger"
            number={300}
            numberSuffix="%"
            label="Bookings till date"
          />
        </div>

        {/* <NotificationBar color="info" icon={mdiMonitorCellphone}>
          <b>Responsive table.</b> Collapses on mobile
        </NotificationBar> */}

        <CardBox hasTable>
          <TableSampleBookings bookingType={'New'} />
        </CardBox>
      </SectionMain>
    </>
  );
};

AcceptedBookingsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default AcceptedBookingsPage;
