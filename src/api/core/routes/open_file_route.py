from flask import Blueprint
from core.controllers.open_file_controller import open_file_controller


open_file_bp = Blueprint("open_file", __name__, url_prefix="/api/v1")

@open_file_bp.route("/open_file", methods=["POST"])
def open_file():
    return open_file_controller()

