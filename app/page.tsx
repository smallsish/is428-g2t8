"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TableauViz } from "@/components/tableau-viz"

const visualizations = [
  {
    id: "1",
    title: "Overview",
    description: "",
    url: "Project_Overview/OverviewDashboard",
    type: "tableau",
  },
  {
    id: "2",
    title: "Age",
    description: "",
    url: "GrpProjAgeDashboard/AGEDashboard",
    type: "tableau",
  },
  {
    id: "3",
    title: "Type of Dwelling",
    description: "",
    url: "Project_Dwellings/DashboardNew",
    type: "tableau",
  },
  {
    id: "4",
    title: "Race",
    description: "",
    url: "RaceDashboardFinal/RaceDashboard",
    type: "tableau",
  },
  {
    id: "5",
    title: "Economic Factors",
    description: "",
    url: "/d3-dashboard/d3-dashboard.html",
    type: "d3",
  },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState("tab1")

  const renderVisualization = (viz: (typeof visualizations)[0], index: number) => {
    if (!activeTab.includes(`${index + 1}`)) return null

    if (viz.type === "d3") {
      return (
        <iframe
          src={viz.url}
          className="w-full border-none"
          style={{ height: "827px" }}
          title="Economic Factors"
          sandbox="allow-same-origin allow-scripts"
        />
      )
    } else {
      return <TableauViz id={`${viz.id}_${index}`} url={viz.url} height="827px" width="100%" />
    }
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Mapping the Impact of Demographics and Economics on Election Outcomes</h1>

      <Tabs defaultValue="tab1" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full mb-8">
          {visualizations.map((viz, index) => (
            <TabsTrigger key={`tab${index + 1}`} value={`tab${index + 1}`}>
              {viz.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {visualizations.map((viz, index) => (
          <TabsContent key={`tab${index + 1}`} value={`tab${index + 1}`} className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>{viz.title}</CardTitle>
                <CardDescription>{viz.description}</CardDescription>
              </CardHeader>
              <CardContent>{renderVisualization(viz, index)}</CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  )
}

