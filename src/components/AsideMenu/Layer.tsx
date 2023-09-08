import React from 'react';
import { mdiLogout, mdiClose } from '@mdi/js';
import Icon from '../Icon';
import AsideMenuItem from './Item';
import AsideMenuList from './List';
import { MenuAsideItem } from '../../interfaces';
import { useAppSelector } from '../../stores/hooks';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  menu: MenuAsideItem[];
  className?: string;
  onAsideLgCloseClick: () => void;
};

export default function AsideMenuLayer({
  menu,
  className = '',
  ...props
}: Props) {
  const asideStyle = useAppSelector((state) => state.style.asideStyle);
  const asideBrandStyle = useAppSelector(
    (state) => state.style.asideBrandStyle
  );
  const asideScrollbarsStyle = useAppSelector(
    (state) => state.style.asideScrollbarsStyle
  );
  const darkMode = useAppSelector((state) => state.style.darkMode);

  const logoutItem: MenuAsideItem = {
    label: 'Logout',
    icon: mdiLogout,
    color: 'info',
    isLogout: true,
    href: '/login',
  };

  const handleAsideLgCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onAsideLgCloseClick();
  };

  return (
    <aside
      className={`${className} zzz lg:py-2 lg:pl-2 w-60 lg:w-64 fixed flex z-40 top-0 h-screen transition-position overflow-hidden`}
    >
      <div
        className={`lg:rounded-2xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900 ${asideStyle}`}
      >
        <div
          className={`flex flex-row h-28 items-center justify-between dark:bg-slate-900 ${asideBrandStyle}`}
        >
          <div className="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0 h-fit">
            <Link href={'/acceptedbookings'} className={'w-fit h-fit'}>
              <Image
                src={'/dardoc/assets/logo.svg'}
                alt="dardoc-logo"
                className=" m-auto w-auto h-20"
              />
            </Link>
          </div>
          <button
            className="hidden lg:inline-block xl:hidden p-3"
            onClick={handleAsideLgCloseClick}
          >
            <Icon path={mdiClose} />
          </button>
        </div>
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden ${
            darkMode ? 'aside-scrollbars-[slate]' : asideScrollbarsStyle
          }`}
        >
          <AsideMenuList menu={menu} />
        </div>
        <ul>
          <AsideMenuItem item={logoutItem} />
        </ul>
      </div>
    </aside>
  );
}
