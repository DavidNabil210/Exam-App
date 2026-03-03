import { BookOpen, FileText, ListChecks } from "lucide-react"

export function AuthSidebar() {
  return (
    <div className="hidden lg:flex lg:w-[480px] flex-col  text-sidebar-foreground p-10">
      <div>
        <div className="flex items-center gap-2 mb-12">
          <BookOpen className="size-5 text-[#155dfc]" />
          <span className="text-md font-medium text-[#155dfc]">
            Exam App
          </span>
        </div>

        <h2 className="text-[#030712] font-bold leading-snug mb-2 text-sidebar-foreground text-balance">
          Empower your learning journey
          <br />
          with our smart exam platform.
        </h2>

        <div className="mt-10 flex flex-col gap-8">
          <FeatureCard
            icon={<FileText className="size-5" />}
            title="Tailored Diplomas"
            description="Choose from specialized tracks like Frontend, Backend, and Mobile Development."
            
          />
          <FeatureCard
            icon={<ListChecks className="size-5" />}
            title="Focused Exams"
            description="Access topic-specific tests including HTML, CSS, JavaScript, and more."
          />
          <FeatureCard
            icon={<BookOpen className="size-5" />}
            title="Smart Multi-Step Forms"
            description="Choose from specialized tracks like Frontend, Backend, and Mobile Development."
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0 text-[#155dfc]">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#155dfc]">
          {title}
        </h3>
        <p className="text-xs text-[#111827] mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
