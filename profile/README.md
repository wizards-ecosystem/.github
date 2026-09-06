<div align="center">

<img src="../brand/ecosystem/ecosystem-header.png" alt="The Wizard's Ecosystem" width="100%" />

# The Wizard's Ecosystem

**Software that carries its own guarantees and runs on your machine.**

</div>

---

A programming language, an operating system, and studios for making things with them.

One idea runs through all of it: the system should carry the difficult, mechanically
checkable reasoning, so the person using it doesn't have to. A compiler that already
knows what your code touches. A kernel where permission is something you hold. A music
studio that never sends your work anywhere, because there is nowhere for it to go.

The second idea matters as much. We don't claim what we can't show. Every status on this
page is what is true today. Where a thing is designed but unbuilt, it says so. Where a
gate is closed, it says which one.

## The projects

| Project | What it is | Status |
| --- | --- | --- |
| **The Wizard's Ink** | Home of **Wizzy**, a statically typed language whose compiler tracks effects, resources, authority, and concurrency, so ordinary code stays simple and is still checked. Value semantics, failure in the type, no `async` coloring. | Working, private |
| **The Wizard's OS** | A from-scratch operating system. Rust kernel, x86_64, UEFI. Capability-based and async-first: handles and submission queues are the native ABI, POSIX is a translation layer. CoW checksummed filesystem, WebAssembly apps as first-class. | Working, private |
| **The Wizard's Conclave** | An agent orchestrator that carries a project from idea to reviewed merge, driving your existing coding-agent subscriptions through their official headless CLIs. Isolated worktrees, cross-vendor review, and a merge gate written in code instead of prompted from a model. | Frozen, rebuild gated, private |
| **The Wizard's Courier** | A durable local job vendor. One per checkout: it persists and orders jobs, spawns and confines the workers a studio declares, streams telemetry over a loopback socket, and reconciles whatever it finds after a restart. | Specified, private |
| **The Wizard's Lyre** | A generative music studio that runs on your own GPU. No accounts, no keys, no cloud. A library of song projects, each with a plan and a rail of immutable takes that remember their parent. | Working, private |
| **The Wizard's Brush** | A local-first image and video studio, with an optional second lane for a GPU you operate yourself. One durable queue, one asset library, one browser UI across both. | Working, private |
| **The Wizard's Pick** | A local lockpick for authorized security testing. The offensive-security model runs on your machine and nothing leaves it. | [**Public**](https://github.com/wizards-ecosystem/wizards-pick) |

## How it fits together

Wizzy is the keystone. Three projects are gated on it and say so in their own decision
records. Conclave froze a working v0.1 instead of extending it. Courier has written its
full specification and conformance corpus while declining to write a single line of
implementation in another language.

```
                              Wizzy
                          the language
                                |
          +---------------------+---------------------+
        gate                  gate                  gate
          v                     v                     v
   The Wizard's OS          Conclave               Courier
      userland             the rebuild             all of it
                                ^                     |
                                |                     |
                                +----- will serve ----+
                                                      |
                             +------------------------+---+
                             v                            v
                            Lyre                        Brush
                        ships today                  ships today
```

Lyre, Brush, and Pick ship today on ordinary Python and TypeScript. They adopt Courier
when Courier exists. They do not wait for it.

## What the words mean here

**Local-first.** Lyre and Brush run their models on a GPU you own and keep every byte
they write inside the checkout. Pick runs inference on your machine. Conclave spends your
own vendor subscriptions through your own logins and bypasses nothing. There is no hosted
service to sign up for, because there is no hosted service.

**Capability-based.** Authority is a thing you are handed, never a thing you are assumed
to have. Wizzy computes an authority report from the compiler's own capture summaries and
enforces an allow-list at launch. The OS makes handles the native ABI. Both are partly
built, and both say how far they have got.

**Evidence-bound.** Every claim about what a system guarantees names the evidence behind
it, and public wording never outruns the strongest evidence retained. Wizzy keeps a single
status page and a foundation matrix recording the evidence class of every foundational
decision. That rule is why this page carries a "specified, not built" row.

## Status vocabulary

Four words, used consistently across every repository, meaning the same thing each time.

- **Working.** It runs, people use it, it is not finished.
- **Frozen.** It runs and is not being extended, because a successor is coming.
- **Specified.** Designed and pinned by a conformance corpus. No implementation exists.
- **Gated.** Blocked on a named dependency, with the gate written down.

### Version numbers here are conservative

Read the status word before the version. Wizzy carries `0.0.1` while running a complete
CLI, two execution backends, a bytecode VM, a Cranelift native tier, effect inference,
authority reporting, structured concurrency, and an LSP, tested on Linux, macOS, and
Windows. The number is low because a version is only spent when it names a **completed
gate**, and Wizzy's roadmap does not reach `v0.3` until its third milestone closes. A low
number here means an unclaimed gate.

## Access

Most of this is private while it's early. **The Wizard's Pick** is public today. The
others open as they reach their own public-preview gates, and each gate is written down.
If you have a reason to want in sooner, open an issue on
[Pick](https://github.com/wizards-ecosystem/wizards-pick/issues) or reach out.

<div align="center">
<br />
<sub><b>The Wizard's Ecosystem</b><br />Ink, OS, Conclave, Courier, Lyre, Brush, Pick</sub>
</div>
