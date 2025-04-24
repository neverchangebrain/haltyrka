from core.routes.encrypt_route import encrypt_bp
from core.routes.open_file_route import open_file_bp
from core.routes.save_result_route import save_result_bp
from core.routes.history_route import history_bp


def init_routes(app):
    bluepoints = [encrypt_bp, open_file_bp, save_result_bp, history_bp]

    for bp in bluepoints:
        app.register_blueprint(bp)

    pass