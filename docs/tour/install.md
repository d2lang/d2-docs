---
pagination_next: tour/hello-world
---
# Install

:::tip
There are more detailed install instructions for Mac, Windows, and Linux, using a variety of
methods, [here](https://github.com/d2lang/d2/blob/master/docs/INSTALL.md). This page
is an abridged version.
:::

## Install script

The recommended way to install is to run our install script, which will figure out the
best way to install based on your machine. E.g. if D2 is available through a package
manager installed, it will use that package manager.

```shell
# With --dry-run the install script will print the commands it will use
# to install without actually installing so you know what it's going to do.
curl -fsSL https://d2lang.com/install.sh | sh -s -- --dry-run
# If things look good, install for real.
curl -fsSL https://d2lang.com/install.sh | sh -s --
```

Follow the instructions, if any. Test your installation was successful by running `d2
version`.

If you want to uninstall:

```shell
curl -fsSL https://d2lang.com/install.sh | sh -s -- --uninstall
```

## Windows

On x64 Windows, download an MSI from the [D2 releases page](https://github.com/d2lang/d2/releases).

- **Just for your account (v0.9.1 and later).** Choose the file ending in
  `-windows-amd64-user.msi`. It installs in `%LOCALAPPDATA%\Programs\D2` without administrator rights.
- **For all users.** Choose the file ending in `-windows-amd64.msi`. It requires
  administrator rights and installs in `%ProgramFiles%\D2`.

After installation, open a new PowerShell or Command Prompt window and run `d2 --version`.

For native ARM64, extract the `-windows-arm64.tar.gz` archive and run `d2.exe` from its `bin` directory.

## Install from source

Alternatively, you can install from source:

```shell
go install github.com/d2lang/d2@latest
```


:::info
You can also download precompiled binaries specific to your OS on the Github releases
page:
[https://github.com/d2lang/d2/releases](https://github.com/d2lang/d2/releases).
:::

# Try it out

```shell
echo 'x -> y' > input.d2
d2 -w input.d2 out.svg
```

It should have spun up a local web browser that will automatically refresh when you change
`input.d2`. Modify `input.d2` as you go through this tour to follow along.
