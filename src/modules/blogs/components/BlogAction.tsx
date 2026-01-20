import React from "react";

interface BlogActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const BlogActions = ({ onEdit, onDelete }: BlogActionsProps) => (
  <div className="d-flex gap-2">
    <button className="btn btn-warning" onClick={onEdit}>Edit</button>
    <button className="btn btn-danger" onClick={onDelete}>Delete</button>
  </div>
);
