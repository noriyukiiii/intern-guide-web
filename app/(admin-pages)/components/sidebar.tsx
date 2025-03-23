'use client';

import {
  Table,
  LayoutDashboard,
  Home,
  Users,
  Building2,
  PanelTop,
  Megaphone,
  HousePlus,
  FilePen,
  FileX,
  ChartPie,
} from 'lucide-react';
import { SidebarDesktop } from './sidebar-desktop';
import { SidebarItems } from '@/lib/types';
import { SidebarButton } from './sidebar-button';
import { useMediaQuery } from 'usehooks-ts';
import { SidebarMobile } from './sidebar-mobile';

const sidebarItems: SidebarItems = {
  links: [
    { label: 'หน้าหลัก', href: '/', icon: Home },
    { label: 'แดชบอร์ด', href: '/admin/dashboard', icon: ChartPie },
    { label: 'บริษัท', href: '/admin/company-list', icon: Building2 },
    { label: 'ผู้ใช้', href: '/admin/user-list', icon: Users },
    { label: 'แบนเนอร์', href: '/admin/banner', icon: PanelTop },
    { label: 'ประกาศ', href: '/admin/newsbanner', icon: Megaphone },
    { label: 'คำขอเพิ่มบริษัท', href: '/admin/approvecompany', icon: HousePlus },
    { label: 'คำขอแก้ไขบริษัท', href: '/admin/appeal-edit-company', icon: FilePen },
    { label: 'คำขอยกเลิกการเลือกบริษัท', href: '/admin/appeal-cancel-company', icon: FileX },
  ],
  extras: (
    <div className='flex flex-col gap-2'>
      {/* <SidebarButton icon={MoreHorizontal} className='w-full'>
        More
      </SidebarButton>
      <SidebarButton
        className='w-full justify-center text-white'
        variant='default'
      >
        Tweet
      </SidebarButton> */}
    </div>
  ),
};

export function Sidebar() {
  const isDesktop = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}
