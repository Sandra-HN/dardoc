import Head from 'next/head';
import { ReactElement } from 'react';
import CardBox from '../components/CardBox';
import SectionMain from '../components/Section/Main';
import TitleLineWithSubTitle from '../components/Section/TitleLineWithSubTitle';
import TableSampleClients from '../components/Table/SampleClients';
import { getPageTitle } from '../config';
import LayoutAuthenticated from '../layouts/Authenticated';

const TeamPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Tables')}</title>
      </Head>
      <SectionMain>
        <TitleLineWithSubTitle
          main
          title="Staffing"
          subtitle="Central hub for managing your staff"
        />

        <CardBox className="mb-6" hasTable>
          <TableSampleClients />
        </CardBox>
      </SectionMain>
    </>
  );
};

TeamPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default TeamPage;
