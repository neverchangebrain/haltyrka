from flask import Blueprint
from core.controllers.history_controller import history_controller


history_bp = Blueprint("history", __name__, url_prefix="/api/v1")

@history_bp.route("/history", methods=["GET"])
def history():
    return history_controller()

