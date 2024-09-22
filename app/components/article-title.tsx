import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

export function ArticleTitle({ children }: Props) {
    return (
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
            {children}
        </h1>
    );
}