"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FolderKanban, Users, Settings, LogOut, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Team", href: "/team", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-6 top-6 bottom-6 hidden w-72 flex-col glass-panel rounded-[3rem] md:flex z-50 border-white/[0.05]">
      <div className="flex h-28 items-center px-12">
        <Link href="/dashboard" className="flex items-center gap-4 group">
          <div className="size-12 rounded-[1.25rem] bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:rotate-12 transition-all">
            <Zap className="size-6 text-black fill-black" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">TeamSync</span>
        </Link>
      </div>
      
      <div className="flex-1 px-8 py-8 space-y-3">
        <p className="px-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Operations</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative group block"
            >
              <div className={cn(
                "flex items-center rounded-2xl px-6 py-4 text-sm font-bold transition-all duration-300",
                isActive
                  ? "text-primary"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-primary/10 rounded-2xl -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 40 }}
                  />
                )}
                <item.icon className={cn("mr-4 size-5 transition-transform group-hover:scale-110", isActive && "text-primary")} />
                {item.name}
              </div>
            </Link>
          )
        })}
      </div>

      <div className="p-8">
        <div className="glass-panel p-6 rounded-[2rem] bg-white/[0.02] border-white/[0.05] mb-8 group cursor-pointer hover:bg-white/[0.04] transition-all">
          <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
            <Zap className="size-5 text-primary" />
          </div>
          <p className="text-xs font-black text-slate-200 uppercase tracking-widest mb-1">Elite Plan</p>
          <p className="text-[10px] font-bold text-slate-500">Full Access Enabled</p>
        </div>
        <Button variant="ghost" className="w-full justify-start text-slate-500 hover:bg-red-500/10 hover:text-red-400 rounded-2xl font-bold h-12" asChild>
          <Link href="/login">
            <LogOut className="mr-4 size-5" />
            Sign Out
          </Link>
        </Button>
      </div>
    </aside>
  )
}
