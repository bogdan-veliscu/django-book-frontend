import Container from "@/app/components/container";
import cn from "classnames";

type Props = {
    preview?: boolean;
};

const Alert = ({ preview }: Props) => {
    return (
        <div
            className={cn("border-b", {
                "bg-accent-1 border-accent-2": preview,
                "bg-accent-2 border-accent-1": !preview,
            })}
        >
            <div className="py-2 text-center text-sm">
                {preview ? (
                    <>
                        This is page is a preview.{" "}
                        <a
                            href="/api/exit-preview"
                            className="underline hover:text-cyan duration-200 transition-colors"
                        >
                            Click here
                        </a>{" "}
                        to exit preview mode.
                    </>
                ) : (
                    <>
                        This page is a preview.{" "}
                        <a
                            href="/api/preview"
                            className="underline hover:text-cyan duration-200 transition-colors"
                        >
                            Click here
                        </a>{" "}
                        to enter preview mode.
                    </>
                )}
            </div>
        </div>
    );
};

export default Alert;
