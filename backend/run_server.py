import asyncio
import os
import sys

sys.path.insert(0, os.getcwd())

import server
from uvicorn import Config, Server

async def main():
    config = Config(server.app, host='0.0.0.0', port=8000, log_level='info')
    srv = Server(config)
    await srv.serve()

asyncio.run(main())
