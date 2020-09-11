import { flow, curry, isFunction } from "lodash/fp";

const errors = [
  "5001",
  "4602",
  "4601",
  "4502",
  "400",
  "4106",
  "4105",
  "4104",
  "4103",
  "4102",
  "4101",
  "4008",
  "4007",
  "4006",
  "4005",
  "4004",
  "4003",
  "4002",
  "4001",
];
const errorEvents = {
  IdIncorrectEvent: "",
};

const _action = err => {
  if (err === "4103") {
    if (isFunction(errorEvents.IdIncorrectEvent)) {
      errorEvents.IdIncorrectEvent();
    }
  }
};

const _trigger = callback => {
  errorEvents.IdIncorrectEvent = callback;
};

export const observer = flow(_action);

export const subscribe = curry(_trigger);

export default { observer, subscribe };
