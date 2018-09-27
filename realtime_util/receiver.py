import datetime
import socket
import socketserver
import pickle
import pymongo


# from webserver import broadcast

class Receiver(socketserver.BaseRequestHandler):
    """
    connect to local mongoDB
    assume noauth=true
    """
    db_conn = pymongo.MongoClient()
    event_callback = None

    """
    write dict data to local mongodb
    """

    @staticmethod
    def writeDB(data: dict, dbset: str):
        data['time'] = str(datetime.datetime.now())
        Receiver.db_conn['message'][dbset].save(data)

    """
    check auth info, return identity name
    """

    @staticmethod
    def auth(name, auth):
        return Receiver.db_conn['identity']['devices'].find({'name': name, 'auth': auth}).count() > 0

    """
    add trusted ips
    """

    trusted_ip = {
        '127.0.0.1': 'LOCAL'
    }
    """
    Process dict message from single client
    """

    host_port = 9000

    def notify(self, message):
        pass

    def handle(self):

        # identify ip address

        identity = 'unknown'
        ip = self.request.getpeername()[0]
        if ip in Receiver.trusted_ip.keys():
            identity = Receiver.trusted_ip[ip]
            print('connection from trusted ip: ', ip)

        # receive data frame by frame

        while True:
            try:
                data = self.request.recv(1024)
                print('DATA RECV len = ', len(data))
                # load dict object from bytes
                obj = pickle.loads(data)
                if type(obj) == dict:

                    # set time
                    # obj['time'] = datetime.datetime.now()

                    # check auth info
                    if 'auth' in obj.keys():
                        auth = obj['auth']
                        if (Receiver.auth(auth['name'], auth['auth'])):
                            identity = auth['name']
                            print('Auth OK:', auth['name'])
                        obj.pop('auth')

                    # log into database
                    if len(obj) > 0:
                        Receiver.writeDB(obj, identity)
                        self.notify(obj)

            except EOFError as e:
                break

            except Exception as e:
                print(e)
