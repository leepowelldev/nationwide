import cloneDeep from 'lodash.clonedeep';

function cloneCollection<T extends Map<string, any>>(collection: T): T {
  const entries = Array.from(collection.entries());
  const clone = cloneDeep(entries);
  return new Map(clone) as T;
}

export default cloneCollection;
