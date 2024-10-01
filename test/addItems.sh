read -p "Enter: type, amount, genre, "description": " type amount genre description

json=$(cat <<EOF
{
	"type": "$type",
	"items": [
		{
			"amount": $amount,
			"genre": "$genre",
			"description": "$description"
		}
	]
}
EOF
)

curl \
	-H "Content-Type: application/json" \
	-d "$json" \
	http://localhost:3000/add-items
