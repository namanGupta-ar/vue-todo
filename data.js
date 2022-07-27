let todo = [
    {
        id : 1,
        content : "Buy groceries",
        completed : false
    },
    {
        id : 2,
        content : "Learn Programming",
        completed : true
    }
];

module.exports = function() {
    return {
        todo : todo,
    };
}