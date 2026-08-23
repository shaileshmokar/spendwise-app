// app/page.tsx
import Link from "next/link"
import {
  ArrowRight,
  Wallet,
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  PieChart,
  CreditCard,
  Menu,
  X,
  ChevronRight,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Navigation with slide-down animation */}
      <nav className="sticky top-0 z-50 animate-in border-b border-slate-200/60 bg-white/80 backdrop-blur-sm duration-500 slide-in-from-top">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="group flex items-center gap-2">
              <div className="rounded-lg bg-blue-600 p-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="font-mono text-lg font-bold text-blue-600">
                SpendWise
              </span>
            </div>

            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="#"
                className="relative text-sm font-medium text-slate-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:text-blue-600 hover:after:w-full"
              >
                Features
              </Link>
              <Link
                href="#"
                className="relative text-sm font-medium text-slate-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:text-blue-600 hover:after:w-full"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="relative text-sm font-medium text-slate-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:text-blue-600 hover:after:w-full"
              >
                About
              </Link>
              <Link
                href="#"
                className="relative text-sm font-medium text-slate-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:text-blue-600 hover:after:w-full"
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  size="default"
                  className="text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-blue-600 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with fade-in animations */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50/30 py-20 lg:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 h-full w-1/2 bg-linear-to-l from-blue-500/5 to-transparent" />
          <div className="absolute bottom-0 left-0 h-1/2 w-1/3 bg-linear-to-t from-purple-500/5 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-in space-y-6 duration-700 slide-in-from-left-10 fade-in">
              <Badge className="mb-6 animate-in border-blue-200 bg-blue-100 p-4 text-blue-700 delay-100 duration-500 fade-in slide-in-from-top-8">
                🎉 Smart Finance Management
              </Badge>
              <h1 className="text-4xl leading-tight font-bold text-slate-900 sm:text-5xl lg:text-5xl">
                Track Your Expenses
                <span className="block animate-in bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent delay-200 duration-700 fade-in slide-in-from-left-8">
                  Like Never Before
                </span>
              </h1>
              <p className="mt-4 animate-in text-lg leading-relaxed text-slate-600 delay-300 duration-700 fade-in">
                Stay on top of your spending with real-time insights, smart
                categorisation, and beautiful analytics. Take control of your
                financial future today.
              </p>
              <div className="mt-8 flex animate-in flex-wrap gap-4 delay-400 duration-700 fade-in">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="bg-blue-600 p-5 text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-300 p-5 transition-all duration-300 hover:scale-105 hover:border-blue-600 hover:text-blue-600"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex animate-in items-center gap-6 text-sm text-slate-600 delay-500 duration-700 fade-in">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-xs font-semibold text-blue-600 transition-all duration-300 hover:scale-110 hover:bg-blue-200"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span>2,000+ users trust us</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★★★★★</span>
                  <span>4.9/5</span>
                </div>
              </div>
            </div>

            <div className="relative animate-in delay-300 duration-700 slide-in-from-right-10 fade-in">
              <div className="absolute -top-10 -right-10 h-64 w-64 animate-pulse rounded-full bg-blue-400/10 blur-3xl" />
              <div
                className="absolute -bottom-10 -left-10 h-64 w-64 animate-pulse rounded-full bg-purple-400/10 blur-3xl"
                style={{ animationDelay: "1s" }}
              />

              <Card className="relative border-slate-200/60 shadow-2xl shadow-blue-500/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
                <CardContent className="p-6">
                  {/* Dashboard Preview */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium tracking-wider text-slate-400">
                          TOTAL BALANCE
                        </p>
                        <p className="text-2xl font-bold text-slate-900 transition-colors duration-300 hover:text-blue-600">
                          ₹68,450.00
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 transition-all duration-300 hover:scale-110 hover:bg-blue-100">
                          <Plus className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 transition-all duration-300 hover:scale-110 hover:bg-slate-100">
                          <Filter className="h-4 w-4 text-slate-600" />
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-slate-50 p-3 transition-all duration-300 hover:scale-105 hover:bg-emerald-50">
                        <p className="text-xs text-slate-500">Income</p>
                        <p className="text-sm font-semibold text-emerald-600">
                          ₹1,20,850
                        </p>
                        <p className="animate-pulse text-xs text-emerald-600">
                          ↑ 12.5%
                        </p>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-3 transition-all duration-300 hover:scale-105 hover:bg-red-50">
                        <p className="text-xs text-slate-500">Expenses</p>
                        <p className="text-sm font-semibold text-red-500">
                          ₹52,400
                        </p>
                        <p className="animate-pulse text-xs text-red-500">
                          ↓ 5.4%
                        </p>
                      </div>
                    </div>

                    {/* Mini Chart with stagger animation */}
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="mb-2 flex justify-between text-xs text-slate-500">
                        <span>Income vs Expenses</span>
                        <span>This month</span>
                      </div>
                      <div className="flex h-12 items-end gap-1">
                        {[40, 60, 45, 70, 55, 80, 65, 75, 50, 85, 60, 45].map(
                          (height, i) => (
                            <div
                              key={i}
                              className="flex flex-1 flex-col gap-0.5"
                            >
                              <div
                                className="w-full rounded-sm bg-blue-400/60 transition-all duration-500 hover:bg-blue-500"
                                style={{
                                  height: `${height * 0.6}%`,
                                  animation: `bar-grow 0.5s ease-out ${i * 40}ms both`,
                                }}
                              />
                              <div
                                className="w-full rounded-sm bg-blue-600/80 transition-all duration-500 hover:bg-blue-700"
                                style={{
                                  height: `${height * 0.4}%`,
                                  animation: `bar-grow 0.5s ease-out ${i * 40 + 200}ms both`,
                                }}
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-600">
                          Recent Transactions
                        </p>
                        <Link
                          href="#"
                          className="text-xs text-blue-600 transition-all duration-300 hover:scale-105 hover:underline"
                        >
                          View All
                        </Link>
                      </div>
                      <div className="space-y-2">
                        {[
                          {
                            name: "Grocery Shopping",
                            amount: "-₹1,250",
                            type: "expense",
                          },
                          {
                            name: "Salary Credit",
                            amount: "+₹85,000",
                            type: "income",
                          },
                          {
                            name: "Netflix Subscription",
                            amount: "-₹649",
                            type: "expense",
                          },
                        ].map((txn, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-100"
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`h-2 w-2 rounded-full ${txn.type === "income" ? "bg-emerald-500" : "bg-red-500"} transition-all duration-300 hover:scale-150`}
                              />
                              <span className="text-sm font-medium text-slate-700">
                                {txn.name}
                              </span>
                            </div>
                            <span
                              className={`text-sm font-semibold ${txn.type === "income" ? "text-emerald-600" : "text-red-500"} transition-all duration-300 hover:scale-105`}
                            >
                              {txn.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with scroll animations */}
      <section id="features" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl animate-in text-center duration-700 fade-in slide-in-from-bottom-8">
            <Badge className="mb-4 border-blue-200 bg-blue-100 text-blue-700">
              Features
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Everything you need to manage your finances
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              From tracking expenses to achieving your financial goals,
              SpendWise has you covered.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: TrendingUp,
                title: "Smart Analytics",
                description:
                  "Visualize your spending patterns with beautiful charts and real-time insights.",
                color: "blue",
              },
              {
                icon: Target,
                title: "Goal Tracking",
                description:
                  "Set and achieve your financial goals with personalized saving plans.",
                color: "purple",
              },
              {
                icon: Calendar,
                title: "Calendar View",
                description:
                  "See your income and expenses at a glance with our interactive calendar.",
                color: "emerald",
              },
              {
                icon: PieChart,
                title: "Budget Management",
                description:
                  "Create budgets for different categories and track your progress.",
                color: "orange",
              },
              {
                icon: CreditCard,
                title: "Multi-Account Support",
                description:
                  "Connect all your bank accounts, credit cards, and e-wallets in one place.",
                color: "pink",
              },
              {
                icon: TrendingDown,
                title: "Expense Tracking",
                description:
                  "Categorize and track every expense with ease and precision.",
                color: "red",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              const colorClasses = {
                blue: "bg-blue-50 text-blue-600",
                purple: "bg-purple-50 text-purple-600",
                emerald: "bg-emerald-50 text-emerald-600",
                orange: "bg-orange-50 text-orange-600",
                pink: "bg-pink-50 text-pink-600",
                red: "bg-red-50 text-red-600",
              }
              return (
                <Card
                  key={index}
                  className="animate-in border-slate-200/60 transition-all duration-500 fade-in slide-in-from-bottom-8 hover:scale-[1.03] hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="group p-6">
                    <div
                      className={`h-12 w-12 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses]} mb-4 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="bg-slate-50/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl animate-in text-center duration-700 fade-in slide-in-from-bottom-8">
            <Badge className="mb-4 border-blue-200 bg-blue-100 p-4 text-blue-700">
              Dashboard
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Your finances at a glance
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Get a complete overview of your financial health with our
              intuitive dashboard.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Stats Cards */}
            {[
              {
                label: "Total Balance",
                value: "₹68,450",
                change: "+8.5%",
                trend: "up",
                color: "blue",
              },
              {
                label: "Total Income",
                value: "₹1,20,850",
                change: "+12.5%",
                trend: "up",
                color: "emerald",
              },
              {
                label: "Total Expenses",
                value: "₹52,400",
                change: "-5.4%",
                trend: "down",
                color: "red",
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className="animate-in border-slate-200/60 transition-all duration-500 fade-in slide-in-from-bottom-8 hover:scale-[1.02] hover:shadow-xl"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 transition-all duration-300 hover:text-blue-600">
                    {stat.value}
                  </p>
                  <div
                    className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-all duration-300 hover:scale-105 ${
                      stat.trend === "up"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 animate-bounce" />
                    ) : (
                      <TrendingDown className="h-3 w-3 animate-pulse" />
                    )}
                    {stat.change}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Budget Overview */}
            <Card className="animate-in border-slate-200/60 transition-all delay-300 duration-500 fade-in slide-in-from-bottom-8 hover:shadow-xl lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Budget Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    label: "Housing",
                    spent: 14560,
                    budget: 20000,
                    color: "bg-blue-500",
                  },
                  {
                    label: "Food & Dining",
                    spent: 10480,
                    budget: 15000,
                    color: "bg-emerald-500",
                  },
                  {
                    label: "Transport",
                    spent: 7850,
                    budget: 10000,
                    color: "bg-purple-500",
                  },
                  {
                    label: "Shopping",
                    spent: 6120,
                    budget: 8000,
                    color: "bg-orange-500",
                  },
                ].map((category, i) => (
                  <div
                    key={i}
                    className="transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium text-slate-700">
                        {category.label}
                      </span>
                      <span className="text-slate-600">
                        ₹{category.spent.toLocaleString()} / ₹
                        {category.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${category.color} transition-all duration-1000`}
                        style={{
                          width: `${(category.spent / category.budget) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="animate-in border-slate-200/60 transition-all delay-300 duration-500 fade-in slide-in-from-bottom-8 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    title: "SBI Savings Account",
                    desc: "Received Salary",
                    amount: "+₹85,000",
                    time: "Today, 9:30 AM",
                  },
                  {
                    title: "HDFC Credit Card",
                    desc: "Swiggy Payment",
                    amount: "-₹650",
                    time: "Yesterday, 8:45 PM",
                  },
                  {
                    title: "ICICI Savings",
                    desc: "UPI Transfer",
                    amount: "+₹2,500",
                    time: "Yesterday, 6:20 PM",
                  },
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 border-b border-slate-100 pb-3 transition-all duration-300 last:border-0 hover:scale-[1.02]"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <div
                      className={`mt-1.5 h-2 w-2 rounded-full transition-all duration-300 hover:scale-150 ${activity.amount.startsWith("+") ? "bg-emerald-500" : "bg-red-500"}`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700">
                        {activity.title}
                      </p>
                      <p className="text-xs text-slate-500">{activity.desc}</p>
                      <p className="text-xs text-slate-400">{activity.time}</p>
                    </div>
                    <span
                      className={`text-sm font-semibold transition-all duration-300 hover:scale-105 ${activity.amount.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}
                    >
                      {activity.amount}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section with enhanced animations */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-600 to-purple-600 py-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 animate-pulse rounded-full bg-white/5" />
          <div
            className="absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-white/5"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-white/5"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 animate-in text-3xl font-bold text-white duration-700 fade-in slide-in-from-bottom-8 sm:text-4xl">
            Ready to take control of your finances?
          </h2>
          <p className="mb-8 animate-in text-lg text-blue-100 delay-100 duration-700 fade-in slide-in-from-bottom-8">
            Join thousands of users who are already managing their money better
            with SpendWise.
          </p>
          <div className="flex animate-in flex-wrap justify-center gap-4 delay-200 duration-700 fade-in slide-in-from-bottom-8">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-white text-blue-600 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-110 hover:bg-blue-50 hover:shadow-2xl hover:shadow-black/30"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white transition-all duration-300 hover:scale-110 hover:border-white/50 hover:bg-white/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="group mb-4 flex items-center gap-2">
                <div className="rounded-lg bg-blue-600 p-1.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Wallet className="h-4 w-4 text-white" />
                </div>
                <span className="font-mono text-lg font-bold text-blue-600">
                  SpendWise
                </span>
              </div>
              <p className="text-sm text-slate-600">
                Smart expense tracking for the modern world.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-slate-900">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link
                    href="#"
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-blue-600"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-blue-600"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-blue-600"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-blue-600"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-slate-900">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link
                    href="#"
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-blue-600"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-blue-600"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-blue-600"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-blue-600"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-slate-900">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link
                    href="#"
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-blue-600"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-blue-600"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-blue-600"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200/60 pt-8 text-center text-sm text-slate-600">
            © {new Date().getFullYear()} SpendWise. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
