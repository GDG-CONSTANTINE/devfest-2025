# React Email Template - DevFest Constantine

This project implements an email template using **React Email** based on the provided design reference image.

---

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/GDG-CONSTANTINE/devfest-2025.git
   cd devfest-2025/react-email-starter
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to preview the email templates.

---

## Overview

The email layout has three main parts:

1. **Top banner** static image (not part of the React Email code).
2. **Center content section** implemented with React Email components; this is the only dynamic area.
3. **Bottom banner** static image.

Only the _center content section_ is coded and configurable. All other parts are static assets.

---

## Colors & Typography

- **Hello badge background:** `#FFBE32`
- **Main section background:** `#F1F2F3`
- **Text container background:** `#FFFFFF`
- **Text color:** `#000000`

**Font:** Product Sans Medium (used for all editable text inside the white container).

---

## Editable vs Static

**Editable (via props / template variables):**

- "Hello," badge text
- Paragraph text inside the white text container
- Font size (resizable) and text content inside the white container

**Static (not editable):**

- Top banner image
- Bottom banner image
- Layout spacing and decorative shapes
- Background colors and non-text visuals

---

## Requirements / Implementation Notes

- Use React Email components for the center section: e.g., `<Section>`, `<Container>`, `<Text>`, `<Img>`.
- Load Product Sans Medium for the template (inline `@font-face` or hosted font fallback) and apply to editable text only.
- The center container should have a white background and black text (`#000000`). Ensure text is responsive and resizable via props.
- The surrounding section background must use `#F1F2F3`.
- The "Hello" badge should use `#FFBE32` as its background and match the shape/padding from the reference.
- Top and bottom banners are provided as images; include placeholders (or `<Img src={assets.top} />`) and ensure they are full-width.
- Keep layout, padding, and border-radius close to the reference design.

---

## Assets

- `assets/top-banner.png` (static)
- `assets/bottom-banner.png` (static)
- reference image: `example.png` (provided)

---

## Example (usage)

A simple usage example for a React Email component:

```jsx
<EmailTemplate
  helloText="Hello,"
  bodyHtml={`<p>Your editable content here. Change me!</p>`}
  fontSize="18px"
  topBannerSrc="/assets/top-banner.png"
  bottomBannerSrc="/assets/bottom-banner.png"
/>
```
