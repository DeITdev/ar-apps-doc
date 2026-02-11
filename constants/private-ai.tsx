import {
    Rocket,
    Terminal,
    Database,
    Mic,
    Code,
    Layers,
    Wrench,
} from "lucide-react"

import type { NavItem } from "./index"

// Private AI Assistant navigation items
export const privateAiNavMain: NavItem[] = [
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
                content: `![Thumbnail](/images/private-ai-image-thumbnail.png)

# Private AI Chat with 3D Avatar & RAG

A fully local AI chat application with 3D avatar visualization, voice interaction, and Retrieval-Augmented Generation (RAG) for document-based question answering.

## Features

- **Local AI Chat** - Runs completely offline using Ollama (Mistral 7B)
- **3D Avatar** - Interactive VRM model with lip-sync and blinking
- **Voice Input** - Speech-to-text using Whisper (local)
- **Voice Output** - Text-to-speech using MMS-TTS (Indonesian)
- **RAG System** - Query PDF documents for accurate, context-aware responses
- **Local Storage** - All data stored locally using IndexedDB
- **Dark Mode** - Built-in theme support

> [!NOTE]
> This application runs entirely on your local machine. No data is sent to external servers, ensuring complete privacy and data security.`
            },
            {
                title: "Architecture",
                url: "/dashboard?section=architecture",
                content: `![System Architecture](/images/private-ai-image-system.png)

# Architecture

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
3. **Ollama** - For local LLM ([Download](https://ollama.ai))

> [!TIP]
> For best performance, use a machine with a dedicated GPU. Ollama will automatically use CUDA if available, significantly improving response times.`
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
]
