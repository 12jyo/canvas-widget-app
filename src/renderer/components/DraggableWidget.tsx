import React from "react";
import { Rnd } from "react-rnd";
import TextEditorWidget from "./TextEditorWidget";
import ImageDisplayWidget from "./ImageDisplayWidget";
import DataTableWidget from "./DataTableWidget";
import { Widget } from "../context/CanvasContext";

export default function DraggableWidget({
  widget,
  onUpdate,
  onSelect,
  onRemove
}: {
  widget: Widget;
  onUpdate: (w: Widget) => void;
  onSelect?: (id: string) => void;
  onRemove: (id: string) => void;
}) {

  console.log('widget--',widget)
  return (
    <Rnd
      size={{ width: widget.size.width, height: widget.size.height }}
      position={{ x: widget.position.x, y: widget.position.y }}
      bounds="parent"
      onDragStop={(e, d) => {
        onUpdate({ ...widget, position: { x: d.x, y: d.y } });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        onUpdate({
          ...widget,
          size: { width: ref.offsetWidth, height: ref.offsetHeight },
          position,
        });
      }}
      onClick={() => onSelect?.(widget.id)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(widget.id);
        }}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundColor: "#ef4444",
          color: "#fff",
          border: "none",
          fontSize: "14px",
          lineHeight: "1",
          padding: "0",
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
          zIndex: 10,
        }}
        title="Remove Widget"
      >
        X
      </button>

      {widget.type === "text" && (
        <TextEditorWidget
          value={widget.config?.value || ""}
          onChange={(val) =>
            onUpdate({ ...widget, config: { ...widget.config, value: val } })
          }
        />
      )}
      {widget.type === "image" && (
        <ImageDisplayWidget src={widget.config?.src || ""} />
      )}
      {widget.type === "table" && (
        <DataTableWidget
          data={widget.config?.rows || [[""]]}
          onChange={(rows) =>
            onUpdate({ ...widget, config: { ...widget.config, rows } })
          }
        />
      )}
    </Rnd>
  );
}
