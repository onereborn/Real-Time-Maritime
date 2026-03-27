# Real-Time Maritime Radar

A fast, lightweight, and real-time global ship tracking application. This project connects to the [AISStream API](https://aisstream.io/) via WebSockets to stream live Automatic Identification System (AIS) data and plots vessel positions, headings, and metadata on an interactive map.

## 🚀 Features

* **Real-Time Live Tracking:** Uses WebSockets to stream continuous AIS position reports.
* **High-Performance Rendering:** Dynamically adds and removes ships based on the user's current map view (bounding box) to prevent browser lag.
* **Interactive Ship Data:** Click on any vessel to view its Name, MMSI, Destination, and Heading.
* **Accurate Headings:** Ship icons automatically rotate to match their real-world Course Over Ground (COG).
* **Dark Mode UI:** Sleek, high-contrast dark map theme using CartoDB tiles and custom cyan SVG markers.

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Real-Time Communication:** Socket.io, `ws` (WebSocket client)
* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Mapping Engine:** Leaflet.js
* **External API:** AISStream.io

## ⚙️ Prerequisites

To run this project locally, you will need:
* [Node.js](https://nodejs.org/) installed.
* A free API key from [AISStream.io](https://aisstream.io/).

## 💻 Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/Real-Time-Maritime.git](https://github.com/your-username/Real-Time-Maritime.git)
   cd Real-Time-Maritime
