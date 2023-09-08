import {
  mdiAccountCheck,
  mdiAccountMultipleOutline,
  mdiCalendarBlankOutline,
  mdiCarHatchback,
  mdiCog,
  mdiFileDocumentOutline,
  mdiPlusCircleOutline,
  mdiPoll,
} from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/acceptedbookings',
    icon: mdiPlusCircleOutline,
    label: 'New',
  },
  {
    href: '/assignedbookings',
    icon: mdiAccountCheck,
    label: 'Assigned',
  },
  {
    href: '/reportbookings',
    icon: mdiFileDocumentOutline,
    label: 'Reporting',
  },
  {
    href: '/scheduler',
    icon: mdiCalendarBlankOutline,
    label: 'Scheduling Tool',
  },
  {
    href: '/new-driver-scheduler',
    icon: mdiCarHatchback,
    label: 'Mobility Tool',
  },
  {
    href: '/team',
    icon: mdiAccountMultipleOutline,
    label: 'Staffing',
  },
  {
    href: '/traction',
    icon: mdiPoll,
    label: 'Revenue Tracker',
  },
  {
    href: '/settings',
    icon: mdiCog,
    label: 'Settings',
  },
];
export default menuAside;
