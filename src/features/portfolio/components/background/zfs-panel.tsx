import type { FC } from 'react';

const ZFS_LIST: [name: string, used: string, avail: string, refer: string, mnt: string][] = [
  ['zroot', '103G', '346G', '96K', 'none'],
  ['zroot/ROOT', '103G', '346G', '96K', 'none'],
  ['zroot/ROOT/sway', '103G', '346G', '70.2G', '/'],
  ['zroot/ROOT/void', '8K', '346G', '69.6G', '/'],
];

const SNAPSHOTS = [
  '2023-12-26-142725',
  '2023-12-26-204113',
  '2023-12-26-205046',
  '2023-12-26-215821',
  '2023-12-26-215932',
  '2023-12-26-220806',
  '2023-12-27-002848',
  '2023-12-27-163425',
  '2023-12-27-200159',
  '2023-12-27-200344',
];

/** Faux shell session running `zfs list` and snapshot queries. */
export const ZfsPanel: FC = () => {
  return (
    <div className="flex h-full flex-col gap-[3px] overflow-hidden font-mono text-[8.5px] leading-[1.4]">
      <div className="text-fg-3">regn % zfs version</div>
      <div className="text-fg-1">zfs-2.2.2-1</div>
      <div className="text-fg-1">zfs-kmod-2.2.2-1</div>
      <div className="text-fg-3">regn % zfs list</div>
      <div className="flex text-amber">
        <span className="w-[44%]">NAME</span>
        <span className="w-[14%]">USED</span>
        <span className="w-[14%]">AVAIL</span>
        <span className="w-[14%]">REFER</span>
        <span className="w-[14%]">MOUNTPOINT</span>
      </div>
      {ZFS_LIST.map(([name, used, avail, refer, mnt], i) => (
        <div key={i} className="flex text-fg-2">
          <span className="w-[44%] truncate text-fg-1">{name}</span>
          <span className="w-[14%]">{used}</span>
          <span className="w-[14%]">{avail}</span>
          <span className="w-[14%]">{refer}</span>
          <span className="w-[14%]">{mnt}</span>
        </div>
      ))}
      <div className="text-fg-3">
        regn % zfs list <span className="text-cyan">-o</span> name <span className="text-cyan">-t</span> snapshot | <span className="text-cyan">grep</span> xbps
      </div>
      {SNAPSHOTS.map((s, i) => (
        <div key={i} className="truncate text-fg-2">
          zroot/ROOT/sway@<span className="text-cyan">xbps</span>-install-{s}
        </div>
      ))}
      <div className="text-fg-3">
        regn % <span className="bg-fg-2 text-bg-1">&nbsp;</span>
      </div>
    </div>
  );
};
