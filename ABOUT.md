---
title: ed25519-blake2b Repository Graph Entry
type: text
description: >-
  Graph entry for ed25519-blake2b, Node.js N-API bindings for ed25519 signing with BLAKE2b used
  across the nano ecosystem; maps consumer repos and the nano-cryptocurrency task umbrella.
base_uri: user:repository/active/ed25519-blake2b/ABOUT.md
created_at: '2026-05-13T18:07:57.780Z'
entity_id: e3e58578-cd17-4810-a305-ba2ebb4881fe
public_read: false
relations:
  - follows [[user:guideline/directory-markdown-standards.md]]
tags:
  - user:tag/nano-cryptocurrency.md
updated_at: '2026-05-13T18:07:57.780Z'
user_public_key: 10ba842b1307fd60475b887df61ccc7e697970a2d222e7cbf011e51f5de3349b
---

## Purpose

Node.js native bindings for ed25519 signing using BLAKE2b (instead of SHA-512) as the hash function. Wraps `ed25519-donna` and `blake2` C libraries via N-API. Used across the nano cryptocurrency ecosystem.

For public overview and install, see [[README.md]].

## Context

This package is the cryptographic primitive layer for nano. `nano-node-light` and other nano consumers depend on it directly. Changes here affect signing and verification behavior across the entire ecosystem.

Side-channel protections track upstream nano-node patches (see nano-node PR #1368 for context).

## Notable Context

**Tag**: [[user:tag/nano-cryptocurrency.md]] — broader nano domain.

**Task directory**: [[user:task/nano-cryptocurrency/]] — umbrella tasks.

**Consumers (sibling repositories)**:

- [[user:repository/active/nano-node-light/ABOUT.md]] — direct dependency
- [[user:repository/active/nanodb/ABOUT.md]] — uses for signature operations on imported ledger data
- [[user:repository/active/nano-community/ABOUT.md]] — depends transitively

**Build essentials**:

```bash
npm run rebuild              # node-gyp rebuild
npm run test                 # Mocha
npm run prebuild             # Cross-platform prebuilds
```

The vendored `ed25519-donna/` and `blake2/` directories are git submodules — initialize them on fresh clones.

**Governing guidelines**:

- [[user:guideline/directory-markdown-standards.md]] — structure for this file

## Scope

**Belongs in this repo**: N-API bindings, vendored C libraries (`ed25519-donna`, `blake2`), build configuration, benchmarks, tests.

**Belongs elsewhere**:

- Protocol code → `nano-node-light/`
- Ledger work → `nanodb/`
- Community site → `nano-community/`
