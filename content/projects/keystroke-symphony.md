---
title: "Keystroke Symphony"
description: "Real-time keyboard-to-music synthesis engine. Every keystroke becomes a note."
date: 2025-11-20
tags: ["music", "creative-tools", "python"]
weight: 1
---

# Keystroke Symphony

**Real-time keyboard-to-music synthesis engine with multi-platform support and creative features**

## What It Does

Transforms your typing into music in real-time. Each key maps to a musical frequency, creating an auditory experience as you write code, documents, or chat. Visual feedback syncs with every keystroke.

## Key Features

- **Zero-latency audio generation** - Instant sound feedback using NumPy waveforms and sounddevice
- **Dynamic tempo & pitch control** - Arrow keys adjust playback speed and pitch on the fly
- **Recording & playback** - Capture typing sessions and replay without silence gaps
- **Multi-platform** - Works on desktop (pynput) and mobile (Termux)
- **Visual feedback** - Rich terminal graphics or Kivy mobile interfaces

## Technical Stack

- **Audio**: NumPy + sounddevice (PortAudio)
- **Input**: pynput keyboard monitoring
- **Visual**: rich (terminal) / Kivy (mobile)
- **Language**: Python 3

## Why It Exists

Exploring the intersection of everyday computing and musical creativity. What if every interaction with your computer was also a creative act?

---

*Status: In development*
