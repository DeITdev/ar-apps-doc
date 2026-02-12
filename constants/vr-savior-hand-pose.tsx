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
| **Hand Pose Mirror** | An editor tool that automatically mirrors a pose from one hand to the other |
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
│  │  Hand Pose Editor   │    │   Hand Pose Mirror       │     │
│  │  (Save/Load poses)  │───▶│   (Left ↔ Right)         │     │
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
│  │  (Left/Right)    │───▶│  Blend Tree + Pose States   │     │
│  └──────────────────┘    └──────────────┬──────────────┘     │
└─────────────────────────────────────────┼────────────────────┘
                                          │
                                          ▼  (drives hand mesh)
┌──────────────────────────────────────────────────────────────┐
│                      RUNTIME LAYER                           │
│                                                              │
│  ┌────────────────────┐      ┌──────────────────────────┐    │
│  │   HandAnimator     │◀────▶│  XRGrabPoseListener      │    │
│  │ (reads grip/trigger│      │  (triggers pose on grab) │    │
│  │  input, plays      │      └──────────────────────────┘    │
│  │  animations)       │                                      │
│  └────────────────────┘      ┌──────────────────────────┐    │
│                              │ HandAwareGrabInteractable│    │
│                              │ (attach transforms,      │    │
│                              │  snap-to-object)         │    │
│                              └──────────────────────────┘    │
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
> You only need to create the pose for **one hand** (left or right). The mirror tool can generate the other hand automatically.`
            },
            {
                title: "Sculpt the Hand Pose",
                url: "/dashboard?section=vr-hp-step2",
                content: `# Step 2: Sculpt the Hand Pose

