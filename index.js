//
module.exports = function getFields(...args) {
  let fields = "";
  for (const i of args) {
    switch (typeof i) {
      case "string":
        fields += i + " ";
        break;
      case "object":
        if (i.name && i.itens) {
          fields += i.name + " { ";
          i.itens?.map((j) => {
            if (typeof j === "object") {
              fields += j.name + " { ";
              fields += getFields(j.itens) + " ";
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
        throw new Error("Invalid type");
    }
  }
  return fields;
};
