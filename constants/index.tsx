import {
    Bot,
    BookOpen,
    Rocket,
    Building2,
    Layers,
    Settings,
    Code,
    FileText,
    Terminal,
    Mic,
    Database,
    Wrench,
    type LucideIcon,
} from "lucide-react"

// Navigation item type
export type NavSubItem = {
    title: string
    url: string
    isActive?: boolean
    content?: string
}

export type NavItem = {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: NavSubItem[]
}

// Documentation type definition
export type Documentation = {
    id: string
    name: string
    version: string
    logo: LucideIcon
    navMain: NavItem[]
}

// List of available documentations with their navigation
export const documentations: Documentation[] = [
    {
        id: "private-ai",
        name: "Private AI Assistant",
        version: "v1.0.0",
        logo: Bot,
        navMain: [
            {
                title: "Getting Started",
                url: "#",
                icon: Rocket,
                isActive: true,
                items: [
                    {
                        title: "Introduction",
                        url: "/dashboard?section=introduction",
                        isActive: true,
                        content: `# Private AI Chat with 3D Avatar & RAG

A fully local AI chat application with 3D avatar visualization, voice interaction, and Retrieval-Augmented Generation (RAG) for document-based question answering.

## Features

- 🤖 **Local AI Chat** - Runs completely offline using Ollama (Mistral 7B)
- 🎭 **3D Avatar** - Interactive VRM model with lip-sync and blinking
- 🎤 **Voice Input** - Speech-to-text using Whisper (local)
- 🔊 **Voice Output** - Text-to-speech using MMS-TTS (Indonesian)
- 📚 **RAG System** - Query PDF documents for accurate, context-aware responses
- 💾 **Local Storage** - All data stored locally using IndexedDB
- 🌙 **Dark Mode** - Built-in theme support`
                    },
                    {
                        title: "Architecture",
                        url: "/dashboard?section=architecture",
                        content: `# Architecture

\`\`\`
Frontend (React + TypeScript)
    ↓
    ├─→ Whisper Server (Port 5001) - Speech Recognition
    ├─→ RAG Server (Port 5003) - Document Retrieval
    ├─→ Ollama (Port 11434) - LLM Processing
    └─→ TTS Server (Port 5002) - Speech Synthesis
\`\`\`

## Components Overview

| Component | Port | Purpose |
|-----------|------|---------|
| Frontend | 5173 | React UI with 3D avatar |
| Whisper | 5001 | Speech-to-text |
| TTS | 5002 | Text-to-speech |
| RAG | 5003 | Document retrieval |
| Ollama | 11434 | LLM processing |`
                    },
                    {
                        title: "Quick Start",
                        url: "/dashboard?section=quick-start",
                        content: `# Quick Start

## Prerequisites

1. **Node.js** (v18+) - For frontend
2. **Python** (v3.10+) - For backend servers
3. **Ollama** - For local LLM ([Download](https://ollama.ai))`
                    },
                ],
            },
            {
                title: "Installation",
                url: "#",
                icon: Terminal,
                items: [
                    {
                        title: "Frontend Setup",
                        url: "/dashboard?section=frontend-setup",
                        content: `# Frontend Setup

## Install Frontend Dependencies

\`\`\`codetabs
{
  "npm": "npm install",
  "pnpm": "pnpm install",
  "yarn": "yarn install",
  "bun": "bun install"
}
\`\`\`

## Run Development Server

\`\`\`codetabs
{
  "npm": "npm run dev",
  "pnpm": "pnpm run dev",
  "yarn": "yarn dev",
  "bun": "bun run dev"
}
\`\`\`

Access the app at: http://localhost:5173`
                    },
                    {
                        title: "Python Environment",
                        url: "/dashboard?section=python-env",
                        content: `# Python Environment Setup

## Create Virtual Environment

\`\`\`codetabs
{
  "powershell": "# Create virtual environment\\npython -m venv venv\\n\\n# Activate (Windows)\\n.\\\\venv\\\\Scripts\\\\Activate.ps1\\n\\n# Install dependencies\\npip install -r requirements.txt"
}
\`\`\``
                    },
                    {
                        title: "Ollama Model",
                        url: "/dashboard?section=ollama",
                        content: `# Install Ollama Model

## Download and Install Mistral

\`\`\`codetabs
{
  "bash": "ollama pull mistral:7b"
}
\`\`\`

## Verify Installation

\`\`\`codetabs
{
  "bash": "ollama list"
}
\`\`\`

You should see \`mistral:7b\` in the list.`
                    },
                    {
                        title: "Running the App",
                        url: "/dashboard?section=running",
                        content: `# Running the Application

**You need 4 terminals:**

\`\`\`codetabs
{
  "terminals": "# Terminal 1: Frontend\\nnpm run dev\\n\\n# Terminal 2: Whisper (activate venv first)\\npython whisper_server.py\\n\\n# Terminal 3: TTS (activate venv first)\\npython tts_server.py\\n\\n# Terminal 4: RAG (activate venv first)\\npython rag_server.py"
}
\`\`\`

Access the app at: http://localhost:5173`
                    },
                ],
            },
            {
                title: "RAG System",
                url: "#",
                icon: Database,
                items: [
                    {
                        title: "Overview",
                        url: "/dashboard?section=rag-overview",
                        content: `# RAG (Retrieval-Augmented Generation)

The RAG system allows your AI avatar to answer questions based on your PDF documents with accurate, real information.

## RAG Features

- ✅ Automatic PDF text extraction
- ✅ Intelligent text chunking (800 chars, 150 overlap)
- ✅ Indonesian-optimized embeddings (paraphrase-multilingual-MiniLM-L12-v2)
- ✅ Vector search with ChromaDB
- ✅ Auto re-indexing on file changes
- ✅ Top-3 relevant chunk retrieval`
                    },
                    {
                        title: "Setup RAG",
                        url: "/dashboard?section=rag-setup",
                        content: `# Setup RAG

1. **Add PDFs** - Place Indonesian PDF documents in \`data/pdfs/\`
2. **Start Server** - Run \`python rag_server.py\`
3. **Auto-Index** - Server automatically processes and indexes PDFs
4. **Query** - Ask questions and get context-aware responses`
                    },
                    {
                        title: "Configuration",
                        url: "/dashboard?section=rag-config",
                        content: `# RAG Configuration

## Settings in \`rag_server.py\`

\`\`\`python
CHUNK_SIZE = 800          # Characters per chunk
CHUNK_OVERLAP = 150       # Overlap between chunks
TOP_K_RESULTS = 3         # Number of chunks to retrieve
\`\`\``
                    },
                ],
            },
            {
                title: "Voice System",
                url: "#",
                icon: Mic,
                items: [
                    {
                        title: "Voice Mode",
                        url: "/dashboard?section=voice-mode",
                        content: `# Voice Mode (Avatar Page)

1. Click microphone button
2. Speak your question in Indonesian
3. RAG system retrieves relevant PDF context
4. Avatar responds with synthesized voice
5. Mouth animates in sync with speech`
                    },
                    {
                        title: "Chat Mode",
                        url: "/dashboard?section=chat-mode",
                        content: `# Chat Mode

1. Type your message
2. RAG system finds relevant document chunks
3. LLM generates context-aware response
4. Response displayed in chat interface`
                    },
                ],
            },
            {
                title: "API Reference",
                url: "#",
                icon: Code,
                items: [
                    {
                        title: "Whisper API",
                        url: "/dashboard?section=whisper-api",
                        content: `# Whisper Server (Port 5001)

## Endpoints

### POST /transcribe
Convert audio to text.

### GET /health
Health check endpoint.`
                    },
                    {
                        title: "TTS API",
                        url: "/dashboard?section=tts-api",
                        content: `# TTS Server (Port 5002)

## Endpoints

### POST /synthesize
Convert text to speech.

### GET /health
Health check endpoint.`
                    },
                    {
                        title: "RAG API",
                        url: "/dashboard?section=rag-api",
                        content: `# RAG Server (Port 5003)

## Endpoints

### POST /query
Query documents for context.

### POST /reindex
Re-index all PDFs.

### GET /stats
Get indexing statistics.

### GET /health
Health check endpoint.`
                    },
                ],
            },
            {
                title: "Project Structure",
                url: "#",
                icon: Layers,
                items: [
                    {
                        title: "Directory Layout",
                        url: "/dashboard?section=structure",
                        content: `# Project Structure

\`\`\`
private-ai-chat/
├── src/                      # Frontend source
│   ├── pages/
│   │   ├── ChatPage.tsx      # Text chat interface
│   │   └── AvatarPage.tsx    # 3D avatar + voice interface
│   └── components/
│       └── VRMViewer.tsx     # 3D avatar renderer
├── data/
│   ├── pdfs/                 # PDF documents for RAG
│   └── vector_store/         # ChromaDB persistence
├── whisper_server.py         # Speech-to-text (Port 5001)
├── tts_server.py             # Text-to-speech (Port 5002)
├── rag_server.py             # RAG system (Port 5003)
└── requirements.txt          # Python dependencies
\`\`\``
                    },
                    {
                        title: "Tech Stack",
                        url: "/dashboard?section=tech-stack",
                        content: `# Tech Stack

## Frontend
- React + TypeScript + Vite
- Three.js + @pixiv/three-vrm (3D rendering)
- Dexie.js (IndexedDB wrapper)
- Tailwind CSS + shadcn/ui

## Backend
- Flask + Flask-CORS (Web servers)
- OpenAI Whisper (Speech recognition)
- Transformers + MMS-TTS (Speech synthesis)
- ChromaDB (Vector database)
- Sentence-Transformers (Embeddings)
- PyPDF2 (PDF processing)

## AI/ML
- Ollama + Mistral 7B (Local LLM)
- Whisper Base (Speech-to-text)
- facebook/mms-tts-ind (Indonesian TTS)
- paraphrase-multilingual-MiniLM-L12-v2 (Embeddings)`
                    },
                ],
            },
            {
                title: "Troubleshooting",
                url: "#",
                icon: Wrench,
                items: [
                    {
                        title: "Common Issues",
                        url: "/dashboard?section=troubleshooting",
                        content: `# Troubleshooting

## Common Issues

### RAG server not starting
- Check Python dependencies installed
- Ensure \`data/pdfs/\` folder exists
- Verify port 5003 is available

### No context from PDFs
- Confirm PDFs are in \`data/pdfs/\`
- Check server logs for indexing errors
- Try re-indexing: \`curl -X POST http://localhost:5003/reindex\`

### Voice not working
- Grant microphone permissions
- Check all 4 servers are running
- Verify Ollama is running: \`ollama list\``
                    },
                ],
            },
        ],
    },
    {
        id: "ar-app",
        name: "AR Application",
        version: "v1.0.0",
        logo: Layers,
        navMain: [
            {
                title: "Getting Started",
                url: "#",
                icon: Rocket,
                isActive: true,
                items: [
                    {
                        title: "Introduction",
                        url: "/dashboard?section=ar-intro",
                        isActive: true,
                        content: `![Thumbnail](/images/ar-application-image-thumbnail.png)

# AplikasiEfortech_v1 - AR Training & Monitoring

## Overview

| Property | Value |
|----------|-------|
| **Project Name** | AplikasiEfortech_v1 |
| **Type** | AR (Augmented Reality) Industrial Training & Monitoring Application |
| **Platform** | Mobile (Android/iOS) |
| **Engine** | Unity with AR Foundation |

![Overview](/images/ar-application-image-overview.png)

## Purpose

This application provides Augmented Reality visualization for industrial equipment, enabling technicians and trainees to view real-time SCADA data overlaid on 3D models of industrial systems.`
                    },
                    {
                        title: "Architecture",
                        url: "/dashboard?section=ar-architecture",
                        content: `# System Architecture

![System Architecture](/images/ar-application-image-system.png)

![Workflow](/images/ar-application-image-workflow.png)

*The workflow diagram illustrates the data flow from the SCADA backend to the AR application, highlighting the interaction between the physical plant, the SCADA API, and the augmented reality visualization layer.*

## Key Components

| Component | Description |
|-----------|-------------|
| **AR System** | Handles object placement, gaze interaction, and surface detection |
| **SCADA API Layer** | Communicates with external SCADA systems for real-time data |
| **UI Layer** | Manages scenes, menus, and user interface elements |
| **3D Models** | Industrial equipment prefabs (Water Pump Panel, Trainerkit) |`
                    },
                    {
                        title: "Quick Start",
                        url: "/dashboard?section=ar-quick-start",
                        content: `# Quick Start

## Steps to Get Started

1. Clone the repository
2. Open project in Unity (recommended version: 2022.3 LTS or later)
3. Import required packages (see Installation section)
4. Build for Android/iOS with AR support enabled
5. Deploy to AR-capable device`
                    },
                ],
            },
            {
                title: "Installation",
                url: "#",
                icon: Terminal,
                items: [
                    {
                        title: "Project Structure",
                        url: "/dashboard?section=ar-project-structure",
                        content: `# Project Structure

\`\`\`
Assets/
├── Animation/              # Animation controllers and clips
│   └── LeanTween/          # LeanTween animation library
├── Audio/                  # Sound effects and background music
│   ├── Background Music/   # Ambient/BGM tracks
│   └── Casual Game Sounds/ # UI and game sound effects
├── Background Animation/   # Background visual animations
├── Fonts/                  # Custom font files
├── Materials/              # Unity materials for 3D models
├── Prefabs/                # Reusable prefab objects
│   ├── FinalBox/           # Trainerkit 3D model and textures
│   ├── Panels/             # UI panel prefabs
│   └── WaterPump_panel/    # Water Pump 3D model and textures
├── Renderer/               # URP renderer settings
├── Resources/              # Runtime-loaded resources
├── Scenes/                 # Unity scenes
├── Script/                 # All C# scripts
│   ├── AR_addon/           # AR functionality scripts
│   ├── AspectRatioSupport/ # Screen aspect ratio handling
│   ├── AudioControl/       # Audio management
│   ├── CameraScript/       # Camera control logic
│   ├── SCADA_API/          # SCADA communication scripts
│   │   ├── Trainerkit/     # Trainerkit API scripts
│   │   └── WaterPump/      # Water Pump API scripts
│   └── ScriptableObjects/  # Configuration assets
├── Shaders/                # Custom shaders
├── Sprites/                # 2D images and UI sprites
│   └── UI/                 # User interface graphics
├── TextMesh Pro/           # TextMesh Pro package assets
├── Textures/               # Texture files
├── XR/                     # XR Plugin Management settings
├── XR Image Library/       # AR image tracking references
└── XRI/                    # XR Interaction Toolkit settings
\`\`\``
                    },
                    {
                        title: "Required Packages",
                        url: "/dashboard?section=ar-packages",
                        content: `# Required Packages

Unity packages required for this project:

| Package | Purpose |
|---------|---------|
| AR Foundation | Core AR functionality |
| ARCore XR Plugin | Android AR support |
| ARKit XR Plugin | iOS AR support |
| XR Plugin Management | XR device management |
| Universal Render Pipeline (URP) | Graphics rendering |
| TextMesh Pro | Advanced text rendering |`
                    },
                    {
                        title: "3D Models",
                        url: "/dashboard?section=ar-models",
                        content: `# 3D Models

The project includes the following 3D equipment models:

| Model | Location | Description |
|-------|----------|-------------|
| Water Pump Panel | \`Prefabs/WaterPump_panel/\` | Industrial water pump system with sensors |
| Trainerkit (FinalBox) | \`Prefabs/FinalBox/\` | Training kit with interactive components |
| AR Planes | \`Prefabs/AR Default Plane.prefab\` | AR surface visualization |

## Model Specifications

- **Format:** FBX with embedded textures
- **Textures:** BaseColor, Normal, Metallic, Roughness maps
- **Animations:** Panel open/close, component animations`
                    },
                    {
                        title: "Scenes Overview",
                        url: "/dashboard?section=ar-scenes",
                        content: `# Scenes Overview

| Scene | File | Purpose |
|-------|------|---------|
| Main Menu | \`Scenes/Main Menu.unity\` | Application entry point and navigation |
| Onboard | \`Scenes/Onboard.unity\` | User onboarding/tutorial flow |
| AR Game | \`Scenes/AR Game.unity\` | Main AR experience |
| Quick Demo | \`Scenes/Quick Demo.unity\` | Demo mode for showcasing |
| AR Quick Demo | \`Scenes/AR Quick Demo.unity\` | AR-specific demo mode |`
                    },
                ],
            },
            {
                title: "Core Features",
                url: "#",
                icon: Code,
                items: [
                    {
                        title: "AR Object Placement",
                        url: "/dashboard?section=ar-placement",
                        content: `# AR Object Placement

**Scripts:** \`AR_addon/CustomARPlacement.cs\`, \`AR_addon/ARManager.cs\`

## Functionality

- Detect horizontal surfaces using AR plane detection
- Place 3D models by tapping on detected surfaces
- Move objects by dragging after placement
- Lock/unlock object position
- Delete placed objects
- Switch between different prefab options`
                    },
                    {
                        title: "SCADA Integration",
                        url: "/dashboard?section=ar-scada",
                        content: `# SCADA Integration

**Scripts:** \`SCADA_API/WaterPump/\`, \`SCADA_API/Trainerkit/\`

## Components

| Script | Purpose |
|--------|---------|
| \`GetScadaWaterPump.cs\` | Fetch data from Water Pump SCADA |
| \`SetScadaWaterPump.cs\` | Send commands to Water Pump SCADA |
| \`ScadaVisualUpdaterWaterPump.cs\` | Update visuals based on SCADA data |
| \`GetScadaTrainerkit.cs\` | Fetch data from Trainerkit SCADA |
| \`SetScadaTrainerkit.cs\` | Send commands to Trainerkit SCADA |
| \`ScadaVisualUpdaterTrainerkit.cs\` | Update visuals based on SCADA data |

## Data Flow

1. Configure SCADA endpoint via \`ScadaConfiguration\` ScriptableObject
2. API polling fetches data at regular intervals
3. Visual updaters refresh 3D model displays
4. User interactions can send commands back to SCADA`
                    },
                    {
                        title: "Gaze Interaction",
                        url: "/dashboard?section=ar-gaze",
                        content: `# Gaze Interaction

**Scripts:** \`AR_addon/GazeInteraction.cs\`, \`AR_addon/InfoBehaviour.cs\`

## Features

- Raycast-based gaze detection
- Automatic info panel display when looking at tagged objects
- Animation triggers on gaze focus
- Support for nested component hierarchies`
                    },
                    {
                        title: "Information Overlay",
                        url: "/dashboard?section=ar-info-overlay",
                        content: `# Information Overlay

**Scripts:** \`AR_addon/InfoBehaviour.cs\`, \`AR_addon/AnimationBehaviour.cs\`

## Features

- Scalable info panels attached to 3D components
- Smooth open/close animations using LeanTween
- Graph visibility toggle for data displays
- State management via ScriptableObjects`
                    },
                ],
            },
            {
                title: "Scripts Reference",
                url: "#",
                icon: FileText,
                items: [
                    {
                        title: "AR Addon Scripts",
                        url: "/dashboard?section=ar-addon-scripts",
                        content: `# AR Addon Scripts

| Script | Purpose |
|--------|---------|
| \`ARManager.cs\` | Central AR controller, manages UI buttons and states |
| \`CustomARPlacement.cs\` | Handles object spawning and placement on AR surfaces |
| \`GazeInteraction.cs\` | Processes gaze raycast and triggers interactions |
| \`InfoBehaviour.cs\` | Controls info panel show/hide behavior |
| \`AnimationBehaviour.cs\` | Manages component animations |
| \`FaceCamera.cs\` | Keeps UI elements facing the camera |
| \`AR_GraphManager.cs\` | Manages graph display in AR |`
                    },
                    {
                        title: "SCADA API Scripts",
                        url: "/dashboard?section=ar-scada-scripts",
                        content: `# SCADA API Scripts

| Script | Purpose |
|--------|---------|
| \`IP_AddressInput.cs\` | Handles SCADA IP address configuration |
| \`GetScadaWaterPump.cs\` | Fetches Water Pump data via API |
| \`SetScadaWaterPump.cs\` | Sends commands to Water Pump |
| \`ScadaVisualUpdaterWaterPump.cs\` | Updates Water Pump visuals |
| \`GetScadaTrainerkit.cs\` | Fetches Trainerkit data via API |
| \`SetScadaTrainerkit.cs\` | Sends commands to Trainerkit |
| \`ScadaVisualUpdaterTrainerkit.cs\` | Updates Trainerkit visuals |`
                    },
                    {
                        title: "ScriptableObjects",
                        url: "/dashboard?section=ar-scriptable-objects",
                        content: `# ScriptableObjects

| Asset | Purpose |
|-------|---------|
| \`ScadaConfig.asset\` | Stores SCADA connection settings |
| \`GraphState.asset\` | Tracks graph visibility state |
| \`LockPositionState.asset\` | Tracks object lock state |
| \`ScadaDataWaterPump.asset\` | Stores Water Pump data |
| \`ScadaDataTrainerkit.asset\` | Stores Trainerkit data |`
                    },
                    {
                        title: "Utility Scripts",
                        url: "/dashboard?section=ar-utility-scripts",
                        content: `# Utility Scripts

| Script | Purpose |
|--------|---------|
| \`SceneController.cs\` | Manages scene transitions |
| \`FadeScene.cs\` | Scene transition fade effects |
| \`FadeUI.cs\` | UI element fade animations |
| \`InputFieldController.cs\` | Input field management |`
                    },
                ],
            },
            {
                title: "Configuration",
                url: "#",
                icon: Settings,
                items: [
                    {
                        title: "SCADA Configuration",
                        url: "/dashboard?section=ar-scada-config",
                        content: `# SCADA Configuration

Configure SCADA connection in \`ScadaConfig.asset\`:

- API endpoint URL
- Polling interval
- Authentication settings (if applicable)`
                    },
                    {
                        title: "AR Settings",
                        url: "/dashboard?section=ar-settings",
                        content: `# AR Settings

XR settings location: \`Assets/XR/\`

- XR Plugin Management settings
- AR Session configuration
- Plane detection settings`
                    },
                    {
                        title: "Render Settings",
                        url: "/dashboard?section=ar-render",
                        content: `# Render Settings

URP settings location: \`Assets/Renderer/\`

- Universal Render Pipeline asset
- Camera rendering settings`
                    },
                ],
            },
            {
                title: "Building & Deployment",
                url: "#",
                icon: Building2,
                items: [
                    {
                        title: "Android Build",
                        url: "/dashboard?section=ar-android",
                        content: `# Android Build

## Requirements

- Android SDK with API level 24+
- ARCore supported device
- Enable ARCore in XR Plugin Management`
                    },
                    {
                        title: "iOS Build",
                        url: "/dashboard?section=ar-ios",
                        content: `# iOS Build

## Requirements

- Xcode on macOS
- ARKit supported device (iPhone 6s or later)
- Enable ARKit in XR Plugin Management`
                    },
                ],
            },
            {
                title: "Troubleshooting",
                url: "#",
                icon: Wrench,
                items: [
                    {
                        title: "Common Issues",
                        url: "/dashboard?section=ar-troubleshooting",
                        content: `# Troubleshooting

## Common Issues

| Issue | Solution |
|-------|----------|
| AR planes not detecting | Ensure adequate lighting, move device slowly |
| SCADA data not updating | Check network connection and API endpoint |
| Objects not placing | Verify AR plane detection is working |
| Performance issues | Reduce model complexity, check device compatibility |`
                    },
                ],
            },
            {
                title: "API Reference",
                url: "#",
                icon: Database,
                items: [
                    {
                        title: "SCADA API Endpoints",
                        url: "/dashboard?section=ar-api",
                        content: `# SCADA API Reference

## Expected API Structure

### GET Requests (Data Retrieval)
- Fetch sensor values
- Get equipment status
- Retrieve historical data

### POST Requests (Command Sending)
- Set equipment parameters
- Control actuators
- Update configuration

### Response Format
- JSON structure with status and data fields
- Error handling with appropriate status codes`
                    },
                ],
            },
        ],
    },
]
