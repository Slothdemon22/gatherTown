"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"

// Define a type for our coordinate message
type CoordinateMessage = {
  type: "coordinates"
  x: number
  y: number
  clientId?: string
}

export default function Home() {
  const wsRef = useRef<WebSocket | null>(null)
  const [msg, setMsg] = useState<string>("")

  // Generate random initial coordinates between 0-100
  const [coordinates, setCoordinates] = useState({
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
  })

  // Track other clients' coordinates
  const [otherClients, setOtherClients] = useState<Record<string, { x: number; y: number }>>({})

  // Generate a unique client ID
  const clientIdRef = useRef(`client-${Math.random().toString(36).substring(2, 9)}`)

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")
    wsRef.current = ws

    ws.onopen = () => {
      console.log("Connected to WebSocket server")
      // Send initial coordinates when connected
      sendCoordinates(coordinates.x, coordinates.y)
    }

    ws.onmessage = (event) => {
      try {
        // Try to parse the message as JSON
        const data = JSON.parse(event.data)

        // If it's a coordinate message
        if (data.type === "coordinates") {
          // If it's from another client, update their position
          if (data.clientId && data.clientId !== clientIdRef.current) {
            setOtherClients((prev) => ({
              ...prev,
              [data.clientId as string]: { x: data.x, y: data.y },
            }))
          }
          setMsg(`Received coordinates: x=${data.x}, y=${data.y} from ${data.clientId}`)
        } else {
          // Handle regular text messages
          setMsg(event.data)
        }
      } catch (e) {
        // If not JSON, treat as a regular message
        setMsg(event.data)
      }

      console.log("Received message:", event.data)
    }

    ws.onclose = () => {
      console.log("WebSocket connection closed")
    }

    // Add keyboard event listener
    const handleKeyDown = (e: KeyboardEvent) => {
      let newX = coordinates.x
      let newY = coordinates.y

      // Update coordinates based on arrow key presses
      switch (e.key) {
        case "ArrowUp":
          newY = Math.max(0, coordinates.y - 5)
          break
        case "ArrowDown":
          newY = Math.min(100, coordinates.y + 5)
          break
        case "ArrowLeft":
          newX = Math.max(0, coordinates.x - 5)
          break
        case "ArrowRight":
          newX = Math.min(100, coordinates.x + 5)
          break
        default:
          return // Exit if not an arrow key
      }

      // Only update if coordinates changed
      if (newX !== coordinates.x || newY !== coordinates.y) {
        setCoordinates({ x: newX, y: newY })
        sendCoordinates(newX, newY)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    // Cleanup function
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      ws.close()
    }
  }, [coordinates])

  // Function to send coordinates to the server
  const sendCoordinates = (x: number, y: number) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message: CoordinateMessage = {
        type: "coordinates",
        x,
        y,
        clientId: clientIdRef.current,
      }
      wsRef.current.send(JSON.stringify(message))
    }
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>
        <Image className="dark:invert mb-4" src="/next.svg" alt="Next.js logo" width={180} height={38} />
      </header>

      <main className="flex flex-col gap-8 items-center w-full max-w-3xl">
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-lg p-6 relative" style={{ height: "400px" }}>
          {/* Your position marker */}
          <div
            className="absolute w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{
              left: `${coordinates.x}%`,
              top: `${coordinates.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            You
          </div>

          {/* Other clients' position markers */}
          {Object.entries(otherClients).map(([clientId, pos]) => (
            <div
              key={clientId}
              className="absolute w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              •
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md w-full">
          <h2 className="text-lg font-semibold mb-2">Your Position</h2>
          <p className="mb-4">
            X: {coordinates.x}, Y: {coordinates.y}
          </p>

          <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto mb-4">
            <div></div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newY = Math.max(0, coordinates.y - 5)
                setCoordinates((prev) => ({ ...prev, y: newY }))
                sendCoordinates(coordinates.x, newY)
              }}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <div></div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newX = Math.max(0, coordinates.x - 5)
                setCoordinates((prev) => ({ ...prev, x: newX }))
                sendCoordinates(newX, coordinates.y)
              }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div></div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newX = Math.min(100, coordinates.x + 5)
                setCoordinates((prev) => ({ ...prev, x: newX }))
                sendCoordinates(newX, coordinates.y)
              }}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>

            <div></div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newY = Math.min(100, coordinates.y + 5)
                setCoordinates((prev) => ({ ...prev, y: newY }))
                sendCoordinates(coordinates.x, newY)
              }}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
            <div></div>
          </div>

          <div className="text-sm text-gray-500">
            <p>Use arrow keys to move or tap the buttons above</p>
            <p className="mt-2">Server message: {msg}</p>
          </div>
        </div>
      </main>

      <footer className="text-sm text-gray-500 mt-8">
        <p>Connected clients: {Object.keys(otherClients).length + 1}</p>
      </footer>
    </div>
  )
}

