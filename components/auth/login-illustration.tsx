import React from "react"
import { Plus } from "lucide-react"

export function LoginIllustration() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f0f4ff]">
      {/* Decorative background blobs */}
      <div
        className="absolute -top-20 -left-20 h-125 w-125 rounded-full bg-blue-500/6 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(124,58,237,0.06) 50%, rgba(37,99,235,0.12) 100%)",
        }}
      />
      <div
        className="absolute -right-40 -bottom-40 h-150 w-150 rounded-full bg-purple-500/5 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.05) 0%, rgba(109,40,217,0.05) 100%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Content */}
      <div className="relative flex h-full items-center justify-center px-8">
        <div className="w-full max-w-125">
          {/* Brand Tag */}
          <div className="mb-8">
            <div className="inline-flex items-center rounded-full bg-blue-500/10 px-6 py-1.5">
              <span className="text-xs font-semibold text-blue-600">
                Smart Finance
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-6 space-y-1">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Track Your Expenses
            </h1>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Like Never Before
            </h1>
          </div>
          <p className="text-sm leading-relaxed text-slate-500">
            Stay on top of your spending with real-time insights,
            <br />
            smart categorisation, and beautiful analytics.
          </p>

          {/* Dashboard Card */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white/95 shadow-lg shadow-black/5 backdrop-blur-sm">
            {/* Card Header */}
            <div className="p-6 pb-0">
              <div className="flex items-start justify-between">
                <div>
                  <div className="h-4 w-36 animate-pulse rounded bg-slate-300/60" />
                  <div className="mt-1.5 h-2.5 w-20 animate-pulse rounded bg-slate-200/60" />
                </div>
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full border border-slate-200 bg-slate-100" />
                  <div className="h-3 w-3 rounded-full border border-slate-200 bg-slate-100" />
                </div>
              </div>
            </div>

            {/* Balance Section */}
            <div className="px-6 pt-4 pb-3">
              <p className="text-xs font-medium tracking-wider text-slate-400">
                TOTAL BALANCE
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                $24,850.00
              </p>
              <div className="mt-2 inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-0.5">
                <span className="text-xs font-semibold text-emerald-600">
                  +12.5% this month
                </span>
              </div>
            </div>

            {/* Chart Section */}
            <div className="px-6 pb-3">
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="relative h-27.5">
                  {/* Grid Lines */}
                  <div className="absolute inset-0">
                    <div className="h-[27.5px] border-b border-slate-200/60" />
                    <div className="h-[27.5px] border-b border-slate-200/60" />
                    <div className="h-[27.5px] border-b border-slate-200/60" />
                    <div className="h-[27.5px]" />
                  </div>

                  {/* Bar Chart */}
                  <div className="relative flex h-full items-end justify-between px-1">
                    {[
                      { height: 55, opacity: 0.8 },
                      { height: 65, opacity: 0.8 },
                      { height: 75, opacity: 0.8 },
                      { height: 50, opacity: 0.8 },
                      { height: 80, opacity: 0.8 },
                      { height: 60, opacity: 0.8 },
                      { height: 72, opacity: 0.8 },
                      { height: 48, opacity: 0.8 },
                    ].map((bar, index) => (
                      <div
                        key={index}
                        className="flex w-7 flex-col items-center gap-0.5"
                      >
                        <div
                          className="w-full rounded-sm bg-linear-to-b from-blue-400 to-blue-600"
                          style={{
                            height: `${bar.height}px`,
                            opacity: bar.opacity,
                          }}
                        />
                        <div
                          className="w-full rounded-sm bg-linear-to-b from-blue-400 to-blue-600/30"
                          style={{
                            height: `${20}px`,
                            opacity: 0.3,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Category Tags */}
            <div className="px-6 pb-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Food", amount: "$245.50", color: "red" },
                  { label: "Shopping", amount: "$432.00", color: "purple" },
                  { label: "Transport", amount: "$89.00", color: "emerald" },
                ].map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl bg-slate-100 p-3"
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${category.color === "red" && "bg-red-500/15"} ${category.color === "purple" && "bg-purple-500/15"} ${category.color === "emerald" && "bg-emerald-500/15"} `}
                    >
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${category.color === "red" && "bg-red-500"} ${category.color === "purple" && "bg-purple-500"} ${category.color === "emerald" && "bg-emerald-500"} `}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">
                        {category.label}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {category.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Expense Button */}
            <div className="-mt-2 flex justify-end px-6 pb-6">
              <button className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 transition-transform hover:scale-105">
                <Plus className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="mt-6 flex flex-wrap gap-3">
            {["Secure", "Analytics", "Insights", "Real-time"].map(
              (feature, index) => {
                const colors = ["emerald", "blue", "purple", "red"]
                return (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm"
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${colors[index] === "emerald" && "bg-emerald-500"} ${colors[index] === "blue" && "bg-blue-500"} ${colors[index] === "purple" && "bg-purple-500"} ${colors[index] === "red" && "bg-red-500"} `}
                    />
                    <span className="text-xs font-medium text-slate-900">
                      {feature}
                    </span>
                  </div>
                )
              }
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
