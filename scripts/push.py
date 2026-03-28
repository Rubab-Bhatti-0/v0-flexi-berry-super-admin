#!/usr/bin/env python3
import subprocess
import os
import glob

print(f'[v0] Current working directory: {os.getcwd()}')

# Find the project by locating app/page.tsx
project_dir = None

# Search for page.tsx
search_paths = [
    '/vercel/share/v0-project',
    os.path.expanduser('~'),
    '/home',
    '/'
]

for search_root in search_paths:
    if not os.path.isdir(search_root):
        continue
    
    # Search for page.tsx with reasonable depth
    for root, dirs, files in os.walk(search_root):
        # Skip certain directories
        dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '.next', 'dist']]
        
        if 'page.tsx' in files and 'app' in root:
            project_dir = os.path.dirname(root)
            print(f'[v0] Found project at: {project_dir}')
            break
    
    if project_dir:
        break

if not project_dir:
    print('[v0] Error: Could not find project directory')
    exit(1)

os.chdir(project_dir)
print(f'[v0] Changed to: {os.getcwd()}')

try:
    # Configure git
    subprocess.run(['git', 'config', 'user.email', 'v0@vercel.com'], check=False)
    subprocess.run(['git', 'config', 'user.name', 'v0'], check=False)
    
    # Stage changes
    print('[v0] Staging all changes...')
    subprocess.run(['git', 'add', '-A'], capture_output=True)
    
    # Check what files changed
    status = subprocess.run(['git', 'status', '--short'], capture_output=True, text=True)
    print(f'[v0] Changes: {status.stdout}')
    
    # Commit
    print('[v0] Committing changes...')
    result = subprocess.run(['git', 'commit', '-m', 'Fix: Simplify globals.css and resolve CSS/JSX build errors'], 
                          capture_output=True, text=True)
    print(f'[v0] {result.stdout or result.stderr}')
    
    # Get current branch
    branch_result = subprocess.run(['git', 'rev-parse', '--abbrev-ref', 'HEAD'], 
                                  capture_output=True, text=True)
    branch = branch_result.stdout.strip()
    print(f'[v0] Branch: {branch}')
    
    # Push to GitHub
    print(f'[v0] Pushing...')
    subprocess.run(['git', 'push', 'origin', branch], check=True)
    
    print('[v0] Successfully pushed!')

except Exception as e:
    print(f'[v0] Error: {e}')
