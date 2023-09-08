import {
  mdiAlert,
  mdiAlertCircle,
  mdiCheckCircle,
  mdiContrastCircle,
  mdiInformation,
} from '@mdi/js';
import { Formik } from 'formik';
import Head from 'next/head';
import type { ReactElement } from 'react';
import Button from '../components/Button';
import NotificationBar from '../components/NotificationBar';
import SectionMain from '../components/Section/Main';
import TitleLineWithSubTitle from '../components/Section/TitleLineWithSubTitle';
import { getPageTitle } from '../config';
import LayoutAuthenticated from '../layouts/Authenticated';

const NotificationsPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Notifications')}</title>
      </Head>
      <SectionMain>
        <Formik initialValues={{ outline: false }} onSubmit={() => null}>
          {({ values }) => (
            <>
              <TitleLineWithSubTitle main title="Notifications" subtitle="" />
              <SectionMain>
                <NotificationBar
                  color="info"
                  icon={mdiInformation}
                  button={
                    <Button
                      color={values.outline ? 'info' : 'white'}
                      label="Button"
                      roundedFull
                      small
                      outline={values.outline}
                    />
                  }
                  outline={values.outline}
                >
                  <b>Info state</b>. NotificationBar
                </NotificationBar>

                <NotificationBar
                  color="success"
                  icon={mdiCheckCircle}
                  button={
                    <Button
                      color={values.outline ? 'success' : 'white'}
                      label="Button"
                      roundedFull
                      small
                      outline={values.outline}
                    />
                  }
                  outline={values.outline}
                >
                  <b>Success state</b>. NotificationBar
                </NotificationBar>

                <NotificationBar
                  color="warning"
                  icon={mdiAlert}
                  button={
                    <Button
                      color={values.outline ? 'warning' : 'white'}
                      label="Button"
                      roundedFull
                      small
                      outline={values.outline}
                    />
                  }
                  outline={values.outline}
                >
                  <b>Warning state</b>. NotificationBar
                </NotificationBar>

                <NotificationBar
                  color="danger"
                  icon={mdiAlertCircle}
                  button={
                    <Button
                      color={values.outline ? 'danger' : 'white'}
                      label="Button"
                      roundedFull
                      small
                      outline={values.outline}
                    />
                  }
                  outline={values.outline}
                >
                  <b>Danger state</b>. NotificationBar
                </NotificationBar>

                <NotificationBar
                  color="contrast"
                  icon={mdiContrastCircle}
                  outline={values.outline}
                >
                  <b>Contrast</b>. NotificationBar
                </NotificationBar>
              </SectionMain>
            </>
          )}
        </Formik>
      </SectionMain>
    </>
  );
};

NotificationsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default NotificationsPage;
