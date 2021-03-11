# This file is executed on every boot (including wake-boot from deepsleep)
#import esp
#esp.osdebug(None)
import uos, machine
#uos.dupterm(None, 1) # disable REPL on UART(0)
import gc
#import webrepl
#webrepl.start()
gc.collect()

import network, setting, config

wlan = network.WLAN(network.STA_IF) # create station interface
wlan.connect(config.ssid, config.password) # connect to an AP
import ntptime

ntptime.host='0.id.pool.ntp.org'
ntptime.settime()

