import { getDb } from "@/lib/db"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserPlus } from "lucide-react"
import { ActionModal } from "@/components/modals/action-modal"
import { TeamCardActions } from "@/components/team/team-card-actions"

export default async function TeamPage() {
  const users = getDb().users;
  
  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-white/5 pb-10">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-gradient-orange uppercase">Our Collective</h1>
          <p className="text-slate-400 font-bold mt-2 italic">Building the future, one task at a time.</p>
        </div>
        <ActionModal 
          type="member"
          title="Invite to Collective"
          description="Add a new member to your workspace and assign their role."
          trigger={
            <Button className="premium-button">
              <UserPlus className="mr-2 size-5" />
              Invite Member
            </Button>
          }
        />
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="glass-card group text-center space-y-6">
            <div className="relative mx-auto size-32">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-all" />
              <Avatar className="size-full ring-4 ring-white/10 group-hover:ring-primary/40 transition-all">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-primary/20 text-primary text-3xl font-black">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            
            <div>
              <h2 className="text-2xl font-black text-slate-100 group-hover:text-primary transition-colors">{user.name}</h2>
              <p className="text-primary/60 font-black uppercase text-[10px] tracking-[0.2em] mt-1">Lead Developer</p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Badge className="bg-white/5 border-white/10 text-slate-400 font-bold px-3 py-1">React</Badge>
              <Badge className="bg-white/5 border-white/10 text-slate-400 font-bold px-3 py-1">Node.js</Badge>
            </div>

            <TeamCardActions userName={user.name} userEmail={user.email} />
          </div>
        ))}
      </div>
    </div>
  )
}
