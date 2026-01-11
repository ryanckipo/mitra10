import { StatusPengiriman } from '@/types/pengiriman';
import { Package, Truck, CheckCircle2, PackageOpen } from 'lucide-react';

interface StatusBadgeProps {
  status: StatusPengiriman;
  size?: 'sm' | 'md';
}

const statusConfig = {
  Pending: {
    icon: Package,
    className: 'status-badge status-pending',
    label: 'Pending',
  },
  Packing: {
    icon: PackageOpen,
    className: 'status-badge status-packing',
    label: 'Packing',
  },
  Dikirim: {
    icon: Truck,
    className: 'status-badge status-dikirim',
    label: 'Dikirim',
  },
  Selesai: {
    icon: CheckCircle2,
    className: 'status-badge status-selesai',
    label: 'Selesai',
  },
};

export const StatusBadge = ({ status, size = 'sm' }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  const iconSize = size === 'sm' ? 12 : 16;

  return (
    <span className={`${config.className} ${size === 'md' ? 'px-3 py-1 text-sm' : ''}`}>
      <Icon className="mr-1" size={iconSize} />
      {config.label}
    </span>
  );
};
