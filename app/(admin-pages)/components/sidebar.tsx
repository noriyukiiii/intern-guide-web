'use client';

import {
  Table,
  LayoutDashboard,
  Bookmark,
  Home,
  List,
  Mail,
  MoreHorizontal,
  User,
  Users,
} from 'lucide-react';
import { SidebarDesktop } from './sidebar-desktop';
import { SidebarItems } from '@/lib/types';
import { SidebarButton } from './sidebar-button';
import { useMediaQuery } from 'usehooks-ts';
import { SidebarMobile } from './sidebar-mobile';

const sidebarItems: SidebarItems = {
  links: [
    { label: 'หน้าหลัก', href: '/', icon: Home },
    { label: 'แดชบอร์ด', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'บริษัท', href: '/admin/company-list', icon: Table },
    { label: 'ผู้ใช้', href: '/admin/user-list', icon: Table },
    { label: 'แบนเนอร์', href: '/admin/banner', icon: Table },
    { label: 'ประกาศ', href: '/admin/newsbanner', icon: Table },
    { label: 'คำขอสร้างบริษัท', href: '/admin/approvecompany', icon: Table },
    { label: 'คำขอแก้ไขบริษัท', href: '/admin/appeal-edit-company', icon: Table },
    { label: 'คำขอยกเลิกบริษัท', href: '/admin/appeal-cancel-company', icon: Table },
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