1. Open the **Hand Pose Editor** window: go to **Tools → XR → Hand Pose Editor**.
2. In the editor window:
   - **Hand Root**: Drag the root transform of the 3D hand model from the Hierarchy (e.g., \`Left_Hand_XR\`).
   - **Pose Data**: Drag the \`HandPoseData\` asset you just created.
3. In the **Scene View**, select individual bones of the hand model and manually rotate/position them into the desired pose.
   - Use the **Rotation tool** (shortcut: \`E\`) for precise bone adjustments.
   - Each finger has bones: Metacarpal → Proximal → Intermediate → Distal.
   - Work from the proximal (base) to the distal (tip) for natural-looking curls.

> [!IMPORTANT]
> Make sure the hand pose matches how the hand would naturally grip the target object. Position the object near the hand model in the scene to use as visual reference while sculpting the pose.`
            },
            {
                title: "Save the Pose",
                url: "/dashboard?section=vr-hp-step3",
                content: `# Step 3: Save the Pose

1. Once the hand is posed to your liking, click **"Save Pose"** in the Hand Pose Editor window.
2. The tool records the \`localPosition\` and \`localRotation\` of every bone in the hand hierarchy and stores them in the \`HandPoseData\` asset.
3. To preview a previously saved pose, click **"Load Pose"** to apply the stored bone data back to the hand model.
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
   - **Left → Right** toggle: Check this to mirror from left hand to right hand (or uncheck for R→L).
   - **Source Pose**: The \`HandPoseData\` asset you just saved (e.g., \`LeftHandCarabiner\`).
   - **Target Pose**: An existing \`HandPoseData\` asset to overwrite with the mirrored result.
3. Click **"Mirror Pose"** to overwrite the target asset, or **"Create Mirrored Copy"** to generate a new asset automatically.

## How Mirroring Works

- Bone names are converted: \`L_\` prefixes become \`R_\` (and vice versa), \`Left\` becomes \`Right\`.
- Positions are mirrored across the X-axis (X is negated).
- Rotations are mirrored by negating the Y and Z quaternion components.`
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
3. Open the **Animation** window (Window → Animation → Animation).
4. Select the 3D hand model in the Hierarchy.
5. **Load the pose** using the Hand Pose Editor (click "Load Pose" with the correct pose data).
6. In the Animation window, **add a keyframe at frame 0** that captures all bone positions and rotations.
   - You should see entries for each bone's Position and Rotation in the curve list.
   - Each bone line (e.g., \`L_IndexMetacarpal : Position\`, \`L_IndexMetacarpal : Rotation\`) will be recorded.

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

| Motion | Pos X (grip) | Pos Y (trigger) |
|---|---|---|
| \`Right_Base_XR\` | 0 | 0 |
| \`Right_Pinch_XR\` | 0 | 1 |
| \`Right_Grip_XR\` | 1 | 0 |
| \`Right_Grip_XR\` | 1 | 1 |

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
4. **Do not create transitions** to/from this state — the \`HandAnimator\` script handles crossfades programmatically via \`CrossFade()\`.`
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

For each object that the player can grab, configure the following components:

## Create Attach Transform Children

1. Create **two empty child GameObjects** under the grabbable object:
   - \`AttachPoint_Right\` — Position and rotate this so the object fits naturally in the right hand.
   - \`AttachPoint_Left\` — Position and rotate this for the left hand.

2. To set the correct position:
   - Place the hand model near the object in the scene.
   - Adjust the attach point's position and rotation until the object aligns with the hand's grip naturally.

## Add Components to the Grabbable Object

| Component | Purpose |
|---|---|
| **HandAwareGrabInteractable** | Replaces the standard \`XRGrabInteractable\`. Handles left/right attach transforms and optional snap-to-object. |
| **XRGrabPoseListener** | Triggers the correct hand pose animation when the object is grabbed or released. |

## Configure HandAwareGrabInteractable

| Field | Value |
|---|---|
| Attach Transform | \`AttachPoint_Right\` (the right hand attach point) |
| Secondary Attach Transform | \`AttachPoint_Left\` (the left hand attach point) |
| Hand Snaps To Object | ☐ Enable if you want the hand model to move to the object |
| Hand Snap Points | Array of transforms on the object (only used when snap-to-object is enabled) |
| Snap Transition Duration | \`0.15\` (seconds for smooth hand movement) |

> [!IMPORTANT]
> The **Attach Transform** field is for the **right hand** and the **Secondary Attach Transform** is for the **left hand**. The script automatically detects which hand is grabbing and uses the correct attach point.

## Configure XRGrabPoseListener

| Field | Value |
|---|---|
| Left Hand Animation Name | Name of the animation state for the left hand (e.g., \`Left_Carabiner_XR\`) |
| Right Hand Animation Name | Name of the animation state for the right hand (e.g., \`Right_Carabiner_XR\`) |

> [!NOTE]
> These names must **exactly match** the state names in the Animator Controller. The script uses \`CrossFade()\` to transition to these states when the object is grabbed, and back to the \`Blend Tree\` default state on release.`
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

| Script | Path | Purpose |
|---|---|---|
| \`HandPoseData.cs\` | \`Assets/_MolcaSDK/_VR/Scripts/Interactions/GrabHandPose/\` | ScriptableObject storing bone poses |
| \`HandPoseEditorWindow.cs\` | \`Assets/_MolcaSDK/_VR/Scripts/Editor/HandPose/\` | Editor window for saving/loading poses |
| \`HandPoseMirrorWindow.cs\` | \`Assets/_MolcaSDK/_VR/Scripts/Editor/HandPose/\` | Editor window for mirroring poses L↔R |
| \`HandAnimator.cs\` | \`Assets/_MolcaSDK/_VR/Scripts/Controller Visual/\` | Runtime: reads input, drives hand animations |
| \`XRGrabPoseListener.cs\` | \`Assets/_MolcaSDK/_VR/Scripts/Interactions/GrabHandPose/\` | Runtime: triggers specific pose on grab |
| \`HandAwareGrabInteractable.cs\` | \`Assets/_MolcaSDK/_VR/Scripts/Interactions/GrabHandPose/\` | Runtime: grab interaction with L/R attach & snap-to-object |`
            },
            {
                title: "HandPoseData",
                url: "/dashboard?section=vr-hp-handposedata",
                content: `# HandPoseData

\`\`\`csharp
[CreateAssetMenu(fileName = "New Hand Pose Data", menuName = "Savior/XR/Hand Pose")]
public class HandPoseData : ScriptableObject, IHandPose
\`\`\`

A ScriptableObject that stores a list of \`BonePose\` entries. Each entry contains:

| Property | Type | Description |
|---|---|---|
| \`boneName\` | \`string\` | The name of the bone transform (e.g., \`L_IndexProximal\`) |
| \`localPosition\` | \`Vector3\` | The bone's local position |
| \`localRotation\` | \`Quaternion\` | The bone's local rotation |`
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
| \`PlayGrabAnimation(string stateName)\` | Transition to a specific animation state (freezes grip/trigger at 0). Called by \`XRGrabPoseListener\`. |
| \`StopGrabAnimation()\` | Return to the default Blend Tree state. Called by \`XRGrabPoseListener\`. |
| \`IsPlayingGrabAnimation\` | Property — \`true\` if a custom grab animation is currently active. |
| \`CurrentGrabAnimation\` | Property — name of the currently playing grab animation (null if none). |`
            },
            {
                title: "XRGrabPoseListener",
                url: "/dashboard?section=vr-hp-xrgrabposelistener",
                content: `# XRGrabPoseListener

\`\`\`csharp
[RequireComponent(typeof(XRGrabInteractable))]
public class XRGrabPoseListener : MonoBehaviour
\`\`\`

Attached to the **grabbable object**. Listens for \`selectEntered\` / \`selectExited\` events and calls \`PlayGrabAnimation()\` / \`StopGrabAnimation()\` on the grabbing hand's \`HandAnimator\`.

## Inspector Fields

| Field | Description |
|---|---|
| \`leftHandAnimationName\` | Animation state name for left hand grab |
| \`rightHandAnimationName\` | Animation state name for right hand grab |`
            },
            {
                title: "HandAwareGrabInteractable",
                url: "/dashboard?section=vr-hp-handawaregrab",
                content: `# HandAwareGrabInteractable

\`\`\`csharp
public class HandAwareGrabInteractable : XRGrabInteractable
\`\`\`

Replaces Unity's standard \`XRGrabInteractable\` with additional features:

1. **Left/Right Attach Transforms** — Automatically uses \`AttachTransform\` for right hand and \`SecondaryAttachTransform\` for left hand.
2. **Snap-to-Object** — Optional feature where the hand model visually moves to the object instead of the object moving to the hand.

## Inspector Fields

| Field | Description |
|---|---|
| \`Hand Snaps To Object\` | Toggle to enable snap-to-object mode |
| \`Hand Snap Points\` | Array of Transform snap points on the object |
| \`Snap Transition Duration\` | Duration of the smooth transition animation (seconds) |`
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

For objects like valves or handles where the hand should move to the object (instead of the object moving to the hand), enable the **Snap-to-Object** feature.

## How It Works

1. When the player grabs the object, the script finds the **nearest snap point** to the grabbing hand.
2. Object tracking (\`trackPosition\`, \`trackRotation\`) is disabled so the object stays in place.
3. The hand model smoothly transitions from its controller position to the snap point position using world-space position/rotation tracking.
4. While attached, \`LateUpdate()\` continuously locks the hand visual to the snap point — following the object if it rotates or moves.
5. On release, the hand smoothly transitions back to its controller position.

## Technical Details

- **No reparenting** — the hand stays in its original transform hierarchy. Only world-space \`position\` and \`rotation\` are set. This avoids mesh distortion from scale differences between parent hierarchies.
- **Scale is never modified** — the hand mesh maintains its original proportions at all times.
- **Dual-hand support** — each hand is tracked independently via a per-interactor state dictionary.`
            },
            {
                title: "Setup",
                url: "/dashboard?section=vr-hp-snap-setup",
                content: `# Snap-to-Object Setup

1. Check **Hand Snaps To Object** on the \`HandAwareGrabInteractable\` component.
2. Create multiple empty child GameObjects on the object, positioned where hands should snap to.
   - For a valve with 8 ridges, create 8 snap points around the circumference.
   - Position and rotate each snap point to match the desired hand orientation.
3. Assign all snap point transforms to the **Hand Snap Points** array.

> [!NOTE]
> When snap-to-object is enabled, the script automatically sets the Select Mode to **Multiple**, allowing both hands to grab and snap to the object simultaneously.`
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
| Hand snaps to wrong position | Check that the attach transform children are correctly positioned and assigned to the right fields (Attach Transform = right hand, Secondary = left hand). |
| Hand mesh distorts during snap | Ensure you're using the latest \`HandAwareGrabInteractable\` which uses world-space tracking instead of reparenting. |
| Only one hand can grab at a time | The snap-to-object feature auto-sets \`selectMode\` to Multiple. If not using snap-to-object, manually set Select Mode to Multiple in the Inspector. |
| Mirror produces wrong pose | Verify the bone naming convention uses \`L_\` / \`R_\` prefixes or \`Left\` / \`Right\` in the names. |`
            },
            {
                title: "Best Practices",
                url: "/dashboard?section=vr-hp-best-practices",
                content: `# Best Practices

- **Start with one hand** — Always create the pose for one hand first, then use the mirror tool. This saves significant time and ensures consistency.
- **Use consistent names** — Name your animation clips and states consistently: \`Left_[PoseName]_XR\` / \`Right_[PoseName]_XR\`.
- **Test both hands** — After mirroring, always test the pose with both left and right hands to verify it looks correct.
- **Blend tree weight** — If the grip/trigger blend doesn't feel right, adjust the positions of the motions in the 2D blend tree graph.
- **Transition duration** — The default \`0.1s\` crossfade works well for most cases. Increase it for slower, more dramatic transitions.`
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
7. ☐ Set the animation state names in \`XRGrabPoseListener\` on the target object
8. ☐ Test with both hands`
            },
        ],
    },
]
