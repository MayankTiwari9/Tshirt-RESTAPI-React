import React from "react";

const ListContext = React.createContext({
    items: [],
    addListItem: (item) => {},
})

export default ListContext;