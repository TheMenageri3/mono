import ProjectCreationForm from "./components/ProjectCreationForm";
import ProjectCard from "./components/ProjectCard";
import ProjectHeader from "./components/ProjectHeader";
import ProjectSidebar from "./components/ProjectSidebar";
import ProjectTabs from "./components/ProjectTabs";
import CollaboratorManagement from "./components/CollaboratorManagement";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const mockProjects = [
  {
    id: "1",
    title: "Web3 Marketplace Dashboard",
    description: "Building a dashboard for NFT marketplace analytics with real-time data visualization.",
    tags: ["React", "Web3", "Dashboard"],
    members: [
      { id: "1", name: "Alex Johnson", avatar: "/avatars/01.png", role: "Owner", email: "alex@example.com" },
      { id: "2", name: "Maria Garcia", avatar: "/avatars/02.png", role: "Editor", email: "maria@example.com" },
      { id: "3", name: "Jamal Wilson", avatar: "/avatars/03.png", role: "Viewer", email: "jamal@example.com" },
      { id: "4", name: "Sarah Chen", avatar: "/avatars/04.png", role: "Editor", email: "sarah@example.com" },
    ],
    dueDate: "May 15, 2025",
    status: "In progress",
    progress: 65,
    createdAt: "March 10, 2025",
    files: [
      { name: "ProjectProposal.pdf", size: "2.4 MB", updatedAt: "Mar 12, 2025" },
      { name: "ArchitectureDiagram.png", size: "1.7 MB", updatedAt: "Apr 05, 2025" },
      { name: "ProgressReport.docx", size: "845 KB", updatedAt: "Apr 23, 2025" },
    ],
  },
  {
    id: "2",
    title: "Decentralized Learning Platform",
    description: "A blockchain-powered educational platform with verifiable credentials and peer-to-peer knowledge sharing.",
    tags: ["Blockchain", "Education", "Web3", "React"],
    members: [
      { id: "1", name: "Alex Johnson", avatar: "/avatars/01.png", role: "Owner", email: "alex@example.com" },
      { id: "2", name: "Maria Garcia", avatar: "/avatars/02.png", role: "Editor", email: "maria@example.com" },
    ],
    dueDate: "August 30, 2025",
    status: "In progress",
    progress: 80,
    createdAt: "February 1, 2025",
    files: [],
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="w-full max-w-5xl p-8 bg-background rounded-lg shadow">
        <Tabs defaultValue="create" className="w-full flex">
          {/* Vertical TabsList */}
          <TabsList className="flex flex-col items-stretch w-56 min-w-[12rem] mr-8 h-fit gap-2 bg-card p-4 rounded-lg shadow-sm">
            <TabsTrigger value="create" className="justify-start">Project Creation</TabsTrigger>
            <TabsTrigger value="collaborators" className="justify-start">Collaborator Management</TabsTrigger>
            <TabsTrigger value="projects" className="justify-start">Project Card</TabsTrigger>
            <TabsTrigger value="header" className="justify-start">Project Header</TabsTrigger>
            <TabsTrigger value="sidebar" className="justify-start">Project Sidebar</TabsTrigger>
            <TabsTrigger value="tabs" className="justify-start">Project Tabs</TabsTrigger>
          </TabsList>
          {/* Tab Content */}
          <div className="flex-1">
            <TabsContent value="create">
              <h1 className="text-2xl font-bold mb-6">Project Creation Form</h1>
              <ProjectCreationForm />
            </TabsContent>
            <TabsContent value="projects">
              <h1 className="text-2xl font-bold mb-6">Project Card</h1>
              <div className="space-y-6">
                {mockProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="header">
              <h1 className="text-2xl font-bold mb-6">Project Header</h1>
              <div className="border rounded-lg">
                <ProjectHeader project={mockProjects[0]} />
              </div>
            </TabsContent>
            <TabsContent value="sidebar">
              <h1 className="text-2xl font-bold mb-6">Project Sidebar</h1>
              <ProjectSidebar project={mockProjects[0]} />
            </TabsContent>
            <TabsContent value="tabs">
              <h1 className="text-2xl font-bold mb-6">Project Tabs</h1>
              <ProjectTabs project={mockProjects[0]} />
            </TabsContent>
            <TabsContent value="collaborators">
              <h1 className="text-2xl font-bold mb-6">Collaborator Management</h1>
              <CollaboratorManagement collaborators={mockProjects[0].members} projectId={mockProjects[0].id} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
