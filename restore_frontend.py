import os
import zipfile

zips = [f for f in os.listdir('..') if f.lower().endswith('.zip') and 'resume' in f.lower()]
print('Zips found:', zips)

for z in zips:
    zpath = os.path.join('..', z)
    print('Processing', zpath)
    with zipfile.ZipFile(zpath, 'r') as zf:
        for item in zf.namelist():
            if item.endswith('/'):
                continue
            
            # The structure in zip is usually AI-Resume-Builder-main/frontend/...
            if 'frontend/src/pages/' in item or 'frontend/src/lib/api.ts' in item:
                # remove the root folder name from the zip path
                parts = item.split('/')
                if len(parts) > 1 and parts[0] == 'AI-Resume-Builder-main':
                    local_path = '/'.join(parts[1:])
                else:
                    local_path = item
                
                if local_path.endswith('.tsx') or local_path.endswith('.ts'):
                    print('Restoring', local_path)
                    content = zf.read(item).decode('utf-8')
                    # Fix the frontend API URL
                    content = content.replace('https://ai-resume-builder-backend-77p6.onrender.com', 'http://127.0.0.1:8000')
                    
                    # Ensure directory exists just in case
                    os.makedirs(os.path.dirname(local_path), exist_ok=True)
                    
                    with open(local_path, 'w', encoding='utf-8') as f:
                        f.write(content)

print("Restore complete.")
