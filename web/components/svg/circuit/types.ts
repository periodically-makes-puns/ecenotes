export type Coordinates = {x: number, y: number}; 
export type Box = {x: number, y: number, dx: number, dy: number}; 
export type ID = number | string;
export type Value = number | string;
export type DeleteHandler = (id: ID) => void;
export type ValueChangeHandler = (id: ID, value: Value) => void;