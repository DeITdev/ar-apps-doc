# AplikasiEfortech_v1 - Documentation Structure

> **Note:** This document outlines the documentation structure for the Efortech AR Training & Monitoring Application.
> Use this as a reference for building the documentation website.

---

## 1. Introduction

### 1.1 Overview
- **Project Name:** AplikasiEfortech_v1
- **Type:** AR (Augmented Reality) Industrial Training & Monitoring Application
- **Platform:** Mobile (Android/iOS)
- **Engine:** Unity with AR Foundation

**Purpose:**
This application provides Augmented Reality visualization for industrial equipment, enabling technicians and trainees to view real-time SCADA data overlaid on 3D models of industrial systems.

### 1.2 Architecture
Explain the overall system architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    Mobile Device                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │              Unity AR Application                │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌──────────┐ │    │
│  │  │ AR System   │  │ SCADA API   │  │ UI Layer │ │    │
│  │  │ (Placement, │  │ (Get/Set    │  │ (Scenes, │ │    │
│  │  │  Gaze, etc) │  │  Data)      │  │  Panels) │ │    │
│  │  └─────────────┘  └─────────────┘  └──────────┘ │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
              ┌─────────────────────────┐
              │     SCADA Backend       │
              │ (Industrial Equipment)  │
              └─────────────────────────┘
