***

# API Documentation

***

# Get Items

**Endpoint:** `/get-items`

**HTTP Method:** `GET`

### Query Parameters:

* `type` (required): The type of item to filter.

  * Example: `/get-items/?type=book`
  * Possible values: `book`, `drink`, etc.

* `start` (optional): The starting index of the item list (zero-based). Determines from which item the list should start.
  * Example: `/get-items/?start=10`

* `end` (optional): The ending index of the item list (zero-based). Determines up to which item the list should return.
  * Example: `/get-items/?end=20`

* `genre` (optional): The genre of items to filter (applies to certain types like books).
  * Example: `/get-items/?type=book&genre=comedy`

### Example Request:

```http
GET /get-items/?type=book&genre=comedy
```

* Returns all items of type `book` that match the genre `comedy`.

### Example Response:

```json
{
    "items": [
        {
            "type": "book",
            "author": "Stephen King",
            "title": "It",
            "genre": "horror",
            "count": 7
        },
        {
            "type": "book",
            "author": "Frank Herbert",
            "title": "Dune",
            "genre": "science fiction",
            "count": 3
        }
    ]
}
```

### Possible Status Codes:

* `200 OK`: The request was successful, and the items were retrieved.
* `400 Bad Request`: Invalid or missing query parameters, such as a missing or malformed `type`.
* `404 Not Found`: No items found matching the specified `type`.

---

# Add Items

**Endpoint:** `/add-items`

**HTTP Method:** `POST`

##### Description:

This endpoint allows adding items of a specific type, such as "book" or "drink". The payload must be in JSON format.

**Format:**

```json
{
    "type": "book",
    "items": []
}
```

* The first property, `type`, represents the category of items to be added to the database (e.g., `book`, `drink`).
* The second property, `items`, is a list of objects, where each object represents an item (e.g., a specific brand for a drink or a title for a book).



### Drink Item Format:

For adding drinks, the objects in the `items` list should follow this format:

* `brand` (required): The brand of the drink.

	  * Example: `"productName": "Sprite"`
	  * Data type: `String`

* `content`: The size of the drink.

	  * Example: `"content": "0.5"`
	  * Data type: `Number`

* `stock`: The number of items in stock.

	  * Example: `"count": 27`
	  * Data type: `Number`

* `price`: The price of the item.

	  * Example: `"price": "1.30"`
	  * Data type: `Number`

* `note` (optional): Any additional information or note.

	  * Example: `"note": "Raise price one day before Christmas."`
	  * Data type: `String`

##### Example Request:

```http
POST /add-items
Content-Type: application/json

{
    "type": "drink",
    "items": [
        {
            "brand": "Coca-Cola",
            "content": "1.5l",
            "count": 12,
            "price": "2.50euro"
        },
        {
            "brand": "Sprite",
            "content": "0.5l",
            "count": 44,
            "price": "1.00euro"
        }
    ]
}
```

##### Possible Status Codes:

* `200 OK`: The request was successful, and the items were added to the database.
* `400 Bad Request`: The request was invalid due to missing or malformed properties, such as an invalid `type`.



### Book Item Format:

For adding books, the objects in the `items` list should follow this format:

* `author` (required): The author of the book.

	  * Example: `"author": "Stephen King"`
	  * Data type: `String`

* `genre`: The genre of the book.

    * Example: `"genre": "Horror"`
    * Data type: `String`

* `stock`: The number of items in stock.

	  * Example: `"count": 27`
	  * Data type: `Number`

* `price`: The price of the item.

	  * Example: `"price": "20.00"`
	  * Data type: `Number`

* `note` (optional): Any additional information or note.

  * Example: `"note": "Raise price one day before Christmas."`
  * Data type: `String`

##### Example Request:

```http
POST /add-items
Content-Type: application/json

{
    "type": "book",
    "items": [
        {
            "author": "Stephen King",
			"genre": "Horror",
			"count": 4,
            "price": "20.00euro"
        },
        {
            "author": "Frank Herbert",
			"genre": "Science Fiction",
            "count": 2,
            "price": "5euro",
			"note": "Increase price on Dune release."
        }
    ]
}
```

##### Possible Status Codes:

* `200 OK`: The request was successful, and the items were added to the database.
* `400 Bad Request`: The request was invalid due to missing or malformed properties, such as an invalid `type`.

---

# Delete Items