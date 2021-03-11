import utime
import urequests as u
import ujson 
import config

class Payloader:
	def __init__(self, data, col):
		self.data = data
		self.col = col
	def send(self):
		local = utime.localtime()
		payload_data = {"data": self.data, "time": local, "col": self.col}
		payload = ujson.dumps(payload_data)
		try:
			r = u.post(url=config.url, headers = {'content-type': 'application/json'}, data = payload)
			res = r.text
			return res
		except OSError as err:
			print(err.args[0])
			#print(OSError)

			
					
