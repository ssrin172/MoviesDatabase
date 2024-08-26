import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  //we need to create a lodash wrapper object and we can chain the functions togeher to achieve pagination
  return _(items).slice(startIndex).take(pageSize).value();
}
// _(items): Creates a lodash wrapper object around the items array.
// .slice(startIndex): Creates a new array starting from the startIndex to the end of the items array.
// .take(pageSize): Takes the first pageSize elements from the sliced array.
// .value(): Extracts the resulting array from the lodash wrapper object.
