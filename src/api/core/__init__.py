import logging
from flask import Flask
from flask_cors import CORS
from config import Config
from core.middlewares.api_masking import dynamic_mask_routes


def runtime():
    logging.basicConfig(level=logging.DEBUG, format="%(asctime)s | %(levelname)s | %(message)s")

    app = Flask(__name__)
    CORS(app)

    dynamic_mask_routes(app)

    try:
        app.config.from_object(Config)
        logging.info("Configuration Success")
    except Exception as e:
        logging.error(f"Configuration Failed, {e}")

    try:
        from core.routes import init_routes
        
        init_routes(app)
        logging.info("Routes Initialized Successfully.")
    except Exception as e:
        logging.error(f"Routes Initialize Failed ,{e}")

    return app