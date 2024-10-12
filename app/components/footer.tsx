import Container from "@/components/container";

export function Footer() {
    return (
        <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
            <Container>
                <div className="py-28 flex flex-col lg:flex-row items-center">
                    <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
                        Statically Generated with Next.js.
                    </h3>
                    <a href="/" className="logo-font">conduit</a>
                    <span className="attribution">
                        An interactive learning project from
                        <a href="https://codeswiftr.com">CodeSwiftr</a>. Code &amp; design
                        licensed under MIT.
                    </span>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
