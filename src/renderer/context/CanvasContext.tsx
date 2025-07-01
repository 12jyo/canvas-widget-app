import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export type Widget = {
  id: string;
  type: "text" | "image" | "table";
  config: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
};

type Canvas = {
  id: string;
  name: string;
  widgets: Widget[];
};

type State = {
  canvases: Canvas[];
  activeCanvasId: string;
};

const initialState: State = {
  canvases: [],
  activeCanvasId: "",
};

type Action =
  | { type: "ADD_CANVAS"; name: string }
  | { type: "DELETE_CANVAS"; id: string }
  | { type: "SET_ACTIVE_CANVAS"; id: string }
  | { type: "ADD_WIDGET"; canvasId: string; widget: Widget }
  | { type: "REMOVE_WIDGET"; canvasId: string; widgetId: string }
  | { type: "UPDATE_WIDGET"; canvasId: string; widget: Widget };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_CANVAS": {
      const newCanvas: Canvas = {
        id: uuidv4(),
        name: action.name,
        widgets: [],
      };
      return {
        ...state,
        canvases: [...state.canvases, newCanvas],
        activeCanvasId: newCanvas.id,
      };
    }
    case "DELETE_CANVAS":
      return {
        ...state,
        canvases: state.canvases.filter((c) => c.id !== action.id),
        activeCanvasId:
          state.activeCanvasId === action.id ? "" : state.activeCanvasId,
      };
    case "SET_ACTIVE_CANVAS":
      return { ...state, activeCanvasId: action.id };
    case "ADD_WIDGET":
      return {
        ...state,
        canvases: state.canvases.map((c) =>
          c.id === action.canvasId
            ? { ...c, widgets: [...c.widgets, action.widget] }
            : c
        ),
      };
    case "REMOVE_WIDGET":

    console.log(state.canvases,action.canvasId, action.widgetId)
      return {
        ...state,
        canvases: state.canvases.map((c) =>
          c.id === action.canvasId
            ? {
                ...c,
                widgets: c.widgets.filter((w) => w.id !== action.widgetId),
              }
            : c
        ),
      };
    case "UPDATE_WIDGET":
      return {
        ...state,
        canvases: state.canvases.map((c) =>
          c.id === action.canvasId
            ? {
                ...c,
                widgets: c.widgets.map((w) =>
                  w.id === action.widget.id ? action.widget : w
                ),
              }
            : c
        ),
      };
    default:
      return state;
  }
};

const CanvasContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const CanvasProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CanvasContext.Provider value={{ state, dispatch }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
