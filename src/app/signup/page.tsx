"use client"

import { signup } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const handleSignup = async (formData: FormData) => {
    await signup(formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-lg space-y-10 animate-in fade-in zoom-in duration-700">
        <div className="text-center space-y-4">
          <div className="inline-flex size-16 rounded-[1.5rem] bg-primary items-center justify-center shadow-2xl shadow-primary/40 mb-2">
            <Zap className="size-8 text-black fill-black" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase">Create Account</h1>
          <p className="text-slate-400 font-bold">Experience the future of team management</p>
        </div>

        <div className="glass-card space-y-8 border-white/[0.05]">
          <form action={handleSignup} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] ml-1">Full Name</Label>
                <Input name="name" placeholder="Alex Rivera" required className="h-14 glass-panel border-white/5 rounded-2xl focus:ring-primary/20" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] ml-1">Job Title</Label>
                <Input name="role" placeholder="Product Designer" required className="h-14 glass-panel border-white/5 rounded-2xl focus:ring-primary/20" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] ml-1">Work Email</Label>
              <Input name="email" type="email" placeholder="name@company.com" required className="h-14 glass-panel border-white/5 rounded-2xl focus:ring-primary/20" />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] ml-1">Password</Label>
              <Input name="password" type="password" placeholder="Create a strong password" required className="h-14 glass-panel border-white/5 rounded-2xl focus:ring-primary/20" />
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                By signing up, you agree to our <span className="text-white">Terms of Service</span> and <span className="text-white">Privacy Policy</span>.
              </p>
            </div>

            <Button type="submit" className="premium-button w-full">Join the Collective</Button>
          </form>

          <div className="text-center pt-2">
            <p className="text-sm text-slate-500 font-bold">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline underline-offset-4">Log in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
