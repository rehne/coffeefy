import zerorpc

class StreamingRPC(object):
	"""docstring for StreamingRPC"""
	def test(self, arg):
		return xrange(0, 10, 1)

s = zerorpc.Server(StreamingRPC())
s.bind("tcp://0.0.0.0:4242")
s.run()

		