from flask import Flask, jsonify, request

from datetime import datetime
import base64
import cv2
import matplotlib.pyplot as plt
import math
import numpy as np
import csv
from paddleocr import PaddleOCR, draw_ocr

app = Flask(__name__)

chart_files = {
       "male" : {
                "0-2":"./charts/0-2_male.csv",
                "2-5":"./charts/2-5_male.csv"
       },
       "female": {
                "0-2":"./charts/0-2_female.csv",
                "2-5":"./charts/2-5_female.csv"
       }
}

def malnutrition_status_checker(age, gender, height, weight):
       age = int(age)
       age_group = "0-2" if age < 2 else "2-5"
       filename = chart_files[gender][age_group]

       # rounding off height to nearest 0.5
       height = str(round(float(height) * 2) / 2)
       weight = str(round(float(weight), 1))
       print(weight)
       print(height)

       if(age_group == "0-2" and (float(height) > 110 or float(height) < 45)):
                 return "NA"
       if(age_group == "2-5" and (float(height) > 120 or float(height) < 65)):
                return "NA"


       with open(filename, 'r') as csv_file:
              table = csv.reader(csv_file)

              for row in table:
                print(row[0], height)
                if(row[0] == "Height"):
                       continue
                print(float(row[0]) == float(height))
                if float(row[0]) == float(height):
                        #compare indices 4<>10, 5<>9, 6<>8, 7
                        print(row)
                        if float(weight) <= 0:
                                return "NA"
                        if float(weight) < float(row[4]) or float(weight) > float(row[10]):
                                return "Severe Malnutrition"
                        elif float(weight) < float(row[5]) or float(weight) > float(row[9]):
                                return "Moderate Malnutrition"
                        elif float(weight) < float(row[6]) or float(weight) > float(row[8]):
                                return "Mild Malnutrition"
                        else:
                                return "Proper Nutrition"

def calculate_age(dob):
       today = datetime.today()
       print(today)
       print(dob)
       dob = datetime.strptime(dob, '%Y-%m-%d')
       return today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))

def Focal_Length_Finder(measured_distance, real_width, width_in_rf_image):

	# finding the focal length
	focal_length = (width_in_rf_image * measured_distance) / real_width
	return focal_length


def FindDiagonal(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret, corners = cv2.findChessboardCorners(gray, (4,4), None)
    print(corners)
    xmax=0
    ymax=0
    xmin=1e18
    ymin=1e18
    for i in corners:
        xmax=max(xmax,i.item(0))
        ymax=max(ymax,i.item(1))
        xmin=min(xmin,i.item(0))
        ymin=min(ymin,i.item(1))

    diagonal = math.dist([xmax,ymax],[xmin,ymin])
    print("Diagonal:", diagonal)

    return diagonal

# distance estimation function
def Distance_finder(Focal_Length, real_face_width, face_width_in_frame):

        distance = (real_face_width * Focal_Length)/face_width_in_frame
        print("Distance:", distance)
        # return the distance
        return distance

class ImageNotFoundException(Exception):
    code = 404
    message = 'Image not found'

@app.route('/', methods=["POST"])
def charRecogAndDistDetect():
        data = request.get_json()
        decoded = base64.b64decode(data["image"])
        nparr = np.frombuffer(decoded, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        cv2.imwrite('image.jpg', img, [cv2.IMWRITE_JPEG_QUALITY, 50])

        calib = base64.b64decode(data["calib_image"])
        nparr = np.frombuffer(calib, np.uint8)
        calib_img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        cv2.imwrite('calibration.jpeg', calib_img, [cv2.IMWRITE_JPEG_QUALITY, 50])


        img_path = "image.jpg"
        test_img = "calibration.jpeg"

        #character recognition function
        ocr = PaddleOCR(use_angle_cls=False)
        result = ocr.ocr(img_path, cls=False)
        print(result)
        if(result == [[]]):
                output = 0
        elif(result[0][0][1][0][-1]=='.'):
                output = float(result[0][0][1][0][:-1])
        else:
                output = float(result[0][0][1][0])
        if result is None:
                raise ImageNotFoundException("Image not found")

        # if(output>=60):
        #         output = output/10

        #only accounting for 2 decimal places, make change if using one decimal place
        if(output>=100):
                output = output/100


        #distance estimation function
        img = cv2.imread(test_img) # For focal length
        print(img)
        ref_image_face_width = FindDiagonal(img)
        print('This is ref_image_face_width ', ref_image_face_width)
        Known_distance = float(data["calib_length"])
        Known_width = float(data["diag_length"])

        Focal_length_found = Focal_Length_Finder(
                Known_distance, Known_width, ref_image_face_width)
        print('This is focal length ', Focal_length_found)

        img = cv2.imread(img_path) # Actual image
        if img is None:
                raise ImageNotFoundException("Image not found")
        actualWidth = float(data["diag_length"])
        face_width_in_frame = FindDiagonal(img)
        Distance = Distance_finder(
                        Focal_length_found, actualWidth, face_width_in_frame)
        print('This is distance ', Distance)

        weight = output
        # weight = 3
        height = Distance

        #bmi calculation
        # (him = height in meters)
        him = height/100
        bmi = weight/(him*him)


        # nutrition status
        age = data["age"]
        #age = 1
        gender = data["gender"]
        status = malnutrition_status_checker(age, gender, height, weight)

        print("Weight: ", weight)
        print("Height: ", height)
        print("BMI: ", bmi)
        print("Malnutrition Status: ", status)
        print("Age: ", age)
        height = round(height, 2)
        return jsonify({'weight': weight, 'height': height, 'bmi': bmi, 'malnutrition_status': status}), 200



if __name__ == "__main__":
     app.run(debug=True ,port=8080,use_reloader=False)
