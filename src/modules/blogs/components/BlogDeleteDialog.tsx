import React from "react";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export const BlogDeleteDialog = ({ onConfirm, onCancel }: Props) => (
  <div className="modal show d-block">
    <div className="modal-dialog">
      <div className="modal-content p-3">
        <h5>Are you sure?</h5>
        <div className="d-flex justify-content-end gap-2 mt-3">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  </div>
);
