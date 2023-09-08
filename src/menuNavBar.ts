import {
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
} from '@mdi/js';
import { MenuNavBarItem } from './interfaces';

const menuNavBar: MenuNavBarItem[] = [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'My Profile',
        href: '/profile',
      },
      {
        icon: mdiCogOutline,
        label: 'Settings',
        href: '/settings',
      },
      {
        icon: mdiEmail,
        label: 'Notifications',
        href: '/notifications',
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: 'Log Out',
        isDesktoponly: true,
        isLogout: true,
        href: '/login',
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
  {
    icon: mdiLogout,
    label: 'Log out',
    href: '/login',
    isDesktopNoLabel: true,
    isLogout: true,
  },
];

export default menuNavBar;
