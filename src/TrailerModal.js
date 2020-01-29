import React from 'react';

const TrailerModal = ({ movieIndex, title }) => {
  return (
    <div
      class="modal fade"
      id={`trailer-modal`}
      tabindex="-1"
      role="dialog"
      aria-labelledby={`"modal-${movieIndex}-title"`}
      // aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        role="document"
        id={`trailer-modal-dialogue`}
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              {title}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">TESTING</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
