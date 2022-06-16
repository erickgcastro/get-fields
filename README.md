# Get-Fields
_**getFields**_ was made with the intention of using the same schemas but with different fields. Where it is not necessary to create a new schema, but change the fields in the function call. 

## Install with npm
```shell
npm i get-fields
```

## Usage
For example, if we want to create a schema to access user data, we can use this function in schema creation:

```javascript
import getFields from "get-fields";

export function GET_USER() {
  const fields = getFields(arguments); // ~> Returns the selected fields
  return gql`
    query {
      getUser {
        ${fields}	// Adds the selected fields inside the *route*
      }
    }`;
}
```
-  [Arguments object- MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/arguments)

When using the schema, you must pass the fields you want to return separated by commas.
```javascript
const { data } = useQuery(GET_USER("id", "name", "contact"))
```

But if you have to access nested data, you must use objects as follows in the example below:


```javascript
const Table = () => {
  const { data } = useQuery(
    GET_SCHEDULE(
      "id",
      // object usage
      { name: "createdBy", itens: ["_id", "name", "contact"] }, 
      { name: "service", itens: ["_id", "duration", "price"] },
      "date",
      "status"
    )
  );

  // [...]
};
```

The **objects** are used to access the _fields_ of the _fields_.
All objects must have two properties:

- name - Field name;
- itens - Array of fields that will be returned;

This object is like:

```graphql
 query {
  schedules {
    _id
    createdBy {
     _id
     name
     contact
    }
    date
    status
  }
 }
```

- The example above would look like this in the object:

```javascript
{ name: "createdBy", itens: ["_id", "name", "contact"]}
```
