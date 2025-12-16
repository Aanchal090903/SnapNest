import { saveScreenshot, getScreenshots } from '../db/indexeddb.js';

const dropzone = document.getElementById('dropzone');
const inbox = document.getElementById('inbox');

dropzone.addEventListener('dragover', e => {
  e.preventDefault();
  dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', async e => {
  e.preventDefault();
  dropzone.classList.remove('dragover');

  const file = e.dataTransfer.files[0];
  if (!file || !file.type.startsWith('image/')) return;

  const reader = new FileReader();
  reader.onload = async () => {
    await saveScreenshot(reader.result);
    loadInbox();
  };
  reader.readAsDataURL(file);
});

async function loadInbox() {
  inbox.innerHTML = '';
  const shots = await getScreenshots();

  shots.forEach(s => {
    const img = document.createElement('img');
    img.src = s.image;
    inbox.appendChild(img);
  });
}

loadInbox();
