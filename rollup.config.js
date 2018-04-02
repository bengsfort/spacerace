import dev from  "./targets/dev";
import prod from "./targets/prod";

// Placeholder object, will be set to the selected target
let target = {};

// Using one of the targets depeneding on params
switch (process.env.BUILD) {

  // Development target
  case "dev":
    target = dev;
    break;

  // Production target
  case "production":
    target = prod;
    break;

  // Fallback in case of an unknown value
  default:
    throw new Error("Unknown build type, use `dev` or `production`.")
}

export default target;