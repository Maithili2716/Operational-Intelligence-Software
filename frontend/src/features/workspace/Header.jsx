export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
            <div className="mx-auto flex h-[72px] max-w-[1800px] items-center justify-between px-6">
                {/* Left */}
                <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 bg-slate-900">
                        <span className="text-lg font-semibold tracking-wide text-cyan-400">

                            O
                        </span>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold tracking-wide text-slate-100">
                            Operational Intelligence System
                        </h1>
                        <p className="text-xs tracking-wide text-slate-400">
                            Live Operational Runtime
                        </p>
                    </div>
                </div>
                {/* Center */}
                <div className="hidden items-center gap-8 lg:flex">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-sm text-slate-300">
                            Runtime Connected
                        </span>
                    </div>
                    <div className="h-5 w-px bg-slate-700" />
                    <div className="text-sm text-slate-400">

                        Workspace
                    </div>
                </div>
                {/* Right */}
                <div className="flex items-center gap-3">
                    <button
                        className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:bg-slate-800"
                    >
                        Refresh
                    </button>
                    <button
                        className="rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-500"
                    >
                        Inspection
                    </button>
                </div>
            </div>
        </header>
   );

}