import {
    Rocket,
    Hand,
    Cog,
    Layers,
    Code,
    Wrench,
    MousePointerClick,
} from "lucide-react"

import type { NavItem } from "./index"

// VR Savior Hand Pose navigation items
export const vrSaviorHandPoseNavMain: NavItem[] = [
    {
        title: "Getting Started",
        url: "#",
        icon: Rocket,
        isActive: true,
        items: [
            {
                title: "Overview",
                url: "/dashboard?section=vr-hp-overview",
                isActive: true,
                content: `# VR Hand Pose System

![Thumbnail](/images/vr-savior_hand-pose-thumbnail.png)

A comprehensive guide to the VR hand pose system used in the Savior project. This system allows developers to create custom hand poses for grabbable objects, providing realistic hand animations when interacting with VR objects.

## Key Concepts

| Concept | Description |
|---------|-------------|
| **Hand Pose Data** | A ScriptableObject that stores bone positions and rotations for a specific hand pose |
| **Hand Pose Editor** | An editor window for saving/loading poses by manipulating the 3D hand model directly in the Scene view |
| **Hand Pose Mirror** | An editor tool that automatically mirrors a pose from one hand to the other using rest-pose-relative delta mirroring |
| **Animator-driven** | All poses are delivered as animation states inside an Animator Controller, blended together using a 2D Blend Tree driven by \`grip\` and \`trigger\` input values |

> [!NOTE]
> This system enables per-object custom hand animations in VR. When a player grabs an object, the hand model transitions from its default resting pose to a specific grasp pose that matches the shape of the object (e.g., gripping a wrench, holding a carabiner, pinching a small item).

\`\`\`youtube
https://www.youtube.com/embed/5rsHrYPRGOQ?si=1Atj6dKZYtwmRjX0
\`\`\``
            },
            {
                title: "Architecture",
                url: "/dashboard?section=vr-hp-architecture",
                content: `# Architecture

\`\`\`
┌──────────────────────────────────────────────────────────────┐
│                        EDITOR TOOLS                          │
│                                                              │
│  ┌─────────────────────┐    ┌──────────────────────────┐     │
│  │  HandPoseEditorWindow│   │   HandPoseMirrorWindow   │     │
│  │  (Save/Load poses)  │──▶│   (Left ↔ Right)         │     │
│  └─────────┬───────────┘    └──────────┬───────────────┘     │
│            │                           │                     │
│            ▼                           ▼                     │
│  ┌─────────────────────────────────────────────────────┐     │
│  │              Hand Pose Data (ScriptableObject)      │     │
│  │              Stores bone names + local pos/rot      │     │
│  └─────────────────────┬───────────────────────────────┘     │
└────────────────────────┼─────────────────────────────────────┘
                         │
                         ▼  (used to create keyframes)
┌──────────────────────────────────────────────────────────────┐
│                     ANIMATION LAYER                          │
│                                                              │
│  ┌──────────────────┐    ┌─────────────────────────────┐     │
│  │  Animation Clips │    │  Animator Controller        │     │
│  │  (Left/Right)    │──▶│  Blend Tree + Pose States   │     │
│  └──────────────────┘    └──────────────┬──────────────┘     │
└─────────────────────────────────────────┼────────────────────┘
                                          │
                                          ▼  (drives hand mesh)
┌──────────────────────────────────────────────────────────────┐
│                      RUNTIME LAYER                           │
│                                                              │
│  ┌────────────────────┐      ┌──────────────────────────┐    │
│  │   HandAnimator     │◀────▶│  XRGrabPoseListener      │    │
│  │ (reads grip/trigger│      │  (triggers pose on grab, │    │
│  │  input, plays      │      │   hand attach offset,    │    │
│  │  animations)       │      │   snap-to-object)        │    │
│  └────────────────────┘      └──────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
\`\`\``
            },
            {
                title: "Resources & File Structure",
                url: "/dashboard?section=vr-hp-resources",
                content: `# Resources & File Structure

![Animation Component](/images/vr-savior_animation-component.png)

## 3D Hand Models

| Asset | Path |
|---|---|
| Left Hand Model | \`Assets/Samples/XR Hands/1.7.2/HandVisualizer/Models/LeftHandAndroidXR.fbx\` |
| Right Hand Model | \`Assets/Samples/XR Hands/1.7.2/HandVisualizer/Models/RightHandAndroidXR.fbx\` |

## Animation Clips

Each pose has a corresponding left and right animation clip. The naming convention is \`Left_[PoseName]_XR\` / \`Right_[PoseName]_XR\`.

| Pose | Left Clip | Right Clip |
|---|---|---|
| Base (resting) | \`Left_Base_XR.anim\` | \`Right_Base_XR.anim\` |
| Grab | \`Left_Grab_XR.anim\` | \`Right_Grab_XR.anim\` |
| Grip | \`Left_Grip.anim\` | \`Right_Grip.anim\` |
| Pinch | \`Left_Pinch_XR.anim\` | \`Right_Pinch_XR.anim\` |
| Carabiner | \`Left_Carabiner_XR.anim\` | \`Right_Carabiner_XR.anim\` |

**Location:** \`Assets/Samples/XR Hands/1.7.2/HandVisualizer/Models/\` (some in \`Assets/_MolcaSDK/_VR/3D/Hands/\`)

## Animator Controllers

| Controller | Path |
|---|---|
| Left Hand | \`Assets/Samples/XR Hands/1.7.2/HandVisualizer/Models/LeftHand_XR.controller\` |
| Right Hand | \`Assets/Samples/XR Hands/1.7.2/HandVisualizer/Models/RightHand_XR.controller\` |

## Hand Pose Data Assets

![Hand Pose Data](/images/vr-savior_hand-pose-data.png)

Located at \`Assets/_Savior/Scenarios/WAH_Scaffold/ScriptableObjects/HandPoseData/\`:

| Pose | Left Hand | Right Hand |
|---|---|---|
| Base | \`LeftHandBase.asset\` | \`RightHandBase.asset\` |
| Grab | \`LeftHandGrab.asset\` | \`RightHandGrab.asset\` |
| Grip | \`LeftHandGrib.asset\` | \`RightHandGrib.asset\` |
| Pinch | \`LeftHandPinch.asset\` | \`RightHandPinch.asset\` |
| Carabiner | \`LeftHandCarabiner.asset\` | \`RightHandCarabiner.asset\` |`
            },
        ],
    },
    {
        title: "Setup Guide",
        url: "#",
        icon: Hand,
        items: [
            {
                title: "Create Hand Pose Data",
                url: "/dashboard?section=vr-hp-step1",
                content: `# Step 1: Create Hand Pose Data

1. In the **Project** panel, right-click in the desired folder.
2. Navigate to **Create → Savior → XR → Hand Pose**.
3. Name the asset descriptively, following the convention: \`LeftHand[PoseName]\` or \`RightHand[PoseName]\`.
   - Example: \`LeftHandCarabiner\`, \`RightHandCarabiner\`

> [!TIP]
> You only need to create the pose for **one hand** first. The mirror tool can generate the other automatically.`
            },
            {
                title: "Sculpt the Hand Pose",
                url: "/dashboard?section=vr-hp-step2",
                content: `# Step 2: Sculpt the Hand Pose

1. Open the **Hand Pose Editor** window: go to **Tools → XR → Hand Pose Editor**.
2. In the editor window:
   - **Hand Root**: Drag the root transform of the 3D hand model from the Hierarchy (e.g., \`Left_Hand_XR\`).
   - **Pose Data**: Drag the \`HandPoseData\` asset you just created.
3. In the **Scene View**, select individual bones of the hand model and manually rotate them into the desired pose.
   - Use the **Rotation tool** (shortcut: \`E\`) for precise bone adjustments.
   - Work from proximal (base) to distal (tip) for natural-looking curls.

> [!IMPORTANT]
> Position the target object near the hand model in the scene as visual reference while sculpting the pose.`
            },
            {
                title: "Save the Pose",
                url: "/dashboard?section=vr-hp-step3",
                content: `# Step 3: Save the Pose

1. Click **"Save Pose"** in the Hand Pose Editor window.
2. The tool records the \`localPosition\` and \`localRotation\` of every bone and stores them in the \`HandPoseData\` asset.
3. Use **"Load Pose"** to preview a saved pose (applies rotations only).
4. Use **"Clear Pose"** to reset the pose data if needed.`
            },
            {
                title: "Mirror the Pose",
                url: "/dashboard?section=vr-hp-step4",
                content: `# Step 4: Mirror the Pose

![Hand Pose Editor Mirror](/images/vr-savior_hand-pose-editor-mirror.png)

Instead of manually sculpting the same pose for the other hand, use the **Hand Pose Mirror** tool:

1. Open the mirror tool: go to **Tools → XR → Hand Pose Mirror**.
2. Configure the settings:
   - **Source Hand Model**: The source hand model transform (must be in rest/default pose).
   - **Target Hand Model**: The target hand model transform (must be in rest/default pose).
   - **Source Pose**: The \`HandPoseData\` asset containing the pose to mirror.
   - **Target Pose**: An existing \`HandPoseData\` asset to overwrite with the mirrored result.
3. Click **"Build Bone Mapping"** to establish bone pairs and capture rest rotations.
4. Click **"Mirror Pose"** to overwrite the target, or **"Create Mirrored Copy"** to generate a new asset (auto-swaps Left/Right in the name).

## How Mirroring Works

1. Bone names are mapped via structural (depth-first index) matching between source and target models.
2. For each bone, the **delta** rotation from the source rest pose is computed: \`delta = Inverse(sourceRest) * sourcePose\`.
3. This delta is applied to the target's rest pose: \`targetPose = targetRest * delta\`.
4. This produces correct mirroring regardless of bone axis conventions between models.`
            },
        ],
    },
    {
        title: "Animation Setup",
        url: "#",
        icon: Cog,
        items: [
            {
                title: "Create Animation Clips",
                url: "/dashboard?section=vr-hp-step5",
                content: `# Step 5: Create Animation Clips

![Working with Animation](/images/vr-savior_working-with-animation.png)

With the pose data saved, create animation clips that the Animator Controller will use at runtime:

1. **Create a new Animation Clip** in the Project panel (Create → Animation).
2. Name it following the convention: \`Left_[PoseName]_XR\` / \`Right_[PoseName]_XR\`.
3. Select the hand model in the Hierarchy and load the pose via the Hand Pose Editor.
4. In the Animation window, add a **keyframe at frame 0** capturing all bone positions and rotations.

> [!NOTE]
> A single-frame animation clip is sufficient. The Animator's blend tree handles transitions between poses smoothly.`
            },
            {
                title: "Setup Animator Controller",
                url: "/dashboard?section=vr-hp-step6",
                content: `# Step 6: Setup the Animator Controller

![Animator Diagram](/images/vr-savior_animator-diagram.png)

The Animator Controller uses a **2D Freeform Cartesian Blend Tree** to blend between base hand poses based on controller input, plus additional states for object-specific poses.

## Blend Tree Configuration

1. Open the Animator Controller (e.g., \`RightHand_XR.controller\`).
2. The default state should be a **Blend Tree** with:
   - **Blend Type**: 2D Freeform Cartesian
   - **Parameters**: \`grip\` (X-axis) and \`trigger\` (Y-axis)

3. Add motion entries to the blend tree:

| Motion | Pos X (grip) | Pos Y (trigger) | Changes animation speed |
|---|---|---|---|
| \`Right_Base_XR\` | 0 | 0 | 0 |
| \`Right_Pinch_XR\` | 0 | 1 | 1 |
| \`Right_Grip_XR\` | 1 | 0 | 1 |
| \`Right_Grip_XR\` | 1 | 1 | 1 |

![Blend Tree Configuration](/images/vr-savior_animator-blend-tree-configuration.png)

> [!NOTE]
> The position (1,1) also maps to \`Grip\` because when both grip and trigger are fully pressed, the hand should be in a full grip pose.

## Animator Parameters

Ensure the controller has these **Float** parameters (case-sensitive):

- \`grip\` — Driven by the grip button input (0.0 to 1.0)
- \`trigger\` — Driven by the trigger button input (0.0 to 1.0)

## Add Object-Specific Pose States

For each custom grab pose:

1. Right-click in the Animator graph → **Create State → Empty**.
2. Name the state to match the animation clip name (e.g., \`Right_Carabiner_XR\`).
3. Assign the corresponding animation clip to the state's **Motion** field.
4. **Do not create transitions** — \`HandAnimator\` handles crossfades via \`CrossFade()\`.`
            },
            {
                title: "Setup Hand Visual",
                url: "/dashboard?section=vr-hp-step7",
                content: `# Step 7: Setup the Hand Visual GameObject

The hand visual hierarchy in the scene should be structured as follows:

\`\`\`
XR Origin
├── Left Hand Controller
│   ├── Left Direct Interactor
│   └── Left Hand Visual              ◄── Add HandAnimator here
│       └── Left_Hand_XR (3D Model)   ◄── Add Animator here
└── Right Hand Controller
    ├── Right Direct Interactor
    └── Right Hand Visual              ◄── Add HandAnimator here
        └── Right_Hand_XR (3D Model)   ◄── Add Animator here
\`\`\`

## Components to Add

**On the Hand Visual GameObject (e.g., \`Left Hand Visual\`):**

| Component | Configuration |
|---|---|
| **HandAnimator** | See fields below |

### HandAnimator Fields

| Field | Value |
|---|---|
| Hand Animator | Reference to the \`Animator\` component on the 3D hand model child |
| Trigger Param Name | \`trigger\` |
| Grip Param Name | \`grip\` |
| Grab Animation Layer | \`0\` |
| Default State Name | \`Blend Tree\` (name of the default blend tree state) |
| Transition Duration | \`0.1\` (seconds for crossfade) |
| Trigger Input | Bind to the controller's trigger action |
| Grip Input | Bind to the controller's grip action |

**On the 3D Hand Model GameObject (e.g., \`Left_Hand_XR\`):**

| Component | Configuration |
|---|---|
| **Animator** | Controller = \`LeftHand_XR.controller\` (or \`RightHand_XR.controller\`) |`
            },
            {
                title: "Setup Grabbable Object",
                url: "/dashboard?section=vr-hp-step8",
                content: `# Step 8: Setup the Grabbable Object

Add \`XRGrabPoseListener\` to any object with an \`XRBaseInteractable\` component (e.g., \`XRGrabInteractable\`).

## Configure Hand Pose Animation

Set the animation state names:

| Field | Value |
|---|---|
| \`Left Hand Animation Name\` | e.g., \`Left_Carabiner_XR\` |
| \`Right Hand Animation Name\` | e.g., \`Right_Carabiner_XR\` |

> [!NOTE]
> These names must **exactly match** the state names in the Animator Controller. The script uses \`CrossFade()\` via \`HandAnimator\` to transition to these states.

## Configure Hand Attach Offset (Optional)

Repositions the grabbed object to align with a hand-specific attach point instead of the default attach. Create child GameObjects as attach points for each hand, then assign them:

| Field | Value |
|---|---|
| \`Left Hand Attach Transform\` | Position/rotation for left hand alignment |
| \`Right Hand Attach Transform\` | Position/rotation for right hand alignment |

> [!IMPORTANT]
> This feature only works when the interactable is an \`XRGrabInteractable\`. The offset transformer is lazily registered and only instantiated when needed.

## Configure Snap-to-Object (Optional)

See the [Snap-to-Object Feature](#snap-to-object-feature) section for detailed setup instructions.`
            },
        ],
    },
    {
        title: "Script Reference",
        url: "#",
        icon: Code,
        items: [
            {
                title: "Scripts Overview",
                url: "/dashboard?section=vr-hp-scripts",
                content: `# Scripts Overview

The entire hand pose system is implemented with only **5 scripts**:

| Script | Path | Purpose |
|---|---|---|
| \`HandPoseData.cs\` | \`Assets/_MolcaSDK/_VR/Scripts/Interactions/GrabHandPose/\` | ScriptableObject storing bone names, positions, and rotations for a hand pose |
| \`XRGrabPoseListener.cs\` | \`Assets/_MolcaSDK/_VR/Scripts/Interactions/GrabHandPose/\` | Runtime: triggers hand pose animation on grab, handles hand attach offset for grab positioning, and snap-to-object feature |
| \`HandAnimator.cs\` | \`Assets/_MolcaSDK/_VR/Scripts/Controller Visual/\` | Runtime: reads grip/trigger input, drives hand animations via Animator blend tree, and provides API for custom grab animation playback |
| \`HandPoseEditorWindow.cs\` | \`Assets/_MolcaSDK/_VR/Scripts/Editor/HandPose/\` | Editor: window for saving/loading hand poses to \`HandPoseData\` ScriptableObjects |
| \`HandPoseMirrorWindow.cs\` | \`Assets/_MolcaSDK/_VR/Scripts/Editor/HandPose/\` | Editor: window for mirroring hand poses from one hand to the other using rest-pose-relative delta computation |`
            },
            {
                title: "HandPoseData",
                url: "/dashboard?section=vr-hp-handposedata",
                content: `# HandPoseData

\`\`\`csharp
[CreateAssetMenu(fileName = "New Hand Pose Data", menuName = "Savior/XR/Hand Pose")]
public class HandPoseData : ScriptableObject, IHandPose
\`\`\`

A ScriptableObject that stores a list of \`BonePose\` entries representing a complete hand pose. Created via **Create → Savior → XR → Hand Pose** in the Project panel. Used by both editor tools (Hand Pose Editor, Hand Pose Mirror) to persist pose data.

Each \`BonePose\` entry contains:

| Property | Type | Description |
|---|---|---|
| \`boneName\` | \`string\` | The name of the bone transform (e.g., \`L_IndexProximal\`) |
| \`localPosition\` | \`Vector3\` | The bone's local position |
| \`localRotation\` | \`Quaternion\` | The bone's local rotation |

Also exposes a read-only \`Bones\` property via the \`IHandPose\` interface.`
            },
            {
                title: "HandAnimator",
                url: "/dashboard?section=vr-hp-handanimator",
                content: `# HandAnimator

\`\`\`csharp
public class HandAnimator : MonoBehaviour
\`\`\`

Attached to the **Hand Visual** GameObject. Reads grip/trigger input from the XR controller and drives the Animator's blend tree parameters. Also provides an API for object-specific grab animations.

## Public API

| Method | Description |
|---|---|
| \`PlayGrabAnimation(string stateName)\` | Freezes grip/trigger at 0 and crossfades to the specified animation state. Called by \`XRGrabPoseListener\`. |
| \`StopGrabAnimation()\` | Crossfades back to the default Blend Tree state and resumes normal input-driven animation. |
| \`IsPlayingGrabAnimation\` | Property — \`true\` if a custom grab animation is currently active. |
| \`CurrentGrabAnimation\` | Property — name of the currently playing grab animation (null if none). |

## Behavior

- During normal operation, \`Update()\` reads trigger and grip input values and sets them as float parameters on the Animator.
- When a custom grab animation is active, grip/trigger are frozen at 0 to prevent the blend tree from interfering with the pose.`
            },
            {
                title: "XRGrabPoseListener",
                url: "/dashboard?section=vr-hp-xrgrabposelistener",
                content: `# XRGrabPoseListener

\`\`\`csharp
[AddComponentMenu("XR/XR Grab Pose Listener")]
public class XRGrabPoseListener : MonoBehaviour
\`\`\`

Attached to the **grabbable object**. A general-purpose VR hand interaction add-on that can be attached to any \`XRBaseInteractable\`. It listens for \`selectEntered\` / \`selectExited\` events and provides **three features**:

## Feature 1: Hand Pose Animation

Plays a custom grab animation on the correct hand when the object is grabbed, and restores the default blend tree state on release.

| Field | Description |
|---|---|
| \`leftHandAnimationName\` | Animation state name for left hand grab (e.g., \`Left_Carabiner_XR\`) |
| \`rightHandAnimationName\` | Animation state name for right hand grab (e.g., \`Right_Carabiner_XR\`) |

> [!NOTE]
> These names must **exactly match** the state names in the Animator Controller. The script uses \`CrossFade()\` via \`HandAnimator\` to transition to these states.

## Feature 2: Hand Attach Offset (Grab Position)

Repositions the grabbed object to align with a hand-specific attach point instead of the default attach. This is implemented using a custom \`IXRGrabTransformer\` that computes the positional/rotational offset between the default attach transform and the hand-specific attach point.

| Field | Description |
|---|---|
| \`leftHandAttachTransform\` | Attach point for left hand grabs — object offsets to align with this transform |
| \`rightHandAttachTransform\` | Attach point for right hand grabs — object offsets to align with this transform |

> [!IMPORTANT]
> This feature only works when the interactable is an \`XRGrabInteractable\`. The offset transformer is lazily registered and only instantiated when needed.

## Feature 3: Snap Hand To Object

Moves the hand visual model to a snap point on the object instead of moving the object to the hand. Supports **two snap point modes**:

**Per-Element Mode** — Each snap point has its own individual left/right position and rotation offsets:

| Field | Description |
|---|---|
| \`handSnapsToObject\` | Toggle to enable snap-to-object mode |
| \`handSnapPoints\` | Array of \`HandSnapPoint\` entries, each with its own snap transform and per-hand offsets |
| \`snapTransitionDuration\` | Duration in seconds for smooth snap-in/out transition (default: \`0.15\`) |

**Shared Mode** — Multiple snap transforms share the same left/right offset values:

| Field | Description |
|---|---|
| \`sharedSnapGroup\` | A \`SharedOffsetSnapGroup\` containing an array of snap transforms and a single set of shared left/right offsets |

> [!TIP]
> Use **Per-Element Mode** when each snap point needs different hand placement (e.g., handles at different angles). Use **Shared Mode** when all snap points are identical (e.g., valve ridges around a circumference).`
            },
            {
                title: "HandPoseEditorWindow",
                url: "/dashboard?section=vr-hp-handposeeditor",
                content: `# HandPoseEditorWindow

\`\`\`csharp
public class HandPoseEditorWindow : EditorWindow
\`\`\`

Accessible via **Tools → XR → Hand Pose Editor**. Provides a simple interface for saving and loading hand bone poses to/from \`HandPoseData\` ScriptableObject assets.

## Fields

| Field | Description |
|---|---|
| \`Hand Root\` | The root transform of the 3D hand model in the Scene hierarchy |
| \`Pose Data\` | A \`HandPoseData\` ScriptableObject asset to save to or load from |

## Actions

| Button | Description |
|---|---|
| **Save Pose** | Caches all bone transforms under the hand root and saves their \`localPosition\` and \`localRotation\` to the pose data asset |
| **Load Pose** | Applies saved bone rotations from the pose data back to the hand model (only applies rotation, not position, to preserve skeleton bone lengths) |
| **Clear Pose** | Clears all stored bone data from the pose data asset |`
            },
            {
                title: "HandPoseMirrorWindow",
                url: "/dashboard?section=vr-hp-handposemirror",
                content: `# HandPoseMirrorWindow

\`\`\`csharp
public class HandPoseMirrorTool : EditorWindow
\`\`\`

Accessible via **Tools → XR → Hand Pose Mirror**. Mirrors a hand pose from one hand model to the other using **rest-pose-relative delta mirroring** — a technique that works regardless of bone axis conventions.

## Fields

| Field | Description |
|---|---|
| \`Source Hand Model\` | The source hand model transform (must be in rest/default pose) |
| \`Target Hand Model\` | The target hand model transform (must be in rest/default pose) |
| \`Source Pose\` | The \`HandPoseData\` asset containing the pose to mirror |
| \`Target Pose\` | An existing \`HandPoseData\` asset to overwrite with the mirrored result |

## Actions

| Button | Description |
|---|---|
| **Build Bone Mapping** | Collects bones from both models via depth-first traversal and creates name-to-name pairs. Also captures rest rotations. |
| **Mirror Pose** | Overwrites the target pose asset with the mirrored bone data |
| **Create Mirrored Copy** | Creates a new \`HandPoseData\` asset with the mirrored result (auto-swaps Left/Right in the name) |

## How Mirroring Works

1. Bone names are mapped via structural (depth-first index) matching between source and target models.
2. For each bone, the **delta** rotation from the source rest pose is computed: \`delta = Inverse(sourceRest) * sourcePose\`.
3. This delta is applied to the target's rest pose: \`targetPose = targetRest * delta\`.
4. This produces correct mirroring regardless of bone axis conventions between models.`
            },
        ],
    },
    {
        title: "Snap-to-Object",
        url: "#",
        icon: MousePointerClick,
        items: [
            {
                title: "How It Works",
                url: "/dashboard?section=vr-hp-snap-how",
                content: `# Snap-to-Object Feature

For objects where the hand should move to the object (instead of the object moving to the hand), enable the snap-to-object feature on \`XRGrabPoseListener\`.

## How It Works

1. When the player grabs, the script finds the **nearest snap point** across both arrays.
2. The hand visual smoothly transitions from its controller position to the snap point using \`SmoothStep\` interpolation.
3. While attached, \`LateUpdate()\` continuously locks the hand visual to the snap point — following the object if it rotates or moves.
4. On release, the hand smoothly transitions back to its original local position/rotation.

## Technical Details

- **No reparenting** — only world-space \`position\` and \`rotation\` are set.
- **Scale is never modified** — the hand mesh maintains its original proportions.
- **Dual-hand support** — each hand is tracked independently via a per-interactor \`HandSnapState\` dictionary.`
            },
            {
                title: "Setup",
                url: "/dashboard?section=vr-hp-snap-setup",
                content: `# Snap-to-Object Setup

1. Check **Hand Snaps To Object** on the \`XRGrabPoseListener\` component.
2. Choose a snap mode:

**Option A — Per-Element Offsets:**
- Add entries to the **Hand Snap Points** array.
- Each entry has its own \`snapTransform\` and individual left/right position + rotation offsets.
- Use when each snap point needs unique hand placement.

**Option B — Shared Offsets:**
- Configure the **Shared Snap Group** field.
- Add all snap point transforms to the \`snapTransforms\` array.
- Set one shared set of left/right position + rotation offsets.
- Use when all snap points are identical (e.g., equally-spaced valve ridges).

> [!NOTE]
> Both modes can coexist — the script searches both arrays for the nearest snap point. The \`snapTransitionDuration\` controls the smooth snap-in/out duration.`
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
                url: "/dashboard?section=vr-hp-issues",
                content: `# Common Issues

| Issue | Solution |
|---|---|
| Hand pose doesn't play when grabbing | Verify the animation state name in \`XRGrabPoseListener\` exactly matches the state name in the Animator Controller. |
| Hand snaps to wrong position | Check the snap point transforms and their per-hand offsets. |
| Object doesn't align with hand on grab | Set up the \`leftHandAttachTransform\` / \`rightHandAttachTransform\` on \`XRGrabPoseListener\`. |
| Mirror produces wrong pose | Ensure both hand models are in their **rest/default pose** before building the bone mapping. |`
            },
            {
                title: "Best Practices",
                url: "/dashboard?section=vr-hp-best-practices",
                content: `# Best Practices

- **Start with one hand** — Create the pose for one hand first, then use the mirror tool.
- **Consistent naming** — Name animation clips and states as \`Left_[PoseName]_XR\` / \`Right_[PoseName]_XR\`.
- **Test both hands** — After mirroring, verify the pose with both hands.
- **Transition duration** — The default \`0.1s\` crossfade works for most cases. Increase for slower transitions.`
            },
            {
                title: "Quick Checklist",
                url: "/dashboard?section=vr-hp-checklist",
                content: `# Adding a New Pose — Quick Checklist

1. ☐ Create \`HandPoseData\` asset (Create → Savior → XR → Hand Pose)
2. ☐ Sculpt pose in Scene view with Hand Pose Editor
3. ☐ Save pose to the asset
4. ☐ Mirror to the other hand
5. ☐ Create animation clip with single keyframe
6. ☐ Add animation state to both Animator Controllers (left & right)
7. ☐ Add \`XRGrabPoseListener\` to the grabbable object and set animation state names
8. ☐ (Optional) Configure hand attach offsets for grab alignment
9. ☐ (Optional) Configure snap-to-object with per-element or shared snap points
10. ☐ Test with both hands`
            },
        ],
    },
]
