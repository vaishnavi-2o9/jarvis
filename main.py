import requests
import sqlite3

# Define API keys
openweathermap_api_key = "YOUR_OPENWEATHERMAP_API_KEY"
newsapi_api_key = "YOUR_NEWSAPI_API_KEY"

# Weather API
def get_weather(city):
    base_url = "http://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": city,
        "appid": openweathermap_api_key,
        "units": "metric"
    }
    response = requests.get(base_url, params=params)
    weather_data = response.json()
    return weather_data

def speak_weather(weather_data):
    print("Weather Data:")
    print(weather_data)
    if "name" in weather_data:
        city = weather_data["name"]
        temperature = weather_data["main"]["temp"]
        humidity = weather_data["main"]["humidity"]
        print(f"The current weather in {city} is {temperature} degrees Celsius with {humidity}% humidity.")
    else:
        print("Error: Unable to retrieve weather data.")

# News API
def get_news(topic):
    base_url = "https://newsapi.org/v2/everything"
    params = {
        "q": topic,
        "apiKey": newsapi_api_key
    }
    response = requests.get(base_url, params=params)
    news_data = response.json()
    return news_data

def speak_news(news_data):
    print("News Data:")
    print(news_data)
    if "articles" in news_data:
        articles = news_data["articles"]
        for article in articles:
            print(article["title"])
    else:
        print("Error: Unable to retrieve news data.")

# To-Do List
def create_todo_list_db():
    conn = sqlite3.connect("todo_list.db")
    c = conn.cursor()
    c.execute("""CREATE TABLE IF NOT EXISTS todo_list (
                id INTEGER PRIMARY KEY,
                task TEXT
            )""")
    conn.commit()
    conn.close()

def add_task(task):
    conn = sqlite3.connect("todo_list.db")
    c = conn.cursor()
    c.execute("INSERT INTO todo_list (task) VALUES (?)", (task,))
    conn.commit()
    conn.close()

def get_tasks():
    conn = sqlite3.connect("todo_list.db")
    c = conn.cursor()
    c.execute("SELECT * FROM todo_list")
    tasks = c.fetchall()
    conn.close()
    return tasks

def speak_tasks(tasks):
    for task in tasks:
        print(task[1])

# Test the functions
city = "London"
weather_data = get_weather(city)
speak_weather(weather_data)

topic = "technology"
news_data = get_news(topic)
speak_news(news_data)

create_todo_list_db()
add_task("Buy milk")
tasks = get_tasks()
speak_tasks(tasks)