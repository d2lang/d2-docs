#!/usr/bin/env python3
"""Regenerate the blog's comparison SVGs with one public D2 binary.

Run from any directory:
    python3 regenerate.py --d2 /path/to/d2 --verify
Omit --verify when deliberately refreshing the diagrams with a newer build.
The manifest records the recorded build and must be updated for a new snapshot.
"""
from pathlib import Path
import argparse
import hashlib
import json
import os
import shutil
import subprocess

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--d2', default='d2', help='D2 binary with bundled TALA, Dagre and ELK')
parser.add_argument('--verify', action='store_true', help='Check generated SVGs against the recorded hashes')
args = parser.parse_args()
root = Path(__file__).resolve().parent
manifest = json.loads((root / 'render-manifest.json').read_text())
binary = shutil.which(args.d2)
if binary is None:
    raise SystemExit(f'D2 binary not found: {args.d2}')
binary = str(Path(binary).resolve())
env = {key: value for key, value in os.environ.items()
       if not key.startswith('D2_') and key not in ['SCALE', 'DEBUG', 'IMG_CACHE', 'OMIT_VERSION']}
for item in manifest['renders']:
    source = root / item['fixture'] / 'source.d2'
    source_hash = hashlib.sha256(source.read_bytes()).hexdigest()
    if source_hash != item['source_sha256']:
        raise SystemExit(f'Source hash mismatch: {source}')
    theme = '7' if item['fixture'] == 'mocha_soc' else '0'
    command = [binary, '--layout', item['engine'], '--theme', theme,
               '--pad', '50', '--scale', '1', '--timeout', '300']
    if item['engine'] == 'tala':
        command += ['--tala-seeds', '1,2,3']
    output = root / item['fixture'] / f"{item['engine']}.svg"
    subprocess.run(command + [str(source), str(output)], cwd=root,
                   env=env, check=True, timeout=330)
    if args.verify and hashlib.sha256(output.read_bytes()).hexdigest() != item['sha256']:
        raise SystemExit(f'Render hash mismatch: {output}; verify the binary revision and build settings.')
print(f"Rendered {len(manifest['renders'])} comparisons.")
