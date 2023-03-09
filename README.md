# TimoBox NFC Jukebox

## Description

This repository contains a project to run a NFC Jukebox on a Raspberry Pi.

## Usage

### Clone Project
```
git clone https://github.com/Sordit/TimoBox.git
```

### Build Project Once (Will replace this with production mode later)
```
cd TimoBox/api
sudo docker compose build
```

### Enable DRM content on the
```
sudo apt-get update
sudo apt-get install libwidevinecdm0
```

Reboot after install and open.spotify should work now

### Installing
1. Boot once into desktop of the raspberry.
2. Open Chromium
3. Open **open.spotify.com** and login
4. Go to Extension Settings
5. Enable **Developer Mode**
6. **Load Unpacked** open folder **TimoBox/extension**
7. Close all but one tab

### Docker
```
curl -fsSL https://get.docker.com -o get-docker.sh
chmod +x get-docker.sh
sudo ./get-docker.sh
```

### Autostart docker
/etc/rc.local
```
cd /home/timobox/TimoBox/api
docker compose up &
```

### Autostart Chrome
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

### Enable boot to desktop without HDMI plugged in
/boot/config.txt

```
hdmi_force_hotplug=1
hdmi_cvt=800 480 60 6
hdmi_group=2
hdmi_mode=87
hdmi_drive=2
```

### Reboot
```
sudo reboot
```

## Manage NFC Tokens
Open http://localhost:8000/index.html.
> You can open [http://<IP / HOSTNAME>:8000/index.html](http://IpOrHostname:8000/index.html) from another Device on the Wifi
