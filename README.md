# Now Ministering Plugin

A simple browser‐based plugin to manage and display “Now Ministering” lower‐third overlays with automatic background removal.

---

## Overview

This plugin consists of two HTML files:

- **dock.html** – a panel where you enter a prefix (e.g. `NOW MINISTERING`), a name, pick colors, and upload an image.
- **overlay.html** – reads the saved settings and displays a sliding banner overlay in your page.

Features:

- Store multiple overlays and switch between them
- Customize strip colors and text color
- Automatic background removal using the Remove.bg API
- Validation to ensure uploaded images are at least 240×300 pixels

---

## Requirements

- A modern web browser (Chrome, Firefox, Edge, Safari)
- Internet access for the Remove.bg API
- A valid Remove.bg API key

---

## Installation

1. Copy **dock.html** and **overlay.html** into your project directory.
2. Open **dock.html** in your browser to configure and save overlays.
3. Include **overlay.html** as an `<iframe>` or `<object>` in your host page where you want the banner to appear.

---

## Configuration

1. In **dock.html**, locate the line:

   ```js
   const REMOVE_BG_API_KEY = "cG88rGpwKFWcjwDTNGxcYov5";
   ```

2. **Replace** it with your own Remove.bg API key:

   ```js
   const REMOVE_BG_API_KEY = "YOUR_GENERATED_REMOVE_BG_API_KEY";
   ```

   > **⚠️ Important:** You **must** replace that placeholder value with the API key you obtained from Remove.bg, otherwise background removal will fail.

---

## Usage

### dock.html

1. Enter the “Text before name” (prefix).
2. Enter the “Minister Name” (or any label).
3. Pick your **top strip color**, **bottom strip color**, and **text color**.
4. Upload an image that is **at least 240 × 300 pixels**.
5. Click **Preview** to verify.
6. Click **Save Overlay** to store it in local storage.

### overlay.html

1. Load **overlay.html** in your host page (e.g. via `<iframe src="overlay.html">`).
2. When you click **Show** in dock.html, the overlay will slide in.
3. When you click **Hide**, it will slide out completely.
4. You can set an auto‐hide delay in seconds.

---

## Troubleshooting

- **Image too small error:** Make sure your uploaded image is at least **240px** wide and **300px** tall.
- **Background removal failure:** Verify your API key and internet connectivity.

---

## Contributing

Contributions, issues, and feature requests are welcome via pull requests. You can also email helpdesk@tioluwanilowo.com.

---

## License

Made with ❤️ by [Tioluwani Lowo](https://tioluwanilowo.com/)

Designed to be fast, flexible, and offline-friendly.
