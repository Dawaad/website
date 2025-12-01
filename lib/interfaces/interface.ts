import { LucideIcon } from "lucide-react";

// FCWC: FunctionComponentWithChildren
export type FCWC<T> = React.FC<React.PropsWithChildren<T>>;

// Propless: Component without props
export type Propless = {};

export type Icon = LucideIcon;

export interface ChildNodeProps {
    children: React.ReactNode;
}

export interface ClassNameProps {
    className?: string;
}
