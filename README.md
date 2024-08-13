# 🏊‍♂️ React DND Swimlane UI

This project is a dynamic **Swimlane UI** built with **React** and **Redux**. It showcases a drag-and-drop interface where tasks (blocks) can be moved across different stages (lanes), with features including data entry during transitions, transition history tracking, and a block preview with detailed information.

## ✨ Features

- **Drag-and-Drop Functionality**: Move blocks between lanes seamlessly using `react-beautiful-dnd`.
- **Configurable Lanes**: Add or remove lanes dynamically based on your project's needs.
- **Data Entry Workflow**: Prompt users to provide necessary information during block transitions.
- **Block Preview**: Click on any block to view detailed information and transition history.
- **Transition History**: Track the journey of each block across different lanes with time-stamped history.
- **Top-Level Filters**: Filter blocks based on specific attributes or search terms.

## 🚀 Live Demo

You can view the live demo of this project [https://luminous-mousse-react-dnd.netlify.app/](#).

## 🛠️ Tech Stack

- **React.js**
- **Redux**
- **react-beautiful-dnd** for drag-and-drop functionality
- **CSS** for styling

## 🖼️ Screenshots

### Swimlane UI
![Swimlane UI](![Screenshot (244)](https://github.com/user-attachments/assets/5763beed-91e4-4c29-9355-ce0637668696)
)

### Block Preview with Transition History
![Block Preview](![Screenshot (245)](https://github.com/user-attachments/assets/67c9ef32-cb88-477e-897d-c62c9dc2bada)
)

## 💻 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm or yarn

### Installation & Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/imoamo/React-DND.git
    ```
2. Navigate to the project directory:
    ```bash
    cd React-DND
    ```
3. Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
4. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## 🏗️ Project Structure

```plaintext
├── public
├── src
│   ├── components
│   │   ├── BlockPreview.jsx
│   │   ├── DataEntryForm.jsx
│   │   ├── Swimlanes.jsx
│   │   └── ...
│   ├── redux
│   │   ├── reducers
│   │   │   ├── lanesReducer.js
│   │   │   ├── blocksReducer.js
│   │   │   ├── filterReducer.js
│   │   └── ...
│   ├── App.js
│   └── index.js
└── ...
