#!/usr/bin/env python3
import subprocess
import os

# Use absolute path since we know it's the current working directory in v0
os.chdir('/vercel/share/v0-project') if os.path.isdir('/vercel/share/v0-project') else os.chdir('.')

print(f'[v0] Working in: {os.getcwd()}')

try:
    # Add all changes
    print('[v0] git add -A')
    subprocess.run(['git', 'add', '-A'], check=False)
    
    # Commit
    print('[v0] git commit...')
    subprocess.run(['git', 'commit', '-m', 'fix: CSS and build errors'], check=False)
    
    # Get branch
    print('[v0] Getting branch...')
    branch_result = subprocess.run(['git', 'rev-parse', '--abbrev-ref', 'HEAD'], 
                                  capture_output=True, text=True)
    branch = branch_result.stdout.strip()
    print(f'[v0] Branch: {branch}')
    
    # Push
    print(f'[v0] Pushing to origin/{branch}')
    push_result = subprocess.run(['git', 'push', 'origin', branch], 
                                capture_output=True, text=True)
    
    if push_result.returncode == 0:
        print('[v0] ✅ Successfully pushed!')
    else:
        print(f'[v0] Push output: {push_result.stderr or push_result.stdout}')

except Exception as e:
    print(f'[v0] Error: {e}')
