import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

const typographyVariants = cva("text-foreground", {
    variants: {
        variant: {
            h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
            h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
            h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
            h4: "scroll-m-20 text-xl font-semibold tracking-tight",
            p: "leading-7 [&:not(:first-child)]:mt-6",
            blockquote: "mt-6 border-l-2 pl-6 italic",
            code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
            lead: "text-xl text-muted-foreground",
            large: "text-lg font-semibold",
            small: "text-sm font-medium leading-none",
            muted: "text-sm text-muted-foreground",
        },
    },
    defaultVariants: {
        variant: "p",
    },
})

type TypographyProps = ComponentProps<"div"> &
    VariantProps<typeof typographyVariants> & {
        component?: keyof JSX.IntrinsicElements
    }

const Typography = ({
    className,
    variant,
    component = "div",
    ...props
}: TypographyProps) => {
    const Comp = component as any
    return (
        <Comp
            className={cn(typographyVariants({ variant, className }))}
            {...props}
        />
    )
}

export { Typography, typographyVariants } 