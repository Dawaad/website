import type { PortfolioUser } from '@/lib/types/portfolio';

interface TitleBarProps {
  user: PortfolioUser;
}

export function TitleBar({ user }: TitleBarProps) {
  return (
    <div className="relative z-[2] flex flex-none items-center gap-4 border-b border-fg-4 bg-bg-0 px-4 py-2.5">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-dim" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-dim" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg-3" />
      </div>
      <div className="truncate text-[11px] uppercase tracking-[0.1em] text-fg-2">
        <b className="font-medium text-fg-0">{user.handle}@signal</b> &nbsp;:&nbsp; ~/portfolio
        &nbsp;—&nbsp; tty.0
      </div>
      <div className="flex-1" />
      <div className="flex flex-none gap-3 whitespace-nowrap text-[10.5px] tracking-[0.08em] text-fg-3">
        <span className="text-fg-1 max-md:hidden">tls 1.3</span>
        <span className="text-fg-4 max-md:hidden">│</span>
        <span className="text-fg-1">04:21:08</span>
        <span className="text-fg-4 max-md:hidden">│</span>
        <span className="text-fg-1 max-md:hidden">v3.0.2</span>
      </div>
    </div>
  );
}
