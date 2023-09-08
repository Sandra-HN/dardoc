import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import Button from '../components/Button';
import CardBox from '../components/CardBox';
import SectionFullScreen from '../components/Section/FullScreen';
import { getPageTitle } from '../config';
import LayoutGuest from '../layouts/Guest';

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen bg="hero">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <div className="flex flex-col w-full justify-center items-center content-center">
            <Link href="/">
              <Image
                src="/dardoc/assets/logo.svg"
                alt="logo"
                className="m-auto w-24 h-24"
              />
            </Link>
            <div className="space-y-3 text-center">
              <h1 className="text-2xl">404 | Page Not Found</h1>
            </div>
            <Button
              href="/acceptedbookings"
              label="Done"
              className="my-3"
              color="danger"
            />
          </div>
        </CardBox>
      </SectionFullScreen>
    </>
  );
};
Custom404.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};

export default Custom404;
