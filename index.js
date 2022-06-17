//
export default function getFields(...args) {
  let fields = "";
  for (const i of args[0]) {
    switch (typeof i) {
      case "string":
        fields += i + " ";
        break;
      case "object":
        if (i.name && i.items) {
          fields += i.name + " { ";
          i.items?.map((j) => {
            if (typeof j === "object") {
              fields += j.name + " { ";
              fields += getFields(...j.items);
              fields += "} ";
            } else {
              let res = getFields(j);
              fields += res.split(" ").join("") + " ";
            }
          });
          fields += "} ";
        }
        break;
      case "function":
        break;
      default:
        throw new Error("Invalid type - Only string and nesting object are allowed");
    }
  }
  return fields;
}
