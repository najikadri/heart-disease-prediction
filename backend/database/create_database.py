from pathlib import Path
import pandas as pd
import sqlite3

# * important note: this script will replace the existing database if it exists.

# relative path to the data directory
data_directory = Path(__file__).parent.parent.parent
data_directory = data_directory / "data-analysis" / "data"

data_file = data_directory / "heart.csv"

df = pd.read_csv(data_file)

# Remove existing 'id' column if it exists (let SQLite handle it)
if 'id' in df.columns:
    df = df.drop('id', axis=1)

# Connect to (or create) SQLite database
conn = sqlite3.connect('heart_disease.db')  # This will create the file if it doesn't exist

# Write to a temporary table (no id column)
df.to_sql('patients_tmp', conn, if_exists='replace', index=False)

# Create the final table with id as PRIMARY KEY AUTOINCREMENT
conn.execute('DROP TABLE IF EXISTS patients')
conn.execute('''
    CREATE TABLE patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Age INTEGER,
        Sex TEXT,
        ChestPainType TEXT,
        RestingBP INTEGER,
        Cholesterol INTEGER,
        FastingBS INTEGER,
        RestingECG TEXT,
        MaxHR INTEGER,
        ExerciseAngina TEXT,
        Oldpeak REAL,
        ST_Slope TEXT,
        HeartDisease INTEGER
    )
''')

# Insert data from temp table (SQLite will auto-fill id)
conn.execute('''
    INSERT INTO patients (
        Age, Sex, ChestPainType, RestingBP, Cholesterol, FastingBS,
        RestingECG, MaxHR, ExerciseAngina, Oldpeak, ST_Slope, HeartDisease
    )
    SELECT
        Age, Sex, ChestPainType, RestingBP, Cholesterol, FastingBS,
        RestingECG, MaxHR, ExerciseAngina, Oldpeak, ST_Slope, HeartDisease
    FROM patients_tmp
''')

# Clean up: Drop temp table and commit
conn.execute('DROP TABLE patients_tmp')
conn.commit()
conn.close()
