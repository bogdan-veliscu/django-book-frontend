import Container from "@/components/container";
import ArticleCount from "./article-count";

export function Footer() {
    return (
        <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
            <Container>
                <div className="py-16 flex flex-col lg:flex-row items-center justify-between">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start lg:w-1/2">
                        <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-6 lg:mb-0 lg:pr-4">
                            Conduit
                        </h3>


                    </div>
                    <div className="flex flex-col items-center lg:items-start lg:w-1/2 mt-6 lg:mt-0">
                        <ArticleCount />
                    </div>
                    <div className="flex flex-col items-center lg:items-end lg:w-1/2 mt-6 lg:mt-0">
                        <span className="attribution text-sm text-gray-600 dark:text-gray-400 text-center lg:text-right">
                            An interactive learning project from
                            <a href="https://codeswiftr.com" className="text-blue-600 hover:text-blue-800 transition-colors duration-200"> CodeSwiftr</a>. Code &amp; design
                            licensed under MIT.
                        </span>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
