"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Shield, User, Globe, Moon, CreditCard, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("Profile")
  const { toast } = useToast()
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    tasks: true
  })

  const handleSaveProfile = () => {
    toast({
      title: "Profile Saved",
      description: "Your personal information has been updated.",
    })
  }

  const handleUpdateSecurity = () => {
    toast({
      title: "Security Updated",
      description: "Your security preferences have been saved.",
    })
  }

  const handleUpgradePlan = () => {
    toast({
      title: "Redirecting to Billing",
      description: "Opening secure checkout for plan upgrade...",
    })
  }

  const handleEditPayment = () => {
    toast({
      title: "Payment Methods",
      description: "Opening payment configuration portal...",
    })
  }

  const handleEnable2FA = () => {
    toast({
      title: "2FA Setup",
      description: "Sending verification code to your device...",
    })
  }

  const sections = [
    { title: "Profile", icon: User, desc: "Manage your public profile and identity." },
    { title: "Notifications", icon: Bell, desc: "Configure how you receive updates." },
    { title: "Security", icon: Shield, desc: "Protect your account and team data." },
    { title: "Billing", icon: CreditCard, desc: "Manage subscriptions and payments." },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "Profile":
        return (
          <div className="glass-card space-y-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-black text-slate-100">Personal Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-slate-500 font-black uppercase text-[10px] tracking-widest ml-1">Full Name</Label>
                <Input defaultValue="Riya Pavar" className="h-14 glass-panel border-white/5 rounded-2xl focus:ring-primary/20" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-500 font-black uppercase text-[10px] tracking-widest ml-1">Email Address</Label>
                <Input defaultValue="riyapawar1211@gmail.com" className="h-14 glass-panel border-white/5 rounded-2xl focus:ring-primary/20" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-500 font-black uppercase text-[10px] tracking-widest ml-1">Bio</Label>
              <textarea className="w-full h-32 glass-panel border-white/5 rounded-2xl p-4 bg-transparent focus:ring-1 focus:ring-primary/20 outline-none" placeholder="Write something about yourself..."></textarea>
            </div>
            <Button className="premium-button" onClick={handleSaveProfile}>Save Profile</Button>
          </div>
        )
      case "Notifications":
        return (
          <div className="glass-card space-y-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-black text-slate-100">Alert Preferences</h2>
            <div className="space-y-6">
              {[
                { id: 'email', title: "Email Notifications", desc: "Receive updates via email" },
                { id: 'push', title: "Push Notifications", desc: "Real-time alerts in your browser" },
                { id: 'tasks', title: "Task Assignments", desc: "Notify when a task is assigned to me" }
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                  <div>
                    <p className="font-bold text-slate-100">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <Switch 
                    checked={notifications[item.id as keyof typeof notifications]}
                    onCheckedChange={(checked) => {
                      setNotifications(prev => ({ ...prev, [item.id]: checked }))
                      toast({
                        title: "Preference Updated",
                        description: `${item.title} turned ${checked ? 'on' : 'off'}.`,
                      })
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )
      case "Security":
        return (
          <div className="glass-card space-y-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-black text-slate-100">Account Protection</h2>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-500 font-black uppercase text-[10px] tracking-widest ml-1">Current Password</Label>
                  <Input type="password" placeholder="••••••••" className="h-14 glass-panel border-white/5 rounded-2xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-500 font-black uppercase text-[10px] tracking-widest ml-1">New Password</Label>
                  <Input type="password" placeholder="••••••••" className="h-14 glass-panel border-white/5 rounded-2xl" />
                </div>
              </div>
              <div className="flex items-center justify-between p-6 rounded-3xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-4">
                  <Shield className="size-6 text-primary" />
                  <div>
                    <p className="font-bold text-slate-100">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-500">Add an extra layer of security</p>
                  </div>
                </div>
                <Button variant="outline" onClick={handleEnable2FA} className="rounded-xl border-primary/20 hover:bg-primary/10 text-primary">Enable</Button>
              </div>
              <Button className="premium-button" onClick={handleUpdateSecurity}>Update Security</Button>
            </div>
          </div>
        )
      case "Billing":
        return (
          <div className="glass-card space-y-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-black text-slate-100">Subscription & Credits</h2>
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary to-orange-400 text-black space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-black uppercase tracking-widest text-[10px] opacity-60">Current Plan</p>
                  <h3 className="text-3xl font-black">Elite Enterprise</h3>
                </div>
                <Badge className="bg-black text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Active</Badge>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-4xl font-black">$199</p>
                <p className="font-bold opacity-60">/ month</p>
              </div>
              <Button onClick={handleUpgradePlan} className="w-full bg-black text-white hover:bg-black/80 h-14 rounded-2xl font-black uppercase tracking-widest text-[11px]">Upgrade Plan</Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-slate-100">Payment Methods</h3>
              <div className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center gap-4">
                  <CreditCard className="size-6 text-primary" />
                  <p className="font-bold text-slate-100">•••• •••• •••• 4242</p>
                </div>
                <Button variant="ghost" onClick={handleEditPayment} className="text-slate-500 hover:text-white">Edit</Button>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-12 animate-in slide-in-from-right-4 duration-1000">
      <header className="border-b border-white/5 pb-10">
        <h1 className="text-5xl font-black tracking-tighter text-gradient-orange uppercase">Configurations</h1>
        <p className="text-slate-400 font-bold mt-2">Personalize your TeamSync workspace.</p>
      </header>

      <div className="grid gap-12 lg:grid-cols-4">
        <aside className="space-y-4">
          {sections.map((s) => (
            <button 
              key={s.title} 
              onClick={() => setActiveSection(s.title)}
              className={cn(
                "w-full flex items-center gap-4 p-5 rounded-2xl transition-all group",
                activeSection === s.title 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <s.icon className={cn("size-6 transition-colors", activeSection === s.title ? "text-primary" : "group-hover:text-primary")} />
              <span className="font-black uppercase tracking-widest text-[11px]">{s.title}</span>
            </button>
          ))}
        </aside>

        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}>
      {children}
    </span>
  )
}
