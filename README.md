# API documentation

---

# Get Items

**Endpoint:** `/get-items`

**HTTP-Methode:** GET

**Query-Parameter:**
- `type` (required): The type of item to filter. 
	- Example: `/get-items/?type=book` 
	- Possible values: `book`, `drink`, etc.
- `start`: The starting index of the item list (zero-based). Determines from which item the list should start. 
	- Example: `/get-items/?start=10` 
- `end`: The ending index of the item list (zero-based). Determines up to which item the list should be returned. 
	- Example: `/get-items/?end=20`
- `genre`:
    - Example: `/get-items/?type=book&genre=comedy`

**Example-request:**
```http
GET /get-items/?type=book
```

- Returns all items with type book.

**Example-Response:**

```json
{
    "items": [
    	{
		"type": "book",
          "author": "Stephen King",
          "title": "Es",
          "genre": "comedy",
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

**Possible status codes:**

- `200 OK`: Request was successful.
- `400 Bad Request`: Invalid query parameters, such as missing or malformed `type`.
- `404 Not Found`: No items found matching the specified `type`.