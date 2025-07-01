# 🧩 Canvas Widget Builder

An interactive desktop application built with **Electron**, **Vite**, and **React** that allows users to create canvases and drag/drop widgets such as **Text**, **Image**, and **Table** components.

## 🚀 Features

- 📦 Electron-based desktop environment
- ⚡️ Vite for blazing-fast dev/build
- 🧱 Add and position multiple widgets:
  - **Text** Widget (Rich Editor)
  - **Image** Widget (Dynamic Source)
  - **Table** Widget (Dynamic rows/columns, editable cells)
- 🛠 Widget Configuration Panel
- 🖱 Draggable and Resizable widgets
- ❌ Remove widgets with a close button
- 🌓 Dark themed UI

---

## 📁 Project Structure

├── public/
│ └── images/ # Static assets (e.g., default image)
├── src/
│ ├── components/
│ │ ├── DraggableWidget.tsx
│ │ ├── TextEditorWidget.tsx
│ │ ├── ImageDisplayWidget.tsx
│ │ ├── DataTableWidget.tsx
│ │ └── WidgetSettings.tsx
│ ├── context/
│ │ └── CanvasContext.tsx
│ ├── App.tsx
│ └── main.tsx
├── main/
│ └── electron.ts # Electron main process
├── index.html
└── vite.config.ts

## 📝 Configuration Notes
Default Image: Place any image in public/images/ and set its path in the image widget.

Max Table Size: Table supports a maximum of 10 rows x 10 columns.

Widget Settings:

Text: Edits are preserved within the widget.

Image: Paste a valid image URL to change display.

Table: Input row/column values from the right settings panel.

### 📷 Screenshots
![image](https://github.com/user-attachments/assets/2386d3bc-4015-47c4-854c-19704063b08a)

### 🧑‍💻 Tech Stack
⚛️ React

⚡️ Vite

🖼 Electron

📦 RND (react-rnd) for drag/resize

📝 TipTap or ReactQuill (rich text editing)


## Getting Started
npm install

npm run dev

