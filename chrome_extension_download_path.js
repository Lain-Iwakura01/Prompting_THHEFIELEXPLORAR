// Chrome extension to trigger a file manager prompt for image and video downloads

// background.js
chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff", "ico"];
  const videoExtensions = ["mp4", "mkv", "mov", "avi", "wmv", "flv", "webm", "m4v", "3gp", "3g2", "ogg", "vob"];

  const fileExtension = downloadItem.filename.split('.').pop().toLowerCase();

  if (imageExtensions.includes(fileExtension) || videoExtensions.includes(fileExtension)) {
    chrome.downloads.showDefaultFolder();
    // Suggest default filename without automatically saving
    suggest({ filename: downloadItem.filename, conflictAction: 'prompt' });
  } else {
    // Use default handling for non-image/video files
    suggest();
  }
});

// manifest.json
{
  "manifest_version": 3,
  "name": "Download Path Selector",
  "version": "1.0",
  "permissions": ["downloads"],
  "background": {
    "service_worker": "background.js"
  },
  "description": "Prompts file manager for download path when downloading image or video files."
}
