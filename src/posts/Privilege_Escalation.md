---
title: "Privilege Escalation Techniques"
date: "2025-09-015"
summary: "A Concise Guide to Linux Privilege Escalation Using Kernel Exploits and Misconfigured Sudo Rules"
tags: ["privEsc", "sudo exploits", "kernel exploits"]
---

## 1. Prerequisites and Lab Setup

To follow along with the tools and techniques utilized in this scenario, you will need to use one of the following offensive Linux distributions:

* Kali Linux
* Parrot OS

The demonstrations outlined in this scenario were performed against a vulnerable Linux VM designed to teach the process of exploitation and privilege escalation. If you want to follow along, you can download the target VM here: [Raven: 1 (VulnHub)](https://www.vulnhub.com/entry/raven-1,256/).

To get the most out of this scenario, it is recommended to have the following technical prerequisites:

* Familiarity with Linux system administration.
* A functional knowledge of TCP/IP and networking.
* Familiarity with penetration testing concepts and the attack life-cycle.

> **Note:** The techniques and tools demonstrated in this scenario were performed using a Kali Linux Virtual Machine.

---

## 2. MITRE ATT&CK Privilege Escalation Techniques