import { MainNav } from "@/components/layout/main-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen relative">
      <MainNav />
      <main className="md:pl-[22rem] transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  )
}