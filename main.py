from flask import Flask, render_template, request, jsonify, session, redirect
import sqlite3

app = Flask(__name__)
app.secret_key = '1234'

conn = sqlite3.connect('resume.db', check_same_thread=False)
c = conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS users
             (UID INTEGER PRIMARY KEY, 
             username TEXT, 
             email TEXT UNIQUE, 
             password TEXT)''')

c.execute('''CREATE TABLE IF NOT EXISTS personal_information
             (pID INTEGER PRIMARY KEY,
             where_email TEXT,
             name TEXT, 
             pemail TEXT, 
             contact TEXT, 
             location TEXT, 
             about_me TEXT,
             FOREIGN KEY (where_email) REFERENCES users(email))''')

c.execute('''CREATE TABLE IF NOT EXISTS experience
             (exID INTEGER PRIMARY KEY,            
             where_email TEXT,
             jobtitle TEXT, 
             company TEXT, 
             experience_date TEXT, 
             experience_description TEXT,
             FOREIGN KEY (where_email) REFERENCES users(email))''')

c.execute('''CREATE TABLE IF NOT EXISTS education
             (edID INTEGER PRIMARY KEY,           
             where_email TEXT,
             coursename TEXT, 
             course_uni TEXT, 
             course_date TEXT, 
             course_description TEXT,
             FOREIGN KEY (where_email) REFERENCES users(email))''')

c.execute('''CREATE TABLE IF NOT EXISTS quality
             (qID INTEGER PRIMARY KEY,           
             where_email TEXT,
             skills TEXT, 
             language TEXT, 
             hobbies TEXT,
             FOREIGN KEY (where_email) REFERENCES users(email))''')

conn.commit()
conn.close()


@app.route('/')
def login():
    return render_template('index.html')


@app.route('/signup')
def signup():
    return render_template('signup.html')


@app.route('/signupconfirm', methods=['POST'])
def signupconfirm():
    if request.method == 'POST':
        data = request.json
        username = data['username']
        email = data['email']
        password = data['password']

        conn = sqlite3.connect('resume.db', check_same_thread=False)
        c = conn.cursor()

        c.execute("SELECT * FROM users WHERE email = ?", (email,))
        existing_user = c.fetchone()

        if existing_user:
            conn.close()
            return jsonify({'message': 'Email already exists. Please use a different email.'}), 400

        c.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                  (username, email, password))
        conn.commit()
        conn.close()

        return jsonify({'message': 'User signed up successfully!'})


@app.route('/loginConfirm', methods=['POST'])
def loginConfirm():
    if request.method == 'POST':
        data = request.json
        email = data['email']
        password = data['password']

        conn = sqlite3.connect('resume.db', check_same_thread=False)
        c = conn.cursor()
        c.execute(
            "SELECT * FROM users WHERE email = ? AND password = ?", (email, password))
        user = c.fetchone()
        conn.close()

        if user:
            session['email'] = email
            return jsonify({'message': 'Login successful!'})
        else:
            return jsonify({'message': 'Invalid email or password'})


@app.route("/logout")
def logout():
    session.clear()
    return redirect('/')


@app.route("/formSubmit", methods=['POST'])
def formSubmit():
    if 'email' in session:
        if request.method == 'POST':
            data = request.json
            email = session['email']
            name = data['name']
            pemail = data['pemail']
            contact = data['phone']
            location = data['location']
            about_me = data['aboutmeDes']
            experienceData = data['experienceData']
            educationData = data['educationData']
            skillData = data['skillData']
            langData = data['langData']
            hobbyData = data['hobbyData']

            conn = sqlite3.connect('resume.db', check_same_thread=False)
            c = conn.cursor()

            c.execute(
                "DELETE FROM personal_information WHERE where_email = ?", (email,))
            c.execute("DELETE FROM experience WHERE where_email = ?", (email,))
            c.execute("DELETE FROM education WHERE where_email = ?", (email,))
            c.execute("DELETE FROM quality WHERE where_email = ?", (email,))
            conn.commit()

            c.execute("INSERT INTO personal_information (where_email, name, pemail, contact, location, about_me) VALUES (?, ?, ?, ?, ?, ?)",
                      (email, name, pemail, contact, location, about_me))
            conn.commit()

            pID = c.lastrowid

            for experience in experienceData:
                jobtitle = experience['jobTitle']
                company = experience['company']
                experience_date = experience['date']
                experience_description = experience['jobDes']
                c.execute("INSERT INTO experience (where_email, jobtitle, company, experience_date, experience_description) VALUES (?, ?, ?, ?, ?)",
                          (email, jobtitle, company, experience_date, experience_description))
                conn.commit()

            for education in educationData:
                coursename = education['courseName']
                course_uni = education['courseUniversity']
                course_date = education['date']
                course_description = education['courseDes']
                c.execute("INSERT INTO education (where_email, coursename, course_uni, course_date, course_description) VALUES (?, ?, ?, ?, ?)",
                          (email, coursename, course_uni, course_date, course_description))
                conn.commit()

            c.execute("INSERT INTO quality (where_email, skills, language, hobbies) VALUES (?, ?, ?, ?)",
                      (email, ', '.join(skillData), ', '.join(langData), ', '.join(hobbyData)))
            conn.commit()

            conn.close()

            return jsonify({'message': 'Form submitted successfully!'})
    else:
        return jsonify({'message': 'User not logged in!'}), 400


@app.route('/homepage')
def homepage():
    if 'email' in session:
        return render_template('homepage.html')
    else:
        return redirect("/")


if __name__ == '__main__':
    app.run(debug=True)
