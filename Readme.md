# Twilio Personal Bot

This is a personal Whatsapp bot built using [Twilio API](https://github.com/twilio/twilio-node) in nodejs. The backend database used is postgreSQL.

## Available commands

    /login
    /save <note tag> <content aka whatever you wanna save>
    /book <bookmark content or url or whatever>
    /vnote <note tag>
    /vbook

### Want one for yourself ?

1. Head over to [Twilio's website](https://www.twilio.com/console/sms/whatsapp/learn)
2. Create an account and login if you haven't and configure your number with the [Twilio whatsapp sandbox](https://www.twilio.com/console/sms/whatsapp/sandbox)
3. Follow the instructions you find on the website
4. Now head over to [Heroku](https://dashboard.heroku.com/) to deploy the bot. Sign up if you haven't already and login
5. Create an application and add heroku-postgres as a resource
6. Run the following commands using the heroku cli to create the tables in the database

        CREATE TABLE users (phone varchar not null);
        CREATE TABLE content (phone varchar not null, note varchar not null, message varchar);
        CREATE TABLE bookmarks (phone varchar not null, bookmark varchar);

7. Alright now your database is all set up and ready to start storing information

8. Deploying this server
    - Clone this repository
    - Create a .env file containing the following information
        
            PORT=<a port number>
            SID=<The SID that you can get from Twilio dashboard>
            TOKEN=<The SID that you can get from Twilio dashboard>
            ENV=production
            PROD_URL=<The heroku-postgres url that you'll get from settings>

    - Push code to heroku using heroku cli or from Github itself
9. Test by sending any of the commands to the bot