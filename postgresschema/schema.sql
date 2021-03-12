CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    gmail_token TEXT,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_widgets (
    widgets_id serial PRIMARY KEY,
    user_id INTEGER NOT NULL references users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS widget (
    id serial PRIMARY KEY UNIQUE,
    type TEXT,
    delay Int,
    parameters json,
    widgets_id INTEGER NOT NULL references user_widgets(widgets_id) ON DELETE CASCADE
);
