#!/usr/bin/env python3
import subprocess
import os

os.chdir('/vercel/share/v0-project')

try:
    subprocess.run(['git', 'config', 'user.email', 'v0@vercel.com'], check=False)
    subprocess.run(['git', 'config', 'user.name', 'v0'], check=False)
    
    subprocess.run(['git', 'add', '-A'], check=True)
    subprocess.run(['git', 'commit', '-m', 'feat: Complete admin dashboard with responsive design, dark/light mode, and all 11 pages'], check=True)
    
    branch_result = subprocess.run(['git', 'rev-parse', '--abbrev-ref', 'HEAD'], capture_output=True, text=True, check=True)
    branch = branch_result.stdout.strip()
    
    subprocess.run(['git', 'push', 'origin', branch], check=True)
    print('[v0] Successfully pushed to GitHub!')
except Exception as e:
    print(f'[v0] Error: {e}')
