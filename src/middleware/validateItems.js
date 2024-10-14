function validateItems(req, res, next) {
    let result = {};

    // Validate if item type is provided and data-type is correct.
    if (!req.body.type || req.body.type.trim() === "" || typeof req.body.type !== "string") {
        return res.status(400).json({ success: false, msg: "Type is not provided or type is wrong data-type." });
    }

    // Validate if items is provided and data-type is correct.
    if (!req.body.items || !Array.isArray(req.body.items)) {
        return res.status(400).json({ success: false, msg: "Items is not provided or items is wrong data-type." });
    }

    switch (req.body.type) {
        case "drink":
            result = validateDrink(req.body.items);
            break;
        case "book":
            result = validateBook(req.body.items);
            break;
        default:
            return res.status(400).json({ success: false, msg: "Invalid type provided." });
    }

    if (result.success === false) {
        return res.status(400).json(result);
    }

    next();
}

function validateDrink(items) {
    const result = { success: true };

    const isValidItems = items.every(item => {
        if (typeof item !== "object" || item === null) {
            result.success = false;
            result.msg = "Every element must be of type object.";
            return false;
        }

        if (Object.keys(item).length > 5) {
            result.success = false;
            result.msg = "Too many properties in one or more objects in items.";
            return false;
        }

        if (!item.brand || typeof item.brand !== "string" ||
            !item.content || typeof item.content !== "string" ||
            !item.count || typeof item.count !== "number" ||
            !item.price || typeof item.price !== "string" ||
            (item.note && typeof item.note !== "string")) 
        {
            result.success = false;
            result.msg = "Wrong property-name or type in one or more objects in items.";
            return false;
        }

        return true;
    });

    return result;
}

function validateBook(items) {
    const result = { success: true };

    const isValidItems = items.every(item => {
        if (typeof item !== "object" || item === null) {
            result.success = false;
            result.msg = "Every element must be of type object.";
            return false;
        }

        if (Object.keys(item).length > 5) {
            result.success = false;
            result.msg = "Too many properties in one or more objects in items.";
            return false;
        }

        if (!item.author || typeof item.author !== "string" ||
            !item.genre || typeof item.genre !== "string" ||
            !item.count || typeof item.count !== "number" ||
            !item.price || typeof item.price !== "string" ||
            (item.note && typeof item.note !== "string")) 
        {
            result.success = false;
            result.msg = "Wrong property-name or type in one or more objects in items.";
            return false;
        }

        return true;
    });

    return result;
}


module.exports = {validateItems};
