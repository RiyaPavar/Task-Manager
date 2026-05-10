"use client"

import { login } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const handleLogin = async (formData: FormData) => {
    await login(formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md space-y-10 animate-in fade-in zoom-in duration-700">
        <div className="text-center space-y-4">
          <div className="inline-flex size-16 rounded-[1.5rem] bg-primary items-center justify-center shadow-2xl shadow-primary/40 mb-2">
            <Zap className="size-8 text-black fill-black" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase">Welcome Back</h1>
          <p className="text-slate-400 font-bold">Sign in to your premium workspace</p>
        </div>

        <div className="glass-card space-y-8 border-white/[0.05]">
          <form action={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] ml-1">Email Address</Label>
              <Input name="email" type="email" placeholder="name@company.com" required className="h-14 glass-panel border-white/5 rounded-2xl focus:ring-primary/20" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em]">Password</Label>
                <Button variant="link" className="text-[10px] font-black uppercase text-primary p-0 h-auto">Forgot?</Button>
              </div>
              <Input name="password" type="password" placeholder="••••••••" required className="h-14 glass-panel border-white/5 rounded-2xl focus:ring-primary/20" />
            </div>
            <Button type="submit" className="premium-button w-full">Access Dashboard</Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-slate-500 font-bold">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline underline-offset-4">Join TeamSync</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
