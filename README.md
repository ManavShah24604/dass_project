# DASS-2022-23-Team-09 - Automated Malnutrition Detection

## Table of Contents:

-   Description
-   Installation and Setup
-   Profile of Users
-   Feature highlights
-   Program Usage
-   Usage Model and Diagrams (if any)
-   Dependencies
-   Further Development and Modifications

## Description

Malnutrition is a highly prevalent issue across rural India, especially among young children which can cause deteriorated growth and in the severe cases early mortality. There are multiple organizations working to prevent this by trying to track malnutrition across the concerned population. The process is highly manual, with people noting down heights and weights, and tracking them across time.

In the current work we try to automate the process to lighten the workload as well as reduce possible data entry errors. The proposed solution is to use a camera to read the weighing scale and estimate the height of the subject, use these values to estimate the malnutrition status and store all information for longitudinal growth tracking.

## Installation and Setup

The program is built on MERN stack and Flask. We have one frontend module in React, one backend module in Express and mongoose, and one backend module in Flask. The frontend and backend modules are connected through REST APIs. The backend modules are connected to a MongoDB database (Atlas).

Free up these ports for the modules to run:

-   frontend: 3000
-   exp-backend: 3001
-   flask-backend: 8080

First download the repository and install the dependencies for the frontend and backend modules. The frontend module is in the `frontend` folder and the Express backend module is in the `backend` folder. The dependencies can be installed by running the following commands in the respective folders:

```bash
npm i
```

Running both the MERN stack modules is done by running the following command in the respective folders:

```bash
npm start
```

The Flask backend module is in the `flask-backend` folder. The code when run on an Anaconda environment will let us use all the required modules. The code can be run by running the following command in the `flask-backend` folder:

```bash
python3 function_apis.py
```

Learn to setup Anaconda on your system here: https://docs.anaconda.com/anaconda/install/ . We will need to install various dependencies for the Flask backend module. The dependencies are listed at the end of this document.

Change the MongoDB connection string in the `backend/index.js` file to your own MongoDB connection string. The connection string can be obtained from the MongoDB Atlas website.

Follow the instructions given here to setup MongoDB Atlas: https://docs.atlas.mongodb.com/getting-started/ . The connection string will be of the form:

```bash
mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority
```

> Note: The connection string will be different for you. Replace the connection string in the `backend/index.js` file with your own connection string. The connection string used in out development has been removed from the file. Running the program without changing the connection string will result in an error.

## Profile of Users

We have only two user groups intended for the application:

1. Ground personnel: Responsible for taking the pictures and making corrections to estimates as needed.
2. Administrator: Responsible for the maintenance of the system and capable of viewing information aggregated by all the ground personnel.

## Feature highlights

The developed system requires the following features:

### Frontend/UI:

1. Input age.
2. Display image taken.
3. Show height, weight, and malnutrition estimation.
4. Allow for entering corrections for all three above.

### Backend/APIs:

1. Receive input image from a smart phone camera.
2. Estimate distance from reference marker.
3. Read the weight from the weighing machine through character recognition.
4. Estimate malnutrition status by comparison of age, height, and weight with reference growth charts.
5. Send back all the estimated information (height, weight, and malnutrition status).

## Program Usage

-   Register a new user by clicking on the `Register` tab on the login page. If you are already registered, you can login by clicking on the `Login` tab. When registering a new user, admin privileges are acquired by choosing admin 'yes'. The NGO code is currently not implemented, but can be used to identify the NGO that the user is associated with.

-   The Dashboard shows options to calibrate the pipeline, register new patients, upload new data for a patient, view results of a patient, and view the results of all patients (only for admin users).

-   Calibrate page takes in the height from which the calibration image is taken, the diagonal length of the checker grid used (diagonal length of first inner grid), as well as the calibration image.

-   Register patient page enables user to register a new patient to the system. Primary key implemented in the program currently is [firstname, lastname, contact number]. Additional details such as Date of Birth are also taken in.

-   Upload data page enables user to upload a session data for patients. User can upload an image of the setup, with the checker pattern and weighing scale visible. The program will then estimate the height of the patient, the weight of the patient, and the malnutrition status of the patient. The program will also save the image in the database. Follow image given below for reference.

-   View results page enables user to view the results of a patient. User can enter the patient's name and contact number to view the results. The program will display the height, weight, and malnutrition status of the patient, in each of the sessions.

-   View all results pagec (only for Admins) enables user to view the results of all patients, similar to the view results page. The difference is that the user can view results of all patients, and does not require to enter the patient's name and contact number.

## Usage Model and Diagrams (if any)

Fig. 1 shows a simple diagram of the expected system to be developed.

![( ; v ;) Sorry links are broken](images/DASS-2023-AMD.png?raw=true)

<p align="center"> <b> Fig 1. Simple diagram of the proposed automated setup. </b> </p>

The flow screens for the system need to be minimal and self-explanatory, to allow for ease of use by personnel with low computer literacy. These will be updated later in the term based on further discussions with the client.

## Dependencies

Frontend module:

-   react
-   axios
-   material-ui
-   material-ui/x-date-pickers
-   react-dom
-   react-router-dom
-   dayjs
-   nodemon (for development - `devDependencies`)

Express backend module:

-   axios
-   bcrypt
-   bcryptjs
-   body-parser
-   cors
-   dotenv
-   express
-   express-async-handler
-   jsonwebtoken
-   mongoose
-   nodemon (for development - `devDependencies`)

Flask backend module:

-   Flask
-   base64
-   cv2 (`opencv` for installation)
-   numpy
-   paddleocr (installation from github: https://github.com/PaddlePaddle/PaddleOCR)

> Note: Dependencies for MERN stack modules are installed by running `npm i` in the respective folders. Dependencies for Flask backend module must be installed manually. Running the code without any dependency would result in an error (mentioning the missing dependency, use this error message to install the dependency).

## Further Development and Modifications

The program currently does not support organisation specific patient registration. This can be implemented by adding a field for NGO code in the patient registration page, and adding a field for NGO code in the user registration (this would be used to identify the organisation that the user is associated with). NGO code imlementation also brings alive admin privileges, which can be used to implement heirarchy in the organisation. For example, an admin user can view the results of all patients, while a non-admin user can only view the results of patients that are registered under the organisation that the user is associated with.

## References

1.  https://www.who.int/childgrowth/standards/en/
2.  https://github.com/PaddlePaddle/PaddleOCR
3.  https://pypi.org/project/opencv-python/
4.  https://docs.anaconda.com/anaconda/
5.  https://material-ui.com/
