import type { PropsWithChildren } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
