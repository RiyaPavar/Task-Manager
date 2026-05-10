import { getProjects } from "@/app/actions/projects"
import { Button } from "@/components/ui/button"
import { Plus, Users, ArrowRight, Layers } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ActionModal } from "@/components/modals/action-modal"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-10">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase">Portfolio</h1>
          <p className="text-xl text-muted-foreground font-medium mt-2">Manage and monitor your team's mission-critical project containers.</p>
        </div>
        <ActionModal 
          type="project"
          title="Launch New Project"
          description="Initialize a new project container for your team."
          trigger={
            <Button className="premium-gradient hover:opacity-90 shadow-2xl shadow-primary/30 rounded-2xl h-14 px-8 font-black uppercase tracking-[0.15em] text-[12px]">
              <Plus className="mr-3 size-6" />
              Create Project
            </Button>
          }
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project: any) => (
          <div key={project._id} className="glass-card flex flex-col group border-white/5 hover:border-primary/30 transition-all duration-500 overflow-hidden">
            {/* Design Element */}
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
              <Layers className="size-32 -rotate-12" />
            </div>

            <div className="p-8 space-y-6 flex-1">
              <div className="flex items-start justify-between">
                <div className="size-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-white/10 shadow-inner">
                  <span className="text-primary font-black text-2xl uppercase">{project.title.charAt(0)}</span>
                </div>
                <Badge variant="outline" className="rounded-full bg-white/5 border-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                  {project.members.length} Collaborators
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{project.title}</h2>
                <p className="text-muted-foreground line-clamp-2 font-medium leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {project.members.slice(0, 4).map((member: any, i: number) => (
                    <div key={i} className="size-9 rounded-full ring-4 ring-background/50 border border-white/10 overflow-hidden hover:translate-y-[-4px] transition-transform duration-300">
                      <img src={member.userId.avatarUrl || `https://picsum.photos/seed/${i}/100/100`} alt="" className="size-full object-cover" />
                    </div>
                  ))}
                  {project.members.length > 4 && (
                    <div className="size-9 rounded-full ring-4 ring-background/50 bg-white/10 border border-white/20 flex items-center justify-center text-[11px] font-black text-primary">
                      +{project.members.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-2">
              <Button variant="ghost" className="w-full h-14 rounded-2xl text-muted-foreground hover:text-primary hover:bg-primary/5 group/btn font-black uppercase tracking-widest text-[11px] border border-transparent hover:border-primary/10 transition-all" asChild>
                <Link href={`/projects/${project._id}`}>
                  Launch Dashboard
                  <ArrowRight className="ml-3 size-5 transition-transform group-hover/btn:translate-x-2" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}