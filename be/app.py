import datetime
import os
from flask_cors import CORS
from flask import Flask, request, flash, make_response
from werkzeug.utils import secure_filename
from DbWrapper import DbWrapper

app = Flask(__name__)
app.secret_key = "super secret key"
app.config['UPLOAD_FOLDER'] = r'E:\workspace\financesSpreadsheet\excels'

CORS(app)

ALLOWED_EXTENSIONS = {'xls', 'xlsx'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def hello():
    return "Hello, World!"


@app.route("/api/uploadFile", methods=['POST'])
def uploadFile():
    jsonresponse = {
        "success": False,
        "message": "",
        "error_code": 200,
        "data": {}
    }
    # check if the post request has the file part
    if 'myFile' not in request.files:
        flash('No file part')
        jsonresponse["message"] = 'No file part'
        jsonresponse["error_code"] = 400
        response = make_response(jsonresponse)
        response.status_code = 400
        return response
    file = request.files['myFile']
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        flash('No selected file')
        jsonresponse["message"] = 'No selected file'
        jsonresponse["error_code"] = 400
        response = make_response(jsonresponse)
        response.status_code = 400
        return response
    if not allowed_file(file.filename):
        flash('No allowed file extension')
        jsonresponse["message"] = 'No allowed file extension'
        jsonresponse["error_code"] = 400
        response = make_response(jsonresponse)
        response.status_code = 400
        return response
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        db = DbWrapper()
        date = datetime.datetime.now()
        db.insertUploadLog(datetime.datetime.now(), filename)
        jsonresponse["success"] = True
        jsonresponse["message"] = 'Success'
        jsonresponse["data"] = {"filename": file.filename , "date": date}
        jsonresponse.pop("error_code")
        response = make_response(jsonresponse)
        response.status_code = 200
        return response

@app.route("/api/uploadList/<username>", methods=['GET'])
def uploadList(username):
    db = DbWrapper()
    response = db.getUploadLog()
    return response