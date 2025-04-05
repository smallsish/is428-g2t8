"use client"

import { useEffect, useRef } from "react"

interface TableauVizProps {
  id: string
  url: string
  height?: string
  width?: string
}

export function TableauViz({ id, url, height = "827px", width = "100%" }: TableauVizProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear any existing content
    containerRef.current.innerHTML = ""

    // Create the placeholder div
    const placeholderDiv = document.createElement("div")
    placeholderDiv.className = "tableauPlaceholder"
    placeholderDiv.id = `viz${id}`
    placeholderDiv.style.position = "relative"

    // Create noscript fallback
    const noscript = document.createElement("noscript")
    const fallbackLink = document.createElement("a")
    fallbackLink.href = "#"
    const fallbackImg = document.createElement("img")
    fallbackImg.alt = "Tableau Visualization"
    fallbackImg.src = `https://public.tableau.com/static/images/${url.split("/").join("/")}/1_rss.png`
    fallbackImg.style.border = "none"
    fallbackLink.appendChild(fallbackImg)
    noscript.appendChild(fallbackLink)

    // Create the visualization object
    const vizObject = document.createElement("object")
    vizObject.className = "tableauViz"
    vizObject.style.display = "none"

    // Add parameters
    const params = [
      { name: "host_url", value: "https%3A%2F%2Fpublic.tableau.com%2F" },
      { name: "embed_code_version", value: "3" },
      { name: "site_root", value: "" },
      { name: "name", value: url },
      { name: "tabs", value: "no" },
      { name: "toolbar", value: "yes" },
      { name: "animate_transition", value: "yes" },
      { name: "display_static_image", value: "yes" },
      { name: "display_spinner", value: "yes" },
      { name: "display_overlay", value: "yes" },
      { name: "display_count", value: "yes" },
      { name: "language", value: "en-US" },
      { name: "filter", value: "publish=yes" },
    ]

    params.forEach((param) => {
      const paramElement = document.createElement("param")
      paramElement.name = param.name
      paramElement.value = param.value
      vizObject.appendChild(paramElement)
    })

    // Add elements to the placeholder
    placeholderDiv.appendChild(noscript)
    placeholderDiv.appendChild(vizObject)
    containerRef.current.appendChild(placeholderDiv)

    // Create and add the script
    const scriptElement = document.createElement("script")
    scriptElement.type = "text/javascript"

    const scriptContent = `
      var divElement = document.getElementById('viz${id}');
      var vizElement = divElement.getElementsByTagName('object')[0];
      if ( divElement.offsetWidth > 800 ) { 
        vizElement.style.width='${width}';
        vizElement.style.height='${height}';
      } else if ( divElement.offsetWidth > 500 ) { 
        vizElement.style.width='${width}';
        vizElement.style.height='${height}';
      } else { 
        vizElement.style.width='100%';
        vizElement.style.height='${Number.parseInt(height) * 2}px';
      }
      var scriptElement = document.createElement('script');
      scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
      vizElement.parentNode.insertBefore(scriptElement, vizElement);
    `

    scriptElement.innerHTML = scriptContent
    containerRef.current.appendChild(scriptElement)

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [id, url, height, width])

  return <div ref={containerRef} className="w-full" />
}

