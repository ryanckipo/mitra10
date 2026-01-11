import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant: 'default' | 'pending' | 'dikirim' | 'selesai';
}

const variantStyles = {
  default: 'bg-card border border-border',
  pending: 'bg-muted/50 border border-muted',
  dikirim: 'bg-warning/10 border border-warning/20',
  selesai: 'bg-success/10 border border-success/20',
};

const iconStyles = {
  default: 'bg-primary/10 text-primary',
  pending: 'bg-muted-foreground/10 text-muted-foreground',
  dikirim: 'bg-warning/20 text-warning',
  selesai: 'bg-success/20 text-success',
};

export const StatsCard = ({ title, value, icon: Icon, variant }: StatsCardProps) => {
  return (
    <div className={`rounded-xl p-5 ${variantStyles[variant]} card-hover`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-display font-bold text-foreground mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconStyles[variant]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};
