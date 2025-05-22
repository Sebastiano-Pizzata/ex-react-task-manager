import ReactDOM from 'react-dom';

export default function Modal({
    title,
    content,
    show = false,
    onConfirm = () => { },
    onClose = () => { },
    confirmText = "Conferma"
}) {

    if (!show) return null;



    return ReactDOM.createPortal(
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-hidden="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {content}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={onConfirm}>Conferma</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Annulla</button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
