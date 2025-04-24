from flask import Blueprint
from core.controllers.encrypt_controller import encrypt_controller


encrypt_bp = Blueprint("encrypt", __name__, url_prefix="/api/v1")

@encrypt_bp.route("/encrypt", methods=["POST"])
def encrypt():
    return encrypt_controller()

