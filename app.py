from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from flask_cors import CORS
from datetime import datetime, timedelta
import random
import bcrypt
from flask_cors import CORS  # Ensure CORS is imported
import requests
import csv

# Initialize the Flask application
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins (you can restrict it)


# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:root@localhost:5432/x'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'riteshmodel18@gmail.com'
app.config['MAIL_PASSWORD'] = 'qafr uxig evmr qtld'

# Initialize extensions
db = SQLAlchemy(app)
mail = Mail(app)


@app.route('/')
def home():
    return 'Welcome to the API!'

# User model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    otp = db.Column(db.String(6), nullable=True)
    otp_expiration = db.Column(db.DateTime, nullable=True)
    is_verified = db.Column(db.Boolean, default=False)

# Create the database tables
with app.app_context():
    db.create_all()

# Helper function to generate OTP
def generate_otp():
    return str(random.randint(100000, 999999))

# Register API
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'message': 'Name, email, and password are required'}), 400

    # Check if the user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email is already registered'}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    # Generate OTP for email verification
    otp = generate_otp()
    otp_expiration = datetime.utcnow() + timedelta(minutes=5)

    # Create a new user
    new_user = User(name=name, email=email, password=hashed_password, otp=otp, otp_expiration=otp_expiration)
    db.session.add(new_user)
    db.session.commit()

    # Send OTP via email
    msg = Message('Verify Your Email', sender=app.config['MAIL_USERNAME'], recipients=[email])
    msg.body = f'Your OTP is: {otp}\nIt will expire in 5 minutes.'
    try:
        mail.send(msg)
        return jsonify({'message': 'Registration successful'}), 200
    except Exception as e:
        return jsonify({'message': f'Failed to send OTP: {str(e)}'}), 500

# Verify OTP API
@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    email = data.get('email')
    otp = data.get('otp')

    if not email or not otp:
        
        return jsonify({'message': 'Email and OTP are required'}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    if user.otp != otp:
        return jsonify({'message': 'Invalid OTP'}), 400

    if datetime.utcnow() > user.otp_expiration:
        return jsonify({'message': 'OTP expired'}), 400

    # Mark user as verified
    user.is_verified = True
    user.otp = None
    user.otp_expiration = None
    db.session.commit()

    return jsonify({'message': 'Email verified successfully'}), 200

# Login API
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    if not user.is_verified:
        return jsonify({'message': 'Email is not verified'}), 403

    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({'message': 'Invalid password'}), 400

    return jsonify({'message': 'Login successful','userName':user.name}), 200

# Forgot Password - Request Reset
@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.json
    email = data.get('email')

    if not email:
        return jsonify({'message': 'Email is required'}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Generate OTP for password reset
    otp = generate_otp()
    otp_expiration = datetime.utcnow() + timedelta(minutes=5)
    user.otp = otp
    user.otp_expiration = otp_expiration
    db.session.commit()

    # Send OTP via email
    msg = Message('Password Reset OTP', sender=app.config['MAIL_USERNAME'], recipients=[email])
    msg.body = f'Your password reset OTP is: {otp}\nIt will expire in 5 minutes.'
    try:
        mail.send(msg)
        return jsonify({'message': 'Password reset OTP sent to your email.'}), 200
    except Exception as e:
        return jsonify({'message': f'Failed to send OTP: {str(e)}'}), 500

# Reset Password API
@app.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    email = data.get('email')
    otp = data.get('otp')
    new_password = data.get('new_password')

    if not email or not otp or not new_password:
        return jsonify({'message': 'Email, OTP, and new password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    if user.otp != otp:
        return jsonify({'message': 'Invalid OTP'}), 400

    if datetime.utcnow() > user.otp_expiration:
        return jsonify({'message': 'OTP expired'}), 400

    # Update the password
    hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    user.password = hashed_password
    user.otp = None
    user.otp_expiration = None
    db.session.commit()

    return jsonify({'message': 'Password reset successfully'}), 200
    
def load_data():
    data = []
    # Specify the encoding as 'utf-8' to handle any special characters in the CSV file
    with open('data.csv', mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            data.append(row)
    return data

def get_phone_by_asin(asin):
    data = load_data()
    # Find and return the phone data that matches the given ASIN
    for phone in data:
        if phone['ASIN'] == asin:
            return phone
    return None  # Return None if no matching phone is found

# Route to get all the data
@app.route('/api/phones', methods=['GET'])
def get_phones():
    data = load_data()
    return jsonify(data)

# Route to compare two phones based on ASIN
@app.route('/api/compare_phones', methods=['GET'])
def compare_phones():
    # Get the ASINs for both phones from the query parameters
    asin1 = request.args.get('asin1')
    asin2 = request.args.get('asin2')

    if not asin1 or not asin2:
        return jsonify({"error": "Both 'asin1' and 'asin2' parameters are required."}), 400

    # Fetch phone data for both ASINs
    phone1 = get_phone_by_asin(asin1)
    phone2 = get_phone_by_asin(asin2)

    if not phone1 or not phone2:
        return jsonify({"error": "One or both ASINs not found."}), 404

    # Prepare the comparison result
    comparison = {
        "phone1": {
            "title": phone1["Title"],
            "price": phone1["Price"],
            "original_price": phone1["Original Price"],
            "star_rating": phone1["Star Rating"],
            "number_of_ratings": phone1["Number of Ratings"],
            "product_url": phone1["Product URL"],
            "image_url": phone1["Image URL"],
            "number_of_offers": phone1["Number of Offers"],
            "prime_eligible": phone1["Prime Eligible"],
            "sales_volume": phone1["Sales Volume"]
        },
        "phone2": {
            "title": phone2["Title"],
            "price": phone2["Price"],
            "original_price": phone2["Original Price"],
            "star_rating": phone2["Star Rating"],
            "number_of_ratings": phone2["Number of Ratings"],
            "product_url": phone2["Product URL"],
            "image_url": phone2["Image URL"],
            "number_of_offers": phone2["Number of Offers"],
            "prime_eligible": phone2["Prime Eligible"],
            "sales_volume": phone2["Sales Volume"]
        }
    }

    return jsonify(comparison)

# Route to get details of an individual product by ASIN
@app.route('/api/product', methods=['GET'])
def get_product():
    asin = request.args.get('asin')  # Get the ASIN from the query parameters

    if not asin:
        return jsonify({"error": "ASIN parameter is required."}), 400

    # Fetch the phone data for the given ASIN
    product = get_phone_by_asin(asin)

    if not product:
        return jsonify({"error": "Product not found for the given ASIN."}), 404

    # Prepare the product details response
    product_details = {
        "title": product["Title"],
        "price": product["Price"],
        "original_price": product["Original Price"],
        "currency": product["Currency"],
        "star_rating": product["Star Rating"],
        "number_of_ratings": product["Number of Ratings"],
        "product_url": product["Product URL"],
        "image_url": product["Image URL"],
        "number_of_offers": product["Number of Offers"],
        "minimum_offer_price": product["Minimum Offer Price"],
        "best_seller": product["Best Seller"],
        "amazon_choice": product["Amazon Choice"],
        "prime_eligible": product["Prime Eligible"],
        "climate_pledge_friendly": product["Climate Pledge Friendly"],
        "sales_volume": product["Sales Volume"],
        "delivery_info": product["Delivery Info"],
        "has_variations": product["Has Variations"]
    }

    return jsonify(product_details)


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
