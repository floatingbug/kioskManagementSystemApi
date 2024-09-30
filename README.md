# API documentation

---

# Get Items

**Endpoint:** `/get-items`

**HTTP-Methode:** GET

**Query-Parameter:**
- `type`: The type of item to filter. 
	- Example: `/get-items/?type=shoe` 
	- Possible values: `shoe`, `hose`, etc.
-  `start`: The starting index of the item list (zero-based). Determines from which item the list should start. 
	- Example: `/get-items/?start=10` 
- `end`: The ending index of the item list (zero-based). Determines up to which item the list should be returned. 
	- Example: `/get-items/?end=20`

**Example-request:**
```http
GET /get-items/?type=shoe
```

- Returns all items with type shoe.

**Example-Response:**

```json
{
  "items": [
    {
      "brand": "Nike",
      "type": "shoe",
      "size": 42,
      "count": 19,
    },
    {
      "brand": "Puma",
      "type": "shoe",
      "size": 36,
      "count": 7,
    }
  ]
}
```

**Possible status codes:**

- `200 OK`: Request was successful.
- `400 Bad Request`: Invalid query parameters, such as missing or malformed `type`.
- `404 Not Found`: No items found matching the specified `type`.