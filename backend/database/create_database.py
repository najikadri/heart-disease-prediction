from pathlib import Path
import pandas as pd
import sqlite3

# * important note: this script will replace the existing database if it exists.

# relative path to the data directory
data_directory = Path(__file__).parent.parent.parent
data_directory = data_directory / "data-analysis" / "data"

data_file = data_directory / "heart.csv"

df = pd.read_csv(data_file)

df.insert(0, 'id', range(1, len(df) + 1))  # Add an 'id' column starting from 1
# Connect to (or create) SQLite database
conn = sqlite3.connect('heart_disease.db')  # This will create the file if it doesn't exist


# 3. Write DataFrame to SQLite table (e.g., 'patients')
df.to_sql('patients', conn, if_exists='replace', index=False)
