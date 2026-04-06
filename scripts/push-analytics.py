#!/usr/bin/env python3
import subprocess
import os
import sys

# Find project root
project_dir = None
possible_paths = ['/vercel/share/v0-project', os.path.expanduser('~'), os.getcwd()]

for path in possible_paths:
    if os.path.isdir(os.path.join(path, '.git')):
        project_dir = path
        break

if not project_dir:
    project_dir = os.getcwd()

print(f'[v0] Project directory: {project_dir}')
os.chdir(project_dir)

try:
    subprocess.run(['git', 'config', 'user.email', 'v0@vercel.com'], check=False)
    subprocess.run(['git', 'config', 'user.name', 'v0'], check=False)
    
    print('[v0] Adding all changes...')
    subprocess.run(['git', 'add', '-A'], check=True)
    
    print('[v0] Committing...')
    subprocess.run(['git', 'commit', '-m', 'feat: Add comprehensive Analytics Dashboard page with Revenue Growth, Top Shops, User Acquisition, Device Usage, and Recent Activity'], check=True)
    
    branch_result = subprocess.run(['git', 'rev-parse', '--abbrev-ref', 'HEAD'], capture_output=True, text=True, check=True)
    branch = branch_result.stdout.strip()
    print(f'[v0] Current branch: {branch}')
    
    print(f'[v0] Pushing to origin/{branch}...')
    subprocess.run(['git', 'push', 'origin', branch], check=True)
    print('[v0] ✅ Successfully pushed to GitHub!')
except subprocess.CalledProcessError as e:
    print(f'[v0] Error: {e}')
    sys.exit(1)
except Exception as e:
    print(f'[v0] Error: {e}')
    sys.exit(1)
