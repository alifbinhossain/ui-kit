import { NavLink } from 'react-router-dom';

import { cn } from '@/lib/utils';
import useApp from '@/hooks/useApp';

interface IBrandLogoProps {
  className?: string;
  title: string;
}

const BrandLogo: React.FC<IBrandLogoProps> = ({
  className,
  title,
  ...props
}) => {
  const { sidebarRoutes } = useApp();
  const route = sidebarRoutes[0];

  return (
    <NavLink
      className={cn(
        'flex items-center justify-center text-2xl font-bold text-primary-foreground md:text-4xl',
        className
      )}
      to={route.path!}
      {...props}
    >
      {title}
    </NavLink>
  );
};

export default BrandLogo;
