declare module 'lucide-react' {
    import { FC, SVGProps } from 'react';
    export interface IconProps extends SVGProps<SVGSVGElement> {
        size?: string | number;
        absoluteStrokeWidth?: boolean;
    }
    export type Icon = FC<IconProps>;

    // Icons used in the project
    export const ShoppingBag: FC<IconProps>;
    export const User: FC<IconProps>;
    export const Users: FC<IconProps>;
    export const ShoppingCart: FC<IconProps>;
    export const X: FC<IconProps>;
    export const Trash2: FC<IconProps>;
    export const ArrowLeft: FC<IconProps>;
    export const AlertTriangle: FC<IconProps>;
    export const MoveLeft: FC<IconProps>;
    export const Cpu: FC<IconProps>;
    export const Hammer: FC<IconProps>;
    export const Paintbrush: FC<IconProps>;
    export const Package: FC<IconProps>;
    export const MessageSquare: FC<IconProps>;
    export const Plus: FC<IconProps>;
    export const Menu: FC<IconProps>;
    export const Check: FC<IconProps>;
    export const ChevronRight: FC<IconProps>;
    export const Star: FC<IconProps>;

    // Admin Icons
    export const LayoutDashboard: FC<IconProps>;
    export const Settings: FC<IconProps>;
    export const LogOut: FC<IconProps>;
    export const ShieldAlert: FC<IconProps>;
    export const DollarSign: FC<IconProps>;
    export const Search: FC<IconProps>;
    export const Pencil: FC<IconProps>;

    // Checkout Icons
    export const CreditCard: FC<IconProps>;
    export const Truck: FC<IconProps>;
    export const CheckCircle: FC<IconProps>;
}
