#TODO: Einen client für das faye pubsub system

from bayeux.bayeux_client import BayeuxClient
def cb(data):
  print(data)
bc = BayeuxClient('http://localhost:3000/faye')
bc.register('/foo/bar', cb)
bc.register('/foo/baz', cb)
bc.start()