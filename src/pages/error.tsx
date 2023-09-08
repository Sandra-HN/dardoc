import React from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Button from '../components/Button';
import CardBox from '../components/CardBox';
import SectionFullScreen from '../components/Section/FullScreen';
import LayoutGuest from '../layouts/Guest';
import { getPageTitle } from '../config';
import Link from 'next/link';
import Image from 'next/image';

const ErrorPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Error')}</title>
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
              <h1 className="text-2xl">Unhandled exception</h1>

              <p>An Error Occurred</p>
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

ErrorPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};

export default ErrorPage;
