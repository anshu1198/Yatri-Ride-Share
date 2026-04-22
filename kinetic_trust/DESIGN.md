---
name: Kinetic Trust
colors:
  surface: '#faf8ff'
  surface-dim: '#dad9e1'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3fa'
  surface-container: '#eeedf4'
  surface-container-high: '#e9e7ef'
  surface-container-highest: '#e3e1e9'
  on-surface: '#1a1b21'
  on-surface-variant: '#444651'
  inverse-surface: '#2f3036'
  inverse-on-surface: '#f1f0f7'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#4b1c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e2c00'
  on-tertiary-container: '#f39461'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb691'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#773205'
  background: '#faf8ff'
  on-background: '#1a1b21'
  surface-variant: '#e3e1e9'
typography:
  display:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h2:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  price-display:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 20px
  gutter: 12px
---

## Brand & Style

The design system is anchored in the concept of "Confident Mobility." It targets urban commuters and travelers who prioritize reliability and safety without sacrificing modern aesthetics. The brand personality is professional, punctual, and technologically advanced, yet approachable.

The visual style follows a **Corporate / Modern** aesthetic with a specific focus on high-utility mobile interfaces. It utilizes a refined balance of heavy whitespace and structured information density to ensure users can make quick decisions while in transit. The interface avoids unnecessary decoration, opting instead for functional clarity and smooth transitions that mirror the physical movement of a ride.

## Colors

The palette is led by **Trustworthy Deep Blue**, providing a foundation of stability and institutional authority. To contrast this, **Saffron** (Amber 500) serves as the energetic accent, used exclusively for primary actions, arrival notifications, and active states to draw the eye immediately.

The neutral palette utilizes **Crisp Whites** for surfaces and **Cool Grays** for borders and secondary text. This ensures a high-contrast environment that remains legible even in varying outdoor lighting conditions. Semantic colors for status updates (e.g., driver location, ride completion) follow industry standards but are calibrated to match the saturation of the primary palette.

## Typography

This design system utilizes **Inter** for its exceptional legibility on mobile screens and its neutral, systematic feel. The type hierarchy is engineered for "glanceability"—the ability for a user to extract critical information (like a license plate number or an ETA) in under two seconds.

Numerical data, such as pricing and arrival times, uses a slightly tighter letter spacing and heavier weight to ensure prominence. All body text maintains a minimum size of 14px to support accessibility standards for users on the move.

## Layout & Spacing

This design system employs a **fluid grid** model optimized for mobile-first deployment. The layout relies on a 4px baseline grid to ensure mathematical harmony between icons, text, and containers.

The primary layout structure uses a single-column format for most views, utilizing **20px side margins** to prevent content from hitting the edge of mobile displays. Vertical spacing is generous, using `lg` (24px) gaps between distinct logical sections (e.g., Map vs. Ride Selection) and `sm` (8px) gaps between related elements within a card.

## Elevation & Depth

Visual hierarchy is established through **Ambient Shadows** and **Tonal Layers**. Instead of harsh borders, the design system uses soft, diffused shadows with a low-opacity blue tint (#1E3A8A at 8% opacity) to lift interactive elements like the "Book Now" drawer or floating action buttons.

A three-tier elevation system is used:
1.  **Level 0 (Base):** The map or background layer.
2.  **Level 1 (Cards):** Ride options, driver details, and search bars. These use a 4px blur shadow.
3.  **Level 2 (Modals/Drawers):** Critical interactions that slide over the UI, using a 12px blur shadow and a subtle backdrop dimming to focus user attention.

## Shapes

The shape language is defined by **Rounded** corners, creating a friendly and modern silhouette that softens the professional blue palette. 

Standard components like input fields and buttons utilize a **0.5rem (8px)** radius. Larger containers, such as bottom sheets and ride-selection cards, utilize the **rounded-xl (1.5rem / 24px)** setting, but only on the top corners to create a "drawer" effect that feels integrated with the bottom of the device screen.

## Components

### Buttons
Primary buttons use the Saffron secondary color with bold Inter text to maximize CTA visibility. Secondary buttons use the Trustworthy Deep Blue in an "outline" style for less critical actions like "Add Stop."

### Input Fields
Inputs feature a soft light-gray fill (#F3F4F6) with no border in their rest state, transitioning to a 2px Deep Blue border upon focus. Icons are used at the start of address inputs (e.g., a circle for pickup, a square for destination) to provide immediate visual cues.

### Cards
Ride-type selection cards use a subtle 1px border (#E5E7EB) when unselected, becoming a 2px Deep Blue border with a light blue background tint when active. 

### Chips
Used for quick filters (e.g., "Economy," "Luxury," "Pet Friendly"). These are pill-shaped with high-contrast text and a light gray background that darkens when toggled.

### Map Pins & Markers
Custom markers are required for the driver (a directional vehicle icon) and the user (a pulsing blue dot). These must be high-contrast and utilize the primary blue to ensure visibility against map textures.