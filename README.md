# TimoBox NFC Jukebox

## Description

This repository contains a project to run a NFC Jukebox on a Raspberry Pi.

## Usage

### Installing

#### Clone Project
```
git clone https://github.com/Sordit/TimoBox.git
```

#### Docker
```
curl -fsSL https://get.docker.com -o get-docker.sh
chmod +x get-docker.sh
sudo ./get-docker.sh
```

#### Autostart docker
/etc/rc.local
```
cd /home/timobox/TimoBox/api
docker compose up &
```

# Autostart Chrome
/etc/xdg/lxsession/LXDE-pi/autostart

```
# Disable Screensaver
#@xscreensaver -no-splash
@xset s off
@xset -dpms
@xset s noblank

# Start Chromium
@chromium-browser
```

# Enable boot to desktop without HDMI plugged in
/boot/config.txt

```
hdmi_force_hotplug=1
hdmi_cvt=800 480 60 6
hdmi_group=2
hdmi_mode=87
hdmi_drive=2
```