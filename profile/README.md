<div align="center">

<img src="../brand/ecosystem/ecosystem-header.png" alt="The Wizard's Ecosystem" width="100%" />

# The Wizard's Ecosystem

**Software that carries its own guarantees and runs on your machine.**

</div>

We build local software for programming, media creation, and authorized security
testing. Four projects have public releases. Four more are private while they are built.

## Available now

| Project | What it does | Release |
| --- | --- | --- |
| [**The Wizard's Lyre**](https://github.com/wizards-ecosystem/wizards-lyre) | A generative music studio powered by ACE-Step 1.5. Generation runs on your own GPU and each song keeps its plan and take history. | [0.1.0](https://github.com/wizards-ecosystem/wizards-lyre/releases/tag/v0.1.0) |
| [**The Wizard's Brush**](https://github.com/wizards-ecosystem/wizards-brush) | An image and video studio with editing tools, durable queues, and a searchable asset library. It supports local GPUs and remote GPUs you operate. | [0.1.1](https://github.com/wizards-ecosystem/wizards-brush/releases/tag/v0.1.1) |
| [**The Wizard's Pick**](https://github.com/wizards-ecosystem/wizards-pick) | A terminal assistant for authorized security testing. It uses a local model by default and keeps its sessions and reports in SQLite. | [0.2.0](https://github.com/wizards-ecosystem/wizards-pick/releases/tag/v0.2.0) · [PyPI](https://pypi.org/project/wizards-pick/) |
| [**The Wizard's Familiar**](https://github.com/wizards-ecosystem/wizards-familiar) | A coding agent that runs entirely on your machine. One standard-library Python file, no dependencies, and a model served locally by llama.cpp. | [0.1.0](https://github.com/wizards-ecosystem/wizards-familiar/releases/tag/v0.1.0) |

Pick installs from PyPI:

```
pip install wizards-pick    # Python 3.11+
```

Lyre, Brush, and Familiar install from their repositories. Each README gives the steps.

Lyre and Brush target Linux x86-64, including Windows 11 through WSL2, and require an
NVIDIA GPU. Pick's bundled local-model setup also targets Linux and WSL2. Familiar is the
exception: it targets macOS on Apple Silicon and needs about 21 GB of disk for its model.
Each repository documents its exact hardware, installation, and security requirements.

## In development

You cannot use these yet.

| Project | Current state |
| --- | --- |
| **The Wizard's Ink** | Home of **Wizzy**, an experimental statically typed language whose compiler tracks effects, resources, and authority. Wizzy compiles and runs on three backends: a tree-walking interpreter, a bytecode VM, and a Cranelift native tier. Pre-0.1 and source-only. |
| **The Wizard's OS** | A from-scratch, capability-based Rust operating system for x86-64 and UEFI. Kernel work is active. The userland waits on Wizzy. |
| **The Wizard's Conclave** | A local coding-agent orchestrator. v0.1 runs and is frozen; the next implementation waits on Wizzy. |
| **The Wizard's Courier** | A durable job service for the studios. The specification and conformance corpus are written. No implementation exists, and it waits on the same Wizzy work. |

The organization also holds internal tooling for maintaining these projects. None of it
is planned for release.

## How the projects connect

Wizzy is planned for the OS userland, the next Conclave, and Courier. All three wait on
the same language work: starting a process, opening a socket, and decoding JSON. They
unblock at the same time.

Lyre and Brush have their own job queues and are meant to use Courier once it exists. No
public release depends on any of the private work. Familiar shares nothing with the
rest: it is one file and a local model.

## Version numbers

A version here is spent only when a project clears a gate it wrote down in advance. Lyre
0.1.0 covers all six implementation phases listed in its SPEC.md. The numbers stay low
because the gates are large.
