# Setup and Run Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/AdamBaugher/swapi-view.git
cd swapi-view
```
### 2. Install Dependencies
Make sure you have Node.js installed. Then, run:
```bash
npm install
```
### 3. Start the Development Server
```bash
npm start
```
This will launch the app at http://localhost:3000.
### 4. Build for Production
To create a production-ready build, run:
```bash
npm run build
```
<br><br><br>

# The Star Wars API

The Star Wars API is programmatically-accessible data source for all the data from the Star Wars canon universe!

## Resources

SWAPI provides a list of people, films, starships, vehicles, species and planets.
These are called resources.
SWAPI also provides a root of them, which returns the list of resource types.

## Root

Request: 
```
https://swapi.dev/api/
```
Response:
```
HTTP/1.0 200 OK
Content-Type: application/json
{
    "films": "https://swapi.dev/api/films/",
    "people": "https://swapi.dev/api/people/",
    "planets": "https://swapi.dev/api/planets/",
    "species": "https://swapi.dev/api/species/",
    "starships": "https://swapi.dev/api/starships/",
    "vehicles": "https://swapi.dev/api/vehicles/"
}
```

## EndPoints

```
/resourceType/? page & search --- get the list of resources
/resourceType/:id/            --- get a specific resource
```

Example Request:
```
https://swapi.dev/api/people/1/
```
Example Response:
```
HTTP/1.0 200 OK
Content-Type: application/json
{
    "birth_year": "19 BBY",
    "eye_color": "Blue",
    "films": [
        "https://swapi.dev/api/films/1/",
        ...
    ],
    "gender": "Male",
    "hair_color": "Blond",
    "height": "172",
    "homeworld": "https://swapi.dev/api/planets/1/",
    "mass": "77",
    "name": "Luke Skywalker",
    "skin_color": "Fair",
    "created": "2014-12-09T13:50:51.644000Z",
    "edited": "2014-12-10T13:52:43.172000Z",
    "species": [
        "https://swapi.dev/api/species/1/"
    ],
    "starships": [
        "https://swapi.dev/api/starships/12/",
        ...
    ],
    "url": "https://swapi.dev/api/people/1/",
    "vehicles": [
        "https://swapi.dev/api/vehicles/14/"
        ...
    ]
}
```

## Integration
The API's response is used to populate the dynamic table, where users can interact with the listed resources.

<br><br><br>

# About Application

Maintaining a high level of flexibility and maintainability was a primary focus for this application. To handle various resource types such as people, planets, and species, a single, reusable template was implemented. This design ensures that the application remains adaptable and scalable. If new resource types are introduced on the backend, they can be seamlessly integrated into the system without requiring changes to the core codebase.

The application consists of two pages - ResourcePage, ResourceDetailPage.

## 1. ResourcePage
The application displays a table of resources, allowing users to select the desired resource type from the available options. These resource types are dynamically fetched from the root endpoint. Additionally, pagination is implemented to enable seamless navigation across multiple pages of data.
By clicking `details`, users can view in-depth information for a specific resource.

## 2. ResourceDetailPage
This page displays detailed information for a specific resource, including all attributes and properties retrieved from the backend API. By clicking `details`, you can view information about related resources, or return to the list by selecting `Back to List`.

<br><br><br>

# Technical Challenges and Approach

### 1. Caching

The API results are static, so there's no need to refetch data from the same URL repeatedly. To optimize performance, save time, and reduce unnecessary API requests, I have implemented caching. I use local storage to cache the data, ensuring that repeated requests to the same URL are served from the cache rather than making new API calls. Here's the implementation:
```js
async function request(url: string) {
  // Check if data is already cached
  const cached = cache.getItem(`${prefix}.${url}`);
  if (cached) {
    return JSON.parse(cached); // Return cached data if present
  }

  ...

  // Cache the result for future use
  cache.setItem(`${prefix}.${url}`, JSON.stringify(result));
  return result;
}
```
This approach effectively reduces redundant API calls and enhances overall performance.
#### SWAPI Rate Limiting
Swapi has rate limiting to prevent malicious abuse (as if anyone would abuse Star Wars data!) and to make sure our service can handle a potentially large amount of traffic. Rate limiting is done via IP address and is currently limited to 10,000 API request per day. This is enough to request all the data on the website at least ten times over. There should be no reason for hitting the rate limit.

### 2. Dynamic Data Management

Although there are only six types of resources—people, planets, films, species, vehicles, and starships—I managed all of them using a single template, independent of their type. Each resource returns data with a unique schema, requiring efficient use of object functions to handle the variations. For instance, I utilized the following approach to dynamically process the resource data:
```js
Object.entries(resource).map(([key, value]) => (
    ...
))
```

### 3. Asynchronous Actions Management

API requests are asynchronous by nature, and on the resource detail page, I needed to populate certain fields with additional data. For example, in the people resource, properties like films, starships, and vehicles are represented only by URLs, so I had to make additional API requests to retrieve the relevant details. To manage these asynchronous operations efficiently, I extensively utilized async/await and Promise for optimal request handling. Below is an example of how I handled the population of related resources:
```js
const populateSingle = async (path: string, obj: any) => {
    ...
}

await Promise.all(Object.keys(obj).map(path => populateSingle(path, obj)));
```

### 4. Avoid unnecessary rerendering

While working with React application, to optimize performace, it is really important to avoid unnecessary rerendering as possible.
I used useCallback to memorize the functions and so avoid rerendering.
```js
const generatePageNumbers = useCallback(() => {
    ...
}, [currentPage, totalPages]);
```

<br><br><br>

# Assumptions
### 1. ID Extraction:
URLs provided by the API include an ID segment in the format /resource/{id}/. A helper function extracts this ID for navigation.
### 2. Data Consistency:
Assumed that the API returns consistent fields as specified in displayConfig for each resource type.
### 3. UI Responsiveness:
Assumed users primarily interact with the application on a desktop browser. Mobile support was deprioritized due to time constraints.

<br><br><br>

# Trade-offs and Limitations
### 1. Time Constraints:
- Tooltip rendering assumes a single active tooltip at a time and does not account for performance optimization of rapid mouse movements over large datasets.
- Limited styling and responsiveness due to prioritization of core functionality.
### 2. Dynamic Table Headers:
The table headers and visible properties depend on a predefined configuration (displayConfig). Any discrepancies between API responses and this configuration may result in incomplete data rendering.
### 3. Error Handling:
Basic error handling (e.g., invalid API responses) has been implemented, but comprehensive logging and retries were skipped.
