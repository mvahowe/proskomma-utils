import { v4 } from 'uuid';
import btoa from 'btoa';
const generateId = () =>  {
    return btoa(v4()).substring(0, 12);
}

export { generateId };
