import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">
            <div className="flex flex-col items-center justify-center space-y-8 px-4 text-center">
                {/* 404 Large Text */}
                <h1 className="text-[12rem] sm:text-[16rem] md:text-[20rem] font-bold leading-none text-white/90 tracking-tighter">
                    404
                </h1>

                {/* Page not found heading */}
                <div className="space-y-4 ">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
                        What are you doing here bro.
                    </h2>
                    <p className="text-base sm:text-lg text-neutral-400 max-w-md mx-auto">
                        Go away {">:("}
                    </p>
                </div>

                {/* Return home button */}
                <Link href="/" className="pt-4">
                    <Button
                        variant="outline"
                        size="lg"
                        className="px-8 py-6 text-base bg-white/5 hover:bg-white/10 border-white/20 text-white transition-all"
                    >
                        Return home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
