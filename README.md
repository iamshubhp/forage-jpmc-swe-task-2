# JPMC Task 2
Starter repo for task 2 of JPMC's Forage program

In this task, I implemented functionality to fix the client-side web application. Initially, 
the app only updated the graph when the "Start Streaming Data" button was clicked multiple times, and it did not handle duplicated stock data.

I made changes to enable continuous data updates in the graph and ensure that duplicated data points were aggregated. Specifically:

- Modified `App.tsx`
    
- Updated `Graph.tsx`

→ This will allow the graph to continuously update with new stock data and handle duplicates by consolidating them.

→ After completing the implementation, I committed my changes and generated a git patch file for submission.

→ Clone the repository:

git clone https://github.com/iamshubhp/forage-jpmc-swe-task-2.git

→ Navigate to the project directory:

cd forage-jpmc-swe-task-2

→ Set up a Python virtual environment:

python -m venv venv

→ Activate the virtual environment:
   - On macOS/Linux:
   
   source venv/bin/activate
   
   - On Windows:
   
   venv\Scripts\activate

→ Install Python dependencies:

pip install -r requirements.txt

→ Ensure Node.js version 18.10.0 is installed. Check the version:

node -v

→ If needed, install the correct version using nvm:

nvm install 18.10.0

nvm use 18.10.0

→ Install JavaScript dependencies:

npm install

→ Start the Python server:

python datafeed/server3.py

→ In a separate terminal, start the client:

npm start

→ The application will be available at http://localhost:3000, and the stock data graph will continuously update in real-time.

→ To create a git patch file for submission, use:

git add .

git commit -m "Implemented continuous updates and graph enhancements"

git format-patch origin/main --stdout > changes.patch
