read -p "Enter type: " type

if [ "$type" = "drink" ]; then
	json=$(cat << EOF
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
EOF
)
fi

if [ "$type" = "book" ]; then
	json=$(cat << EOF
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
EOF
)
fi

curl \
	-H "Content-Type: application/json" \
	-d "$json" \
	"http://localhost:3000/add-items"
