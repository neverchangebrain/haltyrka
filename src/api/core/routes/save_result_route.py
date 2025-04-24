from flask import Blueprint
from core.controllers.save_result_controller import save_result_controller


save_result_bp = Blueprint("save_result", __name__, url_prefix="/api/v1")

@save_result_bp.route("/save_result", methods=["POST"])
def save_result():
    return save_result_controller()

