import {
    Rocket,
    Terminal,
    Code,
    FileText,
    Settings,
    Building2,
    Database,
    Wrench,
} from "lucide-react"

import type { NavItem } from "./index"

// AR Industrial Equipment navigation items
export const arIndustrialNavMain: NavItem[] = [
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

# AR Industrial Equipment for Training & Monitoring

## Overview

| Property | Value |
|----------|-------|
| **Project Name** | AR Industrial Equipment for Training & Monitoring |
| **Type** | AR (Augmented Reality) Industrial Training & Monitoring Application |
| **Platform** | Mobile (Android/iOS) |
| **Engine** | Unity with AR Foundation |

![Overview](/images/ar-application-image-overview.png)

## Purpose

This application provides Augmented Reality visualization for industrial equipment, enabling technicians and trainees to view real-time SCADA data overlaid on 3D models of industrial systems.

> [!IMPORTANT]
> This application requires a stable network connection to communicate with the SCADA backend. Ensure that the SCADA API endpoint is accessible from the device running the AR application.`
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
5. Deploy to AR-capable device

> [!WARNING]
> Ensure your target device supports ARCore (Android) or ARKit (iOS). Not all devices are compatible with AR functionality. Check the official compatibility list before proceeding.`
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
├── Animation/
│   └── LeanTween/
├── Audio/
│   ├── Background Music/
│   └── Casual Game Sounds/
├── Background Animation/
├── Fonts/
├── Materials/
├── Prefabs/
│   ├── FinalBox/
│   ├── Panels/
│   └── WaterPump_panel/
├── Renderer/
├── Resources/
├── Scenes/
├── Script/
│   ├── AR_addon/
│   ├── AspectRatioSupport/
│   ├── AudioControl/
│   ├── CameraScript/
│   ├── SCADA_API/
│   │   ├── Trainerkit/
│   │   └── WaterPump/
│   └── ScriptableObjects/
├── Shaders/
├── Sprites/
│   └── UI/
├── TextMesh Pro/
├── Textures/
├── XR/
├── XR Image Library/
└── XRI/
\`\`\`

## Directory Descriptions

| Directory | Description |
|-----------|-------------|
| **Animation/** | Animation controllers, clips, and LeanTween library |
| **Audio/** | Sound effects, BGM tracks, and UI game sounds |
| **Background Animation/** | Background visual animations |
| **Fonts/** | Custom font files |
| **Materials/** | Unity materials for 3D models |
| **Prefabs/** | Reusable prefab objects (Trainerkit, Panels, Water Pump) |
| **Renderer/** | URP renderer settings |
| **Resources/** | Runtime-loaded resources |
| **Scenes/** | Unity scenes |
| **Script/** | All C# scripts |
| **Script/AR_addon/** | AR functionality scripts |
| **Script/SCADA_API/** | SCADA communication scripts (Trainerkit & Water Pump) |
| **Script/ScriptableObjects/** | Configuration assets |
| **Shaders/** | Custom shaders |
| **Sprites/** | 2D images and UI sprites |
| **TextMesh Pro/** | TextMesh Pro package assets |
| **Textures/** | Texture files |
| **XR/** | XR Plugin Management settings |
| **XR Image Library/** | AR image tracking references |
| **XRI/** | XR Interaction Toolkit settings |`
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
]
