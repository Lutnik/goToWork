# My go-to-work-and-return travel time
**[Hosted on Heroku](https://drivetoskm.herokuapp.com/)**

## What is the goal of this app?
- **First and foremost: to learn some web app development, both front and backend**
- **Second: to learn implementing unit testing using jest**
- **Third: to maybe minimize time lost in traffic at some point in the future...**

## What does it do, exactly?
- Pulls useful traffic information from Google Distance Matrix API, like `duration` and `duration_in_traffic`.
- It uses my private Google Cloud API key. Google [bills users per each API call](https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing?hl=pl#distance-matrix-advanced),
hence the app has hard-coded origin and destination locations to serve me specifically.
- `origins` is my home place, `destinations` are 4 train stations that quite accurately simulate various work locations in city centre
- Considering the above, to limit the amount of API calls there is a schedule:
  - Monday - Friday:
    - 06:00 to 09:59: *home* to *train stations*: every 15 minutes and *back* once every hour
    - 11:00 to 14:59: *home* to *train stations*: once every hour and *back* once every hour
    - 15:00 to 19:59: *home* to *train stations*: once every hour and *back* every 15 minutes
    - 20:00 to 05:59 following day: no data collected
  - Saturday - Sunday: no data collected
  - This results in 55 API calls/day, 275/week, ~1100/month. Google's cost is 0.01$ so running the script costs around 11$/month. 
  Or it will be once the free 300$ that you get for the first year runs out... My plan is to be rich by that time and don't mind.
- Travel time information is stored in a Mongo database. SQL would work here as well as the data is nicely structured, but there was no reasonable free relational db hosting that I could find.
- **TODO**
- [ ] Information will be pulled from the database using filters
- [ ] DB will also store aggregate data (avg traffic on Monday mornings etc.)
- [ ] The above will be displayed using D3 library
- [ ] Finally a dashboard with trends will be available
