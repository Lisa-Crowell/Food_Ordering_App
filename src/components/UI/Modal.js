import classes from './Modal.module.css';
import {Fragment} from "react";
import ReactDOM from "react-dom";


// remember to update the index.html file so there is an "overlay" div above the "root" div
// think about changing setting or the main app urls.py in Django

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

export default function Modal(props) {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalElement
            )}
        </Fragment>
    );
};
