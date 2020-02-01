from flask import Flask
from flask import render_template, request ,abort
from flask_cors import CORS
from test import pic1 , pic2

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/app' ,methods=['GET'])
def index():
    try:
        url1 = request.args.get("url1")
        url2 = request.args.get("url2")
        if url1 is None or url2 is None:
            return 'Usage: compare.nazorip.site/app?url1=[PICTURE1_WEB_ADDR]&url1=[PICTURE2_WEB_ADDR]'
        url1 , url2 = str(url1) , str(url2)
    except:
        abort(404);return
    return render_template("index.html" ,pic_url1 = url1 , pic_url2 = url2)

if __name__ == '__main__':
    debug = True
    if debug:
        from test import pic1 , pic2
        pic1 = app.route('/pic1.jpg')(pic1)
        pic2 = app.route('/pic2.jpg')(pic2)
    app.run(port='5441',debug=debug)