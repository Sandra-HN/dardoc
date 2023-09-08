import type { ReactElement } from 'react';
import LayoutAuthenticated from '../layouts/Authenticated';

import dynamic from 'next/dynamic';

const NewDriverSchedulerPage = () => {
  const MapComponent = dynamic(() => import('../components/Map/MapComponent'), {
    loading: () => <>Loading...</>,
    ssr: false,
  });

  return <MapComponent />;
  // return (
  //   <>
  //     <Head>
  //       <title>{getPageTitle('Dashboard')}</title>
  //     </Head>
  //     <SectionMain>
  //       <MapComponent />
  //     </SectionMain>
  //   </>
  // );
};

NewDriverSchedulerPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default NewDriverSchedulerPage;
