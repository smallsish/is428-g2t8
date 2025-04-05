"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TableauViz } from "@/components/tableau-viz"

// Sample visualizations - replace with your actual Tableau visualization URLs
const visualizations = [
  {
    id: "1",
    title: "Dashboard 1",
    description: "First Tableau visualization",
    url: "AssignmentSubmission_17438674912860/Dashboard1",
  },
  {
    id: "2",
    title: "Dashboard 2",
    description: "Second Tableau visualization",
    url: "AssignmentSubmission_17438674912860/Dashboard1", // Replace with actual URL
  },
  {
    id: "3",
    title: "Dashboard 3",
    description: "Third Tableau visualization",
    url: "AssignmentSubmission_17438674912860/Dashboard1", // Replace with actual URL
  },
  {
    id: "4",
    title: "Dashboard 4",
    description: "Fourth Tableau visualization",
    url: "AssignmentSubmission_17438674912860/Dashboard1", // Replace with actual URL
  },
  {
    id: "5",
    title: "Dashboard 5",
    description: "Fifth Tableau visualization",
    url: "AssignmentSubmission_17438674912860/Dashboard1", // Replace with actual URL
  },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState("tab1")

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Tableau Dashboard</h1>

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
              <CardContent>
                {activeTab === `tab${index + 1}` && (
                  <TableauViz id={`${viz.id}_${index}`} url={viz.url} height="827px" width="100%" />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  )
}