```

**Key Components:**
- **AR System:** Handles object placement, gaze interaction, and surface detection
- **SCADA API Layer:** Communicates with external SCADA systems for real-time data
- **UI Layer:** Manages scenes, menus, and user interface elements
- **3D Models:** Industrial equipment prefabs (Water Pump Panel, Trainerkit)

### 1.3 Quick Start
Brief steps to get the application running:
1. Clone the repository
2. Open project in Unity (recommended version: 2022.3 LTS or later)
3. Import required packages (see Installation section)
4. Build for Android/iOS with AR support enabled
5. Deploy to AR-capable device

---

## 2. Installation

### 2.1 Project Structure

```
Assets/
├── Animation/              # Animation controllers and clips
│   └── LeanTween/          # LeanTween animation library
├── Audio/                  # Sound effects and background music
│   ├── Background Music/   # Ambient/BGM tracks
│   └── Casual Game Sounds U6/  # UI and game sound effects
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
```

### 2.2 Required Packages
Unity packages required for this project:

| Package | Purpose |
|---------|---------|
| AR Foundation | Core AR functionality |
| ARCore XR Plugin | Android AR support |
| ARKit XR Plugin | iOS AR support |
| XR Plugin Management | XR device management |
| Universal Render Pipeline (URP) | Graphics rendering |
| TextMesh Pro | Advanced text rendering |

### 2.3 3D Models
The project includes the following 3D equipment models:

| Model | Location | Description |
|-------|----------|-------------|
| Water Pump Panel | `Prefabs/WaterPump_panel/` | Industrial water pump system with sensors |
| Trainerkit (FinalBox) | `Prefabs/FinalBox/` | Training kit with interactive components |
| AR Planes | `Prefabs/AR Default Plane.prefab` | AR surface visualization |

**Model Specifications:**
- Format: FBX with embedded textures
- Textures: BaseColor, Normal, Metallic, Roughness maps
- Animations: Panel open/close, component animations

### 2.4 Scenes Overview

| Scene | File | Purpose |
|-------|------|---------|
| Main Menu | `Scenes/Main Menu.unity` | Application entry point and navigation |
| Onboard | `Scenes/Onboard.unity` | User onboarding/tutorial flow |
| AR Game | `Scenes/AR Game.unity` | Main AR experience |
| Quick Demo | `Scenes/Quick Demo.unity` | Demo mode for showcasing |
| AR Quick Demo | `Scenes/AR Quick Demo.unity` | AR-specific demo mode |

---

## 3. Core Features

### 3.1 AR Object Placement
**Scripts:** `AR_addon/CustomARPlacement.cs`, `AR_addon/ARManager.cs`

**Functionality:**
- Detect horizontal surfaces using AR plane detection
- Place 3D models by tapping on detected surfaces
- Move objects by dragging after placement
- Lock/unlock object position
- Delete placed objects
- Switch between different prefab options

### 3.2 SCADA Integration
**Scripts:** `SCADA_API/WaterPump/`, `SCADA_API/Trainerkit/`

**Components:**
- `GetScadaWaterPump.cs` - Fetch data from Water Pump SCADA
- `SetScadaWaterPump.cs` - Send commands to Water Pump SCADA
- `ScadaVisualUpdaterWaterPump.cs` - Update visuals based on SCADA data
- `GetScadaTrainerkit.cs` - Fetch data from Trainerkit SCADA
- `SetScadaTrainerkit.cs` - Send commands to Trainerkit SCADA
- `ScadaVisualUpdaterTrainerkit.cs` - Update visuals based on SCADA data

**Data Flow:**
1. Configure SCADA endpoint via `ScadaConfiguration` ScriptableObject
2. API polling fetches data at regular intervals
3. Visual updaters refresh 3D model displays
4. User interactions can send commands back to SCADA

### 3.3 Gaze Interaction
**Scripts:** `AR_addon/GazeInteraction.cs`, `AR_addon/InfoBehaviour.cs`

**Features:**
- Raycast-based gaze detection
- Automatic info panel display when looking at tagged objects
- Animation triggers on gaze focus
- Support for nested component hierarchies

### 3.4 Information Overlay
**Scripts:** `AR_addon/InfoBehaviour.cs`, `AR_addon/AnimationBehaviour.cs`

**Features:**
- Scalable info panels attached to 3D components
- Smooth open/close animations using LeanTween
- Graph visibility toggle for data displays
- State management via ScriptableObjects

---

## 4. Scripts Reference

### 4.1 AR Addon Scripts

| Script | Purpose |
|--------|---------|
| `ARManager.cs` | Central AR controller, manages UI buttons and states |
| `CustomARPlacement.cs` | Handles object spawning and placement on AR surfaces |
| `GazeInteraction.cs` | Processes gaze raycast and triggers interactions |
| `InfoBehaviour.cs` | Controls info panel show/hide behavior |
| `AnimationBehaviour.cs` | Manages component animations |
| `FaceCamera.cs` | Keeps UI elements facing the camera |
| `AR_GraphManager.cs` | Manages graph display in AR |

### 4.2 SCADA API Scripts

| Script | Purpose |
|--------|---------|
| `IP_AddressInput.cs` | Handles SCADA IP address configuration |
| `GetScadaWaterPump.cs` | Fetches Water Pump data via API |
| `SetScadaWaterPump.cs` | Sends commands to Water Pump |
| `ScadaVisualUpdaterWaterPump.cs` | Updates Water Pump visuals |
| `GetScadaTrainerkit.cs` | Fetches Trainerkit data via API |
| `SetScadaTrainerkit.cs` | Sends commands to Trainerkit |
| `ScadaVisualUpdaterTrainerkit.cs` | Updates Trainerkit visuals |

### 4.3 ScriptableObjects

| Asset | Purpose |
|-------|---------|
| `ScadaConfig.asset` | Stores SCADA connection settings |
| `GraphState.asset` | Tracks graph visibility state |
| `LockPositionState.asset` | Tracks object lock state |
| `ScadaDataWaterPump.asset` | Stores Water Pump data |
| `ScadaDataTrainerkit.asset` | Stores Trainerkit data |

### 4.4 Utility Scripts

| Script | Purpose |
|--------|---------|
| `SceneController.cs` | Manages scene transitions |
| `FadeScene.cs` | Scene transition fade effects |
| `FadeUI.cs` | UI element fade animations |
| `InputFieldController.cs` | Input field management |

---

## 5. Configuration

### 5.1 SCADA Configuration
Configure SCADA connection in `ScadaConfig.asset`:
- API endpoint URL
- Polling interval
- Authentication settings (if applicable)

### 5.2 AR Settings
XR settings location: `Assets/XR/`
- XR Plugin Management settings
- AR Session configuration
- Plane detection settings

### 5.3 Render Settings
URP settings location: `Assets/Renderer/`
- Universal Render Pipeline asset
- Camera rendering settings

---

## 6. Building & Deployment

### 6.1 Android Build
Requirements:
- Android SDK with API level 24+
- ARCore supported device
- Enable ARCore in XR Plugin Management

### 6.2 iOS Build
Requirements:
- Xcode on macOS
- ARKit supported device (iPhone 6s or later)
- Enable ARKit in XR Plugin Management

---

## 7. Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| AR planes not detecting | Ensure adequate lighting, move device slowly |
| SCADA data not updating | Check network connection and API endpoint |
| Objects not placing | Verify AR plane detection is working |
| Performance issues | Reduce model complexity, check device compatibility |

---

## 8. API Reference

### SCADA API Endpoints
Document the expected API structure for:
- GET requests (data retrieval)
- POST requests (command sending)
- Response format (JSON structure)
- Error handling

---

> **End of Documentation Structure**
> 
> This file serves as the blueprint for the documentation website.
> Expand each section with more detailed content as needed.
