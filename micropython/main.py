from hcsr04 import HCSR04
import time
from payloader import Payloader
import utime
import urequests as u
import ujson 
while True:
	sensor = HCSR04(trigger_pin=5, echo_pin=4)
	distance = sensor.distance_cm()
	data = {"jarak-1": distance, "jarak-2": distance}   #di bagian ini diisi dengan data yang dikirim
							  #jika data ada banyak maka perlu di format menggunakan bentuk JSON dengan data menjadi nilai-nya
	col = 'ultrasonik'	#nama collection diisi dengan nama identifikasi sensor
	p = Payloader(data, col)
	p.send()
	utime.sleep_ms(1000)
		
