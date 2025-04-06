### Running This Project

**1. Clone the repo**

```bash
git clone https://github.com/ykkalexx/justeat-assesemnet2025.git
```

**2. Cd in the directory and install deps**

```bash
cd ./justeat-assesemnet2025
npm install
```

**3. Create a .env file with this**

```bash
NEXT_PUBLIC_JUST_EAT_API_URL="just eat url for the api"
```

**4. Run the Project**

```bash
npm run dev
```

### Assumptions

- The application will work only using the UK postcodes
- The data fetching needs to include filters in order to fetch only the data needed for this assesement and return only the first
  10 restaurants
- Need to present the data in a theme matching Just Eat's products.
- Initially believed that there was no need for a backend, but i did need a backend layer in order to fetch the data using the given API endpoint by just eat because my assumption is that the API endpoint doesn't have CORS headers that allow request from a localhost / browser domain. Essentially when the browser makes the requests it sends a preflights 'OPTIONS' request and the server doesn't respond with the neccesary permission headers and so the browser blocks the actual request. Created my server in order to acts as a proxy and allow the fetching of these data.

Client -> My Server -> Just Eat Api

Just Eat Api -> My Server -> Client

### Improvements

1. **Caching**

I could implement client-side caching with React Query or server-side catching for API responses, in order to reduce load and improve the performance of the website.
The catching will work my storing the most recent search results in local storage

2. **Performance Optimization**

In order to improve the performance of this application , i could implement virtualized lists for restaurants when displaying many results, also adding image lazy loading.

3. **Offline Support**

Adding offline support with service workers. The service workers will catch the essentials assets which is HTML,CSS,JS and introduce two different catching strategies for those resources.

1. Cache first for static assets
2. Network-first with cache fallback for restaurant data

3. **Map Improvements**

An improve to the map will be to add clustering for multiple restaurants markers in the same area and implementing geo-lication to automatically detect user's location.

6. **Testing**

Improve testing coverage, atlthough i have created unit tests for the two custom components, `Input.tsx` and `Button.tsx` i haven't created unit tests for the other components such as `RestaurantsCard.tsx`, `page.tsx` or even the api route due to time constraints.
