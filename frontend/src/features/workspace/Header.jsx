import { RefreshCw, ClipboardCheck } from "lucide-react";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
            <div className="mx-auto flex h-[72px] max-w-[1800px] items-center justify-between px-6">

                {/* Left */}
                <div className="flex items-center gap-4">

                    {/* OIS Logo */}
                    <div
                        className="
                            flex h-11 w-11 items-center justify-center
                            rounded-lg
                            border border-slate-700
                            bg-slate-900
                        "
                    >
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Connections */}
                            <path
                                d="M6 7.5L12.5 12.5L19 7.5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-slate-400"
                            />

                            <path
                                d="M12.5 12.5V19"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                className="text-slate-400"
                            />

                            {/* Nodes */}
                            <rect
                                x="3.5"
                                y="4.5"
                                width="5"
                                height="5"
                                rx="1"
                                className="fill-slate-300"
                            />

                            <rect
                                x="10"
                                y="10"
                                width="5"
                                height="5"
                                rx="1"
                                className="fill-slate-300"
                            />

                            <rect
                                x="16.5"
                                y="4.5"
                                width="5"
                                height="5"
                                rx="1"
                                className="fill-slate-300"
                            />

                            <rect
                                x="10"
                                y="17"
                                width="5"
                                height="5"
                                rx="1"
                                className="fill-slate-300"
                            />
                        </svg>
                    </div>

                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                            Operational Intelligence
                        </h1>

                        <p className="text-xs tracking-wide text-slate-500">
                            Live Operational Runtime
                        </p>
                    </div>

                </div>

                {/* Center */}
                <div className="hidden items-center gap-8 lg:flex">

                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />

                        <span className="text-sm text-slate-400">
                            Runtime Connected
                        </span>
                    </div>

                </div>

                {/* Right */}
                <div className="flex items-center gap-2">

                    {/* Refresh */}
                    <button
                        title="Refresh Runtime"
                        aria-label="Refresh Runtime"
                        className="
                            flex h-10 w-10 items-center justify-center
                            rounded-md
                            border border-slate-700
                            bg-slate-900
                            text-slate-400
                            transition
                            hover:border-slate-600
                            hover:bg-slate-800
                            hover:text-slate-200
                        "
                    >
                        <RefreshCw
                            size={16}
                            strokeWidth={1.8}
                        />
                    </button>

                    {/* Inspection */}
                    <button
                        title="Inspection"
                        aria-label="Inspection"
                        className="
                            flex h-10 w-10 items-center justify-center
                            rounded-md
                            border border-slate-700
                            bg-slate-900
                            text-slate-400
                            transition
                            hover:border-slate-600
                            hover:bg-slate-800
                            hover:text-slate-200
                        "
                    >
                        <ClipboardCheck
                            size={17}
                            strokeWidth={1.8}
                        />
                    </button>

                </div>

            </div>
        </header>
    );
}