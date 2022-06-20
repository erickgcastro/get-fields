# Get-Fields

_**get-fields**_ was made with the intention of using the same graphql schema but with different fields. Where it is not necessary to create a new schema, but change the fields in the function call.

## Install with npm

```shell
npm i get-fields
```

## Usage

For example, if we want to create a schema to access user data, we can use this function in schema creation:

```javascript
import { gql } from "@apollo/client";
import getFields from "get-fields";

export function GET_USER() {
  const fields = getFields(arguments); // Returns the selected fields
  return gql`
    query {
      getUser {
        ${fields}  // Adds the selected fields inside the *route*
      }
    }`;
}
```

- [Arguments object- MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/arguments)

When using the schema, you must pass the fields you want to return separated by commas.

```javascript
const Profile = () => {
  const { data } = useQuery(GET_USER("id", "name", "contact"));
  // [...]
};
```

But if you have to access nested data, you must use **_nesting object_** as in the example below:

```javascript
const Table = () => {
  const { data } = useQuery(
    GET_SCHEDULE(
      "id",
      // object usage
      { name: "createdBy", items: ["_id", "name", "contact"] },
      { name: "service", items: ["_id", "duration", "price"] },
      "date",
      "status"
    )
  );
  // [...]
};
```

The **_nesting object_** are used to access the _fields_ of the _fields_.
All objects must have two properties:

- **name** - Field name - String;
- **items** - Array of fields that will be returned:
  - fields - String or _nesting object_.

Example of using the nesting object:

```javascript
{ name: "createdBy", items: ["_id", "name", "contact"]}
```

The example of using _createdBy_ in graphql schema:

```graphql
query {
  schedules {
    date
    createdBy {
      id
      name
      contact
    }
  }
}
```

**_Items_** can also receive **_nesting object_**

```javascript
{ name: "date",  items: ["id", { name: "location", items: ["street", "house"] }] }
```

The above example in graphql schema:

```graphql
query {
  schedules {
    date {
      id
      location {
        street
        house
      }
    }
  }
}
```
