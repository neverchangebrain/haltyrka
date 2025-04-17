import sys
import os
import threading
from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtCore import QUrl
from PyQt5.QtGui import QIcon
from app import app

def run_flask():
    app.run(port=5000, debug=False, use_reloader=False)

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Haltyrka Desktop")
        icon_path = os.path.join(os.path.dirname(__file__), "assets", "icon2.jpg")
        self.setWindowIcon(QIcon(icon_path))
        self.setFixedSize(700, 850)
        self.browser = QWebEngineView()
        self.browser.setUrl(QUrl("http://127.0.0.1:5000"))
        self.setCentralWidget(self.browser)

if __name__ == '__main__':
    flask_thread = threading.Thread(target=run_flask)
    flask_thread.daemon = True
    flask_thread.start()

    app_qt = QApplication(sys.argv)
    icon_path = os.path.join(os.path.dirname(__file__), "assets", "icon2.jpg")
    app_qt.setWindowIcon(QIcon(icon_path))
    window = MainWindow()
    window.show()
    sys.exit(app_qt.exec_())
